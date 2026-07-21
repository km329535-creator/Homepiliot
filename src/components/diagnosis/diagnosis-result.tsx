"use client";

import { useEffect, useRef } from "react";
import type { DiagnosisResult } from "@/lib/diagnosis";
import { saveDiagnosisResult } from "@/lib/diagnosis-store";

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
import ResultShareActions from "./result-share-actions";
import ShareableResultCard from "./shareable-result-card";
import SatisfactionRatingPopup from "./satisfaction-rating-popup";

export default function DiagnosisResultView({
  result,
}: {
  result: DiagnosisResult;
}) {
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveDiagnosisResult(result.answers, result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareText = `우리 부부 첫 집 준비도는 ${result.readinessScore}점(${result.readinessTier})이에요. 지금 가장 중요한 과제는 "${result.priorityTask}"! HomePilot에서 무료로 진단해보세요.`;

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10">
        <ResultHeader
          shareActions={
            <ResultShareActions targetRef={shareCardRef} shareText={shareText} />
          }
        />

        <ShareableResultCard
          ref={shareCardRef}
          score={result.readinessScore}
          tier={result.readinessTier}
          tierSummary={result.readinessTierSummary}
          priorityTask={result.priorityTask}
        />

        <div className="mt-6">
          <InputConditionChips answers={result.answers} />
        </div>

        <p className="mt-4 text-xs font-medium text-accent">
          &ldquo;{result.topConcern}&rdquo;에 대한 답변을 가장 먼저 보여드릴게요.
        </p>

        <div className="mt-6">
          <AIExecutiveSummary
            summary={result.executiveSummary}
            action={result.executiveSummaryAction}
            linkLabel={result.executiveSummaryLinkLabel}
            linkUrl={result.executiveSummaryLinkUrl}
          />
        </div>

        {/* 핵심 상태 카드 */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ReadinessScoreCard
            score={result.readinessScore}
            tier={result.readinessTier}
            tierSummary={result.readinessTierSummary}
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
          <h2 className="mb-5 text-xl font-bold tracking-tight">추천 금융·정책</h2>
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
          />
        </div>

        {/* 분석 기준 및 주의사항 */}
        <div className="mt-4">
          <AnalysisDisclaimer analyzedAt={result.analyzedAt} />
        </div>

        <SatisfactionRatingPopup />
      </div>
    </div>
  );
}
