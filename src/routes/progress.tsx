import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "My Progress — Paisley EC" }] }),
  component: ProgressPage,
});

type SourceKey = "talk" | "wordie";
type TrendMode = "week" | "month" | "year";

// ---- Demo data (USE_PROGRESS_DEMO_VALUES = true) ----
const TALK_STATS = {
  cards: [
    { key: "time_spent", title: "Time Spent", value: "908", unit: "min", meta: "37 this week" },
    { key: "sessions", title: "Sessions", value: "62", unit: "", meta: "5 this week" },
    { key: "talk_words", title: "Talk Words", value: "4,210", unit: "", meta: "186 this week" },
  ],
  goals: { week: { done: 37, total: 100, unit: "min" }, month: { done: 168, total: 400, unit: "min" }, year: { done: 640, total: 1000, unit: "min" }, total: "908 min" },
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
  goals: { week: { done: 12, total: 20, unit: "cards" }, month: { done: 86, total: 200, unit: "cards" }, year: { done: 340, total: 1000, unit: "cards" }, total: "438 cards" },
  trend: {
    week: [3, 0, 2, 4, 0, 1, 2],
    month: Array.from({ length: 30 }, (_, i) => Math.max(0, Math.round(4 + 3 * Math.cos(i / 1.8)))),
    year: [18, 22, 30, 28, 36, 40, 32, 38, 45, 52, 48, 86],
  },
};

const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ProgressPage() {
  const [source, setSource] = useState<SourceKey>("talk");
  const [mode, setMode] = useState<TrendMode>("week");

  const accent = source === "talk" ? "var(--shirin)" : "var(--wordie)";
  const accentSoft = source === "talk" ? "color-mix(in oklab, var(--shirin) 12%, white)" : "color-mix(in oklab, var(--wordie) 12%, white)";
  const data = source === "talk" ? TALK_STATS : WORDIE_STATS;

  const trendSeries = data.trend[mode];
  const axisLabels = useMemo(() => {
    if (mode === "week") return WEEK_LABELS.map((d) => d[0]);
    if (mode === "year") return MONTH_LABELS.map((m) => m[0]);
    // month — show 1, 8, 15, 22, 29
    return Array.from({ length: trendSeries.length }, (_, i) => ([0, 7, 14, 21, 28].includes(i) ? String(i + 1) : ""));
  }, [mode, trendSeries.length]);

  const today = new Date();
  const dateLabel = today.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
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
            style={{ color: accent, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            My Progress
          </h1>
          <p
            className="mt-1 text-[13px] leading-none font-bold"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)", fontFamily: "var(--font-sans)" }}
          >
            {dateLabel}
          </p>
        </section>

        {/* Source tabs */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[oklch(0.96_0.01_240)]">
            {(["talk", "wordie"] as const).map((key) => {
              const active = source === key;
              const c = key === "talk" ? "var(--shirin)" : "var(--wordie)";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSource(key)}
                  className="h-9 rounded-full text-[13px] font-bold transition-colors"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? c : "color-mix(in oklab, var(--foreground) 55%, white)",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined,
                  }}
                >
                  {key === "talk" ? "ShirinTalk" : "myWordie"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stat cards */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {data.cards.map((c) => (
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
                  const active = mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
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
        <section className="px-6 pt-4 pb-8">
          <div className="rounded-2xl p-4 border border-[oklch(0.94_0.01_240)]">
            <p className="text-[13px] font-bold" style={{ color: "var(--foreground)" }}>
              Goals
            </p>
            <div className="mt-3 flex items-center gap-4">
              <GoalRing
                year={data.goals.year}
                month={data.goals.month}
                week={data.goals.week}
              />
              <div className="flex-1 space-y-2">
                <GoalRow tone="#FF7A62" label="Week" done={data.goals.week.done} total={data.goals.week.total} unit={data.goals.week.unit} />
                <GoalRow tone="#5D56B1" label="Month" done={data.goals.month.done} total={data.goals.month.total} unit={data.goals.month.unit} />
                <GoalRow tone="#9AC7C1" label="Year" done={data.goals.year.done} total={data.goals.year.total} unit={data.goals.year.unit} />
                <div className="pt-1 text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                  Up to Now · {data.goals.total}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

// ---- Trend chart ----
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
  // smooth path
  const path = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
  }, "");
  const areaPath = `${path} L ${points[points.length - 1].x} ${H - PAD_BOTTOM} L ${points[0].x} ${H - PAD_BOTTOM} Z`;

  const guideYs = [0.25, 0.5, 0.75].map((p) => PAD_TOP + p * (H - PAD_TOP - PAD_BOTTOM));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[120px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {guideYs.map((y, i) => (
        <line key={i} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="oklch(0.94 0.01 240)" strokeWidth={1} />
      ))}
      <path d={areaPath} fill="url(#trendFill)" />
      <path d={path} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={accent} />
      ))}
      {labels.map((lab, i) => (
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
        ) : null
      ))}
    </svg>
  );
}

// ---- Goal ring (3 concentric arcs) ----
function GoalRing({
  year,
  month,
  week,
}: {
  year: { done: number; total: number };
  month: { done: number; total: number };
  week: { done: number; total: number };
}) {
  const SIZE = 112;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const rings = [
    { r: 48, tone: "#9AC7C1", pct: clampPct(year.done / year.total) },   // outer = year
    { r: 36, tone: "#5D56B1", pct: clampPct(month.done / month.total) }, // middle = month
    { r: 24, tone: "#FF7A62", pct: clampPct(week.done / week.total) },   // inner = week
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
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={14}
        fontWeight={800}
        fill="var(--foreground)"
      >
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
        <div className="flex items-center gap-1.5" style={{ color: "var(--foreground)" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
          {label}
        </div>
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
