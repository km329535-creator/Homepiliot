"use client";

import { useMemo, useState } from "react";
import { apartments } from "@/lib/mock-data";
import type { Apartment } from "@/lib/types";
import ApartmentHighlightCard from "./apartment-highlight-card";
import { trackEvent } from "@/lib/mixpanel";

const TABS = [
  "예산에 맞는",
  "출퇴근이 편한",
  "신혼부부가 많이 찾는",
  "생활환경이 좋은",
] as const;

type Tab = (typeof TABS)[number];

function selectByTab(tab: Tab): Apartment[] {
  switch (tab) {
    case "예산에 맞는":
      return [...apartments].sort((a, b) => a.avgPrice - b.avgPrice).slice(0, 3);
    case "출퇴근이 편한":
      return [...apartments]
        .sort((a, b) => a.commuteMinutes - b.commuteMinutes)
        .slice(0, 3);
    case "신혼부부가 많이 찾는":
      return apartments.filter((apt) => apt.tags.includes("신혼부부 추천"));
    case "생활환경이 좋은":
      return [...apartments].sort((a, b) => b.infraScore - a.infraScore).slice(0, 3);
  }
}

export default function RecommendedTabs() {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const items = useMemo(() => selectByTab(activeTab), [activeTab]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          신혼부부가 많이 살펴보는 아파트
        </h2>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              trackEvent("Recommended Tab Clicked", { tab });
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((apt) => (
          <ApartmentHighlightCard key={apt.id} apartment={apt} />
        ))}
      </div>
    </section>
  );
}
