import Link from "next/link";
import { BarChart3, Landmark, Map, Wallet } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";

const PREVIEW_ITEMS = [
  {
    icon: BarChart3,
    title: "첫 집 준비도",
    description: "지금 자금·소득 상태로 첫 집 마련까지 얼마나 준비되었는지 점수로 확인해요.",
  },
  {
    icon: Landmark,
    title: "추천 금융·정책",
    description: "신혼부부 전세자금 대출, 신혼희망타운 등 우리 상황에 맞는 정책을 추천받아요.",
  },
  {
    icon: Wallet,
    title: "자금 계획",
    description: "보유 자금 대비 추정 대출 한도와 정책 활용 가능 여부를 확인해요.",
  },
  {
    icon: Map,
    title: "스텝 로드맵",
    description: "지금부터 계약까지 무엇을, 어떤 순서로 준비해야 하는지 안내받아요.",
  },
];

export default function DiagnosisPreview() {
  return (
    <section className="border-t border-border bg-surface-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <ScrollReveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            진단 결과에서 확인할 수 있어요
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-lg">
            5개 질문에 답하면 아래 4가지를 한 번에 확인할 수 있어요.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_ITEMS.map((item, i) => (
            <ScrollReveal
              key={item.title}
              delay={i * 100}
              className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100">
                <item.icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/diagnosis"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-brand-600/20 transition-colors hover:bg-brand-700"
          >
            진단 시작하기
          </Link>
        </div>
      </div>
    </section>
  );
}
