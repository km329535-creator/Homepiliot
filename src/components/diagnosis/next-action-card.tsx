import { ClipboardList } from "lucide-react";
import type { RoadmapStep } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

export default function NextActionCard({ roadmap }: { roadmap: RoadmapStep[] }) {
  const first = roadmap[0];
  const next = roadmap[1];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <Badge icon={ClipboardList} tone="neutral" size="md" className="self-start">
        다음 행동
      </Badge>
      <div className="mt-4 flex items-center gap-3.5">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <ClipboardList className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-4xl font-bold tracking-tight">
          {roadmap.length}
          <span className="text-xl font-medium text-muted-foreground">단계</span>
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-2.5 rounded-xl bg-surface-muted p-4">
        {first && (
          <div>
            <div className="flex items-center gap-1.5">
              <Badge tone="accent" size="md">{first.timeframe}</Badge>
            </div>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {highlightNumbers(first.title, "accent")}
            </p>
          </div>
        )}
        {next && (
          <p className="text-base leading-relaxed text-subtle-foreground">
            다음: {highlightNumbers(next.title, "neutral")}
          </p>
        )}
      </div>
    </div>
  );
}
