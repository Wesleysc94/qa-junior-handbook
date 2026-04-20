'use client';

import { startTransition } from 'react';
import { cn } from '@/lib/cn';
import { useProgressStore } from '@/lib/progress';

interface DecisionOption {
  label: string;
  rationale: string;
  correct?: boolean;
}

interface DecisionStepProps {
  missionId: string;
  missionTitle: string;
  chapterUrl: string;
  stepId: string;
  title: string;
  prompt: string;
  options: DecisionOption[];
  totalSteps: number;
}

export function DecisionStep({
  missionId,
  missionTitle,
  chapterUrl,
  stepId,
  title,
  prompt,
  options,
  totalSteps,
}: DecisionStepProps) {
  const result = useProgressStore((s) => s.missionResults[missionId]);
  const setMissionAnswer = useProgressStore((s) => s.setMissionAnswer);
  const selected = result?.steps[stepId]?.pick;

  return (
    <section className="not-prose my-6 rounded-3xl border border-fd-border bg-fd-card/80 p-5" data-testid={`mission-step-${stepId}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(188_95%_53%)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-fd-foreground">{prompt}</p>
      <div className="mt-4 grid gap-3">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const showFeedback = selected !== undefined && isSelected;
          const isCorrect = !!option.correct;

          return (
            <button
              key={`${stepId}-${index}`}
              type="button"
              onClick={() =>
                startTransition(() =>
                  setMissionAnswer({
                    missionId,
                    missionTitle,
                    chapterUrl,
                    totalSteps,
                    stepId,
                    pick: index,
                    correct: isCorrect,
                  }),
                )
              }
              className={cn(
                'min-h-14 rounded-2xl border px-4 py-4 text-left text-sm transition',
                'border-fd-border bg-fd-background/40 text-fd-foreground hover:border-[hsl(188_95%_43%/0.45)]',
                isSelected && isCorrect && 'border-emerald-500/40 bg-emerald-500/10',
                isSelected && !isCorrect && 'border-amber-500/40 bg-amber-500/10',
              )}
            >
              <span className="font-medium">{option.label}</span>
              {showFeedback ? (
                <span className="mt-2 block text-xs leading-6 text-fd-muted-foreground">
                  {option.rationale}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
