import Link from "next/link";
import HowItWorks from "@/components/home/how-it-works";
import DiagnosisPreview from "@/components/home/diagnosis-preview";
import HousingSupportPreview from "@/components/home/housing-support-preview";
import BottomCta from "@/components/home/bottom-cta";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-surface-muted/40">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              3분 무료 진단 시작하기
            </Link>
            <p className="text-xs text-subtle-foreground">
              회원가입 없이 바로 진단할 수 있어요.
            </p>
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
