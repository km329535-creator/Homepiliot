import { forwardRef } from "react";
import { Target } from "lucide-react";
import ScoreRing from "./score-ring";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/logo";
import { TIER_TONE, TONE_CSS_VAR } from "./readiness-score-card";
import type { ReadinessTier } from "@/lib/diagnosis";

const ShareableResultCard = forwardRef<
  HTMLDivElement,
  {
    score: number;
    tier: ReadinessTier;
    tierSummary: string;
    priorityTask: string;
  }
>(function ShareableResultCard({ score, tier, tierSummary, priorityTask }, ref) {
  const tone = TIER_TONE[tier];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-[-9999px] top-0 flex w-[420px] flex-col items-center bg-gradient-to-b from-brand-50 to-white px-8 py-10 text-center"
    >
      <div className="flex items-center gap-2">
        <Logo size={32} />
        <span className="text-base font-bold tracking-tight text-foreground">HomePilot</span>
      </div>

      <p className="mt-8 text-sm font-medium text-muted-foreground">우리 부부의 첫 집 준비도</p>

      <div className="mt-6">
        <ScoreRing score={score} size={180} color={TONE_CSS_VAR[tone]} />
      </div>

      <Badge tone={tone} size="md" className="mt-6">
        {tier}
      </Badge>

      <p className="mt-4 max-w-[320px] text-base leading-relaxed text-foreground">
        {tierSummary}
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-white p-4 shadow-sm">
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Target className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          지금 가장 중요한 과제
        </p>
        <p className="mt-1.5 text-base font-bold text-foreground">{priorityTask}</p>
      </div>

      <div className="mt-8 flex items-center gap-1.5 text-xs text-subtle-foreground">
        <Logo size={16} />
        HomePilot에서 무료로 진단해보세요
      </div>
    </div>
  );
});

export default ShareableResultCard;
