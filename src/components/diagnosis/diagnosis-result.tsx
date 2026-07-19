"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import type { DiagnosisResult } from "@/lib/diagnosis";
import { useAuth } from "@/lib/auth-context";
import { saveDiagnosisResult } from "@/lib/diagnosis-store";
import { trackEvent } from "@/lib/mixpanel";

import ResultHeader from "./result-header";
import InputConditionChips from "./input-condition-chips";
import AIExecutiveSummary from "./ai-executive-summary";
import ReadinessScoreCard from "./readiness-score-card";
import PriorityTaskCard from "./priority-task-card";
import NextActionCard from "./next-action-card";
import CurrentStateAnalysis from "./current-state-analysis";
import StrategySteps from "./strategy-steps";
import ActionRoadmap from "./action-roadmap";
import PolicyRecommendationCard from "./policy-recommendation-card";
import ScenarioComparison from "./scenario-comparison";
import AnalysisDisclaimer from "./analysis-disclaimer";

export default function DiagnosisResultView({
  result,
  onEdit,
  onRestart,
}: {
  result: DiagnosisResult;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const { isLoggedIn, requireLogin } = useAuth();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!requireLogin()) return;
    saveDiagnosisResult(result.answers, result);
    setSaved(true);
    trackEvent("Diagnosis Result Saved", { readiness_score: result.readinessScore });
  }

  return (
    <div className="aurora-bg w-full">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10">
        <ResultHeader analyzedAt={result.analyzedAt} onRestart={onRestart} />

        <div className="mt-4">
          <InputConditionChips answers={result.answers} />
        </div>

        <p className="mt-4 text-xs font-medium text-accent">
          &ldquo;{result.topConcern}&rdquo;에 대한 답변을 가장 먼저 보여드릴게요.
        </p>

        <div className="mt-6">
          <AIExecutiveSummary summary={result.executiveSummary} />
        </div>

        {/* 핵심 상태 카드 */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ReadinessScoreCard
            score={result.readinessScore}
            tier={result.readinessTier}
            tierSummary={result.readinessTierSummary}
            scoreDelta={result.scoreDelta}
          />
          <PriorityTaskCard
            task={result.priorityTask}
            description={result.priorityTaskDescription}
          />
          <NextActionCard roadmap={result.roadmap} />
        </div>

        {/* 현재 상황 분석 */}
        <div className="mt-4">
          <CurrentStateAnalysis good={result.readinessGood} gaps={result.readinessGaps} />
        </div>

        {/* 추천 준비 전략 + 실행 로드맵 */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <StrategySteps steps={result.strategySteps} />
          <ActionRoadmap roadmap={result.roadmap} />
        </div>

        {/* 추천 금융·정책 */}
        <div className="mt-4 rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-base font-semibold">추천 금융·정책</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.policies.map((policy) => (
              <PolicyRecommendationCard key={policy.id} policy={policy} />
            ))}
          </div>
        </div>

        {/* AI 시나리오 비교 */}
        <div className="mt-4">
          <ScenarioComparison
            currentPlanBullets={result.currentPlanBullets}
            scenarios={result.scenarios}
            onEdit={onEdit}
          />
        </div>

        {/* 분석 기준 및 주의사항 */}
        <div className="mt-4">
          <AnalysisDisclaimer analyzedAt={result.analyzedAt} />
        </div>

        {/* 저장 */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saved}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-colors sm:w-auto ${
              saved
                ? "cursor-default bg-positive/10 text-positive"
                : "bg-primary text-primary-foreground hover:bg-brand-700"
            }`}
          >
            {saved && <CircleCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden />}
            {saved ? "저장 완료" : isLoggedIn ? "결과 저장하기" : "로그인하고 내 결과 저장하기"}
          </button>
        </div>

        {/* 모바일 전용 하단 액션 버튼 */}
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            onClick={onRestart}
            className="h-12 w-full rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            다시 진단하기
          </button>
        </div>
      </div>
    </div>
  );
}
