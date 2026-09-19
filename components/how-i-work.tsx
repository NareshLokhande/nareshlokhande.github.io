import { Section } from '@/components/section';
import { projects } from '@/lib/projects';
import Link from 'next/link';

const habits = [
  {
    title: 'Understand the workflow before the schema',
    description:
      'I start from the actual business workflow, not the screens or the APIs. Before writing code I pin down the core entities, the roles, the edge cases and the failure paths, so the design matches real usage instead of assumptions.',
    evidence: [
      { slug: '24tutors', label: '24Tutors scheduling' },
      { slug: 'assessment-platform', label: 'Assessment platform' },
    ],
  },
  {
    title: 'Schema is versioned code',
    description:
      'Every database change ships as a Liquibase migration, so environments never drift and each change is traceable, repeatable and safe to deploy.',
    evidence: [{ slug: '24tutors', label: '24Tutors' }],
  },
  {
    title: 'Security at the boundary',
    description:
      'I design authentication and authorisation early, especially in role-based systems, and keep them at the request boundary in filters and resolvers, so business code never has to remember them.',
    evidence: [
      { slug: 'carbon-accounting-multi-tenant', label: 'Carbon accounting SaaS' },
      { slug: '24tutors', label: '24Tutors OTP and JWT' },
    ],
  },
  {
    title: 'Design for change',
    description:
      'I assume requirements will change. Clear module boundaries, events for onboarding and stored history let a new role, workflow or tenant land without a large refactor.',
    evidence: [{ slug: 'carbon-accounting-multi-tenant', label: 'Carbon accounting SaaS' }],
  },
];

for (const { slug } of habits.flatMap((h) => h.evidence)) {
  if (!projects.some((p) => p.slug === slug)) {
    throw new Error('How I work links to unknown project slug: ' + slug);
  }
}

export function HowIWork() {
  return (
    <Section
      id="how-i-work"
      title="How I work"
      intro="Four habits, each with the project where it mattered."
    >
      <ul className="divide-y divide-border">
        {habits.map(({ title, description, evidence }) => (
          <li key={title} className="py-6 first:pt-0 last:pb-0">
            <h3 className="text-lg">{title}</h3>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {description}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Seen in{' '}
              {evidence.map(({ slug, label }, i) => (
                <span key={slug + label}>
                  {i > 0 && ', '}
                  <Link
                    href={`/projects/${slug}/`}
                    className="text-primary underline underline-offset-4 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
