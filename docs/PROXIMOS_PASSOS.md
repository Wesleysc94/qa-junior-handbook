# Próximos passos — QA Junior Handbook

Este documento é o **roteiro único** para concluir o projeto conforme a especificação original: conteúdo denso em PT-BR, gamificação funcional, zero backend, deploy na Vercel. Use o bloco **Prompt para agente** no final como contexto colável no Cursor / Claude Code.

---

## Estado atual (resumo)

- [x] Bootstrap Next.js + Fumadocs MDX, Tailwind, TypeScript
- [x] Design system base (dark default, paleta, Geist)
- [x] Componentes de gamificação (Quiz, Flashcard, ChecklistItem, ProgressBar, ModuleProgress, badges, etc.)
- [x] Estrutura de navegação e placeholders em `content/docs/`
- [x] **Módulo 7 (Meus projetos)** com texto completo nos capítulos
- [ ] Demais módulos com **≥1500 palavras** por capítulo (regra de qualidade)
- [ ] Polimento: OG image dedicada, sitemap/robots, Lighthouse, domínio opcional
- [ ] Deploy Vercel + Analytics validado em produção

---

## Fase A — Conteúdo (prioridade máxima)

### A.1 Regras de qualidade por capítulo

Cada `.mdx` “pronto” deve atender:

- [ ] **≥1500 palavras** de conteúdo útil (fora componentes), em português brasileiro natural
- [ ] Conceito: definição + **por que importa no mercado BR** + **exemplo real** (caso, código ou fluxo)
- [ ] Pelo menos uma menção explícita a **erro comum de iniciante**
- [ ] Onde aplicável: trecho de **código real** (API, Playwright, YAML de CI)
- [ ] **Quiz** de fixação OU checkpoint claro (já temos componente `<Quiz />`)
- [ ] `<KeyTakeaways />` no fechamento
- [ ] `<ChecklistItem id="..." />` com ID que exista em `lib/checklist-registry.ts`
- [ ] Sem depender de links externos para entender o capítulo (conteúdo autocontido)

### A.2 Ordem sugerida de redação (alinhada ao master prompt)

1. **Módulo 7** — revisar números/links com os repositórios reais do Wesley (GitHub público).
2. **Módulo 1 — Fundamentos** (6 capítulos): QA vs QC vs Tester, pirâmide, tipos de teste, severidade/prioridade, ciclo de vida do bug, ágil.
3. **Módulo 2 — QA manual** (5 capítulos).
4. **Módulo 3 — API** (7 capítulos): incluir exemplos pytest/httpx e Postman alinhados aos projetos.
5. **Módulo 4 — E2E** (7 capítulos): Playwright, POM, locators, assertions, esperas, fixtures.
6. **Módulo 5 — CI/CD** (5 capítulos).
7. **Módulo 6 — Soft skills** (4 capítulos).
8. **Módulo 8 — Entrevista** (7 capítulos): expandir simulados e negociação salarial com dados 2026 revisados.
9. **Módulo 9 — Glossário**: **50+ flashcards** em `<Flashcard />` por categoria.

### A.3 `index.mdx` (boas-vindas)

- [ ] Revisar roadmap Mermaid (datas/semiflexível)
- [ ] Garantir que métricas (`TOTAL_CHAPTERS`, `QUIZ_COUNT_PLACEHOLDER`) refletem o estado real após incluir todos os quizzes planejados

---

## Fase B — Produto e UX

- [ ] **Modo focado** (opcional): esconder sidebar / foco leitura
- [ ] **CTA LinkedIn** por capítulo (compartilhar progresso ou capítulo) — Fase 6 do spec
- [ ] Revisão **mobile** (320 / 768 / 1280 px)
- [ ] **Acessibilidade**: headings, labels em Quiz/Flashcard, contraste em light/dark

---

## Fase C — Busca, SEO e deploy

