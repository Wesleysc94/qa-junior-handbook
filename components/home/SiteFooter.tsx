import Link from 'next/link';
import { ExternalLink, GitBranch } from 'lucide-react';
import { siteConfig } from '@/lib/shared';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card/50 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-fd-muted-foreground sm:text-left">
          QA Junior Handbook · trilha pessoal mobile-first · feito para estudar sozinho com profundidade e
          ritmo sustentável.
        </p>
        <Link
          href={siteConfig.githubRepoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:text-[hsl(188_95%_53%)]"
        >
          <GitBranch className="size-4" aria-hidden />
          GitHub
        </Link>
        <Link
          href={siteConfig.socialLinks.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground hover:text-[hsl(188_95%_53%)]"
        >
          <ExternalLink className="size-4" aria-hidden />
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
