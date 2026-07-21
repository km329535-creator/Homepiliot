import type { StrategyStep } from "@/lib/diagnosis";
import { highlightNumbers } from "@/lib/highlight-text";

export default function StrategySteps({ steps }: { steps: StrategyStep[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-xl font-bold tracking-tight">추천 준비 전략</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.order}
            className="rounded-xl border border-border bg-surface-muted/40 p-4"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {step.order}
            </span>
            <p className="mt-3 text-base font-semibold text-foreground">
              {step.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {highlightNumbers(step.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
