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
      className="pointer-events-none fixed left-[-9999px] top-0 w-[420px] overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="relative flex flex-col items-center px-9 py-11 text-center">
        <div className="flex items-center gap-2">
          <Logo size={34} />
          <span className="text-lg font-bold tracking-tight text-foreground">HomePilot</span>
        </div>

        <Badge tone="neutral" size="sm" className="mt-7">
          우리 부부의 첫 집 준비도
        </Badge>

        <div className="mt-6 drop-shadow-sm">
          <ScoreRing score={score} size={188} color={TONE_CSS_VAR[tone]} />
        </div>

        <Badge tone={tone} size="md" className="mt-6">
          {tier}
        </Badge>

        <p className="mt-4 max-w-[320px] text-base leading-relaxed text-foreground">
          {tierSummary}
        </p>

        <div className="mt-8 w-full rounded-2xl border border-border bg-white/90 p-5 text-left shadow-[0_8px_24px_-8px_rgba(26,51,108,0.16)]">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Target className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-subtle-foreground">
              지금 가장 중요한 과제
            </p>
          </div>
          <p className="mt-2.5 text-lg font-bold leading-snug text-foreground">{priorityTask}</p>
        </div>
      </div>
    </div>
  );
});

export default ShareableResultCard;
