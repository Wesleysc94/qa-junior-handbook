'use client';

import Link from 'fumadocs-core/link';
import { Shield } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import { appName } from '@/lib/shared';

export function NavTitleSlot(props: ComponentProps<'a'>) {
  return (
    <Link
      href={props.href ?? '/'}
      className={cn('inline-flex items-center gap-2 font-semibold text-fd-foreground', props.className)}
    >
      <Shield className="size-5 text-[hsl(188_95%_53%)]" aria-hidden />
      {appName}
    </Link>
  );
}
