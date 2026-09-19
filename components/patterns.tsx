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
