import Link from "next/link";

const PILLARS = [
  {
    icon: "💰",
    title: "예산에 맞는 집",
    description:
      "보유 자금과 대출 가능 금액을 기준으로 부담 가능한 아파트를 확인해요.",
  },
  {
    icon: "🚉",
    title: "두 사람의 출퇴근",
    description:
      "각자의 직장 위치를 입력하면 이동시간을 함께 비교할 수 있어요.",
  },
  {
    icon: "🌳",
    title: "함께 살기 좋은 환경",
    description:
      "교통, 생활시설, 학군, 공원 등 우리 부부가 중요하게 생각하는 조건을 반영해요.",
  },
];

export default function ConditionPillars() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          두 사람의 조건을 함께 반영해보세요
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <span className="text-2xl">{pillar.icon}</span>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="#condition-search"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          우리 부부 조건 설정하기
        </Link>
      </div>
    </section>
  );
}
