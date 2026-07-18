import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import pecFromLogo from "@/assets/brand/pec-from-logo.png.asset.json";
import { useState, useEffect } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { FloatingBack } from "@/components/app/FloatingBack";
import { ParentPinSheet, PARENT_UNLOCK_FLAG } from "@/components/app/ParentPinSheet";
import {
  MonthCalendarDialog,
  mockActivity,
} from "@/components/app/MonthCalendarDialog";
import {
  TrendingUp,
  ClipboardList,
  Users,
  Pencil,
  ChevronRight,
} from "lucide-react";
import paizleyIcon from "@/assets/paizley-icon.png.asset.json";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
      { title: "My Profile — Paisley EC" },
      { name: "description", content: "Track your streak, progress and tests in one place." },
      { property: "og:title", content: "My Profile — Paisley EC" },
      { property: "og:description", content: "Track your streak, progress and tests in one place." },
    ] }),
  component: ProfilePage,
});

// ---- mock profile data ----
const DEFAULT_PROFILE = {
  avatarPath:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniella&backgroundColor=ffd5dc,c0aede,b6e3f4&radius=50",
  givenName: "Daniella",
  familyName: "Wang",
  age: 9,
  cefr: "A2",
  registeredAt: new Date("2025-03-14"),
};

const PAISLEY = "var(--paisley)";
const PAISLEY_YELLOW = "var(--paisley-yellow)";
const PAISLEY_YELLOW_SOFT = "var(--paisley-yellow-soft)";

function ProfilePage() {
  const [calOpen, setCalOpen] = useState(false);
  const [parentPinOpen, setParentPinOpen] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50, scale: 1 });
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("my_profile_v1");
      if (!raw) return;
      const s = JSON.parse(raw);
      setProfile((p) => ({
        ...p,
        avatarPath: typeof s.avatarPath === "string" && s.avatarPath ? s.avatarPath : p.avatarPath,
        givenName: typeof s.givenName === "string" && s.givenName.trim() ? s.givenName.trim() : p.givenName,
        familyName: typeof s.familyName === "string" && s.familyName.trim() ? s.familyName.trim() : p.familyName,
      }));
      setAvatarPos({
        x: typeof s.avatarPosX === "number" ? s.avatarPosX : 50,
        y: typeof s.avatarPosY === "number" ? s.avatarPosY : 50,
        scale: typeof s.avatarScale === "number" ? s.avatarScale : 1,
      });
    } catch { /* ignore */ }
  }, []);
  const DISPLAY_NAME = `${profile.givenName} ${profile.familyName}`.trim();
  const INITIALS = ((profile.givenName[0] ?? "") + (profile.familyName[0] ?? "")).toUpperCase();
  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  // mocked practice days within this week (day-of-week index 0=Sun..6=Sat)
  const talkDays = new Set([1, 2, 3, today.getDay()]);
  const wordieDays = new Set([2, 3, today.getDay()]);

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white">
        <FloatingBack to="/" />

        {/* Hero — mirrors ShirinTalk hero shape */}
        <section className="px-6 pt-[65px] pb-1 text-center">
          <div className="relative mx-auto h-40 w-40">
            <div
              className="h-40 w-40 rounded-full grid place-items-center overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)" }}
            >
              {profile.avatarPath ? (
                <img
                  src={profile.avatarPath}
                  alt={DISPLAY_NAME}
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: `${avatarPos.x}% ${avatarPos.y}%`,
                    transform: `scale(${avatarPos.scale})`,
                    transformOrigin: `${avatarPos.x}% ${avatarPos.y}%`,
                  }}
                />
              ) : (
                <span
                  className="text-[56px] font-medium leading-none"
                  style={{ color: PAISLEY, letterSpacing: "-0.02em" }}
                >
                  {INITIALS}
                </span>
              )}
            </div>
            {/* Edit profile entry — small badge tucked at avatar's upper-left */}
            <Link
              to="/edit-profile"
              aria-label="Edit profile"
              className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
            >
              <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: "var(--muted-foreground)" }} />
            </Link>
          </div>
          <h2
            className="mt-2 text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PAISLEY, letterSpacing: "-0.01em" }}
          >
            {DISPLAY_NAME}
          </h2>
          {/* Registration date — mirrors ShirinTalk subtitle position */}
          <p
            className="mt-1 text-[13px] leading-none font-semibold"
            style={{ color: PAISLEY_YELLOW }}
          >
            Since {profile.registeredAt.toLocaleString("en-US", { month: "short" })} {profile.registeredAt.getDate()} {profile.registeredAt.getFullYear()}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              Age {profile.age}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              {profile.cefr}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              318 min
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              1,011 Bp
            </span>
          </div>
        </section>

        {/* Week calendar — matches ShirinTalk/myWordie pattern, with practice dots */}
        <section className="px-6 pt-3">
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="w-full flex items-center justify-between active:scale-[0.99] transition-transform"
            aria-label="Open monthly profile calendar"
          >
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              const dow = d.getDay();
              const hasTalk = talkDays.has(dow);
              const hasWordie = wordieDays.has(dow);
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}
                  >
                    {dayLabels[i]}
                  </span>
                  <span
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-semibold"
                    style={
                      isToday
                        ? { color: PAISLEY, border: `1.5px solid ${PAISLEY}` }
                        : { color: "var(--foreground)" }
                    }
                  >
                    {d.getDate()}
                  </span>
                  <span className="h-1.5 flex items-center gap-0.5">
                    {hasTalk && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--shirin)" }}
                        aria-label="ShirinTalk"
                      />
                    )}
                    {hasWordie && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--wordie)" }}
                        aria-label="myWordie"
                      />
                    )}
                  </span>
                </div>
              );
            })}
          </button>
        </section>

        {/* Pill actions — mirrors ShirinTalk pill style */}
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          <PillLink to="/progress" title="My Progress" Icon={TrendingUp} />
          <PillLink to="/my-tests" title="My Tests" Icon={ClipboardList} />
          <PillLink title="Parent Page" Icon={Users} onClick={() => setParentPinOpen(true)} />
          <PillLink to="/about" title="Paizley EC" Icon={PaisleyIcon} />
        </section>

      </div>

      <BottomTabBar />
      <ParentPinSheet
        open={parentPinOpen}
        onClose={() => setParentPinOpen(false)}
        onUnlock={() => {
          try { sessionStorage.setItem(PARENT_UNLOCK_FLAG, "1"); } catch {}
          setParentPinOpen(false);
          navigate({ to: "/parent" });
        }}
      />
      <MonthCalendarDialog
        open={calOpen}
        onOpenChange={setCalOpen}
        title="ShirinTalk / myWordie · Monthly"
        color="var(--paisley)"
        talkColor="var(--shirin)"
        wordieColor="var(--wordie)"
        getActivity={(d) => ({
          talk: mockActivity(d, 1),
          wordie: mockActivity(d, 2),
        })}
        variant="dots"
        presentation="sheet"
      />
    </PhoneFrame>
  );
}

