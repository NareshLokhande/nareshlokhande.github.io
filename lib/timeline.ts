export interface TimelineMilestone {
  period: string;
  title: string;
  description: string;
}

export const careerTimeline: TimelineMilestone[] = [
  {
    period: 'Jan 2025 - Present',
    title: 'Software Engineer — BITCOLLAGE Consulting Services LLP',
    description:
      'Designed REST APIs with Java, Spring Boot, and SQL Server, improving development efficiency through reusable patterns and optimized validations.',
  },
  {
    period: 'Key impact',
    title: 'Workflow and security systems',
    description:
      'Built role-based scheduling/rescheduling workflows, OTP verification, audit logging, soft-delete support, and CI/CD deployments to Azure with Liquibase-managed schema versioning.',
  },
  {
    period: 'Recent work',
    title: 'Multi-tenant ESG platform',
    description:
      'Developed schema-per-tenant architecture, JWT + Google OAuth2 security, and event-driven onboarding/provisioning using Java 21, Spring Boot, PostgreSQL, and Hibernate.',
  },
];
