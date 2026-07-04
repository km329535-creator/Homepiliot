import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "positive" | "negative";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  positive: "bg-positive/10 text-positive",
  negative: "bg-negative/10 text-negative",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
