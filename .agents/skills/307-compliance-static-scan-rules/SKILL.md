---
name: 307-compliance-static-scan-rules
description: 규제 정적 검사 스크립트 작성·유지 규칙 (REG-002/005/006). scripts/verify-compliance.ts 및 CI 작업 시 사용.
---

# 컴플라이언스 정적 검사 (REG-002 · REG-005c · REG-006)

## 목적

규제 위반을 **코드 리뷰가 아니라 빌드 실패로** 막는다. 사람이 놓치는 것을 전제로 설계한다.

## 검사 대상

| 규제 | 금지 패턴 | 검사 범위 |
|---|---|---|
| REG-002 위치정보 | `geolocation` · `getCurrentPosition` · `watchPosition` · `latitude` · `longitude` | 소스 전체 + `prisma/schema.prisma` + `public/manifest.json` |
| REG-005c 별↔현금 | `convertStarToCash` · `starToBalance` · `withdrawStar` · `starToCash` · `redeemStarForCash` | 소스 전체 + 스키마 |
| REG-006 얼굴 이미지 | 이미지 업로드 엔드포인트 · `multipart/form-data` 핸들러 · `<input type="file" accept="image/*">` | `app/api/**` · `components/**` |

## 구현 원칙

```
scripts/verify-compliance.ts   →   npm run compliance   →   CI 필수 게이트
```

- 탐지 시 **exit code 1** 로 빌드를 실패시킨다. 경고로 끝내지 않는다.
- 탐지 결과는 `파일:줄:패턴` 형식으로 출력한다. 어디를 고쳐야 하는지 즉시 보여야 한다.
- `node_modules` · 빌드 산출물 · 본 스크립트 자신은 제외한다.
- **주석 안의 금지어도 탐지한다.** 주석으로 남겨두면 다음 사람이 되살린다.

## 예외 처리 금지

allowlist·`eslint-disable` 류의 우회 경로를 만들지 않는다.
정당한 사유가 있어 보이면 코드가 아니라 **설계를 바꾼다** — 위치가 필요해 보이면 사전 소비 계획 카드(ADR-003)로 푸는 문제다.

## CI 연동

```yaml
- run: npx tsc --noEmit
- run: npm run lint
- run: npm run compliance    # 실패 시 머지 차단
```

## 검증

```bash
npm run compliance
```
통과 기준: Geolocation **0건**, 얼굴 업로드 엔드포인트 **0건**, 전환 함수 **0건**.
