import './style.css';

const currentYear = new Date().getFullYear();

document.querySelector('#app').innerHTML = `
  <div class="page">
    <header class="top-header">
      <div class="brand-block">
        <div class="logo-mark" aria-hidden="true">AP</div>
        <div>
          <span class="brand-name">APS 행정사사무소</span>
          <span class="brand-name">APS 컨설팅 그룹</span>
        </div>
      </div>
    </header>

    <nav class="primary-nav" aria-label="주요 메뉴">
      <ul>
        <li><button type="button" class="nav-link active" data-target="intro">소개</button></li>
        <li><button type="button" class="nav-link" data-target="members">구성원</button></li>
        <li><button type="button" class="nav-link" data-target="services">업무</button></li>
        <li><button type="button" class="nav-link" data-target="alliances">협력 네트워크</button></li>
        <li><button type="button" class="nav-link" data-target="advisory">전문 자문</button></li>
        <li><button type="button" class="nav-link" data-target="news">소식</button></li>
        <li><button type="button" class="nav-link" data-target="contact">문의</button></li>
      </ul>
    </nav>

    <main>
      <section data-view="intro" class="view active">
        <section class="hero" aria-labelledby="hero-title">
          <div class="hero-text">
            <p class="hero-eyebrow">Public Service Architecture Studio</p>
            <h1 id="hero-title">APS 행정사사무소 &amp; APS 컨설팅 그룹</h1>
            <p class="hero-copy">
              정책과 산업의 변화를 민첩하게 해석하고 실행 전략으로 연결합니다. 공공 인허가, 기업 규제 대응,
              투자와 글로벌 진출까지. APS는 행정과 비즈니스의 전 과정을 설계합니다.
            </p>
            <div class="hero-actions">
              <button type="button" class="button primary" data-target="contact">상담 신청하기</button>
              <button type="button" class="button ghost" data-target="services">주요 서비스 보기</button>
            </div>
          </div>
          <div class="hero-media" role="img" aria-label="APS 행정사사무소 대표 이미지">
            <span>APS Office</span>
          </div>
        </section>

        <section class="section intro">
          <div class="section-heading">
            <h2>APS 소개</h2>
            <p>
              APS 행정사사무소는 인허가와 규제 컨설팅을 중심으로 기업 성장의 관문을 함께 넘어갑니다. 현장의 실무 감각과 전략적 시각을 동시에 제공합니다.
            </p>
          </div>
          <div class="intro-grid">
            <article class="intro-card">
              <div class="image-placeholder" role="img" aria-label="대표 인물 사진"></div>
              <div>
                <h3>대표 인사말</h3>
                <p>
                  "행정 절차는 곧 비즈니스 전략입니다." APS는 고객의 상황을 철저히 분석해 실행 가능한 로드맵을 제안합니다.
                  초기 상담부터 사후 관리까지 모든 과정을 투명하게 공유합니다.
                </p>
                <a class="inline-link" href="mailto:contact@apsconsulting.kr">대표에게 메일 보내기</a>
              </div>
            </article>
            <article class="intro-card">
              <div class="image-placeholder" role="img" aria-label="사무공간 사진"></div>
              <div>
                <h3>오피스 &amp; 공간</h3>
                <p>
                  [06716] 서울 서초구 반포대로 20, 정주빌딩 6층 1호. APS Situation Room에서는 프로젝트별 협업 워크숍과 온라인 컨설팅을 동시에 진행합니다.
                </p>
                <a class="inline-link" href="https://map.kakao.com/" target="_blank" rel="noreferrer">지도 열기</a>
              </div>
            </article>
          </div>
        </section>

        <section class="section values">
          <div class="section-heading">
            <h2>APS Way</h2>
            <p>데이터, 법령, 현장을 유기적으로 연결하는 APS만의 업무 방식입니다.</p>
          </div>
          <div class="values-grid">
            <article>
              <h3>Insight</h3>
              <p>법령 개정 동향과 산업 데이터를 매주 분석하여 고객 프로젝트에 즉시 반영합니다.</p>
            </article>
            <article>
              <h3>Design</h3>
              <p>복잡한 인허가 절차를 시각화하여 단계별 리스크와 대응 전략을 명확하게 제시합니다.</p>
            </article>
            <article>
              <h3>Partner</h3>
              <p>전문 자문단과의 클라우드 협업 시스템으로 언제 어디서든 전문가 연결이 가능합니다.</p>
            </article>
          </div>
        </section>
      </section>

      <section data-view="members" class="view">
        <section class="section members">
          <div class="section-heading">
            <h2>핵심 구성원</h2>
            <p>현장 실무와 전략 컨설팅을 겸비한 팀이 통합 솔루션을 제공합니다.</p>
          </div>
          <div class="card-grid three">
            <article class="profile-card">
              <div class="image-placeholder" role="img" aria-label="수석 행정사 사진"></div>
              <h3>수석 행정사</h3>
              <p>공공기관 인허가 심사 경력 18년. 제조·에너지·ICT 산업 프로젝트를 총괄합니다.</p>
              <ul>
                <li>산업통상자원부 정책 자문위원</li>
                <li>대규모 입지 인허가 PM</li>
                <li>규제 사전 진단 전문가</li>
              </ul>
            </article>
            <article class="profile-card">
              <div class="image-placeholder" role="img" aria-label="기업 컨설팅 본부 사진"></div>
              <h3>기업 컨설팅 본부</h3>
              <p>기업 구조 진단, 정책 자금, 투자 유치 전략을 한 번에 설계합니다.</p>
              <ul>
                <li>산업별 담당 컨설턴트 6명 상시 배치</li>
                <li>데이터 기반 경영 대시보드 운영</li>
                <li>글로벌 파트너 연결 프로그램</li>
              </ul>
            </article>
            <article class="profile-card">
              <div class="image-placeholder" role="img" aria-label="프로젝트 매니지먼트 센터 사진"></div>
              <h3>PM 센터</h3>
              <p>허가 진행 상황을 실시간 공유하며, 보완 요청에 즉시 대응합니다.</p>
              <ul>
                <li>디지털 문서 중앙 관리</li>
                <li>온라인 브리핑 &amp; 보고</li>
                <li>대외 커뮤니케이션 전담</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="section advisory-board">
          <div class="section-heading">
            <h2>전문 자문단</h2>
            <p>법률, 회계, 노무, 기술, ESG 등 분야별 파트너와 공동 대응 체계를 구축합니다.</p>
          </div>
          <div class="card-grid four">
            <article>
              <h3>법률 자문</h3>
              <p>현직 변호사 그룹과 규제 대응, 계약 구조 설계에 공동 참여합니다.</p>
            </article>
            <article>
              <h3>세무 · 회계</h3>
              <p>재무 실사, 투자 구조 설계, 조세 리스크 컨설팅을 제공합니다.</p>
            </article>
            <article>
              <h3>노무 · 인사</h3>
              <p>인사규정 수립, 노사 협약, ESG 공시 대응까지 통합 지원합니다.</p>
            </article>
            <article>
              <h3>기술 · R&amp;D</h3>
              <p>기술가치평가, 연구과제 기획, 지식재산 전략 수립을 지원합니다.</p>
            </article>
          </div>
        </section>
      </section>

      <section data-view="services" class="view">
        <section class="section services">
          <div class="section-heading">
            <h2>주요 업무</h2>
            <p>기업의 성장 단계별 과제를 진단하고 가장 효율적인 행정 전략을 제안합니다.</p>
          </div>
          <div class="services-grid">
            <article class="service-card">
              <h3>기업 인허가</h3>
              <p>입지 선정, 환경·안전 인허가, 공장 설립, 벤처 인증까지 전 과정 대행.</p>
            </article>
            <article class="service-card">
              <h3>정책 자금 · 투자</h3>
              <p>정책자금 신청서, 투자제안서, IR 자료를 프로젝트별로 제작합니다.</p>
            </article>
            <article class="service-card">
              <h3>해외 진출</h3>
              <p>비자, 법인 설립, 규제 컨설팅으로 글로벌 확장을 지원합니다.</p>
            </article>
            <article class="service-card">
              <h3>규정 · 계약</h3>
              <p>내부 규정, 개인정보보호, 가맹·프랜차이즈 계약 등 체계적 운영 기반 마련.</p>
            </article>
          </div>
        </section>

        <section class="section process">
          <div class="section-heading">
            <h2>APS 진행 프로세스</h2>
            <p>프로젝트 전 주기에 걸쳐 협업이 이어집니다.</p>
          </div>
          <ol class="process-steps">
            <li>
              <strong>Discovery</strong>
              <span>사전 진단 미팅으로 목표와 리스크를 명확히 정의합니다.</span>
            </li>
            <li>
              <strong>Strategy</strong>
              <span>법령 검토, 필요 서류 체크리스트, 일정 계획을 수립합니다.</span>
            </li>
            <li>
              <strong>Execution</strong>
              <span>문서 작성, 접수 대행, 기관 협의, 현장 점검을 수행합니다.</span>
            </li>
            <li>
              <strong>Care</strong>
              <span>허가 이후 이행 보고, 정기 점검, 추가 사업 확장을 지원합니다.</span>
            </li>
          </ol>
        </section>
      </section>

      <section data-view="alliances" class="view">
        <section class="section alliances">
          <div class="section-heading">
            <h2>협력 네트워크</h2>
            <p>국내외 기관과의 파트너십으로 프로젝트 범위를 확장합니다.</p>
          </div>
          <div class="logo-wall">
            <div class="logo-slot">산학협력단</div>
            <div class="logo-slot">금융기관</div>
            <div class="logo-slot">연구기관</div>
            <div class="logo-slot">법률 파트너</div>
            <div class="logo-slot">기술 전문기업</div>
            <div class="logo-slot">글로벌 네트워크</div>
          </div>
        </section>

        <section class="section alliance-details">
          <div class="section-heading">
            <h2>공동 프로그램</h2>
            <p>프로젝트 유형에 따라 맞춤형 공동 프로그램을 설계합니다.</p>
          </div>
          <div class="details-grid">
            <article>
              <h3>혁신기업 스케일업</h3>
              <p>벤처캐피털, 엑셀러레이터와 함께 투자 유치 로드쇼를 기획합니다.</p>
            </article>
            <article>
              <h3>지역 전략 사업</h3>
              <p>지자체와 손잡고 규제 특례, 정책 지원을 기획하고 실행합니다.</p>
            </article>
            <article>
              <h3>글로벌 브리지</h3>
              <p>현지 로펌, 회계법인과 협력하여 해외 시장 진입을 지원합니다.</p>
            </article>
          </div>
        </section>
      </section>

      <section data-view="advisory" class="view">
        <section class="section advisory">
          <div class="section-heading">
            <h2>전문 자문 서비스</h2>
            <p>프로젝트 특성에 맞춘 자문으로 의사결정을 지원합니다.</p>
          </div>
          <div class="advisory-grid">
            <article>
              <div class="image-placeholder" role="img" aria-label="세무 자문 이미지"></div>
              <h3>세무 · 회계</h3>
              <p>조세 전략, 투자 구조, 사업 가치평가를 통합적으로 컨설팅합니다.</p>
            </article>
            <article>
              <div class="image-placeholder" role="img" aria-label="법무 자문 이미지"></div>
              <h3>법무 · 노무</h3>
              <p>노사 관계, 규정 제정, 분쟁 예방을 위한 상시 자문을 제공합니다.</p>
            </article>
            <article>
              <div class="image-placeholder" role="img" aria-label="기술 자문 이미지"></div>
              <h3>기술 · 투자</h3>
              <p>R&amp;D 기획, 기술 가치평가, 정부 과제 수주 전략을 지원합니다.</p>
            </article>
          </div>
        </section>

        <section class="section advisory-highlights">
          <div class="section-heading">
            <h2>APS Insight Report</h2>
            <p>프로젝트별 분석 리포트로 기관 대응 전략을 정리합니다.</p>
          </div>
          <div class="report-grid">
            <article>
              <h3>규제 대응 브리핑</h3>
              <p>최근 법령 개정 이슈와 주요 대응 포인트를 요약한 주간 리포트입니다.</p>
            </article>
            <article>
              <h3>사업 타당성 리포트</h3>
              <p>시장 분석, 재무 모델, 추진 일정 등을 포함한 심층 분석 자료입니다.</p>
            </article>
            <article>
              <h3>기관 제출 아카이브</h3>
              <p>과거 제출 서류, 질의 대응 사례를 정리한 전용 데이터베이스를 운영합니다.</p>
            </article>
          </div>
        </section>
      </section>

      <section data-view="news" class="view">
        <section class="section news">
          <div class="section-heading">
            <h2>APS 소식</h2>
            <p>세미나, 정책 브리핑, 뉴스레터 발간 소식을 전해드립니다.</p>
          </div>
          <div class="news-layout">
            <div class="news-list">
              <article>
                <time dateTime="2024-06-18">2024.06.18</time>
                <h3>공공 규제혁신 포럼 기조 발표</h3>
                <p>APS는 디지털 행정플랫폼 구축 사례와 규제 샌드박스 전략을 공유했습니다.</p>
              </article>
              <article>
                <time dateTime="2024-05-07">2024.05.07</time>
                <h3>스타트업 인허가 아카데미 3기</h3>
                <p>시장 진입 필수 인허가 로드맵과 실무 서류 작성법을 교육했습니다.</p>
              </article>
              <article>
                <time dateTime="2024-04-12">2024.04.12</time>
                <h3>ESG 정책자금 라운드테이블</h3>
                <p>금융기관과 공동으로 ESG 투자·보조금 활용 전략을 논의했습니다.</p>
              </article>
            </div>
            <aside class="newsletter-box">
              <h3>뉴스레터 구독</h3>
              <p>APS Insight를 받아보세요. 월 1회, 필요한 정보만 전달드립니다.</p>
              <form class="newsletter-form">
                <label for="newsletter-email" class="sr-only">이메일 주소</label>
                <input id="newsletter-email" type="email" placeholder="이메일 주소" required />
                <button type="submit">구독 신청</button>
              </form>
            </aside>
          </div>
        </section>

        <section class="section media">
          <div class="section-heading">
            <h2>미디어 라이브러리</h2>
            <p>APS가 제작한 자료와 인터뷰, 세미나 다시보기 콘텐츠입니다.</p>
          </div>
          <div class="media-grid">
            <article>
              <h3>Policy Brief Podcast</h3>
              <p>산업별 규제 이슈를 15분 요약으로 정리한 오디오 콘텐츠.</p>
            </article>
            <article>
              <h3>Case Study PDF</h3>
              <p>성공적인 인허가 사례와 프로세스를 정리한 다운로드 리포트.</p>
            </article>
            <article>
              <h3>세미나 Replay</h3>
              <p>APS 웨비나와 교육 프로그램 다시보기 영상 링크를 제공합니다.</p>
            </article>
          </div>
        </section>
      </section>

      <section data-view="contact" class="view">
        <section class="section contact">
          <div class="section-heading">
            <h2>APS와 상담하기</h2>
            <p>프로젝트에 대한 간단한 정보를 남겨주시면 담당자가 빠르게 연락드립니다.</p>
          </div>
          <div class="contact-grid">
            <article>
              <h3>전화 상담</h3>
              <p>02-2345-7890</p>
              <p>평일 09:00 - 18:00 (점심 12:00 - 13:00)</p>
              <a class="inline-link" href="tel:0223457890">바로 전화하기</a>
            </article>
            <article>
              <h3>이메일 상담</h3>
              <p>contact@apsconsulting.kr</p>
              <p>24시간 이내 담당자가 회신드립니다.</p>
              <a class="inline-link" href="mailto:contact@apsconsulting.kr">메일 보내기</a>
            </article>
            <article>
              <h3>방문 상담</h3>
              <p>서울 서초구 반포대로 20 정주빌딩 6층 1호</p>
              <p>사전 예약제로 운영됩니다.</p>
              <a class="inline-link" href="https://map.kakao.com/" target="_blank" rel="noreferrer">지도 보기</a>
            </article>
          </div>
        </section>

        <section class="section contact-form">
          <div class="section-heading">
            <h2>프로젝트 문의 폼</h2>
            <p>기업명, 주요 이슈, 희망 일정 등을 알려주세요.</p>
          </div>
          <form class="inquiry-form">
            <div class="form-row">
              <label>
                기업 / 기관명
                <input type="text" name="company" placeholder="예) APS테크" required />
              </label>
              <label>
                담당자 이름
                <input type="text" name="name" placeholder="이름" required />
              </label>
            </div>
            <div class="form-row">
              <label>
                연락처
                <input type="tel" name="phone" placeholder="휴대전화 또는 전화번호" required />
              </label>
              <label>
                이메일
                <input type="email" name="email" placeholder="example@company.com" required />
              </label>
            </div>
            <label>
              문의 내용
              <textarea name="message" rows="6" placeholder="프로젝트 범위, 일정, 필요한 지원 내용을 남겨주세요."></textarea>
            </label>
            <div class="form-actions">
              <button type="submit" class="button primary">문의 보내기</button>
              <p class="form-notice">※ 입력하신 정보는 상담 목적 외 사용되지 않습니다.</p>
            </div>
          </form>
        </section>
      </section>
    </main>

    <footer class="page-footer">
      <div class="footer-inner">
        <p class="footer-line">[06716] 서울 서초구 반포대로 20, 정주빌딩 6층 1호</p>
        <div class="footer-contact-links">
          <a href="tel:0223457890" aria-label="전화 02-2345-7890">Tel. 02-2345-7890</a>
          <span aria-hidden="true">·</span>
          <span>Fax. 02-6941-0219</span>
          <span aria-hidden="true">·</span>
          <a href="mailto:contact@apsconsulting.kr">contact@apsconsulting.kr</a>
        </div>
        <p class="footer-copy">© ${currentYear} APS Consulting Group. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
`;

const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');
const heroButtons = document.querySelectorAll('.hero-actions .button');

const activateView = (target) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === target);
  });

  views.forEach((view) => {
    view.classList.toggle('active', view.dataset.view === target);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    activateView(link.dataset.target);
  });
});

heroButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activateView(button.dataset.target);
  });
});
