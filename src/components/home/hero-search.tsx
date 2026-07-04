"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const EXAMPLE_QUERIES = [
  "성수동에서 8억 이하 아파트 추천해줘",
  "신혼부부가 살기 좋은 지역 알려줘",
  "걸어서 15분 이내에 초등학교가 있는 아파트 중 서울에서 7억이하의 아파트를 알려줘",
];

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-full border border-border bg-surface p-2 pl-5 shadow-sm focus-within:border-accent"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 flex-none text-subtle-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="예: 성수동에서 8억 이하 아파트 추천해줘"
          className="h-10 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground sm:text-base"
        />
        <button
          type="submit"
          className="flex h-10 flex-none items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-5"
        >
          AI 검색
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setQuery(example)}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:text-sm"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
