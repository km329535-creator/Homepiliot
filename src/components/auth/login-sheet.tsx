"use client";

import { useAuth } from "@/lib/auth-context";
import GoogleLoginButton from "./google-login-button";

export default function LoginSheet() {
  const { isSheetOpen, closeLoginSheet } = useAuth();

  if (!isSheetOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={closeLoginSheet}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative w-full max-w-sm rounded-t-[20px] border border-border bg-surface p-6 pb-8 shadow-xl sm:rounded-[20px] sm:pb-6">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />
        <h2 className="text-lg font-bold">로그인</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          로그인하면 진단 결과를 저장할 수 있어요.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <GoogleLoginButton className="w-full" />
          <button
            type="button"
            onClick={closeLoginSheet}
            className="flex h-12 w-full items-center justify-center rounded-xl px-5 text-sm text-muted-foreground hover:text-foreground"
          >
            다음에 할게요
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-subtle-foreground">
          Google 계정으로 안전하게 로그인해요. 비밀번호를 별도로 저장하지 않아요.
        </p>
      </div>
    </div>
  );
}