function PillLink({
  to,
  title,
  Icon,
  outlined,
  onClick,
}: {
  to?: string;
  title: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  outlined?: boolean;
  onClick?: () => void;
}) {
  const bg = "color-mix(in oklab, var(--paisley) 12%, white)";
  const className = "relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform text-left";
  const style =
        outlined
          ? { background: "white", border: `1.5px solid ${bg}` }
          : { background: bg };
  const inner = (
    <>
      <span
        className="h-7 w-7 shrink-0 grid place-items-center rounded-full"
        style={{ background: outlined ? bg : "white" }}
      >
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: PAISLEY }} />
      </span>
      <span
        className="text-[17px] font-semibold tracking-tight leading-none"
        style={{ letterSpacing: "-0.01em", color: PAISLEY }}
      >
        {title}
      </span>
      <ChevronRight className="ml-auto h-5 w-5 shrink-0" strokeWidth={2.25} style={{ color: "white" }} />
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} style={style}>
        {inner}
      </button>
    );
  }
  return (
    <Link to={to!} className={className} style={style}>
      {inner}
    </Link>
  );
}

function PaisleyIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const color = style?.color ?? PAISLEY;
  const spanStyle: React.CSSProperties = {
    color,
    backgroundColor: color,
    maskImage: `url(${paizleyIcon.url})`,
    WebkitMaskImage: `url(${paizleyIcon.url})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    filter: `drop-shadow(0 0 1.5px ${color}) drop-shadow(0 0 1.5px ${color}) drop-shadow(0 0 1.5px ${color})`,
  };
  return (
    <span
      className={className}
      style={spanStyle}
      aria-hidden="true"
    />
  );
}
