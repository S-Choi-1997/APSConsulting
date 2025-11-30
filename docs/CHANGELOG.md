# 업데이트 로그 (Changelog)

## Version 2.3.0 - 2025-11-30

### 🎯 주요 변경사항
**Contact 페이지 지도 연동 및 UI 개선**

### 📝 상세 변경 내역

#### 1. 구글 지도 API 연동
- `contact.html` - 카카오맵 → 구글 지도 API로 변경
- 지도 인증 성공 및 정상 작동 확인
- 마커 및 인포윈도우 표시 기능 추가

#### 2. 스타일 수정
- 색상 오류 수정 (CSS 안쪽 색상 개선)
- 탭 UI 업데이트 및 개선

---

## Version 2.2.0 - 2025-11-29

### 🎯 주요 변경사항
**홈 페이지 대대적 리디자인 - 차별화된 디자인과 인터랙티브 효과 추가**

---

## 📝 상세 변경 내역

### 1. 성공사례 섹션 제거 및 신규 섹션 추가

**제거된 섹션**:
- 성공사례 슬라이더 미리보기 섹션 (기존 index.html 231-284번 줄)
- "전체 사례 보기" 버튼

**추가된 섹션**:

#### 1.1 숫자로 보는 실적 섹션 (#stats)
**HTML 구조** (`index.html` 231-287번 줄):
```html
<section id="stats" class="section section-stats-home">
    <div class="stats-home-container">
        <div class="stats-header">
            <span class="section-subtitle">ACHIEVEMENTS</span>
            <h2 class="section-title">숫자로 증명하는 전문성</h2>
        </div>
        <div class="stats-grid">
            <!-- 4개의 stat-box (누적 성공사례, 고객 만족도, 평균 처리기간, 재의뢰율) -->
        </div>
    </div>
</section>
```

**주요 특징**:
- 4개의 통계 박스 (850건 성공사례, 98% 만족도, 15일 처리기간, 95% 재의뢰율)
- 각 박스에 애니메이션 아이콘
- 스크롤 시 숫자 카운팅 애니메이션 (`counter` 클래스)
- 어두운 그라데이션 배경 (#041f2f → #0a3d5a)

#### 1.2 선택하는 이유 섹션 (#why-us)
**HTML 구조** (`index.html` 289-344번 줄):
```html
<section id="why-us" class="section section-why-us">
    <div class="why-us-container">
        <div class="why-us-header">
            <span class="section-subtitle">WHY CHOOSE US</span>
            <h2 class="section-title">○○행정사를 선택하는 이유</h2>
        </div>
        <div class="why-us-grid">
            <!-- 4개의 why-card (풍부한 경험, 맞춤형 컨설팅, 투명한 프로세스, 사후관리) -->
        </div>
    </div>
</section>
```

**주요 특징**:
- 2x2 그리드 레이아웃 (4개 카드)
- 각 카드에 큰 숫자 (01, 02, 03, 04)
- 배경에 거대한 숫자 워터마크

---

### 2. 헤더 Sticky 적용 및 두께 증가

**변경 사항** (`main.css` 91-108번 줄):

```css
#header {
    position: sticky;           /* 기존: 미지정 (static) */
    top: 0;
    z-index: 1000;
    padding: 25px 0;           /* 기존: 20px → 25px (25% 증가) */
    background: rgba(4, 31, 47, 0.95);
    backdrop-filter: blur(10px);  /* 신규 추가 */
    transition: all 0.3s ease;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

#header.scrolled {
    padding: 18px 0;
    background: rgba(4, 31, 47, 0.98);
    box-shadow: 0 4px 30px rgba(0,0,0,0.15);
}
```

**효과**:
- 스크롤 시 헤더가 상단에 고정
- 블러 효과로 뒤 배경이 살짝 보임 (모던한 디자인)
- 스크롤하면 자동으로 더 얇아지며 그림자 강화

---

### 3. 과감한 인터랙티브 효과 추가

#### 3.1 숫자로 보는 실적 섹션 스타일

**배경 효과** (`main.css` 2057-2074번 줄):
```css
.section-stats-home {
    background: linear-gradient(135deg, #041f2f 0%, #0a3d5a 100%);
    padding: 100px 50px;
    position: relative;
    overflow: hidden;
}

.section-stats-home::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(157, 133, 109, 0.1) 0%, transparent 70%);
    border-radius: 50%;
}
```

**Stat Box 디자인** (`main.css` 2104-2175번 줄):

**기본 스타일**:
```css
.stat-box {
    background: rgba(255, 255, 255, 0.08);  /* 반투명 글라스모피즘 */
    backdrop-filter: blur(10px);             /* 블러 효과 */
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 50px 30px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**빛나는 효과 (Shine Effect)**:
```css
.stat-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.6s;
}

