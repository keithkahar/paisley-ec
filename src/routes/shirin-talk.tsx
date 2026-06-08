import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { BpPill, StreakPill } from "@/components/app/Pills";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

function ShirinTalkPage() {
  const folders = [
    { to: "/chat", title: "Free Talk", bg: "oklch(0.93 0.05 12)" },
    { to: "/smart-reading", title: "Smart Reading Talk", bg: "oklch(0.87 0.07 12)" },
    { to: "/mywordie", title: "myWordie Talk", bg: "oklch(0.81 0.09 12)" },
    { to: "/topics", title: "Topic Talk", bg: "oklch(0.75 0.11 12)" },
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

        {/* Stacked white folder cards */}
        <section className="relative flex-1 flex flex-col bg-card">
          {folders.map((f, i) => (
            <Link
              key={f.title}
              to={f.to}
              className="relative block bg-card px-7 pt-6 pb-6 flex-1 active:scale-[0.995] transition-transform"
              style={{
                borderTopLeftRadius: "28px",
                borderTopRightRadius: "28px",
                marginTop: i === 0 ? "-16px" : "-20px",
                zIndex: i + 1,
                boxShadow: "0 -8px 18px -12px rgba(0,0,0,0.18)",
              }}
            >
              <h3
                className="text-[22px] font-semibold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
              >
                {f.title}
              </h3>
            </Link>
          ))}
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