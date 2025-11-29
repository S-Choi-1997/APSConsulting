# CLAUDE.md - APSConsulting 저장소 AI 어시스턴트 가이드

## 프로젝트 개요

**프로젝트명**: APS 행정사사무소 & APS 컨설팅 그룹 웹사이트
**타입**: 단일 페이지 애플리케이션(SPA) - 정적 웹사이트
**기술 스택**: 바닐라 JavaScript, Vite, CSS
**배포**: Google Cloud Storage (정적 호스팅)
**언어**: 한국어 (ko)

APS 행정사사무소 및 APS 컨설팅 그룹의 전문 컨설팅 회사 웹사이트입니다. 단일 페이지 탭 인터페이스로 서비스, 팀 구성원, 파트너십 및 연락처 정보를 제공합니다.

---

## 저장소 구조

```
APSConsulting/
├── src/
│   ├── main.js          # 메인 애플리케이션 로직 & HTML 생성 (518줄)
│   └── style.css        # 모든 스타일링 및 반응형 디자인
├── public/
│   └── favicon.svg      # 사이트 파비콘
├── node_modules/        # 의존성 패키지 (gitignored)
├── dist/                # 빌드 결과물 (gitignored)
├── index.html           # 진입점
├── package.json         # 의존성 및 스크립트
├── vite.config.js       # Vite 설정
├── .gitignore          # Git 무시 규칙
├── readme.md           # 프로젝트 문서 (한국어)
├── fix.md              # 수정 변경 로그
└── CLAUDE.md           # 이 파일 - AI 어시스턴트 가이드
```

---

## 아키텍처 및 디자인 패턴

### 1. **단일 JavaScript 파일 아키텍처**
- **모든 HTML이 JavaScript에서 생성됨** - `src/main.js:5-518`에서 템플릿 리터럴 사용
- 런타임에 `#app` div에 콘텐츠 주입
- 별도의 HTML 템플릿이나 컴포넌트 없음
- 전체 DOM 구조가 하나의 큰 템플릿 리터럴로 정의됨

### 2. **탭 기반 내비게이션 시스템**
- 탭 내비게이션으로 제어되는 멀티 섹션 콘텐츠
- 섹션: 소개, 구성원, 업무, 협력 네트워크, 전문 자문, 소식, 문의
- **뷰 활성화 패턴**:
  - 각 섹션은 `data-view` 속성을 가짐
  - 내비게이션 버튼은 `data-target` 속성을 가짐
  - JavaScript가 뷰와 내비게이션 링크의 `.active` 클래스를 토글함
  - `src/main.js:493-506`의 `activateView()` 함수 참조

### 3. **반응형 디자인 전략**
- **모바일 우선 접근법**: 모바일용 기본 스타일, 데스크톱용 미디어 쿼리
- **햄버거 메뉴**: 모바일 내비게이션은 토글 버튼(`.menu-toggle`) 사용
- **CSS 커스텀 프로퍼티**: `:root` 변수를 통한 중앙화된 테마
- **주요 브레이크포인트**:
  - 모바일: < 768px (스택 레이아웃, 햄버거 메뉴)
  - 태블릿: 768px - 1024px (전환 레이아웃)
  - 데스크톱: > 1024px (전체 멀티 컬럼 레이아웃)

### 4. **접근성 고려사항**
- 전반적인 ARIA 레이블: `aria-label`, `aria-labelledby`, `aria-expanded`
- 시맨틱 HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- 키보드 내비게이션 지원
- 탭 내비게이션용 포커스 관리
- 이미지 플레이스홀더용 role 속성

---

## 주요 컨벤션 및 코드 스타일

### JavaScript 컨벤션

1. **변수 네이밍**: 모든 변수는 camelCase 사용
   ```javascript
   const currentYear = new Date().getFullYear();
   const primaryNav = document.querySelector('.primary-nav');
   ```

