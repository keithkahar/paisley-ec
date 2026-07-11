# Lovable vs Mini Program — UI Gap Report

Generated for Codex handoff. Compares the current Lovable React design against the WeChat Mini Program source manifest.

**Ground rules restated for Codex:**

- Lovable is a **UI design deliverable**, not a code deliverable. Everything under `src/components/ui/*` (shadcn) and every `framer-motion` / `lucide-react` import must be re-implemented in native WeChat components (WXML + WXSS + wx-icon fonts).
- Real business logic **already lives in the Mini Program** (`services/*`, `utils/*`, `data/*`, `cloudfunctions/*`). Codex should NOT copy Lovable's mocks over that. Lovable side-effects like `useBloxia`, `mockActivity`, hardcoded Bloxia badge/collection lists are **UI-state placeholders**, not real data.

---

## 1. Page Map

| Lovable Page / Route | Target WeChat Mini Program Page | Match Status | Notes |
|---|---|---|---|
| `/` (`src/routes/index.tsx`) | `pages/index/index` | ✅ Matches | Home / tab launcher; keep real BP + streak from `services/bp/*` |
| `/shirin-talk` | `pages/shirin-talk/shirin-talk` (implied via manifest) + `pages/talk/*` | ✅ Matches | Lovable adds week strip + Bp pill hero |
| `/topics` | `pages/topics/topics` | ✅ Matches | Lovable uses pink line-art tile grid; Mini Program has `assets/topics/*-line.png` — reuse those, don't overwrite with Lovable's tile art |
| `/chat` | `pages/chat/chat` | ✅ Matches | Lovable pattern: Shirin avatar + bubble stream; **preserve** `services/talk/talkSessionService` + `cloudfunctions/callShirinAI` |
| `/mywordie` | `pages/mywordie/index/index` | ✅ Matches | Lovable adds pill CTAs; keep real `todayQueueService` counts |
| `/word-card` | `pages/mywordie/word-card/index` | ✅ Matches | Progress dots unified to `--wordie` blue |
| `/wordie-bank` | `pages/mywordie/wordie-bank/index` | ✅ Matches | Data: `data/wordie_bank.js` + `services/mywordie/wordService.js` |
| `/wordie-test` | `pages/mywordie/wordie-test/index` | ✅ Matches | Preserve `wordieTestService` |
| `/wordie-x` | `pages/mywordie/wordie-x/index` | ✅ Matches | Preserve `wordieXService` |
| `/bloxia` | `pages/bloxia/index` | ✅ Matches | Lovable owns visual system (dark green + gold + pixel font). Real progress from `services/bloxia/progressService` + `utils/bloxiaConfig` |
| `/smart-reading` | `pages/smart-reading/smart-reading` | ✅ Matches | Data: `data/smart_reading_2_1_units_1_16.js`, `data/smart_reading_2_2_units_1_16.js`, `data/smart_reading_packs.js`, `services/smartReadingContentService` |
| `/cefr-test` | `pages/cefr-level-test/cefr-level-test` | ✅ Matches | Data: `data/cefr_level_test.js` + `utils/cefrLevelTest.js` |
| `/profile` | `pages/profile/profile` (implied — Lovable has profile hub, Mini Program splits into `profile-*` sub-pages) | ⚠️ Structure differs | Lovable = single profile hub w/ links; Mini Program = split (`profile-progress`, `profile-calendar`, `profile-cefr`, `profile-goals`). Codex: keep Mini Program's split navigation, use Lovable design for each sub-page. |
| `/edit-profile` | `pages/edit-profile/edit-profile` | ✅ Matches | Paisley Blue borders + Save button applied |
| `/progress` | `pages/profile-progress/profile-progress` | ✅ Matches | |
| `/calendar` | `pages/profile-calendar/profile-calendar` | ✅ Matches | Reuse `MonthCalendarDialog` layout |
| `/my-tests` | (part of `profile-cefr` or new) | ⚠️ Partial | Lovable-only aggregator page; map to `profile-cefr` + test history from `utils/testEligibility` |
| `/parent` | `pages/parent-page/parent-page` | ✅ Matches | `utils/parentAuth.js` gate — Lovable currently no PIN gate; must add |
| `/about` | `pages/about-pec/about-pec` | ✅ Matches | Lovable uses PEC 3-letter icon split; preserve MP's brand image path |
| `/admin` | `pages/admin-console/admin-console` | ✅ Matches | Heavy CMS UI — Lovable is the source of truth for the redesign |
| `/` → practice summary popup | `pages/practice-summary/practice-summary` | ❌ **Missing in Lovable** | Post-session recap page exists in MP, no Lovable equivalent yet |
| — | `pages/share-preview/share-preview` | ❌ **Missing in Lovable** | Sharing card preview — MP-only |
| — | `pages/mywordie/reward-summary/index` | ❌ **Missing in Lovable** | Post-Word-Card reward summary — no Lovable design yet |
| `/topics` mywordie tile | `pages/talk/*` | 🆕 **New in Lovable** | The `mywordie` topic tile that routes into `/chat?mode=mywordie` — MP has `services/talk/myWordieTalkService`, matches |

---

