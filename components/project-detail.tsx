'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EMAIL_URL } from '@/lib/constants';
import { Project } from '@/lib/projects';
import { ExternalLink, Github, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState('preview');

  const handleCodeRequest = () => {
    const subject = encodeURIComponent(`Code Access Request: ${project.title}`);
    const body = encodeURIComponent(
      `Hi, I'm interested in viewing the code for ${project.title}. Could you please provide access or more information?`,
    );
    window.open(
      `mailto:${EMAIL_URL}?subject=${subject}&body=${body}`,
      '_blank',
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {project.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
              {project.isPrivate && project.organization && (
                <p className="text-sm text-muted-foreground">
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

          <p className="mb-4 text-lg text-muted-foreground">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github ? (
              <Button asChild variant="outline" size="sm">
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            ) : project.isPrivate ? (
              <Button variant="outline" size="sm" onClick={handleCodeRequest}>
                <Mail className="mr-2 h-4 w-4" />
                Request Code Access
              </Button>
            ) : null}

            {project.demo ? (
              <Button asChild size="sm">
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {project.isPrivate ? 'View Internal Demo' : 'View Live Demo'}
                </Link>
              </Button>
            ) : project.isPrivate ? (
              <Button variant="outline" size="sm" onClick={handleCodeRequest}>
                <Mail className="mr-2 h-4 w-4" />
                Request Demo Access
              </Button>
            ) : null}
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  {project.demo
                    ? 'Interactive preview of the application'
                    : 'Preview not available for this project'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.demo ? (
                  <div className="relative w-full overflow-hidden rounded-lg border bg-muted">
                    <div className="flex h-12 items-center gap-2 border-b bg-muted px-4">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
                        {project.demo}
                      </div>
                    </div>
                    <iframe
                      src={project.demo}
                      className="h-[600px] w-full border-0"
                      title={`${project.title} Preview`}
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  <div className="flex h-[600px] items-center justify-center rounded-lg border bg-muted">
                    <p className="text-muted-foreground">
                      Preview not available.{' '}
                      {project.isPrivate && 'Contact for demo access.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {project.longDescription || project.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {project.features && project.features.length > 0 && (
                <Card className="border-border/50 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="mt-6">
            {project.codeSnippets && project.codeSnippets.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {project.codeSnippets.map((snippet, index) => (
                  <AccordionItem key={index} value={`snippet-${index}`}>
                    <AccordionTrigger className="text-left">
                      {snippet.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="relative overflow-hidden rounded-lg border bg-muted">
                        <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            {snippet.language}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => {
                              navigator.clipboard.writeText(snippet.code);
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                        <pre className="overflow-x-auto p-4 text-sm">
                          <code className="font-mono">{snippet.code}</code>
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : project.github ? (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                  <CardDescription>
                    View the complete source code on GitHub
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                  <CardDescription>
                    {project.isPrivate
                      ? 'This is a private repository. Contact to request access.'
                      : 'Code examples not available.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.isPrivate && (
                    <Button onClick={handleCodeRequest}>
                      <Mail className="mr-2 h-4 w-4" />
                      Request Code Access
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
