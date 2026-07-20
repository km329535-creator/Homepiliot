"use client";

import Link from "next/link";
import { useFeedback } from "@/lib/feedback-context";

export default function Navbar() {
  const { open: openFeedback } = useFeedback();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            H
          </span>
          <span className="text-base font-bold tracking-tight">
            HomePilot
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openFeedback}
            className="hidden h-10 items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            의견 보내기
          </button>

          <Link
            href="/diagnosis"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700"
          >
            무료 진단 시작
          </Link>
        </div>
      </div>
    </header>
  );
}
