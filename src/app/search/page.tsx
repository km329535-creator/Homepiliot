import Link from "next/link";
import SearchInput from "@/components/search/search-input";
import PropertyCard from "@/components/search/property-card";
import MapPanel from "@/components/search/map-panel";
import { Badge } from "@/components/ui/badge";
import { apartments } from "@/lib/mock-data";
import {
  buildAiSummary,
  findMentionedRegions,
  parseQuery,
  searchApartments,
} from "@/lib/query-parser";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const hasQuery = query.trim().length > 0;

  const parsed = parseQuery(query);
  const results = hasQuery ? searchApartments(parsed) : apartments;
  const mentionedRegions = hasQuery ? findMentionedRegions(parsed) : [];
  const aiSummary = hasQuery
    ? buildAiSummary(parsed, results)
    : "조건 없이 전체 아파트를 보여드리고 있습니다. 원하는 조건을 검색해보세요.";

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-6">
        <SearchInput initialQuery={query} />
      </div>

      <div className="mb-8 rounded-2xl border border-border bg-surface-muted/60 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
            AI
          </span>
          <div>
            <p className="text-sm leading-relaxed text-foreground">
              {aiSummary}
            </p>
            {hasQuery && (
              <p className="mt-1 text-xs text-subtle-foreground">
                해석한 질의: “{query}”
              </p>
            )}
          </div>
        </div>
      </div>

      {mentionedRegions.length >= 2 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {mentionedRegions.map((region) => (
            <div
              key={region.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{region.name}</h3>
                <Badge tone="accent">평균 {region.avgPrice}억</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {region.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {region.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            총 {results.length}건
          </p>
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((apt) => (
                <PropertyCard key={apt.id} apartment={apt} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              조건에 맞는 아파트가 없습니다. 예산이나 지역 범위를 넓혀
              <Link href="/search" className="text-accent">
                {" "}
                다시 검색
              </Link>
              해보세요.
            </div>
          )}
        </div>

        <MapPanel apartments={results} />
      </div>
    </div>
  );
}
