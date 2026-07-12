import Link from "next/link";
import { regions } from "@/lib/mock-data";
import { regionHighlights } from "@/lib/region-highlights";
import { formatEok, formatRate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export default function RegionsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          지역 탐색
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          아파트를 먼저 정하기보다, 어느 지역이 우리 부부에게 맞는지부터
          살펴보세요.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold">상황별 추천</h2>
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
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">전체 지역</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/search?q=${encodeURIComponent(`${region.name} 아파트 알려줘`)}`}
              className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{region.name}</h3>
                <Badge tone={region.recentChangeRate >= 0 ? "positive" : "negative"}>
                  {formatRate(region.recentChangeRate)}
                </Badge>
              </div>
              <p className="mt-2 text-lg font-bold">
                평균 {formatEok(region.avgPrice)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {region.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {region.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
