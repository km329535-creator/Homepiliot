"use client";

import { useState, type RefObject } from "react";
import { Share2, Download, Check } from "lucide-react";
import { trackEvent } from "@/lib/mixpanel";

export default function ResultShareActions({
  targetRef,
  shareText,
}: {
  targetRef: RefObject<HTMLElement | null>;
  shareText: string;
}) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleShare() {
    trackEvent("Diagnosis Result Share Clicked");
    const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "HomePilot 첫 집 준비도 진단 결과",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // 사용자가 공유를 취소한 경우 별도 처리 없음
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근 실패 시 조용히 무시
    }
  }

  async function handleSaveImage() {
    if (!targetRef.current || saving) return;
    setSaving(true);
    trackEvent("Diagnosis Result Image Saved");

    try {
      const { domToPng } = await import("modern-screenshot");
      const dataUrl = await domToPng(targetRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "homepilot-첫집준비도-결과.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // 캡처 실패 시 조용히 무시
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex w-full flex-col-reverse gap-2.5 sm:w-auto sm:flex-row">
      <button
        type="button"
        onClick={handleSaveImage}
        disabled={saving}
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-5 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/15 disabled:opacity-60"
      >
        <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        {saving ? "이미지 생성 중..." : "이미지로 저장"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-700"
      >
        {copied ? (
          <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        ) : (
          <Share2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        )}
        {copied ? "링크를 복사했어요" : "결과 공유하기"}
      </button>
    </div>
  );
}
