import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-surface-muted",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
};

// HomePilot Master Design System 10.1 — Small 40px / Medium 48px / Large 56px
const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
