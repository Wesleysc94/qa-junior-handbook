'use client';

import Link from 'next/link';
import { startTransition } from 'react';
import { Bookmark, BookmarkCheck, Clock3, ExternalLink, PencilLine } from 'lucide-react';
import { getGitHubFileUrl } from '@/lib/shared';
import { useProgressStore } from '@/lib/progress';

interface ChapterActionsProps {
  chapterPath: string;
  filePath: string;
}

export function ChapterActions({ chapterPath, filePath }: ChapterActionsProps) {
  const bookmarked = useProgressStore((s) => !!s.bookmarks[chapterPath]);
  const reviewLater = useProgressStore((s) => !!s.reviewLater[chapterPath]);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const toggleReviewLater = useProgressStore((s) => s.toggleReviewLater);

  return (
    <section
      className="not-prose my-8 rounded-2xl border border-fd-border bg-fd-card/60 p-5"
      data-handbook-focus="hide"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fd-foreground">Salvar este capítulo para o seu ritmo</p>
          <p className="text-sm text-fd-muted-foreground">
            Marque o que quer rever depois e, se precisar, abra o MDX original no GitHub como referência.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => startTransition(() => toggleBookmark(chapterPath))}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
            data-testid="bookmark-toggle"
          >
            {bookmarked ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
            {bookmarked ? 'Salvo' : 'Salvar capítulo'}
          </button>
          <button
            type="button"
            onClick={() => startTransition(() => toggleReviewLater(chapterPath))}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
            data-testid="review-later-toggle"
          >
            <Clock3 className="size-4" aria-hidden />
            {reviewLater ? 'Na fila de revisão' : 'Revisar depois'}
          </button>
          <Link
            href={getGitHubFileUrl(filePath)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[hsl(188_95%_48%)] px-4 py-2 text-sm font-semibold text-[hsl(224_71%_6%)] transition hover:bg-[hsl(188_95%_55%)]"
          >
            <PencilLine className="size-4" aria-hidden />
            Abrir MDX no GitHub
          </Link>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-fd-muted-foreground">
        <ExternalLink className="size-4 text-[hsl(188_95%_53%)]" aria-hidden />
        Nesta fase, o CTA foi simplificado para estudo pessoal: salvar, organizar revisão e consultar o repositório só quando fizer sentido.
      </div>
    </section>
  );
}
