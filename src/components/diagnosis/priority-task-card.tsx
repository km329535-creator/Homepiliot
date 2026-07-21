import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

export default function PriorityTaskCard({
  task,
  description,
}: {
  task: string;
  description: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <Badge icon={Target} tone="neutral" className="self-start">
        현재 가장 중요한 과제
      </Badge>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Target className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-2xl font-bold leading-snug tracking-tight">
          {task}
        </span>
      </div>
      <div className="mt-4 flex-1 rounded-xl bg-surface-muted p-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {highlightNumbers(description, "neutral")}
        </p>
      </div>
    </div>
  );
}
