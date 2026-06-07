# Newsletter Landing Page

현재 HTML 랜딩페이지를 유지하면서 뉴스레터 신청 정보를 Supabase `subscribers` 테이블에 저장하는 Vercel 배포용 프로젝트입니다.

## 구성

- `index.html`: 기존 랜딩페이지와 신청 폼
- `channels.html`: 기존 채널 페이지
- `api/subscribe.js`: 폼 제출을 받아 Supabase에 저장하는 Vercel 서버 함수
- `supabase.sql`: `subscribers` 테이블과 정책 생성 SQL
- `.env.example`: 필요한 환경변수 예시

## Supabase 설정

1. Supabase 프로젝트에서 SQL Editor를 엽니다.
2. `supabase.sql` 내용을 실행합니다.
3. 테이블명은 `public.subscribers`입니다.

저장되는 주요 필드는 다음과 같습니다.

- `name`
- `company`
- `email`
- `role`
- `interests`
- `countries`
- `consent_privacy`
- `consent_marketing`
- `consent_event`
- `source`
- `resend_contact_id`
- `metadata`

`countries`, `resend_contact_id`, `metadata`는 향후 국가별 관심사, Resend 이메일 발송, 개인화 뉴스레터 확장을 위해 미리 준비한 필드입니다.

## 환경변수

Vercel Project Settings에서 Environment Variables에 아래 값을 추가합니다.

```txt
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

로컬에서 테스트할 때는 `.env.example`을 참고해 `.env.local`을 만들면 됩니다. 실제 키 파일은 저장소에 커밋하지 마세요.

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Vercel에서 `New Project`를 선택합니다.
3. 해당 GitHub 저장소를 가져옵니다.
4. Framework Preset은 `Other` 또는 자동 감지 상태로 둡니다.
5. Build Command는 비워둡니다.
6. Output Directory도 비워둡니다.
7. 위의 Supabase 환경변수 2개를 추가합니다.
8. Deploy를 누릅니다.

배포 후 사용자가 폼을 제출하면 다음 흐름으로 저장됩니다.

```txt
User -> Vercel Landing Page -> /api/subscribe -> Supabase subscribers table
```

## 동작

- 클라이언트에서 필수 입력값, 이메일 형식, 관심사 선택, 필수 동의를 검사합니다.
- 서버 함수에서도 같은 핵심 유효성 검사를 다시 수행합니다.
- 성공 시 `구독 신청이 완료되었습니다.` 메시지를 표시합니다.
- 실패 시 `제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.` 메시지를 표시합니다.

## 주의

- `service_role_key`는 사용하지 않습니다.
- Supabase URL과 publishable key는 HTML에 하드코딩하지 않습니다.
- Vercel 환경변수에만 실제 값을 설정합니다.
