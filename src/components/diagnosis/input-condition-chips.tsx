import type { DiagnosisAnswers } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";

export default function InputConditionChips({
  answers,
}: {
  answers: DiagnosisAnswers;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>💍 결혼 {answers.timeline}</Badge>
      <Badge>🏠 {answers.preference} 고려</Badge>
      <Badge>💰 보유 자금 {answers.savings}</Badge>
      <Badge>📊 합산 연소득 {answers.income}</Badge>
    </div>
  );
}
