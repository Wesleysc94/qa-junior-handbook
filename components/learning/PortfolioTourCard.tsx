import Link from 'next/link';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

interface PortfolioTourCardProps {
  title: string;
  href: string;
  summary: string;
  focus: string;
}

export function PortfolioTourCard({ title, href, summary, focus }: PortfolioTourCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="not-prose my-4 flex min-h-[160px] flex-col gap-3 rounded-3xl border border-fd-border bg-fd-card p-5 transition hover:border-[hsl(188_95%_43%/0.45)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-fd-foreground">
          <FolderGit2 className="size-4 text-[hsl(188_95%_53%)]" aria-hidden />
          {title}
        </span>
        <ArrowUpRight className="size-4 text-fd-muted-foreground" aria-hidden />
      </div>
      <p className="text-sm leading-7 text-fd-muted-foreground">{summary}</p>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[hsl(188_95%_53%)]">{focus}</p>
    </Link>
  );
}
