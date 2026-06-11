import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { Volume2, Star, RotateCw, Check, X, Sparkles } from "lucide-react";

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
};

const DECK: Card[] = [
  {
    word: "whisper",
    ipa: "/ˈwɪs.pər/",
    pos: "verb",
    level: "B1",
    emoji: "🤫",
    meaning: "to speak very softly, almost without sound",
    translation: "悄悄说 / 低语",
    example: "She whispered a secret into my ear.",
  },
  {
    word: "garden",
    ipa: "/ˈɡɑːr.dən/",
    pos: "noun",
    level: "A2",
    emoji: "🌱",
    meaning: "a piece of land where flowers and plants grow",
    translation: "花园",
    example: "We planted tomatoes in the garden.",
  },
  {
    word: "curious",
    ipa: "/ˈkjʊər.i.əs/",
    pos: "adjective",
    level: "B1",
    emoji: "🔍",
    meaning: "wanting to know about something",
    translation: "好奇的",
    example: "The curious cat looked inside the box.",
  },
];

function WordCardPage() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const card = DECK[idx];
  const total = DECK.length;
  const pct = Math.round(((idx) / total) * 100);

  const next = (gotIt: boolean) => {
    if (gotIt) setKnown((k) => k + 1);
    if (idx + 1 >= total) {
      navigate({ to: "/mywordie" });
      return;
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      <AppHeader
        back="/mywordie"
        title={<span className="text-[color:var(--wordie)]">Word Card</span>}
        right={
          <span className="text-xs font-semibold text-[color:var(--wordie)]">
            {idx + 1}/{total}
          </span>
        }
      />

      {/* Progress */}
      <div className="px-5">
        <div className="h-2 rounded-full bg-white overflow-hidden border border-border">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,var(--wordie),var(--wordie-accent))" }}
          />
        </div>
      </div>

      {/* Card */}
      <section className="px-5 mt-5">
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
              height: "26rem",
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
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-semibold rounded-full px-2 py-1"
                  style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)", color: "var(--wordie)" }}
                >
                  {card.level} · {card.pos}
                </span>
                <Star className="h-5 w-5 text-[color:var(--wordie-accent)]" />
              </div>

              <div className="flex-1 grid place-items-center text-center">
                <div>
                  <div className="text-7xl mb-3 select-none">{card.emoji}</div>
                  <h2 className="text-4xl font-semibold text-[color:var(--wordie)]">{card.word}</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 font-mono">{card.ipa}</p>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-semibold shadow"
                    style={{ background: "var(--wordie)" }}
                  >
                    <Volume2 className="h-4 w-4" /> Listen
                  </button>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap card to flip
              </p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rounded-[2rem] p-6 flex flex-col text-white"
              style={{
                background: "linear-gradient(160deg, var(--wordie) 0%, oklch(0.48 0.22 273) 100%)",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold rounded-full px-2 py-1 bg-white/20">
                  {card.word}
                </span>
                <Sparkles className="h-5 w-5 text-[color:var(--wordie-accent)]" />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4 mt-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Meaning</p>
                  <p className="text-lg font-semibold leading-snug mt-1">{card.meaning}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Translation</p>
                  <p className="text-base font-semibold mt-1">{card.translation}</p>
                </div>
                <div className="rounded-2xl bg-white/15 backdrop-blur px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Example</p>
                  <p className="text-sm italic mt-1">{card.example}</p>
                </div>
              </div>

              <p className="text-center text-xs opacity-80 inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap to flip back
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Actions */}
      <section className="px-5 mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => next(false)}
          className="rounded-2xl bg-white border border-border py-3.5 font-semibold text-sm inline-flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <X className="h-4 w-4 text-[color:var(--shirin)]" /> Practise again
        </button>
        <button
          type="button"
          onClick={() => next(true)}
          className="rounded-2xl py-3.5 font-semibold text-sm text-white inline-flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          style={{ background: "var(--wordie)" }}
        >
          <Check className="h-4 w-4" /> I know it
        </button>
      </section>

      <section className="px-5 mt-4 mb-8 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-[color:var(--wordie)]">{known}</span> known this session
        </p>
        <Link to="/mywordie" className="text-xs underline text-muted-foreground mt-2 inline-block">
          End session
        </Link>
      </section>
    </PhoneFrame>
  );
}
