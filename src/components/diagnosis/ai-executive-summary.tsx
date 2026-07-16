export default function AIExecutiveSummary({ summary }: { summary: string }) {
  return (
    <div className="rounded-2xl border border-positive/20 bg-positive/[0.06] p-5 sm:p-6">
      <p className="mb-2 text-xs font-semibold text-positive">AI 분석 요약</p>
      <p className="text-sm leading-relaxed text-foreground sm:text-base">
        {summary}
      </p>
    </div>
  );
}
