'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { projects } from '@/lib/projects';
import {
  Brain,
  Database,
  GitBranch,
  Lock,
  Server,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface Evidence {
  slug: string;
  label: string;
}

interface Principle {
  icon: typeof Brain;
  title: string;
  description: string;
  color: string;
  evidence: Evidence[];
}

const developmentPrinciples: Principle[] = [
  {
    icon: Brain,
    title: 'Understanding the problem first',
    description:
      'I start by understanding the actual business workflow, not just the screens or APIs. Before writing code, I identify core entities, user roles, edge cases, and failure paths so the solution matches real usage instead of assumptions.',
    color: 'text-blue-600 dark:text-blue-400',
    evidence: [
      { slug: 'edukacy', label: 'Edukacy multi-role signup' },
      { slug: '24tutors', label: '24Tutors scheduling flows' },
    ],
  },
  {
    icon: Sparkles,
    title: 'Frontend development (Next.js)',
    description:
      'I use Next.js with SSR where initial load, SEO, or authenticated data matters. I focus on predictable state, clean separation between UI and data-fetching, and avoiding common SSR pitfalls like hydration mismatches and navigation data loss.',
    color: 'text-purple-600 dark:text-purple-400',
    evidence: [
      { slug: '24tutors', label: '24Tutors SSR dashboards' },
      { slug: 'shivani-batra-clinic', label: 'Shivani Batra Clinic' },
    ],
  },
  {
    icon: Server,
    title: 'Backend & API design (Spring Boot)',
    description:
      'I design backend services around clear responsibilities and stable contracts. APIs are validated at boundaries, errors are consistent, and logic is kept modular so features can evolve without tightly coupling frontend and backend changes.',
    color: 'text-green-600 dark:text-green-400',
    evidence: [
      { slug: '24tutors', label: '24Tutors microservices' },
      { slug: 'edukacy', label: 'Edukacy assessment APIs' },
    ],
  },
  {
    icon: Database,
    title: 'Database & migrations',
    description:
      'I treat database schema as versioned code, not a one-time setup. I use Liquibase to manage migrations across environments, prevent schema drift, and ensure database changes are traceable, repeatable, and safe to deploy.',
    color: 'text-orange-600 dark:text-orange-400',
    evidence: [
      { slug: '24tutors', label: 'Liquibase on 24Tutors' },
      { slug: 'edukacy', label: 'Schema evolution on Edukacy' },
    ],
  },
  {
    icon: Lock,
    title: 'Security & reliability mindset',
    description:
      'I design authentication and authorization early, especially for role-based systems. I pay close attention to session expiry, token handling, and access control to avoid security gaps that usually surface late in production.',
    color: 'text-red-600 dark:text-red-400',
    evidence: [
      { slug: '24tutors', label: 'JWT + OTP on 24Tutors' },
      { slug: 'edukacy', label: 'RBAC on Edukacy' },
    ],
  },
  {
    icon: GitBranch,
    title: 'Designing for change',
    description:
      'I assume requirements will change. I try to build systems where new roles, workflows, or integrations can be added with minimal refactoring by keeping logic extensible and avoiding hard-coded assumptions.',
    color: 'text-indigo-600 dark:text-indigo-400',
    evidence: [{ slug: 'edukacy', label: 'AI-ready hooks in Edukacy' }],
  },
];

function getProjectPreview(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return {
    title: project.title,
    description: project.description,
  };
}

export function HowIDevelop() {
  return (
    <section
      id="how-i-develop"
      className="min-h-screen bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How I Develop Software
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My approach to building robust, maintainable, and scalable
            applications.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground/80">
            These principles form a continuous development cycle where each
            phase informs and enhances the next.
          </p>
        </ScrollReveal>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developmentPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <ScrollReveal key={principle.title} delay={index * 60}>
                <Card className="group relative h-full border-border/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <span
                    className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <CardHeader className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon
                        className={`h-6 w-6 ${principle.color} transition-transform group-hover:scale-110`}
                      />
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                    {principle.evidence.length > 0 && (
                      <div className="flex flex-wrap gap-2 border-t border-border/40 pt-3">
                        <span className="w-full text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                          Seen in:
                        </span>
                        {principle.evidence.map((item) => {
                          const preview = getProjectPreview(item.slug);
                          const link = (
                            <Link
                              href={`/projects/${item.slug}`}
                              className="rounded-md border border-border/50 bg-muted/50 px-2 py-1 text-xs text-primary transition-colors hover:border-primary/30 hover:bg-primary/5 hover:underline"
                            >
                              {item.label}
                            </Link>
                          );

                          if (!preview) return <span key={item.slug}>{link}</span>;

                          return (
                            <Tooltip key={item.slug}>
                              <TooltipTrigger asChild>{link}</TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-medium">{preview.title}</p>
                                <p className="mt-1 text-muted-foreground">
                                  {preview.description}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
