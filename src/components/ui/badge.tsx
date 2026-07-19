import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "positive" | "negative" | "warning" | "info";
type Size = "sm" | "md";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent",
  positive: "bg-positive/10 text-positive",
  negative: "bg-negative/10 text-negative",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

const sizeClasses: Record<Size, string> = {
  sm: "gap-1 rounded-full px-2.5 py-1 text-xs",
  md: "gap-1.5 rounded-full px-3.5 py-1.5 text-sm",
};

const iconSizeClasses: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

export function Badge({
  tone = "neutral",
  size = "sm",
  icon: Icon,
  children,
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-medium ${sizeClasses[size]} ${toneClasses[tone]} ${className}`}
    >
      {Icon && <Icon className={iconSizeClasses[size]} strokeWidth={2} aria-hidden />}
      {children}
    </span>
  );
}
