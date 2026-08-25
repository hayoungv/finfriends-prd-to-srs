---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-104] [STEP-1] 학습 4주제 퀴즈 및 동물 아바타 Seed Data 구축"
labels: ["enhancement", "ai-ready", "step-1", "seed"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-104`
- **관련 SRS 요구사항:** `REQ-FUNC-003`, `REQ-FUNC-006`, `ADR-006`
- **단계 (Step):** Step 1 (Contract & Data)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
초기 서비스 구동 시 아동이 바로 학습하고 풀 수 있는 4대 금융 주제(벌기, 쓰기, 모으기, 불리기) 인터랙티브 퀴즈 콘텐츠와 아바타 2종 및 기본 의상 4종 메타데이터를 Prisma Seed 스크립트로 구축합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `prisma/seed.ts` (Prisma Database Seeder)
- `[NEW]` `data/curriculum.json` (4대 주제 및 퀴즈 정적 데이터)
- `[NEW]` `data/wardrobe_items.json` (아바타 및 의상 메타데이터)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **금융 4대 주제 및 퀴즈 구성 (`data/curriculum.json`):**
   - **Topic 1 (벌기):** 돈은 어떻게 생길까요? / 근로와 가치 (객관식 퀴즈 3문항)
   - **Topic 2 (쓰기):** 꼭 필요한 것 vs 사고 싶은 것 / 계획 소비 (객관식 퀴즈 3문항)
   - **Topic 3 (모으기):** 티끌 모아 태산 / 저축의 기쁨 (객관식 퀴즈 3문항)
   - **Topic 4 (불리기):** 은행과 이자 이야기 (학습/퀴즈만 제공, 실천 잠금 - ADR-006)

2. **동물 아바타 & 별 옷장 데이터 (`data/wardrobe_items.json`):**
   - **아바타 2종:** 토끼(Rabbit), 다람쥐(Squirrel)
   - **의상 4종:**
     - 1. 병아리 모자 (필요 별: 1개 - 온보딩용)
     - 2. 스트라이프 티셔츠 (필요 별: 3개)
     - 3. 탐험가 망토 (필요 별: 5개)
     - 4. 반짝이는 왕관 (필요 별: 10개)

3. **Seeder 실행 설정:**
   - `package.json` 내 `prisma.seed = "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"` 등록

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: Prisma db seed 정상 완료**
  - **Given:** Prisma 스키마 마이그레이션이 완료된 DB에서
  - **When:** `npx prisma db seed`를 실행하면
  - **Then:** 4개 학습 토픽과 12개 퀴즈 문항, 4개 의상 아이템이 DB에 정상 삽입되고 성공 로그가 출력된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
# DB Seed 실행
npx prisma db seed
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-101`
- **후행 태스크 (Dependents):** `TASK-206`, `TASK-214`
