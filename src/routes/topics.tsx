import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import smartReadingArt from "@/assets/topics/smart_reading.png";
import petTalkArt from "@/assets/topics/pet_talk.png";
import minecraftArt from "@/assets/topics/minecraft_adventure.png";
import foodTalkArt from "@/assets/topics/food_talk.png";
import footballArt from "@/assets/topics/football_talk.png";
import magicArt from "@/assets/topics/magic_adventure.png";
import natureArt from "@/assets/topics/nature_explorer.png";
import mywordieArt from "@/assets/topics/mywordie.png";

const PINK = "var(--shirin)";

// Topic gallery: 8 cards arranged in a tidy 2-column grid.
// `smart_reading` routes to its own flow; `mywordie` opens the myWordie chat.
type Topic = {
  topic_id: string;
  title: string;
  art: string;
};
const TOPICS: Topic[] = [
  { topic_id: "smart_reading", title: "Smart Reading", art: smartReadingArt },
  { topic_id: "pet_talk", title: "Pet Talk", art: petTalkArt },
  { topic_id: "minecraft_adventure", title: "Minecraft Adventure Talk", art: minecraftArt },
  { topic_id: "food_talk", title: "Food Talk", art: foodTalkArt },
  { topic_id: "football_talk", title: "Football Talk", art: footballArt },
  { topic_id: "magic_adventure", title: "Magic Adventure", art: magicArt },
  { topic_id: "nature_explorer", title: "Nature Explore", art: natureArt },
  { topic_id: "mywordie", title: "myWordie Talk", art: mywordieArt },
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

  const cardStyle = {
    background: "color-mix(in oklab, var(--shirin) 8%, white)",
    border: "1px solid color-mix(in oklab, var(--shirin) 18%, white)",
  } as const;

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

          <div className="grid grid-cols-2 gap-2.5">
            {TOPICS.map((t) => (
              <Link
                key={t.topic_id}
                {...getLinkProps(t)}
                className="group flex flex-col rounded-3xl overflow-hidden active:scale-[0.98] transition-transform"
                style={cardStyle}
              >
                <div className="relative overflow-hidden bg-white aspect-square">
                  <img
                    src={t.art}
                    alt={t.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="block h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="px-3 py-3">
                  <p
                    className="text-[17px] font-semibold tracking-tight leading-none text-center"
                    style={{ color: PINK, letterSpacing: "-0.015em" }}
                  >
                    {t.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
