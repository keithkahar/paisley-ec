# Paisley EC — 前端 UI 风格指南 v1

> 面向 Paisley EC 小程序 (TanStack Start + Tailwind v4)。
> 目标：跨页面视觉一致，允许每个学习子品牌保留主色。

---

## 1. 品牌与主色

每个板块保留自己的主色，通过 CSS 变量集中管理（`src/styles.css`）：

| 板块 | 变量 | 用途 |
| --- | --- | --- |
| Paisley EC (壳) | `--paisley` / `--paisley-soft` / `--paisley-yellow` | 首页、Profile、Admin、通用导航 |
| ShirinTalk | `--shirin` / `--shirin-soft` | 口语板块 |
| myWordie | `--wordie` / `--wordie-soft` / `--wordie-accent` | 单词板块 |
| Bloxia | `--bloxia-*`（暗绿+金） | 游戏化壳，允许自定义 TopBar |

**规则**

- 组件里禁止 `text-white / bg-black / bg-[#xxx]`；一律用语义 token 或 `color-mix(in oklab, var(--xxx) N%, white)`。
- 中性灰用 `var(--foreground)` / `var(--muted-foreground)` / `var(--border)`。

---

## 2. 字体（含中文回退）

```
display: "Fredoka", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", sans-serif;
body:    "Nunito", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", sans-serif;
mono:    "JetBrains Mono", "SF Mono", monospace;
pixel:   "Press Start 2P", monospace;   // 仅限 Bloxia
```

**中文标题（#20 建议）**

- 不要让中文命中 Fredoka——它没有汉字字形，浏览器会回退到系统默认（Times/宋体系），显得笨重。
- 在 `src/styles.css` 里给 `.font-display` / `h1..h3` 加上 PingFang SC → 苹方系家族回退。
- 中文标题字重推荐 `500`（medium），不用 `700`；行高 `1.35`；字距 `letter-spacing: 0`（去掉英文的 -0.01em）。
- 长段中文正文用 `font-normal`（400）+ `leading-[1.6]`，颜色 `#0F172A` 或 `var(--foreground)`。
- 中英混排段落用 `<span lang="zh">` 与 `<span lang="en">` 分开，浏览器可分别用中英文字体。

---

## 3. 顶部导航（Header）

### 3.1 唯一入口：`AppHeader`

除 Bloxia（自定义 TopBar）外，所有页面统一用 `src/components/app/AppHeader.tsx`。

```tsx
<AppHeader
  title="My Progress"
  back="/profile"           // false 表示不显示返回
  right={<StreakPill days={7} />}
  bg="transparent"          // 或 "var(--paisley-soft)"
  tone="var(--foreground)"
/>
```

- 高度 `56px`；`sticky top-0 z-30`；已处理 `env(safe-area-inset-top)`。
- 三列网格 `[2.75rem 1fr 2.75rem]`，标题永远居中。
- 返回按钮：`h-10 w-10` 圆形、`bg-white/85 backdrop-blur border`。

### 3.2 页内 Hero

之前 `FloatingBack` 页面上的“大标题 + 副标题”作为 hero 区块放在 `AppHeader` 下方，例如：

```tsx
<AppHeader title="Profile" back="/" />
<section className="px-6 pt-2 pb-4 text-center">
  <Avatar />
  <h2 className="text-[26px] font-medium">{name}</h2>
  <p className="text-[13px]">Reg. Mar 14 2025</p>
</section>
```

### 3.3 `FloatingBack` 的去留

`FloatingBack` 只保留给“沉浸式全屏 hero”页（例如 Bloxia 地图、后续可能的全屏视频页）。普通内容页一律迁到 `AppHeader`。

### 3.4 迁移清单（#2 落地清单）

需要把 `FloatingBack` 换成 `AppHeader` 的页面：

- [ ] `src/routes/profile.tsx`
- [ ] `src/routes/about.tsx`
- [ ] `src/routes/edit-profile.tsx`
- [ ] `src/routes/progress.tsx`
- [ ] `src/routes/my-tests.tsx`
- [ ] `src/routes/parent.tsx`
- [ ] `src/routes/calendar.tsx`
- [ ] `src/routes/topics.tsx`
- [ ] `src/routes/wordie-bank.tsx`
- [ ] `src/routes/wordie-test.tsx`
- [ ] `src/routes/wordie-x.tsx`
- [ ] `src/routes/word-card.tsx`（把自制顶栏换成 AppHeader）
- [ ] `src/routes/shirin-talk.tsx`
- [ ] `src/routes/smart-reading.tsx`
- [ ] `src/routes/chat.tsx`
- [ ] `src/routes/cefr-test.tsx`
- [ ] `src/routes/admin.tsx`

**保留自定义 header：** `src/routes/bloxia.tsx`（游戏化壳）。

---

## 4. Pill / 徽章

> ⚠️ **本次不改动已经在用的任何 pill 的配色与文本**（见用户要求 #21）。
> 规范只用于**新建**或**替换 CSS 类名混乱的 pill**。

统一三种变体，全部走 `src/components/app/Pills.tsx`：

| 变体 | 用途 | 视觉 |
| --- | --- | --- |
| `Pill` (base) | 计数、状态标签 | `color-mix(color 14%, white)` 底，同色字 |
| `BpPill` | Bloxia BP 计数 | 金色变体 |
| `StreakPill` | 连打卡天数 | 强调色 |

尺寸：默认 `h-7 px-3 text-xs font-semibold rounded-full`。

---

## 5. 卡片与上拉菜单

- **卡片**：`rounded-[22px] bg-white p-6`，阴影 `0 14px 40px rgba(11,37,69,0.055)`（About、Profile 已在用）。
- **上拉菜单（Sheet）**：所有 Bloxia sheet 采用 `minHeight: 440px`；按钮到底部导航栏的距离 = 按钮自身高度（约 56px）。已在 Bloxia 落地，其他板块沿用。

---

## 6. Icon

- 系统 UI：`lucide-react`，粗细 `strokeWidth={2.25}`。
- Bloxia 导航：Compass / Award / Gem。
- 品牌图标（PEC / ShirinTalk / myWordie / Bloxia logo）：使用 CDN 资产 JSON。
- 混排在文本里的品牌 icon：`inline-block h-[1em] verticalAlign: -0.12em`，与文字基线对齐。

---

## 7. 安全区 (safe-area)

- Header：`paddingTop: env(safe-area-inset-top)`。
- `FloatingBack`（仅 Bloxia 使用）：`top: calc(0.75rem + env(safe-area-inset-top))`。
- 底部内容：`paddingBottom: max(1rem, env(safe-area-inset-bottom)) + BottomTabBar 高度`。

---

## 8. 待办 (供 #23 / #24 后续 PR)

1. 修 `useBloxia` hydration 警告：所有 localStorage 读只在 `useEffect` 内做（已部分修复 avatarSelectionCompleted 回归）。
2. 按第 3.4 节清单，把 `FloatingBack` 一次替换成 `AppHeader`。
3. 在 `src/styles.css` 落地第 2 节字体回退栈。
4. Chat / Edit Profile 的返回按钮增加 safe-area 处理。
5. Word Card 顶栏迁到 `AppHeader`（当前已按 #18 去掉右侧 ×）。

---

_最后更新：本文档由 Lovable Agent 生成，作为多次 UI 规范化对话的合并输出。_