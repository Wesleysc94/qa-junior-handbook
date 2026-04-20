'use client';

import { RotateCcw } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';

export function MissionProgress({ missionId, totalSteps }: { missionId: string; totalSteps: number }) {
  const mission = useProgressStore((s) => s.missionResults[missionId]);
  const resetMission = useProgressStore((s) => s.resetMission);
  const answered = mission ? Object.keys(mission.steps).length : 0;
  const correct = mission?.correctCount ?? 0;
  const pct = totalSteps === 0 ? 0 : Math.round((answered / totalSteps) * 100);

  return (
    <section className="not-prose my-6 rounded-3xl border border-fd-border bg-fd-card/70 p-5" data-testid="mission-progress">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fd-foreground">Seu progresso na missão</p>
          <p className="text-sm text-fd-muted-foreground">
            {answered}/{totalSteps} decisões respondidas · {correct} corretas até agora
          </p>
        </div>
        <button
          type="button"
          onClick={() => resetMission(missionId)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
          data-testid="mission-reset"
        >
          <RotateCcw className="size-4" aria-hidden />
          Reiniciar missão
        </button>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-fd-muted">
        <div
          className="h-full rounded-full bg-[hsl(188_95%_53%)] transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
