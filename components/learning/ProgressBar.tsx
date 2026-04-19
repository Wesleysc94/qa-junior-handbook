'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { CHECKLIST_IDS } from '@/lib/checklist-registry';
import { cn } from '@/lib/cn';
import { useProgressStore } from '@/lib/progress';

export function ProgressBar({ className }: { className?: string }) {
  const checklist = useProgressStore((s) => s.checklist);
  const done = CHECKLIST_IDS.filter((id) => checklist[id]).length;
  const total = CHECKLIST_IDS.length as number;
  const pct = Math.round((done / total) * 100);

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className={cn('flex min-w-[120px] max-w-[200px] flex-1 flex-col gap-1', className)}>
            <div
              className="relative h-2 w-full overflow-hidden rounded-full bg-fd-muted"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[hsl(188_95%_53%)] transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-fd-muted-foreground tabular-nums max-sm:hidden">
              {pct}%
            </span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 rounded-md border border-fd-border bg-fd-popover px-2 py-1 text-xs text-fd-popover-foreground shadow-md"
            sideOffset={6}
          >
            {done} de {total} capítulos concluídos
            <Tooltip.Arrow className="fill-fd-popover" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
