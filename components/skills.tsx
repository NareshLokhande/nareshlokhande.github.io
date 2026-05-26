'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Database, Lock, Server, Sparkles, Wrench } from 'lucide-react';

type Proficiency = 'daily' | 'comfortable' | 'familiar';

interface Skill {
  name: string;
  level: Proficiency;
}

interface SkillCategory {
  icon: typeof Sparkles;
  title: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Sparkles,
    title: 'Frontend',
    color: 'text-purple-600 dark:text-purple-400',
    skills: [
      { name: 'Next.js (App Router, SSR, data fetching)', level: 'daily' },
      { name: 'React + TypeScript', level: 'daily' },
      { name: 'Tailwind CSS', level: 'daily' },
      { name: 'Context-based state management', level: 'comfortable' },
      { name: 'Client–server rendering strategies', level: 'comfortable' },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    color: 'text-green-600 dark:text-green-400',
    skills: [
      { name: 'Java, Spring Boot', level: 'daily' },
      { name: 'REST API design', level: 'daily' },
      { name: 'Modular / microservices architecture', level: 'comfortable' },
      { name: 'Spring Security (JWT, RBAC)', level: 'comfortable' },
      { name: 'Event-driven concepts (RabbitMQ)', level: 'familiar' },
    ],
  },
  {
    icon: Database,
    title: 'Database & Data',
    color: 'text-orange-600 dark:text-orange-400',
    skills: [
      { name: 'SQL Server', level: 'daily' },
      { name: 'Liquibase (schema migrations & versioning)', level: 'daily' },
      { name: 'Relational data modeling', level: 'comfortable' },
      { name: 'Query optimization & integrity constraints', level: 'comfortable' },
      { name: 'Environment-safe database changes', level: 'comfortable' },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Deployment',
    color: 'text-blue-600 dark:text-blue-400',
    skills: [
      { name: 'Azure App Service', level: 'daily' },
      { name: 'Azure Blob Storage', level: 'comfortable' },
      { name: 'CI/CD with GitHub Actions', level: 'comfortable' },
      { name: 'Environment-based configuration & secrets', level: 'comfortable' },
      { name: 'Production debugging & logs', level: 'comfortable' },
    ],
  },
  {
    icon: Lock,
    title: 'Security & Authentication',
    color: 'text-red-600 dark:text-red-400',
    skills: [
      { name: 'JWT-based authentication', level: 'daily' },
      { name: 'Role-based access control (RBAC)', level: 'daily' },
      { name: 'OTP / email verification flows', level: 'comfortable' },
      { name: 'Session expiry & token refresh', level: 'comfortable' },
      { name: 'Secure API boundary design', level: 'comfortable' },
    ],
  },
  {
    icon: Wrench,
    title: 'Engineering Practices',
    color: 'text-indigo-600 dark:text-indigo-400',
    skills: [
      { name: 'Clean API contracts', level: 'daily' },
      { name: 'Audit logging & soft deletes', level: 'daily' },
      { name: 'Git & GitHub workflows', level: 'daily' },
      { name: 'Debugging production issues', level: 'comfortable' },
      { name: 'Writing maintainable, extensible code', level: 'comfortable' },
    ],
  },
];

const levelStyles: Record<
  Proficiency,
  { label: string; className: string }
> = {
  daily: {
    label: 'Daily',
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  comfortable: {
    label: 'Comfortable',
    className:
      'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  },
  familiar: {
    label: 'Familiar',
    className:
      'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
};

export function Skills() {
  return (
    <section id="skills" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Tools I&apos;ve used in production, grouped by how often I reach for
            them.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
          {(Object.keys(levelStyles) as Proficiency[]).map((key) => (
            <span key={key} className="flex items-center gap-2">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${levelStyles[key].className.split(' ')[1]}`}
              />
              <span className="text-muted-foreground">
                {levelStyles[key].label}
              </span>
            </span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="group gap-0 border-border/50 py-0 transition-all hover:shadow-md hover:shadow-primary/5"
              >
                <CardHeader className="flex flex-row items-center gap-2.5 space-y-0 px-4 pb-2 pt-3.5">
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon
                      className={`h-4 w-4 ${category.color} transition-transform group-hover:scale-105`}
                    />
                  </div>
                  <CardTitle className="text-base">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3.5 pt-0">
                  <ul className="space-y-1.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0.5"
                      >
                        <span className="text-xs leading-snug text-muted-foreground">
                          {skill.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={`h-5 shrink-0 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide ${levelStyles[skill.level].className}`}
                        >
                          {levelStyles[skill.level].label}
                        </Badge>
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
