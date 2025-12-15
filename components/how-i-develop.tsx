'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Brain,
  Database,
  GitBranch,
  Lock,
  Server,
  Sparkles,
} from 'lucide-react';

const developmentPrinciples = [
  {
    icon: Brain,
    title: 'Understanding the problem first',
    description:
      'I start by understanding the actual business workflow, not just the screens or APIs. Before writing code, I identify core entities, user roles, edge cases, and failure paths so the solution matches real usage instead of assumptions.',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Sparkles,
    title: 'Frontend development (Next.js)',
    description:
      'I use Next.js with SSR where initial load, SEO, or authenticated data matters. I focus on predictable state, clean separation between UI and data-fetching, and avoiding common SSR pitfalls like hydration mismatches and navigation data loss.',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Server,
    title: 'Backend & API design (Spring Boot)',
    description:
      'I design backend services around clear responsibilities and stable contracts. APIs are validated at boundaries, errors are consistent, and logic is kept modular so features can evolve without tightly coupling frontend and backend changes.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    icon: Database,
    title: 'Database & migrations',
    description:
      'I treat database schema as versioned code, not a one-time setup. I use Liquibase to manage migrations across environments, prevent schema drift, and ensure database changes are traceable, repeatable, and safe to deploy.',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
  },
  {
    icon: Lock,
    title: 'Security & reliability mindset',
    description:
      'I design authentication and authorization early, especially for role-based systems. I pay close attention to session expiry, token handling, and access control to avoid security gaps that usually surface late in production.',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: GitBranch,
    title: 'Designing for change',
    description:
      'I assume requirements will change. I try to build systems where new roles, workflows, or integrations can be added with minimal refactoring by keeping logic extensible and avoiding hard-coded assumptions.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
];

export function HowIDevelop() {
  return (
    <section
      id="how-i-develop"
      className="min-h-screen bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How I Develop Software
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My approach to building robust, maintainable, and scalable
            applications.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground/80">
            These principles form a continuous development cycle where each
            phase informs and enhances the next, creating a holistic approach to
            software engineering.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Flow Lines - Desktop */}
          <div className="absolute inset-0 hidden lg:block">
            {/* Horizontal line from card 1 to 2 */}
            <div className="absolute left-[33.33%] top-1/2 h-0.5 w-[16.66%] -translate-y-1/2 bg-grliadient-to-r from-blue-500/30 via-purple-500/30 to-transparent" />
            {/* Horizontal line from card 2 to 3 */}
            <div className="absolute left-[50%] top-1/2 h-0.5 w-[16.66%] -translate-y-1/2 bg-linear-to-r from-purple-500/30 via-green-500/30 to-transparent" />
            {/* Vertical line from card 3 to 4 */}
            <div className="absolute left-1/2 top-[33.33%] h-[16.66%] w-0.5 -translate-x-1/2 bg-linear-to-b from-green-500/30 via-orange-500/30 to-transparent" />
            {/* Horizontal line from card 4 to 5 */}
            <div className="absolute left-[33.33%] top-[66.66%] h-0.5 w-[16.66%] -translate-y-1/2 bg-linear-to-r from-orange-500/30 via-red-500/30 to-transparent" />
            {/* Horizontal line from card 5 to 6 */}
            <div className="absolute left-[50%] top-[66.66%] h-0.5 w-[16.66%] -translate-y-1/2 bg-linear-to-r from-red-500/30 via-indigo-500/30 to-transparent" />
            {/* Vertical line from card 6 back to 1 (cycle) */}
            <div className="absolute left-[66.66%] top-[66.66%] h-[33.33%] w-0.5 bg-linear-to-b from-indigo-500/30 via-indigo-500/20 to-blue-500/20" />
            <div className="absolute left-0 top-[66.66%] h-0.5 w-[33.33%] -translate-y-1/2 bg-linear-to-r from-indigo-500/20 via-blue-500/20 to-blue-500/30" />
          </div>

          {/* Mobile/Tablet Flow Lines */}
          <div className="absolute inset-0 block lg:hidden">
            {/* Row 1: Card 1 to 2 */}
            <div className="absolute left-1/2 top-[16.66%] h-0.5 w-1/2 -translate-y-1/2 bg-linear-to-r from-blue-500/30 via-purple-500/30 to-transparent md:left-[33.33%] md:w-[16.66%]" />
            {/* Row 2: Card 3 to 4 */}
            <div className="absolute left-1/2 top-[50%] h-0.5 w-1/2 -translate-y-1/2 bg-linear-to-r from-green-500/30 via-orange-500/30 to-transparent md:left-[33.33%] md:w-[16.66%]" />
            {/* Row 3: Card 5 to 6 */}
            <div className="absolute left-1/2 top-[83.33%] h-0.5 w-1/2 -translate-y-1/2 bg-linear-to-r from-red-500/30 via-indigo-500/30 to-transparent md:left-[33.33%] md:w-[16.66%]" />
            {/* Vertical connections between rows */}
            <div className="absolute left-1/2 top-[33.33%] h-[16.66%] w-0.5 -translate-x-1/2 bg-linear-to-b from-purple-500/30 via-green-500/30 to-transparent md:hidden" />
            <div className="absolute left-1/2 top-[66.66%] h-[16.66%] w-0.5 -translate-x-1/2 bg-linear-to-b from-orange-500/30 via-red-500/30 to-transparent md:hidden" />
          </div>

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developmentPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card
                  key={index}
                  className="group border-border/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  <CardHeader>
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
                    <p className="text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
