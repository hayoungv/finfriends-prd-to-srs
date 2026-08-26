# Skills Index

`.claude/skills/*/SKILL.md` 가 **원본**이다. Claude Code 가 이 경로를 스킬로 로드한다.
Cursor 용 파생본 `.cursor/skills/` 는 `bash scripts/sync-skills.sh` 로 생성한다 (직접 편집 금지).

## 100번대 — 프로세스
| 스킬 | 적용 시점 |
|---|---|
| `100-error-fixing-process` | 에러·테스트 실패 발생 시. 원인 규명 전 수정 금지 |

## 200번대 — 협업
| 스킬 | 적용 시점 |
|---|---|
| `200-git-commit-push-pr` | 태스크 완료 후 커밋·PR |
| `202-github-issue-handling` | 이슈 착수 ~ 종료. 보드 실행 메타 해석 |

## 300번대 — 기술 스택
| 스킬 | 적용 시점 |
|---|---|
| `300-nextjs-app-router-rules` | `app/` · `actions/` · `services/` 레이어 작업 |
| `301-prisma-supabase-rules` | `prisma/` 스키마·마이그레이션·커넥션 |
| `302-server-actions-zod-rules` | `actions/**` Server Action 작성 |
| **`303-star-ledger-idempotency-rules`** | **별 지급/차감 경로 — 필수** |
| `304-vercel-ai-gemini-fallback-rules` | `lib/ai/**` 회고 생성·Fallback |
| `305-testing-vitest-playwright-rules` | `tests/**` 전체 |
| `306-shadcn-dual-theme-rules` | `components/**` · UI |
| `307-compliance-static-scan-rules` | `scripts/verify-compliance.ts` · CI |
| `308-mock-partner-sandbox-rules` | `app/api/v1/sandbox/**` · `lib/sandbox/**` · `services/reconciliation.service.ts` |

---

## 외부 마켓플레이스 스킬 (선택 설치)

[skills.sh](https://www.skills.sh/) 에서 아래를 추가로 설치할 수 있다.

```bash
npx skills add prisma/skills          # prisma-postgres, prisma-client-api
npx skills add supabase/agent-skills  # supabase-postgres-best-practices
npx skills add vercel-labs/agent-skills  # vercel-react-best-practices, composition-patterns
npx skills add mattpocock/skills      # code-review, diagnosing-bugs, domain-modeling
npx skills add anthropics/skills      # webapp-testing
```

> ⚠️ 설치 전 확인 — 외부 스킬이 본 저장소의 [`AGENTS.md`](../../AGENTS.md) §4 절대 불변식과 충돌하면
> **로컬 규칙이 우선**한다. 특히 Prisma·Supabase 공식 스킬의 일반적인 CRUD 예제는
> 별 원장의 멱등성·트랜잭션 요구를 만족하지 않는다. `303` 스킬이 상위 규칙이다.
