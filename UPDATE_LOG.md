# 웹사이트 업데이트 로그

## 주요 변경사항

### 1. 행정사 소개 섹션
- **텍스트**: "전문가 소개" → "행정사 소개"
- **팀원 확대**: 1명 → 4명
  - 홍길동 (대표행정사)
  - 김민수 (기업인증 전문)
  - 박서연 (부동산 인허가 전문)
  - 이정훈 (민원행정 전문)
- **슬라이더 개선**:
  - 자동 넘김 (4초 간격)
  - Pagination 추가 (클릭 가능한 점)
  - 글씨 겹침 문제 해결 (fade → slide 효과)

### 2. 레이아웃 조정
- **푸터**: 사이즈 2/3 축소 (padding 80px → 50px)
- **Sticky 푸터**: 모든 탭에 추가 (about, services, cases, contact)
- **팀 섹션**: 컨테이너 padding 추가 (양쪽 8%)

### 3. UI 요소 변경
- **모바일 버튼**: 전화 아이콘 → 채팅 아이콘, contact.html 연결
- **온라인 상담 버튼**:
  - 기본: 투명 배경 + 흰색 테두리 + 흰색 텍스트
  - 호버: 흰색 배경 + 파란색 텍스트

### 4. 콘텐츠 정리
- **통계 섹션 제거**:
  - index.html: "숫자로 증명하는 전문성" 삭제
  - cases.html: 누적 성공사례 통계 삭제
  - 사유: 신생 업체로 실제 데이터 없음

### 5. 색상 수정
- **feature-number**: 흰색 → 파란색 (가독성 개선)
- **버튼**: 일관된 흰색 테두리 스타일 적용

### 6. 배포 문서
- **DEPLOY_TO_GCS.md**: GCS 정적 웹사이트 배포 가이드 작성

---

## 파일별 변경사항

### HTML
- `about.html`: 행정사 4명 추가, pagination 추가, sticky 푸터 추가
- `services.html`: sticky 푸터 추가
- `cases.html`: 통계 섹션 제거, sticky 푸터 추가
- `contact.html`: sticky 푸터 추가
- `index.html`: 통계 섹션 제거
- **모든 HTML**: 전화 아이콘 → 채팅 아이콘

### CSS (main.css)
- `.footer`: padding 80px → 50px
- `.footer-top`: gap 80px → 50px, padding-bottom 60px → 40px
- `.team-slider-wrapper`: padding 0 8% 추가
- `.team-slider`: overflow, swiper 스타일 추가
- `.team-pagination`: 스타일 추가
- `.btn-primary`: 투명 배경 + 흰색 테두리로 변경
- `.feature-number`: 흰색 → 파란색

### JS (main.js)
- 팀 슬라이더: pagination 옵션 추가, fade → slide 변경

---

## 주요 파일 위치

```
aps_ver.2/
├── index.html (통계 제거)
├── about.html (팀 4명, pagination)
├── services.html (sticky 푸터)
├── cases.html (통계 제거, sticky 푸터)
├── contact.html (sticky 푸터)
├── main.css (버튼/색상/레이아웃 수정)
├── main.js (팀 슬라이더 개선)
├── DEPLOY_TO_GCS.md (배포 가이드)
└── UPDATE_LOG.md (이 문서)
```

---

**업데이트 완료일**: 2025-01-29
