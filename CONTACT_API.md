# 상담 접수 연결

## 확인 근거 (2026-10-07)

- 사이트 main 기준: `bb3e54e0da5d1fed3da5441f4bddb245b0f1cd9c`.
- 공개 접수 주소와 Enterprise site key:
  [APSConsulting publish/main.js](https://github.com/S-Choi-1997/APSConsulting/blob/699efae74a80735dd0db41e903e34e93473c5606/main.js).
  `POST https://aps-check-759991718457.us-central1.run.app/contact`.
- 생성 API 원본:
  [APS_electron_BE customer-api/index.js](https://github.com/S-Choi-1997/APS_electron_BE/blob/4e1d4ad3e1ad813fe925d2729bd91e5a4646edfb/customer-api/index.js).
  검증과 reCAPTCHA 평가 후 Firestore `inquiries` 저장을 기다리고
  `{status: "ok", message: "submitted"}`를 반환합니다.
- 관리자 배포 이력 `APSmanager@16265369`는 원본 커밋 `54bfa518...`를 언급합니다.
  현재 원본 위치는 `APS_electron_BE`의 `legacy/src/services/inquiryService.js`와
  `app/src/services/inquiryService.js`입니다.
  [현재 관리자 backend/inquiry-routes.js](https://github.com/S-Choi-1997/APS_electron_BE/blob/4e1d4ad3e1ad813fe925d2729bd91e5a4646edfb/backend/inquiry-routes.js)는 동일한
  `inquiries` 컬렉션을 읽습니다. 별도 PostgreSQL `web-form-inquiries` 목록과 혼동하지 않습니다.
- `https://inquiryapi-mbi34yrklq-uc.a.run.app`는 관리자 API이며 공개 접수 주소로 사용하지 않습니다.

## 상담 분야 매핑

| 폼 값 | 전송 category | 관리자 기본 표시 |
| --- | --- | --- |
| 인허가 | corporate | 기업 인허가 |
| 기업인증 | corporate | 기업 인허가 |
| 부동산 | etc | 기타 |
| 민원 | civil | 민원 행정 |
| 기타 | etc | 기타 |

현재 서비스 페이지의 분야를 유지합니다. 부동산 전용 코드는 확인된 백엔드 허용 목록에 없으므로
`etc`로 분류하고, 모든 메시지 앞에 원래 분야를 붙여 상세 상담 분야가 유실되지 않도록 합니다.
부동산을 별도 관리자 필터로 분리하려면 공개 API와 관리자 원본 양쪽의 category 확장이 필요합니다.

## 요청과 실패 처리

- 이름(1~100자), 연락처, 선택 이메일, category, 국적(`KOR` 또는 `OTHER`),
  메시지, 빈 attachments, 매 제출마다 새 `recaptchaToken`을 전송합니다.
- 국적은 사용자에게 선택받고 임의로 대한민국을 기본 지정하지 않습니다.
- 상담내용은 10~1950자입니다. 분야 머리말을 포함해 서버의 2000자 제한 안에 들어갑니다.
- 개인정보 동의를 브라우저에서 필수로 확인합니다. 확인된 고객 API는 동의 기록을 저장하는
  필드를 제공하지 않으므로 서버에 동의 기록이 저장된다고 주장하지 않습니다.
- HTTP 2xx와 JSON `status === "ok"`가 모두 확인돼야 완료를 표시합니다.
  실패, 응답 파싱 실패, reCAPTCHA 미준비, 20초 시간 초과 시 입력과 동의를 유지합니다.
- 전송 중 중복 제출을 막고, 전송 중 입력이 바뀌면 성공 이후에도 새 입력을 지우지 않습니다.
- 시간 초과나 네트워크 단절은 저장 이후 응답 유실일 수도 있습니다. 이를 접수 실패로 확정하지
  않고 접수 완료를 확인하지 못했다고 안내합니다. 백엔드에 idempotency 계약은 확인되지 않았습니다.
- 개인정보를 콘솔에 출력하지 않습니다. JavaScript가 실행되지 않으면 제출 버튼이 비활성화됩니다.

## 검증과 운영 확인

```bash
node --test tests/contact-form.test.cjs
```

회귀 테스트는 전송 계약, 모든 표시 분야의 매핑, 입력 검증, 성공 시 초기화,
중복 제출, HTTP 오류, 네트워크 오류, 잘못된 JSON/성공 본문,
reCAPTCHA 오류, 시간 초과와 늦은 토큰의 전송 방지를 검증합니다.
테스트의 서버 응답은 모의 응답입니다.

운영 주소의 `OPTIONS /contact`는 2026-10-07 HTTP 200을 반환했고,
`Origin: https://apsconsulting.kr`에 대해 같은 값의
`Access-Control-Allow-Origin`과 `POST, OPTIONS` 허용을 확인했습니다.
이 확인만으로 실제 저장 성공이나 모든 배포 도메인 허용을 확정하지 않습니다.
또한 개인정보나 토큰 없이 `POST /contact`에 빈 객체를 전송하여
HTTP 400과 `name, phone, category, nationality, message, reCAPTCHA invalid`
응답을 확인했습니다. 검증 단계에서 거절되는 요청이며 문의 저장 성공 테스트는 아닙니다.

저장소에서 공개 주소와 경로는 확인했습니다. 운영 배포의 코드 버전, Firestore 프로젝트,
CORS `ALLOWED_ORIGINS`, reCAPTCHA `ALLOWED_HOSTNAMES`와 site key 도메인 설정은
운영 환경에서 확인해야 합니다. 이 변경은 API 서버나 배포 설정을 변경하지 않습니다.
main 대상 PR이므로 실제 사이트가 publish 브랜치로 배포된다면 배포 브랜치에도 적용해야 합니다.
