import Link from 'next/link';
import { GitBranch } from 'lucide-react';
import { gitConfig } from '@/lib/shared';

export function SiteFooter() {
  const gh = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card/50 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-fd-muted-foreground sm:text-left">
          QA Junior Handbook · conteúdo em construção contínua · feito para a comunidade brasileira de
          QA.
        </p>
        <Link
          href={gh}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:text-[hsl(188_95%_53%)]"
        >
          <GitBranch className="size-4" aria-hidden />
          GitHub
        </Link>
      </div>
    </footer>
  );
}
