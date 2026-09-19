import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';

// Levels follow the resume. Keep them consistent with what the case studies claim.
const groups = [
  {
    label: 'Every day',
    items: [
      'Java',
      'Spring Boot',
      'SQL Server',
      'Liquibase',
      'JWT authentication',
      'Audit logging',
      'Soft deletes',
      'Azure App Service',
    ],
  },
  {
    label: 'Comfortable',
    items: [
      'Spring MVC',
      'Spring Security',
      'Hibernate and JPA',
      'JDBC',
      'REST API design',
      'OTP verification',
      'Role-based authorisation',
      'Schema-per-tenant multi-tenancy',
      'Event-driven workflows',
      'PostgreSQL',
      'MySQL',
      'Relational data modelling',
      'Query and validation optimisation',
      'Design patterns',
      'Clean and layered architecture',
      'Azure Blob Storage',
      'Docker',
      'GitHub Actions',
      'Maven',
    ],
  },
  {
    label: 'Frontend, when a project needs it',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Some exposure',
    items: ['AWS (EC2, S3, ECS)', 'Kubernetes (AKS)'],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="Grouped by how often I reach for them, not by a percentage."
    >
      <dl className="space-y-6">
        {groups.map(({ label, items }) => (
          <div key={label}>
            <dt className="text-sm font-semibold">{label}</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-1.5">
                {items.map((name) => (
                  <li key={name}>
                    <Badge variant="secondary">{name}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
