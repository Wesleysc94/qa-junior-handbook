'use client';

import Link from 'next/link';
import { ArrowRight, BookMarked, Clock3, ListChecks, Smartphone } from 'lucide-react';
import type { HandbookPageSummary } from '@/lib/handbook-pages.shared';
import { HANDBOOK_MODULES } from '@/lib/modules';
import {
  getIncorrectQuizChapterUrls,
  getLowConfidenceFlashcards,
  getMissionUrlsToReview,
  getReviewLaterChapterUrls,
  useProgressStore,
} from '@/lib/progress';

export function StudyDashboard({ pages }: { pages: HandbookPageSummary[] }) {
  const lastVisitedChapter = useProgressStore((s) => s.lastVisitedChapter);
  const missionResults = useProgressStore((s) => s.missionResults);
  const quizResults = useProgressStore((s) => s.quizResults);
  const flashcards = useProgressStore((s) => s.flashcards);
  const reviewLater = useProgressStore((s) => s.reviewLater);
  const pageMap = new Map(pages.map((page) => [page.url, page]));
  const lastVisitedPage = lastVisitedChapter ? pageMap.get(lastVisitedChapter) : undefined;
  const defaultPage = pageMap.get('/docs');
  const resolvedContinuePage = lastVisitedPage ?? defaultPage;
  const reviewCount =
    new Set([
      ...getIncorrectQuizChapterUrls({ quizResults }),
      ...getMissionUrlsToReview({ missionResults }),
      ...getReviewLaterChapterUrls({ reviewLater }),
      ...(getLowConfidenceFlashcards({ flashcards }).length
        ? ['/docs/09-glossario/termos-tecnicos']
        : []),
    ]).size;
  const missionInProgress = Object.entries(missionResults)
    .filter(([, mission]) => Object.keys(mission.steps).length > 0 && !mission.completed)
    .map(([missionUrl]) => pageMap.get(missionUrl))
    .filter(Boolean)
    .slice(0, 2) as HandbookPageSummary[];
  const fallbackMission = HANDBOOK_MODULES.find((module) => module.missionSlug);

  return (
    <section className="border-b border-fd-border bg-fd-card/30 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
              Estudar com continuidade
            </h2>
            <p className="mt-2 max-w-2xl text-fd-muted-foreground">
              Tudo fica salvo no navegador: última leitura, fila de revisão, favoritos e missões que
              você começou no celular.
            </p>
          </div>
          <Link
            href="/docs/como-usar"
            className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground underline-offset-4 hover:text-[hsl(188_95%_53%)] hover:underline"
          >
            <Smartphone className="size-4" aria-hidden />
            Ver trilha pessoal
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href={resolvedContinuePage?.url ?? '/docs'}
            className="rounded-3xl border border-fd-border bg-fd-background/60 p-5 transition hover:border-[hsl(188_95%_43%/0.45)]"
            data-testid="continue-learning-card"
          >
            <BookMarked className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
            <p className="mt-4 text-sm font-semibold text-fd-foreground">Continuar estudando</p>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              {resolvedContinuePage
                ? `Retome de onde parou em "${resolvedContinuePage.title}".`
                : 'Abra a introdução e comece a trilha pelo ritmo que fizer sentido hoje.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[hsl(188_95%_48%)]">
              Retomar
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>

          <Link
            href="/docs/revisao"
            className="rounded-3xl border border-fd-border bg-fd-background/60 p-5 transition hover:border-[hsl(188_95%_43%/0.45)]"
            data-testid="review-today-card"
          >
            <Clock3 className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
            <p className="mt-4 text-sm font-semibold text-fd-foreground">Revisar hoje</p>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              {reviewCount > 0
                ? `${reviewCount} itens já entraram na sua fila inteligente de revisão.`
                : 'Sua fila está limpa. Use o hub para marcar capítulos e revisar o glossário.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[hsl(188_95%_48%)]">
              Abrir revisão
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>

          <Link
            href={missionInProgress[0]?.url ?? (fallbackMission ? `/docs/${fallbackMission.missionSlug}` : '/docs')}
            className="rounded-3xl border border-fd-border bg-fd-background/60 p-5 transition hover:border-[hsl(188_95%_43%/0.45)]"
            data-testid="missions-progress-card"
          >
            <ListChecks className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
            <p className="mt-4 text-sm font-semibold text-fd-foreground">Missões em andamento</p>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              {missionInProgress.length > 0
                ? `Você já iniciou ${missionInProgress.length} missão(ões). A próxima mais quente é "${missionInProgress[0].title}".`
                : 'As missões ainda não começaram. Cada módulo agora fecha com um caso guiado de decisão.'}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[hsl(188_95%_48%)]">
              Abrir missão
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
