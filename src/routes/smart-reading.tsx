import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BookOpen, Check, ChevronDown, ChevronRight } from "lucide-react";
import { FloatingBack } from "@/components/app/FloatingBack";

import { z } from "zod";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";
const LAST_BOOK_KEY = "smart_reading_last_selected_book_code_v1";

// Emoji cover circle — pastel gradients deterministically picked by lesson_id.
// To change the palette: edit COVER_PALETTE. To change selection rule: edit coverFor().
const COVER_PALETTE: string[] = [
  "linear-gradient(135deg,#FFD1DC,#FFA8C5)", // pink
  "linear-gradient(135deg,#FDE68A,#FCA5A5)", // peach
  "linear-gradient(135deg,#BFDBFE,#C4B5FD)", // periwinkle
  "linear-gradient(135deg,#FBCFE8,#FCD34D)", // pink-gold
  "linear-gradient(135deg,#A7F3D0,#67E8F9)", // mint
  "linear-gradient(135deg,#FEF3C7,#FBBF24)", // sunshine
  "linear-gradient(135deg,#C7D2FE,#A78BFA)", // lavender
  "linear-gradient(135deg,#FECACA,#FB7185)", // coral
  "linear-gradient(135deg,#E0E7FF,#BFDBFE)", // sky
];
function coverFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return COVER_PALETTE[h % COVER_PALETTE.length];
}

type Unit = {
  lesson_id: string;
  unit_number: number;
  story_title: string;
  cover_question: string;
  emoji: string;
  done?: boolean;
};

type Pack = {
  pack_id: string;
  series_name: string;
  book_code: string;
  title: string;
  CEFR: string;
  Lexile: string;
  wordCount: string;
  units: Unit[];
};

const UNITS_2_1: Unit[] = [
  { lesson_id: "smart_reading_2_1_unit_1", unit_number: 1, story_title: "My Cat Bob", cover_question: "Bob has many feelings. How does Bob feel?", emoji: "🐱", done: true },
  { lesson_id: "smart_reading_2_1_unit_2", unit_number: 2, story_title: "I Can Run", cover_question: "What can you do at the park?", emoji: "🏃", done: true },
  { lesson_id: "smart_reading_2_1_unit_3", unit_number: 3, story_title: "A Big Red Bus", cover_question: "Where does the red bus go?", emoji: "🚌" },
  { lesson_id: "smart_reading_2_1_unit_4", unit_number: 4, story_title: "My Mom and Me", cover_question: "What do you and your mom do together?", emoji: "👩‍👧" },
  { lesson_id: "smart_reading_2_1_unit_5", unit_number: 5, story_title: "The Little Duck", cover_question: "Why is the little duck happy?", emoji: "🦆" },
  { lesson_id: "smart_reading_2_1_unit_6", unit_number: 6, story_title: "At the Farm", cover_question: "Which animal do you like at the farm?", emoji: "🐮" },
  { lesson_id: "smart_reading_2_1_unit_7", unit_number: 7, story_title: "Rainy Day Fun", cover_question: "What do you do on a rainy day?", emoji: "🌧️" },
  { lesson_id: "smart_reading_2_1_unit_8", unit_number: 8, story_title: "My New Shoes", cover_question: "What color are your favorite shoes?", emoji: "👟" },
];

const UNITS_2_2: Unit[] = [
  { lesson_id: "smart_reading_2_2_unit_1", unit_number: 1, story_title: "A Day at the Zoo", cover_question: "Which animal do you want to see first?", emoji: "🦁" },
  { lesson_id: "smart_reading_2_2_unit_2", unit_number: 2, story_title: "My Best Friend", cover_question: "Who is your best friend? Why?", emoji: "🤝" },
  { lesson_id: "smart_reading_2_2_unit_3", unit_number: 3, story_title: "The Lost Kite", cover_question: "Where did the kite go?", emoji: "🪁" },
  { lesson_id: "smart_reading_2_2_unit_4", unit_number: 4, story_title: "Bedtime Story", cover_question: "What story do you like before bed?", emoji: "🌙" },
  { lesson_id: "smart_reading_2_2_unit_5", unit_number: 5, story_title: "Lunch with Grandma", cover_question: "What is your favorite lunch?", emoji: "🥪" },
  { lesson_id: "smart_reading_2_2_unit_6", unit_number: 6, story_title: "The Brave Little Boat", cover_question: "How does the boat feel in the storm?", emoji: "⛵" },
  { lesson_id: "smart_reading_2_2_unit_7", unit_number: 7, story_title: "My Birthday Party", cover_question: "Who do you want at your party?", emoji: "🎂" },
  { lesson_id: "smart_reading_2_2_unit_8", unit_number: 8, story_title: "Snowy Morning", cover_question: "What do you do when it snows?", emoji: "⛄" },
];

const PACKS: Pack[] = [
  {
    pack_id: "smart_reading_2_1_units_1_16",
    series_name: "Smart Reading",
    book_code: "2.1",
    title: "Smart Reading 2.1",
    CEFR: "PreA1-A1",
    Lexile: "150L-350L",
    wordCount: "50",
    units: UNITS_2_1,
  },
  {
    pack_id: "smart_reading_2_2_units_1_16",
    series_name: "Smart Reading",
    book_code: "2.2",
    title: "Smart Reading 2.2",
    CEFR: "PreA1-A1",
    Lexile: "150L-350L",
    wordCount: "60",
    units: UNITS_2_2,
  },
];

