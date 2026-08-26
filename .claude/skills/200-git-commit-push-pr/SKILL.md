---
name: 200-git-commit-push-pr
description: 커밋·푸시·PR 생성 절차와 커밋 메시지 규약. 태스크 완료 후 사용.
---

# 커밋 · 푸시 · PR

## 0. 커밋 전 필수 검사

```bash
npx tsc --noEmit && npm run lint && npm run compliance
```
하나라도 실패하면 커밋하지 않는다.

## 1. 변경 검토

```bash
git status && git diff
```
서로 다른 목적의 변경이 섞여 있으면 **분리 커밋**한다.
의도하지 않은 파일(`.env`, 빌드 산출물, 타 트랙 소유 파일)이 섞였는지 확인한다.

## 2. 브랜치

```
feat/TASK-204-ledger-idempotency
fix/TASK-212-stall-boundary
test/TASK-301-ledger-unit
docs/roadmap-v2
```
`main` 직접 푸시 금지.

## 3. 커밋 메시지

```
<type>(<scope>): <요약> (TASK-XXX)

<본문 — 왜 이렇게 했는지. 무엇을 했는지는 diff 가 말한다.>
```

- type: `feat` `fix` `docs` `refactor` `test` `chore`
- scope: `ledger` `growth` `plan` `retro` `auth` `consent` `sandbox` `infra`
- **태스크 ID 를 반드시 넣는다.** 이슈·보드와 연결되는 유일한 키다.

예: `feat(ledger): 멱등 지급 엔진 및 잔액 잠금 구현 (TASK-204)`

## 4. PR

```bash
gh pr create --title "[TASK-204] 멱등성 보장형 별 원장 지급 엔진" --body "..."
```

본문에 반드시 포함:
- `Closes #8` — 이슈 자동 종료
- 명세의 **GWT 인수조건**과 각각을 검증한 테스트
- 실행한 `Verification Commands` 와 결과

## 5. 금지

- 사용자 확인 없는 `push --force` · `reset --hard` · `rebase` 후 강제 푸시
- `--no-verify` 로 훅 우회
- 검증 명령어를 실행하지 않은 채 "완료" 보고
