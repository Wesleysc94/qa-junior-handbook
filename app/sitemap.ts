import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { getAbsoluteUrl } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => ({
    url: getAbsoluteUrl(page.url),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 0.9 : 0.7,
  }));

  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/docs'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...docsPages,
  ];
}
