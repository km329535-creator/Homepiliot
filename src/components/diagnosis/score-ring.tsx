const SIZE = 120;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function colorForScore(score: number): string {
  if (score >= 80) return "var(--positive)";
  if (score >= 50) return "var(--accent)";
  return "var(--warning)";
}

export default function ScoreRing({ score }: { score: number }) {
  const offset = CIRCUMFERENCE * (1 - score / 100);
  const color = colorForScore(score);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      className="flex-none -rotate-90"
      role="img"
      aria-label={`준비도 점수 ${score}점`}
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--surface-muted)"
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x={SIZE / 2}
        y={SIZE / 2}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
        fill="var(--foreground)"
        fontSize={28}
        fontWeight={700}
      >
        {score}
      </text>
    </svg>
  );
}
