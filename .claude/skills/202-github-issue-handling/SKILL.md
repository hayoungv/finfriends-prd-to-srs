---
name: 202-github-issue-handling
description: GitHub 이슈·프로젝트 보드 기반 태스크 수행 절차. 이슈 착수부터 종료까지.
---

# 이슈 기반 태스크 수행

이 프로젝트의 30개 태스크는 전부 이슈로 발행되어 있고(`Issue Automation` 라벨), 보드에 실행 메타가 붙어 있다.

## 1. 이슈를 연다

```bash
gh issue view <번호>
```

본문의 **`🗺 실행 메타`** 표에서 확인할 것:
- **트랙** — 내가 편집해도 되는 파일 범위 (`.cursor/rules/005`)
- **웨이브 · ES→EF** — 지금 착수 가능한 시점인가
- **Slack** — `0.0 MD ★` 이면 지연이 곧 전체 지연이다
- **선행 (Blockers)** — 링크된 이슈가 전부 닫혀 있는가
- **릴리즈 게이트** — 어느 게이트에서 검증되는가

## 2. 명세를 정독한다

`tasks/step-*/TASK-XXX.md` 의 **Target Files** · **Implementation Requirements** · **Acceptance Criteria (GWT)** · **Verification Commands**.
이슈 본문은 명세의 사본이다. **원본 파일이 SSOT다.**

## 3. 선행이 미완이면

임의 구현하지 않는다. 총괄 문서 §3.5 **Stub-First 규약**을 따라 인터페이스만 합의하고 스텁으로 진행한다.
막히면 이슈에 코멘트로 남긴다 — 조용히 대기하지 않는다.

## 4. 상태 갱신

```bash
gh issue edit <번호> --add-assignee @me
```
보드 `Status` 를 `In Progress` 로 옮긴다. 완료 시 PR 의 `Closes #N` 으로 자동 종료된다.

## 5. 에스컬레이션

Slack 0 태스크가 지연될 조짐이면 **즉시** 이슈에 코멘트한다. 특히 `TASK-212` 는 3개 임계 체인이 수렴하는 노드다.

## 6. 새 이슈를 만들 때

`.github/ISSUE_TEMPLATE/feature_task.md` 를 쓴다. 프론트매터의 `title`·`labels` 규약을 지키고, 본문에 GWT 인수조건과 검증 명령어를 반드시 채운다 — 이것이 없으면 AI 에이전트가 착수할 수 없다.
