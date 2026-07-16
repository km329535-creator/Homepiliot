export function getGoogleClientId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || undefined;
}

export function isGoogleConfigured(): boolean {
  return Boolean(getGoogleClientId());
}

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "small" | "medium" | "large";
      shape?: "rectangular" | "pill" | "circle" | "square";
      width?: number;
    }
  ) => void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

let scriptPromise: Promise<void> | null = null;

/** Google Identity Services 스크립트를 1회만 로드한다. */
export function loadGoogleScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/** JWT의 payload만 디코딩한다. 서명 검증은 하지 않으며, 실제 서비스에서는 서버에서 검증해야 한다. */
export function decodeGoogleCredential(
  credential: string
): { email?: string; name?: string } | null {
  try {
    const payload = credential.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export async function initGoogleButton(
  container: HTMLElement,
  onCredential: (profile: { email?: string; name?: string }) => void,
  options?: { width?: number; size?: "small" | "medium" | "large" }
): Promise<void> {
  const clientId = getGoogleClientId();
  if (!clientId) return;

  await loadGoogleScript();
  const accountsId = window.google?.accounts.id;
  if (!accountsId) return;

  accountsId.initialize({
    client_id: clientId,
    callback: (response) => {
      const profile = decodeGoogleCredential(response.credential);
      onCredential(profile ?? {});
    },
  });
  accountsId.renderButton(container, {
    type: "standard",
    theme: "outline",
    size: options?.size ?? "large",
    shape: "pill",
    width: options?.width ?? 320,
  });
}