export const Route = createFileRoute("/smart-reading")({
  head: () => ({ meta: [
      { title: "Smart Reading — Paisley EC" },
      { name: "description", content: "Read along with picture books and discuss them with Shirin." },
      { property: "og:title", content: "Smart Reading — Paisley EC" },
      { property: "og:description", content: "Read along with picture books and discuss them with Shirin." },
    ] }),
  validateSearch: z.object({ from: z.string().optional() }),
  component: SmartReadingPage,
});

function SmartReadingPage() {
  const search = useSearch({ from: "/smart-reading" });
  const backTo = search.from === "topics" ? "/topics" : "/shirin-talk";
  const [bookCode, setBookCode] = useState<string>(PACKS[0].book_code);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // restore last selected book
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_BOOK_KEY);
      if (saved && PACKS.some((p) => p.book_code === saved)) setBookCode(saved);
    } catch {}
  }, []);

  // close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [pickerOpen]);

  const currentPack = useMemo(
    () => PACKS.find((p) => p.book_code === bookCode) ?? PACKS[0],
    [bookCode],
  );

  const selectBook = (code: string) => {
    setBookCode(code);
    setPickerOpen(false);
    try {
      localStorage.setItem(LAST_BOOK_KEY, code);
    } catch {}
  };

  const units = currentPack.units;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        <FloatingBack to={backTo} />

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-14">
          <div className="mb-4 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: PINK, letterSpacing: "-0.01em" }}
            >
              Pick A Story
            </h1>
            <p className="mt-1 text-[14px] font-semibold tracking-tight text-muted-foreground">
              Let's talk about it.
            </p>
          </div>

          {/* Book picker */}
          <div className="relative mb-3" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 rounded-full px-4 py-4 text-left active:scale-[0.98] transition-transform"
              style={{ background: PINK_SOFT }}
            >
              <div className="min-w-0 flex flex-col gap-1.5">
                <p
                  className="text-[17px] font-semibold tracking-tight leading-none"
                  style={{ color: PINK, letterSpacing: "-0.01em" }}
                >
                  {currentPack.title}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <MiniPill>{currentPack.CEFR}</MiniPill>
                  <MiniPill>{currentPack.Lexile}</MiniPill>
                  <MiniPill>{currentPack.wordCount} Words</MiniPill>
                </div>
              </div>
              <ChevronDown
                className="h-5 w-5 shrink-0 transition-transform"
                style={{ color: PINK, transform: pickerOpen ? "rotate(180deg)" : "none" }}
              />
            </button>
            {pickerOpen && (
              <div
                className="absolute z-40 left-0 right-0 mt-1.5 rounded-3xl bg-white border overflow-hidden"
                style={{ borderColor: "oklch(0.94 0.02 10)", boxShadow: "0 12px 32px -8px rgba(0,0,0,0.12)" }}
              >
                {PACKS.map((p) => {
                  const active = p.book_code === bookCode;
                  return (
                    <button
                      key={p.pack_id}
                      type="button"
                      onClick={() => selectBook(p.book_code)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-[color:var(--muted)]"
                      style={active ? { background: PINK_SOFT } : undefined}
                    >
                      <div className="min-w-0 flex flex-col gap-1.5">
                        <p className="text-[15px] font-semibold tracking-tight leading-none" style={{ color: active ? PINK : "var(--foreground)" }}>
                          {p.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <MiniPill>{p.CEFR}</MiniPill>
                          <MiniPill>{p.Lexile}</MiniPill>
                          <MiniPill>{p.wordCount} Words</MiniPill>
                        </div>
                      </div>
                      {active && <Check className="h-4 w-4 shrink-0" strokeWidth={3} style={{ color: PINK }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Unit list */}
          <section className="mt-4">
            {units.length === 0 ? (
              <div className="text-center py-12 text-[13px] text-muted-foreground">
                <BookOpen className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
                No stories match.
              </div>
            ) : (
              <div className="space-y-3">
                {units.map((u) => (
                  <Link
                    key={u.lesson_id}
                    to="/chat"
                    search={{ mode: "smart_reading", lesson_id: u.lesson_id, from: search.from }}
                    className="flex items-stretch rounded-full overflow-hidden active:scale-[0.98] transition-transform"
                    style={{ background: "white", border: "1px solid oklch(0.94 0.02 10)" }}
                  >
                    <div
                      className="h-11 w-11 shrink-0 grid place-items-center text-xl my-2 ml-2 rounded-full"
                      style={{ background: coverFor(u.lesson_id) }}
                      aria-hidden
                    >
                      {u.emoji}
                    </div>
                    <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                      <p className="text-[17px] font-semibold tracking-tight leading-tight" style={{ letterSpacing: "-0.01em" }}>
                        {u.story_title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold line-clamp-1 text-foreground/60">
                        {u.cover_question}
                      </p>
                    </div>
                    <div className="shrink-0 pr-4 pl-1 flex items-center">
                      {u.done ? (
                        <span
                          className="h-6 w-6 grid place-items-center rounded-full"
                          style={{ background: PINK_SOFT }}
                          aria-label="Read"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: PINK }} />
                        </span>
                      ) : (
                        <ChevronRight className="h-5 w-5" style={{ color: PINK }} />
                      )}
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

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none bg-white"
      style={{ color: PINK }}
    >
      {children}
    </span>
  );
}
