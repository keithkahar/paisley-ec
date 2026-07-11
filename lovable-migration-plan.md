# Lovable → WeChat Mini Program Migration Plan

For Codex. Sequenced work plan to transplant the Lovable UI redesign into the existing WeChat Mini Program **without breaking any real business logic**.

## Guiding Principles

1. **UI-only migration.** Do not overwrite `services/*`, `utils/*`, `data/*`, or `cloudfunctions/*`. Lovable ships design, not logic.
2. **No mock data left behind.** Delete Lovable's placeholder counts (`bp: 1000`, `mockActivity`, hardcoded badge lists) at the moment you wire the real service call.
3. **Token-first, then component-first.** Land shared tokens before any page port. Every subsequent page pulls from `app.wxss` variables.
4. **One brand section per PR.** Ship Paisley shell → ShirinTalk → myWordie → Bloxia → Admin. Do not mix.
5. **Preserve navigation shape.** MP has native nav + custom tab bar. Do not replace with a router.

---

## Phase 0 — Foundation (blocking, must land first)

- **0.1** Create `app.wxss` `page { --paisley:#0146b9; --shirin:#f93e6b; --wordie:#5064f5; --bloxia:#52b22c; ... }` block. Mirror every token from `docs/style-guide.md` §1.1.
- **0.2** Add `wx.loadFontFace` for Fredoka + Nunito at `App.onLaunch`; wrap in `try/catch`. Fallback to PingFang Medium.
- **0.3** Publish shared WXSS utility classes: `.pill`, `.pill--shirin`, `.pill--wordie`, `.pill--paisley`, `.card`, `.card--hero`, `.btn-primary`, `.btn-outline`, `.chevron-right`. Match rules in `docs/style-guide.md`.
- **0.4** Add reusable components:
  - `components/pill/index` — text + optional icon slot.
  - `components/floating-back/index` — 36px round back button matching Bloxia (only used on immersive pages; normal pages keep native nav).
  - `components/bottom-sheet/index` — supports Bloxia-style translucent + Paisley-style dialog.
- **0.5** Copy Lovable's tinted tab-bar PNGs into `assets/tabs/` and re-point `custom-tab-bar/`.
- **Acceptance:** existing pages still render, tokens available globally, no visual regressions.

## Phase 1 — Paisley Shell (home, about, profile hub, edit-profile, parent gate)

- **1.1** Home (`pages/index/index`): use Paisley Blue accents + new pill hero. Keep real Bp/streak from `services/bp/accountService`.
- **1.2** About PEC: PEC 3-letter split icons per Lovable design.
- **1.3** Profile hub: single-page hub with chevron pills → routes to existing `profile-*` sub-pages. Stat pills (Badges / BP) driven by `services/bloxia/progressService` + `services/bp/accountService`.
- **1.4** Edit Profile: Paisley Blue borders + Save button; unchanged fields.
- **1.5** Parent Page: keep `utils/parentAuth` PIN gate. New visual chrome only after PIN passes.
- **Acceptance:** All Paisley pages consume `--paisley*` vars; no hardcoded blue.

## Phase 2 — ShirinTalk + Chat

- **2.1** ShirinTalk landing: portrait + week strip + Bp pill + 3 CTA pills with `>` chevron.
- **2.2** Topics grid: use Lovable's painted PNGs; migrate art into `assets/topics/`.
- **2.3** Chat page: keep `services/talk/talkSessionService` + `cloudfunctions/callShirinAI` untouched. Reskin bubble style, sticky top back button.
- **Acceptance:** Chat send/receive still hits cloud function; message log persists via existing service.

## Phase 3 — myWordie stack

- **3.1** myWordie hub: pill CTAs (Wordie Bank / Wordie-X / Wordie Test / Word Card / talk).
- **3.2** Unify Word Card blue to `--wordie` `#5064f5` across dots + progress + top-bar.
- **3.3** Wordie Bank, Wordie-X, Wordie Test: re-skin only; every counter / question / SRS action bound to real services (`wordService`, `wordieXService`, `wordieTestService`).
- **3.4** Reward Summary (post-Word-Card): pending Lovable design. Meanwhile keep MP's existing screen; flag in gap report.
- **Acceptance:** SRS still advances, mastery still calculated by `masteryCalculator`.

## Phase 4 — Smart Reading + CEFR

