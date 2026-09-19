import { Flow } from '@/components/flow';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  EMAIL_URL,
  EMPLOYER,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  RESUME_URL,
} from '@/lib/constants';
import { projects } from '@/lib/projects';
import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

const found = projects.find((p) => p.slug === 'carbon-accounting-multi-tenant');
if (!found?.flow) throw new Error('Hero expects the carbon accounting project with a flow');
const flagship = { slug: found.slug, flow: found.flow };

const links = [
  { href: GITHUB_URL, label: 'GitHub', Icon: GitHubIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: `mailto:${EMAIL_URL}`, label: 'Email', Icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16 lg:px-8">
        <div>
          <p className="text-base text-muted-foreground">
            Software Engineer at {EMPLOYER.short}, {LOCATION}
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
            I build the backend that keeps schedules, tenants and audit trails
            consistent.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Java and Spring Boot services on SQL Server, PostgreSQL and Azure:
            role-based scheduling for a tutoring platform, schema-per-tenant
            isolation for a carbon-accounting SaaS, and OTP and JWT flows that
            hold up in production.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/#work">See the work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={RESUME_URL} download>
                  <Download />
                  Resume (PDF)
                </a>
              </Button>
            </div>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Flow
          steps={flagship.flow}
          caption={
            <>
              How one request reaches the right tenant schema in the carbon
              accounting platform.{' '}
              <Link
                href={`/projects/${flagship.slug}/`}
                className="text-primary underline underline-offset-4 hover:text-foreground"
              >
                Read how it works
              </Link>
            </>
          }
        />
      </div>
    </section>
  );
}
