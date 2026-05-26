/** One-line context for skill tooltips in the Skills section */
export const skillHints: Record<string, string> = {
  'Next.js (App Router, SSR, data fetching)':
    'Used for SSR dashboards and role-based UIs on client platforms.',
  'React + TypeScript': 'Primary frontend stack across portfolio and client work.',
  'Tailwind CSS': 'Styling system for this portfolio and production Next.js apps.',
  'Context-based state management':
    'Shared UI state across multi-step flows without over-fetching.',
  'Client–server rendering strategies':
    'Choosing SSR, CSR, or hybrid patterns per page requirements.',
  'Java, Spring Boot': 'Microservices and REST APIs for tutoring/education platforms.',
  'REST API design': 'Versioned, validated contracts between frontend and services.',
  'Modular / microservices architecture':
    'Service boundaries aligned to business domains on 24Tutors and Edukacy.',
  'Spring Security (JWT, RBAC)': 'AuthN/AuthZ for multi-role education products.',
  'Event-driven concepts (RabbitMQ)': 'Async messaging for decoupled workflows.',
  'SQL Server': 'Primary relational store for production client platforms.',
  'Liquibase (schema migrations & versioning)':
    'Repeatable migrations across dev, staging, and production.',
  'Relational data modeling': 'Entities, constraints, and indexes for tutoring domains.',
  'Query optimization & integrity constraints':
    'Keeping reports and scheduling queries fast under load.',
  'Environment-safe database changes':
    'Reviewed, reversible migrations with clear rollout steps.',
  'Azure App Service': 'Hosting Next.js and Spring Boot workloads for clients.',
  'Azure Blob Storage': 'File and media storage for platform features.',
  'CI/CD with GitHub Actions': 'Build, test, and deploy pipelines including this site.',
  'Environment-based configuration & secrets':
    'Per-environment config without leaking credentials.',
  'Production debugging & logs': 'Tracing issues across services using Azure logs.',
  'JWT-based authentication': 'Token flows with refresh and session expiry handling.',
  'Role-based access control (RBAC)': 'Fine-grained permissions per user role.',
  'OTP / email verification flows': 'Secure onboarding for students, tutors, and admins.',
  'Session expiry & token refresh': 'Balancing security and UX for long sessions.',
  'Secure API boundary design': 'Validation and authorization at every entry point.',
  'Clean API contracts': 'Stable DTOs and error shapes consumed by Next.js clients.',
  'Audit logging & soft deletes': 'Compliance-friendly data lifecycle patterns.',
  'Git & GitHub workflows': 'Feature branches, PR reviews, and release discipline.',
  'Debugging production issues': 'Structured triage from symptom to root cause.',
  'Writing maintainable, extensible code':
    'Code structured for changing requirements without rewrites.',
};

export function getSkillHint(skillName: string): string | undefined {
  return skillHints[skillName];
}
