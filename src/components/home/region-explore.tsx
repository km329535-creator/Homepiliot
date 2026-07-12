import Link from "next/link";
import { regionHighlights } from "@/lib/region-highlights";
import { ButtonLink } from "@/components/ui/button";

export default function RegionExplore() {
  return (
    <section className="border-t border-border bg-surface-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              어디에서 시작해야 할지 모르겠다면
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              상황별로 추천하는 지역부터 둘러보세요.
            </p>
          </div>
          <ButtonLink
            href="/regions"
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            전체 지역 보기
          </ButtonLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {regionHighlights.map((highlight) => (
            <Link
              key={highlight.id}
              href={`/search?q=${encodeURIComponent(highlight.query)}`}
              className="group rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-foreground">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                지역 둘러보기
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
