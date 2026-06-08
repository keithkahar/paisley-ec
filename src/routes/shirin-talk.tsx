import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import { BpPill, StreakPill } from "@/components/app/Pills";
import logo from "@/assets/brand/ShirinTalk.png";
import icon from "@/assets/brand/icon-ShirinTalk.png";
import { Mic, BookOpen, MessagesSquare, Sparkles } from "lucide-react";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [{ title: "ShirinTalk — Paisley EC" }] }),
  component: ShirinTalkPage,
});

function ShirinTalkPage() {
  return (
    <PhoneFrame bg="bg-[color:var(--shirin-soft)]">
      <AppHeader title={<img src={logo} alt="ShirinTalk" className="h-6 mx-auto" />} />

      {/* Shirin hero */}
      <section className="px-5 pt-2 pb-6 text-center">
        <div className="mx-auto h-32 w-32 rounded-[2rem] grid place-items-center shadow-xl"
          style={{ background: "linear-gradient(135deg, var(--shirin), oklch(0.78 0.18 20))" }}>
          <img src={icon} alt="" className="h-24 w-24" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-[color:var(--shirin)]">Hi, I'm Shirin!</h2>
        <p className="text-sm text-foreground/70 mt-1">Let's practise English together.</p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <StreakPill days={7} />
          <BpPill value={1240} />
        </div>

        <Link
          to="/chat"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-white font-bold text-base shadow-lg w-[80%]"
          style={{ background: "var(--shirin)" }}
        >
          <Mic className="h-5 w-5" /> Start ShirinTalk
        </Link>
      </section>

      {/* Practice modes */}
      <section className="px-5 space-y-3">
        <PracticeCard
          to="/smart-reading"
          title="Smart Reading Talk"
          subtitle="Read a story, then chat about it"
          icon={<BookOpen className="h-5 w-5" />}
          tint="oklch(0.75 0.16 35)"
        />
        <PracticeCard
          to="/mywordie"
          title="myWordie Talk"
          subtitle="Practise today's words with Shirin"
          icon={<Sparkles className="h-5 w-5" />}
          tint="var(--wordie)"
        />
        <PracticeCard
          to="/topics"
          title="Topic Talk"
          subtitle="Pick a topic — school, hobbies, stories"
          icon={<MessagesSquare className="h-5 w-5" />}
          tint="var(--paisley)"
        />
      </section>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function PracticeCard({
  to, title, subtitle, icon, tint,
}: { to: string; title: string; subtitle: string; icon: React.ReactNode; tint: string }) {
  return (
    <Link to={to} className="block rounded-2xl bg-white border border-border p-4 flex items-center gap-3 active:scale-[0.99]">
      <div className="h-11 w-11 rounded-xl grid place-items-center text-white" style={{ background: tint }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </Link>
  );
}