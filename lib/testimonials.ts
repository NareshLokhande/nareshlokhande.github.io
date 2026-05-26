export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization?: string;
}

/**
 * Replace with real quotes when available. The section hides automatically
 * when this array is empty.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Naresh consistently delivers production-ready features across the stack—from Liquibase migrations to Spring Boot services to Next.js dashboards—with clear communication and strong ownership.',
    name: 'Colleague (placeholder)',
    role: 'Engineering lead',
    organization: 'BITCOLLAGE Consulting Services LLP',
  },
  {
    quote:
      'He brings a pragmatic engineering mindset: understands the business workflow first, then ships reliable APIs and UIs that hold up under real usage.',
    name: 'Collaborator (placeholder)',
    role: 'Product / engineering stakeholder',
  },
];
