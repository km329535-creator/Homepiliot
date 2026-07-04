"use client";

import Link from "next/link";
import type { Apartment } from "@/lib/types";
import { formatEok, formatRate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/favorites-context";

export default function PropertyCard({ apartment }: { apartment: Apartment }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(apartment.id);

  return (
    <div className="group relative rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => toggleFavorite(apartment.id)}
        aria-label={saved ? "관심 목록에서 제거" : "관심 목록에 저장"}
        className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
          saved
            ? "border-accent bg-accent/10 text-accent"
            : "border-border text-subtle-foreground hover:text-accent"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
          <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 5.7 5c1.9 0 3.4 1 4.3 2.4C10.9 6 12.4 5 14.3 5c3.4 0 5.2 3.4 3.7 6.9C19.5 16.4 12 21 12 21Z" strokeLinejoin="round" />
        </svg>
      </button>

      <Link href={`/report/${apartment.id}`} className="block">
        <div className="pr-10">
          <p className="text-xs text-muted-foreground">
            {apartment.city} {apartment.district} {apartment.dong}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
            {apartment.name}
          </h3>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">
            {formatEok(apartment.avgPrice)}
          </span>
          <Badge tone={apartment.recentChangeRate >= 0 ? "positive" : "negative"}>
            최근 3개월 {formatRate(apartment.recentChangeRate)}
          </Badge>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">지하철</dt>
            <dd>🚇 {apartment.subwayLine} 도보 {apartment.subwayWalkMin}분</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">초등학교</dt>
            <dd>🏫 초등학교 도보 {apartment.elementarySchoolWalkMin}분</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">준공년도</dt>
            <dd>🏗️ {apartment.builtYear}년 준공 · {apartment.households}세대</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">전용면적</dt>
            <dd>📐 전용 {apartment.areaPy}평</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {apartment.tags.map((tag) => (
            <Badge key={tag} tone="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </div>
  );
}
