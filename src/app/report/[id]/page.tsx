import Link from "next/link";
import { notFound } from "next/navigation";
import { apartments, getApartmentById, getNearbyApartments } from "@/lib/mock-data";
import { formatEok, formatRate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { ScoreDots } from "@/components/ui/score-dots";
import StatCard from "@/components/report/stat-card";
import PriceTrendChart from "@/components/report/price-trend-chart";
import SaveButton from "@/components/report/save-button";

export function generateStaticParams() {
  return apartments.map((apt) => ({ id: apt.id }));
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apartment = getApartmentById(id);
  if (!apartment) notFound();

  const nearby = getNearbyApartments(apartment);
  const positive = apartment.recentChangeRate >= 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <Link
        href="/search"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← 검색으로 돌아가기
      </Link>

      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {apartment.city} {apartment.district} {apartment.dong} · {apartment.address}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {apartment.name}
          </h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {apartment.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">
              {formatEok(apartment.avgPrice)}
            </span>
            <Badge tone={positive ? "positive" : "negative"}>
              최근 3개월 {formatRate(apartment.recentChangeRate)}
            </Badge>
          </div>
          <SaveButton apartmentId={apartment.id} />
        </div>
      </div>

      <div className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="🏗️"
          label="준공년도 · 세대수"
          value={`${apartment.builtYear}년 · ${apartment.households}세대`}
        />
        <StatCard icon="📐" label="전용면적" value={`${apartment.areaPy}평`} />
        <StatCard
          icon="🚇"
          label="교통"
          value={`${apartment.subwayLine} 도보 ${apartment.subwayWalkMin}분`}
          helper={`교통 접근성 ${apartment.transitScore}/5`}
        />
        <StatCard
          icon="🏫"
          label="초등학교"
          value={`도보 ${apartment.elementarySchoolWalkMin}분`}
          helper={`생활 인프라 ${apartment.infraScore}/5`}
        />
      </div>

      <section className="border-t border-border py-8">
        <h2 className="text-lg font-semibold">실거래가 추이 · 최근 시세 변화</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          최근 {apartment.priceHistory.length}개 시점 기준 평균 실거래가이며, 최근
          3개월간{" "}
          <span className={positive ? "text-positive" : "text-negative"}>
            {formatRate(apartment.recentChangeRate)}
          </span>{" "}
          변동했습니다.
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <PriceTrendChart history={apartment.priceHistory} />
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="text-lg font-semibold">주변 단지 비교</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          가까운 비교 단지 대비 시세와 조건을 확인해보세요.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {nearby.length > 0 ? (
            nearby.map((n) => (
              <Link
                key={n.id}
                href={`/report/${n.id}`}
                className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{n.name}</h3>
                  <Badge tone={n.avgPrice < apartment.avgPrice ? "positive" : "neutral"}>
                    {n.avgPrice < apartment.avgPrice ? "더 저렴" : "비교 단지"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {n.district} {n.dong}
                </p>
                <p className="mt-3 text-xl font-bold">{formatEok(n.avgPrice)}</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              등록된 인접 비교 단지가 없습니다.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="text-lg font-semibold">교통 접근성</h2>
        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
          <ScoreDots score={apartment.transitScore} />
          <p className="text-sm text-muted-foreground">
            {apartment.subwayLine}까지 도보 {apartment.subwayWalkMin}분 거리로,
            5점 만점에 {apartment.transitScore}점의 접근성을 갖추고 있습니다.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="text-lg font-semibold">생활 인프라</h2>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <div className="mb-4 flex items-center gap-4">
            <ScoreDots score={apartment.infraScore} />
            <span className="text-sm text-muted-foreground">
              생활 인프라 {apartment.infraScore}/5
            </span>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {apartment.infraFacilities.map((facility) => (
              <li
                key={facility}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {facility}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="text-lg font-semibold">장점 및 고려사항</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-positive">장점</h3>
            <ul className="space-y-2">
              {apartment.pros.map((pro) => (
                <li key={pro} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-positive">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
              고려사항
            </h3>
            <ul className="space-y-2">
              {apartment.considerations.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
