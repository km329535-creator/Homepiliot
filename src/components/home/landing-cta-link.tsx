"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/mixpanel";
import { recordCtaClick } from "@/lib/cta-clicks";

export default function LandingCtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent("Landing CTA Clicked");
        recordCtaClick();
      }}
    >
      {children}
    </Link>
  );
}