- **4.1** Smart Reading list page (top-level): reader shell restyled; content data untouched.
- **4.2** Unit reader: match Lovable numbered-circle layout; preserve pack import merge/replace modes and validator.
- **4.3** CEFR Test: Lovable simplified UI **+** existing audio button (add back play affordance before shipping).
- **Acceptance:** No content field removed from admin nor from render.

## Phase 5 — Bloxia (isolated visual system)

- **5.1** Custom TopBar: back / center map-marker / avatar + BP pill on the right. Match Bloxia dark-emerald + gold.
- **5.2** Map surface: use MP's local `assets/bloxia/map/*.png`. Overlay logo with cyan-blue halo at `top:calc(4px+safe-area-top)` — port the tuned pixel offsets from `src/routes/bloxia.tsx`.
- **5.3** Bottom sheets: `min-height: 440px`, translucent dark backdrop, blur. WXSS-only transitions.
- **5.4** Badges + Collection: 3-column grid, `h-28 w-28` art. Bind to `services/bloxia/progressService`.
- **5.5** Profile view (inside Bloxia): centered avatar 134px, stat pills, four sections (Latest Earned / Favorite Badges / Favorite Items / Recent Activity 1→10→20→30 expansion).
- **5.6** Welcome sheet: swipeable chest-up avatars + blinking-caret name input; persist via `utils/bloxiaAvatarConfig`. Show only on first launch.
- **Acceptance:** No `useBloxia` mock in MP. All state from `services/bloxia/*`.

## Phase 6 — Admin Console

- **6.1** Shell + navigation pill. Preserve every section (Books, Units, Params, Auth, Smart Reading packs, users).
- **6.2** Preserve every field in `utils/adminConfig` + `utils/smartReadingContentValidator`. Do not drop the CMS.
- **6.3** Book editor: Lexile range formatting, manual word count, native date picker.
- **6.4** Smart Reading import: 4-button row — Cancel / Validate / Replace / Merge; default Merge.
- **6.5** Auth selector for admin sections that already had a gate.
- **Acceptance:** Every previous CMS field is still present and writable; parity checked with `docs/style-guide.md` §admin annotations.

## Phase 7 — Cleanup / Parity

- **7.1** Remove Lovable mock imports from production build (nothing should reference `src/lib/bloxia/progress.ts` in MP).
- **7.2** Verify safe-area insets across all top back buttons + bottom tab bar on iPhone 12/13/14 + iPhone SE + a wide Android.
- **7.3** Reduced-motion pass: fade-only fallback for Bloxia sheets + Welcome carousel.
- **7.4** Update MP `app.json` + tabbar config to match new icon set.
- **7.5** Sanity: run `wx.getSystemInfo` on real devices; check that Fredoka fallback (PingFang) doesn't collide with hero heights.

---

## Risk Register

| # | Risk | Mitigation |
|---|---|---|
| R1 | Codex copies Lovable mock counts (Bp: 1000, hardcoded badge unlocks) into MP | Explicit "no mock data" rule in every phase; grep for `mockActivity` / literal `1000 Bp` before merge |
| R2 | Framer-motion sheet behavior differs on Android WebView | Rebuild in WXSS transition + WXS drag; test on 3 devices |
| R3 | Fredoka not loaded on cold start → hero titles jump | `wx.loadFontFace` before first paint; pre-render placeholder card |
| R4 | Native `navigationBarTitleText` conflicts with custom top back | Keep native nav on non-immersive pages; only Bloxia uses full custom TopBar |
| R5 | Admin console field lost during redesign | Diff `utils/adminConfig` field list before + after; block PR on missing key |
| R6 | Parent PIN gate lost | Manual check: PIN prompt must appear before any parent-page content is rendered |
| R7 | Audio button removed on CEFR test | Add before shipping Phase 4 |
| R8 | Practice Summary / Reward Summary / Share Preview left with old visuals | Track as follow-up design tickets; do not delete the pages |

---

## Deliverables Codex Should Produce (per phase)

1. WXML + WXSS + JS for each ported page.
2. New shared components under `components/`.
3. Updates to `app.wxss` (Phase 0 only, unless a new token is genuinely needed).
4. No changes to `services/`, `utils/`, `data/`, `cloudfunctions/` unless a UI change requires a new getter — and only additive.
5. Screenshot diff (before / after) posted per PR.

