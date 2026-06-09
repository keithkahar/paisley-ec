## Wordie Test 重构计划

按照 spec 把 `/wordie-test` 重写为闭环原型。所有交互在前端 mock，无后端。

### 1. 四种主状态 + Review Overlay
- `locked` — 7 天冷却未到。显示 Last Wordie Test / Next Wordie Test 日期 + remaining time。
- `info` — 顶部 `1 / 7`、`Info` pill、`⏱ 0:00`；Info 卡显示 `Wordie Test #03`、4 条说明、`Start Test` 按钮。
- `quiz` — 当前题型阶段答题。
- `result` — 总分、用时、6 个维度分、Answer Review 列表。
- `review overlay` — 点击 Review item 弹出单题详情（prompt / choices / Right vs Mine）。

prototype helper（顶部切换 chip）保留为：`locked / info / quiz / result`，方便用户预览所有状态。

### 2. Quiz 顶部
- 阶段进度 `n / 7`
- 当前题型 pill（Listening / Pronunciation / Spelling / Definition / Usage / Part of Speech）
- `⏱ m:ss` 计时器（进入 quiz 启动 setInterval，退出/Submit 停止；切到非 quiz 状态归零）
- 7 段 progress segments

### 3. 阶段 banner
按 spec 6 个题型，每个 banner 显示：彩色背景 + 题型 title + Points + subtitle + note。

### 4. 题型 UI（前端 mock 数据 20 题）
| 题型 | 题数 | UI 要点 |
|---|---|---|
| Listening | 3 | 题号旁小 ▶ Play Audio 按钮，选项是单词；点击 toast「Playing…」mock |
| Pronunciation | 3 | 题号旁 inline word，长按/点击 Record 按钮（mock 评分弹回 "Checked / Clear voice / Needs review"） |
| Spelling | 4 | 不显示目标词，仅选项；一行一个 |
| Definition | 4 | 显示目标 word，选 definition |
| Usage | 4 | 显示目标 word，选正确例句 |
| Part of Speech | 2 | 显示目标 word，选词性 |

选项排版：spelling 永远单列；其他题型若任一选项长度 > 16 字符或词数 > 2，则单列，否则两列。

### 5. 阶段间导航
- `Previous` / `Next` / 最后阶段为 `Submit`
- 当前阶段未答完，Next/Submit disabled，并 toast `Finish {label} first`

### 6. Result 页
- 顶部彩色卡：Trophy + `Test Completed!` + `Test Time 3:42` + `Your Wordie Test Score` + `85%`
- 6 行维度，每行 label + `correct / total` + ProgressBar
- Answer Review 按题型分组，POS 最后；每项显示 Q# + 单词 + 对/错 icon；点击打开 review overlay
- Bp 奖励卡（按分数段：基础 5 + 等级加成，最高 20）
- 底部 `Retest` / `Open Bank`

### 7. Review Overlay
全屏遮罩 + 卡片，显示：题号、prompt（含 word/audio 占位）、所有选项，"Right" / "Mine" 标签。

### 8. 命名规范
通篇用 `Wordie Test`，不出现 `myTest`。文案与 spec 表格一致。

### 技术细节
- 单文件：`src/routes/wordie-test.tsx` 全量重写
- 数据：在文件内定义 20 题 mock 题集（每个阶段对应数组）+ 历史测试编号 mock 为 `#03`
- 状态：`useState` 管理 `mode`、`stageIdx`、`answers`（map: questionId → choiceId/recordResult）、`timer`、`reviewOpenId`
- 计时器：`useEffect` + `setInterval`，mode 切到 `quiz` 启动，离开清理
- 复用 `PhoneFrame` / `AppHeader` / `ProgressBar`；StatusBadge 不必用
- 不调真实音频/录音 API；按钮点击模拟「播放中…」/「Checked」状态
- 不做后端写入；提交后切到 result 用本地计算的分数

### 不做
- 真实 TTS / 录音 / 评分接口
- localStorage 写历史
- Bp 真实结算
- AI 出题