2. **문자열 템플릿**: HTML 생성을 위한 멀티라인 템플릿 리터럴
   ```javascript
   document.querySelector('#app').innerHTML = `
     <div class="page">
       ...
     </div>
   `;
   ```

3. **이벤트 핸들링**: 이벤트 위임 및 직접 리스너
   - 내비게이션 링크와 버튼에 직접 리스너 사용
   - 별도의 이벤트 위임 프레임워크 없음

4. **DOM 선택**: 전반적으로 `querySelector`와 `querySelectorAll` 사용

### CSS 컨벤션

1. **네이밍 패턴**: BEM 방식에서 영감을 받았지만 엄격하지 않음
   - Block: `.site-header`, `.hero`, `.service-card`
   - Element: `.header-inner`, `.hero-text`, `.brand-block`
   - Modifier: `.active`, `.primary`, `.ghost`

2. **컬러 스킴**: 부드러운 블루 전문가 팔레트
   - 배경: `#fafafa` (연한 회색)
   - 주요색: `#1e40af` / `#1e3a8a` (어두운 네이비 블루)
   - 텍스트: `#2c3e50` (부드러운 다크)
   - 강조색: 블루 그라데이션 변형

3. **레이아웃 접근법**:
   - Flexbox: 1차원 레이아웃 (헤더, 푸터, 행)
   - Grid: 2차원 레이아웃 (카드 그리드, 폼 레이아웃)
   - CSS 커스텀 프로퍼티로 테마 관리: `var(--header-height)`, `var(--footer-height)`

4. **간격**: 반응형 크기 조정을 위한 `clamp()` 사용
   ```css
   padding: 12px clamp(20px, 5vw, 64px);
   gap: clamp(20px, 3vw, 40px);
   ```

---

## 개발 워크플로우

### 설정
```bash
npm install          # 의존성 설치 (vite만)
npm run dev          # 개발 서버 시작 (http://localhost:5173)
npm run build        # 프로덕션 빌드 (dist/에 출력)
npm run preview      # 프로덕션 빌드 미리보기
```

### Git 워크플로우

1. **메인 브랜치**: `main` (현재 상태에서는 피처 브랜치 사용 중)
2. **현재 브랜치**: `claude/claude-md-mijy9x1y7snc3uqu-01GXBV6U3tSDgQgBqT5B8B3f`
3. **브랜치 네이밍**: 피처 브랜치는 설명적인 이름 사용
   - 예시: `codex/refactor-header-and-footer-layout`, `codex/update-footer-and-header-layout`
4. **커밋 메시지**: 한국어, 설명적으로 작성
   - 예시: "모바일 네비바 수정", "Refine header and footer layout"

### 빌드 및 배포 프로세스

1. **빌드 명령**: `npm run build`
   - `dist/` 디렉터리에 정적 파일 생성
   - Vite가 JavaScript와 CSS 번들링
   - 유연한 배포를 위해 기본 경로를 `./`로 설정 (`vite.config.js:4` 참조)

2. **배포 대상**: Google Cloud Storage 버킷
   - `dist/` 내용을 GCS 버킷에 업로드
   - 정적 웹사이트 호스팅용 버킷 설정
   - 서버 사이드 렌더링이나 API 엔드포인트 없음

---

## 일반 작업 및 패턴

### 새로운 섹션/탭 추가하기

1. **내비게이션 버튼 추가** - 헤더 `<nav>` 안에 (`src/main.js:23-29` 부근)
   ```javascript
   <li><button type="button" class="nav-link" data-target="new-section">새 섹션</button></li>
   ```

2. **섹션 HTML 생성** - 메인 콘텐츠 영역에
   ```javascript
   <section data-view="new-section" class="view">
     <section class="section">
       <div class="section-heading">
         <h2>섹션 제목</h2>
         <p>설명</p>
       </div>
       <!-- 콘텐츠 여기에 -->
     </section>
   </section>
   ```

