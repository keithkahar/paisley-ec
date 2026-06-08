import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ChevronLeft } from "lucide-react";
import freeTalkArt from "@/assets/topics/free_talk.png";
import smartReadingArt from "@/assets/topics/smart_reading.png";
import petTalkArt from "@/assets/topics/pet_talk.png";
import minecraftArt from "@/assets/topics/minecraft_adventure.png";
import foodTalkArt from "@/assets/topics/food_talk.png";
import footballArt from "@/assets/topics/football_talk.png";
import magicArt from "@/assets/topics/magic_adventure.png";
import natureArt from "@/assets/topics/nature_explorer.png";
import mywordieArt from "@/assets/topics/mywordie.png";

const PINK = "var(--shirin)";

// Canonical topics rendered as a 3x3 brand gallery of pink line-art paintings.
// `smart_reading` routes to its own flow; `mywordie` opens the myWordie chat.
type Topic = {
  topic_id: string;
  title: string;
  art: string;
};
const TOPICS: Topic[] = [
  { topic_id: "free_talk", title: "Free Talk", art: freeTalkArt },
  { topic_id: "smart_reading", title: "Smart Reading", art: smartReadingArt },
  { topic_id: "pet_talk", title: "Pet Talk", art: petTalkArt },
  { topic_id: "minecraft_adventure", title: "Minecraft", art: minecraftArt },
  { topic_id: "food_talk", title: "Food Talk", art: foodTalkArt },
  { topic_id: "football_talk", title: "Football", art: footballArt },
  { topic_id: "magic_adventure", title: "Magic", art: magicArt },
  { topic_id: "nature_explorer", title: "Nature", art: natureArt },
  { topic_id: "mywordie", title: "myWordie", art: mywordieArt },
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

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-1">
          <div className="mb-4 px-1">
            <h1
              className="text-[26px] leading-[1.2] font-semibold tracking-tight"
              style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              Choose a topic
            </h1>
            <p className="mt-1 text-[14px] font-bold tracking-tight text-foreground/65">
              Pick a painting · let's talk about it.
            </p>
          </div>

          {(() => {
            const getLinkProps = (t: Topic) =>
              t.topic_id === "smart_reading"
                ? ({ to: "/smart-reading" } as const)
                : t.topic_id === "mywordie"
                  ? ({ to: "/chat", search: { mode: "mywordie" } } as const)
                  : ({ to: "/chat", search: { mode: "topic", topic_id: t.topic_id } } as const);

            const cardStyle = {
              background: "color-mix(in oklab, var(--shirin) 8%, white)",
              border: "1px solid color-mix(in oklab, var(--shirin) 18%, white)",
            } as const;

            const Card = ({ t, ratio }: { t: Topic; ratio: string }) => (
              <Link
                {...getLinkProps(t)}
                className="group flex flex-col rounded-3xl overflow-hidden active:scale-[0.98] transition-transform"
                style={cardStyle}
              >
                <div className={`relative ${ratio} bg-white`}>
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
                <div className="px-3 py-2.5">
                  <p
                    className="text-[14px] font-bold tracking-tight leading-tight"
                    style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
                  >
                    {t.title}
                  </p>
                </div>
              </Link>
            );

            const byId = Object.fromEntries(TOPICS.map((t) => [t.topic_id, t])) as Record<string, Topic>;

            return (
              <div className="flex flex-col gap-2.5">
                {/* Row 1: featured hero (Free Talk) + 2 stacked */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="col-span-2">
                    <Card t={byId.free_talk} ratio="aspect-square" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <Card t={byId.smart_reading} ratio="aspect-square" />
                    <Card t={byId.mywordie} ratio="aspect-square" />
                  </div>
                </div>

                {/* Row 2: 2-column pairs */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Card t={byId.pet_talk} ratio="aspect-square" />
                  <Card t={byId.minecraft_adventure} ratio="aspect-square" />
                  <Card t={byId.food_talk} ratio="aspect-square" />
                  <Card t={byId.football_talk} ratio="aspect-square" />
                </div>

                {/* Row 3: 2-column pair */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Card t={byId.magic_adventure} ratio="aspect-square" />
                  <Card t={byId.nature_explorer} ratio="aspect-square" />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </PhoneFrame>
  );
}