import { housingSupportItems } from "./housing-support";

export type TopConcern =
  | "매매 여부"
  | "받을 수 있는 지원"
  | "필요 자금"
  | "무엇부터 할지";

export type WeddingTimeline = "6개월 이내" | "1년 이내" | "2년 이내";

export type HousingPreference = "전세" | "매매" | "아직 고민중";

export type SavingsRange =
  | "3천만원 이하"
  | "3천~5천만원"
  | "5천만원~1억원"
  | "1억원 이상";

export type IncomeRange =
  | "5천만원 이하"
  | "5천~7천만원"
  | "7천만원~1억원"
  | "1억원 이상";

export type DiagnosisAnswers = {
  concern: TopConcern;
  timeline: WeddingTimeline;
  preference: HousingPreference;
  savings: SavingsRange;
  income: IncomeRange;
};

export type RecommendedPolicy = {
  id: string;
  title: string;
  reason: string;
};

export type FundPlan = {
  savingsLabel: string;
  estimatedLoanLimit: string;
  policyEligible: boolean;
  note: string;
};

export type DiagnosisResult = {
  readinessScore: number; // 0~100
  readinessSummary: string;
  policies: RecommendedPolicy[];
  fundPlan: FundPlan;
  roadmap: string[];
  topConcern: TopConcern;
};

const SAVINGS_MIDPOINT_MANWON: Record<SavingsRange, number> = {
  "3천만원 이하": 1500,
  "3천~5천만원": 4000,
  "5천만원~1억원": 7500,
  "1억원 이상": 12000,
};

const INCOME_MIDPOINT_MANWON: Record<IncomeRange, number> = {
  "5천만원 이하": 4000,
  "5천~7천만원": 6000,
  "7천만원~1억원": 8500,
  "1억원 이상": 11000,
};

function formatManwon(manwon: number): string {
  const eok = Math.floor(manwon / 10000);
  const remainder = Math.round(manwon % 10000);
  if (eok === 0) return `${remainder.toLocaleString()}만원`;
  if (remainder === 0) return `${eok}억원`;
  return `${eok}억 ${remainder.toLocaleString()}만원`;
}

/**
 * NOTE: 실제 서비스에서는 이 함수가 OpenAI/Claude API 호출로 대체되어
 * 정책 자격 판단과 서술을 더 정교하게 생성합니다. 지금은 데모를 위해
 * 규칙 기반 로직으로 준비도·추천·로드맵을 산출합니다.
 */
export function analyzeDiagnosis(answers: DiagnosisAnswers): DiagnosisResult {
  const funds = SAVINGS_MIDPOINT_MANWON[answers.savings];
  const income = INCOME_MIDPOINT_MANWON[answers.income];

  const targetFunds =
    answers.preference === "매매"
      ? 30000
      : answers.preference === "전세"
      ? 15000
      : 20000;

  const fundsScore = Math.min(1, funds / targetFunds) * 60;
  const incomeScore = Math.min(1, income / 8000) * 40;
  const readinessScore = Math.max(5, Math.min(100, Math.round(fundsScore + incomeScore)));

  const readinessSummary =
    readinessScore >= 80
      ? "필요 자금과 소득 기준을 잘 갖추고 있어, 지금 바로 다음 단계를 진행해도 좋은 상태예요."
      : readinessScore >= 50
      ? "기본적인 준비는 되어 있지만, 목표 자금까지는 조금 더 보완이 필요한 상태예요."
      : "아직 초기 단계예요. 지금부터 차근차근 자금 계획을 세우면 충분히 따라잡을 수 있어요.";

  const policies: RecommendedPolicy[] = [];
  const findItem = (id: string) =>
    housingSupportItems.find((item) => item.id === id)!;

  if (answers.preference !== "매매") {
    const item = findItem("newlywed-jeonse-loan");
    policies.push({
      id: item.id,
      title: item.title,
      reason: `${answers.preference === "전세" ? "전세" : "전월세"}를 고려 중이고 보유 자금이 ${formatManwon(
        funds
      )} 수준이라, 낮은 금리로 보증금을 보완할 수 있는 이 대출이 우선적으로 도움이 돼요.`,
    });
  }

  if (answers.preference === "매매") {
    const item = findItem("didimdol-bogeumjari");
    policies.push({
      id: item.id,
      title: item.title,
      reason: "매매를 목표로 하고 있어, 시세보다 낮은 고정금리로 자금 부담을 줄일 수 있는 정책모기지가 적합해요.",
    });
  }

  if (income <= 10000) {
    const item = findItem("newlywed-hope-town");
    policies.push({
      id: item.id,
      title: item.title,
      reason: `부부합산 연소득이 ${answers.income} 구간으로 특별공급 소득 기준에 해당할 가능성이 높아, 시세보다 저렴한 공공분양·임대를 확인해볼 만해요.`,
    });
  }

  if (answers.preference === "전세" || answers.preference === "아직 고민중") {
    const item = findItem("local-deposit-support");
    policies.push({
      id: item.id,
      title: item.title,
      reason: "거주 예정 지역 지자체의 임차보증금 이자 지원까지 더하면 초기 자금 부담을 추가로 줄일 수 있어요.",
    });
  }

  if (answers.preference !== "전세") {
    const item = findItem("subscription-score");
    policies.push({
      id: item.id,
      title: item.title,
      reason: `${answers.timeline} 내 결혼을 앞두고 있다면, 신혼부부 특별공급 가점을 미리 확인해두는 것이 유리해요.`,
    });
  }

  const estimatedLoanLimit = Math.round(Math.min(funds * 2.5, income * 4) / 100) * 100;

  const fundPlan: FundPlan = {
    savingsLabel: answers.savings,
    estimatedLoanLimit: formatManwon(estimatedLoanLimit),
    policyEligible: income <= 10000,
    note: "실제 대출 한도는 신용 상태와 금융기관 심사 결과에 따라 달라질 수 있어요. 위 금액은 참고용 추정치예요.",
  };

  const roadmap: string[] = [];
  if (answers.preference !== "전세") {
    roadmap.push("청약통장 가입 여부와 납입 기간 확인하기");
  }
  if (answers.preference === "전세" || answers.preference === "아직 고민중") {
    roadmap.push("희망 지역의 전월세 시세와 계약 조건 확인하기");
  }
  roadmap.push("주택도시기금·은행에서 대출 사전상담 받아보기");
  if (answers.timeline === "6개월 이내") {
    roadmap.push("예식 전 계약을 목표로 예산 범위 내 후보지 좁히기");
  } else {
    roadmap.push("자금 계획을 보완하며 예산 범위 내 후보지 리서치 시작하기");
  }
  roadmap.push("계약 시 필요한 서류(소득·재직 증빙 등) 미리 정리해두기");

  return {
    readinessScore,
    readinessSummary,
    policies,
    fundPlan,
    roadmap,
    topConcern: answers.concern,
  };
}
