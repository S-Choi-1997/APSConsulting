import './style.css';

const currentYear = new Date().getFullYear();

document.querySelector('#app').innerHTML = `
  <div class="page">
    <header class="top-header">
      <div class="brand-block">
        <div class="logo-mark" aria-hidden="true">AL</div>
        <div>
          <span class="brand-name">에이스랩행정사합동사무소</span>
          <span class="brand-name">&amp; 에이스랩컨설팅(주)</span>
        </div>
      </div>
      <div class="contact-mini">
        <a href="tel:0220550211" aria-label="전화 02-2055-0211">Tel. 02-2055-0211</a>
        <span aria-hidden="true">/</span>
        <a href="mailto:ceo@acelap.co.kr">ceo@acelap.co.kr</a>
      </div>
    </header>

    <nav class="primary-nav" aria-label="주요 메뉴">
      <ul>
        <li><a href="#intro">소개</a></li>
        <li><a href="#members">구성원</a></li>
        <li><a href="#services">업무</a></li>
        <li><a href="#alliances">업무협약</a></li>
        <li><a href="#advisory">자문회사</a></li>
        <li><a href="#news">소식</a></li>
        <li><a href="#contact">문의</a></li>
      </ul>
    </nav>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-text">
          <p class="hero-eyebrow">행정 절차의 모든 순간을 설계하는 전문가 그룹</p>
          <h1 id="hero-title">에이스랩행정사합동사무소 &amp; 에이스랩컨설팅(주)</h1>
          <p class="hero-copy">
            기업과 기관, 그리고 개인의 성장 과정을 함께 고민합니다. 복잡한 인허가와 신고,
            정책 자금과 투자 유치까지. 행정과 컨설팅 전 과정을 통합적으로 지원합니다.
          </p>
          <div class="hero-actions">
            <a class="button primary" href="#contact">상담 신청하기</a>
            <a class="button ghost" href="#services">업무 영역 보기</a>
          </div>
        </div>
        <div class="hero-media" role="img" aria-label="회사 대표 이미지 자리">
          <span>사진 영역</span>
        </div>
      </section>

      <section id="intro" class="section intro">
        <div class="section-heading">
          <h2>소개</h2>
          <p>변화에 민첩하게 대응하는 행정·경영 전문가의 협업 조직입니다.</p>
        </div>
        <div class="intro-grid">
          <article class="intro-card">
            <div class="image-placeholder" role="img" aria-label="대표 사진 자리"></div>
            <div>
              <h3>대표 인사말</h3>
              <p>
                고객과의 신뢰를 최우선으로 생각합니다. 최초 상담부터 결과 확인까지,
                모든 절차를 투명하게 공유하며 최적의 솔루션을 제시합니다.
              </p>
              <a class="inline-link" href="#contact">자세히 문의하기</a>
            </div>
          </article>
          <article class="intro-card">
            <div class="image-placeholder" role="img" aria-label="사무실 전경 사진 자리"></div>
            <div>
              <h3>오시는 길</h3>
              <p>
                [06716] 서울 서초구 반포대로 20, 정주빌딩 6층 1호. 고속터미널역에서 도보 5분,
                사전 예약 방문으로 더욱 원활한 상담이 가능합니다.
              </p>
              <a class="inline-link" href="https://map.kakao.com/" target="_blank" rel="noreferrer">지도 열기</a>
            </div>
          </article>
        </div>
      </section>

      <section id="members" class="section members">
        <div class="section-heading">
          <h2>구성원</h2>
          <p>전문 행정사와 산업별 컨설턴트, 자문단이 긴밀하게 협력합니다.</p>
        </div>
        <div class="card-grid three">
          <article class="profile-card">
            <div class="image-placeholder" role="img" aria-label="대표행정사 사진 자리"></div>
            <h3>대표행정사</h3>
            <p>20년 이상 공공행정 실무 경험. 기업 인허가 및 규제 대응 전문.</p>
            <ul>
              <li>행정사 자격증 보유</li>
              <li>정부위원회 자문위원 역임</li>
              <li>대형 프로젝트 수행 경험 다수</li>
            </ul>
          </article>
          <article class="profile-card">
            <div class="image-placeholder" role="img" aria-label="컨설팅 본부 사진 자리"></div>
            <h3>컨설팅(주)</h3>
            <p>사업 전략, 정책 자금, ESG 및 투자 유치까지 확장된 지원.</p>
            <ul>
              <li>산업별 전문 컨설턴트 배치</li>
              <li>공공/민간 프로젝트 통합 관리</li>
              <li>데이터 기반 실적 분석 시스템</li>
            </ul>
          </article>
          <article class="profile-card">
            <div class="image-placeholder" role="img" aria-label="고문단 사진 자리"></div>
            <h3>고문단</h3>
            <p>세무, 노무, 법무, 기술 등 분야별 최고 전문가가 파트너십으로 참여합니다.</p>
            <ul>
              <li>현직 변호사 · 회계사 · 노무사</li>
              <li>대학 및 연구기관 교수진</li>
              <li>정부 정책 심의 경험 보유</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="services" class="section services">
        <div class="section-heading">
          <h2>업무</h2>
          <p>인허가, 신고, 정책 지원, 해외 진출 등 단계별 맞춤 서비스를 제공합니다.</p>
        </div>
        <div class="services-grid">
          <article class="service-card">
            <h3>기업 인허가</h3>
            <p>업종별 허가, 공장 설립, 벤처 인증 등 복잡한 절차를 전담합니다.</p>
          </article>
          <article class="service-card">
            <h3>외국인 체류 &amp; 비자</h3>
            <p>주재원, 스타트업, 투자, 가족 초청 등 특화된 체류 전략을 제안합니다.</p>
          </article>
          <article class="service-card">
            <h3>계약 · 규정</h3>
            <p>프랜차이즈, 가맹계약, 개인정보 및 내부 규정 정비까지 책임집니다.</p>
          </article>
          <article class="service-card">
            <h3>공공 입찰 지원</h3>
            <p>사업계획서, 제안서, 적격 심사 대응까지 수주 성공률을 높여드립니다.</p>
          </article>
        </div>
        <div class="process">
          <h3>업무 진행 절차</h3>
          <ol>
            <li>
              <strong>사전 상담</strong>
              <span>요구 사항 분석 및 추진 일정, 필요 서류 안내</span>
            </li>
            <li>
              <strong>전략 설계</strong>
              <span>법령 검토, 리스크 진단, 대응 시나리오 수립</span>
            </li>
            <li>
              <strong>실행 &amp; 대응</strong>
              <span>문서 작성, 접수 대행, 보완 요구 즉시 대응</span>
            </li>
            <li>
              <strong>사후 관리</strong>
              <span>허가 후 조건 이행, 추가 신고, 정기 보고 지원</span>
            </li>
          </ol>
        </div>
      </section>

      <section id="alliances" class="section alliances">
        <div class="section-heading">
          <h2>업무협약</h2>
          <p>대학, 연구기관, 금융기관과의 전략적 협력으로 범위를 확장합니다.</p>
        </div>
        <div class="logo-wall">
          <div class="logo-slot">협약기관 로고</div>
          <div class="logo-slot">공공기관 로고</div>
          <div class="logo-slot">연구소 로고</div>
          <div class="logo-slot">법률 파트너 로고</div>
        </div>
        <div class="sub-section">
          <h3>부설기관</h3>
          <p>기술사업화 지원센터, 스타트업 액셀러레이팅 랩, 해외 법률 네트워크 운영.</p>
        </div>
      </section>

      <section id="advisory" class="section advisory">
        <div class="section-heading">
          <h2>자문회사</h2>
          <p>전략적 파트너십으로 고객의 지속적인 성장을 돕습니다.</p>
        </div>
        <div class="advisory-grid">
          <article>
            <div class="image-placeholder" role="img" aria-label="자문회사 이미지 자리"></div>
            <h3>세무 · 회계</h3>
            <p>세무 전략, 재무 관리, 기업 가치 평가까지 통합 지원.</p>
          </article>
          <article>
            <div class="image-placeholder" role="img" aria-label="자문회사 이미지 자리"></div>
            <h3>법무 · 노무</h3>
            <p>노사 관계, 규정 정비, 분쟁 예방을 위한 상시 자문.</p>
          </article>
          <article>
            <div class="image-placeholder" role="img" aria-label="자문회사 이미지 자리"></div>
            <h3>기술 · 투자</h3>
            <p>R&amp;D 과제, 기술 가치 평가, 투자 유치 전략 수립.</p>
          </article>
        </div>
      </section>

      <section id="news" class="section news">
        <div class="section-heading">
          <h2>소식</h2>
          <p>에이스랩의 최신 소식과 뉴스레터를 확인하세요.</p>
        </div>
        <div class="news-layout">
          <div class="news-list">
            <article>
              <time dateTime="2024-05-20">2024.05.20</time>
              <h3>행정 혁신 컨퍼런스 발표</h3>
              <p>규제 샌드박스 성공 사례와 공공 협업 모델을 공유했습니다.</p>
            </article>
            <article>
              <time dateTime="2024-04-02">2024.04.02</time>
              <h3>스타트업 대상 인허가 세미나</h3>
              <p>창업 초기 기업을 위한 필수 인허가 가이드를 제공했습니다.</p>
            </article>
            <article>
              <time dateTime="2024-03-15">2024.03.15</time>
              <h3>뉴스레터 VOL.12 발행</h3>
              <p>산업별 정책 이슈와 지원금 정보를 정리했습니다.</p>
            </article>
          </div>
          <aside class="newsletter-box">
            <h3>뉴스레터 구독</h3>
            <p>한 달에 한 번, 필요한 정보만 골라 전달드립니다.</p>
            <form class="newsletter-form">
              <label for="newsletter-email" class="sr-only">이메일 주소</label>
              <input id="newsletter-email" type="email" placeholder="이메일 주소" required />
              <button type="submit">구독 신청</button>
            </form>
          </aside>
        </div>
      </section>

      <section id="contact" class="section contact">
        <div class="section-heading">
          <h2>상담 안내</h2>
          <p>빠른 상담을 원하시면 전화 또는 이메일로 연락 주세요.</p>
        </div>
        <div class="contact-grid">
          <article>
            <h3>전화 상담</h3>
            <p>02-2055-0211</p>
            <p>평일 09:00 - 18:00 (점심 12:00 - 13:00)</p>
            <a class="inline-link" href="tel:0220550211">바로 전화하기</a>
          </article>
          <article>
            <h3>이메일 상담</h3>
            <p>ceo@acelap.co.kr</p>
            <p>24시간 이내 답변을 드립니다.</p>
            <a class="inline-link" href="mailto:ceo@acelap.co.kr">메일 보내기</a>
          </article>
          <article>
            <h3>방문 상담</h3>
            <p>서울 서초구 반포대로 20 정주빌딩 6층 1호</p>
            <p>사전 예약제로 운영됩니다.</p>
            <a class="inline-link" href="https://map.kakao.com/" target="_blank" rel="noreferrer">예약 문의</a>
          </article>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <div>
        에이스랩행정사합동사무소 &amp; 에이스랩컨설팅(주) · 사업자등록번호 511-26-00645
      </div>
      <div>
        [06716] 서울 서초구 반포대로20 정주빌딩6층1호 · Tel. 02-2055-0211 · Fax. 02-6941-0219
      </div>
      <div>© ${currentYear} ACELAP Consulting. All Rights Reserved.</div>
    </footer>
  </div>
`;

// 내비게이션 부드러운 이동 처리
const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const section = document.querySelector(targetId);

    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
