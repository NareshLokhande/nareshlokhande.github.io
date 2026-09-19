import { ProjectDetail } from '@/components/project-detail';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';
import { projects } from '@/lib/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Page not found' };

  const url = `${SITE_URL}/projects/${slug}/`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title: project.title,
      description: project.summary,
      locale: 'en_US',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      creator: TWITTER_HANDLE,
      title: project.title,
      description: project.summary,
      images: ['/og-image.png'],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  return (
    <ProjectDetail
      project={projects[index]}
      next={projects[(index + 1) % projects.length]}
    />
  );
}
