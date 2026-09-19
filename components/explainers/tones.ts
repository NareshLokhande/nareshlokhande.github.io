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
