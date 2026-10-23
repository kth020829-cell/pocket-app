# 🥑 Pocket - 자취하는 20대를 위한 스마트 가계부

> **"지출 관리가 스트레스가 아닌, 나를 돌보는 리추얼이 되는 곳"**  
> Stitch의 `Mindful Mint` 디자인 시스템을 기반으로 레이아웃, 컬러, 폰트, 간격을 100% 반영하여 제작된 React + Vite + TypeScript 모바일 웹앱입니다.

---

## 📱 주요 화면 및 기능

### 1. 🏠 Home (홈 대시보드)
- **월 예산 실시간 관리**: 설정한 이번 달 총 예산 대비 남은 잔액, 진행률(%), 안전 쿠션 비율 표시
- **소비 페이스 계산**: 남은 기간 동안 하루에 사용 가능한 권장 지출액(`Daily pace`) 및 누적 지출 자동 계산
- **월 예산 수정 기능**: 상단 예산 카드를 클릭하면 팝업 모달이 떠서 원하는 예산 금액으로 즉시 변경 가능
- **오늘의 지출 인사이트**: 오늘 사용한 금액 및 일일 평균 대비 절약액(`under/over avg`), 카테고리별 소분류 칩 제공
- **최근 지출 내역**: 최근 5개의 지출 내역(상호명/메모, 태그, 시간, 금액)을 즉시 확인
- **지출 추가 플로팅 버튼(FAB)**: 원터치로 지출 등록 화면으로 이동

### 2. ➕ Add Expense (지출 등록)
- **손쉬운 금액 입력**: 대형 금액 디스플레이, 퀵 증액 칩(`+₩1k`, `+₩5k`, `+₩10k`, `+₩50k`) 및 커스텀 택타일 숫자 키패드(`1~9`, `00`, `0`, `Backspace`)
- **6가지 필수 카테고리**: 🍜 식비(Food), ☕ 카페(Cafe), 🚇 대중교통(Transit), 🛍️ 쇼핑(Shop), 🏠 주거/공과금(Bills), ✨ 기타(More)
- **디테일 설정**: 날짜 선택(`Today`, `Yesterday`), 결제 수단(토스체크카드, 교통카드, 카카오페이 등), 메모 입력
- **1인가구 필수 지출 스위치**: 재량 지출과 필수 생활비를 구분하는 토글 스위치
- **원클릭 저장**: 저장 즉시 Home, History, Stats에 실시간 반영

### 3. 🧾 History (지출 내역)
- **월별 조회**: 이전/다음 월 탐색 기능 및 월별 총 지출액, 일평균 지출 요약
- **실시간 검색**: 메모, 상호명, 태그, 결제수단 실시간 검색 & 원터치 검색어 지우기
- **카테고리 필터링**: 전체, 식비, 카페, 교통, 쇼핑, 주거비, 수입 등 카테고리별 빠른 필터 칩
- **날짜별 그룹화**: 날짜별 헤더(Sticky Header)와 날짜별 총 지출액 집계
- **항목 상세 및 삭제 기능**: 항목을 클릭하면 상세 팝업이 표시되며, 삭제 버튼을 통해 즉시 삭제 가능

### 4. 📊 Stats (지출 통계 및 분석)
- **월별 통계 전환**: 이전/다음 월 지출 비교 및 전월 대비 증감률(`% vs Sept`)
- **카테고리별 도넛 차트**: Recharts 기반 인터랙티브 도넛 차트 & 중앙 총 지출액 & 범례 칩
- **카테고리 순위(Ranked)**: 지출 비율(%), 총 금액, 결제 건수 순위 리스트 및 시각화 프로그레스 바
- **최근 6개월 소비 트렌드**: 6개월간의 월별 지출 막대 차트(Bar Chart)와 평균 지출선, 선택된 활성 월 하이라이트
- **자취 소비 코칭 팁**: 6개월 평균 대비 절약 분석 및 맞춤형 코칭 메시지

