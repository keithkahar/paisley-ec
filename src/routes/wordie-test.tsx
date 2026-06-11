import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ProgressBar } from "@/components/app/WordieKit";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  Volume2,
  Mic,
  Check,
  X,
  Clock,
  Lock,
  ChevronRight,
  Play,
} from "lucide-react";

export const Route = createFileRoute("/wordie-test")({
  head: () => ({ meta: [{ title: "Wordie Test — Paisley EC" }] }),
  component: WordieTestPage,
});

// ───────── Stage meta (Listening / Pronunciation / Spelling / Definition / Usage / POS) ─────────
type Stage =
  | "pronunciationListen"
  | "pronunciationSpeak"
  | "spelling"
  | "meaning"
  | "usage"
  | "partOfSpeech";

const STAGE_ORDER: Stage[] = [
  "pronunciationListen",
  "pronunciationSpeak",
  "spelling",
  "meaning",
  "usage",
  "partOfSpeech",
];

const STAGE_META: Record<
  Stage,
  { label: string; subtitle: string; note: string; points: number; color: string }
> = {
  pronunciationListen: {
    label: "Listening",
    subtitle: "Click play to listen.",
    note: "Each question will be read 2 times.",
    points: 3,
    color: "var(--wordie)",
  },
  pronunciationSpeak: {
    label: "Pronunciation",
    subtitle: "Read the word, then say it clearly.",
    note: "Hold Record and release when finished.",
    points: 3,
    color: "var(--wordie)",
  },
  spelling: {
    label: "Spelling",
    subtitle: "Choose the correct spelling.",
    note: "Look at every word carefully",
    points: 4,
    color: "var(--wordie)",
  },
  meaning: {
    label: "Definition",
    subtitle: "Choose the matching definition.",
    note: "Read every choice carefully.",
    points: 4,
    color: "var(--wordie)",
  },
  usage: {
    label: "Usage",
    subtitle: "Choose the sentence that uses the word correctly.",
    note: "Which sentence uses the word correctly?",
    points: 4,
    color: "var(--wordie)",
  },
  partOfSpeech: {
    label: "Part of Speech",
    subtitle: "Choose what kind of word it is.",
    note: "Choose the correct part of speech for the word",
    points: 2,
    color: "var(--wordie)",
  },
};

// ───────── Mock 20 questions ─────────
type Choice = { id: string; label: string; isCorrect: boolean };
type Question = {
  id: string;
  stage: Stage;
  word: string;
  ipa?: string;
  pos?: string;
  choices?: Choice[]; // none for pronunciationSpeak
};

const mk = (id: string, stage: Stage, word: string, choices: [string, boolean][], extra: Partial<Question> = {}): Question => ({
  id,
  stage,
  word,
  choices: choices.map(([label, isCorrect], i) => ({ id: `${id}-${i}`, label, isCorrect })),
  ...extra,
});

