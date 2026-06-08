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
      <div
        className="relative min-h-[100dvh] flex flex-col"
        style={{ background: "color-mix(in oklab, var(--shirin) 5%, white)" }}
      >
        <header className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 backdrop-blur"
          style={{ background: "color-mix(in oklab, var(--shirin) 5%, white)" }}>
          <Link to="/shirin-talk" aria-label="Back" className="h-9 w-9 grid place-items-center rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <span
            className="text-[12px] font-bold tracking-[0.22em] uppercase"
            style={{ color: PINK, fontFamily: "var(--font-sans)" }}
          >
            Gallery
          </span>
          <div className="h-9 w-9" />
        </header>

        <div className="flex-1 overflow-y-auto scroll-hide px-4 pb-16 pt-1">
          <div className="mb-5 px-1 text-center">
            <h1
              className="text-[26px] font-black tracking-tight leading-none"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
            >
              The <span style={{ color: PINK, fontStyle: "italic", fontWeight: 900 }}>Shirin</span> Gallery
            </h1>
            <p className="mt-2 text-[12px] font-semibold tracking-wide text-foreground/55">
              Nine little paintings · pick one to talk about
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {TOPICS.map((t) => {
              const linkProps =
                t.topic_id === "smart_reading"
                  ? ({ to: "/smart-reading" } as const)
                  : t.topic_id === "mywordie"
                    ? ({ to: "/chat", search: { mode: "mywordie" } } as const)
                    : ({ to: "/chat", search: { mode: "topic", topic_id: t.topic_id } } as const);

              return (
                <Link
                  key={t.topic_id}
                  {...linkProps}
                  className="group flex flex-col items-stretch active:scale-[0.97] transition-transform"
                >
                  {/* Painting in a thin gallery frame */}
                  <div
                    className="relative aspect-square rounded-[3px] overflow-hidden bg-white"
                    style={{
                      padding: "4px",
                      border: "1px solid color-mix(in oklab, var(--shirin) 22%, white)",
                      boxShadow:
                        "0 1px 0 rgba(0,0,0,0.04), 0 10px 22px -14px color-mix(in oklab, var(--shirin) 45%, transparent)",
                    }}
                  >
                    <img
                      src={t.art}
                      alt={t.title}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="block h-full w-full object-cover rounded-[1px]"
                      draggable={false}
                    />
                  </div>
                  {/* Plaque */}
                  <div className="mt-1.5 text-center">
                    <p
                      className="text-[10.5px] font-black tracking-[0.1em] uppercase leading-tight"
                      style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
                    >
                      {t.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <p
            className="mt-6 text-center text-[10px] font-semibold tracking-[0.25em] uppercase"
            style={{ color: "color-mix(in oklab, var(--shirin) 55%, var(--foreground))" }}
          >
            — Shirin · No. 001 / 009 —
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}