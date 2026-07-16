import type { StrategyStep } from "@/lib/diagnosis";

export default function StrategySteps({ steps }: { steps: StrategyStep[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-base font-semibold">추천 준비 전략</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.order}
            className="rounded-xl border border-border bg-surface-muted/40 p-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {step.order}
            </span>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {step.title}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
