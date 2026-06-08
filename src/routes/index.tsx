import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { BpPill, StreakPill } from "@/components/app/Pills";
import paisleyLogo from "@/assets/brand/Paisley_EC.png";
import iconShirin from "@/assets/brand/icon-ShirinTalk.png";
import iconWordie from "@/assets/brand/icon-myWordie.png";
import iconBloxia from "@/assets/brand/icon-Bloxia.png";
import { ChevronRight, GraduationCap, Info } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paisley EC — English for Kids" },
      { name: "description", content: "ShirinTalk, myWordie and Bloxia — a playful English learning world for 7–12 year-olds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PhoneFrame>
      {/* Brand bar */}
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <img src={paisleyLogo} alt="Paisley EC" className="h-8 w-auto" />
        <div className="flex items-center gap-2">
          <StreakPill days={7} />
          <BpPill value={1240} />
        </div>
      </div>

      {/* Hero */}
      <section className="mx-5 mt-3 rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--paisley) 0%, oklch(0.55 0.18 255) 100%)" }}>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute right-10 bottom-2 h-16 w-16 rounded-full bg-[color:var(--sand)]/40" />
        <p className="text-sm/5 opacity-90 font-semibold">Hi there, learner</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">
          Ready for today's<br />English adventure?
        </h1>
        <Link
          to="/shirin-talk"
          className="mt-4 inline-flex items-center gap-1 rounded-full bg-white text-[color:var(--paisley)] px-4 py-2 text-sm font-bold shadow-sm"
        >
          Start with Shirin <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Three big module tiles */}
      <section className="px-5 mt-6 space-y-3">
        <ModuleTile
          to="/shirin-talk"
          title="ShirinTalk"
          subtitle="Chat with your AI English buddy"
          icon={iconShirin}
          color="var(--shirin)"
          soft="var(--shirin-soft)"
        />
        <ModuleTile
          to="/mywordie"
          title="myWordie"
          subtitle="Learn new words today"
          icon={iconWordie}
          color="var(--wordie)"
          soft="var(--wordie-soft)"
          badge="12 cards"
        />
        <ModuleTile
          to="/bloxia"
          title="Bloxia"
          subtitle="Build your pixel island"
          icon={iconBloxia}
          color="var(--bloxia)"
          soft="var(--bloxia-soft)"
          badge="+240 Bp"
        />
      </section>

      {/* Secondary entries */}
      <section className="px-5 mt-5 grid grid-cols-2 gap-3">
        <Link to="/cefr-test" className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)", color: "var(--paisley)" }}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">CEFR Test</p>
            <p className="text-[11px] text-muted-foreground">Level check</p>
          </div>
        </Link>
        <Link to="/about" className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "color-mix(in oklab, var(--sand) 30%, white)", color: "oklch(0.45 0.05 70)" }}>
            <Info className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">About PEC</p>
            <p className="text-[11px] text-muted-foreground">Our story</p>
          </div>
        </Link>
      </section>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function ModuleTile({
  to,
  title,
  subtitle,
  icon,
  color,
  soft,
  badge,
}: {
  to: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  soft: string;
  badge?: string;
}) {
  return (
    <Link
      to={to}
      className="relative block rounded-3xl p-4 border border-border overflow-hidden active:scale-[0.99] transition-transform"
      style={{ background: `linear-gradient(135deg, ${soft} 0%, white 70%)` }}
    >
      <div className="flex items-center gap-4">
        <img src={icon} alt="" className="h-14 w-14 rounded-2xl shadow-sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold" style={{ color }}>{title}</h3>
            {badge && (
              <span className="text-[10px] font-bold rounded-full px-2 py-0.5"
                style={{ background: color, color: "white" }}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  );
}
