'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getSkillHint } from '@/lib/skill-hints';
import { Cloud, Database, Lock, Server, Sparkles, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

type Proficiency = 'daily' | 'comfortable' | 'familiar';

interface Skill {
  name: string;
  level: Proficiency;
}

interface SkillCategory {
  id: string;
  icon: typeof Sparkles;
  title: string;
  color: string;
  skills: Skill[];
}

const proficiencyValue: Record<Proficiency, number> = {
  daily: 90,
  comfortable: 70,
  familiar: 45,
};

const skillCategories: SkillCategory[] = [
  {
    id: 'backend-core',
    icon: Server,
    title: 'Backend and Core',
    color: 'text-green-600 dark:text-green-400',
    skills: [
      { name: 'Java', level: 'daily' },
      { name: 'Spring Boot', level: 'daily' },
      { name: 'Spring MVC', level: 'comfortable' },
      { name: 'Hibernate and JPA', level: 'comfortable' },
      { name: 'JDBC and REST APIs', level: 'comfortable' },
    ],
  },
  {
    id: 'databases',
    icon: Database,
    title: 'Databases',
    color: 'text-orange-600 dark:text-orange-400',
    skills: [
      { name: 'SQL Server', level: 'daily' },
      { name: 'MySQL', level: 'comfortable' },
      { name: 'RDBMS data modeling', level: 'comfortable' },
      { name: 'Liquibase migrations', level: 'daily' },
      { name: 'Query and validation optimization', level: 'comfortable' },
    ],
  },
  {
    id: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud and DevOps',
    color: 'text-blue-600 dark:text-blue-400',
    skills: [
      { name: 'Azure App Service', level: 'daily' },
      { name: 'Azure Blob Storage', level: 'comfortable' },
      { name: 'GitHub Actions CI/CD', level: 'comfortable' },
      { name: 'Docker', level: 'comfortable' },
      { name: 'Maven', level: 'comfortable' },
    ],
  },
  {
    id: 'security-features',
    icon: Lock,
    title: 'Security and Features',
    color: 'text-red-600 dark:text-red-400',
    skills: [
      { name: 'JWT authentication', level: 'daily' },
      { name: 'OTP verification', level: 'comfortable' },
      { name: 'Audit logging', level: 'daily' },
      { name: 'Soft deletes', level: 'daily' },
      { name: 'Role-based authorization', level: 'comfortable' },
    ],
  },
  {
    id: 'architecture',
    icon: Wrench,
    title: 'Architecture and Systems',
    color: 'text-indigo-600 dark:text-indigo-400',
    skills: [
      { name: 'Design patterns', level: 'comfortable' },
      { name: 'Clean architecture', level: 'comfortable' },
      { name: 'Layered architecture', level: 'comfortable' },
      { name: 'Multi-tenant service design', level: 'familiar' },
      { name: 'Event-driven workflows', level: 'familiar' },
    ],
  },
  {
    id: 'frontend-secondary',
    icon: Sparkles,
    title: 'Frontend (secondary)',
    color: 'text-purple-600 dark:text-purple-400',
    skills: [
      { name: 'Next.js', level: 'comfortable' },
      { name: 'React', level: 'comfortable' },
      { name: 'TypeScript', level: 'comfortable' },
      { name: 'Tailwind CSS', level: 'comfortable' },
      { name: 'Frontend integration for backend APIs', level: 'familiar' },
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

function SkillList({ skills }: { skills: Skill[] }) {
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ul className="space-y-5">
      {skills.map((skill) => {
        const hint = getSkillHint(skill.name);
        const value = proficiencyValue[skill.level];
        const displayValue = barsReady ? value : 0;

        return (
          <li key={skill.name} className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              {hint ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-left text-sm text-muted-foreground underline decoration-dotted decoration-muted-foreground/40 underline-offset-2">
                      {skill.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    {hint}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {skill.name}
                </span>
              )}
              <Badge
                variant="outline"
                className={`h-5 shrink-0 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide ${levelStyles[skill.level].className}`}
              >
                {levelStyles[skill.level].label}
              </Badge>
            </div>
            <Progress
              value={displayValue}
              className="h-1.5 transition-all duration-700 ease-out"
              aria-label={`${skill.name}: ${levelStyles[skill.level].label}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  return (
    <section id="skills" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Technologies from my resume, grouped by backend core strengths and
            production experience.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mb-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
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
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="gap-1.5 px-3 py-2 text-xs sm:text-sm"
                  >
                    <Icon className={`h-3.5 w-3.5 ${category.color}`} />
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">
                      {category.title.split(' ')[0]}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="rounded-lg border border-border/50 bg-card p-6 shadow-sm"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon
                      className={`h-5 w-5 ${category.color}`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <SkillList
                  key={`${category.id}-${activeTab}`}
                  skills={category.skills}
                />
              </TabsContent>
            ))}
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}
