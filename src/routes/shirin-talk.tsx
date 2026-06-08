import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import mywordieIcon from "@/assets/brand/mywordie-icon.png.asset.json";
import { ChevronLeft, Flame, MessageCircle, BookOpen, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

const PINK = "var(--shirin)";

function ShirinTalkPage() {
  const cards = [
    { to: "/chat", title: "Free Talk", icon: MessageCircle, search: { mode: "topic", topic_id: "free_talk", from: "shirin-talk" } as const },
    { to: "/smart-reading", title: "Smart Reading Talk", icon: BookOpen },
    { to: "/chat", title: "myWordie Talk", icon: null, search: { mode: "mywordie" } as const },
    { to: "/topics", title: "Topic Talk", icon: Lightbulb },
  ];

  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

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
        <section className="px-6 pt-12 pb-1 text-center">
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
            className="mt-1 text-[15px] text-foreground/70 font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Let's practise English together.
          </p>
          <div className="mt-3 flex items-center justify-between">
          <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              <Flame className="h-3.5 w-3.5" />7
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              116 words
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              318 min
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              1,240 Bp
            </span>
          </div>
        </section>

        {/* Week calendar */}
        <section className="px-6 pt-3">
          <div className="flex items-center justify-between">
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-medium" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                    {dayLabels[i]}
                  </span>
                  <span
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-bold"
                    style={
                      isToday
                        ? { color: PINK, border: `1.5px solid ${PINK}` }
                        : { color: "var(--foreground)" }
                    }
                  >
                    {d.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-4 pb-10 flex-1 flex flex-col justify-end gap-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                search={"search" in c ? c.search : undefined}
                className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--shirin) 14%, white)", fontFamily: "var(--font-sans)" }}
              >
                <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white">
                  {Icon ? (
                    <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: PINK }} />
                  ) : (
                    <span
                      aria-hidden
                      className="block h-[18px] w-[18px]"
                      style={{
                        background: PINK,
                        WebkitMaskImage: `url(${mywordieIcon.url})`,
                        maskImage: `url(${mywordieIcon.url})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  )}
                </span>
                <span className="text-[17px] font-bold tracking-tight leading-none" style={{ letterSpacing: "-0.01em", color: PINK }}>
                  {c.title}
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