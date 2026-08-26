# FinFriends MVP 30개 개발 태스크 인덱스 및 실행 가이드

> **AI 코딩 에이전트를 위한 단일 진실 공급원(SSOT) 태스크 명세 디렉토리**  
> 본 디렉토리는 [`docs/02-srs/srs.md`](../docs/02-srs/srs.md)에 기반하여 4단계 원칙에 따라 분할된 **30개 세부 GitHub Issue 태스크 명세서**를 포함합니다.

---

## 📁 이 디렉토리의 문서 역할 경계

같은 사실을 두 곳에 쓰지 않습니다. 각 파일이 소유한 속성은 아래가 전부입니다 ([`AGENTS.md`](../AGENTS.md) §3.1).

| 파일 | 소유 속성 | 여기서 찾지 말 것 |
|---|---|---|
| **`README.md`** (본 문서) | 30건 인덱스 · 명세 파일 링크 · 우선순위 | 구현 상세, 실행 순서 |
| [`task-list.md`](task-list.md) | 4단계 원칙 · 태스크별 설명 · 공수 · 선행 의존 · REQ 매핑 | 파일 경로, 검증 명령어 |
| [`parallel-gantt.md`](parallel-gantt.md) | 병렬 간트 · 동시 실행 보드 · 착수 신호등 | 태스크 내용 |
| **`step-N/TASK-XXX.md`** | **개별 태스크 SSOT** — Target Files · GWT 인수조건 · 검증 명령어 | 트랙 배정, 웨이브 |
| [`docs/00-plan/dag-roadmap.md`](../docs/00-plan/dag-roadmap.md) | 트랙 · 웨이브 · 임계경로 · 파일 소유권 · 게이트 | 요구사항 정의 원문 |

> ⚠️ 값이 충돌하면 **`step-N/TASK-XXX.md` → 로드맵 → 나머지** 순으로 신뢰합니다.
> 알려진 충돌 5건은 로드맵 §1.3에 전수 기록돼 있습니다.

---

## 🧭 개발 단계별 태스크 목록 (30 Tasks)

### 📌 Step 1: Contract & Data Layer (4 Tasks, 3.0 M/D)
| Task ID | 명세서 파일 | 작업 명칭 | 우선순위 |
|---|---|---|:---:|
| `TASK-101` | [`step-1/TASK-101.md`](step-1/TASK-101.md) | Prisma Schema 및 Supabase PostgreSQL 마이그레이션 정의 | P0 |
| `TASK-102` | [`step-1/TASK-102.md`](step-1/TASK-102.md) | 공통 TypeScript DTO 및 Zod 검증 스키마 정의 | P0 |
| `TASK-103` | [`step-1/TASK-103.md`](step-1/TASK-103.md) | 내장형 Mock Partner Sandbox Gateway 구현 (`/api/v1/sandbox`) | P0 |
| `TASK-104` | [`step-1/TASK-104.md`](step-1/TASK-104.md) | 학습 4주제 퀴즈 및 동물 아바타 Seed Data 구축 | P0 |

---

### 📌 Step 2: Logic & Mutation Layer (15 Tasks, 11.5 M/D)
| Task ID | 명세서 파일 | 작업 명칭 | 우선순위 |
|---|---|---|:---:|
| `TASK-201` | [`step-2/TASK-201.md`](step-2/TASK-201.md) | [Write] 보호자 5단계 온보딩 및 Mock KYC 인증 Server Action | P0 |
| `TASK-202` | [`step-2/TASK-202.md`](step-2/TASK-202.md) | [Write] 법정대리인 동의 처리 및 아동 프로필 생성 Server Action | P0 |
| `TASK-203` | [`step-2/TASK-203.md`](step-2/TASK-203.md) | [Guard] 미동의 아동 진입 원천 차단 Server Guard (REG-001) | P0 |
| `TASK-204` | [`step-2/TASK-204.md`](step-2/TASK-204.md) | [Write] 멱등성 보장형 별 원장 트랜잭션 지급 엔진 | P0 |
| `TASK-205` | [`step-2/TASK-205.md`](step-2/TASK-205.md) | [Read] 아동별 실시간 별 잔액 및 원장 이력 조회 Action | P0 |
| `TASK-206` | [`step-2/TASK-206.md`](step-2/TASK-206.md) | [Write] 퀴즈 채점 및 학습 완료 별 보상 Action | P0 |
| `TASK-207` | [`step-2/TASK-207.md`](step-2/TASK-207.md) | [Write] 미션 CRUD 및 아동 보고 / 보호자 승인 Action | P0 |
| `TASK-208` | [`step-2/TASK-208.md`](step-2/TASK-208.md) | [Write] 지연 소급 승인(Backfill) 및 일괄 승인 Action | P0 |
| `TASK-209` | [`step-2/TASK-209.md`](step-2/TASK-209.md) | [Write] 소비 계획 카드 생성 및 72h 만료 관리 Action | P0 |
| `TASK-210` | [`step-2/TASK-210.md`](step-2/TASK-210.md) | [Write] 결제 3단계 대조 알고리즘 Action | P0 |
| `TASK-211` | [`step-2/TASK-211.md`](step-2/TASK-211.md) | [Write] Vercel AI SDK + Gemini AI 회고 생성 파이프라인 | P0 |
| `TASK-212` | [`step-2/TASK-212.md`](step-2/TASK-212.md) | [Read/Write] 성장 나무 3조건 판정 및 14일 정체 평가 Action | P0 |
| `TASK-213` | [`step-2/TASK-213.md`](step-2/TASK-213.md) | [Read/Write] 월간 숲 7대 지표 스냅샷 생성 및 리포트 조회 Action | P0 |
| `TASK-214` | [`step-2/TASK-214.md`](step-2/TASK-214.md) | [Write] 아바타 별 옷장 아이템 구매 Action | P1 |
| `TASK-215` | [`step-2/TASK-215.md`](step-2/TASK-215.md) | [Write] 위시리스트 목표 등록 및 마일스톤 별 지급 Action | P1 |

