import Link from "next/link";
import { housingSupportItems } from "@/lib/housing-support";
import { ButtonLink } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function HousingSupportPreview() {
  const items = housingSupportItems.slice(0, 3);

  return (
    <section className="border-t border-border bg-surface-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <ScrollReveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            놓치기 쉬운 신혼부부 주거 혜택도 확인하세요
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <Link
                href={`/guide#${item.id}`}
                className="block h-full rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/guide" variant="secondary">
            신혼부부 주거 가이드 전체 보기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
