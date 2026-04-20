'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/lib/progress';

export function ChapterStateSync({ chapterPath }: { chapterPath: string }) {
  const setLastVisitedChapter = useProgressStore((s) => s.setLastVisitedChapter);

  useEffect(() => {
    setLastVisitedChapter(chapterPath);
  }, [chapterPath, setLastVisitedChapter]);

  return null;
}
