"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/logo";

export default function Navbar() {
  const pathname = usePathname();
  const isDiagnosisFlow = pathname?.startsWith("/diagnosis");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-base font-bold tracking-tight">
            HomePilot
          </span>
        </Link>

        {!isDiagnosisFlow && (
          <Link
            href="/diagnosis"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-brand-700 sm:px-4 sm:text-sm"
          >
            진단 시작
          </Link>
        )}
      </div>
    </header>
  );
}
