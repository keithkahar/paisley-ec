import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "管理员后台 — Paisley EC" },
      { name: "description", content: "前端参数管理中心。" },
    ],
  }),
  component: AdminPage,
});

type AdminParam = {
  path: string;
  label: string;
  value: string | number | boolean;
  valueText: string;
  defaultText: string;
  type: "string" | "number" | "boolean";
  customized: boolean;
  helpText: string;
  options?: Array<{ label: string; value: string }>;
};

type AdminGroup = {
  key: string;
  title: string;
  subtitle: string;
  rows: AdminParam[];
};

const NAVY = "#0B2545";
const MUTED = "#8A97A6";
const SUB = "#50627A";
const SOFT_BG = "#F6F8FC";
const ACTIVE_BG = "#EAF3FF";
const SUMMARY_BG = "#F7FAFF";
const BORDER = "#EEF3FA";
const PAISLEY = "#0146B9";
const YELLOW = "#cdae8d";
const YELLOW_SOFT = "#f7f2ec";
const YELLOW_BORDER = "#ebd9c2";

// ===== Smart Reading content types & mock data =====
type SRUnit = {
  lesson_id: string;
  unit_number: number;
  story_title: string;
  cover_question: string;
  content_license: "authorized" | "summary_only" | "metadata_only" | "unknown";
  reading_focus: string;
  keywords: string[];
  characters: string[];
  speaking_goals: string[];
  target_sentences: string[];
  oral_questions: { question: string }[];
  retelling_frame: string;
  shirin_opening: string;
};
type SRBook = {
  book_code: string;
  series_name: string;
  book_title: string;
  cefr_range: string;
  lexile_range: string;
  word_count_range: string;
  sort_order: number;
  updated_at: string;
  content_license: string;
  unit_count: number;
  units: SRUnit[];
};
type SRBookForm = {
  bookCode: string;
  bookTitle: string;
  cefrRange: string;
  lexileRange: string;
  wordCountRange: string;
  sortOrder: string;
  updatedAt: string;
};
type SRUnitForm = {
  lessonId: string;
  storyTitle: string;
  coverQuestion: string;
  contentLicense: SRUnit["content_license"];
  readingFocus: string;
  keywordsText: string;
  targetSentencesText: string;
  speakingGoalsText: string;
  retellingFrame: string;
  shirinOpening: string;
};

const SR_CEFR_OPTIONS = ["PreA1-A1","PreA1","A1","A1-A2","A2","A2-B1","B1","B1-B2","B2"];
const SR_LEXILE_OPTIONS = ["BR-100L","100L-250L","150L-350L","250L-450L","350L-550L","450L-650L","550L-750L","650L-850L"];
const SR_WORD_OPTIONS = ["50","60","80","100","120","150","200","250","300","400","500"];
const SR_LICENSE_OPTIONS: SRUnit["content_license"][] = ["authorized","summary_only","metadata_only","unknown"];

