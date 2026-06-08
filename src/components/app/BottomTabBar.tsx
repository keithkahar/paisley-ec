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
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 px-7 pb-4">
        <div className="relative h-14 rounded-full bg-white/95 backdrop-blur border border-border shadow-[0_10px_30px_-10px_rgba(1,70,185,0.25)] flex items-stretch">
          {tabs.map((t, i) => {
            const active = pathname.startsWith(t.to);
            const isFirst = i === 0;
            const isLast = i === tabs.length - 1;
            return (
              <Link
                key={t.to}
                to={t.to}
                aria-label={t.label}
                className="relative flex-1 flex items-center justify-center"
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 aspect-square rounded-full"
                    style={{
                      background: `color-mix(in oklab, ${t.color} 14%, white)`,
                      left: isFirst ? 0 : isLast ? "auto" : "50%",
                      right: isLast ? 0 : "auto",
                      transform: !isFirst && !isLast ? "translateX(-50%)" : undefined,
                    }}
                  />
                )}
                <img
                  src={active ? t.filled : t.outline}
                  alt=""
                  className="relative z-10 h-9 w-9 object-contain"
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}