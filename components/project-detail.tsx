'use client';

import { OrganizationLogo } from '@/components/organization-logo';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EMAIL_URL } from '@/lib/constants';
import { getProjectOrganization, Project } from '@/lib/projects';
import { ExternalLink, Github, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState('preview');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detect X-Frame-Options blocking immediately
  useEffect(() => {
    if (!project.demo || iframeError) return;

    const checkIframeBlocked = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        // Try to access contentWindow - will throw if blocked by X-Frame-Options
        const contentWindow = iframe.contentWindow;
        if (!contentWindow) {
          setIframeError(true);
          setIframeLoading(false);
          return;
        }

        // Try to access contentDocument - will throw if blocked
        try {
          const contentDoc = iframe.contentDocument;
          if (!contentDoc) {
            setIframeError(true);
            setIframeLoading(false);
            return;
          }

          // Check if document body exists and has content
          if (!contentDoc.body || contentDoc.body.children.length === 0) {
            // Iframe loaded but empty - might be blocked
            // Give it a bit more time, but set error if still empty
            setTimeout(() => {
              if (iframeRef.current) {
                try {
                  const doc = iframeRef.current.contentDocument;
                  if (!doc || !doc.body || doc.body.children.length === 0) {
                    setIframeError(true);
                    setIframeLoading(false);
                  }
                } catch {
                  setIframeError(true);
                  setIframeLoading(false);
                }
              }
            }, 2000);
          }
        } catch {
          // X-Frame-Options blocked - this is expected
          setIframeError(true);
          setIframeLoading(false);
        }
      } catch {
        // X-Frame-Options or CSP blocked
        setIframeError(true);
        setIframeLoading(false);
      }
    };

    // Check immediately and then periodically until error is detected
    const immediateCheck = setTimeout(checkIframeBlocked, 800);
    const periodicCheck = setInterval(checkIframeBlocked, 1500);

    return () => {
      clearTimeout(immediateCheck);
      clearInterval(periodicCheck);
    };
  }, [project.demo, iframeError]);

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
              {project.isPrivate &&
                (project.organizationKey || project.organization) && (
                  <div className="mt-2 space-y-1">
                    {(() => {
                      const org = getProjectOrganization(project);
                      // For BITCOLLAGE, the logo already shows the name
                      const isBitcollage =
                        org.name === 'BITCOLLAGE Consulting Services LLP';
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            {isBitcollage ? (
                              <>
                                <OrganizationLogo
                                  organization="BITCOLLAGE"
                                  logo={org.logo}
                                  website={org.website}
                                  size="md"
                                />
                                <span className="text-sm text-muted-foreground">
                                  Consulting Services LLP
                                </span>
                              </>
                            ) : (
                              <>
                                {org.logo && (
                                  <OrganizationLogo
                                    organization={org.name}
                                    logo={org.logo}
                                    website={org.website}
                                    size="md"
                                  />
                                )}
                                <p className="text-sm text-muted-foreground">
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
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground/70 italic">
                            Developed as client work. Intellectual property
                            belongs to the client/organization.
                          </p>
                        </>
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

          <p className="mb-4 text-lg text-muted-foreground">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github && !project.isPrivate ? (
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
                  {project.isPrivate ? 'View Client Demo' : 'View Live Demo'}
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
                    {iframeLoading && !iframeError && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
                        <div className="space-y-3 text-center">
                          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    )}
                    {iframeError ? (
                      <div className="flex h-[600px] flex-col items-center justify-center bg-muted p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted-foreground/10 p-4">
                          <ExternalLink className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">
                          Preview Unavailable
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-muted-foreground">
                          This site cannot be embedded in an iframe due to
                          X-Frame-Options security restrictions. Click the
                          button below to view the live demo in a new tab.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Button asChild size="lg">
                            <Link
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open Live Demo
                            </Link>
                          </Button>
                          {project.github && (
                            <Button asChild variant="outline" size="lg">
                              <Link
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                View Source Code
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <iframe
                        ref={iframeRef}
                        src={project.demo}
                        className="h-[600px] w-full border-0 transition-opacity duration-300"
                        title={`${project.title} Preview`}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
                        onLoad={() => {
                          // When iframe "loads", check if it's actually blocked
                          setTimeout(() => {
                            const iframe = iframeRef.current;
                            if (!iframe) {
                              setIframeError(true);
                              setIframeLoading(false);
                              return;
                            }

                            try {
                              // Try to access contentWindow - will throw if X-Frame-Options blocks
                              const contentWindow = iframe.contentWindow;
                              if (!contentWindow) {
                                setIframeError(true);
                                setIframeLoading(false);
                                return;
                              }

                              // Try to access contentDocument
                              try {
                                const contentDoc = iframe.contentDocument;
                                if (!contentDoc || !contentDoc.body) {
                                  // Iframe loaded but has no content (likely blocked)
                                  setIframeError(true);
                                  setIframeLoading(false);
                                  return;
                                }

                                // Successfully loaded
                                setIframeLoading(false);
                              } catch {
                                // X-Frame-Options blocked
                                setIframeError(true);
                                setIframeLoading(false);
                              }
                            } catch {
                              // X-Frame-Options blocked
                              setIframeError(true);
                              setIframeLoading(false);
                            }
                          }, 500);
                        }}
                        onError={() => {
                          setIframeLoading(false);
                          setIframeError(true);
                        }}
                        style={{
                          opacity: iframeLoading && !iframeError ? 0 : 1,
                        }}
                      />
                    )}
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
            ) : project.github && !project.isPrivate ? (
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
            ) : project.isPrivate ? (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                  <CardDescription>
                    This is a private repository. Contact to request access.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleCodeRequest}>
                    <Mail className="mr-2 h-4 w-4" />
                    Request Code Access
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                  <CardDescription>
                    Code examples not available.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
