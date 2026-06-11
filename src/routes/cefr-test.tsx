import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ProgressBar } from "@/components/app/WordieKit";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Check,
  X,
  Clock,
  Lock,
  Play,
  Headphones,
  BookOpen,
  FileText,
  Sparkles,
  PenLine,
} from "lucide-react";

export const Route = createFileRoute("/cefr-test")({
  head: () => ({
    meta: [
      { title: "CEFR Test — Paisley EC" },
      { name: "description", content: "Find your CEFR level with a short, kid-friendly assessment." },
      { property: "og:title", content: "CEFR Test — Paisley EC" },
      { property: "og:description", content: "Find your CEFR level with a short, kid-friendly assessment." },
    ],
  }),
  component: CefrTestPage,
});

// ───────── Stage meta ─────────
type Stage = "listening" | "reading" | "grammar" | "vocabulary" | "writing";

const STAGE_ORDER: Stage[] = ["listening", "reading", "grammar", "vocabulary", "writing"];

const STAGE_META: Record<
  Stage,
  {
    label: string;
    title: string;
    note: string;
    points: number;
    icon: typeof Headphones;
  }
> = {
  listening: {
    label: "Listening",
    title: "Part A: Listening",
    note: "Listen carefully and choose the best answer.",
    points: 20,
    icon: Headphones,
  },
  reading: {
    label: "Reading",
    title: "Part B: Reading",
    note: "Read the short passage, then answer the questions.",
    points: 20,
    icon: BookOpen,
  },
  grammar: {
    label: "Grammar",
    title: "Part C: Grammar",
    note: "Choose the correct word to complete each sentence.",
    points: 20,
    icon: FileText,
  },
  vocabulary: {
    label: "Vocabulary",
    title: "Part D: Vocabulary",
    note: "Match words to meaning or the opposite idea.",
    points: 20,
    icon: Sparkles,
  },
  writing: {
    label: "Writing",
    title: "Part E: Writing",
    note: "Write a short answer in clear full sentences.",
    points: 20,
    icon: PenLine,
  },
};

// ───────── Mock questions ─────────
type Choice = { id: string; label: string; isCorrect: boolean };
type Question = {
  id: string;
  stage: Stage;
  number: number;
  prompt: string;
  helper?: string;
  transcript?: string;
  choices?: Choice[];
};

const mk = (
  id: string,
  stage: Stage,
  number: number,
  prompt: string,
  choices: [string, boolean][],
  extra: Partial<Question> = {},
): Question => ({
  id,
  stage,
  number,
  prompt,
  choices: choices.map(([label, isCorrect], i) => ({
    id: `${id}-${i}`,
    label,
    isCorrect,
  })),
  ...extra,
});

const READING_PASSAGE = {
  title: "Lena and the School Garden",
  lines: [
    "Every Tuesday afternoon, Lena goes to the school garden with her class. The children water the tomato plants and check the flowers near the gate.",
    "Last week, Lena found a small green caterpillar on a leaf. Her teacher said it would become a butterfly later. Lena drew the caterpillar in her notebook and wrote three sentences about it.",
    "Next month, the class will invite parents to visit the garden and see what the children have grown.",
  ],
};

const QUESTIONS: Question[] = [
  // Listening (2)
  mk("L1", "listening", 1, "What is Tom doing?", [
    ["Playing football", true],
    ["Reading a book", false],
    ["Eating breakfast", false],
    ["Swimming", false],
  ], { transcript: "Tom is at the park. He is kicking a football with his brother." }),
  mk("L2", "listening", 2, "What should children bring on the class trip?", [
    ["A laptop", false],
    ["A water bottle", true],
    ["A toy car", false],
    ["A blanket", false],
  ], { transcript: "Our class trip is on Friday. Bring a water bottle, a hat, and your lunch box." }),
  // Reading (2)
  mk("R1", "reading", 3, "When does Lena go to the school garden?", [
    ["Every Monday morning", false],
    ["Every Tuesday afternoon", true],
    ["Every Friday evening", false],
    ["Every Sunday afternoon", false],
  ]),
  mk("R2", "reading", 4, "What did Lena find on a leaf?", [
    ["A butterfly", false],
    ["A flower", false],
    ["A caterpillar", true],
    ["A tomato", false],
  ]),
  // Grammar (2)
  mk("G1", "grammar", 5, "My sister usually ___ breakfast at seven o'clock.", [
    ["have", false],
    ["has", true],
    ["having", false],
    ["had", false],
  ]),
  mk("G2", "grammar", 6, "We went to the library ___ we needed new books.", [
    ["because", true],
    ["but", false],
    ["or", false],
    ["than", false],
  ]),
  // Vocabulary (2)
  mk("V1", "vocabulary", 7, "Choose the word for what you use in the rain.", [
    ["Ball", false],
    ["Umbrella", true],
    ["Chair", false],
    ["Apple", false],
  ]),
  mk("V2", "vocabulary", 8, "Choose the opposite of: noisy", [
    ["quiet", true],
    ["bright", false],
    ["quick", false],
    ["heavy", false],
  ]),
];

