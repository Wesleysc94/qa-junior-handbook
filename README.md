# QA Junior Handbook

Plataforma de estudo em Next.js + Fumadocs: handbook interativo em português brasileiro para QA júnior (fundamentos, manual, API, E2E, CI/CD, soft skills, entrevistas e projetos).

## Próximos passos

Roteiro completo, checklist e **prompt para agente** (Cursor / Claude): veja [`docs/PROXIMOS_PASSOS.md`](docs/PROXIMOS_PASSOS.md).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — a documentação fica em `/docs`.

## Conteúdo placeholder

Os capítulos em `content/docs/` foram gerados com placeholders (`[Conteúdo a desenvolver]`). Para regenerar a estrutura após mudar o script:

```bash
node scripts/generate-placeholder-docs.mjs
```

## Deploy (Vercel)

Conecte o repositório em [vercel.com](https://vercel.com) — o projeto é estático-friendly e inclui `@vercel/analytics`.

## Licença

MIT (ajuste conforme sua preferência).
