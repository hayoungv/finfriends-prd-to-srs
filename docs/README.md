# 문서 인덱스

FinFriends 문서는 질문별로 한 곳에서만 답하도록 분리합니다. 실행 우선순위와 충돌 판정은 [`../AGENTS.md`](../AGENTS.md) §3.1을 따릅니다.

## 문서 계층

| 경로 | 답하는 질문 | 주요 소비자 |
|---|---|---|
| [`01-prd/prd.md`](01-prd/prd.md) | 왜 만드는가 · 누구를 위한가 | 제품·기획 |
| [`02-srs/srs.md`](02-srs/srs.md) | 무엇을 만족해야 하는가 | 요구사항·검수 |
| [`03-tds/tds.md`](03-tds/tds.md) | 어떻게 설계하는가 | 아키텍처·개발 |
| [`00-plan/dag-roadmap.md`](00-plan/dag-roadmap.md) | 누가·언제·어떤 순서로 실행하는가 | 리드·오케스트레이터 |
| [`../tasks/`](../tasks/) | 어떤 단위로 구현·검증하는가 | 담당 에이전트 |

## 실행 계획 (`00-plan/`)

| 문서 | 용도 | 상태 |
|---|---|---|
| [`dag-roadmap.md`](00-plan/dag-roadmap.md) | 30개 태스크 DAG, 트랙, 웨이브, 게이트 | 기준 |
| [`prototype-suggestion.md`](00-plan/prototype-suggestion.md) | 프로토타입 범위·라우트·소유권 선별 | 실행 완료 |
| [`prototype-execution-plan.md`](00-plan/prototype-execution-plan.md) | P0~P3 프로토타입 실행 SSOT | 실행 완료 |
| [`prototype-review-log.md`](00-plan/prototype-review-log.md) | 검증 결과와 AZTKS 라운드 기록 | Round 4 GO |
| [`grill-ledger.md`](00-plan/grill-ledger.md) | UI/UX 결정과 근거 원장 | 결정 기록 |

## 목표 실행 기록 (`goals/`)

| 문서 | 용도 |
|---|---|
| [`prototype-node-aztks-gate.md`](goals/prototype-node-aztks-gate.md) | 프로토타입 목표 진입점과 실행 SSOT 링크 |
| [`prototype-node-aztks-gate_20260827T142413.md`](goals/prototype-node-aztks-gate_20260827T142413.md) | 2026-08-27 실행 시점의 목표 스냅샷 |

## 변경 규칙

- 요구사항은 PRD → SRS → TDS 순서로 갱신하고, 실행 순서는 `00-plan/`에 반영합니다.
- 구현 상세는 `tasks/step-N/TASK-XXX.md`에만 기록합니다.
- 같은 사실을 여러 문서에 복사하지 않습니다. 요약이 필요하면 원본 링크만 둡니다.
- 문서 파일명은 ASCII 소문자 kebab-case를 사용하고 버전은 문서 헤더에 기록합니다.
