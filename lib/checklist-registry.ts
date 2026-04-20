/**
 * IDs persistidos pelos ChecklistItems — um por capítulo.
 * Formato: `{pasta}-{arquivo}` (sem extensão).
 */
export const CHECKLIST_IDS = [
  'index-boas-vindas',
  '01-fundamentos-o-que-e-qa',
  '01-fundamentos-piramide-de-testes',
  '01-fundamentos-tipos-de-teste',
  '01-fundamentos-severidade-vs-prioridade',
  '01-fundamentos-ciclo-de-vida-bug',
  '01-fundamentos-metodologias-ageis',
  '01-fundamentos-missao-priorizacao-release',
  '02-qa-manual-casos-de-teste',
  '02-qa-manual-checklists',
  '02-qa-manual-bug-reports',
  '02-qa-manual-analise-de-risco',
  '02-qa-manual-plano-de-testes',
  '02-qa-manual-missao-triagem-checkout',
  '03-testes-api-rest-fundamentos',
  '03-testes-api-status-codes',
  '03-testes-api-headers',
  '03-testes-api-postman',
  '03-testes-api-pytest-httpx',
  '03-testes-api-cenarios-negativos',
  '03-testes-api-autenticacao',
  '03-testes-api-missao-cobertura-pedidos',
  '04-automacao-e2e-comparativo-ferramentas',
  '04-automacao-e2e-setup-playwright',
  '04-automacao-e2e-page-object-model',
  '04-automacao-e2e-locators',
  '04-automacao-e2e-assertions',
  '04-automacao-e2e-esperas',
  '04-automacao-e2e-hooks-fixtures',
  '04-automacao-e2e-missao-fluxo-flaky',
  '05-cicd-conceitos',
  '05-cicd-github-actions-basico',
  '05-cicd-pipeline-qa',
  '05-cicd-secrets',
  '05-cicd-artefatos',
  '05-cicd-missao-gate-release',
  '06-soft-skills-comunicacao-com-dev',
  '06-soft-skills-time-agil',
  '06-soft-skills-reportar-bug',
  '06-soft-skills-postura-profissional',
  '06-soft-skills-missao-alinhamento-squad',
  '07-meus-projetos-toolshop-overview',
  '07-meus-projetos-toolshop-decisoes',
  '07-meus-projetos-swaglab-overview',
  '07-meus-projetos-swaglab-pom-pratica',
  '07-meus-projetos-swaglab-cicd-pratica',
  '07-meus-projetos-swaglab-bug-documentado',
  '07-meus-projetos-perguntas-recrutador',
  '07-meus-projetos-missao-portfolio-tour',
  '08-entrevista-perguntas-comportamentais',
  '08-entrevista-perguntas-tecnicas-manual',
  '08-entrevista-perguntas-tecnicas-api',
  '08-entrevista-perguntas-tecnicas-e2e',
  '08-entrevista-perguntas-cicd',
  '08-entrevista-simulados',
  '08-entrevista-negociacao-salario',
  '08-entrevista-missao-entrevista-guiada',
  '09-glossario-termos-tecnicos',
] as const;

export type ChecklistId = (typeof CHECKLIST_IDS)[number];

export const TOTAL_CHAPTERS = CHECKLIST_IDS.length;

export const TOTAL_QUIZZES = TOTAL_CHAPTERS - 1;

export const TOTAL_MISSIONS = CHECKLIST_IDS.filter((id) => id.includes('-missao-')).length;
