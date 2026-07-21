import { CheckCircle2, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { highlightNumbers } from "@/lib/highlight-text";

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
          <Badge icon={CheckCircle2} tone="positive" className="mb-3">
            잘 준비된 부분
          </Badge>
          <ul className="space-y-2.5">
            {good.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-positive" strokeWidth={1.75} aria-hidden />
                {highlightNumbers(item)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Badge icon={TriangleAlert} tone="warning" className="mb-3">
            추가 확인이 필요한 부분
          </Badge>
          <ul className="space-y-2.5">
            {gaps.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                <TriangleAlert className="mt-0.5 h-5 w-5 flex-none text-warning" strokeWidth={1.75} aria-hidden />
                {highlightNumbers(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
