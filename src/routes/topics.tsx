import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ChevronLeft, Search, Lightbulb, Check, ChevronDown, ChevronRight } from "lucide-react";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";
const LAST_PACK_KEY = "topic_talk_last_selected_pack_code_v1";

// Emoji cover circle — pastel gradients deterministically picked by topic_id.
// To change the palette: edit COVER_PALETTE. To change selection rule: edit coverFor().
const COVER_PALETTE: string[] = [
  "linear-gradient(135deg,#FFD1DC,#FFA8C5)",
  "linear-gradient(135deg,#FDE68A,#FCA5A5)",
  "linear-gradient(135deg,#BFDBFE,#C4B5FD)",
  "linear-gradient(135deg,#FBCFE8,#FCD34D)",
  "linear-gradient(135deg,#A7F3D0,#67E8F9)",
  "linear-gradient(135deg,#FEF3C7,#FBBF24)",
  "linear-gradient(135deg,#C7D2FE,#A78BFA)",
  "linear-gradient(135deg,#FECACA,#FB7185)",
  "linear-gradient(135deg,#E0E7FF,#BFDBFE)",
];
function coverFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return COVER_PALETTE[h % COVER_PALETTE.length];
}

type Topic = {
  topic_id: string;
  topic_number: number;
  title: string;
  prompt: string;
  emoji: string;
  done?: boolean;
};

type Pack = {
  pack_id: string;
  pack_code: string;
  title: string;
  CEFR: string;
  level: string;
  count: string;
  topics: Topic[];
};

const TOPICS_DAILY: Topic[] = [
  { topic_id: "topic_daily_1", topic_number: 1, title: "My Morning Routine", prompt: "What do you do after you wake up?", emoji: "🌅", done: true },
  { topic_id: "topic_daily_2", topic_number: 2, title: "Favorite Breakfast", prompt: "What did you eat this morning?", emoji: "🥞", done: true },
  { topic_id: "topic_daily_3", topic_number: 3, title: "After School", prompt: "What do you do after school?", emoji: "🎒" },
  { topic_id: "topic_daily_4", topic_number: 4, title: "Bedtime", prompt: "What helps you fall asleep?", emoji: "🛏️" },
  { topic_id: "topic_daily_5", topic_number: 5, title: "My Weekend", prompt: "What did you do last weekend?", emoji: "🎈" },
  { topic_id: "topic_daily_6", topic_number: 6, title: "Helping at Home", prompt: "How do you help your family?", emoji: "🧹" },
];

const TOPICS_FRIENDS: Topic[] = [
  { topic_id: "topic_friends_1", topic_number: 1, title: "My Best Friend", prompt: "Who is your best friend? Why?", emoji: "🤝" },
  { topic_id: "topic_friends_2", topic_number: 2, title: "A New Classmate", prompt: "How would you welcome a new friend?", emoji: "👋" },
  { topic_id: "topic_friends_3", topic_number: 3, title: "Playing Together", prompt: "What games do you play with friends?", emoji: "🎲" },
  { topic_id: "topic_friends_4", topic_number: 4, title: "Saying Sorry", prompt: "When did you say sorry to a friend?", emoji: "💛" },
  { topic_id: "topic_friends_5", topic_number: 5, title: "Birthday Party", prompt: "Who do you want at your party?", emoji: "🎂" },
  { topic_id: "topic_friends_6", topic_number: 6, title: "Sharing Snacks", prompt: "What snack do you love to share?", emoji: "🍪" },
];

const TOPICS_NATURE: Topic[] = [
  { topic_id: "topic_nature_1", topic_number: 1, title: "My Favorite Animal", prompt: "Which animal do you love most? Why?", emoji: "🦊" },
  { topic_id: "topic_nature_2", topic_number: 2, title: "A Rainy Day", prompt: "What do you do on a rainy day?", emoji: "🌧️" },
  { topic_id: "topic_nature_3", topic_number: 3, title: "At the Park", prompt: "What do you see at the park?", emoji: "🌳" },
  { topic_id: "topic_nature_4", topic_number: 4, title: "Stars at Night", prompt: "Have you seen the stars? Tell me!", emoji: "✨" },
  { topic_id: "topic_nature_5", topic_number: 5, title: "The Big Sea", prompt: "What lives in the sea?", emoji: "🐳" },
  { topic_id: "topic_nature_6", topic_number: 6, title: "Seasons", prompt: "Which season do you like best?", emoji: "🍂" },
];

