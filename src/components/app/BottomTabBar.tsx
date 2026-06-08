import { Link, useRouterState } from "@tanstack/react-router";
import iconShirin from "@/assets/brand/icon-ShirinTalk.png";
import iconWordie from "@/assets/brand/icon-myWordie.png";
import iconBloxia from "@/assets/brand/icon-Bloxia.png";
import iconProfile from "@/assets/brand/icon-Profile.png";
import iconPaisley from "@/assets/brand/Logo-A-.png";

const tabs = [
  { to: "/", label: "Home", icon: iconPaisley, color: "var(--paisley)" },
  { to: "/shirin-talk", label: "ShirinTalk", icon: iconShirin, color: "var(--shirin)" },
  { to: "/mywordie", label: "myWordie", icon: iconWordie, color: "var(--wordie)" },
  { to: "/bloxia", label: "Bloxia", icon: iconBloxia, color: "var(--bloxia)" },
  { to: "/profile", label: "Me", icon: iconProfile, color: "var(--paisley)" },
] as const;

export function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* spacer so content isn't hidden under the bar */}
      <div className="h-24" aria-hidden />
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 px-3 pb-3">
        <div className="rounded-3xl bg-white/95 backdrop-blur border border-border shadow-[0_10px_30px_-10px_rgba(1,70,185,0.25)] px-2 py-2 flex items-center justify-between">
          {tabs.map((t) => {
            const active =
              t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-all"
                style={
                  active
                    ? { background: `color-mix(in oklab, ${t.color} 12%, transparent)` }
                    : undefined
                }
              >
                <img
                  src={t.icon}
                  alt=""
                  className={`h-7 w-7 rounded-lg transition-transform ${active ? "scale-110" : "opacity-75"}`}
                />
                <span
                  className="text-[10px] font-bold tracking-wide"
                  style={{ color: active ? t.color : "var(--muted-foreground)" }}
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