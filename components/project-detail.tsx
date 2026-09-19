import { CopyButton } from '@/components/copy-button';
import { Flow } from '@/components/flow';
import { GitHubIcon } from '@/components/icons';
import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EMAIL_URL } from '@/lib/constants';
import type { Project } from '@/lib/projects';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';

export function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const {
    title,
    summary,
    context,
    privateSource,
    github,
    demo,
    technologies,
    problem,
    built,
    decisions,
    outcome,
    flow,
    codeSnippets,
  } = project;

  return (
    <main id="main" className="pt-24 pb-16 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="text-sm text-muted-foreground">{context}</p>
          <h1 className="mt-3 text-3xl sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{summary}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary">{tech}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {demo && (
              <Button asChild variant="outline">
                <a href={demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                  Live product
                </a>
              </Button>
            )}
            {github && (
              <Button asChild variant="outline">
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  Source on GitHub
                </a>
              </Button>
            )}
            {privateSource && (
              <Button asChild>
                <a
                  href={`mailto:${EMAIL_URL}?subject=${encodeURIComponent(`Re: ${title}`)}`}
                >
                  <Mail />
                  Discuss this project
                </a>
              </Button>
            )}
          </div>
          {privateSource && (
            <p className="mt-3 text-sm text-muted-foreground">
              The code is private. Happy to walk through the design on a call.
            </p>
          )}
        </header>
      </div>

      <div className="mt-12">
        <Section className="py-10 sm:py-12" id="problem" title="Problem">
          <p className="max-w-prose leading-relaxed">{problem}</p>
        </Section>

        <Section className="py-10 sm:py-12" id="built" title="What I built">
          <ul className="max-w-prose list-disc space-y-2 pl-5 leading-relaxed">
            {built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        {flow && (
          <Section className="py-10 sm:py-12" id="how-it-works" title="How it works">
            <Flow steps={flow} />
          </Section>
        )}

        {decisions?.length ? (
          <Section className="py-10 sm:py-12" id="decisions" title="Decisions">
            <ul className="max-w-prose list-disc space-y-2 pl-5 leading-relaxed">
              {decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {outcome && (
          <Section className="py-10 sm:py-12" id="outcome" title="Outcome">
            <p className="max-w-prose leading-relaxed">{outcome}</p>
          </Section>
        )}


        {codeSnippets?.length ? (
          <Section className="py-10 sm:py-12" id="code" title="Code">
            {privateSource && (
              <p className="mb-6 max-w-prose text-sm text-muted-foreground">
                The source is private; these snippets are simplified re-creations of the
                real code.
              </p>
            )}
            {codeSnippets.map(({ title: snippetTitle, language, code }) => (
              <figure key={snippetTitle} className="mt-6 first:mt-0">
                <figcaption className="flex items-center justify-between gap-3 rounded-t-sm border border-b-0 border-border bg-muted px-4 py-2 text-sm">
                  <span>
                    {snippetTitle}
                    <span className="ml-2 text-muted-foreground">{language}</span>
                  </span>
                  <CopyButton text={code} className="h-7" />
                </figcaption>
                <pre
                  tabIndex={0}
                  className="overflow-x-auto rounded-b-sm border border-border bg-card p-4 font-mono text-xs leading-relaxed sm:text-sm"
                >
                  <code>{code}</code>
                </pre>
              </figure>
            ))}
          </Section>
        ) : null}
      </div>

      <nav aria-label="More" className="mt-16 border-t border-border pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Next case study</p>
          <p className="mt-1 text-xl">
            <Link
              href={`/projects/${next.slug}/`}
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              {next.title}
            </Link>
          </p>
          <p className="mt-6 text-muted-foreground">
            Hiring for a backend role?{' '}
            <a
              href={`mailto:${EMAIL_URL}`}
              className="text-primary underline underline-offset-4 hover:text-foreground"
            >
              Email me
            </a>
            .
          </p>
        </div>
      </nav>
    </main>
  );
}
