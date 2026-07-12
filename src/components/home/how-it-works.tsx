const STEPS = [
  {
    step: "1",
    title: "두 사람의 조건 입력",
    description: "예산과 직장 위치, 원하는 생활환경을 선택해요.",
  },
  {
    step: "2",
    title: "맞춤 아파트 탐색",
    description: "조건에 맞는 아파트와 지역을 확인해요.",
  },
  {
    step: "3",
    title: "저장하고 함께 비교",
    description: "마음에 드는 아파트를 모아 두 사람이 함께 결정해요.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          우리 집 후보를 찾는 가장 쉬운 방법
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {STEPS.map((item) => (
          <div key={item.step} className="text-center sm:text-left">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {item.step}
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
