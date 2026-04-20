'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  Brain,
  CheckCircle2,
  Clock3,
  ListChecks,
  type LucideIcon,
} from 'lucide-react';
import type { HandbookPageSummary } from '@/lib/handbook-pages.shared';
import {
  getBookmarkedChapterUrls,
  getIncorrectQuizChapterUrls,
  getLowConfidenceFlashcards,
  getMissionUrlsToReview,
  getReviewLaterChapterUrls,
  useProgressStore,
} from '@/lib/progress';

function ReviewSection({
  title,
  description,
  items,
  empty,
  icon: Icon,
}: {
  title: string;
  description: string;
  items: HandbookPageSummary[];
  empty: string;
  icon: LucideIcon;
}) {
  return (
    <section className="not-prose rounded-3xl border border-fd-border bg-fd-card/70 p-5">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0 text-[hsl(188_95%_53%)]" aria-hidden />
        <div>
          <p className="text-base font-semibold text-fd-foreground">{title}</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-fd-border px-4 py-4 text-sm text-fd-muted-foreground">
            {empty}
          </p>
        ) : (
          items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="rounded-2xl border border-fd-border bg-fd-background/45 px-4 py-4 transition hover:border-[hsl(188_95%_43%/0.45)]"
            >
              <p className="text-sm font-semibold text-fd-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-fd-muted-foreground">{item.description}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export function ReviewHub({ pages }: { pages: HandbookPageSummary[] }) {
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const reviewLater = useProgressStore((s) => s.reviewLater);
  const quizResults = useProgressStore((s) => s.quizResults);
  const flashcards = useProgressStore((s) => s.flashcards);
  const missionResults = useProgressStore((s) => s.missionResults);
  const lastVisitedChapter = useProgressStore((s) => s.lastVisitedChapter);
  const pageMap = new Map(pages.map((page) => [page.url, page]));
  const lastVisited = lastVisitedChapter ? pageMap.get(lastVisitedChapter) : undefined;
  const quizPages = getIncorrectQuizChapterUrls({ quizResults })
    .map((url) => pageMap.get(url))
    .filter(Boolean) as HandbookPageSummary[];
  const missionPages = getMissionUrlsToReview({ missionResults })
    .map((url) => pageMap.get(url))
    .filter(Boolean) as HandbookPageSummary[];
  const reviewLaterPages = getReviewLaterChapterUrls({ reviewLater })
    .map((url) => pageMap.get(url))
    .filter(Boolean) as HandbookPageSummary[];
  const bookmarkPages = getBookmarkedChapterUrls({ bookmarks })
    .map((url) => pageMap.get(url))
    .filter(Boolean) as HandbookPageSummary[];
  const lowConfidenceTerms = getLowConfidenceFlashcards({ flashcards });

  return (
    <div className="grid gap-6">
      <section className="not-prose rounded-3xl border border-fd-border bg-fd-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-fd-foreground">Hub de revisão pessoal</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Aqui entram os quizzes errados, missões incompletas, capítulos salvos e termos do glossário
              que ainda merecem repetição.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {lastVisited ? (
              <Link
                href={lastVisited.url}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
              >
                <Clock3 className="size-4" aria-hidden />
                Retomar última leitura
              </Link>
            ) : null}
            <Link
              href="/docs/como-usar"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[hsl(188_95%_48%)] px-4 py-2 text-sm font-semibold text-[hsl(224_71%_6%)] transition hover:bg-[hsl(188_95%_55%)]"
            >
              Organizar minha trilha
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReviewSection
          title="Quizzes para revisar"
          description="Capítulos em que a resposta final ainda saiu errada."
          items={quizPages}
          empty="Nenhum quiz pendente agora."
          icon={CheckCircle2}
        />
        <ReviewSection
          title="Missões guiadas"
          description="Missões iniciadas ou concluídas com espaço para uma segunda passada."
          items={missionPages}
          empty="Nenhuma missão precisa de reforço no momento."
          icon={ListChecks}
        />
        <ReviewSection
          title="Revisar depois"
          description="Capítulos que você marcou para voltar com mais calma."
          items={reviewLaterPages}
          empty="Nenhum capítulo marcado para revisar depois."
          icon={Clock3}
        />
        <ReviewSection
          title="Favoritos"
          description="Seus capítulos mais úteis para consulta rápida."
          items={bookmarkPages}
          empty="Você ainda não salvou capítulos como favoritos."
          icon={Bookmark}
        />
      </div>

      <section className="not-prose rounded-3xl border border-fd-border bg-fd-card/70 p-5">
        <div className="flex items-start gap-3">
          <Brain className="mt-0.5 size-5 shrink-0 text-[hsl(188_95%_53%)]" aria-hidden />
          <div>
            <p className="text-base font-semibold text-fd-foreground">Glossário para revisar</p>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              {lowConfidenceTerms.length > 0
                ? `${lowConfidenceTerms.length} termo(s) ficaram com baixa confiança.`
                : 'Seu glossário está estável agora.'}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-fd-muted-foreground">
            Termos mais frágeis: {lowConfidenceTerms.slice(0, 6).join(', ') || 'nenhum no momento'}.
          </p>
          <Link
            href="/docs/09-glossario/termos-tecnicos"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
          >
            Abrir glossário
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
