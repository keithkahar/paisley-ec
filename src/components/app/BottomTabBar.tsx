import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, BookOpen, Box, User } from "lucide-react";
import iconShirin from "@/assets/brand/icon-ShirinTalk.png";
import iconWordie from "@/assets/brand/icon-myWordie.png";
import iconBloxia from "@/assets/brand/icon-Bloxia.png";
import iconProfile from "@/assets/brand/icon-Profile.png";

const tabs = [
  { to: "/shirin-talk", label: "ShirinTalk", icon: iconShirin, Outline: MessageCircle, color: "var(--shirin)" },
  { to: "/mywordie", label: "myWordie", icon: iconWordie, Outline: BookOpen, color: "var(--wordie)" },
  { to: "/bloxia", label: "Bloxia", icon: iconBloxia, Outline: Box, color: "var(--bloxia)" },
  { to: "/profile", label: "Me", icon: iconProfile, Outline: User, color: "var(--paisley)" },
] as const;

export function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* spacer so content isn't hidden under the bar */}
      <div className="h-20" aria-hidden />
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 px-4 pb-4">
        <div className="rounded-full bg-white/95 backdrop-blur border border-border shadow-[0_10px_30px_-10px_rgba(1,70,185,0.25)] px-3 py-2 flex items-center justify-between">
          {tabs.map((t) => {
            const active = pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all"
                style={
                  active
                    ? { background: `color-mix(in oklab, ${t.color} 12%, transparent)` }
                    : undefined
                }
              >
                {active ? (
                  <img src={t.icon} alt="" className="h-7 w-7 rounded-lg scale-110 transition-transform" />
                ) : (
                  <t.Outline className="h-6 w-6" strokeWidth={1.8} style={{ color: "#111" }} />
                )}
                <span
                  className="text-[10px] font-bold tracking-wide"
                  style={{ color: active ? t.color : "#111" }}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}