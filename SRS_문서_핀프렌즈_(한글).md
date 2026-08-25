# [SRS 문서] 핀프렌즈(FinFriends) (한글)

# [SRS 문서] FinFriends

# 소프트웨어 요구사항 명세서 (SRS)

**문서 ID:** SRS-FINFRIENDS-MVP-001

**개정 버전:** 1.0

**날짜:** 2026-08-25

**표준:** ISO/IEC/IEEE 29148:2018

**입력 문서:** `finfriends-prd-v1_0.md` (PRD v1.0 · 2026-08-25 확정판)

---

> **문서 구성 안내**
> 본 SRS는 **1~7장을 사내 SRS 표준 양식**(`SRS_문서_AD-Core-Platform`)에 맞춰 작성했다.
> PRD v1.0에 이미 작성돼 있으나 해당 양식에 대응 절이 없는 내용은 **버리지 않고**, ISO/IEC/IEEE 29148:2018의 SRS 콘텐츠 규정(§9.6)에 따라 **8~12장을 추가 개설**해 담았다. **추가 챕터는 PRD에 이미 작성된 내용만을 담으며, 새 요구사항을 창작하지 않는다.**

| 장 | 구분 | 근거 |
| --- | --- | --- |
| 1 ~ 7 | 사내 SRS 표준 양식 | — |
| 4.3 규제 요구사항 | 확장 절 | 29148 §9.6.17 Standards compliance |
| 6.5 인앱 이벤트 명세 | 확장 절 | 29148 §9.6.11 External interfaces |
| 6.6 모니터링 및 대응 SLA | 확장 절 | 29148 §9.6.18 Software system attributes |
| **8. 성과 측정 요구사항** | **추가 챕터** | 29148 §6.3.3.3 (measures of effectiveness) · §6.6.3 Measurement for requirements |
| **9. 사용자 스토리 및 인수 기준** | **추가 챕터** | 29148 §9.6.5 Product functions · §9.6.6 User characteristics |
| **10. 가정 · 의존성 · 제약 · 리스크** | **추가 챕터** | 29148 §9.6.8 Assumptions and dependencies · §9.6.7 Limitations · §5.2.8 (Risk 속성) |
| **11. 설계 결정 근거 (ADR)** | **추가 챕터** | 29148 §5.2.8 (Rationale 속성) · §9.6.16 Design constraints |
| **12. 검증 및 확인 (V&V)** | **추가 챕터** | 29148 §9.6.19 Verification · §6.5.3 Validation · §9.6.9 Apportioning of requirements |

---

## 1. 서론

### 1.1 목적

본 문서는 ISO/IEC/IEEE 29148:2018 표준에 따라, **만 8~9세 아동의 금융 행동 실천을 기록하고 그 변화를 보호자에게 증거로 제시하는 폐쇄형 선불카드 기반 금융교육 플랫폼**의 요구사항을 정의한다.

본 시스템은 두 개의 가치 선언을 구현한다.

- **선언 ①** — 자녀가 금융을 학습하고 **금융 행동을 실천하며 성장**한다 *(아이 · 실천 계층)*
- **선언 ②** — 얼마나 배웠는지가 아니라 **금융 행동이 어떻게 달라졌는지**를 한 눈에 보여준다 *(보호자 · 증거 계층)*

**선언 ①이 선언 ②의 전제**다. 아이가 실천하지 않으면 보호자 화면은 비어 있는 것이 정상 동작이며, 시스템은 그 빈 화면이 결함으로 오인되지 않도록 명시적 안내를 표시해야 한다.

### 1.2 범위

**포함 범위 (In Scope)**

- 앱으로 충전된 용돈의 흐름 — **벌기 · 잘 쓰기 · 모으기 3영역 개통**, **불리기는 학습만 개통**
- 금융 학습 커리큘럼 **4주제 + 퀴즈** (4/4 전부 금융 과목)
- **실천 판정 3종** — 미션 승인 · 소비 회고 · 위시리스트 달성
- **소비 계획 카드 작성** (어디서 · 업종 · 얼마까지 · 무엇을) 및 **계획↔실제 업종별 대조**
- **별(⭐) 원장** — 트리거 8종 · 차감형 · 주기 초기화 없음
- **성장 나무** (4영역 · 실천 근거 노출 · 정체 원인 표시) 및 **월간 숲** (전월 대비 델타)
- **아바타 · 옷장** (사전 제작 3D · 5종 × 8벌)
- **보호자 온보딩 5단계 + 법정대리인 동의 게이트**
- **승인 지연 시 별 소급 지급** 및 **3일 미접속 알림**
- 소비 내역 (전월 대비 증감 · 업종별 집계)
- 제휴사(선불업 등록 보유) 위탁 방식의 **선불전자지급수단 연동**

**제외 범위 (Out of Scope)**

| 구분 | 항목 | 사유 |
| --- | --- | --- |
| **영구 제외** | 앱 외부 현금(세뱃돈·친척 용돈) · 친구 기능 · 모의투자 · 미션 사진 인증 · **위치정보 수집 일체** | 기능정의 v13 §11 · ADR-003 |
| **채택하지 않음** | 📍 위치 기반 자동 알림 · 🚦 소비 순간 자동 개입 트리거 | **ADR-003** — 사전 개입을 계획 카드로 구현한다. 로드맵에도 두지 않는다 |
| **차기 릴리즈** | 예적금 실천(REQ-FUNC-015) · 카드 없는 체험(REQ-FUNC-016) · 별의 옷장 외 목적지(REQ-FUNC-017) | 법률 검토·정책 재검토 선행 |
| **보류** | 기존 앱 기록 이전(REQ-FUNC-018) | 타사 데이터 반출 경로 부재 |

**본 릴리즈가 다루지 않는 사용자 문제** *(29148 §9.6.7 Limitations)* — 10장 참조.

### 1.3 정의, 약어, 축약어

| 용어 | 정의 |
| --- | --- |
| WPA | Weekly Practiced Active — 주간 실천 인정 아동 비율. **북극성 KPI** |
| 실천 트리거 | 별 지급 트리거 8종 중 **실천 경로 3종**(4 미션 승인 · 5 소비 회고 · 6 위시리스트). WPA 분자에 산입 |
| 학습 경로 | 별 지급 트리거 중 **1 온보딩 학습 · 2 출석체크 · 3 퀴즈 정답**. 별은 지급하되 **WPA 분자에서 제외** |
| 성장 나무 | 보호자 화면 · **이번 주기 성취**를 4영역으로 표시. 주기마다 초기화 |
| 월간 숲 | 보호자 화면 · **장기 누적 성장 증거**. 초기화 없음, 전월 대비 델타를 표시 |
| 별 (⭐) | 아이 화면 · **즉각 보상**. 차감형이며 주기 초기화 없음. 현금 전환 경로 없음 |
| 3층 구조 | 별(양) / 나무(이번 주기 질) / 숲(누적 질)을 분리한 보상 구조. **ADR-002** |
| 계획 카드 | 소비 **전에** 아이 또는 보호자가 적는 기록 — 장소 · 업종 · 금액 상한 · 품목(선택) |
| 계획↔실제 대조 | 카드 승인 내역의 업종·금액을 계획 카드와 겹쳐 제시하고 두 갈래로 판정하는 기능 |
| 두 갈래 판정 | 실제 ≤ 계획 → 별 1개 지급(갈래 A) / 실제 > 계획 → 회고만 제시, 별 미지급·미차감(갈래 B) |
| 소급 지급 | 보호자 승인이 지연돼도 **아이의 완료 시점 기준**으로 별을 지급하는 규칙 |
| 주기(cycle) | 성장 나무의 초기화 단위. 벌기·잘쓰기·모으기는 매월, 불리기는 적금 만기 주기 |
| 정체(stall) | 특정 영역이 **주기 시작 후 14일 이상 미상승**한 상태. 그 이전은 정체로 판정하지 않음 |
| 회고 문장 풀 | 소비 회고 화면에 제시하는 문장 집합. **비복원 추출**으로 동일 문장 재노출을 억제 |
| 선불업 B안 | 선불전자지급수단 발행·관리를 **제휴사에 위탁**하는 구조. **ADR-005** |
| 규제 상수 | 설계 변수가 아닌 고정 제약. `P-nn` · `F-01`로 식별 (4.3절) |
| 3구간 판정 | 모든 KPI·인수 기준·실험에 공통 적용하는 **PASS / HOLD / FAIL** 판정 규칙 |
| `k/8` 정수 판정 | n=8 인터뷰 지표는 비율이 아니라 **정수 분수**로 판정한다는 규칙 |
| Cohen's κ | 코더 2인의 판정 일치도 계수. **0.6 이상**을 요구 |
| AC / AC-E | Acceptance Criteria — 인수 기준 / **AC-E** = 예외·실패 케이스 인수 기준 |
| ADR | Architecture Decision Record — 제품 구조 설계 결정 기록 (11장) |
| MoSCoW | 요구사항 우선순위 4단계 — Must / Should / Could / Won't Have |
| SLO | Service Level Objective — 서비스 수준 목표 |
| p95 | 95번째 백분위 — 100회 중 95회는 이 값 이내 |

---

## 2. 이해관계자

| 역할 | 이름 / 부서 | 책임 |
| --- | --- | --- |
| 제품기획 (PM) | 유림 / 제품기획팀 | 요구사항 정의 및 우선순위 결정 · **ADR 승인** · KPI 게이트 판정 |
| 정책·법령 담당 | 병윤 / 정책·법령팀 | **규제 요구사항(4.3) 검증** · 법률 검토(예적금 중개업 해당 여부) · 규제 알림 대응 |
| 경쟁·리뷰 담당 | 하영 / 경쟁·리뷰팀 | 대안 대비 벤치마크 분기 재점검(E11) · **대외 표현 정확성 검수** |
| 서비스분석 담당 | 혜원 / 서비스분석팀 | **KPI 산출 및 기준선 실측** · 실험 설계와 3구간 판정 · rubric 코딩 |
| 개발팀 리드 | 개발팀 리드 | 설계 검토 및 승인 · 스프린트 배분(12.3) · SLO 재검토 판단 |
| 개발 엔지니어 | 백엔드 / 앱 개발자 | 구현 및 단위 테스트 · 멱등성·정합성 보장 |
| 개발 온콜 | 개발팀 | **규제·정합성·보안 알림 1차 대응** (30분 내 확인) |
| QA 담당 | 품질관리팀 | 인수 기준 검증 · 화면 검수 · 릴리즈 게이트 확인 |
| 콘텐츠 담당 | 콘텐츠팀 | 학습 4주제 원고 · **회고 문장 풀 제작 및 확장** · 아동용 고지 문구 |
| 사업 담당 | 사업팀 | **제휴 계약 조건 · 수수료율 · 원가 관리** · 손익 조건 판정 |
| 시스템 운영자 | 운영팀 | 배포 및 모니터링 · 가용성 프로브 운영 |
| 제휴사 (선불업 등록 보유) | 외부 파트너 | 선불전자지급수단 발행·관리 · 충전금 별도관리 · 카드 발행 · **결제 원장 및 업종 코드 제공** |
| 법정대리인 (보호자) | 외부 사용자 | 법정대리인 동의 · 충전 · 미션 승인 · 성장 확인 |
| 아동 사용자 | 외부 사용자 | 학습 · 실천 · 소비 · 회고 |

---

## 3. 시스템 맥락 및 인터페이스

- **클라이언트 애플리케이션**
    1. 보호자 앱 (iOS / Android) — 온보딩·동의·충전·승인·성장 나무·월간 숲·소비 내역
    2. 아이 앱 (iOS / Android) — 학습·퀴즈·미션·계획 카드·회고·아바타·옷장
    - 🔴 **아이 계정은 보호자 계정에 종속**된다. 독립 로그인·외부 공유·친구 기능이 없다
    - 🔴 **법정대리인 동의 완료 전에는 아이 앱 진입이 차단**된다 (REQ-REG-001)
- **내부 서비스**
    - Account & Consent Service : 보호자·아동 계정, **법정대리인 동의 게이트**, 온보딩 단계 저장
    - Learning Service : 학습 커리큘럼 4주제, 퀴즈 채점, 아이 온보딩 루프
    - Practice Service : 미션 루프, 실천 판정, **승인 지연 소급 처리**
    - Star Ledger Service : 별 지급·차감, **이중 기입 원장**, 멱등성 보장
    - Growth Tree Service : 나무 상태·승급 조건·정체 판정, **월간 숲 스냅샷**
    - Spending Plan Service : 계획 카드, **계획↔실제 대조**, 회고 문장 배정, 소비 내역 집계
    - Avatar & Wishlist Service : 아바타·옷장 구매, 위시리스트 진척
    - Notification Service : 3일 미접속 알림, 발송 채널 폴백(푸시 → 배너 → 문자)
    - Partner Gateway : 제휴사 API 연동(충전·결제내역·해지환불·카드발급)
    - Analytics Service : 인앱 이벤트 10종 수집, **KPI 집계 배치**(WPA 주간 D+1)
- **외부 시스템**
    - 제휴사 선불업 플랫폼 (선불전자지급수단 발행 · 카드 발행 · 가맹점망 · 결제 원장)
    - 본인인증 서비스 (보호자 가입 시 1회)
    - 푸시 알림 채널 · SMS 채널 (미접속 알림 폴백 경로)

> **경계 원칙 (ADR-005)** — 브랜드·앱·학습/실천 시스템·성장 나무·월간 숲·별 원장·실천 판정은 **핀프렌즈**가, 선불전자지급수단 발행·충전금 별도관리·카드 발행·가맹점망은 **제휴사**가 담당한다. 이용한도·업종 제한은 **제휴사 정책에 종속**되며 본 시스템이 정할 수 없다(REQ-REG-008).
> **위치정보 경계** — 본 시스템은 위치 권한을 **선언하지 않고**, 좌표를 수집·저장·전송하지 않는다(REQ-REG-002).

---
## 4. 구체적 요구사항

### 4.1 기능 요구사항

