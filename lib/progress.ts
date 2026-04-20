'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CHECKLIST_IDS, TOTAL_CHAPTERS } from './checklist-registry';

interface FlashcardState {
  confidence: number;
  lastReviewed: number;
}

interface QuizResultState {
  pick: number;
  correct: boolean;
  attemptCount: number;
  updatedAt: number;
  chapterUrl?: string;
  chapterTitle?: string;
}

interface MissionStepState {
  pick: number;
  correct: boolean;
  updatedAt: number;
}

export interface MissionResultState {
  chapterUrl: string;
  chapterTitle: string;
  totalSteps: number;
  steps: Record<string, MissionStepState>;
  completed: boolean;
  correctCount: number;
  updatedAt: number;
}

export interface ProgressSnapshot {
  checklist: Record<string, boolean>;
  quizResults: Record<string, QuizResultState>;
  flashcards: Record<string, FlashcardState>;
  bookmarks: Record<string, boolean>;
  reviewLater: Record<string, boolean>;
  missionResults: Record<string, MissionResultState>;
  lastVisitedChapter: string | null;
  focusMode: boolean;
}

interface ProgressState extends ProgressSnapshot {
  toggleChecklist: (id: string) => void;
  setChecklist: (id: string, done: boolean) => void;
  setQuizPick: (
    id: string,
    pick: number,
    meta?: {
      correct?: boolean;
      chapterUrl?: string;
      chapterTitle?: string;
    },
  ) => void;
  clearQuiz: (id: string) => void;
  setFlashcardConfidence: (term: string, delta: number) => void;
  toggleBookmark: (chapterUrl: string) => void;
  toggleReviewLater: (chapterUrl: string) => void;
  setLastVisitedChapter: (chapterUrl: string) => void;
  setFocusMode: (enabled: boolean) => void;
  setMissionAnswer: (input: {
    missionId: string;
    missionTitle: string;
    chapterUrl: string;
    totalSteps: number;
    stepId: string;
    pick: number;
    correct: boolean;
  }) => void;
  resetMission: (missionId: string) => void;
  completedChecklistCount: () => number;
  completionPercent: () => number;
}

function initialChecklist(): Record<string, boolean> {
  return Object.fromEntries(CHECKLIST_IDS.map((id) => [id, false]));
}

function toggleFlag(map: Record<string, boolean>, key: string) {
  return { ...map, [key]: !map[key] };
}

export function getIncorrectQuizChapterUrls(
  snapshot: Pick<ProgressSnapshot, 'quizResults'>,
): string[] {
  return [
    ...new Set(
      Object.values(snapshot.quizResults)
        .filter((result) => result.chapterUrl && !result.correct)
        .map((result) => result.chapterUrl as string),
    ),
  ];
}

export function getMissionUrlsToReview(
  snapshot: Pick<ProgressSnapshot, 'missionResults'>,
): string[] {
  return Object.entries(snapshot.missionResults)
    .filter(([, mission]) => !mission.completed || mission.correctCount < mission.totalSteps)
    .map(([missionId]) => missionId);
}

export function getBookmarkedChapterUrls(
  snapshot: Pick<ProgressSnapshot, 'bookmarks'>,
): string[] {
  return Object.entries(snapshot.bookmarks)
    .filter(([, enabled]) => enabled)
    .map(([chapterUrl]) => chapterUrl);
}

export function getReviewLaterChapterUrls(
  snapshot: Pick<ProgressSnapshot, 'reviewLater'>,
): string[] {
  return Object.entries(snapshot.reviewLater)
    .filter(([, enabled]) => enabled)
    .map(([chapterUrl]) => chapterUrl);
}