.stat-box:hover::before {
    left: 100%;  /* 마우스 올리면 빛이 왼쪽→오른쪽으로 이동 */
}
```

**Hover 효과**:
```css
.stat-box:hover {
    transform: translateY(-10px) scale(1.02);  /* 위로 뜨면서 확대 */
    background: rgba(157, 133, 109, 0.2);      /* 골드 색상으로 변경 */
    border-color: var(--second);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);   /* 강한 그림자 */
}
```

**아이콘 3D 회전 효과**:
```css
.stat-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--second) 0%, #b89a7d 100%);
    border-radius: 50%;
    transition: all 0.4s;
}

.stat-box:hover .stat-icon {
    transform: rotateY(360deg);  /* Y축 기준 360도 회전 */
}
```

#### 3.2 선택하는 이유 섹션 스타일

**카드 디자인** (`main.css` 2200-2275번 줄):

**기본 스타일**:
```css
.why-card {
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 20px;
    padding: 50px 40px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**상단 라인 애니메이션**:
```css
.why-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--second) 0%, #b89a7d 100%);
    transition: width 0.5s ease;
}

.why-card:hover::before {
    width: 100%;  /* 호버 시 라인이 0→100% 확장 */
}
```

**Hover 효과 (비대칭 이동)**:
```css
.why-card:hover {
    transform: translateX(10px);  /* 오른쪽으로 10px 이동 */
    border-color: var(--second);
    box-shadow: -10px 10px 40px rgba(157, 133, 109, 0.15);  /* 왼쪽 그림자 */
}
```

**숫자 확대 효과**:
```css
.why-number {
    font-size: 72px;
    font-weight: 900;
    color: var(--second);
    opacity: 0.3;
    transition: all 0.5s;
}

.why-card:hover .why-number {
    opacity: 1;            /* 투명도 30% → 100% */
    transform: scale(1.1); /* 10% 확대 */
}
```

**배경 숫자 워터마크**:
```css
.why-bg {
    position: absolute;
    bottom: -20px;
    right: -20px;
    font-size: 180px;
    font-weight: 900;
    color: rgba(157, 133, 109, 0.03);
    transition: all 0.5s;
}

.why-card:hover .why-bg {
    transform: scale(1.1) rotate(-5deg);  /* 확대 + 회전 */
    color: rgba(157, 133, 109, 0.06);     /* 약간 진하게 */
}
```

#### 3.3 업무분야 카드 개선

**모서리 효과** (`main.css` 2292-2308번 줄):
```css
.section-services-preview .service-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 60px 60px 0;
    border-color: transparent var(--second) transparent transparent;
    opacity: 0;
    transition: opacity 0.4s;
}

.section-services-preview .service-card:hover::after {
    opacity: 0.1;  /* 호버 시 오른쪽 상단에 삼각형 표시 */
}
```

**아이콘 회전 효과**:
```css
.section-services-preview .service-card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);  /* 확대 + 5도 회전 */
}
```

#### 3.4 CTA 섹션 회전 배경

**회전하는 그라데이션** (`main.css` 2328-2348번 줄):
```css
.section-cta {
    background: linear-gradient(135deg, #041f2f 0%, #0a3d5a 50%, #041f2f 100%);
    position: relative;
    overflow: hidden;
}

.section-cta::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(157, 133, 109, 0.1) 0%, transparent 50%);
    animation: rotate 30s linear infinite;
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

**버튼 물결(Ripple) 효과** (`main.css` 2360-2388번 줄):
```css
.cta-buttons .btn-primary,
.cta-buttons .btn-outline {
    border-radius: 50px;  /* 완전한 둥근 버튼 */
    position: relative;
    overflow: hidden;
}

.cta-buttons .btn-primary::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.cta-buttons .btn-primary:hover::before {
    width: 300px;
    height: 300px;  /* 중앙에서 원형으로 퍼지는 효과 */
}
```

---

### 4. 반응형 디자인 추가

**태블릿 (1024px 이하)** (`main.css` 2391-2399번 줄):
```css
@media (max-width: 1024px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);  /* 4열 → 2열 */
    }

    .why-us-grid {
        grid-template-columns: 1fr;  /* 2열 → 1열 */
    }
}
```

**모바일 (768px 이하)** (`main.css` 2401-2417번 줄):
```css
@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;  /* 2열 → 1열 */
    }

    .stat-box {
        padding: 40px 25px;  /* 패딩 축소 */
    }

    .why-card {
        padding: 40px 30px;
    }

    .stats-header .section-title {
        font-size: 32px;  /* 42px → 32px */
    }
}
```

---

## 📊 변경 사항 요약

### 제거된 콘텐츠
- ❌ `index.html` - 성공사례 슬라이더 섹션 (54줄 삭제)

### 추가된 콘텐츠
- ✅ `index.html` - 숫자로 보는 실적 섹션 (57줄 추가)
- ✅ `index.html` - 선택하는 이유 섹션 (56줄 추가)
- ✅ `main.css` - 홈 페이지 리디자인 스타일 (365줄 추가)

### 수정된 콘텐츠
- ✅ `main.css` - 헤더 Sticky 및 Blur 효과
- ✅ `main.css` - 업무분야 카드 hover 효과 강화
- ✅ `main.css` - CTA 섹션 회전 배경 및 Ripple 효과

### CSS 라인 수
- **Version 2.1.0**: 2,010줄
- **Version 2.2.0**: 2,462줄 (+452줄)

### 주요 개선사항
1. **차별화된 디자인**: 템플릿처럼 보이지 않는 독창적인 디자인
2. **인터랙티브 효과**: 13가지 고급 CSS 애니메이션 및 효과
   - Glassmorphism (유리 효과)
   - 3D 회전 (rotateY)
   - Shine/Shimmer 효과
   - Ripple 효과
   - 비대칭 그림자
   - 회전하는 배경
   - 숫자 카운팅 애니메이션
3. **Sticky 헤더**: 스크롤 시 상단 고정 + 블러 효과
4. **성능 최적화**: cubic-bezier 이징으로 부드러운 애니메이션
5. **완벽한 반응형**: 모든 화면 크기 대응

---

## Version 2.1.0 - 2025-11-29

### 🎯 주요 변경사항
**SPA(Single Page Application)에서 다중 페이지 구조로 전환**

---

## 📝 상세 변경 내역

### 1. 파일 경로 수정
**문제**: CSS와 JS 파일이 로드되지 않음

**원인**:
- HTML에서 `./css/main.css`, `./js/main.js` 경로로 참조
- 실제 파일은 프로젝트 루트에 `main.css`, `main.js`로 존재

**수정**:
```html
<!-- 변경 전 -->
<link rel="stylesheet" href="./css/main.css">
<script src="./js/main.js"></script>

