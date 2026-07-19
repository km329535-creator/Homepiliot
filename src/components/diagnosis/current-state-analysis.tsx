import { CheckCircle2, TriangleAlert } from "lucide-react";

export default function CurrentStateAnalysis({
  good,
  gaps,
}: {
  good: string[];
  gaps: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-xl font-bold tracking-tight">현재 상황 분석</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-positive">잘 준비된 부분</p>
          <ul className="space-y-2.5">
            {good.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-positive" strokeWidth={1.75} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-warning">추가 확인이 필요한 부분</p>
          <ul className="space-y-2.5">
            {gaps.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                <TriangleAlert className="mt-0.5 h-5 w-5 flex-none text-warning" strokeWidth={1.75} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
