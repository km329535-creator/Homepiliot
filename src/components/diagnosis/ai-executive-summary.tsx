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
    <div className="glass-strong rounded-[20px] p-6 sm:p-7">
      <Badge icon={Sparkles} tone="accent" className="mb-3">
        분석 요약
      </Badge>
      <p className="text-lg font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
        {highlightNumbers(summary)}
      </p>

      <div className="mt-5 rounded-xl bg-brand-50 p-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          다음 행동
        </p>
        <p className="text-sm leading-relaxed text-brand-800">{highlightNumbers(action)}</p>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg border border-brand-200 bg-surface px-3 text-xs font-medium text-brand-700 transition-colors hover:border-accent"
        >
          {linkLabel}
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </div>
  );
}
