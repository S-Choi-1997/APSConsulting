import './style.css';

const navStructure = [
  {
    label: '소개',
    links: [
      { label: '인사말', href: '#about-greeting' },
      { label: '오시는 길', href: '#about-map' },
    ],
  },
  {
    label: '구성원',
    links: [
      { label: '대표행정사', href: '#members-lead' },
      { label: '컨설팅(주)', href: '#members-consulting' },
      { label: '고문단', href: '#members-advisors' },
    ],
  },
  {
    label: '업무',
    links: [
      { label: '추진업무영역', href: '#practice-domains' },
      { label: '업무진행절차', href: '#practice-process' },
    ],
  },
  {
    label: '업무협약',
    links: [
      { label: '업무협약기관', href: '#partnerships' },
      { label: '부설기관', href: '#affiliates' },
    ],
  },
  {
    label: '자문회사',
    links: [{ label: '자문회사', href: '#clients' }],
  },
  {
    label: '소식',
    links: [
      { label: '소식', href: '#news' },
      { label: '뉴스레터', href: '#newsletter' },
    ],
  },
];

const navListHtml = navStructure
  .map(
    (section, index) => `
      <li class="nav-item">
        <button
          class="dropdown-toggle"
          type="button"
          aria-expanded="false"
          aria-haspopup="true"
          aria-controls="dropdown-${index}"
          data-target="dropdown-${index}"
        >
          <span>${section.label}</span>
          <span class="chevron" aria-hidden="true"></span>
        </button>
        <ul class="dropdown" id="dropdown-${index}" role="menu">
          ${section.links
            .map(
              (link) => `
                <li role="none">
                  <a role="menuitem" href="${link.href}">${link.label}</a>
                </li>
              `,
            )
            .join('')}
        </ul>
      </li>
    `,
  )
  .join('');

