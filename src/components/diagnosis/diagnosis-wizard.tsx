"use client";

import { useState } from "react";
import type {
  DiagnosisAnswers,
  HousingPreference,
  IncomeRange,
  SavingsRange,
  TopConcern,
  WeddingTimeline,
} from "@/lib/diagnosis";
import { trackEvent } from "@/lib/mixpanel";

type StepConfig = {
  field: keyof DiagnosisAnswers;
  question: string;
  helper?: string;
  options: string[];
};

const STEPS: StepConfig[] = [
  {
    field: "concern",
    question: "오늘 가장 알고 싶은 것은 무엇인가요?",
    options: [
      "매매 여부",
      "받을 수 있는 지원",
      "필요 자금",
      "무엇부터 할지",
    ] satisfies TopConcern[],
  },
  {
    field: "timeline",
    question: "결혼 예정 시기가 어떻게 되세요?",
    options: ["6개월 이내", "1년 이내", "2년 이내", "3년 이내"] satisfies WeddingTimeline[],
  },
  {
    field: "preference",
    question: "희망하는 주거 형태는 무엇인가요?",
    options: ["월세", "전세", "매매", "아직 고민중"] satisfies HousingPreference[],
  },
  {
    field: "savings",
    question: "현재 보유하고 계신 자금은 어느 정도인가요?",
    helper: "두 분이 합쳐서 준비된 현금성 자산 기준이에요.",
    options: [
      "3천만원 이하",
      "3천~5천만원",
      "5천만원~1억원",
      "1억원 이상",
    ] satisfies SavingsRange[],
  },
  {
    field: "income",
    question: "부부 합산 연소득은 어느 정도인가요?",
    options: [
      "5천만원 이하",
      "5천~7천만원",
      "7천만원~1억원",
      "1억원 이상",
    ] satisfies IncomeRange[],
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
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-2 text-sm font-semibold text-accent">
        {stepIndex + 1} / {STEPS.length}
      </p>

      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        {step.question}
      </h2>
      {step.helper && (
        <p className="mt-2 text-sm text-muted-foreground">{step.helper}</p>
      )}

      <div className="mt-6 grid gap-3">
        {step.options.map((option) => {
          const selected = answers[step.field] === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors sm:text-base ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-foreground hover:border-accent hover:bg-brand-50"
              }`}
            >
              {option}
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
