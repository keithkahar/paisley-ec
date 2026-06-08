import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { Mic } from "lucide-react";

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
    <PhoneFrame bg="bg-[color:var(--paisley-soft)]">
      <div className="relative min-h-screen flex flex-col">
        {/* PRIMARY: Shirin hero */}
        <section className="relative px-6 pt-6 pb-0">
          <Cloud className="absolute top-4 right-6 w-24 opacity-80" />
          <Cloud className="absolute top-20 left-4 w-16 opacity-70" />
          <Cloud className="absolute top-36 right-16 w-20 opacity-60" />

          <div className="relative flex justify-center">
            <div
              className="absolute right-3 top-4 z-20 rounded-2xl px-4 py-2 text-white text-sm font-semibold italic shadow-md"
              style={{ background: "var(--shirin)", fontFamily: "var(--font-sans)" }}
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
              className="relative z-10 w-[70%] max-w-[280px] object-contain drop-shadow-[0_18px_35px_color-mix(in_oklab,var(--shirin)_25%,transparent)]"
            />
          </div>
        </section>

        {/* Bottom white panel with curved top */}
        <section
          className="relative -mt-6 flex-1 bg-card px-7 pt-9 pb-6"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          {/* SECONDARY: greeting + question, one refined block */}
          <h1
            className="text-[26px] leading-[1.25] font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Hi, {name}.
            <span className="block mt-4 text-[22px] text-foreground/80 font-normal leading-[1.35]">
              Are you ready for today's <span className="font-semibold text-foreground">English adventure?</span>
            </span>
          </h1>

          {/* TERTIARY: primary action */}
          <Link
            to="/shirin-talk"
            className="mt-7 flex items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
            style={{
              background: "var(--shirin)",
              boxShadow: "0 10px 25px -8px color-mix(in oklab, var(--shirin) 55%, transparent)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <Mic className="h-5 w-5" />
            Start with ShirinTalk
          </Link>

          {/* Quaternary: subtle skip link */}
          <div className="mt-3 text-center">
            <Link
              to="/mywordie"
              className="text-xs text-muted-foreground font-medium underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              or practice with myWordie →
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
