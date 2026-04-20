'use client';

import { startTransition } from 'react';
import { Focus, Minimize2 } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';

export function ChapterFocusToggle() {
  const focusMode = useProgressStore((s) => s.focusMode);
  const setFocusMode = useProgressStore((s) => s.setFocusMode);

  return (
    <button
      type="button"
      onClick={() => startTransition(() => setFocusMode(!focusMode))}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
      data-testid="focus-mode-toggle"
    >
      {focusMode ? <Minimize2 className="size-4" aria-hidden /> : <Focus className="size-4" aria-hidden />}
      {focusMode ? 'Sair do foco' : 'Modo foco'}
    </button>
  );
}
