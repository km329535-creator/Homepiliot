"use client";

import Link from "next/link";
import type { Apartment } from "@/lib/types";
import { formatEok } from "@/lib/format";

// 서울시 대략적인 위경도 범위 (프로토타입 시각화용)
const LAT_RANGE: [number, number] = [37.42, 37.70];
const LNG_RANGE: [number, number] = [126.76, 127.18];

function toPercent(value: number, [min, max]: [number, number]) {
  const clamped = Math.min(Math.max(value, min), max);
  return ((clamped - min) / (max - min)) * 100;
}

export default function MapPanel({
  apartments,
  activeId,
}: {
  apartments: Apartment[];
  activeId?: string;
}) {
  return (
    <div className="sticky top-20 h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted lg:h-[560px]">
      <div
        className="relative h-full w-full"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {apartments.map((apt) => {
          const left = toPercent(apt.lng, LNG_RANGE);
          const top = 100 - toPercent(apt.lat, LAT_RANGE);
          const active = apt.id === activeId;
          return (
            <Link
              key={apt.id}
              href={`/report/${apt.id}`}
              className="group absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div
                className={`flex flex-col items-center transition-transform group-hover:-translate-y-1 ${
                  active ? "-translate-y-1" : ""
                }`}
              >
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface text-foreground border border-border"
                  }`}
                >
                  {formatEok(apt.avgPrice)}
                </span>
                <span
                  className={`-mt-0.5 h-2.5 w-2.5 rotate-45 ${
                    active ? "bg-primary" : "bg-surface border-b border-r border-border"
                  }`}
                />
              </div>
            </Link>
          );
        })}

        <div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[11px] text-subtle-foreground backdrop-blur">
          지도 API(카카오/네이버) 연동 예정 · 현재는 위치 비율 기반 프로토타입
        </div>
      </div>
    </div>
  );
}
