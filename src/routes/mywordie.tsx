import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import {
  Layers,
  Zap,
  ClipboardCheck,
  ChevronRight,
  Sparkles,
  Flame,
  Play,
} from "lucide-react";
import type { ReactNode } from "react";
import { ProgressBar, SectionTitle } from "@/components/app/WordieKit";

export const Route = createFileRoute("/mywordie")({
  head: () => ({ meta: [{ title: "myWordie — Paisley EC" }] }),
  component: MyWordiePage,
});

function MyWordiePage() {
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
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      <AppHeader
        title="myWordie"
        bg="color-mix(in oklab, var(--wordie-soft) 70%, white)"
      />

      <div className="px-5 pb-6">
        {/* Hero progress card */}
        <section
          className="relative rounded-[28px] p-5 text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, var(--wordie) 0%, oklch(0.48 0.22 273) 60%, oklch(0.42 0.20 280) 100%)",
          }}
        >
          {/* soft glow */}
          <div
            className="absolute -top-12 -right-10 h-40 w-40 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
            aria-hidden
          />
          <div className="flex items-baseline justify-center gap-2 mt-2">
            <span className="text-[56px] font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {cardsTotal}
            </span>
            <span className="text-[18px] opacity-90 font-bold">cards</span>
          </div>
          <p className="mt-2 text-center text-[13px] font-bold opacity-90 inline-flex items-center justify-center gap-1.5 w-full">
            <Sparkles className="h-3.5 w-3.5" />
            {reviewCount} review · {newCount} new
          </p>
          <div className="mt-4">
            <ProgressBar
              value={pct}
              color="var(--wordie-accent)"
              track="rgba(255,255,255,0.22)"
              height={10}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-bold">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 bg-transparent text-white"
              style={{ border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <Flame className="h-3.5 w-3.5" />7
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 bg-transparent text-white"
              style={{ border: "1px solid rgba(255,255,255,0.9)" }}
            >
              1,240 Bp
            </span>
          </div>

          {/* Start word card — white pill (matches home pink pill style) */}
          <Link
            to="/word-card"
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-white py-4 font-bold active:scale-[0.98] transition-transform"
            style={{
              color: "var(--wordie)",
              fontFamily: "var(--font-sans)",
              fontSize: "17.25px",
            }}
          >
            <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
            <span>Start Word Card</span>
          </Link>
        </section>

        {/* Week calendar */}
        <section className="mt-5 rounded-3xl bg-white border border-border px-4 py-3.5">
          <div className="flex items-center justify-between">
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              const studied = studiedDows.has(i);
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
                        ? {
                            color: "white",
                            background: "var(--wordie)",
                          }
                        : studied
                          ? {
                              color: "var(--wordie)",
                              border: "1.5px solid var(--wordie)",
                            }
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

        {/* Three feature cards */}
        <section className="mt-5">
          <SectionTitle>Practice</SectionTitle>
          <div className="space-y-2.5">
            <FeatureCard
              to="/wordie-bank"
              icon={<Layers className="h-5 w-5" />}
              title="Wordie Bank"
              desc="Browse your growing collection"
              tint="var(--paisley)"
            />
            <FeatureCard
              to="/wordie-x"
              icon={<Zap className="h-5 w-5" />}
              title="Wordie-X"
              desc="Power up tricky words"
              tint="var(--wordie-accent)"
              badge="12 to do"
            />
            <FeatureCard
              to="/wordie-test"
              icon={<ClipboardCheck className="h-5 w-5" />}
              title="Wordie Test"
              desc="Quick check, friendly feedback"
              tint="var(--shirin)"
            />
          </div>
        </section>

      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  desc,
  tint,
  badge,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  desc: string;
  tint: string;
  badge?: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-3xl bg-white border border-border px-4 py-3.5 active:scale-[0.99] transition-transform"
    >
      <div
        className="h-12 w-12 rounded-2xl grid place-items-center text-white shrink-0"
        style={{ background: tint }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-[15px]">{title}</p>
          {badge && (
            <span
              className="text-[10px] font-bold rounded-full px-2 py-0.5"
              style={{
                background: `color-mix(in oklab, ${tint} 18%, white)`,
                color: tint,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-[12.5px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </Link>
  );
}