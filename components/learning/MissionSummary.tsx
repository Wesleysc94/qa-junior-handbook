'use client';

import { Award, CircleAlert, Sparkles } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';

interface MissionSummaryProps {
  missionId: string;
  totalSteps: number;
  incompleteText: string;
  partialText: string;
  completeText: string;
}

export function MissionSummary({
  missionId,
  totalSteps,
  incompleteText,
  partialText,
  completeText,
}: MissionSummaryProps) {
  const mission = useProgressStore((s) => s.missionResults[missionId]);
  const answered = mission ? Object.keys(mission.steps).length : 0;
  const correct = mission?.correctCount ?? 0;

  let title = 'Missão ainda em andamento';
  let text = incompleteText;
  let Icon = CircleAlert;

  if (answered >= totalSteps && correct >= totalSteps - 1) {
    title = 'Missão muito bem resolvida';
    text = completeText;
    Icon = Award;
  } else if (answered > 0) {
    title = 'Boa leitura, refine as decisões';
    text = partialText;
    Icon = Sparkles;
  }

  return (
    <section className="not-prose my-6 rounded-3xl border border-fd-border bg-fd-card p-5" data-testid="mission-summary">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0 text-[hsl(188_95%_53%)]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-fd-foreground">{title}</p>
          <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">{text}</p>
        </div>
      </div>
    </section>
  );
}
