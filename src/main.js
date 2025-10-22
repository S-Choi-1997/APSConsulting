import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <section class="hero">
      <p class="highlight">Administrative Professional Service</p>
      <h1>APS 행정사 사무소</h1>
      <p>
        기업과 개인을 위한 인허가, 각종 신고 및 민원 처리 전문 파트너.
        신뢰할 수 있는 공공 행정 전문가가 처음부터 끝까지 함께합니다.
      </p>
    </section>

    <div class="tab-list" role="tablist" aria-label="APS 소개 탭">
      <button role="tab" aria-selected="true" aria-controls="panel-about" id="tab-about">
        사무소 소개
      </button>
      <button role="tab" aria-selected="false" aria-controls="panel-service" id="tab-service">
        주요 서비스
      </button>
      <button role="tab" aria-selected="false" aria-controls="panel-process" id="tab-process">
        업무 프로세스
      </button>
      <button role="tab" aria-selected="false" aria-controls="panel-resource" id="tab-resource">
        고객 자료실
      </button>
      <button role="tab" aria-selected="false" aria-controls="panel-contact" id="tab-contact">
        상담 안내
      </button>
    </div>

    <section id="panel-about" class="tab-panel active" role="tabpanel" aria-labelledby="tab-about">
      <h2 class="section-title">사무소 소개</h2>
      <div class="grid-two">
        <div class="card">
          <h3>전문 분야</h3>
          <p>
            기업 인허가, 외국인 체류, 공공 입찰 자격 등 복잡한 행정 절차를
            전문 행정사가 정확하고 신속하게 진행합니다.
          </p>
        </div>
        <div class="card">
          <h3>업무 철학</h3>
          <p>
            <strong>투명한 소통</strong>과 <strong>실행 중심</strong>을 바탕으로,
            고객 맞춤형 전략을 제시하고 결과로 증명합니다.
          </p>
        </div>
        <div class="card">
          <h3>핵심 강점</h3>
          <p>
            다양한 케이스 데이터베이스를 활용한 사례 기반 컨설팅과 법령
            리서치, 문서 작성까지 원스톱으로 제공합니다.
          </p>
        </div>
        <div class="card">
          <h3>파트너 네트워크</h3>
          <p>
            세무·노무·법무 전문가들과 협업하여, 행정 절차에 이어지는 후속
            과제까지 통합 솔루션을 제안합니다.
          </p>
        </div>
      </div>
    </section>

    <section id="panel-service" class="tab-panel" role="tabpanel" aria-labelledby="tab-service">
      <h2 class="section-title">주요 서비스</h2>
      <div class="grid-two">
        <div class="card">
          <h3>기업 인허가 대행</h3>
          <p>
            공장 설립, 식품·위생 업종 허가, 공유오피스 신고 등 업종별 맞춤
            대행 서비스. 필요 서류 리스트업부터 관할 기관 협의까지 지원합니다.
          </p>
        </div>
        <div class="card">
          <h3>외국인 체류·비자</h3>
          <p>
            주재원, 스타트업, 투자비자 등 다양한 체류 자격 신청과 연장,
            가족 초청, 변동 신고 업무를 전문적으로 수행합니다.
          </p>
        </div>
        <div class="card">
          <h3>계약·규정 작성</h3>
          <p>
            프랜차이즈, 가맹계약, 개인정보 처리방침 등 기업 운영에 필요한
            법정 문서를 최신 법령에 맞춰 작성합니다.
          </p>
        </div>
        <div class="card">
          <h3>공공 입찰 지원</h3>
          <p>
            입찰 참가 등록, 적격심사 자료 준비, 제안서 컨설팅까지 단계별로
            지원하여 안정적인 수주를 돕습니다.
          </p>
        </div>
      </div>
    </section>

    <section id="panel-process" class="tab-panel" role="tabpanel" aria-labelledby="tab-process">
      <h2 class="section-title">업무 프로세스</h2>
      <div class="timeline" aria-label="업무 진행 단계">
        <div class="timeline-item">
          <h3>01. 상담 및 진단</h3>
          <p>
            온라인·전화로 간단한 상담 후 의뢰 배경과 목표를 파악하여 진행
            가능 여부, 예상 기간, 필요 서류를 안내합니다.
          </p>
        </div>
        <div class="timeline-item">
          <h3>02. 전략 수립</h3>
          <p>
            관련 법령 검토 및 선행 사례를 분석해 최적의 진행 전략과 예상
            시나리오를 제시합니다.
          </p>
        </div>
        <div class="timeline-item">
          <h3>03. 실행 및 대응</h3>
          <p>
            문서 작성, 관할 기관 접수, 보완 요청 대응까지 전 과정을
            전담합니다. 진행 상황은 실시간으로 공유됩니다.
          </p>
        </div>
        <div class="timeline-item">
          <h3>04. 사후 관리</h3>
          <p>
            허가 후 조건 이행, 추가 신고, 정기 보고 등 후속 조치까지 체크하여
            안정적인 운영을 돕습니다.
          </p>
        </div>
      </div>
    </section>

    <section id="panel-resource" class="tab-panel" role="tabpanel" aria-labelledby="tab-resource">
      <h2 class="section-title">고객 자료실</h2>
      <div class="grid-two">
        <div class="card">
          <h3>필수 서류 체크리스트</h3>
          <p>
            업종별 신청 시 요구되는 서류 목록을 다운로드해 사전 준비 시간을
            단축하세요.
          </p>
        </div>
        <div class="card">
          <h3>법령 업데이트 브리핑</h3>
          <p>
            정기적으로 변경되는 관련 법령과 행정 해석을 요약하여 제공합니다.
            주요 이슈를 뉴스레터로 받아보세요.
          </p>
        </div>
        <div class="card">
          <h3>성공 사례집</h3>
          <p>
            다양한 고객사의 해결 사례와 인사이트를 공유합니다. 상황별 접근법과
            필요한 준비 사항을 확인할 수 있습니다.
          </p>
        </div>
        <div class="card">
          <h3>FAQ & 셀프 가이드</h3>
          <p>
            자주 묻는 질문과 단계별 체크리스트를 통해 단순 민원은 셀프로
            처리할 수 있도록 지원합니다.
          </p>
        </div>
      </div>
    </section>

    <section id="panel-contact" class="tab-panel" role="tabpanel" aria-labelledby="tab-contact">
      <h2 class="section-title">상담 안내</h2>
      <div class="contact-box">
        <div class="card">
          <h3>빠른 상담</h3>
          <p>전화 02-1234-5678</p>
          <p>평일 09:00 - 18:00</p>
          <a href="tel:0212345678" aria-label="전화 연결">전화 걸기</a>
        </div>
        <div class="card">
          <h3>온라인 접수</h3>
          <p>상담 양식을 작성해 주시면 24시간 내 연락드립니다.</p>
          <a href="mailto:contact@aps-admin.co.kr">contact@aps-admin.co.kr</a>
        </div>
        <div class="card">
          <h3>사무실 방문</h3>
          <p>서울시 종로구 세종대로 123, APS 행정사 사무소 7F</p>
          <p>사전 예약제로 운영됩니다.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <strong>APS 행정사 사무소</strong>
      <div>대표 행정사 : 김민수 &middot; 등록번호 2024-APS-001</div>
      <div>© ${new Date().getFullYear()} APS Administrative Professional Service. All rights reserved.</div>
    </footer>
  </div>
`;

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));

function activateTab(nextTab) {
  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === nextTab.getAttribute('aria-controls'));
  });

  nextTab.focus();
}

const tabFocusOrder = tabs.map((tab) => tab.id);

function moveFocus(currentId, direction) {
  const currentIndex = tabFocusOrder.indexOf(currentId);
  const nextIndex = (currentIndex + direction + tabFocusOrder.length) % tabFocusOrder.length;
  const nextTab = document.getElementById(tabFocusOrder[nextIndex]);
  activateTab(nextTab);
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(tab.id, -1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(tab.id, 1);
        break;
      case 'Home':
        event.preventDefault();
        activateTab(document.getElementById(tabFocusOrder[0]));
        break;
      case 'End':
        event.preventDefault();
        activateTab(document.getElementById(tabFocusOrder[tabFocusOrder.length - 1]));
        break;
      default:
    }
  });
});

// 기본 탭 포커스 설정
activateTab(tabs[0]);
