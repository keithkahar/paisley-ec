import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { BpPill, StreakPill } from "@/components/app/Pills";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { ArrowRight, Mic } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paisley EC — English for Kids" },
      { name: "description", content: "ShirinTalk, myWordie and Bloxia — a playful English learning world for 7–12 year-olds." },
    ],
  }),
  component: Home,
});

function Home() {
  const name = "Danielle";
  return (
    <PhoneFrame bg="bg-[color:var(--shirin-soft)]">
      <div className="relative min-h-screen flex flex-col">
        {/* Top: greeting + Shirin hero on soft sky */}
        <section className="relative px-6 pt-8 pb-0">
          {/* decorative clouds */}
          <Cloud className="absolute top-10 right-6 w-24 opacity-80" />
          <Cloud className="absolute top-28 left-4 w-16 opacity-70" />
          <Cloud className="absolute top-44 right-16 w-20 opacity-60" />

          <div className="flex items-start justify-between relative z-10">
            <h1 className="text-[34px] leading-[1.1] font-bold tracking-tight text-foreground">
              Hi, {name}.
            </h1>
            <div className="flex flex-col items-end gap-1.5 pt-1">
              <StreakPill days={7} />
              <BpPill value={1240} />
            </div>
          </div>

          <div className="relative mt-2 flex justify-center">
            {/* speech bubble */}
            <div
              className="absolute right-2 top-6 z-20 rounded-2xl px-4 py-2 text-white font-bold italic shadow-md"
              style={{ background: "var(--shirin)" }}
            >
              Let's Talk!
              <span
                className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45"
                style={{ background: "var(--shirin)" }}
              />
            </div>
            <img
              src={shirinHero.url}
              alt="Shirin"
              className="relative z-10 w-[78%] max-w-[320px] object-contain drop-shadow-[0_15px_30px_color-mix(in_oklab,var(--shirin)_25%,transparent)]"
            />
          </div>
        </section>

        {/* Bottom white panel with curved top */}
        <section
          className="relative -mt-6 flex-1 bg-card px-7 pt-10 pb-8"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          <p className="text-xl text-muted-foreground font-medium">Are you ready</p>
          <h2 className="mt-1 text-2xl font-bold leading-snug text-foreground">
            for today's English adventure?
          </h2>

          <Link
            to="/shirin-talk"
            className="mt-7 flex items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
            style={{
              background: "var(--shirin)",
              boxShadow: "0 10px 25px -8px color-mix(in oklab, var(--shirin) 55%, transparent)",
            }}
          >
            <Mic className="h-5 w-5" />
            Start with ShirinTalk
          </Link>

          <div className="mt-5 flex justify-end">
            <Link
              to="/mywordie"
              aria-label="More"
              className="h-11 w-11 grid place-items-center rounded-full border border-border bg-white text-foreground"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="white" aria-hidden>
      <ellipse cx="30" cy="40" rx="25" ry="18" />
      <ellipse cx="55" cy="32" rx="22" ry="20" />
      <ellipse cx="75" cy="42" rx="20" ry="15" />
    </svg>
  );
}
