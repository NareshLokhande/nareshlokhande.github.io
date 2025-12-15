'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'JavaScript',
      'HTML/CSS',
    ],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Java',
      'Express',
      'REST APIs',
      'MSSQL',
      'PostgreSQL',
    ],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'CI/CD', 'Azure', 'Linux'],
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
            Technologies and tools I work with to build amazing applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((category) => (
            <Card key={category.category} className="border-border/50">
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
