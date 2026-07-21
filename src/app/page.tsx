import {
  Building2,
  ChevronDown,
  Heart,
  Home as HomeIcon,
  KeyRound,
  Landmark,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import LandingCtaLink from "@/components/home/landing-cta-link";
import CtaCountBadge from "@/components/home/cta-count-badge";
import HowItWorks from "@/components/home/how-it-works";
import DiagnosisPreview from "@/components/home/diagnosis-preview";
import HousingSupportPreview from "@/components/home/housing-support-preview";
import BottomCta from "@/components/home/bottom-cta";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScoreRing from "@/components/diagnosis/score-ring";
import { getCtaClickCount } from "@/lib/cta-clicks";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialCtaCount = await getCtaClickCount();

  return (
    <div className="flex flex-col">
      <section className="aurora-bg relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <HomeIcon
            className="animate-float absolute left-[3%] top-[15%] h-10 w-10 text-brand-300/50 sm:h-14 sm:w-14"
            strokeWidth={1.5}
            style={{ animationDelay: "0s" }}
          />
          <Heart
            className="animate-float-alt absolute right-[4%] top-[18%] h-8 w-8 text-brand-300/50 sm:h-10 sm:w-10"
            strokeWidth={1.5}
            style={{ animationDelay: "1.2s" }}
          />
          <KeyRound
            className="animate-float-alt absolute left-[4%] bottom-[12%] h-9 w-9 text-brand-300/50 sm:h-12 sm:w-12"
            strokeWidth={1.5}
            style={{ animationDelay: "0.6s" }}
          />
          <PiggyBank
            className="animate-float absolute right-[3%] bottom-[10%] h-9 w-9 text-brand-300/50 sm:h-12 sm:w-12"
            strokeWidth={1.5}
            style={{ animationDelay: "1.8s" }}
          />
          <Building2
            className="animate-float absolute left-[82%] top-[8%] hidden h-10 w-10 text-brand-300/40 sm:block"
            strokeWidth={1.5}
            style={{ animationDelay: "0.9s" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8 text-center sm:py-10">
          <CtaCountBadge initialCount={initialCtaCount} />
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            우리 부부, 내 집 마련은
            <br />
            어디서부터 시작할까요?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">
            현재 자금과 결혼 계획을 바탕으로
            <br />
            첫 집 준비 상태를 진단하고, 지금 가장 필요한 준비를 알려드려요.
          </p>

          <div className="mt-7 flex flex-col items-center gap-2">
            <LandingCtaLink
              href="/diagnosis"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-9 text-lg font-semibold text-primary-foreground shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700"
            >
              클릭하고 시작하기
            </LandingCtaLink>
          </div>

          <div className="mt-20 flex flex-col items-center gap-1.5 text-subtle-foreground sm:mt-28">
            <p className="text-xs font-medium sm:text-sm">
              스크롤하고 더 알아보기
            </p>
            <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.75} aria-hidden />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="mx-auto mb-8 w-full max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              분석 결과 미리보기
            </h2>
          </div>

          <ScrollReveal className="mx-auto w-full max-w-3xl rounded-[24px] border border-border bg-surface p-5 text-left shadow-xl sm:p-8">
            {/* 히어로: 첫 집 준비도 */}
            <div className="rounded-2xl border border-border bg-surface-muted/40 p-4 sm:p-6">
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                첫 집 준비도
              </p>
              <div className="mt-3 flex items-center gap-4 sm:mt-4">
                <ScoreRing score={82} size={72} color="var(--positive)" />
                <div>
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold tracking-tight text-positive sm:text-4xl">
                      82
                    </span>
                    <span className="text-xs font-semibold text-subtle-foreground sm:text-sm">
                      / 100점
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-positive sm:text-sm">양호해요! 👍</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[82%] rounded-full bg-positive" />
              </div>
            </div>

            {/* 보조 카드 2단 */}
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
              <div className="rounded-2xl border border-border bg-surface-muted/40 p-3 text-center sm:p-5">
                <p className="text-sm text-muted-foreground sm:text-base">
                  추천 혜택
                </p>
                <p className="mt-2 text-3xl font-bold text-brand-600 sm:mt-3 sm:text-4xl">
                  3<span className="text-sm font-medium text-muted-foreground sm:text-lg">개</span>
                </p>
                <div className="mt-2 flex justify-center gap-1.5 sm:mt-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-7 sm:w-7">
                    <HomeIcon className="h-3 w-3 text-brand-600 sm:h-3.5 sm:w-3.5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-7 sm:w-7">
                    <Landmark className="h-3 w-3 text-brand-600 sm:h-3.5 sm:w-3.5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-7 sm:w-7">
                    <PiggyBank className="h-3 w-3 text-brand-600 sm:h-3.5 sm:w-3.5" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface-muted/40 p-3 text-center sm:p-5">
                <p className="text-sm text-muted-foreground sm:text-base">
                  다음 스텝
                </p>
                <p className="mt-2 text-3xl font-bold text-brand-600 sm:mt-3 sm:text-4xl">
                  4<span className="text-sm font-medium text-muted-foreground sm:text-lg">단계</span>
                </p>
              </div>
            </div>

            {/* 분석 요약 */}
            <div className="mt-3 rounded-2xl bg-brand-50 p-4 sm:mt-4 sm:p-5">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700 sm:mb-3 sm:text-sm">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                분석 요약
              </p>
              <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                기본적인 준비는 시작됐지만 아직 보완할 부분이 남아 있어요. 지금은
                희망 지역의 전월세 시세와 계약 조건 확인부터 시작해보세요.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <HowItWorks />
      <DiagnosisPreview />
      <HousingSupportPreview />
      <BottomCta />
    </div>
  );
}
