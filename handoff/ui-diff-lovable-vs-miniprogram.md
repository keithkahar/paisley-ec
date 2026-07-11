# 全系统 UI 差异清单 — Lovable 设计 vs 当前小程序

基于 `handoff/lovable-vs-miniprogram-ui-gap-report.md` §1–§2、`lovable-ui-design-system.md`、`lovable-migration-plan.md` 汇总；逐页列出可见差异。业务逻辑不在此清单内。

图例：🎨 视觉/token · 🧩 布局/结构 · 🆕 Lovable 新增 · ❌ Lovable 缺失 · ⚠️ 需保留业务契约

---

## 全局层

| 项 | 小程序现状 | Lovable 设计 | 差异类型 |
|---|---|---|---|
| 设计 token | 每页 WXSS 里硬编码 hex | `:root` 4 组子品牌变量（Paisley / Shirin / Wordie / Bloxia）+ 半径/阴影/间距 4px 基准 | 🎨 |
| 字体 | 系统默认 | Fredoka（标题）+ Nunito（正文）+ PingFang SC 兜底 | 🎨 |
| 顶栏 | 原生 navBar | 全站统一自定义 `FloatingBack`：36px 圆钮 · 白底 · `border-border` · `shadow-sm` · `sticky top-0` + `env(safe-area-inset-top)` · 内容整体下移 5px | 🧩 |
| 底 tab bar | 现有 PNG | 替换为 Lovable tinted PNG（含 Bloxia 亮绿 icon） | 🎨 |
| Pill 组件 | 各页自绘 | 全站统一 pill（左端 `>` chevron 用背景色白色 or 品牌色，见各页） | 🧩 |
| 中英文混排 | 未区分 | Fredoka + PingFang SC 双栈，字距微调 | 🎨 |

---

## 页面级差异

### `/` 首页（`pages/index/index`）
- 🎨 Paisley Blue 强调色 + pill hero
- ⚠️ BP/streak 数字必须来自 `services/bp/accountService`，Lovable 里的 `bp: 1000` 是占位

### `/shirin-talk` ShirinTalk
- 🧩 Hero 重排：肖像 + week strip + Bp pill + 3 条 CTA pill
- 🎨 每条 CTA pill 左端 `>` chevron 使用白色
- 🧩 hero 顶部 padding `pt-[55px]`

### `/topics` 话题网格
- 🎨 两套并存美术：MP 用 `assets/topics/*-line.png` 线稿；Lovable 用彩绘 tile（含新版 `minecraft_adventure.png`）
- 🧩 需确认走 Lovable 彩绘方案

### `/chat` 聊天
- 🎨 气泡样式微调；顶栏统一 `FloatingBack`
- ⚠️ 消息流/工具调用/AI 后端保留 MP 实现
- 🐛 已修：头像高于返回按钮的问题

### `/mywordie` 中心
- 🧩 卡片网格 → pill CTA（Wordie Bank / Wordie-X / Wordie Test / Word Card / Topic Talk），左端 `>` chevron

### `/word-card`
- 🎨 进度点/进度条统一 `--wordie` `#5064f5`
- 🧩 移除顶部 `×` 关闭按钮（仅保留 `FloatingBack`）

### `/wordie-bank` `/wordie-test` `/wordie-x`
- 🎨 仅重皮；⚠️ SRS/题库/训练服务保留

