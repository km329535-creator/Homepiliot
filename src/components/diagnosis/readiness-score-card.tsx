import { Badge } from "@/components/ui/badge";
import ScoreRing from "./score-ring";
import type { ReadinessTier } from "@/lib/diagnosis";

export default function ReadinessScoreCard({
  score,
  tier,
  tierSummary,
  scoreDelta,
}: {
  score: number;
  tier: ReadinessTier;
  tierSummary: string;
  scoreDelta: number | null;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted-foreground">첫 집 준비도</p>
      <div className="mt-3 flex items-center gap-4">
        <ScoreRing score={score} />
        <div>
          <Badge tone="accent">{tier}</Badge>
          {scoreDelta !== null && (
            <p className="mt-2 text-xs text-muted-foreground">
              지난 진단 대비{" "}
              <span className={scoreDelta >= 0 ? "text-positive" : "text-negative"}>
                {scoreDelta >= 0 ? "+" : ""}
                {scoreDelta}점 {scoreDelta >= 0 ? "↑" : "↓"}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex-1 rounded-xl bg-surface-muted p-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {tierSummary} 입력 조건을 바탕으로 한 참고 지표예요.
        </p>
      </div>
    </div>
  );
}
