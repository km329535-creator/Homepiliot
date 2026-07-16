"use client";

import Link from "next/link";
import type { DiagnosisResult } from "@/lib/diagnosis";
import { Badge } from "@/components/ui/badge";
import { ScoreDots } from "@/components/ui/score-dots";

const SECTION_ORDER_BY_CONCERN: Record<DiagnosisResult["topConcern"], SectionKey[]> = {
  "매매 여부": ["readiness", "policies", "fundPlan", "roadmap"],
  "받을 수 있는 지원": ["policies", "fundPlan", "readiness", "roadmap"],
  "필요 자금": ["fundPlan", "readiness", "policies", "roadmap"],
  "무엇부터 할지": ["roadmap", "readiness", "policies", "fundPlan"],
};

type SectionKey = "readiness" | "policies" | "fundPlan" | "roadmap";

function ReadinessSection({ result }: { result: DiagnosisResult }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-base font-semibold">첫 집 준비도</h3>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-3xl font-bold tracking-tight text-accent">
          {result.readinessScore}
          <span className="text-base text-muted-foreground">/100</span>
        </span>
        <ScoreDots score={Math.round(result.readinessScore / 20)} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {result.readinessSummary}
      </p>
    </div>
  );
}

function PoliciesSection({ result }: { result: DiagnosisResult }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-base font-semibold">추천 금융·정책</h3>
      <ul className="mt-4 space-y-4">
        {result.policies.map((policy) => (
          <li key={policy.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{policy.title}</p>
              <Link
                href={`/guide#${policy.id}`}
                className="flex-none text-xs font-medium text-accent hover:underline"
              >
                자세히 보기
              </Link>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {policy.reason}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FundPlanSection({ result }: { result: DiagnosisResult }) {
  const { fundPlan } = result;
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-base font-semibold">자금 계획</h3>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">현재 보유 자금</dt>
          <dd className="mt-1 text-lg font-bold">{fundPlan.savingsLabel}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">추정 대출 가능 한도</dt>
          <dd className="mt-1 text-lg font-bold">{fundPlan.estimatedLoanLimit}</dd>
        </div>
      </dl>
      <div className="mt-4 flex items-center gap-2">
        <Badge tone={fundPlan.policyEligible ? "positive" : "neutral"}>
          {fundPlan.policyEligible ? "정책 활용 가능성 높음" : "일반 대출 중심 검토 필요"}
        </Badge>
      </div>
      <p className="mt-3 text-xs text-subtle-foreground">{fundPlan.note}</p>
    </div>
  );
}

function RoadmapSection({ result }: { result: DiagnosisResult }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-base font-semibold">스텝 로드맵</h3>
      <ol className="mt-4 space-y-3">
        {result.roadmap.map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const SECTION_COMPONENTS: Record<SectionKey, typeof ReadinessSection> = {
  readiness: ReadinessSection,
  policies: PoliciesSection,
  fundPlan: FundPlanSection,
  roadmap: RoadmapSection,
};

const SECTION_LABELS: Record<SectionKey, string> = {
  readiness: "첫 집 준비도",
  policies: "추천 금융·정책",
  fundPlan: "자금 계획",
  roadmap: "스텝 로드맵",
};

export default function DiagnosisResultView({
  result,
  onRestart,
}: {
  result: DiagnosisResult;
  onRestart: () => void;
}) {
  const order = SECTION_ORDER_BY_CONCERN[result.topConcern];

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8 text-center">
        <Badge tone="accent" className="mb-3">
          AI 분석 결과
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          지금 우리 부부의 첫 집 준비 상태예요
        </h2>
      </div>

      <div className="space-y-4">
        {order.map((key, i) => {
          const Section = SECTION_COMPONENTS[key];
          return (
            <div key={key}>
              {i === 0 && (
                <p className="mb-2 text-xs font-medium text-accent">
                  &ldquo;{result.topConcern}&rdquo;에 대한 답변이에요 · {SECTION_LABELS[key]}
                </p>
              )}
              <Section result={result} />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Link
          href="/guide"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          신혼부부 주거 가이드 더 보기
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          다시 진단하기
        </button>
      </div>
    </div>
  );
}
