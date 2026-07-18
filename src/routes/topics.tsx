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
  // Left column (top -> bottom): Smart Reading (Shirin's lap), Pet Talk (cat chest),
  // Football Talk (unchanged), Magic Adventure (Shirin's knee).
  { topic_id: "smart_reading", title: "Smart Reading", top: 30, left: 2, width: 46, height: 8 },
  { topic_id: "pet_talk", title: "Pet Talk", top: 45.8, left: -5.2, width: 46, height: 8 },
  { topic_id: "football_talk", title: "Football Talk", top: 67.4, left: -2.8, width: 46, height: 8 },
  { topic_id: "magic_adventure", title: "Magic Adventure", top: 89.4, left: 2, width: 46, height: 8 },
  // Right column (top -> bottom): Minecraft Talk (cat chest), Food Talk (pink cup),
  // Nature Explore (Shirin's right knee), myWordie Talk (between blue book and laptop).
  { topic_id: "minecraft_adventure", title: "Minecraft Talk", top: 40, left: 50, width: 48, height: 8 },
  { topic_id: "food_talk", title: "Food Talk", top: 52, left: 50, width: 48, height: 8 },
  { topic_id: "nature_explorer", title: "Nature Explore", top: 68, left: 50, width: 48, height: 8 },
  { topic_id: "mywordie", title: "myWordie Talk", top: 82, left: 50, width: 48, height: 8 },
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

        {/* Floating title */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-14 flex justify-center pointer-events-none">
          <div className="px-5 py-3 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: PINK, letterSpacing: "-0.01em", textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}
            >
              Pick A Topic
            </h1>
            <p
              className="mt-1 text-[14px] font-semibold tracking-tight text-white"
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
