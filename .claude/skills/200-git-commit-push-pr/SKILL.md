---
name: 200-git-commit-push-pr
description: 커밋·푸시·PR 생성 절차와 커밋 메시지 규약. 태스크 완료 후 또는 문서·하네스 변경 후 사용.
---

# 커밋 · 푸시 · PR

## 0. 먼저 어느 부류인지 정한다 (AGENTS.md §5)

| | **A. 태스크 구현** | **B. 문서·하네스 유지보수** |
|---|---|---|
| 대상 | `app/**` `actions/**` `services/**` `lib/**` `prisma/**` `tests/**` | `docs/**` `tasks/**` `AGENTS.md` `CLAUDE.md` `README.md` `.claude/**` `.cursor/**` `scripts/**` |
| 브랜치 | `feat/TASK-XXX-<slug>` **필수** | 없음 — `main` 직접 |
| 태스크 ID | 커밋 메시지에 **필수** | 없음 |
| PR | 필수 (`Closes #N`) | 없음 |
| 사용자 확인 | 푸시 전 확인 | **묻지 않고 커밋·푸시까지 진행** |

아래 1~4는 A 기준이다. **B는 §6을 따른다.**

## 0-1. 커밋 전 필수 검사 (A)

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

## 5. 금지 (양쪽 공통)

- 사용자 확인 없는 `push --force` · `reset --hard` · 추적 파일 대량 삭제
- `--no-verify` 로 훅 우회
- 검증 명령어를 실행하지 않은 채 "완료" 보고

---

## 6. B — 문서·하네스 유지보수 루프

브랜치도 PR도 만들지 않는다. **의미있는 작업 단위가 끝나면 확인을 묻지 말고 끝까지 진행한다.**
단위는 "하나의 논리적 변경이 검증까지 끝난 시점"이며 파일 하나 고칠 때마다가 아니다.

```bash
# 1. 게이트 — 하나라도 실패하면 고친 뒤에 푸시한다
bash scripts/sync-skills.sh --check      # 스킬 원본↔파생 드리프트
bash scripts/check-links.sh              # 상대 링크 무결성
#    + 해당 작업의 검증 명령어

# 2. 커밋 — 태스크 ID 없이
git add -A
git commit -m "docs: <무엇을>" -m "<왜 — 근거와 판단>"

# 3. 원격 반영
git fetch origin
git rebase origin/main    # 원격에 새 커밋이 있을 때만. force push 하지 않는다
git push origin main
```

**스킬을 고쳤다면** 원본은 `.claude/skills/` 다. 고친 뒤 `bash scripts/sync-skills.sh` 로
`.cursor/skills/` 파생본을 다시 만들고 커밋한다 (AGENTS.md §3.1).

**게이트가 실패하면 고친 뒤에 푸시한다.** 실패한 채로 푸시하지 않는다.
