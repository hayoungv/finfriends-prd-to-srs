---
description: 이슈 번호로 태스크 1사이클 수행 — 명세 로드 → 선행 확인 → 구현 → 검증 → PR
argument-hint: <이슈번호>
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# Task Start — #$ARGUMENTS

## 1. 이슈와 실행 메타 로드
```bash
gh issue view $ARGUMENTS
```
본문 `🗺 실행 메타`에서 **트랙 · 웨이브 · Slack · 선행(Blockers) · 게이트**를 읽는다.

## 2. 선행 확인
```bash
gh issue view <각 blocker 번호> --json state,title --jq '"\(.state)\t\(.title)"'
```
- 전부 `CLOSED` → 진행
- 미완이 있으면 **임의 구현하지 않는다.** `docs/00_PROJECT_DAG_ROADMAP.md` §3.5 Stub-First 규약을 따르고 이슈에 코멘트로 남긴다.

## 3. 명세 정독
`tasks/step-*/TASK-XXX.md` — **Target Files** · **Implementation Requirements** · **Acceptance Criteria (GWT)** · **Verification Commands**.
이슈 본문은 사본이다. **원본 파일이 SSOT다.**

## 4. 소유권 확인
`.cursor/rules/005-parallel-track-ownership.mdc` 에서 이 트랙의 배타 소유 파일을 확인한다.
`Target Files` 가 소유 범위를 벗어나면 **중단하고 보고**한다.
`package.json` · `prisma/schema.prisma` 가 필요하면 Track A 에 요청한다.

## 5. 브랜치 · 착수
```bash
git switch -c feat/TASK-XXX-<slug>
gh issue edit $ARGUMENTS --add-assignee @me
```

## 6. 구현
해당 트랙 서브에이전트에 위임한다 (`track-a-core-auth` / `track-b-ledger-practice` / `track-c-spending-ai` / `track-d-growth-infra`).
`.cursor/rules/004-regulatory-invariants.mdc` 의 6개 불변식을 위반하지 않는다.

## 7. 검증
명세 하단 **Verification Commands** 를 그대로 실행한다. 실패 시 자가 수정 후 재실행.
```bash
npx tsc --noEmit && npm run lint && npm run compliance
```

## 8. PR
```bash
gh pr create --title "[TASK-XXX] <명세 제목>" --body "$(cat <<'BODY'
## 구현 요약
- …

## 인수 조건 검증 (GWT)
- [x] 시나리오 1: … → `tests/unit/….test.ts`
- [x] 시나리오 2: … → …

## 실행한 검증 명령어
```
<명령어와 결과>
```

Closes #<이슈번호>
BODY
)"
```

## 9. 에스컬레이션
Slack `0.0 MD ★` 태스크가 지연될 조짐이면 **즉시** 이슈에 코멘트한다. 조용히 대기하지 않는다.
