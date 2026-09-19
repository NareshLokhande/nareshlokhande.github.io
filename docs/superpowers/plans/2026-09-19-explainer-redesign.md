# Interactive explainer redesign: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the client case studies with resume-level content and three interactive explainers of generic backend patterns, in a colour-coded visual system.

**Architecture:** Each explainer is a pure, dependency-free reducer module (tested with Node's built-in runner) plus a client component that renders it as HTML/CSS inside a shared frame. The home page is server-rendered around them; the case-study routes and project data are deleted.

**Tech Stack:** Next.js 16 static export, React 19 (`useReducer`), Tailwind CSS v4, `node --test` with native TypeScript type stripping (Node 24).

**Spec:** `docs/superpowers/specs/2026-09-19-explainer-redesign-design.md`

## Global Constraints

- No new dependencies. Allowed `components/ui` imports: `button`, `badge`, `input`, `label`, `textarea`, `spinner`.
- No client names anywhere in the site (24Tutors, Edukacy, the clinic, any EdTech client). Resume-level claims only.
- Explainer diagrams use invented names only: tenants `acme`, `globex`, `initech`; teachers `Asha`, `Ben`.
- Colour is never the only signal: every coloured element also carries a text label.
- Colours (light): amber `#D98A00` (acme, Expired), violet `#6D4AE0` (globex, Asha), green `#178A5B` (initech, Ben, Verified), red `#C2410C` (errors, Locked). Ink `#16181D`. Use them only through the `signal-*` theme tokens.
- Fonts: Archivo (all text), IBM Plex Mono (identifiers and codes only).
- Motion only inside `motion-safe:` utilities. The only unprompted motion is the tenant-routing demo run on load, skipped when `prefers-reduced-motion: reduce`.
- Internal links end in `/` or are `/#id` (`trailingSlash: true`).
- Reducer modules (`components/explainers/*-model.ts`) import nothing and use only erasable TypeScript (no `enum`, `namespace`, parameter properties).
- Copy: sentence case, plain words, no all-caps labels, no middle-dot separators, no gradient text.
- Verification commands: `npm test`, `npm run lint`, `npm run build`.

## File map

| File | Task | Responsibility |
|---|---|---|
| `components/explainers/tenant-routing-model.ts` | 1 | Routing state machine, captions |
| `components/explainers/schedule-model.ts` | 1 | Sessions, reassignment, attendance report, captions |
| `components/explainers/otp-model.ts` | 1 | OTP state machine, captions |
| `components/explainers/models.test.ts` | 1 | Tests for the three models |
| `package.json`, `tsconfig.json`, `.github/workflows/deploy.yml` | 1 | `npm test`, `.ts` imports, CI test step |
| `app/globals.css`, `app/layout.tsx` | 2 | Tokens, fonts, dot grid |
| `components/navbar.tsx`, `components/footer.tsx` | 2 | Drop `font-serif` |
| `components/explainers/shell.tsx`, `components/explainers/tones.ts` | 2 | Shared frame and colour class sets |
| `components/explainers/tenant-routing.tsx` | 3 | Hero explainer |
| `components/explainers/schedule-history.tsx` | 4 | Schedule explainer |
| `components/explainers/otp-flow.tsx` | 5 | OTP explainer |
| `components/hero.tsx`, `components/impact.tsx`, `components/patterns.tsx`, `app/page.tsx`, `lib/constants.ts`, `components/experience.tsx`, `app/not-found.tsx`, `app/sitemap.ts` | 6 | Page structure |
| Deleted: `app/projects/`, `components/{project-detail,work,how-i-work,flow}.tsx`, `lib/projects.ts` | 6 | Content removal |
| `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`, `public/og-image.png`, `README.md`, `CLAUDE.md`, spec | 7 | Assets and docs |

Tasks 1 and 2 are independent. Tasks 3, 4, 5 need 1 and 2 and are independent of each other. Task 6 needs 3 to 5. Task 7 is independent of 6. Task 8 runs last.

---

### Task 1: Explainer models and tests

**Files:**
- Create: `components/explainers/tenant-routing-model.ts`, `components/explainers/schedule-model.ts`, `components/explainers/otp-model.ts`
- Test: `components/explainers/models.test.ts`
- Modify: `package.json` (scripts), `tsconfig.json` (compilerOptions), `.github/workflows/deploy.yml` (test step)

**Interfaces:**
- Produces (tenant routing): `type Tenant = 'acme' | 'globex' | 'initech'`; `TENANTS: readonly Tenant[]`; `RECORDS: Readonly<Record<Tenant, number>>`; `type Stage = 'idle' | 'request' | 'filter' | 'context' | 'connection' | 'query' | 'released'`; `interface RoutingState { stage; tenant; context: Tenant | null; connectionSchema: Tenant | 'public'; result: Tenant | null }`; `type RoutingAction = { type: 'send'; tenant: Tenant } | { type: 'advance' }`; `initialRouting`; `routingReducer(state, action)`; `isRunning(state): boolean`; `routingCaption(state): string`.
- Produces (schedule): `type Teacher = 'Asha' | 'Ben'`; `type Mode = 'naive' | 'history'`; `interface Session { day: string; past: boolean; ranBy: Teacher | null; teacher: Teacher }`; `PAST_COUNT = 5`; `interface ScheduleState { mode: Mode; reassigned: boolean; sessions: Session[] }`; `type ScheduleAction = { type: 'setMode'; mode: Mode } | { type: 'reassign' } | { type: 'reset' }`; `initialSchedule(mode?: Mode): ScheduleState`; `scheduleReducer`; `interface ReportRow { teacher: Teacher; taught: number; actuallyTaught: number; scheduled: number }`; `attendanceReport(state): ReportRow[]`; `corruptedCount(state): number`; `scheduleCaption(state): string`.
- Produces (OTP): `type OtpStatus = 'sent' | 'verified' | 'expired' | 'locked'`; `type OtpEdge = 'wrong' | 'correct' | 'expire' | 'lock' | 'resend'`; `MAX_ATTEMPTS = 3`; `FIRST_CODE = '482913'`; `interface OtpState { status; code: string; attempts: number; lastEdge: OtpEdge | null }`; `type OtpAction = { type: 'submit'; guess: string } | { type: 'expire' } | { type: 'resend'; code: string }`; `initialOtp`; `otpReducer`; `otpCaption(state): string`.

- [ ] **Step 1: Allow `.ts` imports and add the test script**

In `tsconfig.json` `compilerOptions`, add after `"noEmit": true,`:

```json
    "allowImportingTsExtensions": true,
```

In `package.json` `scripts`, add after `"lint": "eslint"` (add a comma to the lint line):

```json
    "test": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test components/explainers/models.test.ts"
```

- [ ] **Step 2: Write the failing test**

Create `components/explainers/models.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `./otp-model.ts`.

- [ ] **Step 4: Implement the tenant-routing model**

Create `components/explainers/tenant-routing-model.ts`:

```ts
// State for the schema-per-tenant explainer. Imports nothing, so Node can test it directly.

export type Tenant = 'acme' | 'globex' | 'initech';
export const TENANTS: readonly Tenant[] = ['acme', 'globex', 'initech'];

/** Rows each tenant's schema holds, shown when the query runs. */
export const RECORDS: Readonly<Record<Tenant, number>> = { acme: 3, globex: 5, initech: 2 };

export type Stage =
  | 'idle'
  | 'request'
  | 'filter'
  | 'context'
  | 'connection'
  | 'query'
  | 'released';

export interface RoutingState {
  stage: Stage;
  /** Tenant carried by the current (or last) request. */
  tenant: Tenant;
  /** The ThreadLocal TenantContext: set by the filter, cleared on release. */
  context: Tenant | null;
  /** Schema of the borrowed connection. Pooled connections sit on public. */
  connectionSchema: Tenant | 'public';
  /** Tenant whose rows the last query returned. */
  result: Tenant | null;
}

export type RoutingAction = { type: 'send'; tenant: Tenant } | { type: 'advance' };

export const initialRouting: RoutingState = {
  stage: 'idle',
  tenant: 'acme',
  context: null,
  connectionSchema: 'public',
  result: null,
};

export function routingReducer(state: RoutingState, action: RoutingAction): RoutingState {
  if (action.type === 'send') {
    return {
      stage: 'request',
      tenant: action.tenant,
      context: null,
      connectionSchema: 'public',
      result: null,
    };
  }
  switch (state.stage) {
    case 'request':
      return { ...state, stage: 'filter' };
    case 'filter':
      return { ...state, stage: 'context', context: state.tenant };
    case 'context':
      return { ...state, stage: 'connection', connectionSchema: state.tenant };
    case 'connection':
      return { ...state, stage: 'query', result: state.tenant };
    case 'query':
      return { ...state, stage: 'released', connectionSchema: 'public', context: null };
    default:
      return state; // idle and released have nothing to advance to
  }
}

export function isRunning(state: RoutingState): boolean {
  return state.stage !== 'idle' && state.stage !== 'released';
}

export function routingCaption({ stage, tenant }: RoutingState): string {
  switch (stage) {
    case 'idle':
      return 'Pick a tenant to send a request.';
    case 'request':
      return `A request arrives with tenant ${tenant} in its token.`;
    case 'filter':
      return 'TenantContextFilter reads the tenant from the token.';
    case 'context':
      return 'The tenant is stored in a ThreadLocal, for this request only.';
    case 'connection':
      return `The connection provider calls setSchema(${tenant}) on a pooled connection.`;
    case 'query':
      return `The query runs in schema ${tenant} and can only see its ${RECORDS[tenant]} rows.`;
    case 'released':
      return 'Released: the connection is reset to public and the tenant context is cleared.';
  }
}
```

- [ ] **Step 5: Implement the schedule model**

Create `components/explainers/schedule-model.ts`:

```ts
// State for the schedule-history explainer. Imports nothing, so Node can test it directly.

export type Teacher = 'Asha' | 'Ben';
export type Mode = 'naive' | 'history';

export interface Session {
  day: string;
  /** Already happened (before today). */
  past: boolean;
  /** Who actually taught a past session. Null for sessions that haven't happened. */
  ranBy: Teacher | null;
  /** Teacher recorded in the schedule table. */
  teacher: Teacher;
}

export const PAST_COUNT = 5;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export interface ScheduleState {
  mode: Mode;
  reassigned: boolean;
  sessions: Session[];
}

export type ScheduleAction =
  | { type: 'setMode'; mode: Mode }
  | { type: 'reassign' }
  | { type: 'reset' };

export function initialSchedule(mode: Mode = 'naive'): ScheduleState {
  const sessions: Session[] = [];
  for (let i = 0; i < PAST_COUNT * 2; i++) {
    const past = i < PAST_COUNT;
    sessions.push({ day: DAYS[i % DAYS.length], past, ranBy: past ? 'Asha' : null, teacher: 'Asha' });
  }
  return { mode, reassigned: false, sessions };
}

export function scheduleReducer(state: ScheduleState, action: ScheduleAction): ScheduleState {
  switch (action.type) {
    case 'setMode':
      return initialSchedule(action.mode); // switching strategy starts over
    case 'reset':
      return initialSchedule(state.mode);
    case 'reassign': {
      if (state.reassigned) return state;
      const sessions = state.sessions.map(
        (s): Session => (state.mode === 'naive' || !s.past ? { ...s, teacher: 'Ben' } : s),
      );
      return { ...state, reassigned: true, sessions };
    }
  }
}

export interface ReportRow {
  teacher: Teacher;
  /** Past sessions the schedule table credits to this teacher. */
  taught: number;
  /** Past sessions this teacher really ran. */
  actuallyTaught: number;
  scheduled: number;
}

export function attendanceReport({ sessions }: ScheduleState): ReportRow[] {
  const teachers: Teacher[] = ['Asha', 'Ben'];
  return teachers.map((teacher) => ({
    teacher,
    taught: sessions.filter((s) => s.past && s.teacher === teacher).length,
    actuallyTaught: sessions.filter((s) => s.past && s.ranBy === teacher).length,
    scheduled: sessions.filter((s) => !s.past && s.teacher === teacher).length,
  }));
}

/** Past sessions whose recorded teacher isn't who taught them. */
export function corruptedCount({ sessions }: ScheduleState): number {
  return sessions.filter((s) => s.past && s.teacher !== s.ranBy).length;
}

export function scheduleCaption(state: ScheduleState): string {
  if (!state.reassigned) {
    return state.mode === 'naive'
      ? 'Naive update: one UPDATE for every session in the class. Reassign to see what happens.'
      : 'Keep history: only sessions after today change. Reassign to see what happens.';
  }
  const wrong = corruptedCount(state);
  return wrong > 0
    ? `The update rewrote history: the report now says Ben taught ${wrong} sessions he never ran. Switch to Keep history to compare.`
    : `Only future sessions moved to Ben. Asha keeps credit for the ${PAST_COUNT} she taught.`;
}
```

- [ ] **Step 6: Implement the OTP model**

Create `components/explainers/otp-model.ts`:

```ts
// State for the OTP explainer. Imports nothing, so Node can test it directly.

export type OtpStatus = 'sent' | 'verified' | 'expired' | 'locked';
export type OtpEdge = 'wrong' | 'correct' | 'expire' | 'lock' | 'resend';

export const MAX_ATTEMPTS = 3;
/** Fixed first code so the server render and the first client render match. */
export const FIRST_CODE = '482913';

export interface OtpState {
  status: OtpStatus;
  code: string;
  attempts: number;
  /** Transition that produced this state, for highlighting. */
  lastEdge: OtpEdge | null;
}

export type OtpAction =
  | { type: 'submit'; guess: string }
  | { type: 'expire' }
  | { type: 'resend'; code: string };

export const initialOtp: OtpState = { status: 'sent', code: FIRST_CODE, attempts: 0, lastEdge: null };

export function otpReducer(state: OtpState, action: OtpAction): OtpState {
  switch (action.type) {
    case 'resend':
      return { status: 'sent', code: action.code, attempts: 0, lastEdge: 'resend' };
    case 'expire':
      return state.status === 'sent' ? { ...state, status: 'expired', lastEdge: 'expire' } : state;
    case 'submit': {
      if (state.status !== 'sent') return state;
      if (action.guess === state.code) return { ...state, status: 'verified', lastEdge: 'correct' };
      const attempts = state.attempts + 1;
      return attempts >= MAX_ATTEMPTS
        ? { ...state, attempts, status: 'locked', lastEdge: 'lock' }
        : { ...state, attempts, lastEdge: 'wrong' };
    }
  }
}

export function otpCaption(state: OtpState): string {
  switch (state.status) {
    case 'verified':
      return 'Verified. The account is active now.';
    case 'expired':
      return 'The code expired after 5 minutes. Request a new one.';
    case 'locked':
      return 'Three wrong codes: locked. Only a new code unlocks it.';
    case 'sent': {
      if (state.lastEdge === 'wrong') {
        const left = MAX_ATTEMPTS - state.attempts;
        return `Wrong code. ${left} ${left === 1 ? 'attempt' : 'attempts'} left.`;
      }
      if (state.lastEdge === 'resend') return 'New code sent. Attempts reset.';
      return 'Code sent. It expires in 5 minutes.';
    }
  }
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, `tests 12`, `fail 0`.

- [ ] **Step 8: Run tests in CI**

In `.github/workflows/deploy.yml`, insert after the `Lint` step (before `Build`):

```yaml
      - name: Test
        run: npm test

```

- [ ] **Step 9: Lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed (the models are not imported by any page yet).

- [ ] **Step 10: Commit**

```bash
git add components/explainers/tenant-routing-model.ts components/explainers/schedule-model.ts components/explainers/otp-model.ts components/explainers/models.test.ts package.json tsconfig.json .github/workflows/deploy.yml
git commit -m "Add explainer state models with tests"
```

---

### Task 2: Visual system

**Files:**
- Modify: `app/globals.css` (full replacement), `app/layout.tsx` (fonts), `components/navbar.tsx:80`, `components/footer.tsx:28`
- Create: `components/explainers/tones.ts`, `components/explainers/shell.tsx`

**Interfaces:**
- Produces: Tailwind colour utilities `*-signal-{amber,violet,green,red}`, `*-signal-{…}-fg` (text on a filled signal colour), `*-signal-{…}-ink` (signal-coloured text on paper); utility class `dot-grid`.
- Produces: `type Tone = 'amber' | 'violet' | 'green' | 'red' | 'ink'`; `interface ToneClasses { fill: string; border: string; text: string; dot: string; soft: string }`; `TONES: Record<Tone, ToneClasses>`.
- Produces: `ExplainerShell({ controls, caption, children, className? })`: a `<figure>` with a dot-grid canvas (controls on top, diagram below) and an `aria-live="polite"` `<figcaption>`.

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import 'tailwindcss';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-signal-amber: var(--signal-amber);
  --color-signal-amber-fg: var(--signal-amber-fg);
  --color-signal-amber-ink: var(--signal-amber-ink);
  --color-signal-violet: var(--signal-violet);
  --color-signal-violet-fg: var(--signal-violet-fg);
  --color-signal-violet-ink: var(--signal-violet-ink);
  --color-signal-green: var(--signal-green);
  --color-signal-green-fg: var(--signal-green-fg);
  --color-signal-green-ink: var(--signal-green-ink);
  --color-signal-red: var(--signal-red);
  --color-signal-red-fg: var(--signal-red-fg);
  --color-signal-red-ink: var(--signal-red-ink);
  --font-sans: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}

/* White paper and ink. Colour is reserved for meaning: each signal colour marks one
   tenant, teacher or state in the explainers. -fg is text on a filled signal colour,
   -ink is signal-coloured text on paper; both meet 4.5:1. */
:root {
  --background: #ffffff;
  --foreground: #16181d;
  --card: #ffffff;
  --card-foreground: #16181d;
  --popover: #ffffff;
  --popover-foreground: #16181d;
  --primary: #16181d;
  --primary-foreground: #ffffff;
  --secondary: #f1f2f4;
  --secondary-foreground: #16181d;
  --muted: #f1f2f4;
  --muted-foreground: #50565f;
  --accent: #f1f2f4;
  --accent-foreground: #16181d;
  --destructive: #c2410c;
  --border: #e3e5e8;
  --input: #8a9099;
  --ring: #16181d;
  --dot: #d9dce1;

  --signal-amber: #d98a00;
  --signal-amber-fg: #16181d;
  --signal-amber-ink: #8a5700;
  --signal-violet: #6d4ae0;
  --signal-violet-fg: #ffffff;
  --signal-violet-ink: #5b3cc4;
  --signal-green: #137a50;
  --signal-green-fg: #ffffff;
  --signal-green-ink: #11704a;
  --signal-red: #c2410c;
  --signal-red-fg: #ffffff;
  --signal-red-ink: #a8360a;
}

.dark {
  --background: #15181e;
  --foreground: #eceef1;
  --card: #1b1f26;
  --card-foreground: #eceef1;
  --popover: #1b1f26;
  --popover-foreground: #eceef1;
  --primary: #eceef1;
  --primary-foreground: #15181e;
  --secondary: #242932;
  --secondary-foreground: #eceef1;
  --muted: #242932;
  --muted-foreground: #a3aab5;
  --accent: #242932;
  --accent-foreground: #eceef1;
  --destructive: #ff8f66;
  --border: #2c323c;
  --input: #6b7380;
  --ring: #eceef1;
  --dot: #2a2f38;

  --signal-amber: #f2b441;
  --signal-amber-fg: #15181e;
  --signal-amber-ink: #f2b441;
  --signal-violet: #a38cff;
  --signal-violet-fg: #15181e;
  --signal-violet-ink: #b6a4ff;
  --signal-green: #44c48e;
  --signal-green-fg: #15181e;
  --signal-green-ink: #5cd39f;
  --signal-red: #ff7a4d;
  --signal-red-fg: #15181e;
  --signal-red-ink: #ff8f66;
}

/* Explainer canvases: a faint dot grid, like a whiteboard. */
@utility dot-grid {
  background-color: var(--card);
  background-image: radial-gradient(var(--dot) 1px, transparent 1px);
  background-size: 18px 18px;
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    color-scheme: light;
  }
  html.dark {
    color-scheme: dark;
  }
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }
  body {
    @apply bg-background font-sans text-foreground antialiased;
  }
  h1,
  h2 {
    font-weight: 800;
    letter-spacing: -0.025em;
    text-wrap: balance;
  }
  h3 {
    font-weight: 700;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }
  [id] {
    scroll-margin-top: 5rem;
  }
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
  ::selection {
    background: color-mix(in oklch, var(--signal-amber) 35%, transparent);
  }
}
```

- [ ] **Step 2: Switch fonts in `app/layout.tsx`**

Replace the import line `import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';` with:

