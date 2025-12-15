'use client';

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
import { EMAIL_URL } from '@/lib/constants';
import { projects } from '@/lib/projects';
import { ExternalLink, Github, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export function Projects() {
  const handleCodeRequest = (projectTitle: string) => {
    // Open email client with pre-filled subject and body
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
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of projects I&apos;ve worked on, showcasing my skills
            and experience in web development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="border-border/50 flex flex-col transition-all hover:shadow-md"
            >
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
                    {project.isPrivate && project.organization && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Built for {project.organization}
                      </p>
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
                {project.github ? (
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
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {project.isPrivate ? 'Internal Demo' : 'Live Demo'}
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
          ))}
        </div>
      </div>
    </section>
  );
}
