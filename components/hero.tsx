import { TenantRouting } from '@/components/explainers/tenant-routing';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { EMAIL_URL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants';
import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

const links = [
  { href: GITHUB_URL, label: 'GitHub', Icon: GitHubIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: `mailto:${EMAIL_URL}`, label: 'Email', Icon: Mail },
];

export function Hero() {
  return (
    <section id="home" className="pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-14 lg:px-8">
        <div>
          <p className="text-muted-foreground">Backend engineer, Mumbai</p>
          <h1 className="mt-3 text-4xl leading-[1.04] sm:text-5xl lg:text-[3.5rem]">
            I build backends that keep tenant data isolated, schedules consistent and sign-ups
            secure.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Java, Spring Boot, SQL Server, PostgreSQL, Azure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#patterns">See how it works</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={RESUME_URL} download>
                <Download />
                Resume (PDF)
              </a>
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
        <div>
          <TenantRouting />
          <p className="mt-2 text-xs text-muted-foreground">
            How schema-per-tenant routing works, with made-up tenants. The general pattern, not
            a client&apos;s system.
          </p>
        </div>
      </div>
    </section>
  );
}
