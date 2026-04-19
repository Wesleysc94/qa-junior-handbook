'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

export interface InterviewQuestionProps {
  question: string;
  difficulty: 'facil' | 'media' | 'dificil';
  category: string;
  children: React.ReactNode;
}

const diffStyles = {
  facil: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  media: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
  dificil: 'border-red-500/30 bg-red-500/10 text-red-100',
} as const;

const diffLabel = {
  facil: 'Fácil',
  media: 'Média',
  dificil: 'Difícil',
} as const;

export function InterviewQuestion({
  question,
  difficulty,
  category,
  children,
}: InterviewQuestionProps) {
  const [peek, setPeek] = useState(false);

  return (
    <Accordion.Root type="single" collapsible className="my-4 rounded-xl border border-fd-border bg-fd-card">
      <Accordion.Item value="q" className="overflow-hidden">
        <div className="p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                diffStyles[difficulty],
              )}
            >
              {diffLabel[difficulty]}
            </span>
            <span className="text-xs text-fd-muted-foreground">{category}</span>
          </div>
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-start gap-2 text-left text-sm font-medium text-fd-foreground hover:text-[hsl(188_95%_53%)]">
              <span className="flex-1">{question}</span>
              <ChevronDown className="mt-0.5 size-4 shrink-0 transition-transform data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <button
            type="button"
            onClick={() => setPeek((p) => !p)}
            className="mt-3 inline-flex items-center gap-1 rounded-md border border-fd-border px-2 py-1 text-xs text-fd-muted-foreground hover:bg-fd-muted/40"
          >
            {peek ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            Tentei responder antes de ver
          </button>
          {peek && (
            <p className="mt-2 border-t border-dashed border-fd-border pt-2 text-xs italic text-fd-muted-foreground">
              Modo reflexão: anota sua resposta antes de abrir o gabarito.
            </p>
          )}
        </div>
        <Accordion.Content className="border-t border-fd-border bg-fd-muted/20 px-4 py-3 text-sm leading-relaxed text-fd-muted-foreground">
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
