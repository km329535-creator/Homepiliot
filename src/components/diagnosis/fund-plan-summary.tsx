import { formatManwon } from "@/lib/diagnosis";

export default function FundPlanSummary({
  targetFundsManwon,
  currentFundsManwon,
  additionalFundsNeededManwon,
}: {
  targetFundsManwon: number;
  currentFundsManwon: number;
  additionalFundsNeededManwon: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 text-xl font-bold tracking-tight">예상 자금 계획 요약</h2>
      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-3 text-sm">
          <span className="text-muted-foreground">목표 자금</span>
          <span className="font-semibold text-foreground">
            {formatManwon(targetFundsManwon)}
          </span>
        </div>
        <div className="flex items-center justify-between py-3 text-sm">
          <span className="text-muted-foreground">현재 보유 자금</span>
          <span className="font-semibold text-foreground">
            {formatManwon(currentFundsManwon)}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-100 px-4 py-3">
        <span className="text-sm font-medium text-foreground">추가로 준비할 자금</span>
        <span className="text-lg font-bold text-brand-700">
          {formatManwon(additionalFundsNeededManwon)}
        </span>
      </div>
      <p className="mt-3 text-xs text-subtle-foreground">
        입력하신 조건을 바탕으로 한 참고용 추정치이며, 실제 필요 자금은 지역·매물에 따라 달라질 수 있어요.
      </p>
    </div>
  );
}
