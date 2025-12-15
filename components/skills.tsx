'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Database, Lock, Server, Sparkles, Wrench } from 'lucide-react';

const skillCategories = [
  {
    icon: Sparkles,
    title: 'Frontend',
    color: 'text-purple-600 dark:text-purple-400',
    skills: [
      'Next.js (App Router, SSR, routing, data fetching)',
      'React, TypeScript',
      'Context-based state management',
      'Tailwind CSS',
      'Client–server rendering strategies',
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'text-green-600 dark:text-green-400',
    skills: [
      'Java, Spring Boot',
      'REST API design',
      'Modular architecture with microservices readiness',
      'Spring Security (JWT, role-based access)',
      'Event-driven concepts (RabbitMQ – basic usage)',
    ],
  },
  {
    icon: Database,
    title: 'Database & Data',
    color: 'text-orange-600 dark:text-orange-400',
    skills: [
      'SQL Server',
      'Relational data modeling',
      'Liquibase (schema migrations & versioning)',
      'Environment-safe database changes',
      'Query optimization & integrity constraints',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Deployment',
    color: 'text-blue-600 dark:text-blue-400',
    skills: [
      'Azure App Service',
      'Azure Blob Storage',
      'Environment-based configuration',
      'CI/CD basics (GitHub Actions)',
      'Production debugging & logs',
      'Application configuration & secrets management',
    ],
  },
  {
    icon: Lock,
    title: 'Security & Authentication',
    color: 'text-red-600 dark:text-red-400',
    skills: [
      'JWT-based authentication',
      'OTP verification flows (email)',
      'Session expiry & token refresh strategies',
      'Role-based access control (RBAC)',
      'Secure API boundary design',
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Engineering Practices',
    color: 'text-indigo-600 dark:text-indigo-400',
    skills: [
      'Clean API contracts',
      'Audit logging & soft deletes',
      'Debugging production issues',
      'Writing maintainable, extensible code',
      'Git & GitHub',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            These are the tools I&apos;ve used extensively in production
            systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="group border-border/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon
                      className={`h-6 w-6 ${category.color} transition-transform group-hover:scale-110`}
                    />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
                        <span className="leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
