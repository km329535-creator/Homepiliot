import Link from "next/link";

export default function BottomCta() {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          우리 둘의 첫 집, 조건부터 맞춰볼까요?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
          예산과 출퇴근 조건을 입력하면 우리 부부에게 맞는 아파트를
          찾아드려요.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#condition-search"
            className="inline-flex items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            아파트 찾아보기
          </Link>
          <Link
            href="/guide"
            className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            신혼부부 주거 가이드 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
