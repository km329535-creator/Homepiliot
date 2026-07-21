import type { ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResultHeader({
  shareActions,
}: {
  shareActions: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
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

      <div className="sm:flex-none">{shareActions}</div>
    </div>
  );
}