---

### 📌 Step 3: Test & AC Layer (6 Tasks, 4.0 M/D)
| Task ID | 명세서 파일 | 작업 명칭 | 우선순위 |
|---|---|---|:---:|
| `TASK-301` | [`step-3/TASK-301.md`](step-3/TASK-301.md) | [Unit] 별 원장 멱등성 및 잔액 불변식 Vitest 단위 테스트 | P0 |
| `TASK-302` | [`step-3/TASK-302.md`](step-3/TASK-302.md) | [Unit] 성장 나무 3조건 및 정체 판정 Vitest 단위 테스트 | P0 |
| `TASK-303` | [`step-3/TASK-303.md`](step-3/TASK-303.md) | [Unit] 소비 계획 3단계 대조 및 판정 Vitest 단위 테스트 | P0 |
| `TASK-304` | [`step-3/TASK-304.md`](step-3/TASK-304.md) | [Integration] 미션 소급 정산 및 스냅샷 보정 통합 테스트 | P0 |
| `TASK-305` | [`step-3/TASK-305.md`](step-3/TASK-305.md) | [E2E] 동의 미완료 아동 차단 및 온보딩 Playwright E2E 테스트 | P0 |
| `TASK-306` | [`step-3/TASK-306.md`](step-3/TASK-306.md) | [E2E] Sandbox 결제 ➔ AI 회고 ➔ 별 지급 E2E 전체 여정 검증 | P0 |

---

### 📌 Step 4: NFR, Infra & Security Layer (5 Tasks, 2.5 M/D)
| Task ID | 명세서 파일 | 작업 명칭 | 우선순위 |
|---|---|---|:---:|
| `TASK-401` | [`step-4/TASK-401.md`](step-4/TASK-401.md) | Supabase pg_cron 야간 배치 구축 | P0 |
| `TASK-402` | [`step-4/TASK-402.md`](step-4/TASK-402.md) | Gemini 429/Timeout Fallback 룰 엔진 연동 | P0 |
| `TASK-403` | [`step-4/TASK-403.md`](step-4/TASK-403.md) | Cold Start 완화 RSC 캐싱 및 Skeleton UI 적용 | P0 |
| `TASK-404` | [`step-4/TASK-404.md`](step-4/TASK-404.md) | Web Push API 연동 및 3일 미접속 알림 | P1 |
| `TASK-405` | [`step-4/TASK-405.md`](step-4/TASK-405.md) | 위치/얼굴 미수집 컴플라이언스 정적 검사 스크립트 | P0 |

---

## 🚦 AI 에이전트 개발 실행 순서 (Execution Workflow)

1. **Step 1 완료 필수:** `TASK-101` ~ `TASK-104`를 먼저 구현하여 Prisma Schema와 DTO, Sandbox를 구축합니다.
2. **Step 2 순차 구현:** Auth/Consent ➔ Star Ledger ➔ Practice/Mission ➔ Spending/AI ➔ Growth 순서로 구현합니다.
3. **Step 3 테스트 검증:** Vitest 단위 테스트 및 Playwright E2E 테스트를 수행하여 모든 GWT 인수조건을 통과시킵니다.
4. **Step 4 최적화 및 보안:** pg_cron 스케줄, Gemini Fallback, Cold Start 완화, 컴플라이언스 정적 검사를 마감합니다.

> ⚠️ 위 4단계는 **단일 에이전트 직렬 실행(20.5 MD)** 기준의 개괄 순서입니다.
> **다중 에이전트 병렬 실행(임계경로 5.5 MD)** 시에는 총괄 문서의 아래 절을 그대로 따르십시오.
>
> | 필요한 것 | 참조 위치 |
> |---|---|
> | 내 트랙과 담당 태스크 | [§2.2 4개 병렬 에이전트 트랙](../docs/00-plan/dag-roadmap.md#22-4개-병렬-에이전트-트랙-정의) |
> | 내가 건드려도 되는 파일 | [§2.3 파일 소유권 맵](../docs/00-plan/dag-roadmap.md#23-파일-소유권-맵-병렬-충돌-방지) |
> | 지금 착수 가능한 태스크 | [§3.2 위상 정렬 웨이브](../docs/00-plan/dag-roadmap.md#32-위상-정렬-웨이브-wave-0--wave-6) · [§8 디스패치 매트릭스](../docs/00-plan/dag-roadmap.md#8-태스크-디스패치-매트릭스-30건-전수) |
> | 절대 늦추면 안 되는 태스크 | [§3.3 임계 경로 및 Slack](../docs/00-plan/dag-roadmap.md#33-임계-경로-cpm-및-여유-시간-분석) |
> | 선행 태스크가 아직 없을 때 | [§3.5 Stub-First 순환 해소 규약](../docs/00-plan/dag-roadmap.md#35-잠재-순환-의존-3건과-해소-규약-stub-first) |
> | 게이트 통과 명령어 | [§5.4 게이트 일괄 실행 번들](../docs/00-plan/dag-roadmap.md#54-게이트-일괄-실행-번들) |