document.querySelector('#app').innerHTML = `
  <div class="site-wrapper">
    <header class="fixed-header" id="header">
      <div class="top-bar">
        <a class="brand-mark" href="#top" aria-label="에이스랩행정사합동사무소 &amp; 에이스랩컨설팅(주) 홈">
          <span class="brand-primary">에이스랩행정사합동사무소</span>
          <span class="brand-divider">&amp;</span>
          <span class="brand-secondary">에이스랩컨설팅(주)</span>
        </a>
        <a class="lang-link" href="#" aria-label="English page 준비 중">EN</a>
      </div>
      <nav class="nav-bar" aria-label="주 메뉴">
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list">
          <span class="nav-toggle-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="nav-toggle-label">메뉴</span>
        </button>
        <ul class="nav-list" id="nav-list">
          ${navListHtml}
        </ul>
      </nav>
    </header>

    <main id="top" class="main-content" tabindex="-1">
      <section class="hero" tabindex="-1" aria-labelledby="hero-title">
        <div class="section-inner hero-inner">
          <p class="hero-super">에이스랩행정사합동사무소 &amp; 에이스랩컨설팅(주)</p>
          <h1 id="hero-title">그 가능성은 무한대입니다.</h1>
          <p class="hero-description">
            공공 행정과 기업 컨설팅을 잇는 토탈 솔루션으로 민원, 인허가, 해외진출, 경영 전략까지
            한 번에 해결합니다. 현장 경험과 최신 정책 인사이트를 바탕으로 고객의 잠재력을 실현합니다.
          </p>
          <div class="hero-actions">
            <a class="hero-cta" href="#contact">상담 예약하기</a>
            <a class="hero-secondary" href="#practice-domains">주요 업무 보기</a>
          </div>
        </div>
      </section>

      <section id="about-greeting" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">인사말</h2>
            <p class="section-subtitle">
              에이스랩은 변하는 제도와 복잡한 행정환경 속에서도 고객의 목표를 실현하는 것을 최우선으로 합니다.
              행정사, 세무사, 노무사, 변호사 네트워크가 함께하는 융합형 전문 조직입니다.
            </p>
          </header>
          <div class="grid grid-2">
            <article class="card accent-card">
              <h3>고객과 함께 성장하는 파트너</h3>
              <p>
                초기 상담부터 결과 보고까지 모든 과정을 투명하게 공유하며, 고객의 비즈니스 전략을 이해하는
                든든한 조력자가 되겠습니다.
              </p>
              <ul class="feature-list">
                <li>기업·공공 프로젝트 1,200건 이상 수행</li>
                <li>산업별 맞춤 전략 수립 및 실행 지원</li>
                <li>지속 가능한 사후 관리 체계 운영</li>
              </ul>
            </article>
            <article class="card">
              <h3>핵심 가치</h3>
              <p class="card-description">
                전문성과 신뢰, 그리고 실행력. 세 가지 가치를 기반으로 고객의 기회를 확장하고 위험을 줄입니다.
              </p>
              <div class="pill-list">
                <span>투명한 커뮤니케이션</span>
                <span>정확한 법령 해석</span>
                <span>신속한 대응</span>
                <span>성과 중심 사고</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="about-map" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">오시는 길</h2>
            <p class="section-subtitle">
              서초 본사와 전국 협력 네트워크를 통해 가까운 곳에서 전문 상담을 받아보세요.
            </p>
          </header>
          <div class="map-layout">
            <div class="map-embed" role="presentation" aria-hidden="true">
              <span>지도 이미지 자리</span>
            </div>
            <article class="card contact-card">
              <h3>서울 서초 본사</h3>
              <dl class="detail-list">
                <div>
                  <dt>주소</dt>
                  <dd>[06716] 서울 서초구 반포대로 20 정주빌딩 6층 1호</dd>
                </div>
                <div>
                  <dt>Tel</dt>
                  <dd><a href="tel:0220550211">02-2055-0211</a></dd>
                </div>
                <div>
                  <dt>Fax</dt>
                  <dd>02-6941-0219</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:ceo@acelap.co.kr">ceo@acelap.co.kr</a></dd>
                </div>
              </dl>
              <p class="parking-note">방문 상담은 사전 예약제로 운영되며, 건물 내 주차 1시간 무료입니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="members-lead" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">대표행정사</h2>
            <p class="section-subtitle">다양한 인허가 경험과 글로벌 프로젝트 경력을 갖춘 전문가들이 직접 대응합니다.</p>
          </header>
          <div class="grid grid-3">
            <article class="card profile-card">
              <h3>김도현 대표행정사</h3>
              <p>전 중앙부처 심의위원 출신으로 복잡한 민원과 인허가 컨설팅을 전문으로 합니다.</p>
              <ul class="feature-list">
                <li>주요 프로젝트: 신재생에너지 발전 허가, 산업단지 조성</li>
                <li>자격: 행정사, 산업안전지도사</li>
              </ul>
            </article>
            <article class="card profile-card">
              <h3>박지연 대표행정사</h3>
              <p>외국인 투자 및 체류 자격 분야의 전문 컨설턴트로 글로벌 기업을 지원합니다.</p>
              <ul class="feature-list">
                <li>주요 프로젝트: 스타트업 투자비자, 글로벌 인재 유치</li>
                <li>자격: 행정사, 국제무역사</li>
              </ul>
            </article>
            <article class="card profile-card">
              <h3>이성우 대표행정사</h3>
              <p>기업 규정 정비와 공공 입찰 대응 전략 수립을 담당하며 민관 협력 경험이 풍부합니다.</p>
              <ul class="feature-list">
                <li>주요 프로젝트: 공기업 적격심사 자문, ESG 규정 수립</li>
                <li>자격: 행정사, 경영지도사</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="members-consulting" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">에이스랩컨설팅(주)</h2>
            <p class="section-subtitle">
              행정업무 이후의 전략 컨설팅, 데이터 분석, 교육 프로그램까지 통합 서비스를 제공합니다.
            </p>
          </header>
          <div class="grid grid-2">
            <article class="card">
              <h3>비즈니스 전략실</h3>
              <p>공공 프로젝트 기획, 정책 연구, 투자 유치 전략을 총괄합니다.</p>
              <ul class="feature-list">
                <li>공공사업 제안서 및 로드맵 설계</li>
                <li>데이터 기반 정책 분석 보고서 작성</li>
                <li>민관 협력 모델 개발</li>
              </ul>
            </article>
            <article class="card">
              <h3>교육 &amp; 역량개발실</h3>
              <p>기업과 기관을 위한 맞춤형 행정·규제 교육 프로그램을 운영합니다.</p>
              <ul class="feature-list">
                <li>신규 제도 대응 워크숍</li>
                <li>전문가 네트워킹 세미나</li>
                <li>온라인 콘텐츠 &amp; 실습 자료 제공</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="members-advisors" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">고문단</h2>
            <p class="section-subtitle">세무, 법무, 노무, 산업안전 등 분야별 전문가가 상시 자문을 제공합니다.</p>
          </header>
          <div class="grid grid-4">
            <article class="card advisor-card">
              <h3>조세 자문</h3>
              <p>전 국세청 심사관 출신 세무사가 세무 리스크를 사전에 점검합니다.</p>
            </article>
            <article class="card advisor-card">
              <h3>법률 자문</h3>
              <p>기업 인수합병, 규제 대응, 공공 계약 관련 법률 검토를 지원합니다.</p>
            </article>
            <article class="card advisor-card">
              <h3>노무 자문</h3>
              <p>노동법 변화에 따른 인사 제도 개선과 노사 협의 전략을 제안합니다.</p>
            </article>
            <article class="card advisor-card">
              <h3>산업안전 자문</h3>
              <p>중대재해 예방, 안전보건 관리체계 구축을 위한 맞춤 컨설팅을 제공합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="practice-domains" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">추진업무영역</h2>
            <p class="section-subtitle">산업별 특성과 최신 제도 변화를 반영하여 최적의 솔루션을 제공합니다.</p>
          </header>
          <div class="grid grid-3">
            <article class="card service-card">
              <h3>기업 인허가 &amp; 신고</h3>
              <p>제조·서비스·IT·바이오 등 업종별 인허가와 공장 등록, 변경 신고까지 담당합니다.</p>
            </article>
            <article class="card service-card">
              <h3>외국인 투자 &amp; 체류</h3>
              <p>투자 비자, 주재원 파견, 글로벌 인재 채용을 위한 체류 자격 및 신고 절차를 지원합니다.</p>
            </article>
            <article class="card service-card">
              <h3>공공 조달 &amp; 입찰</h3>
              <p>입찰 참가 등록, 적격심사, 제안서 컨설팅으로 안정적인 수주 전략을 제시합니다.</p>
            </article>
            <article class="card service-card">
              <h3>규정 &amp; 계약 문서화</h3>
              <p>기업 운영 규정, 개인정보 보호, 프랜차이즈 계약 등 필수 문서를 최신 법령에 맞춰 작성합니다.</p>
            </article>
            <article class="card service-card">
              <h3>지역 개발 &amp; 정책 자문</h3>
              <p>지방자치단체 정책 연구, 지역 개발 사업 인허가, 보조금 컨설팅을 수행합니다.</p>
            </article>
            <article class="card service-card">
              <h3>사후 관리 &amp; 모니터링</h3>
              <p>허가 후 조건 이행, 정기 보고, 점검 대응까지 종합적인 사후 관리를 제공합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="practice-process" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">업무진행절차</h2>
            <p class="section-subtitle">현황 진단부터 사후 관리까지 4단계로 구성된 프로젝트 운영 체계입니다.</p>
          </header>
          <div class="timeline">
            <article class="timeline-item">
              <h3>01. 상담 및 진단</h3>
              <p>전화·온라인으로 의뢰 배경과 목표를 파악하고, 필요 서류 및 예상 일정을 안내합니다.</p>
            </article>
            <article class="timeline-item">
              <h3>02. 전략 수립</h3>
              <p>법령 검토와 선행 사례 분석을 통해 최적의 진행 전략과 시나리오를 제시합니다.</p>
            </article>
            <article class="timeline-item">
              <h3>03. 실행 및 대응</h3>
              <p>문서 작성, 관할 기관 접수, 보완 요청 대응까지 전 과정을 담당하며 진행 상황을 공유합니다.</p>
            </article>
            <article class="timeline-item">
              <h3>04. 사후 관리</h3>
              <p>허가 조건 이행, 추가 신고, 정기 점검 지원 등 후속 조치까지 책임지고 관리합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="partnerships" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">업무협약기관</h2>
            <p class="section-subtitle">국내외 전문기관과의 협업으로 전문 서비스를 확장합니다.</p>
          </header>
          <div class="grid grid-3">
            <article class="card partnership-card">
              <h3>국내 로펌</h3>
              <p>산업 규제 대응과 공공 프로젝트 법률 검토를 위한 전략적 협력</p>
            </article>
            <article class="card partnership-card">
              <h3>세무·회계 법인</h3>
              <p>프로젝트별 세무 구조 설계와 재무 리스크 관리 지원</p>
            </article>
            <article class="card partnership-card">
              <h3>해외 진출 기관</h3>
              <p>글로벌 파트너와 연계한 해외 인허가 및 투자 지원</p>
            </article>
          </div>
        </div>
      </section>

      <section id="affiliates" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">부설기관</h2>
            <p class="section-subtitle">현장 중심의 지원을 위한 전문 센터를 운영하고 있습니다.</p>
          </header>
          <div class="grid grid-3">
            <article class="card affiliate-card">
              <h3>기업 지원 센터</h3>
              <p>중소·중견기업의 인허가 및 정책자금 컨설팅을 위한 전담 조직</p>
            </article>
            <article class="card affiliate-card">
              <h3>글로벌 비즈니스 센터</h3>
              <p>외국인 투자, 해외 법인 설립, 글로벌 비자 업무를 원스톱으로 지원</p>
            </article>
            <article class="card affiliate-card">
              <h3>공공협력 연구소</h3>
              <p>지자체 정책 연구, 공공 서비스 혁신 과제를 기획·운영</p>
            </article>
          </div>
        </div>
      </section>

      <section id="clients" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">자문회사</h2>
            <p class="section-subtitle">다양한 산업의 고객사와 함께 혁신을 만들어갑니다.</p>
          </header>
          <div class="client-tags" role="list">
            <span role="listitem">에너지 공기업</span>
            <span role="listitem">바이오 스타트업</span>
            <span role="listitem">글로벌 IT 기업</span>
            <span role="listitem">스마트시티 컨소시엄</span>
            <span role="listitem">교육 공공기관</span>
            <span role="listitem">문화콘텐츠 기업</span>
            <span role="listitem">핀테크 기업</span>
            <span role="listitem">사회적기업</span>
          </div>
        </div>
      </section>

      <section id="news" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">소식</h2>
            <p class="section-subtitle">업계 동향과 에이스랩의 활동 소식을 전해드립니다.</p>
          </header>
          <div class="grid grid-2 news-grid">
            <article class="card news-card">
              <span class="news-meta">2024.05.10</span>
              <h3>국내 친환경 산업단지 조성 컨설팅 수주</h3>
              <p>지자체와 협력하여 인허가 전략, 입주 기업 지원 프로그램을 설계합니다.</p>
              <a href="#" class="inline-link">자세히 보기</a>
            </article>
            <article class="card news-card">
              <span class="news-meta">2024.04.22</span>
              <h3>외국인 투자 가이드 북 발간</h3>
              <p>해외 투자자의 비자, 세제, 정책 지원 정보를 한 권에 담았습니다.</p>
              <a href="#" class="inline-link">자세히 보기</a>
            </article>
          </div>
        </div>
      </section>

      <section id="newsletter" class="info-section soft-background" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">뉴스레터</h2>
            <p class="section-subtitle">월 1회, 행정 제도 변경과 성공 사례를 정리한 뉴스레터를 받아보세요.</p>
          </header>
          <form id="newsletter-form" class="form-card" novalidate>
            <label class="form-label" for="newsletter-email">이메일</label>
            <div class="form-row">
              <input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" autocomplete="email" />
              <button type="submit">구독 신청</button>
            </div>
            <p id="newsletter-message" class="form-message" aria-live="polite"></p>
          </form>
        </div>
      </section>

      <section id="contact" class="info-section" tabindex="-1">
        <div class="section-inner">
          <header class="section-header">
            <h2 class="section-heading">상담 안내</h2>
            <p class="section-subtitle">전화, 이메일, 온라인 접수로 빠르게 상담 일정을 예약하세요.</p>
          </header>
          <div class="grid grid-3 contact-grid">
            <article class="card contact-card">
              <h3>빠른 상담</h3>
              <p>Tel. <a href="tel:0220550211">02-2055-0211</a><br />평일 09:00 - 18:00</p>
              <a class="inline-link" href="tel:0220550211">전화 연결</a>
            </article>
            <article class="card contact-card">
              <h3>온라인 접수</h3>
              <p>24시간 이내 담당자가 연락드리며, 비대면 상담도 가능합니다.</p>
              <a class="inline-link" href="mailto:contact@acelap.co.kr">contact@acelap.co.kr</a>
            </article>
            <article class="card contact-card">
              <h3>상담 예약</h3>
              <form id="contact-form" class="mini-form" novalidate>
                <label class="form-label" for="contact-name">성함</label>
                <input id="contact-name" name="name" type="text" required placeholder="홍길동" autocomplete="name" />
                <label class="form-label" for="contact-phone">연락처</label>
                <input id="contact-phone" name="phone" type="tel" required placeholder="010-1234-5678" autocomplete="tel" />
                <label class="form-label" for="contact-topic">문의 분야</label>
                <input id="contact-topic" name="topic" type="text" required placeholder="예: 공장 설립 인허가" />
                <button type="submit">예약 요청</button>
                <p id="contact-message" class="form-message" aria-live="polite"></p>
              </form>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <strong>에이스랩행정사합동사무소 &amp; 에이스랩컨설팅(주)</strong>
          <p>사업자등록번호 511-26-00645 · 서울 서초구 반포대로 20 정주빌딩 6층 1호</p>
        </div>
        <div class="footer-contact">
          <p>Tel. <a href="tel:0220550211">02-2055-0211</a> · Fax. 02-6941-0219 · <a href="mailto:ceo@acelap.co.kr">ceo@acelap.co.kr</a></p>
        </div>
        <p class="footer-copy">© ${new Date().getFullYear()} Acelap Administrative Professionals &amp; Consulting Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  </div>
`;

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const dropdownButtons = Array.from(document.querySelectorAll('.dropdown-toggle'));

