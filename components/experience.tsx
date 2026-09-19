import { Section } from '@/components/section';
import { EMPLOYER } from '@/lib/constants';

const highlights = [
  'Designed REST APIs with Java, Spring Boot and SQL Server, improving development efficiency by about 30% through reusable design patterns and optimised validation.',
  'Built a scheduling and rescheduling system with role-based workflows for admins, teachers and students, reducing manual coordination effort by about 40%.',
  'Built OTP authentication and verification, audit logging and soft-delete support across services.',
  'Designed a question bank service with subject, topic and subtopic mapping and three exam-creation flows (manual, quick, format-based), plus a content system for ZIP-based learning packages.',
  'Designed and developed a schema-per-tenant carbon accounting (ESG) platform: custom Hibernate connection provider and tenant resolver, Spring Security, JWT and Google OAuth2, event-driven onboarding. Java 21, Spring Boot, PostgreSQL.',
  'Set up CI/CD with GitHub Actions to Azure App Service, with Liquibase managing schema versions across environments.',
  'Delivered an educational platform supporting 1000+ active users.',
];

const education = [
  { title: 'PG Diploma in Advanced Computing (PG-DAC), C-DAC Mumbai', detail: 'March to August 2024' },
  { title: 'B.E. Mechanical Engineering, PCCOE Pune', detail: '2018 to 2021, CGPA 8.44' },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <article>
        <h3 className="text-lg">
          Software Engineer,{' '}
          <a
            href={EMPLOYER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            {EMPLOYER.name}
          </a>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">January 2025 to present, Mumbai</p>
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <h3 className="mt-10 text-lg">Education</h3>
      <ul className="mt-4 space-y-3">
        {education.map(({ title, detail }) => (
          <li key={title}>
            <p>{title}</p>
            <p className="text-sm text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
