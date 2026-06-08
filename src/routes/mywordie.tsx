import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import { BpPill, StreakPill } from "@/components/app/Pills";
import logo from "@/assets/brand/myWordie.png";
import { Layers, PlusCircle, ClipboardCheck, Play } from "lucide-react";

export const Route = createFileRoute("/mywordie")({
  head: () => ({ meta: [{ title: "myWordie — Paisley EC" }] }),
  component: MyWordiePage,
});

function MyWordiePage() {
  const done = 6;
  const total = 12;
  const pct = Math.round((done / total) * 100);

  return (
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      <AppHeader title={<img src={logo} alt="myWordie" className="h-6 mx-auto" />} />

      {/* Today's practice card */}
      <section className="mx-5 mt-2 rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--wordie), oklch(0.48 0.22 273))" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Today's Practice</p>
            <h2
              className="mt-1 text-[28px] leading-[1.2] font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            >
              {done} of {total} words
            </h2>
          </div>
          <div className="h-16 w-16 rounded-full grid place-items-center text-sm font-bold"
            style={{ background: "color-mix(in oklab, var(--wordie-accent) 60%, white)", color: "var(--wordie)" }}>
            {pct}%
          </div>
        </div>
        <div className="mt-4 h-2.5 rounded-full bg-white/25 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--wordie-accent)" }} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <StreakPill days={7} />
          <BpPill value={1240} />
        </div>

        <Link to="/word-card"
          className="mt-5 relative isolate flex items-center justify-center gap-[8px] w-full rounded-full bg-white text-[color:var(--wordie)] py-4 font-bold shadow-lg active:scale-[0.98] transition-transform"
          style={{ fontFamily: "var(--font-sans)", fontSize: "17.25px" }}>
          <Play className="shrink-0 fill-current" style={{ width: "1.15em", height: "1.15em" }} />
          <span className="leading-none">Start Word Card</span>
        </Link>
      </section>

      {/* Tools */}
      <section className="px-5 mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tools</p>
        <div className="grid grid-cols-3 gap-3">
          <ToolCard to="/wordie-bank" label="Wordie Bank" icon={<Layers />} tint="var(--paisley)" />
          <ToolCard to="/wordie-x" label="Wordie‑X" icon={<PlusCircle />} tint="var(--wordie-accent)" />
          <ToolCard to="/wordie-test" label="Wordie Test" icon={<ClipboardCheck />} tint="var(--shirin)" />
        </div>
      </section>

      {/* Recent words */}
      <section className="px-5 mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Recent words</p>
        <div className="rounded-2xl bg-white border border-border divide-y divide-border">
          {[
            { w: "garden", t: "noun", l: "A2" },
            { w: "whisper", t: "verb", l: "B1" },
            { w: "curious", t: "adj", l: "B1" },
          ].map((row) => (
            <div key={row.w} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-bold text-sm">{row.w}</p>
                <p className="text-[11px] text-muted-foreground">{row.t}</p>
              </div>
              <span className="text-[10px] font-bold rounded-full px-2 py-0.5"
                style={{ background: "color-mix(in oklab, var(--wordie) 12%, white)", color: "var(--wordie)" }}>
                {row.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function ToolCard({ to, label, icon, tint }: { to: string; label: string; icon: React.ReactNode; tint: string }) {
  return (
    <Link to={to} className="rounded-2xl bg-white border border-border p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
      <div className="h-10 w-10 rounded-xl grid place-items-center text-white" style={{ background: tint }}>
        {icon}
      </div>
      <span className="text-[11px] font-bold text-center leading-tight">{label}</span>
    </Link>
  );
}