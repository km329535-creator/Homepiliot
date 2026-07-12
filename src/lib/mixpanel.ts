import mixpanel from "mixpanel-browser";

let initialized = false;

export function initMixpanel() {
  if (initialized || typeof window === "undefined") return;

  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) {
    console.warn(
      "NEXT_PUBLIC_MIXPANEL_TOKEN이 설정되지 않아 Mixpanel을 초기화하지 않습니다."
    );
    return;
  }

  mixpanel.init(token, {
    persistence: "localStorage",
    track_pageview: false, // Next.js 라우트 전환은 직접 추적한다.
    ignore_dnt: true,
  });
  initialized = true;
}

export function trackPageview(path: string) {
  if (typeof window === "undefined" || !initialized) return;
  mixpanel.track("Page View", { path });
}

export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined" || !initialized) return;
  mixpanel.track(name, props);
}
