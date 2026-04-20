import Link from 'next/link';
import { FileText, LinkIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface EvidenceCardProps {
  title: string;
  kind: string;
  caption: string;
  assetHref?: string;
  assetLabel?: string;
  children: ReactNode;
}

export function EvidenceCard({
  title,
  kind,
  caption,
  assetHref,
  assetLabel = 'Abrir evidência original',
  children,
}: EvidenceCardProps) {
  return (
    <section className="not-prose my-6 overflow-hidden rounded-3xl border border-fd-border bg-fd-card">
      <div className="flex flex-col gap-3 border-b border-fd-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(188_95%_53%)]">{kind}</p>
          <p className="mt-1 text-base font-semibold text-fd-foreground">{title}</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">{caption}</p>
        </div>
        {assetHref ? (
          <Link
            href={assetHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fd-border px-4 py-2 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
          >
            <LinkIcon className="size-4" aria-hidden />
            {assetLabel}
          </Link>
        ) : null}
      </div>
      <div className="px-5 py-4 text-sm text-fd-muted-foreground">
        <div className="mb-3 inline-flex items-center gap-2 text-fd-foreground">
          <FileText className="size-4 text-[hsl(188_95%_53%)]" aria-hidden />
          Evidência pronta para leitura rápida
        </div>
        <div className="[&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-fd-border [&_pre]:bg-fd-background/80 [&_pre]:p-4">
          {children}
        </div>
      </div>
    </section>
  );
}
