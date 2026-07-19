import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function BottomCta() {
  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <ScrollReveal className="flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            우리 부부, 지금부터 뭐부터 준비하면 될까요?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-lg">
            5개 질문에 답하면 AI가 지금 상황에 맞는 준비도와 다음 단계를
            알려드려요.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/diagnosis"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-surface px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              무료 진단 시작
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
