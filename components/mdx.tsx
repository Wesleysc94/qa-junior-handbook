import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CaseStudyHero } from '@/components/learning/CaseStudyHero';
import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { DecisionStep } from '@/components/learning/DecisionStep';
import { DifficultyBadge } from '@/components/learning/DifficultyBadge';
import { EvidenceCard } from '@/components/learning/EvidenceCard';
import { EstimatedTime } from '@/components/learning/EstimatedTime';
import { Flashcard } from '@/components/learning/Flashcard';
import { InterviewQuestion } from '@/components/learning/InterviewQuestion';
import { KeyTakeaways } from '@/components/learning/KeyTakeaways';
import { MissionProgress } from '@/components/learning/MissionProgress';
import { MissionSummary } from '@/components/learning/MissionSummary';
import { PortfolioTourCard } from '@/components/learning/PortfolioTourCard';
import { Quiz } from '@/components/learning/Quiz';
import { Mermaid } from '@/components/mdx/Mermaid';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    CaseStudyHero,
    ChecklistItem,
    DecisionStep,
    DifficultyBadge,
    EvidenceCard,
    EstimatedTime,
    Flashcard,
    InterviewQuestion,
    KeyTakeaways,
    MissionProgress,
    MissionSummary,
    PortfolioTourCard,
    Quiz,
    Mermaid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