```tsx
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
```

Replace the three font declarations (`const plexSans = …`, `const plexSerif = …`, `const plexMono = …`) with:

```tsx
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});
```

Replace ``className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}`` with:

```tsx
      className={`${archivo.variable} ${plexMono.variable}`}
```

- [ ] **Step 3: Remove `font-serif` from the brand marks**

`components/navbar.tsx`: replace `className="font-serif text-lg font-semibold"` with `className="text-lg font-extrabold tracking-tight"`.

`components/footer.tsx`: replace `<p className="font-serif text-lg font-semibold">` with `<p className="text-lg font-extrabold tracking-tight">`.

Run: `grep -rn "font-serif" app components`
Expected: no output.

- [ ] **Step 4: Create `components/explainers/tones.ts`**

```ts
/** Class sets for the signal colours. Each explainer maps its tenants, teachers or states to a tone. */
export type Tone = 'amber' | 'violet' | 'green' | 'red' | 'ink';

export interface ToneClasses {
  /** Filled node: background, border and readable text. */
  fill: string;
  /** Outline only. */
  border: string;
  /** Tone-coloured text on paper. */
  text: string;
  /** Solid dot. */
  dot: string;
  /** Faint tint behind an active row. */
  soft: string;
}

export const TONES: Record<Tone, ToneClasses> = {
  amber: {
    fill: 'border-signal-amber bg-signal-amber text-signal-amber-fg',
    border: 'border-signal-amber',
    text: 'text-signal-amber-ink',
    dot: 'bg-signal-amber',
    soft: 'bg-signal-amber/15',
  },
  violet: {
    fill: 'border-signal-violet bg-signal-violet text-signal-violet-fg',
    border: 'border-signal-violet',
    text: 'text-signal-violet-ink',
    dot: 'bg-signal-violet',
    soft: 'bg-signal-violet/15',
  },
  green: {
    fill: 'border-signal-green bg-signal-green text-signal-green-fg',
    border: 'border-signal-green',
    text: 'text-signal-green-ink',
    dot: 'bg-signal-green',
    soft: 'bg-signal-green/15',
  },
  red: {
    fill: 'border-signal-red bg-signal-red text-signal-red-fg',
    border: 'border-signal-red',
    text: 'text-signal-red-ink',
    dot: 'bg-signal-red',
    soft: 'bg-signal-red/15',
  },
  ink: {
    fill: 'border-foreground bg-foreground text-background',
    border: 'border-foreground',
    text: 'text-foreground',
    dot: 'bg-foreground',
    soft: 'bg-foreground/10',
  },
};
```

