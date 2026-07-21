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
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
      <Badge icon={Target} tone="neutral" size="md" className="self-start">
        현재 가장 중요한 과제
      </Badge>
      <div className="mt-4 flex items-center gap-3.5">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Target className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-3xl font-bold leading-snug tracking-tight">
          {task}
        </span>
      </div>
      <div className="mt-5 flex-1 rounded-xl bg-surface-muted p-4">
        <p className="text-base leading-relaxed text-muted-foreground">
          {highlightNumbers(description, "neutral")}
        </p>
      </div>
    </div>
  );
}