| ID | 제목 | 출처 | 우선순위 | 유형 | 검증 방식 | 인수 기준 | 상태 | 담당자 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **REQ-FUNC-001** | 보호자 온보딩 5단계 및 법정대리인 동의 게이트 | PRD §4-1 F7 · US-8 | Must Have | Functional | 1) 동의 게이트 차단 테스트<br>2) 온보딩 재개 테스트<br>3) 외부 API 실패 복구 테스트 | 가입→본인인증→**동의**→계좌연결→카드신청→자녀초대→카드등록 순서를 강제해야 한다. 세션 분할 시 **직전 완료 단계에서 재개**되고 **재입력 항목 0건**이어야 한다. 총 소요 **중위 ≤ 10분** · 3단계 이탈률 **≤ 30%**. 동의 단계는 캐시하지 않고 재로그인 시 **재확인**해야 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-002** | 별 지급 엔진 (트리거 8종 · 차감형 · 초기화 없음) | PRD §4-1 F4 · 부록 C · ADR-008 | Must Have | Functional | 1) 트리거별 지급 단위 테스트<br>2) 멱등성 중복 지급 테스트<br>3) 원장 이중 기입 정합성 검증 | 트리거 8종(자동 7 · 수동 1)에 따라 별을 지급해야 한다. **출석체크(트리거 2)는 조건 없이 지급**한다. 동일 미션 2회 승인 시 **별은 1회만 지급**되고 원장 불일치 **0건**이어야 한다. 별 잔액은 **주기 초기화되지 않으며**, 현금 전환·양도 경로가 **코드에 존재하지 않아야** 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-003** | 학습 커리큘럼 4주제 및 퀴즈 | PRD §4-1 F3 · ADR-006 | Must Have | Functional | 1) 주제 커버리지 검증<br>2) 퀴즈 채점 단위 테스트<br>3) 화면 문구 검수 | 벌기·잘쓰기·모으기·불리기 **4주제 전부 금융 과목**이어야 한다(4/4 = 100%). 각 주제는 학습 완주 여부와 퀴즈 정답 수를 기록해야 한다. **「불리기」는 학습·퀴즈만 개통**하고 실천 트리거를 잠그며, 화면에 **"곧 열려요"** 를 표시해야 한다 | Approved | 콘텐츠 담당 |
| **REQ-FUNC-004** | 미션 루프 (조건·금액 사전 설정 → 보호자 승인 → 별 1개) | PRD §4-1 F2 · US-6 | Must Have | Functional | 1) 미션 CRUD 테스트<br>2) 승인·거절 상태 전이 테스트<br>3) QA 검증 | 보호자가 **조건과 금액을 사전 설정**하고, 아이 완료 후 보호자 승인 시 **별 1개**를 지급해야 한다. 거절 시 **별 미지급**이며 아이 화면에 **「승인되지 않음 + 사유」** 가 표시되고 **「미실천」과 시각적으로 구별**돼야 한다. 거절 건은 실천 카운트에 **가산되지 않아야** 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-005** | 성장 나무 (4영역 · 실천 근거 기본 노출 · 정체 원인 표시) | PRD §4-1 F1 · US-1 · US-2 · US-3 · ADR-002 | Must Have | Functional | 1) 승급 조건 단위 테스트<br>2) 정체 판정 오탐 테스트<br>3) 5초 노출 회상 테스트<br>4) 화면 검수 | 승급 조건은 **학습 3회 + 퀴즈 5개 + 실천 1회 이상**이며 **실천 0건이면 승급하지 않아야** 한다. 미충족 조건은 **조건별로 각각 표시**하고 **「가장 적게 남은 조건」을 최상단**에 둔다. 정체 판정은 **주기 시작 후 14일 경과분에만** 적용하며 **오탐 0건**이어야 한다. 실천 기록 0건 계정에는 **"아직 기록이 없어요 + 첫 실천 안내"** 를 표시해야 한다. 5초 노출 후 변화 1문장 회상 **≥ 6/8** | Approved | 개발 엔지니어 |
| **REQ-FUNC-006** | 아바타 및 옷장 (사전 제작 3D · 5종 × 8벌) | PRD §4-1 F5 · ADR-007 | Must Have | Functional | 1) 구매 차감 단위 테스트<br>2) 에셋 조합 렌더 검증<br>3) QA 검증 | 동물 **5종 × 옷 8벌 = 40조합**을 제공해야 한다(1차 납품 2종 × 4벌). 옷 구매 시 **별을 차감**하되 잔액 미만이면 구매를 차단해야 한다. 여러 달에 걸쳐 모은 별로 구매할 수 있어야 한다(주기 초기화 없음) | Approved | 개발 엔지니어 |
| **REQ-FUNC-007** | 소비 계획 카드 작성 (어디서 · 업종 · 얼마까지 · 무엇을) | PRD §4-1 F8a · US-4 · ADR-003 | Must Have | Functional | 1) 입력·저장 단위 테스트<br>2) 업종 코드 대조 가능성 검증<br>3) 화면 검수 | **아이 또는 보호자** 누구나 작성할 수 있어야 한다(기기 종류 무관 · **위치정보 미사용**). 장소·업종·금액 상한은 필수, 품목은 선택 입력이다. **업종은 카드 승인 데이터의 업종 코드와 대조 가능한 값**으로 기록돼야 한다. 카드 결제 건 대비 **작성률 ≥ 50%**(생존 조건) | Approved | 개발 엔지니어 |
| **REQ-FUNC-008** | 계획↔실제 업종별 대조 및 두 갈래 판정 · 회고 문장 풀 | PRD §4-1 F8b · US-4 · US-5 · ADR-004 | Must Have | Functional | 1) 결제 매칭 정확도 수동 대조(표본 50건/주)<br>2) 두 갈래 판정 단위 테스트<br>3) 문장 비복원 추출 검증<br>4) 화면 검수 | 결제가 계획 카드에 자동 매칭돼야 하며 **매칭 정확도 ≥ 90%**. **금액 기준 단독 판정** — 실제 합계 ≤ 계획이면 **별 1개 지급**(`plan_met=true`), 초과면 **별 미지급·미차감**. 업종 불일치는 `category_met=false`로 **기록만** 하고 별 판정에 반영하지 않으며 **회고 문장을 「업종이 달랐어요」 갈래로 분기**한다. 계획 카드가 없는 결제는 **별 미지급**이고 작성 유도를 노출한다. 회고 문장은 **비복원 추출**하며 동일 문장 재노출 **≤ 2/8**(7일 창), 화면 체류 **중위 ≥ 3초** | Approved | 개발 엔지니어 |
| **REQ-FUNC-009** | 월간 숲 (전월 대비 변화 지표) | PRD §4-1 F9 · US-1 · ADR-002 | Must Have | Functional | 1) 스냅샷 적재 단위 테스트<br>2) 델타 렌더 검증<br>3) 60초 지목 테스트 | 주기 종료 시 스냅샷을 적재하고 **초기화 없이 누적**해야 한다. **전월 대비 변화 지표 7개**(4영역 단계 + 사려다 멈춤 · 가격 비교 · 저축률)를 표시한다. 전월 데이터가 없으면 **"다음 달부터 비교할 수 있어요"** 로 대체하고 **델타 0으로 렌더하지 않아야** 한다. 별 잔액이 0이어도 **「이번 달 획득 별」이 스크롤 없이 노출**돼야 한다. 변화 항목 **60초 이내 3개 이상 지목 ≥ 6/8** · 확인 소요 **중위 ≤ 3분** | Approved | 개발 엔지니어 |
| **REQ-FUNC-010** | 아이 온보딩 (학습 → 퀴즈 → 별 1개 → 아이템 제시) | PRD §4-1 F6 · 부록 A | Should Have | Functional | 1) 첫 보상 루프 소요 측정<br>2) 단계 전이 테스트<br>3) QA 검증 | 짧은 학습 → 퀴즈 → **별 1개 지급** → **별 1개로 살 수 있는 아이템 즉시 제시**까지 **목표 5분** 내에 완결돼야 한다. 카드 배송 대기 중에도 **학습·퀴즈·별 획득이 가능**해야 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-011** | 승인 지연 시 별 소급 지급 및 「승인 대기 N건」 표시 | PRD §4-1 F10 · US-6 | Should Have | Functional | 1) 소급 지급 단위 테스트<br>2) 주기 귀속 테스트<br>3) 일괄 승인 테스트 | 보호자 미승인 48시간 경과 후 승인해도 **완료 시점 기준으로 소급 지급**되며 **성공률 100%** 여야 한다. 완료 시점 주기(N)가 종료된 뒤 승인되면 **별은 지급하되 나무 조건은 주기 N에 귀속**하고 **주기 N+1 나무에 가산하지 않으며**, 월간 숲(주기 N 스냅샷)에 반영하고 *"지난 달 실천으로 인정됐어요"* 를 표시한다. 승인 대기 5건 이상 시 **일괄 승인 경로**를 제공하되 **각 건은 개별 소급** 처리한다. 성장 나무에 **「승인 대기 N건」** 을 표시하고, 아이 화면에서 **「대기 중」과 「미실천」을 시각적으로 구별**해야 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-012** | 아이 3일 미접속 알림 | PRD §4-1 F11 · US-7 | Should Have | Functional | 1) 배치 판정 단위 테스트<br>2) 오탐 발송 테스트<br>3) 채널 폴백 테스트 | 최종 접속 후 **72시간 경과** 시 보호자에게 알림을 발송하며 **발송률 100%** · **정지→인지 ≤ 3일**. 알림에 **아이가 멈춘 지점(영역·조건)** 을 함께 표시한다. **71시간 시점 재접속 시 발송하지 않아야**(오탐 0건) 한다. 푸시 차단 계정은 **앱 내 배너 + (동의 시) 문자**로 대체 발송하고 **차단 상태를 별도 집계**한다. 앱 삭제 시 **「재설치 안내」로 분기**하고 **다른 이벤트 코드**로 적재한다. 발송 시간대는 보호자 활동 시간에 맞춰 **조정 가능**해야 한다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-013** | 위시리스트 (30 · 70 · 100% 각 별 1개) | PRD §4-1 F12 | Should Have | Functional | 1) 진척 구간 지급 테스트<br>2) 중복 지급 방지 테스트<br>3) QA 검증 | 목표 금액 대비 **30% · 70% · 100% 도달 시 각각 별 1개**를 지급해야 한다. 동일 구간은 **1회만** 지급한다. 위시리스트 달성은 **실천 트리거 6**으로 WPA 분자에 산입된다 | Approved | 개발 엔지니어 |
| **REQ-FUNC-014** | 소비 내역 (전월 대비 증감액 상단 · 업종별 집계) | PRD §4-1 F13 | Should Have | Functional | 1) 집계 정확성 테스트<br>2) 업종 분류 검증<br>3) 화면 검수 | **전월 대비 증감액을 화면 상단**에 배치해야 한다. REQ-FUNC-008이 수집한 업종 코드를 재사용해 **업종별 집계**를 제공한다 | Approved | 서비스 운영자 |
| **REQ-FUNC-015** | 예적금 비교·선택 (가입 별 1개 · 완주 별 10개) | PRD §4-1 F15 · ADR-006 | Could Have | Functional | 1) 법률 검토 통과 확인<br>2) 중개 행위 부재 검증<br>3) QA 검증 | **비교·선택 경험까지만** 제공하고 **가입 중개를 수행하지 않아야** 한다(REQ-REG-004). 착수 조건은 **검증과제 ⑤ 법률 검토 통과**다. 개통 시 실천 트리거 7·8이 열리며 WPA 정의가 **v1(3종) → v2(5종)** 로 전환되고 **시계열을 단절 표기**한다 | Proposed | 정책·법령 담당 |
| **REQ-FUNC-016** | 카드 없이 학습부터 시작하는 체험 경로 | PRD §4-1 F16 | Could Have | Functional | 1) 잠금 범위 테스트<br>2) 전환 흐름 테스트 | 카드 배송 대기·미신청 상태에서 **학습·퀴즈·별 획득이 가능**하고 **카드 필요 기능만 잠겨야** 한다. 미구현 시 **잠금 안내 문구로 대체**한다 | Proposed | 개발 엔지니어 |
| **REQ-FUNC-017** | 별의 옷장 외 목적지 | PRD §4-1 F17 | Could Have | Functional | 1) 분리선 준수 검증<br>2) QA 검증 | 별의 사용처를 옷장 밖으로 확장하되 **별↔저금통 분리선(REQ-REG-005)을 넘지 않아야** 한다. 착수 조건은 **P-21 현금 분리선 재검토 완료**다 | Proposed | 정책·법령 담당 |
| **REQ-FUNC-018** | 기존 앱 기록 이전 / 병행 사용 | PRD §4-1 F18 | Won't Have | Functional | — | 본 릴리즈에서 구현하지 않는다. 획득 메시지를 **「이전」이 아니라 「지금부터」** 프레임으로 구성해 부재를 보완한다 | Deferred | 제품기획 (PM) |

### 4.2 비기능 요구사항

| ID | 제목 | 출처 | 우선순위 | 유형 | 검증 방식 | 인수 기준 | 상태 | 담당자 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **REQ-NF-001** | 성장 나무 렌더 p95 ≤ 1,250 ms | PRD §5-2 (US-1 AC1 역산) | Must Have | Performance | `tree_view_opened` 진입~첫 페인트 p95 주간 계측 | 5초 노출 회상 테스트의 **25%를 넘지 않아야** 한다. p95 **≤ 1,250 ms**. 3일 연속 초과 시 아키텍처 재검토 ADR을 발행한다 | Approved | 시스템 운영자 |
| **REQ-NF-002** | 월간 숲 렌더 p95 ≤ 2,000 ms | PRD §5-2 (US-1 AC3 역산) | Must Have | Performance | `forest_view_opened` p95 주간 계측 | *"60초 이내 3개 지목"* 과업 시간의 **3%를 넘지 않아야** 한다. p95 **≤ 2,000 ms** | Approved | 시스템 운영자 |
| **REQ-NF-003** | 별 지급 반영 p95 ≤ 800 ms | PRD §5-2 (US-2 AC1 역산) | Must Have | Performance | `practice_credited` → 화면 반영 p95 일간 계측 | *"동일 세션 내 반영"* 을 만족해야 한다. p95 **≤ 800 ms** | Approved | 시스템 운영자 |
| **REQ-NF-004** | 오프라인 재연결 후 반영 ≤ 60 s | PRD §5-2 (US-2 AC-E1) | Must Have | Performance | 재연결~반영 p95 일간 계측 | 오프라인 실천 완료 후 재연결 시 **60초 이내** 반영되고, **별 중복 지급 0건**(`idempotency_key`)이며 주차 귀속은 **`client_ts` 기준**이어야 한다 | Approved | 개발 엔지니어 |
| **REQ-NF-005** | 결제↔계획 카드 매칭 정확도 ≥ 90% | PRD §5-2 · US-4 AC2 | Must Have | Accuracy | 수동 대조 표본 50건/주 · `match_method` 분포 | 매칭 정확도 **≥ 90%**. 2주 연속 미달 시 매칭 규칙 재설계 ADR을 발행한다. `match_method=amount_only` 비율 **≤ 20%** | Approved | 개발 엔지니어 |
| **REQ-NF-006** | 월 가용성 ≥ 99.0% | PRD §5-2 · ADR-005 | Must Have | Reliability | 5분 단위 프로브 · 월간 집계 | 월 가용성 **≥ 99.0%**. 🔴 **우리 SLA가 제휴사 SLA보다 높을 수 없으므로**, 제휴사 SLA 확인 시 **min(우리 목표, 제휴사 SLA)** 로 갱신한다 | Approved | 사업 담당 |
| **REQ-NF-007** | API 오류율 ≤ 0.5% | PRD §5-2 | Should Have | Reliability | (5xx + 타임아웃) / 전체 요청 · 일간 | 별 관련 API를 제외한 오류율 **≤ 0.5%**. **3일 연속 초과 시 원인 특정 전까지 릴리즈를 중단**한다 | Approved | 개발팀 리드 |
| **REQ-NF-008** | 별 지급·차감 정합성 오류율 0% | PRD §5-2 (협상 불가) | Must Have | Integrity | 별 원장 이중 기입 + 일일 정산 배치 diff | 정합성 오류율 **0%** — 허용 오차가 없다. 불일치 **> 0건이면 즉시 알림**, 30분 내 확인 · 1시간 내 원인 특정 | Approved | 개발 온콜 |
| **REQ-NF-009** | 별 소급 지급 성공률 100% | PRD §5-2 · US-6 AC1 | Must Have | Integrity | 자동 테스트 + `approval_state_changed(state=backfilled)` | 소급 지급 성공률 **100%** — 불변 조건이다 | Approved | 개발 엔지니어 |
| **REQ-NF-010** | 미접속 알림 발송 지연 ≤ 6 h | PRD §5-2 | Should Have | Performance | `sent_at − (last_session_at + 72h)` p95 주간 | 발송 지연 p95 **≤ 6시간**. 72시간 판정 후 남는 24시간 여유의 1/4 이내여야 O13(인지 ≤ 3일)이 성립한다 | Approved | 시스템 운영자 |
| **REQ-NF-011** | 전송 구간 암호화 (TLS 1.2 이상) | PRD §5-3 S1 | Must Have | Security | 배포 전 SSL 스캔 | 평문 전송 **0건** · TLS 1.1 이하 **0건**. TLS 핸드셰이크 버전 분포를 주간 모니터링한다 | Approved | 개발팀 리드 |
| **REQ-NF-012** | 저장 구간 암호화 | PRD §5-3 S2 | Must Have | Security | 분기 스키마 감사 | 아동 식별정보·인증정보·결제 원장의 **미암호화 컬럼 0개** | Approved | 개발팀 리드 |
| **REQ-NF-013** | 데이터 분리 저장 | PRD §5-3 S3 | Must Have | Security | 스키마 감사 | 학습·실천 데이터는 **아동 식별정보와 물리적으로 분리** 저장하고 조인 키만 보유해야 한다. 동일 테이블 혼재 **0건** | Approved | 개발팀 리드 |
| **REQ-NF-014** | 인증 및 인가 | PRD §5-3 S4 | Must Have | Security | 전 엔드포인트 권한 매트릭스 테스트 | 모든 API에 인증이 필수이며 **비인가 접근 성공 0건**. 아이 계정은 **보호자 계정에 종속**되고 독립 로그인·외부 공유·친구 기능이 없다. 401/403 급증(**전일 대비 +200%**) 시 알림 | Approved | 개발팀 리드 |
| **REQ-NF-015** | 세션 관리 | PRD §5-3 S5 · US-8 AC-E2 | Must Have | Security | 자동 테스트 | 보호자 세션 만료 **≤ 24시간**, 아이 세션 만료 **≤ 7일**. **동의 단계는 캐시하지 않는다** | Approved | 개발 엔지니어 |
| **REQ-NF-016** | 별↔저금통 전환 경로 부재 | PRD §5-3 S6 · REQ-REG-005 | Must Have | Security | 정적 분석 CI (금지 심볼 목록) | 전환 함수 **0개**. **기능 플래그로 막는 방식을 금지**하며, 코드에 경로 자체를 두지 않는다. CI 실패 시 머지 차단 | Approved | 개발 엔지니어 |
| **REQ-NF-017** | 위치 권한 미선언 | PRD §5-3 S7 · REQ-REG-002 | Must Have | Security | 빌드 파이프라인 매니페스트 스캔 | 앱 매니페스트의 위치 권한 선언 **0건**. 검출 시 **빌드 실패** 처리 | Approved | 개발 엔지니어 |
| **REQ-NF-018** | 감사 로그 | PRD §5-3 S8 | Must Have | Security | 일일 정산 배치 diff | 별 원장 · 동의 상태 · 결제 원장 변경은 **전건 감사 로그**를 적재하고 **1년 보존**해야 한다. 누락 **> 0건 즉시 알림** | Approved | 개발 온콜 |
| **REQ-NF-019** | 취약점 대응 | PRD §5-3 S9 | Should Have | Security | 주간 의존성 CVE 스캔 (CI) | **Critical 0건** · High는 **7일 내 조치**. Critical 검출 시 **릴리즈 차단** | Approved | 개발팀 리드 |
| **REQ-NF-020** | 개인정보 파기 | PRD §5-3 S10 | Must Have | Security | 월간 파기 배치 로그 감사 | 해지 후 **30일 내** 아동 식별정보를 파기해야 한다(법정 보존 항목 제외). 30일 초과 잔존 **> 0건 즉시 알림** | Approved | 정책·법령 담당 |
| **REQ-NF-021** | 클라우드 원가 아동 1인당 월 ≤ 500원 | PRD §5-4 | Should Have | Cost | 월간 청구서 ÷ 활성 아동 | 아동 1인당 월 **≤ 500원**. **3개월 연속 초과 시 아키텍처 재검토** | Approved | 사업 담당 |
| **REQ-NF-022** | 본인인증 원가 가입 1건당 ≤ 300원 | PRD §5-4 | Should Have | Cost | 월간 청구서 ÷ 신규 가입 | 가입 1건당 **≤ 300원** | Approved | 사업 담당 |
| **REQ-NF-023** | 운영 모니터링 및 대응 SLA | PRD §5-5 | Must Have | Operability | 모니터링 항목 17종 가동 확인 · 알림 리허설 | 6.6절의 **17개 감시 항목 전부**가 계산식·알림 기준·수신자·대응 SLA·에스컬레이션을 갖추고 가동돼야 한다. 규제·정합성 알림은 **30분 내 확인**, 보안 빌드 스캔 위반은 **즉시 차단** | Approved | 시스템 운영자 |
| **REQ-NF-024** | 유지보수성: 신규 트리거·영역·문장 확장 방식 | PRD §4-1 · 6.2절 | Could Have | Maintainability | 코드 리뷰 및 확장성 테스트 | 신규 별 트리거·나무 영역·회고 문장·업종 코드를 추가할 때 **enum 및 데이터 테이블 확장으로 처리**하고 분기 로직 변경을 최소화해야 한다 | Proposed | 개발 엔지니어 |

