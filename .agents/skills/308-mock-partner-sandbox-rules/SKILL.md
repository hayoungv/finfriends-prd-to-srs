---
name: 308-mock-partner-sandbox-rules
description: 내장형 Mock Partner Sandbox 및 3단계 대조(Reconciliation) 구현 규칙 (ADR-005, ADR-012, TDS §12/§13). app/api/v1/sandbox/**, lib/sandbox/**, services/reconciliation.service.ts 작업 시 사용.
---

# Mock Partner Sandbox & 3단계 대조 엔진 (ADR-005 · ADR-012 · TDS §12/§13)

## 전제 및 배경
FinFriends 는 실 결제망에 직접 연동하지 않고 **내장형 Mock Partner Sandbox (Route Handler)** 를 통해 결제 원장과 상호작용한다 (청구액 $0 제약 및 규제 리스크 격리).

---

## 1. Sandbox 아키텍처 (ADR-012)

```
[클라이언트 / 테스트]
        │ (결제 발생 시뮬레이션)
        ▼
app/api/v1/sandbox/payments (Route Handler)
        │
        ▼
lib/sandbox/simulator.ts (가상 결제 승인 / 취소 처리)
        │
        ▼
Mock Partner Ledger (DB 저장) ──▶ Webhook / Server Action ──▶ 3단계 대조 엔진
```

- **Sandbox 경로**: `app/api/v1/sandbox/**`
- **시뮬레이터 로직**: `lib/sandbox/simulator.ts`
- **외부 노출 금지**: 프로덕션 배포 시 Sandbox API 키 또는 관리자/테스트 모드 가드로 제어.

---

## 2. 3단계 대조 (Reconciliation) 엔진 규칙 (TDS §13.2)

결제 이벤트 수신 시 등록된 **사전 소비 계획 카드**와 아래 3단계를 순차 대조한다:

1. **시간창 대조 (Time Window)**:
   - 결제 시각이 계획 카드의 유효 기간(`planned_date` ± 유효 시간창) 내에 있는가?
2. **업종/카테고리 대조 (Category Match)**:
   - 결제 가맹점 업종 코드(`category_code`)가 계획된 업종과 일치하는가?
3. **금액 대조 (Amount Match)**:
   - 실제 결제 금액(`actual_amount`)이 계획 금액(`planned_amount`) 이하인가?

### 판정 매트릭스 (TDS §14.3)
| 조건 (시간창 내) | 결과 | 별 지급 여부 |
|---|---|---|
| 계획 금액 이하 + 업종 일치 (`planMet = true`) | 성공 회고 | **별 1개 즉시 지급** |
| 계획 금액 이하 + 업종 불일치 | 불일치 회고 | **별 1개 지급** (예산 준수 인정) |
| 계획 금액 초과 (`planMet = false`) | 격려 회고 | **별 지급 없음** (WPA 미산입) |

---

## 3. 멱등성 및 원장 보호

- Sandbox 결제 이벤트 수신 시 전달되는 `transaction_id` / `event_id` 를 기반으로 대조 결과 생성 시 `idempotencyKey` 를 반드시 부여한다.
- 동일 결제 건에 대해 중복 대조 및 중복 별 지급이 절대 발생하지 않도록 `services/ledger.service.ts`의 `grantStar`를 경유한다.

---

## 4. 검증

```bash
npm run test tests/unit/reconciliation.test.ts
npm run test tests/e2e/spending-loop.spec.ts
```
