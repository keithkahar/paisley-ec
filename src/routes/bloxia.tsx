import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import { BpPill } from "@/components/app/Pills";
import logo from "@/assets/brand/Bloxia.png";
import { Hammer, Sprout, PawPrint, Gift } from "lucide-react";

export const Route = createFileRoute("/bloxia")({
  head: () => ({ meta: [{ title: "Bloxia — Paisley EC" }] }),
  component: BloxiaPage,
});

/**
 * Soft pastoral island, mostly pixel‑aesthetic but kept friendly for 7–12.
 * The island is built from CSS so it renders crisp at any size.
 */
function BloxiaPage() {
  return (
    <PhoneFrame bg="bg-[color:var(--bloxia-sky)]">
      <AppHeader
        title={<img src={logo} alt="Bloxia" className="h-6 mx-auto" />}
        right={<BpPill value={1240} />}
      />

      {/* Resource bar */}
      <div className="px-5 -mt-1 flex items-center gap-2">
        <ResourceChip label="Seeds" value={18} color="var(--bloxia)" />
        <ResourceChip label="Wood" value={6} color="oklch(0.55 0.08 60)" />
        <ResourceChip label="Stars" value={3} color="var(--wordie-accent)" />
      </div>

      {/* Island canvas */}
      <section className="relative mx-4 mt-4 rounded-[2rem] overflow-hidden border-2 border-white/70 shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.92 0.06 220) 0%, oklch(0.88 0.07 215) 60%, oklch(0.82 0.08 215) 100%)",
          height: 320,
        }}>
        {/* clouds */}
        <div className="absolute top-4 left-6 w-16 h-4 bg-white/80 rounded-full" />
        <div className="absolute top-10 right-8 w-20 h-5 bg-white/70 rounded-full" />
        {/* sun */}
        <div className="absolute top-4 right-6 h-12 w-12 rounded-full" style={{ background: "var(--wordie-accent)", boxShadow: "0 0 30px var(--wordie-accent)" }} />
        {/* island */}
        <Island />
        {/* floating Bp */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[color:var(--bloxia-deep)] shadow">
          Welcome back, builder!
        </div>
      </section>

      {/* Action grid */}
      <section className="px-5 mt-5 grid grid-cols-2 gap-3">
        <ActionCard label="Build" sub="Place a block" icon={<Hammer />} tint="var(--bloxia)" />
        <ActionCard label="Plant" sub="Grow a flower" icon={<Sprout />} tint="oklch(0.7 0.18 145)" />
        <ActionCard label="Pets" sub="Feed your pal" icon={<PawPrint />} tint="var(--wordie-accent)" />
        <ActionCard label="Rewards" sub="Open today's gift" icon={<Gift />} tint="var(--shirin)" />
      </section>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function ResourceChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex-1 rounded-2xl bg-white/90 border border-border px-3 py-2 flex items-center justify-between">
      <span className="text-[11px] font-bold text-muted-foreground">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

function ActionCard({ label, sub, icon, tint }: { label: string; sub: string; icon: React.ReactNode; tint: string }) {
  return (
    <button className="rounded-2xl bg-white border border-border p-4 flex flex-col items-start gap-2 active:scale-[0.98] text-left">
      <div className="h-10 w-10 rounded-xl grid place-items-center text-white" style={{ background: tint }}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: tint }}>{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </button>
  );
}

/**
 * Pixel-styled floating island, drawn with stacked blocks.
 */
function Island() {
  const cell = 14;
  // simple shape: a wider top, narrower bottom (island silhouette)
  const rows = [
    { w: 16, color: "var(--bloxia)" },          // grass top
    { w: 18, color: "oklch(0.62 0.18 138)" },   // grass underbelly
    { w: 16, color: "oklch(0.45 0.1 60)" },     // dirt
    { w: 12, color: "oklch(0.4 0.09 60)" },
    { w: 8,  color: "oklch(0.35 0.08 60)" },
    { w: 4,  color: "oklch(0.32 0.08 60)" },
  ];
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* decorations on top */}
      <div className="relative mb-[-2px] flex items-end gap-1">
        {/* tree */}
        <div className="flex flex-col items-center">
          <div className="h-3 w-3" style={{ background: "var(--bloxia-deep)" }} />
          <div className="h-3 w-7" style={{ background: "var(--bloxia)" }} />
          <div className="h-3 w-5" style={{ background: "var(--bloxia)" }} />
          <div className="h-2 w-1.5" style={{ background: "oklch(0.4 0.08 60)" }} />
        </div>
        {/* hut */}
        <div className="flex flex-col items-center">
          <div className="h-2 w-8" style={{ background: "var(--shirin)" }} />
          <div className="h-6 w-10" style={{ background: "oklch(0.85 0.06 70)" }}>
            <div className="mx-auto mt-1 h-2 w-2" style={{ background: "var(--bloxia-deep)" }} />
          </div>
        </div>
        {/* flower */}
        <div className="flex flex-col items-center">
          <div className="h-2 w-2 rounded-full" style={{ background: "var(--wordie-accent)" }} />
          <div className="h-3 w-0.5" style={{ background: "var(--bloxia-deep)" }} />
        </div>
      </div>

      {/* island stack */}
      {rows.map((r, i) => (
        <div key={i} className="flex" style={{ marginTop: i === 0 ? 0 : -1 }}>
          {Array.from({ length: r.w }).map((_, j) => (
            <div key={j} style={{ width: cell, height: cell, background: r.color, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.08)" }} />
          ))}
        </div>
      ))}
    </div>
  );
}