### 4.3 규제 요구사항

> **확장 절** — ISO/IEC/IEEE 29148:2018 **§9.6.17 Standards compliance**. 아동 대상 금융 서비스의 1순위 제약은 성능이 아니라 규제이며, 본 절의 항목은 **설계 변수가 아니라 상수**다. 전 항목이 자동 테스트 또는 스키마 검사로 **상시 감시**된다.

| ID | 제목 | 출처 | 우선순위 | 유형 | 검증 방식 | 인수 기준 | 상태 | 담당자 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **REQ-REG-001** | 법정대리인 동의 게이트 (P-05 · P-22) | PRD §5-1 · 부록 A | Must Have | Compliance | 동의 미완 상태 아이 계정 진입 시도 자동 테스트 | **동의 완료 전 아이 화면 진입 차단률 100%** · 우회 **0건**. 아이 화면은 첫 진입부터 개인정보 처리가 시작되므로 **순서 자체가 규제 요건**이다. `consent_gate_blocked` **> 0건 즉시 알림** · 30분 내 확인 · 즉시 기능 차단 · 2시간 미해결 시 서비스 일시 중단 | Approved | 정책·법령 담당 |
| **REQ-REG-002** | 위치정보 미수집 (P-19) | PRD §5-1 · ADR-003 | Must Have | Compliance | 1) 앱 매니페스트 권한 목록 검사<br>2) 서버 스키마 좌표 필드 부재 검증<br>3) 패킷 검사 | 위치정보를 **수집·저장·전송하지 않아야** 한다. 좌표 필드 **0개** · 위치 권한 선언 **0건**. 지오펜싱은 제품 범위에 포함하지 않는다 | Approved | 정책·법령 담당 |
| **REQ-REG-003** | 아동용 알기 쉬운 고지 (P-12) | PRD §5-1 | Must Have | Compliance | 문구 검수 + 아동 이해도 확인 세션 | 4영역 명칭은 보호자·아이 **동일**하게 두고, 「알기 쉬운 언어」는 **한 줄 설명**이 담당해야 한다. 아동 이해도 **≥ 6/8**. 문구 변경 시 재검수 게이트를 통과해야 한다 | Approved | 콘텐츠 담당 |
| **REQ-REG-004** | 예적금 가입 중개 금지 (P-20) | PRD §5-1 · ADR-006 | Must Have | Compliance | REQ-FUNC-015 구현 착수 전 법률 검토 통과(검증과제 ⑤) | **비교·선택 경험까지만** 제공하고 중개 행위 **0건**이어야 한다. 법률 검토 통과가 **F15 착수 게이트**다 | Approved | 정책·법령 담당 |
| **REQ-REG-005** | 별 차감형 · 교차 금지 · 별↔저금통 완전 분리 (P-01 · P-21) | PRD §5-1 | Must Have | Compliance | 1) 별 원장 감사<br>2) 정적 분석으로 전환 함수 부재 검증 | ❌ 현금 충전 ❌ 현금 환급 ❌ 양도·거래. 전환 경로 코드 **0개**. 일일 정산 배치와 정적 분석 CI로 상시 감시한다 | Approved | 개발 엔지니어 |
| **REQ-REG-006** | 얼굴 이미지 미수집 (P-13) | PRD §5-1 | Must Have | Compliance | 데이터 스키마 검수 | 동물 아바타를 사용하며 **이미지 업로드 경로 0개**. 스키마 변경 리뷰 게이트를 둔다 | Approved | 개발 엔지니어 |
| **REQ-REG-007** | 해지 시 잔액 전액 환불 (P-11) | PRD §5-1 · §6-3 | Must Have | Compliance | 해지 플로우 테스트 · 건별 환불 대사(일간) | 환불 누락 **0건** · 처리 **≤ 3영업일** | Approved | 사업 담당 |
| **REQ-REG-008** | 카드 한도·업종 제한의 제휴사 정책 종속 (P-17 · P-18) | PRD §5-1 · ADR-005 | Must Have | Compliance | 제휴 계약서 확인 · 정책 변경 통지 수신 채널 운영 | 이용한도와 업종 제한을 **본 시스템이 정의하지 않고 제휴사 정책을 따라야** 한다 | Approved | 사업 담당 |
| **REQ-REG-009** | 만 14세 미만 마이데이터 가입 불가 (F-01) | PRD §5-1 · §6-2 | Must Have | Compliance | 아키텍처 리뷰 | 표준 오픈뱅킹·마이데이터 연동이 **불가**하므로 **자체 카드 발급 + 폐쇄형 수집** 구조를 채택해야 한다 | Approved | 개발팀 리드 |

---
## 5. 추적성 매트릭스