### `/bloxia` （独立视觉系统）
- 🧩 自定义 TopBar：左返回 / 中 milestone 文本（单行）/ 右头像 48px + 金边 + Bp pill
- 🎨 顶部渐变遮罩隐藏滚动内容
- 🆕 Logo 覆盖在地图上：白色 filter + 蓝青色光晕，`left:29px`，尺寸 `~90px`
- 🧩 底部 sheet 统一：`minHeight 440px`、半透明深色底 + blur、pill 按钮；sheet 内按钮到底 tab 的间距 = 按钮自身高度
- 🧩 Badges / Collection：3 列网格，`h-28 w-28`，图标缩小 15%；tab 使用深绿实心 + ivory 文本 + sage 计数
- 🆕 Welcome sheet：胸像可滑动 + 默认名 "Bloxian" + 光标闪烁（仅首次进入）
- 🆕 Profile 视图：头像 134px 居中 + pencil 编辑 + 三段 stat pill（Badges 4/24、1,000 Bp）+ 四板块（Latest Earned / Favorite Badges / Favorite Items / Recent Activity 1→10→20→30 展开）
- ⚠️ 所有进度/收藏/头像持久化必须走 `services/bloxia/progressService` + `utils/bloxiaAvatarConfig`，Lovable 的 `useBloxia` 是 mock

### `/smart-reading`
- 🎨 单元卡片重设计（编号圆 + 内容/标题字重区分）
- ⚠️ 内容数据 `data/smart_reading_*` + `smartReadingContentService` 不可动

### `/cefr-test`
- 🧩 Lovable 简化了 UI
- ❌ **Lovable 缺失音频播放按钮** —— 必须在移植前补回，`assets/cefr_audio/*.wav` 播放不可去掉

### `/profile` 个人中心
- 🧩 结构不同：MP 是 `profile-*` 多页；Lovable 是单页 hub + chevron pill 跳转
- 🎨 顶部 profile 文本已删除，`FloatingBack` 之后内容下移 5px
- 🎨 "Topic talk" 类按钮左端 `>` chevron（白色）
- ⚠️ Bp/Badges 数字必须真数据

### `/edit-profile`
- 🎨 Paisley Blue 边框 + Save 按钮
- 🧩 顶部 "Edit Profile" 文本已删除

### `/progress` `/calendar`
- 🎨 仅重皮

### `/my-tests`
- ⚠️ Lovable-only 聚合页，MP 需映射到 `profile-cefr` + `utils/testEligibility`

### `/parent`
- 🎨 视觉更新
- ⚠️ **必须保留 `utils/parentAuth` PIN 门禁** —— Lovable 当前无 PIN，移植时禁止跳过

### `/about` About PEC
- 🎨 PEC 三字母图标拆分展示；基线已对齐

### `/admin` 管理后台
- 🧩 整体重构：单条可滚动 pill 导航 + 编号圆卡 + Authorization 选择器
- 🧩 Book Editor：Lexile 范围格式化 + 手动词数 + 原生 date picker
- 🧩 Smart Reading 导入：4 按钮一行 — Cancel / Validate / Replace / Merge（默认 Merge）
- 🎨 参数管理页 Paisley Blue；Smart Reading 页 Brand Yellow；内容/标题字重明确区分
- ⚠️ `utils/adminConfig` + `smartReadingContentValidator` 字段一个不能少

### 仅小程序有 / Lovable 未设计
- ❌ `pages/practice-summary`
- ❌ `pages/mywordie/reward-summary`
- ❌ `pages/share-preview`

---

## 组件依赖差异（Lovable → 需替换）

| Lovable 依赖 | 用途 | 小程序替换方案 |
|---|---|---|
| `framer-motion` | Bloxia 底 sheet、Welcome 轮播 | WXSS `transition` + WXS 手势 / `swiper` |
| `lucide-react` | 全站图标 | iconfont / PNG |
| shadcn/ui (`Sheet` `Dialog` `Popover` `Tabs` `DropdownMenu`) | Admin、Chat 菜单等 | 自建 `components/*` 或 WeUI |
| `@tanstack/react-router` | 全站路由 | MP 原生 `app.json` pages |
| Tailwind v4 `@theme inline` + `color-mix(in oklab)` | 每处 tint | `app.wxss` 变量 + 预先计算 hex |
| `cva` | Button 变体 | 手写 WXSS BEM |
| `localStorage`（`useBloxia`） | Bloxia mock | 换成真 service，不要保留 `wx.setStorageSync` mock |