- [ ] Confirmar estratégia de busca: hoje **Orama** (padrão Fumadocs). Se o requisito for **Pagefind**, planejar migração ou build estático compatível.
- [ ] `sitemap.xml` e `robots.txt`
- [ ] Metadata Open Graph: `public/og-image.png` **personalizada** (não só rota dinâmica)
- [ ] **Vercel**: importar repo, framework Next.js, build `npm run build`, env vars se houver
- [ ] Validar **Vercel Analytics** em produção (eventos carregando)

---

## Fase D — Repositório e comunidade

- [ ] README: badges (build, deploy), como contribuir, licença
- [ ] Ajustar `lib/shared.ts` (`gitConfig.user`, `gitConfig.repo`) para o **usuário/repo reais**
- [ ] **Giscus** ou comentários (pós-lançamento, opcional)

---

## Definition of Done (projeto “pronto para divulgar”)

Conforme spec:

- [ ] ≥80% do conteúdo preenchido em **todos** os 9 módulos
- [ ] Gamificação e progresso (`localStorage` + Zustand) validados manualmente
- [ ] Busca funcionando em todo o conteúdo publicado
- [ ] Responsivo testado em 3 larguras
- [ ] Lighthouse: Performance / Acessibilidade / SEO **>90** (ajustar o que faltar)
- [ ] OG image profissional
- [ ] Post LinkedIn + link no currículo e perfil GitHub

---

## Prompt para agente (colar no Cursor / Claude Code)

```markdown
# TAREFA: Continuar o QA Junior Handbook

## Contexto
Repositório Next.js 16 + Fumadocs MDX + Tailwind. Conteúdo em `content/docs/`. Componentes de aprendizado em `components/learning/`, registro em `components/mdx.tsx`. Progresso: Zustand em `lib/progress.ts`, IDs em `lib/checklist-registry.ts`. Idioma: **português brasileiro**, tom de QA sênior conversando com júnior. **Sem backend** — só estático + localStorage.

## Objetivo
Completar o handbook até o “Definition of Done” descrito em `docs/PROXIMOS_PASSOS.md`, priorizando **conteúdo denso** nos capítulos que ainda têm placeholder `[Conteúdo a desenvolver]`.

## Regras de conteúdo (obrigatório por capítulo novo ou expandido)
1. Mínimo **1500 palavras** de texto corrido (não contar só imports/componentes).
2. Cada conceito: definição + relevância no mercado BR + exemplo concreto + **erro comum**.
3. Onde fizer sentido: código real (pytest, Playwright, GitHub Actions YAML).
4. Incluir `<Quiz />` com `id` único, `KeyTakeaways`, `ChecklistItem` com ID já existente no registry **ou** atualizar `lib/checklist-registry.ts` se criar capítulo novo.
5. Manter `DifficultyBadge` + `EstimatedTime` no topo dos capítulos que já usam esse padrão.
6. Não adicionar dependência de links externos para entender o capítulo.

## Ordem de execução
1. Módulo 1 Fundamentos (todos os `.mdx` em `content/docs/01-fundamentos/`).
2. Módulos 2→6 e 8→9 na sequência numérica.
3. Revisar `content/docs/index.mdx` e métricas.
4. Ajustar números de quizzes totais / placeholders no registry se necessário.

## Entrega por PR/commit
- Commits por módulo ou por capítulo, mensagens claras em português ou inglês consistente com o repo.
- Rodar `npm run build` antes de finalizar e corrigir erros de MDX/TS.

## Não fazer
- Refatorações grandes fora do necessário.
- Backend ou auth.
- Apagar componentes de gamificação sem substituir por equivalente.

## Referência de estrutura de pastas
`content/docs/0X-*/**.mdx`, `meta.json` por pasta, `content/docs/meta.json` na raiz.

Após conteúdo: sitemap, robots, OG estático, revisão Lighthouse, deploy Vercel.
```

---

## Manutenção deste arquivo

Quando um módulo estiver concluído, marque as caixas correspondentes na Fase A e atualize a seção “Estado atual”. Opcionalmente, mova tarefas concluídas para um changelog no README.
