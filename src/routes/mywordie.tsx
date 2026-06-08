import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import logo from "@/assets/brand/myWordie.png";
import {
  Layers,
  Zap,
  ClipboardCheck,
  ChevronRight,
  Sparkles,
  Flame,
  BookOpen,
} from "lucide-react";
import type { ReactNode } from "react";
import { ProgressBar, SectionTitle, StatTile } from "@/components/app/WordieKit";

export const Route = createFileRoute("/mywordie")({
  head: () => ({ meta: [{ title: "myWordie — Paisley EC" }] }),
  component: MyWordiePage,
});

function MyWordiePage() {
  const mastered = 420;
  const total = 500;
  const learning = 38;
  const reviewDue = 12;
  const pct = Math.round((mastered / total) * 100);

  // Assigned pack progress
  const pack = { name: "Animal Friends · Pack 4", done: 18, total: 25 };
  const packPct = Math.round((pack.done / pack.total) * 100);

  return (
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      <AppHeader
        title={<img src={logo} alt="myWordie" className="h-6 mx-auto" />}
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
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-80">Your word world</p>
          <h2
            className="mt-1 text-[24px] leading-[1.15] font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Almost there — keep growing.
          </h2>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-[34px] font-bold leading-none" style={{ fontFamily: "var(--font-display)" }}>
              {mastered}
            </span>
            <span className="text-[14px] opacity-80 font-bold">/ {total} mastered</span>
          </div>
          <div className="mt-3">
            <ProgressBar
              value={pct}
              color="var(--wordie-accent)"
              track="rgba(255,255,255,0.22)"
              height={10}
            />
          </div>

          <div className="mt-4 flex items-center gap-3 text-[12px] font-bold">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-2.5 py-1">
              <Flame className="h-3.5 w-3.5" />
              7-day streak
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-2.5 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              1,240 Bp
            </span>
          </div>
        </section>

        {/* Next-best-action card */}
        <Link
          to="/word-card"
          className="mt-3 flex items-center gap-3 rounded-3xl bg-white border border-border px-4 py-4 active:scale-[0.99] transition-transform"
        >
          <div
            className="h-12 w-12 rounded-2xl grid place-items-center shrink-0"
            style={{
              background: "color-mix(in oklab, var(--wordie-accent) 22%, white)",
              color: "var(--wordie-accent)",
            }}
          >
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Review today</p>
            <p className="font-bold text-[15px] leading-tight mt-0.5">
              {reviewDue} words ready · 3 min
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </Link>

        {/* Mini stats */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <StatTile label="Mastered" value={mastered} color="var(--bloxia)" />
          <StatTile label="Learning" value={learning} color="var(--wordie)" />
          <StatTile label="Due" value={reviewDue} color="var(--wordie-accent)" />
        </div>

        {/* Assigned pack */}
        <section className="mt-5">
          <SectionTitle action={<span className="text-[11px] font-bold text-[color:var(--wordie)]">View all</span>}>
            Assigned pack
          </SectionTitle>
          <Link
            to="/wordie-bank"
            className="block rounded-3xl bg-white border border-border p-4 active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Teacher pack · A2
                </p>
                <p className="font-bold text-[15px] mt-0.5">{pack.name}</p>
              </div>
              <span
                className="text-[12px] font-bold rounded-full px-2.5 py-1"
                style={{
                  background: "color-mix(in oklab, var(--wordie) 12%, white)",
                  color: "var(--wordie)",
                }}
              >
                {packPct}%
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar value={packPct} />
            </div>
            <p className="mt-2 text-[12px] text-muted-foreground">
              {pack.done} of {pack.total} words · {pack.total - pack.done} to go
            </p>
          </Link>
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

        {/* Bloxia hook */}
        <Link
          to="/bloxia"
          className="mt-5 flex items-center gap-3 rounded-3xl p-4 active:scale-[0.99] transition-transform"
          style={{
            background: "color-mix(in oklab, var(--bloxia) 12%, white)",
            border: "1px solid color-mix(in oklab, var(--bloxia) 22%, white)",
          }}
        >
          <div
            className="h-11 w-11 rounded-2xl grid place-items-center text-white shrink-0"
            style={{ background: "var(--bloxia)" }}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[14px]">80 words to next Bloxia unlock</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Master more words to grow your pixel world.
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </Link>
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