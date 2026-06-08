import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import { BpPill, StreakPill } from "@/components/app/Pills";
import { TrendingUp, ClipboardList, CalendarDays, Pencil, ShieldCheck, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Paisley EC" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <PhoneFrame bg="bg-[color:var(--sand-soft)]">
      <AppHeader title="My Profile" back={false} right={<Link to="/edit-profile" className="text-xs font-bold text-[color:var(--paisley)]"><Pencil className="h-4 w-4" /></Link>} />

      {/* Identity card */}
      <section className="mx-5 mt-2 rounded-3xl p-5 text-white"
        style={{ background: "linear-gradient(135deg, var(--paisley), oklch(0.55 0.18 255))" }}>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/20 grid place-items-center text-2xl font-bold">L</div>
          <div>
            <h2 className="text-xl font-bold">Lily</h2>
            <p className="text-xs opacity-80">Age 9 · CEFR A2</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <StreakPill days={7} />
          <BpPill value={1240} />
        </div>
      </section>

      <section className="px-5 mt-5 grid grid-cols-3 gap-3">
        <Tile to="/progress" label="Progress" icon={<TrendingUp />} tint="var(--wordie)" />
        <Tile to="/my-tests" label="My Tests" icon={<ClipboardList />} tint="var(--shirin)" />
        <Tile to="/calendar" label="Calendar" icon={<CalendarDays />} tint="var(--bloxia)" />
      </section>

      <section className="px-5 mt-5 rounded-2xl bg-white border border-border divide-y divide-border">
        <Row to="/parent" icon={<ShieldCheck />} label="Parent Page" hint="Manage learning & settings" />
        <Row to="/about" icon={<ChevronRight />} label="About PEC" />
      </section>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function Tile({ to, label, icon, tint }: { to: string; label: string; icon: React.ReactNode; tint: string }) {
  return (
    <Link to={to} className="rounded-2xl bg-white border border-border p-3 flex flex-col items-center gap-1.5">
      <div className="h-10 w-10 rounded-xl grid place-items-center text-white" style={{ background: tint }}>{icon}</div>
      <span className="text-[11px] font-bold">{label}</span>
    </Link>
  );
}

function Row({ to, icon, label, hint }: { to: string; icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3.5">
      <div className="h-9 w-9 rounded-xl grid place-items-center bg-muted text-[color:var(--paisley)]">{icon}</div>
      <div className="flex-1">
        <p className="font-bold text-sm">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}