- [ ] **Step 5: Create `components/explainers/shell.tsx`**

```tsx
import { cn } from '@/lib/utils';

/** Frame shared by the explainers: controls and diagram on a dot-grid canvas, then a live caption. */
export function ExplainerShell({
  controls,
  caption,
  children,
  className,
}: {
  controls: React.ReactNode;
  caption: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>
      <div className="dot-grid p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">{controls}</div>
        <div className="mt-5">{children}</div>
      </div>
      <figcaption
        aria-live="polite"
        className="min-h-[calc(3lh+1.5rem)] border-t border-border px-4 py-3 text-sm leading-snug sm:min-h-[calc(2lh+1.5rem)] sm:px-5"
      >
        {caption}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 6: Lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed. `grep -o "Archivo" out/index.html | head -1` prints `Archivo`.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/layout.tsx components/navbar.tsx components/footer.tsx components/explainers/tones.ts components/explainers/shell.tsx
git commit -m "Switch to the colour-coded visual system"
```

---

### Task 3: Tenant-routing explainer

**Files:**
- Create: `components/explainers/tenant-routing.tsx`

**Interfaces:**
- Consumes: Task 1 tenant-routing model; Task 2 `ExplainerShell`, `TONES`, `Tone`.
- Produces: `export function TenantRouting(): JSX.Element` (client component, no props).

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useReducer } from 'react';
import { ExplainerShell } from './shell';
import {
  initialRouting,
  isRunning,
  RECORDS,
  routingCaption,
  routingReducer,
  TENANTS,
  type RoutingState,
  type Stage,
  type Tenant,
} from './tenant-routing-model';
import { TONES, type Tone } from './tones';

