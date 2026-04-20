import 'server-only';
import { source } from './source';
import type { HandbookPageSummary } from './handbook-pages.shared';

export function getHandbookPages(): HandbookPageSummary[] {
  return source.getPages().map((page) => ({
    url: page.url,
    slug: page.slugs.join('/'),
    title: page.data.title,
    description: page.data.description ?? '',
    moduleId: page.slugs[0] ?? null,
    isMission: page.slugs.at(-1)?.startsWith('missao-') ?? false,
  }));
}
