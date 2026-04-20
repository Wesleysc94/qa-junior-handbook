'use client';

import Link from 'next/link';
import { moduleChecklistIds } from '@/lib/modules';
import { cn } from '@/lib/cn';
import { useProgressStore } from '@/lib/progress';
import { DifficultyBadge, type DifficultyBadgeLevel } from './DifficultyBadge';

export interface ModuleProgressProps {
  moduleId: string;
  moduleName: string;
  totalChapters: number;
  estimatedHours: number;
  difficulty: DifficultyBadgeLevel;
  entrySlug: string;
  missionSlug?: string;
}

export function ModuleProgress({
  moduleId,
  moduleName,
  totalChapters,
  estimatedHours,
  difficulty,
  entrySlug,
  missionSlug,
}: ModuleProgressProps) {
  const checklist = useProgressStore((s) => s.checklist);
  const missionResults = useProgressStore((s) => s.missionResults);
  const ids = moduleChecklistIds(moduleId);
  const done = ids.filter((id) => checklist[id]).length;
  const total = ids.length || totalChapters;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const missionState = missionSlug ? missionResults[`/docs/${missionSlug}`] : undefined;

  return (
    <Link
      href={`/docs/${entrySlug}`}
      className={cn(
        'group flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4 transition-colors',
        'hover:border-[hsl(188_95%_43%/0.45)] hover:bg-fd-muted/30',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-fd-foreground group-hover:text-[hsl(188_95%_53%)]">
            {moduleName}
          </h3>
          <p className="text-xs text-fd-muted-foreground">
            ~{estimatedHours}h estimadas · {total} capítulos
          </p>
        </div>
        <DifficultyBadge level={difficulty} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-fd-muted-foreground">
          <span>Progresso</span>
          <span>
            {done}/{total} ({pct}%)
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-fd-muted">
          <div
            className="h-full rounded-full bg-[hsl(188_95%_53%)] transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {missionSlug ? (
        <div className="rounded-xl border border-fd-border/80 bg-fd-background/40 p-3 text-xs text-fd-muted-foreground">
          <p className="font-medium text-fd-foreground">Missão guiada do módulo</p>
          <p className="mt-1">
            {missionState
              ? `${Object.keys(missionState.steps).length}/${missionState.totalSteps} decisões respondidas`
              : 'Ainda não iniciada'}
          </p>
        </div>
      ) : null}
      <span className="text-xs font-medium text-[hsl(188_95%_48%)]">Abrir módulo →</span>
    </Link>
  );
}