3. **스타일 추가** - `src/style.css`에
   - `.section`, `.section-heading` 등의 기존 패턴 따르기
   - 일관된 간격과 컬러 스킴 사용

### 스타일 수정하기

1. **전역 색상/간격**: `src/style.css:1-11`의 `:root` 변수 편집
2. **컴포넌트별**: 컴포넌트 클래스를 찾아 직접 편집
3. **반응형 조정**: CSS 파일 하단의 미디어 쿼리 확인
4. **테스트**: 항상 모바일 (< 768px)과 데스크톱 (> 1024px)에서 테스트

### 이미지 추가하기

이미지는 `public/images/` 디렉터리에 배치해야 합니다:

1. **히어로 섹션 배경**:
   - 이미지 추가: `public/images/hero.jpg`
   - CSS의 `.hero` 배경을 업데이트하거나 `src/main.js:51-53` 수정

2. **프로필/팀 사진**:
   - 이미지 추가: `public/images/team-*.jpg`
   - `.image-placeholder` 요소를 `<img>` 태그로 교체
   - 또는 플레이스홀더에 `background-image` CSS 추가

3. **참조 경로**: `/images/filename.jpg` 사용 (Vite가 `public/`에서 해석)

---

## 주요 파일 참조

### src/main.js
- **1-5줄**: Import 및 설정
- **5-488줄**: 템플릿 리터럴로 작성된 완전한 HTML 구조
- **489-518줄**: 이벤트 리스너 및 뷰 활성화 로직
- **주요 함수**:
  - `activateView(viewName)`: 493-506줄 - 탭 간 전환

### src/style.css
- **1-11줄**: CSS 커스텀 프로퍼티 (테마 변수)
- **13-45줄**: 전역 리셋 및 기본 스타일
- **47-155줄**: 헤더 및 내비게이션 스타일
- **156-300+줄**: 컴포넌트별 스타일 (히어로, 섹션, 카드 등)
- **하단 섹션**: 반응형 디자인을 위한 미디어 쿼리

### index.html
- 간단한 진입점
- 최소한의 head (메타 태그, 제목, 파비콘)
- JavaScript 주입을 위한 빈 `#app` div
- 모듈 스크립트 import: `/src/main.js`

### vite.config.js
- **4줄**: `base: './'` - 유연한 배포를 위한 상대 경로
- 최소한의 설정, Vite 기본값 사용

---

## 알려진 이슈 및 기술 부채

### 현재 상태 (fix.md 기준)

1. **헤더/푸터 컴팩트화** (2024-06-22)
   - 최근 헤더를 단일 행 레이아웃으로 축소
   - 모바일 패딩을 조정하여 과도한 높이 감소
   - 푸터를 한 줄 레이아웃으로 슬림화

2. **컬러 팔레트 조정** (2024-06-21)
   - 높은 대비의 흑백에서 부드러운 블루 팔레트로 변경
   - 헤더: 어두운 네이비 (`rgba(30, 58, 138, 0.95)`)
   - 배경: 연한 회색 (`#fafafa`)

### 개선 가능 사항

1. **코드 구조**: `main.js`를 별도 모듈로 분리 고려
   - HTML 템플릿
   - 이벤트 핸들러
   - 유틸리티 함수

2. **이미지 플레이스홀더**: 많은 `.image-placeholder` 요소에 실제 이미지 필요
   - 히어로 섹션: `src/main.js:51`
   - 소개 카드: `src/main.js:65, 76`
   - 프로필 카드: 팀 구성원 사진
   - 자문 카드: 서비스 이미지

3. **접근성**: 탭 전환을 위한 키보드 내비게이션 추가 (화살표 키, Home, End)

4. **성능**: 이미지 추가 시 레이지 로딩 고려

---

## AI 어시스턴트 가이드라인

### 변경 작업 시