| 요구사항 ID | 모듈 | 구현 클래스 | 테스트 케이스 ID |
| --- | --- | --- | --- |
| REQ-FUNC-001 | Account & Consent Service | ParentOnboardingManager, ConsentGateGuard | TC-FUNC-001 |
| REQ-FUNC-002 | Star Ledger Service | StarGrantEngine, StarLedgerWriter | TC-FUNC-002 |
| REQ-FUNC-003 | Learning Service | CurriculumProvider, QuizGrader | TC-FUNC-003 |
| REQ-FUNC-004 | Practice Service | MissionLoopManager, ApprovalStateMachine | TC-FUNC-004 |
| REQ-FUNC-005 | Growth Tree Service | GrowthTreeRenderer, PromotionRuleEvaluator, StallReasonResolver | TC-FUNC-005 |
| REQ-FUNC-006 | Avatar & Wishlist Service | AvatarWardrobeManager | TC-FUNC-006 |
| REQ-FUNC-007 | Spending Plan Service | PlanCardWriter | TC-FUNC-007 |
| REQ-FUNC-008 | Spending Plan Service | PlanActualMatcher, TwoBranchJudge, RetroSentenceAllocator | TC-FUNC-008 |
| REQ-FUNC-009 | Growth Tree Service | MonthlyForestSnapshotBuilder, DeltaRenderer | TC-FUNC-009 |
| REQ-FUNC-010 | Learning Service | ChildOnboardingFlow | TC-FUNC-010 |
| REQ-FUNC-011 | Practice Service | BackfillApprovalHandler, CycleAttributionResolver | TC-FUNC-011 |
| REQ-FUNC-012 | Notification Service | InactivityDetector, ChannelFallbackDispatcher | TC-FUNC-012 |
| REQ-FUNC-013 | Avatar & Wishlist Service | WishlistProgressTracker | TC-FUNC-013 |
| REQ-FUNC-014 | Spending Plan Service | SpendingHistoryAggregator | TC-FUNC-014 |
| REQ-FUNC-015 | Savings Service *(미착수)* | SavingsProductComparator | TC-FUNC-015 |
| REQ-FUNC-016 | Account & Consent Service | CardlessTrialFlow | TC-FUNC-016 |
| REQ-FUNC-017 | Avatar & Wishlist Service | StarDestinationRouter | TC-FUNC-017 |
| REQ-FUNC-018 | — *(Won't Have)* | — | — |
| REQ-NF-001 | Growth Tree Service / API Gateway | RenderPerformanceMonitor | TC-NF-001 |
| REQ-NF-002 | Growth Tree Service / API Gateway | RenderPerformanceMonitor | TC-NF-002 |
| REQ-NF-003 | Star Ledger Service | StarGrantLatencyMonitor | TC-NF-003 |
| REQ-NF-004 | Star Ledger Service | OfflineReplayHandler, IdempotencyKeyStore | TC-NF-004 |
| REQ-NF-005 | Spending Plan Service | PlanActualMatcher, MatchAccuracyAuditor | TC-NF-005 |
| REQ-NF-006 | Partner Gateway / API Gateway | AvailabilityProbe | TC-NF-006 |
| REQ-NF-007 | API Gateway | ErrorRateMonitor | TC-NF-007 |
| REQ-NF-008 | Star Ledger Service | DoubleEntryValidator, DailyReconciliationBatch | TC-NF-008 |
| REQ-NF-009 | Practice Service | BackfillApprovalHandler | TC-NF-009 |
| REQ-NF-010 | Notification Service | DispatchLatencyMonitor | TC-NF-010 |
| REQ-NF-011 ~ 013 | API Gateway / All Services | TlsPolicyEnforcer, SchemaAuditor | TC-NF-011 ~ 013 |
| REQ-NF-014 ~ 015 | API Gateway / Account & Consent Service | AuthorizationMatrix, SessionPolicyEnforcer | TC-NF-014 ~ 015 |
| REQ-NF-016 ~ 017 | CI Pipeline | ForbiddenSymbolScanner, ManifestPermissionScanner | TC-NF-016 ~ 017 |
| REQ-NF-018 | All Services | AuditLogWriter | TC-NF-018 |
| REQ-NF-019 ~ 020 | CI Pipeline / Account & Consent Service | DependencyCveScanner, DataPurgeBatch | TC-NF-019 ~ 020 |
| REQ-NF-021 ~ 022 | Analytics Service | UnitCostAggregator | TC-NF-021 ~ 022 |
| REQ-NF-023 | Analytics Service | MonitoringRuleEngine, EscalationDispatcher | TC-NF-023 |
| REQ-NF-024 | All Services | *(enum 및 데이터 테이블 확장 패턴)* | TC-NF-024 |
| REQ-REG-001 | Account & Consent Service | ConsentGateGuard | TC-REG-001 |
| REQ-REG-002 | CI Pipeline / All Services | ManifestPermissionScanner, SchemaAuditor | TC-REG-002 |
| REQ-REG-003 | Learning Service | PlainLanguageCopyRegistry | TC-REG-003 |
| REQ-REG-004 | Savings Service *(미착수)* | *(법률 검토 게이트)* | TC-REG-004 |
| REQ-REG-005 | Star Ledger Service / CI Pipeline | StarLedgerWriter, ForbiddenSymbolScanner | TC-REG-005 |
| REQ-REG-006 | Avatar & Wishlist Service | AvatarWardrobeManager *(이미지 업로드 경로 없음)* | TC-REG-006 |
| REQ-REG-007 | Partner Gateway | RefundReconciliationBatch | TC-REG-007 |
| REQ-REG-008 | Partner Gateway | PartnerPolicyAdapter | TC-REG-008 |
| REQ-REG-009 | Partner Gateway | *(폐쇄형 수집 아키텍처 제약)* | TC-REG-009 |

> **상위 추적** — 각 요구사항의 PRD 출처는 4장 「출처」 열에, 사용자 스토리 연결은 9장에, 설계 결정 근거는 11장에 있다.

---

## 6. 부록

### 6.1 API 엔드포인트 목록

> **출처 표기** — `[PRD]` 는 PRD §6-3에 명세된 인터페이스, `[도출]` 은 4장 요구사항과 6.5 이벤트 명세에서 도출한 항목이다. **`[도출]` 항목의 상세 스펙(요청·응답 스키마)은 설계 단계에서 확정한다.**

| 서비스 유형 | 메서드 | 엔드포인트 | 설명 | 출처 |
| --- | --- | --- | --- | --- |
| **Account & Consent Service** | POST | `/api/v1/parents/{parentId}/consent` | 법정대리인 동의 등록 — **아이 계정 활성화의 게이트** | [도출] |
| **Account & Consent Service** | GET | `/api/v1/parents/{parentId}/onboarding` | 온보딩 진행 단계 조회 (중간 저장 재개) | [도출] |
| **Account & Consent Service** | PUT | `/api/v1/parents/{parentId}/onboarding/{step}` | 온보딩 단계 완료 처리 | [도출] |
| **Account & Consent Service** | POST | `/api/v1/children` | 아동 계정 생성 (동의 완료 시에만 허용) | [도출] |
| **Learning Service** | GET | `/api/v1/children/{childId}/curriculum` | 4주제 학습 진도 조회 | [도출] |
| **Learning Service** | POST | `/api/v1/children/{childId}/quiz/{topicId}/submit` | 퀴즈 제출 및 채점 | [도출] |
| **Practice Service** | POST | `/api/v1/children/{childId}/missions` | 미션 생성 (조건·금액 사전 설정) | [도출] |
| **Practice Service** | PUT | `/api/v1/missions/{missionId}/approval` | 미션 승인 / 거절 — **소급 지급 포함** | [도출] |
| **Practice Service** | POST | `/api/v1/parents/{parentId}/missions/bulk-approval` | 대기 5건 이상 시 일괄 승인 (건별 개별 소급) | [도출] |
| **Star Ledger Service** | GET | `/api/v1/children/{childId}/stars` | 별 잔액 및 원장 조회 | [도출] |
| **Star Ledger Service** | POST | `/api/v1/children/{childId}/stars/grant` | 별 지급 (`idempotency_key` 필수) | [도출] |
| **Growth Tree Service** | GET | `/api/v1/children/{childId}/tree` | 성장 나무 조회 — 4영역 단계·조건 충족·**정체 원인** | [도출] |
| **Growth Tree Service** | GET | `/api/v1/children/{childId}/forest` | 월간 숲 조회 — **전월 대비 델타 7지표** | [도출] |
| **Spending Plan Service** | POST | `/api/v1/children/{childId}/plan-cards` | 소비 계획 카드 작성 (아이 · 보호자 공통) | [도출] |
| **Spending Plan Service** | GET | `/api/v1/children/{childId}/plan-cards/{cardId}/reconciliation` | 계획↔실제 대조 결과 조회 | [도출] |
| **Spending Plan Service** | POST | `/api/v1/children/{childId}/retro/{recordId}/confirm` | 회고 확인 — **두 갈래 판정 실행** | [도출] |
| **Spending Plan Service** | GET | `/api/v1/children/{childId}/spending` | 소비 내역 — 전월 대비 증감 · 업종별 집계 | [도출] |
| **Avatar & Wishlist Service** | POST | `/api/v1/children/{childId}/wardrobe/purchase` | 옷 구매 (별 차감) | [도출] |
| **Avatar & Wishlist Service** | GET | `/api/v1/children/{childId}/wishlist` | 위시리스트 진척 조회 (30·70·100%) | [도출] |
| **Notification Service** | POST | `/api/v1/notifications/inactivity/batch` | 72시간 미접속 판정 배치 실행 | [도출] |
| **Notification Service** | PUT | `/api/v1/parents/{parentId}/notification-window` | 알림 발송 시간대 설정 | [도출] |
| **Partner Gateway** | POST | `/api/v1/partner/topup` | **충전 요청** — 입력: 보호자_id · 금액 / 출력: 충전 결과 · 잔액 | **[PRD]** |
| **Partner Gateway** | GET | `/api/v1/partner/cards/{cardId}/transactions` | **결제 내역 조회** — 출력: 시각 · 금액 · 가맹점명 · **업종 코드** | **[PRD]** |
| **Partner Gateway** | POST | `/api/v1/partner/cards/{cardId}/terminate` | **해지·환불** — **전액 환불**(REQ-REG-007) | **[PRD]** |
| **Partner Gateway** | POST | `/api/v1/partner/cards` | **카드 발급 신청** — 실패 시 입력값 24시간 보존 | **[PRD]** |
| **Analytics Service** | POST | `/api/v1/events` | 인앱 이벤트 일괄 수집 (`idempotency_key` · `client_ts` / `server_ts` 필수) | [도출] |
| **Analytics Service** | GET | `/api/v1/metrics/wpa` | 주간 WPA 산출 결과 조회 (ISO 주 마감 후 D+1) | [도출] |

### 6.2 데이터 모델 정의

```java
// 성장 나무 4영역 — MVP에서 GROW는 학습만 개통 (ADR-006)
public enum TreeSlot {
    EARN("벌기", true),
    SPEND_WELL("잘 쓰기", true),
    SAVE("모으기", true),
    GROW("불리기", false);          // practiceEnabled = false : "곧 열려요" 표시

    private final String label;
    private final boolean practiceEnabled;
}

// 나무 단계 — 3단계 고정, 매달 조건 상승 없음 (ADR-002)
public enum TreeStage {
    SEED(0, "씨앗"),
    SPROUT(1, "새싹"),
    TREE(2, "나무");

    private final int order;
    private final String label;
    // 승급 조건 : 학습 3회 + 퀴즈 5개 + 실천 1회 이상 (실천 0건이면 승급 불가)
}

// 별 지급 트리거 8종 — 자동 7 / 수동 1
// countsTowardWpa = true 인 것만 북극성 KPI 분자에 산입 (ADR-001 · ADR-008)
public enum StarTrigger {
    ONBOARDING_LEARNING(1,  1, true,  false, null,              "온보딩 학습"),
    ATTENDANCE(2,           1, true,  false, null,              "출석체크 (조건 없음)"),
    QUIZ_CORRECT(3,         1, true,  false, null,              "퀴즈 정답"),
    MISSION_APPROVED(4,     1, false, true,  TreeSlot.EARN,     "미션 성공 (보호자 승인)"),
    SPENDING_RETRO(5,       1, true,  true,  TreeSlot.SPEND_WELL, "소비 계획↔실제 대조"),
    WISHLIST_MILESTONE(6,   1, true,  true,  TreeSlot.SAVE,     "위시리스트 30·70·100%"),
    SAVINGS_ENROLLED(7,     1, true,  true,  TreeSlot.GROW,     "예적금 가입 (MVP 잠금)"),
    SAVINGS_COMPLETED(8,   10, true,  true,  TreeSlot.GROW,     "예적금 완주 (MVP 잠금)");

    private final int code;
    private final int starAmount;
    private final boolean automatic;        // false = 보호자 승인 필요 (8종 중 트리거 4뿐)
    private final boolean countsTowardWpa;
    private final TreeSlot treeSlot;
    private final String description;
}

// WPA 정의 버전 — 전환 시 시계열 단절 표기 후 4주간 병기
public enum WpaVersion {
    V1("MVP 기준", 3),      // 트리거 4 · 5 · 6
    V2("F15 개통 후", 5);   // 트리거 4 · 5 · 6 · 7 · 8

    private final String scope;
    private final int triggerCount;
}

// 미션 승인 상태
public enum ApprovalState {
    PENDING("승인 대기"),
    APPROVED("승인"),
    REJECTED("승인되지 않음"),      // 별 미지급 · 실천 카운트 미가산 · 「미실천」과 시각 구별
    BACKFILLED("소급 지급");        // 완료 시점 기준 지급 · 나무 조건은 완료 시점 주기에 귀속
}

public enum ApprovalMode {
    AUTO("자동 판정"),
    PARENT("보호자 승인");
}

// 실천 판정 경로 — WPA 산출의 원천
public enum PracticePath {
    MISSION("미션"),
    RETRO("소비 회고"),
    WISHLIST("위시리스트"),
    SAVINGS("예적금");               // MVP 잠금
}

// 계획 카드 상태
public enum PlanCardStatus {
    PENDING("대기"),
    MATCHED("매칭"),
    EXPIRED("만료");
}

// 결제↔계획 카드 매칭 방식 — 매칭 정확도 산출 시 분리 집계 (US-4 AC-E3)
public enum MatchMethod {
    CATEGORY("업종 코드 일치"),
    MERCHANT("가맹점명 문자열 일치"),   // 업종이 UNKNOWN일 때 2차 매칭
    AMOUNT_ONLY("금액 단독 판정");      // 폴백 · 비율 20% 초과 시 알림
}

// 회고 두 갈래 판정 (ADR-004) — 금액 기준 단독 판정
public enum RetroBranch {
    PLAN_MET(true,  true,  "계획 지킴 — 별 1개 지급"),
    PLAN_EXCEEDED(false, false, "계획 넘김 — 회고만, 별 미지급·미차감"),
    CATEGORY_MISMATCH(true, true, "금액은 지킴, 업종 불일치 — 별 지급 + 「업종이 달랐어요」 문장");

    private final boolean planMet;
    private final boolean starGranted;
    private final String description;
}

// 아동 기기 유형 — 참고 정보. 기능 대상 판정에 사용하지 않음 (ADR-003)
public enum DeviceType {
    DEDICATED_PHONE("아이 전용 스마트폰"),
    KIDS_WATCH("키즈워치"),
    SHARED("보호자 기기 공유"),
    NONE("없음");
}

// 3구간 판정 — 모든 KPI · 인수 기준 · 실험에 공통 적용
public enum JudgmentBand {
    PASS("통과선 이상", "다음 게이트로 진행"),
    HOLD("통과선 미달 ~ 실패선 초과", "표본 +4 후 재판정 · 2회 연속이면 FAIL 간주"),
    FAIL("실패선 이하", "지정된 재설계 실행");

    private final String range;
    private final String action;
}
```

### 6.3 비즈니스 규칙 요약

1. **동의 선행**: 법정대리인 동의가 완료되기 전에는 아이 화면에 진입할 수 없다 — 순서 자체가 규제 요건이다 (REQ-REG-001)
2. **실천 없이 승급 없음**: 나무 승급은 학습 3회 + 퀴즈 5개 + **실천 1회 이상**을 모두 요구하며, 퀴즈를 100개 풀어도 실천이 0건이면 승급하지 않는다
3. **3층 분리**: 별(즉각 보상 · 초기화 없음) / 나무(이번 주기 성취 · 주기 초기화) / 숲(장기 누적 · 초기화 없음)을 분리한다. 별을 많이 준 달이 성장한 달로 읽히지 않게 하기 위해서다 (ADR-002)
4. **WPA 분자 제한**: 실천 트리거 4·5·6만 북극성 분자에 산입하고 학습 경로 1·2·3은 제외한다. 출석 별이 분자에 들어가면 활동량 지표로 퇴화한다 (ADR-001)
5. **출석은 후하게, 지표는 엄격하게**: 출석체크 별은 조건 없이 지급하되 WPA에서는 제외한다 (ADR-008)
6. **별 불변 규칙**: 차감형이며 주기 초기화가 없고, 현금 충전·환급·양도·저금통 전환 경로를 **코드에 두지 않는다**. 기능 플래그로 막는 방식은 금지한다 (REQ-REG-005 · REQ-NF-016)
7. **소급 귀속**: 승인이 지연돼도 별은 **완료 시점 기준**으로 지급한다. 완료 시점 주기가 이미 종료됐다면 별은 지급하되 **나무 조건은 그 주기에 귀속**하고 다음 주기 나무에 가산하지 않으며, 월간 숲 스냅샷에만 반영한다
8. **계획 판정은 금액 단독**: 실제 합계 ≤ 계획이면 별 1개, 초과면 회고만 제시하고 별을 지급하지도 차감하지도 않는다. 업종 일치 여부는 기록만 하고 별 판정에 넣지 않는다 — 매칭 오류 10%가 아이의 손실로 전가되지 않게 하기 위해서다 (ADR-004)
9. **계획 없는 소비**: 계획 카드가 없는 결제는 대조 대상이 아니며 별을 지급하지 않고 작성 유도를 노출한다
10. **매칭 폴백 순서**: 업종 코드 → 가맹점명 문자열 → 금액 단독. 사용한 방식을 `match_method`로 적재해 정확도 산출에서 분리 집계한다
11. **다건 매칭**: 한 계획 카드에 여러 결제가 매칭되면 **합계로 판정**하고 업종별 내역을 모두 나열한다
12. **정체 판정 유예**: 정체는 **주기 시작 후 14일 경과분에만** 적용한다. 주기 초기화 직후의 미충족 상태를 정체로 표시하지 않는다
13. **정체 원인 표시**: 미충족 조건을 전부 표시하고 **「가장 적게 남은 조건」을 최상단**에 둔다
14. **회고 문장 비복원 추출**: 동일 문장 재노출을 억제하며, 문장 풀 잔여 20% 이하 시 운영 알림을 발송하고 재사용 전에 풀 확장을 요구한다
15. **회고 큐**: 미완 회고는 큐에 쌓아 순서대로 제시하고, 큐 길이 3건 초과 시 오래된 건을 「요약 회고」로 병합한다
16. **멱등성**: 모든 별 지급과 이벤트 적재에 `idempotency_key`를 요구한다. 동일 미션 2회 승인 시 별은 1회만 지급한다
17. **주차 귀속**: 오프라인에서 발생한 이벤트는 `client_ts` 기준으로 주차에 귀속한다
18. **「불리기」 잠금**: 학습·퀴즈만 개통하고 실천 트리거 7·8을 잠그며, 화면에 **"곧 열려요"** 를 표시해 4영역 미개통이 결함으로 오인되지 않게 한다 (ADR-006)
19. **빈 화면 규칙**: 실천 기록 0건이면 **"아직 기록이 없어요 + 첫 실천 안내"**, 전월 데이터가 없으면 **"다음 달부터 비교할 수 있어요"** 를 표시한다. 델타 0으로 렌더하지 않는다
20. **위치정보 부재**: 위치 권한을 선언하지 않고 좌표를 수집·저장·전송하지 않는다 (REQ-REG-002)

### 6.4 데이터베이스 스키마 개요

```sql
-- 핵심 테이블 요약
parent_accounts             -- 보호자 계정 · 법정대리인 동의 상태/일시 · 알림 시간대 · 푸시 권한 상태
child_accounts              -- 아동 계정 · 보호자_id(종속) · 생년(만 나이) · 기기 유형(참고)
learning_completions        -- 학습 이수 · 주제(4종 고정) · 완주 여부 · 퀴즈 정답 수
practice_credits            -- 실천 판정 · 경로 · 판정 시각 · 판정 방식 · 승인 지연 · cycle_id  ★ WPA 원천
star_ledger                 -- 별 원장 · 증감 · 트리거 코드(1~8) · 잔액 · idempotency_key  ★ 이중 기입
tree_states                 -- 나무 상태 · 영역 · 단계 · 조건 충족(학습/퀴즈/실천) · 주기 시작일 · 정체 일수
monthly_forest_snapshots    -- 월간 숲 · 연월 · 4영역 최종 단계 · 집계 · 전월 대비 델타 · 총 획득 별 (누적)
spending_plan_cards         -- 계획 카드 · 작성자(아이/보호자) · 장소 · 업종 코드 · 계획 금액 · 품목 · 상태
spending_records            -- 소비 내역 · 계획 카드_id(nullable) · 실제 금액 · 가맹점명 · 업종 코드
                            --            · match_method · plan_met · category_met · 회고 상태 · 회고 문장 id
retro_sentence_pool         -- 회고 문장 풀 · 갈래(지킴/넘김/업종불일치) · 사용 이력 (비복원 추출)
wishlists                   -- 위시리스트 · 목표 금액 · 진척률 · 지급 완료 구간(30/70/100)
wardrobe_items              -- 아바타 에셋 · 동물 5종 × 옷 8벌 · 가격(별) · 납품 차수
missions                    -- 미션 · 조건 · 금액 · 승인 상태 · cycle_id
app_events                  -- 인앱 이벤트 10종 (파티셔닝) · idempotency_key · client_ts / server_ts
audit_logs                  -- 별 원장 · 동의 상태 · 결제 원장 변경 전건 (보존 1년)
```

**저장 제약**

- 학습·실천 데이터는 **아동 식별정보와 물리적으로 분리** 저장하고 조인 키만 보유한다 (REQ-NF-013)
- **좌표 컬럼을 어떤 테이블에도 두지 않는다** (REQ-REG-002)
- 별↔저금통 **전환 컬럼·전환 함수를 두지 않는다** (REQ-REG-005)
- 아동 식별정보·인증정보·결제 원장은 **저장 시 암호화**한다 (REQ-NF-012)

### 6.5 인앱 이벤트 명세

> **확장 절** — ISO/IEC/IEEE 29148:2018 **§9.6.11 External interfaces**. 8장의 성과 측정 요구사항은 이 이벤트 스펙 없이는 구현·검증이 불가능하므로, 인터페이스 명세로서 부록에 둔다.

| 이벤트명 | 발생 시점 | 필수 필드 | 산출 지표 |
| --- | --- | --- | --- |
| `practice_credited` | 실천 트리거로 별 지급 확정 | `child_id` `trigger_code(4·5·6·7·8)` `earned_at` `awarded_at` `approval_mode(auto·parent)` `tree_slot` | **WPA (북극성)** · MOE-04 · MOE-06 |
| `star_ledger_entry` | 별 증감 확정 | `child_id` `delta` `trigger_code` `balance_after` `idempotency_key` | 별 정합성 오류율 (REQ-NF-008) |
| `tree_state_changed` | 나무 단계·조건 갱신 | `child_id` `slot` `stage_before` `stage_after` `cond_learn` `cond_quiz` `cond_practice` `stall_days` | MOE-05 · 정체 일수 |
| `tree_view_opened` | 보호자 성장 나무 진입 | `parent_id` `dwell_ms` `evidence_expanded(bool)` `stall_reason_shown(bool)` | MOE-10 · REQ-NF-001 |
| `forest_view_opened` | 보호자 월간 숲 진입 | `parent_id` `year_month` `delta_items_rendered(int)` `dwell_ms` | MOE-02 · MOE-14 · REQ-NF-002 |
| `retro_viewed` | 회고 화면 진입~이탈 | `child_id` `sentence_id` `dwell_ms` `plan_amount` `actual_amount` `plan_met(bool)` `category_met(bool)` `star_granted(bool)` | 회고 체류 중위 · 동일 문장 재노출률 · 계획 준수율 · 갈래별 열람률 |
| `approval_state_changed` | 미션 승인 / 거절 / 소급 | `mission_id` `state(pending·approved·rejected·backfilled)` `delay_hours` `cycle_id` | 소급 성공률 (REQ-NF-009) · 대기 분포 |
| `inactivity_notified` | 3일 미접속 알림 발송 | `parent_id` `child_id` `last_session_at` `sent_at` `opened_at` | MOE-13 · REQ-NF-010 |
| `onboarding_step` | 온보딩 단계 진입 / 완료 / 이탈 | `parent_id` `step(1~5)` `state` `resumed(bool)` | 온보딩 퍼널 · 3단계 이탈률 |
| `consent_gate_blocked` | 동의 미완 상태 아이 진입 차단 | `parent_id` `attempted_at` | **규제 알림 (> 0건 즉시)** — REQ-REG-001 |

> **적재 규칙** — 모든 이벤트에 `idempotency_key`(중복 방지) · `client_ts` / `server_ts`(오프라인 보정)를 필수로 요구한다. **오프라인 발생 이벤트는 `client_ts` 기준으로 주차(week)에 귀속**한다. 주차 기준은 **ISO 주(월~일) · KST**다.

### 6.6 모니터링 및 대응 SLA

> **확장 절** — ISO/IEC/IEEE 29148:2018 **§9.6.18 Software system attributes**. REQ-NF-023의 구체 명세이며, 알림 임계치만으로는 운영을 검증할 수 없으므로 **울린 뒤에 누가 무엇을 언제까지 하는가**를 항목마다 정의한다.

| 계층 | 항목 | 계산식 / 소스 | 알림 기준 | 수신자 | 대응 SLA | 에스컬레이션 |
| --- | --- | --- | --- | --- | --- | --- |
| 🔴 규제 | 동의 미완 아이 진입 · 서버 좌표 필드 유입 | `consent_gate_blocked` 건수 · 스키마 스캔 | **> 0건 즉시** | 개발 온콜 + 정책 담당 | 30분 내 확인 · 즉시 기능 차단 | 2시간 미해결 → 서비스 일시 중단 |
| 🔴 정합성 | 별 원장 불일치 | 일일 정산 배치 diff 건수 | **> 0건 즉시** | 개발 온콜 | 30분 내 확인 · 1시간 내 원인 특정 | 4시간 미해결 → 팀 전체 |
| **북극성** | WPA | `practice_credited` distinct ÷ 활성 아동 | 전주 대비 **−10%p** | 제품기획 (PM) | 24시간 내 원인 분석 | 2주 연속 → 로드맵 재검토 |
| 실천 | 7일 내 첫 실천 인정률 | 코호트 기반 | **< 40%** (FAIL선) | 제품기획 (PM) | 주간 리뷰 | 2주 연속 → 성장 조건 난이도 재조정 |
| 인정 | 48h 초과 승인 대기 비율 | `approval_state_changed.delay_hours` | **> 20%** | 제품기획 (PM) | 주간 리뷰 | — |
| 탐지 | 미접속 알림 발송 실패 | 발송 시도 − 성공 | **> 0건** | 개발 온콜 | 4시간 | 24시간 → 대체 채널 강제 |
| 데이터 타당성 | 회고 체류 중위 · 동일 문장 재노출률 | `retro_viewed.dwell_ms` p50 · `sentence_id` 중복률 | 중위 **< 3초** 또는 재노출 **> 2/8** | 콘텐츠 담당 | 1주 내 문장 풀 확장 | 2주 연속 → REQ-FUNC-008 스펙 재검토 |
| 콘텐츠 | 회고 문장 풀 잔여 | 미사용 문장 ÷ 전체 | **< 20%** | 콘텐츠 담당 | 1주 | — |
| 성능 | 화면별 p95 | REQ-NF-001 ~ 003 측정 방법 | **SLO 초과 3일 연속** | 개발팀 리드 | 3일 내 원인 특정 | 릴리즈 중단 |
| 🔴 보안 | 위치 권한 선언 · 미암호화 컬럼 · 전환 함수 | 빌드 스캔 · 스키마 감사 · 정적 분석 CI | **> 0건** | 개발 온콜 + 정책 담당 | 빌드 / 머지 즉시 차단 | 24시간 미해결 → 릴리즈 보류 |
| 보안 | 비인가 접근 시도 (401 / 403) | 전일 대비 증가율 | **+200%** | 개발 온콜 | 4시간 내 확인 | 24시간 → 보안 점검 착수 |
| 보안 | 의존성 CVE | 주간 스캔 결과 | **Critical > 0건** | 개발팀 리드 | 즉시 릴리즈 차단 | High 7일 초과 → 팀 전체 |
| 보안 | 개인정보 파기 지연 | 해지 후 30일 초과 잔존 건수 | **> 0건** | 개발 온콜 + 정책 담당 | 24시간 내 파기 | 72시간 → 정책 담당 |
| 매칭 | 결제↔계획 카드 매칭 정확도 | 수동 대조 표본 50건/주 | **< 90%** | 제품기획 (PM) | 주간 리뷰 | 2주 연속 → 매칭 규칙 재설계 ADR |
| 비용 | 아동 1인당 월 클라우드 원가 | 월간 청구서 ÷ 활성 아동 | **> 500원** | 개발팀 리드 + 사업 담당 | 월간 리뷰 | 3개월 연속 → 아키텍처 재검토 |
| 수익 | 카드 연결률 · 1인당 월 결제액 | 카드 등록 ÷ 온보딩 완주 · 결제 원장 ÷ 활성 아동 | **< 40%** 또는 **< 20,000원** | 사업 담당 | 월간 리뷰 | 2개월 연속 → 수익 구조 재검토 |
| 가용성 | 월 가용성 | 5분 단위 프로브 | **< 99.0%** | 시스템 운영자 | 월간 리뷰 | 2개월 연속 → 제휴사 SLA 재협의 |

---

## 7. 향후 개선 사항

현재 MVP 설계는 **선언 ②(성장을 보여준다)를 완성하고 선언 ①(성장이 일어난다)을 4영역 중 3영역에서 개통**하는 범위에 초점을 둔다. 다음 개선 사항은 향후 버전에서 계획된다.

### 7.1 「불리기」 실천 경로 개통

- REQ-FUNC-015(예적금 비교·선택) 구현으로 **4영역 전체 개통**
- 착수 조건은 **검증과제 ⑤ 법률 검토 통과**(REQ-REG-004 중개업 해당 여부)
- 개통 시 WPA 정의를 **v1(3종) → v2(5종)** 로 전환하고 시계열을 단절 표기, 전환 후 4주간 병기
- 예적금 이자 주기 사양은 이 시점에 확정한다

### 7.2 온라인 결제 사전 개입 수단

- 현재 온라인 결제는 **계획 카드를 적을 계기가 구조적으로 없어 대응 수단이 0개**다
- **온라인 가맹점 업종 코드 사전 등록** 방식을 검토해 계획 카드가 온라인 결제에도 걸리게 한다
- 자동 발동 방식의 재도입은 **계획 카드 작성률 ≥ 50%가 확인된 뒤에만** 논의한다 (ADR-003)

### 7.3 진입 장벽 완화 및 별 사용처 확장

- REQ-FUNC-016 카드 없는 체험 경로 — 카드 배송 대기 시간이 진입 장벽인 가정 대상
- REQ-FUNC-017 별의 옷장 외 목적지 — **별↔저금통 분리선(REQ-REG-005) 재검토 선행**
- 아바타 40조합 소진 시점 감시 — 회고 문장 풀과 같은 방식의 **잔여율 모니터** 추가

### 7.4 성장 효과의 외부 검증

- E10(3개월 종단 관찰) 결과 확보 후, 6개월 시점에 **외부 검증 파트너 탐색** 착수
- 그때까지 대외 표현은 **「설계상 그렇게 되도록 만들었다」** 까지로 제한한다 (9.4절)

### 7.5 데이터 확장

- 실천·소비 데이터 축적 후 **개인화된 회고 문장 배정**(현재는 비복원 무작위 추출)
- 업종별 소비 패턴 기반 **계획 금액 제안**

이들 개선은 4영역 구조를 완성하고, 사전 개입의 사각지대를 좁히며, 성장 주장의 근거를 외부 검증으로 옮기는 방향으로 정렬된다.

---
## 8. 성과 측정 요구사항

> **추가 챕터** — ISO/IEC/IEEE 29148:2018 **§6.3.3.3**(stakeholder needs often include measures of effectiveness) · **§6.6.3 Measurement for requirements**. 사내 SRS 표준 양식에는 성과 지표 절이 없으나, PRD v1.0은 북극성 KPI와 보조 KPI를 조작적 정의 수준까지 확정해 두었고 이것이 12장 롤아웃 게이트의 판정 입력이므로 별도 챕터로 담는다.

### 8.1 북극성 KPI — WPA (Weekly Practiced Active)

```
WPA(주차 w) = 분자 / 분모

분자 — 주차 w 동안 「실천 트리거」로 별을 1회 이상 받은 아동 수
       (practice_credited 이벤트가 1건 이상 있는 distinct child_id)

분모 — 주차 w 「활성 아동」 수
       = 주차 w 시작 시점에 아래 3조건을 모두 만족하는 아동
         ① 법정대리인 동의 완료                (REQ-REG-001)
         ② 아이 계정 생성 후 7일 경과          ← 온보딩 별의 실천 과대계상 차단
         ③ 직전 28일 내 앱 세션 1회 이상       ← 완전 이탈 계정 제외

주차 기준 — ISO 주(월~일) · KST · 마감 후 D+1 배치
```

| 항목 | 값 |
| --- | --- |
| **분자 산입 트리거** | **WPA-v1 (MVP)** — 트리거 4 미션 승인 · 5 소비 회고 · 6 위시리스트 = **3종**<br>**WPA-v2 (F15 개통 후)** — v1 + 트리거 7 · 8 예적금 = **5종** |
| **제외 규칙** | 트리거 1 온보딩 학습 · 2 출석체크 · 3 퀴즈 정답. 셋 다 **학습 경로**이며, 특히 출석 별이 분자에 들어가면 *"접속만으로 실천 지표가 오르는"* 활동량 지표로 퇴화한다 |
| **기준선** | ⬜ — 프로토타입 2주차(D+14) 첫 산출. 대체재에 대응 지표가 없어 외부 기준선이 존재하지 않는다 |
| **목표** | β 클로즈드 **≥ 5/8 가정**(n=8) → 일반 공개 후 **≥ 55%** 2주 연속 |
| **FAIL 선** | β **≤ 2/8** · 일반 공개 **< 40%** → 실험 E4 조치(성장 조건 난이도 재조정) 발동 |
| **측정 경로** | `practice_credited` + 활성 아동 스냅샷 |
| **버전 전환 규칙** | WPA-v2 전환 시 **시계열을 단절 표기**하고, 전환 후 4주간 v1·v2를 **병기**한다 |

> **WPA-v1이 3종인 것은 성능 문제가 아니라 정의다.** 예적금(REQ-FUNC-015)이 Could이고 자동 개입 트리거를 채택하지 않았으므로 MVP의 실천 경로는 구조적으로 3종이다 (ADR-001 · ADR-003 · ADR-006).

### 8.2 3구간 판정 규칙

모든 KPI · 인수 기준 · 검증 실험에 공통 적용한다.

| 구간 | 판정 | 행동 |
| --- | --- | --- |
| 통과선 이상 | ✅ **PASS** | 다음 게이트로 진행 |
| 통과선 미달 ~ 실패선 초과 | ⚠️ **HOLD** | **표본 +4 추가 후 재판정.** 2회 연속 HOLD면 **FAIL로 간주** · 그 사이 로드맵 변경 없음 |
| 실패선 이하 | ✕ **FAIL** | 지정된 재설계를 실행하고 다음 판본에 반영 |

| 지표 | PASS | HOLD | FAIL |
| --- | --- | --- | --- |
| 나무 5초 회상 (MOE-01) | **≥ 6/8** | 4~5/8 | **≤ 3/8** |
| 첫 실천 인정률 (MOE-04) | ≥ 60% | 40~59% | < 40% |
| 계획 카드 작성률 (MOE-07) | ≥ 50% | 30~49% | < 30% |
| 정체 원인 열람률 (MOE-10) | ≥ 60% | 40~59% | < 40% |
| WPA (β 기준) | ≥ 5/8 | 3~4/8 | ≤ 2/8 |
| WPA (일반 공개) | ≥ 55% (2주 연속) | 40~54% | < 40% |
| 보호자 확인 소요시간 (MOE-02) | 중위 ≤ 3분 | 3~8분 | > 8분 |
| 실천 경로 도달률 (MOE-06) | ≥ 70% | 50~69% | < 50% |
| 회고 체류 중위 | ≥ 3초 | 2~3초 | < 2초 |
| 결제↔계획 카드 매칭 정확도 | ≥ 90% | 80~89% | < 80% |
| 아이 정지 → 보호자 인지 (MOE-13) | ≤ 3일 | 4~7일 | > 7일 |
| 카드 연결률 | ≥ 60% | 40~59% | < 40% |

### 8.3 보조 KPI (Measures of Effectiveness)

> `⬜` 는 **기준선 실측 전**이라는 뜻이며 목표가 미정이라는 뜻이 아니다. 「기준선 확보」 열이 실측 시점을 못박는다.

| ID | Outcome | 지표 | 기준선 | **목표** | 기준선 확보 | 주기 | 측정 창구 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **MOE-01** | 변화가 한 문장으로 읽힌다 | 나무 5초 노출 후 1문장 회상 성공률 | ⬜ | **≥ 6/8** | 인터뷰 1회차 T3 | 인터뷰 회차 | 인터뷰 T3 rubric (κ ≥ 0.6) |
| **MOE-02** | 확인이 짧아진다 | 보호자 주 1회 확인 소요시간 | **15분** *(대체재)* | **중위 ≤ 3분** | ✅ 확보 | 주간 | `forest_view_opened.dwell_ms` p50 |
| **MOE-03** | 보호자–자녀 대화가 생긴다 | 돈 이야기 월 횟수 | ⬜ | **월 2회** | 인터뷰 1회차 | 월간 | 자기보고 단독 — **게이트 기준 아님** |
| **MOE-04** | 첫 실천이 반영된다 | 가입 후 7일 내 첫 실천 인정률 | ⬜ | **≥ 60%** | 프로토타입 1주차 | 주간 | `practice_credited` 가입 코호트 |
| **MOE-05** | 네 영역이 고르게 자란다 | 월말 4영역 중 2영역 이상 성장 가정 비율 | ⬜ | **≥ 50%** | 프로토타입 1개월차 | 월간 | `tree_state_changed` 월말 스냅샷 |
| **MOE-06** | 실천 경로가 실제로 쓰인다 | 실천 트리거 3종 중 1종 이상 도달 아동 비율 | ⬜ | **≥ 70%** | 프로토타입 1개월차 | 월간 | `practice_credited.trigger_code` distinct |
| **MOE-07** | 쓰기 전에 적은 기록이 남는다 | 계획 카드 작성 건수 ÷ 카드 결제 건수 | **0%** | **≥ 50%** | ✅ 확보 | 주간 | `plan_card_created ÷ payment_settled` — **REQ-FUNC-007·008의 생존 조건** |
| **MOE-08** | 소비가 기록으로 남는다 | 아이 소비 건수 중 앱 기록 비율 | **0%** *(현금)* | **100%** | ✅ 확보 | 주간 | 카드 결제 원장 |
| **MOE-10** | 멈춘 이유를 알 수 있다 | 정체 원인 표시 열람률 · 실천 근거 열람률 | **0%** | **≥ 60%** | ✅ 확보 | 월간 | `tree_view_opened.stall_reason_shown` · `.evidence_expanded` |
| **MOE-13** | 아이가 멈춘 것을 보호자가 곧 안다 | 아이 루프 정지 → 보호자 인지 일수 | **30일** *(대체재)* | **≤ 3일** | ✅ 확보 | 주간 | `inactivity_notified` |
| **MOE-14** | 보호자 루프가 돈다 | 다음 달 충전율 · 월간 숲 익월 재방문율 | ⬜ | **≥ 70% / ≥ 50%** | 프로토타입 2개월차 | 월간 | 충전 원장 · `forest_view_opened` |
| **MOE-15** | 인정이 끊기지 않는다 | 승인 지연 시 별 소급 지급 성공률 | **0%** | **100%** *(불변)* | ✅ 확보 | 주간 | `approval_state_changed(state=backfilled)` |
| **MOE-16** | 회고가 형식화되지 않는다 | 회고 화면 체류 중위 · 동일 문장 재노출률 | ⬜ | **≥ 3초 · ≤ 2/8** | 프로토타입 2주차 | 주간 | `retro_viewed.dwell_ms` p50 · `sentence_id` 중복률 |
| **MOE-17** | 아이가 계속 온다 | 아이 3일 / 7일 재접속률 | ⬜ | **≥ 65% / ≥ 50%** | 프로토타입 1주차 | 주간 | 세션 로그 코호트 |
| **MOE-18** | 수익 구조가 성립한다 | 카드 연결률 · 아동 1인당 월 결제액 | **0% / 0원** | **≥ 60% / ≥ 30,000원** | ✅ 확보 | 월간 | 카드 등록 ÷ 온보딩 완주 · 결제 원장 ÷ 활성 아동 |

> **MOE-18 목표값 산출 근거** — 페르소나 충전액 중위(주 6,500원 × 4.3주 ≈ **28,000원**)의 소진율 100%를 상한으로 잡고 30,000원을 목표로 둔다. 손익 조건 **`월 결제액 × 우리 몫 수수료율 ≥ 아동 1인당 월 원가`** 의 우변은 검증과제 ⑥에서 확정한다 (REQ-NF-021 · REQ-NF-022).

---

## 9. 사용자 스토리 및 인수 기준

> **추가 챕터** — ISO/IEC/IEEE 29148:2018 **§9.6.5 Product functions** · **§9.6.6 User characteristics**. 4장 요구사항표의 「인수 기준」 열은 요약이며, **본 장이 판정의 원본**이다. 두 내용이 어긋나면 본 장을 따른다.

### 9.1 사용자 특성 및 스토리 목록

**주 사용자 2인**

| 구분 | H1 유형 (보호자) | H2 유형 (보호자) |
| --- | --- | --- |
| 프로필 | 39세 · 교사 · 자녀 만 8세 · 용돈앱 8개월 사용 · 응답 당일 | 42세 · 자영업(주 6일 · 07~20시) · 자녀 만 9세 · 현금 봉투 3년 · 확인 주 1회 |
| Job | 배운 것이 실제 돈 행동으로 이어졌는지를 **짧은 시간에 확인**하고 싶다 | 쓰기 전에 한 번 멈추게 하고, 그 선택이 **기록으로 남게** 하고 싶다 |
| 대체재 한계 | 학습현황을 **"보고도 모른다"** | 현금 봉투 — **"볼 것이 없다"** (기록 0건) |
| 진입 후크 | 성장 나무 · 월간 숲 | **소비 계획 카드 · 계획↔실제 대조** |
| 이탈 트리거 | 나무 **2주 이상 정체** → 아이 탓이 아니라 **앱 불신**으로 조용히 이탈 | 약속한 것이 실제로 동작하지 않으면 즉시 이탈 |
| 기기 조건 | 아이 전용 태블릿 (집 안) | 아이 키즈워치 |

> 🔴 **두 인물 모두 「전용 스마트폰을 들고 다니는 아이」가 아니다.** ADR-003이 자동 알림 대신 계획 카드를 택한 직접적 근거이며, 계획 카드는 **보호자 폰에서도 작성 가능**하다.

**포용성 대상** — 보호자 응답이 48시간 이상 지연되거나 부재한 가정. 여정지도에서 **P0**이며 REQ-FUNC-011(소급 지급)이 대응한다.

**스토리 목록**

| ID | 스토리 | Job | 대응 요구사항 | AC 수 |
| --- | --- | --- | --- | --- |
| **US-1** | 변화를 한 문장으로 읽는다 | J2 행동 변화 보여주기 | REQ-FUNC-005 · 009 | 4 + 예외 2 |
| **US-2** | 첫 실천 한 건이 나무에 반영된다 | J1 실천할 자리 만들기 | REQ-FUNC-002 · 005 | 4 + 예외 3 |
| **US-3** | 멈춘 이유를 화면에서 안다 | J2 행동 변화 보여주기 | REQ-FUNC-005 | 3 + 예외 2 |
| **US-4** | 쓰기 전에 미리 적어둔다 | J1 실천할 자리 만들기 | REQ-FUNC-007 · 008 | 4 + 예외 3 |
| **US-5** | 참은 날이 확인만 한 날과 다르다 | J1 실천할 자리 만들기 | REQ-FUNC-008 | 6 + 예외 2 |
| **US-6** | 보호자가 늦어도 내가 한 일이 사라지지 않는다 | J3 끊김 방지 | REQ-FUNC-004 · 011 | 3 + 예외 3 |
| **US-7** | 아이가 멈춘 것을 3일 안에 안다 | J3 끊김 방지 | REQ-FUNC-012 | 3 + 예외 3 |
| **US-8** | 시간을 쪼개서 시작할 수 있다 | J3 끊김 방지 | REQ-FUNC-001 · 016 | 3 + 예외 2 |

**합계 — 스토리 8개 · 인수 기준 30개 + 예외 인수 기준 20개 = 50개.** 모든 스토리가 **실패 케이스 2개 이상**을 갖는다.

### 9.2 인수 기준 판정 규칙

**① 정수 임계치 환산 (n=8 인터뷰 지표)**

n=8에서 `≥70%`는 5.6명이라 정수 경계가 불명확하다. **모든 인터뷰 인수 기준은 `k/8` 로 표기**한다.

| 비율 표기 | 정수 판정 | 실제 비율 |
| --- | --- | --- |
| ≥ 70% | **≥ 6/8** | 75% |
| ≥ 60% | **≥ 5/8** | 62.5% |
| ≤ 30% | **≤ 2/8** | 25% |

**② 코딩 규칙 (rubric)**

| 판정 대상 | 성공 조건 | 코딩 방식 |
| --- | --- | --- |
| 「변화 회상」 성공 | 응답에 ① 비교 시점 ② 변화 방향 ③ 대상 세 요소가 모두 포함 | 진행자 외 **코더 2인 독립 코딩** |
| 「실천」 도달 | *"실천"·"실제로 했다"·"참았다"·"미션"* 중 하나를 **진행자 개입 없이** 발화 | 동일 |
| 오귀인 발화 | 정체 원인을 **아이의 능력·의지**로 귀속 | 동일 |
| 앱 불신 발화 | 정체 원인을 **앱의 신뢰성**으로 귀속 | 동일 |

- **일치도 기준** — Cohen's **κ ≥ 0.6**. 미달 시 코딩 규칙을 조정하고 **전 표본 재코딩**
- **불일치 항목** — 제3자(리뷰어)가 판정하고 사유를 기록
- **5초 노출 통제** — 타이머 + 화면 덮기 도구 사용. **노출 오차 ±0.5초 초과 세션은 표본에서 제외**하고 제외 건수를 보고

**③ 표본 미확보 시 판정 규칙**

| 확보 표본 | 판정 |
| --- | --- |
| n ≥ 8 | 정상 판정 |
| 5 ≤ n < 8 | ⚠️ **HOLD 고정** — PASS 판정을 내리지 않는다. 비율 환산 금지 |
| n < 5 | **판정 불가** — 실험 미실시로 기록 |

### 9.3 인수 기준 상세 (Given / When / Then)

#### US-1 — 변화를 한 문장으로 읽는다 · REQ-FUNC-005 · 009

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 이번 달 실천 기록이 1건 이상인 계정 / **When** 성장 나무를 **5초만** 노출하고 덮은 뒤 기억나는 것을 묻는다 / **Then** *"이번 달 행동이 어떻게 달라졌나"* 를 **1문장으로 회상 ≥ 6/8** | 인터뷰 T3 · n=8 · rubric 코딩 |
| AC2 | **Given** 나무 상세를 펼치지 않은 기본 상태 / **When** *"나무가 자랐다는 건 아이가 뭘 했다는 뜻인가"* 를 묻는다 / **Then** **진행자 개입 0회로 「실천」에 도달 ≥ 6/8**. *"퀴즈를 많이 풀어서"* 만 나오면 **실패** | 인터뷰 Q1-8 · 개입 횟수 로그 |
| AC3 | **Given** 전월 데이터가 존재 / **When** 월간 숲에서 *"지난달과 비교해 뭐가 달라졌는지 찾아보라"* 고 한다 / **Then** **전월 대비 변화 항목을 60초 이내 3개 이상 지목 ≥ 6/8** · 확인 소요 **중위 ≤ 3분** | 인터뷰 Q1-10 + 인앱 세션 시간 |
| AC4 | **Given** 아이가 별을 즉시 소진해 잔액이 0인 계정 / **When** 월간 숲을 연다 / **Then** **「이번 달 획득 별」이 스크롤 없이 노출**되고 누적 성과를 지목할 수 있다 **≥ 6/8** | 인터뷰 Q1-11 · 화면 캡처 검수 |
| **AC-E1** | **Given** 이번 달 실천 기록이 **0건** / **When** 성장 나무를 연다 / **Then** **"아직 기록이 없어요 + 첫 실천 안내"** 가 표시되고 **빈 화면을 앱 결함으로 인식한 응답자 ≤ 2/8** | 인터뷰 · 화면 검수 |
| **AC-E2** | **Given** 가입 첫 달로 **전월 데이터 없음** / **When** 월간 숲을 연다 / **Then** 「지난달과 비교」 영역이 **"다음 달부터 비교할 수 있어요"로 대체**되고 **델타 0으로 렌더되지 않는다** | 화면 검수 |

#### US-2 — 첫 실천 한 건이 나무에 반영된다 · REQ-FUNC-002 · 005

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 가입 7일 이내 아동 / **When** 실천 트리거 3종 중 1종을 최초 완료한다 / **Then** **별 지급 + 나무 진행도 갱신이 동일 세션 내 반영** · **7일 내 첫 실천 인정률 ≥ 60%** | 인앱 이벤트 · 프로토타입 1~2주 |
| AC2 | **Given** 학습만 완료하고 실천 0건인 아동 / **When** 퀴즈를 추가로 풀어 학습·정답 조건을 초과 충족한다 / **Then** **나무 단계는 상승하지 않는다** · 화면에 **"실천 N회 남음"** 이 명시된다 | 단위 테스트 + 화면 검수 |
| AC3 | **Given** 운영 1개월 / **When** 월말에 집계한다 / **Then** **4영역 중 2영역 이상 성장한 가정 ≥ 50%** · **4영역 전부 씨앗 정체 가정 ≤ 15%** | 인앱 집계 · 월간 |
| AC4 | **Given** 「불리기」 실천 경로가 잠김 / **When** 아이가 「불리기」 영역을 연다 / **Then** **"곧 열려요" 안내가 표시**되고 4영역 미개통이 결함으로 오인되지 않는다 | 화면 검수 + 인터뷰 Q2-3 |
| **AC-E1** | **Given** 아동 기기가 **오프라인** / **When** 실천을 완료하고 이후 재연결된다 / **Then** **별 중복 지급 0건**(`idempotency_key`) · 반영 **≤ 60초** · 주차 귀속은 **`client_ts` 기준** | 단위 테스트 + `practice_credited` |
| **AC-E2** | **Given** 동일 미션 승인 요청이 **2회 이상** 발생 / **When** 보호자가 각각 승인한다 / **Then** **별은 1회만 지급**되고 원장 **불일치 0건** | 단위 테스트 + `star_ledger_entry` |
| **AC-E3** | **Given** 실천 조건은 충족했으나 **학습·퀴즈 조건 미충족** / **When** 나무 화면을 연다 / **Then** **승급하지 않고** 남은 조건이 **조건별로 각각 표시**된다 | 단위 테스트 + 화면 검수 |

#### US-3 — 멈춘 이유를 화면에서 안다 · REQ-FUNC-005

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 특정 영역이 **14일 이상 미상승** / **When** 보호자가 그 영역을 연다 / **Then** **정체 원인이 조건 단위로 표시**된다 · **열람률 ≥ 60%** | 인앱 화면 로그 · 월간 |
| AC2 | **Given** 동일 상황 / **When** *"무슨 일이 있었다고 생각하느냐"* 를 묻는다 / **Then** **오귀인 발화 ≤ 2/8** · **앱 불신 발화 ≤ 2/8** | 인터뷰 Q1-9 · rubric(κ ≥ 0.6) |
| AC3 | **Given** 정체 원인 표시를 본 보호자 / **When** 다음 주 동일 화면에 재방문한다 / **Then** **정체 계정의 익주 재방문율 ≥ 50%** | 인앱 세션 로그 |
| **AC-E1** | **Given** 정체 원인이 **복수** / **When** 정체 원인을 표시한다 / **Then** **미충족 조건을 전부 표시**하고 **「가장 적게 남은 조건」을 최상단**에 둔다 | 화면 검수 |
| **AC-E2** | **Given** 정체가 **주기 초기화 직후**에 발생 / **When** 보호자가 화면을 연다 / **Then** **「정체」로 표시하지 않는다** — 판정은 **주기 시작 후 14일 경과분에만** 적용 · **오탐 0건** | 단위 테스트 |

> 🔴 **AC2가 이 스토리의 핵심이다.** 이 문제는 *"아이 탓"* 보다 **"앱을 안 믿게 된다"** 로 나타난다 — 오귀인은 대화라도 생기지만 **불신은 신호 없이 이탈**한다. 두 경로를 모두 계측한다.

#### US-4 — 쓰기 전에 미리 적어둔다 · REQ-FUNC-007 · 008

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 아이 또는 보호자가 계획 카드를 연다 / **When** **어디서 · 업종 · 얼마까지**를 입력한다 / **Then** 카드가 저장되고 **업종은 카드 승인 데이터의 업종 코드와 대조 가능한 값**으로 기록된다 | 단위 테스트 + 화면 검수 |
| AC2 | **Given** 계획 카드가 존재하는 아동 / **When** 카드 결제가 발생한다 / **Then** **결제가 계획 카드에 자동 매칭**되고 **정확도 ≥ 90%** | 결제 매칭 로그 · 수동 대조 50건 |
| AC3 | **Given** 계획 카드가 **없는** 상태에서 결제 발생 / **When** 아이가 앱을 연다 / **Then** **「다음엔 가기 전에 적어볼까요?」 유도**가 노출되고 **별이 지급되지 않는다** | 단위 테스트 + 화면 검수 |
| AC4 *(생존 조건)* | **Given** 운영 4주 / **When** 계획 카드 작성률을 집계한다 / **Then** **카드 결제 건 대비 작성률 ≥ 50%** | `plan_card_created ÷ payment_settled` |
| **AC-E1** | **Given** 한 계획 카드에 **여러 건의 결제**가 매칭 / **When** 대조 화면을 만든다 / **Then** **합계로 판정**하고 업종별 내역을 모두 나열한다 | 단위 테스트 |
| **AC-E2** | **Given** 계획한 업종과 **다른 업종에서만** 결제 (금액은 계획 이내) / **When** 대조 화면을 만든다 / **Then** **별 1개를 지급**하고 `plan_met=true` `category_met=false`로 기록 · 회고는 **「업종이 달랐어요」 갈래**로 분기 | 단위 테스트 + `retro_viewed` |
| **AC-E3** | **Given** 업종 코드가 **`UNKNOWN`** 으로 내려옴 / **When** 매칭을 시도한다 / **Then** **가맹점명 문자열 일치**로 2차 매칭하고, 실패 시 **금액만으로 판정**한다 · `match_method`를 적재해 **정확도 산출에서 분리 집계** | 결제 매칭 로그 |

#### US-5 — 참은 날이 확인만 한 날과 다르다 · REQ-FUNC-008

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 7일 내 회고를 3회 이상 수행한 아동 / **When** 회고 문장을 제시한다 / **Then** **동일 문장 재노출률 ≤ 2/8**(비복원 추출) | 인앱 문장 배정 로그 |
| AC2 | **Given** 회고 화면 진입 / **When** [확인했어요]를 누른다 / **Then** **체류 중위 ≥ 3초** · 체류 1초 미만 **≤ 20%** | 인앱 화면 체류 로그 |
| AC2-1 *(갈래 A)* | **Given** 실제 결제액 **≤** 계획 금액 / **When** [확인했어요]를 누른다 / **Then** **별 1개 지급** · `star_granted=true` `plan_met=true` | 단위 테스트 + 인앱 이벤트 |
| AC2-2 *(갈래 B)* | **Given** 실제 결제액 **>** 계획 금액 / **When** [확인했어요]를 누른다 / **Then** **회고 문장은 동일하게 제시**되나 **별 미지급** · `star_granted=false` `plan_met=false` · **보유 별을 차감하지 않는다** | 단위 테스트 + 인앱 이벤트 |
| AC2-3 *(갈래 B 이탈 감시)* | **Given** 계획 초과로 별을 받지 못하는 건 / **When** 회고가 대기한다 / **Then** **회고 열람률이 계획 준수 건 대비 ≥ 70%** | `retro_viewed` 갈래별 열람률 |
| AC3 | **Given** 계획 초과일과 계획 준수일 / **When** 각각 회고를 완료한다 / **Then** **회고 문장이 서로 구별**되고 보호자가 화면만 보고 구분 **≥ 6/8** | 화면 검수 + 인터뷰 Q1-15 |
| **AC-E1** | **Given** 회고 문장 풀 **잔여 20% 이하** / **When** 다음 회고를 배정한다 / **Then** **운영 알림이 발송**되고 재사용 전에 **풀 확장이 요구**된다 | 문장 풀 잔여율 모니터 |
| **AC-E2** | **Given** 회고 미완 상태에서 **다음 소비 발생** / **When** 아이가 앱을 연다 / **Then** **미완 회고가 큐에 쌓여 순서대로 제시**되고 **큐 3건 초과 시 오래된 건을 「요약 회고」로 병합** | 단위 테스트 + 화면 검수 |

#### US-6 — 보호자가 늦어도 내가 한 일이 사라지지 않는다 · REQ-FUNC-004 · 011

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 미션 완료 후 보호자 미승인 48시간 경과 / **When** 보호자가 이후 승인한다 / **Then** **완료 시점 기준으로 소급 지급** · **성공률 100%** | 인앱 이벤트 · 단위 테스트 |
| AC2 | **Given** 승인 대기 1건 이상 / **When** 보호자가 성장 나무를 연다 / **Then** **「승인 대기 N건」이 표시**되어 *"이번 주엔 안 했구나"* 라는 반대 결론을 막는다 | 화면 검수 · 인터뷰 |
| AC3 | **Given** 아이 화면 / **When** 승인 대기 상태를 본다 / **Then** **「대기 중」이 「미실천」과 시각적으로 구별**된다 | 화면 검수 |
| **AC-E1** | **Given** 보호자가 **거절** / **When** 거절이 확정된다 / **Then** **별 미지급** · **「승인되지 않음 + 사유」** 표시 · **「미실천」과 시각 구별** · 실천 카운트 **미가산** | `approval_state_changed` · 화면 검수 |
| **AC-E2** 🔴 | **Given** 완료 시점 주기(N)가 **이미 종료**되고 보호자가 주기 N+1에 승인 / **When** 소급 지급이 실행된다 / **Then** **별은 지급**하되 **나무 조건은 주기 N에 귀속**되어 **N+1 나무에 가산하지 않는다.** **월간 숲(주기 N 스냅샷)에 반영**되고 *"지난 달 실천으로 인정됐어요"* 표시 | 단위 테스트 + `cycle_id` |
| **AC-E3** | **Given** 승인 대기 **5건 이상** 누적 / **When** 보호자가 앱을 연다 / **Then** **일괄 승인 경로**가 제공되고 **각 건의 완료 시각 기준으로 개별 소급** 처리된다 | 단위 테스트 |

#### US-7 — 아이가 멈춘 것을 3일 안에 안다 · REQ-FUNC-012

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 아동 최종 접속 후 **72시간 경과** / **When** 배치가 실행된다 / **Then** **발송률 100%** · **정지 → 인지 ≤ 3일** | 발송·열람 로그 |
| AC2 | **Given** 미접속 알림 수신 / **When** 보호자가 알림을 연다 / **Then** **아이가 멈춘 지점(영역·조건)이 함께 표시**된다 | 화면 검수 |
| AC3 | **Given** 보호자가 야간에만 확인 가능 / **When** 알림을 발송한다 / **Then** **발송 시간대 조정 가능** · 알림 열람률 **≥ 50%** | 인앱 설정 + 열람 로그 |
| **AC-E1** | **Given** 보호자가 **푸시 차단** / **When** 72시간 미접속이 판정된다 / **Then** **앱 내 배너 + (동의 시) 문자**로 대체 발송되고 **차단 상태가 계측**된다 · MOE-13 산출에서 **별도 집계** | 권한 상태 + `inactivity_notified` |
| **AC-E2** | **Given** 아동이 **앱을 삭제** / **When** 72시간 판정 시점이 온다 / **Then** 문구가 **「재설치 안내」로 분기**되고 **다른 이벤트 코드**로 적재된다 | 이벤트 코드 검수 |
| **AC-E3** | **Given** 미접속 **71시간** 시점에 아이가 재접속 / **When** 배치가 실행된다 / **Then** **알림을 발송하지 않는다** — **오탐 0건** | 단위 테스트 |

#### US-8 — 시간을 쪼개서 시작할 수 있다 · REQ-FUNC-001 · 016

| # | Given / When / Then | 측정 도구 · 표본 |
| --- | --- | --- |
| AC1 | **Given** 온보딩 5단계 중 2단계까지 진행 / **When** 앱을 종료하고 다음 날 재진입한다 / **Then** **직전 단계에서 이어서 시작** · 재입력 항목 **0건** | 인앱 이벤트 · 단위 테스트 |
| AC2 | **Given** 카드 배송 대기 상태 / **When** 아이가 앱을 연다 / **Then** **학습·퀴즈·별 획득이 가능**하고 카드 필요 기능만 잠긴다 | 화면 검수 |
| AC3 | **Given** 온보딩 시작 / **When** 완주까지의 소요를 측정한다 / **Then** **세션 분할 시 총 소요 중위 ≤ 10분** · **3단계 이탈률 ≤ 30%** | `onboarding_step` 퍼널 |
| **AC-E1** | **Given** 카드 신청 단계에서 **외부 API 실패** / **When** 오류가 반환된다 / **Then** **입력값이 24시간 보존**되고 재진입 시 **재입력 0건** · 오류 사유가 사용자 언어로 표시된다 | 단위 테스트 + 화면 검수 |
| **AC-E2** | **Given** 온보딩 중 **세션 만료** / **When** 재로그인한다 / **Then** **직전 완료 단계에서 재개**되고 **동의 단계는 재확인**한다 *(동의는 캐시하지 않음)* | 단위 테스트 |

---

## 10. 가정 · 의존성 · 제약 · 리스크

> **추가 챕터** — ISO/IEC/IEEE 29148:2018 **§9.6.8 Assumptions and dependencies** · **§9.6.7 Limitations** · **§5.2.8**(요구사항 속성 중 Risk).

### 10.1 제약 — 본 릴리즈가 다루지 않는 사용자 문제

> 아래는 **결함이 아니라 결정**이다. 각 항목에 「왜 뺐는가」와 「언제 다시 보는가」를 명시한다.

| 범위 밖 | 내용 | 결정 근거 | 재검토 시점 |
| --- | --- | --- | --- |
| 소비 **직전 자동 개입** | 자동 발동 수단 없음 | **ADR-003** — 계획 카드가 사전 수단을 담당한다. 못 잡는 대상이 「3분 미만 소비」에서 **「계획을 적지 않은 소비」** 로 이동했다 | 계획 카드 작성률(MOE-07) 4주 실측 후 |
| **온라인 결제 사전 개입** | 대응 수단 0개 | 온라인 결제는 계획 카드를 적을 계기가 **구조적으로 없다** | v1.1 — 7.2절 |
| 「불리기」 **실천 경로** | 학습만 개통, 실천 잠금 | **ADR-006** — REQ-REG-004 법률 검토 대기 | 검증과제 ⑤ 완료 시 |
| 학습이 **행동 변화로 이어진다는 연결** | 설계 근거로 서 있고 고객 문제로는 지탱되지 않음 | 자체 재현 검증 필요 | 검증과제 ① · 실험 E6 · E10 |

### 10.2 가정

| 가정 | 확정 방법 | 기한 | 추적 |
| --- | --- | --- | --- |
| 보호자가 **금융 집중을 원한다** | 인터뷰 H1-3 (검증과제 ① · 실험 E6) | 인터뷰 1회차 | R3 |
| 실천 증가가 **실제 소비·저축 행동 변화로 이어진다** | E10 3개월 종단 관찰 | 프로토타입 3개월차 | R2 |
| 보호자가 **미션에 걸린 이자를 실제로 준다** | 검증과제 ③ | 인터뷰 1회차 | — |
| 기회점수 순위가 **우선순위 판단으로 유효하다** | 인터뷰 후 재채점 | 8슬롯 완료 시 | — |

### 10.3 의존성

| 의존성 | 확정 방법 | 기한 | 영향 요구사항 | 추적 |
| --- | --- | --- | --- | --- |
| 🔴 제휴사 **수수료율 · 최소 물량** | 검증과제 ⑥ | **S3 종료 전** | REQ-NF-021 · 022 · MOE-18 | R4 |
| 🔴 제휴사 **결제내역 API 업종 코드 체계** | 계약 협의 + 샘플 데이터 검증 | **S3 종료 전** | **REQ-FUNC-008 착수 조건** · REQ-NF-005 | R5 |
| 🔴 예적금 **중개업 해당 여부** | 법률 검토 (검증과제 ⑤) | **S6 착수 전** | **REQ-FUNC-015 착수 조건** · REQ-REG-004 | — |
| **3D 에셋 납품** (5종 × 8벌) | 외주 발주 — 사양은 ADR-007 | **S3 착수 전** | REQ-FUNC-006 | R9 |
| **본인인증 SDK · 푸시 채널 계약** | 벤더 선정 | **S1 착수 전** | REQ-FUNC-001 · 012 | — |

> ✅ **해소된 의존성** — *아이 기기에서 알림 수신 가능 여부*는 **ADR-003으로 소멸**했다. *위치정보법 만 14세 미만 동의 요건*은 **위치정보 미수집으로 적용 없음**이다.

### 10.4 리스크 및 대응

| # | 리스크 | 영향 | 완화책 | 조기 경보 지표 |
| --- | --- | --- | --- | --- |
| **R1** 🔴 | **계획 카드 작성률 미달** — 만들어도 적지 않으면 사전·사후가 함께 무너진다 | REQ-FUNC-007·008이 대조할 데이터를 잃음 | 4주 실측 후 50% 미만이면 **작성 진입점을 결제 직후 회고 화면에 추가**하는 UX 재설계 발동 | `plan_card_created ÷ payment_settled` **< 50% 2주 연속** |
| **R2** 🔴 | **「성장」이 실제 성장인지 증명되지 않음** | 제3자 검증 없이 성과로 말하면 반박당함 | 대외 문구를 **「설계상 그렇게 되도록 만들었다」** 까지로 제한 · **E10 3개월 종단**으로 자체 재현 확인 | E10 3지표 **3개월 연속 불변** |
| **R3** 🔴 | **「금융 순도」가 확정 차별점이 아님** | 4영역 매핑이 흔들려 측정 축까지 재설계 | 인터뷰 H1-3 최우선 배치 · 선언 ②는 과목 구성과 무관하므로 포지션 유지 | E6 분기 **(c) ≥ 3/8** |
| **R4** 🔴 | **수익 산출식의 우변(원가·수수료율) 미확인** | 손익분기 판정 불가 | 검증과제 ⑥을 **S3 종료 전** 완료 · 그때까지 좌변 목표로 운영 | 카드 연결률 **< 40%** 또는 월 결제액 **< 20,000원** 2개월 연속 |
| **R5** 🔴 | **제휴사 업종 코드 상세도 부족** | REQ-NF-005 미달 → 대조 화면 신뢰 상실 → REQ-FUNC-014까지 연쇄 실패 | **계약 시 코드 체계 명시** + 샘플 데이터 사전 검증 · 가맹점명 2차 매칭 · 금액 단독 폴백 | 매칭 정확도 **< 90% 2주 연속** · `amount_only` **> 20%** |
| **R6** | **모집단 연 5~12% 감소** | 시장 분모가 해마다 줄어듦 · 진입 속도 자체가 경쟁력 | 연도 변경 시 세그먼트 재산출 · 스프린트 계획을 **6스프린트(12주) 내로 압축** | 연 1회 학생 수 추계 갱신 |
| **R7** | **가격 경쟁 봉쇄** — 최대 경쟁자가 이미 0원 | 기능 모방 시 즉시 카피 대상 | **운영·생산 / 기술 개발** 두 활동에 자원 집중 · E11 분기 재점검 | E11 — 경쟁사가 「변화 지표」 화면 출시 |
| **R8** | **아이 문제가 보호자 화면에 신호로 나타나지 않음** | 아이가 멈춰도 보호자는 최대 한 달 뒤 인지 | **REQ-FUNC-012를 Should에서 내리지 않는다** · 푸시 차단 계정은 배너 + 문자 대체 | MOE-13 **> 7일** · 푸시 차단 계정 비율 |
| **R9** | **3D 에셋 납품 지연이 S3를 막음** | 아이 동기 장치 없이 프로토타입 진입 | **발주를 S1과 동시 착수** · 1차 납품을 **2종 × 4벌**로 축소 | 발주 후 6주차 납품 진척 **< 50%** |

---

## 11. 설계 결정 근거 (ADR)

> **추가 챕터** — ISO/IEC/IEEE 29148:2018 **§5.2.8**(요구사항 속성 중 **Rationale**) · **§9.6.16 Design constraints**. 본 장의 결정을 바꾸려면 **새 ADR을 쓰고 이전 것을 Superseded로 표시**한다. 각 ADR은 **어떤 비즈니스 가설을 검증하기 위한 구조인지**를 「검증 연결」에 명시한다 — 구조가 가설 검증을 막으면 그 구조가 틀린 것이다.

| ID | 결정 | 영향 요구사항 | 검증 연결 |
| --- | --- | --- | --- |
| **ADR-001** | 북극성 KPI를 **WPA 단일 지표**로 둔다 | 8.1 · REQ-FUNC-002 | E4 · β 게이트 WPA ≥ 5/8 |
| **ADR-002** | 보상을 **별 / 나무 / 숲 3층**으로 분리하고 나무는 3단계 고정 | REQ-FUNC-002 · 005 · 009 | E1 · E2 · E8 (r ≤ 0.3) |
| **ADR-003** | 사전 개입을 **자동 트리거가 아니라 계획 카드**로 구현한다 | REQ-FUNC-007 · 008 · REQ-REG-002 | **E3 · MOE-07 (작성률 ≥ 50%)** |
| **ADR-004** | 계획↔실제는 **금액 기준 단독 판정** | REQ-FUNC-008 | E10 3지표 |
| **ADR-005** | 선불전자지급수단을 **제휴사에 위탁**(B안) | 3장 · REQ-REG-008 · 009 | 카드 연결률 ≥ 60% · 검증과제 ⑥ |
| **ADR-006** | 「불리기」는 **학습만 개통**하고 실천은 잠근다 | REQ-FUNC-003 · 015 · REQ-REG-004 | E6 · 「불리기」 완주율 격차 |
| **ADR-007** | 아바타 에셋을 **5종 × 8벌로 고정** | REQ-FUNC-006 | 3일/7일 재접속률 |
| **ADR-008** | **출석 별은 조건 없이 지급**하되 WPA에서 제외 | REQ-FUNC-002 · 8.1 | E8 (r ≤ 0.3) |

### ADR-001 — 북극성 KPI를 WPA 단일 지표로 둔다

- **맥락** — 후보가 셋이었다: 나무 5초 회상 성공률 · 다음 달 충전율 · 아이 7일 재접속률. 두 가치 선언 중 어느 쪽을 북극성으로 삼을지가 쟁점이었다.
- **결정** — **선언 ① 쪽의 WPA**를 단일 북극성으로 채택하고, 분자를 실천 트리거 3종으로 한정한다.
- **이유** — ① **선언 ①이 ②의 전제**다. 아이가 실천하지 않으면 보호자 화면은 거짓말 없이 비어 있고, ②의 어떤 지표를 북극성으로 삼아도 ①이 죽으면 함께 죽는다. ② 실천 공백 문제는 두 기회점수 지표에서 **순서가 흔들리지 않는 유일한 항목**이다 **[추론]**. ③ 나무 승급 조건에 실천 횟수가 들어 있어 **실천 없이는 나무·숲·별이 전부 멈춘다** **[설계 확정]**.
- **버린 대안** — 5초 회상은 **인터뷰 회차 지표**라 상시 계측이 불가능하다. 충전율은 **지연 지표**(월 1회)라 문제를 한 달 뒤에 알려준다. 재접속률은 **출석 별만으로 올라가 활동량 지표로 퇴화**한다.
- **대가** — MVP 실천 경로가 3종이라 **WPA 상한이 낮다.** v1/v2 분리 표기로 오독을 막는다.

### ADR-002 — 보상을 별 / 나무 / 숲 3층으로 분리한다

- **맥락** — 하나의 지표로 아이 동기와 보호자 확인을 동시에 충족하려 하면, 아이를 움직이는 즉각 보상이 그대로 보호자의 성장 증거가 돼버린다 — 대체재가 「누적 숫자 3개」에 머문 이유다.
- **결정** — 별(즉각 보상 · 초기화 없음 · 차감형) / 나무(이번 주기 성취 · 주기 초기화) / 숲(장기 누적 · 전월 대비 델타)으로 분리한다. 나무는 **3단계 고정**, 승급 조건은 **학습 3회 + 퀴즈 5개 + 실천 1회 이상**이며 **매달 조건을 상승시키지 않는다.**
- **이유** — 학술 근거 **[A]** — 인센티브는 **양**을 예측하고 내재동기는 **질**을 예측한다. 별(양)과 나무(질)를 같은 축에 두면 별을 많이 준 달이 성장한 달로 보인다. **조건을 매달 올리지 않는 이유**는 난이도 상승이 「정체」와 구별되지 않아 정체 원인 미설명 문제를 되살리기 때문이다.
- **버린 대안** — 별 하나로 통합 → 보호자 화면이 활동량 요약으로 퇴화. 나무만 운영 → 아이에게 즉각 보상이 없어 이탈.
- **대가** — 화면이 3개로 늘어 구현 비용이 커지고, 세 층의 정합성을 상시 감시해야 한다 (REQ-NF-008).

### ADR-003 — 사전 개입을 자동 트리거가 아니라 계획 카드로 구현한다

- **맥락** — 사전 개입 사각지대는 기회점수 공동 1위 문제인데, 대응 기능이 **선결 조건 4개 중 3개 미해결** 상태로 묶여 있었다: ① 아이 기기 전제(주 사용자 둘 다 전용폰 없음) ② 3분 임계값의 실측 근거 부재 ③ 위치정보 온디바이스 판정 구현 범위 ④ 온라인 결제 개입 수단 부재.
- **결정** — 자동 위치 기반 트리거를 **채택하지 않는다.** 사전 개입을 **「쓰기 전에 적는 행위」** 로 정의하고 REQ-FUNC-007 · 008로 구현한다. **위치정보를 일절 수집하지 않는다.**
- **이유** — ②를 해결해도 소용이 없다 — **3분 트리거가 못 잡는 소비가 곧 그 문제**였으므로 승격해도 사각지대가 남는다. 계획 카드는 선결 조건 **4개를 전부 우회**한다: 기기 조건 무관(보호자 폰에서 작성) · 위치정보 미사용 · 체류시간 실측 불필요 · **남는 데이터가 「알림을 봤다/안 봤다」가 아니라 「업종 × 금액 대조」** 라는 검증 가능한 행동 데이터다.
- **버린 대안** — 유지(Won't) → 미대응 확정. 경량 트리거 분할 → 기기 전제 잔존. Must 승격 → 선결 3건에 일정을 거는 것.
- **대가** — 🔴 **정직하게 남긴다.** ① **자동 발동이 사라졌다** — 사각지대가 「3분 미만 소비」에서 **「계획을 적지 않은 소비」로 옮겨갔다.** ② **온라인 결제·FOMO 문제가 완전 미대응**이 됐다. ③ 대외 문구에서 **지오펜싱 서술을 전부 내려야 한다.**
- **검증 연결** — 이 결정의 **생존 조건은 하나다.** 가설 *"미리 적게 하면 실제로 적는다"* → **작성률 ≥ 50%**. 미달이면 사전 절반이 비고 대조할 것이 없어 **사후 절반까지 무너진다.**

### ADR-004 — 계획↔실제는 금액 기준 단독 판정한다

- **맥락** — 계획한 업종과 다른 업종에서만 결제했고 금액은 계획 이내인 경우 별을 줘야 하는지가 열려 있었다.
- **결정** — **금액 기준 준수면 별 1개를 지급**한다. 업종 일치 여부는 `category_met`로 **기록만** 하고, 회고 문장을 **「업종이 달랐어요」 갈래로 분기**한다.
- **이유** — ① 업종 매칭 정확도 목표가 **90%** 이므로, 업종을 별 판정에 넣으면 **10%의 매칭 오류가 그대로 오지급·미지급**이 된다 — 별 정합성 오류율 0% 원칙과 충돌한다. ② 「잘 쓰기」의 학습 목표는 **한도를 지키는 것**이지 품목을 맞히는 것이 아니다. ③ 업종 데이터는 **버리지 않고** 회고 분기와 업종별 집계에 쓴다.
- **버린 대안** — 업종까지 일치해야 별 → 매칭 오류가 아이의 손실로 전가된다. 절반 지급 → 별은 정수 단위이고 분할 개념이 없다.
- **대가** — 「적은 대로 썼는가」를 완전히 측정하지는 못한다. 업종 준수율은 **관측 지표로만** 남는다.

### ADR-005 — 선불전자지급수단을 제휴사에 위탁한다 (B안)

- **맥락** — 아동 카드 운영에는 선불업 등록이 필요하다. 직접 등록(A안)과 등록 보유 제휴사 위탁(B안) 중 선택해야 했다.
- **결정** — **B안.** 발행·관리·충전금 별도관리·카드 발행·가맹점망은 제휴사가, 브랜드·앱·학습/실천·나무·숲·별 원장·실천 판정은 자사가 담당한다.
- **이유** — ① 등록 요건(자본금·내부통제·충전금 100% 별도관리)을 MVP 단계에서 갖추면 **출시가 규제 절차에 종속**된다. ② 만 14세 미만은 **마이데이터 가입이 불가**(REQ-REG-009)해 어차피 자체 카드 + 폐쇄형 수집이 필요하고, 그 인프라는 제휴사가 이미 갖고 있다. ③ 차별화가 큰 활동은 **운영·생산 / 기술 개발** 두 곳이며 결제 인프라는 거기 없다.
- **버린 대안** — 직접 등록 → 출시 지연 + 자본 부담. 기존 카드 연동 → REQ-REG-009로 데이터 수집 경로가 막힌다.
- **대가** — 🔴 **수수료 종속**(R4) · **한도·업종 제한을 정할 수 없음**(REQ-REG-008) · **업종 코드 상세도가 품질을 좌우**(R5) · **가용성 SLA가 제휴사보다 높을 수 없음**(REQ-NF-006).

### ADR-006 — 「불리기」는 학습만 개통하고 실천은 잠근다

- **맥락** — 나무는 4영역 구조인데 「불리기」 실천 경로(REQ-FUNC-015)가 **중개업 해당 여부 법률 검토** 대기 상태다.
- **결정** — **학습·퀴즈만 개통**하고 실천 트리거 7·8을 잠근다. 화면에 **"곧 열려요"** 를 표시한다. 예적금 이자 주기 사양은 **F15 범위이므로 이번 릴리즈에서 정하지 않는다.**
- **이유** — ① 법률 검토 없이 구현하면 **중개업 해당 시 기능 전체를 들어내야** 한다. ② 4영역 중 3영역이 열리면 WPA는 3종 상한으로 작동하며 이는 성능 문제가 아니라 정의다. ③ 잠긴 영역을 **결함으로 오인시키지 않는 것**이 실제 리스크이므로 화면 문구를 인수 기준으로 못박았다(US-2 AC4).
- **버린 대안** — 4영역 전부 개통 → 법률 리스크. 「불리기」를 숨김 → 4영역 구조가 무너져 나무·숲 설계를 다시 해야 한다.
- **대가** — 「불리기」 학습 장벽 문제가 **미대응**으로 남고, 완주율이 4주제 중 최저일 것으로 예상되며 **관측만** 한다.

### ADR-007 — 아바타 에셋을 사전 제작 5종 × 8벌로 고정한다

- **맥락** — REQ-FUNC-006은 아이의 **유일한** 동기 장치인데 종수·벌수가 정해지지 않아 발주가 막혀 있었고, 이것이 S3의 블로커였다(R9).
- **결정** — **5종 × 8벌 = 40조합.** 1차 납품은 **2종 × 4벌**로 축소 착수하고 나머지는 S4~S5에 순차 납품한다. 제작비는 **24개월 상각**한다.
- **이유** — ① **별 획득 속도 대비 소진 기간**으로 역산했다 — 실천 트리거 3종에서 주당 별 3~5개, 옷 1벌이 별 10~15개면 **40조합은 약 12~18개월치**다. 별은 초기화되지 않으므로 여러 달 모아 사는 경로가 살아 있어야 한다. ② 24개월 상각과 12~18개월 소진이 맞물려 **상각 종료 전에 콘텐츠가 마르지 않는다.** ③ 1차 2종 × 4벌은 **온보딩 5분 루프에 필요한 최소 선택지**다.
- **버린 대안** — 절차적 생성 → 3D 품질 관리 비용이 더 크다. 무한 확장 → 상각 계획을 세울 수 없다.
- **대가** — 40조합 소진 후 콘텐츠 확장이 필요하다. 잔여율 모니터는 **v1.1에서 추가**한다 (7.3절).

### ADR-008 — 출석 별은 조건 없이 지급하되 WPA에서 제외한다

- **맥락** — 두 주 사용자가 정반대 신호를 냈다. H1은 *"출석만 해도 주면 공부를 안 할 수도"* 를 우려하고, H2는 **학습 진도가 느려 출석 별이 유일한 초기 별**이다. 「학습 1개 이상」을 조건으로 걸면 H2의 진입이 지체된다.
- **결정** — 출석 별을 **조건 없이 지급**하되 **WPA 분자에서 트리거 1·2·3을 전부 제외**한다.
- **이유** — 두 요구는 **같은 층에서 충돌하지만 다른 층에서는 충돌하지 않는다.** H2가 원하는 것은 **별(아이 동기 층)** 이고 H1이 걱정하는 것은 **성장 증거(보호자 확인 층)** 다. 3층 분리(ADR-002) 덕분에 **별은 후하게 주고 나무·WPA는 실천으로만 움직이게** 하면 둘 다 만족한다.
- **버린 대안** — 「학습 1개 이상」 조건 → H2 진입 지체. 출석 별 폐지 → H2에게 초기 보상이 0이 된다.
- **대가** — 별 발행량이 늘어 **옷 소진 속도가 빨라진다**(ADR-007의 12~18개월 추정 단축 가능).

---

## 12. 검증 및 확인 (V&V)

> **추가 챕터** — ISO/IEC/IEEE 29148:2018 **§9.6.19 Verification** · **§6.5.3 Requirements activities in validation** · **§9.6.9 Apportioning of requirements**.

### 12.1 검증 실험

| # | 가설 | 설계 | 측정 도구 | PASS | HOLD | FAIL → 조치 |
| --- | --- | --- | --- | --- | --- | --- |
| **E1** | 나무가 「변화」를 전달한다 | 5초 노출 회상 테스트 *(오차 ±0.5초)* | rubric 코딩 · 코더 2인 κ ≥ 0.6 | **≥ 6/8** | 4~5/8 | **≤ 3/8** → 나무 UI 재설계 |
| **E2** | 실천 조건이 전달된다 | 동일 세션 Q1-8 | 진행자 개입 횟수 | **≥ 6/8** | 4~5/8 | ≤ 3/8 → 실천 근거 노출 강화 |
| **E3** 🔴 | **계획 카드가 실제로 작성된다** | 인앱 이벤트 · 운영 4주 | `plan_card_created ÷ payment_settled` | **≥ 50%** | 30~49% | **< 30%** → REQ-FUNC-007의 사전 절반이 무너짐 · 작성 UX 재설계 |
| **E4** | 첫 실천이 7일 내 일어난다 | 프로토타입 1~2주 | `practice_credited` 코호트 | **≥ 60%** | 40~59% | < 40% → 성장 조건 난이도 재조정 |
| **E5** | 정체 원인 표시가 오귀인·불신을 줄인다 | 정체 시나리오 + Q1-9 | 발화 코딩 4범주 | 각 **≤ 2/8** | 각 3/8 | 어느 쪽이든 **≥ 4/8** → 문구·정보량 재설계 |
| **E6** | 보호자가 금융 집중을 원한다 | 반증 인터뷰 H1-3 | (a)/(b)/(c) 분기 | (a) **≥ 5/8** | (a) 3~4/8 | **(c) ≥ 3/8** → 포지션 변경 · 4영역 매핑 재설계 |
| **E7** 🔴 | **결제 승인 데이터가 계획 카드와 매칭된다** | 제휴사 샘플 데이터 + 수동 대조 50건/주 | 매칭 성공 ÷ 전체 · `match_method` 분포 | **≥ 90%** | 80~89% | **< 80%** → 업종 코드 체계 재협의 · 2차 매칭 강화 |
| **E8** | 회고가 형식적 클릭으로 퇴화하지 않는다 | 프로토타입 로그 | `retro_viewed.dwell_ms` p50 · 재노출률 · 출석률↔WPA 상관 | p50 **≥ 3초** · 재노출 **≤ 2/8** · **r ≤ 0.3** | p50 2~3초 | p50 **< 2초** → 문장 풀 확대 · 상호작용 추가 |
| **E9** | 아이 정지를 보호자가 3일 내 안다 | 미접속 알림 로그 | 발송률 · 열람률 · 인지 일수 | **≤ 3일** · 열람 **≥ 50%** | 4~7일 | **> 7일** → 알림 시간대·채널 재설계 |
| **E10** 🔴 | **실천 증가가 실제 소비·저축 행동 변화로 이어진다** | **3개월 종단 관찰** — 월간 숲 「지난달과 비교」 3지표 | 사려다 멈춤 · 가격 비교 · 저축률 | **3지표 중 2개 이상** 3개월 연속 개선 | 1개만 개선 | 실천은 늘고 3지표 불변 → 🔴 **「성장」 정의 재검토** |
| **E11** | 대안 대비 공백이 유지된다 | **분기 1회 경쟁사 재점검** | 보호자 화면 캡처 · 약관 대조 · 과목 목록 | 공백 유지 | 부분 변화 | 공백이 메워짐 → 차별 축 재산정 |

### 12.2 요구사항별 검증 방법 매핑

> 29148 §9.6.19는 검증 정보를 **§9.6.10 ~ §9.6.18과 병렬로** 제시할 것을 권고한다.

| 요구사항 군 | 주 검증 방법 | 보조 검증 |
| --- | --- | --- |
| REQ-FUNC-001 ~ 018 | 단위 테스트 · 통합 테스트 · 화면 검수 | 인터뷰 (E1 · E2 · E5 · E6) · 인앱 코호트 (E3 · E4) |
| REQ-NF-001 ~ 005 (성능·정확도) | 부하 테스트 · p95 상시 계측 | 수동 대조 표본 (E7) |
| REQ-NF-006 ~ 010 (신뢰성·무결성) | 5분 프로브 · 일일 정산 배치 diff | 자동 회귀 테스트 |
| REQ-NF-011 ~ 020 (보안) | 정적 분석 CI · 스키마 감사 · 권한 매트릭스 테스트 | 분기 보안 감사 |
| REQ-NF-021 ~ 024 (비용·운영·유지보수) | 월간 청구서 대사 · 알림 리허설 | 코드 리뷰 |
| REQ-REG-001 ~ 009 (규제) | **자동 테스트 100% 통과 필수** · 빌드 파이프라인 스캔 | 법률 검토 · 제휴 계약서 확인 |

### 12.3 요구사항 배분 (스프린트) 및 롤아웃 게이트

**스프린트 배분** — 2주 · 개발 3인 기준. 의존성 위상 정렬로 경계를 자른다.

| 스프린트 | 배분 요구사항 | 근거 |
| --- | --- | --- |
| **S1** | REQ-FUNC-002 (별 엔진) · REQ-FUNC-001 (온보딩·동의) | 둘 다 의존성 0. 별 엔진은 6개 요구사항의 선행이고, 동의 게이트는 규제 게이트라 가장 먼저 테스트 가능해야 한다 |
| **S2** | REQ-FUNC-003 (학습) · REQ-FUNC-004 (미션) · REQ-FUNC-007 (계획 카드 작성) | 별 엔진 완료 후 착수. 계획 카드 작성은 **결제 연동 없이 단독 동작** |
| **S3** | REQ-FUNC-005 (성장 나무) · REQ-FUNC-006 (아바타·옷장) | 학습·별 완료가 선행. **여기서 보호자 화면이 처음 의미를 가진다** |
| **S4** | REQ-FUNC-008 (계획↔실제 대조) · REQ-FUNC-009 (월간 숲) | 제휴사 결제내역 API 연동이 필요 — **계약이 S3 종료 전 확정돼야 한다**(10.3) |
| **S5** | REQ-FUNC-010 · 011 · 012 · 013 · 014 *(각 0.5스프린트 · 병렬)* | 전부 Should. 0.5스프린트 단위라 2개씩 묶어 배치 |
| **S6+** | REQ-FUNC-015 · 016 · 017 *(Could)* | REQ-FUNC-015는 법률 검토 통과가 착수 조건 |

> **1스프린트 내 구현 가능성** — Must 9 · Should 5 · Could 3 = **17건 전부 1스프린트 이내**다. 유일한 초과 후보였던 계획 카드 기능은 **REQ-FUNC-007(작성) / REQ-FUNC-008(대조)** 로 분할해 각각 독립 배포 가능하게 만들었다. REQ-FUNC-018만 2스프린트를 넘으며, 그래서 Won't Have다.

**롤아웃 게이트** — 전 항목 AND 조건.

| 단계 | 범위 | 시점 | 진입 게이트 |
| --- | --- | --- | --- |
| **α 내부** | 팀 + 지인 가정 3~5 | S4 종료 | ① **REQ-REG 전 항목 자동 테스트 100% 통과** ② 별 원장 불일치 **0건** ③ 위치 권한 선언 **0건** ④ REQ-NF-001 ~ 003 SLO 충족 |
| **β 클로즈드** | 모집 8슬롯 가정 | S5 종료 | ① **E4 PASS** (첫 실천 인정률 ≥ 60%) ② **E1 PASS** (5초 회상 ≥ 6/8) ③ **WPA ≥ 5/8** ④ **E7 PASS** (매칭 정확도 ≥ 90%) ⑤ α 게이트 전 항목 유지 |
| **일반 공개** | 1차 타깃 세그먼트 | β +4주 | ① **WPA ≥ 55%** 2주 연속 ② **MOE-13 ≤ 3일** ③ 정합성 오류 **0건** ④ **E3 PASS** (작성률 ≥ 50%) ⑤ **카드 연결률 ≥ 60%** |

> **게이트 미달 시** — 8.2절 3구간 규칙을 적용한다. **HOLD면 표본 +4 후 재판정**(그 사이 다음 단계로 넘어가지 않는다), **FAIL이면 해당 실험의 지정 조치**를 실행하고 재판정한다. **게이트를 우회하는 예외는 두지 않는다.**

### 12.4 대외 표현 정확성 기준

> 검증되지 않은 것을 검증된 것처럼 말하지 않기 위한 기준이다. 왼쪽은 **사실이 아니거나 출처가 확인되지 않은 문장**, 오른쪽은 **같은 내용을 정확하게 말하는 방법**이다.

| # | 쓰지 않는 문장 | 정확한 문장 |
| --- | --- | --- |
| 1 | 아직 재지 않은 지표를 **달성 성과**로 인용 | *"목표는 X이고, 기준선은 (8.3절 확보 시점)에 실측한다"* — **목표값 자체는 확정이므로 목표로 인용해도 된다** |
| 2 | **「소비 순간 자동 개입」을 제공 기능**으로 | *"가기 전에 적고, 쓴 뒤에 맞춰본다"* — 자동 개입은 **제품 범위 밖**(ADR-003). 지오펜싱·위치 알림 서술은 **전부 사실이 아니다** |
| 3 | *"대체재는 확인 기능이 없다"* | *"확인은 됩니다. 그게 성장인지 알 수 없는 것이 문제입니다."* |
| 4 | 기회점수를 *"검증됨"* 으로 | *"정성 모델 위의 분석 판단값이며 순위 비교용"* |
| 5 | **「금융 순도」를 확정 차별점**으로 | *"4주제 전부 금융이라는 구조적 차이가 있고, 그것이 보호자 요구와 맞는지는 E6에서 확인한다"* |
| 6 | **「유료 전환율」** 을 수익 KPI로 | **카드 연결률 · 아동 1인당 월 결제액** — 보호자·아이 모두 무료가 확정 사항 |
| 7 | *"아이가 성장했습니다"* 로 효과를 단정 | *"설계상 그렇게 되도록 만들었고, E10 3개월 종단으로 재현을 확인한다"* |

---

*작성자: 제품기획 (PM), 검토자: 개발팀 리드 · 정책·법령 담당, 승인자: 제품기획 (PM)*

*입력 문서: PRD 핀프렌즈 v1.0 (2026-08-25) · 표준: ISO/IEC/IEEE 29148:2018*
