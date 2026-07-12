import { apartments, regions } from "./mock-data";
import type { Apartment, DealType, ParsedQuery, Region } from "./types";

const KNOWN_LOCATIONS = [
  "성수동",
  "성동구",
  "강동구",
  "천호동",
  "송파구",
  "잠실동",
  "마포구",
  "아현동",
  "영등포구",
  "신길동",
  "노원구",
  "상계동",
  "서울",
];

const LIFESTYLE_KEYWORDS: Record<string, string[]> = {
  "신혼부부 추천": ["신혼부부", "신혼", "신혼집"],
  "역세권": ["역세권", "지하철", "전철"],
  "학군 우수": ["학군"],
  "가성비": ["가성비", "저렴", "실속"],
  "첫 내 집 추천": ["첫 내 집", "첫집", "생애최초"],
};

/**
 * NOTE: 실제 서비스에서는 이 함수가 OpenAI/Claude API 호출로 대체됩니다.
 * 지금은 데모를 위해 정규식 기반의 경량 파서로 자연어 조건을 추출합니다.
 */
export function parseQuery(raw: string): ParsedQuery {
  const query = raw.trim();

  let maxPriceEok: number | null = null;
  const priceMatch = query.match(/(\d+(?:\.\d+)?)\s*억/);
  if (priceMatch) {
    maxPriceEok = parseFloat(priceMatch[1]);
  }

  const regionKeywords = KNOWN_LOCATIONS.filter((loc) => query.includes(loc));

  let elementaryWalkMaxMin: number | null = null;
  const walkMatch = query.match(/(\d+)\s*분/);
  if (walkMatch && /초등학교/.test(query)) {
    elementaryWalkMaxMin = parseInt(walkMatch[1], 10);
  }

  let commuteMaxMin: number | null = null;
  const commuteMatch = query.match(/(?:직장까지|출퇴근)\s*(\d+)\s*분/);
  if (commuteMatch) {
    commuteMaxMin = parseInt(commuteMatch[1], 10);
  }

  const lifestyleTags = Object.entries(LIFESTYLE_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => query.includes(kw)))
    .map(([tag]) => tag);

  let dealType: DealType | null = null;
  if (/전세/.test(query)) dealType = "전세";
  else if (/월세/.test(query)) dealType = "월세";
  else if (/매매/.test(query)) dealType = "매매";

  let moveInBy: string | null = null;
  if (/즉시\s*입주/.test(query)) {
    moveInBy = "즉시";
  } else {
    const dateMatch = query.match(/(\d{4})-(\d{2})/);
    if (dateMatch) {
      moveInBy = `${dateMatch[1]}-${dateMatch[2]}`;
    }
  }

  return {
    raw: query,
    maxPriceEok,
    regionKeywords,
    elementaryWalkMaxMin,
    commuteMaxMin,
    lifestyleTags,
    dealType,
    moveInBy,
  };
}

export function searchApartments(parsed: ParsedQuery): Apartment[] {
  return apartments.filter((apt) => {
    if (parsed.dealType && !apt.dealTypes.includes(parsed.dealType)) {
      return false;
    }
    if (parsed.maxPriceEok !== null) {
      if (parsed.dealType === "전세") {
        if (apt.jeonsePrice === undefined || apt.jeonsePrice > parsed.maxPriceEok) {
          return false;
        }
      } else if (parsed.dealType !== "월세") {
        // 매매(기본값) 기준으로 비교. 월세는 보증금/월세 세부 데이터가 없어 가격 필터를 건너뛴다.
        if (apt.avgPrice > parsed.maxPriceEok) return false;
      }
    }
    if (parsed.moveInBy) {
      if (parsed.moveInBy === "즉시") {
        if (apt.moveInDate !== "즉시입주") return false;
      } else if (apt.moveInDate !== "즉시입주" && apt.moveInDate > parsed.moveInBy) {
        return false;
      }
    }
    if (
      parsed.elementaryWalkMaxMin !== null &&
      apt.elementarySchoolWalkMin > parsed.elementaryWalkMaxMin
    ) {
      return false;
    }
    if (
      parsed.commuteMaxMin !== null &&
      apt.commuteMinutes > parsed.commuteMaxMin
    ) {
      return false;
    }
    if (parsed.regionKeywords.length > 0) {
      const matchesRegion = parsed.regionKeywords.some(
        (loc) =>
          apt.district.includes(loc) ||
          apt.dong.includes(loc) ||
          apt.city.includes(loc)
      );
      if (!matchesRegion) return false;
    }
    if (parsed.lifestyleTags.length > 0) {
      const matchesTag = parsed.lifestyleTags.some((tag) =>
        apt.tags.includes(tag)
      );
      if (!matchesTag) return false;
    }
    return true;
  });
}

export function findMentionedRegions(parsed: ParsedQuery): Region[] {
  if (parsed.regionKeywords.length < 2) return [];
  const matched = regions.filter((region) =>
    parsed.regionKeywords.some((loc) => region.name.includes(loc))
  );
  return matched;
}

export function buildAiSummary(
  parsed: ParsedQuery,
  results: Apartment[]
): string {
  const conditions: string[] = [];
  if (parsed.regionKeywords.length > 0) {
    conditions.push(`지역: ${parsed.regionKeywords.join(", ")}`);
  }
  if (parsed.dealType) {
    conditions.push(`거래유형: ${parsed.dealType}`);
  }
  if (parsed.maxPriceEok !== null) {
    conditions.push(`예산: ${parsed.maxPriceEok}억 이하`);
  }
  if (parsed.moveInBy === "즉시") {
    conditions.push("입주: 즉시입주");
  } else if (parsed.moveInBy) {
    conditions.push(`입주희망: ${parsed.moveInBy}까지`);
  }
  if (parsed.elementaryWalkMaxMin !== null) {
    conditions.push(`초등학교 도보 ${parsed.elementaryWalkMaxMin}분 이내`);
  }
  if (parsed.commuteMaxMin !== null) {
    conditions.push(`출퇴근 ${parsed.commuteMaxMin}분 이내`);
  }
  if (parsed.lifestyleTags.length > 0) {
    conditions.push(`조건: ${parsed.lifestyleTags.join(", ")}`);
  }

  const conditionText =
    conditions.length > 0
      ? conditions.join(" · ")
      : "특정 조건 없이 전체 지역";

  if (results.length === 0) {
    return `${conditionText} 조건에 맞는 아파트를 찾지 못했습니다. 예산이나 지역 범위를 넓혀보세요.`;
  }

  return `${conditionText} 조건으로 총 ${results.length}건의 아파트를 찾았습니다. 조건 충족도가 높은 순으로 정렬했습니다.`;
}