const QUESTIONS: Question[] = [
  // Listening (3)
  mk("L1", "pronunciationListen", "garden", [["garden", true], ["harden", false], ["gather", false], ["golden", false]]),
  mk("L2", "pronunciationListen", "whisper", [["whisper", true], ["wisdom", false], ["whistle", false], ["winter", false]]),
  mk("L3", "pronunciationListen", "brave", [["brave", true], ["break", false], ["brain", false], ["bread", false]]),
  // Pronunciation (3) — record, no choices
  { id: "P1", stage: "pronunciationSpeak", word: "curious", ipa: "ˈkjʊəriəs" },
  { id: "P2", stage: "pronunciationSpeak", word: "gentle", ipa: "ˈdʒentl" },
  { id: "P3", stage: "pronunciationSpeak", word: "kite", ipa: "kaɪt" },
  // Spelling (4)
  mk("S1", "spelling", "rescue", [["rescue", true], ["rescew", false], ["reskue", false], ["resque", false]]),
  mk("S2", "spelling", "harvest", [["harvest", true], ["harvist", false], ["harvast", false], ["harvert", false]]),
  mk("S3", "spelling", "thunder", [["thunder", true], ["thunser", false], ["thander", false], ["thuner", false]]),
  mk("S4", "spelling", "vacation", [["vacation", true], ["vakation", false], ["vacasion", false], ["vacatoin", false]]),
  // Definition (4)
  mk("M1", "meaning", "marvelous", [
    ["wonderful and impressive", true],
    ["sad and tired", false],
    ["small and quiet", false],
    ["loud and angry", false],
  ]),
  mk("M2", "meaning", "puzzle", [
    ["a game to solve", true],
    ["a kind of soup", false],
    ["a small bird", false],
    ["a heavy box", false],
  ]),
  mk("M3", "meaning", "brave", [
    ["showing courage", true],
    ["feeling afraid", false],
    ["being lazy", false],
    ["talking loudly", false],
  ]),
  mk("M4", "meaning", "gentle", [
    ["kind and soft", true],
    ["sharp and hard", false],
    ["dark and cold", false],
    ["fast and loud", false],
  ]),
  // Usage (4)
  mk("U1", "usage", "whisper", [
    ["She likes to whisper secrets to her friend.", true],
    ["He whisper the heavy box up the stairs.", false],
    ["The cat whisper across the kitchen floor.", false],
    ["They whisper a pizza for dinner.", false],
  ]),
  mk("U2", "usage", "curious", [
    ["The curious kitten peeked into the box.", true],
    ["She curious the milk into the cup.", false],
    ["He runs very curious every morning.", false],
    ["They built a curious out of bricks.", false],
  ]),
  mk("U3", "usage", "rescue", [
    ["Firefighters rescue the cat from the tree.", true],
    ["I rescue my lunch in the microwave.", false],
    ["She rescue a song on the piano.", false],
    ["The clouds rescue across the sky.", false],
  ]),
  mk("U4", "usage", "harvest", [
    ["Farmers harvest apples in the autumn.", true],
    ["He harvest the door before leaving.", false],
    ["She harvest happy when she sings.", false],
    ["The dog harvest under the table.", false],
  ]),
  // POS (2)
  mk("Q1", "partOfSpeech", "garden", [["Noun", true], ["Verb", false], ["Adjective", false], ["Adverb", false]], { pos: "noun" }),
  mk("Q2", "partOfSpeech", "brave", [["Adjective", true], ["Noun", false], ["Verb", false], ["Adverb", false]], { pos: "adjective" }),
];

