"use client";

import Link from "next/link";
import type { Apartment } from "@/lib/types";
import { formatEok } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/favorites-context";

export default function ApartmentHighlightCard({
  apartment,
}: {
  apartment: Apartment;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(apartment.id);

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/report/${apartment.id}`} className="block">
        <div className="flex h-28 items-center justify-center bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <span className="text-3xl font-bold tracking-tight opacity-80">
            {apartment.dong.slice(0, 1)}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/report/${apartment.id}`} className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {apartment.district} {apartment.dong} · {apartment.households}세대 ·{" "}
              {apartment.builtYear}년 준공
            </p>
            <h3 className="mt-1 truncate text-base font-semibold text-foreground">
              {apartment.name}
            </h3>
          </Link>
          <button
            type="button"
            onClick={() => toggleFavorite(apartment.id)}
            aria-label={saved ? "관심 목록에서 제거" : "관심 목록에 저장"}
            className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-colors ${
              saved
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-subtle-foreground hover:text-accent"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 5.7 5c1.9 0 3.4 1 4.3 2.4C10.9 6 12.4 5 14.3 5c3.4 0 5.2 3.4 3.7 6.9C19.5 16.4 12 21 12 21Z"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-lg font-bold tracking-tight">
            매매 {formatEok(apartment.avgPrice)}
          </span>
          {apartment.jeonsePrice !== undefined && (
            <span className="text-xs text-muted-foreground">
              전세 {formatEok(apartment.jeonsePrice)}
            </span>
          )}
        </div>

        <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div>🚇 {apartment.subwayLine} 도보 {apartment.subwayWalkMin}분</div>
          <div>🧑‍💼 직장까지 예상 {apartment.commuteMinutes}분</div>
        </dl>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {apartment.tags
            .filter((tag) => tag !== "신혼부부 추천")
            .slice(0, 2)
            .map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          {apartment.tags.includes("신혼부부 추천") && (
            <Badge tone="accent">신혼부부 적합</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
