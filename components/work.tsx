import { Section } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/projects';
import Link from 'next/link';

export function Work() {
  return (
    <Section
      id="work"
      title="Work"
      intro="Three backend systems built at BITCOLLAGE and one freelance site. Client code is private, so each case study covers the problem and what I built."
    >
      <ol className="divide-y divide-border border-y border-border">
        {projects.map((project) => {
          const href = `/projects/${project.slug}/`;
          return (
            <li
              key={project.slug}
              className="grid gap-4 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
            >
              <div>
                <p className="text-sm text-muted-foreground">{project.context}</p>
                <h3 className="mt-1 text-xl sm:text-2xl">
                  <Link
                    href={href}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="secondary">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:pt-7">
                <Link
                  href={href}
                  className="text-sm text-primary underline underline-offset-4 hover:text-foreground"
                >
                  Case study
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
