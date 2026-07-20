import { forwardRef } from "react";
import { Home as HomeIcon } from "lucide-react";
import ScoreRing from "./score-ring";
import { Badge } from "@/components/ui/badge";
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
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-[-9999px] top-0 flex w-[420px] flex-col items-center bg-background px-8 py-10 text-center"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          <HomeIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-base font-bold tracking-tight text-foreground">HomePilot</span>
      </div>

      <p className="mt-8 text-sm font-medium text-muted-foreground">우리 부부의 첫 집 준비도</p>

      <div className="mt-6">
        <ScoreRing score={score} size={180} color="var(--brand-600)" />
      </div>

      <Badge tone="accent" size="md" className="mt-6">
        {tier}
      </Badge>

      <p className="mt-4 max-w-[320px] text-base leading-relaxed text-foreground">
        {tierSummary}
      </p>

      <div className="mt-8 w-full rounded-2xl bg-surface-muted p-4">
        <p className="text-xs font-medium text-muted-foreground">지금 가장 중요한 과제</p>
        <p className="mt-1.5 text-base font-bold text-foreground">{priorityTask}</p>
      </div>

      <p className="mt-8 text-xs text-subtle-foreground">HomePilot에서 무료로 진단해보세요</p>
    </div>
  );
});

export default ShareableResultCard;
