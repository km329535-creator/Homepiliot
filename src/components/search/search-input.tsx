"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchInput({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-full border border-border bg-surface p-1.5 pl-4 shadow-sm focus-within:border-accent"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5 flex-none text-subtle-foreground"
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
        placeholder="원하는 조건을 자연어로 입력해보세요"
        className="h-9 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground"
      />
      <button
        type="submit"
        className="h-9 flex-none rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        검색
      </button>
    </form>
  );
}
