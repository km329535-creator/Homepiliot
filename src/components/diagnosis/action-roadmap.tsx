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
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-xl font-bold tracking-tight">실행 로드맵</h2>
      <ol className="mx-auto flex max-w-md flex-col items-center">
        {roadmap.map((step, i) => (
          <li key={step.title} className="relative flex flex-col items-center gap-2 pb-8 text-center last:pb-0">
            {i < roadmap.length - 1 && (
              <span className="absolute left-1/2 top-6 h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-border" />
            )}
            <span className="z-10 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-sm font-medium text-accent">{step.timeframe}</p>
              <Badge tone={STATUS_TONE[step.statusTag]} size="md">{step.statusTag}</Badge>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-foreground">
              {highlightNumbers(step.title, STATUS_TONE[step.statusTag])}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
