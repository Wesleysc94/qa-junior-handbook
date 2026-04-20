import { HANDBOOK_MODULES } from '@/lib/modules';
import { ModuleProgress } from '@/components/learning/ModuleProgress';

export function ModulesGrid() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
          Módulos
        </h2>
        <p className="mb-10 max-w-2xl text-fd-muted-foreground">
          Progresso calculado pelos checkpoints de cada capítulo (armazenado localmente no seu
          navegador).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HANDBOOK_MODULES.map((m) => (
            <ModuleProgress
              key={m.moduleId}
              moduleId={m.moduleId}
              moduleName={m.moduleName}
              totalChapters={m.totalChapters}
              estimatedHours={m.estimatedHours}
              difficulty={m.difficulty}
              entrySlug={m.entrySlug}
              missionSlug={m.missionSlug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
