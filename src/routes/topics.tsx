import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import topicsMap from "@/assets/topics/topics-map.png.asset.json";

const PINK = "var(--shirin)";

// Topic map: one full-screen illustration with small labeled entry pills.
// The coordinates below describe the bounding box of each character / area
// in % of the container. The visible pill is centered on that box.
type Topic = {
  topic_id: string;
  title: string;
  // Bounding box in % of the container (top-left origin).
  top: number;
  left: number;
  width: number;
  height: number;
};

const TOPICS: Topic[] = [
  // Row 1
  { topic_id: "smart_reading", title: "Smart Reading", top: 10, left: 2, width: 46, height: 22 },
  { topic_id: "minecraft_adventure", title: "Minecraft Talk", top: 14, left: 50, width: 48, height: 22 },
  // Row 2
  { topic_id: "pet_talk", title: "Pet Talk", top: 36, left: 2, width: 46, height: 20 },
  { topic_id: "food_talk", title: "Food Talk", top: 36, left: 50, width: 48, height: 22 },
  // Row 3
  { topic_id: "football_talk", title: "Football Talk", top: 56, left: 2, width: 46, height: 20 },
  { topic_id: "nature_explorer", title: "Nature Explore", top: 58, left: 50, width: 48, height: 20 },
  // Row 4
  { topic_id: "magic_adventure", title: "Magic Adventure", top: 76, left: 2, width: 46, height: 22 },
  { topic_id: "mywordie", title: "myWordie Talk", top: 76, left: 50, width: 48, height: 22 },
];

function TopicPill({ title }: { title: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-[13px] font-semibold tracking-tight border shadow-sm bg-white/90 backdrop-blur-sm whitespace-nowrap select-none"
      style={{
        borderColor: `color-mix(in oklab, ${PINK} 22%, white)`,
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
    <PhoneFrame bg="bg-white">
      <div className="relative h-[100dvh] w-full overflow-hidden bg-white">
        {/* Full-bleed illustration */}
        <div className="absolute inset-0">
          <img
            src={topicsMap.url}
            alt="Topics"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
          {TOPICS.map((t) => {
            const centerTop = t.top + t.height / 2;
            const centerLeft = t.left + t.width / 2;
            return (
              <Link
                key={t.topic_id}
                {...getLinkProps(t)}
                aria-label={t.title}
                className="absolute active:scale-95 transition-transform"
                style={{
                  top: `${centerTop}%`,
                  left: `${centerLeft}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <TopicPill title={t.title} />
              </Link>
            );
          })}
        </div>

        {/* Floating back button */}
        <FloatingBack to="/shirin-talk" />

        {/* Title card */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-14 flex justify-center pointer-events-none">
          <div className="rounded-2xl bg-white/90 px-5 py-3 shadow-sm backdrop-blur-sm">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: PINK, letterSpacing: "-0.01em" }}
            >
              Pick A Topic
            </h1>
            <p className="mt-1 text-[14px] font-semibold tracking-tight text-muted-foreground">
              Let's talk about it.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
