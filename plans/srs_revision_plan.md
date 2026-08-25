# [SRS 개정 계획서] 핀프렌즈 SRS v1.2 (MVP 기술 스택 맞춤 개정)

- **문서 ID:** PLAN-FINFRIENDS-SRS-V1.2
- **작성일:** 2026-08-25
- **담당자:** 리드 PM & 솔루션 아키텍트
- **목적:** Next.js 단일 풀스택, Prisma + Supabase PG, Tailwind CSS + shadcn/ui, Vercel AI SDK + Google Gemini, Vercel 무료 인프라 스택에 맞춘 SRS v1.2 개정

---

## 1. 개정 배경 및 방향성

### 1.1 배경
기존 SRS v1.1은 엔터프라이즈 및 MSA/독립 백엔드 서버(Spring Boot, 별도 API Gateway, 실제 선불카드 제휴사 망, 유료 KYC/SMS 등)를 전제로 작성되어 있었다.
이를 현실적이고 빠른 출시가 가능한 **AI-Native MVP 기술 스택**으로 완전히 동기화한다.

### 1.2 핵심 원칙
1. **사용자 경험 및 핵심 가치 100% 보존:** 만 8~9세 아동의 금융 실천 기록 및 보호자 증거 제공(성장 나무, 월간 숲, WPA) 로직 완전 유지.
2. **AI-Native UX 강화:** Vercel AI SDK + Gemini API를 통해 아동 친화적 맞춤형 회고 피드백 및 퀴즈 생성 경험 강화.
3. **완전 무료 인프라 자립화:** Vercel Hobby + Supabase Free + Gemini Free Tier 환경에서 동작 가능한 완화(Mitigation) 전략 적용 (Mock Sandbox, Supabase pg_cron, Lazy Evaluation, Fallback 룰 엔진 등).
4. **표준 및 추적성 유지:** ISO/IEC/IEEE 29148:2018 표준 체계 및 REQ ↔ Diagram ↔ Schema ↔ Route ↔ Test 추적성 매트릭스 100% 유지.

---

## 2. 주요 변경 및 보강 상세 계획

### 2.1 아키텍처 및 시스템 맥락 개정
- **Context Diagram & Component Diagram (§4, §7.3):**
  - 독립 Client/Server/GW 구조를 **Next.js (App Router, Server Actions, Route Handlers)** 단일 풀스택으로 통합.
  - 외부 제휴사(선불/결제) 및 KYC를 앱 내 내장형 **Mock Sandbox Simulator**로 명시.
  - AI 통합 파이프라인(Vercel AI SDK + Google Gemini 1.5/Flash API) 명시.

### 2.2 시퀀스 다이어그램 업데이트 (§6.1 ~ §6.12)
- 모든 시퀀스 다이어그램을 `Client Component -> Next.js Server Action / Route Handler -> Prisma Client -> Supabase PostgreSQL`의 간결하고 현실적인 호출 흐름으로 전환.
- `REQ-FUNC-008 (계획↔실제 대조 및 회고)` 시퀀스에 AI 피드백 생성 및 장애 시 룰 기반 Fallback 흐름 명시.

### 2.3 데이터 모델 및 스키마 (§10)
- 논리 데이터 모델을 **Prisma ORM (`schema.prisma`) 모델**과 1:1 매핑되도록 타입 및 인덱스, 릴레이션 정의 고도화.
- 불변식, 멱등성 키(idempotencyKey) 유니크 제약, JSON 필드 명세 유지.

### 2.4 인터페이스 명세 (§11)
- REST API 엔드포인트를 Next.js App Router의 `Route Handlers` (`/app/api/.../route.ts`) 및 `Server Actions` 매핑으로 갱신.
- Mock 결제/충전 시뮬레이션용 Sandbox Route Handler 추가 (`/api/v1/sandbox/...`).

### 2.5 비기능 요구사항 및 배치 완화 (§9, §19)
- **REQ-NF-001~003 (응답 속도):** Serverless Cold Start 특성을 반영하여 Warm 상태 p95 ≤ 800ms, Cold Start 최초 2s 이내 및 Skeleton UI 제공으로 현실화.
- **REQ-NF-021 (인프라 비용):** 월 0원 (Vercel Free + Supabase Free + Gemini Free) 완벽 자립 달성.
- **스케줄러 (§19):** 상시 데몬 대신 Supabase `pg_cron` (일 1회 정체/미접속 플래그 배치) + 사용자 접근 시 지연 평가(Lazy Evaluation) 하이브리드 모델 정의.
- **AI Rate Limit 완화:** Gemini API 429/오류 시 즉각 결정론적 룰 기반 비복원 추출 템플릿으로 Fallback.

### 2.6 아키텍처 결정 기록(ADR) 신규 추가 (§23)
- `ADR-009`: Next.js App Router 기반 단일 풀스택 및 Server Actions 채택
- `ADR-010`: Vercel AI SDK + Google Gemini 기반 AI 피드백 및 결정론적 Fallback 엔진
- `ADR-011`: Supabase pg_cron과 Lazy Evaluation을 통한 무비용 하이브리드 배치
- `ADR-012`: Mock Partner Sandbox를 통한 결제/선불망 격리 시뮬레이션
- `ADR-013`: Tailwind CSS + shadcn/ui 기반 아동/보호자 듀얼 테마 디자인 시스템

---

## 3. 작성 대상 파일
- 산출물: `SRS_문서_핀프렌즈_v1.2.md`
- 표준 준수: ISO/IEC/IEEE 29148:2018
- 검토 항목: PRD v1.0 연계, 기능 요구사항 18건, 규제 요구사항 9건, 비기능 요구사항 24건, 추적성 매트릭스 전체
