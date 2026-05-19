export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization?: string;
}

// TODO: Replace these placeholders with real testimonials from BITCOLLAGE
// colleagues, clients, or LinkedIn recommendations. Even one real quote
// is more impactful than three placeholders — delete unused entries.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Placeholder testimonial — replace this with a real quote from a BITCOLLAGE colleague or client. Focus on a specific strength they observed: code quality, problem-solving, ownership, or delivery.',
    name: 'Add Name',
    role: 'Add Role (e.g., Tech Lead)',
    organization: 'BITCOLLAGE Consulting Services LLP',
  },
  {
    quote:
      'Placeholder testimonial — a second voice (clinic client, peer engineer, or anyone you have worked with) adds credibility. Two short quotes are better than one long one.',
    name: 'Add Name',
    role: 'Add Role',
  },
];
