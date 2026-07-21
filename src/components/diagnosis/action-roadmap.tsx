import type { RoadmapStatusTag, RoadmapStep } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

const STATUS_TONE: Record<RoadmapStatusTag, "positive" | "accent" | "neutral"> = {
  "지금": "positive",
  "다음": "accent",
  "예정": "neutral",
  "조건 결정 후": "neutral",
};

export default function ActionRoadmap({ roadmap }: { roadmap: RoadmapStep[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold tracking-tight">실행 로드맵</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {roadmap.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-border bg-surface-muted/40 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <Badge tone={STATUS_TONE[step.statusTag]} size="sm">
                {step.statusTag}
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-accent">{step.timeframe}</p>
            <p className="mt-1 break-keep text-base font-semibold leading-relaxed text-foreground">
              {highlightNumbers(step.title, STATUS_TONE[step.statusTag])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
