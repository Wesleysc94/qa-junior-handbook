import { Target, Zap } from 'lucide-react';

interface CaseStudyHeroProps {
  title: string;
  scenario: string;
  goal: string;
  touchHint?: string;
}

export function CaseStudyHero({ title, scenario, goal, touchHint }: CaseStudyHeroProps) {
  return (
    <section className="not-prose my-6 rounded-3xl border border-fd-border bg-[linear-gradient(135deg,hsl(188_95%_53%/0.12),transparent_55%),linear-gradient(180deg,hsl(224_71%_8%),hsl(224_71%_5%))] p-5">
      <div className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-fd-border/70 bg-fd-card/40 px-3 py-1 text-xs font-medium text-fd-muted-foreground">
          <Zap className="size-3.5 text-[hsl(188_95%_53%)]" aria-hidden />
          Missão guiada mobile-first
        </div>
        <div>
          <p className="text-lg font-semibold text-fd-foreground">{title}</p>
          <p className="mt-2 text-sm text-fd-muted-foreground">{scenario}</p>
        </div>
        <div className="rounded-2xl border border-fd-border/70 bg-fd-background/45 p-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground">
            <Target className="size-4 text-[hsl(188_95%_53%)]" aria-hidden />
            Objetivo desta missão
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">{goal}</p>
          {touchHint ? <p className="mt-3 text-xs text-fd-muted-foreground">{touchHint}</p> : null}
        </div>
      </div>
    </section>
  );
}
