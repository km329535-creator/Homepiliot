export function ScoreDots({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${
            i < score ? "bg-accent" : "bg-surface-muted"
          }`}
        />
      ))}
    </div>
  );
}
