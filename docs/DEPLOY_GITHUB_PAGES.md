# GitHub Pages 운영 배포 가이드

이 저장소의 현재 운영 배포 기준은 **GitHub Pages**입니다. `docs/DEPLOY_TO_GCS.md`는 GCS 정적 호스팅 참고 문서이며, 현재 `https://apsconsulting.kr/` 운영 반영은 GitHub Pages를 통해 이루어집니다.

## 현재 운영 설정

- 원격 저장소: `https://github.com/S-Choi-1997/APSConsulting.git`
- 운영 브랜치: `publish`
- 운영 도메인: `https://apsconsulting.kr/`
- 커스텀 도메인 파일: 루트 `CNAME` (`apsconsulting.kr`)
- 배포 방식: `publish` 브랜치 push 후 GitHub Pages의 `pages build and deployment`가 자동 실행
- GitHub Pages 기본 URL: `https://s-choi-1997.github.io/APSConsulting/`
  - 현재 커스텀 도메인으로 redirect됨

## 배포 절차

```powershell
git checkout publish
git status
git add <변경 파일>
git commit -m "변경 내용 요약"
git push origin publish
```

예: 베트남어 번역 변경 배포 시

```powershell
git add header.html main.js css/base.css css/layout.css css/responsive.css docs/UPDATE_LOG.md docs/DEPLOY_GITHUB_PAGES.md docs/README.md docs/빠른시작.md docs/DEPLOY_TO_GCS.md i18n/*.json terms/*_vi.txt
git commit -m "Add Vietnamese translation"
git push origin publish
```

## 배포 후 확인

1. GitHub 저장소의 **Actions** 탭에서 `pages build and deployment` 성공 여부 확인
2. `https://apsconsulting.kr/` 접속 확인
3. 변경된 정적 자산 직접 확인
   - 예: `https://apsconsulting.kr/i18n/vi.json`
   - 예: `https://apsconsulting.kr/terms/terms_vi.txt`

GitHub Pages와 CDN 캐시 때문에 반영까지 수십 초에서 몇 분 정도 걸릴 수 있습니다. 헤더의 `Cache-Control`이 짧게 잡혀 있어도 브라우저 캐시가 남을 수 있으므로, 확인 시 강력 새로고침을 사용합니다.

## 커밋 주의사항

- 이번 배포와 무관한 로컬 설정 파일은 커밋하지 않습니다.
  - 예: `.claude/settings.local.json`
- 새 언어를 추가할 때는 아래 파일들이 같이 올라가야 합니다.
  - `header.html`: 언어 선택 UI
  - `main.js`: 언어명, 약관 파일 매핑, 모달 파일 매핑
  - `i18n/{lang}.json`: 번역 데이터
  - `terms/*_{lang}.txt`: 상담 폼 약관/개인정보/국외이전 문서
  - 필요한 경우 `css/*`: 언어별 폰트/줄바꿈 보정

## GCP 폴더와의 구분

`GCP/` 폴더는 정적 사이트 배포용이 아니라 상담 폼 API용 Cloud Run 코드입니다. 프론트엔드 정적 사이트는 GitHub Pages에서 서빙되고, 상담 폼 제출은 `main.js`의 Cloud Run API 주소를 호출합니다.
