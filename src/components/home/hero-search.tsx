"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/mixpanel";

const QUICK_TAGS: Array<{ label: string; query: string } | { label: string; href: string }> = [
  { label: "서울 6억 이하", query: "서울 6억 이하 아파트 알려줘" },
  { label: "전세 4억 이하", query: "전세 4억 이하 아파트 알려줘" },
  { label: "직장까지 40분", query: "직장까지 40분 이내 아파트 알려줘" },
  { label: "신혼희망타운", href: "/guide#newlywed-hope-town" },
];

const DEAL_TYPES = ["전체", "매매", "전세", "월세"] as const;

export default function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [dealType, setDealType] = useState<(typeof DEAL_TYPES)[number]>("전체");
  const [maxPrice, setMaxPrice] = useState("");
  const [moveInDate, setMoveInDate] = useState("");

  function buildQuery() {
    const parts: string[] = [];
    if (location.trim()) parts.push(location.trim());
    if (dealType !== "전체") parts.push(dealType);
    if (maxPrice.trim()) parts.push(`${maxPrice.trim()}억 이하`);
    if (moveInDate) parts.push(`${moveInDate} 입주`);
    parts.push("아파트 알려줘");
    return parts.join(" ");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const query = buildQuery();
    trackEvent("Condition Search Submitted", {
      location: location.trim() || null,
      deal_type: dealType,
      max_price_eok: maxPrice.trim() || null,
      move_in_date: moveInDate || null,
      source: "home_hero",
    });
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleQuickTag(query: string) {
    trackEvent("Quick Tag Clicked", { query });
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div id="condition-search" className="w-full max-w-3xl scroll-mt-24">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-3xl border border-border bg-surface p-4 shadow-sm sm:grid-cols-2 sm:p-5"
      >
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-muted-foreground">
            희망 지역 또는 직장 위치
          </span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="서울 영등포구, 강남역, 판교역 등"
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none placeholder:text-subtle-foreground focus:border-accent"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">거래 유형</span>
          <select
            value={dealType}
            onChange={(e) => setDealType(e.target.value as (typeof DEAL_TYPES)[number])}
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
          >
            {DEAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            최대 예산 (억원)
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            inputMode="decimal"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="예: 6"
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none placeholder:text-subtle-foreground focus:border-accent"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-xs font-medium text-muted-foreground">
            입주 예정일
          </span>
          <input
            type="month"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
          />
        </label>

        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:col-span-2"
        >
          아파트 찾아보기
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {QUICK_TAGS.map((tag) =>
          "href" in tag ? (
            <Link
              key={tag.label}
              href={tag.href}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:text-sm"
            >
              {tag.label}
            </Link>
          ) : (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleQuickTag(tag.query)}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:text-sm"
            >
              {tag.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