function closeDropdowns(exceptId) {
  dropdownButtons.forEach((button) => {
    const targetId = button.dataset.target;
    const dropdown = document.getElementById(targetId);
    const shouldKeepOpen = exceptId && exceptId === targetId;
    button.setAttribute('aria-expanded', shouldKeepOpen ? 'true' : 'false');
    dropdown?.classList.toggle('open', shouldKeepOpen);
  });
}

function setContentOffset() {
  const header = document.querySelector('.fixed-header');
  const main = document.querySelector('.main-content');
  if (header && main) {
    const height = header.getBoundingClientRect().height;
    main.style.paddingTop = `calc(${height}px + 2rem)`;
  }
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    navList.classList.toggle('nav-list--open', !expanded);
    setContentOffset();
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetId = button.dataset.target;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDropdowns();
    } else {
      closeDropdowns(targetId);
    }
    event.stopPropagation();
    setContentOffset();
  });

  button.addEventListener('mouseenter', () => {
    if (window.innerWidth > 960) {
      closeDropdowns(button.dataset.target);
    }
  });

  button.addEventListener('focus', () => {
    closeDropdowns(button.dataset.target);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-item')) {
    closeDropdowns();
  }
});

navList?.addEventListener('mouseleave', () => {
  if (window.innerWidth > 960) {
    closeDropdowns();
  }
});

