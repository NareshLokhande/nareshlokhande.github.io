import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/icons';
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  SECTIONS,
  TWITTER_URL,
} from '@/lib/constants';
import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

const elsewhere = [
  { href: GITHUB_URL, label: 'GitHub', Icon: GitHubIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: TWITTER_URL, label: 'X', Icon: XIcon },
  { href: `mailto:${EMAIL_URL}`, label: 'Email', Icon: Mail },
];

const linkClass = 'text-sm text-muted-foreground hover:text-foreground';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-extrabold tracking-tight">Naresh Lokhande</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Backend Software Engineer in Mumbai. Java, Spring Boot, SQL
              Server, PostgreSQL and Azure.
            </p>
            <a
              href={RESUME_URL}
              download
              className={`mt-4 inline-flex items-center gap-1.5 ${linkClass}`}
            >
              <Download className="size-4" />
              Resume (PDF)
            </a>
          </div>

          <nav aria-label="Sections">
            <ul className="space-y-2">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <Link href={`/#${id}`} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <ul className="space-y-2">
              {elsewhere.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={`inline-flex items-center gap-1.5 ${linkClass}`}
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Naresh Lokhande. Built with Next.js,
          published on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
