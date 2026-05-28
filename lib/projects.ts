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
  previewImages?: string[]; // Optional screenshots for lightbox gallery
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

// NOTE: For maximum credibility, replace generic phrasing like
// "multiple roles" / "production traffic" with real numbers when you have
// them — e.g., "Serves N concurrent tutoring sessions", "Reduced API p95 by X%",
// "Handles M daily active users". Recruiters scan for quantified impact.
export const projects: Project[] = [
  {
    slug: '24tutors',
    title: 'Scheduling and Workflow System',
    description:
      'Role-based class scheduling and rescheduling system with recurring events, attendance logs, and per-session history designed for data consistency.',
    longDescription:
      'Backend system developed at BITCOLLAGE to handle class scheduling operations across admin, teacher, and student roles. I implemented recurring schedules, conflict-aware rescheduling, attendance/event history tracking, and RBAC-aware control flows. The system was designed to preserve reporting correctness through teacher reassignments and timeline changes while using SQL Server and Liquibase for consistent schema versioning.',
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
      'Role-based scheduling and rescheduling workflows for admin, teacher, and student actors',
      'Recurring event support with conflict checks and operational guardrails',
      'Attendance logs and per-session history for consistent reporting',
      'Data model designed to stay accurate through teacher reassignment scenarios',
      'OTP and JWT-backed authentication with audit logging and soft-delete support',
      'SQL Server persistence with Liquibase migrations across environments',
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
      'Multi-step signup flows with role-based branching for students, teachers, and admins',
      'Question bank and paper creation workflows scaled across multiple boards, grades, and subjects',
      'Automated evaluation modules with reusable scoring logic',
      'ZIP-based learning package upload & rendering, served from Azure Blob Storage',
      'Admin dashboards covering boards, grades, subjects, and topics hierarchies',
      'Architected with stateless services for horizontal scaling',
      'Versioned schema evolution with rollback-safe migrations',
      'Designed for forward-compatible AI/ML integration hooks',
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
];
