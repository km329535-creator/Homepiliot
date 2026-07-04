export type PricePoint = {
  /** e.g. "2023-01" */
  yearMonth: string;
  /** 억 단위 (e.g. 7.8 = 7억 8천만원) */
  price: number;
};

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
  avgPrice: number; // 억 단위
  priceMin: number;
  priceMax: number;
  recentChangeRate: number; // 최근 3개월 변동률 (%)
  elementarySchoolWalkMin: number;
  subwayWalkMin: number;
  subwayLine: string;
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
  lifestyleTags: string[];
};

export type FavoriteItem = {
  id: string;
  type: "apartment";
  savedAt: string;
};
