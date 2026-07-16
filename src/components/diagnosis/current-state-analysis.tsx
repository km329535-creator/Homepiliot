export default function CurrentStateAnalysis({
  good,
  gaps,
}: {
  good: string[];
  gaps: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-base font-semibold">현재 상황 분석</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold text-positive">잘 준비된 부분</p>
          <ul className="space-y-1.5">
            {good.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                <span className="mt-0.5 text-positive">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-warning">추가 확인이 필요한 부분</p>
          <ul className="space-y-1.5">
            {gaps.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                <span className="mt-0.5 text-warning">!</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
