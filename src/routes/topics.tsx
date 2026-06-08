import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ChevronLeft } from "lucide-react";

const PINK = "var(--shirin)";

// Pastel gradient palette for topic tiles.
const PALETTE: string[] = [
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
function bgFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

type Topic = {
  topic_id: string;
  title: string;
  prompt: string;
  emoji: string;
};

// Single curated stream — varied bento tile sizes drive the visual rhythm.
const TOPICS: Topic[] = [
  { topic_id: "topic_daily_1", title: "Morning Routine", prompt: "What do you do after you wake up?", emoji: "🌅" },
  { topic_id: "topic_friends_1", title: "Best Friend", prompt: "Who is your best friend? Why?", emoji: "🤝" },
  { topic_id: "topic_nature_1", title: "Favorite Animal", prompt: "Which animal do you love most?", emoji: "🦊" },
  { topic_id: "topic_daily_2", title: "Breakfast", prompt: "What did you eat this morning?", emoji: "🥞" },
  { topic_id: "topic_nature_2", title: "Rainy Day", prompt: "What do you do on a rainy day?", emoji: "🌧️" },
  { topic_id: "topic_friends_3", title: "Playing Together", prompt: "What games do you play with friends?", emoji: "🎲" },
  { topic_id: "topic_daily_5", title: "My Weekend", prompt: "What did you do last weekend?", emoji: "🎈" },
  { topic_id: "topic_nature_4", title: "Stars at Night", prompt: "Have you seen the stars?", emoji: "✨" },
  { topic_id: "topic_friends_5", title: "Birthday Party", prompt: "Who do you want at your party?", emoji: "🎂" },
  { topic_id: "topic_nature_5", title: "The Big Sea", prompt: "What lives in the sea?", emoji: "🐳" },
  { topic_id: "topic_daily_3", title: "After School", prompt: "What do you do after school?", emoji: "🎒" },
  { topic_id: "topic_nature_6", title: "Seasons", prompt: "Which season do you like best?", emoji: "🍂" },
  { topic_id: "topic_friends_6", title: "Sharing Snacks", prompt: "What snack do you love to share?", emoji: "🍪" },
  { topic_id: "topic_daily_4", title: "Bedtime", prompt: "What helps you fall asleep?", emoji: "🛏️" },
  { topic_id: "topic_nature_3", title: "At the Park", prompt: "What do you see at the park?", emoji: "🌳" },
  { topic_id: "topic_friends_2", title: "New Classmate", prompt: "How would you welcome a new friend?", emoji: "👋" },
];

// Bento spans — repeats every 6 tiles for a balanced rhythm on a 6-col grid.
// Each entry = [colSpan, rowSpan]. Tweak here to change layout cadence.
const BENTO: Array<[number, number]> = [
  [4, 2], [2, 1], [2, 1],
  [3, 1], [3, 2], [3, 1],
  [2, 1], [2, 1], [2, 1],
  [3, 1], [3, 1],
];

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [{ title: "Topic Talk — Paisley EC" }] }),
  component: TopicsPage,
});

function TopicsPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        <header className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 bg-white/95 backdrop-blur">
          <Link to="/shirin-talk" aria-label="Back" className="h-9 w-9 grid place-items-center rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span aria-hidden />
          <div className="h-9 w-9" />
        </header>

        <div className="flex-1 overflow-y-auto scroll-hide px-4 pb-16 pt-1">
          <div className="mb-4 px-1">
            <h1
              className="text-[28px] font-black tracking-tight leading-none"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
            >
              Pick a <span style={{ color: PINK }}>topic</span>
            </h1>
            <p className="mt-1.5 text-[13px] font-semibold text-foreground/55">
              Tap any tile to start chatting with Shirin.
            </p>
          </div>

          {/* Bento grid — 6 cols, auto rows ~64px. Varied spans create rhythm. */}
          <div
            className="grid gap-2.5"
            style={{
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gridAutoRows: "64px",
              gridAutoFlow: "dense",
            }}
          >
            {TOPICS.map((t, i) => {
              const [cs, rs] = BENTO[i % BENTO.length];
              const isTall = rs >= 2;
              const isWide = cs >= 4;
              return (
                <Link
                  key={t.topic_id}
                  to="/chat"
                  search={{ mode: "topic", topic_id: t.topic_id }}
                  className="relative rounded-3xl p-3 overflow-hidden active:scale-[0.97] transition-transform flex flex-col justify-between"
                  style={{
                    gridColumn: `span ${cs} / span ${cs}`,
                    gridRow: `span ${rs} / span ${rs}`,
                    background: bgFor(t.topic_id),
                  }}
                >
                  <div
                    className={`${isTall || isWide ? "text-[40px]" : "text-[26px]"} leading-none drop-shadow-sm`}
                    aria-hidden
                  >
                    {t.emoji}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`${isTall || isWide ? "text-[15px]" : "text-[12.5px]"} font-black tracking-tight leading-tight text-foreground`}
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
                    >
                      {t.title}
                    </p>
                    {(isTall || isWide) && (
                      <p className="mt-1 text-[11px] font-semibold line-clamp-2 text-foreground/65">
                        {t.prompt}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}