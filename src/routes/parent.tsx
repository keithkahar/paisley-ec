import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronDown, HelpCircle } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Page — Paisley EC" }] }),
  component: ParentPage,
});

// ---- Mock data (parent-specific mini cards, per spec §7/§8) ----
type Cell = { label: string; value: string; unit: string };
type RingCell = Cell & { pct: number };
type SeriesLayout = {
  weekly: { topExtra?: Cell; hero: Cell; sides: Cell[] };
  status?: Cell[];
  misc: Cell[];
  ring: RingCell;
};

const TALK_DATA: SeriesLayout = {
  weekly: {
    hero: { label: "本周对话时长", value: "37", unit: "min" },
    sides: [
      { label: "本周发言轮次", value: "84", unit: "次" },
      { label: "本周对话用词", value: "186", unit: "词" },
    ],
  },
  misc: [
    { label: "连续练习", value: "12", unit: "天" },
    { label: "主动提问", value: "11", unit: "次" },
    { label: "完整表达", value: "9", unit: "次" },
  ],
  ring: { label: "目标词使用", value: "70", unit: "%", pct: 70 },
};

const WORDIE_DATA: SeriesLayout = {
  weekly: {
    topExtra: { label: "连续练习", value: "8", unit: "天" },
    hero: { label: "本周练习时长", value: "18", unit: "min" },
    sides: [
      { label: "本周练习卡片", value: "42", unit: "张" },
      { label: "本周 myWordie Talk 用词", value: "23", unit: "次" },
    ],
  },
  status: [
    { label: "已掌握", value: "166", unit: "词" },
    { label: "复习", value: "38", unit: "词" },
    { label: "学习中", value: "42", unit: "词" },
    { label: "新词", value: "14", unit: "词" },
  ],
  misc: [
    { label: "Wordie-X 收录", value: "26", unit: "词" },
  ],
  ring: { label: "Wordie Test 平均分", value: "86", unit: "%", pct: 86 },
};

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
type SheetType = "" | "voice" | "theme" | "speechRate";

function ParentPage() {
  const [tab, setTab] = useState<ProgressTab>("talk");
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

  const data = tab === "talk" ? TALK_DATA : WORDIE_DATA;
  const accent = tab === "talk" ? SHIRIN : WORDIE;
  const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, white)`;

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

        {/* Mini cards — grouped: weekly+status combined · highlights */}
        <section className="px-6 pt-4 space-y-4">
          {/* 本周数据 (left, 3 cards) + 单词状态 (right, 4 cards) — 上下对齐 */}
          <div>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <SeriesHeader title="本周数据" accent={accent} />
              {data.status && <SeriesHeader title="单词状态" accent={accent} />}
            </div>
            <div
              className="grid gap-2.5 items-stretch"
              style={{ gridTemplateColumns: data.status ? "3fr 2fr" : "1fr" }}
            >
              {/* Left column — 3 weekly cards stacked */}
              <div className="flex flex-col gap-2.5">
                {/* Hero */}
                <div
                  className="flex-1 rounded-3xl p-4 flex flex-col justify-between text-white relative overflow-hidden min-h-[96px]"
                  style={{ background: accent, boxShadow: `0 10px 24px -12px ${accent}` }}
                >
                  <span className="text-[11px] font-bold opacity-90">{data.weekly.hero.label}</span>
                  <div className="flex items-baseline">
                    <span className="text-[32px] font-bold tracking-tight leading-none">
                      {data.weekly.hero.value}
                    </span>
                    <span className="ml-1 text-[13px] font-bold opacity-80">
                      {data.weekly.hero.unit}
                    </span>
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/15 blur-xl" />
                </div>
                {/* Sides */}
                {data.weekly.sides.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl p-3 flex flex-col justify-between min-h-[72px]"
                    style={{ background: tint(10), border: `1px solid ${tint(20)}` }}
                  >
                    <span className="text-[11px] font-bold leading-tight" style={{ color: tint(70) }}>
                      {c.label}
                    </span>
                    <div className="flex items-baseline">
                      <span className="text-[22px] font-bold leading-none" style={{ color: accent }}>
                        {c.value}
                      </span>
                      <span className="text-[11px] ml-0.5 font-bold" style={{ color: tint(70) }}>
                        {c.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column — 4 status cards stacked */}
              {data.status && (
                <div className="flex flex-col gap-2.5">
                  {data.status.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-2xl p-3 bg-white border border-[oklch(0.94_0.01_240)] flex flex-col justify-between min-h-[56px]"
                    >
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}
                      >
                        {c.label}
                      </span>
                      <div className="flex items-baseline">
                        <span
                          className="text-[22px] font-bold leading-none tracking-tight"
                          style={{ color: "var(--foreground)" }}
                        >
                          {c.value}
                        </span>
                        <span
                          className="text-[10px] ml-1 font-bold"
                          style={{ color: "color-mix(in oklab, var(--foreground) 45%, white)" }}
                        >
                          {c.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 亮点 / 其他 — ring 卡（满意的样式）+ 分散 misc */}
          <div>
            <SeriesHeader title="亮点" accent={accent} />
            <div className="grid grid-cols-2 gap-2.5">
              {/* Ring card — favorite style */}
              <div
                className="row-span-2 rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[164px]"
                style={{ background: tint(12) }}
              >
                <span className="text-[11px] font-bold mb-3" style={{ color: accent }}>
                  {data.ring.label}
                </span>
                <div className="relative w-[92px] h-[92px] grid place-items-center">
                  <svg viewBox="0 0 92 92" className="absolute inset-0 -rotate-90">
                    <circle cx="46" cy="46" r="38" stroke="white" strokeWidth="8" fill="none" />
                    <circle
                      cx="46"
                      cy="46"
                      r="38"
                      stroke={accent}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(data.ring.pct / 100) * 2 * Math.PI * 38} ${2 * Math.PI * 38}`}
                    />
                  </svg>
                  <span className="text-[22px] font-bold leading-none relative" style={{ color: accent }}>
                    {data.ring.value}
                    <span className="text-[11px] ml-0.5 font-bold">{data.ring.unit}</span>
                  </span>
                </div>
              </div>
              {/* Misc tiles stacked */}
              {data.misc.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-3.5 bg-white border border-[oklch(0.94_0.01_240)] flex items-center justify-between"
                >
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
                  >
                    {c.label}
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-[20px] font-bold leading-none" style={{ color: accent }}>
                      {c.value}
                    </span>
                    <span className="text-[10px] ml-0.5 font-bold" style={{ color: tint(70) }}>
                      {c.unit}
                    </span>
                  </div>
                </div>
              ))}
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

function SeriesHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 mb-2 px-1">
      <span className="w-1 h-3 rounded-full" style={{ background: accent }} />
      <p
        className="text-[11px] font-bold uppercase tracking-[0.08em]"
        style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
      >
        {title}
      </p>
    </div>
  );
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
