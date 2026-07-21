import { housingSupportItems } from "./housing-support";

function pickJosa(word: string, withBatchim: string, withoutBatchim: string): string {
  const lastChar = word.charCodeAt(word.length - 1);
  if (lastChar < 0xac00 || lastChar > 0xd7a3) return withoutBatchim;
  const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
  return hasBatchim ? withBatchim : withoutBatchim;
}

export type TopConcern =
  | "매매 여부"
  | "받을 수 있는 지원"
  | "필요 자금"
  | "무엇부터 할지";

export type WeddingTimeline = "6개월 이내" | "1년 이내" | "2년 이내" | "3년 이내";

export type HousingPreference = "월세" | "전세" | "매매" | "아직 고민중";

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

export type ReadinessTier = "준비 필요" | "준비 중" | "준비 단계" | "실행 가능";

export type PolicyStatus = "priority" | "check_required" | "difficult";

export type RecommendedPolicy = {
  id: string;
  title: string;
  status: PolicyStatus;
  reasons: string[];
  checks: string[];
  nextStep: string;
};

export type StrategyStep = {
  order: number;
  title: string;
  description: string;
};

export type RoadmapStatusTag = "지금" | "다음" | "예정" | "조건 결정 후";

export type RoadmapStep = {
  timeframe: string;
  statusTag: RoadmapStatusTag;
  title: string;
};

export type ScenarioCard = {
  id: string;
  title: string;
  isCurrent: boolean;
  bullets: string[];
};

