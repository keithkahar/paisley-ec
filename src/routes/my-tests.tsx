import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronDown, ChevronRight, Check, RotateCcw } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";

export const Route = createFileRoute("/my-tests")({
  head: () => ({ meta: [{ title: "My Tests — Paisley EC" }] }),
  component: MyTestsPage,
});

// ---- Demo data ----
const CEFR_HISTORY = [
  { id: "c20", code: "#20", level: "A2", date: "Jun 2 2026", summary: "L 8/10 · R 12/15 · G 11/15 · V 9/10 · W 8/10" },
  { id: "c19", code: "#19", level: "A2", date: "May 18 2026", summary: "L 7/10 · R 11/15 · G 10/15 · V 8/10 · W 7/10" },
  { id: "c18", code: "#18", level: "A1", date: "Apr 28 2026", summary: "L 6/10 · R 10/15 · G 9/15 · V 7/10 · W 6/10" },
  { id: "c17", code: "#17", level: "A1", date: "Apr 6 2026", summary: "L 5/10 · R 9/15 · G 8/15 · V 7/10 · W 5/10" },
];

type WordieDim = { key: string; label: string; correct: number; total: number };
type WordieReview = { idx: number; dim: string; correct: boolean; your: string; right: string };
type WordieTest = {
  id: string;
  code: string;
  date: string;
  correct: number;
  total: number;
  score: number;
  summary: string;
  dimensions: WordieDim[];
  reviews: WordieReview[];
};

