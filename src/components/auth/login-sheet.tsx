"use client";

import { useAuth } from "@/lib/auth-context";

export default function LoginSheet() {
  const { isSheetOpen, closeLoginSheet, login } = useAuth();

  if (!isSheetOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={closeLoginSheet}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative w-full max-w-sm rounded-t-3xl border border-border bg-surface p-6 pb-8 shadow-xl sm:rounded-3xl sm:pb-6">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />
        <h2 className="text-lg font-bold">로그인하고 계속하기</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          로그인하면 관심 있는 아파트를 저장하고, 나중에 여러 단지를 한눈에
          비교할 수 있어요.
        </p>

        <button
          type="button"
          onClick={login}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          이메일로 계속하기
        </button>
        <button
          type="button"
          onClick={closeLoginSheet}
          className="mt-2 flex w-full items-center justify-center rounded-full px-5 py-3 text-sm text-muted-foreground hover:text-foreground"
        >
          다음에 할게요
        </button>

        <p className="mt-3 text-center text-xs text-subtle-foreground">
          프로토타입 단계로 실제 계정 인증 없이 로그인 상태만 시뮬레이션합니다.
        </p>
      </div>
    </div>
  );
}
