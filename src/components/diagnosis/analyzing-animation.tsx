"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Loader2 } from "lucide-react";

const STEPS = [
  "답변 내용을 확인하고 있어요",
  "첫 집 준비도를 계산하고 있어요",
  "맞춤 금융·정책을 매칭하고 있어요",
  "실행 로드맵을 구성하고 있어요",
];

export const ANALYZING_STEP_MS = 550;
export const ANALYZING_TOTAL_MS = STEPS.length * ANALYZING_STEP_MS + 300;

export default function AnalyzingAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= STEPS.length - 1) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), ANALYZING_STEP_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" strokeWidth={2} aria-hidden />
      </span>
      <p className="text-sm font-semibold text-foreground">
        AI가 우리 부부의 상황을 분석하고 있어요
      </p>

      <ul className="w-full space-y-3 text-left">
        {STEPS.map((step, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <li
              key={step}
              className={`flex items-center gap-2.5 text-sm transition-opacity duration-300 ${
                done || active ? "opacity-100" : "opacity-40"
              }`}
            >
              {done ? (
                <CircleCheck className="h-4 w-4 flex-none text-positive" strokeWidth={2} aria-hidden />
              ) : active ? (
                <Loader2 className="h-4 w-4 flex-none animate-spin text-brand-600" strokeWidth={2} aria-hidden />
              ) : (
                <span className="h-4 w-4 flex-none rounded-full border-2 border-border" />
              )}
              <span className={done ? "text-muted-foreground" : "text-foreground"}>
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
