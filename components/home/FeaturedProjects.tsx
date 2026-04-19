import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    name: 'toolshop-quality-portfolio',
    desc: 'QA manual + API + E2E sobre Practice Software Testing (portfólio em camadas).',
    href: 'https://github.com/search?q=toolshop-quality-portfolio&type=repositories',
  },
  {
    name: 'swaglab-quality-suite',
    desc: 'E2E com POM + API + CI/CD (SauceDemo + Reqres.in).',
    href: 'https://github.com/search?q=swaglab-quality-suite&type=repositories',
  },
];

export function FeaturedProjects() {
  return (
    <section className="border-t border-fd-border bg-fd-muted/20 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
          Projetos em destaque
        </h2>
        <p className="mb-8 max-w-2xl text-fd-muted-foreground">
          O handbook documenta decisões e código desses trabalhos — substitua os links pelos seus
          repositórios públicos quando publicar.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
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
