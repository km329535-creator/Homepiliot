import type { ReactNode } from "react";

export default function StatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: ReactNode;
  helper?: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon && <span>{icon}</span>}
        {label}
      </p>
      <p className="mt-2 text-xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {helper && (
        <p className="mt-1 text-xs text-subtle-foreground">{helper}</p>
      )}
    </div>
  );
}
