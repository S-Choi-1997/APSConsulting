# Google Cloud Storage (GCS) 정적 웹사이트 배포 가이드

이 문서는 행정사합동사무소 웹사이트를 Google Cloud Storage에 정적 웹사이트로 배포하는 방법을 설명합니다.

## 목차
1. [사전 준비](#사전-준비)
2. [GCS 버킷 생성 및 설정](#gcs-버킷-생성-및-설정)
3. [파일 업로드](#파일-업로드)
4. [커스텀 도메인 연결 (선택)](#커스텀-도메인-연결-선택)
5. [SSL/HTTPS 설정 (선택)](#sslhttps-설정-선택)
6. [유지보수 및 업데이트](#유지보수-및-업데이트)

---

## 사전 준비

### 1. Google Cloud 계정 생성
- [Google Cloud Console](https://console.cloud.google.com/) 접속
- Google 계정으로 로그인
- 프로젝트 생성 (예: `aps-website`)

### 2. 필요한 파일 확인
배포할 파일 목록:
```
aps_ver.2/
├── index.html
├── about.html
├── services.html
├── cases.html
├── contact.html
├── main.css
├── main.js
└── images/
    ├── logo.png
    ├── logo.ico
    ├── team01.png
    ├── team02.png
    ├── team03.png
    └── team04.png
```

---

## GCS 버킷 생성 및 설정

### 1. Cloud Storage 버킷 생성

#### 방법 1: 웹 콘솔 사용

1. **Google Cloud Console** 접속
   - https://console.cloud.google.com/storage

2. **버킷 만들기** 클릭

3. **버킷 이름 지정**
   ```
   예시: aps-website-bucket
   또는 도메인 사용 시: www.your-domain.com
   ```
   - 전역적으로 고유한 이름이어야 함
   - 커스텀 도메인 사용 시 도메인 이름과 동일하게 설정

4. **데이터 저장 위치 선택**
   - Region: `asia-northeast3` (서울) 권장
   - 또는 `asia-northeast1` (도쿄)

5. **스토리지 클래스 선택**
   - **Standard** 선택 (정적 웹사이트용)

6. **액세스 제어 설정**
   - "균일한 액세스 제어" 선택

7. **만들기** 클릭

#### 방법 2: gcloud CLI 사용

```bash
# gcloud CLI 설치 후 실행
gcloud storage buckets create gs://aps-website-bucket \
  --location=asia-northeast3 \
  --uniform-bucket-level-access
```

### 2. 버킷을 공개 웹사이트로 설정

#### 웹 콘솔에서 설정:

1. **버킷 선택** → **권한** 탭

2. **주 구성원 추가** 클릭
   - 새 주 구성원: `allUsers`
   - 역할: `Storage 객체 뷰어` (Storage Object Viewer)
   - **저장**

3. **구성** 탭으로 이동

4. **웹사이트 구성 수정**
   - 기본 페이지: `index.html`
   - 404 페이지: `index.html` (또는 별도 404.html 생성)
   - **저장**

#### gcloud CLI로 설정:

```bash
# 모든 사용자에게 읽기 권한 부여
gcloud storage buckets add-iam-policy-binding gs://aps-website-bucket \
  --member=allUsers \
  --role=roles/storage.objectViewer

# 웹사이트 설정
gcloud storage buckets update gs://aps-website-bucket \
  --web-main-page-suffix=index.html \
  --web-error-page=index.html
```

---

## 파일 업로드

### 방법 1: 웹 콘솔에서 업로드

1. **버킷으로 이동**
   - Cloud Storage → 버킷 선택

2. **파일 업로드**
   - **파일 업로드** 버튼 클릭
   - HTML, CSS, JS 파일 선택하여 업로드

3. **폴더 업로드**
   - **폴더 업로드** 버튼 클릭
   - `images` 폴더 선택하여 업로드

### 방법 2: gcloud CLI로 업로드

```bash
# 프로젝트 디렉토리로 이동
cd E:\Projects\APS\aps_ver.2

# 모든 파일 업로드
gcloud storage cp *.html gs://aps-website-bucket/
gcloud storage cp *.css gs://aps-website-bucket/
gcloud storage cp *.js gs://aps-website-bucket/

# images 폴더 업로드 (재귀적)
gcloud storage cp -r images gs://aps-website-bucket/
```

### 방법 3: gsutil 사용 (구버전 CLI)

```bash
# 현재 디렉토리의 모든 파일을 버킷에 동기화
gsutil -m rsync -r -d . gs://aps-website-bucket/

# 특정 파일만 업로드
gsutil cp index.html gs://aps-website-bucket/
gsutil cp -r images gs://aps-website-bucket/
```

### 업로드 후 확인

업로드 완료 후 다음 URL로 접속:
```
https://storage.googleapis.com/aps-website-bucket/index.html
```

또는 간단한 URL:
```
https://aps-website-bucket.storage.googleapis.com/
```

---

## 커스텀 도메인 연결 (선택)

커스텀 도메인(예: www.example.com)을 사용하려면:

### 1. 도메인 소유권 확인

1. **Google Search Console** 접속
   - https://search.google.com/search-console

2. **속성 추가** → 도메인 입력

3. **DNS 레코드**로 소유권 확인
   - 제공된 TXT 레코드를 도메인 DNS 설정에 추가

### 2. 버킷 이름을 도메인으로 변경

새 버킷 생성 시 버킷 이름을 도메인과 동일하게 설정:
```
버킷 이름: www.your-domain.com
```

### 3. DNS 설정

도메인 등록업체(가비아, 후이즈 등)의 DNS 관리 페이지에서:

#### CNAME 레코드 추가:
```
이름(Name): www
유형(Type): CNAME
값(Value): c.storage.googleapis.com
TTL: 3600
```

### 4. Load Balancer 사용 (권장)

더 안정적인 방법:

1. **Google Cloud Console** → **네트워크 서비스** → **Load Balancing**

2. **부하 분산기 만들기**
   - HTTP(S) 부하 분산 선택

3. **백엔드 구성**
   - Cloud Storage 버킷 선택

4. **프런트엔드 구성**
   - IP 주소 예약
   - 도메인 연결

---

## SSL/HTTPS 설정 (선택)

### Google Cloud Load Balancer 사용 시

1. **Load Balancer 설정** 페이지에서

2. **프런트엔드 구성**
   - 프로토콜: HTTPS
   - **인증서** → **새 인증서 만들기**

3. **Google 관리형 인증서** 선택
   - 도메인 입력 (예: www.your-domain.com)
   - 자동으로 SSL 인증서 발급 및 갱신

4. DNS 설정
   - A 레코드 추가:
     ```
     이름: www (또는 @)
     유형: A
     값: [Load Balancer IP 주소]
     ```

### Cloudflare 사용 (무료 대안)

1. **Cloudflare** 가입
   - https://www.cloudflare.com/

2. 도메인 추가 및 네임서버 변경

3. **DNS 설정**
   ```
   CNAME www → c.storage.googleapis.com
   ```

4. **SSL/TLS** 탭
   - 암호화 모드: "Full" 선택

5. 자동으로 무료 SSL 적용

---

## 유지보수 및 업데이트

### 파일 업데이트

웹사이트 파일 수정 후 재업로드:

```bash
# 특정 파일만 업데이트
gcloud storage cp index.html gs://aps-website-bucket/

# 전체 동기화 (변경된 파일만 업로드)
gcloud storage rsync -r -d . gs://aps-website-bucket/
```

### 캐시 무효화

브라우저 캐시로 인해 변경사항이 바로 반영되지 않을 수 있습니다.

#### Cache-Control 설정:

```bash
# HTML 파일: 캐시하지 않음
gcloud storage objects update gs://aps-website-bucket/*.html \
  --cache-control="no-cache, max-age=0"

# CSS/JS: 1시간 캐시
gcloud storage objects update gs://aps-website-bucket/*.css \
  --cache-control="public, max-age=3600"

gcloud storage objects update gs://aps-website-bucket/*.js \
  --cache-control="public, max-age=3600"

# 이미지: 1주일 캐시
gcloud storage objects update gs://aps-website-bucket/images/* \
  --cache-control="public, max-age=604800"
```

### 버전 관리

이전 버전으로 롤백하려면:

1. **버킷 버전 관리 활성화**
   ```bash
   gcloud storage buckets update gs://aps-website-bucket \
     --versioning
   ```

2. **이전 버전 복원**
   - Cloud Console → 버킷 → 파일 선택 → 버전 기록

---

## 비용 예상

### Google Cloud Storage 요금 (2024년 기준)

**서울 리전 (asia-northeast3) 기준:**

- **스토리지**: $0.023/GB/월
  - 예상: 500MB = 약 $0.01/월

- **네트워크 (송신)**:
  - 첫 1GB: 무료
  - 1GB ~ 10TB: $0.12/GB
  - 예상 (월 10GB 트래픽): 약 $1.08/월

- **작업 요청**:
  - Class A (업로드): $0.005/1,000회
  - Class B (조회): $0.0004/1,000회
  - 예상: 거의 무료

**월 예상 총 비용: 약 $1~2 (₩1,300~2,600)**

소규모 웹사이트의 경우 거의 무료에 가까운 비용으로 운영 가능합니다.

---

## 자동 배포 스크립트

반복 작업을 자동화하기 위한 스크립트:

### deploy.sh (Linux/Mac)

```bash
#!/bin/bash

# 설정
BUCKET_NAME="aps-website-bucket"
PROJECT_DIR="."

echo "웹사이트 배포 시작..."

# 파일 업로드
echo "파일 업로드 중..."
gcloud storage rsync -r -d $PROJECT_DIR gs://$BUCKET_NAME/ \
  --exclude=".git/*" \
  --exclude="*.md" \
  --exclude="deploy.sh"

# 캐시 설정
echo "캐시 설정 중..."
gcloud storage objects update gs://$BUCKET_NAME/*.html \
  --cache-control="no-cache, max-age=0"

gcloud storage objects update gs://$BUCKET_NAME/*.css \
  --cache-control="public, max-age=3600"

gcloud storage objects update gs://$BUCKET_NAME/*.js \
  --cache-control="public, max-age=3600"

echo "배포 완료!"
echo "URL: https://$BUCKET_NAME.storage.googleapis.com/"
```

### deploy.bat (Windows)

```batch
@echo off
SET BUCKET_NAME=aps-website-bucket

echo 웹사이트 배포 시작...

echo 파일 업로드 중...
gcloud storage rsync -r -d . gs://%BUCKET_NAME%/

echo 캐시 설정 중...
gcloud storage objects update gs://%BUCKET_NAME%/*.html --cache-control="no-cache, max-age=0"
gcloud storage objects update gs://%BUCKET_NAME%/*.css --cache-control="public, max-age=3600"
gcloud storage objects update gs://%BUCKET_NAME%/*.js --cache-control="public, max-age=3600"

echo 배포 완료!
echo URL: https://%BUCKET_NAME%.storage.googleapis.com/
pause
```

### 스크립트 실행

```bash
# 실행 권한 부여 (Linux/Mac)
chmod +x deploy.sh

# 실행
./deploy.sh

# Windows
deploy.bat
```

---

## 문제 해결 (Troubleshooting)

### 1. 403 Forbidden 오류
**원인**: 버킷 권한 설정 문제

**해결**:
```bash
gcloud storage buckets add-iam-policy-binding gs://aps-website-bucket \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

### 2. 404 Not Found
**원인**: 파일이 업로드되지 않았거나 경로 오류

**해결**:
```bash
# 버킷 내 파일 목록 확인
gcloud storage ls gs://aps-website-bucket/

# 파일 재업로드
gcloud storage cp index.html gs://aps-website-bucket/
```

### 3. 변경사항이 반영되지 않음
**원인**: 브라우저 캐시

**해결**:
- 브라우저: Ctrl+Shift+R (강제 새로고침)
- Cache-Control 헤더 설정 (위 참조)

### 4. 이미지가 표시되지 않음
**원인**: 경로 문제 또는 파일 업로드 누락

**해결**:
```bash
# images 폴더 전체 재업로드
gcloud storage cp -r images gs://aps-website-bucket/
```

### 5. CSS/JS가 적용되지 않음
**원인**: MIME 타입 문제

**해결**:
```bash
# 올바른 Content-Type으로 재업로드
gcloud storage cp main.css gs://aps-website-bucket/ \
  --content-type="text/css"

gcloud storage cp main.js gs://aps-website-bucket/ \
  --content-type="application/javascript"
```

---

## 보안 권장사항

### 1. 불필요한 파일 업로드 제외

`.gitignore` 파일 생성:
```
# 개발 파일
*.md
.git/
.vscode/
node_modules/

# 배포 스크립트
deploy.sh
deploy.bat

# 임시 파일
*.tmp
*.bak
```

### 2. CORS 설정 (API 사용 시)

```bash
# cors.json 파일 생성
cat > cors.json << EOF
[
  {
    "origin": ["https://www.your-domain.com"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

# CORS 설정 적용
gcloud storage buckets update gs://aps-website-bucket \
  --cors-file=cors.json
```

### 3. 접근 로그 활성화

```bash
# 로그 버킷 생성
gcloud storage buckets create gs://aps-website-logs \
  --location=asia-northeast3

# 로깅 활성화
gcloud storage buckets update gs://aps-website-bucket \
  --log-bucket=gs://aps-website-logs \
  --log-object-prefix=logs/
```

---

## 체크리스트

배포 전 확인사항:

- [ ] Google Cloud 프로젝트 생성됨
- [ ] Cloud Storage 버킷 생성됨
- [ ] 버킷이 공개 읽기 권한으로 설정됨
- [ ] 웹사이트 구성 설정됨 (index.html)
- [ ] 모든 HTML, CSS, JS 파일 업로드됨
- [ ] images 폴더 업로드됨
- [ ] 웹사이트 접속 테스트 완료
- [ ] (선택) 커스텀 도메인 연결됨
- [ ] (선택) SSL/HTTPS 설정됨
- [ ] Cache-Control 헤더 설정됨

---

## 추가 리소스

- [Google Cloud Storage 문서](https://cloud.google.com/storage/docs)
- [정적 웹사이트 호스팅 가이드](https://cloud.google.com/storage/docs/hosting-static-website)
- [gcloud CLI 설치](https://cloud.google.com/sdk/docs/install)
- [Cloud Storage 요금](https://cloud.google.com/storage/pricing)

---

## 지원

문제가 발생하면:
1. 이 문서의 [문제 해결](#문제-해결-troubleshooting) 섹션 참조
2. Google Cloud 콘솔의 로그 확인
3. Google Cloud 지원팀 문의

---

**작성일**: 2025년 1월
**버전**: 1.0