export function getLowConfidenceFlashcards(
  snapshot: Pick<ProgressSnapshot, 'flashcards'>,
): string[] {
  return Object.entries(snapshot.flashcards)
    .filter(([, flashcard]) => flashcard.confidence <= 2)
    .map(([term]) => term);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      checklist: initialChecklist(),
      quizResults: {},
      flashcards: {},
      bookmarks: {},
      reviewLater: {},
      missionResults: {},
      lastVisitedChapter: null,
      focusMode: false,
      toggleChecklist: (id) =>
        set((s) => ({
          checklist: { ...s.checklist, [id]: !s.checklist[id] },
        })),
      setChecklist: (id, done) =>
        set((s) => ({
          checklist: { ...s.checklist, [id]: done },
        })),
      setQuizPick: (id, pick, meta) =>
        set((s) => ({
          quizResults: {
            ...s.quizResults,
            [id]: {
              pick,
              correct: meta?.correct ?? s.quizResults[id]?.correct ?? false,
              attemptCount: (s.quizResults[id]?.attemptCount ?? 0) + 1,
              updatedAt: Date.now(),
              chapterUrl: meta?.chapterUrl ?? s.quizResults[id]?.chapterUrl,
              chapterTitle: meta?.chapterTitle ?? s.quizResults[id]?.chapterTitle,
            },
          },
        })),
      clearQuiz: (id) =>
        set((s) => {
          const next = { ...s.quizResults };
          delete next[id];
          return { quizResults: next };
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
      toggleBookmark: (chapterUrl) =>
        set((s) => ({
          bookmarks: toggleFlag(s.bookmarks, chapterUrl),
        })),
      toggleReviewLater: (chapterUrl) =>
        set((s) => ({
          reviewLater: toggleFlag(s.reviewLater, chapterUrl),
        })),
      setLastVisitedChapter: (chapterUrl) =>
        set(() => ({
          lastVisitedChapter: chapterUrl,
        })),
      setFocusMode: (enabled) =>
        set(() => ({
          focusMode: enabled,
        })),
      setMissionAnswer: ({ missionId, missionTitle, chapterUrl, totalSteps, stepId, pick, correct }) =>
        set((s) => {
          const current = s.missionResults[missionId] ?? {
            chapterUrl,
            chapterTitle: missionTitle,
            totalSteps,
            steps: {},
            completed: false,
            correctCount: 0,
            updatedAt: 0,
          };
          const steps = {
            ...current.steps,
            [stepId]: {
              pick,
              correct,
              updatedAt: Date.now(),
            },
          };
          const answeredSteps = Object.keys(steps).length;
          const correctCount = Object.values(steps).filter((step) => step.correct).length;

          return {
            missionResults: {
              ...s.missionResults,
              [missionId]: {
                ...current,
                chapterUrl,
                chapterTitle: missionTitle,
                totalSteps,
                steps,
                correctCount,
                completed: answeredSteps >= totalSteps,
                updatedAt: Date.now(),
              },
            },
          };
        }),
      resetMission: (missionId) =>
        set((s) => {
          const next = { ...s.missionResults };
          delete next[missionId];
          return { missionResults: next };
        }),
      completedChecklistCount: () => {
        const checklist = get().checklist;
        return CHECKLIST_IDS.filter((id) => checklist[id]).length;
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
        quizResults: s.quizResults,
        flashcards: s.flashcards,
        bookmarks: s.bookmarks,
        reviewLater: s.reviewLater,
        missionResults: s.missionResults,
        lastVisitedChapter: s.lastVisitedChapter,
        focusMode: s.focusMode,
      }),
      merge: (persisted, current) => {
        const p = persisted as (Partial<ProgressState> & { quizPicks?: Record<string, number> }) | undefined;
        const legacyQuizResults = Object.fromEntries(
          Object.entries(p?.quizPicks ?? {}).map(([id, pick]) => [
            id,
            {
              pick,
              correct: false,
              attemptCount: 1,
              updatedAt: 0,
            },
          ]),
        );

        if (!p?.checklist) return current;

        return {
          ...current,
          checklist: { ...initialChecklist(), ...p.checklist },
          quizResults: { ...legacyQuizResults, ...(p.quizResults ?? {}) },
          flashcards: p.flashcards ?? {},
          bookmarks: p.bookmarks ?? {},
          reviewLater: p.reviewLater ?? {},
          missionResults: p.missionResults ?? {},
          lastVisitedChapter: p.lastVisitedChapter ?? null,
          focusMode: p.focusMode ?? false,
        };
      },
    },
  ),
);
