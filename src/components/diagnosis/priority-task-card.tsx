export default function PriorityTaskCard({ task }: { task: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted-foreground">현재 가장 중요한 과제</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl">🎯</span>
        <span className="text-xl font-bold leading-snug tracking-tight">
          {task}
        </span>
      </div>
      <p className="mt-3 text-[11px] text-subtle-foreground">
        상황에 따라 우선순위가 달라질 수 있어요.
      </p>
    </div>
  );
}
