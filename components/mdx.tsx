import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ChecklistItem } from '@/components/learning/ChecklistItem';
import { DifficultyBadge } from '@/components/learning/DifficultyBadge';
import { EstimatedTime } from '@/components/learning/EstimatedTime';
import { Flashcard } from '@/components/learning/Flashcard';
import { InterviewQuestion } from '@/components/learning/InterviewQuestion';
import { KeyTakeaways } from '@/components/learning/KeyTakeaways';
import { Quiz } from '@/components/learning/Quiz';
import { Mermaid } from '@/components/mdx/Mermaid';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ChecklistItem,
    DifficultyBadge,
    EstimatedTime,
    Flashcard,
    InterviewQuestion,
    KeyTakeaways,
    Quiz,
    Mermaid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
