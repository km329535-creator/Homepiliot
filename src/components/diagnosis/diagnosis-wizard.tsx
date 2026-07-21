"use client";

import { useState } from "react";
import {
  Building2,
  CalendarClock,
  Check,
  Compass,
  Gift,
  HelpCircle,
  Home,
  KeyRound,
  PiggyBank,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type {
  DiagnosisAnswers,
  HousingPreference,
  IncomeRange,
  SavingsRange,
  TopConcern,
  WeddingTimeline,
} from "@/lib/diagnosis";
import { trackEvent } from "@/lib/mixpanel";

type StepOption = {
  label: string;
  icon: LucideIcon;
};

type StepConfig = {
  field: keyof DiagnosisAnswers;
  question: string;
  helper?: string;
  options: StepOption[];
};

const OPTION_ACCENTS = [
  { text: "text-accent", bg: "bg-accent/10", border: "border-accent" },
  { text: "text-positive", bg: "bg-positive/10", border: "border-positive" },
  { text: "text-warning", bg: "bg-warning/10", border: "border-warning" },
  { text: "text-violet-600", bg: "bg-violet-100", border: "border-violet-400" },
];

const STEPS: StepConfig[] = [
  {
    field: "concern",
    question: "오늘 가장 알고 싶은 것은 무엇인가요?",
    options: [
      { label: "매매 여부", icon: Home },
      { label: "받을 수 있는 지원", icon: Gift },
      { label: "필요 자금", icon: PiggyBank },
      { label: "무엇부터 할지", icon: Compass },
    ] satisfies { label: TopConcern; icon: LucideIcon }[],
  },
  {
    field: "timeline",
    question: "결혼 예정 시기가 어떻게 되세요?",
    options: [
      { label: "6개월 이내", icon: CalendarClock },
      { label: "1년 이내", icon: CalendarClock },
      { label: "2년 이내", icon: CalendarClock },
      { label: "3년 이내", icon: CalendarClock },
    ] satisfies { label: WeddingTimeline; icon: LucideIcon }[],
  },
  {
    field: "preference",
    question: "희망하는 주거 형태는 무엇인가요?",
    options: [
      { label: "월세", icon: KeyRound },
      { label: "전세", icon: Home },
      { label: "매매", icon: Building2 },
      { label: "아직 고민중", icon: HelpCircle },
    ] satisfies { label: HousingPreference; icon: LucideIcon }[],
  },
  {
    field: "savings",
    question: "현재 보유하고 계신 자금은 어느 정도인가요?",
    helper: "두 분이 합쳐서 준비된 현금성 자산 기준이에요.",
    options: [
      { label: "3천만원 이하", icon: Wallet },
      { label: "3천~5천만원", icon: Wallet },
      { label: "5천만원~1억원", icon: Wallet },
      { label: "1억원 이상", icon: Wallet },
    ] satisfies { label: SavingsRange; icon: LucideIcon }[],
  },
  {
    field: "income",
    question: "부부 합산 연소득은 어느 정도인가요?",
    options: [
      { label: "5천만원 이하", icon: Wallet },
      { label: "5천~7천만원", icon: Wallet },
      { label: "7천만원~1억원", icon: Wallet },
      { label: "1억원 이상", icon: Wallet },
    ] satisfies { label: IncomeRange; icon: LucideIcon }[],
  },
];

export default function DiagnosisWizard({
  initialAnswers,
  onComplete,
}: {
  initialAnswers?: Partial<DiagnosisAnswers>;
  onComplete: (answers: DiagnosisAnswers) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<DiagnosisAnswers>>(
    initialAnswers ?? {}
  );

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  function handleSelect(value: string) {
    const next = { ...answers, [step.field]: value };
    setAnswers(next);
    trackEvent("Diagnosis Step Answered", {
      step: stepIndex + 1,
      field: step.field,
      value,
    });

    if (isLast) {
      onComplete(next as DiagnosisAnswers);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (stepIndex === 0) return;
    setStepIndex((i) => i - 1);
  }

  return (
    <div className="w-full max-w-xl">
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {stepIndex + 1} / {STEPS.length}
      </p>

      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        {step.question}
      </h2>
      {step.helper && (
        <p className="mt-2 text-sm text-muted-foreground">{step.helper}</p>
      )}

      <div className="mt-6 grid gap-3">
        {step.options.map((option, i) => {
          const selected = answers[step.field] === option.label;
          const accent = OPTION_ACCENTS[i % OPTION_ACCENTS.length];
          const Icon = option.icon;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => handleSelect(option.label)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-sm font-medium transition-colors sm:px-5 sm:text-base ${
                selected
                  ? `${accent.border} bg-surface text-foreground`
                  : "border-border bg-surface text-foreground hover:border-accent hover:bg-brand-50"
              }`}
            >
              <span
                className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${accent.bg} ${accent.text}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="flex-1">{option.label}</span>
              {selected && (
                <Check className={`h-5 w-5 flex-none ${accent.text}`} strokeWidth={2} aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground"
        >
          ← 이전 질문
        </button>
      )}
    </div>
  );
}
