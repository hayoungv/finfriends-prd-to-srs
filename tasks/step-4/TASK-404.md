---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-404] [STEP-4] Web Push API 연동 및 3일 미접속 알림"
labels: ["enhancement", "ai-ready", "step-4", "notification", "pwa"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-404`
- **관련 SRS 요구사항:** `REQ-FUNC-012`, `REQ-NF-010`
- **단계 (Step):** Step 4 (NFR & Infra)
- **우선순위 (Priority):** Should-Have (P1)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
유료 SMS나 외부 알림톡 과금 없이 $0 비용으로 보호자에게 알림을 제공하기 위해, 브라우저 표준 Web Push API (VAPID)와 보호자 대시보드 인앱 알림 배너를 연동하여 72시간 미접속 넛지를 발송합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `lib/notification/web-push.ts`
- `[NEW]` `components/parent/InactivityBanner.tsx`
- `[NEW]` `public/sw.js` (Service Worker)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **VAPID Web Push 설정:**
   - 보호자 기기에서 푸시 권한 획득 시 PushSubscription DB 저장
   - 72시간 미접속 감지 시 Web Push 알림 발송 ("아이가 3일 동안 핀프렌즈에 오지 않았어요. 함께 나무를 확인해볼까요?")

2. **인앱 폴백 배너:**
   - 푸시 차단/미지원 브라우저의 경우 보호자 대시보드 상단에 부드러운 넛지 알림 배너 노출

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 72시간 동안 미접속한 아동의 보호자 계정으로 로그인했을 때
- **When:** 보호자 대시보드에 진입하면
- **Then:** 3일 미접속 넛지 배너가 상단에 노출되고 Web Push 발송 이력이 기록된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/notification.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-201`, `TASK-401`
- **후행 태스크 (Dependents):** General Release Gate 검증
