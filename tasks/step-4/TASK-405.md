---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-405] [STEP-4] 위치/얼굴 미수집 컴플라이언스 정적 검사 스크립트"
labels: ["enhancement", "ai-ready", "step-4", "compliance", "security", "ci"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-405`
- **관련 SRS 요구사항:** `REG-002`, `REG-006`, `REQ-NF-009`, `REQ-NF-010`
- **단계 (Step):** Step 4 (NFR & Infra)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
법적 규제 요건인 위치정보(GPS) 수집 0건(REG-002)과 아동 얼굴 사진 수집 0건(REG-006)을 기술적으로 보증하기 위해, 소스코드 정적 검사 스크립트를 작성하고 CI 파이프라인에서 자동 검증하도록 구축합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `scripts/verify-compliance.ts`
- `[MODIFY]` `package.json` (`scripts.compliance` 등록)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **정적 금지 키워드 스캐너 구현:**
   - 1) `navigator.geolocation`, `getCurrentPosition`, `watchPosition` 등 브라우저 GPS API 호출 탐지 시 에러 발생
   - 2) 이미지 파일 바이너리 업로드 엔드포인트(`multipart/form-data`, `multer`, `uploadthing` 등) 탐지 시 에러 발생
   - 3) Prisma 스키마 내 `latitude`, `longitude`, `profile_image_url` 컬럼 존재 시 에러 발생

2. **빌드 파이프라인 통합:**
   - `npm run compliance` 실행 시 위 3개 규칙 중 1건이라도 위반 시 `process.exit(1)`로 빌드 중단

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 정상 코드베이스에서
- **When:** `npm run compliance`를 실행하면
- **Then:** "규제 컴플라이언스 정적 검사 100% 통과 (위치 권한 0건, 얼굴 수집 0건)" 로그와 함께 정상 종료(exit 0)된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run compliance
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** Step 2 전체
- **후행 태스크 (Dependents):** General Release Gate 검증
