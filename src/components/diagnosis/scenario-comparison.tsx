import type { ScenarioCard } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers, type HighlightTone } from "@/lib/highlight-text";

type CardTone = "neutral" | "negative" | "positive";

const TONE_LABEL: Record<CardTone, string> = {
  neutral: "현재 계획",
  negative: "비추천 시나리오",
  positive: "추천 시나리오",
};

const TONE_CARD_CLASS: Record<CardTone, string> = {
  neutral: "border-border bg-surface",
  negative: "border-negative/30 bg-negative/[0.04]",
  positive: "border-positive/30 bg-positive/[0.04]",
};

const TONE_BADGE: Record<CardTone, "neutral" | "negative" | "positive"> = {
  neutral: "neutral",
  negative: "negative",
  positive: "positive",
};

const TONE_HIGHLIGHT: Record<CardTone, HighlightTone> = {
  neutral: "neutral",
  negative: "negative",
  positive: "positive",
};

function ScenarioCardView({
  title,
  bullets,
  tone,
}: {
  title: string;
  bullets: string[];
  tone: CardTone;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${TONE_CARD_CLASS[tone]}`}>
      <Badge tone={TONE_BADGE[tone]} size="sm" className="mb-2">
        {TONE_LABEL[tone]}
      </Badge>
      <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <span className="mt-0.5 text-accent">·</span>
            <span className="break-keep">{highlightNumbers(bullet, TONE_HIGHLIGHT[tone])}</span>
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
  const [first, second] = scenarios;
  const badScenario = first.delta <= second.delta ? first : second;
  const goodScenario = first.delta <= second.delta ? second : first;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold tracking-tight">조건을 바꾸면 어떻게 달라질까요?</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <ScenarioCardView title={badScenario.title} bullets={badScenario.bullets} tone="negative" />
        <ScenarioCardView title="현재 계획" bullets={currentPlanBullets} tone="neutral" />
        <ScenarioCardView title={goodScenario.title} bullets={goodScenario.bullets} tone="positive" />
      </div>

      <p className="mt-4 text-[11px] text-subtle-foreground">
        위 비교는 방향성을 보여주는 참고용 추정이며, 실제 수치와는 차이가 있을 수 있어요.
      </p>
    </div>
  );
}
