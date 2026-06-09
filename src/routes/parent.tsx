import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronDown, HelpCircle } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Page — Paisley EC" }] }),
  component: ParentPage,
});

// ---- Mock data (mirrors /progress) ----
const TALK_STATS = {
  cards: [
    { key: "time_spent", title: "Time Spent", value: "908", unit: "min", meta: "37 this week" },
    { key: "sessions", title: "Sessions", value: "62", unit: "", meta: "5 this week" },
    { key: "talk_words", title: "Talk Words", value: "4,210", unit: "", meta: "186 this week" },
  ],
  goals: {
    week: { done: 37, total: 100, unit: "min" },
    month: { done: 168, total: 400, unit: "min" },
    year: { done: 640, total: 1000, unit: "min" },
    total: "908 min",
  },
  trend: {
    week: [12, 0, 18, 9, 22, 0, 37],
    month: Array.from({ length: 30 }, (_, i) => Math.round(8 + 12 * Math.sin(i / 2.3) + (i % 4 === 0 ? 6 : 0))),
    year: [40, 55, 72, 60, 80, 95, 70, 88, 110, 130, 120, 168],
  },
};

const WORDIE_STATS = {
  cards: [
    { key: "time_spent", title: "Time Spent", value: "320", unit: "min", meta: "18 this week" },
    { key: "words", title: "Word Cards", value: "260", unit: "", meta: "64% mastered" },
    { key: "tests", title: "Wordie Tests", value: "18", unit: "", meta: "Avg 86%" },
  ],
  goals: {
    week: { done: 12, total: 20, unit: "cards" },
    month: { done: 86, total: 200, unit: "cards" },
    year: { done: 340, total: 1000, unit: "cards" },
    total: "438 cards",
  },
  trend: {
    week: [3, 0, 2, 4, 0, 1, 2],
    month: Array.from({ length: 30 }, (_, i) => Math.max(0, Math.round(4 + 3 * Math.cos(i / 1.8)))),
    year: [18, 22, 30, 28, 36, 40, 32, 38, 45, 52, 48, 86],
  },
};

const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const VOICE_OPTIONS = [
  { id: "monica-standard", name: "Mónica Standard", group: "current" },
  { id: "jorge-enhanced", name: "Jorge Enhanced", group: "recommended" },
  { id: "marisol-premium", name: "Marisol Premium", group: "recommended" },
  { id: "monica-enhanced", name: "Mónica Enhanced", group: "recommended" },
  { id: "eddy-standard", name: "Eddy Standard", group: "installed" },
  { id: "flo-standard", name: "Flo Standard", group: "installed" },
];

const THEME_OPTIONS = [
  { id: "system", label: "跟随系统" },
  { id: "light", label: "浅色" },
  { id: "dark", label: "深色" },
];

const PAISLEY = "var(--paisley)";
const SHIRIN = "var(--shirin)";
const WORDIE = "var(--wordie)";

type ProgressTab = "talk" | "wordie";
type TrendMode = "week" | "month" | "year";
type SheetType = "" | "voice" | "theme" | "speechRate";

