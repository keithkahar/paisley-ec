import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import myWordieText from "@/assets/brand/mywordie-text.png.asset.json";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";
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
        {/* App logo top-left */}
        <div className="absolute top-4 left-5 z-20">
          <img src={paisleyLogo.url} alt="Paisley EC" className="h-8 w-auto object-contain" />
        </div>
        {/* PRIMARY: Shirin hero */}
        <section className="relative px-6 pt-28 pb-0">
          <Cloud className="absolute top-10 right-6 w-24 opacity-80" />
          <Cloud className="absolute top-28 left-4 w-16 opacity-70" />
          <Cloud className="absolute top-44 right-16 w-20 opacity-60" />

          <div className="relative flex justify-center">
            <img
              src={shirinHero.url}
              alt="Shirin"
              className="relative z-10 w-[66%] max-w-[270px] object-contain"
            />
          </div>
        </section>

        {/* Bottom white panel with curved top */}
        <section
          className="relative -mt-2 flex-1 bg-card px-7 pt-9 pb-6"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          {/* SECONDARY: greeting + question, one refined block */}
          <h1
            className="text-[28px] leading-[1.2] font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Hi, {name}.
            <span className="block mt-7 text-[26px] text-foreground/80 font-normal leading-[1.3]">
              Are you ready for today's <span className="font-semibold text-foreground">English adventure?</span>
            </span>
          </h1>

          {/* TERTIARY: primary action */}
          <Link
            to="/shirin-talk"
            className="mt-10 flex items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
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
              className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              or practice with
              <img src={myWordieText.url} alt="myWordie" className="h-4 object-contain" />
              →
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
