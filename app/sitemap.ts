import { SITE_URL } from '@/lib/constants';
import { projects } from '@/lib/projects';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}/` })),
  ];
}