const WORDIE_TESTS: WordieTest[] = [
  {
    id: "w18", code: "#18", date: "Jun 2 2026", correct: 18, total: 20, score: 90,
    summary: "L 4/4 · P 4/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 4, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [
      { idx: 5, dim: "Spelling", correct: false, your: "recieve", right: "receive" },
      { idx: 12, dim: "Example", correct: false, your: "—", right: "She insists on paying." },
    ],
  },
  {
    id: "w17", code: "#17", date: "May 22 2026", correct: 17, total: 20, score: 85,
    summary: "L 4/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [
      { idx: 3, dim: "Pronunciation", correct: false, your: "/ˈθɪŋk/", right: "/θɪŋk/" },
    ],
  },
  {
    id: "w16", code: "#16", date: "May 10 2026", correct: 16, total: 20, score: 80,
    summary: "L 3/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w15", code: "#15", date: "Apr 24 2026", correct: 15, total: 20, score: 75,
    summary: "L 3/4 · P 3/4 · S 2/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 2, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w14", code: "#14", date: "Apr 8 2026", correct: 17, total: 20, score: 85,
    summary: "L 4/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w13", code: "#13", date: "Mar 26 2026", correct: 14, total: 20, score: 70,
    summary: "L 3/4 · P 2/4 · S 2/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 2, total: 4 },
      { key: "spelling", label: "Spelling", correct: 2, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
];

const CEFR_ACCENT = "var(--paisley)";
const WORDIE_ACCENT = "var(--wordie)";

function MyTestsPage() {
  const [openCefr, setOpenCefr] = useState(false);
  const [openWordie, setOpenWordie] = useState(false);
  const [expandedWordie, setExpandedWordie] = useState<string>("");

  const latestCefr = CEFR_HISTORY[0];
  const wordieAvg = useMemo(
    () => Math.round(WORDIE_TESTS.reduce((a, b) => a + b.score, 0) / WORDIE_TESTS.length),
    [],
  );

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
            style={{ color: "var(--foreground)", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            My Tests
          </h1>
        </section>

        {/* CEFR Test section */}
        <section className="px-6 pt-4">
          <SectionHeader title="CEFR Test" actionLabel="Take CEFR Test" accent={CEFR_ACCENT} />

          {/* Hero card */}
          <div
            className="mt-3 rounded-2xl p-4 flex items-center justify-between"
            style={{ background: `color-mix(in oklab, ${CEFR_ACCENT} 10%, white)` }}
          >
            <div>
              <p className="text-[11px] font-bold leading-none" style={{ color: CEFR_ACCENT }}>
                Current CEFR Level
              </p>
              <p
                className="mt-2 text-[34px] leading-none font-bold tracking-tight"
                style={{ color: CEFR_ACCENT, letterSpacing: "-0.02em" }}
              >
                {latestCefr.level}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                Last test
              </p>
              <p className="text-[12px] font-bold" style={{ color: "var(--foreground)" }}>
                {latestCefr.date}
              </p>
            </div>
          </div>

          {/* History toggle */}
          <button
            type="button"
            onClick={() => setOpenCefr((v) => !v)}
            className="mt-3 w-full flex items-center justify-between py-1.5"
          >
            <span className="text-[12px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
              History · {CEFR_HISTORY.length}
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{
                color: "color-mix(in oklab, var(--foreground) 55%, white)",
                transform: openCefr ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {openCefr && (
            <ul className="mt-1 space-y-2">
              {CEFR_HISTORY.map((h) => (
                <li
                  key={h.id}
                  className="rounded-2xl p-3 border border-[oklch(0.94_0.01_240)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `color-mix(in oklab, ${CEFR_ACCENT} 12%, white)`, color: CEFR_ACCENT }}
                      >
                        {h.code}
                      </span>
                      <span className="text-[13px] font-bold" style={{ color: "var(--foreground)" }}>
                        {h.level}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                      {h.date}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[11px] font-medium truncate"
                    style={{ color: "color-mix(in oklab, var(--foreground) 60%, white)" }}
                    title={h.summary}
                  >
                    {h.summary}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Wordie Test section */}
        <section className="px-6 pt-6 pb-8">
          <SectionHeader title="Wordie Test" actionLabel="Take Wordie Test" accent={WORDIE_ACCENT} />

          {/* Avg + trend card */}
          <div className="mt-3 rounded-2xl p-4 border border-[oklch(0.94_0.01_240)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold leading-none" style={{ color: WORDIE_ACCENT }}>
                  Average Score
                </p>
                <p
                  className="mt-2 text-[28px] leading-none font-bold tracking-tight"
                  style={{ color: WORDIE_ACCENT, letterSpacing: "-0.02em" }}
                >
                  {wordieAvg}%
                </p>
              </div>
              <p className="text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                Last 6 tests
              </p>
            </div>
            <TrendChart values={WORDIE_TESTS.slice(0, 6).slice().reverse().map((t) => t.score)} labels={WORDIE_TESTS.slice(0, 6).slice().reverse().map((t) => t.code)} accent={WORDIE_ACCENT} />
          </div>

          {/* History toggle */}
          <button
            type="button"
            onClick={() => setOpenWordie((v) => !v)}
            className="mt-3 w-full flex items-center justify-between py-1.5"
          >
            <span className="text-[12px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
              History · {WORDIE_TESTS.length}
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{
                color: "color-mix(in oklab, var(--foreground) 55%, white)",
                transform: openWordie ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {openWordie && (
            <ul className="mt-1 space-y-2">
              {WORDIE_TESTS.map((t) => {
                const expanded = expandedWordie === t.id;
                return (
                  <li
                    key={t.id}
                    className="rounded-2xl border border-[oklch(0.94_0.01_240)] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedWordie(expanded ? "" : t.id)}
                      className="w-full p-3 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `color-mix(in oklab, ${WORDIE_ACCENT} 12%, white)`, color: WORDIE_ACCENT }}
                          >
                            {t.code}
                          </span>
                          <span className="text-[13px] font-bold" style={{ color: "var(--foreground)" }}>
                            {t.correct}/{t.total}
                          </span>
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `color-mix(in oklab, ${WORDIE_ACCENT} 12%, white)`, color: WORDIE_ACCENT }}
                          >
                            {t.score}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                            {t.date}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 transition-transform"
                            style={{
                              color: "color-mix(in oklab, var(--foreground) 50%, white)",
                              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                            }}
                          />
                        </div>
                      </div>
                      <p
                        className="mt-1 text-[11px] font-medium truncate"
                        style={{ color: "color-mix(in oklab, var(--foreground) 60%, white)" }}
                        title={t.summary}
                      >
                        {t.summary}
                      </p>
                    </button>

                    {expanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-[oklch(0.95_0.01_240)]">
                        <p className="mt-2 text-[11px] font-bold" style={{ color: WORDIE_ACCENT }}>
                          Result
                        </p>
                        <div className="mt-2 space-y-2">
                          {t.dimensions.map((d) => {
                            const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
                            return (
                              <div key={d.key}>
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                  <span style={{ color: "var(--foreground)" }}>{d.label}</span>
                                  <span style={{ color: "color-mix(in oklab, var(--foreground) 60%, white)" }}>
                                    {d.correct}/{d.total}
                                  </span>
                                </div>
                                <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.95 0.01 240)" }}>
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${pct}%`, background: WORDIE_ACCENT }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {t.reviews.length > 0 && (
                          <>
                            <p className="mt-4 text-[11px] font-bold" style={{ color: WORDIE_ACCENT }}>
                              Questions · {t.reviews.length} to review
                            </p>
                            <ul className="mt-2 space-y-2">
                              {t.reviews.map((r) => (
                                <li
                                  key={r.idx}
                                  className="rounded-xl p-2.5"
                                  style={{ background: "oklch(0.97 0.01 240)" }}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold" style={{ color: "var(--foreground)" }}>
                                      Q{r.idx} · {r.dim}
                                    </span>
                                    <span
                                      className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                      style={
                                        r.correct
                                          ? { background: "color-mix(in oklab, var(--bloxia) 14%, white)", color: "var(--bloxia)" }
                                          : { background: "color-mix(in oklab, var(--shirin) 14%, white)", color: "var(--shirin)" }
                                      }
                                    >
                                      {r.correct ? <Check className="h-3 w-3" /> : <RotateCcw className="h-3 w-3" />}
                                      {r.correct ? "Correct" : "To Review"}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-[11px]" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                                    Your answer: <span style={{ color: "var(--foreground)" }}>{r.your}</span>
                                  </p>
                                  <p className="text-[11px]" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                                    Right answer: <span style={{ color: "var(--foreground)" }}>{r.right}</span>
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function SectionHeader({ title, actionLabel, accent }: { title: string; actionLabel: string; accent: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[16px] font-bold" style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <button
        type="button"
        className="text-[12px] font-bold px-3 h-7 rounded-full"
        style={{ background: `color-mix(in oklab, ${accent} 12%, white)`, color: accent }}
      >
        {actionLabel}
      </button>
    </div>
  );
}

function TrendChart({ values, labels, accent }: { values: number[]; labels: string[]; accent: string }) {
  const W = 300;
  const H = 120;
  const PAD_X = 8;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 22;
  const max = 100;
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
  const areaPath =
    points.length > 0
      ? `${path} L ${points[points.length - 1].x} ${H - PAD_BOTTOM} L ${points[0].x} ${H - PAD_BOTTOM} Z`
      : "";
  const guideYs = [0.25, 0.5, 0.75].map((p) => PAD_TOP + p * (H - PAD_TOP - PAD_BOTTOM));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[120px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="myTestsTrendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {guideYs.map((y, i) => (
        <line key={i} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="oklch(0.94 0.01 240)" strokeWidth={1} />
      ))}
      <path d={areaPath} fill="url(#myTestsTrendFill)" />
      <path d={path} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={accent} />
      ))}
      {labels.map((lab, i) => (
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
      ))}
    </svg>
  );
}
