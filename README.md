# QA Junior Handbook

[![CI](https://github.com/Wesleysc94/qa-junior-handbook/actions/workflows/ci.yml/badge.svg)](https://github.com/Wesleysc94/qa-junior-handbook/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Handbook interativo em português brasileiro, pensado para estudo pessoal mobile-first em QA. O projeto reúne fundamentos, QA manual, testes de API, automação E2E, CI/CD, soft skills, preparação para entrevista e missões guiadas construídas a partir de projetos públicos reais.

## O que este projeto entrega

- 58 capítulos rastreados, incluindo 8 missões guiadas nos módulos `01–08`
- quizzes finais, flashcards, checklist por capítulo e progresso local persistido
- favoritos, revisar depois, última leitura e modo foco no navegador
- hub de revisão em `/docs/revisao` e guia de uso em `/docs/como-usar`
- módulo de projetos conectado aos repositórios públicos do portfólio como tour comentado
- busca configurada para português
- sitemap, robots, OG estático e CTA global por capítulo voltado a estudo pessoal
- auditoria automatizada de conteúdo para evitar placeholders e capítulos incompletos
- suíte E2E com Playwright para smoke do produto principal

## Stack

- Next.js 16
- Fumadocs
- React 19
- Tailwind CSS 4
- Zustand
- Playwright
- Vercel Analytics

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:3100` e navegue por `/docs`.

## Scripts úteis

```bash
npm run generate:docs
npm run generate:source
npm run audit:content
npm run types:check
npm run lint
npm run test:e2e
npm run build
```

`generate:docs` reescreve os capítulos a partir do gerador editorial.

`generate:source` recria a `.source` usada pela integração do Fumadocs.

`audit:content` falha se houver placeholder, capítulo curto, quiz ausente, `KeyTakeaways` ausente, `ChecklistItem` inválido, glossário com menos de 50 flashcards ou missão guiada sem a estrutura mínima esperada.

## Estrutura

```text
content/docs/            capítulos e meta.json por módulo
components/learning/     quiz, flashcard, missões, checklist e progresso
components/home/         home pública e cards de continuidade
components/docs/         shell de docs, foco e ações globais por capítulo
components/review/       hub de revisão pessoal
lib/                     source loader, progresso, config compartilhada e summaries
public/case-studies/     evidências estáticas consumidas pelas missões
scripts/                 geração de conteúdo, source e auditoria
tests/e2e/               smoke E2E do handbook
```

## Projetos relacionados

- [toolshop-quality-portfolio](https://github.com/Wesleysc94/toolshop-quality-portfolio)
- [toolshop-manual-quality](https://github.com/Wesleysc94/toolshop-manual-quality)
- [toolshop-api-quality-suite](https://github.com/Wesleysc94/toolshop-api-quality-suite)
- [toolshop-web-e2e-playwright](https://github.com/Wesleysc94/toolshop-web-e2e-playwright)
- [swaglab-quality-suite](https://github.com/Wesleysc94/swaglab-quality-suite)

## Contribuição

1. Abra uma issue ou descreva a melhoria.
2. Faça as mudanças mantendo o padrão editorial do handbook.
3. Rode `npm run audit:content`, `npm run types:check`, `npm run lint` e `npm run test:e2e`.
4. Envie um PR com contexto da mudança e evidência do teste.

## Deploy

Produção atual: `https://qa-junior-handbook.vercel.app`

O repositório já inclui workflow de CI, metadata pública, `robots`, `sitemap`, `public/og-image.png`, ícone da aplicação e Analytics ativo em produção. A revisão v2 mobile-first está validada localmente; publicar esta versão exige um novo deploy.

## Próximos passos

O status operacional do fechamento está em [docs/PROXIMOS_PASSOS.md](docs/PROXIMOS_PASSOS.md).

## Licença

[MIT](./LICENSE)
