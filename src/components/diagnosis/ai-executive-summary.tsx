import { Sparkles } from "lucide-react";

export default function AIExecutiveSummary({ summary }: { summary: string }) {
  return (
    <div className="glass-strong rounded-[20px] p-6 sm:p-7">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        분석 요약
      </p>
      <p className="text-sm leading-relaxed text-foreground sm:text-base">
        {summary}
      </p>
    </div>
  );
}
