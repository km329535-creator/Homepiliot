import { BarChart3, Heart, Home, Wallet } from "lucide-react";
import type { DiagnosisAnswers } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";

export default function InputConditionChips({
  answers,
}: {
  answers: DiagnosisAnswers;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Badge icon={Heart} size="md" tone="accent">결혼 {answers.timeline}</Badge>
      <Badge icon={Home} size="md" tone="positive">{answers.preference} 고려</Badge>
      <Badge icon={Wallet} size="md" tone="warning">보유 자금 {answers.savings}</Badge>
      <Badge icon={BarChart3} size="md" tone="violet">합산 연소득 {answers.income}</Badge>
    </div>
  );
}
