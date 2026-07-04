export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
              H
            </span>
            <span className="font-semibold text-foreground">HomePilot</span>
          </div>
          <p className="text-xs leading-relaxed sm:text-right">
            본 서비스의 시세·리포트는 공공 데이터 및 AI 분석을 기반으로 제공되며,
            <br className="hidden sm:block" />
            실제 거래 조건과 차이가 있을 수 있어 참고용으로만 활용하시기 바랍니다.
          </p>
        </div>
        <p className="mt-6 text-xs text-subtle-foreground">
          © 2026 HomePilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
