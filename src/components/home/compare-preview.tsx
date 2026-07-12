"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { useAuth } from "@/lib/auth-context";

const COMPARE_ITEMS = [
  "평균 시세",
  "최근 가격 변동",
  "교통",
  "생활 인프라",
  "AI 종합 의견",
];

export default function ComparePreview() {
  const { isLoggedIn, openLoginSheet } = useAuth();
  const { favoriteIds } = useFavorites();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid gap-8 rounded-3xl border border-border bg-surface p-8 sm:grid-cols-2 sm:p-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            마음에 드는 아파트를 저장하고 함께 비교하세요
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            검색하다 마음에 드는 아파트가 생기면 저장해두세요. 저장한 아파트
            2개 이상을 한 화면에서 나란히 비교할 수 있어요.
          </p>

          {isLoggedIn ? (
            <Link
              href="/compare"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              저장한 아파트 보기
              {favoriteIds.length > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-foreground/20 px-1 text-[11px] font-semibold">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          ) : (
            <button
              type="button"
              onClick={openLoginSheet}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              로그인하고 아파트 저장하기
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface-muted p-5">
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            이런 항목을 비교할 수 있어요
          </p>
          <ul className="space-y-2.5">
            {COMPARE_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
