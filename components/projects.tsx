'use client';

import { OrganizationLogo } from '@/components/organization-logo';
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
import { Separator } from '@/components/ui/separator';
import { EMAIL_URL } from '@/lib/constants';
import { getProjectOrganization, projects } from '@/lib/projects';
import { ExternalLink, Github, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

// Helper function to determine if a project is professional/client work
// Projects with organizationKey are considered professional/client work
function isProfessionalProject(project: (typeof projects)[0]): boolean {
  return project.isPrivate === true && project.organizationKey !== undefined;
}

// Separate projects into professional and personal
const professionalProjects = projects.filter(isProfessionalProject);
const personalProjects = projects.filter((p) => !isProfessionalProject(p));

// Reusable project card component
function ProjectCard({
  project,
  handleCodeRequest,
}: {
  project: (typeof projects)[0];
  handleCodeRequest: (title: string) => void;
}) {
  return (
    <Card className="border-border/50 flex flex-col transition-all hover:shadow-md">
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
                    // For BITCOLLAGE, the logo already shows the name, so just show the logo
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
                    // For other organizations, show logo + name or just name
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
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/projects/${project.slug}`}>View Details</Link>
        </Button>
        {/* Code Button */}
        {project.github && !project.isPrivate ? (
          <Button asChild variant="outline" size="sm">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
        ) : project.isPrivate ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCodeRequest(project.title)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Request Code
          </Button>
        ) : null}

        {/* Demo Button */}
        {project.demo ? (
          <Button asChild size="sm">
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              {project.isPrivate ? 'Client Demo' : 'Live Demo'}
            </Link>
          </Button>
        ) : project.isPrivate ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCodeRequest(project.title)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Request Demo
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
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

  return (
    <section
      id="projects"
      className="min-h-screen bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Main Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Projects & Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of professional projects and personal work showcasing
            my technical skills and experience in full-stack development.
          </p>
        </div>

        {/* Professional Projects Section */}
        {professionalProjects.length > 0 && (
          <div className="mb-24">
            <div className="mb-8">
              <h3 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
                Professional Experience & Client Work
              </h3>
              <p className="text-sm text-muted-foreground">
                <em>
                  Projects developed during my professional tenure. Intellectual
                  property belongs to respective clients/organizations. Shown
                  here to demonstrate technical responsibilities and system
                  design experience.
                </em>
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {professionalProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  handleCodeRequest={handleCodeRequest}
                />
              ))}
            </div>
          </div>
        )}

        {/* Separator */}
        {professionalProjects.length > 0 && personalProjects.length > 0 && (
          <Separator className="my-16" />
        )}

        {/* Personal Projects Section */}
        {personalProjects.length > 0 && (
          <div>
            <div className="mb-8">
              <h3 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
                Personal & Exploratory Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Personal projects, open-source contributions, and experimental
                work demonstrating my passion for building innovative solutions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {personalProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  handleCodeRequest={handleCodeRequest}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
