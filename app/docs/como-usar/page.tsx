import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3, Smartphone } from 'lucide-react';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

export default function HowToUsePage() {
  return (
    <DocsPage full>
      <DocsTitle>Como usar</DocsTitle>
      <DocsDescription>
        Trilha pessoal para estudar no celular sem transformar o handbook em uma plataforma pesada.
      </DocsDescription>
      <DocsBody>
        <div className="not-prose grid gap-6">
          <section className="rounded-3xl border border-fd-border bg-fd-card p-5">
            <div className="flex items-start gap-3">
              <Smartphone className="mt-0.5 size-5 shrink-0 text-[hsl(188_95%_53%)]" aria-hidden />
              <div>
                <p className="text-base font-semibold text-fd-foreground">Modo de uso recomendado</p>
                <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
                  Use o handbook como trilha pessoal. Leia um capítulo curto, feche com o quiz, resolva a
                  missão guiada do módulo e jogue para a fila de revisão tudo o que ainda ficou inseguro.
                  O objetivo não é produzir artefato nem abrir IDE. O objetivo é consolidar repertório para
                  conversa técnica, decisão prática e leitura de projeto.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-fd-border bg-fd-card/70 p-5">
              <BookOpen className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
              <p className="mt-4 text-sm font-semibold text-fd-foreground">1. Ler em blocos curtos</p>
              <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
                Prefira sessões de 15 a 25 minutos. Em mobile, leitura curta com retomada frequente fixa
                melhor do que maratona de uma vez.
              </p>
            </div>
            <div className="rounded-3xl border border-fd-border bg-fd-card/70 p-5">
              <Clock3 className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
              <p className="mt-4 text-sm font-semibold text-fd-foreground">2. Revisar no dia seguinte</p>
              <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
                Use a página de revisão para voltar no que saiu errado, no que foi salvo e nos flashcards
                com confiança baixa.
              </p>
            </div>
            <div className="rounded-3xl border border-fd-border bg-fd-card/70 p-5">
              <Smartphone className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
              <p className="mt-4 text-sm font-semibold text-fd-foreground">3. Fechar com missão guiada</p>
              <p className="mt-2 text-sm leading-7 text-fd-muted-foreground">
                Cada módulo agora termina com um caso comentado. Toque nas decisões, leia as justificativas
                e use isso como treino de raciocínio aplicado.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-fd-border bg-fd-card p-5">
            <p className="text-base font-semibold text-fd-foreground">Sequência que costuma funcionar bem</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                'Semana 1–2: Fundamentos + QA manual para ganhar vocabulário e ritmo.',
                'Semana 3–4: API + E2E para começar a ler evidência técnica com mais segurança.',
                'Semana 5: CI/CD + soft skills para conectar risco técnico e comunicação.',
                'Semana 6: Projetos + entrevista para transformar estudo em narrativa profissional.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-fd-border bg-fd-background/45 px-4 py-4 text-sm text-fd-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-fd-border bg-fd-card p-5">
            <p className="text-base font-semibold text-fd-foreground">Atalhos úteis</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[hsl(188_95%_48%)] px-5 py-3 text-sm font-semibold text-[hsl(224_71%_6%)] transition hover:bg-[hsl(188_95%_55%)]"
              >
                Abrir capítulos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/docs/revisao"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-fd-border px-5 py-3 text-sm font-medium text-fd-foreground transition hover:border-[hsl(188_95%_43%/0.45)] hover:text-[hsl(188_95%_53%)]"
              >
                Abrir revisão
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        </div>
      </DocsBody>
    </DocsPage>
  );
}
