import { Mountain, Sprout, Trees } from 'lucide-react';
import { cn } from '@/lib/cn';

const map = {
  iniciante: {
    label: 'Iniciante',
    icon: Sprout,
    className: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  },
  intermediario: {
    label: 'Intermediário',
    icon: Trees,
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-100',
  },
  avancado: {
    label: 'Avançado',
    icon: Mountain,
    className: 'border-red-500/40 bg-red-500/10 text-red-100',
  },
} as const;

export type DifficultyBadgeLevel = keyof typeof map;

export function DifficultyBadge({ level }: { level: DifficultyBadgeLevel }) {
  const cfg = map[level];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        cfg.className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {cfg.label}
    </span>
  );
}
