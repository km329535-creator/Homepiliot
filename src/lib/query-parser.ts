import { apartments, regions } from "./mock-data";
import type { Apartment, ParsedQuery, Region } from "./types";

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

  const lifestyleTags = Object.entries(LIFESTYLE_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => query.includes(kw)))
    .map(([tag]) => tag);

  return {
    raw: query,
    maxPriceEok,
    regionKeywords,
    elementaryWalkMaxMin,
    lifestyleTags,
  };
}

export function searchApartments(parsed: ParsedQuery): Apartment[] {
  return apartments.filter((apt) => {
    if (parsed.maxPriceEok !== null && apt.avgPrice > parsed.maxPriceEok) {
      return false;
    }
    if (
      parsed.elementaryWalkMaxMin !== null &&
      apt.elementarySchoolWalkMin > parsed.elementaryWalkMaxMin
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
  if (parsed.maxPriceEok !== null) {
    conditions.push(`예산: ${parsed.maxPriceEok}억 이하`);
  }
  if (parsed.elementaryWalkMaxMin !== null) {
    conditions.push(`초등학교 도보 ${parsed.elementaryWalkMaxMin}분 이내`);
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
