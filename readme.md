# APS 행정사 사무소 소개 사이트

Google Cloud Storage 정적 호스팅을 염두에 두고 제작한 단일 페이지(One Page) 소개 사이트입니다. Vite를 사용해 정적 자산을 빌드하며, 탭 전환으로 콘텐츠 섹션을 탐색하는 SPA 패턴을 따릅니다.

## 주요 기능
- 행정사 사무소 소개, 서비스, 업무 프로세스, 자료실, 상담 안내 등 핵심 정보를 단일 페이지에서 제공
- 키보드 접근성을 고려한 탭 내비게이션 (Arrow/Home/End 키 지원)
- 반응형 레이아웃과 커스텀 스타일링으로 데스크톱/모바일에서 모두 쾌적한 사용성 제공

## 개발 환경
- Node.js 18 이상 권장
- Vite 5

## 사용 방법
```bash
npm install
npm run dev    # 개발 서버 실행
npm run build  # dist/ 디렉터리에 정적 빌드 출력
npm run preview # 빌드 결과 미리보기
```

빌드 결과로 생성되는 `dist/` 디렉터리를 GCS 버킷에 업로드하면 정적 호스팅 구성이 가능합니다.

## 이미지 배치 가이드
실제 사진 또는 그래픽을 적용해야 하는 지점은 아래와 같습니다. 모든 자산은 `public/images/` 하위에 저장하고, 필요 시 Vite의 정적 경로(`/images/...`)로 참조하면 됩니다.

- **히어로 섹션 배경 (`.hero-media`)**: 현재는 텍스트 플레이스홀더로 되어 있으므로, `src/main.js`의 `<div class="hero-media">` 안에 `<img src="/images/hero.jpg" alt="..." />`를 삽입하거나, `src/style.css`에서 `.hero`의 `background` 이미지를 교체합니다.
- **소개 카드 (`.intro-card .image-placeholder`)**: 대표 인물 사진과 사무공간 사진을 각각 `public/images/intro-founder.jpg`, `public/images/intro-office.jpg` 등으로 추가하고, `.intro-card:nth-of-type(1|2) .image-placeholder`에 `background-image`를 지정하거나 `<img>` 요소로 교체합니다.
- **구성원 카드 (`.profile-card .image-placeholder`)**: 세 개의 핵심 구성원 사진을 `public/images/team-*.jpg`로 준비해 `src/style.css`의 `.profile-card:nth-of-type(n) .image-placeholder`에 배경 이미지를 적용하거나 DOM에 `<img>` 태그를 추가합니다.
- **자문단 카드 (`.advisory-board .image-placeholder`)**: 네트워크 파트너 관련 사진은 현재 비어 있으므로, 필요 시 동일한 방식으로 배경 이미지를 지정합니다.

이미지 교체 시 접근성을 위해 `alt` 속성과 `aria-label`을 실제 콘텐츠에 맞게 갱신해 주세요.
