import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useState } from "react";
import {
  ClipboardCheck,
  Volume2,
  Check,
  RotateCcw,
  Trophy,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ProgressBar, StatusBadge } from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-test")({
  head: () => ({ meta: [{ title: "Wordie Test — Paisley EC" }] }),
  component: WordieTestPage,
});

type TestState = "intro" | "question" | "result";

const QUESTION = {
  index: 3,
  total: 10,
  prompt: "Which word means 'speak very softly'?",
  choices: ["thunder", "whisper", "garden", "puzzle"],
  answerIndex: 1,
};

const MISSED = [
  { word: "marvelous", meaning: "wonderful" },
  { word: "rescue", meaning: "save from danger" },
];

function WordieTestPage() {
  const [state, setState] = useState<TestState>("intro");
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader
        title=""
        back={state === "intro" ? "/mywordie" : false}
        right={
          state !== "intro" ? (
            <button
              onClick={() => {
                setState("intro");
                reset();
              }}
              className="text-[12px] font-bold text-muted-foreground"
            >
              Exit
            </button>
          ) : undefined
        }
        bg="white"
      />

      <div className="px-5 pb-10">
        {/* State switcher (prototype helper) */}
        <div className="mb-3 flex gap-1 rounded-full bg-white border border-border p-1 text-[11px] font-bold">
          {(["intro", "question", "result"] as TestState[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                setState(s);
                reset();
              }}
              className="flex-1 rounded-full py-1.5 transition-colors capitalize"
              style={
                state === s
                  ? { background: "var(--wordie)", color: "white" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {state === "intro" && <IntroView onStart={() => setState("question")} />}
        {state === "question" && (
          <QuestionView
            selected={selected}
            revealed={revealed}
            onSelect={handleSelect}
            onContinue={() => {
              reset();
              setState("result");
            }}
          />
        )}
        {state === "result" && (
          <ResultView
            onRetake={() => {
              reset();
              setState("question");
            }}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <section
        className="relative rounded-[28px] p-5 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(140deg, var(--shirin) 0%, oklch(0.62 0.22 8) 60%, oklch(0.55 0.22 5) 100%)",
        }}
      >
        <div
          className="absolute -top-10 -right-10 h-36 w-36 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
          aria-hidden
        />
        <div className="inline-flex items-center gap-1 rounded-full bg-white/22 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
          <ClipboardCheck className="h-3.5 w-3.5" /> Quick check
        </div>
        <h2
          className="mt-3 text-[26px] leading-[1.15] font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
        >
          Ready for a quick check?
        </h2>
        <p className="mt-1 text-[13px] opacity-90 font-medium">
          10 questions · about 3 minutes · no pressure.
        </p>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <IntroStat label="Questions" value="10" />
        <IntroStat label="Best score" value="8/10" />
        <IntroStat label="Bp reward" value="+80" />
      </div>

      <section className="mt-5 rounded-3xl bg-white border border-border p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          Test types today
        </p>
        <ul className="mt-3 space-y-2 text-[13px] font-bold">
          {[
            "Choose the meaning",
            "Listen and pick",
            "Match word and meaning",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span
                className="h-5 w-5 rounded-full grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
              >
                <Check className="h-3 w-3" style={{ color: "var(--wordie)" }} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-full py-4 font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--shirin)", fontFamily: "var(--font-sans)", fontSize: "16px" }}
      >
        Start test
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function IntroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-border px-3 py-3 text-center">
      <p className="text-[18px] font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

function QuestionView({
  selected,
  revealed,
  onSelect,
  onContinue,
}: {
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
  onContinue: () => void;
}) {
  const isCorrect = selected === QUESTION.answerIndex;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] font-bold text-muted-foreground">
          Question {QUESTION.index} of {QUESTION.total}
        </p>
        <p className="text-[12px] font-bold" style={{ color: "var(--wordie)" }}>
          {Math.round((QUESTION.index / QUESTION.total) * 100)}%
        </p>
      </div>
      <ProgressBar value={(QUESTION.index / QUESTION.total) * 100} />

      {/* Question card */}
      <section className="mt-4 rounded-3xl bg-white border border-border p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Choose the meaning
          </p>
          <button
            type="button"
            className="h-9 w-9 rounded-full grid place-items-center text-white active:scale-95 transition-transform"
            style={{ background: "var(--wordie)" }}
            aria-label="Play pronunciation"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        <h2
          className="mt-3 text-[22px] leading-[1.2] font-semibold"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
        >
          {QUESTION.prompt}
        </h2>

        <div className="mt-4 space-y-2.5">
          {QUESTION.choices.map((c, i) => {
            const isSelected = selected === i;
            const isAnswer = i === QUESTION.answerIndex;
            let style: React.CSSProperties = {
              background: "white",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            };
            if (revealed && isAnswer) {
              style = {
                background: "color-mix(in oklab, var(--bloxia) 12%, white)",
                borderColor: "var(--bloxia)",
                color: "var(--bloxia-deep)",
              };
            } else if (revealed && isSelected && !isAnswer) {
              style = {
                background: "color-mix(in oklab, var(--shirin) 10%, white)",
                borderColor: "var(--shirin)",
                color: "var(--shirin)",
              };
            } else if (isSelected) {
              style = {
                background: "color-mix(in oklab, var(--wordie) 10%, white)",
                borderColor: "var(--wordie)",
                color: "var(--wordie)",
              };
            }

            return (
              <button
                key={c}
                type="button"
                onClick={() => onSelect(i)}
                className="w-full flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left font-bold transition-colors"
                style={style}
              >
                <span>{c}</span>
                {revealed && isAnswer && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Feedback + continue */}
      {revealed && (
        <div
          className="mt-4 rounded-3xl p-4 flex items-center gap-3"
          style={{
            background: isCorrect
              ? "color-mix(in oklab, var(--bloxia) 10%, white)"
              : "color-mix(in oklab, var(--wordie-accent) 14%, white)",
            border: `1px solid ${
              isCorrect
                ? "color-mix(in oklab, var(--bloxia) 25%, white)"
                : "color-mix(in oklab, var(--wordie-accent) 30%, white)"
            }`,
          }}
        >
          <div
            className="h-10 w-10 rounded-2xl grid place-items-center text-white shrink-0"
            style={{ background: isCorrect ? "var(--bloxia)" : "var(--wordie-accent)" }}
          >
            {isCorrect ? <Check className="h-5 w-5" /> : <RotateCcw className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[14px]">
              {isCorrect ? "Nice work" : "Try this one again"}
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {isCorrect
                ? "Whisper means to speak very softly."
                : `Correct answer: ${QUESTION.choices[QUESTION.answerIndex]}`}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={!revealed}
        className="mt-4 w-full rounded-full py-4 font-bold text-white active:scale-[0.98] transition-transform disabled:opacity-40 disabled:active:scale-100"
        style={{ background: "var(--wordie)", fontFamily: "var(--font-sans)", fontSize: "16px" }}
      >
        Continue
      </button>
    </div>
  );
}

function ResultView({ onRetake }: { onRetake: () => void }) {
  const score = 8;
  const total = 10;
  const pct = Math.round((score / total) * 100);
  const isHigh = pct >= 70;

  return (
    <div>
      <section
        className="relative rounded-[28px] p-5 text-white text-center overflow-hidden"
        style={{
          background: isHigh
            ? "linear-gradient(140deg, var(--bloxia) 0%, oklch(0.55 0.20 145) 60%, oklch(0.42 0.16 150) 100%)"
            : "linear-gradient(140deg, var(--wordie-accent) 0%, oklch(0.70 0.18 50) 100%)",
        }}
      >
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
          aria-hidden
        />
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/22 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
          <Trophy className="h-3.5 w-3.5" /> Test complete
        </div>
        <p
          className="mt-3 text-[56px] font-bold leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {score}
          <span className="text-[24px] opacity-80">/{total}</span>
        </p>
        <p className="mt-2 text-[15px] font-bold">{isHigh ? "Great work!" : "Good try — keep going!"}</p>
      </section>

      {/* Reward */}
      <section
        className="mt-4 rounded-3xl p-4 flex items-center gap-3"
        style={{
          background: "color-mix(in oklab, var(--bloxia) 10%, white)",
          border: "1px solid color-mix(in oklab, var(--bloxia) 20%, white)",
        }}
      >
        <div
          className="h-11 w-11 rounded-2xl grid place-items-center text-white shrink-0"
          style={{ background: "var(--bloxia)" }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[14px]">+80 Bp earned</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Bloxia reward unlocked · view in pixel world
          </p>
        </div>
      </section>

      {/* Review missed */}
      <section className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2 px-1">
          Review missed words
        </p>
        <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
          {MISSED.map((m) => (
            <div key={m.word} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <p className="font-bold text-[15px]">{m.word}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{m.meaning}</p>
              </div>
              <StatusBadge status="review" />
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button
          onClick={onRetake}
          className="rounded-full py-3.5 font-bold border border-border bg-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2 text-[14px]"
          style={{ color: "var(--wordie)" }}
        >
          <RotateCcw className="h-4 w-4" /> Retest
        </button>
        <Link
          to="/wordie-bank"
          className="rounded-full py-3.5 font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2 text-[14px]"
          style={{ background: "var(--wordie)" }}
        >
          Open Bank
        </Link>
      </div>
    </div>
  );
}
