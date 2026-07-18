import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import topicsMap from "@/assets/topics/topics-map.png.asset.json";

const PINK = "var(--shirin)";

// Topic map: one illustration with clickable hotspots over each character.
// Rows top→bottom; two columns per row.
type Topic = {
  topic_id: string;
  title: string;
  // Hotspot in % of the image (top-left origin).
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

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [
      { title: "Topic Talk — Paisley EC" },
      { name: "description", content: "Pick a topic and start an English conversation with Shirin." },
      { property: "og:title", content: "Topic Talk — Paisley EC" },
      { property: "og:description", content: "Pick a topic and start an English conversation with Shirin." },
    ] }),
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
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        <FloatingBack to="/shirin-talk" />

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-14">
          <div className="mb-4 text-center">
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

          <div className="relative w-full overflow-hidden rounded-3xl">
            <img
              src={topicsMap.url}
              alt="Topics"
              className="block w-full h-auto select-none"
              draggable={false}
            />
            {TOPICS.map((t) => (
              <Link
                key={t.topic_id}
                {...getLinkProps(t)}
                aria-label={t.title}
                className="absolute active:scale-[0.96] transition-transform"
                style={{
                  top: `${t.top}%`,
                  left: `${t.left}%`,
                  width: `${t.width}%`,
                  height: `${t.height}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
