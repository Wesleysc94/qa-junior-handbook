'use client';

import type { ReactNode } from 'react';
import { useProgressStore } from '@/lib/progress';
import { cn } from '@/lib/cn';

export interface ChecklistItemProps {
  id: string;
  children: ReactNode;
}

export function ChecklistItem({ id, children }: ChecklistItemProps) {
  const done = useProgressStore((s) => !!s.checklist[id]);
  const setChecklist = useProgressStore((s) => s.setChecklist);

  return (
    <label
      className={cn(
        'my-4 flex cursor-pointer items-start gap-3 rounded-lg border border-fd-border bg-fd-muted/20 p-3 transition-colors hover:bg-fd-muted/40',
        done && 'border-emerald-500/40 bg-emerald-500/5',
      )}
    >
      <input
        type="checkbox"
        className="mt-1 size-4 shrink-0 rounded border-fd-border accent-[hsl(188_95%_48%)]"
        checked={done}
        onChange={() => setChecklist(id, !done)}
      />
      <span className="text-sm font-medium text-fd-foreground">{children}</span>
    </label>
  );
}
