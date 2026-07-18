import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import mywordieIcon from "@/assets/brand/mywordie-icon.png.asset.json";
import { Flame, MessageCircle, BookOpen, Lightbulb, ChevronRight } from "lucide-react";
import { FloatingBack } from "@/components/app/FloatingBack";
import {
  MonthCalendarDialog,
  mockActivity,
} from "@/components/app/MonthCalendarDialog";
import { useBloxia } from "@/lib/bloxia/progress";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [
      { title: "ShirinTalk — Paisley EC" },
      { name: "description", content: "Practice spoken English with Shirin: topic talks, smart reading and free chat." },
      { property: "og:title", content: "ShirinTalk — Paisley EC" },
      { property: "og:description", content: "Practice spoken English with Shirin: topic talks, smart reading and free chat." },
    ] }),
  component: ShirinTalkPage,
});

const PINK = "var(--shirin)";

function ShirinTalkPage() {
  const [calOpen, setCalOpen] = useState(false);
  const { bp } = useBloxia();
  const cards = [
    { to: "/topics", title: "Topic Talk", icon: Lightbulb },
    { to: "/smart-reading", title: "Smart Reading Talk", icon: BookOpen, search: { from: "shirin-talk" } as const },
    { to: "/chat", title: "myWordie Talk", icon: null, search: { mode: "mywordie", from: "shirin-talk" } as const },
    { to: "/chat", title: "Free Talk", icon: MessageCircle, search: { mode: "free", from: "shirin-talk" } as const },
  ];

  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  // Mock practice days within the week (relative day-of-week indices)
  const practiceDows = new Set([1, 2, 3, today.getDay()]);

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white">
        <FloatingBack to="/" />

        {/* Hero */}
        <section className="px-6 pt-[55px] pb-1 text-center">
          <img
            src={shirinHero.url}
            alt="Shirin"
            className="mx-auto h-40 w-40 object-contain"
          />
          <h2
            className="mt-2 text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PINK, letterSpacing: "-0.01em" }}
          >
            Hi, I'm Shirin!
          </h2>
          <p
            className="mt-1 text-[15px] text-foreground/70 font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Let's practice English together.
          </p>
          <div className="mt-3 flex flex-nowrap items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] leading-none font-semibold bg-white h-7 whitespace-nowrap"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              7 days
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] leading-none font-semibold bg-white h-7 whitespace-nowrap"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              116 words
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] leading-none font-semibold bg-white h-7 whitespace-nowrap"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              318 min
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] leading-none font-semibold bg-white h-7 whitespace-nowrap"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              {bp.toLocaleString()} Bp
            </span>
          </div>
        </section>

        {/* Week calendar */}
        <section className="px-6 pt-3">
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="w-full flex items-center justify-between active:scale-[0.99] transition-transform"
            aria-label="Open monthly ShirinTalk calendar"
          >
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              const practiced = practiceDows.has(d.getDay());
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-medium" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                    {dayLabels[i]}
                  </span>
                  <span
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-semibold"
                    style={
                      isToday
                        ? { color: PINK, border: `1.5px solid ${PINK}` }
                        : { color: "var(--foreground)" }
                    }
                  >
                    {d.getDate()}
                  </span>
                  <span className="h-1.5 flex items-center">
                    {practiced && !isToday && (
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: PINK }} />
                    )}
                  </span>
                </div>
              );
            })}
          </button>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                search={"search" in c ? c.search : undefined}
                className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--shirin) 14%, white)" }}
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
                        maskSize: "contain"
                      }}
                    />
                  )}
                </span>
                <span className="text-[17px] font-semibold tracking-tight leading-none" style={{ letterSpacing: "-0.01em", color: PINK }}>
                  {c.title}
                </span>
                <ChevronRight className="ml-auto h-5 w-5 shrink-0" strokeWidth={2.25} style={{ color: "white" }} />
              </Link>
            );
          })}
        </section>
      </div>

      <BottomTabBar />
      <MonthCalendarDialog
        open={calOpen}
        onOpenChange={setCalOpen}
        title="ShirinTalk · Monthly"
        color={PINK}
        getActivity={(d) => ({ talk: mockActivity(d, 1) })}
        variant="dots"
        talkColor={PINK}
        presentation="sheet"
      />
    </PhoneFrame>
  );
}