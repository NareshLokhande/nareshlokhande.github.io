'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Zap } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description:
      'Writing maintainable, scalable, and well-documented code that stands the test of time.',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description:
      'Creating visually appealing interfaces that provide exceptional user experiences.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Optimizing applications for speed and efficiency to deliver lightning-fast experiences.',
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
            I&apos;m a passionate full stack developer with a love for creating
            innovative solutions and bringing ideas to life through code.
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
              With a strong foundation in both frontend and backend development,
              I specialize in building end-to-end web applications. My expertise
              spans modern JavaScript frameworks, cloud technologies, and best
              practices in software engineering.
            </p>
            <p>
              I&apos;m constantly learning and exploring new technologies to
              stay at the forefront of web development. When I&apos;m not
              coding, you can find me contributing to open-source projects,
              writing technical articles, or exploring the latest trends in
              tech.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
