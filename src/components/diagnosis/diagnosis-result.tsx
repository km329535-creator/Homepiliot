"use client";

import { useState } from "react";
import Link from "next/link";
import { formatManwon, type DiagnosisResult, type RecommendedPolicy } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import ScoreRing from "./score-ring";
import { useAuth } from "@/lib/auth-context";
import { saveDiagnosisResult } from "@/lib/diagnosis-store";
import { trackEvent } from "@/lib/mixpanel";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function PolicyCard({ policy }: { policy: RecommendedPolicy }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <Badge tone={policy.status === "priority" ? "positive" : "warning"}>
        {policy.status === "priority" ? "우선 검토" : "조건 확인 필요"}
      </Badge>
      <h4 className="mt-3 text-sm font-semibold text-foreground">{policy.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {policy.reason}
      </p>
      <ul className="mt-3 space-y-1.5">
        {policy.checks.map((check) => (
          <li key={check} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <span className="mt-0.5 text-accent">✓</span>
            {check}
          </li>
        ))}
      </ul>
      <Link
        href={`/guide#${policy.id}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        자격 조건 확인하기
      </Link>
    </div>
  );
}

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
  const [summaryOpen, setSummaryOpen] = useState(true);

  function handleSave() {
    if (!requireLogin()) return;
    saveDiagnosisResult(result.answers, result);
    setSaved(true);
    trackEvent("Diagnosis Result Saved", { readiness_score: result.readinessScore });
  }

  const nextActionTitle = result.roadmap[0]?.title ?? "";

  return (
    <div className="w-full max-w-5xl">
      {/* 헤더 */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge tone="positive" className="mb-2">
            ✓ 분석 완료
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            우리 부부의 첫 집 준비 분석
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            입력하신 정보를 바탕으로 AI가 분석한 결과예요.
          </p>
        </div>
        <div className="flex flex-none flex-wrap gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            조건 수정
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            다시 진단하기
          </button>
        </div>
      </div>

      {/* 답변 요약 배지 */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-surface-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Badge>💍 결혼 {result.answers.timeline}</Badge>
          <Badge>🏠 {result.answers.preference} 고려</Badge>
          <Badge>💰 보유 자금 {result.answers.savings}</Badge>
          <Badge>📊 합산 연소득 {result.answers.income}</Badge>
        </div>
        <p className="flex-none text-xs text-subtle-foreground">
          분석 기준일 {formatDate(result.analyzedAt)}
        </p>
      </div>

      <p className="mb-4 text-xs font-medium text-accent">
        &ldquo;{result.topConcern}&rdquo;에 대한 답변을 가장 먼저 보여드릴게요.
      </p>

      {/* 3개 통계 카드 */}
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs text-muted-foreground">첫 집 준비도</p>
          <div className="mt-3 flex items-center gap-4">
            <ScoreRing score={result.readinessScore} />
            <div>
              <Badge tone="accent">{result.readinessTier}</Badge>
              {result.scoreDelta !== null && (
                <p className="mt-2 text-xs text-muted-foreground">
                  지난 진단 대비{" "}
                  <span className={result.scoreDelta >= 0 ? "text-positive" : "text-negative"}>
                    {result.scoreDelta >= 0 ? "+" : ""}
                    {result.scoreDelta}점 {result.scoreDelta >= 0 ? "↑" : "↓"}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs text-muted-foreground">추천 금융·정책</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl">🏦</span>
            <span className="text-3xl font-bold tracking-tight">
              {result.policies.length}
              <span className="text-base font-medium text-muted-foreground">개</span>
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            우선 검토{" "}
            {result.policies.filter((p) => p.status === "priority").length}개
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs text-muted-foreground">다음 행동</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <span className="text-3xl font-bold tracking-tight">
              {result.roadmap.length}
              <span className="text-base font-medium text-muted-foreground">단계</span>
            </span>
          </div>
          <p className="mt-2 truncate text-xs text-muted-foreground" title={nextActionTitle}>
            가장 먼저 할 일: {nextActionTitle}
          </p>
        </div>
      </div>

      {/* 자금 계획 + 로드맵 */}
      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-base font-semibold">자금 준비 현황</h3>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">현재 보유 자금</dt>
            <dd className="text-right font-semibold">{result.answers.savings}</dd>
            <dt className="text-muted-foreground">권장 추가 준비</dt>
            <dd className="text-right font-semibold">
              {result.fundPlan.additionalNeededManwon > 0
                ? formatManwon(result.fundPlan.additionalNeededManwon)
                : "충분함"}
            </dd>
            <dt className="text-muted-foreground">정책·대출 활용 가능</dt>
            <dd className="text-right">
              <Link href="/guide" className="text-xs font-medium text-accent hover:underline">
                {result.fundPlan.policyEligible ? "가능 · 확인 필요" : "확인 필요"}
              </Link>
            </dd>
          </dl>

          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-positive"
                style={{
                  width: `${Math.min(
                    100,
                    (result.fundPlan.savingsManwon / result.fundPlan.targetManwon) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-subtle-foreground">
              <span>0</span>
              <span>목표 {(result.fundPlan.targetManwon / 10000).toLocaleString()}억</span>
            </div>
          </div>

          <p className="mt-4 rounded-xl bg-surface-muted p-3 text-xs leading-relaxed text-muted-foreground">
            {result.fundPlan.additionalNeededManwon > 0
              ? "현재 보유 자금만으로는 선택 가능한 주거 범위가 제한될 수 있어요. 대출 가능 조건과 초기 계약 비용을 먼저 확인해보세요."
              : "목표 자금 수준을 충족하고 있어요. 대출 조건은 참고용으로만 확인해보세요."}
          </p>
          <p className="mt-2 text-[11px] text-subtle-foreground">{result.fundPlan.note}</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-base font-semibold">AI 실행 로드맵</h3>
          <ol className="space-y-5">
            {result.roadmap.map((step, i) => (
              <li key={step.title} className="relative flex gap-3 pl-1">
                {i < result.roadmap.length - 1 && (
                  <span className="absolute left-[11px] top-6 h-[calc(100%+4px)] w-px bg-border" />
                )}
                <span className="z-10 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-medium text-accent">{step.timeframe}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground">{step.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 추천 금융·정책 카드 */}
      <div className="mb-4 rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">추천 금융·정책</h3>
          <Link href="/guide" className="text-xs font-medium text-accent hover:underline">
            더 자세히 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.policies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </div>

      {/* AI 분석 요약 */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-6">
        <button
          type="button"
          onClick={() => setSummaryOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="text-base font-semibold">AI 분석 요약</h3>
          <span className={`text-muted-foreground transition-transform ${summaryOpen ? "rotate-180" : ""}`}>
            ⌄
          </span>
        </button>
        {summaryOpen && (
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold text-positive">준비가 갖춰진 부분</p>
              <ul className="space-y-1.5">
                {result.readinessGood.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-positive">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-warning">추가 확인이 필요한 부분</p>
              <ul className="space-y-1.5">
                {result.readinessGaps.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-warning">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 저장 + 안내 */}
      <div className="flex flex-col items-center gap-3 border-t border-border pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={saved}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity ${
            saved
              ? "cursor-default bg-positive/10 text-positive"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {saved ? "저장 완료 ✓" : isLoggedIn ? "결과 저장하기" : "로그인하고 내 결과 저장하기"}
        </button>
        <p className="max-w-md text-center text-[11px] leading-relaxed text-subtle-foreground">
          본 분석은 입력 정보를 기반으로 한 참고용 결과입니다. 실제 대출 및
          청약 조건은 정부 기관의 공식 정보를 통해 반드시 확인해주세요.
        </p>
      </div>
    </div>
  );
}