const PACKS: Pack[] = [
  {
    pack_id: "topic_pack_daily",
    pack_code: "daily",
    title: "Daily Life",
    CEFR: "PreA1-A1",
    level: "Starter",
    count: "24",
    topics: TOPICS_DAILY,
  },
  {
    pack_id: "topic_pack_friends",
    pack_code: "friends",
    title: "School & Friends",
    CEFR: "PreA1-A1",
    level: "Starter",
    count: "20",
    topics: TOPICS_FRIENDS,
  },
  {
    pack_id: "topic_pack_nature",
    pack_code: "nature",
    title: "Animals & Nature",
    CEFR: "PreA1-A1",
    level: "Starter",
    count: "18",
    topics: TOPICS_NATURE,
  },
];

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [{ title: "Topic Talk — Paisley EC" }] }),
  component: TopicsPage,
});

function TopicsPage() {
  const [query, setQuery] = useState("");
  const [packCode, setPackCode] = useState<string>(PACKS[0].pack_code);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_PACK_KEY);
      if (saved && PACKS.some((p) => p.pack_code === saved)) setPackCode(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [pickerOpen]);

  const currentPack = useMemo(
    () => PACKS.find((p) => p.pack_code === packCode) ?? PACKS[0],
    [packCode],
  );

  const selectPack = (code: string) => {
    setPackCode(code);
    setPickerOpen(false);
    try {
      localStorage.setItem(LAST_PACK_KEY, code);
    } catch {}
  };

  const topics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currentPack.topics;
    return currentPack.topics.filter(
      (t) => t.title.toLowerCase().includes(q) || t.prompt.toLowerCase().includes(q),
    );
  }, [query, currentPack]);

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
          {/* Pack picker */}
          <div className="relative mb-3" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 rounded-full px-4 py-4 text-left active:scale-[0.98] transition-transform"
              style={{ background: PINK_SOFT }}
            >
              <div className="min-w-0 flex flex-col gap-1.5">
                <p
                  className="text-[17px] font-bold tracking-tight leading-none"
                  style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
                >
                  {currentPack.title}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <MiniPill>{currentPack.CEFR}</MiniPill>
                  <MiniPill>{currentPack.level}</MiniPill>
                  <MiniPill>{currentPack.count} Topics</MiniPill>
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
                  const active = p.pack_code === packCode;
                  return (
                    <button
                      key={p.pack_id}
                      type="button"
                      onClick={() => selectPack(p.pack_code)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-[color:var(--muted)]"
                      style={active ? { background: PINK_SOFT } : undefined}
                    >
                      <div className="min-w-0 flex flex-col gap-1.5">
                        <p className="text-[15px] font-bold tracking-tight leading-none" style={{ color: active ? PINK : "var(--foreground)" }}>
                          {p.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <MiniPill>{p.CEFR}</MiniPill>
                          <MiniPill>{p.level}</MiniPill>
                          <MiniPill>{p.count} Topics</MiniPill>
                        </div>
                      </div>
                      {active && <Check className="h-4 w-4 shrink-0" strokeWidth={3} style={{ color: PINK }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: PINK }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics"
              className="w-full rounded-full pl-11 pr-4 py-3.5 text-[15px] font-semibold outline-none focus:ring-2 focus:ring-[color:var(--shirin)] placeholder:font-semibold"
              style={{ background: PINK_SOFT, color: "var(--foreground)" }}
            />
          </div>

          {/* Topic list */}
          <section className="mt-4">
            {topics.length === 0 ? (
              <div className="text-center py-12 text-[13px] text-muted-foreground">
                <Lightbulb className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
                No topics match.
              </div>
            ) : (
              <div className="space-y-3">
                {topics.map((t) => (
                  <Link
                    key={t.topic_id}
                    to="/chat"
                    search={{ mode: "topic", topic_id: t.topic_id }}
                    className="flex items-stretch rounded-full overflow-hidden active:scale-[0.98] transition-transform"
                    style={{ background: "white", border: "1px solid oklch(0.94 0.02 10)" }}
                  >
                    <div
                      className="h-11 w-11 shrink-0 grid place-items-center text-xl my-2 ml-2 rounded-full"
                      style={{ background: coverFor(t.topic_id) }}
                      aria-hidden
                    >
                      {t.emoji}
                    </div>
                    <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                      <p className="text-[15px] font-bold tracking-tight leading-tight" style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold line-clamp-1 text-foreground/60">
                        {t.prompt}
                      </p>
                    </div>
                    <div className="shrink-0 pr-4 pl-1 flex items-center">
                      {t.done ? (
                        <span
                          className="h-6 w-6 grid place-items-center rounded-full"
                          style={{ background: PINK_SOFT }}
                          aria-label="Done"
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
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-bold leading-none bg-white"
      style={{ color: PINK }}
    >
      {children}
    </span>
  );
}