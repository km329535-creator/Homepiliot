import { Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScoreRing from "./score-ring";
import type { ReadinessTier } from "@/lib/diagnosis";
import { highlightNumbers } from "@/lib/highlight-text";

export default function ReadinessScoreCard({
  score,
  tier,
  tierSummary,
}: {
  score: number;
  tier: ReadinessTier;
  tierSummary: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <Badge icon={Gauge} tone="neutral" className="self-start">
        첫 집 준비도
      </Badge>
      <div className="mt-3 flex items-center gap-4">
        <ScoreRing score={score} />
        <Badge tone="accent">{tier}</Badge>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      <div className="mt-4 flex-1 rounded-xl bg-surface-muted p-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {highlightNumbers(tierSummary)} 입력 조건을 바탕으로 한 참고 지표예요.
        </p>
      </div>
    </div>
  );
}
