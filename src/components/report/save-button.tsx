"use client";

import { useFavorites } from "@/lib/favorites-context";

export default function SaveButton({ apartmentId }: { apartmentId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(apartmentId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(apartmentId)}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
        saved
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-surface text-foreground hover:border-accent hover:text-accent"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 5.7 5c1.9 0 3.4 1 4.3 2.4C10.9 6 12.4 5 14.3 5c3.4 0 5.2 3.4 3.7 6.9C19.5 16.4 12 21 12 21Z"
          strokeLinejoin="round"
        />
      </svg>
      {saved ? "관심 목록에 저장됨" : "관심 목록에 저장"}
    </button>
  );
}
