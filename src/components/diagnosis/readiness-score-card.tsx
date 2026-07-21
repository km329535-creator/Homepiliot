import { Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScoreRing from "./score-ring";
import type { ReadinessTier } from "@/lib/diagnosis";
import { highlightNumbers, type HighlightTone } from "@/lib/highlight-text";

export const TIER_TONE: Record<ReadinessTier, HighlightTone> = {
  "실행 가능": "positive",
  "준비 단계": "accent",
  "준비 중": "warning",
  "준비 필요": "negative",
};

const TONE_TEXT_CLASS: Record<HighlightTone, string> = {
  positive: "text-positive",
  accent: "text-accent",
  warning: "text-warning",
  negative: "text-negative",
  neutral: "text-foreground",
};

const TONE_BG_CLASS: Record<HighlightTone, string> = {
  positive: "bg-positive",
  accent: "bg-accent",
  warning: "bg-warning",
  negative: "bg-negative",
  neutral: "bg-foreground",
};

export const TONE_CSS_VAR: Record<HighlightTone, string> = {
  positive: "var(--positive)",
  accent: "var(--accent)",
  warning: "var(--warning)",
  negative: "var(--negative)",
  neutral: "var(--foreground)",
};

export default function ReadinessScoreCard({
  score,
  tier,
  tierSummary,
}: {
  score: number;
  tier: ReadinessTier;
  tierSummary: string;
}) {
  const tone = TIER_TONE[tier];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <Badge icon={Gauge} tone="neutral" className="mb-5">
        첫 집 준비도
      </Badge>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <ScoreRing score={score} size={132} color={TONE_CSS_VAR[tone]} />
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className={`text-5xl font-extrabold tracking-tight ${TONE_TEXT_CLASS[tone]}`}>
              {score}
            </span>
            <span className="text-base font-semibold text-subtle-foreground">/ 100점</span>
            <Badge tone={tone} size="md">
              {tier}
            </Badge>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className={`h-full rounded-full transition-all ${TONE_BG_CLASS[tone]}`}
              style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {highlightNumbers(tierSummary, tone)} 입력 조건을 바탕으로 한 참고 지표예요.
          </p>
        </div>
      </div>
    </div>
  );
}
