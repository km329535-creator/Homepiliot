"use client";

import { useEffect, useState } from "react";
import DiagnosisWizard from "@/components/diagnosis/diagnosis-wizard";
import DiagnosisResultView from "@/components/diagnosis/diagnosis-result";
import { analyzeDiagnosis, type DiagnosisAnswers, type DiagnosisResult } from "@/lib/diagnosis";
import { getLatestSavedDiagnosis } from "@/lib/diagnosis-store";
import { trackEvent } from "@/lib/mixpanel";

type Phase = "quiz" | "analyzing" | "result";

export default function DiagnosisPage() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [answers, setAnswers] = useState<DiagnosisAnswers | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [wizardKey, setWizardKey] = useState(0);

  useEffect(() => {
    if (phase !== "analyzing" || !answers) return;
    const timer = setTimeout(() => {
      const previous = getLatestSavedDiagnosis();
      setResult(analyzeDiagnosis(answers, previous?.result.readinessScore ?? null));
      setPhase("result");
    }, 1200);
    return () => clearTimeout(timer);
  }, [phase, answers]);

  function handleComplete(finalAnswers: DiagnosisAnswers) {
    trackEvent("Diagnosis Completed", { ...finalAnswers });
    setAnswers(finalAnswers);
    setPhase("analyzing");
  }

  function handleEdit() {
    trackEvent("Diagnosis Edit Started");
    setWizardKey((k) => k + 1);
    setPhase("quiz");
  }

  function handleRestart() {
    trackEvent("Diagnosis Restarted");
    setAnswers(null);
    setResult(null);
    setWizardKey((k) => k + 1);
    setPhase("quiz");
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 py-16">
      {phase === "quiz" && (
        <DiagnosisWizard
          key={wizardKey}
          initialAnswers={answers ?? undefined}
          onComplete={handleComplete}
        />
      )}

      {phase === "analyzing" && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
          <p className="text-sm font-medium text-muted-foreground">
            AI가 우리 부부의 상황을 분석하고 있어요...
          </p>
        </div>
      )}

      {phase === "result" && result && (
        <DiagnosisResultView
          result={result}
          onEdit={handleEdit}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
