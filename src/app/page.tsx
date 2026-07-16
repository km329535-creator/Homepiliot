import Link from "next/link";
import { BarChart3, Landmark, ListChecks } from "lucide-react";
import HowItWorks from "@/components/home/how-it-works";
import DiagnosisPreview from "@/components/home/diagnosis-preview";
import HousingSupportPreview from "@/components/home/housing-support-preview";
import BottomCta from "@/components/home/bottom-cta";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="aurora-bg border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <Badge tone="accent" className="mb-5">
            부부를 위한 로드맵 설계
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            우리 부부, 지금
            <br />
            뭐부터 준비해야 할까요?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            매물을 뒤지기 전에, 지금 우리 상황부터 진단해보세요. 5개 질문이면
            준비도와 다음 단계를 AI가 알려드려요.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
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

          <div className="glass mt-12 w-full max-w-md rounded-[20px] p-5 text-left">
            <p className="mb-3 text-xs font-semibold text-brand-700">결과 미리보기</p>
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
        </div>
      </section>

      <HowItWorks />
      <DiagnosisPreview />
      <HousingSupportPreview />
      <BottomCta />
    </div>
  );
}
