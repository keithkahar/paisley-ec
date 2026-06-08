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
  { topic_id: "minecraft_adventure", title: "Minecraft Adventure", art: minecraftArt },
  { topic_id: "food_talk", title: "Food Talk", art: foodTalkArt },
  { topic_id: "football_talk", title: "Football Talk", art: footballArt },
  { topic_id: "magic_adventure", title: "Magic Adventure", art: magicArt },
  { topic_id: "nature_explorer", title: "Nature Explorer", art: natureArt },
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
          <div className="mb-4">
            <h1
              className="text-[26px] leading-[1.2] font-semibold tracking-tight"
              style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              Choose A Topic
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

            // Hero card: aspect drives height, or an explicit style override.
            const HeroCard = ({ t, ratio, imgStyle }: { t: Topic; ratio?: string; imgStyle?: React.CSSProperties }) => (
              <Link
                {...getLinkProps(t)}
                className="group flex flex-col rounded-3xl overflow-hidden active:scale-[0.98] transition-transform h-full"
                style={cardStyle}
              >
                <div className={`relative bg-white ${ratio ?? ""}`} style={imgStyle}>
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
                    className="text-[17px] font-bold tracking-tight leading-none whitespace-nowrap"
                    style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.015em" }}
                  >
                    {t.title}
                  </p>
                </div>
              </Link>
            );

            const byId = Object.fromEntries(TOPICS.map((t) => [t.topic_id, t])) as Record<string, Topic>;

            return (
              <div className="grid grid-cols-2 gap-2.5">
                <HeroCard t={byId.pet_talk} ratio="aspect-square" />
                <HeroCard t={byId.football_talk} ratio="aspect-square" />
                {/* Minecraft Adventure spans both columns right under Pet Talk & Football Talk */}
                <div className="col-span-2">
                  {/* Image height = single column width = (100% - gap)/2, so the card matches a square card's height exactly */}
                  <HeroCard
                    t={byId.minecraft_adventure}
                    imgStyle={{ height: "calc((100% - 10px) / 2)" }}
                  />
                </div>
                <HeroCard t={byId.free_talk} ratio="aspect-square" />
                <HeroCard t={byId.magic_adventure} ratio="aspect-square" />
                <HeroCard t={byId.nature_explorer} ratio="aspect-square" />
                <HeroCard t={byId.smart_reading} ratio="aspect-square" />
                <HeroCard t={byId.food_talk} ratio="aspect-square" />
                <HeroCard t={byId.mywordie} ratio="aspect-square" />
              </div>
            );
          })()}
        </div>
      </div>
    </PhoneFrame>
  );
}