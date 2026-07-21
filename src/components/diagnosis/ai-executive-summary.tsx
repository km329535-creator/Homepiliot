import { ExternalLink, Sparkles } from "lucide-react";

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
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        분석 요약
      </p>
      <p className="text-sm leading-relaxed text-foreground sm:text-base">
        {summary}
      </p>

      <div className="mt-4 rounded-xl bg-brand-50 p-4">
        <p className="text-sm leading-relaxed text-brand-800">{action}</p>
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
