import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, RotateCcw, Pencil, ChevronDown, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StandardSheet } from "@/components/app/StandardSheet";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "参数分组 — Paisley EC" },
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

// ===== Smart Reading content types & management data =====
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
  lexileMin: string;
  lexileMax: string;
  wordCountRange: string;
  sortOrder: string;
  updatedAt: string;
  contentLicense: string;
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
const SR_LICENSE_OPTIONS: SRUnit["content_license"][] = ["authorized","summary_only","metadata_only","unknown"];

const INITIAL_SR_BOOKS: SRBook[] = [
  {
    book_code: "SR-PA1-01",
    series_name: "Smart Reading",
    book_title: "Smart Reading 2.1",
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
    book_title: "Smart Reading 2.2",
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
  {
    book_code: "SR-A1-03",
    series_name: "Smart Reading",
    book_title: "Smart Reading 2.3",
    cefr_range: "A1",
    lexile_range: "150L-300L",
    word_count_range: "120",
    sort_order: 3,
    updated_at: "2026-05-01",
    content_license: "authorized",
    unit_count: 1,
    units: [
      {
        lesson_id: "SR-A1-03-U01",
        unit_number: 1,
        story_title: "My Family",
        cover_question: "Who is in your family?",
        content_license: "authorized",
        reading_focus: "Family members vocabulary.",
        keywords: ["mom","dad","sister","brother"],
        characters: ["Sam"],
        speaking_goals: ["Introduce family"],
        target_sentences: ["This is my mom.","I have a sister."],
        oral_questions: [{ question: "Who is in Sam's family?" }],
        retelling_frame: "Sam has ___ .",
        shirin_opening: "Let's meet Sam's family!",
      },
    ],
  },
  {
    book_code: "SR-A1-04",
    series_name: "Smart Reading",
    book_title: "Smart Reading 2.4",
    cefr_range: "A1-A2",
    lexile_range: "200L-350L",
    word_count_range: "150",
    sort_order: 4,
    updated_at: "2026-04-18",
    content_license: "authorized",
    unit_count: 1,
    units: [
      {
        lesson_id: "SR-A1-04-U01",
        unit_number: 1,
        story_title: "At the Zoo",
        cover_question: "What animals do you see?",
        content_license: "authorized",
        reading_focus: "Animal names and actions.",
        keywords: ["lion","monkey","zoo","jump"],
        characters: ["Kim"],
        speaking_goals: ["Describe animals"],
        target_sentences: ["The monkey can jump.","I like lions."],
        oral_questions: [{ question: "What can the monkey do?" }],
        retelling_frame: "At the zoo, ___ .",
        shirin_opening: "Roar! Let's go to the zoo.",
      },
    ],
  },
  {
    book_code: "SR-A2-05",
    series_name: "Smart Reading",
    book_title: "Smart Reading 2.5",
    cefr_range: "A2",
    lexile_range: "300L-450L",
    word_count_range: "200",
    sort_order: 5,
    updated_at: "2026-03-30",
    content_license: "authorized",
    unit_count: 1,
    units: [
      {
        lesson_id: "SR-A2-05-U01",
        unit_number: 1,
        story_title: "A Summer Trip",
        cover_question: "Where would you like to go?",
        content_license: "authorized",
        reading_focus: "Travel vocabulary and past simple.",
        keywords: ["beach","travel","summer","fun"],
        characters: ["Nora"],
        speaking_goals: ["Talk about a trip"],
        target_sentences: ["We went to the beach.","It was fun."],
        oral_questions: [{ question: "Where did Nora go?" }],
        retelling_frame: "Nora went to ___ . She ___ .",
        shirin_opening: "Pack your bag! Let's travel with Nora.",
      },
    ],
  },
  {
    book_code: "SR-A2-06",
    series_name: "Smart Reading",
    book_title: "Smart Reading 2.6",
    cefr_range: "A2-B1",
    lexile_range: "400L-550L",
    word_count_range: "240",
    sort_order: 6,
    updated_at: "2026-03-10",
    content_license: "authorized",
    unit_count: 1,
    units: [
      {
        lesson_id: "SR-A2-06-U01",
        unit_number: 1,
        story_title: "The Little Inventor",
        cover_question: "What would you invent?",
        content_license: "authorized",
        reading_focus: "Inventions and problem solving.",
        keywords: ["invent","idea","build","robot"],
        characters: ["Leo"],
        speaking_goals: ["Share an idea"],
        target_sentences: ["Leo built a small robot.","The robot can help him."],
        oral_questions: [{ question: "What did Leo build?" }],
        retelling_frame: "Leo wanted to ___ . So he ___ .",
        shirin_opening: "Ready to invent? Let's meet Leo!",
      },
    ],
  },
];

function stripLexileSuffix(v: string) {
  return String(v || "").replace(/L/gi, "").trim();
}
function splitLexileRange(v: string) {
  const parts = String(v || "").trim().split("-");
  return { lexileMin: stripLexileSuffix(parts[0] || ""), lexileMax: stripLexileSuffix(parts[1] || "") };
}
function buildLexileRange(min: string, max: string) {
  const a = stripLexileSuffix(min);
  const b = stripLexileSuffix(max);
  if (a && b) return `${a}L-${b}L`;
  if (a) return `${a}L`;
  if (b) return `${b}L`;
  return "";
}
function toIsoDate(value: string) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const m = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2}|\d{4})$/);
  if (!m) return text;
  const y = m[3].length === 2 ? "20" + m[3] : m[3];
  return `${y}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}
function toUsShortDate(value: string) {
  const m = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  return `${m[2]}-${m[3]}-${m[1].slice(-2)}`;
}
function srBookToForm(b: SRBook): SRBookForm {
  const lex = splitLexileRange(b.lexile_range || "");
  return {
    bookCode: b.book_code,
    bookTitle: b.book_title,
    cefrRange: b.cefr_range,
    lexileMin: lex.lexileMin,
    lexileMax: lex.lexileMax,
    wordCountRange: b.word_count_range,
    sortOrder: String(b.sort_order),
    updatedAt: toIsoDate(b.updated_at || new Date().toISOString().slice(0, 10)),
    contentLicense: b.content_license,
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
  return <AdminPageInner />;
}

function SRView(props: {
  srBooks: SRBook[];
  srActiveBook: SRBook | null;
  srActiveUnit: SRUnit | null;
  srActiveBookCode: string;
  srActiveLessonId: string;
  srSource: "default" | "admin";
  srTotalUnits: number;
  setSrActiveBookCode: (v: string) => void;
  setSrActiveLessonId: (v: string) => void;
  onImport: () => void;
  onClear: () => void;
  onEditBook: () => void;
  onEditUnit: () => void;
}) {
  const NAVY_C = "#0B2545";
  const MUTED_C = "#8A97A6";
  const SUB_C = "#50627A";
  const YELLOW_C = "#cdae8d";
  const YELLOW_SOFT_C = "#f7f2ec";
  const YELLOW_BORDER_C = "#ebd9c2";
  const {
    srBooks, srActiveBook, srActiveUnit, srActiveBookCode, srActiveLessonId,
    srSource, srTotalUnits, setSrActiveBookCode, setSrActiveLessonId,
    onImport, onClear, onEditBook, onEditUnit,
  } = props;
  const isAdmin = srSource === "admin";
  const [bookSheetOpen, setBookSheetOpen] = useState(false);
  const [unitSheetOpen, setUnitSheetOpen] = useState(false);

  const Section = ({ title, count, action }: { title: string; count?: string; action?: React.ReactNode }) => (
    <div className="flex items-baseline justify-between mt-6 mb-2.5">
      <div className="flex items-baseline gap-2 min-w-0">
        <h3 className="text-[15px] font-semibold leading-tight truncate" style={{ color: NAVY_C }}>{title}</h3>
        {count && <span className="text-[12px] shrink-0" style={{ color: MUTED_C }}>{count}</span>}
      </div>
      {action}
    </div>
  );

  const aiContext = srActiveBook && srActiveUnit ? {
    book: srActiveBook.book_title,
    book_code: srActiveBook.book_code,
    cefr: srActiveBook.cefr_range,
    lexile: srActiveBook.lexile_range,
    unit: srActiveUnit.unit_number,
    story_title: srActiveUnit.story_title,
    cover_question: srActiveUnit.cover_question,
    reading_focus: srActiveUnit.reading_focus,
    keywords: srActiveUnit.keywords,
    characters: srActiveUnit.characters,
    speaking_goals: srActiveUnit.speaking_goals,
    target_sentences: srActiveUnit.target_sentences,
    oral_questions: srActiveUnit.oral_questions,
    retelling_frame: srActiveUnit.retelling_frame,
    shirin_opening: srActiveUnit.shirin_opening,
  } : null;

  return (
    <div className="mt-4">
      {/* Status strip — quiet, no dots, no heavy fonts */}
      <div className="rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3" style={{ background: "#FAFBFD", border: "1px solid #EEF2F7" }}>
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-[11px]" style={{ color: MUTED_C }}>来源</span>
          <span className="text-[13px] font-medium" style={{ color: NAVY_C }}>{isAdmin ? "Admin 导入" : "默认代码"}</span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-[11px]" style={{ color: MUTED_C }}>规模</span>
          <span className="text-[13px] font-medium" style={{ color: NAVY_C }}>
            {srBooks.length} 本 · {srTotalUnits} 单元
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={onImport}
          className="h-10 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: YELLOW_C }}
        >
          导入 JSON
        </button>
        <button
          onClick={onClear}
          className="h-10 rounded-xl text-[13px] font-semibold"
          style={{ background: "#fff", color: NAVY_C, border: `1px solid ${YELLOW_BORDER_C}` }}
        >
          清除导入
        </button>
      </div>

      {/* Books */}
      <Section title="书籍" count={`${srBooks.length} 本`} />


      <StandardSheet
        open={bookSheetOpen}
        title="选择书籍"
        brandColor={YELLOW_C}
        onClose={() => setBookSheetOpen(false)}
      >
        <>
          {srBooks.map((b) => {
            const active = b.book_code === srActiveBookCode;
            return (
              <button
                key={b.book_code}
                type="button"
                onClick={() => {
                  setSrActiveBookCode(b.book_code);
                  setSrActiveLessonId(b.units[0]?.lesson_id ?? "");
                  setBookSheetOpen(false);
                }}
                className="w-full flex flex-col items-start gap-0.5 px-1 py-3.5 text-left"
              >
                <div className="w-full flex items-center justify-between gap-3">
                  <p
                    className="text-[18px] font-semibold tracking-tight leading-none"
                    style={{ color: active ? YELLOW_C : NAVY_C, letterSpacing: "-0.01em" }}
                  >
                    {b.book_code}
                  </p>
                  {active && (
                    <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} style={{ color: YELLOW_C }} />
                  )}
                </div>
                <p
                  className="text-[13px] leading-none"
                  style={{ color: MUTED_C }}
                >
                  {b.book_title}
                </p>
              </button>
            );
          })}
        </>
      </StandardSheet>

      {/* Book info */}
      {srActiveBook && (
        <>
          <div className="relative rounded-2xl bg-white p-4 pt-14 mt-2 overflow-hidden" style={{ border: "1px solid #EEF2F7" }}>
            <button
              type="button"
              onClick={() => setBookSheetOpen(true)}
              className="absolute top-0 left-0 right-0 flex items-center justify-between gap-3 pl-5 pr-4 h-[46px] text-left active:scale-[0.99] transition-transform rounded-t-2xl rounded-bl-none rounded-br-none"
              style={{ background: YELLOW_SOFT_C }}
            >
              <span
                className="text-[15px] font-semibold tracking-tight truncate pr-2"
                style={{ color: YELLOW_C }}
              >
                {srActiveBook.book_title}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0" strokeWidth={2.5} style={{ color: YELLOW_C }} />
            </button>
            <button
              type="button"
              onClick={onEditBook}
              aria-label="编辑"
              className="absolute top-14 right-4 h-7 w-7 grid place-items-center rounded-full active:scale-95 transition-transform bg-white"
              style={{ border: `1px solid ${YELLOW_BORDER_C}` }}
            >
              <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: YELLOW_C }} />
            </button>
            <div className="pr-10">
              <div className="text-[11px]" style={{ color: MUTED_C }}>编号</div>
              <div className="text-[13px] font-medium mt-0.5 break-all" style={{ color: NAVY_C }}>{srActiveBook.book_code}</div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                ["CEFR", srActiveBook.cefr_range],
                ["Lexile", srActiveBook.lexile_range],
                ["Words", srActiveBook.word_count_range],
                ["排序", String(srActiveBook.sort_order)],
                ["更新日期", toUsShortDate(srActiveBook.updated_at)],
                ["授权", srActiveBook.content_license],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px]" style={{ color: MUTED_C }}>{k}</div>
                  <div className="text-[13px] font-medium mt-0.5 break-all" style={{ color: NAVY_C }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Unit list */}
      {srActiveBook && (
        <>
          <Section title="单元" count={`${srActiveBook.units.length} 个`} />
          <div className="space-y-2.5">
            {srActiveBook.units.map((u) => {
              const active = u.lesson_id === srActiveLessonId;
              return (
                <button
                  key={u.lesson_id}
                  onClick={() => setSrActiveLessonId(u.lesson_id)}
                  className="w-full flex items-stretch text-left rounded-full overflow-hidden active:scale-[0.98] transition-transform"
                  style={{
                    background: active ? YELLOW_SOFT_C : "#fff",
                    border: `1px solid ${active ? YELLOW_BORDER_C : "#EEF2F7"}`,
                  }}
                >
                  <div
                    className="h-11 w-11 shrink-0 grid place-items-center my-2 ml-2 rounded-full text-[15px] font-semibold"
                    style={{ background: active ? YELLOW_C : YELLOW_SOFT_C, color: active ? "#fff" : NAVY_C }}
                  >
                    {u.unit_number}
                  </div>
                  <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                    <p className="text-[15px] font-semibold tracking-tight leading-tight truncate" style={{ color: NAVY_C, letterSpacing: "-0.01em" }}>
                      {u.story_title}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium truncate" style={{ color: MUTED_C }}>
                      {u.cover_question}
                    </p>
                  </div>
                  <div className="shrink-0 pr-4 pl-1 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? YELLOW_C : "#C8D2E0"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Unit preview */}
      {srActiveUnit && (
        <>
          <Section
            title="单元预览"
            action={
              <button
                type="button"
                onClick={onEditUnit}
                aria-label="编辑"
                className="h-7 w-7 grid place-items-center rounded-full active:scale-95 transition-transform bg-white"
                style={{ border: `1px solid ${YELLOW_BORDER_C}` }}
              >
                <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: YELLOW_C }} />
              </button>
            }
          />
          <div className="rounded-2xl bg-white p-4" style={{ border: "1px solid #EEF2F7" }}>
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[15px] font-semibold" style={{ background: YELLOW_SOFT_C, color: NAVY_C }}>U{srActiveUnit.unit_number}</div>
              <div className="min-w-0">
                <div className="text-[11px]" style={{ color: MUTED_C }}>{srActiveBook?.book_code} · {srActiveUnit.lesson_id}</div>
                <div className="text-[16px] font-semibold leading-tight mt-0.5 truncate" style={{ color: NAVY_C }}>{srActiveUnit.story_title}</div>
              </div>
            </div>
            <div className="mt-4 space-y-3.5">
              {[
                ["Cover Question", srActiveUnit.cover_question],
                ["Reading Focus", srActiveUnit.reading_focus],
                ["Keywords", srActiveUnit.keywords.join(" · ")],
                ["Characters", srActiveUnit.characters.join(" · ")],
                ["Speaking Goals", srActiveUnit.speaking_goals.join(" · ")],
                ["Target Sentences", srActiveUnit.target_sentences.join(" · ")],
                ["Oral Questions", srActiveUnit.oral_questions.map((q) => q.question).join(" · ")],
                ["Retelling Frame", srActiveUnit.retelling_frame],
                ["Shirin Opening", srActiveUnit.shirin_opening],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px]" style={{ color: MUTED_C }}>{k}</div>
                  <div className="text-[14px] mt-1 leading-relaxed" style={{ color: NAVY_C }}>{v || "—"}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-6 mb-2.5">
            <h3 className="text-[13px] font-medium leading-tight" style={{ color: SUB_C }}>AI Context Preview</h3>
            <span className="text-[11px]" style={{ color: MUTED_C }}>context.json</span>
          </div>
          <pre className="rounded-2xl p-4 text-[11px] leading-relaxed overflow-x-auto" style={{ background: "#F5F7FB", color: NAVY_C, border: "1px solid #E6ECF5", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
{JSON.stringify(aiContext, null, 2)}
          </pre>
        </>
      )}

      <div className="mt-5 text-[12px] text-center" style={{ color: MUTED_C }}>
        内容由 Admin Console 统一管理。修改会标记为 Admin 导入。
      </div>
    </div>
  );
}

function AdminPageInner() {
  const [groups, setGroups] = useState<AdminGroup[]>(INITIAL_GROUPS);
  const [activeKey, setActiveKey] = useState<string>("system");
  const [editing, setEditing] = useState<AdminParam | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [helpFor, setHelpFor] = useState<AdminParam | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ===== Mode switch & Smart Reading state =====
  const [mode, setMode] = useState<"params" | "smartReading">("params");
  const [srBooks, setSrBooks] = useState<SRBook[]>(INITIAL_SR_BOOKS);
  const [srSource, setSrSource] = useState<"default" | "admin">("default");
  const [srActiveBookCode, setSrActiveBookCode] = useState<string>(INITIAL_SR_BOOKS[0]?.book_code ?? "");
  const [srActiveLessonId, setSrActiveLessonId] = useState<string>(INITIAL_SR_BOOKS[0]?.units[0]?.lesson_id ?? "");
  const [srImportOpen, setSrImportOpen] = useState(false);
  const [srImportText, setSrImportText] = useState("");
  const [srValidationText, setSrValidationText] = useState("");
  const [srValidationOk, setSrValidationOk] = useState<boolean | null>(null);
  const [srConfirmClear, setSrConfirmClear] = useState(false);
  const [srBookEditForm, setSrBookEditForm] = useState<SRBookForm | null>(null);
  const [srUnitEditForm, setSrUnitEditForm] = useState<SRUnitForm | null>(null);
  const [srCefrPickerOpen, setSrCefrPickerOpen] = useState(false);
  const [srLicensePickerOpen, setSrLicensePickerOpen] = useState(false);
  const [srBookLicensePickerOpen, setSrBookLicensePickerOpen] = useState(false);

  const srActiveBook = srBooks.find((b) => b.book_code === srActiveBookCode) ?? srBooks[0] ?? null;
  const srActiveUnit = srActiveBook
    ? srActiveBook.units.find((u) => u.lesson_id === srActiveLessonId) ?? srActiveBook.units[0] ?? null
    : null;
  const srTotalUnits = srBooks.reduce((n, b) => n + b.units.length, 0);

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

  // ===== Smart Reading actions =====
  function srValidate(): SRBook[] | null {
    const raw = srImportText.trim();
    if (!raw) {
      setSrValidationOk(false);
      setSrValidationText("请粘贴 JSON 内容。");
      return null;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      setSrValidationOk(false);
      setSrValidationText(`JSON 格式错误：${(err as Error).message}`);
      return null;
    }
    const list: unknown = Array.isArray(parsed)
      ? parsed
      : (parsed as { books?: unknown }).books ?? [parsed];
    if (!Array.isArray(list)) {
      setSrValidationOk(false);
      setSrValidationText("JSON 必须是 books 数组或包含 books 字段的对象。");
      return null;
    }
    const errors: string[] = [];
    const warnings: string[] = [];
    const books: SRBook[] = [];
    list.forEach((item, i) => {
      const b = item as Partial<SRBook>;
      if (!b.book_code) errors.push(`第 ${i + 1} 本书缺少 book_code`);
      if (!b.book_title) warnings.push(`第 ${i + 1} 本书缺少 book_title`);
      if (!Array.isArray(b.units)) errors.push(`第 ${i + 1} 本书 units 不是数组`);
      books.push({
        book_code: b.book_code || `BOOK-${i + 1}`,
        series_name: b.series_name || "Smart Reading",
        book_title: b.book_title || "未命名",
        cefr_range: b.cefr_range || "A1",
        lexile_range: b.lexile_range || "BR-100L",
        word_count_range: b.word_count_range || "100",
        sort_order: Number(b.sort_order || i + 1),
        updated_at: b.updated_at || new Date().toISOString().slice(0, 10),
        content_license: b.content_license || "authorized",
        unit_count: Array.isArray(b.units) ? b.units.length : 0,
        units: Array.isArray(b.units) ? (b.units as SRUnit[]) : [],
      });
    });
    const incomingCodes = books.map((b) => b.book_code);
    const currentCodes = srBooks.map((b) => b.book_code);
    const newBooks = incomingCodes.filter((c) => !currentCodes.includes(c));
    const removedBooks = currentCodes.filter((c) => !incomingCodes.includes(c));
    const incomingUnits = books.reduce((n, b) => n + b.units.length, 0);
    const ok = errors.length === 0;
    const report = [
      `校验状态：${ok ? "通过" : "失败"}`,
      `导入规模：${books.length} 本书，${incomingUnits} 个单元`,
      `当前规模：${srBooks.length} 本书，${srTotalUnits} 个单元`,
      `Book 对比：新增 ${newBooks.length}，移除 ${removedBooks.length}`,
      ...(newBooks.length ? ["新增书：" + newBooks.slice(0, 6).join(", ")] : []),
      ...(removedBooks.length ? ["将被移除书：" + removedBooks.slice(0, 6).join(", ")] : []),
      ...(errors.length ? ["错误：", ...errors.slice(0, 8)] : []),
      ...(warnings.length ? ["警告：", ...warnings.slice(0, 6)] : []),
    ].join("\n");
    setSrValidationOk(ok);
    setSrValidationText(report);
    return ok ? books : null;
  }

  function srImport(mode: "merge" | "replace" = "merge") {
    const books = srValidate();
    if (!books) return;
    let next = books;
    if (mode === "merge") {
      const map = new Map(srBooks.map((b) => [b.book_code, b]));
      books.forEach((b) => map.set(b.book_code, b));
      next = Array.from(map.values());
    }
    setSrBooks(next);
    setSrSource("admin");
    setSrActiveBookCode(next[0]?.book_code ?? "");
    setSrActiveLessonId(next[0]?.units[0]?.lesson_id ?? "");
    setSrImportOpen(false);
    setSrImportText("");
    setSrValidationText("");
    setSrValidationOk(null);
    showToast(mode === "merge" ? "已合并导入" : "已替换导入");
  }

  function srClear() {
    setSrBooks(INITIAL_SR_BOOKS);
    setSrSource("default");
    setSrActiveBookCode(INITIAL_SR_BOOKS[0]?.book_code ?? "");
    setSrActiveLessonId(INITIAL_SR_BOOKS[0]?.units[0]?.lesson_id ?? "");
    setSrConfirmClear(false);
    showToast("已清除");
  }

  function openSrBookEditor() {
    if (!srActiveBook) return;
    setSrBookEditForm(srBookToForm(srActiveBook));
  }

  function saveSrBookEditor() {
    const f = srBookEditForm;
    if (!f) return;
    setSrBooks((prev) =>
      prev.map((b) =>
        b.book_code === f.bookCode
          ? {
              ...b,
              book_title: f.bookTitle,
              cefr_range: f.cefrRange,
              lexile_range: buildLexileRange(f.lexileMin, f.lexileMax),
              word_count_range: f.wordCountRange,
              sort_order: Number(f.sortOrder) || b.sort_order,
              updated_at: f.updatedAt,
              content_license: f.contentLicense,
            }
          : b
      )
    );
    setSrSource("admin");
    setSrBookEditForm(null);
    showToast("已保存");
  }

  function openSrUnitEditor() {
    if (!srActiveUnit) return;
    setSrUnitEditForm(srUnitToForm(srActiveUnit));
  }

  function saveSrUnitEditor() {
    const f = srUnitEditForm;
    if (!f) return;
    setSrBooks((prev) =>
      prev.map((b) => ({
        ...b,
        units: b.units.map((u) =>
          u.lesson_id === f.lessonId
            ? {
                ...u,
                story_title: f.storyTitle,
                cover_question: f.coverQuestion,
                content_license: f.contentLicense,
                reading_focus: f.readingFocus,
                keywords: linesToArr(f.keywordsText),
                target_sentences: linesToArr(f.targetSentencesText),
                speaking_goals: linesToArr(f.speakingGoalsText),
                retelling_frame: f.retellingFrame,
                shirin_opening: f.shirinOpening,
              }
            : u
        ),
      }))
    );
    setSrSource("admin");
    setSrUnitEditForm(null);
    showToast("已保存");
  }

  const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
  const SOFT_BLUE = "#EEF2FA";

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-full pb-12" style={{ color: NAVY }}>
        <div className="sticky top-0 z-30 h-0 pb-[5px]">
          <div className="absolute left-4" style={{ top: "calc(1rem + env(safe-area-inset-top))" }}>
            <Link
              to="/profile"
              aria-label="Back"
              className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" style={{ color: "#0F172A" }} />
            </Link>
          </div>
        </div>

        <div className="px-5 pt-[78px]">
          {/* Mode tabs — hamburger + scrollable tabs + reset in one pill */}
          <div className="mt-4 flex items-center gap-[6px] p-[4px] rounded-full overflow-x-auto no-scrollbar" style={{ background: SOFT_BLUE }}>
            <button
              onClick={() => setNavOpen(true)}
              aria-label="分组导航"
              className="shrink-0 inline-flex items-center justify-center h-[34px] w-[34px] rounded-full transition-all"
              style={{ background: "#fff", color: PAISLEY, boxShadow: "0 2px 8px rgba(1,70,185,0.10)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            {[
              { k: "params", label: "参数管理" },
              { k: "smartReading", label: "Smart Reading" },
            ].map((t) => {
              const active = mode === t.k;
              const accent = t.k === "smartReading" ? YELLOW : PAISLEY;
              return (
                <button
                  key={t.k}
                  onClick={() => setMode(t.k as "params" | "smartReading")}
                  className="shrink-0 flex-1 h-[34px] px-4 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap"
                  style={{
                    background: active ? "#fff" : "transparent",
                    color: active ? accent : SUB,
                    boxShadow: active
                      ? t.k === "smartReading"
                        ? "0 2px 8px rgba(205,174,141,0.30)"
                        : "0 2px 8px rgba(1,70,185,0.10)"
                      : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={() => setConfirmReset(true)}
              aria-label="重置"
              className="shrink-0 inline-flex items-center justify-center h-[34px] w-[34px] rounded-full transition-all"
              style={{ background: "#fff", color: "#D9534F", boxShadow: "0 2px 8px rgba(217,83,79,0.14)" }}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

        {mode === "params" && (
          <>
          {/* Summary stats — height matches the SR status strip */}
          <div className="grid grid-cols-3 gap-[7px] mt-4">
            {summary.map((s) => {
              return (
                <div
                  key={s.label}
                  className="rounded-full px-3.5 py-2.5 flex items-baseline justify-between gap-2"
                  style={{ background: SOFT_BLUE, border: "1px solid #E2EAF6" }}
                >
                  <span className="text-[11px] truncate" style={{ color: SUB }}>{s.label}</span>
                  <span className="text-[13px] font-semibold leading-none shrink-0" style={{ color: NAVY }}>{s.value}</span>
                </div>
              );
            })}
          </div>

          {/* Param cards */}
          <div className="mt-4 space-y-2.5">
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
                  border: `1px solid ${row.customized ? "rgba(1,70,185,0.22)" : "#EEF2F7"}`,
                  overflow: "hidden",
                }}
              >
                {row.customized && (
                  <span className="absolute top-0 left-0 h-full w-[3px]" style={{ background: PAISLEY }} />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-medium leading-tight" style={{ color: NAVY }}>{row.label}</span>
                      {row.customized && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium leading-none"
                          style={{ background: SOFT_BLUE, color: PAISLEY }}
                        >
                          已改
                        </span>
                      )}
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); setHelpFor(row); }}
                        className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full text-[10px] font-medium leading-none"
                        style={{ background: SOFT_BG, color: SUB }}
                      >
                        ?
                      </span>
                    </div>
                    <code
                      className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10.5px] break-all"
                      style={{ background: SOFT_BLUE, color: PAISLEY, fontFamily: MONO }}
                    >
                      {row.path}
                    </code>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0 max-w-[42%]">
                    <div className="text-[13.5px] font-semibold text-right break-all leading-tight" style={{ color: row.customized ? PAISLEY : NAVY }}>{row.valueText}</div>
                    <div className="text-[9.5px]" style={{ color: "#A0AEC0" }}>默认: {row.defaultText}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          </>
        )}

        {mode === "smartReading" && (
          <SRView
            srBooks={srBooks}
            srActiveBook={srActiveBook}
            srActiveUnit={srActiveUnit}
            srActiveBookCode={srActiveBookCode}
            srActiveLessonId={srActiveLessonId}
            srSource={srSource}
            srTotalUnits={srTotalUnits}
            setSrActiveBookCode={setSrActiveBookCode}
            setSrActiveLessonId={setSrActiveLessonId}
            onImport={() => setSrImportOpen(true)}
            onClear={() => setSrConfirmClear(true)}
            onEditBook={openSrBookEditor}
            onEditUnit={openSrUnitEditor}
          />
        )}
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
              className="fixed top-0 left-0 bottom-0 z-50 w-[75%] flex flex-col"
              style={{ background: SOFT_BLUE, boxShadow: "4px 0 24px rgba(11,37,69,0.18)" }}
            >
              <div className="px-5 pt-12 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold leading-tight" style={{ color: NAVY }}>参数分组</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-3">
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
                              style={{ background: active ? "rgba(255,255,255,0.22)" : PAISLEY, color: "#fff" }}
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
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>{editing.label}</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED }}>{editing.path}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>默认：{editing.defaultText}</div>
                </div>

                <div className="mt-4 flex-1 min-h-0 overflow-y-auto">
                  {editing.options && editing.options.length > 0 ? (
                    <div className="flex flex-col gap-2">
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

                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={closeEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold text-white" style={{ background: `linear-gradient(180deg, #0877FF 0%, ${PAISLEY} 100%)` }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR clear confirm */}
        {srConfirmClear && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setSrConfirmClear(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>清除导入内容？</div>
              <div className="text-[13px] mt-2" style={{ color: SUB }}>清除后 Smart Reading 将回到默认代码内容。</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setSrConfirmClear(false)} className="flex-1 h-10 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                <button onClick={srClear} className="flex-1 h-10 rounded-full text-[14px] font-semibold text-white" style={{ background: "#D9534F" }}>清除</button>
              </div>
            </div>
          </div>
        )}

        {/* SR Import sheet */}
        {srImportOpen && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => { setSrImportOpen(false); setSrValidationText(""); setSrValidationOk(null); }} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>导入 Smart Reading JSON</div>
                  <div className="text-[11px] mt-1" style={{ color: MUTED }}>粘贴标准 books 数组或 {`{ books: [...] }`} 对象。</div>
                </div>
                <div className="mt-3 flex-1 min-h-0 overflow-y-auto">
                  <textarea
                    value={srImportText}
                    onChange={(e) => setSrImportText(e.target.value)}
                    placeholder='[{"book_code":"...","book_title":"...","units":[...]}]'
                    className="w-full h-[160px] px-3 py-2 rounded-xl text-[12px] outline-none resize-none"
                    style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO, border: "1px solid #E6ECF5" }}
                  />
                  {srValidationText && (
                    <pre
                      className="mt-2 w-full px-3 py-2 rounded-xl text-[11px] whitespace-pre-wrap"
                      style={{
                        background: srValidationOk === false ? "#FEF2F2" : srValidationOk === true ? "#ECFDF5" : SOFT_BG,
                        color: srValidationOk === false ? "#9F1239" : srValidationOk === true ? "#065F46" : SUB,
                        fontFamily: MONO,
                        border: `1px solid ${srValidationOk === false ? "#FECACA" : srValidationOk === true ? "#A7F3D0" : "#E6ECF5"}`,
                      }}
                    >
                      {srValidationText}
                    </pre>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 shrink-0">
                  <button onClick={() => { setSrImportOpen(false); setSrValidationText(""); setSrValidationOk(null); }} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={srValidate} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: "#fff", color: NAVY, border: `1px solid ${YELLOW_BORDER}` }}>校验</button>
                  <button onClick={() => srImport("replace")} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: "#fff", color: NAVY, border: `1px solid ${YELLOW_BORDER}` }}>替换</button>
                  <button onClick={() => srImport("merge")} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>合并</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR Book editor sheet */}
        {srBookEditForm && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={() => setSrBookEditForm(null)} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>编辑书籍基础信息</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED, fontFamily: MONO }}>{srBookEditForm.bookCode}</div>
                </div>
                <div className="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto">
                  <SRField label="书名">
                    <input value={srBookEditForm.bookTitle} onChange={(e) => setSrBookEditForm({ ...srBookEditForm, bookTitle: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="CEFR">
                    <SRSelect value={srBookEditForm.cefrRange} options={SR_CEFR_OPTIONS} open={srCefrPickerOpen} setOpen={setSrCefrPickerOpen} onChange={(v) => setSrBookEditForm({ ...srBookEditForm, cefrRange: v })} placeholder="请选择 CEFR" />
                  </SRField>
                  <SRField label="Lexile">
                    <div className="flex items-center gap-2">
                      <input
                        inputMode="numeric"
                        placeholder="起始"
                        value={srBookEditForm.lexileMin}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, lexileMin: e.target.value.replace(/[^\d]/g, "") })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px]" style={{ color: MUTED }}>L  —  </span>
                      <input
                        inputMode="numeric"
                        placeholder="结束"
                        value={srBookEditForm.lexileMax}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, lexileMax: e.target.value.replace(/[^\d]/g, "") })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px]" style={{ color: MUTED }}>L</span>
                    </div>
                  </SRField>
                  <SRField label="Words">
                    <input
                      inputMode="numeric"
                      placeholder="例如 100"
                      value={srBookEditForm.wordCountRange}
                      onChange={(e) => setSrBookEditForm({ ...srBookEditForm, wordCountRange: e.target.value.replace(/[^\d]/g, "") })}
                      className="w-full px-3 py-2 rounded-xl text-[14px] outline-none"
                      style={{ background: SOFT_BG, color: NAVY }}
                    />
                  </SRField>
                  <SRField label="排序">
                    <input value={srBookEditForm.sortOrder} onChange={(e) => setSrBookEditForm({ ...srBookEditForm, sortOrder: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="更新日期">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={srBookEditForm.updatedAt}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, updatedAt: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px] tabular-nums" style={{ color: MUTED }}>{toUsShortDate(srBookEditForm.updatedAt) || "mm-dd-yy"}</span>
                    </div>
                  </SRField>
                  <SRField label="授权">
                    <SRSelect value={srBookEditForm.contentLicense} options={SR_LICENSE_OPTIONS} open={srBookLicensePickerOpen} setOpen={setSrBookLicensePickerOpen} onChange={(v) => setSrBookEditForm({ ...srBookEditForm, contentLicense: v })} placeholder="请选择授权" />
                  </SRField>
                </div>
                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={() => setSrBookEditForm(null)} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveSrBookEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR Unit editor sheet */}
        {srUnitEditForm && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={() => setSrUnitEditForm(null)} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>编辑单元</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED, fontFamily: MONO }}>{srUnitEditForm.lessonId}</div>
                </div>
                <div className="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto">
                  <SRField label="标题">
                    <input value={srUnitEditForm.storyTitle} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, storyTitle: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="封面问题 Cover Question">
                    <input value={srUnitEditForm.coverQuestion} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, coverQuestion: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="授权">
                    <SRSelect value={srUnitEditForm.contentLicense} options={SR_LICENSE_OPTIONS} open={srLicensePickerOpen} setOpen={setSrLicensePickerOpen} onChange={(v) => setSrUnitEditForm({ ...srUnitEditForm, contentLicense: v as SRUnit["content_license"] })} placeholder="请选择授权" />
                  </SRField>
                  <SRField label="Reading Focus">
                    <input value={srUnitEditForm.readingFocus} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, readingFocus: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="Keywords（每行一个）">
                    <textarea value={srUnitEditForm.keywordsText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, keywordsText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Target Sentences（每行一个）">
                    <textarea value={srUnitEditForm.targetSentencesText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, targetSentencesText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Speaking Goals（每行一个）">
                    <textarea value={srUnitEditForm.speakingGoalsText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, speakingGoalsText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Retelling Frame">
                    <input value={srUnitEditForm.retellingFrame} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, retellingFrame: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="Shirin Opening">
                    <input value={srUnitEditForm.shirinOpening} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, shirinOpening: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                </div>
                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={() => setSrUnitEditForm(null)} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveSrUnitEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

function SRField(props: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] font-medium mb-1" style={{ color: "#50627A" }}>{props.label}</div>
      {props.children}
    </div>
  );
}

function SRSelect(props: {
  value: string;
  options: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  const NAVY_C = "#0B2545";
  const MUTED_C = "#8A97A6";
  const PAISLEY_C = "#0146B9";
  const SOFT_BG_C = "#F6F8FC";
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => props.setOpen(!props.open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[14px]"
        style={{ background: SOFT_BG_C, color: props.value ? NAVY_C : MUTED_C }}
      >
        <span>{props.value ? `${props.value}${props.suffix ? " " + props.suffix : ""}` : props.placeholder || "请选择"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: MUTED_C, transform: props.open ? "rotate(180deg)" : undefined, transition: "transform 0.15s" }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {props.open && (
        <div className="absolute z-10 left-0 right-0 mt-1 max-h-[200px] overflow-y-auto rounded-xl bg-white" style={{ border: "1px solid #E6ECF5", boxShadow: "0 8px 24px rgba(11,37,69,0.10)" }}>
          {props.options.map((o) => {
            const active = o === props.value;
            return (
              <button
                key={o}
                type="button"
                onClick={() => { props.onChange(o); props.setOpen(false); }}
                className="w-full text-left px-3 py-2 text-[13px]"
                style={{ background: active ? "#EAF3FF" : "transparent", color: active ? PAISLEY_C : NAVY_C, fontWeight: active ? 700 : 500 }}
              >
                {o}{props.suffix ? " " + props.suffix : ""}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
