# Lovable UI Design System — Paisley EC

Generated for Codex handoff. Single source of truth for the visual language currently shipping in the Lovable React app. Codex should treat these tokens as **intent**, then re-express them in WXSS variables (`page { --paisley: #0146b9; }`) or `wx.getSystemInfo`-driven runtime values where relevant.

> Stack: TanStack Start v1 + React 19 + Tailwind v4 (native `@theme inline`) + shadcn/ui. All tokens live in `src/styles.css`.

---

## 1. Color Tokens

All colors resolve through CSS custom properties on `:root` (see `src/styles.css`). Use semantic tokens only — never hardcode hex in components.

### 1.1 Brand palette

| Token | oklch → hex (approx) | Sub-brand | Usage |
|---|---|---|---|
| `--paisley` | `oklch(0.46 0.21 261)` ≈ `#0146b9` | Paisley EC shell | Home, Profile, Admin, primary CTAs |
| `--paisley-soft` | `oklch(0.93 0.05 250)` | Paisley EC | Chip / pill backgrounds |
| `--paisley-yellow` | `#cdae8d` | Paisley EC accent | Yellow accents, sand tone |
| `--paisley-yellow-soft` | `#ebd9c2` | Paisley EC accent | Soft backgrounds |
| `--sand` / `--sand-soft` | `oklch(0.78 0.06 75)` / `oklch(0.95 0.03 80)` | Paisley EC | Warm neutral surfaces |
| `--shirin` | `oklch(0.66 0.24 9)` ≈ `#f93e6b` | ShirinTalk | Pink primary, ShirinTalk CTAs |
| `--shirin-soft` | `oklch(0.95 0.05 10)` | ShirinTalk | Pill fills |
| `--wordie` | `oklch(0.58 0.22 273)` ≈ `#5064f5` | myWordie | Blue primary — Word Card / progress dots |
| `--wordie-soft` | `oklch(0.95 0.04 270)` | myWordie | Pill fills |
| `--wordie-accent` | `oklch(0.78 0.17 65)` ≈ `#fda220` | myWordie | Streak / BP highlight |
| `--bloxia` | `oklch(0.68 0.21 138)` ≈ `#52b22c` | Bloxia | Green primary |
| `--bloxia-deep` | `oklch(0.32 0.12 152)` ≈ `#024527` | Bloxia | Dark surface, TopBar |
| `--bloxia-soft` | `oklch(0.94 0.06 140)` | Bloxia | Success fills |
| `--bloxia-sky` | `oklch(0.92 0.05 220)` | Bloxia | Map halo blue-cyan |

### 1.2 Semantic tokens (shadcn base)

| Token | Value | Meaning |
|---|---|---|
| `--background` | `oklch(0.985 0.005 95)` | Global bg (ivory) |
| `--foreground` | `oklch(0.22 0.05 260)` | Body text (slate 900) |
| `--muted-foreground` | `oklch(0.5 0.03 260)` | Secondary text |
| `--border` | `oklch(0.91 0.015 80)` | Divider / card border |
| `--input` | `oklch(0.95 0.01 240)` | Input surface, progress-track |
| `--primary` | = `--paisley` | Default CTA |
| `--ring` | = `--paisley` | Focus ring |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error red |

### 1.3 Rule for components

- ❌ `text-white / bg-black / bg-[#abc]` — forbidden in `src/routes` and `src/components`.
- ✅ `text-[var(--wordie)]`, `bg-[color-mix(in_oklab,var(--shirin)_14%,white)]`, or shadcn variants (`variant="secondary"` etc.).
- WeChat port: mirror as `page { --wordie: #5064f5; }` in `app.wxss`; use `color: var(--wordie)` in WXSS.

---

## 2. Typography

```
--font-display : "Fredoka", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", ui-rounded, system-ui, sans-serif
--font-sans    : "Nunito",  "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif
--font-pixel   : "Press Start 2P", ui-monospace, monospace   // ONLY inside Bloxia
```

Fredoka does not carry CJK glyphs — the app falls back to PingFang / Noto Sans SC so bilingual copy renders correctly.