export type DiagnosisResult = {
  readinessScore: number; // 0~100
  readinessTier: ReadinessTier;
  executiveSummary: string;
  executiveSummaryAction: string;
  executiveSummaryLinkLabel: string;
  executiveSummaryLinkUrl: string;
  priorityTask: string;
  priorityTaskDescription: string;
  readinessTierSummary: string;
  readinessGood: string[];
  readinessGaps: string[];
  strategySteps: StrategyStep[];
  roadmap: RoadmapStep[];
  policies: RecommendedPolicy[];
  currentPlanBullets: string[];
  scenarios: ScenarioCard[];
  topConcern: TopConcern;
  answers: DiagnosisAnswers;
  analyzedAt: string; // ISO date
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

const NEXT_SAVINGS_TIER: Record<SavingsRange, SavingsRange | null> = {
  "3천만원 이하": "3천~5천만원",
  "3천~5천만원": "5천만원~1억원",
  "5천만원~1억원": "1억원 이상",
  "1억원 이상": null,
};

const NEXT_INCOME_TIER: Record<IncomeRange, IncomeRange | null> = {
  "5천만원 이하": "5천~7천만원",
  "5천~7천만원": "7천만원~1억원",
  "7천만원~1억원": "1억원 이상",
  "1억원 이상": null,
};

export function formatManwon(manwon: number): string {
  const eok = Math.floor(manwon / 10000);
  const remainder = Math.round(manwon % 10000);
  if (eok === 0) return `${remainder.toLocaleString()}만원`;
  if (remainder === 0) return `${eok}억원`;
  return `${eok}억 ${remainder.toLocaleString()}만원`;
}

function targetFundsFor(preference: HousingPreference): number {
  if (preference === "매매") return 30000;
  if (preference === "전세") return 15000;
  if (preference === "월세") return 3000;
  return 20000;
}

/** 규칙 기반 준비도 점수 계산. Claude는 이 점수를 재계산하지 않는다. */
function computeReadinessScore(
  funds: number,
  income: number,
  preference: HousingPreference
): number {
  const targetFunds = targetFundsFor(preference);
  const fundsScore = Math.min(1, funds / targetFunds) * 60;
  const incomeScore = Math.min(1, income / 8000) * 40;
  return Math.max(5, Math.min(100, Math.round(fundsScore + incomeScore)));
}

function tierFor(score: number): ReadinessTier {
  if (score >= 85) return "실행 가능";
  if (score >= 70) return "준비 단계";
  if (score >= 40) return "준비 중";
  return "준비 필요";
}

type PolicyMeta = {
  id: string;
  relevant: (a: DiagnosisAnswers) => boolean;
  reasons: (a: DiagnosisAnswers, funds: number) => string[];
  checks: string[];
  incomeCeilingManwon: number; // 이 소득을 넘으면 "현재 조건으로는 어려움"
  nextStep: (a: DiagnosisAnswers, status: PolicyStatus) => string;
};

const POLICY_META: PolicyMeta[] = [
  {
    id: "newlywed-jeonse-loan",
    relevant: (a) => a.preference !== "매매",
    reasons: (a, funds) => [
      `${a.preference === "전세" ? "전세" : "전월세"}를 고려 중이에요.`,
      `보유 자금 ${formatManwon(funds)} 수준으로 보증금 보완이 필요할 수 있어요.`,
    ],
    checks: ["혼인 7년 이내 조건 충족 여부", "부부 합산 소득 구간"],
    incomeCeilingManwon: 10000,
    nextStep: (_a, status) =>
      status === "difficult"
        ? "소득 기준을 초과할 가능성이 높아요. 대신 일반 전세자금 대출 상품을 함께 비교해보세요."
        : "이번 주 안에 주택도시기금 홈페이지에서 혼인 기간·소득 기준으로 사전 자격을 확인해보세요.",
  },
  {
    id: "didimdol-bogeumjari",
    relevant: (a) => a.preference === "매매",
    reasons: () => [
      "생애최초 주택 구입을 고려하고 있어요.",
      "시세보다 낮은 고정금리로 자금 부담을 줄일 수 있어요.",
    ],
    checks: ["대상 주택 가격 기준", "기존 부채 여부"],
    incomeCeilingManwon: 8500,
    nextStep: (_a, status) =>
      status === "difficult"
        ? "소득 기준을 초과할 가능성이 높아요. 보금자리론이나 일반 주택담보대출 조건을 함께 비교해보세요."
        : "한국주택금융공사 홈페이지에서 대상 주택 가격 기준(수도권 6억원 이하)에 해당하는지 확인해보세요.",
  },
  {
    id: "newlywed-hope-town",
    relevant: () => true,
    reasons: (a) => [
      "신혼부부 특화 공공분양·임대 단지예요.",
      `부부합산 연소득 ${a.income} 구간 기준 확인이 필요해요.`,
    ],
    checks: ["특별공급 소득 기준", "무주택 기간 조건"],
    incomeCeilingManwon: 10000,
    nextStep: (_a, status) =>
      status === "difficult"
        ? "특별공급 소득 기준을 초과할 가능성이 높아요. 일반공급 청약 전략을 함께 검토해보세요."
        : "LH 청약센터에서 신혼희망타운 입주자 모집 공고와 소득 기준을 확인해보세요.",
  },
  {
    id: "local-deposit-support",
    relevant: (a) => a.preference !== "매매",
    reasons: () => [
      "거주 예정 지역 지자체의 이자 지원과 함께 활용할 수 있어요.",
      "초기 자금 부담을 추가로 낮출 수 있어요.",
    ],
    checks: ["거주(예정) 지역 조건", "지자체별 지원 한도"],
    incomeCeilingManwon: 12000,
    nextStep: () =>
      "거주(예정) 지역 구청 홈페이지에서 신혼부부 임차보증금 이자 지원 제도가 있는지 확인해보세요.",
  },
  {
    id: "subscription-score",
    relevant: (a) => a.preference !== "전세",
    reasons: (a) => [
      `${a.timeline} 내 결혼을 앞두고 있어 가점 확인이 유리해요.`,
      "일반공급과 특별공급 기준이 달라 미리 확인이 필요해요.",
    ],
    checks: ["혼인 기간·자녀 수 기준", "청약통장 가입 기간"],
    incomeCeilingManwon: 12000,
    nextStep: () =>
      "청약홈에서 신혼부부 특별공급 예상 가점을 계산해보고, 청약통장 가입 기간을 함께 확인해보세요.",
  },
];

function buildPolicies(
  answers: DiagnosisAnswers,
  funds: number
): RecommendedPolicy[] {
  const findItem = (id: string) =>
    housingSupportItems.find((item) => item.id === id)!;
  const income = INCOME_MIDPOINT_MANWON[answers.income];

  const candidates = POLICY_META.filter((meta) => meta.relevant(answers)).slice(
    0,
    3
  );

  return candidates.map((meta, index) => {
    const item = findItem(meta.id);
    const status: PolicyStatus =
      income > meta.incomeCeilingManwon
        ? "difficult"
        : index === 0
        ? "priority"
        : "check_required";
    return {
      id: item.id,
      title: item.title,
      status,
      reasons: meta.reasons(answers, funds),
      checks: meta.checks,
      nextStep: meta.nextStep(answers, status),
    };
  });
}

function buildStrategySteps(answers: DiagnosisAnswers): StrategyStep[] {
  const steps: StrategyStep[] = [
    {
      order: 1,
      title: "초기 자금과 계약 비용 구체화",
      description: "목표 자금 대비 현재 보유 자금 수준을 먼저 확인해요.",
    },
    {
      order: 2,
      title: "정책대출 자격 조건 사전 확인",
      description: "소득·자산 기준에 따라 이용 가능한 정책이 달라져요.",
    },
    {
      order: 3,
      title:
        answers.preference !== "전세" ? "청약 가능성을 함께 검토" : "희망 지역 전월세 시세 확인",
      description:
        answers.preference !== "전세"
          ? "청약통장 가입 기간과 특별공급 자격을 함께 살펴봐요."
          : "희망 지역의 전세 시세와 계약 조건을 확인해요.",
    },
    {
      order: 4,
      title:
        answers.preference === "아직 고민중"
          ? "전세·매매 방향 확정 후 자금 계획 재계산"
          : "계약 일정에 맞춰 세부 자금 계획 확정",
      description:
        answers.preference === "아직 고민중"
          ? "방향이 정해지면 필요 자금과 대출 한도를 다시 계산해요."
          : "계약 시점에 맞춰 필요한 자금과 서류를 정리해요.",
    },
  ];
  return steps;
}

function buildRoadmap(answers: DiagnosisAnswers): RoadmapStep[] {
  return [
    {
      timeframe: "이번 주",
      statusTag: "지금",
      title:
        answers.preference !== "전세"
          ? "청약통장 가입 기간과 납입 횟수 확인하기"
          : "희망 지역의 전월세 시세와 계약 조건 확인하기",
    },
    {
      timeframe: "이번 달",
      statusTag: "다음",
      title: "대출 사전상담에 필요한 부부 합산 소득 증빙 자료 준비하기",
    },
    {
      timeframe: "1개월 이내",
      statusTag: "예정",
      title: "정책대출·특별공급 자격 조건 사전 확인하기",
    },
    {
      timeframe: "주거 형태 결정 후",
      statusTag: "조건 결정 후",
      title:
        answers.preference === "아직 고민중"
          ? "전세·매매별 필요 자금 다시 계산하기"
          : "계약 시 필요한 서류(소득·재직 증빙 등) 미리 정리해두기",
    },
  ];
}

function buildScenarios(answers: DiagnosisAnswers): ScenarioCard[] {
  const funds = SAVINGS_MIDPOINT_MANWON[answers.savings];
  const income = INCOME_MIDPOINT_MANWON[answers.income];
  const currentScore = computeReadinessScore(funds, income, answers.preference);

  const altPreference: HousingPreference =
    answers.preference === "전세" ? "매매" : "전세";
  const altScore = computeReadinessScore(funds, income, altPreference);
  const altDelta = altScore - currentScore;

  const scenarioA: ScenarioCard = {
    id: "preference-swap",
    title: `${altPreference}로 변경한다면`,
    isCurrent: false,
    bullets: [
      `준비도 ${altScore}점 (${altDelta >= 0 ? "+" : ""}${altDelta})`,
      altPreference === "전세"
        ? "초기 자금 부담이 줄어들 수 있어요."
        : "초기 자금 부담은 늘지만 자산 형성 측면에서 유리할 수 있어요.",
      altPreference === "전세"
        ? "주거 안정성과 계약 조건은 별도로 확인이 필요해요."
        : "정책대출 활용 여부를 함께 확인해보세요.",
    ],
  };

  const nextSavings = NEXT_SAVINGS_TIER[answers.savings];
  const nextIncome = NEXT_INCOME_TIER[answers.income];

  let scenarioB: ScenarioCard;
  if (nextSavings) {
    const altFunds = SAVINGS_MIDPOINT_MANWON[nextSavings];
    const bScore = computeReadinessScore(altFunds, income, answers.preference);
    const bDelta = bScore - currentScore;
    scenarioB = {
      id: "savings-up",
      title: `보유 자금을 ${nextSavings} 수준까지 준비한다면`,
      isCurrent: false,
      bullets: [
        `준비도 ${bScore}점 (${bDelta >= 0 ? "+" : ""}${bDelta})`,
        "선택 가능한 자금 전략이 넓어져요.",
        "대출 의존도가 낮아져 월 상환 부담이 줄어들 수 있어요.",
      ],
    };
  } else if (nextIncome) {
    const bScore = computeReadinessScore(funds, INCOME_MIDPOINT_MANWON[nextIncome], answers.preference);
    const bDelta = bScore - currentScore;
    scenarioB = {
      id: "income-up",
      title: `합산 연소득이 ${nextIncome} 구간이라면`,
      isCurrent: false,
      bullets: [
        `준비도 ${bScore}점 (${bDelta >= 0 ? "+" : ""}${bDelta})`,
        "정책대출 활용 폭이 넓어질 수 있어요.",
        "다만 특별공급 등 일부 정책은 소득 기준을 초과할 수 있어요.",
      ],
    };
  } else {
    scenarioB = {
      id: "already-max",
      title: "지금 조건으로도 충분히 준비된 편이에요",
      isCurrent: false,
      bullets: [
        "자금·소득 모두 상위 구간에 해당해요.",
        "이제는 지역·단지 선정에 집중해볼 시점이에요.",
      ],
    };
  }

  return [scenarioA, scenarioB];
}

function buildCurrentPlanBullets(
  answers: DiagnosisAnswers,
  score: number,
  additionalNeeded: number
): string[] {
  const bullets = [`${answers.preference} 고려`, `준비도 ${score}점`];
  bullets.push(additionalNeeded > 0 ? "초기 자금 확인 필요" : "초기 자금 준비 완료");
  bullets.push("정책대출 검토 필요");
  return bullets;
}

const PRIORITY_TASK_DESCRIPTIONS: Record<string, string> = {
  "초기 필요 자금 구체화":
    "목표 자금까지 얼마가 더 필요한지 계산해두면, 대출과 정책 활용 범위가 명확해져요.",
  "전세·매매 방향 결정":
    "방향이 정해져야 필요 자금과 정책 조건을 구체적으로 계산할 수 있어요.",
  "청약통장 조건 확인":
    "가입 기간과 납입 횟수에 따라 특별공급 자격이 달라질 수 있어요.",
  "정책대출 자격 조건 확인":
    "소득·자산 기준을 먼저 확인하면 이용 가능한 정책 범위를 좁힐 수 있어요.",
};

const PRIORITY_ACTION_GUIDE: Record<
  string,
  { action: string; linkLabel: string; linkUrl: string }
> = {
  "초기 필요 자금 구체화": {
    action:
      "마이홈포털에서 신혼부부 지원 정책과 목표 자금 기준을 확인하고, 통장 잔액증명서 등 보유 자산 증빙 서류를 준비해두세요.",
    linkLabel: "마이홈포털에서 확인하기",
    linkUrl: "https://www.myhome.go.kr",
  },
  "전세·매매 방향 결정": {
    action:
      "마이홈포털에서 전세·매매별 지원 조건을 비교해보고, 방향이 정해지면 계약 형태에 맞는 서류를 준비하면 돼요.",
    linkLabel: "마이홈포털에서 확인하기",
    linkUrl: "https://www.myhome.go.kr",
  },
  "청약통장 조건 확인": {
    action:
      "청약홈에서 가입 기간과 예상 가점을 확인하고, 청약통장 가입증명서를 미리 준비해두세요.",
    linkLabel: "청약홈에서 가점 확인하기",
    linkUrl: "https://www.applyhome.co.kr/ap/apg/selectAddpntCalculatorView.do",
  },
  "정책대출 자격 조건 확인": {
    action:
      "주택도시기금에서 신혼부부 전세자금 대출 자격을 확인하고, 혼인관계증명서와 소득금액증명원을 준비해두세요.",
    linkLabel: "주택도시기금에서 확인하기",
    linkUrl: "https://nhuf.molit.go.kr",
  },
};

function buildPriorityTask(
  answers: DiagnosisAnswers,
  score: number,
  additionalNeeded: number
): { task: string; description: string } {
  const task =
    additionalNeeded > 0 && score < 70
      ? "초기 필요 자금 구체화"
      : answers.preference === "아직 고민중"
      ? "전세·매매 방향 결정"
      : answers.preference !== "전세"
      ? "청약통장 조건 확인"
      : "정책대출 자격 조건 확인";

  return { task, description: PRIORITY_TASK_DESCRIPTIONS[task] };
}

const READINESS_TIER_SUMMARY: Record<ReadinessTier, string> = {
  "준비 필요": "지금부터 자금 계획을 하나씩 세워보세요.",
  "준비 중": "기본기는 갖췄지만 보완할 부분이 남아 있어요.",
  "준비 단계": "핵심 조건 몇 가지만 더 다지면 돼요.",
  "실행 가능": "바로 다음 단계로 넘어가도 좋아요.",
};

/**
 * NOTE: 아래 텍스트 생성 함수는 실제 서비스에서 Claude API 호출로 대체될 자리다.
 * Claude는 점수·정책 자격·시나리오 수치를 새로 계산하지 않고,
 * 이미 규칙 기반으로 산출된 값을 자연어로 설명하는 역할만 담당한다.
 */
function buildExecutiveSummary(
  answers: DiagnosisAnswers,
  tier: ReadinessTier,
  priorityTaskTitle: string,
  firstRoadmapTitle: string
): string {
  const openings: Record<ReadinessTier, string> = {
    "준비 필요": "지금은 자금 계획을 처음부터 차근차근 세워야 하는 단계예요.",
    "준비 중": "기본적인 준비는 시작됐지만 아직 보완할 부분이 남아 있어요.",
    "준비 단계": "현재는 집을 바로 선택하기보다 금융 조건과 초기 필요 자금을 먼저 구체화하는 단계예요.",
    "실행 가능": "필요 자금과 소득 조건을 잘 갖추고 있어 바로 다음 단계로 넘어가도 좋아요.",
  };

  const josa = pickJosa(priorityTaskTitle, "이", "가");
  return `${openings[tier]} ${answers.timeline} 내 결혼을 앞두고 있어 ${priorityTaskTitle}${josa} 우선 과제예요. 지금은 ${firstRoadmapTitle.replace(/하기$/, "")}부터 시작해보세요.`;
}

export function analyzeDiagnosis(answers: DiagnosisAnswers): DiagnosisResult {
  const funds = SAVINGS_MIDPOINT_MANWON[answers.savings];
  const income = INCOME_MIDPOINT_MANWON[answers.income];
  const targetFunds = targetFundsFor(answers.preference);

  const readinessScore = computeReadinessScore(funds, income, answers.preference);
  const readinessTier = tierFor(readinessScore);
  const additionalNeeded = Math.max(0, targetFunds - funds);

  const readinessGood: string[] = [];
  const readinessGaps: string[] = [];

  if (answers.timeline !== "6개월 이내") {
    readinessGood.push("결혼까지 준비할 시간이 남아있어요.");
  } else {
    readinessGaps.push("결혼까지 남은 시간이 촉박해 서두를 필요가 있어요.");
  }

  if (funds >= targetFunds * 0.8) {
    readinessGood.push("목표 자금의 대부분을 이미 확보했어요.");
  } else if (funds >= targetFunds * 0.4) {
    readinessGood.push("목표 자금의 절반 가까이를 준비했어요.");
  } else {
    readinessGaps.push("목표 자금 대비 보유 자금이 아직 부족해요.");
  }

  if (income >= 8000) {
    readinessGood.push("부부 합산 소득이 넉넉한 편이에요.");
  } else if (income >= 5000) {
    readinessGood.push("부부 합산 소득이 안정적인 편이에요.");
  } else {
    readinessGaps.push("소득 기준에 따라 정책 자격이 달라질 수 있어 확인이 필요해요.");
  }

  if (answers.preference !== "아직 고민중") {
    readinessGood.push("희망하는 주거 형태를 이미 정하셨어요.");
  } else {
    readinessGaps.push("전세와 매매 중 최종 방향을 아직 정하지 못했어요.");
  }

  if (answers.preference !== "전세") {
    readinessGaps.push("청약통장 가입 기간과 납입 횟수 확인이 필요해요.");
  }
  readinessGaps.push("기존 부채와 월 상환 부담은 별도로 확인이 필요해요.");
  readinessGaps.push("계약 시 필요한 초기 비용(중개보수·이사비 등)도 함께 준비해야 해요.");

  if (readinessGood.length === 0) {
    readinessGood.push("이번 진단으로 지금 상황을 명확히 파악하신 것부터가 시작이에요.");
  }

  const { task: priorityTask, description: priorityTaskDescription } = buildPriorityTask(
    answers,
    readinessScore,
    additionalNeeded
  );
  const readinessTierSummary = READINESS_TIER_SUMMARY[readinessTier];
  const roadmap = buildRoadmap(answers);
  const strategySteps = buildStrategySteps(answers);
  const policies = buildPolicies(answers, funds);
  const currentPlanBullets = buildCurrentPlanBullets(answers, readinessScore, additionalNeeded);
  const scenarios = buildScenarios(answers);
  const executiveSummary = buildExecutiveSummary(
    answers,
    readinessTier,
    priorityTask,
    roadmap[0].title
  );
  const actionGuide = PRIORITY_ACTION_GUIDE[priorityTask];

  return {
    readinessScore,
    readinessTier,
    executiveSummary,
    executiveSummaryAction: actionGuide.action,
    executiveSummaryLinkLabel: actionGuide.linkLabel,
    executiveSummaryLinkUrl: actionGuide.linkUrl,
    priorityTask,
    priorityTaskDescription,
    readinessTierSummary,
    readinessGood,
    readinessGaps,
    strategySteps,
    roadmap,
    policies,
    currentPlanBullets,
    scenarios,
    topConcern: answers.concern,
    answers,
    analyzedAt: new Date().toISOString(),
  };
}
