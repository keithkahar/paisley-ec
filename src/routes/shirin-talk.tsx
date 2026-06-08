import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { BpPill, StreakPill } from "@/components/app/Pills";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { ChevronLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

function ShirinTalkPage() {
  const folders = [
    { to: "/chat", title: "Free Talk", bg: "var(--shirin)", fg: "white" },
    { to: "/smart-reading", title: "Smart Reading Talk", bg: "oklch(0.82 0.14 50)", fg: "oklch(0.25 0.08 40)" },
    { to: "/mywordie", title: "myWordie Talk", bg: "var(--wordie)", fg: "white" },
    { to: "/topics", title: "Topic Talk", bg: "var(--paisley)", fg: "white" },
  ];
  return (
    <PhoneFrame bg="bg-card">
      <div className="relative h-[calc(100dvh-6rem)] overflow-hidden flex flex-col bg-[color:var(--shirin-soft)]">
        {/* Back button */}
        <div className="absolute top-4 left-4 z-30">
          <Link
            to="/"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white/85 backdrop-blur border border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* PINK sky hero */}
        <section className="relative px-6 pt-[4.5rem] pb-0 text-center">
          <Cloud className="absolute top-10 right-6 w-24 opacity-90" />
          <Cloud className="absolute top-28 left-4 w-16 opacity-80" />
          <Cloud className="absolute top-44 right-16 w-20 opacity-70" />

          <img
            src={shirinHero.url}
            alt="Shirin"
            className="relative z-10 mx-auto h-44 w-44 object-contain drop-shadow-[0_10px_25px_color-mix(in_oklab,var(--shirin)_35%,transparent)]"
          />
          <h2
            className="relative z-10 mt-3 text-[28px] leading-[1.2] font-semibold tracking-tight text-[color:var(--shirin)]"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Hi, I'm Shirin!
          </h2>
          <p
            className="relative z-10 mt-1 text-[17px] text-foreground/70 leading-[1.3]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Let's practise English together.
          </p>
          <div className="relative z-10 mt-3 flex items-center justify-center gap-2">
            <StreakPill days={7} />
            <BpPill value={1240} />
          </div>
        </section>

        {/* White curved panel with folder stack */}
        <section
          className="relative -mt-3 flex-1 bg-card px-5 pt-7 pb-4 overflow-hidden"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          <div className="flex flex-col gap-3">
            {folders.map((f) => (
              <Link
                key={f.title}
                to={f.to}
                className="group relative rounded-3xl px-5 py-4 flex items-center justify-between active:scale-[0.99] transition-transform shadow-[0_6px_14px_-8px_rgba(0,0,0,0.25)]"
                style={{ background: f.bg, color: f.fg }}
              >
                <span
                  className="text-[22px] font-bold leading-none"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {f.title}
                </span>
                <span
                  className="h-9 w-9 grid place-items-center rounded-full"
                  style={{ background: "rgba(0,0,0,0.25)", color: "white" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
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