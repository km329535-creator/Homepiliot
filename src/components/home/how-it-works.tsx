const STEPS = [
  {
    step: "1",
    title: "무료 진단 시작",
    description: "3분이면 충분해요. 지금 바로 시작할 수 있어요.",
  },
  {
    step: "2",
    title: "질문 5개 답변",
    description: "결혼 시기, 희망 주거 형태, 자금·소득을 선택해요.",
  },
  {
    step: "3",
    title: "AI 분석",
    description: "입력한 상황을 바탕으로 준비도와 정책을 분석해요.",
  },
  {
    step: "4",
    title: "결과 확인",
    description: "준비도, 추천 정책, 자금 계획, 로드맵을 확인해요.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          이용 방법
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-4">
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