<!-- 변경 후 -->
<link rel="stylesheet" href="./main.css">
<script src="./main.js"></script>
```

**파일**: `index.html` (28번, 456번 줄)

---

### 2. 이미지 Placeholder 추가
**문제**: 이미지 파일이 없을 때 빈 공간으로 표시

**해결**: 각 이미지 영역마다 다른 색상의 그라데이션 배경 추가

**추가된 스타일** (`main.css`):
```css
/* 로고 */
.logo img {
    background: linear-gradient(135deg, #041f2f 0%, #0a3d5a 100%);
}

/* 메인 슬라이더 배경 */
.slide-bg.bg01 { background: linear-gradient(135deg, #2c5f7e 0%, #1a3a4d 100%); }
.slide-bg.bg02 { background: linear-gradient(135deg, #4a7c9d 0%, #2d5470 100%); }
.slide-bg.bg03 { background: linear-gradient(135deg, #6b9ab8 0%, #4a7c9d 100%); }

/* 팀 사진 */
.team-photo {
    background: linear-gradient(135deg, #9d856d 0%, #7a6551 100%);
    min-height: 500px;
}

/* 푸터 로고 */
.footer-logo {
    background: linear-gradient(135deg, #041f2f 0%, #0a3d5a 100%);
}
```

**파일**: `main.css` (1158-1201번 줄)

---

### 3. 페이지 구조 변경 (SPA → 다중 페이지)

#### 3.1 생성된 페이지

**index.html** - 메인 페이지 (간소화)
- 메인 비주얼 슬라이더 (기존 유지)
- 간략한 회사 소개 섹션
- 주요 업무분야 카드 (4개, 아이콘 추가)
- 성공사례 미리보기 (슬라이더)
- CTA 섹션 (상담 신청 유도)

**about.html** - 회사소개 페이지
- 페이지 헤더 (타이틀 배너)
- 회사 상세 소개
- 전문성/신뢰성/신속성 특징 (3개 카드)
- 비전/미션/가치 (3개 카드)
- 팀 소개 슬라이더

**services.html** - 업무분야 페이지
- 4개 업무분야 상세 설명
  - 인허가 행정
  - 기업인증 및 컨설팅
  - 부동산인허가 및 토지보상
  - 민원행정 및 행정심판
- 각 분야별 세부 항목 리스트
- 업무 진행 프로세스 (5단계)

**cases.html** - 성공사례 페이지
- 8개 성공사례 상세 (카테고리별)
- 통계 섹션 (누적 사례 850건, 만족도 98%, 평균 처리 15일, 재의뢰율 95%)
- 그리드 레이아웃 (2열)

**contact.html** - 상담신청 페이지
- 상담 방법 안내 (전화/이메일/방문)
- 온라인 상담 신청 폼
- 오시는 길 (지도 placeholder)

#### 3.2 네비게이션 수정
모든 페이지의 헤더 메뉴 링크 변경:
```html
<!-- 변경 전 (앵커 링크) -->
<a href="#about">회사소개</a>
<a href="#services">업무분야</a>

<!-- 변경 후 (페이지 링크) -->
<a href="about.html">회사소개</a>
<a href="services.html">업무분야</a>
```

---

### 4. CSS 추가 (새 페이지 지원)

#### 4.1 공통 스타일

**정적 헤더** (서브 페이지용):
```css
.header-static {
    position: relative;
    background: var(--primary);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

**페이지 헤더** (타이틀 배너):
```css
.page-header {
    background: linear-gradient(135deg, var(--primary) 0%, #0a3d5a 100%);
    padding: 120px 50px 80px;
    text-align: center;
    color: #fff;
}

.page-title {
    font-size: 48px;
    font-weight: 700;
}
```

**버튼 스타일**:
```css
.btn-primary {
    padding: 14px 32px;
    background: var(--second);
    color: #fff;
    border-radius: 6px;
}

.btn-outline {
    padding: 14px 32px;
    background: transparent;
    border: 2px solid var(--second);
    color: var(--second);
}
```

#### 4.2 회사소개 페이지

- `.section-about-detail`: 2열 그리드 (텍스트 + 특징)
- `.feature-item`: 전문성/신뢰성/신속성 카드 (hover 시 배경 변경)
- `.vision-card`: 비전/미션/가치 카드 (3열 그리드)

#### 4.3 업무분야 페이지

- `.service-detail-card`: 2열 그리드, 각 카드에 아이콘/제목/설명/리스트
- `.process-container`: 5단계 프로세스 (화살표로 연결)

#### 4.4 성공사례 페이지

- `.case-item`: 2열 그리드, 카테고리 태그 포함
- `.section-stats`: 통계 섹션 (4열 그리드, 카운터 애니메이션)

#### 4.5 상담신청 페이지

- `.contact-method-card`: 3열 그리드 (전화/이메일/방문)
- `.contact-form-container`: 2열 그리드 (설명 + 폼)
- `.location-container`: 2열 그리드 (지도 + 정보)

**파일**: `main.css` (1158-1961번 줄)

---

### 5. 모바일 전화 버튼 개선

**문제**: 아이콘이 중앙에 정렬되지 않음

**수정**:
```css
.mobile-call-btn {
    width: 60px;
    height: 60px;
    background: var(--second);
    /* display: flex 제거 */
}

.mobile-call-btn svg {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**추가 개선**:
- 크기: 65px → 60px
- 위치: right 15px → 20px, bottom 20px → 25px
- 배경색: var(--primary) → var(--second) (골드 색상)
- 그림자: 브랜드 색상 사용

**파일**: `main.css` (999-1025번 줄)

---

### 6. Contact 페이지 폼 개선

#### 6.1 문제점 발견
**증상**:
- Label(이름, 연락처 등)이 입력창 안으로 들어감
- Placeholder와 label이 겹침
- 입력창이 삐져나가고 폼이 망가짐

**원인**:
기존 SPA 버전의 폼 스타일이 contact.html에도 적용됨
```css
/* 기존 스타일 - label이 input 안에 absolute position */
.form-group label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
}
```

#### 6.2 해결 방법

**Step 1**: 기존 폼 스타일 범위 제한
```css
/* 변경 전 - 모든 폼에 적용 */
.form-group { ... }

/* 변경 후 - index.html의 #contact 섹션에만 적용 */
#contact .form-group { ... }
```

**파일**: `main.css` (504-568번 줄)

**Step 2**: Contact 페이지 폼 전용 스타일 추가

**폼 구조**:
```css
.contact-form {
    display: flex;
    flex-direction: column;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 25px;
}
```

**레이아웃**:
- 첫 번째 줄: 이름 | 연락처
- 두 번째 줄: 이메일 | 상담 분야
- 세 번째 줄: 상담내용 (전체 너비)

**Label 스타일**:
```css
.form-group label {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 12px;
    display: block;
}
```

**Input/Select 스타일**:
```css
.form-group input,
.form-group select {
    height: 52px;
    padding: 16px 20px;
    font-size: 15px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
}
```

**Textarea 스타일**:
```css
.form-group textarea {
    min-height: 180px;
    padding: 16px 20px;
    resize: vertical;
}
```

**상담내용 섹션 분리**:
```css
.form-group.full {
    width: 100%;
    margin-top: 15px;
    padding-top: 25px;
    border-top: 2px solid #f5f5f5;
}

.form-group.full label {
    font-size: 16px;
    font-weight: 700;
    color: var(--primary);
}
```

**Focus 효과**:
```css
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: var(--second);
    outline: none;
    box-shadow: 0 0 0 3px rgba(157, 133, 109, 0.1);
}
```

**Select 드롭다운**:
```css
.form-group select {
    appearance: none;
    background-image: url("data:image/svg+xml,...");
    background-position: right 18px center;
    cursor: pointer;
}
```

**체크박스 & 버튼**:
```css
.privacy-check input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--second);
}

.submit-btn {
    padding: 16px 50px;
    font-size: 16px;
    font-weight: 600;
    background: var(--second);
    border-radius: 6px;
}

.submit-btn:hover {
    background: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

**파일**: `main.css` (1797-1897번 줄)

---

### 7. 반응형 디자인

모든 새 페이지에 반응형 스타일 추가:

**1024px 이하** (태블릿):
- 2열 그리드 → 1열로 변경
- 통계 섹션: 4열 → 2열
- 프로세스 화살표 숨김

**768px 이하** (모바일):
- 페이지 타이틀 크기 축소 (48px → 32px)
- 폼 입력 2열 → 1열
- CTA 버튼 세로 정렬
- 통계 섹션: 2열 → 1열

**파일**: `main.css` (1903-1961번 줄)

---

## 📊 변경 사항 요약

### 파일 생성/수정
- ✅ `index.html` - 수정 (간소화)
- ✅ `about.html` - 신규 생성
- ✅ `services.html` - 신규 생성
- ✅ `cases.html` - 신규 생성
- ✅ `contact.html` - 신규 생성
- ✅ `main.css` - 대폭 수정 (808줄 추가)
- ✅ `main.js` - 수정 없음 (기존 기능 유지)
- ✅ `CHANGELOG.md` - 신규 생성

### CSS 라인 수
- 기존: 1,202줄
- 추가: 808줄
- 총: 2,010줄

### 주요 개선사항
1. **페이지 분리**: 1페이지 → 5페이지
2. **네비게이션**: 앵커 링크 → 페이지 링크
3. **폼 개선**: 스타일 충돌 해결, UX 개선
4. **반응형**: 모든 페이지 반응형 지원
5. **이미지**: Placeholder로 임시 표시

---

## 🚀 다음 버전 예정 사항

### Version 2.2.0 (예정)
- [ ] 실제 이미지 추가
- [ ] 폼 백엔드 연동
- [ ] 구글/네이버 지도 API 연동
- [ ] 추가 애니메이션 효과
- [ ] SEO 최적화 강화
- [ ] 성능 최적화 (lazy loading 등)

---

**Last Updated**: 2025-11-29
**Version**: 2.1.0
**Author**: Claude Code
