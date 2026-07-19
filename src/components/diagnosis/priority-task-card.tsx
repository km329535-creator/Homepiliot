import { Target } from "lucide-react";

export default function PriorityTaskCard({
  task,
  description,
}: {
  task: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted-foreground">현재 가장 중요한 과제</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Target className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-xl font-bold leading-snug tracking-tight">
          {task}
        </span>
      </div>
      <div className="mt-4 flex-1 rounded-xl bg-surface-muted p-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
