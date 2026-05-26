/** Optional one-line tooltips for project technology badges */
export const techHints: Record<string, string> = {
  'Next.js': 'App Router, SSR, and data fetching for dashboards.',
  React: 'Component-driven UI with TypeScript.',
  TypeScript: 'End-to-end type safety on frontend and shared types.',
  'Spring Boot': 'REST APIs and microservices on the JVM.',
  Microservices: 'Domain-aligned services with clear boundaries.',
  MSSQL: 'Relational data store with Liquibase migrations.',
  Azure: 'App Service hosting and cloud operations.',
  Liquibase: 'Versioned schema changes across environments.',
  'Node.js': 'Runtime for tooling and lighter services where appropriate.',
  PostgreSQL: 'Relational database for structured application data.',
};

export function getTechHint(tech: string): string | undefined {
  return techHints[tech];
}