navList?.addEventListener('focusout', (event) => {
  if (!navList.contains(event.relatedTarget)) {
    closeDropdowns();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdowns();
  }
});

const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeDropdowns();
    if (navToggle && navList?.classList.contains('nav-list--open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navList?.classList.remove('nav-list--open');
    }
    setTimeout(() => {
      const targetElement = document.querySelector(link.getAttribute('href'));
      targetElement?.focus({ preventScroll: true });
    }, 200);
    setContentOffset();
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960 && navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
    navList?.classList.remove('nav-list--open');
  }
  setContentOffset();
});

setContentOffset();

const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newsletterForm);
  const email = (formData.get('email') || '').toString().trim();
  if (!email) {
    newsletterMessage.textContent = '이메일을 입력해 주세요.';
    return;
  }
  newsletterMessage.textContent = `${email} 주소로 뉴스레터 신청이 완료되었습니다.`;
  newsletterForm.reset();
});

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = (formData.get('name') || '').toString().trim();
  const topic = (formData.get('topic') || '').toString().trim();

  if (!name || !topic) {
    contactMessage.textContent = '상담 받으실 성함과 문의 분야를 입력해 주세요.';
    return;
  }

  contactMessage.textContent = `${name}님, '${topic}' 문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.`;
  contactForm.reset();
});
