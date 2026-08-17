# CYClaude — CYCU International Student Portal

🌏 [한국어](#-한국어) · [English](#-english) · [中文](#-中文)

Live site → deployed on **Vercel** (link in our team chat) · Built by **Team 7 · HGU × CYCU GRP 2026**
Design reference (Figma Make) → [figma.com/make/mMgXvdd6DgLSg3CXSvNMXe](https://www.figma.com/make/mMgXvdd6DgLSg3CXSvNMXe/Create-based-on-reference)

---

## 🇰🇷 한국어

### 이 프로젝트는?
CYCU 교환·국제학생의 **정보 부족 문제**를 해결하는 웹 포털 **CYClaude**입니다.
우리의 공동 작업 목표: **이미 만들어진 이 웹페이지의 디자인과 기본 기능을 팀원이 함께 수정·개선**하는 것.

🆕 **랜딩페이지 안에 인터랙티브 앱 프로토타입이 들어있습니다.** 히어로 영역의 "↓ Try the interactive app prototype" 버튼(또는 상단 메뉴의 **Try the App**)을 누르면 폰 목업이 나오고, Home / Notice / AI / Community / My 5개 화면을 실제로 탭·화살표·스와이프로 눌러보며 앱처럼 테스트할 수 있어요. AI 탭은 실제 `/api/notices`와 연동됩니다.

### 파일 구조 (뭘 고치면 되나?)
| 파일 | 내용 | 이런 걸 고치고 싶을 때 |
|---|---|---|
| `index.html` | **페이지 전부** (디자인 CSS + 내용 + 기능 JS가 한 파일에 있음) | 문구, 색상, 공지 목록, 메뉴, 버튼 등 거의 모든 수정 |
| `api/notices.js` | AI 맞춤 공지 (Gemini 연동) | AI가 고르는 공지 데이터·프롬프트 수정 |
| `manifest.json` / `sw.js` / `icon-*.png` | 앱 설치(PWA) 설정 | 웬만하면 안 건드려도 됨 |

`index.html` 안에서: `<style>…</style>` = 디자인, `<body>` 안 = 내용, `<script>…</script>` = 기능.

### ✏️ 수정 방법 (쉬운 순서대로 — 하나만 골라도 됨)

**방법 1. GitHub 웹에서 바로 수정 (설치 X, 초보 추천 ⭐)**
1. 이 저장소에서 `index.html` 클릭
2. 오른쪽 위 **연필(✏️ Edit)** 클릭
3. 수정하고 오른쪽 위 **Commit changes** → 초록 버튼 한 번 더
4. 끝! **1~2분 뒤 실제 사이트에 자동 반영**됩니다

**방법 2. 바이브 코딩 (VS Code 없어도 됨 🤖)**
코드를 몰라도 AI에게 시키면 됩니다:
1. `index.html`을 열어 내용을 **전체 복사**
2. **Claude / ChatGPT / Gemini**에 붙여넣고 원하는 걸 말로 요청
   > 예: "이 HTML에서 히어로 배경을 초록 계열로 바꾸고, 공지 하나를 추가해줘. 전체 파일로 돌려줘."
3. AI가 준 **전체 코드**를 복사 → 방법 1의 편집 화면에 **전체 붙여넣기** → Commit
4. ⚠️ 꼭 지킬 것: **부분이 아니라 전체 파일**을 주고받을 것 (부분 붙여넣기 = 깨짐의 주범)

**방법 3. github.dev (브라우저 VS Code)**
저장소 화면에서 키보드 **`.`(마침표)** 를 누르면 브라우저에서 VS Code가 열립니다. 여러 파일을 고칠 때 편함. 왼쪽 소스제어(가지 아이콘) → 메시지 입력 → **Commit & Push**.

**방법 4. VS Code 설치 버전 (메인 작업자용)**
아래 [VS Code 연동] 참고.

### 🚦 규칙 (충돌 방지)
- 수정 시작 전 **카톡방에 "index.html 수정 중~" 한 줄** 남기기
- 한 번에 **한 명이 한 파일**만
- 실수해도 괜찮음 — GitHub는 모든 버전이 저장돼서 **되돌리기 가능** (Commits 탭 → 이전 버전 → Restore)
- Commit 메시지는 짧게 뭘 했는지: `공지 문구 수정`, `히어로 색 변경`

### 🔍 내 수정이 반영됐는지 확인
Commit 후 1~2분 뒤 사이트 새로고침(Ctrl+F5). Vercel이 자동으로 재배포합니다.

---

## 🇬🇧 English

### What is this?
**CYClaude** is a web portal solving the **information gap** for CYCU international & exchange students.
Our collaboration goal: **edit and improve the design and basic features of this existing webpage, together.**

🆕 **The landing page has an interactive app prototype built in.** Click the "↓ Try the interactive app prototype" button in the hero (or **Try the App** in the top menu) to open a phone mock-up with 5 real, tappable screens — Home / Notice / AI / Community / My — navigable by tabs, arrows, or swipe. The AI tab calls the real `/api/notices` endpoint.

### File map (what should I edit?)
| File | What it is | Edit this when… |
|---|---|---|
| `index.html` | **The whole page** (CSS design + content + JS features in one file) | changing text, colors, notices, menus, buttons — almost everything |
| `api/notices.js` | AI personalized notices (Gemini) | changing notice data / AI prompt |
| `manifest.json` / `sw.js` / icons | PWA settings | usually no need to touch |

Inside `index.html`: `<style>` = design, `<body>` = content, `<script>` = features.

### ✏️ How to edit (pick ONE, easiest first)

**Option 1. Edit right on GitHub (no install ⭐)**
1. Click `index.html` in this repo → click the **✏️ Edit** pencil
2. Make your change → **Commit changes** (green button)
3. Done — the live site **updates automatically in 1–2 minutes**

**Option 2. Vibe-coding (no VS Code needed 🤖)**
1. Open `index.html`, **copy the whole file**
2. Paste into **Claude / ChatGPT / Gemini** and ask in plain language
   > e.g. "Change the hero background to green tones and add one notice. Return the FULL file."
3. Copy the AI's **full code** → paste it into the GitHub editor (Option 1) → Commit
4. ⚠️ Rule: always exchange the **FULL file**, never fragments.

**Option 3. github.dev (VS Code in your browser)**
Press **`.`** (period) on the repo page → VS Code opens in the browser. Use the Source Control icon → message → **Commit & Push**.

**Option 4. Desktop VS Code** — see team guide (main maintainer).

### 🚦 Rules
- Before editing, drop one line in the team chat: *"editing index.html"*
- One person, one file at a time
- Mistakes are fine — every version is saved; you can **restore** any previous commit
- Short commit messages: `fix notice text`, `change hero color`

---

## 🇹🇼 中文

### 這是什麼？
**CYClaude** 是為中原大學（CYCU）國際生／交換生解決**資訊分散問題**的入口網站。
協作目標：**共同修改、改進這個現有網頁的設計與基本功能。**

🆕 **首頁內建了可互動的 App 原型。** 點擊主視覺區的「↓ Try the interactive app prototype」按鈕（或上方選單的 **Try the App**）就會打開手機模擬畫面，Home／Notice／AI／Community／My 五個畫面都可以用分頁、箭頭或滑動實際操作測試。AI 分頁會實際呼叫 `/api/notices`。

### 檔案說明（要改哪裡？）
| 檔案 | 內容 | 什麼時候改 |
|---|---|---|
| `index.html` | **整個頁面**（CSS 設計＋內容＋JS 功能都在這一個檔案） | 文字、顏色、公告、選單、按鈕——幾乎所有修改 |
| `api/notices.js` | AI 個人化公告（Gemini） | 修改公告資料／AI 提示詞 |
| `manifest.json` / `sw.js` / 圖示 | PWA 設定 | 通常不需要動 |

`index.html` 內：`<style>` = 設計、`<body>` = 內容、`<script>` = 功能。

### ✏️ 修改方式（挑一種即可，由易到難）

**方式 1：直接在 GitHub 網頁上修改（免安裝 ⭐）**
1. 點開 `index.html` → 點右上 **✏️ Edit** 鉛筆
2. 修改後按 **Commit changes**（綠色按鈕）
3. 完成！**1–2 分鐘後網站自動更新**

**方式 2：Vibe Coding（不需要 VS Code 🤖）**
1. 打開 `index.html`，**複製整個檔案**
2. 貼到 **Claude / ChatGPT / Gemini**，用自然語言描述需求
   > 例：「把主視覺背景改成綠色系，並新增一則公告。請回傳完整檔案。」
3. 把 AI 給的**完整程式碼**貼回 GitHub 編輯器（方式 1）→ Commit
4. ⚠️ 規則：一律傳**完整檔案**，不要只貼片段。

**方式 3：github.dev（瀏覽器版 VS Code）**
在儲存庫頁面按 **`.`**（句點）→ 瀏覽器開啟 VS Code。左側原始檔控制 → 輸入訊息 → **Commit & Push**。

**方式 4：桌面版 VS Code** — 請參考團隊指南（主要維護者）。

### 🚦 規則
- 開始修改前，在群組說一聲：「我正在改 index.html」
- 一次一人改一個檔案
- 改壞了也沒關係——每個版本都有紀錄，可**還原**任何舊版本
- Commit 訊息簡短說明：`修改公告文字`、`更改主視覺顏色`

---

### ⚙️ For maintainers
- Deployed on **Vercel** (auto-deploy on every push to `main`)
- AI: set `GEMINI_API_KEY` in Vercel → Settings → Environment Variables (free key from [aistudio.google.com](https://aistudio.google.com)); without a key the assistant falls back to demo mode
- © 2026 Team 7 · HGU × CYCU GRP — student project (unofficial)
