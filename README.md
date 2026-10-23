# Pocket

자취생을 위한 모바일 가계부 웹 애플리케이션

## 주요 기능

- **Home**: 월 예산 잔액 및 진행률 계산, 일일 권장 지출 페이스, 오늘 지출 요약, 최근 지출 내역, 월 예산 설정
- **Add Expense**: 금액 입력(숫자 키패드 / 빠른 증액), 카테고리 선택, 결제 수단 및 메모, 1인 가구 필수 지출 구분
- **History**: 월별/날짜별 지출 그룹화 및 합계, 실시간 검색, 카테고리 필터링, 항목 상세 확인 및 삭제
- **Stats**: 월별 지출 통계, 카테고리별 도넛 차트 및 지출 순위, 최근 6개월 소비 트렌드 막대 차트
- **Goals**: 저축 목표 관리, 목표별 금액 적립 및 진행률 실시간 갱신, 목표 추가 및 삭제

## 기술 스택

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand (localStorage 연동)
- **Routing**: React Router
- **Chart**: Recharts

## 실행 방법

### 패키지 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```
