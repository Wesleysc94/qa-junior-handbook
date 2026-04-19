'use client';

import { useCallback, useState } from 'react';
import { cn } from '@/lib/cn';
import { useProgressStore } from '@/lib/progress';

export interface FlashcardProps {
  term: string;
  definition: string;
  category?: string;
}

export function Flashcard({ term, definition, category }: FlashcardProps) {
  const key = term.trim().toLowerCase();
  const confidence = useProgressStore((s) => s.flashcards[key]?.confidence ?? 0);
  const setFlashcardConfidence = useProgressStore((s) => s.setFlashcardConfidence);
  const [flipped, setFlipped] = useState(false);

  const onKnow = useCallback(() => {
    setFlashcardConfidence(key, 1);
    setFlipped(false);
  }, [key, setFlashcardConfidence]);

  const onDontKnow = useCallback(() => {
    setFlashcardConfidence(key, -1);
    setFlipped(false);
  }, [key, setFlashcardConfidence]);

  return (
    <div className="my-4 w-full max-w-lg" data-flashcard-term={key}>
      <div
        className={cn(
          'relative min-h-[10rem] w-full overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm transition-shadow hover:shadow-md',
        )}
      >
        {!flipped ? (
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="flex min-h-[10rem] w-full flex-col items-start justify-center gap-2 p-4 text-left"
          >
            {category && (
              <span className="text-xs font-medium uppercase tracking-wide text-[hsl(188_95%_48%)]">
                {category}
              </span>
            )}
            <span className="text-base font-semibold text-fd-card-foreground">{term}</span>
            <span className="text-xs text-fd-muted-foreground">Clique para ver a definição</span>
          </button>
        ) : (
          <div className="flex min-h-[10rem] flex-col justify-between gap-3 p-4">
            <p className="text-sm leading-relaxed text-fd-muted-foreground">{definition}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-200"
                onClick={onKnow}
              >
                Sei
              </button>
              <button
                type="button"
                className="rounded-md bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-100"
                onClick={onDontKnow}
              >
                Não sei
              </button>
              <button
                type="button"
                className="ml-auto text-xs text-fd-muted-foreground underline"
                onClick={() => setFlipped(false)}
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-fd-muted-foreground">
        Confiança salva: {confidence} · &quot;Não sei&quot; pede revisão depois.
      </p>
    </div>
  );
}
