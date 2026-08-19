# CYCUlaude — 프로젝트 인수인계 문서

> CYCU(중원대학교) 교환학생·신입생을 위한 정보 통합 앱 프로토타입
> 최종 업데이트 기준 파일: `App.tsx` (약 3,292줄, 단일 파일)

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [작업 환경 및 워크플로우](#2-작업-환경-및-워크플로우)
3. [현재 앱 구조](#3-현재-앱-구조)
4. [주요 기능 상세](#4-주요-기능-상세)
5. [실제 데이터 및 외부 링크](#5-실제-데이터-및-외부-링크)
6. [디자인 시스템](#6-디자인-시스템)
7. [전체 개발 이력](#7-전체-개발-이력)
8. [사용자 테스트 결과](#8-사용자-테스트-결과)
9. [미해결 과제 및 다음 단계](#9-미해결-과제-및-다음-단계)

---

## 1. 프로젝트 개요

### 목적
대만 중원대학교(Chung Yuan Christian University, CYCU)에 입학하는 **교환학생 및 국제 신입생**이 겪는 **정보 부족과 적응 문제**를 해결하기 위한 모바일 앱.

### 핵심 문제 의식
- 학교 공지가 여러 웹사이트에 흩어져 있어 확인이 어려움
- 언어 장벽 (공지 대부분이 중국어)
- 마감일(비자, ARC, 수강신청 등)을 놓치기 쉬움
- 도움을 요청할 창구를 모름

### 해결 전략
**"개인화된 것처럼 연출"** — 실제 백엔드 없이, 온보딩에서 수집한 정보(국적/단과대/학과/관심사/주거)를 기반으로 크게 **이공계(STEM) / 인문계(Humanities)** 두 갈래로 콘텐츠를 분기시켜 개인화 경험을 구현.

### 스토리라인 (8페이지 구성)

| 페이지 | 이름 | 목적 |
|---|---|---|
| 1 | 이메일 | ISA 명의 환영 메일 → 랜딩페이지 링크 |
| 2 | 랜딩페이지 | 앱 소개 + 다운로드 유도 |
| 3 | 온보딩 | 개인정보 설문 → 개인화 준비 |
| 4 | 홈 (대시보드) | 개인화된 정보 허브 |
| 5 | 알림봇 (Bot) | 공지 선별·우선순위 필터링 |
| 6 | 마이페이지 | 개인정보 관리·수정 |
| 7 | 서포트 센터 | 운영진 직접 연락 |
| 8 | 커뮤니티 & 리뷰 | 데일리 활용 + 피드백 수집 |

---

## 2. 작업 환경 및 워크플로우

### 개발 환경
- **Figma Make**로 초기 프로토타입 생성 → 결과물은 **React + TypeScript** 코드 (`App.tsx`)
- 스타일링: **인라인 스타일** (`style={{ }}`) 방식 — Tailwind 미사용
- 아이콘: **lucide-react**
- 폰트: **Plus Jakarta Sans** (Google Fonts, 런타임 주입)

### ⚠️ 중요: Figma Make 크레딧 절약 워크플로우
Figma Make 크레딧이 소진된 상태에서 다음 방식으로 작업을 이어갔습니다:

```
1. Figma Make에서 App.tsx 코드 전체 복사
2. 외부(Claude 등)에서 코드 수정
3. 수정된 코드를 Figma Make의 App.tsx에 덮어쓰기
```

**주의사항**
- import 경로(`@/components/...`, `/src/imports/...`)를 그대로 유지해야 함
- 없는 라이브러리를 새로 쓰면 붙여넣을 때 에러 발생
- 수정 후 반드시 타입체크 필요 (아래 참조)

### 검증 방법
붙여넣기 전 반드시 타입체크를 돌려 깨진 곳이 없는지 확인합니다.

```jsonc
// tsconfig.json — 검증용
{
  "compilerOptions": {
    "target": "es2020",
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": false,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    // 아래 두 개를 켜면 죽은 코드(미사용 import·변수·props)까지 잡힘
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["App.tsx"]
}
```

```bash
npm i react react-dom @types/react @types/react-dom lucide-react
tsc -p tsconfig.json
```

---

## 3. 현재 앱 구조

### 3-1. 페이지 흐름

```
email → landing → onboarding(6단계) → dashboard
                                          │
        ┌──────────────┬──────────────┬───┴──────────┐
   notifications    support        profile       community
       (Bot)                          │        (홈 위젯에서 진입)
                                      │
                          My Setup / Interests 편집
                          → onboarding 해당 단계로 재진입
                          → 완료 시 profile로 복귀
```

- **하단 탭바(4개)**: 홈 / Bot / Support / Profile — `email·landing·onboarding`에서는 숨김
- **community**는 탭바에 없고 홈 위젯으로만 진입

### 3-2. 컴포넌트 맵

> 줄 번호는 작성 시점 기준입니다. 코드를 수정하면 어긋나므로 컴포넌트명으로 검색하세요.

| 줄 번호 | 컴포넌트 | 역할 |
|---|---|---|
| 1132 | `EmailPage` | 환영 이메일 (ISA 명의) |
| 1186 | `LandingPage` | 앱 소개 랜딩 + 뒤로가기 |
| 1303 | `OnboardingPage` | 6단계 설문 (편집 모드 지원) |
| 1717 | `DocumentsPanel` | OIA 공지 목록 (전체화면 패널) |
| 1754 | `SchedulePanel` | 학사일정 캘린더 (전체화면 패널) |
| 1998 | `DashboardPage` | 홈 (메인 UI) |
| 2148 | `NotificationsPage` | 알림봇 (home/category/detail/settings/sms/call 6개 뷰) |
| 2492 | `ProfilePage` | 마이페이지 |
| 2639 | `SupportPage` | 서포트 센터 |
| 2788 | `CommunityPage` | 커뮤니티 (board/poll/feedback 3탭) |
| 3037 | `TutorialOverlay` | 튜토리얼 (범용, steps prop 기반) |
| 3180 | `TabBar` | 하단 탭바 (4개) |
| 3200 | `App` | 루트 (상태 관리) |

### 3-3. 핵심 타입

```typescript
type Page = 'email' | 'landing' | 'onboarding' | 'dashboard'
          | 'notifications' | 'support' | 'profile' | 'community'

type Lang = 'zh' | 'nl' | 'en' | 'fr' | 'de' | 'id' | 'ja' | 'ko' | 'vi'  // 9개 언어

type Track = 'stem' | 'humanities'   // 콘텐츠 분기 축

type OnboardingAnswers = {
  name: string        // 이름
  studentId: string   // 학번
  country: string     // 국적
  college: string     // 단과대
  department: string  // 학과 (= CYCU에서는 전공과 동일)
  interests: string[] // 관심사 (커스텀 "Other" 텍스트 포함)
  housing: string     // 주거 형태
}
```

### 3-4. 루트 상태 (App 컴포넌트)

```typescript
page              // 현재 페이지
lang              // 선택 언어 (기본 'en')
track             // stem | humanities (온보딩 완료 시 단과대 기반 자동 설정)
onboardingAnswers // 온보딩 수집 데이터
editingSetup      // 마이페이지에서 온보딩 재진입 중인지
editStartStep     // 재진입 시 시작할 단계 (2=설정, 5=관심사)
showTutorial      // 홈 튜토리얼 표시 여부
showBotTut / seenBotTut          // Bot 튜토리얼
showSupportTut / seenSupportTut  // Support 튜토리얼
```

---

## 4. 주요 기능 상세

### 4-1. 온보딩 (6단계)

| 단계 | 내용 | 비고 |
|---|---|---|
| 0 | Welcome (CYclaude 인사) | 최초 진입 시에만, 편집 모드에선 건너뜀 |
| 1 | 이름 + 학번 | 둘 다 입력해야 진행 |
| 2 | 국적 | 6개 퀵 선택 + "Other country" → 19개국 검색 모달 |
| 3 | 단과대 (College) | 7개 |
| 4 | 학과 (Department) | 선택한 단과대의 학과만 표시 |
| 5 | 관심사 | 복수 선택 + "Other" 자유 입력 |
| 6 | 주거 형태 | 4개 |

**특징**
- 모든 단계에 뒤로가기, 1단계에서 뒤로가면 온보딩 이탈
- 미선택 상태로 Next 시 경고 메시지
- 진행률 바 + "Profile So Far" 뱃지 실시간 표시
- **편집 모드**: 마이페이지에서 진입 시 Welcome 건너뛰고 특정 단계부터 시작, 완료 시 마이페이지로 복귀

### 4-2. 개인화 연동

온보딩 입력값이 반영되는 위치:

| 데이터 | 반영 위치 |
|---|---|
| 이름 | 홈 헤더, Bot 헤더·아바타 이니셜, 마이페이지 |
| 학번 | 홈 헤더, 마이페이지 |
| 국적 | 홈 헤더(국기 자동 매칭), 마이페이지 My Setup |
| 단과대 | Bot 헤더 부제, 마이페이지, **track 자동 판별** |
| 학과 | 홈 헤더, 마이페이지 |
| 관심사 | 마이페이지 My Interests (아이콘·색상 자동 매칭) |
| 주거 | 마이페이지 My Setup |

**track 자동 판별 로직**
```
경영대·디자인대·인문교육대·법학대 → humanities
그 외 (과학·공학·전기컴퓨터) → stem
```
→ 홈 위젯 문구, 커뮤니티 게시물·투표 내용이 계열에 맞게 분기

### 4-3. 다국어 (i18n)

- **9개 언어**: 繁中(ZH-TW), Dutch, English, French, German, Indonesian, Japanese, Korean, Vietnamese
- **약 95개 UI 키 × 9개 언어**
- 홈 헤더의 언어 버튼(국기 + 짧은 코드)으로 전환, 드롭다운은 전체 언어명 표시
- **적용 범위**: 하단 탭바(전 화면), 홈, Bot, 마이페이지, 서포트, 커뮤니티, 튜토리얼
- **미번역(의도적)**: 고유명사(iTOUCH, i-learning 2.0, My CYCU), 실제 공지 원문, 학사일정 항목, 사용자 게시물

```typescript
const T: Record<Lang, Record<TKey, string>> = { ... }
const tr = (lang: Lang, key: TKey) => T[lang][key]
// 각 페이지에서: const t = T[lang]  →  {t.myPage}
```

### 4-4. 학사일정 캘린더

- **출처**: CYCU 공식 영문 학사일정 PDF (2026-2027학년도, 2026.4.2 승인)
- **125개 날짜 / 142개 이벤트** (2026.8 ~ 2027.7 전체)
- **색상 분류 5종**
  - 🔵 파랑: 시작/신청 개시
  - 🟠 주황: 마감/종료
  - 🔴 빨강: 공휴일
  - 🟢 초록: 행사/의식
  - 🟣 보라: 시험
- **인터랙션**: ‹ › 버튼으로 월 이동, 일정 있는 날짜 탭 → 하단에 해당 날짜 전체 일정 표시, 한 날짜에 최대 3개 점 표시

### 4-5. 커뮤니티 (Page 8)

3개 탭으로 구성:

| 탭 | 내용 |
|---|---|
| **Board** | 학생 게시글 피드. 좋아요 버튼, 좋아요 많은 순 상단 노출 |
| **Poll** | 실사용 피드백 수집용 투표 (계열별 문항 분기) |
| **Review** | 별점 + 후기 남기기, 다른 학생 후기 노출 |

- 게시글 작성자는 **닉네임 + 국기**로 표시 (실명 미사용)
- 게시글에 `track` 필드가 있어 **STEM / Humanities / all** 로 노출 대상이 갈림
- 홈 대시보드의 Community 위젯에서 진입

### 4-6. 튜토리얼 시스템

**범용 컴포넌트 + 페이지별 스텝 정의** 구조:

```typescript
type TutStep = { key, subKey, titleKey, radius, Icon, floatAbove? }

DASHBOARD_TUT_STEPS  // 5단계: 언어 / 내정보 / 공지 / 위젯 / 탭바
BOT_TUT_STEPS        // 3단계: 스마트필터 / 검색 / 알림목록
SUPPORT_TUT_STEPS    // 4단계: 응급의료 / 연락처 / 메시지 / FAQ
```

**동작 방식**
- 홈: 온보딩 최초 완료 시 1회
- Bot / Support: 해당 탭 최초 방문 시 각각 1회 (서로 독립)
- 마이페이지에서 설정 수정 후 복귀 시에는 표시 안 됨

**기술적 핵심**
- 강조 대상에 `data-tut="키"` 속성 부착 → `getBoundingClientRect()`로 **실제 DOM 위치 측정**
- **스포트라이트 방식**: 링 자체는 투명, `box-shadow: 0 0 0 2000px`로 **링 바깥만** 어둡게 → 강조 대상은 원래 밝기 유지
- 한 번에 한 개만 강조 (라벨 겹침 원천 방지)
- 설명은 항상 하단 고정 시트에 표시
- 탭바 단계에서는 시트가 탭바 위로 떠오름 (`floatAbove`)
- 진행바 + "현재 / 전체" 카운터(페이지별 단계 수에 맞춰 자동), 뒤로가기, 건너뛰기, 펄스 애니메이션

---

## 5. 실제 데이터 및 외부 링크

### 5-1. CYCU 학사조직 (공식 사이트 확인)

> ⚠️ CYCU는 **단과대 → 학과** 2단계 구조. 학과가 곧 전공 (한국식 "학과 안 전공" 구조 아님)

| 단과대 | 학과 |
|---|---|
| College of Science | 응용수학, 물리, 화학, 심리, 생명과학기술 |
| College of Engineering | 화공, 토목, 기계, 생명공학, 환경공학 |
| College of Business | 경영, 국제경영, 회계, 정보경영, 금융 |
| School of Design | 건축, 상업디자인, 실내디자인, 조경건축 |
| College of Humanities & Education | 특수교육, 응용언어학, 대외한어교학 |
| School of Law | 재정경제법 |
| College of EECS | 산업시스템공학, 전자공학, 정보공학, 전기공학, 응용AI |

**총 7개 단과대 / 26개 학과**

### 5-2. 연락처 (Support 페이지)

**OIA (국제처)**
- 전화: `03-2651702`
- 지도: https://maps.app.goo.gl/fpeBNBA2mJFdAuxh9?g_st=ic (7F)
- Instagram: https://www.instagram.com/cycu_oia/
- Facebook: https://www.facebook.com/wowcycuoia
- LINE: https://page.line.me/mez8576w

**ISA (학생회)**
- Instagram: https://www.instagram.com/cycu_isa/
- Facebook: https://www.facebook.com/groups/196377886244/?ref=share&_rdr

**Dormitory Office (기숙사)**
- 홍보 영상: https://youtu.be/h0tORfDT50I?si=KmVR49PsaVPfVbEp
- Facebook: https://www.facebook.com/ReChengDorm.CYCU#
- 지도: https://maps.app.goo.gl/ipJ7DkeimFuvS4pp9

**국제학생 안내 페이지**
- https://oia.cycu.edu.tw/?p=9821&lang=en

### 5-3. Quick Links (홈)

| 항목 | 링크 |
|---|---|
| OIA Office Hours (Mon–Fri 8–17) | https://oia.cycu.edu.tw/ |
| iTOUCH (공지) | https://itouch.cycu.edu.tw/home/#/ann |
| i-learning 2.0 (강의) | https://ilearning.cycu.edu.tw/ |
| My CYCU (학생 포털) | https://myself.cycu.edu.tw/#/ |

### 5-4. 기타
- Campus Guide (지도): https://map.cycu.edu.tw/
- 이미지: `/src/imports/IMG_2332.JPG` (이메일 헤더), `/src/imports/image-3.png` (CYCU 로고)

---

## 6. 디자인 시스템

### 6-1. 색상

```javascript
const RED        = '#B02F00'  // 메인 브랜드 (CTA, 강조, 튜토리얼)
const ORANGE     = '#D43F00'  // 보조 강조 (중요 공지)
const BLUE       = '#1D4E89'  // 페이지 헤더, 정보성 요소
const LIGHT_BLUE = '#EEF3FA'  // 파랑 계열 배경 틴트
const C = { white, gray800~gray50, green600, blue700 }  // 그레이 스케일
```

> 캘린더의 시험 항목 색(`#7C3AED`)은 상수 없이 리터럴로 직접 쓰입니다.
> 상수화하려면 캘린더 데이터의 37곳을 함께 교체해야 합니다.

### 6-2. 통일 규칙

| 항목 | 규칙 |
|---|---|
| **폰트** | Plus Jakarta Sans 단일 (세리프 완전 제거) |
| **아이콘** | lucide-react 단일 세트. 이모지는 UI 아이콘으로 쓰지 않음<br>(예외: 국기, 폰 목업 화면, 사용자 게시글 본문) |
| **페이지 헤더** | 솔리드 컬러 (그라데이션 전면 제거), 대부분 BLUE |
| **페이지 배경** | `#F5F5F7` (메인 탭들) / `white` (폼 흐름) |
| **카드** | 흰 배경 + `1px solid gray100` 테두리 (그림자 대신) |
| **Border-radius** | 8 / 12 / 16 / 999 (4단계) |
| **간격** | 8 · 16 · 24 배수 |
| **위계** | 크기·굵기로만 표현 (폰트 종류 X) |

### 6-3. 색상 사용 원칙
> **"의미 없는 색은 쓰지 않는다"**
- 홈 위젯 4개는 흰 배경 + 회색 테두리로 통일, **아이콘에만** 의미색 부여
- 긴급/중요 카드만 색을 가져서 실제로 튀어 보이게 함

---

## 7. 전체 개발 이력

Figma Make로 프로토타입을 만든 뒤, 두 단계로 나뉘어 개선이 진행되었습니다.

- **Stage 1 (Figma Make 내부)** — Figma Make에 직접 수정을 요청하며 프로토타입을 다듬은 단계
- **Stage 2 (코드 직접 수정)** — 크레딧 소진 후 `App.tsx`를 외부에서 직접 편집한 단계

---

### Stage 1 — Figma Make 프로토타입 구축

#### 1-1. 최초 생성
프로젝트 개요와 8페이지 구성, 각 페이지별 목적·디자인 방향·주요 구성 요소를 한 번에 전달하여 전체 프로토타입 생성.

#### 1-2. 프로토타입 품질 문제 해결
Figma Make 결과물에서 반복적으로 발생한 문제들:

| 문제 | 조치 |
|---|---|
| 페이지 인디케이터 노출 | 상단 8개 동그라미 제거, 앱 화면만 보이게 |
| 텍스트 비표시 | 변수·컴포넌트 인스턴스 텍스트를 정적 텍스트로 교체, 배경과 대비되는 fill 색상 지정 |
| 화면 렌더링 실패 | 페이지가 보이지 않는 문제 해결 + 복사·붙여넣기 해도 정상 동작하도록 |
| 불필요한 배경 | 아이폰 목업 뒤 보라색 배경 제거 |
| 동작 안 하는 버튼 | 온보딩 3단계 다음 버튼 누락 등 전체 버튼 점검 |
| 탭바 개수 오류 | 임의로 5개가 된 탭바를 4개로 복구 |
| 화면 이탈 버그 | Campus Guide 클릭 시 첫 페이지로 돌아가는 문제 |

#### 1-3. 디자인 일관성
- 이모지 스타일 통일 (제거가 아니라 **한 가지 스타일로 통일**이 목적) 및 심플화
- 상단 남색 헤더가 과도하게 내려온 문제 수정
- 폰트 크기 상향 (가독성)
- 랜딩페이지 중복 콘텐츠 정리, 커뮤니티 phrase 영역 제거
- 상단 폰 목업 요소(시간·와이파이·배터리) 제거

#### 1-4. 콘텐츠 및 기능 추가
**홈**
- IMPORTANT Notice를 실제 공지 내용으로 교체
- Document → 제출서류 목록, Schedule → 학사일정 화면 연결
- "Make Friends" → "Community" 명칭 변경
- Campus Guide에 학교 지도 링크 연결
- Quick Links 신설 (OIA / iTOUCH / i-learning 2.0 → 이후 My CYCU 추가)
- 상단 검색창 추가
- 헤더 구조 변경: 인사말 → **학교 로고·학교명**, 전공 문구 → **이름·학번**

**온보딩**
- CYCU 전공 선택지 확대, 뒤로가기 버튼 추가
- 미선택 상태로 Next 클릭 시 경고 표시, 국가 목록에 대만 추가

**알림(Bot)**
- SMS Escalation 목업 + 진입 버튼, Incoming Call 목업 추가

**기타**
- 이메일 페이지 로고를 CYCU 공식 로고로 교체, 이미지 잘림 수정
- 랜딩페이지 다운로드 버튼 중복 제거 → 하나로 통일
- 커뮤니티 멤버 이름 닉네임화, 앱 내 텍스트 영어 통일
- 홈 화면 언어 선택 기능 요청 (→ Stage 2에서 9개 언어 i18n으로 발전)
- 학사일정에 실제 캘린더 형태 도입

#### 1-5. 1차 사용자 테스트 피드백 반영
**Support Center (Page 7)**
- ✅ 필요한 연락 수단이 모두 포함됨 / 채널별 버튼 레이아웃이 직관적
- ➕ 응급 상황 대비 의료센터 정보 추가, CYCU 국제학생 안내 페이지 링크 추가

**Community & Review (Page 8)**
- ➕ 좋아요 버튼 추가 및 인기 게시물 상단 노출
- ➕ 커뮤니티 기능 상단 이동 + 게시판 기능 추가
- ➕ 중국어 표기는 빨간색으로 구분, 하단 탭바 연동
- ➕ 실제 피드백 수집용 투표(Poll) 페이지 신설

---

### Stage 2 — 코드 직접 수정

#### Phase 1 — 초기 진단 및 구조 개선
1. **네비게이션 수정** — 모든 화면에 뒤로가기, 마이페이지에서 온보딩 재진입 경로 신설
2. **온보딩 재설계** — Welcome 페이지 신설 / 중복 다운로드 단계 제거 / 순서 재배치(국적→단과대→학과) / 관심사 수집 이유 설명 + "Other" 옵션
3. **CYCU 실제 학사조직 반영** — 공식 사이트 확인 후 7개 단과대·26개 학과로 교체, 학과=전공 구조 확인하여 단계 통합

#### Phase 2 — 실제 데이터 연결
4. **기숙사 정보** — Support 페이지에 영상/Facebook/지도 링크 연결
5. **ISA 정보** — Instagram/Facebook 링크 연결, 정보 없던 KakaoTalk/LINE 버튼 삭제
6. **OIA 정보** — 전화/지도/Instagram/Facebook/LINE 연결, 정보 없던 Email 버튼 삭제
7. **비기능 버튼 전수 조사** — 눌러도 반응 없는 버튼 8개 목록화

#### Phase 3 — 다국어 (1차)
8. **언어 전환 실제 구현** — 기존엔 상태만 바뀌고 화면은 그대로였음. 대시보드 UI 텍스트 번역 적용 (4개 언어)

#### Phase 4 — 학사일정
9. **CYCU 공식 PDF 반영** — 125개 날짜/142개 이벤트, 5색 분류
10. **날짜 클릭 인터랙션** — 고정 범례 제거, 날짜 탭 시 해당일 전체 일정 표시

#### Phase 5 — 개인화 연동
11. **온보딩 값 전면 반영** — 이름·학번 수집 추가, 하드코딩된 "Alex Kim"/"Alex Chen"/학번 불일치 해소
12. **관심사 연동** — 고정 태그 → 온보딩 선택값, 아이콘·색상 자동 매칭
13. **track 자동 판별** — 단과대 기반 STEM/Humanities 분기

#### Phase 6 — 코드 품질 점검
14. **"Other" 관심사 저장 버그 수정** — 자유 입력 텍스트가 저장 안 되던 문제 + 재편집 시 복원 안 되던 연쇄 버그
15. **캘린더 "오늘" 하드코딩 제거** (`new Date(2026,7,13)` → `new Date()`)
16. **죽은 코드 정리** — 미사용 import(Wifi, Battery, Users), 미사용 색상 상수(PURPLE·CREAM·LIGHT), 미사용 컴포넌트, 죽은 props(track, setTrack)
17. **CYClaude 브랜딩 혼선 해소** — 챗봇 이름이 페이지 제목으로 쓰이던 것 → "Notifications" / "My Page"

#### Phase 7 — 기능 개선
18. **학번 입력·편집 가능화**
19. **홈 상단 공지 클릭 → Bot 이동**
20. **My Interests EDIT → 관심사 단계 직접 진입** (`initialStep` prop 신설)

#### Phase 8 — 다국어 (전면 확장)
21. **9개 언어로 확장** — 4개 → 9개, 약 95개 UI 키 전 페이지 적용
22. 언어 드롭다운 스크롤 처리, 버튼 크기 축소(전체 언어명 → 국기+짧은 코드)

#### Phase 9 — 디테일 수정
23. Documents 헤더 색상 통일 (RED → BLUE)
24. 온보딩 이름·학번 / 국적 단계 분리 (5단계 → 6단계)
25. SMS/Call Mockup 버튼 정리 (Back / Detail)
26. 이메일 페이지 이미지 교체 (`IMG_2332.JPG`)

#### Phase 10 — 디자인 통일
27. **세리프 폰트 완전 제거** — 산세리프 단일화
28. **위젯 4색 → 흰색/회색 통일** — 색은 긴급도에만
29. **이모지 → lucide 라인 아이콘 전면 교체**
30. **그라데이션 → 솔리드 네이비**
31. **간격 8배수 통일**
32. **Home 기준으로 Bot/Profile/Support 스타일 통일** — 배경, 헤더 밴드, 카드 스타일

#### Phase 11 — 튜토리얼
33. **홈 튜토리얼 신설** (한화손해보험 레퍼런스 스타일 참고)
34. **위치 정렬 문제 해결** — 하드코딩 좌표 → `data-tut` + `getBoundingClientRect()` 실측
35. **구조 재설계** — 동시 표시 → 한 번에 하나씩 (겹침 원천 차단)
36. **가독성 업그레이드** — 단계 아이콘, N/총 카운터, 뒤로가기, 펄스 애니메이션
37. **Bot·Support 튜토리얼 추가** — 범용 컴포넌트로 리팩터링
38. **밝기 문제 해결** — 스포트라이트 방식으로 전환 (강조 대상은 원래 밝기 유지)

---

## 8. 사용자 테스트 결과

### 개요
- **대상**: 학생 10명 (ISA 학생회장 포함), 기록 응답 8명
- **질문 3가지**: ① 이런 서비스가 있으면 쓰겠는가 ② 개선점 ③ 가장 좋았던 기능
- **Q1 결과** → **전원 긍정**

### 가장 마음에 들었던 기능 (Q3)

| 기능 | 언급 수 |
|---|---|
| **알림/알람** (전화 알림 포함) | **5** |
| 스케줄(학사일정) | 2 |
| 캠퍼스 가이드 | 1 |
| 네트워크(관심사 기반 친구 찾기) | 1 |
| 공지사항 | 1 |
| 통합 편의성 (여러 웹 안 열어도 됨) | 1 |
| 동기화 | 1 |

> **알림 기능이 명확한 킬러 기능**으로 확인됨

### 개선 제안 (Q2)

**🚨 안전·긴급 (우선순위 높음)**
- **자연재해 알림 추가** — 2명 독립 언급, 대만 지역 특성상 필수

**📍 지역 정보**
- 학교 근처 맛집/카페 추천
- 구글 맵 연동

**🔒 신뢰성·보안**
- "알림이 정말 신뢰할 수 있나?"
- 개인정보 보안 우려 (개인 데이터 취급)
- 백업 기능

**🎯 개인화·필터**
- 필터 세분화: 복수전공, 교환학생
- UI 개인화 (글자 크기)
- 프로필을 LinkedIn 스타일로

**📚 학사 기능**
- 출석 체크 기능
- 동아리(클럽) 정보

**👥 사용자층**
- 대학원생 정책 안내
- 졸업생 커뮤니티
- ⚠️ "신입생에겐 매우 좋지만 고학년은 안 쓸 것 같다"

**💻 플랫폼**
- PC에서도 알림 작동하나?

---

## 9. 미해결 과제 및 다음 단계

### 9-1. 사실관계 오류 (시급) ⚠️

**1. 한국 정보가 대만 앱에 혼재**
- 알림 카드: "Book an appointment at the **Sejongno** Immigration Office" → 세종로는 **서울** 지명
- "extending your **D-2** visa" → D-2는 **한국** 유학비자 코드
- **해결 방향**: "NIA Taoyuan Service Center", 대만 학생 거류(ARC) 기준으로 수정

**2. 같은 정보의 표기 불일치**

| 항목 | 위치 A | 위치 B |
|---|---|---|
| OIA 사무실 | Room 704 (알림 3곳) | Room 104 (Support FAQ) |
| OIA 운영시간 | 8–17 (퀵링크) | 9–17 (Support FAQ) |

**3. "D-2" 중의성** — 알림 태그의 D-2(마감 2일 전)와 본문의 D-2 비자가 혼동됨

### 9-2. 개인화 미적용 영역
- 홈 상단 공지가 항상 "Business School" 고정 (온보딩 단과대 미반영)
- 알림 카드 "ME Dept. orientation" 고정
- 마이페이지 통계(42/18/9), My Network 인물(Lucas Silva, Emma Watson) 하드코딩

### 9-3. 미구현 버튼 (8개)
- 알림 상세: 길찾기 / 캘린더 추가 / 직원 문의
- 마이페이지: 아바타 편집(✏️), VIEW ALL, 네트워크 메시지(💬)
- 서포트: 응급의료센터 Call

### 9-4. 남은 앱적 요소
- **SMS/Call 목업 화면** — `borderRadius: 36` 아이폰 하드웨어 프레임 재현, 데모용 "📱 SMS Mockup / 📞 Call Mockup" 버튼이 실제 UI에 노출 중
  - 판단 필요: 발표용으로 유지할지, 제품 UI에서 분리할지

### 9-5. 테스터 피드백 기반 우선순위

**즉시 반영 검토**
1. **자연재해 긴급 알림** (2명 언급 + 지역 특성)
2. **필터 세분화** (교환학생/복수전공/대학원생) — 현재 온보딩이 학부 단일전공 전제라 구조 개선 필요
3. **개인정보 처리 안내** — 실사용 전환의 신뢰 장벽

**전략적 결정 필요**
- 타깃을 **신입생 집중** vs **전 학년 확장** — "고학년은 안 쓸 것 같다"는 지적과 "대학원생·졸업생 커뮤니티" 제안이 같은 지점을 가리킴

---

## 부록: 파일 관리

### 산출물
- `App.tsx` — 최종 코드 (약 3,292줄)

### 작업 시 주의사항
1. **단일 파일 구조** — 모든 컴포넌트가 `App.tsx` 안에 있음. 분리 시 import 경로 주의
2. **인라인 스타일** — CSS 파일 없음. 스타일 변경은 각 컴포넌트 내부에서
3. **타입체크 필수** — 특히 `noUnusedLocals` 옵션으로 죽은 코드 확인
4. **`data-tut` 속성** — 튜토리얼이 이 속성으로 요소를 찾음. 해당 요소 수정 시 속성 유지 필요
5. **번역 키 추가 시** — `TKey` 유니온 타입과 9개 언어 블록 **모두**에 추가해야 컴파일 통과
