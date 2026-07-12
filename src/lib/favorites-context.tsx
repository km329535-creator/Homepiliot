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
import { useAuth } from "./auth-context";

const STORAGE_KEY = "homepilot:favorites";

type FavoritesContextValue = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { requireLogin } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // localStorage는 서버에 없는 브라우저 전용 저장소라 마운트 시 1회만 동기화한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setFavoriteIds(JSON.parse(stored));
    } catch {
      // localStorage 접근 실패 시 빈 목록으로 시작
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds, hydrated]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (id) => favoriteIds.includes(id),
      toggleFavorite: (id) => {
        if (!requireLogin()) return;
        setFavoriteIds((prev) => {
          const isRemoving = prev.includes(id);
          trackEvent("Favorite Toggled", {
            apartment_id: id,
            action: isRemoving ? "remove" : "add",
          });
          return isRemoving ? prev.filter((f) => f !== id) : [...prev, id];
        });
      },
      removeFavorite: (id) =>
        setFavoriteIds((prev) => prev.filter((f) => f !== id)),
    }),
    [favoriteIds, requireLogin]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
