# 小程序 UI 迁移执行建议

基于 `handoff/lovable-migration-plan.md`、`lovable-ui-design-system.md`、`lovable-vs-miniprogram-ui-gap-report.md`。仅覆盖 UI；`services/*`、`utils/*`、`data/*`、`cloudfunctions/*` 全部保持不动。Lovable 侧一切 `mockActivity`、`bp: 1000`、`useBloxia`、hardcoded 徽章/收藏列表 **禁止**作为真实数据源，绑定时一律替换为原有 service。

---

## 分类总览

| 分类 | 处理方式 | 涉及项 |
|---|---|---|
| A. 只改 WXSS/WXML | 直接改样式/结构即可，不新增组件 | token、字体、pill、卡片、进度点、Word Card、Wordie 系列、Topics 网格、About PEC、Progress/Calendar、Edit Profile |
| B. 需要新增/改造组件 | 抽出可复用组件 | FloatingBack、BottomSheet、Pill、WelcomeCarousel、Admin 导航 pill、Bloxia TopBar、Chevron pill 按钮 |
| C. 绝对不能动业务逻辑 | 仅重皮，事件回调仍指向原 service | Chat、myWordie 全系、Smart Reading、CEFR Test、Parent、Admin、Bloxia 进度/收藏、首页 BP/streak |

---

## A. 只改 WXSS / WXML（无需新组件）

一次性 Phase 0 交付后，后续页面按需引用即可：

1. **全局 token** — 把 `src/styles.css` 的 `:root` 变量搬到 `app.wxss`；后续每处 `#xxxxxx` 换成 `var(--paisley|--shirin|--wordie|--bloxia*)`。
2. **字体** — `App.onLaunch` 里 `wx.loadFontFace` 加载 Fredoka + Nunito，失败静默；WXSS `font-family` 统一写 `Fredoka, "PingFang SC", ...`。
3. **Tab bar 图标** — 用 Lovable `src/assets/tabs/*` 覆盖 `assets/tabs/`；`custom-tab-bar/index.wxml` 结构不变。
4. **单页微调（纯样式）**：
   - `/` 首页：Paisley 强调色 + pill hero（结构已在 MP，改 class 即可）。
   - `/about` About PEC：PEC 三字母图标拆分。
   - `/mywordie`：卡片 → pill CTA。
   - `/word-card`：进度点/条统一 `--wordie`，删顶部 `×`。
   - `/wordie-bank` `/wordie-test` `/wordie-x`：重皮。
   - `/topics`：确认走 Lovable 彩绘 PNG 后替换 `assets/topics/*.png`。
   - `/edit-profile`：Paisley Blue 边框 + Save 按钮，删除顶部 "Edit Profile" 文本。
   - `/progress` `/calendar`：重皮。
   - `/smart-reading` 单元卡：编号圆 + 内容/标题字重区分（纯 WXSS）。
   - 各页顶部标题文本删除（`/profile` `/smart-reading` `/progress` `/my-tests` `/parent` `/admin`），内容整体下移 5px。

> **不要**：动 `data/*` 内容字段、动 SRS/BP 计算、动 topics 注册表。

---

## B. 需要新增 / 改造组件

在 `components/` 下新增，供全站复用：

1. **`components/floating-back/`**
   - 36px 圆钮，白底 + `border-border` + `shadow-sm`；`sticky` 顶部 + `env(safe-area-inset-top)`；内容整体 `padding-bottom: 5px`。
   - 全站沿用（Bloxia 外的所有页），替代此前 AppHeader/多套返回按钮。

2. **`components/pill/`**
   - 支持左端 `>` chevron 插槽 + 品牌变体（`--paisley|--shirin|--wordie|--bloxia`）。
   - chevron 颜色：myWordie/ShirinTalk/Profile 上的 "Topic talk…" 类按钮为白色；其余场景与文本同色。

3. **`components/bottom-sheet/`**
   - 两种形态：Paisley 对话式（不透明白底）和 Bloxia 沉浸式（半透明深色 + backdrop-filter blur）。
   - `min-height: 440px`；sheet 内主按钮到底 tab 的距离 = 按钮自身高度（padding 计算）。
   - 用 WXSS `transition` + WXS 手势替代 framer-motion；`prefers-reduced-motion` 走 fade。

4. **`components/bloxia-topbar/`**
   - 左返回 / 中里程碑文本（单行）/ 右头像 48px 金边 + BP pill。顶部渐变遮罩隐藏滚动内容。仅 Bloxia 使用。

5. **`components/welcome-carousel/`**（Bloxia 专用）
   - 用 `swiper` 承载胸像；默认名 `Bloxian` + 闪烁光标；仅首次显示。持久化写回 `utils/bloxiaAvatarConfig`（附加字段，不改原有）。