const INITIAL_SR_BOOKS: SRBook[] = [
  {
    book_code: "SR-PA1-01",
    series_name: "Smart Reading",
    book_title: "Hello, Sunny Day",
    cefr_range: "PreA1-A1",
    lexile_range: "BR-100L",
    word_count_range: "50",
    sort_order: 1,
    updated_at: "2026-06-10",
    content_license: "authorized",
    unit_count: 3,
    units: [
      {
        lesson_id: "SR-PA1-01-U01",
        unit_number: 1,
        story_title: "A Big Red Apple",
        cover_question: "What color is the apple?",
        content_license: "authorized",
        reading_focus: "Identify colors and simple nouns in a short story.",
        keywords: ["apple","red","big","tree"],
        characters: ["Mia","Dad"],
        speaking_goals: ["Name three colors","Use 'I see a ___'"],
        target_sentences: ["I see a big red apple.","The apple is on the tree."],
        oral_questions: [{ question: "What does Mia see?" }, { question: "Where is the apple?" }],
        retelling_frame: "First ___ . Then ___ . Finally ___ .",
        shirin_opening: "Hi! Today let's read about Mia and a big red apple. Ready?",
      },
      {
        lesson_id: "SR-PA1-01-U02",
        unit_number: 2,
        story_title: "My Little Cat",
        cover_question: "Where is the cat?",
        content_license: "authorized",
        reading_focus: "Use prepositions of place (on, in, under).",
        keywords: ["cat","box","sleep","little"],
        characters: ["Lily","Cat"],
        speaking_goals: ["Use 'on / in / under'"],
        target_sentences: ["The cat is in the box.","The cat can sleep."],
        oral_questions: [{ question: "Where is the cat?" }],
        retelling_frame: "There is a ___ . It is ___ .",
        shirin_opening: "Meow! Let's find Lily's little cat together.",
      },
      {
        lesson_id: "SR-PA1-01-U03",
        unit_number: 3,
        story_title: "Rainy Park",
        cover_question: "What is the weather like?",
        content_license: "summary_only",
        reading_focus: "Weather words and feelings.",
        keywords: ["rain","umbrella","park","wet"],
        characters: ["Tom"],
        speaking_goals: ["Describe weather"],
        target_sentences: ["It is rainy today.","Tom has an umbrella."],
        oral_questions: [{ question: "How is the weather?" }],
        retelling_frame: "It is ___ . Tom ___ .",
        shirin_opening: "It's raining! Let's see what Tom does in the park.",
      },
    ],
  },
  {
    book_code: "SR-A1-02",
    series_name: "Smart Reading",
    book_title: "Around My Town",
    cefr_range: "A1",
    lexile_range: "100L-250L",
    word_count_range: "100",
    sort_order: 2,
    updated_at: "2026-05-22",
    content_license: "authorized",
    unit_count: 2,
    units: [
      {
        lesson_id: "SR-A1-02-U01",
        unit_number: 1,
        story_title: "At the Bakery",
        cover_question: "What do you buy at a bakery?",
        content_license: "authorized",
        reading_focus: "Food vocabulary and polite requests.",
        keywords: ["bread","cake","buy","please"],
        characters: ["Ana","Baker"],
        speaking_goals: ["Use 'Can I have ___, please?'"],
        target_sentences: ["Can I have a small cake, please?","Thank you very much."],
        oral_questions: [{ question: "What does Ana buy?" }],
        retelling_frame: "Ana goes to ___ . She buys ___ .",
        shirin_opening: "Yum! Let's go to the bakery with Ana.",
      },
      {
        lesson_id: "SR-A1-02-U02",
        unit_number: 2,
        story_title: "On the Bus",
        cover_question: "Where is Ben going?",
        content_license: "authorized",
        reading_focus: "Talking about places and directions.",
        keywords: ["bus","school","stop","go"],
        characters: ["Ben","Driver"],
        speaking_goals: ["Ask 'Where is ___?'"],
        target_sentences: ["The bus goes to school.","Ben sits near the window."],
        oral_questions: [{ question: "Where does the bus go?" }],
        retelling_frame: "Ben takes ___ . He goes to ___ .",
        shirin_opening: "All aboard! Let's ride the bus with Ben.",
      },
    ],
  },
];

