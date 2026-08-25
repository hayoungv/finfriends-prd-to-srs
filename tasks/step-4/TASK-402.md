---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-402] [STEP-4] Gemini 429/Timeout Fallback 룰 엔진 연동"
labels: ["enhancement", "ai-ready", "step-4", "ai", "reliability"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-402`
- **관련 SRS 요구사항:** `REQ-NF-005`, `SRS §6.8`, `ADR-010`
- **단계 (Step):** Step 4 (NFR & Infra)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
Google Gemini Free Tier의 분당 호출 제한(15 RPM)이나 네트워크 타임아웃 상황에서도 사용자가 지연 없이 즉각적인 회고 피드백을 받을 수 있도록, 비복원 추출 룰 기반 Fallback 템플릿 엔진을 고도화하고 서킷 브레이커 패턴을 적용합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[MODIFY]` `lib/ai/gemini-client.ts`
- `[MODIFY]` `lib/ai/fallback-templates.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **템플릿 다양성 확보:**
   - 카테고리별(편의점, 문구, 간식 등) 및 결과별(계획 준수 vs 계획 초과) 각 5개 이상의 아동 친화적 템플릿 문장 구축
   - 동일 사용자에게 직전과 동일한 템플릿이 연속 노출되지 않도록 세션 기반 비복원 추출

2. **서킷 브레이커:**
   - 최근 3회 연속 Gemini 호출 실패 시 즉시 5분간 Fallback 모드로 전환하여 불필요한 API 대기 시간 배제

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** Gemini API Key가 잘못되었거나 429 에러를 모킹했을 때
- **When:** `generateAIRetro`를 호출하면
- **Then:** 50ms 이내에 자연스러운 한글 회고 템플릿이 반환되고 에러가 전파되지 않는다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/fallback-engine.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-211`
- **후행 태스크 (Dependents):** Beta Gate 검증