const WRITING_BULLETS = [
  "What time your school day starts",
  "Two lessons or activities you do",
  "One thing you enjoy and why",
  "Use at least 35 words if you can",
];

const LEVEL_LEGEND = [
  { level: "Pre A1", label: "Starter words and short routines" },
  { level: "A1", label: "Simple everyday English" },
  { level: "A2", label: "Confident familiar topics" },
  { level: "B1", label: "Independent connected English" },
  { level: "B2+", label: "Detailed and structured expression" },
];

// ───────── Helpers ─────────
function shouldSingleColumn(choices?: Choice[]) {
  if (!choices) return false;
  return choices.some((c) => c.label.length > 16 || c.label.split(/\s+/).length > 2);
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

// ───────── Page ─────────
type Mode = "locked" | "info" | "quiz" | "result";

const START_LOCKED = false;

function CefrTestPage() {
  const [mode, setMode] = useState<Mode>(START_LOCKED ? "locked" : "info");
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("locked") === "1") {
      setMode("locked");
    }
  }, []);

  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writingAnswer, setWritingAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [audioPlays, setAudioPlays] = useState<Record<string, number>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (mode === "quiz") {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mode !== "result") setSeconds(0);
    }
  }, [mode]);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1600);
  };

  const startTest = () => {
    setAnswers({});
    setWritingAnswer("");
    setSeconds(0);
    setStageIdx(0);
    setMode("quiz");
  };

  const stageKey = STAGE_ORDER[stageIdx];
  const stageQs = useMemo(
    () => QUESTIONS.filter((q) => q.stage === stageKey),
    [stageKey],
  );

  const stageDone =
    stageKey === "writing"
      ? wordCount(writingAnswer) > 0
      : stageQs.every((q) => answers[q.id] !== undefined);

  const goNext = () => {
    if (!stageDone) {
      showToast(`Finish ${STAGE_META[stageKey].label} first`);
      return;
    }
    if (stageIdx < STAGE_ORDER.length - 1) {
      setStageIdx(stageIdx + 1);
    } else {
      setMode("result");
    }
  };

  const goPrev = () => {
    if (stageIdx > 0) setStageIdx(stageIdx - 1);
  };

  const pickChoice = (q: Question, choiceId: string) =>
    setAnswers((a) => ({ ...a, [q.id]: choiceId }));

  const playAudio = (q: Question) => {
    const used = audioPlays[q.id] || 0;
    if (used >= 2) {
      showToast("Audio limit reached");
      return;
    }
    setAudioPlays((p) => ({ ...p, [q.id]: used + 1 }));
    setAudioPlaying(q.id);
    setTimeout(() => setAudioPlaying(null), 1100);
  };

  // Grading
  const writingWords = wordCount(writingAnswer);
  const grading = useMemo(() => {
    const results = QUESTIONS.map((q) => {
      const choiceId = answers[q.id];
      const c = q.choices?.find((c) => c.id === choiceId);
      return { q, correct: !!c?.isCorrect, choiceId };
    });
    const correctCount = results.filter((r) => r.correct).length;
    const objectiveScore = correctCount * 10; // 8 q × 10 = 80
    const writingScore =
      writingWords >= 50 ? 20 : writingWords >= 35 ? 16 : writingWords >= 20 ? 10 : writingWords > 0 ? 5 : 0;
    const total = objectiveScore + writingScore;
    const dims: Record<Stage, { score: number; max: number }> = {
      listening: { score: 0, max: 20 },
      reading: { score: 0, max: 20 },
      grammar: { score: 0, max: 20 },
      vocabulary: { score: 0, max: 20 },
      writing: { score: writingScore, max: 20 },
    };
    results.forEach((r) => {
      if (r.correct) dims[r.q.stage].score += 10;
    });
    const level = total >= 85 ? "B1" : total >= 70 ? "A2" : total >= 45 ? "A1" : "Pre A1";
    const cambridge =
      total >= 85
        ? "Cambridge B1 Preliminary for Schools"
        : total >= 70
        ? "A2 Flyers"
        : total >= 45
        ? "A1 Movers"
        : "Pre A1 Starters";
    return { results, correctCount, total, dims, level, cambridge };
  }, [answers, writingWords]);

  // 7 segments: info + 5 stages + result
  const totalSteps = STAGE_ORDER.length + 2;
  const currentStep = mode === "info" ? 1 : mode === "result" ? totalSteps : stageIdx + 2;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] bg-white">
        {/* Top bar */}
        <div className="px-4 pt-4 flex items-center justify-between">
          <Link
            to="/"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          {(mode === "quiz" || mode === "info") && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-muted-foreground">
                {currentStep} / {totalSteps}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background: "color-mix(in oklab, var(--paisley) 12%, white)",
                  color: "var(--paisley)",
                }}
              >
                {mode === "info" ? "Info" : STAGE_META[stageKey].label}
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {fmtTime(mode === "info" ? 0 : seconds)}
              </span>
            </div>
          )}
          {mode === "result" && <span />}
          {mode === "locked" && <span />}
        </div>

        {/* Title — info/locked */}
        {(mode === "info" || mode === "locked") && (
          <div className="px-5 pt-3 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: "var(--paisley)", letterSpacing: "-0.01em" }}
            >
              CEFR Test
            </h1>
          </div>
        )}

        {/* Body */}
        <div className="px-5 pt-4 pb-10">
          {mode === "locked" && <LockedView />}
          {mode === "info" && <InfoView onStart={startTest} />}
          {mode === "quiz" && (
            <QuizView
              stageKey={stageKey}
              stageIdx={stageIdx}
              questions={stageQs}
              answers={answers}
              writingAnswer={writingAnswer}
              setWritingAnswer={setWritingAnswer}
              audioPlaying={audioPlaying}
              audioPlays={audioPlays}
              onPlay={playAudio}
              onPick={pickChoice}
              onPrev={goPrev}
              onNext={goNext}
              isLast={stageIdx === STAGE_ORDER.length - 1}
              stageDone={stageDone}
            />
          )}
          {mode === "result" && (
            <ResultView
              total={grading.total}
              level={grading.level}
              cambridge={grading.cambridge}
              timeText={fmtTime(seconds || 222)}
              dims={grading.dims}
              results={grading.results}
              writingAnswer={writingAnswer}
              writingWords={writingWords}
              onReview={(id) => setReviewId(id)}
            />
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold">
            {toast}
          </div>
        )}

        {reviewId && (
          <ReviewOverlay
            question={QUESTIONS.find((q) => q.id === reviewId)!}
            selected={answers[reviewId]}
            onClose={() => setReviewId(null)}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

// ───────── Locked ─────────
function LockedView() {
  return (
    <div className="mt-4 rounded-3xl bg-white border border-border p-5 text-center">
      <div
        className="mx-auto h-14 w-14 rounded-2xl grid place-items-center mb-3"
        style={{
          background: "color-mix(in oklab, var(--paisley) 14%, white)",
          color: "var(--paisley)",
        }}
      >
        <Lock className="h-6 w-6" />
      </div>
      <p className="font-semibold text-[16px]">CEFR Test is locked for now</p>
      <p className="text-[13px] text-muted-foreground mt-1">Available again in 60 days</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Last CEFR Test</p>
          <p className="text-[13px] font-semibold mt-1">Jun 11, 2026</p>
        </div>
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Next CEFR Test</p>
          <p className="text-[13px] font-semibold mt-1">Aug 10, 2026</p>
        </div>
      </div>
    </div>
  );
}

// ───────── Info ─────────
function InfoView({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <section className="rounded-3xl bg-white border border-border p-5">
        <p
          className="text-[20px] font-semibold leading-none"
          style={{ color: "var(--paisley)", letterSpacing: "-0.01em" }}
        >
          Level Check
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-semibold">
          {[
            "5 short parts: listening, reading, grammar, vocabulary, writing.",
            "Each audio can be played 2 times.",
            "Most children finish in 15-25 minutes.",
            "You'll see your CEFR level and Cambridge match.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--paisley) 14%, white)" }}
              >
                <Check className="h-3 w-3" style={{ color: "var(--paisley)" }} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-3xl bg-white border border-border p-4">
        <p className="text-[12px] font-semibold text-muted-foreground px-1 mb-2">Level Map</p>
        <div className="space-y-2">
          {LEVEL_LEGEND.map((l) => (
            <div key={l.level} className="flex items-center gap-3">
              <span
                className="w-14 shrink-0 rounded-full px-2 py-1 text-center text-[11px] font-semibold"
                style={{
                  background: "color-mix(in oklab, var(--paisley-yellow) 28%, white)",
                  color: "#7a5a36",
                }}
              >
                {l.level}
              </span>
              <span className="text-[12px] text-foreground/80">{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--paisley)", fontSize: "17.25px" }}
      >
        <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
        <span>Start Test</span>
      </button>
    </div>
  );
}

// ───────── Quiz ─────────
function QuizView({
  stageKey,
  stageIdx,
  questions,
  answers,
  writingAnswer,
  setWritingAnswer,
  audioPlaying,
  audioPlays,
  onPlay,
  onPick,
  onPrev,
  onNext,
  isLast,
  stageDone,
}: {
  stageKey: Stage;
  stageIdx: number;
  questions: Question[];
  answers: Record<string, string>;
  writingAnswer: string;
  setWritingAnswer: (v: string) => void;
  audioPlaying: string | null;
  audioPlays: Record<string, number>;
  onPlay: (q: Question) => void;
  onPick: (q: Question, choiceId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  stageDone: boolean;
}) {
  const meta = STAGE_META[stageKey];
  const Icon = meta.icon;
  const totalSegments = STAGE_ORDER.length;
  const words = wordCount(writingAnswer);

  return (
    <div>
      {/* Progress segments */}
      <div className="flex gap-1 mb-4">
        {STAGE_ORDER.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i < stageIdx
                  ? "var(--paisley)"
                  : i === stageIdx
                  ? "var(--paisley)"
                  : "color-mix(in oklab, var(--paisley) 10%, white)",
              opacity: i <= stageIdx ? 1 : 1,
            }}
          />
        ))}
      </div>

      {/* Stage banner */}
      <section
        className="rounded-3xl p-5 text-white"
        style={{ background: "var(--paisley)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="h-9 w-9 rounded-2xl grid place-items-center"
              style={{ background: "color-mix(in oklab, var(--paisley-yellow) 65%, white)", color: "var(--paisley)" }}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>
            <h2
              className="text-[22px] font-medium leading-none"
              style={{ letterSpacing: "-0.01em" }}
            >
              {meta.label}
            </h2>
          </div>
          <span
            className="text-[11px] font-semibold rounded-full px-2 py-0.5"
            style={{ background: "color-mix(in oklab, var(--paisley-yellow) 80%, white)", color: "#7a5a36" }}
          >
            {meta.points} Pt
          </span>
        </div>
        <p className="mt-2 text-[13px] font-semibold opacity-95">{meta.note}</p>
        <p className="mt-0.5 text-[12px] opacity-80">Stage {stageIdx + 1} of {totalSegments}</p>
      </section>

      {/* Reading passage */}
      {stageKey === "reading" && (
        <article
          className="mt-4 rounded-3xl p-4"
          style={{
            background: "color-mix(in oklab, var(--paisley-yellow) 18%, white)",
            border: "1px solid color-mix(in oklab, var(--paisley-yellow) 45%, white)",
          }}
        >
          <h3 className="text-[14px] font-semibold">{READING_PASSAGE.title}</h3>
          <div className="mt-2 space-y-2 text-[13px] leading-6 text-foreground/85">
            {READING_PASSAGE.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>
      )}

      {/* Questions */}
      {stageKey === "writing" ? (
        <section className="mt-4 rounded-3xl bg-white border border-border p-4">
          <h3 className="text-[14px] font-semibold">Write about your school day. Please include:</h3>
          <ul className="mt-3 space-y-1.5 text-[13px] font-semibold">
            {WRITING_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full grid place-items-center"
                  style={{ background: "color-mix(in oklab, var(--paisley) 14%, white)" }}
                >
                  <Check className="h-2.5 w-2.5" style={{ color: "var(--paisley)" }} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <label htmlFor="writing-answer" className="text-[12px] font-semibold text-muted-foreground">
              Your answer
            </label>
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              style={{
                background:
                  words >= 35
                    ? "color-mix(in oklab, var(--paisley) 12%, white)"
                    : "color-mix(in oklab, var(--paisley-yellow) 30%, white)",
                color: words >= 35 ? "var(--paisley)" : "#7a5a36",
              }}
            >
              {words} words
            </span>
          </div>
          <textarea
            id="writing-answer"
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            placeholder="Write here..."
            className="mt-2 min-h-[180px] w-full resize-none rounded-2xl border border-border bg-white p-3 text-[14px] leading-6 outline-none transition placeholder:text-muted-foreground focus:border-transparent focus:ring-2"
            style={{ ["--tw-ring-color" as string]: "var(--paisley)" }}
          />
        </section>
      ) : (
        <div className="mt-4 space-y-3">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              qNum={i + 1}
              selected={answers[q.id]}
              audioPlaying={audioPlaying === q.id}
              plays={audioPlays[q.id] || 0}
              onPlay={() => onPlay(q)}
              onPick={(cid) => onPick(q, cid)}
            />
          ))}
        </div>
      )}

      {/* Nav */}
      <div className="mt-5 flex gap-2.5">
        {stageIdx > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 rounded-full py-3.5 font-semibold border border-border bg-white text-[14px]"
            style={{ color: "var(--paisley)" }}
          >
            Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-[2] rounded-full py-3.5 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5 text-[14px]"
          style={{
            background: stageDone
              ? "var(--paisley)"
              : "color-mix(in oklab, var(--paisley) 35%, white)",
          }}
        >
          {isLast ? "Submit" : "Next"}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
  qNum,
  selected,
  audioPlaying,
  plays,
  onPlay,
  onPick,
}: {
  q: Question;
  qNum: number;
  selected?: string;
  audioPlaying: boolean;
  plays: number;
  onPlay: () => void;
  onPick: (choiceId: string) => void;
}) {
  const singleCol = shouldSingleColumn(q.choices);

  return (
    <section className="rounded-3xl bg-white border border-border p-4">
      <div className="flex items-start gap-3">
        <span
          className="h-7 w-7 grid place-items-center rounded-full text-[12px] font-semibold shrink-0"
          style={{
            background: "color-mix(in oklab, var(--paisley) 12%, white)",
            color: "var(--paisley)",
          }}
        >
          {qNum}
        </span>

        {q.stage === "listening" ? (
          <div className="flex-1 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onPlay}
              aria-label={audioPlaying ? "Playing" : "Play audio"}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white text-[12px] font-semibold active:scale-95 shadow"
              style={{
                background: plays >= 2 ? "color-mix(in oklab, var(--paisley) 35%, white)" : "var(--paisley)",
              }}
              disabled={plays >= 2}
            >
              <Volume2 className="h-3.5 w-3.5" />
              {audioPlaying ? "Playing…" : plays >= 2 ? "Limit" : `Play ${plays}/2`}
            </button>
            <span className="text-[13px] font-semibold text-foreground/85 text-right">{q.prompt}</span>
          </div>
        ) : (
          <p className="text-[14px] font-semibold leading-5 text-foreground">{q.prompt}</p>
        )}
      </div>

      <div className={`mt-3 ${singleCol ? "space-y-2" : "grid grid-cols-2 gap-2"}`}>
        {q.choices?.map((c) => {
          const sel = selected === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(c.id)}
              className="rounded-2xl border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors"
              style={{
                background: sel
                  ? "color-mix(in oklab, var(--paisley) 10%, white)"
                  : "white",
                borderColor: sel ? "var(--paisley)" : "var(--border)",
                color: sel ? "var(--paisley)" : "var(--foreground)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ───────── Result ─────────
function ResultView({
  total,
  level,
  cambridge,
  timeText,
  dims,
  results,
  writingAnswer,
  writingWords,
  onReview,
}: {
  total: number;
  level: string;
  cambridge: string;
  timeText: string;
  dims: Record<Stage, { score: number; max: number }>;
  results: { q: Question; correct: boolean }[];
  writingAnswer: string;
  writingWords: number;
  onReview: (id: string) => void;
}) {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative rounded-[28px] px-5 pt-6 pb-7 text-white text-center overflow-hidden"
        style={{ background: "var(--paisley)" }}
      >
        <h2
          className="text-center text-[22px] font-medium leading-none"
          style={{ letterSpacing: "-0.01em", color: "white" }}
        >
          Test Completed!
        </h2>
        <div className="mt-3">
          <ProgressBar value={100} color="#ffffff" track="rgba(255,255,255,0.22)" height={1.6} />
        </div>
        <p className="mt-7 text-[13px] font-semibold opacity-90">Your CEFR Level</p>
        <p
          className="mt-2 text-[46px] font-medium leading-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          {level}
        </p>
        <p className="mt-2 text-[12px] opacity-90">{cambridge}</p>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--paisley) 14%, white)",
              color: "var(--paisley)",
            }}
          >
            Test Time {timeText}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--paisley-yellow) 80%, white)",
              color: "#7a5a36",
            }}
          >
            {total} / 100 Pts
          </span>
        </div>
      </section>

      {/* Section scores */}
      <section className="mt-5">
        <p className="text-[14px] font-semibold mb-2 px-1">Section Scores</p>
        <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
          {STAGE_ORDER.map((s) => {
            const d = dims[s];
            const pct = d.max ? Math.round((d.score / d.max) * 100) : 0;
            return (
              <div key={s} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold">{STAGE_META[s].label}</p>
                  <p className="text-[12px] font-semibold text-muted-foreground">
                    {d.score} / {d.max}
                  </p>
                </div>
                <div
                  className="mt-1.5 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "color-mix(in oklab, var(--paisley) 10%, white)" }}
                >
                  <div className="h-full" style={{ width: `${pct}%`, background: "var(--paisley)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Answer review */}
      <section className="mt-5">
        <p className="text-[14px] font-semibold mb-2 px-1">Answer Review</p>
        <div className="space-y-4">
          {STAGE_ORDER.filter((s) => s !== "writing").map((s) => {
            const items = results.filter((r) => r.q.stage === s);
            return (
              <div key={s}>
                <p className="text-[11px] font-semibold text-muted-foreground px-1 mb-1.5">
                  {STAGE_META[s].label}
                </p>
                <div className="rounded-2xl bg-white border border-border divide-y divide-border overflow-hidden">
                  {items.map((r, idx) => (
                    <button
                      key={r.q.id}
                      onClick={() => onReview(r.q.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left active:bg-muted/40"
                    >
                      <span className="text-[11px] font-semibold text-muted-foreground w-5">
                        Q{idx + 1}
                      </span>
                      <span className="flex-1 text-[13px] font-semibold truncate">{r.q.prompt}</span>
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white shrink-0"
                        style={{
                          background: r.correct ? "var(--paisley)" : "#d97a6a",
                        }}
                      >
                        {r.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {/* Writing */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground px-1 mb-1.5">Writing</p>
            <div className="rounded-2xl bg-white border border-border p-4">
              <p className="text-[13px] leading-6 text-foreground/85">
                {writingAnswer || "No writing answer saved."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{
                    background: "color-mix(in oklab, var(--paisley) 12%, white)",
                    color: "var(--paisley)",
                  }}
                >
                  Score: {dims.writing.score} / 20
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{
                    background: "color-mix(in oklab, var(--paisley-yellow) 60%, white)",
                    color: "#7a5a36",
                  }}
                >
                  Words: {writingWords}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link
        to="/"
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--paisley)", fontSize: "17.25px" }}
      >
        <span>Back to Home</span>
      </Link>
    </div>
  );
}

// ───────── Review Overlay ─────────
function ReviewOverlay({
  question,
  selected,
  onClose,
}: {
  question: Question;
  selected?: string;
  onClose: () => void;
}) {
  const correctChoice = question.choices?.find((c) => c.isCorrect);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {STAGE_META[question.stage].label} · Q{question.number}
          </p>
          <button onClick={onClose} className="h-7 w-7 grid place-items-center rounded-full bg-muted/40">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-6">{question.prompt}</p>

        <div className="mt-3 space-y-2">
          {question.choices?.map((c) => {
            const isMine = selected === c.id;
            const isRight = c.isCorrect;
            return (
              <div
                key={c.id}
                className="rounded-2xl border px-3 py-2.5 text-[13px] font-semibold flex items-center justify-between"
                style={{
                  background: isRight
                    ? "color-mix(in oklab, var(--paisley) 10%, white)"
                    : isMine
                    ? "color-mix(in oklab, var(--paisley-yellow) 28%, white)"
                    : "white",
                  borderColor: isRight
                    ? "var(--paisley)"
                    : isMine
                    ? "var(--paisley-yellow)"
                    : "var(--border)",
                }}
              >
                <span>{c.label}</span>
                <span className="flex gap-1">
                  {isRight && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] text-white"
                      style={{ background: "var(--paisley)" }}
                    >
                      Right
                    </span>
                  )}
                  {isMine && !isRight && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px]"
                      style={{ background: "var(--paisley-yellow)", color: "#7a5a36" }}
                    >
                      Mine
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        {correctChoice && (
          <p className="text-[12px] text-muted-foreground mt-3">
            Correct: {correctChoice.label}
          </p>
        )}
      </div>
    </div>
  );
}