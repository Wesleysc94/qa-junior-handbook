import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const docs = path.join(root, 'content', 'docs');

const tpl = ({
  title,
  description,
  checklistId,
  difficulty,
  minutes,
  h2,
}) => `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
---

import { DifficultyBadge } from '@/components/learning/DifficultyBadge';
import { EstimatedTime } from '@/components/learning/EstimatedTime';
import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { KeyTakeaways } from '@/components/learning/KeyTakeaways';

<div className="not-prose mb-6 flex flex-wrap items-center gap-3">
  <DifficultyBadge level="${difficulty}" />
  <EstimatedTime minutes={${minutes}} />
</div>

## ${h2}

[Conteúdo a desenvolver]

<KeyTakeaways
  items={[
    '[Conteúdo a desenvolver] — adicionar aprendizados reais ao final da redação.',
    'Incluir exemplo prático e menção a erro comum conforme checklist de qualidade do handbook.',
  ]}
/>

<ChecklistItem id="${checklistId}">Concluí este capítulo</ChecklistItem>
`;

const groups = [
  {
    folder: '01-fundamentos',
    metaTitle: 'Fundamentos',
    pages: [
      ['o-que-e-qa', 'O que é QA', 'Conceitos de QA, QC e papel no time ágil.', '01-fundamentos-o-que-e-qa', 'iniciante', 12, 'Quality Assurance de verdade'],
      ['piramide-de-testes', 'Pirâmide de testes', 'Cohn, troféu, ampulheta e o que usar no dia a dia.', '01-fundamentos-piramide-de-testes', 'iniciante', 14, 'Base sólida de automação'],
      ['tipos-de-teste', 'Tipos de teste', 'Smoke, regressão, carga, acessibilidade e mais.', '01-fundamentos-tipos-de-teste', 'iniciante', 18, 'Mapa dos tipos mais cobrados em entrevista'],
      ['severidade-vs-prioridade', 'Severidade vs prioridade', 'Matriz real de decisão com exemplos.', '01-fundamentos-severidade-vs-prioridade', 'iniciante', 14, 'Quando parar o release'],
      ['ciclo-de-vida-bug', 'Ciclo de vida do bug', 'Estados, responsáveis e SLAs informais.', '01-fundamentos-ciclo-de-vida-bug', 'iniciante', 12, 'Do New ao Closed'],
      ['metodologias-ageis', 'Metodologias ágeis', 'Scrum, Kanban, DoR e DoD com foco em QA.', '01-fundamentos-metodologias-ageis', 'iniciante', 16, 'Onde você entra em cada cerimônia'],
    ],
  },
  {
    folder: '02-qa-manual',
    metaTitle: 'QA manual',
    pages: [
      ['casos-de-teste', 'Casos de teste', 'Anatomia profissional e templates reais.', '02-qa-manual-casos-de-teste', 'iniciante', 16, 'Como documentar sem enrolação'],
      ['checklists', 'Checklists', 'Smoke, cross-browser e release.', '02-qa-manual-checklists', 'iniciante', 12, 'Quando checklist vence caso detalhado'],
      ['bug-reports', 'Bug reports', 'Evidência, Jira e comunicação com dev.', '02-qa-manual-bug-reports', 'iniciante', 16, 'Bug ruim vs bug que o dev agradece'],
      ['analise-de-risco', 'Análise de risco', 'Matriz e risk-based testing.', '02-qa-manual-analise-de-risco', 'intermediario', 14, 'Onde investir tempo de teste'],
      ['plano-de-testes', 'Plano de testes', 'IEEE 829 enxuto e exemplo Toolshop.', '02-qa-manual-plano-de-testes', 'intermediario', 14, 'Plano que o time realmente lê'],
    ],
  },
  {
    folder: '03-testes-api',
    metaTitle: 'Testes de API',
    pages: [
      ['rest-fundamentos', 'REST na prática', 'Métodos HTTP, idempotência e recursos.', '03-testes-api-rest-fundamentos', 'iniciante', 14, 'REST sem enrolação de teoria'],
      ['status-codes', 'Status codes', '2xx a 5xx: o que validar como QA.', '03-testes-api-status-codes', 'iniciante', 16, '401 vs 403 e outros classics'],
      ['headers', 'Headers HTTP', 'Auth, cache, CORS e segurança.', '03-testes-api-headers', 'intermediario', 12, 'Headers que você inspeciona todo dia'],
      ['postman', 'Postman', 'Collections, environments e Newman.', '03-testes-api-postman', 'iniciante', 14, 'Collection organizada de verdade'],
      ['pytest-httpx', 'pytest + httpx', 'Fixtures, markers e código real Toolshop.', '03-testes-api-pytest-httpx', 'intermediario', 18, 'Stack Python moderna'],
      ['cenarios-negativos', 'Cenários negativos', 'Payloads inválidos e borda.', '03-testes-api-cenarios-negativos', 'intermediario', 14, 'Negativo que acha bug de verdade'],
      ['autenticacao', 'Autenticação em API', 'JWT, API key, Basic e OAuth visão QA.', '03-testes-api-autenticacao', 'intermediario', 14, 'Testar expiração e permissão'],
    ],
  },
  {
    folder: '04-automacao-e2e',
    metaTitle: 'Automação E2E',
    pages: [
      ['comparativo-ferramentas', 'Comparativo de ferramentas', 'Selenium, Cypress, Playwright.', '04-automacao-e2e-comparativo-ferramentas', 'intermediario', 14, 'Escolha com dados de 2026'],
      ['setup-playwright', 'Setup Playwright', 'Config, CLI e primeiro teste.', '04-automacao-e2e-setup-playwright', 'intermediario', 16, 'playwright.config.ts sem medo'],
      ['page-object-model', 'Page Object Model', 'Estrutura e exemplo Swaglab.', '04-automacao-e2e-page-object-model', 'intermediario', 16, 'POM que escala'],
      ['locators', 'Locators', 'Hierarquia Playwright e data-testid.', '04-automacao-e2e-locators', 'intermediario', 14, 'Seletor estável de verdade'],
      ['assertions', 'Assertions', 'Web-first, soft e API no mesmo fluxo.', '04-automacao-e2e-assertions', 'intermediario', 12, 'Expect que não flakya à toa'],
      ['esperas', 'Esperas', 'Auto-wait vs waitFor* vs sleep.', '04-automacao-e2e-esperas', 'intermediario', 12, 'Por que sleep é red flag'],
      ['hooks-fixtures', 'Hooks e fixtures', 'beforeEach e fixtures customizadas.', '04-automacao-e2e-hooks-fixtures', 'avancado', 14, 'Fixture > gambiarra no beforeEach'],
    ],
  },
  {
    folder: '05-cicd',
    metaTitle: 'CI/CD',
    pages: [
      ['conceitos', 'Conceitos de CI/CD', 'Pipeline e papel do QA.', '05-cicd-conceitos', 'iniciante', 10, 'CI vs CD vs deploy'],
      ['github-actions-basico', 'GitHub Actions básico', 'Workflow, jobs e caches.', '05-cicd-github-actions-basico', 'intermediario', 14, 'YAML que roda de primeira'],
      ['pipeline-qa', 'Pipeline de QA', 'Smoke no PR, suite na main, matriz.', '05-cicd-pipeline-qa', 'intermediario', 14, 'O que roda quando'],
      ['secrets', 'Secrets', 'GitHub Secrets e boas práticas.', '05-cicd-secrets', 'intermediario', 10, 'Nunca logar secret'],
      ['artefatos', 'Artefatos', 'Upload de relatório e trace.', '05-cicd-artefatos', 'intermediario', 10, 'Debugar CI com artefato'],
    ],
  },
  {
    folder: '06-soft-skills',
    metaTitle: 'Soft skills',
    pages: [
      ['comunicacao-com-dev', 'Comunicação com dev', 'Mesmo lado, fatos primeiro.', '06-soft-skills-comunicacao-com-dev', 'iniciante', 10, 'Feedback sem confronto'],
      ['time-agil', 'Time ágil', 'Daily, refinement, review.', '06-soft-skills-time-agil', 'iniciante', 12, 'Presença sem ruído'],
      ['reportar-bug', 'Reportar bug', 'Formal vs conversa rápida.', '06-soft-skills-reportar-bug', 'iniciante', 10, 'O que o dev quer ver'],
      ['postura-profissional', 'Postura profissional', 'No Go com dados, reputação técnica.', '06-soft-skills-postura-profissional', 'intermediario', 12, 'Discordar com evidência'],
    ],
  },
  {
    folder: '07-meus-projetos',
    metaTitle: 'Meus projetos',
    pages: [
      ['toolshop-overview', 'Toolshop — visão geral', 'Practice Software Testing em 3 camadas.', '07-meus-projetos-toolshop-overview', 'intermediario', 12, 'Arquitetura em repositórios'],
      ['toolshop-decisões', 'Toolshop — decisões', 'Trade-offs e No Go.', '07-meus-projetos-toolshop-decisoes', 'intermediario', 10, 'Por que Python + TS'],
      ['swaglab-overview', 'Swag Lab — visão geral', 'Monorepo Playwright + API.', '07-meus-projetos-swaglab-overview', 'intermediario', 12, 'Resultados e escopo'],
      ['swaglab-pom-pratica', 'Swag Lab — POM', 'Páginas e locators reais.', '07-meus-projetos-swaglab-pom-pratica', 'intermediario', 14, 'Como o teste consome a Page'],
      ['swaglab-cicd-pratica', 'Swag Lab — CI/CD', 'Workflows e REQRES.', '07-meus-projetos-swaglab-cicd-pratica', 'intermediario', 12, 'Dois pipelines por path'],
      ['swaglab-bug-documentado', 'Swag Lab — bugs documentados', 'problem_user e testes verdes.', '07-meus-projetos-swaglab-bug-documentado', 'intermediario', 12, 'Trade-off rastreio vs ruído'],
      ['perguntas-recrutador', 'Perguntas de recrutador', '30 respostas modelo.', '07-meus-projetos-perguntas-recrutador', 'intermediario', 16, 'Pitch dos seus projetos'],
    ],
  },
  {
    folder: '08-entrevista',
    metaTitle: 'Entrevista',
    pages: [
      ['perguntas-comportamentais', 'Comportamentais', 'STAR e projetos como experiência.', '08-entrevista-perguntas-comportamentais', 'iniciante', 14, '15 perguntas frequentes'],
      ['perguntas-tecnicas-manual', 'Técnicas — manual', '20 perguntas com gabarito.', '08-entrevista-perguntas-tecnicas-manual', 'iniciante', 16, 'Do smoke ao DoD'],
      ['perguntas-tecnicas-api', 'Técnicas — API', '15 perguntas.', '08-entrevista-perguntas-tecnicas-api', 'intermediario', 14, 'REST e status'],
      ['perguntas-tecnicas-e2e', 'Técnicas — E2E', '15 perguntas.', '08-entrevista-perguntas-tecnicas-e2e', 'intermediario', 14, 'Playwright na prática'],
      ['perguntas-cicd', 'Técnicas — CI/CD', '10 perguntas.', '08-entrevista-perguntas-cicd', 'intermediario', 10, 'Pipeline e secrets'],
      ['simulados', 'Simulados', '3 simulados completos.', '08-entrevista-simulados', 'intermediario', 18, 'Fintech, health, consultoria'],
      ['negociacao-salario', 'Negociação salarial', 'Faixas 2026 e lembranças.', '08-entrevista-negociacao-salario', 'iniciante', 12, 'Pesquisa e benefício'],
    ],
  },
  {
    folder: '09-glossario',
    metaTitle: 'Glossário',
    pages: [
      ['termos-tecnicos', 'Termos técnicos', 'Flashcards por categoria (expandir para 50+).', '09-glossario-termos-tecnicos', 'iniciante', 20, 'Revisão rápida'],
    ],
  },
];

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

