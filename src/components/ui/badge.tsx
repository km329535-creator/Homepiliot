import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "positive" | "negative" | "warning" | "info";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  positive: "bg-positive/10 text-positive",
  negative: "bg-negative/10 text-negative",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

export function Badge({
  tone = "neutral",
  icon: Icon,
  children,
  className = "",
}: {
  tone?: Tone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
      {children}
    </span>
  );
}
