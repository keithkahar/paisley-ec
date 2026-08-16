# Word Card — UI 参数规格（src/routes/word-card.tsx）

## 页面
- 容器: `PhoneFrame`，背景 `var(--wordie-soft)`
- 主色: `var(--wordie)`（myWordie 品牌蓝）

## 顶部栏
- padding: `px-4 pt-4`，左右两端对齐
- 返回按钮: 36x36 圆形，白底，1px `border-border`，图标 `ChevronLeft` 20x20
- 中间簇 gap 8px：
  - 计数 `1 / 3`：12px / 600 / `text-muted-foreground`
  - 状态 pill：圆角全圆，`px-10 py-4`(2.5/1)，11px / 600；底色 `color-mix(status 22%, white)`，文字 `color-mix(status 70%, black)`
  - 计时：`Clock` 14x14 + 12px / 600 / muted
- 右侧 36x36 占位保持居中平衡

## 状态色
| status | label | color |
|---|---|---|
| new | New | oklch(0.66 0.24 280) |
| learning | Learning | oklch(0.7 0.18 195) |
| review | Review | oklch(0.68 0.2 145) |
| focus | Focus | oklch(0.68 0.26 35) |
| relearning | Relearning | var(--shirin) |

## 进度条
- `px-5 mt-3`，segment gap 4px，高 6px，全圆角
- 已完成 `var(--wordie)`；未完成 `color-mask(--wordie 10%, white)`

## 卡片容器
- `px-5 mt-4`；整卡为按钮，点击翻面；`rounded-[2rem]`，`shadow-xl`，按下 `scale .99`
- 3D: `perspective 1200px`，`transform-style preserve-3d`
- 高度: `28rem` (448px)
- 翻转: `rotateY(180deg)`，`0.6s cubic-bezier(0.4,0.2,0.2,1)`
- 两面: `absolute inset-0`，`rounded-[2rem]`，`p-6`(24px)，`flex flex-col`，`backface-visibility hidden`

## 正面（白，Definition）
- 背景: `linear-gradient(160deg, white 0%, color-mix(--wordie 8%, white) 100%)`
- 边框: `1px color-mix(--wordie 20%, transparent)`
- 顶部: POS pill —`rounded-lg`, padding 7px/2px, 12px/600, 底色 `--wordie`, 文字白
- 中部头块: `flex-1` 居中；隐藏的 40px 占位单词（与反面对齐）+ IPA 13px / mono / muted，`mt-3`（实测两面 IPA 同在 top 226px）
- Definition 区: 固定高 `168px`，`pt-[15px]`
  - 小标题 "Definition" 14px / 600 / letter-spacing .08em / muted
  - 正文 18px / 600 / `leading-relaxed` / letter-spacing -0.01em，`mt-2`，与右列 gap 12px
  - 小喇叭 `Volume2` 16x16，色 `--wordie`，容器高 29px，可点击（阻止冒泡，按下 scale .9）
- 底部: 38px 间隔占位 + 居中 `RotateCw` 12x12（muted，无文字）

## 反面（蓝，Word + Example）
- 背景: `linear-gradient(160deg, var(--wordie) 0%, color-mix(--wordie 78%, black) 100%)`
- `transform: rotateY(180deg)`，文字白
- 顶行 `justify-between`：
  - 左 POS pill：`rounded-lg`, 7px/2px, 12px/600，白底 + `--wordie` 文字
  - 右 Level pill：`rounded-md`, 6px/2px(1.5/0.5), 10px/600，`rgba(255,255,255,.2)` 底 + 白字
- 中部头块 `flex-1` 居中：单词 40px / font-medium / leading-none / letter-spacing -0.02em；IPA 13px / mono / opacity .8 / `mt-3`
- Example 区: 固定高 `168px`，`pt-[15px]`，`relative`
  - 小标题 "Example" 14px / 600 / .08em / opacity .8
  - 正文 18px / 600 / leading-relaxed / -0.01em，`mt-2`，右列 gap 12px
  - 右列 `flex-col justify-between self-stretch`：
    - 顶：小喇叭 `Volume2` 16x16 / opacity .8 / 容器 29px / 可点击
    - 底（与最后一行对齐）：切换按钮 `ChevronRight`/`ChevronLeft` 14x14（与 ShirinTalk 聊天泡一致线宽 2），白色，29x29 命中区，可点击、阻止冒泡
- 底部: 38px 占位 + 居中 `RotateCw` 12x12（opacity .8）

## 例句切换
- 每卡支持 `example` + 可选 `example2`
- 点击 `>` 在原位置显示第二条并变为 `<`，往复切换；换卡时重置为第一条

## 评分区（仅反面可用）
- `px-5 mt-6`，`grid-cols-4`，gap 8px
- 未翻面时 opacity 0 且 `pointer-events: none`
- 每项：emoji 44px / leading-none，标签 14px / 500；按下 scale .95
- 四项：😟 I forgot / 😕 A bit hard / 🙂 I know it / 😄 Too easy

## 底部大喇叭
- `mt-8` 居中，72x72 圆形，底色 `--wordie`，白色 `Volume2` 32x32，`shadow-md`，按下 scale .95

## 交互
- 卡片任意空白处点击翻面；小喇叭与例句切换按钮阻止冒泡
- 评分后进入下一张；最后一张完成后 `earnBp(15, "wordie", "Word Card")` 并跳转 `/mywordie`