function ParentPage() {
  const [tab, setTab] = useState<ProgressTab>("talk");
  const [trendMode, setTrendMode] = useState<TrendMode>("week");
  const [open, setOpen] = useState({
    settingTalk: true,
    settingWordie: true,
    wordieX: true,
    wordieXList: false,
    general: true,
  });
  const toggle = (k: keyof typeof open) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  // Mock editable values
  const [talkGoals, setTalkGoals] = useState({ week: 100, month: 400, year: 1000 });
  const [dailyPlan, setDailyPlan] = useState({ dailyCards: 5, dailyMinutes: 10 });
  const [wordieGoals, setWordieGoals] = useState({ week: 20, month: 200, year: 1000 });

  const [prefs, setPrefs] = useState({
    voiceName: "Mónica Standard",
    voiceId: "monica-standard",
    speechRate: 0.8,
    theme: "light",
    autoPlayWordAudio: true,
    autoPlayExampleAudio: true,
    hapticFeedback: true,
    dailyStudyReminder: false,
    reminderTime: "20:00",
    streakReminder: false,
  });

  const [sheet, setSheet] = useState<{ type: SheetType; title: string }>({ type: "", title: "" });

  const stats = tab === "talk" ? TALK_STATS : WORDIE_STATS;
  const accent = tab === "talk" ? SHIRIN : WORDIE;
  const accentSoft =
    tab === "talk"
      ? "color-mix(in oklab, var(--shirin) 12%, white)"
      : "color-mix(in oklab, var(--wordie) 12%, white)";
  const goalTones = {
    week: accent,
    month: `color-mix(in oklab, ${accent} 70%, white)`,
    year: `color-mix(in oklab, ${accent} 45%, white)`,
  };
  const trendSeries = stats.trend[trendMode];
  const axisLabels =
    trendMode === "week"
      ? WEEK_LABELS.map((d) => d[0])
      : trendMode === "year"
        ? MONTH_LABELS.map((m) => m[0])
        : Array.from({ length: trendSeries.length }, (_, i) =>
            [0, 7, 14, 21, 28].includes(i) ? String(i + 1) : "",
          );

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white pb-24">
        {/* Back */}
        <div className="absolute top-4 left-4 z-30">
          <Link
            to="/profile"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[oklch(0.95_0.02_10)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Header */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-semibold tracking-tight"
            style={{ color: PAISLEY, fontFamily: "var(--font-sans)" }}
          >
            Parent Page
          </h1>
        </section>

        {/* Source tabs (segmented pill, same as /progress) */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[oklch(0.96_0.01_240)]">
            {(["talk", "wordie"] as const).map((k) => {
              const active = tab === k;
              const c = k === "talk" ? SHIRIN : WORDIE;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className="h-9 rounded-full text-[13px] font-bold transition-colors"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? c : "color-mix(in oklab, var(--foreground) 55%, white)",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined,
                  }}
                >
                  {k === "talk" ? "ShirinTalk" : "myWordie"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stat cards */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {stats.cards.map((c) => (
              <div
                key={c.key}
                className="rounded-2xl p-3 flex flex-col justify-between min-h-[88px]"
                style={{ background: accentSoft }}
              >
                <p
                  className="text-[11px] font-bold leading-none"
                  style={{ color: accent, letterSpacing: "-0.01em" }}
                >
                  {c.title}
                </p>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[22px] font-bold leading-none"
                      style={{ color: accent, letterSpacing: "-0.02em" }}
                    >
                      {c.value}
                    </span>
                    {c.unit && (
                      <span className="text-[11px] font-bold leading-none" style={{ color: accent }}>
                        {c.unit}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-1 text-[10px] font-medium leading-none"
                    style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
                  >
                    {c.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trend panel */}
        <section className="px-6 pt-4">
          <div className="rounded-2xl p-4 border border-[oklch(0.94_0.01_240)]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold" style={{ color: "var(--foreground)" }}>
                Trend
              </p>
              <div className="flex gap-1 p-0.5 rounded-full bg-[oklch(0.96_0.01_240)]">
                {(["week", "month", "year"] as const).map((m) => {
                  const active = trendMode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTrendMode(m)}
                      className="px-2.5 h-6 rounded-full text-[11px] font-bold transition-colors"
                      style={{
                        background: active ? "white" : "transparent",
                        color: active ? accent : "color-mix(in oklab, var(--foreground) 55%, white)",
                      }}
                    >
                      {m === "week" ? "Week" : m === "month" ? "Month" : "Year"}
                    </button>
                  );
                })}
              </div>
            </div>
            <TrendChart values={trendSeries} labels={axisLabels} accent={accent} />
          </div>
        </section>

        {/* Goal rings */}
        <section className="px-6 pt-4">
          <div className="rounded-2xl p-4 border border-[oklch(0.94_0.01_240)]">
            <p className="text-[13px] font-bold" style={{ color: "var(--foreground)" }}>
              Goals
            </p>
            <div className="mt-3 flex items-center gap-4">
              <GoalRing
                year={stats.goals.year}
                month={stats.goals.month}
                week={stats.goals.week}
                tones={goalTones}
              />
              <div className="flex-1 space-y-2">
                <GoalRow tone={goalTones.week} label="Week" done={stats.goals.week.done} total={stats.goals.week.total} unit={stats.goals.week.unit} />
                <GoalRow tone={goalTones.month} label="Month" done={stats.goals.month.done} total={stats.goals.month.total} unit={stats.goals.month.unit} />
                <GoalRow tone={goalTones.year} label="Year" done={stats.goals.year.done} total={stats.goals.year.total} unit={stats.goals.year.unit} />
                <div className="pt-1 text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                  Up to Now · {stats.goals.total}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 管理 */}
        <SectionTitle>管理</SectionTitle>

        {/* ShirinTalk 目标 */}
        <Collapsible
          open={open.settingTalk}
          onToggle={() => toggle("settingTalk")}
          title="ShirinTalk 目标"
          accent={SHIRIN}
        >
          <div className="space-y-2">
            {(["week", "month", "year"] as const).map((k) => (
              <NumberRow
                key={k}
                label={k === "week" ? "本周" : k === "month" ? "本月" : "今年"}
                value={talkGoals[k]}
                unit="min"
                onChange={(v) => setTalkGoals((g) => ({ ...g, [k]: v }))}
              />
            ))}
          </div>
        </Collapsible>

        {/* myWordie 每日计划 + 目标 */}
        <Collapsible
          open={open.settingWordie}
          onToggle={() => toggle("settingWordie")}
          title="myWordie 每日计划 / 目标"
          accent={WORDIE}
        >
          <p className="text-[12px] font-bold mb-2" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
            每日计划
          </p>
          <div className="space-y-2 mb-3">
            <NumberRow
              label="每天卡片"
              value={dailyPlan.dailyCards}
              unit="cards"
              onChange={(v) => setDailyPlan((p) => ({ ...p, dailyCards: v }))}
            />
            <NumberRow
              label="每天时长"
              value={dailyPlan.dailyMinutes}
              unit="min"
              onChange={(v) => setDailyPlan((p) => ({ ...p, dailyMinutes: v }))}
            />
          </div>
          <p className="text-[12px] font-bold mb-2" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
            周/月/年目标
          </p>
          <div className="space-y-2">
            {(["week", "month", "year"] as const).map((k) => (
              <NumberRow
                key={k}
                label={k === "week" ? "本周" : k === "month" ? "本月" : "今年"}
                value={wordieGoals[k]}
                unit="cards"
                onChange={(v) => setWordieGoals((g) => ({ ...g, [k]: v }))}
              />
            ))}
          </div>
        </Collapsible>

        {/* Wordie-X */}
        <Collapsible
          open={open.wordieX}
          onToggle={() => toggle("wordieX")}
          title="Wordie-X"
          accent={WORDIE}
        >
          <WordieXCard
            word="serendipity"
            status="Focus"
            focus
            partOfSpeech="n."
            cefrLevel="C1"
            source="ShirinTalk"
            mastery={62}
            nextReview="明天 20:00"
          />
          {open.wordieXList && (
            <div className="mt-2 space-y-2">
              <WordieXCard
                word="meticulous"
                status="Review"
                partOfSpeech="adj."
                cefrLevel="B2"
                source="iAdded"
                mastery={48}
                nextReview="今天 20:00"
              />
              <WordieXCard
                word="resilient"
                status="Learning"
                partOfSpeech="adj."
                cefrLevel="B2"
                source="Example"
                mastery={28}
                nextReview="2 天后"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => toggle("wordieXList")}
            className="mt-3 w-full h-9 rounded-full text-[12px] font-bold"
            style={{
              color: WORDIE,
              background: "color-mix(in oklab, var(--wordie) 8%, white)",
            }}
          >
            {open.wordieXList ? "收起列表" : "展开全部"}
          </button>
        </Collapsible>

        {/* 设置 */}
        <SectionTitle>设置</SectionTitle>

        <Collapsible
          open={open.general}
          onToggle={() => toggle("general")}
          title="偏好设置"
          accent={PAISLEY}
        >
          <div className="space-y-1">
            <PrefRow
              label="音色"
              value={prefs.voiceName}
              onClick={() => setSheet({ type: "voice", title: "音色" })}
            />
            <PrefRow
              label="语速"
              value={prefs.speechRate.toFixed(1) + "×"}
              onClick={() => setSheet({ type: "speechRate", title: "语速" })}
            />
            <PrefRow
              label="主题"
              value={THEME_OPTIONS.find((t) => t.id === prefs.theme)?.label ?? "浅色"}
              onClick={() => setSheet({ type: "theme", title: "主题" })}
            />
            <SwitchRow
              label="自动播放音频"
              checked={prefs.autoPlayWordAudio}
              onChange={(v) => setPrefs((p) => ({ ...p, autoPlayWordAudio: v }))}
            />
            <SwitchRow
              label="自动播放例句"
              checked={prefs.autoPlayExampleAudio}
              onChange={(v) => setPrefs((p) => ({ ...p, autoPlayExampleAudio: v }))}
            />
            <SwitchRow
              label="触感反馈"
              info
              checked={prefs.hapticFeedback}
              onChange={(v) => setPrefs((p) => ({ ...p, hapticFeedback: v }))}
            />
            <SwitchRow
              label="每日学习提醒"
              checked={prefs.dailyStudyReminder}
              onChange={(v) => setPrefs((p) => ({ ...p, dailyStudyReminder: v }))}
            />
            {prefs.dailyStudyReminder && (
              <div className="flex items-center justify-between py-2.5 px-1">
                <span className="text-[14px] font-bold">提醒时间</span>
                <input
                  type="time"
                  value={prefs.reminderTime}
                  onChange={(e) => setPrefs((p) => ({ ...p, reminderTime: e.target.value }))}
                  className="bg-transparent text-[14px] font-bold outline-none"
                  style={{ color: PAISLEY }}
                />
              </div>
            )}
            <SwitchRow
              label="连续天数提醒"
              checked={prefs.streakReminder}
              onChange={(v) => setPrefs((p) => ({ ...p, streakReminder: v }))}
            />
            <PrefRow label="评价应用" value="" onClick={() => {}} />
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[14px] font-bold">版本</span>
              <span className="text-[13px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                1.0.0
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[14px] font-bold">Admin Rules</span>
              <span className="text-[13px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                —
              </span>
            </div>
          </div>
        </Collapsible>

        {/* Bottom sheet */}
        {sheet.type && (
          <BottomSheet title={sheet.title} onClose={() => setSheet({ type: "", title: "" })}>
            {sheet.type === "voice" && (
              <VoiceSheet
                currentId={prefs.voiceId}
                onPick={(v) => {
                  setPrefs((p) => ({ ...p, voiceId: v.id, voiceName: v.name }));
                  setSheet({ type: "", title: "" });
                }}
              />
            )}
            {sheet.type === "theme" && (
              <ThemeSheet
                value={prefs.theme}
                onPick={(id) => {
                  setPrefs((p) => ({ ...p, theme: id }));
                  setSheet({ type: "", title: "" });
                }}
              />
            )}
            {sheet.type === "speechRate" && (
              <SpeechRateSheet
                value={prefs.speechRate}
                onChange={(v) => setPrefs((p) => ({ ...p, speechRate: v }))}
              />
            )}
          </BottomSheet>
        )}
      </div>
    </PhoneFrame>
  );
}

// ============ small components ============

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="px-6 pt-6 pb-2 text-[13px] font-bold uppercase tracking-wide"
      style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)", fontFamily: "var(--font-sans)" }}
    >
      {children}
    </h2>
  );
}

// ---- Trend chart (mirrors /progress) ----
function TrendChart({ values, labels, accent }: { values: number[]; labels: string[]; accent: string }) {
  const W = 300;
  const H = 120;
  const PAD_X = 8;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 22;
  const max = Math.max(1, ...values);
  const stepX = values.length > 1 ? (W - PAD_X * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => {
    const x = PAD_X + i * stepX;
    const y = PAD_TOP + (1 - v / max) * (H - PAD_TOP - PAD_BOTTOM);
    return { x, y, v };
  });
  const path = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
  }, "");
  const areaPath = `${path} L ${points[points.length - 1].x} ${H - PAD_BOTTOM} L ${points[0].x} ${H - PAD_BOTTOM} Z`;
  const guideYs = [0.25, 0.5, 0.75].map((p) => PAD_TOP + p * (H - PAD_TOP - PAD_BOTTOM));
  const gradId = useMemo(() => `parentTrendFill-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[120px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {guideYs.map((y, i) => (
        <line key={i} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="oklch(0.94 0.01 240)" strokeWidth={1} />
      ))}
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={accent} />
      ))}
      {labels.map((lab, i) =>
        lab ? (
          <text
            key={i}
            x={PAD_X + i * stepX}
            y={H - 6}
            textAnchor="middle"
            fontSize={9}
            fontWeight={600}
            fill="color-mix(in oklab, currentColor 55%, white)"
            style={{ color: "var(--foreground)" }}
          >
            {lab}
          </text>
        ) : null,
      )}
    </svg>
  );
}

function GoalRing({
  year,
  month,
  week,
  tones,
}: {
  year: { done: number; total: number };
  month: { done: number; total: number };
  week: { done: number; total: number };
  tones: { week: string; month: string; year: string };
}) {
  const SIZE = 112;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const rings = [
    { r: 48, tone: tones.year, pct: clampPct(year.done / year.total) },
    { r: 36, tone: tones.month, pct: clampPct(month.done / month.total) },
    { r: 24, tone: tones.week, pct: clampPct(week.done / week.total) },
  ];
  const STROKE = 8;
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0">
      {rings.map((r, i) => {
        const C = 2 * Math.PI * r.r;
        return (
          <g key={i} transform={`rotate(-90 ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={r.r} fill="none" stroke="oklch(0.95 0.01 240)" strokeWidth={STROKE} />
            <circle
              cx={cx}
              cy={cy}
              r={r.r}
              fill="none"
              stroke={r.tone}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${C * r.pct} ${C}`}
            />
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
        {Math.round(clampPct(week.done / week.total) * 100)}%
      </text>
    </svg>
  );
}

function GoalRow({ tone, label, done, total, unit }: { tone: string; label: string; done: number; total: number; unit: string }) {
  const pct = Math.round(clampPct(done / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span style={{ color: tone }}>{label}</span>
        <span style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
          {done} / {total} {unit}
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.95 0.01 240)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} />
      </div>
    </div>
  );
}

function clampPct(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function Collapsible({
  open,
  onToggle,
  title,
  accent,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 pt-3">
      <div
        className="rounded-2xl"
        style={{ background: "white", border: `1px solid color-mix(in oklab, ${accent} 18%, white)` }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <span className="text-[14px] font-bold" style={{ color: accent }}>
            {title}
          </span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none", color: accent }}
          />
        </button>
        {open && <div className="px-4 pb-4 pt-1">{children}</div>}
      </div>
    </section>
  );
}

function NumberRow({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-[13px] font-bold">{label}</span>
      <div className="flex items-baseline gap-1">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => {
            const n = Math.max(0, Math.round(Number(e.target.value) || 0));
            onChange(n);
          }}
          className="w-20 bg-transparent text-right text-[15px] font-bold outline-none border-b border-border focus:border-[color:var(--paisley)] py-0.5"
        />
        <span className="text-[12px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

function PrefRow({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-2.5 px-1 text-left"
    >
      <span className="text-[14px] font-bold">{label}</span>
      <span className="text-[13px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
        {value}
        <ChevronDown className="inline h-4 w-4 -rotate-90 ml-1 align-[-2px]" />
      </span>
    </button>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
  info,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  info?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 px-1">
      <span className="text-[14px] font-bold flex items-center gap-1">
        {label}
        {info && <HelpCircle className="h-3.5 w-3.5 opacity-50" />}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: checked ? PAISLEY : "color-mix(in oklab, var(--foreground) 18%, white)" }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? 22 : 2 }}
        />
      </button>
    </div>
  );
}

function WordieXCard({
  word,
  status,
  focus,
  partOfSpeech,
  cefrLevel,
  source,
  mastery,
  nextReview,
}: {
  word: string;
  status: "New" | "Learning" | "Review" | "Focus" | "Mastered" | "Relearning";
  focus?: boolean;
  partOfSpeech: string;
  cefrLevel: string;
  source: "iAdded" | "Example" | "ShirinTalk";
  mastery: number;
  nextReview: string;
}) {
  const [isFocus, setIsFocus] = useState(!!focus);
  const [isReview, setIsReview] = useState(status === "Review");
  const statusLabel: Record<string, string> = {
    New: "新词",
    Learning: "学习中",
    Review: "复习",
    Focus: "重点",
    Mastered: "已掌握",
    Relearning: "重新学",
  };
  return (
    <div
      className="rounded-2xl p-3"
      style={{ background: "color-mix(in oklab, var(--wordie) 6%, white)", border: "1px solid color-mix(in oklab, var(--wordie) 18%, white)" }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[18px] font-bold" style={{ color: WORDIE }}>
          {word}
        </span>
        <span className="text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {partOfSpeech} · {cefrLevel} · {source}
        </span>
      </div>
      <div className="flex gap-1.5 mt-1.5">
        <Pill color="var(--wordie)">{statusLabel[status]}</Pill>
        {isFocus && <Pill color="var(--paisley)">重点</Pill>}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
        <span>掌握度 {mastery}%</span>
        <span>下次复习 · {nextReview}</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <ActionPill onClick={() => setIsFocus((v) => !v)} active={isFocus} color="var(--paisley)">
          {isFocus ? "移除重点" : "加入重点"}
        </ActionPill>
        <ActionPill onClick={() => setIsReview((v) => !v)} active={isReview} color="var(--wordie)">
          {isReview ? "移除复习" : "移入复习"}
        </ActionPill>
        <ActionPill onClick={() => {}} color="var(--shirin)">
          重置
        </ActionPill>
      </div>
    </div>
  );
}

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="px-2 h-5 rounded-full text-[10px] font-bold inline-flex items-center"
      style={{ background: `color-mix(in oklab, ${color} 14%, white)`, color }}
    >
      {children}
    </span>
  );
}

function ActionPill({
  active,
  color,
  children,
  onClick,
}: {
  active?: boolean;
  color: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-7 rounded-full text-[11px] font-bold"
      style={{
        background: active ? color : `color-mix(in oklab, ${color} 10%, white)`,
        color: active ? "white" : color,
      }}
    >
      {children}
    </button>
  );
}

function BottomSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-5 pb-8 shadow-2xl">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-[oklch(0.9_0.01_240)] mb-3" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-bold">{title}</h3>
          <button type="button" onClick={onClose} className="text-[13px] font-bold" style={{ color: PAISLEY }}>
            完成
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function VoiceSheet({ currentId, onPick }: { currentId: string; onPick: (v: { id: string; name: string }) => void }) {
  const groups: { key: string; label: string }[] = [
    { key: "current", label: "当前音色" },
    { key: "recommended", label: "推荐音色" },
    { key: "installed", label: "已安装音色" },
  ];
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-[11px] font-bold uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
            {g.label}
          </p>
          <div className="space-y-1">
            {VOICE_OPTIONS.filter((v) => v.group === g.key).map((v) => {
              const active = v.id === currentId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onPick({ id: v.id, name: v.name })}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left"
                  style={{
                    background: active ? "color-mix(in oklab, var(--paisley) 10%, white)" : "transparent",
                    color: active ? PAISLEY : "var(--foreground)",
                  }}
                >
                  <span className="text-[14px] font-bold">{v.name}</span>
                  {active && <span className="text-[12px] font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ThemeSheet({ value, onPick }: { value: string; onPick: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {THEME_OPTIONS.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.id)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left"
            style={{
              background: active ? "color-mix(in oklab, var(--paisley) 10%, white)" : "transparent",
              color: active ? PAISLEY : "var(--foreground)",
            }}
          >
            <span className="text-[14px] font-bold">{t.label}</span>
            {active && <span className="text-[12px] font-bold">✓</span>}
          </button>
        );
      })}
    </div>
  );
}

function SpeechRateSheet({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[13px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          当前
        </span>
        <span className="text-[20px] font-bold" style={{ color: PAISLEY }}>
          {value.toFixed(1)}×
        </span>
      </div>
      <input
        type="range"
        min={0.6}
        max={1.4}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--paisley)]"
      />
      <div className="flex justify-between text-[11px] font-bold mt-1" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
        <span>0.6×</span>
        <span>1.0×</span>
        <span>1.4×</span>
      </div>
    </div>
  );
}
