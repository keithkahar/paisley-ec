import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import { PARENT_UNLOCK_FLAG } from "@/components/app/ParentPinSheet";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [
      { title: "Parent Page — Paisley EC" },
      { name: "description", content: "A weekly snapshot for parents: time, words and tests at a glance." },
      { property: "og:title", content: "Parent Page — Paisley EC" },
      { property: "og:description", content: "A weekly snapshot for parents: time, words and tests at a glance." },
    ] }),
  component: ParentPage,
});

// ---- Parent PIN gate ----
const PIN_STORAGE_KEY = "paisley.parent.pin";
const PIN_SESSION_KEY = "paisley.parent.unlocked";

function ParentPinGate({ onUnlock }: { onUnlock: () => void }) {
  const [mode, setMode] = useState<"set" | "enter" | "loading">("loading");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(PIN_STORAGE_KEY) : null;
    setMode(saved ? "enter" : "set");
  }, []);

  const isSet = mode === "set";
  const sanitize = (s: string) => s.replace(/[^A-Za-z0-9]/g, "").slice(0, 6);

  const handleSubmit = () => {
    setError("");
    if (isSet) {
      if (pin.length !== 6 || !/[A-Za-z]/.test(pin) || !/\d/.test(pin))
        return setError("密码需为 6 位，且由字母与数字组合");
      if (pin !== confirmPin) return setError("两次输入的密码不一致");
      localStorage.setItem(PIN_STORAGE_KEY, pin);
      onUnlock();
    } else {
      const saved = localStorage.getItem(PIN_STORAGE_KEY);
      if (pin === saved) {
        onUnlock();
      } else {
        setError("密码不正确");
      }
    }
  };

  if (mode === "loading") return null;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
        <FloatingBack to="/profile" />

        {/* Bottom sheet — wordie-bank filter style */}
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
          >
            {/* Grabber */}
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-center px-5 pt-2 pb-3 shrink-0">
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: PAISLEY }}
              >
                {isSet ? "设置家长密码" : "请输入家长密码"}
              </p>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => history.back()}
                className="absolute right-4 top-3 h-8 w-8 grid place-items-center rounded-full transition-colors active:scale-95"
                style={{ background: "color-mix(in oklab, var(--foreground) 6%, white)", color: "color-mix(in oklab, var(--foreground) 60%, white)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <p
                className="text-[12px] leading-[1.55] text-center"
                style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
              >
                {isSet ? (
                  <>
                    请设置 6 位由字母和数字组合的密码
                    <br />
                    此密码用于避免儿童误入家长中心
                  </>
                ) : (
                  "此密码用于避免儿童误入家长中心"
                )}
              </p>

              <div className="mt-5 space-y-3">
                <PinInput
                  label="密码"
                  value={pin}
                  onChange={(v) => setPin(sanitize(v))}
                  autoFocus
                />
                {isSet && (
                  <PinInput
                    label="确认"
                    value={confirmPin}
                    onChange={(v) => setConfirmPin(sanitize(v))}
                  />
                )}
              </div>

              {error && (
                <p
                  className="mt-3 text-[12px] font-semibold text-center"
                  style={{ color: "var(--destructive)" }}
                >
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-6 w-full h-11 rounded-full text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
                style={{ background: PAISLEY }}
              >
                {isSet ? "设置密码" : "解锁"}
              </button>

              {!isSet && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(PIN_STORAGE_KEY);
                    setPin("");
                    setConfirmPin("");
                    setError("");
                    setMode("set");
                  }}
                  className="mt-3 w-full text-[12px] font-semibold"
                  style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
                >
                  忘记密码？重新设置
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PinInput({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3 transition-colors focus-within:bg-white"
        style={{
          background: "color-mix(in oklab, var(--paisley) 6%, white)",
          border: "1px solid color-mix(in oklab, var(--paisley) 14%, white)",
        }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.1em] shrink-0"
          style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
        >
          {label}
        </span>
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••"
          className="flex-1 bg-transparent outline-none text-[17px] font-semibold tabular-nums tracking-[0.35em] placeholder:tracking-[0.2em] placeholder:font-normal"
          style={{ color: PAISLEY }}
        />
      </div>
    </label>
  );
}

// ---- Mock data (parent-specific mini cards, per spec §7/§8) ----
type Cell = { label: string; value: string; unit: string };
type BentoLayout = {
  hero: Cell;
  smallA: Cell;
  smallB: Cell;
  trend: Cell & { bars: number[] };
  squareA: Cell;
  squareB: Cell;
  tall: Cell & { badge: string };
  ring: Cell & { pct: number };
  extra?: Cell[];
};

const TALK_BENTO: BentoLayout = {
  hero: { label: "连续练习", value: "12", unit: "天" },
  smallA: { label: "本周对话时长", value: "37", unit: "min" },
  smallB: { label: "本周对话轮次", value: "5", unit: "次" },
  trend: { label: "本周发言轮次", value: "84", unit: "次", bars: [30, 50, 80, 40, 60] },
  squareA: { label: "本周完整表达", value: "9", unit: "次" },
  squareB: { label: "本周对话用词", value: "186", unit: "词" },
  tall: { label: "本周目标词使用", value: "14", unit: "次", badge: "Vocab Growth" },
  ring: { label: "本周主动提问", value: "11", unit: "次", pct: 55 },
};

const WORDIE_BENTO: BentoLayout = {
  hero: { label: "连续练习", value: "8", unit: "天" },
  smallA: { label: "本周练习时长", value: "18", unit: "min" },
  smallB: { label: "本周练习卡片", value: "42", unit: "张" },
  trend: { label: "本周 myWordie Talk 用词", value: "23", unit: "次", bars: [20, 45, 70, 35, 55] },
  squareA: { label: "已掌握", value: "166", unit: "词" },
  squareB: { label: "复习", value: "38", unit: "词" },
  tall: { label: "Wordie-X 收录", value: "26", unit: "词", badge: "Wordie-X" },
  ring: { label: "Wordie Test 平均分", value: "86", unit: "%", pct: 86 },
  extra: [
    { label: "学习中", value: "42", unit: "词" },
    { label: "新词", value: "14", unit: "词" },
  ],
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
type SheetType = "" | "voice" | "theme" | "speechRate" | "reminderTime";

function ParentPage() {
  const [tab, setTab] = useState<ProgressTab>("talk");
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const accessCheckedRef = useRef(false);
  useEffect(() => {
    if (accessCheckedRef.current) return;
    accessCheckedRef.current = true;
    let ok = false;
    try {
      ok = sessionStorage.getItem(PARENT_UNLOCK_FLAG) === "1";
    } catch {}
    if (!ok) {
      navigate({ to: "/profile", replace: true });
      return;
    }
    try {
      sessionStorage.removeItem(PARENT_UNLOCK_FLAG);
    } catch {}
    setUnlocked(true);
  }, [navigate]);
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
  const [talkStreakGoal, setTalkStreakGoal] = useState(14);
  const [talkAskGoal, setTalkAskGoal] = useState(18);
  const [dailyPlan, setDailyPlan] = useState({ dailyCards: 5, dailyMinutes: 10 });
  const [wordieGoals, setWordieGoals] = useState({ week: 20, month: 200, year: 1000 });
  const [wordieStreakGoal, setWordieStreakGoal] = useState(14);

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

  const bento = tab === "talk" ? TALK_BENTO : WORDIE_BENTO;
  const accent = tab === "talk" ? SHIRIN : WORDIE;
  const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, white)`;

  if (!unlocked) return null;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white pb-24">
        <FloatingBack to="/profile" />

        {/* Header */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PAISLEY }}
          >
            Parent Page
          </h1>
          <p
            className="mt-1 text-[13px] leading-none font-semibold"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
          >
            {new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </section>

        {/* Source tabs (segmented pill, same as /progress) */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[var(--input)]">
            {(["talk", "wordie"] as const).map((k) => {
              const active = tab === k;
              const c = k === "talk" ? SHIRIN : WORDIE;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className="h-9 rounded-full text-[13px] font-semibold transition-colors"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? c : "color-mix(in oklab, var(--foreground) 55%, white)",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined
                  }}
                >
                  {k === "talk" ? "ShirinTalk" : "myWordie"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Mini cards — Bento layout: hero / trend / ring / tall */}
        <section className="px-6 pt-4">
          {tab === "wordie" ? (
            <WordieBento accent={accent} tint={tint} bento={bento} />
          ) : (
            <TalkBento accent={accent} tint={tint} bento={bento} />
          )}
        </section>

        {/* 计划 */}
        <SectionTitle>计划</SectionTitle>

        {/* 跟随顶部 ShirinTalk / myWordie 切换 */}
        {tab === "talk" ? (
        <GoalCard
          open={open.settingTalk}
          onToggle={() => toggle("settingTalk")}
          title="ShirinTalk"
          accent="oklch(0.55 0 0)"
          rows={[
            { label: "连续练习", value: talkStreakGoal, unit: "天", step: 1, onChange: setTalkStreakGoal },
            { label: "主动提问", value: talkAskGoal, unit: "次", step: 1, onChange: setTalkAskGoal },
            { label: "本周", value: talkGoals.week, unit: "分钟", step: 5, onChange: (v) => setTalkGoals((g) => ({ ...g, week: v })) },
            { label: "本月", value: talkGoals.month, unit: "分钟", step: 10, onChange: (v) => setTalkGoals((g) => ({ ...g, month: v })) },
            { label: "本年", value: talkGoals.year, unit: "分钟", step: 50, onChange: (v) => setTalkGoals((g) => ({ ...g, year: v })) },
          ]}
        />
        ) : (
        <GoalCard
          open={open.settingWordie}
          onToggle={() => toggle("settingWordie")}
          title="myWordie"
          accent="oklch(0.55 0 0)"
          rows={[
            { label: "连续练习", value: wordieStreakGoal, unit: "天", step: 1, onChange: setWordieStreakGoal },
            { label: "每天卡片", value: dailyPlan.dailyCards, unit: "卡片", step: 1, onChange: (v) => setDailyPlan((p) => ({ ...p, dailyCards: v })) },
            { label: "每天时长", value: dailyPlan.dailyMinutes, unit: "分钟", step: 5, onChange: (v) => setDailyPlan((p) => ({ ...p, dailyMinutes: v })) },
            { label: "本周", value: wordieGoals.week, unit: "卡片", step: 5, onChange: (v) => setWordieGoals((g) => ({ ...g, week: v })) },
            { label: "本月", value: wordieGoals.month, unit: "卡片", step: 10, onChange: (v) => setWordieGoals((g) => ({ ...g, month: v })) },
            { label: "本年", value: wordieGoals.year, unit: "卡片", step: 50, onChange: (v) => setWordieGoals((g) => ({ ...g, year: v })) },
          ]}
        />
        )}

        {/* 设置 */}
        <SectionTitle>设置</SectionTitle>

        <section className="px-5 pt-3">
          <div
            className="rounded-2xl bg-white px-4 py-2 space-y-1"
            style={{ border: "1px solid color-mix(in oklab, oklch(0.55 0 0) 14%, white)" }}
          >
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
              <button
                type="button"
                onClick={() => setSheet({ type: "reminderTime", title: "提醒时间" })}
                className="flex items-center justify-between py-2.5 px-1 w-full text-left"
              >
                <span className="text-[13px] font-semibold">提醒时间</span>
                <span className="text-[13px] font-semibold" style={{ color: PAISLEY }}>
                  {prefs.reminderTime}
                </span>
              </button>
            )}
            <SwitchRow
              label="连续天数提醒"
              checked={prefs.streakReminder}
              onChange={(v) => setPrefs((p) => ({ ...p, streakReminder: v }))}
            />
            <PrefRow label="评价应用" value="" onClick={() => {}} />
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] font-semibold">版本</span>
              <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                1.0.0
              </span>
            </div>
          </div>
        </section>

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
            {sheet.type === "reminderTime" && (
              <TimePickerSheet
                value={prefs.reminderTime}
                onChange={(v) => setPrefs((p) => ({ ...p, reminderTime: v }))}
              />
            )}
          </BottomSheet>
        )}

      </div>
    </PhoneFrame>
  );
}

// ============ small components ============

function WordieBento({
  accent,
  tint,
  bento,
}: {
  accent: string;
  tint: (pct: number) => string;
  bento: BentoLayout;
}) {
  const ringPct = Math.min(100, Math.round((Number(bento.hero.value) / 14) * 100));
  // Streak ring — stroke matches 已掌握 progress bar (6px)
  const STREAK_SIZE = 84;
  const STREAK_STROKE = 6;
  const R = (STREAK_SIZE - STREAK_STROKE) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="space-y-3">
      {/* Row 1: Streak hero (3 col x 2 row) + 本周卡片 stacked + 本周时长 stacked */}
      <div className="grid grid-cols-6 grid-rows-2 gap-3">
        {/* 连续练习 — tall hero with centered ring */}
        <div
          className="col-span-3 row-span-2 rounded-3xl px-4 py-4 grid place-items-center text-white relative overflow-hidden"
          style={{ background: accent }}
        >
          <span className="absolute top-3 left-4 text-[11px] font-semibold opacity-90">
            连续练习
          </span>
          <div
            className="relative grid place-items-center"
            style={{ width: STREAK_SIZE, height: STREAK_SIZE }}
          >
            <svg
              width={STREAK_SIZE}
              height={STREAK_SIZE}
              viewBox={`0 0 ${STREAK_SIZE} ${STREAK_SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle cx={STREAK_SIZE / 2} cy={STREAK_SIZE / 2} r={R} stroke="rgba(255,255,255,0.18)" strokeWidth={STREAK_STROKE} fill="none" />
              <circle
                cx={STREAK_SIZE / 2}
                cy={STREAK_SIZE / 2}
                r={R}
                stroke="white"
                strokeWidth={STREAK_STROKE}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(ringPct / 100) * C} ${C}`}
              />
            </svg>
            <div className="relative text-center leading-none">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[28px] font-medium tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                  {bento.hero.value}
                </span>
                <span className="text-[11px] font-semibold opacity-85">{bento.hero.unit}</span>
              </div>
            </div>
          </div>
          <span className="absolute right-4 bottom-3 text-[10px] font-medium leading-none flex items-baseline gap-1">
            目标
            <span className="font-semibold tabular-nums">14</span>
            {bento.hero.unit}
          </span>
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
        {/* 本周卡片 — unified tinted style */}
        <StatCard accent={accent} tint={tint} label={bento.smallA.label} value={bento.smallA.value} unit={bento.smallA.unit} />
        {/* 本周时长 — unified tinted style */}
        <StatCard accent={accent} tint={tint} label={bento.smallB.label} value={bento.smallB.value} unit={bento.smallB.unit} />
      </div>

      {/* Row 2: Wordie Test (left, white) + 本周用词 (right, tinted) */}
      <div className="grid grid-cols-6 gap-3">
        <div
          className="col-span-3 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 h-16"
          style={{ background: "var(--card)", border: `1px solid ${tint(14)}` }}
        >
          <div className="min-w-0 flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold leading-tight" style={{ color: tint(95) }}>
              Wordie Test
            </p>
            <p className="text-[11px] font-semibold leading-tight" style={{ color: tint(95) }}>
              平均分
            </p>
          </div>
          <div className="relative grid place-items-center shrink-0" style={{ width: 50, height: 50 }}>
            <svg width={50} height={50} viewBox="0 0 50 50" className="absolute inset-0 -rotate-90">
              <circle cx="25" cy="25" r="22" stroke="var(--input)" strokeWidth="4.8" fill="none" />
              <circle
                cx="25"
                cy="25"
                r="22"
                stroke={tint(95)}
                strokeWidth="4.8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(bento.ring.pct / 100) * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
              />
            </svg>
            <span
              className="text-[12px] font-semibold relative tabular-nums leading-none"
              style={{ letterSpacing: "-0.02em", color: tint(95) }}
            >
              {bento.ring.pct}%
            </span>
          </div>
        </div>
        <StatCard
          accent={accent}
          tint={tint}
          label={bento.trend.label}
          value={bento.trend.value}
          unit={bento.trend.unit}
        />
      </div>

      {/* Row 3: Vocab funnel (full) */}
      <div className="grid grid-cols-6 gap-3">
        {bento.extra && (
          <VocabFunnel
            accent={accent}
            tint={tint}
            stages={[
              { label: "新词", value: Number(bento.extra[1].value), weight: 18 },
              { label: "学习中", value: Number(bento.extra[0].value), weight: 38 },
              { label: "复习", value: Number(bento.squareB.value), weight: 60 },
              { label: "已掌握", value: Number(bento.squareA.value), weight: 100 },
            ]}
          />
        )}
      </div>
    </div>
  );
}

function TalkBento({
  accent,
  tint,
  bento,
}: {
  accent: string;
  tint: (pct: number) => string;
  bento: BentoLayout;
}) {
  const STREAK_GOAL = 14;
  const ringPct = Math.min(100, Math.round((Number(bento.hero.value) / STREAK_GOAL) * 100));
  const STREAK_SIZE = 84;
  const STREAK_STROKE = 6;
  const R = (STREAK_SIZE - STREAK_STROKE) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="space-y-3">
      {/* Row 1: 连续练习 hero (3x2) + 本周对话轮次 + 本周对话时长 */}
      <div className="grid grid-cols-6 grid-rows-2 gap-3">
        <div
          className="col-span-3 row-span-2 rounded-3xl px-4 py-4 grid place-items-center text-white relative overflow-hidden"
          style={{ background: accent }}
        >
          <span className="absolute top-3 left-4 text-[11px] font-semibold opacity-90">
            {bento.hero.label}
          </span>
          <div
            className="relative grid place-items-center"
            style={{ width: STREAK_SIZE, height: STREAK_SIZE }}
          >
            <svg
              width={STREAK_SIZE}
              height={STREAK_SIZE}
              viewBox={`0 0 ${STREAK_SIZE} ${STREAK_SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle cx={STREAK_SIZE / 2} cy={STREAK_SIZE / 2} r={R} stroke="rgba(255,255,255,0.18)" strokeWidth={STREAK_STROKE} fill="none" />
              <circle
                cx={STREAK_SIZE / 2}
                cy={STREAK_SIZE / 2}
                r={R}
                stroke="white"
                strokeWidth={STREAK_STROKE}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(ringPct / 100) * C} ${C}`}
              />
            </svg>
            <div className="relative text-center leading-none">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[28px] font-medium tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                  {bento.hero.value}
                </span>
                <span className="text-[11px] font-semibold opacity-85">{bento.hero.unit}</span>
              </div>
            </div>
          </div>
          <span className="absolute right-4 bottom-3 text-[10px] font-medium leading-none flex items-baseline gap-1">
            目标
            <span className="font-semibold tabular-nums">{STREAK_GOAL}</span>
            {bento.hero.unit}
          </span>
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
        <StatCard accent={accent} tint={tint} label={bento.smallA.label} value={bento.smallA.value} unit={bento.smallA.unit} />
        <StatCard accent={accent} tint={tint} label={bento.smallB.label} value={bento.smallB.value} unit={bento.smallB.unit} />
      </div>

      {/* Row 2: 本周发言轮次 + 本周完整表达 */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard accent={accent} tint={tint} label={bento.trend.label} value={bento.trend.value} unit={bento.trend.unit} />
        <StatCard accent={accent} tint={tint} label={bento.squareA.label} value={bento.squareA.value} unit={bento.squareA.unit} />
      </div>

      {/* Row 3: 本周主动提问 (full row, white) */}
      <div className="grid grid-cols-6 gap-3">
        <div
          className="col-span-6 rounded-2xl px-4 py-2.5 flex flex-col gap-1.5 h-16 justify-center"
          style={{ background: "var(--card)", border: `1px solid ${tint(14)}` }}
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold leading-none" style={{ color: tint(95) }}>
              {bento.ring.label}
            </span>
            <span className="flex items-baseline gap-1 tabular-nums">
              <span
                className="text-[22px] font-medium leading-none"
                style={{ color: "var(--shirin)", letterSpacing: "-0.02em" }}
              >
                {bento.ring.value}
              </span>
              <span
                className="text-[11px] font-semibold leading-none"
                style={{ color: "var(--shirin)" }}
              >
                次
              </span>
              <span
                className="text-[10px] font-medium leading-none flex items-baseline gap-1"
                style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
              >
                目标
                <span className="font-semibold tabular-nums">18</span>
                次
              </span>
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--input)" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round((Number(bento.ring.value) / 18) * 100))}%`, background: tint(95) }}
            />
          </div>
        </div>
      </div>

      {/* Row 4: 本周对话用词 + 本周目标词使用 */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard label={bento.squareB.label} value={bento.squareB.value} unit={bento.squareB.unit} accent={accent} tint={tint} />
        <StatCard label={bento.tall.label} value={bento.tall.value} unit={bento.tall.unit} accent={accent} tint={tint} />
      </div>
    </div>
  );
}

function StatCard({
  accent,
  tint,
  label,
  value,
  unit,
  accentOverride,
}: {
  accent: string;
  tint: (pct: number) => string;
  label: string;
  value: string;
  unit: string;
  accentOverride?: string;
}) {
  const color = accentOverride ?? accent;
  const bg = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 10%, white)`
    : tint(10);
  const border = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 22%, white)`
    : tint(18);
  const labelColor = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 75%, black)`
    : tint(82);
  const unitColor = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 60%, black)`
    : tint(70);
  return (
    <div
      className="col-span-3 rounded-2xl px-4 py-2.5 flex flex-col gap-1 h-16"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <span className="text-[11px] font-semibold leading-none" style={{ color: labelColor }}>
        {label}
      </span>
      <div className="flex items-baseline gap-1 mt-auto">
        <span
          className="text-[22px] font-medium leading-none tabular-nums"
          style={{ color: color, letterSpacing: "-0.02em" }}
        >
          {value}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: unitColor }}>{unit}</span>
      </div>
    </div>
  );
}

