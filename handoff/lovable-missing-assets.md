# Missing / Ambiguous Assets — Codex Handoff Checklist

Assets Codex should confirm or request before starting the Mini Program migration.

## 1. Fonts

| Font | Purpose | Status | Action |
|---|---|---|---|
| Fredoka (Regular / Medium / Semibold) | Display headings across Paisley + ShirinTalk + myWordie | ⚠️ Not in MP | Codex: source `.ttf` or `.woff2`, load via `wx.loadFontFace` |
| Nunito (Regular / Medium / Semibold / Bold) | Body copy | ⚠️ Not in MP | Same |
| Press Start 2P | Bloxia pixel accents | ⚠️ Not in MP | Load only on Bloxia pages |
| PingFang SC / Noto Sans SC | CJK fallback | ✅ System default | No action |

## 2. Images

| Asset | Where used in Lovable | MP has it? | Action |
|---|---|---|---|
| `src/assets/topics/*.png` (painted tile art incl. `minecraft_adventure.png`, `disney_princess.png`, etc.) | Topics grid | Different art (line-art) in `assets/topics/*-line.png` | Confirm final art direction with product owner. Recommend porting Lovable painted PNGs |
| `src/assets/brand/bloxia-logo-text.png` | Bloxia map logo overlay | ❌ Missing | Copy to `assets/bloxia/logo-text.png` |
| `src/assets/brand/pec-*.png` (three-letter split PEC icon) | About PEC | ⚠️ Confirm | Verify each of P / E / C icons exists |
| `src/assets/tabs/*.png` (filled + outline for 4 tabs) | Bottom tab bar | Uses older icons | Replace `assets/tabs/*` with Lovable set |
| `src/assets/avatars/welcome/*.png` (chest-up avatar set for Welcome sheet) | Bloxia onboarding | ❌ Likely missing | Codex to request from design; Bloxia can't onboard without this |
| Bloxia badge PNGs (`src/assets/bloxia/badges/*`) | Badges grid | MP has its own `assets/bloxia/badges/` | Diff filenames; sync any missing |
| Bloxia collection items (`src/assets/bloxia/items/*`) | Collection | Same | Diff + sync |
| Map marker current (`map_marker_current.png`) | Bloxia map | ✅ Present | Confirm same file across both |
| ShirinTalk hero portrait | ShirinTalk landing | ✅ Present | Verify aspect ratio matches new layout |
| Word Card SVG progress dot icons | Word Card | ✅ CSS-only | No action |

## 3. Audio

| Asset | Purpose | Status |
|---|---|---|
| CEFR test audio (`assets/cefr_audio/*.wav`) | CEFR test playback | ✅ In MP | Lovable UI must add audio play affordance before Phase 4 ships |
| Word audio via `utils/wordAudio.js` | Word Card | ✅ In MP | Lovable page must expose play button |

## 4. Data Files (must NOT be replaced by Lovable)

- `data/cefr_level_test.js`
- `data/shirin_global_prompt.js`
- `data/smart_reading_2_1_units_1_16.js`
- `data/smart_reading_2_2_units_1_16.js`
- `data/smart_reading_packs.js`
- `data/topics.js`
- `data/wordie_bank.js`

## 5. Screens Without a Lovable Design (design owner action needed)

- `pages/practice-summary` — post-session recap.
- `pages/mywordie/reward-summary` — post Word-Card reward.
- `pages/share-preview` — outbound share card.

## 6. Unknowns to Confirm with Product Owner

1. Topics art direction (painted vs. line-art).
2. Whether the Bloxia Welcome onboarding is required on WeChat launch or opt-in.
3. Whether Admin console should stay bilingual (CN + EN labels) as it is in Lovable.
4. Whether Parent PIN gate visual should change (Lovable did not redesign it).
5. Whether Practice Summary / Reward Summary need Lovable redesigns before migration lands.

