import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MixpanelProvider from "@/components/analytics/mixpanel-provider";
import LoginSheet from "@/components/auth/login-sheet";
import FeedbackModal from "@/components/feedback/feedback-modal";
import { AuthProvider } from "@/lib/auth-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { FeedbackProvider } from "@/lib/feedback-context";

export const metadata: Metadata = {
  title: "HomePilot | 우리 부부 신혼 로드맵",
  description:
    "5개 질문으로 우리 부부의 첫 집 준비도를 진단하고, 맞춤 금융·정책과 다음 단계를 안내받는 AI 로드맵 설계 서비스, HomePilot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {/* HomePilot Master Design System 6.1: 웹폰트 로딩만 사용, 폰트 파일은 번들하지 않는다. */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <MixpanelProvider />
        <AuthProvider>
          <FavoritesProvider>
            <FeedbackProvider>
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <LoginSheet />
              <FeedbackModal />
            </FeedbackProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
