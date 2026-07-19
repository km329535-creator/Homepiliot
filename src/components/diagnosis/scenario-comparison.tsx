import type { ScenarioCard } from "@/lib/diagnosis";

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
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <span className="mt-0.5 text-accent">·</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScenarioComparison({
  currentPlanBullets,
  scenarios,
  onEdit,
}: {
  currentPlanBullets: string[];
  scenarios: ScenarioCard[];
  onEdit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">조건을 바꾸면 어떻게 달라질까요?</h2>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-accent hover:underline"
        >
          조건 바꿔보기
        </button>
      </div>

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
