# Próximos passos — QA Junior Handbook v2

**Repositório:** [github.com/Wesleysc94/qa-junior-handbook](https://github.com/Wesleysc94/qa-junior-handbook)

Este arquivo registra o estado operacional da revisão `v2` mobile-first, centrada em estudo pessoal.

## Status atual da v2

- [x] Estado local expandido com `bookmarks`, `reviewLater`, `lastVisitedChapter`, `focusMode` e `missionResults`
- [x] Home com `Continuar estudando`, `Revisar hoje` e `Missões em andamento`
- [x] Rotas públicas `/docs/revisao` e `/docs/como-usar`
- [x] 8 missões guiadas publicadas para os módulos `01–08`
- [x] Assets em `public/case-studies/*`
- [x] CTA por capítulo simplificado para estudo pessoal
- [x] Hub de revisão alimentado por quiz, missão, favoritos e flashcards
- [x] Modo foco persistido localmente na shell de docs
- [x] `npm run audit:content`
- [x] `npm run types:check`
- [x] `npm run lint`
- [x] `npm run test:e2e`
- [x] `npm run build`

## Validação concluída

- [x] Smoke da home em `320`, `390`, `430`, `768` e `1280`
- [x] Persistência local de bookmark, revisar depois e modo foco
- [x] Missão guiada concluível só por toque
- [x] Revisão refletindo favoritos, quizzes e missões
- [x] Build estático das rotas `/docs/revisao` e `/docs/como-usar`

## Pendente fora do repositório

- [ ] Fazer novo deploy da v2, se quiser publicar estas mudanças na produção atual
- [ ] Registrar Lighthouse final da home e de uma página de docs após o deploy da v2

## Rotina de validação local

```bash
npm install
npm run audit:content
npm run types:check
npm run lint
npm run test:e2e
npm run build
```

## Observações

- A integração do Fumadocs continua usando geração local da `.source` via `scripts/generate-fumadocs-source.mjs`.
- O handbook agora rastreia 58 capítulos, incluindo 8 missões guiadas.
- Produção pública atual continua em `https://qa-junior-handbook.vercel.app` até que esta revisão seja publicada.
