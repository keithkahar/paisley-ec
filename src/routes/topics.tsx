import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ChevronLeft } from "lucide-react";

const PINK = "var(--shirin)";

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

// Canonical topics per topic-talk-spec. topic_id MUST match the chat opening/prompt map.
// `mywordie` is intentionally excluded from the list (entered via its own hub card).
// `smart_reading` is included but routes to /smart-reading instead of /chat.
type Topic = {
  topic_id: string;
  title: string;
  subtitle: string;
  emoji: string;
};
const TOPICS: Topic[] = [
  { topic_id: "free_talk", title: "Free Talk", subtitle: "Talk about anything you like.", emoji: "💬" },
  { topic_id: "smart_reading", title: "Smart Reading Talk", subtitle: "Talk about your story.", emoji: "📖" },
  { topic_id: "pet_talk", title: "Pet Talk", subtitle: "Talk about pets and Scratch.", emoji: "🐱" },
  { topic_id: "minecraft_adventure", title: "Minecraft Adventure", subtitle: "Build, dig, and explore.", emoji: "⛏️" },
  { topic_id: "food_talk", title: "Food Talk", subtitle: "Talk about yummy food.", emoji: "🍜" },
  { topic_id: "football_talk", title: "Football Talk", subtitle: "Talk about football and games.", emoji: "⚽" },
  { topic_id: "magic_adventure", title: "Magic Adventure", subtitle: "Open a magic door.", emoji: "🪄" },
  { topic_id: "nature_explorer", title: "Nature Explorer", subtitle: "Animals, plants, and weather.", emoji: "🌿" },
];

// Bento spans on a 6-col grid. Cycles to give the page rhythm.
const BENTO: Array<[number, number]> = [
  [4, 2], [2, 1], [2, 1],
  [3, 1], [3, 2], [3, 1],
  [2, 1], [2, 1],
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
              const big = rs >= 2 || cs >= 4;

              // Per-spec exception: smart_reading routes to its own flow page.
              const linkProps =
                t.topic_id === "smart_reading"
                  ? ({ to: "/smart-reading" } as const)
                  : ({ to: "/chat", search: { mode: "topic", topic_id: t.topic_id } } as const);

              return (
                <Link
                  key={t.topic_id}
                  {...linkProps}
                  className="relative rounded-3xl p-3 overflow-hidden active:scale-[0.97] transition-transform flex flex-col justify-between"
                  style={{
                    gridColumn: `span ${cs} / span ${cs}`,
                    gridRow: `span ${rs} / span ${rs}`,
                    background: bgFor(t.topic_id),
                  }}
                >
                  <div className={`${big ? "text-[40px]" : "text-[26px]"} leading-none drop-shadow-sm`} aria-hidden>
                    {t.emoji}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`${big ? "text-[15px]" : "text-[12.5px]"} font-black tracking-tight leading-tight text-foreground`}
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
                    >
                      {t.title}
                    </p>
                    {big && (
                      <p className="mt-1 text-[11px] font-semibold line-clamp-2 text-foreground/65">
                        {t.subtitle}
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