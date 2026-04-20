'use client';

import { useEffect, type ReactNode } from 'react';
import { useProgressStore } from '@/lib/progress';

export function FocusModeRoot({ children }: { children: ReactNode }) {
  const focusMode = useProgressStore((s) => s.focusMode);

  useEffect(() => {
    if (focusMode) {
      document.documentElement.dataset.handbookFocus = 'true';
    } else {
      delete document.documentElement.dataset.handbookFocus;
    }

    return () => {
      delete document.documentElement.dataset.handbookFocus;
    };
  }, [focusMode]);

  return <>{children}</>;
}
