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
