export interface TimelineMilestone {
  period: string;
  title: string;
  description: string;
}

export const careerTimeline: TimelineMilestone[] = [
  {
    period: 'Present',
    title: 'Full Stack Developer — BITCOLLAGE',
    description:
      'Shipping education and tutoring platforms with Spring Boot microservices, Next.js dashboards, and Azure deployments.',
  },
  {
    period: 'Focus areas',
    title: 'End-to-end platform delivery',
    description:
      'Schema migrations with Liquibase, JWT/RBAC auth, scheduling systems, and production debugging across the stack.',
  },
  {
    period: 'Growing',
    title: 'Distributed systems & AI-assisted workflows',
    description:
      'Deepening microservices patterns and exploring how AI tools fit into product engineering without sacrificing quality.',
  },
];
