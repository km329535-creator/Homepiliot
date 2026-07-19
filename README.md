# HomePilot

지역별 아파트 시세와 주변 데이터를 분석하여 실거주 및 구매 의사결정을 돕는 AI 부동산 플랫폼입니다. 자세한 기획 배경은 [PRD.md](./PRD.md)를 참고하세요.

## 핵심 기능

1. **AI 지역·아파트 검색** — 자연어 질의(`/` 홈 최상단 검색창, `/search`)에서 지역·예산·생활 조건을 해석해 조건에 맞는 아파트를 탐색합니다.
2. **AI 부동산 분석 리포트** (`/report/[id]`) — 실거래가 추이, 최근 시세 변화, 주변 단지 비교, 교통 접근성, 생활 인프라, 장점 및 고려사항을 요약합니다.
3. **관심 지역 저장 및 비교** (`/compare`) — 관심 아파트를 저장하고 평균 시세·가격 변동·교통·인프라·AI 종합 의견을 비교합니다.

## 현재 구현 상태 (프로토타입)

이 저장소는 PRD를 기반으로 한 프런트엔드 프로토타입입니다. 실제 서비스로 확장하려면 아래 항목을 실제 연동으로 교체해야 합니다.

| 영역 | 현재 상태 | 실제 연동 시 |
| --- | --- | --- |
| AI 자연어 검색 파싱 | `src/lib/query-parser.ts`의 정규식 기반 경량 파서 | OpenAI/Claude API 호출로 교체 |
| 아파트·시세 데이터 | `src/lib/mock-data.ts`의 목업 데이터 | 공공 부동산 API·실거래가 데이터 연동 |
| 지도 UI | `src/components/search/map-panel.tsx`의 위경도 비율 기반 placeholder | 카카오맵 또는 네이버 지도 SDK 연동 |
| 관심 목록 저장 | `src/lib/favorites-context.tsx`의 localStorage | Supabase DB + 로그인 연동 |
| 분석/비교 코멘트 | 규칙 기반 텍스트 생성 | OpenAI/Claude API 기반 요약·코멘트 생성 |
| 분석(Analytics) | 미연동 | PostHog, Google Analytics 4 |

필요한 환경 변수는 [`.env.example`](./.env.example)에 정리되어 있습니다. 실제 키 값은 `.env.local`에 넣고 커밋하지 마세요.

### Supabase 설정 (의견 보내기 저장)

1. [supabase.com](https://supabase.com)에서 무료 프로젝트를 생성합니다.
2. 프로젝트 설정 → API 메뉴에서 **Project URL**과 **Publishable key**를 복사해 `.env.local`에 넣습니다.
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```
3. Supabase SQL Editor에서 아래 스키마를 실행해 `feedback` 테이블을 만듭니다.
   ```sql
   create table public.feedback (
     id uuid primary key default gen_random_uuid(),
     message text not null,
     page_url text,
     created_at timestamptz not null default now()
   );

   alter table public.feedback enable row level security;

   create policy "Allow public insert"
     on public.feedback
     for insert
     to anon
     with check (true);
   ```
   위 정책은 익명 사용자의 **저장(insert)만** 허용하고 조회(select)는 막아, 다른 사람이 anon key로 남의 의견을 읽을 수 없게 합니다.
4. 환경 변수를 설정하지 않으면 "의견 보내기"는 저장 없이 Mixpanel 이벤트로만 기록되며, 제출 UX는 그대로 정상 동작합니다.

### Google 로그인 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트를 만들고 **API 및 서비스 → OAuth 동의 화면**을 구성합니다(외부, 테스트 단계로 시작 가능).
2. **사용자 인증 정보 → OAuth 클라이언트 ID 만들기**를 선택하고 애플리케이션 유형은 "웹 애플리케이션"으로 지정합니다.
3. **승인된 자바스크립트 원본**에 아래 두 URL을 등록합니다.
   ```
   http://localhost:3000
   https://homepiliot.vercel.app
   ```
4. 발급된 Client ID를 `.env.local`(및 Vercel 프로젝트 환경 변수)에 추가합니다.
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
   ```
5. 값이 없으면 "Google로 로그인" 버튼은 목업 로그인으로 동작하고, 값을 넣으면 자동으로 실제 Google 로그인으로 전환됩니다.

## 폴더 구조

```
src/
  app/
    page.tsx              # 홈 (최상단 히어로 검색)
    search/page.tsx        # AI 검색 결과 (리스트 + 지도)
    report/[id]/page.tsx    # AI 부동산 분석 리포트
    compare/page.tsx        # 관심 목록 및 비교
    layout.tsx / globals.css
  components/
    layout/                 # Navbar, Footer
    home/                   # 홈 히어로 검색
    search/                 # 검색 결과 리스트, 지도 패널, 검색창
    report/                 # 통계 카드, 실거래가 추이 차트, 저장 버튼
    compare/                # 비교 테이블
    ui/                     # Button, Card, Badge, ScoreDots 등 공용 컴포넌트
  lib/
    types.ts                # 도메인 타입
    mock-data.ts             # 목업 아파트/지역 데이터
    query-parser.ts           # 자연어 질의 파서 (AI 호출 자리 표시)
    favorites-context.tsx      # 관심 목록 상태 (localStorage)
    format.ts                  # 가격/변동률 포맷 유틸
```

## 기술 스택

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS v4
- **Backend**: Supabase (연동 예정)
- **AI**: OpenAI API 또는 Claude API (연동 예정)
- **Data**: 공공 부동산 API, 실거래가 데이터, 카카오/네이버 지도 API (연동 예정)
- **Deployment**: Vercel
- **Analytics**: PostHog, Google Analytics 4 (연동 예정)

## 디자인 방향

미니멀·모노톤 기반에 신뢰감 있는 컬러(딥 네이비 + 블루 accent)를 전체 톤으로 사용하고, SaaS 대시보드 스타일과 데이터 카드 중심 레이아웃, 넉넉한 여백으로 Apple·Linear 스타일의 절제된 인터페이스를 지향합니다.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## Deploy on Vercel

가장 쉬운 배포 방법은 Next.js 제작사인 [Vercel Platform](https://vercel.com/new)을 사용하는 것입니다. 자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.