| Role | Class / rule | Sample |
|---|---|---|
| Screen title (hero) | `text-[26px] font-medium tracking-tight leading-[1.2]` | "Hi, I'm Shirin!" |
| Section title | `text-[22px] font-semibold` | "My Collection" |
| Card title | `text-[17px] font-semibold` | Pill label |
| Body | `text-[15px] font-medium` | Paragraph copy |
| Caption / meta | `text-[13px] text-muted-foreground` | Dates, subtitles |
| Pill | `text-[13px] leading-none font-semibold` | Stats pill |

**Chinese-aware tracking (already in `src/styles.css`):**

```css
.en, h1.en, h2.en, h3.en, h4.en { letter-spacing: -0.01em; }
h1:lang(zh), h2:lang(zh), ... , [lang="zh"] {
  letter-spacing: 0;
  line-height: 1.35;
}
```

Use `<span lang="zh">…</span>` in mixed CN/EN paragraphs so PingFang doesn't inherit English metrics.

---

## 3. Spacing

Base unit = 4px (Tailwind default). Layout grid conventions:

| Context | Value |
|---|---|
| Screen horizontal padding | `px-6` (24px) — main content; `px-5` (20px) for grid pages |
| Card padding | `p-6` (24px) |
| Section vertical rhythm | `pt-6` between hero and content, `gap-3` between pills |
| Pill horizontal padding | `px-3.5` (14px) |
| Icon-in-pill gap | `gap-1` |
| Grid gap (topics) | `gap-2.5` |

---

## 4. Radius

| Token | Value | Applied to |
|---|---|---|
| `--radius` | `1.1rem` (17.6px) | shadcn base |
| `--radius-sm` | `calc(--radius - 4px)` | Small chips |
| `--radius-lg` | `--radius` | Cards, dialogs |
| `--radius-2xl` | `calc(--radius + 8px)` | Hero cards, sheets |
| `--radius-3xl` | `calc(--radius + 12px)` | Topic tiles (`rounded-3xl`) |
| pill / avatar | `rounded-full` | Every pill, back button, avatar |

---

## 5. Shadow

- Card default: `0 14px 40px rgba(11, 37, 69, 0.055)` (used on About, Profile cards).
- Back button (`FloatingBack`): `shadow-sm` on white.
- Sheet overlay: shadcn Dialog default (`0 25px 50px -12px rgba(0,0,0,0.25)`).
- Bloxia logo glow: layered `filter: blur(...)` with `--bloxia-sky` variants (see `bloxia.tsx`).
- ❌ Do NOT stack heavy drop shadows on Mini Program; port to `box-shadow: 0 8px 24px rgba(1,70,185,0.12)` when needed.

---

## 6. Buttons

Primary variants (`src/components/ui/button.tsx` via shadcn):

| Variant | Background | Text | Height |
|---|---|---|---|
| `default` | `--primary` (Paisley Blue) | white | `h-10` |
| `secondary` | `--secondary` | `--foreground` | `h-10` |
| `outline` | transparent, `border` | `--foreground` | `h-10` |
| `ghost` | transparent → hover `--accent` | `--foreground` | `h-10` |
| `destructive` | `--destructive` | white | `h-10` |

Custom brand CTAs (used throughout home / shirin-talk / bloxia):

- Big pill CTA: `rounded-full py-4 px-4 bg-[color-mix(in_oklab,var(--shirin)_14%,white)]` with `active:scale-[0.98]` press feedback.
- Bloxia Sheet button: `rounded-full` full-width; text `text-[15px] font-semibold`.
- Never use `disabled:opacity-50` on brand buttons; use `pointer-events-none` + reduced-color state instead so it reads as informational.

---

## 7. Cards

- Standard card: `rounded-[22px] bg-white p-6 shadow-[0_14px_40px_rgba(11,37,69,0.055)]`.
- Topic grid tile: `rounded-3xl overflow-hidden bg-[color-mix(in_oklab,var(--shirin)_8%,white)] border 1px color-mix(in_oklab,var(--shirin)_18%,white)`.
- Bloxia sheet card: darker — `bg-[color-mix(in_oklab,var(--bloxia-deep)_92%,black)]` with gold text.

---

## 8. Dialogs / Sheets

All Bloxia bottom sheets share:

