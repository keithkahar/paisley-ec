import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Pill } from "@/components/app/Pills";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { ChevronLeft, Flame, Sparkles, MessageCircle, BookOpen, BookA, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

const PINK = "var(--shirin)";

function ShirinTalkPage() {
  const cards = [
    { to: "/chat", title: "Free Talk", sub: "Chat about anything", icon: MessageCircle },
    { to: "/smart-reading", title: "Smart Reading Talk", sub: "Read & discuss", icon: BookOpen },
    { to: "/mywordie", title: "myWordie Talk", sub: "Practise your words", icon: BookA },
    { to: "/topics", title: "Topic Talk", sub: "Guided conversations", icon: Lightbulb },
  ];

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
        <div className="absolute top-4 left-4 z-30">
          <Link
            to="/"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[oklch(0.95_0.02_10)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Hero */}
        <section className="px-6 pt-16 pb-2 text-center">
          <img
            src={shirinHero.url}
            alt="Shirin"
            className="mx-auto h-40 w-40 object-contain"
          />
          <h2
            className="mt-2 text-[26px] leading-[1.2] font-semibold tracking-tight"
            style={{ color: PINK, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Hi, I'm Shirin!
          </h2>
          <p
            className="mt-1 text-[15px] text-foreground/70"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Let's practise English together.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-white"
              style={{ color: PINK, border: `1.5px solid ${PINK}` }}
            >
              <Flame className="h-3.5 w-3.5" />7
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-white"
              style={{ color: PINK, border: `1.5px solid ${PINK}` }}
            >
              <Sparkles className="h-3.5 w-3.5" />1,240 Bp
            </span>
          </div>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="relative isolate flex items-center gap-3 rounded-full py-4 px-5 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--shirin) 14%, white)", fontFamily: "var(--font-sans)" }}
              >
                <span className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-white">
                  <Icon className="h-5 w-5" style={{ color: PINK }} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[17px] font-bold tracking-tight" style={{ letterSpacing: "-0.01em", color: PINK }}>
                    {c.title}
                  </span>
                  <span className="text-[13px] font-medium mt-0.5" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>{c.sub}</span>
                </span>
              </Link>
            );
          })}
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}