const TENANT_TONE: Record<Tenant, Tone> = { acme: 'amber', globex: 'violet', initech: 'green' };
const STEP_MS = 900;
const ORDER: Stage[] = ['request', 'filter', 'context', 'connection', 'query', 'released'];

/** Whether the request has got as far as `step`. */
function reached(stage: Stage, step: Stage): boolean {
  return stage !== 'idle' && ORDER.indexOf(stage) >= ORDER.indexOf(step);
}

/** Rows the current stage is acting on. Release touches the context and the connection. */
function isActive(stage: Stage, step: Stage): boolean {
  if (stage === 'released') return step === 'context' || step === 'connection';
  return stage === step;
}

function rows({ stage, tenant, context, connectionSchema }: RoutingState) {
  return [
    {
      step: 'request' as const,
      label: 'Request',
      value: reached(stage, 'request') ? `token: tenant=${tenant}` : 'waiting',
    },
    {
      step: 'filter' as const,
      label: 'TenantContextFilter',
      value: reached(stage, 'filter') ? `reads ${tenant}` : 'idle',
    },
    { step: 'context' as const, label: 'TenantContext', value: context ?? 'empty' },
    { step: 'connection' as const, label: 'Connection', value: `schema = ${connectionSchema}` },
  ];
}

export function TenantRouting() {
  const [state, dispatch] = useReducer(routingReducer, initialRouting);
  const tone = TONES[TENANT_TONE[state.tenant]];
  const released = state.stage === 'released';

  // One demo request on load, skipped for visitors who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => dispatch({ type: 'send', tenant: 'acme' }), 600);
    return () => clearTimeout(timer);
  }, []);

  // Walk the request through its stages, one step at a time.
  useEffect(() => {
    if (!isRunning(state)) return;
    const timer = setTimeout(() => dispatch({ type: 'advance' }), STEP_MS);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <ExplainerShell
      caption={routingCaption(state)}
      controls={
        <>
          <span className="text-sm text-muted-foreground">Send a request as</span>
          {TENANTS.map((tenant) => {
            const t = TONES[TENANT_TONE[tenant]];
            const pressed = state.stage !== 'idle' && state.tenant === tenant;
            return (
              <button
                key={tenant}
                type="button"
                aria-pressed={pressed}
                onClick={() => dispatch({ type: 'send', tenant })}
                className={cn(
                  'rounded-md border-[1.5px] px-2.5 py-1 font-mono text-sm motion-safe:transition-colors',
                  pressed ? t.fill : cn('bg-card', t.border, t.text),
                )}
              >
                {tenant}
              </button>
            );
          })}
        </>
      }
    >
      <ol className="ml-1.5 border-l-[1.5px] border-input pl-5">
        {rows(state).map(({ step, label, value }) => {
          const lit = reached(state.stage, step) && !released;
          return (
            <li key={step} className="relative py-0.5">
              <span
                aria-hidden
                className={cn(
                  'absolute top-1/2 -left-[20.75px] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] motion-safe:transition-colors',
                  lit ? cn(tone.dot, tone.border) : 'border-input bg-card',
                )}
              />
              <div
                className={cn(
                  'flex flex-wrap items-baseline justify-between gap-x-3 rounded-md px-2 py-1.5 motion-safe:transition-colors',
                  isActive(state.stage, step) && tone.soft,
                )}
              >
                <span className="font-mono text-[13px]">{label}</span>
                <span className={cn('font-mono text-[13px]', lit ? tone.text : 'text-muted-foreground')}>
                  {value}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <ul aria-label="Tenant schemas" className="mt-4 grid grid-cols-3 gap-2">
        {TENANTS.map((tenant) => {
          const t = TONES[TENANT_TONE[tenant]];
          const hit = state.result === tenant;
          const live = hit && state.stage === 'query';
          return (
            <li
              key={tenant}
              className={cn(
                'rounded-md border-[1.5px] px-2 py-2 motion-safe:transition-colors',
                live ? t.fill : hit ? cn('bg-card', t.border) : 'border-dashed border-input bg-card',
              )}
            >
              <span className={cn('block text-xs', !live && 'text-muted-foreground')}>schema</span>
              <span
                className={cn(
                  'block font-mono text-sm font-medium',
                  !live && (hit ? t.text : 'text-muted-foreground'),
                )}
              >
                {tenant}
              </span>
              <span className={cn('mt-1 block text-xs', !live && (hit ? t.text : 'text-muted-foreground'))}>
                {hit ? `${RECORDS[tenant]} rows returned` : 'not touched'}
              </span>
            </li>
          );
        })}
      </ul>
    </ExplainerShell>
  );
}
```

- [ ] **Step 2: Lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/explainers/tenant-routing.tsx
git commit -m "Add the tenant-routing explainer"
```

---

### Task 4: Schedule-history explainer

**Files:**
- Create: `components/explainers/schedule-history.tsx`

**Interfaces:**
- Consumes: Task 1 schedule model; Task 2 `ExplainerShell`, `TONES`, `Tone`; `Button` from `@/components/ui/button`.
- Produces: `export function ScheduleHistory(): JSX.Element` (client component, no props).

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useReducer } from 'react';
import {
  attendanceReport,
  initialSchedule,
  scheduleCaption,
  scheduleReducer,
  type Mode,
  type Session,
  type Teacher,
} from './schedule-model';
import { ExplainerShell } from './shell';
import { TONES, type Tone } from './tones';

const TEACHER_TONE: Record<Teacher, Tone> = { Asha: 'violet', Ben: 'green' };
const MODES: { mode: Mode; label: string }[] = [
  { mode: 'naive', label: 'Naive update' },
  { mode: 'history', label: 'Keep history' },
];

function SessionCell({ session }: { session: Session }) {
  const tone = TONES[TEACHER_TONE[session.teacher]];
  const wrong = session.past && session.teacher !== session.ranBy;
  return (
    <li
      className={cn(
        'rounded-md border-[1.5px] px-1 py-1.5 text-center motion-safe:transition-colors',
        session.past ? tone.fill : cn('bg-card', tone.border),
        wrong && 'outline-2 outline-offset-2 outline-signal-red',
      )}
    >
      <span className="block text-[11px] leading-none">{session.day}</span>
      <span className={cn('mt-1 block text-sm leading-none font-semibold', !session.past && tone.text)}>
        {session.teacher}
      </span>
      {wrong && <span className="sr-only">, wrong: {session.ranBy} taught this session</span>}
    </li>
  );
}

export function ScheduleHistory() {
  const [state, dispatch] = useReducer(scheduleReducer, 'naive', initialSchedule);
  const past = state.sessions.filter((s) => s.past);
  const future = state.sessions.filter((s) => !s.past);

  return (
    <ExplainerShell
      caption={scheduleCaption(state)}
      controls={
        <>
          <div
            role="group"
            aria-label="Update strategy"
            className="inline-flex rounded-md border border-input bg-card p-0.5"
          >
            {MODES.map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                aria-pressed={state.mode === mode}
                onClick={() => dispatch({ type: 'setMode', mode })}
                className={cn(
                  'rounded-sm px-2.5 py-1 text-sm font-semibold',
                  state.mode === mode
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => dispatch({ type: 'reassign' })}
            disabled={state.reassigned}
          >
            Reassign to Ben
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => dispatch({ type: 'reset' })}
            disabled={!state.reassigned}
          >
            Reset
          </Button>
        </>
      }
    >
      <p className="mb-1.5 text-xs text-muted-foreground">This week, already taught</p>
      <ol className="grid grid-cols-5 gap-1.5">
        {past.map((session, i) => (
          <SessionCell key={`past-${i}`} session={session} />
        ))}
      </ol>
      <div className="my-3 flex items-center gap-2 text-xs font-semibold">
        <span aria-hidden className="flex-1 border-t-[1.5px] border-dashed border-foreground" />
        Today
        <span aria-hidden className="flex-1 border-t-[1.5px] border-dashed border-foreground" />
      </div>
      <p className="mb-1.5 text-xs text-muted-foreground">Next week, scheduled</p>
      <ol className="grid grid-cols-5 gap-1.5">
        {future.map((session, i) => (
          <SessionCell key={`future-${i}`} session={session} />
        ))}
      </ol>

      <table className="mt-5 w-full text-sm">
        <caption className="mb-1.5 text-left text-xs text-muted-foreground">Attendance report</caption>
        <thead>
          <tr className="text-xs text-muted-foreground">
            <th scope="col" className="pb-1 text-left font-normal">Teacher</th>
            <th scope="col" className="pb-1 text-right font-normal">Taught</th>
            <th scope="col" className="pb-1 text-right font-normal">Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {attendanceReport(state).map(({ teacher, taught, actuallyTaught, scheduled }) => {
            const wrong = taught !== actuallyTaught;
            return (
              <tr key={teacher} className="border-t border-border">
                <th
                  scope="row"
                  className={cn('py-1.5 text-left font-semibold', TONES[TEACHER_TONE[teacher]].text)}
                >
                  {teacher}
                </th>
                <td
                  className={cn(
                    'py-1.5 text-right tabular-nums',
                    wrong && 'font-semibold text-signal-red-ink',
                  )}
                >
                  {taught}
                  {wrong && <span> (really {actuallyTaught})</span>}
                </td>
                <td className="py-1.5 text-right tabular-nums">{scheduled}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ExplainerShell>
  );
}
```

- [ ] **Step 2: Lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/explainers/schedule-history.tsx
git commit -m "Add the schedule-history explainer"
```

---

### Task 5: OTP explainer

**Files:**
- Create: `components/explainers/otp-flow.tsx`

**Interfaces:**
- Consumes: Task 1 OTP model; Task 2 `ExplainerShell`, `TONES`, `Tone`; `Button`, `Input` from `@/components/ui`.
- Produces: `export function OtpFlow(): JSX.Element` (client component, no props).

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useReducer, useState, type FormEvent } from 'react';
import {
  initialOtp,
  MAX_ATTEMPTS,
  otpCaption,
  otpReducer,
  type OtpEdge,
  type OtpStatus,
} from './otp-model';
import { ExplainerShell } from './shell';
import { TONES, type Tone } from './tones';

const STATUS_TONE: Record<OtpStatus, Tone> = {
  sent: 'ink',
  verified: 'green',
  expired: 'amber',
  locked: 'red',
};

const EXITS: { status: OtpStatus; label: string; edge: OtpEdge; via: string }[] = [
  { status: 'verified', label: 'Verified', edge: 'correct', via: 'right code' },
  { status: 'expired', label: 'Expired', edge: 'expire', via: '5 minutes pass' },
  { status: 'locked', label: 'Locked', edge: 'lock', via: 'third wrong code' },
];

function newCode(current: string): string {
  let code = current;
  while (code === current) code = String(Math.floor(100000 + Math.random() * 900000));
  return code;
}

function StateNode({ status, label, current }: { status: OtpStatus; label: string; current: OtpStatus }) {
  const on = status === current;
  return (
    <span
      aria-current={on ? 'true' : undefined}
      className={cn(
        'inline-flex min-w-20 justify-center rounded-md border-[1.5px] px-2.5 py-1 text-sm font-semibold motion-safe:transition-colors',
        on ? TONES[STATUS_TONE[status]].fill : 'border-input bg-card text-muted-foreground',
      )}
    >
      {label}
    </span>
  );
}

export function OtpFlow() {
  const [state, dispatch] = useReducer(otpReducer, initialOtp);
  const [guess, setGuess] = useState('');
  const open = state.status === 'sent';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: 'submit', guess });
    setGuess('');
  }

  return (
    <ExplainerShell
      caption={otpCaption(state)}
      controls={
        <form onSubmit={submit} className="flex w-full flex-wrap items-center gap-2">
          <p className="w-full text-sm text-muted-foreground">
            Demo inbox: your code is{' '}
            <span className="font-mono font-medium text-foreground">{state.code}</span>
          </p>
          <label htmlFor="otp-guess" className="sr-only">
            Six-digit code
          </label>
          <Input
            id="otp-guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            autoComplete="off"
            placeholder="6 digits"
            disabled={!open}
            className="h-8 w-28 font-mono"
          />
          <Button type="submit" size="sm" disabled={!open || guess.length !== 6}>
            Verify
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={!open}
            onClick={() => dispatch({ type: 'expire' })}
          >
            Skip ahead 5 minutes
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => dispatch({ type: 'resend', code: newCode(state.code) })}
          >
            Resend code
          </Button>
        </form>
      }
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <StateNode status="sent" label="Sent" current={state.status} />
        <span
          className={cn(
            'text-xs',
            state.lastEdge === 'wrong' ? 'font-semibold text-foreground' : 'text-muted-foreground',
          )}
        >
          a wrong code loops back: {state.attempts} of {MAX_ATTEMPTS} attempts used
        </span>
      </div>
      <ul className="mt-1 ml-5 border-l-[1.5px] border-input">
        {EXITS.map(({ status, label, edge, via }) => {
          const taken = state.lastEdge === edge;
          return (
            <li key={status} className="flex items-center gap-2 py-1.5">
              <span aria-hidden className={cn('h-[1.5px] w-4 shrink-0', taken ? 'bg-foreground' : 'bg-input')} />
              <span
                className={cn(
                  'w-28 shrink-0 text-xs',
                  taken ? 'font-semibold text-foreground' : 'text-muted-foreground',
                )}
              >
                {via}
              </span>
              <span aria-hidden className={taken ? 'text-foreground' : 'text-muted-foreground'}>
                →
              </span>
              <StateNode status={status} label={label} current={state.status} />
            </li>
          );
        })}
      </ul>
    </ExplainerShell>
  );
}
```

- [ ] **Step 2: Lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3: Commit**

```bash
git add components/explainers/otp-flow.tsx
git commit -m "Add the OTP explainer"
```

---

### Task 6: Page structure and content removal

**Files:**
- Replace: `components/hero.tsx`
- Create: `components/impact.tsx`, `components/patterns.tsx`
- Modify: `app/page.tsx` (imports, `<main>`), `lib/constants.ts` (`SECTIONS`), `components/experience.tsx` (drop one bullet), `app/not-found.tsx` (copy), `app/sitemap.ts`
- Delete: `app/projects/`, `components/project-detail.tsx`, `components/work.tsx`, `components/how-i-work.tsx`, `components/flow.tsx`, `lib/projects.ts`

**Interfaces:**
- Consumes: `TenantRouting` (Task 3), `ScheduleHistory` (Task 4), `OtpFlow` (Task 5).
- Produces: `Hero`, `Impact`, `Patterns` server components; `SECTIONS` ids `patterns`, `experience`, `skills`, `contact`.

- [ ] **Step 1: Replace `components/hero.tsx`**

```tsx
import { TenantRouting } from '@/components/explainers/tenant-routing';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { EMAIL_URL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants';
import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

const links = [
  { href: GITHUB_URL, label: 'GitHub', Icon: GitHubIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: `mailto:${EMAIL_URL}`, label: 'Email', Icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-14 lg:px-8">
        <div>
          <p className="text-muted-foreground">Backend engineer, Mumbai</p>
          <h1 className="mt-3 text-4xl leading-[1.04] sm:text-5xl lg:text-[3.5rem]">
            I build backends that keep tenant data isolated, schedules consistent and sign-ups
            secure.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Java, Spring Boot, SQL Server, PostgreSQL, Azure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#patterns">See how it works</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={RESUME_URL} download>
                <Download />
                Resume (PDF)
              </a>
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {links.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <TenantRouting />
          <p className="mt-2 text-xs text-muted-foreground">
            How schema-per-tenant routing works, with made-up tenants. The general pattern, not
            a client&apos;s system.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/impact.tsx`**

```tsx
// Numbers from the resume. Keep them identical to it.
const numbers = [
  {
    value: '~30%',
    label: 'more development efficiency from reusable design patterns and optimised validation',
  },
  { value: '~40%', label: 'less manual coordination with role-based scheduling workflows' },
  { value: '1000+', label: 'active users on an education platform I delivered' },
];

export function Impact() {
  return (
    <section aria-label="Impact" className="border-t border-border">
      <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:gap-10 sm:px-6 lg:px-8">
        {numbers.map(({ value, label }) => (
          <li key={value}>
            <p className="text-5xl font-extrabold tracking-tight tabular-nums">{value}</p>
            <p className="mt-2 max-w-xs text-muted-foreground">{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/patterns.tsx`**

```tsx
import { OtpFlow } from '@/components/explainers/otp-flow';
import { ScheduleHistory } from '@/components/explainers/schedule-history';

const patterns = [
  {
    title: 'Schedule changes that keep history',
    blurb: 'Reassign a teacher, then compare a naive update with one that keeps history.',
    Explainer: ScheduleHistory,
  },
  {
    title: 'OTP verification as a state machine',
    blurb: 'Try the right code, a wrong one, or let it expire.',
    Explainer: OtpFlow,
  },
];

export function Patterns() {
  return (
    <section
      id="patterns"
      aria-labelledby="patterns-title"
      className="border-t border-border py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="patterns-title" className="text-3xl sm:text-4xl">
          Patterns
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
          I&apos;ve built multi-tenant SaaS, scheduling workflows and OTP verification in
          production. These are the general patterns behind that work, with made-up data. Click
          around.
        </p>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8">
          {patterns.map(({ title, blurb, Explainer }) => (
            <article key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
              <div className="mt-4">
                <Explainer />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`**

Replace the imports

```tsx
import { Experience } from '@/components/experience';
import { Hero } from '@/components/hero';
import { HowIWork } from '@/components/how-i-work';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
```

with

```tsx
import { Experience } from '@/components/experience';
import { Hero } from '@/components/hero';
import { Impact } from '@/components/impact';
import { Patterns } from '@/components/patterns';
import { Skills } from '@/components/skills';
```

and replace

```tsx
        <Work />
        <HowIWork />
```

with

```tsx
        <Impact />
        <Patterns />
```

- [ ] **Step 5: Update `SECTIONS` in `lib/constants.ts`**

Replace the `SECTIONS` array with:

```ts
export const SECTIONS = [
  { id: 'patterns', label: 'Patterns' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;
```

- [ ] **Step 6: Trim Experience, fix the 404 copy, shrink the sitemap**

`components/experience.tsx`: delete the line `  'Delivered an educational platform supporting 1000+ active users.',` (the Impact section shows it).

`app/not-found.tsx`: replace `That address does not exist here. The work list is on the home page.` with `That address does not exist here. Everything is on the home page.`

Replace `app/sitemap.ts` with:

```ts
import { SITE_URL } from '@/lib/constants';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }];
}
```

- [ ] **Step 7: Delete the case studies and project data**

```bash
git rm -r -q app/projects components/project-detail.tsx components/work.tsx components/how-i-work.tsx components/flow.tsx lib/projects.ts
```

Run: `grep -rn -i -E "projects|24tutors|edukacy|shivani|clinic|tenantcontextfilter|flow'" app components lib --include=*.ts --include=*.tsx | grep -v "components/explainers/"`
Expected: no output.

- [ ] **Step 8: Test, lint and build**

Run: `npm test && npm run lint && npm run build`
Expected: all succeed. `ls out` shows no `projects` directory. `grep -c "Pick a tenant to send a request" out/index.html` prints `1` (the explainer's initial state is in the static HTML).

- [ ] **Step 9: Commit**

```bash
git add -A app components lib
git commit -m "Rebuild the home page around the explainers and drop the case studies"
```

---

### Task 7: Assets and docs

**Files:**
- Replace: `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`, `public/og-image.png`
- Modify: `README.md`, `CLAUDE.md`, `docs/superpowers/specs/2026-09-19-explainer-redesign-design.md`

- [ ] **Step 1: Write the asset script (outside the repo)**

Create `$SCRATCH/make-assets.cjs`, where `$SCRATCH` is the session scratchpad directory:

```js
// Renders the site icons and the Open Graph image with sharp (installed as a Next.js dependency).
// Usage: NODE_PATH=<repo>/node_modules node make-assets.cjs <repo>
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const repo = process.argv[2];
const INK = '#16181D';
const MUTED = '#50565F';
const AMBER = '#D98A00';
const LINE = '#8A9099';
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "Menlo, 'DejaVu Sans Mono', monospace";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="${INK}"/>
  <text x="28" y="42" text-anchor="middle" font-family="${SANS}" font-size="27" font-weight="800" fill="#FFFFFF">NL</text>
  <rect x="47" y="34" width="8" height="8" rx="2" fill="${AMBER}"/>
</svg>
`;

function row(y, label, value, lit) {
  return `
  <circle cx="712" cy="${y}" r="9" fill="${lit ? AMBER : '#FFFFFF'}" stroke="${lit ? AMBER : LINE}" stroke-width="2"/>
  <text x="740" y="${y + 8}" font-family="${MONO}" font-size="22" fill="${INK}">${label}</text>
  <text x="1120" y="${y + 8}" text-anchor="end" font-family="${MONO}" font-size="22" fill="${lit ? '#8A5700' : MUTED}">${value}</text>`;
}

function schema(x, name, hit) {
  return hit
    ? `<rect x="${x}" y="440" width="130" height="76" rx="8" fill="${AMBER}"/>
  <text x="${x + 16}" y="472" font-family="${MONO}" font-size="22" fill="${INK}">${name}</text>
  <text x="${x + 16}" y="500" font-family="${SANS}" font-size="18" fill="${INK}">3 rows</text>`
    : `<rect x="${x}" y="440" width="130" height="76" rx="8" fill="#FFFFFF" stroke="${LINE}" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="${x + 16}" y="472" font-family="${MONO}" font-size="22" fill="${MUTED}">${name}</text>
  <text x="${x + 16}" y="500" font-family="${SANS}" font-size="18" fill="${MUTED}">not touched</text>`;
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="#D9DCE1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <text x="80" y="200" font-family="${SANS}" font-size="72" font-weight="800" fill="${INK}" letter-spacing="-2">Naresh Lokhande</text>
  <text x="80" y="262" font-family="${SANS}" font-size="34" fill="${INK}">Backend engineer, Mumbai</text>
  <text x="80" y="312" font-family="${SANS}" font-size="26" fill="${MUTED}">Java, Spring Boot, SQL Server, PostgreSQL, Azure</text>
  <text x="80" y="560" font-family="${SANS}" font-size="24" fill="${MUTED}">nareshlokhande.github.io</text>
  <line x1="712" y1="150" x2="712" y2="380" stroke="${LINE}" stroke-width="2"/>
  ${row(160, 'Request', 'tenant=acme', true)}
  ${row(230, 'TenantContextFilter', 'reads acme', true)}
  ${row(300, 'TenantContext', 'acme', true)}
  ${row(370, 'Connection', 'schema = acme', true)}
  ${schema(700, 'acme', true)}
  ${schema(845, 'globex', false)}
  ${schema(990, 'initech', false)}
</svg>
`;

async function png(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();
}

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size, o);
    dir.writeUInt8(size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

(async () => {
  fs.writeFileSync(path.join(repo, 'app/icon.svg'), icon);
  fs.writeFileSync(path.join(repo, 'app/apple-icon.png'), await png(icon, 180));
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(async (size) => ({ size, buf: await png(icon, size) })));
  fs.writeFileSync(path.join(repo, 'app/favicon.ico'), ico(images));
  await sharp(Buffer.from(og)).png().toFile(path.join(repo, 'public/og-image.png'));
  console.log('assets written');
})();
```

- [ ] **Step 2: Render and inspect**

Run: `NODE_PATH=$PWD/node_modules node "$SCRATCH/make-assets.cjs" "$PWD"`
Expected: `assets written`. `file app/favicon.ico` reports an MS Windows icon resource with 3 icons.

Open `public/og-image.png` and `app/apple-icon.png` with the Read tool and check: no text overlaps, nothing clipped at the edges, the diagram rows line up with the dots on the rail. Adjust coordinates in the script and re-run until clean.

- [ ] **Step 3: Update the docs**

In `README.md`, replace the "What is on the site" list with:

```markdown
- Home page: a hero with a live schema-per-tenant routing explainer, impact numbers, two more interactive explainers (schedule changes that keep history, OTP verification), experience, skills and contact
- The explainers show general backend patterns with made-up data; no client names or client systems appear on the site
- Light and dark theme (`next-themes`)
- Contact form posting to [Web3Forms](https://web3forms.com) from the browser
- Resume PDF, sitemap, robots, Open Graph image
```

Replace its "Where content lives" table rows with:

```markdown
| Content | File |
|---------|------|
| Explainers (state models, tests, components) | `components/explainers/` |
| Impact numbers | `components/impact.tsx` |
| Name, links, employer, location, section list | `lib/constants.ts` |
| Experience and education | `components/experience.tsx` |
| Skills | `components/skills.tsx` |
| Resume PDF | `public/Naresh_Lokhande_Backend_SDE.pdf` |
```

Delete the sentence `Adding an entry to \`lib/projects.ts\` gives it a page, metadata and a sitemap entry.` and add `npm test         # explainer state-model tests (node --test)` to the scripts block.

In `CLAUDE.md`:
- Commands: add `npm test         # explainer state-model tests via node --test (no test framework)`, and change the "There is no test suite" paragraph to: "Verify changes with `npm test`, `npm run lint` and `npm run build`. Node version is pinned in `.nvmrc`."
- Replace the bullets under "Content lives in `lib/` and a few section components." with:
  - "**Resume level only.** The site must not name clients (past case studies named them) or show internals of employer or client systems: no internal class names, request flows, or code derived from employer code. Claims about the owner match the resume. Don't add unsourced specifics; ask the owner."
  - "`components/explainers/`: one `*-model.ts` per explainer (pure reducer and captions; imports nothing and uses only erasable TypeScript so `node --test` runs it directly), `models.test.ts`, one client component per explainer, `shell.tsx` (shared frame with a live caption) and `tones.ts` (signal colour class sets). Diagrams use invented names only (acme, globex, initech; Asha, Ben)."
  - "`lib/constants.ts`: `SITE_*`, links, `EMAIL_URL`, `LOCATION`, `TIMEZONE`, `EMPLOYER`, `SECTIONS` (drives navbar and footer; add or rename a section here and in `app/page.tsx`)."
  - "`components/impact.tsx`, `components/experience.tsx`, `components/skills.tsx`: content inline, from the resume."
- Replace the "Layout primitives" paragraph with: "**Layout.** `components/section.tsx` (`<Section id title intro?>`) is the two-column block for Experience, Skills and Contact. The hero and Patterns section lay out their explainers directly. Brand icons are in `components/icons.tsx`."
- In "Server first", list the client components: `navbar.tsx`, `theme-toggle.tsx`, `contact-form.tsx`, `copy-button.tsx`, and the three explainers.
- In "UI primitives", describe the theme: white paper and ink, colour only for meaning through `signal-{amber,violet,green,red}` tokens with `-fg` (text on fill) and `-ink` (text on paper) variants, `dot-grid` utility for explainer canvases, Archivo for text and IBM Plex Mono for identifiers.
- In "Trailing slashes", drop the project-link example (there are no project pages).

In the spec, under "Explainer behaviour > Shared rules", replace the `role="img"` bullet with: "Diagrams are built in HTML and CSS, not SVG, so they reflow on narrow screens and their text is read directly by screen readers; decorative marks are `aria-hidden`." Under "Visual system", change the dot-grid bullet to: "**Dot grid:** only on explainer canvases (including the hero's)."

- [ ] **Step 4: Commit**

```bash
git add app/icon.svg app/apple-icon.png app/favicon.ico public/og-image.png README.md CLAUDE.md docs/superpowers/specs/2026-09-19-explainer-redesign-design.md
git commit -m "Update icons, Open Graph image and docs for the redesign"
```

---

### Task 8: Browser verification

**Files:** any file from Tasks 2 to 7 that a check shows is wrong.

- [ ] **Step 1: Serve the build**

Run: `npm run build && python3 -m http.server 4012 --bind 127.0.0.1 -d out` (in the background).

- [ ] **Step 2: Check each explainer at 1440×900 and 390×844, light and dark**

- Hero: on load (no reduced motion), acme runs through all stages and ends with the connection on `public`, context `empty`, schema acme outlined with "3 rows returned". globex and initech buttons do the same in their colours. The caption changes at every step.
- Schedule: in Naive update, Reassign turns all ten cells to Ben, past cells get a red outline, the report shows "5 (really 0)" and "0 (really 5)" in red. Keep history turns only next week's cells to Ben; the report stays correct. Reset and switching mode restore the start state.
- OTP: the displayed code verifies. Three wrong codes lock and disable the input. Skip ahead expires. Resend shows a new code and resets attempts.
- No horizontal page scroll at 390px. The explainers stay legible without zooming.

- [ ] **Step 3: Keyboard and reduced motion**

Tab through the page: every control is reachable, shows a visible focus outline, and works with Enter/Space. With `prefers-reduced-motion: reduce` emulated, reload: the hero doesn't auto-play and stays in its idle state.

- [ ] **Step 4: Lighthouse**

Run Lighthouse (accessibility, best practices, SEO) on `/` for mobile and desktop.
Expected: 100 in each. Fix any failure (contrast most likely) in the owning file.

- [ ] **Step 5: Final check and commit fixes**

Run: `npm test && npm run lint && npm run build`
Expected: all succeed. Commit any fixes with a message naming what was fixed.
