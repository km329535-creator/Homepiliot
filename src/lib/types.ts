export type PricePoint = {
  /** e.g. "2023-01" */
  yearMonth: string;
  /** 억 단위 (e.g. 7.8 = 7억 8천만원) */
  price: number;
};

export type DealType = "매매" | "전세" | "월세";

export type Apartment = {
  id: string;
  name: string;
  city: string;
  district: string; // 구
  dong: string; // 동
  address: string;
  builtYear: number;
  households: number;
  areaPy: number; // 전용면적 (평)
  avgPrice: number; // 매매가, 억 단위
  priceMin: number;
  priceMax: number;
  dealTypes: DealType[]; // 거래 가능 유형
  jeonsePrice?: number; // 전세가, 억 단위 (dealTypes에 "전세" 포함 시)
  recentChangeRate: number; // 최근 3개월 변동률 (%)
  elementarySchoolWalkMin: number;
  subwayWalkMin: number;
  subwayLine: string;
  commuteMinutes: number; // 주요 업무지구(강남·여의도·시청권)까지 대중교통 예상 소요시간(분)
  moveInDate: string; // "즉시입주" 또는 "YYYY-MM"
  transitScore: number; // 1~5
  infraScore: number; // 1~5
  infraFacilities: string[]; // e.g. "대형마트 도보 5분"
  tags: string[]; // e.g. "신혼부부 추천", "역세권", "신축"
  pros: string[];
  considerations: string[];
  priceHistory: PricePoint[];
  nearbyApartmentIds: string[];
  lat: number;
  lng: number;
};

export type Region = {
  id: string;
  name: string; // e.g. "성동구 성수동"
  city: string;
  avgPrice: number;
  recentChangeRate: number;
  transitScore: number;
  infraScore: number;
  summary: string;
  tags: string[];
  apartmentIds: string[];
};

export type ParsedQuery = {
  raw: string;
  maxPriceEok: number | null;
  regionKeywords: string[];
  elementaryWalkMaxMin: number | null;
  commuteMaxMin: number | null;
  lifestyleTags: string[];
  dealType: DealType | null;
  moveInBy: string | null; // "YYYY-MM", 이 시점까지 입주 가능해야 함
};

export type FavoriteItem = {
  id: string;
  type: "apartment";
  savedAt: string;
};

export type RegionHighlight = {
  id: string;
  title: string; // e.g. "여의도·마곡 출퇴근에 좋은 지역"
  description: string;
  query: string; // /search로 연결할 자연어 질의
  regionIds: string[];
};

export type HousingSupportItem = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};
