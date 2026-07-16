import type { Metadata } from "next";
import { Noto_Sans_KR, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MixpanelProvider from "@/components/analytics/mixpanel-provider";
import LoginSheet from "@/components/auth/login-sheet";
import { AuthProvider } from "@/lib/auth-context";
import { FavoritesProvider } from "@/lib/favorites-context";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <MixpanelProvider />
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <LoginSheet />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
