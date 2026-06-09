import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { AppHeader } from "@/components/app/AppHeader";
import {
  TrendingUp,
  ClipboardList,
  UserCog,
  Users,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Paisley EC" }] }),
  component: ProfilePage,
});

// ---- mock data (mirrors WeChat utils/profile.js + profileLearningSummary.js) ----
const PROFILE = {
  avatarPath: "" as string,
  givenName: "Lily",
  familyName: "Wang",
  age: 9,
  cefr: "A2",
};
const DISPLAY_NAME = `${PROFILE.givenName} ${PROFILE.familyName}`.trim() || "Paisley Learner";
const INITIALS = ((PROFILE.givenName[0] ?? "") + (PROFILE.familyName[0] ?? "")).toUpperCase() || "PL";

const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
// today index in this mocked week
const TODAY_IDX = 3;
const WEEK_DAYS = [
  { day: 2,  hasTalk: true,  hasWordie: false },
  { day: 3,  hasTalk: false, hasWordie: true  },
  { day: 4,  hasTalk: true,  hasWordie: true  },
  { day: 5,  hasTalk: true,  hasWordie: true  }, // today + selected
  { day: 6,  hasTalk: false, hasWordie: false },
  { day: 7,  hasTalk: false, hasWordie: false },
  { day: 8,  hasTalk: false, hasWordie: false },
].map((d, i) => ({
  ...d,
  label: WEEK_LABELS[i],
  isToday: i === TODAY_IDX,
  isSelected: i === TODAY_IDX,
}));

const MENU: Array<{
  key: string;
  title: string;
  subtitle: string;
  to: string;
  icon: ReactNode;
  tint: string;
}> = [
  { key: "progress", title: "My Progress", subtitle: "Streak, words & weekly activity", to: "/progress",     icon: <TrendingUp className="h-5 w-5" />,     tint: "var(--paisley)" },
  { key: "cefr",     title: "My Tests",    subtitle: "CEFR Test & Wordie Test history",  to: "/my-tests",     icon: <ClipboardList className="h-5 w-5" />,  tint: "var(--paisley-yellow)" },
  { key: "edit",     title: "Edit Profile",subtitle: "Avatar, name, birthday, gender",   to: "/edit-profile", icon: <UserCog className="h-5 w-5" />,        tint: "var(--paisley)" },
  { key: "parent",   title: "Parent Page", subtitle: "Manage learning & settings",       to: "/parent",       icon: <Users className="h-5 w-5" />,          tint: "var(--paisley-yellow)" },
];

function ProfilePage() {
  return (
    <PhoneFrame bg="bg-[color:var(--sand-soft)]">
      <AppHeader title="My Profile" back={false} />

      {/* Hero */}
      <ProfileHero />

      {/* Week strip */}
      <WeekStrip />

      {/* Action cards */}
      <section className="px-5 mt-5 space-y-3">
        {MENU.map((m) => (
          <ActionCard key={m.key} {...m} />
        ))}
      </section>

      {/* Version (hidden admin entry) */}
      <VersionTap />

      <BottomTabBar />
    </PhoneFrame>
  );
}

function ProfileHero() {
  return (
    <section
      className="relative mx-5 mt-2 rounded-[28px] px-6 pt-7 pb-6 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--paisley) 0%, oklch(0.55 0.20 258) 60%, oklch(0.62 0.18 250) 100%)",
      }}
    >
      {/* decorative orbs */}
      <span
        className="absolute -top-10 -right-8 h-36 w-36 rounded-full opacity-30"
        style={{ background: "var(--paisley-yellow)", filter: "blur(2px)" }}
        aria-hidden
      />
      <span
        className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full opacity-20"
        style={{ background: "#ffffff", filter: "blur(2px)" }}
        aria-hidden
      />

      <div className="relative flex flex-col items-center text-center">
        <div
          className="h-24 w-24 rounded-full grid place-items-center text-[34px] font-bold tracking-tight"
          style={{
            background: "rgba(255,255,255,0.16)",
            border: "2px solid rgba(255,255,255,0.55)",
            color: "white",
            fontFamily: "var(--font-sans)",
          }}
        >
          {PROFILE.avatarPath ? (
            <img src={PROFILE.avatarPath} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            INITIALS
          )}
        </div>

        <h2
          className="mt-4 text-[26px] leading-none font-bold"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
        >
          {DISPLAY_NAME}
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
          >
            Age {PROFILE.age}
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: "var(--paisley-yellow)", color: "oklch(0.32 0.10 90)" }}
          >
            CEFR {PROFILE.cefr}
          </span>
        </div>
      </div>
    </section>
  );
}

function WeekStrip() {
  const navigate = useNavigate();
  return (
    <section className="px-5 mt-4">
      <button
        type="button"
        onClick={() => navigate({ to: "/calendar" })}
        className="w-full rounded-3xl bg-white border border-border p-4 active:scale-[0.99] transition-transform text-left"
      >
        <div className="grid grid-cols-7 gap-1.5">
          {WEEK_DAYS.map((d, i) => {
            const selected = d.isSelected;
            return (
              <div
                key={i}
                className="rounded-2xl flex flex-col items-center py-2 gap-1"
                style={
                  selected
                    ? { background: "var(--paisley)", color: "white" }
                    : d.isToday
                    ? { background: "var(--paisley-yellow-soft)", color: "var(--foreground)" }
                    : { color: "var(--foreground)" }
                }
              >
                <span
                  className="text-[10px] font-bold opacity-80"
                  style={{ color: selected ? "rgba(255,255,255,0.85)" : "var(--muted-foreground)" }}
                >
                  {d.label}
                </span>
                <span className="text-[15px] font-bold leading-none">{d.day}</span>
                <span className="h-1.5 flex items-center gap-0.5">
                  {d.hasTalk && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: selected ? "white" : "var(--shirin)" }}
                      aria-label="ShirinTalk"
                    />
                  )}
                  {d.hasWordie && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: selected ? "var(--paisley-yellow)" : "var(--wordie)" }}
                      aria-label="myWordie"
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Tap the week strip to open the full month calendar.
        </p>
      </button>
    </section>
  );
}

function ActionCard({
  to,
  title,
  subtitle,
  icon,
  tint,
}: {
  to: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  tint: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl bg-white border border-border px-4 py-3.5 active:scale-[0.99] transition-transform"
    >
      <div
        className="h-11 w-11 rounded-2xl grid place-items-center shrink-0"
        style={{
          background: `color-mix(in oklab, ${tint} 18%, white)`,
          color: tint,
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[15px] leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

function VersionTap() {
  const navigate = useNavigate();
  const taps = useRef<number[]>([]);
  const [flash, setFlash] = useState(false);

  function onTap() {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 1500), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
        navigate({ to: "/about" }); // admin-console placeholder
      }, 400);
    }
  }

  return (
    <div className="mt-6 mb-2 flex justify-center">
      <button
        type="button"
        onClick={onTap}
        className="text-[11px] font-semibold tracking-wide"
        style={{ color: flash ? "var(--paisley)" : "var(--muted-foreground)" }}
      >
        Version 1.0.0
      </button>
    </div>
  );
}