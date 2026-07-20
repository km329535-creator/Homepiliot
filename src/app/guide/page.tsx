import { housingSupportItems } from "@/lib/housing-support";

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          신혼부부 주거 가이드
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          아파트를 찾는 것만큼 중요한, 놓치기 쉬운 신혼부부 주거 혜택을
          정리했어요.
        </p>
      </div>

      <div className="space-y-4">
        {housingSupportItems.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-base font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-accent">
              {item.summary}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
