'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Zap } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Production-grade engineering',
    description:
      'Writing modular, well-tested code that survives schema changes, scale-ups, and on-call shifts.',
  },
  {
    icon: Palette,
    title: 'End-to-end ownership',
    description:
      'From Liquibase migrations to Spring Boot services to Next.js dashboards — I ship the whole slice.',
  },
  {
    icon: Zap,
    title: 'Pragmatic delivery',
    description:
      'Right tool for the job, not the trendiest. I optimize for clarity, reliability, and time-to-feedback.',
  },
];

export function About() {
  return (
    <section id="about" className="min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Full Stack Developer at BITCOLLAGE, building education and tutoring
            platforms with Spring Boot, Next.js, and Azure.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/50">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-border/50">
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
      </div>
    </section>
  );
}
