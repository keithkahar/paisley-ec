import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import {
  TrendingUp,
  ClipboardList,
  UserCog,
  Users,
  ChevronLeft,
  Pencil,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Paisley EC" }] }),
  component: ProfilePage,
});

// ---- mock profile data ----
const PROFILE = {
  avatarPath: "" as string,
  givenName: "Daniella",
  familyName: "Wang",
  age: 9,
  cefr: "A2",
};
const DISPLAY_NAME = `${PROFILE.givenName} ${PROFILE.familyName}`.trim();
const INITIALS = ((PROFILE.givenName[0] ?? "") + (PROFILE.familyName[0] ?? "")).toUpperCase();

const PAISLEY = "var(--paisley)";
// darker yellow ink for legible text/icons on yellow tints
const PAISLEY_YELLOW_INK = "oklch(0.48 0.14 88)";

function ProfilePage() {
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
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
        {/* Back button → home */}
        <div className="absolute top-4 left-4 z-30">
          <Link
            to="/"
            aria-label="Back to home"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[oklch(0.95_0.02_10)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Hero — mirrors ShirinTalk hero shape */}
        <section className="px-6 pt-12 pb-1 text-center">
          <div className="relative mx-auto h-40 w-40">
            <div
              className="h-40 w-40 rounded-full grid place-items-center overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)" }}
            >
              {PROFILE.avatarPath ? (
                <img src={PROFILE.avatarPath} alt="" className="h-full w-full object-cover" />
              ) : (
                <span
                  className="text-[56px] font-bold leading-none"
                  style={{ color: PAISLEY, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
                >
                  {INITIALS}
                </span>
              )}
            </div>
            {/* Edit profile entry — top-left of avatar */}
            <Link
              to="/edit-profile"
              aria-label="Edit profile"
              className="absolute top-1 left-1 h-9 w-9 grid place-items-center rounded-full bg-white active:scale-95 transition-transform"
              style={{
                border: `1px solid ${PAISLEY}`,
                boxShadow: "0 2px 6px -2px rgba(0,0,0,0.15)",
              }}
            >
              <Pencil className="h-4 w-4" strokeWidth={2.25} style={{ color: PAISLEY }} />
            </Link>
          </div>
          <h2
            className="mt-3 text-[26px] leading-[1.2] font-semibold tracking-tight"
            style={{ color: PAISLEY, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            {DISPLAY_NAME}
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              Age {PROFILE.age}
            </span>
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-bold bg-white"
              style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
            >
              CEFR {PROFILE.cefr}
            </span>
          </div>
        </section>

        {/* Week calendar — matches ShirinTalk/myWordie pattern, with practice dots */}
        <section className="px-6 pt-4">
          <div className="flex items-center justify-between">
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
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-bold"
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
          </div>
        </section>

        {/* Pill actions — mirrors ShirinTalk pill style */}
        <section className="px-6 pt-5 pb-10 flex-1 flex flex-col justify-end gap-3">
          <PillLink to="/progress" title="My Progress" Icon={TrendingUp} />
          <PillLink to="/my-tests" title="My Tests" Icon={ClipboardList} />
          <PillLink to="/edit-profile" title="Edit Profile" Icon={UserCog} />
          <PillLink to="/parent" title="Parent Page" Icon={Users} />
        </section>

        {/* Hidden admin entry */}
        <VersionTap />
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function PillLink({
  to,
  title,
  Icon,
}: {
  to: string;
  title: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
}) {
  return (
    <Link
      to={to}
      className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
      style={{ background: "color-mix(in oklab, var(--paisley-yellow) 32%, white)", fontFamily: "var(--font-sans)" }}
    >
      <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white">
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: PAISLEY_YELLOW_INK }} />
      </span>
      <span
        className="text-[17px] font-bold tracking-tight leading-none"
        style={{ letterSpacing: "-0.01em", color: PAISLEY_YELLOW_INK }}
      >
        {title}
      </span>
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
        navigate({ to: "/about" });
      }, 400);
    }
  }

  return (
    <div className="pb-4 flex justify-center">
      <button
        type="button"
        onClick={onTap}
        className="text-[11px] font-semibold tracking-wide"
        style={{ color: flash ? PAISLEY : "var(--muted-foreground)" }}
      >
        Version 1.0.0
      </button>
    </div>
  );
}