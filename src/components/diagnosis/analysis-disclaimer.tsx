import { Info } from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function AnalysisDisclaimer({ analyzedAt }: { analyzedAt: string }) {
  const items = [
    "입력 정보를 기반으로 한 참고용 분석이에요.",
    "정책 및 금융 조건은 변경될 수 있어요.",
    "실제 자격과 금액은 공식 기관에서 반드시 확인해주세요.",
    "구체적인 대출 가능 금액은 기존 부채, 신용 상태, 대상 주택 등에 따라 달라질 수 있어요.",
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface-muted/40 p-5">
      <div className="flex items-start gap-2">
        <Info className="mt-0.5 h-4 w-4 flex-none text-subtle-foreground" strokeWidth={1.75} aria-hidden />
        <div>
          <ul className="space-y-1 text-xs leading-relaxed text-muted-foreground">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-subtle-foreground">
            분석 기준일 {formatDate(analyzedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
