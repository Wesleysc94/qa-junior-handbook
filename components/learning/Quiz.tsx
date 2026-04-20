'use client';

import { cn } from '@/lib/cn';
import { useProgressStore } from '@/lib/progress';
import { useChapterMeta } from '@/components/docs/ChapterMetaContext';

export interface QuizProps {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function Quiz({ id, question, options, correctIndex, explanation }: QuizProps) {
  const result = useProgressStore((s) => s.quizResults[id]);
  const setQuizPick = useProgressStore((s) => s.setQuizPick);
  const clearQuiz = useProgressStore((s) => s.clearQuiz);
  const chapterMeta = useChapterMeta();
  const pick = result?.pick;

  const answered = pick !== undefined;
  const correct = pick === correctIndex;

  function choose(i: number) {
    if (answered) return;
    setQuizPick(id, i, {
      correct: i === correctIndex,
      chapterUrl: chapterMeta?.chapterPath,
      chapterTitle: chapterMeta?.chapterTitle,
    });
  }

  return (
    <div
      className="my-6 rounded-xl border border-fd-border bg-fd-card p-4 shadow-sm"
      data-quiz-id={id}
      data-testid={`quiz-${id}`}
    >
      <p className="mb-3 font-medium text-fd-card-foreground">{question}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt, i) => {
          let tone = 'border-fd-border bg-fd-muted/40 hover:bg-fd-muted/80';
          if (answered) {
            if (i === correctIndex) tone = 'border-emerald-500/60 bg-emerald-500/15';
            else if (pick === i) tone = 'border-red-500/50 bg-red-500/10';
            else tone = 'border-fd-border opacity-60';
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              className={cn(
                'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                tone,
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-4 space-y-2 rounded-lg border border-fd-border bg-fd-muted/30 p-3 text-sm">
          <p className="font-medium text-fd-foreground">
            {correct ? 'Acertou.' : 'Errou — faz parte.'}
          </p>
          <p className="text-fd-muted-foreground">{explanation}</p>
          <button
            type="button"
            onClick={() => clearQuiz(id)}
            className="text-sm font-medium text-[hsl(188_95%_48%)] underline-offset-2 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
