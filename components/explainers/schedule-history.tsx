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
