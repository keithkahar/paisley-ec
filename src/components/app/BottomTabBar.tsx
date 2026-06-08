import { Link, useRouterState } from "@tanstack/react-router";
import shirinFilled from "@/assets/tabs/shirin-filled.png.asset.json";
import shirinOutline from "@/assets/tabs/shirin-outline.png.asset.json";
import wordieFilled from "@/assets/tabs/wordie-filled.png.asset.json";
import wordieOutline from "@/assets/tabs/wordie-outline.png.asset.json";
import bloxiaFilled from "@/assets/tabs/bloxia-filled.png.asset.json";
import bloxiaOutline from "@/assets/tabs/bloxia-outline.png.asset.json";
import profileFilled from "@/assets/tabs/profile-filled.png.asset.json";
import profileOutline from "@/assets/tabs/profile-outline.png.asset.json";

const tabs = [
  { to: "/shirin-talk", label: "ShirinTalk", filled: shirinFilled.url, outline: shirinOutline.url, color: "var(--shirin)" },
  { to: "/mywordie", label: "myWordie", filled: wordieFilled.url, outline: wordieOutline.url, color: "var(--wordie)" },
  { to: "/bloxia", label: "Bloxia", filled: bloxiaFilled.url, outline: bloxiaOutline.url, color: "var(--bloxia)" },
  { to: "/profile", label: "Me", filled: profileFilled.url, outline: profileOutline.url, color: "var(--paisley)" },
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
                <img
                  src={active ? t.filled : t.outline}
                  alt=""
                  className={`h-7 w-7 object-contain transition-transform ${active ? "scale-110" : ""}`}
                />
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