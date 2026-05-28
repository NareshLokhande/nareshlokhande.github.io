'use client';

import { OrganizationLogo } from '@/components/organization-logo';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { EMAIL_URL } from '@/lib/constants';
import { getProjectOrganization, projects } from '@/lib/projects';
import { getTechHint } from '@/lib/tech-hints';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type CategoryFilter = 'all' | 'professional' | 'personal';

function isProfessionalProject(project: (typeof projects)[0]): boolean {
  return project.isPrivate === true && project.organizationKey !== undefined;
}

const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort();

function ProjectCard({
  project,
  handleCodeRequest,
}: {
  project: (typeof projects)[0];
  handleCodeRequest: (title: string) => void;
}) {
  const showCodeButton =
    (project.github && !project.isPrivate) || project.isPrivate;
  const showDemoButton =
    Boolean(project.demo) || (project.isPrivate && !project.demo);

  return (
    <Card className="group flex flex-col border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle>
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors hover:text-primary"
              >
                {project.title}
              </Link>
            </CardTitle>
            {project.isPrivate &&
              (project.organizationKey || project.organization) && (
                <div className="mt-2">
                  {(() => {
                    const org = getProjectOrganization(project);
                    if (org.name === 'BITCOLLAGE Consulting Services LLP') {
                      return (
                        <div className="flex items-center gap-1.5">
                          <OrganizationLogo
                            organization="BITCOLLAGE"
                            logo={org.logo}
                            website={org.website}
                            size="sm"
                          />
                          <span className="text-xs text-muted-foreground">
                            Consulting Services LLP
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div className="flex items-center gap-2">
                        {org.logo && (
                          <OrganizationLogo
                            organization={org.name}
                            logo={org.logo}
                            website={org.website}
                            size="sm"
                          />
                        )}
                        <p className="text-xs text-muted-foreground">
                          {org.website ? (
                            <Link
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium transition-colors hover:text-foreground"
                            >
                              {org.name}
                            </Link>
                          ) : (
                            org.name
                          )}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
          </div>
          {project.isPrivate && (
            <Badge variant="outline" className="shrink-0">
              <Lock className="mr-1 h-3 w-3" />
              Private
            </Badge>
          )}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => {
            const hint = getTechHint(tech);
            const badge = (
              <Badge key={tech} variant="secondary" className="cursor-default">
                {tech}
              </Badge>
            );
            if (!hint) return badge;
            return (
              <Tooltip key={tech}>
                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                <TooltipContent>{hint}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="col-span-2 w-full min-w-0"
        >
          <Link href={`/projects/${project.slug}`}>View Details</Link>
        </Button>
        {project.github && !project.isPrivate ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn('w-full min-w-0', !showDemoButton && 'col-span-2')}
          >
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4 shrink-0" />
              Code
            </Link>
          </Button>
        ) : project.isPrivate ? (
          <Button
            variant="outline"
            size="sm"
            className={cn('w-full min-w-0', !showDemoButton && 'col-span-2')}
            onClick={() => handleCodeRequest(project.title)}
          >
            <Mail className="mr-2 h-4 w-4 shrink-0" />
            Request Code
          </Button>
        ) : null}

        {project.demo ? (
          <Button
            asChild
            size="sm"
            className={cn('w-full min-w-0', !showCodeButton && 'col-span-2')}
          >
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
              {project.isPrivate ? 'Client Demo' : 'Live Demo'}
            </Link>
          </Button>
        ) : project.isPrivate ? (
          <Button
            variant="outline"
            size="sm"
            className={cn('w-full min-w-0', !showCodeButton && 'col-span-2')}
            onClick={() => handleCodeRequest(project.title)}
          >
            <Mail className="mr-2 h-4 w-4 shrink-0" />
            Request Demo
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

const categoryOptions: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'personal', label: 'Personal' },
];

export function Projects() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [activeTech, setActiveTech] = useState<string[]>([]);

  const handleCodeRequest = (projectTitle: string) => {
    const subject = encodeURIComponent(`Code Access Request: ${projectTitle}`);
    const body = encodeURIComponent(
      `Hi, I'm interested in viewing the code for ${projectTitle}. Could you please provide access or more information?`,
    );
    window.open(
      `mailto:${EMAIL_URL}?subject=${subject}&body=${body}`,
      '_blank',
    );
  };

  const toggleTech = (tech: string) => {
    setActiveTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const isPro = isProfessionalProject(project);
      if (categoryFilter === 'professional' && !isPro) return false;
      if (categoryFilter === 'personal' && isPro) return false;
      if (
        activeTech.length > 0 &&
        !activeTech.every((t) => project.technologies.includes(t))
      ) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, activeTech]);

  const professionalCount = projects.filter(isProfessionalProject).length;
  const personalCount = projects.length - professionalCount;

  return (
    <section
      id="projects"
      className="min-h-screen bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Projects & Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of professional projects and personal work showcasing
            my technical skills and experience in backend engineering.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryOptions.map((option) => (
              <Button
                key={option.id}
                type="button"
                size="sm"
                variant={categoryFilter === option.id ? 'default' : 'outline'}
                aria-pressed={categoryFilter === option.id}
                onClick={() => setCategoryFilter(option.id)}
              >
                {option.label}
                <span className="ml-1.5 text-xs opacity-70">
                  (
                  {option.id === 'all'
                    ? projects.length
                    : option.id === 'professional'
                      ? professionalCount
                      : personalCount}
                  )
                </span>
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tech:
            </span>
            {allTechnologies.map((tech) => (
              <Button
                key={tech}
                type="button"
                size="sm"
                variant={activeTech.includes(tech) ? 'secondary' : 'ghost'}
                className="h-7 px-2.5 text-xs"
                aria-pressed={activeTech.includes(tech)}
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </Button>
            ))}
            {activeTech.length > 0 && (
              <Button
                type="button"
                size="sm"
                variant="link"
                className="h-7 text-xs"
                onClick={() => setActiveTech([])}
              >
                Clear tech filters
              </Button>
            )}
          </div>
        </ScrollReveal>

        {filteredProjects.length === 0 ? (
          <ScrollReveal>
            <p className="py-16 text-center text-muted-foreground">
              No projects match the current filters. Try clearing tech filters or
              selecting a different category.
            </p>
          </ScrollReveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 60}>
                <ProjectCard
                  project={project}
                  handleCodeRequest={handleCodeRequest}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {categoryFilter === 'all' && activeTech.length === 0 && (
          <ScrollReveal delay={200} className="mt-16">
            <p className="text-center text-sm text-muted-foreground">
              <em>
                Professional work is shown to demonstrate technical
                responsibilities; IP belongs to respective clients. Use filters
                above to explore by type or stack.
              </em>
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