// ───────── Helpers ─────────
function shouldSingleColumn(stage: Stage, choices: Choice[] | undefined) {
  if (stage === "spelling") return true;
  if (!choices) return false;
  return choices.some((c) => c.label.length > 16 || c.label.split(/\s+/).length > 2);
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ───────── Page ─────────
type Mode = "locked" | "info" | "quiz" | "result";
type Answer = { choiceId?: string; record?: { scorable: boolean; score: number; band: "great" | "good" | "retry" } };

// Toggle to preview the locked state in the prototype.
const START_LOCKED = false;

function WordieTestPage() {
  const initialLocked =
    START_LOCKED ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("locked") === "1");
  const [mode, setMode] = useState<Mode>(initialLocked ? "locked" : "info");
  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [seconds, setSeconds] = useState(0);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRecordingRef = useRef<string | null>(null);

  // Timer: runs only in quiz mode
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
    setSeconds(0);
    setStageIdx(0);
    setMode("quiz");
  };

  const stageKey = STAGE_ORDER[stageIdx];
  const stageQs = useMemo(
    () => QUESTIONS.filter((q) => q.stage === stageKey),
    [stageKey],
  );

  const stageDone = stageQs.every((q) =>
    q.stage === "pronunciationSpeak"
      ? answers[q.id]?.record !== undefined
      : answers[q.id]?.choiceId !== undefined,
  );

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

  const pickChoice = (q: Question, choiceId: string) => {
    setAnswers((a) => ({ ...a, [q.id]: { choiceId } }));
  };

  const startRecording = (q: Question) => {
    activeRecordingRef.current = q.id;
    setRecordingId(q.id);
  };

  const stopRecording = (q: Question) => {
    if (activeRecordingRef.current !== q.id) return;
    activeRecordingRef.current = null;
    setRecordingId(null);
    // mock: 70% great, 20% good, 10% retry
    const r = Math.random();
    const band: "great" | "good" | "retry" = r < 0.7 ? "great" : r < 0.9 ? "good" : "retry";
    const score = band === "great" ? 92 : band === "good" ? 78 : 55;
    setAnswers((a) => ({
      ...a,
      [q.id]: { record: { scorable: true, score, band } },
    }));
  };

  const playAudio = (q: Question) => {
    setAudioPlaying(q.id);
    setTimeout(() => setAudioPlaying(null), 1100);
  };

  // ───── Grading ─────
  const grading = useMemo(() => {
    const results = QUESTIONS.map((q) => {
      const a = answers[q.id];
      let correct = false;
      if (q.stage === "pronunciationSpeak") {
        correct = !!(a?.record?.scorable && a.record.score >= 70);
      } else {
        const c = q.choices?.find((c) => c.id === a?.choiceId);
        correct = !!c?.isCorrect;
      }
      return { q, a, correct };
    });
    const correctCount = results.filter((r) => r.correct).length;
    const score = Math.round((correctCount / QUESTIONS.length) * 100);
    const dims: Record<Stage, { correct: number; total: number }> = {
      pronunciationListen: { correct: 0, total: 0 },
      pronunciationSpeak: { correct: 0, total: 0 },
      spelling: { correct: 0, total: 0 },
      meaning: { correct: 0, total: 0 },
      usage: { correct: 0, total: 0 },
      partOfSpeech: { correct: 0, total: 0 },
    };
    results.forEach((r) => {
      dims[r.q.stage].total += 1;
      if (r.correct) dims[r.q.stage].correct += 1;
    });
    return { results, correctCount, score, dims };
  }, [answers]);

  const bp = useMemo(() => {
    const s = grading.score;
    let b = 5;
    if (s >= 90) b += 15;
    else if (s >= 80) b += 10;
    else if (s >= 70) b += 6;
    else if (s >= 60) b += 3;
    return Math.min(20, b);
  }, [grading.score]);

  // ───── Render ─────
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] bg-white">
        {/* Top bar */}
        <div className="px-4 pt-4 flex items-center justify-between">
          <Link
            to="/mywordie"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          {mode === "quiz" || mode === "info" ? (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-muted-foreground">
                {mode === "info" ? 1 : stageIdx + 2} / 7
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                style={{
                  background:
                    mode === "info"
                      ? "color-mix(in oklab, var(--wordie) 12%, white)"
                      : `color-mix(in oklab, ${STAGE_META[stageKey].color} 14%, white)`,
                  color: mode === "info" ? "var(--wordie)" : STAGE_META[stageKey].color,
                }}
              >
                {mode === "info" ? "Info" : STAGE_META[stageKey].label}
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-bold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {fmtTime(mode === "info" ? 0 : seconds)}
              </span>
            </div>
          ) : (
            <span />
          )}
        </div>

        {/* Title — only show in info/locked */}
        {(mode === "info" || mode === "locked") && (
          <div className="px-5 pt-3 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-semibold tracking-tight"
              style={{ color: "var(--wordie)", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              Wordie Test
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
              audioPlaying={audioPlaying}
              recordingId={recordingId}
              onPlay={playAudio}
              onRecordStart={startRecording}
              onRecordStop={stopRecording}
              onPick={pickChoice}
              onPrev={goPrev}
              onNext={goNext}
              isLast={stageIdx === STAGE_ORDER.length - 1}
              stageDone={stageDone}
            />
          )}
          {mode === "result" && (
            <ResultView
              score={grading.score}
              correct={grading.correctCount}
              total={QUESTIONS.length}
              timeText={fmtTime(seconds || 222)}
              dims={grading.dims}
              results={grading.results}
              bp={bp}
              onReview={(id) => setReviewId(id)}
            />
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-bold">
            {toast}
          </div>
        )}

        {/* Review overlay */}
        {reviewId && (
          <ReviewOverlay
            question={QUESTIONS.find((q) => q.id === reviewId)!}
            answer={answers[reviewId]}
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
          background: "color-mix(in oklab, var(--wordie) 14%, white)",
          color: "var(--wordie)",
        }}
      >
        <Lock className="h-6 w-6" />
      </div>
      <p className="font-bold text-[16px]">Wordie Test is locked for now</p>
      <p className="text-[13px] text-muted-foreground mt-1">Available in 4 days</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-bold text-muted-foreground">Last Wordie Test</p>
          <p className="text-[13px] font-bold mt-1">Jun 5 · #02</p>
        </div>
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-bold text-muted-foreground">Next Wordie Test</p>
          <p className="text-[13px] font-bold mt-1">Jun 12 · #03</p>
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
          className="text-[20px] font-bold leading-none"
          style={{ color: "var(--wordie)", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
        >
          #03
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-bold">
          {[
            "Finish the test to see your result.",
            "Each audio can be played 2 times.",
            "Read all choices carefully.",
            "Try to repeat the words clearly.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
              >
                <Check className="h-3 w-3" style={{ color: "var(--wordie)" }} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-full py-3 font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--wordie)", fontFamily: "var(--font-sans)", fontSize: "17.25px" }}
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
  audioPlaying,
  recordingId,
  onPlay,
  onRecordStart,
  onRecordStop,
  onPick,
  onPrev,
  onNext,
  isLast,
  stageDone,
}: {
  stageKey: Stage;
  stageIdx: number;
  questions: Question[];
  answers: Record<string, Answer>;
  audioPlaying: string | null;
  recordingId: string | null;
  onPlay: (q: Question) => void;
  onRecordStart: (q: Question) => void;
  onRecordStop: (q: Question) => void;
  onPick: (q: Question, choiceId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  stageDone: boolean;
}) {
  const meta = STAGE_META[stageKey];

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
                  ? "var(--wordie)"
                  : i === stageIdx
                  ? meta.color
                  : "color-mix(in oklab, var(--wordie) 10%, white)",
            }}
          />
        ))}
      </div>

      {/* Stage banner */}
      <section
        className="rounded-3xl p-5 text-white"
        style={{ background: meta.color }}
      >
        <div className="flex items-center justify-between">
          <h2
            className="text-[24px] font-bold leading-none"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            {meta.label}
          </h2>
          <span className="text-[11px] font-bold rounded-full bg-white/22 px-2 py-0.5">
            {meta.points} Pt
          </span>
        </div>
        <p className="mt-2 text-[13px] font-bold opacity-95">{meta.note}</p>
      </section>

      {/* Questions */}
      <div className="mt-4 space-y-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            q={q}
            qNum={i + 1}
            answer={answers[q.id]}
            audioPlaying={audioPlaying === q.id}
            recording={recordingId === q.id}
            onPlay={() => onPlay(q)}
              onRecordStart={() => onRecordStart(q)}
              onRecordStop={() => onRecordStop(q)}
            onPick={(cid) => onPick(q, cid)}
          />
        ))}
      </div>

      {/* Nav */}
      <div className="mt-5 flex gap-2.5">
        {stageIdx > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 rounded-full py-3.5 font-bold border border-border bg-white text-[14px]"
            style={{ color: "var(--wordie)" }}
          >
            Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-[2] rounded-full py-3.5 font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5 text-[14px]"
          style={{
            background: stageDone ? "var(--wordie)" : "color-mix(in oklab, var(--wordie) 35%, white)",
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
  answer,
  audioPlaying,
  recording,
  onPlay,
  onRecordStart,
  onRecordStop,
  onPick,
}: {
  q: Question;
  qNum: number;
  answer?: Answer;
  audioPlaying: boolean;
  recording: boolean;
  onPlay: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
  onPick: (choiceId: string) => void;
}) {
  const singleCol = shouldSingleColumn(q.stage, q.choices);

  return (
    <section className="rounded-3xl bg-white border border-border p-4">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <span
          className="h-7 w-7 grid place-items-center rounded-full text-[12px] font-bold shrink-0"
          style={{
            background: "color-mix(in oklab, var(--wordie) 12%, white)",
            color: "var(--wordie)",
          }}
        >
          {qNum}
        </span>

        {q.stage === "pronunciationListen" && (
          <button
            type="button"
            onClick={onPlay}
            aria-label={audioPlaying ? "Playing" : "Play audio"}
            className="h-8 w-8 grid place-items-center rounded-full text-white active:scale-95 shadow"
            style={{ background: "var(--wordie)" }}
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        )}

        {q.stage === "pronunciationSpeak" && (
          <div className="flex items-baseline gap-2">
            <span
              className="text-[20px] font-bold"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              {q.word}
            </span>
            {q.ipa && (
              <span className="text-[11px] text-muted-foreground font-medium">/{q.ipa}/</span>
            )}
          </div>
        )}

        {q.stage !== "pronunciationListen" &&
          q.stage !== "pronunciationSpeak" &&
          q.stage !== "spelling" && (
            <span
              className="text-[20px] font-bold"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              {q.word}
            </span>
          )}
      </div>

      {/* Body */}
      {q.stage === "pronunciationSpeak" ? (
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="button"
            onPointerDown={onRecordStart}
            onPointerUp={onRecordStop}
            onPointerLeave={onRecordStop}
            onPointerCancel={onRecordStop}
            onContextMenu={(event) => event.preventDefault()}
            className="h-14 w-14 rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform touch-none"
            style={{
              background: recording ? "var(--wordie-accent)" : "var(--wordie)",
            }}
          >
            <Mic className="h-6 w-6" />
          </button>
          <p className="text-[12px] font-bold text-muted-foreground">
            {recording
              ? "Recording…"
              : answer?.record
              ? answer.record.band === "great"
                ? "Clear voice"
                : answer.record.band === "good"
                ? "Checked"
                : "Needs review"
              : "Tap to record"}
          </p>
        </div>
      ) : (
        <div
          className={`mt-3 ${singleCol ? "space-y-2" : "grid grid-cols-2 gap-2"}`}
        >
          {q.choices?.map((c) => {
            const selected = answer?.choiceId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onPick(c.id)}
                className="rounded-2xl border px-3 py-2.5 text-left text-[14px] font-bold transition-colors"
                style={{
                  background: selected
                    ? "color-mix(in oklab, var(--wordie) 10%, white)"
                    : "white",
                  borderColor: selected ? "var(--wordie)" : "var(--border)",
                  color: selected ? "var(--wordie)" : "var(--foreground)",
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ───────── Result ─────────
function ResultView({
  score,
  correct,
  total,
  timeText,
  dims,
  results,
  bp,
  onReview,
}: {
  score: number;
  correct: number;
  total: number;
  timeText: string;
  dims: Record<Stage, { correct: number; total: number }>;
  results: { q: Question; correct: boolean }[];
  bp: number;
  onReview: (id: string) => void;
}) {
  return (
    <div>
      <section
        className="relative rounded-[28px] px-5 pt-6 pb-7 text-white text-center overflow-hidden"
        style={{ background: "var(--wordie)" }}
      >
        <div>
          <h2
            className="text-center text-[22px] font-bold leading-none"
            style={{
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em",
              color: "white",
            }}
          >
            Test Completed!
          </h2>
          <div className="mt-3">
            <ProgressBar
              value={100}
              color="#ffffff"
              track="rgba(255,255,255,0.22)"
              height={1.6}
            />
          </div>
        </div>
        <p className="mt-7 text-[13px] font-bold opacity-90">
          Your Wordie Test score
        </p>
        <p
          className="mt-2 text-[46px] font-bold leading-none"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
        >
          {score}
          <span className="text-[24px] opacity-90 font-bold ml-1" style={{ letterSpacing: "-0.01em" }}>%</span>
        </p>
        <p className="mt-2 text-[13px] font-bold opacity-90">
          {correct} / {total} correct
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{
              background: "color-mix(in oklab, var(--wordie) 14%, white)",
              color: "var(--wordie)",
            }}
          >
            Test Time {timeText}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{
              background: "color-mix(in oklab, var(--bloxia) 14%, white)",
              color: "var(--bloxia)",
            }}
          >
            +{bp} Bp
          </span>
        </div>
      </section>

      {/* Dimension rows */}
      <section className="mt-5">
        <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
          {STAGE_ORDER.map((s) => {
            const d = dims[s];
            const pct = d.total ? Math.round((d.correct / d.total) * 100) : 0;
            return (
              <div key={s} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold">{STAGE_META[s].label}</p>
                  <p className="text-[12px] font-bold text-muted-foreground">
                    {d.correct} / {d.total}
                  </p>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: "color-mix(in oklab, var(--wordie) 10%, white)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: "var(--wordie)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Answer review */}
      <section className="mt-5">
        <p className="text-[14px] font-bold text-foreground mb-2 px-1">
          Answer Review
        </p>
        <div className="space-y-4">
          {STAGE_ORDER.map((s) => {
            const items = results.filter((r) => r.q.stage === s);
            return (
              <div key={s}>
                <p className="text-[11px] font-bold text-muted-foreground px-1 mb-1.5">
                  {STAGE_META[s].label}
                </p>
                <div className="rounded-2xl bg-white border border-border divide-y divide-border overflow-hidden">
                  {items.map((r, idx) => (
                    <button
                      key={r.q.id}
                      onClick={() => onReview(r.q.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left active:bg-muted/40"
                    >
                      <span className="text-[11px] font-bold text-muted-foreground w-5">
                        Q{idx + 1}
                      </span>
                      <span className="flex-1 text-[13px] font-bold">{r.q.word}</span>
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: r.correct ? "var(--wordie)" : "var(--wordie-accent)" }}
                      >
                        {r.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Link
        to="/mywordie"
        className="mt-5 w-full rounded-full py-3 font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--wordie)", fontFamily: "var(--font-sans)", fontSize: "17.25px" }}
      >
        <span>Back to myWordie</span>
      </Link>
    </div>
  );
}

// ───────── Review Overlay ─────────
function ReviewOverlay({
  question,
  answer,
  onClose,
}: {
  question: Question;
  answer?: Answer;
  onClose: () => void;
}) {
  const correctChoice = question.choices?.find((c) => c.isCorrect);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold text-muted-foreground">
            {STAGE_META[question.stage].label}
          </p>
          <button onClick={onClose} className="h-7 w-7 grid place-items-center rounded-full bg-muted/40">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p
          className="mt-2 text-[22px] font-bold"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
        >
          {question.word}
        </p>

        {question.stage === "pronunciationSpeak" ? (
          <div className="mt-4 rounded-2xl bg-muted/30 p-3 text-[13px]">
            <p className="font-bold">Pronunciation score</p>
            <p className="text-muted-foreground mt-0.5">
              {answer?.record
                ? `${answer.record.score} · ${
                    answer.record.band === "great"
                      ? "Clear voice"
                      : answer.record.band === "good"
                      ? "Checked"
                      : "Needs review"
                  }`
                : "Not recorded"}
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {question.choices?.map((c) => {
              const isMine = answer?.choiceId === c.id;
              const isRight = c.isCorrect;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border px-3 py-2.5 text-[13px] font-bold flex items-center justify-between"
                  style={{
                    background: isRight
                      ? "color-mix(in oklab, var(--wordie) 10%, white)"
                      : isMine
                      ? "color-mix(in oklab, var(--wordie-accent) 12%, white)"
                      : "white",
                    borderColor: isRight
                      ? "var(--wordie)"
                      : isMine
                      ? "var(--wordie-accent)"
                      : "var(--border)",
                  }}
                >
                  <span>{c.label}</span>
                  <span className="flex gap-1">
                    {isRight && (
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: "var(--wordie)" }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {isMine && !isRight && (
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: "var(--wordie-accent)" }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
            {correctChoice && (
              <p className="text-[12px] text-muted-foreground mt-1">
                Correct: {correctChoice.label}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
