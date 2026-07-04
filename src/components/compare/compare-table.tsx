"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Apartment } from "@/lib/types";
import { formatEok, formatRate } from "@/lib/format";
import { ScoreDots } from "@/components/ui/score-dots";
import { useFavorites } from "@/lib/favorites-context";

function buildAiOpinion(apartment: Apartment, all: Apartment[]): string {
  const cheapest = [...all].sort((a, b) => a.avgPrice - b.avgPrice)[0];
  const bestTransit = [...all].sort((a, b) => b.transitScore - a.transitScore)[0];
  const bestChange = [...all].sort(
    (a, b) => b.recentChangeRate - a.recentChangeRate
  )[0];

  const reasons: string[] = [];
  if (apartment.id === cheapest.id) reasons.push("비교 단지 중 자금 부담이 가장 적은 편");
  if (apartment.id === bestTransit.id) reasons.push("교통 접근성이 가장 우수한 편");
  if (apartment.id === bestChange.id) reasons.push("최근 시세 상승세가 가장 뚜렷한 편");
  if (apartment.elementarySchoolWalkMin <= 8) reasons.push("초등학교 통학 거리가 짧은 편");

  if (reasons.length === 0) {
    return "다른 비교 단지 대비 특별히 두드러지는 항목은 없으나, 평균적인 균형을 갖춘 선택지입니다.";
  }
  return reasons.join(", ") + "입니다.";
}

export default function CompareTable({ apartments }: { apartments: Apartment[] }) {
  const { removeFavorite } = useFavorites();

  const rows: Array<{
    label: string;
    render: (apt: Apartment) => ReactNode;
  }> = [
    {
      label: "평균 시세",
      render: (apt) => (
        <span className="text-base font-bold">{formatEok(apt.avgPrice)}</span>
      ),
    },
    {
      label: "최근 3개월 변동",
      render: (apt) => (
        <span
          className={
            apt.recentChangeRate >= 0 ? "text-positive" : "text-negative"
          }
        >
          {formatRate(apt.recentChangeRate)}
        </span>
      ),
    },
    {
      label: "교통",
      render: (apt) => (
        <div className="space-y-1">
          <ScoreDots score={apt.transitScore} />
          <p className="text-xs text-muted-foreground">
            {apt.subwayLine} 도보 {apt.subwayWalkMin}분
          </p>
        </div>
      ),
    },
    {
      label: "생활 인프라",
      render: (apt) => (
        <div className="space-y-1">
          <ScoreDots score={apt.infraScore} />
          <p className="text-xs text-muted-foreground">
            초등학교 도보 {apt.elementarySchoolWalkMin}분
          </p>
        </div>
      ),
    },
    {
      label: "AI 종합 의견",
      render: (apt) => (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {buildAiOpinion(apt, apartments)}
        </p>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40 border-b border-border bg-surface-muted p-4 text-left text-xs font-medium text-muted-foreground">
              비교 항목
            </th>
            {apartments.map((apt) => (
              <th
                key={apt.id}
                className="min-w-[220px] border-b border-l border-border bg-surface-muted p-4 text-left align-top"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/report/${apt.id}`}
                      className="font-semibold text-foreground hover:text-accent"
                    >
                      {apt.name}
                    </Link>
                    <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                      {apt.district} {apt.dong}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFavorite(apt.id)}
                    aria-label="비교에서 제거"
                    className="text-subtle-foreground hover:text-negative"
                  >
                    ×
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th className="border-b border-border bg-surface-muted p-4 text-left text-xs font-medium text-muted-foreground">
                {row.label}
              </th>
              {apartments.map((apt) => (
                <td
                  key={apt.id}
                  className="border-b border-l border-border bg-surface p-4 align-top"
                >
                  {row.render(apt)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
