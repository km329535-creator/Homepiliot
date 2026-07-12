import type { RegionHighlight } from "./types";

export const regionHighlights: RegionHighlight[] = [
  {
    id: "yeouido-magok-commute",
    title: "여의도·마포 출퇴근에 좋은 지역",
    description:
      "여의도·광화문 업무지구까지 대중교통 20분 이내로 이동할 수 있는 지역이에요.",
    query: "마포구 영등포구 아파트 추천해줘",
    regionIds: ["mapo-ahyeon", "yeongdeungpo-singil"],
  },
  {
    id: "gangnam-jamsil-access",
    title: "강남·잠실 접근성이 좋은 지역",
    description:
      "더블 역세권으로 강남권 이동이 편리한 지역이에요. 다만 학군 수요가 있어 시세는 7억대 이상입니다.",
    query: "송파구 성수동 아파트 추천해줘",
    regionIds: ["songpa-jamsil", "seongdong-seongsu"],
  },
  {
    id: "newlywed-jeonse-demand",
    title: "신혼부부 전세 수요가 높은 지역",
    description:
      "신축 소형 평형과 합리적인 전세가로 신혼부부 수요가 꾸준한 지역이에요.",
    query: "신혼부부가 살기 좋은 지역 알려줘",
    regionIds: ["mapo-ahyeon", "yeongdeungpo-singil", "nowon-sanggye"],
  },
  {
    id: "park-infra-rich",
    title: "공원과 생활시설이 잘 갖춰진 지역",
    description:
      "대형 공원과 상권이 가까워 생활 인프라 만족도가 높은 지역이에요.",
    query: "송파구 강동구 아파트 추천해줘",
    regionIds: ["songpa-jamsil", "gangdong-cheonho"],
  },
];
