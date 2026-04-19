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
}

export const HANDBOOK_MODULES: ModuleDefinition[] = [
  {
    moduleId: '01-fundamentos',
    moduleName: 'Fundamentos',
    checklistPrefix: '01-fundamentos',
    entrySlug: '01-fundamentos/o-que-e-qa',
    totalChapters: 6,
    estimatedHours: 8,
    difficulty: 'iniciante',
  },
  {
    moduleId: '02-qa-manual',
    moduleName: 'QA manual',
    checklistPrefix: '02-qa-manual',
    entrySlug: '02-qa-manual/casos-de-teste',
    totalChapters: 5,
    estimatedHours: 10,
    difficulty: 'iniciante',
  },
  {
    moduleId: '03-testes-api',
    moduleName: 'Testes de API',
    checklistPrefix: '03-testes-api',
    entrySlug: '03-testes-api/rest-fundamentos',
    totalChapters: 7,
    estimatedHours: 12,
    difficulty: 'intermediario',
  },
  {
    moduleId: '04-automacao-e2e',
    moduleName: 'Automação E2E',
    checklistPrefix: '04-automacao-e2e',
    entrySlug: '04-automacao-e2e/comparativo-ferramentas',
    totalChapters: 7,
    estimatedHours: 14,
    difficulty: 'intermediario',
  },
  {
    moduleId: '05-cicd',
    moduleName: 'CI/CD para QA',
    checklistPrefix: '05-cicd',
    entrySlug: '05-cicd/conceitos',
    totalChapters: 5,
    estimatedHours: 8,
    difficulty: 'intermediario',
  },
  {
    moduleId: '06-soft-skills',
    moduleName: 'Soft skills',
    checklistPrefix: '06-soft-skills',
    entrySlug: '06-soft-skills/comunicacao-com-dev',
    totalChapters: 4,
    estimatedHours: 5,
    difficulty: 'iniciante',
  },
  {
    moduleId: '07-meus-projetos',
    moduleName: 'Meus projetos',
    checklistPrefix: '07-meus-projetos',
    entrySlug: '07-meus-projetos/toolshop-overview',
    totalChapters: 7,
    estimatedHours: 6,
    difficulty: 'intermediario',
  },
  {
    moduleId: '08-entrevista',
    moduleName: 'Entrevista',
    checklistPrefix: '08-entrevista',
    entrySlug: '08-entrevista/perguntas-comportamentais',
    totalChapters: 7,
    estimatedHours: 10,
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
