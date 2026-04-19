'use client';

import { ProgressBar } from './ProgressBar';

/** Barra compacta para o header Fumadocs (nav.children). */
export function HeaderProgress() {
  return (
    <div className="hidden min-w-0 flex-1 px-2 md:flex md:max-w-[min(240px,28vw)] lg:px-4">
      <ProgressBar className="w-full" />
    </div>
  );
}
