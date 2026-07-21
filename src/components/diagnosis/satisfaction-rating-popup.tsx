"use client";

import { useEffect, useRef, useState } from "react";
import { Star, CircleCheck } from "lucide-react";
import { trackEvent } from "@/lib/mixpanel";
import { submitRating } from "@/lib/feedback-store";

const STORAGE_KEY = "homepilot:rating-prompted";

export default function SatisfactionRatingPopup() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          window.localStorage.setItem(STORAGE_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleClose() {
    setVisible(false);
  }

  async function handleRate(score: number) {
    setRating(score);
    trackEvent("Result Satisfaction Rated", { rating: score });
    await submitRating(score);
    setSubmitted(true);
    setTimeout(() => setVisible(false), 1400);
  }

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      {visible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <button
            type="button"
            aria-label="닫기"
            onClick={handleClose}
            className="absolute inset-0 cursor-default"
          />
          <div className="relative w-full max-w-sm rounded-t-[20px] border border-border bg-surface p-6 pb-8 shadow-xl sm:rounded-[20px] sm:pb-6">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />

            {submitted ? (
              <div className="flex flex-col items-center py-4 text-center">
                <CircleCheck className="h-8 w-8 text-positive" strokeWidth={1.75} aria-hidden />
                <h2 className="mt-3 text-lg font-bold">평가 감사해요</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  보내주신 평가는 서비스를 개선하는 데 소중히 참고할게요.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-bold">진단 결과, 만족하셨나요?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  별점으로 만족도를 알려주시면 서비스를 개선하는 데 도움이 돼요.
                </p>

                <div className="mt-5 flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value}점`}
                      onClick={() => handleRate(value)}
                      onMouseEnter={() => setHovered(value)}
                      onMouseLeave={() => setHovered(0)}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          (hovered || rating) >= value
                            ? "fill-warning text-warning"
                            : "text-border"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 h-11 w-full rounded-xl border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                >
                  다음에 할게요
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
