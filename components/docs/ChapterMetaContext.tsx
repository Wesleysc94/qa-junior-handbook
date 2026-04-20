'use client';

import { createContext, useContext, type ReactNode } from 'react';

interface ChapterMeta {
  chapterPath: string;
  chapterTitle: string;
  chapterUrl: string;
  filePath: string;
}

const ChapterMetaContext = createContext<ChapterMeta | null>(null);

export function ChapterMetaProvider({
  value,
  children,
}: {
  value: ChapterMeta;
  children: ReactNode;
}) {
  return <ChapterMetaContext.Provider value={value}>{children}</ChapterMetaContext.Provider>;
}

export function useChapterMeta() {
  return useContext(ChapterMetaContext);
}
