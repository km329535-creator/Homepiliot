export function colorForScore(score: number): string {
  if (score >= 80) return "var(--positive)";
  if (score >= 50) return "var(--accent)";
  return "var(--warning)";
}

export default function ScoreRing({
  score,
  size = 120,
  color: colorOverride,
}: {
  score: number;
  size?: number;
  color?: string;
}) {
  const stroke = Math.max(6, Math.round(size * 0.083));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = colorOverride ?? colorForScore(score);
  const fontSize = Math.round(size * 0.23);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="flex-none -rotate-90"
      role="img"
      aria-label={`준비도 점수 ${score}점`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--surface-muted)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        fill="var(--foreground)"
        fontSize={fontSize}
        fontWeight={700}
      >
        {score}
      </text>
    </svg>
  );
}
