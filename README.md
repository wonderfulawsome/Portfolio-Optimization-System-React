# 📊 Portfolio Optimization System – React

본 리포지토리는 포트폴리오 최적화 시스템의 프론트엔드 부분을 **React (Next.js)** 를 활용하여 구현한 프로젝트이다. 사용자는 재무 지표(예: **PER, Dividend Yield, Beta, RSI, 거래량, 변동성**)를 선택한 후 **Optimize** 버튼을 클릭하여 **백엔드 (Flask API)** 로부터 산출된 최적화 결과를 확인할 수 있다.

## 🚀 주요 기능

- **📑 사용자 입력 폼**  
  - 각 재무 지표를 드롭다운 방식으로 선택할 수 있도록 구성되어 있다.  
  - 입력 폼은 **반응형 디자인**이 적용되어 있어 **모바일 환경에서도 자연스럽게 표시**된다.

- **⚡ 최적화 요청 및 로딩 처리**  
  - **Optimize** 버튼 클릭 시 **프론트엔드에서 백엔드 API로 POST 요청을 보낸다**.  
  - 요청을 처리하는 동안 화면 중앙에 **"Optimizing..."** 이라는 **로딩 팝업**이 표시되어 진행 상황을 안내한다.

- **📊 결과 시각화**  
  - 결과 영역은 **상단에 반응형 파이 차트**를 배치하여 포트폴리오 할당 비율을 시각적으로 확인할 수 있다.  
  - 하단에는 **3분할 그리드 형태**로 종목과 할당 비율(%)을 보기 쉽게 정렬하여 표시한다.

- **📱 반응형 레이아웃**  
  - 전체 레이아웃은 **좌측(입력 폼)과 우측(최적화 결과)으로 2분할**되어 있으며,  
  - 모바일 환경에서도 **`flex-wrap` 등의 CSS 기법을 적용하여 자연스럽게 레이아웃이 조정**된다.

---

## 📁 프로젝트 구조

```plaintext
Portfolio-Optimization-System-React/
├── pages/
│   └── index.js              // 메인 React 컴포넌트 (최적화 시스템 UI)
├── PortfolioOptimizer.js     // (선택 사항) 별도의 최적화 컴포넌트 파일
├── ajax.js                   // (필요 시) Ajax 관련 스크립트
├── api.js                    // 백엔드 API 호출 관련 함수 (optimizePortfolio)
├── index.html                // 정적 HTML (필요 시)
├── scripts.js                // 정적 자바스크립트 (필요 시)
├── styles.css                // 전역 CSS (배경, 폰트, 레이아웃 스타일 등)
├── package.json              // Node.js 및 프로젝트 의존성 정보
├── docker-compose.yml        // Docker 배포를 위한 구성 파일 (옵션)
├── vercel.json               // Vercel 배포 설정 파일
└── README.md                 // 본 문서
'''


> **참고:** 본 리포지토리는 프론트엔드 부분만 포함되며, 최적화 계산은 별도의 백엔드(Flask API)를 통해 수행된다. API 엔드포인트는 `api.js` 파일 내에 정의되어 있다.

## 설치 및 실행

### 로컬 개발 환경

1. **Node.js 설치**  
   [Node.js 공식 웹사이트](https://nodejs.org/)에서 Node.js를 설치

2. **의존성 설치**  
   리포지토리 루트 디렉터리에서 아래 명령어를 실행하여 npm 패키지를 설치
   ```bash
   npm install
