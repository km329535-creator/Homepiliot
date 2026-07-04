import type { PricePoint } from "@/lib/types";
import { formatEok } from "@/lib/format";

const WIDTH = 600;
const HEIGHT = 220;
const PAD_X = 24;
const PAD_Y = 24;

export default function PriceTrendChart({ history }: { history: PricePoint[] }) {
  const prices = history.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const points = history.map((point, i) => {
    const x =
      PAD_X + (i / (history.length - 1)) * (WIDTH - PAD_X * 2);
    const y =
      HEIGHT - PAD_Y - ((point.price - min) / range) * (HEIGHT - PAD_Y * 2);
    return { x, y, ...point };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${(HEIGHT - PAD_Y).toFixed(1)} L${points[0].x.toFixed(1)},${(HEIGHT - PAD_Y).toFixed(1)} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="실거래가 추이 차트"
      >
        <defs>
          <linearGradient id="priceArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={PAD_Y + t * (HEIGHT - PAD_Y * 2)}
            y2={PAD_Y + t * (HEIGHT - PAD_Y * 2)}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        <path d={areaPath} fill="url(#priceArea)" />
        <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p) => (
          <circle key={p.yearMonth} cx={p.x} cy={p.y} r={3.5} fill="var(--accent)" />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-xs text-subtle-foreground">
        <span>{history[0].yearMonth}</span>
        <span className="font-medium text-muted-foreground">
          최고 {formatEok(max)} · 최저 {formatEok(min)}
        </span>
        <span>{history[history.length - 1].yearMonth}</span>
      </div>
    </div>
  );
}