- `minHeight: 440px`, auto max.
- Backdrop: `backdrop-blur-md` over a translucent `--bloxia-deep` fill.
- `paddingBottom` calculated so the primary action sits one button-height above the tab bar.
- Handle bar: `h-1 w-9 rounded-full bg-white/40` at top center.
- Close ✕: top-right, `h-8 w-8 rounded-full bg-white/10`.

Non-Bloxia sheets (Month Calendar, Import) use shadcn `Dialog` — centered card, `rounded-2xl`, backdrop `bg-black/50`.

---

## 9. Tabs / Navigation

### 9.1 Bottom Tab Bar (`src/components/app/BottomTabBar.tsx`)

- 4 tabs: myWordie · ShirinTalk · Bloxia · Profile.
- Fixed bottom, `paddingBottom: env(safe-area-inset-bottom)`.
- Active state: filled colored icon (brand-tinted PNG asset), inactive uses outline PNG.
- Label typography: `text-[10px] font-semibold`.

### 9.2 Top Back Button (`src/components/app/FloatingBack.tsx`)

- `h-9 w-9 rounded-full bg-white border border-border shadow-sm`.
- Icon: `ChevronLeft` from lucide-react, `strokeWidth={2.25}`, color `#0F172A`.
- Sticky `top-0`, offset by `env(safe-area-inset-top) + 1rem`.
- 5px bottom padding pushes body content clear of the button.
- Bloxia keeps its own custom TopBar; every other page uses `FloatingBack`.

---

## 10. Forms / Inputs

- `input`: `h-11 rounded-2xl border border-[var(--input)] px-4 text-[15px] focus-visible:ring-2 focus-visible:ring-[var(--ring)]`.
- Text areas: same radius, `min-h-[100px]`.
- Edit-Profile fields (name/gender/birthday): Paisley Blue border, Save button also Paisley Blue.
- Placeholder: `text-muted-foreground/70`.

---

## 11. Badge / Reward / Progress

| Element | Style |
|---|---|
| Pill (stat/count) | `h-7 px-3.5 rounded-full text-[13px] font-semibold` + brand border/tint |
| BP pill (Bloxia) | Gold text (`#fda220`) on transparent, gold border |
| Streak pill | ShirinTalk pink or Bloxia gold depending on host |
| Badge tile (Bloxia) | `h-28 w-28 rounded-2xl` image, label below in Fredoka |
| Progress bar | `h-2 rounded-full`, track `--input`, fill brand color |
| Word Card dots | 8px circles, `--wordie` for active, `--wordie-soft` for inactive |
| Bloxia XP bar | Ivory track + gold fill on the TopBar |

---

## 12. Mobile Layout (default)

- Design target: **375 × 812** (iPhone 12/13 mini reference).
- All screens wrapped in `<PhoneFrame>` for web preview; production runs edge-to-edge.
- Safe areas honored via `env(safe-area-inset-*)` on top-fixed and bottom-fixed elements.
- Scroll container: `overflow-y-auto scroll-hide` on inner div; body itself never scrolls (locked by PhoneFrame).

---

## 13. Tablet / Desktop

- App is phone-first; on wider viewports `PhoneFrame` centers a 390px column with a dimmed backdrop.
- No true responsive grid — Codex should treat WeChat Mini Program as single mobile viewport, no desktop rules needed.

---

## 14. Animation / Transition

Framework: `framer-motion` (used sparingly).

| Motion | Where | Values |
|---|---|---|
| Press | Every pill/CTA | `active:scale-[0.98] transition-transform` (Tailwind, no JS) |
| Sheet enter | Bloxia bottom sheets | Framer `initial={{ y: '100%' }} animate={{ y: 0 }}` `spring 250ms` |
| Caret blink | WelcomeSheet name input | `bloxia-caret-blink 1s step-end infinite` (CSS keyframe in `styles.css`) |
| Logo halo pulse | Bloxia map logo | Layered `blur()` + slow opacity `2s ease-in-out infinite alternate` |
| Route transition | None (page swaps hard) | — |

Reduced-motion: honor `prefers-reduced-motion` — replace scale/spring with fade only (not yet implemented, TODO for parity).

For Mini Program: replace framer-motion with `wx.createAnimation` + WXS transitions, or WeUI-style CSS transitions. Do not attempt to load framer-motion.

