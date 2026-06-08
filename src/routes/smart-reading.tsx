import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import shirinGirl from "@/assets/brand/shirin-girl.png";
import { ChevronLeft, Search, BookOpen, Clock, Sparkles } from "lucide-react";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";

type Lesson = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1" | "B2";
  minutes: number;
  words: number;
  blurb: string;
  cover: string;
  emoji: string;
  done?: boolean;
};

const LESSONS: Lesson[] = [
  { id: "l1", title: "The Friendly Fox", level: "A1", minutes: 4, words: 120, blurb: "A little fox makes a new friend in the forest.", cover: "linear-gradient(135deg,#FFD1DC,#FFA8C5)", emoji: "🦊", done: true },
  { id: "l2", title: "My First Trip to the Zoo", level: "A2", minutes: 5, words: 180, blurb: "Lila and Dad see the lion, panda and parrot.", cover: "linear-gradient(135deg,#FDE68A,#FCA5A5)", emoji: "🐼" },
  { id: "l3", title: "Rain on the Roof", level: "A2", minutes: 6, words: 210, blurb: "What can you do on a rainy Saturday at home?", cover: "linear-gradient(135deg,#BFDBFE,#C4B5FD)", emoji: "🌧️" },
  { id: "l4", title: "The Brave Little Boat", level: "B1", minutes: 7, words: 260, blurb: "A small boat learns to sail through a big storm.", cover: "linear-gradient(135deg,#A7F3D0,#67E8F9)", emoji: "⛵" },
  { id: "l5", title: "Lina's Birthday Plan", level: "B1", minutes: 6, words: 240, blurb: "Lina plans a birthday surprise for her best friend.", cover: "linear-gradient(135deg,#FBCFE8,#FCD34D)", emoji: "🎂" },
  { id: "l6", title: "Letters from the Moon", level: "B2", minutes: 9, words: 320, blurb: "An astronaut writes home about life in space.", cover: "linear-gradient(135deg,#C7D2FE,#A78BFA)", emoji: "🌙" },
];

const LEVELS = ["All", "A1", "A2", "B1", "B2"] as const;

export const Route = createFileRoute("/smart-reading")({
  head: () => ({ meta: [{ title: "Smart Reading Talk — Paisley EC" }] }),
  component: SmartReadingPage,
});

function SmartReadingPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");

  const lessons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LESSONS.filter((l) => (level === "All" ? true : l.level === level)).filter(
      (l) => (q ? l.title.toLowerCase().includes(q) || l.blurb.toLowerCase().includes(q) : true),
    );
  }, [query, level]);

  const recommended = LESSONS[1];

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 bg-white/95 backdrop-blur">
          <Link
            to="/shirin-talk"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span aria-hidden />
          <div className="h-9 w-9" />
        </header>

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16">
          {/* Hero */}
          <section className="flex flex-col items-center text-center pt-2 pb-4">
            <img src={shirinGirl} alt="Shirin" className="h-20 w-20 object-contain" />
            <h1
              className="mt-2 text-[22px] leading-[1.2] font-semibold tracking-tight"
              style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              Smart Reading Talk
            </h1>
            <p
              className="mt-1 text-[13px] text-foreground/65 font-semibold tracking-tight px-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Pick a story. Read it, then chat with Shirin about it.
            </p>
          </section>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: PINK }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories"
              className="w-full rounded-full pl-10 pr-4 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-[color:var(--shirin)]"
              style={{ background: PINK_SOFT, color: "var(--foreground)" }}
            />
          </div>

          {/* Level chips */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto scroll-hide -mx-1 px-1">
            {LEVELS.map((l) => {
              const active = l === level;
              return (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-tight transition-colors"
                  style={
                    active
                      ? { background: PINK, color: "white" }
                      : { background: PINK_SOFT, color: "var(--shirin)" }
                  }
                >
                  {l}
                </button>
              );
            })}
          </div>

          {/* Continue reading */}
          {level === "All" && !query && (
            <section className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                Continue
              </p>
              <Link
                to="/chat"
                search={{ mode: "smart_reading", lesson_id: recommended.id }}
                className="relative isolate flex items-stretch rounded-3xl overflow-hidden active:scale-[0.99] transition-transform"
                style={{ background: PINK_SOFT }}
              >
                <div
                  className="w-24 shrink-0 grid place-items-center text-3xl"
                  style={{ background: recommended.cover }}
                  aria-hidden
                >
                  {recommended.emoji}
                </div>
                <div className="flex-1 p-3.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" style={{ color: PINK }} />
                    <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: PINK }}>
                      Recommended
                    </span>
                  </div>
                  <p className="mt-1 text-[15px] font-bold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
                    {recommended.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-foreground/65 line-clamp-2">{recommended.blurb}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                    <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" />{recommended.minutes} min</span>
                    <span>·</span>
                    <span>{recommended.words} words</span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Lessons list */}
          <section className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
              {level === "All" ? "All stories" : `${level} stories`}
            </p>
            {lessons.length === 0 ? (
              <div className="text-center py-12 text-[13px] text-muted-foreground">
                <BookOpen className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
                No stories match — try another level.
              </div>
            ) : (
              <div className="space-y-2.5">
                {lessons.map((l) => (
                  <Link
                    key={l.id}
                    to="/chat"
                    search={{ mode: "smart_reading", lesson_id: l.id }}
                    className="flex items-stretch rounded-2xl bg-white border border-[oklch(0.94_0.02_10)] overflow-hidden active:scale-[0.99] transition-transform"
                  >
                    <div
                      className="w-16 shrink-0 grid place-items-center text-2xl"
                      style={{ background: l.cover }}
                      aria-hidden
                    >
                      {l.emoji}
                    </div>
                    <div className="flex-1 px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[14px] font-bold tracking-tight leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
                          {l.title}
                        </p>
                        <span
                          className="shrink-0 text-[10px] font-bold rounded-full px-2 py-0.5"
                          style={{ background: PINK_SOFT, color: PINK }}
                        >
                          {l.level}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-foreground/60 line-clamp-1">{l.blurb}</p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                        <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" />{l.minutes} min</span>
                        <span>·</span>
                        <span>{l.words} words</span>
                        {l.done && (
                          <>
                            <span>·</span>
                            <span style={{ color: PINK }}>Read ✓</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}
