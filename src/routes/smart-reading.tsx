import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ChevronLeft, Search, BookOpen, Check } from "lucide-react";

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

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-2">
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
                    <div className="flex-1 px-3 py-2.5 flex flex-col justify-center min-w-0">
                      <p className="text-[14px] font-bold tracking-tight leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
                        {l.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-foreground/60 line-clamp-2">{l.blurb}</p>
                    </div>
                    {l.done && (
                      <div className="shrink-0 px-3 flex items-center">
                        <span
                          className="h-6 w-6 grid place-items-center rounded-full"
                          style={{ background: PINK_SOFT }}
                          aria-label="Read"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: PINK }} />
                        </span>
                      </div>
                    )}
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
