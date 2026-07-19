import Link from "next/link";
import { Home as HomeIcon, Landmark, ListChecks, PiggyBank } from "lucide-react";
import HowItWorks from "@/components/home/how-it-works";
import DiagnosisPreview from "@/components/home/diagnosis-preview";
import HousingSupportPreview from "@/components/home/housing-support-preview";
import BottomCta from "@/components/home/bottom-cta";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScoreRing from "@/components/diagnosis/score-ring";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="aurora-bg border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8 text-center sm:py-10">
          <Badge tone="accent" className="mb-4">
            부부를 위한 로드맵 설계
          </Badge>
          <h1 className="max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-5xl">
            우리 부부, 내 집 마련은
            <br />
            어디서부터 시작할까요?
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
            현재 자금과 결혼 계획을 바탕으로 첫 집 준비 상태를 진단하고,
            지금 가장 필요한 준비를 알려드려요.
          </p>

          <div className="mt-5 flex flex-col items-center gap-2">
            <Link
              href="/diagnosis"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-medium text-primary-foreground transition-colors hover:bg-brand-700"
            >
              3분 무료 진단 시작하기
            </Link>
            <p className="text-xs text-subtle-foreground">
              3분 소요 · 회원가입 없이 바로 진단할 수 있어요 · 결과는 참고용이에요.
            </p>
          </div>

          <ScrollReveal className="glass mt-10 w-full max-w-3xl rounded-[24px] p-5 text-left sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-100">
                <HomeIcon className="h-4 w-4 text-brand-600" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="text-sm font-semibold text-foreground">
                AI 분석 결과 미리보기
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              <div className="rounded-2xl border border-border bg-surface p-3 text-center sm:p-5">
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  첫 집 준비도
                </p>
                <div className="mt-2 flex justify-center sm:mt-4">
                  <ScoreRing score={82} size={64} />
                </div>
                <p className="mt-2 text-xs font-semibold text-positive sm:mt-4 sm:text-sm">
                  양호해요! 👍
                </p>
                <p className="mt-1 text-[10px] text-subtle-foreground sm:text-xs">
                  평균 대비 상위 35%
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-3 text-center sm:p-5">
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  추천 혜택
                </p>
                <p className="mt-2 text-2xl font-bold text-warning sm:mt-4 sm:text-4xl">
                  3<span className="text-xs font-medium text-muted-foreground sm:text-base">개</span>
                </p>
                <p className="mt-1 text-[10px] text-subtle-foreground sm:text-xs">
                  맞춤 정책 추천
                </p>
                <div className="mt-2 flex justify-center gap-1.5 sm:mt-4 sm:gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-8 sm:w-8">
                    <HomeIcon className="h-3 w-3 text-brand-600 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-positive/10 sm:h-8 sm:w-8">
                    <Landmark className="h-3 w-3 text-positive sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/10 sm:h-8 sm:w-8">
                    <PiggyBank className="h-3 w-3 text-warning sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-3 text-center sm:p-5">
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  다음 스텝
                </p>
                <p className="mt-2 text-2xl font-bold text-brand-600 sm:mt-4 sm:text-4xl">
                  4<span className="text-xs font-medium text-muted-foreground sm:text-base">단계</span>
                </p>
                <p className="mt-1 text-[10px] text-subtle-foreground sm:text-xs">
                  맞춤 로드맵 제공
                </p>
                <div className="mt-2 flex justify-center sm:mt-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-8 sm:w-8">
                    <ListChecks className="h-3 w-3 text-brand-600 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-surface-muted p-4 sm:mt-6 sm:p-5">
              <p className="mb-2 text-xs font-semibold text-foreground sm:mb-3 sm:text-sm">
                예상 자금 계획 요약
              </p>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between py-2 text-xs sm:py-2.5 sm:text-sm">
                  <span className="text-muted-foreground">예상 대출</span>
                  <span className="font-semibold text-foreground">3억 2,000만원</span>
                </div>
                <div className="flex items-center justify-between py-2 text-xs sm:py-2.5 sm:text-sm">
                  <span className="text-muted-foreground">예상 지원금</span>
                  <span className="font-semibold text-foreground">2,600만원</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-xl bg-positive/10 px-3 py-2.5 text-xs sm:text-sm">
                <span className="font-medium text-foreground">예상 필요 자금</span>
                <span className="font-bold text-positive">4억 7,400만원</span>
              </div>
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
