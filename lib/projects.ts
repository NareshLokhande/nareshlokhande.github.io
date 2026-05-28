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
    title: '24Tutors - Tutoring Platform Backend',
    description:
      'Built core backend workflows for 24Tutors, including scheduling consistency, OTP-based verification, and secure API-driven operations.',
    longDescription:
      'At BITCOLLAGE, I worked on backend systems for 24Tutors with a focus on reliability and security. I implemented scheduling and rescheduling flows with session-level history so teacher reassignments did not break historical attendance/reporting data. I also built OTP-based account verification using JavaMailSender and verification endpoints that activate users only after successful validation. The system used Java, Spring Boot, SQL Server, and Liquibase to keep APIs maintainable and schema changes consistent across environments.',
    technologies: [
      'Java',
      'Spring Boot',
      'REST APIs',
      'SQL Server',
      'Azure',
      'Liquibase',
    ],
    demo: 'https://24tutors.azurewebsites.net/',
    isPrivate: true,
    organizationKey: 'BITCOLLAGE',
    features: [
      'Scheduling story: solved teacher reassignment issues that could break historical reports',
      'Preserved per-session history snapshots to keep past attendance and reports accurate',
      'Implemented role-based scheduling and rescheduling flows for admin, teacher, and student actors',
      'OTP auth story: generated and emailed OTPs, then activated accounts only after verification (`isVerified=true`)',
      'Integrated verification flow with Spring Security/JWT-based authentication',
      'Used SQL Server with Liquibase for controlled, environment-safe schema evolution',
    ],
    codeSnippets: [
      {
        title: 'Reassignment-safe Session History (concept)',
        language: 'java',
        code: `// Preserve historical session ownership instead of mutating past records.
public void reassignTeacher(UUID batchId, UUID fromTeacher, UUID toTeacher) {
  scheduleRepository.updateFutureSessions(batchId, fromTeacher, toTeacher);
  // Past sessions keep their historical teacher/session metadata.
  auditService.log("TEACHER_REASSIGNED", batchId, fromTeacher, toTeacher);
}`,
      },
      {
        title: 'OTP Verification Path (concept)',
        language: 'java',
        code: `public VerificationResult verifyOtp(String email, String otp) {
  User user = userRepository.findByEmail(email).orElseThrow();
  if (!otpService.matches(user, otp)) {
    throw new BadCredentialsException("Invalid OTP");
  }
  user.setVerified(true); // isVerified=true
  userRepository.save(user);
  return VerificationResult.verified(user.getId());
}`,
      },
    ],
  },
  {
    slug: 'carbon-accounting-multi-tenant',
    title: 'Carbon Accounting SaaS - Multi-tenant Architecture Story',
    description:
      'Designed and developed a schema-per-tenant SaaS platform using custom Hibernate multi-tenancy and secure tenant context handling.',
    longDescription:
      'I designed and developed a multi-tenant carbon accounting platform across backend, frontend, and database layers. Tenant context is resolved from request data (path/query/JWT claim), stored in TenantContext (ThreadLocal), consumed by CurrentTenantIdentifierResolverImpl, and applied in SchemaMultiTenantConnectionProvider using `connection.setSchema()`. To prevent connection-pool leakage, schema is reset to `public` on release and tenant context is cleared in a `finally` block. I also used a hand-built EntityManagerFactory configuration for compatibility with this Boot 4 and Hibernate 7.2 setup.',
    technologies: [
      'Java 21',
      'Spring Boot 4',
      'Spring Modulith',
      'Hibernate 7.2',
      'PostgreSQL',
      'Spring Security',
      'JWT',
      'Google OAuth2',
    ],
    isPrivate: true,
    organizationKey: 'BITCOLLAGE',
    features: [
      'TenantContextFilter -> TenantContext(ThreadLocal) -> resolver -> connection.setSchema() flow',
      'Connection safety: schema reset to `public` on release + ThreadLocal clear() in finally',
      'Modular-monolith architecture with clear module boundaries',
      'Event-driven tenant onboarding and provisioning workflows',
      'Role-based authorization with Spring Security',
      'Implemented and documented tenant-isolation improvements',
    ],
    codeSnippets: [
      {
        title: 'Tenant Schema Resolution (concept)',
        language: 'java',
        code: `String tenantId = tenantContext.getCurrentTenant();
Connection connection = dataSource.getConnection();
connection.setSchema(schemaResolver.resolve(tenantId));
try {
  return connection;
} finally {
  // prevent pool leakage
  connection.setSchema("public");
}`,
      },
    ],
  },
  {
    slug: 'shivani-batra-clinic',
    title: "Shivani Batra's Speech and Swallowing Clinic",
    description:
      'A professional healthcare website for a Speech Language Pathologist and Audiologist clinic in Mumbai.',
    longDescription:
      "Built a complete clinic website for Shivani Batra's Speech and Swallowing Clinic to improve online presence and patient outreach. The website highlights therapy services, patient trust elements, contact details, and appointment booking pathways in a clean, mobile-friendly interface optimized for accessibility and clarity.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/NareshLokhande/shivani-batra-clinic.git',
    demo: 'https://shivani-batra-clinic.vercel.app/',
    isPrivate: true,
    organization: 'Shivani Batra Clinic',
    features: [
      'Service pages for speech, voice, and swallowing therapy',
      'Patient-focused layout with testimonial and trust-building sections',
      'Contact and appointment booking pathways',
      'Responsive design for mobile, tablet, and desktop',
      'Fast, SEO-friendly Next.js implementation',
    ],
    codeSnippets: [
      {
        title: 'Service Card Component (concept)',
        language: 'typescript',
        code: `interface Service {
  title: string;
  description: string;
  features: string[];
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </article>
  );
}`,
      },
    ],
  },
];
