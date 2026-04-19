'use client';

import mermaid from 'mermaid';
import { useEffect, useId, useRef } from 'react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    void (async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${uid}`, chart);
        if (!cancelled) el.innerHTML = svg;
      } catch {
        if (!cancelled)
          el.textContent = 'Não foi possível renderizar o diagrama. Verifique a sintaxe Mermaid.';
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, uid]);

  return (
    <div
      ref={ref}
      className="my-6 overflow-x-auto rounded-xl border border-fd-border bg-fd-muted/30 p-4 text-sm [&_svg]:mx-auto"
      data-mermaid-chart
    />
  );
}
