import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function ResultHeader({ analyzedAt }: { analyzedAt: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Badge tone="positive" icon={CircleCheck} className="mb-2">
          분석 완료
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          우리 부부의 첫 집 준비 분석
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          입력하신 정보를 바탕으로 AI가 분석한 결과예요.
        </p>
      </div>

      <p className="text-xs text-subtle-foreground">
        분석 기준일 {formatDate(analyzedAt)}
      </p>
    </div>
  );
}
