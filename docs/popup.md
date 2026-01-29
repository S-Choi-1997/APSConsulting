# 팝업 관리

## 설정 파일

`popup-config.json` 파일로 모든 팝업을 관리합니다.

```json
{
  "id": "election-2026",
  "enabled": true,
  "startDate": "2026-01-29",
  "endDate": "2026-02-05",
  "image": "./images/popup.jpg",
  "link": null,
  "openInNewTab": true,
  "cookieDays": 1,
  "delay": 500
}
```

## 설정 항목

| 항목 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `id` | string | 팝업 고유 ID (쿠키 구분용, 필수) | `"election-2026"` |
| `enabled` | boolean | 팝업 활성화 여부 | `true` / `false` |
| `startDate` | string | 시작일 (YYYY-MM-DD) | `"2026-01-29"` |
| `endDate` | string | 종료일 (YYYY-MM-DD) | `"2026-02-05"` |
| `image` | string | 이미지 경로 | `"./images/popup.jpg"` |
| `link` | string/null | 클릭 시 이동할 URL (없으면 `null`) | `"https://example.com"` |
| `openInNewTab` | boolean | 새 창으로 열기 | `true` / `false` |
| `cookieDays` | number | "오늘 하루 보지 않기" 기간(일) | `1` |
| `delay` | number | 팝업 표시 지연 시간(밀리초) | `500` |

## 사용 예시

### 일주일 동안 팝업 표시

```json
{
  "id": "event-2026",
  "enabled": true,
  "startDate": "2026-01-29",
  "endDate": "2026-02-05",
  "image": "./images/event-popup.jpg",
  "link": "https://apsconsulting.kr/event",
  "openInNewTab": true,
  "cookieDays": 1,
  "delay": 500
}
```

### 팝업 비활성화

```json
{
  "id": "notice-2026",
  "enabled": false
}
```

### 링크 없이 이미지만 표시

```json
{
  "id": "notice-2026",
  "enabled": true,
  "startDate": "2026-01-29",
  "endDate": "2026-02-05",
  "image": "./images/notice.jpg",
  "link": null,
  "openInNewTab": false,
  "cookieDays": 1,
  "delay": 500
}
```

### PDF 파일 표시 (스크롤 뷰어)

```json
{
  "id": "election-2026",
  "enabled": true,
  "startDate": "2026-01-29",
  "endDate": "2026-02-04",
  "image": "./images/popup.jpg",
  "link": "./pdf-viewer.html?file=./files/선거컨설팅.pdf",
  "openInNewTab": true,
  "cookieDays": 1,
  "delay": 500
}
```

**PDF 뷰어 특징:**
- PDF 페이지들을 위아래로 스크롤하며 볼 수 있음
- PDF.js 라이브러리 사용
- 모바일/데스크톱 반응형 지원
- 새 창에서 열림

## 날짜 범위 작동 방식

- `startDate`부터 `endDate`까지만 팝업 표시
- 날짜 범위를 벗어나면 자동으로 팝업이 표시되지 않음
- 일주일 이벤트: 시작일 + 7일 = 종료일

## 팝업 ID 관리

### ID의 역할
- 각 팝업을 고유하게 식별
- "오늘 하루 보지 않기" 쿠키가 팝업별로 독립적으로 관리됨
- 쿠키 이름: `hidePopup_{id}` (예: `hidePopup_election-2026`)

### 새 팝업 만들기
1. **ID만 변경**: 내용은 같지만 새 팝업으로 인식
   ```json
   {"id": "event-2026-v2"}  // v2로 변경하면 새 팝업
   ```

2. **여러 팝업 관리**: 각 팝업이 독립적으로 작동
   - `election-2026`: 선거 팝업
   - `event-2026`: 이벤트 팝업
   - `notice-2026`: 공지사항 팝업

### 주의사항
- ID는 영문, 숫자, 하이픈(-), 언더스코어(_)만 사용 권장
- ID를 변경하면 이전 쿠키와 무관하게 새 팝업으로 표시됨

## 파일 구조

- **설정**: `popup-config.json`
- **팝업 HTML**: `index.html` (465-487행)
- **PDF 뷰어**: `pdf-viewer.html`
- **CSS**: `css/layout.css` (3009-3229행)
- **JavaScript**: `main.js` (1063-1157행)
- **이미지**: `images/popup.jpg`
- **PDF 파일**: `files/*.pdf`
