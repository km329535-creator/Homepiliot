import { ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

export default function AIExecutiveSummary({
  summary,
  action,
  linkLabel,
  linkUrl,
}: {
  summary: string;
  action: string;
  linkLabel: string;
  linkUrl: string;
}) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-6 shadow-sm sm:p-7">
      <Badge icon={Sparkles} tone="accent" className="mb-3">
        분석 요약
      </Badge>
      <p className="text-base font-bold leading-snug tracking-tight text-foreground sm:text-xl">
        {highlightNumbers(summary)}
      </p>

      <div className="mt-5 rounded-xl bg-brand-50 p-4 sm:p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
          다음 행동
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base leading-relaxed text-brand-800">{highlightNumbers(action)}</p>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-none items-center justify-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-700 sm:ml-4"
          >
            {linkLabel}
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