6. **`components/admin-nav-pill/`**
   - 单条水平可滚动 pill 导航 + Authorization 选择器。承载 Books / Units / Params / Smart Reading / Users 切换。

7. **`components/logo-halo/`**（Bloxia 地图 logo）
   - 白色 CSS filter + 蓝青色多层 `box-shadow/filter: drop-shadow` 光晕；固定 `left: 29px`、`~90px` 宽。

> 已有的 `components/bloxia/BloxiaModal` 用 3 号替换；`custom-tab-bar/` 结构复用只换图标。

---

## C. 绝对不能动业务逻辑（仅重皮）

以下 Lovable 文件在移植时**只提取布局 + token**，不搬 state/handler；事件仍指向 MP 现有 service：

| Lovable 文件 | MP 必须保留 |
|---|---|
| `src/routes/index.tsx` | `services/bp/accountService` 提供的真 BP / streak |
| `src/routes/chat.tsx` | `services/talk/talkSessionService` + `cloudfunctions/callShirinAI` |
| `src/routes/word-card.tsx` | `services/mywordie/wordCardTrainerService` |
| `src/routes/wordie-bank.tsx` | `services/mywordie/wordService` |
| `src/routes/wordie-test.tsx` | `services/mywordie/wordieTestService` |
| `src/routes/wordie-x.tsx` | `services/mywordie/wordieXService` |
| `src/routes/smart-reading.tsx` | `services/smartReadingContentService` + `utils/smartReadingContentValidator` + `data/smart_reading_*` |
| `src/routes/cefr-test.tsx` | `utils/cefrLevelTest` + `data/cefr_level_test` + `utils/wordAudio`（**音频按钮必须补回**） |
| `src/routes/parent.tsx` | `utils/parentAuth` PIN 门禁（Lovable 未做，移植时不得省略） |
| `src/routes/admin.tsx` | `utils/adminConfig` 全部字段 + `smartReadingContentValidator` |
| `src/routes/bloxia.tsx` | `services/bloxia/progressService` + `utils/bloxiaConfig` + `utils/bloxiaAvatarConfig`；**丢弃**Lovable 的 `useBloxia` mock |
| `src/routes/profile.tsx` + `edit-profile` | 现有 profile 子页/持久化路径；Lovable Bp/Badges 计数替换为真值 |

**Mock 处理规则**：
- 迁移每一页时先 grep Lovable 源中的字面量 `1000`, `mockActivity`, `useBloxia`, `favoriteItemIds`, hardcoded badge id 列表，全部替换为对应 service 的 getter。
- 若 MP 尚未暴露某字段，走 **只读附加 getter**，不改动写入路径。
- 事件（Collect / Favorite / Save Profile / Import / Validate）一律接现有 service；Lovable 的本地状态更新丢弃。

---

## 推荐 PR 顺序（一次一个品牌区）

1. **PR-0 Foundation**：`app.wxss` token + 字体加载 + A 类共享组件（FloatingBack / Pill / BottomSheet）+ tab 图标。
2. **PR-1 Paisley Shell**：`/` `/about` `/profile` `/edit-profile` `/parent`（PIN 保留）。
3. **PR-2 ShirinTalk + Chat**：`/shirin-talk` `/topics` `/chat`。
4. **PR-3 myWordie**：`/mywordie` `/word-card` `/wordie-bank` `/wordie-test` `/wordie-x`。
5. **PR-4 Smart Reading + CEFR**：`/smart-reading` `/cefr-test`（音频按钮回补）。
6. **PR-5 Bloxia**：TopBar / Map+Logo / Sheets / Badges / Collection / Profile / Welcome。
7. **PR-6 Admin Console**：导航 pill + Book Editor + 4 键导入。
8. **PR-7 Cleanup**：移除 Lovable mock 引用；safe-area 复检；`prefers-reduced-motion` 兜底。

---

## 合并前检查清单（每个 PR）

- [ ] 无 `mockActivity` / `useBloxia` / 字面量 `1000 Bp` / hardcoded 徽章 id 进入 MP。
- [ ] 无 `services/*` `utils/*` `data/*` `cloudfunctions/*` 修改（除必要的**新增只读 getter**）。
- [ ] `utils/adminConfig` 字段前后 diff 为 0 减少。
- [ ] Parent PIN 在渲染真内容前触发。
- [ ] CEFR 音频按钮可点、能播 `.wav`。
- [ ] iPhone 12/13/14 + SE + 主流 Android 顶部 safe-area、底 tab 不遮挡。
- [ ] Fredoka 未加载时 PingFang 兜底不撑破 hero。
- [ ] 截图 diff（before / after）附在 PR。