import assert from 'node:assert/strict';
import { test } from 'node:test';
import { initialOtp, MAX_ATTEMPTS, otpReducer, type OtpState } from './otp-model.ts';
import {
  attendanceReport,
  corruptedCount,
  initialSchedule,
  scheduleReducer,
} from './schedule-model.ts';
import {
  initialRouting,
  isRunning,
  routingReducer,
  type RoutingState,
  type Stage,
  type Tenant,
} from './tenant-routing-model.ts';

function runUntil(tenant: Tenant, stop: Stage): RoutingState {
  let state = routingReducer(initialRouting, { type: 'send', tenant });
  while (state.stage !== stop) {
    assert.ok(isRunning(state), `never reached ${stop}`);
    state = routingReducer(state, { type: 'advance' });
  }
  return state;
}

test('routing: a request passes every stage in order', () => {
  let state = routingReducer(initialRouting, { type: 'send', tenant: 'acme' });
  const seen: Stage[] = [state.stage];
  while (isRunning(state)) {
    state = routingReducer(state, { type: 'advance' });
    seen.push(state.stage);
  }
  assert.deepEqual(seen, ['request', 'filter', 'context', 'connection', 'query', 'released']);
});

test('routing: the query runs on the requesting tenant schema only', () => {
  const state = runUntil('globex', 'query');
  assert.equal(state.context, 'globex');
  assert.equal(state.connectionSchema, 'globex');
  assert.equal(state.result, 'globex');
});

test('routing: release resets the connection to public and clears the context', () => {
  const state = runUntil('initech', 'released');
  assert.equal(state.connectionSchema, 'public');
  assert.equal(state.context, null);
  assert.equal(state.result, 'initech');
});

test('routing: idle and released states ignore advance', () => {
  assert.equal(routingReducer(initialRouting, { type: 'advance' }), initialRouting);
  const released = runUntil('acme', 'released');
  assert.equal(routingReducer(released, { type: 'advance' }), released);
});

test('routing: a new request mid-run starts over with a clean context', () => {
  const midway = runUntil('acme', 'connection');
  assert.deepEqual(routingReducer(midway, { type: 'send', tenant: 'globex' }), {
    stage: 'request',
    tenant: 'globex',
    context: null,
    connectionSchema: 'public',
    result: null,
  });
});

test('routing: the load demo sends acme only while nothing has been sent', () => {
  assert.deepEqual(
    routingReducer(initialRouting, { type: 'demo' }),
    routingReducer(initialRouting, { type: 'send', tenant: 'acme' }),
  );
  const clicked = routingReducer(initialRouting, { type: 'send', tenant: 'globex' });
  assert.equal(routingReducer(clicked, { type: 'demo' }), clicked);
  const released = runUntil('initech', 'released');
  assert.equal(routingReducer(released, { type: 'demo' }), released);
});

test('schedule: a naive update rewrites past sessions and corrupts the report', () => {
  const state = scheduleReducer(initialSchedule('naive'), { type: 'reassign' });
  assert.ok(state.sessions.every((s) => s.teacher === 'Ben'));
  assert.equal(corruptedCount(state), 5);
  assert.deepEqual(attendanceReport(state), [
    { teacher: 'Asha', taught: 0, actuallyTaught: 5, scheduled: 0 },
    { teacher: 'Ben', taught: 5, actuallyTaught: 0, scheduled: 5 },
  ]);
});

test('schedule: keeping history moves only future sessions', () => {
  const state = scheduleReducer(initialSchedule('history'), { type: 'reassign' });
  assert.deepEqual(
    state.sessions.map((s) => s.teacher),
    ['Asha', 'Asha', 'Asha', 'Asha', 'Asha', 'Ben', 'Ben', 'Ben', 'Ben', 'Ben'],
  );
  assert.equal(corruptedCount(state), 0);
  assert.deepEqual(attendanceReport(state), [
    { teacher: 'Asha', taught: 5, actuallyTaught: 5, scheduled: 0 },
    { teacher: 'Ben', taught: 0, actuallyTaught: 0, scheduled: 5 },
  ]);
});

test('schedule: reassigning twice changes nothing; reset and mode switch start over', () => {
  const once = scheduleReducer(initialSchedule('history'), { type: 'reassign' });
  assert.equal(scheduleReducer(once, { type: 'reassign' }), once);
  assert.deepEqual(scheduleReducer(once, { type: 'reset' }), initialSchedule('history'));
  assert.deepEqual(
    scheduleReducer(once, { type: 'setMode', mode: 'naive' }),
    initialSchedule('naive'),
  );
});

const WRONG = '000000';

function guesses(...codes: string[]): OtpState {
  return codes.reduce((state, guess) => otpReducer(state, { type: 'submit', guess }), initialOtp);
}

test('otp: the right code verifies', () => {
  const state = guesses(initialOtp.code);
  assert.equal(state.status, 'verified');
  assert.equal(state.lastEdge, 'correct');
});

test('otp: wrong codes count attempts and the third one locks', () => {
  const twice = guesses(WRONG, WRONG);
  assert.equal(twice.status, 'sent');
  assert.equal(twice.attempts, 2);
  const locked = otpReducer(twice, { type: 'submit', guess: WRONG });
  assert.equal(locked.status, 'locked');
  assert.equal(locked.attempts, MAX_ATTEMPTS);
  // Locked ignores even the right code.
  assert.equal(otpReducer(locked, { type: 'submit', guess: initialOtp.code }), locked);
});

test('otp: skipping ahead expires the code, and an expired code cannot verify', () => {
  const expired = otpReducer(initialOtp, { type: 'expire' });
  assert.equal(expired.status, 'expired');
  assert.equal(otpReducer(expired, { type: 'submit', guess: initialOtp.code }), expired);
});

test('otp: resend issues a new code and resets attempts', () => {
  const locked = guesses(WRONG, WRONG, WRONG);
  const resent = otpReducer(locked, { type: 'resend', code: '135790' });
  assert.deepEqual(resent, { status: 'sent', code: '135790', attempts: 0, lastEdge: 'resend' });
  assert.equal(otpReducer(resent, { type: 'submit', guess: initialOtp.code }).status, 'sent');
  assert.equal(otpReducer(resent, { type: 'submit', guess: '135790' }).status, 'verified');
});
