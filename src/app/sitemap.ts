import type { MetadataRoute } from 'next';
import { getAllDocs } from '@/lib/docs';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocs();
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docs.map((doc) => ({
      url: `${SITE_URL}/docs/${doc.slug}`,
      lastModified: doc.meta.lastUpdated ? new Date(doc.meta.lastUpdated) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
