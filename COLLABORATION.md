# CYClaude — Team Collaboration Guide (Figma team × Web team)

🌏 [한국어](#-한국어) · [English](#-english) · [中文](#-中文)

This guide explains how our two sub-teams — **Figma / App Prototype (4명)** and **Web (2명)** — work on the same `index.html` file without stepping on each other.

---

## 🇰🇷 한국어

### 역할 분담
| 팀 | 인원 | 담당 |
|---|---|---|
| 🎨 **피그마 / 앱 프로토타입팀** | 4명 | 피그마에서 앱 화면(Home/Notice/AI/Community/My) 디자인 다듬기 + `index.html` 안의 **"Try the App" 폰 목업 섹션** 반영 |
| 🌐 **웹팀** | 2명 | 랜딩페이지 전체(헤더·히어로·공지판·뉴스·FAQ·AI 어시스턴트 폼·푸터) 디자인·문구·기능 관리 |

### 파일 안의 경계선
`index.html` 하나를 같이 쓰지만, 안에 이미 두 구역이 나뉘어 있어요.

- **피그마팀 구역**: `<!-- app demo (interactive prototype) -->` 주석부터 바로 다음 `<!-- notice board + news -->` 주석 전까지. (CSS는 `.appdemo`, `.pd-`로 시작하는 클래스 전부 / JS는 `App prototype demo (phone mockup)` 블록)
- **웹팀 구역**: 그 나머지 전부 — 유틸바, 헤더, 히어로, 퀵메뉴, 알림바, 공지판, 뉴스, FAQ, AI 어시스턴트 폼, 푸터
- **공용**: `:root` 안의 색상 변수(`--navy`, `--red` 등)는 사이트 전체가 같이 쓰는 값이라 **웹팀이 관리**하고, 피그마팀은 새 색이 필요하면 `pd-` 전용 값을 따로 추가하는 식으로 (공용 변수는 되도록 안 건드리기)

### 작업 방식
1. **여전히 브랜치 없이 `main` 하나만 씁니다** — 팀 규모엔 브랜치/PR이 오히려 번거로움
2. **커밋 메시지 앞에 팀 태그**: `[앱팀] 폰 데모 색상 수정`, `[웹팀] FAQ 문구 수정`
3. **바이브 코딩할 때 "구역 지정" 한 줄 추가** (전체 파일을 주고받는 원칙은 그대로 유지):
   > 피그마팀 예시: "index.html 전체를 줄게. `<!-- app demo (interactive prototype) -->` 부터 다음 `<!-- notice board + news -->` 전까지 폰 목업 부분만 고쳐줘. [피그마에서 바뀐 점 설명/스크린샷]. 나머지는 절대 건드리지 말고 그대로 둬. 전체 파일로 돌려줘."
   >
   > 웹팀 예시: "pd- 로 시작하는 앱 데모 부분은 그대로 두고, 나머지 랜딩페이지만 고쳐줘. [바꾸고 싶은 내용]. 전체 파일로 돌려줘."
4. **피그마팀(4명)은 커밋 담당 1명을 정해주세요.** 나머지 3명은 피그마 디자인·의견만 모아주고, 실제 GitHub 커밋은 그 1명이 순서대로. 웹팀(2명)은 기존 규칙(수정 전 카톡 한 줄)만으로 충분합니다
5. 수정 방법 자체(GitHub 웹 편집 / 바이브코딩 / github.dev / VS Code)는 `README.md`에 있는 걸 그대로 쓰면 됩니다

### 피그마 반영은 이렇게
피그마 파일을 직접 못 고쳐도 괜찮아요. 피그마팀이 디자인을 바꾸면:
1. 스크린샷 찍거나 바뀐 점을 말로 정리
2. 위 "바이브 코딩" 3번 방식대로 AI에게 index.html + 스크린샷/설명 주고 앱 데모 구역만 수정 요청
3. 받은 전체 파일을 GitHub에 붙여넣고 `[앱팀]` 태그로 커밋

---

## 🇬🇧 English

### Role split
| Team | People | Owns |
|---|---|---|
| 🎨 **Figma / App Prototype** | 4 | Refining the app screens (Home/Notice/AI/Community/My) in Figma, and bringing those changes into the **"Try the App" phone mock-up section** of `index.html` |
| 🌐 **Web** | 2 | The rest of the landing page — header, hero, notice board, news, FAQ, AI assistant form, footer |

### Boundaries inside the file
We share one `index.html`, but it's already split into two zones.

- **Figma team's zone**: from the `<!-- app demo (interactive prototype) -->` comment to right before the next `<!-- notice board + news -->` comment. (CSS: `.appdemo` and everything starting with `.pd-` / JS: the `App prototype demo (phone mockup)` block)
- **Web team's zone**: everything else — utility bar, header, hero, quick menu, alert strip, notice board, news, FAQ, AI assistant form, footer
- **Shared**: the color variables in `:root` (`--navy`, `--red`, etc.) are used site-wide, so the **Web team owns them** — if the Figma team needs a new color, add a `pd-`-specific value instead of changing the shared ones

### How we work
1. **Still one `main` branch, no branches/PRs** — overkill for our team size
2. **Prefix commit messages with your team**: `[App team] phone demo color`, `[Web team] FAQ wording`
3. **When vibe-coding, add one line scoping the edit** (still paste/return the *full* file — that rule stays):
   > Figma team example: "Here's the full index.html. Only change the phone mock-up part, from the `<!-- app demo (interactive prototype) -->` comment to right before `<!-- notice board + news -->`. [describe or screenshot what changed in Figma]. Leave everything else exactly as is. Return the full file."
   >
   > Web team example: "Leave the app demo part (everything starting with `pd-`) untouched, only change the rest of the landing page. [what to change]. Return the full file."
4. **The Figma team (4 people) should pick one committer.** The other three just share designs/feedback; that one person commits to GitHub in order. The Web team (2 people) can keep using the simple "post one line before editing" rule
5. For the actual editing methods (GitHub web edit / vibe-coding / github.dev / VS Code), just follow what's already in `README.md`

### Bringing Figma changes in
You don't need to edit the Figma file yourself to help with this. When the Figma team changes the design:
1. Take a screenshot or write down what changed
2. Use the "vibe-coding" step above — give the AI index.html + the screenshot/description, and ask it to update only the app-demo zone
3. Paste the full file it returns into GitHub and commit with the `[App team]` tag

---

## 🇹🇼 中文

### 分工
| 團隊 | 人數 | 負責 |
|---|---|---|
| 🎨 **Figma／App 原型組** | 4 人 | 在 Figma 上調整 App 畫面（Home／Notice／AI／Community／My），並把改動反映到 `index.html` 裡的 **「Try the App」手機模擬區塊** |
| 🌐 **網頁組** | 2 人 | 主頁其餘部分——header、主視覺、公告板、新聞、FAQ、AI 助理表單、footer |

### 檔案內的分界線
大家共用同一個 `index.html`，但裡面已經分成兩個區域。

- **Figma 組的區域**：從 `<!-- app demo (interactive prototype) -->` 註解開始，到下一個 `<!-- notice board + news -->` 註解之前。（CSS 是 `.appdemo` 以及所有 `.pd-` 開頭的 class／JS 是 `App prototype demo (phone mockup)` 那段）
- **網頁組的區域**：其餘全部——工具列、header、主視覺、快捷選單、提醒列、公告板、新聞、FAQ、AI 助理表單、footer
- **共用部分**：`:root` 裡的顏色變數（`--navy`、`--red` 等）是全站共用，**由網頁組管理**；Figma 組如果需要新顏色，另外加 `pd-` 專用的值就好，盡量不要改共用變數

### 工作方式
1. **仍然只用一個 `main` 分支，不開分支／PR** —— 對我們團隊規模來說太麻煩
2. **Commit 訊息前面加上團隊標籤**：`[App組] 手機模擬顏色調整`、`[網頁組] FAQ 文字修改`
3. **用 AI 改代碼時，多加一句「範圍限定」**（仍然要整份檔案給、整份檔案收回這個原則不變）：
   > Figma 組範例：「這是完整的 index.html。只改手機模擬的部分，從 `<!-- app demo (interactive prototype) -->` 註解到下一個 `<!-- notice board + news -->` 註解之前。[說明或截圖 Figma 改了什麼]。其他地方完全不要動。回傳完整檔案。」
   >
   > 網頁組範例：「`pd-` 開頭的 App 模擬部分不要動，只改其他主頁內容。[想改的內容]。回傳完整檔案。」
4. **Figma 組（4 人）建議指定 1 位負責 commit 的人。** 其他 3 人只提供設計、意見，實際上傳 GitHub 由那 1 人依序處理。網頁組（2 人）維持原本規則（動手前在群組說一聲）就夠了
5. 實際修改方式（GitHub 網頁編輯／Vibe coding／github.dev／VS Code）照 `README.md` 裡寫的做就好

### 如何把 Figma 的改動帶進來
不用自己動手改 Figma 檔案也沒關係。當 Figma 組改了設計之後：
1. 截圖或用文字說明改了什麼
2. 照上面「Vibe coding」第 3 點的方式，把 index.html 和截圖／說明一起給 AI，請它只修改 App 模擬區塊
3. 把 AI 回傳的完整檔案貼回 GitHub，用 `[App組]` 標籤 commit

---

© 2026 CYClaude · Team 7 · HGU × CYCU GRP
