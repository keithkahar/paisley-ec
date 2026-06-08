import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Pill } from "@/components/app/Pills";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { ChevronLeft, Flame, MessageCircle, BookOpen, Notebook, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

const PINK = "var(--shirin)";

function ShirinTalkPage() {
  const week = [
    { d: "Mon", n: 2, done: true },
    { d: "Tue", n: 3, done: true },
    { d: "Wed", n: 4, done: true },
    { d: "Thu", n: 5, done: true, today: true },
    { d: "Fri", n: 6, done: false },
    { d: "Sat", n: 7, done: false },
    { d: "Sun", n: 8, done: false },
  ];

  const cards = [
    { to: "/chat", title: "Free Talk", sub: "Chat about anything", icon: MessageCircle },
    { to: "/smart-reading", title: "Smart Reading Talk", sub: "Read & discuss", icon: BookOpen },
    { to: "/mywordie", title: "myWordie Talk", sub: "Practise your words", icon: Notebook },
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
            <Pill color={PINK} icon={<Flame className="h-3.5 w-3.5" />}>7</Pill>
            <Pill color={PINK}>1,240 Bp</Pill>
          </div>
        </section>

        {/* Week calendar */}
        <section className="px-6 pt-6 pb-5">
          <div className="flex items-center justify-between">
            {week.map((w) => {
              const active = w.today;
              return (
                <div key={w.d} className="flex-1 flex flex-col items-center gap-1.5">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: active ? PINK : "color-mix(in oklab, var(--foreground) 45%, white)" }}
                  >
                    {w.d}
                  </span>
                  <span
                    className="h-9 w-9 grid place-items-center rounded-full text-[14px] font-semibold"
                    style={
                      active
                        ? { background: PINK, color: "white" }
                        : w.done
                        ? { background: "color-mix(in oklab, var(--shirin) 14%, white)", color: PINK }
                        : { color: "color-mix(in oklab, var(--foreground) 55%, white)" }
                    }
                  >
                    {w.n}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-2 pb-6 flex flex-col gap-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="relative isolate flex items-center gap-3 rounded-full py-4 px-5 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--shirin) 14%, white)", fontFamily: "var(--font-sans)" }}
              >
                <span className="h-9 w-9 shrink-0 grid place-items-center rounded-full" style={{ background: "color-mix(in oklab, var(--shirin) 22%, white)" }}>
                  <Icon className="h-5 w-5" style={{ color: PINK }} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[15px] font-bold tracking-tight" style={{ letterSpacing: "-0.01em", color: PINK }}>
                    {c.title}
                  </span>
                  <span className="text-[12px] font-medium" style={{ color: "color-mix(in oklab, var(--shirin) 70%, white)" }}>{c.sub}</span>
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