import type { ScenarioCard } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

function ScenarioCardView({
  title,
  bullets,
  emphasis = false,
}: {
  title: string;
  bullets: string[];
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        emphasis ? "border-accent/30 bg-accent/[0.04]" : "border-border bg-surface"
      }`}
    >
      <Badge tone={emphasis ? "accent" : "neutral"} size="sm" className="mb-2">
        {emphasis ? "대안 시나리오" : "현재 계획"}
      </Badge>
      <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <span className="mt-0.5 text-accent">·</span>
            {highlightNumbers(bullet)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScenarioComparison({
  currentPlanBullets,
  scenarios,
}: {
  currentPlanBullets: string[];
  scenarios: ScenarioCard[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-xl font-bold tracking-tight">조건을 바꾸면 어떻게 달라질까요?</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <ScenarioCardView title="현재 계획" bullets={currentPlanBullets} />
        {scenarios.map((scenario) => (
          <ScenarioCardView
            key={scenario.id}
            title={scenario.title}
            bullets={scenario.bullets}
            emphasis
          />
        ))}
      </div>

      <p className="mt-4 text-[11px] text-subtle-foreground">
        위 비교는 방향성을 보여주는 참고용 추정이며, 실제 수치와는 차이가 있을 수 있어요.
      </p>
    </div>
  );
}
