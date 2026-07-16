import Link from "next/link";
import { BarChart3, Landmark, ListChecks } from "lucide-react";
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
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-14 text-center sm:py-20">
          <Badge tone="accent" className="mb-5">
            부부를 위한 로드맵 설계
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.45] tracking-tight text-foreground sm:text-6xl">
            우리 부부, 내 집 마련은
            <br />
            어디서부터 시작할까요?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">
            현재 자금과 결혼 계획을 바탕으로 첫 집 준비 상태를 진단하고,
            지금 가장 필요한 준비를 알려드려요.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/diagnosis"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-brand-700"
            >
              3분 무료 진단 시작하기
            </Link>
            <p className="text-xs text-subtle-foreground">
              3분 소요 · 회원가입 없이 바로 진단할 수 있어요 · 결과는 참고용이에요.
            </p>
          </div>

          <ScrollReveal className="glass mt-10 w-full max-w-3xl overflow-hidden rounded-[20px] text-left">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-negative/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-positive/50" />
              <span className="ml-2 text-xs text-subtle-foreground">
                HomePilot · 첫 집 준비 분석
              </span>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
              <div className="flex items-center gap-4">
                <ScoreRing score={78} />
                <div>
                  <Badge tone="positive">준비 단계</Badge>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    첫 집 준비도
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-surface/70 p-3">
                  <BarChart3 className="h-4 w-4 text-brand-600" strokeWidth={1.75} aria-hidden />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">준비도</p>
                  <p className="text-sm font-bold">준비 단계</p>
                </div>
                <div className="rounded-lg bg-surface/70 p-3">
                  <Landmark className="h-4 w-4 text-brand-600" strokeWidth={1.75} aria-hidden />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">추천 정책</p>
                  <p className="text-sm font-bold">최대 3개</p>
                </div>
                <div className="rounded-lg bg-surface/70 p-3">
                  <ListChecks className="h-4 w-4 text-brand-600" strokeWidth={1.75} aria-hidden />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">다음 행동</p>
                  <p className="text-sm font-bold">4단계</p>
                </div>
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
