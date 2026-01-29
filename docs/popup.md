# 팝업 관리

## 설정 파일

`popup-config.json` 파일로 모든 팝업을 관리합니다.

```json
{
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
  "enabled": false
}
```

### 링크 없이 이미지만 표시

```json
{
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

## 날짜 범위 작동 방식

- `startDate`부터 `endDate`까지만 팝업 표시
- 날짜 범위를 벗어나면 자동으로 팝업이 표시되지 않음
- 일주일 이벤트: 시작일 + 7일 = 종료일

## 파일 구조

- **설정**: `popup-config.json`
- **HTML**: `index.html` (465-487행)
- **CSS**: `css/layout.css` (3009-3229행)
- **JavaScript**: `main.js` (1063-1157행)
