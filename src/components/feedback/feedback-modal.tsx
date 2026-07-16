"use client";

import { useState } from "react";
import { MessageSquareText, CircleCheck } from "lucide-react";
import { useFeedback } from "@/lib/feedback-context";
import { trackEvent } from "@/lib/mixpanel";

export default function FeedbackModal() {
  const { isOpen, close } = useFeedback();
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleClose() {
    close();
    setTimeout(() => {
      setMessage("");
      setSubmitted(false);
    }, 200);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    trackEvent("Feedback Submitted", { message: trimmed });
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />
      <div className="glass-strong relative w-full max-w-sm rounded-t-[20px] p-6 pb-8 sm:rounded-[20px] sm:pb-6">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />

        {submitted ? (
          <div className="flex flex-col items-center py-4 text-center">
            <CircleCheck className="h-8 w-8 text-positive" strokeWidth={1.75} aria-hidden />
            <h2 className="mt-3 text-lg font-bold">의견 감사해요</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              보내주신 의견은 서비스를 개선하는 데 소중히 참고할게요.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 h-11 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-brand-600" strokeWidth={1.75} aria-hidden />
              <h2 className="text-lg font-bold">의견 보내기</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              불편했던 점이나 더 있으면 좋겠는 기능을 편하게 알려주세요.
            </p>

            <label className="mt-4 block">
              <span className="sr-only">의견 내용</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="예: 진단 결과에 이런 정보도 있으면 좋겠어요."
                rows={4}
                className="w-full rounded-xl border border-border bg-surface p-4 text-sm text-foreground outline-none placeholder:text-subtle-foreground focus:border-accent"
              />
            </label>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="h-11 flex-1 rounded-xl border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="h-11 flex-1 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 disabled:bg-gray-100 disabled:text-gray-400"
              >
                보내기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
