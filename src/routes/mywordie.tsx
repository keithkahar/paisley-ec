import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Layers, Zap, ClipboardCheck, Flame, Play } from "lucide-react";
import { ProgressBar } from "@/components/app/WordieKit";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/mywordie")({
  head: () => ({ meta: [
      { title: "myWordie — Paisley EC" },
      { name: "description", content: "Daily word cards, quick reviews and a personal word bank for young learners." },
      { property: "og:title", content: "myWordie — Paisley EC" },
      { property: "og:description", content: "Daily word cards, quick reviews and a personal word bank for young learners." },
    ] }),
  component: MyWordiePage,
});

function MyWordiePage() {
  const WORDIE = "var(--wordie)";
  // Today's card pack
  const cardsTotal = 5;
  const reviewCount = 1;
  const newCount = 4;
  const doneToday = 2; // cards completed today (mock for visual progress)
  const pct = Math.round((doneToday / cardsTotal) * 100);

  // Week calendar
  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  // Mock study days within the week (relative day-of-week indices)
  const studiedDows = new Set([1, 2, 3, today.getDay()]);

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white">
        <FloatingBack to="/" />
        {/* Hero: today's card + small pills (mirrors ShirinTalk hero) */}
        <section className="px-5 pt-12 pb-1">
          <div
            className="relative h-[228px] rounded-[28px] p-4 text-white overflow-hidden flex flex-col justify-between"
            style={{ background: "var(--wordie)" }}
          >
          <div>
            <h2
              className="text-center text-[22px] font-medium leading-none"
              style={{ letterSpacing: "-0.01em" }}
            >
              Today's Practice
            </h2>
            <div className="mt-2">
              <ProgressBar
                value={pct}
                color="var(--wordie-accent)"
                track="rgba(255,255,255,0.22)"
                height={4}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-center gap-2">
              <span
                className="text-[46px] font-bold leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                {cardsTotal}
              </span>
              <span
                className="text-[24px] opacity-90 font-bold leading-none"
                style={{ letterSpacing: "-0.01em" }}
              >
                cards
              </span>
            </div>
            <p className="mt-1 text-center text-[13px] font-bold opacity-90">
              {reviewCount} review · {newCount} new
            </p>
          </div>

          {/* Start word card — white pill */}
          <Link
            to="/word-card"
            className="flex items-center justify-center gap-2 rounded-full py-3 font-bold active:scale-[0.98] transition-transform"
            style={{
              color: "var(--wordie)",
              background: "white",
              fontSize: "17.25px"
            }}
          >
            <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
            <span>Start Word Card</span>
          </Link>
          </div>

          {/* Streak + Bp pills — match ShirinTalk position (mt-3 inside hero) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-bold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            7 days
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-bold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            230 cards
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-bold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            318 min
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-bold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            1,240 Bp
          </span>
          </div>
        </section>

        {/* Week calendar — locked to ShirinTalk's same hero stack: pt-12 + 220px card + mt-3 stats + pb-1 + pt-3 */}
        <section className="px-6 pt-3">
          <div className="flex items-center justify-between">
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}
                  >
                    {dayLabels[i]}
                  </span>
                  <span
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-bold"
                    style={
                      isToday
                        ? { color: WORDIE, border: `1.5px solid ${WORDIE}` }
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
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          <PillLink to="/wordie-bank" title="Wordie Bank" Icon={Layers} />
          <PillLink to="/wordie-x" title="Wordie-X" Icon={Zap} />
          <PillLink to="/wordie-test" title="Wordie Test" Icon={ClipboardCheck} />
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function PillLink({
  to,
  title,
  Icon,
}: {
  to: string;
  title: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
}) {
  const WORDIE = "var(--wordie)";
  return (
    <Link
      to={to}
      className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
      style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
    >
      <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white">
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: WORDIE }} />
      </span>
      <span
        className="text-[17px] font-bold tracking-tight leading-none"
        style={{ letterSpacing: "-0.01em", color: WORDIE }}
      >
        {title}
      </span>
    </Link>
  );
}