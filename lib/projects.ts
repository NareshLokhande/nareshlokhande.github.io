// Every claim here should be true of the real system: it traces to the resume or to
// earlier versions of this file. Don't add specifics that can't be defended in an interview.
export interface Project {
  slug: string;
  title: string;
  /** One line for the work list, page header and meta description. */
  summary: string;
  /** Where the work was done, e.g. "Client project at BITCOLLAGE". */
  context: string;
  /** Source can't be shared; the page says so instead of linking a repo. */
  privateSource?: boolean;
  github?: string;
  demo?: string;
  technologies: string[];
  problem: string;
  built: string[];
  decisions?: string[];
  outcome?: string;
  /** Request or data flow, rendered as a step chain. */
  flow?: string[];
  codeSnippets?: { title: string; language: string; code: string }[];
}

export const projects: Project[] = [
  {
    slug: 'carbon-accounting-multi-tenant',
    title: 'Carbon accounting SaaS: schema-per-tenant backend',
    summary:
      'Multi-tenant ESG platform where every organisation gets its own PostgreSQL schema, resolved per request through a custom Hibernate connection provider.',
    context: 'Recent work at BITCOLLAGE',
    privateSource: true,
    technologies: [
      'Java 21',
      'Spring Boot 4',
      'Spring Modulith',
      'Hibernate 7.2',
      'Spring Security',
      'JWT',
      'Google OAuth2',
      'PostgreSQL',
    ],
    problem:
      "Each organisation's carbon (ESG) data has to stay isolated from every other organisation's, while all of them share one deployment and one connection pool.",
    built: [
      'Schema-per-tenant isolation: a filter resolves the tenant from the request path, a query parameter or a JWT claim, and stores it in a ThreadLocal TenantContext for the rest of the request.',
      'A CurrentTenantIdentifierResolver and a MultiTenantConnectionProvider that applies the tenant with connection.setSchema().',
      'A hand-built EntityManagerFactory configuration for compatibility with Spring Boot 4 and Hibernate 7.2.',
      'A modular monolith with Spring Modulith, and event-driven organisation onboarding and provisioning.',
      'JWT and Google OAuth2 login, with role-based authorisation through Spring Security.',
    ],
    decisions: [
      'A schema per tenant, applied by the connection provider, so isolation does not depend on every query remembering a tenant filter.',
      'Pooled connections are reset to public on release and the TenantContext is cleared in a finally block, so neither a connection nor a thread carries a tenant into the next request.',
    ],
    outcome:
      'Tenant isolation is enforced at the connection level, and new organisations are onboarded through an event-driven provisioning workflow.',
    flow: [
      'Request',
      'TenantContextFilter',
      'TenantContext (ThreadLocal)',
      'TenantIdentifierResolver',
      'ConnectionProvider.setSchema(tenant)',
      'Query',
      'releaseConnection: schema = public',
      'finally: TenantContext.clear()',
    ],
    codeSnippets: [
      {
        title: 'Tenant-aware connection provider',
        language: 'java',
        code: `public class SchemaMultiTenantConnectionProvider
    implements MultiTenantConnectionProvider<String> {

  @Override
  public Connection getConnection(String tenantId) throws SQLException {
    Connection connection = dataSource.getConnection();
    connection.setSchema(schemaResolver.resolve(tenantId));
    return connection;
  }

  @Override
  public void releaseConnection(String tenantId, Connection connection)
      throws SQLException {
    try {
      // don't hand a tenant-bound connection back to the pool
      connection.setSchema("public");
    } finally {
      connection.close();
    }
  }
}`,
      },
      {
        title: 'Tenant context filter',
        language: 'java',
        code: `@Component
public class TenantContextFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain chain)
      throws ServletException, IOException {
    // tenant from the path, a query parameter or a JWT claim
    TenantContext.set(tenantResolver.resolve(request));
    try {
      chain.doFilter(request, response);
    } finally {
      // pooled threads must not carry this tenant into the next request
      TenantContext.clear();
    }
  }
}`,
      },
    ],
  },
  {
    slug: '24tutors',
    title: '24Tutors: scheduling and verification backend',
    summary:
      'Role-based scheduling, rescheduling and OTP verification for a tutoring platform, built so that reassigning a teacher never rewrites past attendance.',
    context: 'Client project at BITCOLLAGE',
    privateSource: true,
    demo: 'https://24tutors.azurewebsites.net/',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'SQL Server',
      'Liquibase',
      'Azure',
    ],
    problem:
      'Classes run on recurring schedules with three roles: admin, teacher and student. Reassigning a teacher could break historical reports, with past attendance suddenly pointing at the new teacher. New accounts also had to be verified before they could be used.',
    built: [
      'Role-based class scheduling for admins, teachers and students, with recurring events, rescheduling workflows and admin overrides.',
      'Events, attendance logs and per-session history, so reports stay consistent through teacher reassignment.',
      'OTP account verification: codes are generated and emailed with JavaMailSender, and an account is activated only after the code is validated. Authentication runs on Spring Security with JWT.',
      'Audit logging for scheduling changes.',
      'SQL Server persistence with Liquibase migrations, so schema changes stay consistent across environments.',
    ],
    decisions: [
      'Past sessions keep their own record of teacher and time; a reassignment only updates future sessions, so reports never change after the fact.',
    ],
    outcome:
      'Historical attendance and reports stayed accurate through teacher reassignments, and accounts activate only after email verification.',
    flow: [
      'Reassign request',
      'Update future sessions',
      'Past sessions unchanged',
      'Audit entry written',
    ],
    codeSnippets: [
      {
        title: 'Reassignment that leaves history alone',
        language: 'java',
        code: `// Past sessions keep the teacher and time they actually ran with;
// only future sessions move to the new teacher.
@Transactional
public void reassignTeacher(UUID batchId, UUID fromTeacher, UUID toTeacher) {
  scheduleRepository.updateFutureSessions(batchId, fromTeacher, toTeacher);
  auditService.log("TEACHER_REASSIGNED", batchId, fromTeacher, toTeacher);
}`,
      },
    ],
  },
  {
    slug: 'assessment-platform',
    title: 'Assessment platform: question bank and exam creation',
    summary:
      'Question bank with a subject, topic and subtopic hierarchy, three ways to build an exam, and ZIP-based learning packages served from Azure Blob Storage.',
    context: 'Client project at BITCOLLAGE for an EdTech company',
    privateSource: true,
    technologies: ['Java', 'Spring Boot', 'SQL Server', 'Liquibase', 'Azure Blob Storage'],
    problem:
      'An education platform needed exam papers built from a question bank organised by board, grade, subject, topic and subtopic, and a way to publish packaged learning content.',
    built: [
      'A question bank service with hierarchical subject, topic and subtopic mapping.',
      'Three exam-creation flows on the same question bank: manual, quick and format-based.',
      'Evaluation modules with reusable scoring logic.',
      'A modular content-management system for ZIP-based learning packages: validated on upload, stored in Azure Blob Storage and rendered in an iframe.',
      'Multi-step signup with role-based branching for students, teachers and admins.',
    ],
    flow: [
      'Upload ZIP',
      'Validate package',
      'Store in Blob Storage',
      'Render in iframe',
    ],
  },
  {
    slug: 'shivani-batra-clinic',
    title: "Shivani Batra's Speech and Swallowing Clinic",
    summary:
      'Website for a speech-language pathology and audiology clinic in Mumbai: therapy services, trust signals and a clear path to booking.',
    context: 'Freelance project',
    privateSource: true,
    demo: 'https://shivani-batra-clinic.vercel.app/',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    problem:
      'The clinic needed a stronger online presence: a site where patients can find its services, see why to trust the practice, and book an appointment.',
    built: [
      'Service pages for speech, voice and swallowing therapy.',
      'A patient-focused layout with testimonial and trust-building sections.',
      'Contact and appointment booking pathways.',
      'A responsive, SEO-friendly Next.js build for mobile, tablet and desktop.',
    ],
  },
];
