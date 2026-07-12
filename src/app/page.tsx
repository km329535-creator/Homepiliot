import HeroSearch from "@/components/home/hero-search";
import ConditionPillars from "@/components/home/condition-pillars";
import RecommendedTabs from "@/components/home/recommended-tabs";
import RegionExplore from "@/components/home/region-explore";
import ComparePreview from "@/components/home/compare-preview";
import HousingSupportPreview from "@/components/home/housing-support-preview";
import HowItWorks from "@/components/home/how-it-works";
import BottomCta from "@/components/home/bottom-cta";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-surface-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center sm:py-24">
          <Badge tone="accent" className="mb-5">
            신혼부부를 위한 첫 내 집 찾기
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            우리 둘에게 맞는
            <br />
            첫 아파트를 찾아보세요
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            예산, 출퇴근, 생활환경까지 함께 고려해 신혼부부에게 맞는 아파트를
            쉽게 비교해보세요.
          </p>

          <div className="mt-10 flex w-full justify-center">
            <HeroSearch />
          </div>
        </div>
      </section>

      <ConditionPillars />
      <RecommendedTabs />
      <RegionExplore />
      <ComparePreview />
      <HousingSupportPreview />
      <HowItWorks />
      <BottomCta />
    </div>
  );
}