1. **항상 먼저 읽기**: 파일을 수정하기 전에 반드시 먼저 읽기
   - 현재 HTML 구조를 이해하기 위해 `src/main.js` 읽기
   - 스타일링 패턴을 이해하기 위해 `src/style.css` 읽기

2. **일관성 유지**:
   - 기존 네이밍 패턴 따르기 (JS는 camelCase, CSS는 kebab-case)
   - 기존 코드 스타일과 일치 (간격, 들여쓰기)
   - 사용자 대면 텍스트는 한국어 사용
   - 필요시 코드 주석은 영어 사용

3. **반응형 디자인**:
   - 모바일과 데스크톱에서 변경사항 작동 테스트
   - 반응형 간격을 위해 `clamp()` 사용
   - 모바일에서 햄버거 메뉴가 여전히 작동하는지 확인

4. **접근성**:
   - 새로운 인터랙티브 요소에 ARIA 레이블 추가
   - 시맨틱 HTML 요소 사용
   - 키보드 내비게이션 작동 확인

5. **Git 워크플로우**:
   - 지정된 피처 브랜치에서 작업
   - 설명적인 커밋 메시지 사용
   - 요청받았을 때만 원격 저장소에 푸시
   - main/master에 절대 force push 하지 않기

### 일반적인 요청

1. **"새 섹션 추가"**: 위의 "새로운 섹션/탭 추가하기" 패턴 따르기
2. **"색상 변경"**: 먼저 `style.css`의 `:root` 변수 편집
3. **"모바일 레이아웃 수정"**: 미디어 쿼리와 햄버거 메뉴 기능 확인
4. **"이미지 추가"**: `public/images/`에 배치, 참조 업데이트, alt 텍스트 추가
5. **"콘텐츠 업데이트"**: `main.js`의 템플릿 리터럴 수정, HTML 구조 유지

### 테스트 체크리스트

변경사항을 완료로 간주하기 전에:

- [ ] `npm run dev` 실행하고 시각적으로 변경사항 확인
- [ ] 모바일 너비 (< 768px)에서 테스트
- [ ] 데스크톱 너비 (> 1024px)에서 테스트
- [ ] 모든 탭이 여전히 올바르게 탐색되는지 확인
- [ ] 모바일에서 햄버거 메뉴 작동 확인
- [ ] `npm run build` 실행하여 빌드 에러 없는지 확인
- [ ] 콘솔에 JavaScript 에러 없는지 확인

---

## 의존성

### 프로덕션 의존성
없음 - 순수 바닐라 JavaScript

### 개발 의존성
- **vite** (^5.2.0): 빌드 도구 및 개발 서버
  - 빠른 HMR (Hot Module Replacement)
  - ES 모듈 지원
  - 최적화된 프로덕션 빌드

### 프레임워크를 사용하지 않는 이유는?
- 제한된 상호작용을 가진 단순한 사이트
- 프레임워크 오버헤드 없이 빠른 로딩 시간
- 정적 파일로 쉬운 배포
- 최소한의 빌드 복잡도

---

## 연락처 및 지원

이 코드베이스에 대한 질문이 있는 경우:
1. 프로젝트 개요는 `readme.md` 확인 (한국어)
2. 최근 변경사항 및 컨텍스트는 `fix.md` 확인
3. 개발 가이드라인은 이 파일 검토
4. 변경하기 전에 기존 코드 패턴 검토

**사이트 연락처**: contact@apsconsulting.kr
**주소**: 서울 서초구 반포대로 20, 정주빌딩 6층 1호

---

## 버전 히스토리

- **현재 버전**: v0.0.1 (package.json 기준)
- **최근 업데이트**: 2025-11-29 (CLAUDE.md 생성)
- **최근 변경사항**: 자세한 변경 로그는 `fix.md` 참조

---

*이 문서는 이 코드베이스에서 작업하는 AI 어시스턴트를 위해 유지됩니다. 중요한 아키텍처 변경 시 업데이트하세요.*
