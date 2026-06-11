import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Volume2, RotateCw, ChevronLeft, Clock, X } from "lucide-react";

export const Route = createFileRoute("/word-card")({
  head: () => ({ meta: [
      { title: "Word Card — Paisley EC" },
      { name: "description", content: "Flip, hear and review a single word card." },
      { property: "og:title", content: "Word Card — Paisley EC" },
      { property: "og:description", content: "Flip, hear and review a single word card." },
    ] }),
  component: WordCardPage,
});

type Card = {
  word: string;
  ipa: string;
  pos: string;
  level: string;
  emoji: string;
  meaning: string;
  translation: string;
  example: string;
  status: "new" | "learning" | "review" | "focus" | "relearning";
};

const STATUS_META: Record<Card["status"], { label: string; color: string }> = {
  new: { label: "New", color: "oklch(0.66 0.24 280)" },
  learning: { label: "Learning", color: "oklch(0.7 0.18 195)" },
  review: { label: "Review", color: "oklch(0.68 0.2 145)" },
  focus: { label: "Focus", color: "oklch(0.68 0.26 35)" },
  relearning: { label: "Relearning", color: "var(--shirin)" },
};

const DECK: Card[] = [
  {
    word: "whisper",
    ipa: "/ˈwɪs.pər/",
    pos: "Verb",
    level: "B1",
    emoji: "🤫",
    meaning: "to speak very softly using your breath rather than your full voice, so others nearby can barely hear you",
    translation: "悄悄说 / 低语",
    example: "She leaned in close and whispered a long, surprising secret into my ear during the quiet movie scene.",
    status: "learning",
  },
  {
    word: "garden",
    ipa: "/ˈɡɑːr.dən/",
    pos: "Noun",
    level: "A2",
    emoji: "🌱",
    meaning: "a piece of land where flowers and plants grow",
    translation: "花园",
    example: "We planted tomatoes in the garden.",
    status: "review",
  },
  {
    word: "curious",
    ipa: "/ˈkjʊər.i.əs/",
    pos: "Adjective",
    level: "B1",
    emoji: "🔍",
    meaning: "wanting to know about something",
    translation: "好奇的",
    example: "The curious cat looked inside the box.",
    status: "new",
  },
];

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WordCardPage() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef<number>(Date.now());
  const card = DECK[idx];
  const total = DECK.length;
  const status = STATUS_META[card.status];

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const next = (rating: "forgot" | "hard" | "easy") => {
    void rating;
    if (idx + 1 >= total) {
      navigate({ to: "/mywordie" });
      return;
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      {/* Top bar — mirrors wordie-test */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <Link
          to="/mywordie"
          aria-label="Back"
          className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-muted-foreground">
            {idx + 1} / {total}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: `color-mix(in oklab, ${status.color} 22%, white)`,
              color: `color-mix(in oklab, ${status.color} 70%, black)`,
            }}
          >
            {status.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {fmtTime(seconds)}
          </span>
        </div>
        <Link
          to="/mywordie"
          aria-label="End session"
          className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      {/* Progress segments */}
      <div className="px-5 mt-3 flex gap-1">
        {DECK.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i <= idx
                  ? "var(--wordie)"
                  : "color-mix(in oklab, var(--wordie) 10%, white)",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <section className="px-5 mt-4">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="block w-full text-left rounded-[2rem] overflow-hidden shadow-xl active:scale-[0.99] transition-transform"
          style={{ perspective: "1200px" }}
          aria-label="Flip card"
        >
          <div
            className="relative w-full"
            style={{
              height: "28rem",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 rounded-[2rem] p-6 flex flex-col"
              style={{
                background: "linear-gradient(160deg, white 0%, color-mix(in oklab, var(--wordie) 8%, white) 100%)",
                backfaceVisibility: "hidden",
                border: "1px solid color-mix(in oklab, var(--wordie) 20%, transparent)",
              }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                  style={{
                    background: "var(--wordie)",
                    color: "white",
                  }}
                >
                  {card.pos}
                </span>
                <span
                  className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground"
                >
                  {card.level}
                </span>
              </div>

              <div className="flex-1 grid place-items-center text-center">
                <div>
                  <h2 className="text-5xl font-medium text-[color:var(--wordie)]">{card.word}</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 font-mono">{card.ipa}</p>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap card to flip
              </p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rounded-[2rem] p-6 flex flex-col text-white overflow-hidden"
              style={{
                background: "linear-gradient(160deg, var(--wordie) 0%, oklch(0.48 0.22 273) 100%)",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                  style={{ background: "white", color: "var(--wordie)" }}
                >
                  {card.pos}
                </span>
              </div>
              <div className="text-center mt-2">
                <h3
                  className="font-medium text-[40px] leading-none text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {card.word}
                </h3>
                <p className="text-[13px] mt-3 font-mono opacity-80">{card.ipa}</p>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-8 mt-6 mb-3">
                <div>
                  <p className="text-[14px] font-semibold tracking-[0.08em] opacity-80">Meaning</p>
                  <div className="mt-2 flex items-start gap-3">
                    <p
                      className="flex-1 text-[18px] font-semibold leading-relaxed"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {card.meaning}
                    </p>
                    <span
                      className="shrink-0 grid place-items-center opacity-80"
                      style={{ height: "29px" }}
                      aria-label="Listen to meaning"
                    >
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] font-semibold tracking-[0.08em] opacity-80">Example</p>
                  <div className="mt-2 flex items-start gap-3">
                    <p
                      className="flex-1 text-[18px] font-semibold leading-relaxed"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {card.example}
                    </p>
                    <span
                      className="shrink-0 grid place-items-center opacity-80"
                      style={{ height: "29px" }}
                      aria-label="Listen to example"
                    >
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs opacity-80 inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap to flip back
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Three-emoji rating */}
      <section
        className="px-5 mt-6 grid grid-cols-3 gap-3 transition-opacity"
        style={{ opacity: flipped ? 1 : 0, pointerEvents: flipped ? "auto" : "none" }}
        aria-hidden={!flipped}
      >
        {([
          { key: "forgot", emoji: "😟", label: "Forgot" },
          { key: "hard", emoji: "🙂", label: "Hard" },
          { key: "easy", emoji: "😄", label: "Easy" },
        ] as const).map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => next(r.key)}
            className="py-3 flex flex-col items-center gap-2 active:scale-[0.95] transition-transform font-sans"
          >
            <span className="text-[52px] leading-none">{r.emoji}</span>
            <span className="text-[17px] font-medium text-foreground font-sans">{r.label}</span>
          </button>
        ))}
      </section>

      {/* Speaker — same shape as wordie-test stage 2 record button */}
      <section className="mt-8 flex flex-col items-center">
        <button
          type="button"
          className="h-[72px] w-[72px] rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform"
          style={{ background: "var(--wordie)" }}
          aria-label="Listen"
        >
          <Volume2 className="h-8 w-8" />
        </button>
      </section>

    </PhoneFrame>
  );
}