function srBookToForm(b: SRBook): SRBookForm {
  return {
    bookCode: b.book_code,
    bookTitle: b.book_title,
    cefrRange: b.cefr_range,
    lexileRange: b.lexile_range,
    wordCountRange: b.word_count_range,
    sortOrder: String(b.sort_order),
    updatedAt: b.updated_at,
  };
}
function srUnitToForm(u: SRUnit): SRUnitForm {
  return {
    lessonId: u.lesson_id,
    storyTitle: u.story_title,
    coverQuestion: u.cover_question,
    contentLicense: u.content_license,
    readingFocus: u.reading_focus,
    keywordsText: u.keywords.join("\n"),
    targetSentencesText: u.target_sentences.join("\n"),
    speakingGoalsText: u.speaking_goals.join("\n"),
    retellingFrame: u.retelling_frame,
    shirinOpening: u.shirin_opening,
  };
}
function linesToArr(s: string) {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

const INITIAL_GROUPS: AdminGroup[] = [
  {
    key: "system",
    title: "系统与隐藏入口",
    subtitle: "版本号、后台入口、安全点击规则、发布通道。",
    rows: [
      { path: "system.appVersion", label: "应用版本号", value: "1.0.0", valueText: "1.0.0", defaultText: "1.0.0", type: "string", customized: false, helpText: "控制前端显示的应用版本号。" },
      { path: "system.releaseChannel", label: "发布通道", value: "mock", valueText: "Mock 原型", defaultText: "Mock 原型", type: "string", customized: true, helpText: "用于标记当前运行通道。", options: [
        { label: "Mock 原型", value: "mock" },
        { label: "开发", value: "dev" },
        { label: "测试", value: "test" },
        { label: "预发布", value: "staging" },
        { label: "正式", value: "release" },
      ]},
      { path: "system.adminEntryTaps", label: "后台入口点击次数", value: 5, valueText: "5", defaultText: "5", type: "number", customized: false, helpText: "在 About PEC 上连续点击多少次进入后台。" },
      { path: "system.adminEntryWindowMs", label: "点击窗口 (毫秒)", value: 1500, valueText: "1500", defaultText: "1500", type: "number", customized: false, helpText: "连续点击的有效时间窗口。" },
    ],
  },
  {
    key: "profileDefaults",
    title: "用户资料默认值",
    subtitle: "新用户首次进入时的资料默认值。",
    rows: [
      { path: "profileDefaults.cefrLevel", label: "默认 CEFR 等级", value: "A2", valueText: "A2", defaultText: "A2", type: "string", customized: false, helpText: "新用户默认的 CEFR 等级。", options: ["A1","A2","B1","B2","C1","C2"].map((v)=>({label:v,value:v})) },
      { path: "profileDefaults.dailyGoalMinutes", label: "默认每日目标 (分钟)", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "新用户默认每日学习目标。" },
    ],
  },
  {
    key: "parentPreferences",
    title: "家长设置默认值",
    subtitle: "家长页里语速、提醒、音频、触感等默认开关。",
    rows: [
      { path: "parentPreferences.autoPlayWordAudio", label: "自动播放单词音频", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "控制单词音频是否默认自动播放。" },
      { path: "parentPreferences.speechRate", label: "语音语速", value: 0.8, valueText: "0.8", defaultText: "0.8", type: "number", customized: false, helpText: "控制语音播放速度。" },
      { path: "parentPreferences.hapticsEnabled", label: "触感反馈", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用触感反馈。" },
      { path: "parentPreferences.dailyReminder", label: "每日提醒", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "是否启用每日学习提醒。" },
    ],
  },
  {
    key: "shirinTalk",
    title: "ShirinTalk 对话参数",
    subtitle: "对话长度、随机性、模型温度。",
    rows: [
      { path: "shirinTalk.maxTurns", label: "最大轮次", value: 12, valueText: "12", defaultText: "12", type: "number", customized: false, helpText: "单次会话最大对话轮次。" },
      { path: "shirinTalk.temperature", label: "模型温度", value: 0.7, valueText: "0.7", defaultText: "0.7", type: "number", customized: true, helpText: "控制生成内容的随机性。" },
    ],
  },
  {
    key: "practiceGoals",
    title: "练习目标",
    subtitle: "每日 / 每周练习目标默认值。",
    rows: [
      { path: "practiceGoals.dailyTalk", label: "每日 ShirinTalk 目标", value: 1, valueText: "1", defaultText: "1", type: "number", customized: false, helpText: "每日 ShirinTalk 会话次数。" },
      { path: "practiceGoals.dailyWordie", label: "每日 myWordie 目标", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "每日单词练习数量。" },
    ],
  },
  {
    key: "wordieDaily",
    title: "myWordie 每日计划",
    subtitle: "新词、复习、上限。",
    rows: [
      { path: "wordieDaily.newWords", label: "每日新词数", value: 6, valueText: "6", defaultText: "6", type: "number", customized: false, helpText: "每日推送的新词数量。" },
      { path: "wordieDaily.reviewCap", label: "每日复习上限", value: 40, valueText: "40", defaultText: "40", type: "number", customized: false, helpText: "每日复习的最大数量。" },
    ],
  },
  {
    key: "bpCaps",
    title: "Bp 每日上限",
    subtitle: "各模块每日 Bp 上限。",
    rows: [
      { path: "bpCaps.shirinTalk", label: "ShirinTalk 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "ShirinTalk 每日 Bp 上限。" },
      { path: "bpCaps.myWordie", label: "myWordie 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "myWordie 每日 Bp 上限。" },
    ],
  },
  {
    key: "effort",
    title: "高努力触发线",
    subtitle: "判定高努力会话的阈值。",
    rows: [
      { path: "effort.minDurationSec", label: "最少时长 (秒)", value: 180, valueText: "180", defaultText: "180", type: "number", customized: false, helpText: "高努力会话的最少时长。" },
    ],
  },
  {
    key: "shirinTalkBp",
    title: "ShirinTalk Bp 规则",
    subtitle: "每轮、每分钟、奖励倍率。",
    rows: [
      { path: "shirinTalkBp.perTurn", label: "每轮 Bp", value: 4, valueText: "4", defaultText: "4", type: "number", customized: false, helpText: "ShirinTalk 每轮获得 Bp。" },
    ],
  },
  {
    key: "wordieBp",
    title: "myWordie Bp 规则",
    subtitle: "记忆、复习、连击奖励。",
    rows: [
      { path: "wordieBp.perWord", label: "每词 Bp", value: 2, valueText: "2", defaultText: "2", type: "number", customized: false, helpText: "每记一个新词得 Bp。" },
    ],
  },
  {
    key: "rewards",
    title: "奖励预设",
    subtitle: "奖励名称、价格。",
    rows: [
      { path: "rewards.enabled", label: "启用奖励", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用奖励系统。" },
    ],
  },
  {
    key: "wordieTest",
    title: "Wordie Test 规则",
    subtitle: "题量、通过分数。",
    rows: [
      { path: "wordieTest.questionCount", label: "题目数量", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "Wordie Test 的题目数量。" },
    ],
  },
  {
    key: "cefrTest",
    title: "CEFR Test 规则",
    subtitle: "题量、自适应步进。",
    rows: [
      { path: "cefrTest.questionCount", label: "题目数量", value: 30, valueText: "30", defaultText: "30", type: "number", customized: false, helpText: "CEFR Test 的题目数量。" },
    ],
  },
  {
    key: "bloxiaPrice",
    title: "Bloxia 消费价格",
    subtitle: "商店物品价格。",
    rows: [
      { path: "bloxiaPrice.seed", label: "种子价格", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "种子的 Bp 价格。" },
    ],
  },
  {
    key: "bloxiaStage",
    title: "Bloxia 植物阶段",
    subtitle: "成长所需 Bp。",
    rows: [
      { path: "bloxiaStage.sprout", label: "发芽阈值", value: 50, valueText: "50", defaultText: "50", type: "number", customized: false, helpText: "进入发芽阶段所需 Bp。" },
    ],
  },
  {
    key: "display",
    title: "显示与图表",
    subtitle: "图表颜色、动效、密度。",
    rows: [
      { path: "display.weekStartsOnMonday", label: "周一为一周开始", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "日历是否以周一为一周开始。" },
      { path: "display.compactMode", label: "紧凑模式", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "启用更紧凑的卡片间距。" },
    ],
  },
];

function customizedCount(group: AdminGroup) {
  return group.rows.filter((r) => r.customized).length;
}

function formatValueText(param: AdminParam, raw: string): string {
  if (param.options) {
    return param.options.find((o) => o.value === raw)?.label ?? raw;
  }
  if (param.type === "boolean") return raw === "true" ? "开启" : "关闭";
  return raw;
}

function AdminPage() {
  const [groups, setGroups] = useState<AdminGroup[]>(INITIAL_GROUPS);
  const [activeKey, setActiveKey] = useState<string>("system");
  const [editing, setEditing] = useState<AdminParam | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [helpFor, setHelpFor] = useState<AdminParam | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeGroup = groups.find((g) => g.key === activeKey) ?? groups[0];

  const summary = useMemo(() => {
    const params = groups.reduce((n, g) => n + g.rows.length, 0);
    const cust = groups.reduce((n, g) => n + customizedCount(g), 0);
    return [
      { label: "分组", value: groups.length },
      { label: "参数", value: params },
      { label: "已自定义", value: cust },
    ];
  }, [groups]);

  const filteredRows = useMemo(() => {
    if (!activeGroup) return [];
    const q = query.trim().toLowerCase();
    if (!q) return activeGroup.rows;
    return activeGroup.rows.filter((r) =>
      r.label.toLowerCase().includes(q) ||
      r.path.toLowerCase().includes(q) ||
      r.valueText.toLowerCase().includes(q),
    );
  }, [activeGroup, query]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1400);
  }

  function openEditor(p: AdminParam) {
    setEditing(p);
    setEditValue(String(p.value));
  }

  function closeEditor() {
    setEditing(null);
    setEditValue("");
  }

  function saveEditor() {
    if (!editing) return;
    const path = editing.path;
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        rows: g.rows.map((r) => {
          if (r.path !== path) return r;
          let v: string | number | boolean = editValue;
          if (r.type === "number") v = Number(editValue);
          else if (r.type === "boolean") v = editValue === "true";
          const valueText = formatValueText(r, editValue);
          return { ...r, value: v, valueText, customized: valueText !== r.defaultText };
        }),
      })),
    );
    closeEditor();
    showToast("已保存");
  }

  function resetAll() {
    setGroups(INITIAL_GROUPS.map((g) => ({ ...g, rows: g.rows.map((r) => ({ ...r, customized: false, valueText: r.defaultText })) })));
    setConfirmReset(false);
    showToast("已重置");
  }

  const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
  const SOFT_BLUE = "#EEF2FA";

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-full pb-12" style={{ color: NAVY, fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
        <FloatingBack to="/profile" label="Back to profile" />

        <div className="px-5 pt-12">
          {/* Header: title + menu (open groups drawer) + reset */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => setNavOpen(true)}
                aria-label="分组导航"
                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl"
                style={{ background: SOFT_BLUE, color: PAISLEY }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-[22px] font-bold leading-tight truncate" style={{ color: NAVY, fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>管理员后台</h1>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: MUTED }}>前端参数管理中心</p>
              </div>
            </div>
            <button
              onClick={() => setConfirmReset(true)}
              className="shrink-0 h-[30px] px-3 rounded-full text-[12px] font-semibold"
              style={{ background: SOFT_BG, color: SUB }}
            >
              重置
            </button>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-[7px] mt-4">
            {summary.map((s) => {
              const isCustom = s.label === "已自定义";
              return (
                  <div
                    key={s.label}
                    className="rounded-2xl px-3 py-2.5"
                    style={{
                      background: isCustom ? YELLOW_SOFT : SOFT_BLUE,
                      border: `1px solid ${isCustom ? YELLOW_BORDER : "#E2EAF6"}`,
                    }}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: isCustom ? YELLOW : PAISLEY, letterSpacing: "0.08em" }}>{s.label}</div>
                    <div className="text-[22px] font-bold leading-tight mt-0.5" style={{ color: NAVY }}>{s.value}</div>
                  </div>
              );
            })}
          </div>

          {/* Current group header */}
          {activeGroup && (
            <div className="mt-5 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: PAISLEY }}>当前分组</div>
                <h2 className="text-[17px] font-bold leading-tight mt-0.5 truncate" style={{ color: NAVY, fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>{activeGroup.title}</h2>
              </div>
              <span
                className="inline-flex items-center justify-center min-w-[26px] h-[22px] px-2 rounded-full text-[11px] font-bold shrink-0"
                style={{ background: SOFT_BLUE, color: PAISLEY }}
              >
                {activeGroup.rows.length}
              </span>
            </div>
          )}
          {activeGroup && (
            <p className="text-[11px] mt-1 leading-relaxed" style={{ color: MUTED }}>{activeGroup.subtitle}</p>
          )}

          {/* Search */}
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索本组参数 (名称 / key)"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-[13px] outline-none"
              style={{ background: "#F5F7FB", border: "1px solid #E6ECF5", color: NAVY }}
            />
          </div>

          {/* Param cards */}
          <div className="mt-3 space-y-2.5">
            {filteredRows.length === 0 && (
              <div className="text-center text-[12px] py-8" style={{ color: MUTED }}>无匹配参数</div>
            )}
            {filteredRows.map((row) => (
              <button
                key={row.path}
                onClick={() => openEditor(row)}
                className="w-full text-left relative rounded-2xl p-3.5 transition-all"
                style={{
                  background: "#fff",
                  border: `1px solid ${row.customized ? "rgba(205,174,141,0.28)" : "#EEF2F7"}`,
                  boxShadow: row.customized
                    ? "0 4px 14px rgba(205,174,141,0.07)"
                    : "0 2px 10px rgba(11,37,69,0.04)",
                  overflow: "hidden",
                }}
              >
                {row.customized && (
                  <span className="absolute top-0 left-0 h-full w-[3px]" style={{ background: YELLOW }} />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-semibold leading-tight" style={{ color: NAVY }}>{row.label}</span>
                      {row.customized && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold leading-none"
                          style={{ background: YELLOW, color: "#fff" }}
                        >
                          已改
                        </span>
                      )}
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); setHelpFor(row); }}
                        className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full text-[10px] font-bold leading-none"
                        style={{ background: SOFT_BG, color: SUB }}
                      >
                        ?
                      </span>
                    </div>
                    <code
                      className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10.5px] font-medium break-all"
                      style={{ background: SOFT_BLUE, color: PAISLEY, fontFamily: MONO }}
                    >
                      {row.path}
                    </code>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0 max-w-[42%]">
                    <div className="text-[13.5px] font-bold text-right break-all leading-tight" style={{ color: row.customized ? PAISLEY : NAVY }}>{row.valueText}</div>
                    <div className="text-[9.5px]" style={{ color: "#A0AEC0" }}>默认: {row.defaultText}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Group navigation drawer */}
        {navOpen && (
          <>
            <div
              className="fixed inset-0 z-40 transition-opacity"
              style={{ background: "rgba(11,37,69,0.36)" }}
              onClick={() => setNavOpen(false)}
            />
            <aside
              className="fixed top-0 left-0 bottom-0 z-50 w-[78%] max-w-[300px] flex flex-col"
              style={{ background: SOFT_BLUE, boxShadow: "4px 0 24px rgba(11,37,69,0.18)" }}
            >
              <div className="px-5 pt-12 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PAISLEY }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold leading-tight" style={{ color: NAVY }}>管理员后台</div>
                    <div className="text-[10px]" style={{ color: SUB }}>选择参数分组</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-3">
                <div className="px-2 text-[9px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(11,37,69,0.45)" }}>参数分组</div>
                <nav className="space-y-1">
                  {groups.map((g) => {
                    const active = g.key === activeKey;
                    const cc = customizedCount(g);
                    return (
                      <button
                        key={g.key}
                        onClick={() => { setActiveKey(g.key); setQuery(""); setNavOpen(false); }}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{
                          background: active ? PAISLEY : "transparent",
                          color: active ? "#fff" : NAVY,
                          boxShadow: active ? "0 4px 12px rgba(1,70,185,0.22)" : "none",
                        }}
                      >
                        <span className="text-[13px] font-semibold truncate">{g.title}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          {cc > 0 && (
                            <span
                              className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full text-[9.5px] font-bold leading-none"
                              style={{ background: active ? "rgba(255,255,255,0.22)" : YELLOW, color: "#fff" }}
                            >
                              {cc}
                            </span>
                          )}
                          <span className="text-[10px]" style={{ color: active ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>{g.rows.length}</span>
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="p-4 border-t" style={{ borderColor: "#DDE6F2" }}>
                <button
                  onClick={() => { setNavOpen(false); setConfirmReset(true); }}
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold"
                  style={{ background: "#fff", color: NAVY, border: "1px solid #D5DEEC" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                  全局重置
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="px-5 py-3 rounded-xl text-white text-[14px] font-medium" style={{ background: "rgba(11,37,69,0.85)" }}>{toast}</div>
          </div>
        )}

        {/* Help modal */}
        {helpFor && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setHelpFor(null)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>{helpFor.label}</div>
              <div className="text-[13px] mt-2 leading-relaxed" style={{ color: SUB }}>{helpFor.helpText || "暂无说明。"}</div>
              <button
                onClick={() => setHelpFor(null)}
                className="mt-4 w-full h-10 rounded-full text-[14px] font-semibold text-white"
                style={{ background: PAISLEY }}
              >
                知道了
              </button>
            </div>
          </div>
        )}

        {/* Reset confirm */}
        {confirmReset && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setConfirmReset(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>重置后台参数？</div>
              <div className="text-[13px] mt-2" style={{ color: SUB }}>这会把所有前端参数恢复为默认值。</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setConfirmReset(false)} className="flex-1 h-10 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                <button onClick={resetAll} className="flex-1 h-10 rounded-full text-[14px] font-semibold text-white" style={{ background: "#D9534F" }}>重置</button>
              </div>
            </div>
          </div>
        )}

        {/* Editor bottom sheet */}
        {editing && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={closeEditor} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))]">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3]" />
                <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>{editing.label}</div>
                <div className="text-[11px] mt-1 break-all" style={{ color: MUTED }}>{editing.path}</div>
                <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>默认：{editing.defaultText}</div>

                <div className="mt-4">
                  {editing.options && editing.options.length > 0 ? (
                    <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
                      {editing.options.map((opt) => {
                        const active = editValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setEditValue(opt.value)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px]"
                            style={{
                              background: active ? ACTIVE_BG : SOFT_BG,
                              color: active ? PAISLEY : NAVY,
                              fontWeight: active ? 700 : 500,
                            }}
                          >
                            <span>{opt.label}</span>
                            <span className="text-[12px]" style={{ color: active ? PAISLEY : MUTED }}>{opt.value}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : editing.type === "boolean" ? (
                    <button
                      onClick={() => setEditValue(editValue === "true" ? "false" : "true")}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: SOFT_BG }}
                    >
                      <span className="text-[14px] font-semibold" style={{ color: NAVY }}>{editValue === "true" ? "开启" : "关闭"}</span>
                      <span
                        className="relative inline-block w-[44px] h-[24px] rounded-full transition-colors"
                        style={{ background: editValue === "true" ? PAISLEY : "#CBD5E1" }}
                      >
                        <span
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                          style={{ left: editValue === "true" ? 22 : 2 }}
                        />
                      </span>
                    </button>
                  ) : (
                    <input
                      autoFocus
                      inputMode={editing.type === "number" ? "decimal" : "text"}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-[15px] outline-none"
                      style={{ background: SOFT_BG, color: NAVY }}
                    />
                  )}
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={closeEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold text-white" style={{ background: `linear-gradient(180deg, #0877FF 0%, ${PAISLEY} 100%)` }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
