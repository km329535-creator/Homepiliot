"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { getApartmentById } from "@/lib/mock-data";
import { formatEok, formatRate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import CompareTable from "@/components/compare/compare-table";

export default function ComparePage() {
  const { favoriteIds, removeFavorite } = useFavorites();
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    favoriteIds.slice(0, 3)
  );
  // favoriteIds 배열은 실제 목록이 바뀔 때만 새 참조가 생성되므로(useMemo),
  // 참조 비교로 목록 변경을 감지해 렌더링 중에 선택 상태를 보정한다.
  const [syncedFavoriteIds, setSyncedFavoriteIds] = useState(favoriteIds);
  if (favoriteIds !== syncedFavoriteIds) {
    setSyncedFavoriteIds(favoriteIds);
    setSelectedIds((prev) => {
      const stillValid = prev.filter((id) => favoriteIds.includes(id));
      return stillValid.length > 0 ? stillValid : favoriteIds.slice(0, 3);
    });
  }

  const savedApartments = favoriteIds
    .map((id) => getApartmentById(id))
    .filter((apt): apt is NonNullable<typeof apt> => Boolean(apt));

  function toggleSelected(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const selectedApartments = savedApartments.filter((apt) =>
    selectedIds.includes(apt.id)
  );

  if (savedApartments.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
        <span className="text-3xl">⭐</span>
        <h1 className="mt-4 text-xl font-bold">아직 저장한 관심 목록이 없어요</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          검색 결과나 리포트 페이지에서 관심 있는 아파트를 저장하면 이곳에서
          한눈에 비교할 수 있습니다.
        </p>
        <ButtonLink href="/search" className="mt-6">
          아파트 검색하러 가기
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">관심 목록·비교</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          저장한 아파트 중 2개 이상을 선택하면 평균 시세, 교통, 인프라, AI 종합
          의견을 한 화면에서 비교할 수 있습니다.
        </p>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedApartments.map((apt) => {
          const checked = selectedIds.includes(apt.id);
          return (
            <div
              key={apt.id}
              className={`rounded-2xl border p-5 transition-colors ${
                checked ? "border-accent bg-accent/5" : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <label className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelected(apt.id)}
                    className="mt-1 h-4 w-4 accent-[var(--accent)]"
                  />
                  <div>
                    <Link
                      href={`/report/${apt.id}`}
                      className="font-semibold hover:text-accent"
                    >
                      {apt.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {apt.district} {apt.dong}
                    </p>
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => removeFavorite(apt.id)}
                  aria-label="관심 목록에서 제거"
                  className="text-subtle-foreground hover:text-negative"
                >
                  ×
                </button>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold">{formatEok(apt.avgPrice)}</span>
                <Badge tone={apt.recentChangeRate >= 0 ? "positive" : "negative"}>
                  {formatRate(apt.recentChangeRate)}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {selectedApartments.length >= 2 ? (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            비교표 ({selectedApartments.length}개 단지)
          </h2>
          <CompareTable apartments={selectedApartments} />
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          비교하려면 위에서 아파트를 2개 이상 선택해주세요.
        </div>
      )}
    </div>
  );
}
