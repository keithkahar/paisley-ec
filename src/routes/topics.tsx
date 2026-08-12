import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import topicsMap from "@/assets/topics/topics-map-v3.png.asset.json";

const PINK = "var(--shirin)";

// Topic map: one full-screen illustration with labeled entry pills.
// Each topic has a visible title pill and a larger invisible clickable area
// covering the character / scene it represents, so both the title and the
// character act as an entrance to the chat.
type Topic = {
  topic_id: string;
  title: string;
  // Center of the visible title pill in % of the container.
  pillTop: number;
  pillLeft: number;
  // Invisible clickable area covering the character / scene (top-left origin).
  hitArea: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

const TOPICS: Topic[] = [
  // Left column (top -> bottom): Smart Reading, Pet Talk, Football Talk, Magic Adventure.
  // Hit areas are tightly confined to the left character/prop band so the
  // central path between the two columns stays completely non-clickable.
  {
    topic_id: "smart_reading",
    title: "Smart Reading",
    pillTop: 36.84,
    pillLeft: 22.8,
    hitArea: { top: 0, left: 0, width: 32, height: 42.5 },
  },
  {
    topic_id: "pet_talk",
    title: "Pet Talk",
    pillTop: 54.36,
    pillLeft: 23.66,
    hitArea: { top: 42.5, left: 0, width: 32, height: 18.4 },
  },
  {
    topic_id: "football_talk",
    title: "Football Talk",
    pillTop: 73,
    pillLeft: 25.06,
    hitArea: { top: 60.9, left: 0, width: 32, height: 21.5 },
  },
  {
    topic_id: "magic_adventure",
    title: "Magic Adventure",
    pillTop: 93.4,
    pillLeft: 24.82,
    hitArea: { top: 82.4, left: 0, width: 32, height: 17.6 },
  },
  // Right column (top -> bottom): Minecraft Talk, Food Talk, Nature Explore, myWordie Talk.
  // Starts at 55 % so the central path stays wide and unclickable.
  {
    topic_id: "minecraft_adventure",
    title: "Minecraft Talk",
    pillTop: 37.4,
    pillLeft: 72.71,
    hitArea: { top: 0, left: 55, width: 38, height: 44.8 },
  },
  {
    topic_id: "food_talk",
    title: "Food Talk",
    pillTop: 56.04,
    pillLeft: 75.4,
    hitArea: { top: 44.8, left: 55, width: 38, height: 18.8 },
  },
  {
    topic_id: "nature_explorer",
    title: "Nature Explore",
    pillTop: 72.14,
    pillLeft: 78.7,
    hitArea: { top: 63.6, left: 55, width: 38, height: 18.7 },
  },
  {
    topic_id: "mywordie",
    title: "myWordie Talk",
    pillTop: 93.32,
    pillLeft: 75.9,
    hitArea: { top: 82.3, left: 55, width: 38, height: 17.7 },
  },
];

function TopicPill({ title }: { title: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-[15px] font-semibold tracking-tight whitespace-nowrap select-none"
      style={{
        background: "color-mix(in oklab, var(--shirin) 14%, white)",
        color: PINK,
      }}
    >
      {title}
      <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Topic Talk — Paisley EC" },
      { name: "description", content: "Pick a topic and start an English conversation with Shirin." },
      { property: "og:title", content: "Topic Talk — Paisley EC" },
      { property: "og:description", content: "Pick a topic and start an English conversation with Shirin." },
    ],
  }),
  component: TopicsPage,
});

function TopicsPage() {
  const getLinkProps = (t: Topic) =>
    t.topic_id === "smart_reading"
      ? ({ to: "/smart-reading", search: { from: "topics" } } as const)
      : t.topic_id === "mywordie"
        ? ({ to: "/chat", search: { mode: "mywordie", from: "topics" } } as const)
        : ({ to: "/chat", search: { mode: "topic", topic_id: t.topic_id } } as const);

  return (
    <PhoneFrame bg="bg-transparent">
      <div className="relative h-[100dvh] w-full overflow-hidden bg-transparent">
        {/* Full-bleed illustration */}
        <div className="absolute inset-0" style={{ transform: "translateY(-5px)" }}>
          <img
            src={topicsMap.url}
            alt="Topics"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
          {TOPICS.map((t) => {
            const pillTopPercent =
              ((t.pillTop - t.hitArea.top) / t.hitArea.height) * 100;
            const pillLeftPercent =
              ((t.pillLeft - t.hitArea.left) / t.hitArea.width) * 100;
            return (
              <Link
                key={t.topic_id}
                {...getLinkProps(t)}
                aria-label={t.title}
                className="absolute group touch-manipulation"
                style={{
                  top: `${t.hitArea.top}%`,
                  left: `${t.hitArea.left}%`,
                  width: `${t.hitArea.width}%`,
                  height: `${t.hitArea.height}%`,
                }}
              >
                <div
                  className="absolute group-active:scale-95 transition-transform"
                  style={{
                    top: `${pillTopPercent}%`,
                    left: `${pillLeftPercent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <TopicPill title={t.title} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Floating back button */}
        <FloatingBack to="/shirin-talk" />

        {/* Floating title */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-14 flex justify-center pointer-events-none">
          <div className="px-5 py-3 text-center">
            <h1
              className="text-[30px] leading-[1.2] font-medium tracking-tight"
              style={{ color: PINK, letterSpacing: "-0.01em" }}
            >
              Pick A Topic
            </h1>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
