import Link from "next/link";
import { housingSupportItems } from "@/lib/housing-support";
import { ButtonLink } from "@/components/ui/button";

export default function HousingSupportPreview() {
  const items = housingSupportItems.slice(0, 3);

  return (
    <section className="border-t border-border bg-surface-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            놓치기 쉬운 신혼부부 주거 혜택도 확인하세요
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/guide#${item.id}`}
              className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonLink href="/guide" variant="secondary">
            신혼부부 주거 가이드 전체 보기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
