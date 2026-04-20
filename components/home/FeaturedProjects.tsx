import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { featuredProjects } from '@/lib/shared';

export function FeaturedProjects() {
  return (
    <section className="border-t border-fd-border bg-fd-muted/20 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
          Projetos em destaque
        </h2>
        <p className="mb-8 max-w-2xl text-fd-muted-foreground">
          O handbook documenta decisões, arquitetura e entregáveis desses repositórios públicos do
          portfólio.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <li key={p.name}>
              <Link
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full flex-col gap-2 rounded-xl border border-fd-border bg-fd-card p-5 transition hover:border-[hsl(188_95%_43%/0.45)]"
              >
                <span className="flex items-center gap-2 font-medium text-fd-foreground">
                  {p.name}
                  <ExternalLink className="size-4 shrink-0 text-fd-muted-foreground" aria-hidden />
                </span>
                <span className="text-sm text-fd-muted-foreground">{p.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
