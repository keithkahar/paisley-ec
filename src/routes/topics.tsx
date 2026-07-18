import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import topicsMap from "@/assets/topics/topics-map.png.asset.json";

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
  // Each hit area spans from the top of the character's head to the midpoint between
  // adjacent characters so the whole figure (including the head) is an entrance.
  {
    topic_id: "smart_reading",
    title: "Smart Reading",
    pillTop: 34,
    pillLeft: 22.8,
    hitArea: { top: 0, left: 0, width: 45, height: 42.5 },
  },
  {
    topic_id: "pet_talk",
    title: "Pet Talk",
    pillTop: 51,
    pillLeft: 17.8,
    hitArea: { top: 42.5, left: 0, width: 45, height: 18.4 },
  },
  {
    topic_id: "football_talk",
    title: "Football Talk",
    pillTop: 70.8,
    pillLeft: 20.2,
    hitArea: { top: 60.9, left: 0, width: 45, height: 21.5 },
  },
  {
    topic_id: "magic_adventure",
    title: "Magic Adventure",
    pillTop: 94,
    pillLeft: 23.8,
    hitArea: { top: 82.4, left: 0, width: 45, height: 17.6 },
  },
  // Right column (top -> bottom): Minecraft Talk, Food Talk, Nature Explore, myWordie Talk.
  {
    topic_id: "minecraft_adventure",
    title: "Minecraft Talk",
    pillTop: 35.6,
    pillLeft: 65.6,
    hitArea: { top: 0, left: 45, width: 55, height: 44.8 },
  },
  {
    topic_id: "food_talk",
    title: "Food Talk",
    pillTop: 54,
    pillLeft: 57.8,
    hitArea: { top: 44.8, left: 45, width: 55, height: 18.8 },
  },
  {
    topic_id: "nature_explorer",
    title: "Nature Explore",
    pillTop: 73.2,
    pillLeft: 80,
    hitArea: { top: 63.6, left: 45, width: 55, height: 18.7 },
  },
  {
    topic_id: "mywordie",
    title: "myWordie Talk",
    pillTop: 91.4,
    pillLeft: 74.6,
    hitArea: { top: 82.3, left: 45, width: 55, height: 17.7 },
  },
];

function TopicPill({ title }: { title: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-[15px] font-semibold tracking-tight border shadow-sm bg-white/90 backdrop-blur-sm whitespace-nowrap select-none"
      style={{
        borderColor: `color-mix(in oklab, ${PINK} 22%, white)`,
        color: PINK,
      }}
    >
      {title}
      <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} style={{ color: "color-mix(in oklab, var(--shirin) 55%, white)" }} />
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
        <div className="absolute inset-0">
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
              style={{ color: PINK, letterSpacing: "-0.01em", textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}
            >
              Pick A Topic
            </h1>
            <p
              className="mt-1 text-[14px] font-semibold tracking-tight text-gray-500"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.25)" }}
            >
              Let's talk about it.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
