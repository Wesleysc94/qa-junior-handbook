import { Clock } from 'lucide-react';

export function EstimatedTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-muted/40 px-2.5 py-0.5 text-xs text-fd-muted-foreground">
      <Clock className="size-3.5" aria-hidden />
      {minutes} min de leitura
    </span>
  );
}
