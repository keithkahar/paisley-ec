import { Link, useRouterState } from "@tanstack/react-router";
import shirinFilled from "@/assets/tabs/shirin-filled.png";
import shirinOutline from "@/assets/tabs/shirin-outline-medium.png.asset.json";
import wordieFilled from "@/assets/tabs/wordie-filled.png.asset.json";
import wordieOutline from "@/assets/tabs/wordie-outline.png.asset.json";
import bloxiaFilled from "@/assets/tabs/bloxia-filled-v3.png.asset.json";
import bloxiaOutline from "@/assets/tabs/bloxia-outline-medium.png.asset.json";
import profileFilled from "@/assets/tabs/profile-filled.png.asset.json";
import profileOutline from "@/assets/tabs/profile-outline.png.asset.json";

const tabs = [
  { to: "/shirin-talk", label: "ShirinTalk", filled: shirinFilled, outline: shirinOutline.url, color: "var(--shirin)" },
  { to: "/mywordie", label: "myWordie", filled: wordieFilled.url, outline: wordieOutline.url, color: "var(--wordie)" },
  { to: "/bloxia", label: "Bloxia", filled: bloxiaFilled.url, outline: bloxiaOutline.url, color: "var(--bloxia)" },
  { to: "/profile", label: "Me", filled: profileFilled.url, outline: profileOutline.url, color: "var(--paisley)" },
] as const;

export function BottomTabBar({ hidden = false }: { hidden?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* spacer so content isn't hidden under the bar */}
      <div
        className="h-24"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden
      />
      <nav
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 px-10 ${hidden ? "hidden" : ""}`}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div
          className="relative h-20 rounded-full bg-white border border-border flex items-stretch"
          style={{
            boxShadow:
              "0 -10px 30px -8px rgba(255,255,255,0.95), 0 12px 28px -10px rgba(0,0,0,0.15), 0 4px 10px -4px rgba(0,0,0,0.08)",
          }}
        >
          {tabs.map((t, i) => {
            const active = pathname === t.to || pathname.startsWith(t.to + "/");
            const isProfile = t.to === "/profile";
            const isFirst = i === 0;
            const isLast = i === tabs.length - 1;
            const anchor = isFirst
              ? "left-0"
              : isLast
              ? "right-0"
              : "left-1/2 -translate-x-1/2";
            return (
              <Link
                key={t.to}
                to={t.to}
                aria-label={t.label}
                className="relative flex-1"
              >
                <span
                  className={`absolute top-0 bottom-0 ${anchor} aspect-square rounded-full flex items-center justify-center`}
                  style={
                    active
                      ? { background: `color-mix(in oklab, ${t.color} 14%, white)` }
                      : undefined
                  }
                >
                  <img
                    src={active ? t.filled : t.outline}
                    alt=""
                    className={`relative z-10 object-contain ${isProfile ? "h-9 w-9" : "h-12 w-12"}`}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}