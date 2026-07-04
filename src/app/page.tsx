import HeroSearch from "@/components/home/hero-search";
import PropertyCard from "@/components/search/property-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { apartments } from "@/lib/mock-data";

const FEATURES = [
  {
    title: "AI 지역·아파트 검색",
    description:
      "\"성수동에서 8억 이하 아파트 추천해줘\"처럼 자연어로 조건을 말하면, AI가 조건을 이해해 맞는 지역과 단지를 찾아드립니다.",
    icon: "🔎",
  },
  {
    title: "AI 부동산 분석 리포트",
    description:
      "실거래가 추이, 시세 변화, 주변 단지 비교, 교통·생활 인프라까지 AI가 이해하기 쉬운 리포트로 요약해드립니다.",
    icon: "📊",
  },
  {
    title: "관심 지역 저장 및 비교",
    description:
      "마음에 드는 지역과 단지를 저장하고, 시세·교통·인프라·AI 종합 의견까지 한 화면에서 비교해보세요.",
    icon: "⭐",
  },
];

const FEATURED_IDS = ["seongsu-riverview", "mapo-newlywed-village", "sangye-skyview"];

export default function Home() {
  const featured = apartments.filter((apt) => FEATURED_IDS.includes(apt.id));

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-surface-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <Badge tone="accent" className="mb-5">
            AI 부동산 의사결정 플랫폼
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            내 집 마련의 확신,
            <br />
            데이터와 AI로 더하다
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            지역별 아파트 시세와 주변 데이터를 분석하여 실거주 및 구매 의사결정을
            돕는 플랫폼, HomePilot.
          </p>

          <div className="mt-10 flex w-full justify-center">
            <HeroSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            핵심 기능
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            검색부터 분석, 비교까지 — 의사결정에 필요한 모든 과정을 한 곳에서
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                지금 주목받는 아파트
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                AI가 뽑은 실거주 만족도 높은 추천 단지
              </p>
            </div>
            <ButtonLink href="/search" variant="secondary" className="hidden sm:inline-flex">
              전체 검색하기
            </ButtonLink>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((apt) => (
              <PropertyCard key={apt.id} apartment={apt} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
