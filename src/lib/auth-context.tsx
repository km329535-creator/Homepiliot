"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackEvent } from "./mixpanel";

const STORAGE_KEY = "homepilot:auth";

type AuthContextValue = {
  isLoggedIn: boolean;
  isSheetOpen: boolean;
  login: () => void;
  logout: () => void;
  openLoginSheet: () => void;
  closeLoginSheet: () => void;
  /** 로그인 상태가 아니면 로그인 시트를 띄우고 false를 반환한다. */
  requireLogin: () => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // 브라우저 전용 저장소라 마운트 시 1회만 동기화한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setIsLoggedIn(stored === "true");
    } catch {
      // 접근 실패 시 로그아웃 상태로 시작
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, String(isLoggedIn));
  }, [isLoggedIn, hydrated]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      isSheetOpen,
      login: () => {
        setIsLoggedIn(true);
        setIsSheetOpen(false);
        trackEvent("Mock Login");
      },
      logout: () => {
        setIsLoggedIn(false);
        trackEvent("Mock Logout");
      },
      openLoginSheet: () => setIsSheetOpen(true),
      closeLoginSheet: () => setIsSheetOpen(false),
      requireLogin: () => {
        if (isLoggedIn) return true;
        setIsSheetOpen(true);
        return false;
      },
    }),
    [isLoggedIn, isSheetOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
