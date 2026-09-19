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
