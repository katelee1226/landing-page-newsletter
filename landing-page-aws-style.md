# 로봇/공장 자동화 뉴스레터 랜딩페이지

## Design Direction

AWS 스타일을 참고한 B2B 기술 랜딩페이지입니다. 전체 인상은 어두운 차콜/네이비 배경, 선명한 주황색 CTA, 실무자가 빠르게 이해할 수 있는 카드형 정보 구조를 기준으로 합니다.

- 톤: 신뢰감 있는 기술 서비스, 과장 없는 전문성
- 컬러: 차콜 블랙, 딥 네이비, 화이트, AWS 오렌지 계열 포인트
- 레이아웃: 넓은 히어로 영역, 명확한 CTA, 3-4개 핵심 가치 카드, 하단 구독 폼
- 이미지 방향: 반도체 클린룸, 자동화 라인, 로봇암, 산업용 데이터 대시보드가 결합된 사실적인 이미지

---

## Hero

### 메인 카피

로봇/공장 자동화의 핵심 기술 흐름을 매일 아침 휴대폰으로 받아보세요!

### 서브 카피

반도체 부품과 장비, 스마트팩토리, 로봇, PLC/SCADA, 산업용 AI까지. 현업자가 빠르게 훑을 수 있는 핵심 뉴스레터.

### CTA

뉴스레터 구독하기

### 보조 문구

매일 아침, 현장에서 바로 이해할 수 있는 기술 흐름만 선별해서 보내드립니다.

---

## Main Image Prompt

Futuristic semiconductor cleanroom and automated smart factory floor, robotic arms assembling precision components, wafer inspection equipment, industrial engineers with tablets, PLC and SCADA dashboard overlays, industrial AI monitoring screens, premium B2B technology newsletter hero image, realistic, high detail, cinematic lighting, dark navy and charcoal atmosphere with orange accent lights, no text, no logo.

---

## Section 1. Why Subscribe

### 섹션 타이틀

하루를 시작하기 전에, 산업 기술 흐름을 먼저 파악하세요

### 설명

로봇, 자동화 설비, 반도체 장비, 산업용 AI의 변화는 빠르게 연결되고 있습니다. 이 뉴스레터는 흩어진 뉴스를 현업자의 관점에서 정리해, 출근길에도 핵심만 빠르게 확인할 수 있도록 돕습니다.

### 핵심 카드

#### 반도체 부품과 장비

장비 투자, 공급망, 검사/계측, 공정 자동화 관련 흐름을 짧고 명확하게 정리합니다.

#### 스마트팩토리

MES, SCADA, PLC, 센서, 데이터 수집, 예지보전 등 제조 현장의 디지털 전환 이슈를 다룹니다.

#### 로봇과 자동화

협동로봇, 물류 자동화, 비전 검사, 모션 제어, 엔드이펙터 등 자동화 기술의 변화를 추적합니다.

#### 산업용 AI

제조 AI, 품질 검사, 설비 이상 감지, 생산 최적화 등 현장에서 적용 가능한 AI 사례를 선별합니다.

---

## Section 2. Newsletter Format

### 섹션 타이틀

매일 아침 5분이면 충분합니다

### 구성

- 오늘의 핵심 뉴스 3개
- 현업자가 봐야 할 기술 변화 1개
- 관련 기업/시장 움직임 요약
- 읽어볼 만한 리포트 또는 자료

### 문구

복잡한 산업 뉴스를 길게 설명하지 않습니다. 중요한 흐름을 짧게 정리하고, 왜 봐야 하는지까지 함께 전달합니다.

---

## Section 3. Subscription Form

### 섹션 타이틀

뉴스레터 구독하기

### 설명

아래 정보를 남기면 로봇/공장 자동화와 반도체 장비 분야의 핵심 기술 흐름을 이메일로 받아볼 수 있습니다.

### 입력 항목

- 이메일 주소: 필수
- 이름: 선택
- 회사명: 선택
- 관심 분야: 선택
  - 반도체 부품/장비
  - 로봇
  - 스마트팩토리
  - PLC/SCADA
  - 산업용 AI
  - 센서/비전 검사

### CTA

무료로 구독하기

---

## Privacy Consent

### 필수 동의 문구

[필수] 개인정보 수집 및 이용 동의

수집 항목: 이메일, 이름, 회사명, 관심 분야

수집 목적: 로봇/공장 자동화 및 반도체 장비 뉴스레터 발송, 구독자 관리, 관련 문의 응대

보유 및 이용 기간: 구독 해지 시까지 또는 수집일로부터 2년

동의 거부 권리: 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으며, 동의하지 않을 경우 뉴스레터 구독이 제한됩니다.

---

## Supabase Table

```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  company text,
  interests text[],
  privacy_consent boolean not null default false,
  consent_version text not null default '2026-06-03',
  consented_at timestamptz not null default now(),
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  source text default 'landing_page'
);
```

---

## Visual Notes

- 배경은 `#0f1419` 또는 `#111827` 계열의 어두운 톤을 사용합니다.
- CTA 버튼은 AWS 느낌의 오렌지 계열을 사용합니다.
- 텍스트는 흰색과 연한 회색을 조합합니다.
- 카드에는 얇은 테두리와 어두운 배경을 사용하고, 그림자 효과는 과하지 않게 둡니다.
- 메인 이미지는 오른쪽 또는 전체 배경에 배치하되, 텍스트 가독성이 떨어지지 않도록 어두운 오버레이를 적용합니다.

---

## Suggested Page Flow

1. Hero: 핵심 카피, 설명, CTA, 메인 이미지
2. Why Subscribe: 구독해야 하는 이유와 핵심 분야
3. Newsletter Format: 매일 받아볼 내용
4. Subscription Form: 개인정보 동의 포함 구독 양식
5. Footer: 운영자 정보, 문의 이메일, 개인정보 처리방침 링크
