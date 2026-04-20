import type { MetadataRoute } from 'next';
import { getAbsoluteUrl } from '@/lib/shared';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/docs', '/docs/'],
    },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: getAbsoluteUrl('/'),
  };
}
