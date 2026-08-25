---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-403] [STEP-4] Cold Start 완화 RSC 캐싱 및 Skeleton UI 적용"
labels: ["enhancement", "ai-ready", "step-4", "performance", "ui"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-403`
- **관련 SRS 요구사항:** `REQ-NF-001`, `REQ-NF-002`
- **단계 (Step):** Step 4 (NFR & Infra)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
Vercel Serverless 및 Supabase Free Tier 환경에서의 초기 Cold Start(최초 1.5~2.5초 지연) 체감 성능을 완화하기 위해, React Server Component (RSC) 스트리밍과 Suspense 기반 스켈레톤 UI를 전면 적용합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `app/child/tree/loading.tsx` (성장 나무 스켈레톤)
- `[NEW]` `app/parent/forest/loading.tsx` (월간 숲 스켈레톤)
- `[NEW]` `components/ui/skeleton.tsx` (shadcn/ui Skeleton 컴포넌트)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **Next.js `loading.tsx` 구현:**
   - 대시보드 진입 즉시 100ms 이내에 나무 형상 및 카운터 박스 스켈레톤 렌더링
   - 데이터 로드 완료 시 부드러운 Fade-in 트랜지션 적용

2. **RSC 데이터 프리페칭:**
   - 대시보드 탭 간 이동 시 Next.js `<Link prefetch={true}>`로 서버 컴포넌트 사전 캐싱

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** Serverless Cold Start 지연 상황에서
- **When:** 성장 나무 화면에 진입하면
- **Then:** 흰 화면(White Screen) 없이 즉시 완성도 높은 스켈레톤 UI가 렌더링된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run build
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-212`, `TASK-213`
- **후행 태스크 (Dependents):** Alpha/Beta Gate 검증
