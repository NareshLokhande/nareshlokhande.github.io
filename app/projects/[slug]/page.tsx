import { ProjectDetail } from '@/components/project-detail';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { projects } from '@/lib/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project not found',
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title: project.title,
      description: project.description,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