## 2. Gap Table (by area)

| Area | Current Mini Program | Lovable Design | Gap | Risk | Recommendation |
|---|---|---|---|---|---|
| **Global tokens** | Ad-hoc hex per page in WXSS | Centralized CSS variables (`src/styles.css`) with 4 sub-brand palettes | MP has no shared token layer | Medium: color drift | Port `:root` vars to `app.wxss`; use `var(--xxx)` in every WXSS |
| **Typography** | Uses system font | Fredoka + Nunito + PingFang fallback | MP unlikely to load Fredoka via wx.loadFontFace on all clients | Medium: hero titles look plain | Load Fredoka via `wx.loadFontFace` at app launch; fall back to PingFang Medium gracefully |
| **Top nav** | Native WeChat navBar | Custom `FloatingBack` + Bloxia custom TopBar | MP already has `custom-tab-bar/` + native nav; Lovable's floating back must map to MP nav's back or a custom capsule | Low | Keep native nav; only re-implement Bloxia's custom TopBar (immersive map) |
| **Bottom tab bar** | `custom-tab-bar/index.*` | `BottomTabBar.tsx` (4 tabs) | MP has icon PNGs baked in; Lovable uses tinted PNGs from `src/assets/tabs/*.asset.json` | Low | Sync icon assets: use `src/assets/tabs/*-filled.png` in MP `assets/tabs/` |
| **ShirinTalk hero** | Static banner | Portrait + week strip + Bp pill + 3 CTA pills | MP not yet updated | Medium | Codex: rebuild `pages/shirin-talk/shirin-talk.wxml` with 3-pill layout, drive real BP via `services/bp/accountService` |
| **Topics grid** | Line-art PNGs on cards (`assets/topics/*-line.png`) | Painted tiles in `src/assets/topics/*.png` — different art | Two competing art directions | Medium: brand inconsistency | Pick one — Codex should confirm with owner. Recommend keeping Lovable art; migrate PNGs to MP `assets/topics/` |
| **Chat surface** | Custom message list + input toolbar | Lovable also custom | Message parts + tools not in Lovable yet | Low | Only visual polish needed; keep MP's real chat service |
| **myWordie hub** | Card grid | Pill CTAs with `>` chevron | Small visual delta | Low | Straight port |
| **Word Card progress** | Mixed blues | Unified `--wordie` `#5064f5` | Off-brand blues in MP | Low | Update MP WXSS to single variable |
| **Bloxia map** | Uses MP `assets/bloxia/map/*.png` | Uses Lovable CDN via `src/lib/bloxia/assets.ts` (same filenames) | Only source location differs | Low | Codex: keep MP local assets; map `BLOXIA_URLS[key]` back to `/assets/bloxia/**/${key}.png` |
| **Bloxia sheets** | `components/bloxia/BloxiaModal` | Framer-motion bottom sheet, `minHeight 440px` | Framer-motion not portable | High visual, low logic | Rebuild in WXSS with transition + `bindtouchstart`; keep MP modal skeleton, restyle |
| **Bloxia badges / collections / avatars** | Real progress from `services/bloxia/progressService` | Mock progress from `useBloxia` in `src/lib/bloxia/progress.ts` (uses `localStorage`) | Lovable state is **mock** | HIGH — do not overwrite real service | Codex: keep MP `progressService`. Use Lovable file ONLY for visual layout of BadgeCard / CollectionCard |
| **Bloxia Welcome sheet** | ? | Swipeable chest-up avatars + blinking-caret name input | MP may lack onboarding | Medium | Add matching onboarding on first launch; persist to `utils/bloxiaAvatarConfig` |
| **Smart Reading** | Unit list w/ art from `assets/smart_reading_page/unit_*.png` | Redesigned admin + reader | Content data must not be replaced | High | Preserve `data/smart_reading_*` and `services/smartReadingContentService`; only re-skin the reader UI |
| **CEFR test** | `data/cefr_level_test.js` + `assets/cefr_audio/*.wav` | Simpler UI in Lovable | MP already has audio prompts; Lovable does not surface them | High | Codex must keep audio playback path — Lovable UI is missing audio button; add before port |
| **Profile hub** | Split pages | Single hub w/ chevron pills | Structure difference | Low | Use Lovable hub as top level; each pill jumps to matching MP sub-page |
| **Parent page** | `utils/parentAuth.js` PIN gate | No PIN gate in Lovable | Missing gate | HIGH — security | Codex: MUST keep PIN gate; wrap Lovable UI behind real auth |
| **Practice Summary** | `pages/practice-summary` | ❌ Not designed in Lovable | Missing | Medium | Ask design owner for Lovable design; do not remove the MP page |
| **Reward Summary (Word Card)** | `pages/mywordie/reward-summary` | ❌ Not designed | Missing | Medium | Same |
| **Share Preview** | `pages/share-preview` | ❌ Not designed | Missing | Low | Keep MP page unchanged for now |
| **Admin console** | `pages/admin-console` | Fully redesigned in Lovable (`src/routes/admin.tsx`) | Big visual change | HIGH — do not lose CMS fields | Preserve every field in `utils/adminConfig` + `smartReadingContentValidator`; only re-skin the shell |
| **Mock data in Lovable** | Real data services in MP | `mockActivity`, `bp: 1000` seed, hardcoded lists | Lovable mocks would destroy live user state | CRITICAL | Codex MUST NOT copy these into MP. Bind every visual to real service data |

