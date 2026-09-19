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
