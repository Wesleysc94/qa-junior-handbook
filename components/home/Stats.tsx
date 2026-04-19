import { QUIZ_COUNT_PLACEHOLDER, TOTAL_CHAPTERS } from '@/lib/checklist-registry';

export function Stats() {
  return (
    <section className="border-b border-fd-border bg-fd-card/40 px-4 py-12">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-fd-border bg-fd-background/60 p-5 text-center">
          <p className="text-3xl font-bold tabular-nums text-fd-foreground">{TOTAL_CHAPTERS}</p>
          <p className="text-sm text-fd-muted-foreground">Capítulos rastreados</p>
        </div>
        <div className="rounded-xl border border-fd-border bg-fd-background/60 p-5 text-center">
          <p className="text-3xl font-bold tabular-nums text-fd-foreground">{QUIZ_COUNT_PLACEHOLDER}+</p>
          <p className="text-sm text-fd-muted-foreground">Quizzes planejados</p>
        </div>
        <div className="rounded-xl border border-fd-border bg-fd-background/60 p-5 text-center">
          <p className="text-3xl font-bold tabular-nums text-fd-foreground">9</p>
          <p className="text-sm text-fd-muted-foreground">Módulos temáticos</p>
        </div>
      </div>
    </section>
  );
}
