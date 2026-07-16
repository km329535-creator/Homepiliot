import type { RoadmapStep } from "@/lib/diagnosis";

export default function NextActionCard({ roadmap }: { roadmap: RoadmapStep[] }) {
  const first = roadmap[0];
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted-foreground">다음 행동</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl">📋</span>
        <span className="text-3xl font-bold tracking-tight">
          {roadmap.length}
          <span className="text-base font-medium text-muted-foreground">단계</span>
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        가장 먼저 할 일:{" "}
        <span className="font-medium text-foreground">{first?.title}</span>
      </p>
    </div>
  );
}
