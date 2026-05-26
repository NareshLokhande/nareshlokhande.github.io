'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { careerTimeline } from '@/lib/timeline';
import { ChevronDown, Code, Palette, Zap } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: Code,
    title: 'Production-grade engineering',
    description:
      'Writing modular, well-tested code that survives schema changes, scale-ups, and on-call shifts.',
    extra:
      'I lean on typed contracts, migration reviews, and observability so production surprises are rare—not ignored.',
  },
  {
    icon: Palette,
    title: 'End-to-end ownership',
    description:
      'From Liquibase migrations to Spring Boot services to Next.js dashboards — I ship the whole slice.',
    extra:
      'That means I can trace a bug from the UI through the API to the database and fix it without handoffs.',
  },
  {
    icon: Zap,
    title: 'Pragmatic delivery',
    description:
      'Right tool for the job, not the trendiest. I optimize for clarity, reliability, and time-to-feedback.',
    extra:
      'I ship thin vertical slices early, validate with stakeholders, and harden only what the product actually needs.',
  },
];

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof features)[0];
  delay: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = feature.icon;

  return (
    <ScrollReveal delay={delay}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <Card className="border-border/50 transition-all hover:shadow-md">
          <CardHeader>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CollapsibleTrigger className="flex w-full items-start justify-between gap-2 text-left">
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </CollapsibleTrigger>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">{feature.description}</p>
            <CollapsibleContent>
              <p className="border-t border-border/40 pt-3 text-sm text-muted-foreground">
                {feature.extra}
              </p>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </ScrollReveal>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Full Stack Developer at BITCOLLAGE, building education and tutoring
            platforms with Spring Boot, Next.js, and Azure.
          </p>
        </ScrollReveal>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              delay={index * 80}
            />
          ))}
        </div>

        <ScrollReveal delay={100}>
          <Card className="mb-16 border-border/50">
            <CardHeader>
              <CardTitle>My Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                I work across the full stack — Java/Spring Boot on the backend,
                Next.js (App Router, SSR) on the frontend, SQL Server with
                Liquibase for data, and Azure for deployment. At BITCOLLAGE, I
                ship client platforms end-to-end: designing microservice
                boundaries, building role-based dashboards, and managing schema
                evolution across environments.
              </p>
              <p>
                I care about the unglamorous parts of software — audit trails,
                clean API contracts, predictable migrations, and security
                boundaries that hold up under load. I&apos;m currently going
                deeper on distributed-systems patterns and exploring how AI tools
                fit into product engineering workflows.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <h3 className="mb-8 text-center text-2xl font-bold tracking-tight">
            Career highlights
          </h3>
          <ol className="relative mx-auto max-w-2xl border-l border-border/60 pl-8">
            {careerTimeline.map((milestone, index) => (
              <li key={milestone.title} className="relative mb-10 last:mb-0">
                <span
                  className="absolute -left-[2.125rem] top-1.5 flex h-3 w-3 rounded-full bg-primary ring-4 ring-background"
                  aria-hidden
                />
                <ScrollReveal delay={index * 100}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {milestone.period}
                  </p>
                  <h4 className="mt-1 font-semibold text-foreground">
                    {milestone.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