### 5. 🎯 Goals (저축 목표)
- **Active Goals Hub**: 전체 저축 목표 총액 대비 현재까지 모은 금액과 전체 달성률(%) 듀얼 레이어 프로그레스 바
- **목표별 진행 카드**:
  - 목표명, 카테고리 이모지, 목표 금액 및 현재 모은 금액, 목표 달성 기한(D-Day)
  - **금액 적립(Deposit) 기능**: 팝업에서 원하는 금액을 적립하면 진행률이 즉시 갱신
  - **목표 삭제 기능**: 카드 우측 메뉴(`...`)를 통해 언제든지 목표 삭제 가능
- **새 목표 추가(New Goal)**: 원하는 목표명, 카테고리 아이콘, 목표 금액, 달성 기한을 설정하여 나만의 드림 목표 생성

---

## 🛠️ 기술 스택

- **Frontend Framework**: React 18 (TypeScript)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS (`Mindful Mint` 컬러/타이포그래피/간격 토큰 정의)
- **Icons & Fonts**: Google Fonts `Inter`, `Material Symbols Outlined`
- **State Management**: Zustand (`persist` 미들웨어로 브라우저 `localStorage`에 자동 영구 저장)
- **Charts**: Recharts
- **Routing**: React Router DOM v6
- **Layout**: 모바일 퍼스트 뷰포트 (`max-w-md mx-auto`), 데스크톱 브라우저 중앙 정렬 폰 쉘

---

## 📦 초기 내장 데이터

앱 첫 실행 시 바로 모든 기능을 체험할 수 있도록 현실적인 자취생 라이프스타일 데이터가 내장되어 있습니다:
- **최근 3개월치 지출 데이터 32건**: 이마트 장보기, 지하철 출퇴근, 메가커피, 배민 배달, 다이소 생활용품, 공과금/관리비 등
- **기본 저축 목표 2건**:
  1. `New M3 MacBook Pro` (목표 150만원 / 현재 105만원, 70% 달성)
  2. `Jeju Solo Retreat` (목표 80만원 / 현재 64만원, 80% 달성)

---

## 🚀 로컬 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
- 브라우저에서 `http://localhost:3000`에 접속합니다.

### 3. 프로덕션 빌드
```bash
npm run build
```
- `dist/` 폴더에 최적화된 번들이 생성됩니다.

---

## 🌐 깃허브 연동 및 배포 가이드

### 1. GitHub 원격 저장소 연결 및 Push
```bash
# 1) GitHub에서 새 repository 생성 후 아래 명령어 실행
git remote add origin https://github.com/<your-username>/<repo-name>.git
git add .
git commit -m "feat: complete Pocket mobile web app implementation"
git push -u origin main
```

### 2. 배포 옵션 가이드

#### Option A: Vercel 배포 (가장 추천 ⭐)
1. [Vercel](https://vercel.com) 로그인 후 **"Add New Project"** 클릭
2. GitHub 저장소(`pocket`) Import
3. Framework Preset: **Vite** 자동 감지 확인
4. **Deploy** 버튼 클릭
> 💡 이미 프로젝트 루트에 `vercel.json`(`rewrites` SPA 라우팅 설정)이 포함되어 있어 새로고침 시 404 없이 매끄럽게 동작합니다.

#### Option B: Netlify 배포
1. [Netlify](https://netlify.com) 로그인 후 **"Import from Git"**
2. 빌드 커맨드: `npm run build`, 게시 디렉터리: `dist`
> 💡 `public/_redirects` 파일이 자동 적용되어 SPA 서브 라우트 새로고침이 지원됩니다.

#### Option C: GitHub Pages 자동 배포
1. GitHub 저장소의 **Settings > Pages** 메뉴로 이동
2. **Build and deployment > Source**를 **GitHub Actions**로 선택
3. `main` 브랜치에 코드가 push되면 `.github/workflows/deploy.yml`이 자동으로 실행되어 GitHub Pages URL로 배포됩니다.
