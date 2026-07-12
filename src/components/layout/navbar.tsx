"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/lib/favorites-context";
import { useAuth } from "@/lib/auth-context";

const NAV_LINKS = [
  { href: "/search", label: "아파트 찾기" },
  { href: "/regions", label: "지역 탐색" },
  { href: "/guide", label: "신혼부부 가이드" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();
  const { isLoggedIn, openLoginSheet, logout } = useAuth();

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

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link
                href="/compare"
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                저장한 아파트
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                  {favoriteIds.length}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden text-xs text-subtle-foreground hover:text-foreground sm:inline"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={openLoginSheet}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
