import { getOrganization } from './constants';

export interface Project {
  slug: string; // URL-friendly identifier
  title: string;
  description: string;
  technologies: string[];
  github?: string; // Optional - can be private org repo
  demo?: string; // Optional - can be private/internal demo
  isPrivate?: boolean; // Indicates if it's a private/organization project
  organizationKey?: string; // Key to lookup organization in organizations map
  organization?: string; // Name of the organization (optional, fallback if key not found)
  features?: string[]; // Key features of the project
  codeSnippets?: {
    title: string;
    language: string;
    code: string;
  }[]; // Code examples to showcase
  longDescription?: string; // Detailed description
}

// Helper function to get organization data for a project
export function getProjectOrganization(project: Project) {
  if (project.organizationKey) {
    const org = getOrganization(project.organizationKey);
    if (org) {
      return {
        name: org.name,
        logo: org.logo,
        website: org.website,
      };
    }
  }
  // Fallback to direct organization name if key not found
  return {
    name: project.organization || '',
    logo: undefined,
    website: undefined,
  };
}

export const projects: Project[] = [
  {
    slug: '24tutors',
    title: '24Tutors – Online Tutoring Platform',
    description:
      'A comprehensive online tutoring platform with microservices architecture, featuring role-based dashboards, batch management, scheduling, and real-time notifications.',
    longDescription:
      'Professional project developed as part of my role at BITCOLLAGE for a client. A production-grade online tutoring platform built with microservices architecture. I designed and implemented a microservices-based backend using Spring Boot, built SSR-based Next.js frontend with role-based dashboards, implemented batch management, scheduling, rescheduling logic, and notifications. Integrated authentication, OTP verification, audit logging, and soft delete functionality. Worked on calendar-based class scheduling and reschedule flows, and managed database migrations using Liquibase across environments.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Spring Boot',
      'Microservices',
      'MSSQL',
      'Azure',
      'Liquibase',
    ],
    demo: 'https://24tutors.azurewebsites.net/',
    isPrivate: true,
    organizationKey: 'BITCOLLAGE',
    features: [
      'Microservices-based backend architecture',
      'SSR-based Next.js frontend with role-based dashboards',
      'Batch management and scheduling system',
      'Calendar-based class scheduling and rescheduling',
      'OTP verification and authentication',
      'Audit logging and soft delete functionality',
      'Database migrations with Liquibase',
      'Real-time notifications',
    ],
    codeSnippets: [
      {
        title: 'Scheduling Service Example',
        language: 'typescript',
        code: `// Example: Class scheduling logic
interface ScheduleRequest {
  batchId: string;
  tutorId: string;
  startTime: Date;
  endTime: Date;
  recurring: boolean;
}

export async function createSchedule(request: ScheduleRequest) {
  // Validate scheduling conflicts
  const conflicts = await checkConflicts(request);
  if (conflicts.length > 0) {
    throw new Error('Scheduling conflict detected');
  }
  
  // Create schedule with audit logging
  return await scheduleService.create({
    ...request,
    createdAt: new Date(),
    createdBy: getCurrentUserId(),
  });
}`,
      },
    ],
  },
  {
    slug: 'edukacy',
    title: 'Edukacy – Education Management & Assessment Platform',
    description:
      'A comprehensive education management platform with multi-step signup flows, question bank management, paper creation workflows, and content upload capabilities.',
    longDescription:
      'Professional project developed as a client project under BITCOLLAGE. An education management and assessment platform designed for scalable architecture. I designed multi-step signup flows with role-based branching, implemented question bank, paper creation workflows, and evaluation modules. Worked on content upload & rendering with ZIP-based learning packages, built admin dashboards for boards, grades, subjects, and topics. Planned for scalable architecture and future AI integration, and handled database schema evolution and environment consistency.',
    technologies: [
      'Next.js',
      'App Router',
      'TypeScript',
      'Spring Boot',
      'SQL Server',
      'Azure',
      'Blob Storage',
    ],
    demo: 'https://edukacy.azurewebsites.net/',
    isPrivate: true,
    organizationKey: 'BITCOLLAGE',
    features: [
      'Multi-step signup flows with role-based branching',
      'Question bank and paper creation workflows',
      'Automated evaluation modules',
      'ZIP-based learning package upload & rendering',
      'Admin dashboards for boards, grades, subjects, topics',
      'Scalable architecture planning',
      'Database schema evolution management',
      'Future AI integration planning',
    ],
    codeSnippets: [
      {
        title: 'Multi-Step Signup Flow',
        language: 'typescript',
        code: `// Example: Role-based signup flow
type UserRole = 'student' | 'teacher' | 'admin';

interface SignupData {
  email: string;
  role: UserRole;
  // ... other fields
}

export async function handleSignup(data: SignupData) {
  // Role-based branching
  switch (data.role) {
    case 'student':
      return await createStudentAccount(data);
    case 'teacher':
      return await createTeacherAccount(data);
    case 'admin':
      return await createAdminAccount(data);
  }
}`,
      },
    ],
  },
  {
    slug: 'shivani-batra-clinic',
    title: "Shivani Batra's Speech & Swallowing Clinic",
    description:
      'A professional healthcare website for a Speech Language Pathologist and Audiologist clinic in Mumbai, featuring service information, appointment booking, and patient testimonials.',
    longDescription:
      "A comprehensive healthcare website built for Shivani Batra's Speech & Swallowing Clinic, a licensed Speech Language Pathologist and Audiologist practice in Mumbai. The website showcases the clinic's services including Speech Therapy, Voice Therapy, and Swallowing Therapy. Features include service descriptions, patient testimonials, contact information, appointment booking functionality, and a professional design that instills trust and confidence in potential patients.",
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    github: 'https://github.com/NareshLokhande/shivani-batra-clinic.git',
    demo: 'https://shivani-batra-clinic.vercel.app/',
    isPrivate: true,
    organization: 'Shivani Batra Clinic',
    features: [
      'Service showcase (Speech, Voice, and Swallowing Therapy)',
      'Patient testimonials and Google reviews integration',
      'Appointment booking functionality',
      'Contact information and clinic location',
      'Responsive design for all devices',
      'Professional healthcare-focused UI/UX',
    ],
    codeSnippets: [
      {
        title: 'Service Component',
        language: 'typescript',
        code: `// Service card component example
      interface Service {
        title: string;
        description: string;
        features: string[];
      }

    export function ServiceCard({ service }: { service: Service }) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{service.description}</p>
            <ul>
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      );
    }`,
      },
    ],
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    longDescription:
      'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order management, and an admin dashboard for inventory and sales tracking.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    demo: 'https://ecommerce-demo.example.com',
    features: [
      'Secure payment processing with Stripe',
      'Real-time inventory management',
      'User authentication and authorization',
      'Admin dashboard with analytics',
      'Responsive design for all devices',
    ],
    codeSnippets: [
      {
        title: 'Payment Processing',
        language: 'typescript',
        code: `// Example: Stripe payment integration
        import Stripe from 'stripe';

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        export async function createPaymentIntent(amount: number) {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'usd',
          });
          return paymentIntent;
        }`,
      },
      {
        title: 'Product API Route',
        language: 'typescript',
        code: `// Example: Next.js API route for products
        import { NextApiRequest, NextApiResponse } from 'next';
        import { prisma } from '@/lib/prisma';

        export default async function handler(
          req: NextApiRequest,
          res: NextApiResponse
        ) {
          if (req.method === 'GET') {
            const products = await prisma.product.findMany({
              include: { category: true },
            });
            return res.json(products);
          }
          // ... other methods
        }`,
      },
    ],
  },
];
