import { CHECKLIST_IDS } from './checklist-registry';

export type DifficultyLevel = 'iniciante' | 'intermediario' | 'avancado';

export interface ModuleDefinition {
  moduleId: string;
  moduleName: string;
  totalChapters: number;
  estimatedHours: number;
  difficulty: DifficultyLevel;
  /** prefixo dos IDs em checklist-registry (ex.: `01-fundamentos`) */
  checklistPrefix: string;
  /** primeiro capítulo do módulo (slug completo após /docs/) */
  entrySlug: string;
  /** capítulo de missão guiada do módulo */
  missionSlug?: string;
}

export const HANDBOOK_MODULES: ModuleDefinition[] = [
  {
    moduleId: '01-fundamentos',
    moduleName: 'Fundamentos',
    checklistPrefix: '01-fundamentos',
    entrySlug: '01-fundamentos/o-que-e-qa',
    missionSlug: '01-fundamentos/missao-priorizacao-release',
    totalChapters: 7,
    estimatedHours: 9,
    difficulty: 'iniciante',
  },
  {
    moduleId: '02-qa-manual',
    moduleName: 'QA manual',
    checklistPrefix: '02-qa-manual',
    entrySlug: '02-qa-manual/casos-de-teste',
    missionSlug: '02-qa-manual/missao-triagem-checkout',
    totalChapters: 6,
    estimatedHours: 11,
    difficulty: 'iniciante',
  },
  {
    moduleId: '03-testes-api',
    moduleName: 'Testes de API',
    checklistPrefix: '03-testes-api',
    entrySlug: '03-testes-api/rest-fundamentos',
    missionSlug: '03-testes-api/missao-cobertura-pedidos',
    totalChapters: 8,
    estimatedHours: 13,
    difficulty: 'intermediario',
  },
  {
    moduleId: '04-automacao-e2e',
    moduleName: 'Automação E2E',
    checklistPrefix: '04-automacao-e2e',
    entrySlug: '04-automacao-e2e/comparativo-ferramentas',
    missionSlug: '04-automacao-e2e/missao-fluxo-flaky',
    totalChapters: 8,
    estimatedHours: 15,
    difficulty: 'intermediario',
  },
  {
    moduleId: '05-cicd',
    moduleName: 'CI/CD para QA',
    checklistPrefix: '05-cicd',
    entrySlug: '05-cicd/conceitos',
    missionSlug: '05-cicd/missao-gate-release',
    totalChapters: 6,
    estimatedHours: 9,
    difficulty: 'intermediario',
  },
  {
    moduleId: '06-soft-skills',
    moduleName: 'Soft skills',
    checklistPrefix: '06-soft-skills',
    entrySlug: '06-soft-skills/comunicacao-com-dev',
    missionSlug: '06-soft-skills/missao-alinhamento-squad',
    totalChapters: 5,
    estimatedHours: 6,
    difficulty: 'iniciante',
  },
  {
    moduleId: '07-meus-projetos',
    moduleName: 'Meus projetos',
    checklistPrefix: '07-meus-projetos',
    entrySlug: '07-meus-projetos/toolshop-overview',
    missionSlug: '07-meus-projetos/missao-portfolio-tour',
    totalChapters: 8,
    estimatedHours: 8,
    difficulty: 'intermediario',
  },
  {
    moduleId: '08-entrevista',
    moduleName: 'Entrevista',
    checklistPrefix: '08-entrevista',
    entrySlug: '08-entrevista/perguntas-comportamentais',
    missionSlug: '08-entrevista/missao-entrevista-guiada',
    totalChapters: 8,
    estimatedHours: 11,
    difficulty: 'intermediario',
  },
  {
    moduleId: '09-glossario',
    moduleName: 'Glossário',
    checklistPrefix: '09-glossario',
    entrySlug: '09-glossario/termos-tecnicos',
    totalChapters: 1,
    estimatedHours: 2,
    difficulty: 'iniciante',
  },
];

export function moduleChecklistIds(prefix: string): string[] {
  return CHECKLIST_IDS.filter((id) => id.startsWith(prefix));
}
