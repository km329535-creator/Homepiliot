import { ClipboardList } from "lucide-react";
import type { RoadmapStep } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";

export default function NextActionCard({ roadmap }: { roadmap: RoadmapStep[] }) {
  const first = roadmap[0];
  const next = roadmap[1];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-muted-foreground">다음 행동</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <ClipboardList className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-3xl font-bold tracking-tight">
          {roadmap.length}
          <span className="text-lg font-medium text-muted-foreground">단계</span>
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-2 rounded-xl bg-surface-muted p-3">
        {first && (
          <div>
            <div className="flex items-center gap-1.5">
              <Badge tone="accent">{first.timeframe}</Badge>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {first.title}
            </p>
          </div>
        )}
        {next && (
          <p className="text-sm leading-relaxed text-subtle-foreground">
            다음: {next.title}
          </p>
        )}
      </div>
    </div>
  );
}