function StreakRingCard({
  accent,
  value,
  unit,
  label,
  goal,
}: {
  accent: string;
  value: number;
  unit: string;
  label: string;
  goal: number;
}) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div
      className="col-span-2 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-2 min-h-[60px] text-white relative overflow-hidden"
      style={{ background: accent, boxShadow: `0 8px 20px -14px ${accent}` }}
    >
      <div className="relative w-12 h-12 grid place-items-center shrink-0">
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
          />
        </svg>
        <span className="text-[11px] font-semibold relative tabular-nums leading-none text-white">
          {value}
          {unit}
        </span>
      </div>
      <p className="text-[11px] font-semibold leading-tight text-right min-w-0 flex-1 text-white">
        {label}
      </p>
    </div>
  );
}

function RingCard({
  accent,
  ring,
}: {
  accent: string;
  ring: { label: string; value: string; unit: string; pct: number };
}) {
  return (
    <div
      className="col-span-3 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-3 min-h-[60px] text-white relative overflow-hidden"
      style={{ background: accent, boxShadow: `0 8px 20px -14px ${accent}` }}
    >
      <p className="text-[11px] font-semibold leading-tight min-w-0 text-white">
        Wordie Test
        <br />
        平均分
      </p>
      <div className="relative w-12 h-12 grid place-items-center shrink-0">
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(ring.pct / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
          />
        </svg>
        <span className="text-[11px] font-semibold relative tabular-nums" style={{ color: accent }}>
          {ring.pct}%
        </span>
      </div>
    </div>
  );
}

type VocabStage = { label: string; value: number; weight: number };

function VocabFunnel({
  accent,
  tint,
  stages,
}: {
  accent: string;
  tint: (pct: number) => string;
  stages: VocabStage[];
}) {
  const total = stages.reduce((s, x) => s + x.value, 0);
  // Donut geometry — single ring split into 4 proportional arcs
  const SIZE = 116;
  const STROKE = 8;
  const R = (SIZE - STROKE) / 2;
  const C = 2 * Math.PI * R;
  const GAP = 0;
  const shades = [22, 42, 65, 95];
  let acc = 0;
  const arcs = stages.map((s, i) => {
    const segLen = total > 0 ? (s.value / total) * C : 0;
    const drawLen = Math.max(0, segLen - GAP);
    const offset = -acc;
    acc += segLen;
    // End angle (clockwise from 12 o'clock)
    const endTheta = (acc / C) * 2 * Math.PI;
    const endX = SIZE / 2 + R * Math.sin(endTheta);
    const endY = SIZE / 2 - R * Math.cos(endTheta);
    return { drawLen, offset, color: tint(shades[i]), endX, endY };
  });
  return (
    <div
      className="col-span-6 rounded-3xl px-5 py-4 bg-white"
      style={{ border: `1px solid ${tint(14)}` }}
    >
      <div className="flex items-center gap-5">
        {/* Left: refined 4-segment donut */}
        <div
          className="relative shrink-0 grid place-items-center"
          style={{
            width: SIZE,
            height: SIZE,
            background: `radial-gradient(closest-side, ${tint(6)} 0%, transparent 70%)`,
            borderRadius: "9999px"
          }}
        >
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={tint(10)}
              strokeWidth={STROKE}
            />
            <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
              {arcs.map((a, i) => (
                <circle
                  key={i}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                  strokeDasharray={`${a.drawLen} ${C}`}
                  strokeDashoffset={a.offset}
                />
              ))}
            </g>
            {arcs.map((a, i) => (
              <circle key={`cap-${i}`} cx={a.endX} cy={a.endY} r={STROKE / 2} fill={a.color} />
            ))}
          </svg>
          <span
            className="relative text-[22px] font-medium tabular-nums leading-none -translate-y-2"
            style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
          >
            {total}
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2 text-[11px] font-semibold leading-none whitespace-nowrap"
            style={{ top: `calc(50% + 12px)`, color: tint(shades[3]) }}
          >
            学习词库
          </span>
        </div>

        {/* Right: 4 progress rows */}
        <div className="flex-1 min-w-0 space-y-2">
          {stages.map((s, i) => {
            const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
            return (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: tint(shades[i] < 50 ? 78 : shades[i]) }}
                  >
                    {s.label}
                  </span>
                  <span className="flex items-baseline gap-1 tabular-nums">
                    <span
                      className="text-[11px] font-semibold leading-none"
                      style={{ color: "var(--foreground)" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-[11px] font-semibold leading-none"
                      style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
                    >
                      / {pct}%
                    </span>
                  </span>
                </div>
                <div
                  className="mt-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--input)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: tint(shades[i]) }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="px-6 pt-6 pb-2 text-[13px] font-semibold uppercase tracking-wide text-black"
    >
      {children}
    </h2>
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
          <span className="text-[14px] font-semibold" style={{ color: accent }}>
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
      <span className="text-[13px] font-semibold">{label}</span>
      <div className="flex items-baseline gap-1">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => {
            const n = Math.max(0, Math.round(Number(e.target.value) || 0));
            onChange(n);
          }}
          className="w-20 bg-transparent text-right text-[15px] font-semibold outline-none border-b border-border focus:border-[color:var(--paisley)] py-0.5"
        />
        <span className="text-[12px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

type GoalRowSpec = {
  label: string;
  value: number;
  unit: string;
  step?: number;
  onChange: (v: number) => void;
};

function GoalCard({
  accent,
  rows,
}: {
  open?: boolean;
  onToggle?: () => void;
  title?: string;
  accent: string;
  rows: GoalRowSpec[];
}) {
  return (
    <section className="px-5 pt-3">
      <div className="grid grid-cols-2 gap-2.5">
        {rows.map((r) => (
          <GoalRow key={r.label} accent={accent} {...r} />
        ))}
      </div>
    </section>
  );
}

function GoalRow({
  label,
  value,
  unit,
  accent,
  onChange,
}: GoalRowSpec & { accent: string }) {
  const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, white)`;
  return (
    <div
      className="relative flex items-center justify-between px-3 rounded-2xl bg-white box-border overflow-hidden"
      style={{ border: `1px solid ${tint(14)}`, height: 64, minHeight: 64, maxHeight: 64 }}
    >
      <span
        className="text-[11px] font-semibold leading-none"
        style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
      >
        {label}
      </span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => {
          const n = Math.max(0, Math.round(Number(e.target.value) || 0));
          onChange(n);
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 bg-transparent text-center text-[18px] font-semibold leading-none tabular-nums outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ color: accent, letterSpacing: "-0.02em" }}
      />
      <span
        className="text-[11px] font-semibold leading-none"
        style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
      >
        {unit}
      </span>
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
      <span className="text-[13px] font-semibold">{label}</span>
      <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
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
      <span className="text-[13px] font-semibold flex items-center gap-1">
        {label}
        {info && <HelpCircle className="h-3.5 w-3.5 opacity-50" />}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: checked ? PAISLEY : "var(--input)" }}
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
        <span className="text-[18px] font-semibold" style={{ color: WORDIE }}>
          {word}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {partOfSpeech} · {cefrLevel} · {source}
        </span>
      </div>
      <div className="flex gap-1.5 mt-1.5">
        <Pill color="var(--wordie)">{statusLabel[status]}</Pill>
        {isFocus && <Pill color="var(--paisley)">重点</Pill>}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
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
      className="px-2 h-5 rounded-full text-[10px] font-semibold inline-flex items-center"
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
      className="h-7 rounded-full text-[11px] font-semibold"
      style={{
        background: active ? color : `color-mix(in oklab, ${color} 10%, white)`,
        color: active ? "white" : color
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
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col shadow-2xl"
        style={{ height: "62vh" }}
      >
        <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="relative flex items-center justify-center px-5 pt-2 pb-3 shrink-0">
          <h3
            className="text-[17px] font-semibold tracking-tight leading-none"
            style={{ letterSpacing: "-0.01em", color: PAISLEY }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-2 text-[13px] font-semibold"
            style={{ color: PAISLEY }}
          >
            完成
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">{children}</div>
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
          <p className="text-[11px] font-semibold uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
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
                    color: active ? PAISLEY : "var(--foreground)"
                  }}
                >
                  <span className="text-[14px] font-semibold">{v.name}</span>
                  {active && <span className="text-[12px] font-semibold">✓</span>}
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
              color: active ? PAISLEY : "var(--foreground)"
            }}
          >
            <span className="text-[14px] font-semibold">{t.label}</span>
            {active && <span className="text-[12px] font-semibold">✓</span>}
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
        <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          当前
        </span>
        <span className="text-[20px] font-semibold" style={{ color: PAISLEY }}>
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
      <div className="flex justify-between text-[11px] font-semibold mt-1" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
        <span>0.6×</span>
        <span>1.0×</span>
        <span>1.4×</span>
      </div>
    </div>
  );
}

function TimePickerSheet({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [h, m] = value.split(":");
  const hour = Number(h) || 0;
  const minute = Number(m) || 0;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const Column = ({
    items,
    selected,
    onPick,
  }: {
    items: number[];
    selected: number;
    onPick: (v: number) => void;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const ITEM_H = 48;
    useEffect(() => {
      if (ref.current) ref.current.scrollTop = selected * ITEM_H;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onScroll = () => {
      if (!ref.current) return;
      const idx = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(items.length - 1, idx));
      if (clamped !== selected) onPick(items[clamped]);
    };
    return (
      <div
        ref={ref}
        onScroll={onScroll}
        className="relative overflow-y-auto snap-y snap-mandatory flex-1 [&::-webkit-scrollbar]:hidden"
        style={{
          height: ITEM_H * 7,
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
      <div style={{ height: ITEM_H * 3 }} />
        {items.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              onPick(n);
              if (ref.current) ref.current.scrollTo({ top: n * ITEM_H, behavior: "smooth" });
            }}
            className="w-full flex items-center justify-center snap-center text-[15px] font-semibold tabular-nums"
            style={{
              height: ITEM_H,
              color: n === selected ? PAISLEY : "color-mix(in oklab, var(--foreground) 55%, white)",
            }}
          >
            {pad(n)}
          </button>
        ))}
        <div style={{ height: ITEM_H * 3 }} />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-2">
      <div className="relative w-full flex items-stretch">
        <div
          className="absolute left-0 right-0 pointer-events-none rounded-full"
          style={{
            top: 48 * 3,
            height: 48,
            background: "color-mix(in oklab, var(--paisley) 10%, transparent)",
          }}
        />
        <Column items={hours} selected={hour} onPick={(v) => onChange(`${pad(v)}:${pad(minute)}`)} align="end" />
        <div className="flex items-center justify-center relative z-10" style={{ height: 48 * 7 }}>
          <span className="text-[15px] font-semibold" style={{ color: PAISLEY }}>:</span>
        </div>
        <Column items={minutes} selected={minute} onPick={(v) => onChange(`${pad(hour)}:${pad(v)}`)} align="start" />
      </div>
    </div>
  );
}
