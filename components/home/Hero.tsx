import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { siteConfig } from '@/lib/shared';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-fd-border bg-[radial-gradient(ellipse_at_top,_hsl(188_95%_53%/0.12),_transparent_55%),radial-gradient(ellipse_at_bottom,_hsl(224_71%_8%),_hsl(224_71%_4%))] px-4 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center md:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-fd-border bg-fd-card/60 px-3 py-1 text-xs font-medium text-fd-muted-foreground md:self-start">
          <BookOpen className="size-3.5 text-[hsl(188_95%_53%)]" aria-hidden />
          Estudo · português BR · sem backend
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
          QA Junior Handbook
        </h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
          Manual interativo com estudo guiado no celular: fundamentos, QA manual, API, E2E, CI/CD, soft
          skills, entrevistas e missões em cima dos seus projetos reais, sem backend e sem complicar a
          rotina.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(188_95%_48%)] px-6 py-3 text-sm font-semibold text-[hsl(224_71%_6%)] transition hover:bg-[hsl(188_95%_55%)]"
          >
            Abrir documentação
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/docs/como-usar"
            className="text-sm font-medium text-fd-muted-foreground underline-offset-4 hover:text-[hsl(188_95%_53%)] hover:underline"
          >
            Como usar no celular
          </Link>
          <Link
            href={siteConfig.githubRepoUrl}
            className="text-sm font-medium text-fd-muted-foreground underline-offset-4 hover:text-[hsl(188_95%_53%)] hover:underline"
          >
            GitHub opcional
          </Link>
        </div>
      </div>
    </section>
  );
}
