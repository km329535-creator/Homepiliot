import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Heart,
  Home as HomeIcon,
  KeyRound,
  Landmark,
  ListChecks,
  PiggyBank,
} from "lucide-react";
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
      <section className="aurora-bg relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <HomeIcon
            className="animate-float absolute left-[8%] top-[20%] h-10 w-10 text-brand-300/50 sm:h-14 sm:w-14"
            strokeWidth={1.5}
            style={{ animationDelay: "0s" }}
          />
          <Heart
            className="animate-float-alt absolute right-[12%] top-[24%] h-8 w-8 text-brand-300/50 sm:h-10 sm:w-10"
            strokeWidth={1.5}
            style={{ animationDelay: "1.2s" }}
          />
          <KeyRound
            className="animate-float-alt absolute left-[14%] bottom-[22%] h-9 w-9 text-brand-300/50 sm:h-12 sm:w-12"
            strokeWidth={1.5}
            style={{ animationDelay: "0.6s" }}
          />
          <PiggyBank
            className="animate-float absolute right-[10%] bottom-[18%] h-9 w-9 text-brand-300/50 sm:h-12 sm:w-12"
            strokeWidth={1.5}
            style={{ animationDelay: "1.8s" }}
          />
          <Building2
            className="animate-float absolute left-[46%] top-[12%] hidden h-10 w-10 text-brand-300/40 sm:block"
            strokeWidth={1.5}
            style={{ animationDelay: "0.9s" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8 text-center sm:py-10">
          <Badge tone="accent" size="md" className="mb-5">
            예비 부부를 위한 로드맵 설계
          </Badge>
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
            <Link
              href="/diagnosis"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-9 text-lg font-semibold text-primary-foreground shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700"
            >
              3분 무료 진단 시작하기
            </Link>
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

          <ScrollReveal className="glass mx-auto w-full max-w-3xl rounded-[24px] p-5 text-left sm:p-8">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              <div className="rounded-2xl border border-border bg-surface p-3 text-center sm:p-5">
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  첫 집 준비도
                </p>
                <div className="mt-2 flex justify-center sm:mt-4">
                  <ScoreRing score={82} size={64} color="var(--brand-600)" />
                </div>
                <p className="mt-2 text-xs font-semibold text-brand-600 sm:mt-4 sm:text-sm">
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
                <p className="mt-2 text-2xl font-bold text-brand-600 sm:mt-4 sm:text-4xl">
                  3<span className="text-xs font-medium text-muted-foreground sm:text-base">개</span>
                </p>
                <p className="mt-1 text-[10px] text-subtle-foreground sm:text-xs">
                  맞춤 정책 추천
                </p>
                <div className="mt-2 flex justify-center gap-1.5 sm:mt-4 sm:gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-8 sm:w-8">
                    <HomeIcon className="h-3 w-3 text-brand-600 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-8 sm:w-8">
                    <Landmark className="h-3 w-3 text-brand-600 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 sm:h-8 sm:w-8">
                    <PiggyBank className="h-3 w-3 text-brand-600 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden />
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
                  <span className="text-muted-foreground">목표 자금</span>
                  <span className="font-semibold text-foreground">3억원</span>
                </div>
                <div className="flex items-center justify-between py-2 text-xs sm:py-2.5 sm:text-sm">
                  <span className="text-muted-foreground">현재 보유 자금</span>
                  <span className="font-semibold text-foreground">8,000만원</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-xl bg-brand-100 px-3 py-2.5 text-xs sm:text-sm">
                <span className="font-medium text-foreground">추가로 준비할 자금</span>
                <span className="font-bold text-brand-700">2억 2,000만원</span>
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