---

## 3. Business Logic — Do-Not-Break Contract

Codex must preserve every one of these Mini Program modules unchanged unless the redesign explicitly requires a new field:

| Module | Reason |
|---|---|
| `services/talk/talkSessionService.js` + `cloudfunctions/callShirinAI` | Real conversation state + AI backend — Lovable UI is a shell only |
| `services/mywordie/*` (11 files) | Word learning SRS, daily plan, review queue, mastery calc — all business logic |
| `services/bp/*` (accountService, rewardService, snapshotService) | Real Bp economy — Lovable's `bp: 1000` is a placeholder |
| `services/bloxia/progressService.js` + `utils/bloxiaConfig.js` + `utils/bloxiaAvatarConfig.js` | Real Bloxia unlock/badge/collection state |
| `services/smartReadingContentService.js` + `utils/smartReadingContentValidator.js` | Content pipeline |
| `utils/bpRules.js` | Award rules |
| `utils/parentAuth.js` | Parent PIN gate — SECURITY |
| `utils/cefrLevelTest.js` + `data/cefr_level_test.js` | Test scoring rubric |
| `utils/testEligibility.js` | Test cooldowns |
| `utils/wordAudio.js` + `utils/phonics.js` | Audio pipeline |
| `data/shirin_global_prompt.js` | System prompt for Shirin — do not edit visually |
| `data/topics.js` | Topic registry |

Lovable holds **UI structure + visual tokens only** for these. Any handler wired to a Lovable button (e.g. "Collect", "Favorite", "Save Profile") is a placeholder — Codex must re-wire to the real service call.

---

## 4. Web-only Components in Lovable that Cannot Be Directly Ported

| Lovable dep | Where used | WeChat replacement |
|---|---|---|
| `framer-motion` | Bloxia sheets, avatar carousel | WXS transitions + CSS `transition` |
| `lucide-react` | All icons | `wx-open-data` / PNG icon set / iconfont.cn |
| `@tanstack/react-router` | Every route | MP native page routing (`app.json` `pages`) |
| shadcn/ui (`Dialog`, `Sheet`, `Popover`, `DropdownMenu`, `Tabs`, `Command`) | Admin console, chat menus | WeUI or custom components under `components/` |
| Tailwind v4 `@theme inline` | Whole app | `app.wxss` custom properties + BEM class names |
| `color-mix(in oklab, ...)` | Every tinted background | Precompute hex values (Codex can inline OKLCH→sRGB conversions from tokens) |
| `class-variance-authority` (cva) | Button variants | Manual WXSS variants |
| `useState` / `useEffect` hooks | Every page | `Page({ data, onLoad, methods })` |
| `localStorage` | `useBloxia` mock state | Replace with MP `wx.setStorageSync` — but PREFER: bind to real service instead of local cache |

---

## 5. UI That Can Migrate Almost 1:1

- Color palette (port CSS variables → `app.wxss`).
- Typography scale (font-size + weight).
- Radius + shadow tokens.
- Pill / badge / progress bar visuals.
- Topic tile art (PNGs are static).
- Bloxia badge/collection tile grid layout (3-col, `h-28 w-28` art).
- Word Card layout.
- Bottom tab bar visual (icons already PNG).

---

## 6. UI That Requires WXML / WXSS Rewrite

- Every route file in `src/routes/*.tsx` — is React JSX, not WXML.
- Bloxia bottom sheets (framer-motion → WXS).
- Chat message list (React state → `Page` data).
- Admin console (heavy shadcn — rewrite as `weui-*` or custom `components/admin/*`).
- Welcome sheet carousel (framer-motion swipe → `swiper` component).
- MonthCalendarDialog (React portal → `wx.showModal` or custom overlay).

---

## 7. Places Where Codex Must Preserve Business Logic and Only Migrate Visuals

Whenever Codex touches these Lovable files, only lift the **layout + tokens**, not the state/handlers:

- `src/routes/chat.tsx` — keep MP chat service.
- `src/routes/word-card.tsx` — keep `services/mywordie/wordCardTrainerService`.
- `src/routes/wordie-bank.tsx` — keep `services/mywordie/wordService`.
- `src/routes/wordie-test.tsx` — keep `services/mywordie/wordieTestService`.
- `src/routes/wordie-x.tsx` — keep `services/mywordie/wordieXService`.
- `src/routes/bloxia.tsx` — keep `services/bloxia/progressService`, ignore Lovable's `useBloxia` mock entirely.
- `src/routes/smart-reading.tsx` — keep `services/smartReadingContentService`.
- `src/routes/cefr-test.tsx` — keep audio playback via `utils/wordAudio`.
- `src/routes/parent.tsx` — keep `utils/parentAuth` PIN gate.
- `src/routes/admin.tsx` — keep all `utils/adminConfig` fields.
- `src/routes/index.tsx` — keep real BP + streak.

