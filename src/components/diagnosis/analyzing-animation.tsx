"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Heart, Loader2 } from "lucide-react";

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
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    if (activeIndex >= STEPS.length - 1) return;
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), ANALYZING_STEP_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(97, Math.round((elapsed / ANALYZING_TOTAL_MS) * 100)));
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-7 py-20 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-200/70" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-brand-500/30">
          <Heart className="h-7 w-7 text-primary-foreground" strokeWidth={1.75} fill="currentColor" aria-hidden />
        </span>
      </div>

      <div>
        <p className="text-lg font-bold tracking-tight text-foreground">
          두근두근, 우리 부부 결과를 준비하고 있어요
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          잠시만 기다려주시면 바로 확인할 수 있어요
        </p>
      </div>

      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-subtle-foreground">분석 진행률</span>
          <span className="text-accent">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

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