/* index.mdx — boas-vindas */
const indexMdx = `---
title: Boas-vindas
description: Como usar o QA Junior Handbook, roadmap em 8 semanas e métricas do material.
---

import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { ProgressBar } from '@/components/learning/ProgressBar';
import { Mermaid } from '@/components/mdx/Mermaid';
import { QUIZ_COUNT_PLACEHOLDER, TOTAL_CHAPTERS } from '@/lib/checklist-registry';

## Carta de boas-vindas

Sou o Wesley Carvalho, em transição para QA de formação (TripleTen 2025), com anos de experiência em análise de processos. Este handbook nasceu para eu manter conceitos e projetos na ponta da língua para entrevistas — e para dividir um material denso, em português brasileiro, com outros QAs juniores que estão na mesma corrida.

## Como usar este manual

Você pode seguir a trilha linear (recomendado no começo) ou pular direto para o módulo que precisa no dia — API antes de E2E, por exemplo. Marque os checkpoints, faça os quizzes e use os flashcards do glossário para revisão espaçada. O progresso fica só no seu navegador (localStorage), sem backend.

## Roadmap sugerido — 8 semanas

<Mermaid
  chart={\`gantt
    title Trilha sugerida (ajuste ao seu ritmo)
    dateFormat  YYYY-MM-DD
    section Fundamentos e manual
    Módulos 1–2           :a1, 2026-04-19, 14d
    section API e E2E
    Módulos 3–4           :a2, after a1, 14d
    section CI e soft skills
    Módulos 5–6           :a3, after a2, 10d
    section Projetos e entrevista
    Módulos 7–8           :a4, after a3, 14d
    section Revisão
    Glossário e simulados :a5, after a4, 7d
\`}
/>

## O que você leva no bolso

- Vocabulário sólido de QA, testes e automação, com exemplos reais (não slide genérico).
- Capacidade de explicar seus projetos (Toolshop, Swag Lab) com profundidade técnica.
- Checklists e modelos que você pode copiar no trabalho.

## Pré-requisitos

Assumimos que você já viu HTML na prática e entende o básico de lógica (condição, loop). Não é preciso ser dev pleno — mas ler código de teste ajuda muito.

## Métricas do handbook (ao vivo no seu dispositivo)

<div className="not-prose my-6 space-y-3 rounded-xl border border-fd-border bg-fd-card p-4">
  <p className="text-sm text-fd-muted-foreground">
    Capítulos rastreados: ${'{TOTAL_CHAPTERS}'} · Quizzes planejados: ${'{QUIZ_COUNT_PLACEHOLDER}'}+ (preenchidos conforme a redação avança).
  </p>
  <div className="max-w-md">
    <p className="mb-1 text-xs font-medium text-fd-muted-foreground">Progresso geral</p>
    <ProgressBar />
  </div>
</div>

<ChecklistItem id="index-boas-vindas">Li a introdução e sei como navegar no handbook</ChecklistItem>
`;

write(path.join(docs, 'index.mdx'), indexMdx);

for (const g of groups) {
  const dir = path.join(docs, g.folder);
  const meta = {
    title: g.metaTitle,
    pages: g.pages.map((p) => p[0]),
  };
  write(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2));

  for (const page of g.pages) {
    const [slug, title, description, checklistId, difficulty, minutes, h2] = page;
    write(
      path.join(dir, `${slug}.mdx`),
      tpl({ title, description, checklistId, difficulty, minutes, h2 }),
    );
  }
}

const rootMeta = {
  title: 'QA Junior Handbook',
  pages: ['index', ...groups.map((g) => g.folder)],
};
write(path.join(docs, 'meta.json'), JSON.stringify(rootMeta, null, 2));

/* remove template de exemplo */
const testFile = path.join(docs, 'test.mdx');
if (fs.existsSync(testFile)) fs.rmSync(testFile);

console.log('Docs placeholders gerados em', docs);
