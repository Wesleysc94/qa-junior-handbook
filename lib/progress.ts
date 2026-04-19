'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CHECKLIST_IDS, TOTAL_CHAPTERS } from './checklist-registry';

interface FlashcardState {
  /** 0 = precisa rever mais; valores maiores = mais confiante */
  confidence: number;
  lastReviewed: number;
}

interface ProgressState {
  checklist: Record<string, boolean>;
  /** Índice da opção escolhida (persistido para reabrir o resultado) */
  quizPicks: Record<string, number>;
  flashcards: Record<string, FlashcardState>;
  toggleChecklist: (id: string) => void;
  setChecklist: (id: string, done: boolean) => void;
  setQuizPick: (id: string, pick: number) => void;
  clearQuiz: (id: string) => void;
  setFlashcardConfidence: (term: string, delta: number) => void;
  completedChecklistCount: () => number;
  completionPercent: () => number;
}

function initialChecklist(): Record<string, boolean> {
  return Object.fromEntries(CHECKLIST_IDS.map((id) => [id, false]));
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      checklist: initialChecklist(),
      quizPicks: {},
      flashcards: {},
      toggleChecklist: (id) =>
        set((s) => ({
          checklist: { ...s.checklist, [id]: !s.checklist[id] },
        })),
      setChecklist: (id, done) =>
        set((s) => ({
          checklist: { ...s.checklist, [id]: done },
        })),
      setQuizPick: (id, pick) =>
        set((s) => ({
          quizPicks: { ...s.quizPicks, [id]: pick },
        })),
      clearQuiz: (id) =>
        set((s) => {
          const next = { ...s.quizPicks };
          delete next[id];
          return { quizPicks: next };
        }),
      setFlashcardConfidence: (term, delta) =>
        set((s) => {
          const prev = s.flashcards[term] ?? { confidence: 0, lastReviewed: 0 };
          return {
            flashcards: {
              ...s.flashcards,
              [term]: {
                confidence: Math.max(0, Math.min(5, prev.confidence + delta)),
                lastReviewed: Date.now(),
              },
            },
          };
        }),
      completedChecklistCount: () => {
        const c = get().checklist;
        return CHECKLIST_IDS.filter((id) => c[id]).length;
      },
      completionPercent: () => {
        const done = get().completedChecklistCount();
        return Math.round((done / TOTAL_CHAPTERS) * 100);
      },
    }),
    {
      name: 'qa-junior-handbook-progress',
      partialize: (s) => ({
        checklist: s.checklist,
        quizPicks: s.quizPicks,
        flashcards: s.flashcards,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<ProgressState> | undefined;
        if (!p?.checklist) return current;
        return {
          ...current,
          checklist: { ...initialChecklist(), ...p.checklist },
          quizPicks: p.quizPicks ?? {},
          flashcards: p.flashcards ?? {},
        };
      },
    },
  ),
);
