import { Lightbulb } from 'lucide-react';

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="my-8 rounded-xl border border-[hsl(188_95%_43%/0.35)] bg-[hsl(188_95%_43%/0.08)] p-4">
      <div className="mb-3 flex items-center gap-2 font-semibold text-fd-foreground">
        <Lightbulb className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
        Principais aprendizados
      </div>
      <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-fd-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
