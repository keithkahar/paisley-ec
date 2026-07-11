# Lovable Full UI Source Export

Generated for Codex handoff. Source-of-truth dump of every UI-related file in the Lovable (TanStack Start / React 19 / Tailwind v4) codebase.

**Stack boundary reminder for Codex:** this is a React web codebase, not a WeChat Mini Program. Any file whose content depends on browser DOM, `framer-motion`, `@tanstack/react-router`, `lucide-react`, shadcn/ui, or CSS custom properties CANNOT be pasted into WXML/WXSS as-is. Treat this export as visual + interaction spec, not as runnable Mini Program code.

- Source files exported: 89
- Asset files (raw + `.asset.json` pointers) referenced from repo: 43

## Source File Manifest

- `src/components/app/BottomTabBar.tsx`
- `src/components/app/ComingSoon.tsx`
- `src/components/app/FloatingBack.tsx`
- `src/components/app/MonthCalendarDialog.tsx`
- `src/components/app/PhoneFrame.tsx`
- `src/components/app/Pills.tsx`
- `src/components/app/WordPreview.tsx`
- `src/components/app/WordieKit.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/alert-dialog.tsx`
- `src/components/ui/alert.tsx`
- `src/components/ui/aspect-ratio.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/breadcrumb.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/calendar.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/carousel.tsx`
- `src/components/ui/chart.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/collapsible.tsx`
- `src/components/ui/command.tsx`
- `src/components/ui/context-menu.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/drawer.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/hover-card.tsx`
- `src/components/ui/input-otp.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/menubar.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/pagination.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/resizable.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/sidebar.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/sonner.tsx`
- `src/components/ui/switch.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/toggle-group.tsx`
- `src/components/ui/toggle.tsx`
- `src/components/ui/tooltip.tsx`
- `src/hooks/use-mobile.tsx`
- `src/lib/api/example.functions.ts`
- `src/lib/bloxia/assets.ts`
- `src/lib/bloxia/config.ts`
- `src/lib/bloxia/progress.ts`
- `src/lib/config.server.ts`
- `src/lib/error-capture.ts`
- `src/lib/error-page.ts`
- `src/lib/lovable-error-reporting.ts`
- `src/lib/utils.ts`
- `src/router.tsx`
- `src/routes/__root.tsx`
- `src/routes/about.tsx`
- `src/routes/admin.tsx`
- `src/routes/bloxia.tsx`
- `src/routes/calendar.tsx`
- `src/routes/cefr-test.tsx`
- `src/routes/chat.tsx`
- `src/routes/edit-profile.tsx`
- `src/routes/index.tsx`
- `src/routes/my-tests.tsx`
- `src/routes/mywordie.tsx`
- `src/routes/parent.tsx`
- `src/routes/profile.tsx`
- `src/routes/progress.tsx`
- `src/routes/shirin-talk.tsx`
- `src/routes/smart-reading.tsx`
- `src/routes/topics.tsx`
- `src/routes/word-card.tsx`
- `src/routes/wordie-bank.tsx`
- `src/routes/wordie-test.tsx`
- `src/routes/wordie-x.tsx`
- `src/server.ts`
- `src/start.ts`
- `src/styles.css`

---

## Source Files

### src/components/app/BottomTabBar.tsx

```tsx
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

export function BottomTabBar() {
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
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 px-10"
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
```

### src/components/app/ComingSoon.tsx

```tsx
import { PhoneFrame } from "./PhoneFrame";
import { FloatingBack } from "./FloatingBack";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

export function ComingSoon({
  title,
  note,
  back = "/",
  bg = "bg-background",
  accent = "var(--paisley)",
  icon: Icon = Sparkles,
  cta,
}: {
  title: string;
  note?: string;
  back?: string;
  bg?: string;
  accent?: string;
  icon?: ComponentType<{ className?: string }>;
  cta?: ReactNode;
}) {
  return (
    <PhoneFrame bg={bg}>
      <FloatingBack to={back} />
      <div className="px-6 pt-16 pb-12 text-center flex flex-col items-center">
        <div
          className="relative h-24 w-24 rounded-[28px] grid place-items-center text-white shadow-lg"
          style={{ background: accent }}
        >
          <Icon className="h-10 w-10" />
          <span
            className="absolute -top-2 -right-2 rounded-full bg-white border border-border px-2 py-0.5 text-[11px] font-semibold"
            style={{ color: accent }}
          >
            Soon
          </span>
        </div>
        <h2 className="mt-6 text-2xl font-medium" style={{ color: accent }}>
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-[18rem]">
          {note ?? "We're putting the finishing touches here. Check back soon!"}
        </p>
        <div className="mt-8">
          {cta ?? (
            <Link
              to={back}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: accent }}
            >
              Got it
            </Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
```

### src/components/app/FloatingBack.tsx

```tsx
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * Global back button. Sits sticky at the top of the page so it stays
 * clickable while the user scrolls, and shifts down by the iOS safe-area
 * inset so the notch/Dynamic Island never covers it. The sticky wrapper
 * reserves a 5px buffer so the page content below never touches the
 * floating button.
 *
 * This is the ONLY top-bar primitive in the app; every page uses it.
 * Page-specific status/branding lives inside the page body, not here.
 */
export function FloatingBack({
  to = "/",
  label = "Back",
}: {
  to?: string;
  label?: string;
}) {
  return (
    <div className="sticky top-0 z-30 h-0 pb-[5px]">
      <Link
        to={to}
        aria-label={label}
        className="absolute left-4 h-9 w-9 grid place-items-center rounded-full bg-white border border-border shadow-sm active:scale-95 transition-transform"
        style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
      >
        <ChevronLeft className="h-5 w-5" style={{ color: "#0F172A" }} />
      </Link>
    </div>
  );
}

```

### src/components/app/MonthCalendarDialog.tsx

```tsx
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type DayActivity = {
  talk?: boolean;
  wordie?: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Primary color for the section (CSS color string). */
  color: string;
  /** Returns activity flags for a given date. */
  getActivity: (date: Date) => DayActivity;
  /** Color for the talk dot. Defaults to `color`. */
  talkColor?: string;
  /** Color for the wordie dot. Defaults to `color`. */
  wordieColor?: string;
};

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export function MonthCalendarDialog({
  open,
  onOpenChange,
  title,
  color,
  getActivity,
  talkColor,
  wordieColor,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<Date>(() => startOfMonth(new Date()));

  const isCurrentMonth =
    cursor.getFullYear() === today.getFullYear() &&
    cursor.getMonth() === today.getMonth();

  const cells = useMemo(() => {
    const first = startOfMonth(cursor);
    const startDow = first.getDay();
    const daysInMonth = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0
    ).getDate();
    const total = 6 * 7; // always 6 rows for fixed height
    return Array.from({ length: total }).map((_, i) => {
      const dayNum = i - startDow + 1;
      if (dayNum < 1 || dayNum > daysInMonth) return null;
      return new Date(cursor.getFullYear(), cursor.getMonth(), dayNum);
    });
  }, [cursor]);

  const monthLabel = cursor.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] p-5 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-[17px] font-semibold tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Month nav */}
        <div className="mt-1 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setCursor(
                new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)
              )
            }
            className="h-8 w-8 grid place-items-center rounded-full active:scale-95 transition-transform"
            aria-label="Previous month"
            style={{ color }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span
            className="text-[15px] font-semibold tracking-tight"
            style={{ color }}
          >
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={() =>
              setCursor(
                new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
              )
            }
            disabled={isCurrentMonth}
            className="h-8 w-8 grid place-items-center rounded-full active:scale-95 transition-transform disabled:opacity-30"
            aria-label="Next month"
            style={{ color }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="mt-3 grid grid-cols-7 gap-1">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="text-center text-[11px] font-medium"
              style={{
                color: "color-mix(in oklab, var(--foreground) 50%, white)",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="h-10" />;
            const isToday = sameDay(d, today);
            const isFuture = d.getTime() > today.getTime() && !isToday;
            const act = isFuture ? {} : getActivity(d);
            const hasAny = !!(act.talk || act.wordie);
            return (
              <div
                key={i}
                className="h-10 flex flex-col items-center justify-center gap-0.5"
              >
                <span
                  className="h-7 w-7 grid place-items-center rounded-full text-[12.5px] font-semibold"
                  style={
                    isToday
                      ? { color, border: `1.5px solid ${color}` }
                      : hasAny
                      ? {
                          color,
                          background: `color-mix(in oklab, ${color} 12%, white)`,
                        }
                      : isFuture
                      ? {
                          color:
                            "color-mix(in oklab, var(--foreground) 30%, white)",
                        }
                      : { color: "var(--foreground)" }
                  }
                >
                  {d.getDate()}
                </span>
                <span className="h-1.5 flex items-center gap-0.5">
                  {act.talk && (
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: talkColor ?? color }}
                    />
                  )}
                  {act.wordie && (
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: wordieColor ?? color }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Deterministic pseudo-random activity for mock data. */
export function mockActivity(date: Date, salt = 0): boolean {
  const n =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  // simple hash
  let h = n ^ (salt * 2654435761);
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) % 5 !== 0; // ~80% practice days
}
```

### src/components/app/PhoneFrame.tsx

```tsx
import type { ReactNode } from "react";

/**
 * Mobile-first canvas. We don't fake a phone bezel — instead we constrain the
 * width and keep everything centered so the prototype matches a 375px mini-program.
 */
export function PhoneFrame({
  children,
  bg = "bg-background",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div className="min-h-[100dvh] w-full bg-muted/40 flex justify-center">
      <div
        className={`relative w-full max-w-[420px] min-h-[100dvh] ${bg} shadow-[0_0_60px_-30px_rgba(1,70,185,0.25)] overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
```

### src/components/app/Pills.tsx

```tsx
import type { ReactNode } from "react";
import { Flame, Sparkles } from "lucide-react";

export function Pill({
  children,
  color = "var(--paisley)",
  icon,
}: {
  children: ReactNode;
  color?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: `color-mix(in oklab, ${color} 14%, white)`,
        color,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

export function BpPill({ value }: { value: number }) {
  return (
    <Pill color="var(--bloxia)" icon={<Sparkles className="h-3.5 w-3.5" />}>
      {value.toLocaleString()} Bp
    </Pill>
  );
}

export function StreakPill({ days }: { days: number }) {
  return (
    <Pill color="var(--wordie-accent)" icon={<Flame className="h-3.5 w-3.5" />}>
      {days}-day streak
    </Pill>
  );
}
```

### src/components/app/WordPreview.tsx

```tsx
import type { ReactNode } from "react";
import { X, Volume2 } from "lucide-react";

export type PreviewItem = {
  word: string;
  pronunciation: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  cefrLevel: string;
  statusValue: string;
  nextReviewLabel: string;
};

/**
 * Shared full-screen word preview used by both Wordie Bank and Wordie-X.
 * Both entrances must render the exact same UI — all sizes, spacing,
 * pill styles, speaker placement and Previous/Next styling live here.
 */
export function WordPreview({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  topBadges,
}: {
  item: PreviewItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  topBadges?: ReactNode;
}) {
  const prevDisabled = index === 0;
  const nextDisabled = index >= total - 1;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[420px] mx-auto">
      <div className="flex items-center justify-between px-5 py-4">
        <button type="button" onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-muted-foreground">
            {index + 1} / {total}
          </p>
          {topBadges}
        </div>
        <div className="w-5" />
      </div>
      {/* Progress segments */}
      <div className="px-5 flex gap-1 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i <= index
                  ? "var(--wordie)"
                  : "color-mix(in oklab, var(--wordie) 10%, white)",
            }}
          />
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col">
        {/* Word card */}
        <div
          className="rounded-[2rem] p-6 bg-white flex flex-col overflow-hidden"
          style={{
            border: "1px solid color-mix(in oklab, var(--wordie) 30%, white)",
            height: "28rem",
          }}
        >
          <div className="flex items-center">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                style={{ background: "var(--wordie)", color: "white" }}
              >
                {capitalize(item.partOfSpeech)}
              </span>
              <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                {item.cefrLevel}
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <h2
              className="font-medium text-[40px] leading-none"
              style={{
                color: "var(--wordie)",
                letterSpacing: "-0.02em",
              }}
            >
              {item.word}
            </h2>
            <p className="text-[13px] text-muted-foreground mt-3 font-mono">
              {item.pronunciation}
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 mt-6 mb-3">
            <div>
              <p className="text-[14px] font-semibold tracking-[0.08em] text-muted-foreground">
                Definition
              </p>
              <div className="mt-2 flex items-start gap-3">
                <p
                  className="flex-1 text-[18px] font-semibold leading-relaxed text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.definitionEn}
                </p>
                <button
                  type="button"
                  className="shrink-0 grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ height: "29px" }}
                  aria-label="Listen to definition"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[14px] font-semibold tracking-[0.08em] text-muted-foreground">
                Example
              </p>
              <div className="mt-2 flex items-start gap-3">
                <p
                  className="flex-1 text-[18px] font-semibold leading-relaxed text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {renderExample(item.exampleSentence, item.word)}
                </p>
                <button
                  type="button"
                  className="shrink-0 grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ height: "29px" }}
                  aria-label="Listen to example"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Three mini pills */}
        <div className="px-0 mt-6 grid grid-cols-3 gap-3">
          <MiniStat label="Status" value={item.statusValue} />
          <MiniStat label="Level" value={item.cefrLevel} />
          <MiniStat label="Next" value={item.nextReviewLabel} />
        </div>

        {/* Speaker */}
        <div className="mt-[109px] flex flex-col items-center">
          <button
            type="button"
            className="h-[72px] w-[72px] rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform"
            style={{ background: "var(--wordie)" }}
            aria-label="Listen"
          >
            <Volume2 className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Previous / Next — absolute overlay so it doesn't push speaker up */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-4 pointer-events-none">
        <button
          type="button"
          onClick={onPrev}
          disabled={prevDisabled}
          className="text-[15px] font-light disabled:opacity-30 pointer-events-auto"
          style={{ color: "var(--wordie)" }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="text-[15px] font-light disabled:opacity-30 pointer-events-auto"
          style={{ color: "var(--wordie)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl px-3 py-2 text-center"
      style={{ background: "color-mix(in oklab, var(--wordie) 10%, white)" }}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p
        className="text-xs font-semibold mt-0.5 truncate"
        style={{ color: "var(--wordie)" }}
      >
        {value}
      </p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderExample(sentence: string, word: string) {
  if (!sentence) return null;
  const re = new RegExp(`(${word})`, "ig");
  const parts = sentence.split(re);
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === word.toLowerCase() ? (
          <span key={i} style={{ color: "var(--wordie)" }}>
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
```

### src/components/app/WordieKit.tsx

```tsx
import type { ReactNode } from "react";
import { Search, Lock, Sparkles, Inbox } from "lucide-react";

/** myWordie design-system kit — reusable bits shared across mywordie/* routes. */

export type WordStatus = "new" | "learning" | "review" | "mastered" | "difficult" | "favorite";

const STATUS_META: Record<WordStatus, { label: string; color: string }> = {
  new: { label: "New", color: "oklch(0.66 0.24 280)" },
  learning: { label: "Learning", color: "oklch(0.7 0.18 195)" },
  review: { label: "Review", color: "oklch(0.68 0.2 145)" },
  mastered: { label: "Mastered", color: "var(--wordie-accent)" },
  difficult: { label: "Tricky", color: "oklch(0.68 0.26 35)" },
  favorite: { label: "Favorite", color: "var(--shirin)" },
};

export function StatusBadge({ status }: { status: WordStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${m.color} 22%, white)`,
        color: `color-mix(in oklab, ${m.color} 70%, black)`,
      }}
    >
      {m.label}
    </span>
  );
}

export function FilterChip({
  active = false,
  onClick,
  children,
  color = "var(--wordie)",
  tone = "solid",
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  color?: string;
  tone?: "solid" | "tint";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors active:scale-95"
      style={
        active
          ? tone === "tint"
            ? {
                background: "transparent",
                color: `color-mix(in oklab, ${color} 70%, black)`,
                borderColor: `color-mix(in oklab, ${color} 70%, black)`,
              }
            : { background: color, color: "white", borderColor: color }
          : { background: "white", color: "var(--foreground)", borderColor: "var(--border)" }
      }
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  color = "var(--wordie)",
  track = "color-mix(in oklab, var(--wordie) 12%, white)",
  height = 8,
}: {
  value: number;
  color?: string;
  track?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="rounded-full overflow-hidden" style={{ background: track, height }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export type WordItem = {
  word: string;
  ipa?: string;
  meaning: string;
  status: WordStatus;
  progress?: number; // 0..100
};

export function WordRow({
  item,
  onClick,
  right,
}: {
  item: WordItem;
  onClick?: () => void;
  right?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-[15px] truncate" style={{ letterSpacing: "-0.01em" }}>
            {item.word}
          </p>
          {item.ipa && (
            <span className="text-[11px] text-muted-foreground font-medium truncate">/{item.ipa}/</span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground truncate mt-0.5">{item.meaning}</p>
        {typeof item.progress === "number" && (
          <div className="mt-2">
            <ProgressBar value={item.progress} height={4} />
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <StatusBadge status={item.status} />
        {right}
      </div>
    </button>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2 px-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {children}
      </p>
      {action}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search words",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-white border border-border pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:border-[color:var(--wordie)] transition-colors"
      />
    </div>
  );
}

export function EmptyState({
  icon = <Inbox className="h-7 w-7" />,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12 rounded-3xl bg-white border border-dashed border-border">
      <div
        className="h-14 w-14 rounded-2xl grid place-items-center mb-3"
        style={{
          background: "color-mix(in oklab, var(--wordie) 10%, white)",
          color: "var(--wordie)",
        }}
      >
        {icon}
      </div>
      <p className="font-semibold text-[15px]">{title}</p>
      {description && <p className="text-[13px] text-muted-foreground mt-1 max-w-[240px]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LockedCard({
  title,
  description,
  cta = "Unlock with Member",
  onClick,
}: {
  title: string;
  description?: string;
  cta?: string;
  onClick?: () => void;
}) {
  return (
    <div className="rounded-3xl p-5 bg-white border border-border relative overflow-hidden">
      <div className="flex items-start gap-3">
        <div
          className="h-11 w-11 rounded-2xl grid place-items-center shrink-0"
          style={{
            background: "color-mix(in oklab, var(--wordie-accent) 18%, white)",
            color: "var(--wordie-accent)",
          }}
        >
          <Lock className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[14px]">{title}</p>
          {description && <p className="text-[12px] text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 w-full rounded-full py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
        style={{ background: "var(--wordie-accent)" }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {cta}
      </button>
    </div>
  );
}

export function StatTile({
  label,
  value,
  color = "var(--wordie)",
}: {
  label: string;
  value: ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-border px-3 py-3 text-center">
      <p className="text-[20px] font-semibold leading-none" style={{ color, fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

/** Shared mock vocabulary used across prototype pages. */
export const MOCK_WORDS: WordItem[] = [
  { word: "garden", ipa: "ˈɡɑːdən", meaning: "an area for plants", status: "mastered", progress: 100 },
  { word: "whisper", ipa: "ˈwɪspər", meaning: "speak very softly", status: "learning", progress: 60 },
  { word: "curious", ipa: "ˈkjʊəriəs", meaning: "eager to know", status: "review", progress: 45 },
  { word: "brave", ipa: "breɪv", meaning: "showing courage", status: "mastered", progress: 100 },
  { word: "puzzle", ipa: "ˈpʌzəl", meaning: "a game to solve", status: "learning", progress: 30 },
  { word: "gentle", ipa: "ˈdʒentl", meaning: "kind and soft", status: "new", progress: 0 },
  { word: "rescue", ipa: "ˈreskjuː", meaning: "save from danger", status: "difficult", progress: 20 },
  { word: "harvest", ipa: "ˈhɑːvɪst", meaning: "gather crops", status: "review", progress: 55 },
  { word: "marvelous", ipa: "ˈmɑːvələs", meaning: "wonderful", status: "difficult", progress: 15 },
  { word: "kite", ipa: "kaɪt", meaning: "toy that flies", status: "mastered", progress: 100 },
  { word: "thunder", ipa: "ˈθʌndər", meaning: "loud storm sound", status: "learning", progress: 50 },
  { word: "vacation", ipa: "vəˈkeɪʃən", meaning: "a holiday trip", status: "favorite", progress: 80 },
];
```

### src/components/ui/accordion.tsx

```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

### src/components/ui/alert-dialog.tsx

```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

### src/components/ui/alert.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```

### src/components/ui/aspect-ratio.tsx

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```

### src/components/ui/avatar.tsx

```tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```

### src/components/ui/badge.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

### src/components/ui/breadcrumb.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

### src/components/ui/button.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

### src/components/ui/calendar.tsx

```tsx
"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };

```

### src/components/ui/card.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```

### src/components/ui/carousel.tsx

```tsx
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

```

### src/components/ui/chart.tsx

```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload.fill || item.color;

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator === "dot" && "items-center",
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              },
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center",
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

```

### src/components/ui/checkbox.tsx

```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

### src/components/ui/collapsible.tsx

```tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

### src/components/ui/command.tsx

```tsx
"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

### src/components/ui/context-menu.tsx

```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

### src/components/ui/dialog.tsx

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```

### src/components/ui/drawer.tsx

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

### src/components/ui/dropdown-menu.tsx

```tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

### src/components/ui/form.tsx

```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

```

### src/components/ui/hover-card.tsx

```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

### src/components/ui/input-otp.tsx

```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

### src/components/ui/input.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```

### src/components/ui/label.tsx

```tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

### src/components/ui/menubar.tsx

```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```

### src/components/ui/navigation-menu.tsx

```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```

### src/components/ui/pagination.tsx

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

```

### src/components/ui/popover.tsx

```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

```

### src/components/ui/progress.tsx

```tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

### src/components/ui/radio-group.tsx

```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

### src/components/ui/resizable.tsx

```tsx
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

### src/components/ui/scroll-area.tsx

```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```

### src/components/ui/select.tsx

```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

### src/components/ui/separator.tsx

```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

### src/components/ui/sheet.tsx

```tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

```

### src/components/ui/sidebar.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  ),
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  ),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

### src/components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}

export { Skeleton };

```

### src/components/ui/slider.tsx

```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

### src/components/ui/sonner.tsx

```tsx
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

```

### src/components/ui/switch.tsx

```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

### src/components/ui/table.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```

### src/components/ui/tabs.tsx

```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

### src/components/ui/textarea.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

```

### src/components/ui/toggle-group.tsx

```tsx
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```

### src/components/ui/toggle.tsx

```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```

### src/components/ui/tooltip.tsx

```tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

### src/hooks/use-mobile.tsx

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

### src/lib/api/example.functions.ts

```ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

// Example createServerFn. Server-side handler invoked from the client:
//   const result = await getGreeting({ data: { name: "Ada" } })
// The .handler body runs server-only — imports used only inside it (like
// .server.ts modules) are tree-shaken from the client bundle. Module-level
// code here still ships to the client; for truly server-only helpers, put
// them in a .server.ts file. Use this pattern instead of Supabase Edge
// Functions for server logic.

export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });

```

### src/lib/bloxia/assets.ts

```ts
// AUTO-GENERATED — Bloxia CDN asset URLs
export const BLOXIA_URLS: Record<string, string> = {
  "bloxie_glow": "/__l5e/assets-v1/ce12d7c1-0092-4101-b92c-0c7a6f0c8fdb/bloxie_glow.png",
  "bloxie_idle": "/__l5e/assets-v1/14941bcf-3804-4ddb-a132-7670133e798d/bloxie_idle.png",
  "collection_adventure_token": "/__l5e/assets-v1/f74de222-b386-4973-b5a3-69b3f65d7033/collection_adventure_token.png",
  "collection_builder_block": "/__l5e/assets-v1/e66f90b4-4f96-4b8c-a68c-ce40b5e9574f/collection_builder_block.png",
  "collection_calm_stone": "/__l5e/assets-v1/c3b517fc-e387-40f9-b4da-4268dca901a3/collection_calm_stone.png",
  "collection_cloud_gem": "/__l5e/assets-v1/9f441115-1705-421c-bc5a-c43e60e95802/collection_cloud_gem.png",
  "collection_community_star": "/__l5e/assets-v1/0ee3530b-e80c-4e63-b0a9-24359ef84c39/collection_community_star.png",
  "collection_dream_compass": "/__l5e/assets-v1/90d951e8-6635-4d3c-a250-36c852807d50/collection_dream_compass.png",
  "collection_dream_lantern": "/__l5e/assets-v1/f71c9f11-5176-43b5-8591-ed9aaf07817b/collection_dream_lantern.png",
  "collection_echo_pearl": "/__l5e/assets-v1/c0a10d84-4be4-4ec9-8ada-e7c509c0d050/collection_echo_pearl.png",
  "collection_energy_cube": "/__l5e/assets-v1/44bbbca9-806b-4f2c-b589-07219a3981ad/collection_energy_cube.png",
  "collection_first_light_seed": "/__l5e/assets-v1/3eba11fd-3529-46af-b7a5-1a4c82bbbf41/collection_first_light_seed.png",
  "collection_forest_shard": "/__l5e/assets-v1/4c032c1e-534c-4088-955e-f3fd76e9a2d7/collection_forest_shard.png",
  "collection_friendship_ribbon": "/__l5e/assets-v1/5228659b-5b93-4da8-8500-91c0d8b2fb11/collection_friendship_ribbon.png",
  "collection_glow_mushroom": "/__l5e/assets-v1/a6126f92-682a-4922-addb-9c6897f95fe4/collection_glow_mushroom.png",
  "collection_glow_seed": "/__l5e/assets-v1/eb5a1732-e8a5-47a4-aa94-13612410290c/collection_glow_seed.png",
  "collection_helping_hand": "/__l5e/assets-v1/0a3f5065-6014-4ae6-9bc1-753bdaf1c912/collection_helping_hand.png",
  "collection_horizon_compass": "/__l5e/assets-v1/a235c0fc-055b-46ec-9f96-2feed75cfb21/collection_horizon_compass.png",
  "collection_map_fragment": "/__l5e/assets-v1/440435bf-265f-4a71-ab6d-48e882d853cf/collection_map_fragment.png",
  "collection_memory_crystal": "/__l5e/assets-v1/9d10cae9-f179-4694-a85a-79c08143f210/collection_memory_crystal.png",
  "collection_mirror_lily": "/__l5e/assets-v1/42cfb19d-8288-4e14-a47b-cd2380af74fc/collection_mirror_lily.png",
  "collection_morning_dew_crystal": "/__l5e/assets-v1/8f31af7c-26f9-4ad7-9d60-de4fc93e43f2/collection_morning_dew_crystal.png",
  "collection_nightlight_acorn": "/__l5e/assets-v1/754f29b8-888e-4eba-91db-d6669329612e/collection_nightlight_acorn.png",
  "collection_reflection_crystal": "/__l5e/assets-v1/a8559e1c-ce62-44b2-b5b3-7d640bf87230/collection_reflection_crystal.png",
  "collection_ripple_stone": "/__l5e/assets-v1/5949c9f8-5536-414c-a25b-f4eb2e5f942b/collection_ripple_stone.png",
  "collection_song_shell": "/__l5e/assets-v1/5f8522c6-9d7a-4ee5-bc1f-740d61adf615/collection_song_shell.png",
  "collection_star_fragment": "/__l5e/assets-v1/508ec0d1-009f-4d35-a76b-d8aede6ec736/collection_star_fragment.png",
  "collection_starlight_drop": "/__l5e/assets-v1/c536a813-0056-417b-bcda-5951b45e6f9e/collection_starlight_drop.png",
  "collection_summit_stone": "/__l5e/assets-v1/cdb0e458-40e0-4582-9695-53e9c4618f86/collection_summit_stone.png",
  "collection_tree_heart_crystal": "/__l5e/assets-v1/65e0b476-f0ba-4947-8289-f62dcfafc392/collection_tree_heart_crystal.png",
  "collection_unity_badge": "/__l5e/assets-v1/6cd7a490-e565-4117-86c8-70c99120064b/collection_unity_badge.png",
  "collection_welcome_flower": "/__l5e/assets-v1/7d79e041-58ae-417a-908a-836ae3615776/collection_welcome_flower.png",
  "collection_whisper_feather": "/__l5e/assets-v1/9e721321-713a-44c3-a3c5-cfb8adba4ac9/collection_whisper_feather.png",
  "collection_wonder_leaf": "/__l5e/assets-v1/1afc1f39-c333-4d6d-96d1-37377689629d/collection_wonder_leaf.png",
  "growth_badge_brave_learner": "/__l5e/assets-v1/2154a742-2783-43ee-9616-611584d47acd/growth_badge_brave_learner.png",
  "growth_badge_bright_voice": "/__l5e/assets-v1/ea00e6de-7fe3-403c-b7cf-eec2f59fffbf/growth_badge_bright_voice.png",
  "growth_badge_creative_maker": "/__l5e/assets-v1/dc8b0188-a7ca-4d36-ba8a-d71a16d22d25/growth_badge_creative_maker.png",
  "growth_badge_curious_explorer": "/__l5e/assets-v1/a449b011-e3e3-4117-bd81-97f50a4750b0/growth_badge_curious_explorer.png",
  "growth_badge_daily_grower": "/__l5e/assets-v1/1dbf1b3e-0d5b-4e2e-a599-c881d28702e2/growth_badge_daily_grower.png",
  "growth_badge_dream_chaser": "/__l5e/assets-v1/3912ef7a-a15b-4680-984c-6e2e9546e040/growth_badge_dream_chaser.png",
  "growth_badge_focus_finder": "/__l5e/assets-v1/abd8d9fe-10ad-4d1c-9395-ab1805ff35ad/growth_badge_focus_finder.png",
  "growth_badge_future_dreamer": "/__l5e/assets-v1/53416988-7bec-4e29-a0d4-f606e479a9f4/growth_badge_future_dreamer.png",
  "growth_badge_growth_guardian": "/__l5e/assets-v1/bdeac5ea-4ee4-41bc-a4dd-cffb368d2c30/growth_badge_growth_guardian.png",
  "growth_badge_heart_helper": "/__l5e/assets-v1/23c23892-09f0-4923-9e1b-86509c1b4b93/growth_badge_heart_helper.png",
  "growth_badge_knowledge_builder": "/__l5e/assets-v1/7a45e91b-d657-4aee-b41c-3d28a441aff4/growth_badge_knowledge_builder.png",
  "growth_badge_nature_nurturer": "/__l5e/assets-v1/4a779766-b494-43a5-a64d-b0444da98e51/growth_badge_nature_nurturer.png",
  "growth_badge_problem_solver": "/__l5e/assets-v1/eaa20bf9-a491-4d02-8b4a-46f7f9531196/growth_badge_problem_solver.png",
  "growth_badge_team_player": "/__l5e/assets-v1/0eefbd6e-dca1-444d-a1cd-41d4fb15336a/growth_badge_team_player.png",
  "growth_badge_time_keeper": "/__l5e/assets-v1/90df22a4-a08e-4f4a-9f1d-fd2e26009608/growth_badge_time_keeper.png",
  "growth_badge_trust_builder": "/__l5e/assets-v1/6ce83ccf-6bb4-4507-a645-c45c1302f15b/growth_badge_trust_builder.png",
  "map_bloxia_world": "/__l5e/assets-v1/c018bfa4-9e91-488a-98bd-3e1f3c09e306/map_bloxia_world.png",
  "map_marker_available": "/__l5e/assets-v1/49840eef-1334-4d8d-8ad3-a1c80dd3fbb7/map_marker_available.png",
  "map_marker_current": "/__l5e/assets-v1/cbd299dd-759d-4dd5-ae9e-a40b9c67d272/map_marker_current.png",
  "map_marker_locked": "/__l5e/assets-v1/b978ab6b-7211-493a-a64d-231af486119e/map_marker_locked.png",
  "map_marker_visited": "/__l5e/assets-v1/706d3b5f-cf47-4ccc-8995-52de7104b035/map_marker_visited.png",
  "place_badge_community_visitor": "/__l5e/assets-v1/07116871-316c-47a1-9e8e-196fc4a0c94d/place_badge_community_visitor.png",
  "place_badge_creative_land_visitor": "/__l5e/assets-v1/ef337f53-95e3-4dbc-b38d-b0504c8f3dfb/place_badge_creative_land_visitor.png",
  "place_badge_forest_explorer": "/__l5e/assets-v1/38c58d52-5a7f-49ce-905e-e9dafec269e7/place_badge_forest_explorer.png",
  "place_badge_hill_adventurer": "/__l5e/assets-v1/014f91bc-0c54-4e86-a277-8938a9e0106f/place_badge_hill_adventurer.png",
  "place_badge_lake_observer": "/__l5e/assets-v1/85c5a2f0-e581-4578-b11a-adba4b57339a/place_badge_lake_observer.png",
  "place_badge_meadow_visitor": "/__l5e/assets-v1/320680b3-74d7-4607-92f7-c29f1db9198f/place_badge_meadow_visitor.png",
  "place_badge_river_traveler": "/__l5e/assets-v1/d600d341-9e66-4ac1-b669-70f5cd64a764/place_badge_river_traveler.png",
  "place_badge_wonder_tree_explorer": "/__l5e/assets-v1/a828834c-72a6-46e1-8f97-caf9845a0ea7/place_badge_wonder_tree_explorer.png",
  "shirin_and_bloxie": "/__l5e/assets-v1/9c3c81be-61ea-408b-9559-3665bcda6044/shirin_and_bloxie.png",
  "shirin_full": "/__l5e/assets-v1/e9d10d20-d922-4983-ac34-7458bafeaed0/shirin_full.png",
  "shirin_map": "/__l5e/assets-v1/f21eca5e-9032-4882-8b82-5f219e7a3efe/shirin_map.png",
  "shirin_portrait": "/__l5e/assets-v1/6eb6c6ef-cdce-4a2c-916a-a4abe31210e7/shirin_portrait.png",
  "shirin_success": "/__l5e/assets-v1/5822ecf9-1a6e-40b4-bd07-41fd02858057/shirin_success.png",
};

```

### src/lib/bloxia/config.ts

```ts
import { BLOXIA_URLS as U } from "./assets";

export type PlaceId =
  | "arrival_meadow"
  | "wonder_tree"
  | "river_of_echoes"
  | "whisper_woods"
  | "community_hollow"
  | "reflection_lake"
  | "myblox_belt"
  | "far_hills";

export interface Place {
  id: PlaceId;
  name: string;
  shortName: string;
  unlockBp: number;
  order: number;
  mapPosition: { x: number; y: number };
  placeBadgeId: string;
  description: string;
}

export interface PlaceBadge {
  id: string;
  name: string;
  placeId: PlaceId;
  asset: string;
  description: string;
}

export interface GrowthBadge {
  id: string;
  name: string;
  bpCost: number;
  series: string;
  asset: string;
  description: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  placeId: PlaceId;
  bpCost: number;
  rarity: "common" | "rare" | "epic";
  asset: string;
  description: string;
}

export const CHARACTER_ASSETS = {
  shirinFull: U.shirin_full,
  shirinMap: U.shirin_map,
  shirinPortrait: U.shirin_portrait,
  shirinSuccess: U.shirin_success,
  shirinAndBloxie: U.shirin_and_bloxie,
  bloxieIdle: U.bloxie_idle,
  bloxieGlow: U.bloxie_glow,
};

// ---------- Bloxian Avatars (8) ----------
// Each avatar ships a single high-res portrait used across contexts (top bar,
// map marker, profile, picker). Adding icon variants later is a drop-in swap.

export interface BloxianAvatar {
  id: string;
  name: string;
  portrait: string;
  full: string;
  map: string;
  isDefault?: boolean;
}

export const BLOXIAN_AVATARS: BloxianAvatar[] = [
  {
    id: "shirin",
    name: "Bloxian",
    portrait: "/__l5e/assets-v1/1ed594f5-3694-4129-8db7-fca213a0e04f/avatar_shirin_icon.png",
    full: "/__l5e/assets-v1/1ed594f5-3694-4129-8db7-fca213a0e04f/avatar_shirin_icon.png",
    map: "/__l5e/assets-v1/1ed594f5-3694-4129-8db7-fca213a0e04f/avatar_shirin_icon.png",
    isDefault: true,
  },
  {
    id: "ezra",
    name: "Ezra",
    portrait: "/__l5e/assets-v1/9ad7f0fe-0b5a-4b47-b7b0-123fdc25cb36/avatar_ezra_icon.png",
    full: "/__l5e/assets-v1/9ad7f0fe-0b5a-4b47-b7b0-123fdc25cb36/avatar_ezra_icon.png",
    map: "/__l5e/assets-v1/9ad7f0fe-0b5a-4b47-b7b0-123fdc25cb36/avatar_ezra_icon.png",
  },
  {
    id: "luna",
    name: "Luna",
    portrait: "/__l5e/assets-v1/5f418210-1e33-4ea9-9d52-a9666072bf3c/avatar_luna_icon.png",
    full: "/__l5e/assets-v1/5f418210-1e33-4ea9-9d52-a9666072bf3c/avatar_luna_icon.png",
    map: "/__l5e/assets-v1/5f418210-1e33-4ea9-9d52-a9666072bf3c/avatar_luna_icon.png",
  },
  {
    id: "rex",
    name: "Rex",
    portrait: "/__l5e/assets-v1/6fd00c92-b709-456a-9e79-1ab00aad07b2/avatar_rex_icon.png",
    full: "/__l5e/assets-v1/6fd00c92-b709-456a-9e79-1ab00aad07b2/avatar_rex_icon.png",
    map: "/__l5e/assets-v1/6fd00c92-b709-456a-9e79-1ab00aad07b2/avatar_rex_icon.png",
  },
  {
    id: "milo",
    name: "Milo",
    portrait: "/__l5e/assets-v1/ce76d42b-24bc-4d5b-9f65-fe67c79e8599/avatar_milo_icon.png",
    full: "/__l5e/assets-v1/ce76d42b-24bc-4d5b-9f65-fe67c79e8599/avatar_milo_icon.png",
    map: "/__l5e/assets-v1/ce76d42b-24bc-4d5b-9f65-fe67c79e8599/avatar_milo_icon.png",
  },
  {
    id: "nova",
    name: "Nova",
    portrait: "/__l5e/assets-v1/13588986-7df4-4c99-987a-2125dc8f915b/avatar_nova_icon.png",
    full: "/__l5e/assets-v1/13588986-7df4-4c99-987a-2125dc8f915b/avatar_nova_icon.png",
    map: "/__l5e/assets-v1/13588986-7df4-4c99-987a-2125dc8f915b/avatar_nova_icon.png",
  },
  {
    id: "kai",
    name: "Kai",
    portrait: "/__l5e/assets-v1/29785c3f-cfec-40fc-9a61-e409611b415a/avatar_kai_icon.png",
    full: "/__l5e/assets-v1/29785c3f-cfec-40fc-9a61-e409611b415a/avatar_kai_icon.png",
    map: "/__l5e/assets-v1/29785c3f-cfec-40fc-9a61-e409611b415a/avatar_kai_icon.png",
  },
  {
    id: "iris",
    name: "Iris",
    portrait: "/__l5e/assets-v1/cb61520f-194b-4b53-9024-5febf5701821/avatar_iris_icon.png",
    full: "/__l5e/assets-v1/cb61520f-194b-4b53-9024-5febf5701821/avatar_iris_icon.png",
    map: "/__l5e/assets-v1/cb61520f-194b-4b53-9024-5febf5701821/avatar_iris_icon.png",
  },
];

export const DEFAULT_AVATAR_ID = "shirin";
export const avatarById = Object.fromEntries(
  BLOXIAN_AVATARS.map((a) => [a.id, a]),
) as Record<string, BloxianAvatar>;

export const MAP_ASSETS = {
  world: U.map_bloxia_world,
  markers: {
    current: U.map_marker_current,
    visited: U.map_marker_visited,
    available: U.map_marker_available,
    locked: U.map_marker_locked,
  },
};

export const PLACES: Place[] = [
  { id: "arrival_meadow", name: "Arrival Meadow", shortName: "Meadow", unlockBp: 0, order: 1, mapPosition: { x: 75, y: 70 }, placeBadgeId: "meadow_visitor", description: "The first safe field where every Bloxian begins." },
  { id: "wonder_tree", name: "Wonder Tree", shortName: "Tree", unlockBp: 1000, order: 2, mapPosition: { x: 45, y: 37 }, placeBadgeId: "wonder_tree_explorer", description: "A bright tree for curious questions and new ideas." },
  { id: "river_of_echoes", name: "River of Echoes", shortName: "River", unlockBp: 2000, order: 3, mapPosition: { x: 86, y: 42 }, placeBadgeId: "river_traveler", description: "A calm river where learning memories flow forward." },
  { id: "whisper_woods", name: "Whisper Woods", shortName: "Woods", unlockBp: 3000, order: 4, mapPosition: { x: 14, y: 51 }, placeBadgeId: "forest_explorer", description: "A quiet forest for focus, listening, and careful growth." },
  { id: "community_hollow", name: "Community Hollow", shortName: "Hollow", unlockBp: 4000, order: 5, mapPosition: { x: 20, y: 66 }, placeBadgeId: "community_visitor", description: "A friendly place for kindness, teamwork, and sharing." },
  { id: "reflection_lake", name: "Reflection Lake", shortName: "Lake", unlockBp: 5000, order: 6, mapPosition: { x: 17, y: 29 }, placeBadgeId: "lake_observer", description: "A lake for looking back and seeing how far you have grown." },
  { id: "myblox_belt", name: "MyBlox Belt", shortName: "MyBlox", unlockBp: 6000, order: 7, mapPosition: { x: 78, y: 27 }, placeBadgeId: "creative_land_visitor", description: "A creative land for building identity, projects, and dreams." },
  { id: "far_hills", name: "Far Hills", shortName: "Hills", unlockBp: 8000, order: 8, mapPosition: { x: 44, y: 18 }, placeBadgeId: "hill_adventurer", description: "The far horizon for big goals and future courage." },
];

export const PLACE_BADGES: PlaceBadge[] = [
  { id: "meadow_visitor", name: "Meadow Visitor", placeId: "arrival_meadow", asset: U.place_badge_meadow_visitor, description: "Arrived safely in Arrival Meadow." },
  { id: "wonder_tree_explorer", name: "Wonder Tree Explorer", placeId: "wonder_tree", asset: U.place_badge_wonder_tree_explorer, description: "Reached the Wonder Tree." },
  { id: "river_traveler", name: "River Traveler", placeId: "river_of_echoes", asset: U.place_badge_river_traveler, description: "Crossed the River of Echoes." },
  { id: "forest_explorer", name: "Forest Explorer", placeId: "whisper_woods", asset: U.place_badge_forest_explorer, description: "Explored Whisper Woods." },
  { id: "community_visitor", name: "Community Visitor", placeId: "community_hollow", asset: U.place_badge_community_visitor, description: "Visited Community Hollow." },
  { id: "lake_observer", name: "Lake Observer", placeId: "reflection_lake", asset: U.place_badge_lake_observer, description: "Reached Reflection Lake." },
  { id: "creative_land_visitor", name: "Creative Land Visitor", placeId: "myblox_belt", asset: U.place_badge_creative_land_visitor, description: "Entered MyBlox Belt." },
  { id: "hill_adventurer", name: "Hill Adventurer", placeId: "far_hills", asset: U.place_badge_hill_adventurer, description: "Reached the Far Hills." },
];

export const GROWTH_BADGES: GrowthBadge[] = [
  { id: "curious_explorer", name: "Curious Explorer", bpCost: 300, series: "exploration", asset: U.growth_badge_curious_explorer, description: "For asking questions and trying new paths." },
  { id: "brave_learner", name: "Brave Learner", bpCost: 300, series: "learning", asset: U.growth_badge_brave_learner, description: "For trying even when English feels hard." },
  { id: "knowledge_builder", name: "Knowledge Builder", bpCost: 700, series: "learning", asset: U.growth_badge_knowledge_builder, description: "For building skills step by step." },
  { id: "bright_voice", name: "Bright Voice", bpCost: 300, series: "speaking", asset: U.growth_badge_bright_voice, description: "For using your English voice." },
  { id: "creative_maker", name: "Creative Maker", bpCost: 500, series: "creativity", asset: U.growth_badge_creative_maker, description: "For making new ideas real." },
  { id: "heart_helper", name: "Heart Helper", bpCost: 500, series: "community", asset: U.growth_badge_heart_helper, description: "For helping with kindness." },
  { id: "team_player", name: "Team Player", bpCost: 700, series: "community", asset: U.growth_badge_team_player, description: "For growing with others." },
  { id: "focus_finder", name: "Focus Finder", bpCost: 700, series: "focus", asset: U.growth_badge_focus_finder, description: "For staying with a task." },
  { id: "time_keeper", name: "Time Keeper", bpCost: 800, series: "habits", asset: U.growth_badge_time_keeper, description: "For respecting practice time." },
  { id: "trust_builder", name: "Trust Builder", bpCost: 800, series: "habits", asset: U.growth_badge_trust_builder, description: "For keeping promises to yourself." },
  { id: "daily_grower", name: "Daily Grower", bpCost: 1000, series: "habits", asset: U.growth_badge_daily_grower, description: "For steady daily progress." },
  { id: "future_dreamer", name: "Future Dreamer", bpCost: 1000, series: "dreams", asset: U.growth_badge_future_dreamer, description: "For imagining what comes next." },
  { id: "growth_guardian", name: "Growth Guardian", bpCost: 1500, series: "identity", asset: U.growth_badge_growth_guardian, description: "For protecting your learning path." },
  { id: "problem_solver", name: "Problem Solver", bpCost: 1500, series: "thinking", asset: U.growth_badge_problem_solver, description: "For solving tricky things." },
  { id: "nature_nurturer", name: "Nature Nurturer", bpCost: 1500, series: "care", asset: U.growth_badge_nature_nurturer, description: "For caring about the world around you." },
  { id: "dream_chaser", name: "Dream Chaser", bpCost: 2000, series: "dreams", asset: U.growth_badge_dream_chaser, description: "For chasing a big dream with courage." },
];

export const COLLECTION_ITEMS: CollectionItem[] = [
  { id: "collection_morning_dew_crystal", name: "Morning Dew Crystal", placeId: "arrival_meadow", bpCost: 50, rarity: "common", asset: U.collection_morning_dew_crystal, description: "A small crystal from the first morning." },
  { id: "collection_welcome_flower", name: "Welcome Flower", placeId: "arrival_meadow", bpCost: 80, rarity: "common", asset: U.collection_welcome_flower, description: "A flower that says you belong here." },
  { id: "collection_first_light_seed", name: "First Light Seed", placeId: "arrival_meadow", bpCost: 200, rarity: "rare", asset: U.collection_first_light_seed, description: "A seed holding the first light of Bloxia." },
  { id: "collection_friendship_ribbon", name: "Friendship Ribbon", placeId: "arrival_meadow", bpCost: 300, rarity: "rare", asset: U.collection_friendship_ribbon, description: "A ribbon for friendly effort." },
  { id: "collection_wonder_leaf", name: "Wonder Leaf", placeId: "wonder_tree", bpCost: 50, rarity: "common", asset: U.collection_wonder_leaf, description: "A leaf from the Wonder Tree." },
  { id: "collection_glow_seed", name: "Glow Seed", placeId: "wonder_tree", bpCost: 100, rarity: "common", asset: U.collection_glow_seed, description: "A seed that glows when ideas arrive." },
  { id: "collection_tree_heart_crystal", name: "Tree Heart Crystal", placeId: "wonder_tree", bpCost: 250, rarity: "rare", asset: U.collection_tree_heart_crystal, description: "A crystal from the heart of the tree." },
  { id: "collection_dream_lantern", name: "Dream Lantern", placeId: "wonder_tree", bpCost: 600, rarity: "epic", asset: U.collection_dream_lantern, description: "A lantern for the longest journey." },
  { id: "collection_echo_pearl", name: "Echo Pearl", placeId: "river_of_echoes", bpCost: 100, rarity: "common", asset: U.collection_echo_pearl, description: "A pearl that remembers kind words." },
  { id: "collection_memory_crystal", name: "Memory Crystal", placeId: "river_of_echoes", bpCost: 200, rarity: "rare", asset: U.collection_memory_crystal, description: "A crystal for learning memories." },
  { id: "collection_ripple_stone", name: "Ripple Stone", placeId: "river_of_echoes", bpCost: 300, rarity: "rare", asset: U.collection_ripple_stone, description: "A river stone shaped by echoes." },
  { id: "collection_song_shell", name: "Song Shell", placeId: "river_of_echoes", bpCost: 700, rarity: "epic", asset: U.collection_song_shell, description: "A shell that carries a soft song." },
  { id: "collection_whisper_feather", name: "Whisper Feather", placeId: "whisper_woods", bpCost: 80, rarity: "common", asset: U.collection_whisper_feather, description: "A feather from the quiet woods." },
  { id: "collection_glow_mushroom", name: "Glow Mushroom", placeId: "whisper_woods", bpCost: 150, rarity: "common", asset: U.collection_glow_mushroom, description: "A small light for focused paths." },
  { id: "collection_forest_shard", name: "Forest Shard", placeId: "whisper_woods", bpCost: 250, rarity: "rare", asset: U.collection_forest_shard, description: "A calm shard from Whisper Woods." },
  { id: "collection_nightlight_acorn", name: "Nightlight Acorn", placeId: "whisper_woods", bpCost: 600, rarity: "epic", asset: U.collection_nightlight_acorn, description: "An acorn holding forest nightlight." },
  { id: "collection_builder_block", name: "Builder Block", placeId: "community_hollow", bpCost: 80, rarity: "common", asset: U.collection_builder_block, description: "A first block for building ideas." },
  { id: "collection_helping_hand", name: "Helping Hand", placeId: "community_hollow", bpCost: 150, rarity: "common", asset: U.collection_helping_hand, description: "A symbol of helpful kindness." },
  { id: "collection_community_star", name: "Community Star", placeId: "community_hollow", bpCost: 250, rarity: "rare", asset: U.collection_community_star, description: "A bright star from Community Hollow." },
  { id: "collection_unity_badge", name: "Unity Badge", placeId: "community_hollow", bpCost: 700, rarity: "epic", asset: U.collection_unity_badge, description: "A badge for growing together." },
  { id: "collection_reflection_crystal", name: "Reflection Crystal", placeId: "reflection_lake", bpCost: 100, rarity: "common", asset: U.collection_reflection_crystal, description: "A crystal for seeing progress clearly." },
  { id: "collection_calm_stone", name: "Calm Stone", placeId: "reflection_lake", bpCost: 200, rarity: "rare", asset: U.collection_calm_stone, description: "A stone for calm thinking." },
  { id: "collection_mirror_lily", name: "Mirror Lily", placeId: "reflection_lake", bpCost: 450, rarity: "rare", asset: U.collection_mirror_lily, description: "A lily reflected on still water." },
  { id: "collection_starlight_drop", name: "Starlight Drop", placeId: "reflection_lake", bpCost: 800, rarity: "epic", asset: U.collection_starlight_drop, description: "A quiet drop of lake starlight." },
  { id: "collection_dream_compass", name: "Dream Compass", placeId: "myblox_belt", bpCost: 80, rarity: "common", asset: U.collection_dream_compass, description: "A compass pointing toward dreams." },
  { id: "collection_energy_cube", name: "Energy Cube", placeId: "myblox_belt", bpCost: 150, rarity: "common", asset: U.collection_energy_cube, description: "A cube charged with creative energy." },
  { id: "collection_map_fragment", name: "Map Fragment", placeId: "myblox_belt", bpCost: 500, rarity: "rare", asset: U.collection_map_fragment, description: "A fragment of a wider Bloxia map." },
  { id: "collection_adventure_token", name: "Adventure Token", placeId: "myblox_belt", bpCost: 800, rarity: "epic", asset: U.collection_adventure_token, description: "A token for creative adventures." },
  { id: "collection_star_fragment", name: "Star Fragment", placeId: "far_hills", bpCost: 150, rarity: "common", asset: U.collection_star_fragment, description: "A small piece of a far star." },
  { id: "collection_cloud_gem", name: "Cloud Gem", placeId: "far_hills", bpCost: 300, rarity: "rare", asset: U.collection_cloud_gem, description: "A gem found above the hills." },
  { id: "collection_summit_stone", name: "Summit Stone", placeId: "far_hills", bpCost: 500, rarity: "rare", asset: U.collection_summit_stone, description: "A stone from the high summit." },
  { id: "collection_horizon_compass", name: "Horizon Compass", placeId: "far_hills", bpCost: 1000, rarity: "epic", asset: U.collection_horizon_compass, description: "A compass that points beyond the horizon." },
];

export const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p])) as Record<PlaceId, Place>;
export const placeBadgeById = Object.fromEntries(PLACE_BADGES.map((b) => [b.id, b])) as Record<string, PlaceBadge>;
export const growthBadgeById = Object.fromEntries(GROWTH_BADGES.map((b) => [b.id, b])) as Record<string, GrowthBadge>;
export const collectionItemById = Object.fromEntries(COLLECTION_ITEMS.map((i) => [i.id, i])) as Record<string, CollectionItem>;

export const DEFAULT_BLOXIAN_NAME = "Bloxian";
export const DEFAULT_PLACE_ID: PlaceId = "arrival_meadow";
```

### src/lib/bloxia/progress.ts

```ts
import { useEffect, useState, useCallback } from "react";
import {
  COLLECTION_ITEMS,
  DEFAULT_AVATAR_ID,
  DEFAULT_BLOXIAN_NAME,
  DEFAULT_PLACE_ID,
  GROWTH_BADGES,
  PLACES,
  PLACE_BADGES,
  avatarById,
  placeById,
  type PlaceId,
} from "./config";

const PROGRESS_KEY = "pec_bloxia_progress_v3";
const LOGS_KEY = "pec_bloxia_spending_logs_v3";
const BP_KEY = "pec_bloxia_bp_v3";

export interface Progress {
  bloxianName: string;
  selectedAvatarId: string;
  avatarSelectionCompleted: boolean;
  currentPlaceId: PlaceId;
  unlockedPlaceIds: PlaceId[];
  earnedPlaceBadgeIds: string[];
  unlockedGrowthBadgeIds: string[];
  favoriteBadgeIds: string[];
  collectedItemIds: string[];
  favoriteItemIds?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface SpendingLog {
  id: string;
  type:
    | "unlock_place"
    | "unlock_growth_badge"
    | "unlock_collection_item"
    | "earn_wordie"
    | "earn_talk";
  targetId: string;
  bpAmount: number;
  createdAt: number;
  label?: string;
}

const defaultProgress = (): Progress => ({
  bloxianName: DEFAULT_BLOXIAN_NAME,
  selectedAvatarId: DEFAULT_AVATAR_ID,
  avatarSelectionCompleted: false,
  currentPlaceId: DEFAULT_PLACE_ID,
  unlockedPlaceIds: [DEFAULT_PLACE_ID, "wonder_tree"],
  earnedPlaceBadgeIds: ["meadow_visitor", "wonder_tree_explorer"],
  unlockedGrowthBadgeIds: ["curious_explorer", "brave_learner"],
  favoriteBadgeIds: [
    "meadow_visitor",
    "wonder_tree_explorer",
    "curious_explorer",
    "brave_learner",
  ],
  collectedItemIds: [
    "collection_morning_dew_crystal",
    "collection_welcome_flower",
    "collection_glow_seed",
    "collection_wonder_leaf",
  ],
  favoriteItemIds: [
    "collection_morning_dew_crystal",
    "collection_welcome_flower",
    "collection_glow_seed",
    "collection_wonder_leaf",
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const demoLogs = (): SpendingLog[] => {
  const now = Date.now();
  const min = 60_000;
  return [
    { id: "seed_1", type: "unlock_collection_item", targetId: "collection_wonder_leaf", bpAmount: 50, createdAt: now - 5 * min },
    { id: "seed_2", type: "unlock_collection_item", targetId: "collection_glow_seed", bpAmount: 100, createdAt: now - 30 * min },
    { id: "seed_3", type: "unlock_growth_badge", targetId: "brave_learner", bpAmount: 300, createdAt: now - 2 * 60 * min },
    { id: "seed_4", type: "unlock_growth_badge", targetId: "curious_explorer", bpAmount: 300, createdAt: now - 6 * 60 * min },
    { id: "seed_5", type: "unlock_collection_item", targetId: "collection_welcome_flower", bpAmount: 80, createdAt: now - 20 * 60 * min },
    { id: "seed_6", type: "unlock_collection_item", targetId: "collection_morning_dew_crystal", bpAmount: 50, createdAt: now - 26 * 60 * min },
    { id: "seed_7", type: "unlock_place", targetId: "wonder_tree", bpAmount: 1000, createdAt: now - 30 * 60 * min },
    { id: "seed_8", type: "earn_wordie", targetId: "wordie", bpAmount: 120, createdAt: now - 2 * 24 * 60 * min, label: "Vocabulary Set 3" },
    { id: "seed_9", type: "earn_talk", targetId: "talk", bpAmount: 80, createdAt: now - 3 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_10", type: "earn_wordie", targetId: "wordie", bpAmount: 60, createdAt: now - 5 * 24 * 60 * min, label: "Review" },
    { id: "seed_11", type: "earn_talk", targetId: "talk", bpAmount: 100, createdAt: now - 8 * 24 * 60 * min, label: "Story time" },
    { id: "seed_12", type: "unlock_place", targetId: "arrival_meadow", bpAmount: 0, createdAt: now - 12 * 24 * 60 * min },
    // --- extra debug seeds (37) ---
    { id: "seed_13", type: "earn_wordie", targetId: "wordie", bpAmount: 40, createdAt: now - 13 * 24 * 60 * min, label: "Vocabulary Set 4" },
    { id: "seed_14", type: "earn_talk", targetId: "talk", bpAmount: 60, createdAt: now - 14 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_15", type: "earn_wordie", targetId: "wordie", bpAmount: 80, createdAt: now - 15 * 24 * 60 * min, label: "Review" },
    { id: "seed_16", type: "earn_talk", targetId: "talk", bpAmount: 50, createdAt: now - 16 * 24 * 60 * min, label: "Story time" },
    { id: "seed_17", type: "earn_wordie", targetId: "wordie", bpAmount: 90, createdAt: now - 17 * 24 * 60 * min, label: "Vocabulary Set 5" },
    { id: "seed_18", type: "earn_talk", targetId: "talk", bpAmount: 70, createdAt: now - 18 * 24 * 60 * min, label: "Conversation" },
    { id: "seed_19", type: "earn_wordie", targetId: "wordie", bpAmount: 55, createdAt: now - 19 * 24 * 60 * min, label: "Review" },
    { id: "seed_20", type: "earn_talk", targetId: "talk", bpAmount: 65, createdAt: now - 20 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_21", type: "earn_wordie", targetId: "wordie", bpAmount: 45, createdAt: now - 21 * 24 * 60 * min, label: "Vocabulary Set 6" },
    { id: "seed_22", type: "earn_talk", targetId: "talk", bpAmount: 85, createdAt: now - 22 * 24 * 60 * min, label: "Story time" },
    { id: "seed_23", type: "earn_wordie", targetId: "wordie", bpAmount: 95, createdAt: now - 23 * 24 * 60 * min, label: "Review" },
    { id: "seed_24", type: "earn_talk", targetId: "talk", bpAmount: 75, createdAt: now - 24 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_25", type: "earn_wordie", targetId: "wordie", bpAmount: 50, createdAt: now - 25 * 24 * 60 * min, label: "Vocabulary Set 7" },
    { id: "seed_26", type: "earn_talk", targetId: "talk", bpAmount: 90, createdAt: now - 26 * 24 * 60 * min, label: "Conversation" },
    { id: "seed_27", type: "earn_wordie", targetId: "wordie", bpAmount: 60, createdAt: now - 27 * 24 * 60 * min, label: "Review" },
    { id: "seed_28", type: "earn_talk", targetId: "talk", bpAmount: 55, createdAt: now - 28 * 24 * 60 * min, label: "Story time" },
    { id: "seed_29", type: "earn_wordie", targetId: "wordie", bpAmount: 70, createdAt: now - 29 * 24 * 60 * min, label: "Vocabulary Set 8" },
    { id: "seed_30", type: "earn_talk", targetId: "talk", bpAmount: 80, createdAt: now - 30 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_31", type: "earn_wordie", targetId: "wordie", bpAmount: 40, createdAt: now - 31 * 24 * 60 * min, label: "Review" },
    { id: "seed_32", type: "earn_talk", targetId: "talk", bpAmount: 100, createdAt: now - 32 * 24 * 60 * min, label: "Story time" },
    { id: "seed_33", type: "earn_wordie", targetId: "wordie", bpAmount: 65, createdAt: now - 33 * 24 * 60 * min, label: "Vocabulary Set 9" },
    { id: "seed_34", type: "earn_talk", targetId: "talk", bpAmount: 45, createdAt: now - 34 * 24 * 60 * min, label: "Conversation" },
    { id: "seed_35", type: "earn_wordie", targetId: "wordie", bpAmount: 85, createdAt: now - 35 * 24 * 60 * min, label: "Review" },
    { id: "seed_36", type: "earn_talk", targetId: "talk", bpAmount: 60, createdAt: now - 36 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_37", type: "earn_wordie", targetId: "wordie", bpAmount: 75, createdAt: now - 37 * 24 * 60 * min, label: "Vocabulary Set 10" },
    { id: "seed_38", type: "earn_talk", targetId: "talk", bpAmount: 55, createdAt: now - 38 * 24 * 60 * min, label: "Story time" },
    { id: "seed_39", type: "earn_wordie", targetId: "wordie", bpAmount: 90, createdAt: now - 39 * 24 * 60 * min, label: "Review" },
    { id: "seed_40", type: "earn_talk", targetId: "talk", bpAmount: 70, createdAt: now - 40 * 24 * 60 * min, label: "Conversation" },
    { id: "seed_41", type: "earn_wordie", targetId: "wordie", bpAmount: 50, createdAt: now - 41 * 24 * 60 * min, label: "Vocabulary Set 11" },
    { id: "seed_42", type: "earn_talk", targetId: "talk", bpAmount: 80, createdAt: now - 42 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_43", type: "earn_wordie", targetId: "wordie", bpAmount: 65, createdAt: now - 43 * 24 * 60 * min, label: "Review" },
    { id: "seed_44", type: "earn_talk", targetId: "talk", bpAmount: 95, createdAt: now - 44 * 24 * 60 * min, label: "Story time" },
    { id: "seed_45", type: "earn_wordie", targetId: "wordie", bpAmount: 45, createdAt: now - 45 * 24 * 60 * min, label: "Vocabulary Set 12" },
    { id: "seed_46", type: "earn_talk", targetId: "talk", bpAmount: 60, createdAt: now - 46 * 24 * 60 * min, label: "Conversation" },
    { id: "seed_47", type: "earn_wordie", targetId: "wordie", bpAmount: 85, createdAt: now - 47 * 24 * 60 * min, label: "Review" },
    { id: "seed_48", type: "earn_talk", targetId: "talk", bpAmount: 70, createdAt: now - 48 * 24 * 60 * min, label: "Daily practice" },
    { id: "seed_49", type: "earn_wordie", targetId: "wordie", bpAmount: 55, createdAt: now - 49 * 24 * 60 * min, label: "Vocabulary Set 13" },
  ];
};

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function useBloxia() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => defaultProgress());
  const [bp, setBp] = useState<number>(1000);
  const [logs, setLogs] = useState<SpendingLog[]>([]);

  useEffect(() => {
    const stored = safeRead<Partial<Progress> | null>(PROGRESS_KEY, null);
    const base = defaultProgress();
    const sanitizedName =
      stored?.bloxianName?.trim() && stored.bloxianName.trim() !== "Shirin"
        ? stored.bloxianName.trim()
        : DEFAULT_BLOXIAN_NAME;
    const merged: Progress = stored
      ? {
          ...base,
          ...stored,
          bloxianName: sanitizedName,
          selectedAvatarId:
            stored.selectedAvatarId && avatarById[stored.selectedAvatarId]
              ? stored.selectedAvatarId
              : base.selectedAvatarId,
          // Any persisted progress means the user has already seen the welcome
          // sheet at least once. Prevent regressions where a missing/false
          // flag re-opens the sheet on subsequent visits.
          avatarSelectionCompleted: true,
        }
      : base;
    setProgress(merged);
    setBp(safeRead(BP_KEY, 1000));
    setLogs(safeRead(LOGS_KEY, demoLogs()));
    setReady(true);
  }, []);

  const persist = useCallback((next: Progress) => {
    const withStamp = { ...next, updatedAt: Date.now() };
    safeWrite(PROGRESS_KEY, withStamp);
    setProgress(withStamp);
  }, []);

  const setBpAndSave = useCallback((next: number) => {
    safeWrite(BP_KEY, next);
    setBp(next);
  }, []);

  const appendLog = useCallback((log: SpendingLog) => {
    setLogs((prev) => {
      const next = [log, ...prev].slice(0, 200);
      safeWrite(LOGS_KEY, next);
      return next;
    });
  }, []);

  const earnBp = useCallback(
    (
      amount: number,
      source: "wordie" | "talk",
      label?: string,
    ): { ok: boolean } => {
      if (amount <= 0) return { ok: true };
      setBpAndSave(bp + amount);
      appendLog({
        id: `bloxia_earn_${Date.now()}_${source}`,
        type: source === "wordie" ? "earn_wordie" : "earn_talk",
        targetId: source,
        bpAmount: amount,
        createdAt: Date.now(),
        label,
      });
      return { ok: true };
    },
    [bp, setBpAndSave, appendLog],
  );

  const spend = useCallback(
    (
      amount: number,
      type: SpendingLog["type"],
      targetId: string,
    ): { ok: boolean; error?: "INSUFFICIENT_BP" } => {
      if (amount <= 0) return { ok: true };
      if (bp < amount) return { ok: false, error: "INSUFFICIENT_BP" };
      setBpAndSave(bp - amount);
      appendLog({
        id: `bloxia_${Date.now()}_${targetId}`,
        type,
        targetId,
        bpAmount: amount,
        createdAt: Date.now(),
      });
      return { ok: true };
    },
    [bp, setBpAndSave, appendLog],
  );

  const unlockPlace = useCallback(
    (placeId: PlaceId) => {
      const place = placeById[placeId];
      if (!place) return { ok: false, error: "NOT_FOUND" as const };
      if (progress.unlockedPlaceIds.includes(placeId)) return { ok: true };
      const r = spend(place.unlockBp, "unlock_place", placeId);
      if (!r.ok) return r;
      persist({
        ...progress,
        currentPlaceId: placeId,
        unlockedPlaceIds: uniq([...progress.unlockedPlaceIds, placeId]),
        earnedPlaceBadgeIds: uniq([...progress.earnedPlaceBadgeIds, place.placeBadgeId]),
      });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const setCurrentPlace = useCallback(
    (placeId: PlaceId) => {
      if (!progress.unlockedPlaceIds.includes(placeId)) return { ok: false, error: "LOCKED" as const };
      persist({ ...progress, currentPlaceId: placeId });
      return { ok: true };
    },
    [progress, persist],
  );

  const toggleFavorite = useCallback(
    (badgeId: string) => {
      const earned =
        progress.earnedPlaceBadgeIds.includes(badgeId) ||
        progress.unlockedGrowthBadgeIds.includes(badgeId);
      if (!earned) return { ok: false, error: "LOCKED" as const };
      const cur = progress.favoriteBadgeIds;
      const has = cur.includes(badgeId);
      persist({
        ...progress,
        favoriteBadgeIds: has ? cur.filter((id) => id !== badgeId) : uniq([...cur, badgeId]),
      });
      return { ok: true };
    },
    [progress, persist],
  );

  const unlockCollectionItem = useCallback(
    (itemId: string) => {
      const item = COLLECTION_ITEMS.find((i) => i.id === itemId);
      if (!item) return { ok: false, error: "NOT_FOUND" as const };
      if (!progress.unlockedPlaceIds.includes(item.placeId)) return { ok: false, error: "PLACE_LOCKED" as const };
      if (progress.collectedItemIds.includes(itemId)) return { ok: true };
      const r = spend(item.bpCost, "unlock_collection_item", itemId);
      if (!r.ok) return r;
      persist({ ...progress, collectedItemIds: uniq([...progress.collectedItemIds, itemId]) });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const toggleFavoriteItem = useCallback(
    (itemId: string) => {
      if (!progress.collectedItemIds.includes(itemId)) return { ok: false, error: "LOCKED" as const };
      const cur = progress.favoriteItemIds ?? [];
      const has = cur.includes(itemId);
      persist({
        ...progress,
        favoriteItemIds: has ? cur.filter((id) => id !== itemId) : uniq([...cur, itemId]),
      });
      return { ok: true };
    },
    [progress, persist],
  );

  const unlockGrowthBadge = useCallback(
    (badgeId: string) => {
      const badge = GROWTH_BADGES.find((b) => b.id === badgeId);
      if (!badge) return { ok: false, error: "NOT_FOUND" as const };
      if (progress.unlockedGrowthBadgeIds.includes(badgeId)) return { ok: true };
      const r = spend(badge.bpCost, "unlock_growth_badge", badgeId);
      if (!r.ok) return r;
      persist({
        ...progress,
        unlockedGrowthBadgeIds: uniq([...progress.unlockedGrowthBadgeIds, badgeId]),
      });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const updateName = useCallback(
    (name: string) => {
      persist({ ...progress, bloxianName: name.trim() || DEFAULT_BLOXIAN_NAME });
    },
    [progress, persist],
  );

  const selectAvatar = useCallback(
    (avatarId: string) => {
      if (!avatarById[avatarId]) return { ok: false, error: "NOT_FOUND" as const };
      persist({
        ...progress,
        selectedAvatarId: avatarId,
        avatarSelectionCompleted: true,
      });
      return { ok: true };
    },
    [progress, persist],
  );

  const completeWelcome = useCallback(
    (avatarId: string, name: string) => {
      if (!avatarById[avatarId]) return { ok: false, error: "NOT_FOUND" as const };
      persist({
        ...progress,
        selectedAvatarId: avatarId,
        avatarSelectionCompleted: true,
        bloxianName: name.trim() || DEFAULT_BLOXIAN_NAME,
      });
      return { ok: true };
    },
    [progress, persist],
  );

  return {
    ready,
    progress,
    bp,
    logs,
    selectedAvatar:
      avatarById[progress.selectedAvatarId] ?? avatarById[DEFAULT_AVATAR_ID],
    unlockPlace,
    setCurrentPlace,
    toggleFavorite,
    unlockCollectionItem,
    toggleFavoriteItem,
    unlockGrowthBadge,
    updateName,
    selectAvatar,
    completeWelcome,
    earnBp,
    totals: {
      places: PLACES.length,
      placeBadges: PLACE_BADGES.length,
      growthBadges: GROWTH_BADGES.length,
      collectionItems: COLLECTION_ITEMS.length,
    },
  };
}

export function nextPlace(progress: Progress) {
  return PLACES.filter((p) => !progress.unlockedPlaceIds.includes(p.id))
    .sort((a, b) => a.unlockBp - b.unlockBp)[0];
}

export function calculateStreakDays(logs: SpendingLog[]): number {
  const days = Array.from(
    new Set(logs.map((l) => new Date(l.createdAt).toISOString().slice(0, 10))),
  ).sort().reverse();
  if (!days.length) return 0;
  let streak = 0;
  const cursor = new Date(days[0] + "T00:00:00");
  for (const day of days) {
    const expected = cursor.toISOString().slice(0, 10);
    if (day !== expected) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
```

### src/lib/config.server.ts

```ts
import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
// (e.g. `const x = process.env.X`) resolve to undefined — always read
// process.env INSIDE a function or handler.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline process.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}

```

### src/lib/error-capture.ts

```ts
// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

```

### src/lib/error-page.ts

```ts
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}

```

### src/lib/lovable-error-reporting.ts

```ts
type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
  }
}

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}

```

### src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

### src/router.tsx

```tsx
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

```

### src/routes/__root.tsx

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Paisley EC — English for Kids" },
      { name: "description", content: "ShirinTalk, myWordie and Bloxia — a playful English learning world for 7–12 year-olds." },
      { property: "og:site_name", content: "Paisley EC" },
      { property: "og:title", content: "Paisley EC — English for Kids" },
      { property: "og:description", content: "ShirinTalk, myWordie and Bloxia — a playful English learning world for 7–12 year-olds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Press+Start+2P&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

```

### src/routes/about.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PEC — Paisley EC" },
      { name: "description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
      { property: "og:title", content: "About PEC — Paisley EC" },
      { property: "og:description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
    ],
  }),
  component: AboutPage,
});

const services = [
  {
    title: "ShirinTalk",
    desc: "定制AI口语互动伙伴，通过温和而循序渐进的引导式对话，帮助孩子建立每日开口说英语的自信心。在此过程中，Shirin会鼓励孩子用完整、简洁的英语句子作答，并友善地纠正语法或用词错误，让口语练习更自然、更高效。",
  },
  {
    title: "Smart Reading",
    desc: "一套卓越的原版分级阅读项目，在同类项目中表现尤为突出。学习者可根据自身需求灵活选择线上或线下模式进行阅读训练，有效提升英语阅读理解能力。",
  },
  {
    title: "myON Reader",
    desc: "专为儿童设计的全球最大规模数字图书馆，内含丰富多样的英语原版读物。该平台尤其适合家庭环境下的广泛阅读实践，帮助孩子在家长的陪伴下养成良好的课外阅读习惯。",
  },
  {
    title: "Home School Resources",
    desc: "提供分级搭配的动画等视频内容，专门为家长在家支持孩子学习而设计。这些资源以趣味性和自然习得的方式，帮助孩子轻松迈出英语学习的第一步。",
  },
  {
    title: "Personalized Learning Plans",
    desc: "基于一对一专业咨询，为每一位学习者量身定制符合其独特需求和能力水平的学习方案，确保学习过程更具针对性与成效。",
  },
];

const contactItems = [
  { label: "Website", value: "Coming soon" },
  { label: "Email", value: "Coming soon" },
  { label: "WeChat", value: "Coming soon" },
];

const PAISLEY_BLUE = "var(--paisley)";
const DEEP_NAVY = "#0B2545";

function AboutPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-[calc(100dvh)]">
        <FloatingBack to="/profile" />

        <main className="px-8 pt-14 pb-10 overflow-y-auto">
          {/* Intro */}
          <section className="mb-7">
            <p
              className="text-[15px] leading-[1.55] font-normal"
              style={{ color: "#000000" }}
            >
              <img
                src={paisleyLogo.url}
                alt="PEC"
                className="inline-block h-[1em] w-auto object-contain"
                style={{
                  filter: "grayscale(100%) brightness(0)",
                  verticalAlign: "-0.12em",
                  marginRight: "0.2em",
                }}
              />
              （简称PEC）是一家专业的英语教育工作室，致力于为低龄英语学习者提供全方位的语言学习支持服务。其核心项目与资源包括：
            </p>
          </section>

          {/* Service Cards */}
          <section className="flex flex-col gap-6 mb-7">
            {services.map((s) => (
              <article
                key={s.title}
                className="rounded-[22px] bg-white p-6"
                style={{
                  boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
                }}
              >
                <h2
                  className="text-[17px] font-semibold leading-[1.25] mb-3"
                  style={{ color: PAISLEY_BLUE }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-[15px] font-normal leading-[1.5]"
                  style={{ color: "#000000" }}
                >
                  {s.desc}
                </p>
              </article>
            ))}
          </section>

          {/* Contact Card */}
          <section
            className="rounded-[22px] bg-white p-6"
            style={{
              boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
            }}
          >
            <h2
              className="text-[17px] font-semibold leading-[1.25] mb-4"
              style={{ color: PAISLEY_BLUE }}
            >
              Contact Us
            </h2>
            <div className="flex flex-col">
              {contactItems.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-6 py-4"
                  style={{
                    borderBottom:
                      i < contactItems.length - 1
                        ? "1px solid rgba(1, 70, 185, 0.08)"
                        : "none",
                  }}
                >
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: DEEP_NAVY }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-[15px] font-normal"
                    style={{ color: "#50627A" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </PhoneFrame>
  );
}

```

### src/routes/admin.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "管理员后台 — Paisley EC" },
      { name: "description", content: "前端参数管理中心。" },
    ],
  }),
  component: AdminPage,
});

type AdminParam = {
  path: string;
  label: string;
  value: string | number | boolean;
  valueText: string;
  defaultText: string;
  type: "string" | "number" | "boolean";
  customized: boolean;
  helpText: string;
  options?: Array<{ label: string; value: string }>;
};

type AdminGroup = {
  key: string;
  title: string;
  subtitle: string;
  rows: AdminParam[];
};

const NAVY = "#0B2545";
const MUTED = "#8A97A6";
const SUB = "#50627A";
const SOFT_BG = "#F6F8FC";
const ACTIVE_BG = "#EAF3FF";
const SUMMARY_BG = "#F7FAFF";
const BORDER = "#EEF3FA";
const PAISLEY = "#0146B9";
const YELLOW = "#cdae8d";
const YELLOW_SOFT = "#f7f2ec";
const YELLOW_BORDER = "#ebd9c2";

// ===== Smart Reading content types & management data =====
type SRUnit = {
  lesson_id: string;
  unit_number: number;
  story_title: string;
  cover_question: string;
  content_license: "authorized" | "summary_only" | "metadata_only" | "unknown";
  reading_focus: string;
  keywords: string[];
  characters: string[];
  speaking_goals: string[];
  target_sentences: string[];
  oral_questions: { question: string }[];
  retelling_frame: string;
  shirin_opening: string;
};
type SRBook = {
  book_code: string;
  series_name: string;
  book_title: string;
  cefr_range: string;
  lexile_range: string;
  word_count_range: string;
  sort_order: number;
  updated_at: string;
  content_license: string;
  unit_count: number;
  units: SRUnit[];
};
type SRBookForm = {
  bookCode: string;
  bookTitle: string;
  cefrRange: string;
  lexileMin: string;
  lexileMax: string;
  wordCountRange: string;
  sortOrder: string;
  updatedAt: string;
  contentLicense: string;
};
type SRUnitForm = {
  lessonId: string;
  storyTitle: string;
  coverQuestion: string;
  contentLicense: SRUnit["content_license"];
  readingFocus: string;
  keywordsText: string;
  targetSentencesText: string;
  speakingGoalsText: string;
  retellingFrame: string;
  shirinOpening: string;
};

const SR_CEFR_OPTIONS = ["PreA1-A1","PreA1","A1","A1-A2","A2","A2-B1","B1","B1-B2","B2"];
const SR_LICENSE_OPTIONS: SRUnit["content_license"][] = ["authorized","summary_only","metadata_only","unknown"];

const INITIAL_SR_BOOKS: SRBook[] = [
  {
    book_code: "SR-PA1-01",
    series_name: "Smart Reading",
    book_title: "Hello, Sunny Day",
    cefr_range: "PreA1-A1",
    lexile_range: "BR-100L",
    word_count_range: "50",
    sort_order: 1,
    updated_at: "2026-06-10",
    content_license: "authorized",
    unit_count: 3,
    units: [
      {
        lesson_id: "SR-PA1-01-U01",
        unit_number: 1,
        story_title: "A Big Red Apple",
        cover_question: "What color is the apple?",
        content_license: "authorized",
        reading_focus: "Identify colors and simple nouns in a short story.",
        keywords: ["apple","red","big","tree"],
        characters: ["Mia","Dad"],
        speaking_goals: ["Name three colors","Use 'I see a ___'"],
        target_sentences: ["I see a big red apple.","The apple is on the tree."],
        oral_questions: [{ question: "What does Mia see?" }, { question: "Where is the apple?" }],
        retelling_frame: "First ___ . Then ___ . Finally ___ .",
        shirin_opening: "Hi! Today let's read about Mia and a big red apple. Ready?",
      },
      {
        lesson_id: "SR-PA1-01-U02",
        unit_number: 2,
        story_title: "My Little Cat",
        cover_question: "Where is the cat?",
        content_license: "authorized",
        reading_focus: "Use prepositions of place (on, in, under).",
        keywords: ["cat","box","sleep","little"],
        characters: ["Lily","Cat"],
        speaking_goals: ["Use 'on / in / under'"],
        target_sentences: ["The cat is in the box.","The cat can sleep."],
        oral_questions: [{ question: "Where is the cat?" }],
        retelling_frame: "There is a ___ . It is ___ .",
        shirin_opening: "Meow! Let's find Lily's little cat together.",
      },
      {
        lesson_id: "SR-PA1-01-U03",
        unit_number: 3,
        story_title: "Rainy Park",
        cover_question: "What is the weather like?",
        content_license: "summary_only",
        reading_focus: "Weather words and feelings.",
        keywords: ["rain","umbrella","park","wet"],
        characters: ["Tom"],
        speaking_goals: ["Describe weather"],
        target_sentences: ["It is rainy today.","Tom has an umbrella."],
        oral_questions: [{ question: "How is the weather?" }],
        retelling_frame: "It is ___ . Tom ___ .",
        shirin_opening: "It's raining! Let's see what Tom does in the park.",
      },
    ],
  },
  {
    book_code: "SR-A1-02",
    series_name: "Smart Reading",
    book_title: "Around My Town",
    cefr_range: "A1",
    lexile_range: "100L-250L",
    word_count_range: "100",
    sort_order: 2,
    updated_at: "2026-05-22",
    content_license: "authorized",
    unit_count: 2,
    units: [
      {
        lesson_id: "SR-A1-02-U01",
        unit_number: 1,
        story_title: "At the Bakery",
        cover_question: "What do you buy at a bakery?",
        content_license: "authorized",
        reading_focus: "Food vocabulary and polite requests.",
        keywords: ["bread","cake","buy","please"],
        characters: ["Ana","Baker"],
        speaking_goals: ["Use 'Can I have ___, please?'"],
        target_sentences: ["Can I have a small cake, please?","Thank you very much."],
        oral_questions: [{ question: "What does Ana buy?" }],
        retelling_frame: "Ana goes to ___ . She buys ___ .",
        shirin_opening: "Yum! Let's go to the bakery with Ana.",
      },
      {
        lesson_id: "SR-A1-02-U02",
        unit_number: 2,
        story_title: "On the Bus",
        cover_question: "Where is Ben going?",
        content_license: "authorized",
        reading_focus: "Talking about places and directions.",
        keywords: ["bus","school","stop","go"],
        characters: ["Ben","Driver"],
        speaking_goals: ["Ask 'Where is ___?'"],
        target_sentences: ["The bus goes to school.","Ben sits near the window."],
        oral_questions: [{ question: "Where does the bus go?" }],
        retelling_frame: "Ben takes ___ . He goes to ___ .",
        shirin_opening: "All aboard! Let's ride the bus with Ben.",
      },
    ],
  },
];

function stripLexileSuffix(v: string) {
  return String(v || "").replace(/L/gi, "").trim();
}
function splitLexileRange(v: string) {
  const parts = String(v || "").trim().split("-");
  return { lexileMin: stripLexileSuffix(parts[0] || ""), lexileMax: stripLexileSuffix(parts[1] || "") };
}
function buildLexileRange(min: string, max: string) {
  const a = stripLexileSuffix(min);
  const b = stripLexileSuffix(max);
  if (a && b) return `${a}L-${b}L`;
  if (a) return `${a}L`;
  if (b) return `${b}L`;
  return "";
}
function toIsoDate(value: string) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const m = text.match(/^(\d{1,2})-(\d{1,2})-(\d{2}|\d{4})$/);
  if (!m) return text;
  const y = m[3].length === 2 ? "20" + m[3] : m[3];
  return `${y}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}
function toUsShortDate(value: string) {
  const m = String(value || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  return `${m[2]}-${m[3]}-${m[1].slice(-2)}`;
}
function srBookToForm(b: SRBook): SRBookForm {
  const lex = splitLexileRange(b.lexile_range || "");
  return {
    bookCode: b.book_code,
    bookTitle: b.book_title,
    cefrRange: b.cefr_range,
    lexileMin: lex.lexileMin,
    lexileMax: lex.lexileMax,
    wordCountRange: b.word_count_range,
    sortOrder: String(b.sort_order),
    updatedAt: toIsoDate(b.updated_at || new Date().toISOString().slice(0, 10)),
    contentLicense: b.content_license,
  };
}
function srUnitToForm(u: SRUnit): SRUnitForm {
  return {
    lessonId: u.lesson_id,
    storyTitle: u.story_title,
    coverQuestion: u.cover_question,
    contentLicense: u.content_license,
    readingFocus: u.reading_focus,
    keywordsText: u.keywords.join("\n"),
    targetSentencesText: u.target_sentences.join("\n"),
    speakingGoalsText: u.speaking_goals.join("\n"),
    retellingFrame: u.retelling_frame,
    shirinOpening: u.shirin_opening,
  };
}
function linesToArr(s: string) {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

const INITIAL_GROUPS: AdminGroup[] = [
  {
    key: "system",
    title: "系统与隐藏入口",
    subtitle: "版本号、后台入口、安全点击规则、发布通道。",
    rows: [
      { path: "system.appVersion", label: "应用版本号", value: "1.0.0", valueText: "1.0.0", defaultText: "1.0.0", type: "string", customized: false, helpText: "控制前端显示的应用版本号。" },
      { path: "system.releaseChannel", label: "发布通道", value: "mock", valueText: "Mock 原型", defaultText: "Mock 原型", type: "string", customized: true, helpText: "用于标记当前运行通道。", options: [
        { label: "Mock 原型", value: "mock" },
        { label: "开发", value: "dev" },
        { label: "测试", value: "test" },
        { label: "预发布", value: "staging" },
        { label: "正式", value: "release" },
      ]},
      { path: "system.adminEntryTaps", label: "后台入口点击次数", value: 5, valueText: "5", defaultText: "5", type: "number", customized: false, helpText: "在 About PEC 上连续点击多少次进入后台。" },
      { path: "system.adminEntryWindowMs", label: "点击窗口 (毫秒)", value: 1500, valueText: "1500", defaultText: "1500", type: "number", customized: false, helpText: "连续点击的有效时间窗口。" },
    ],
  },
  {
    key: "profileDefaults",
    title: "用户资料默认值",
    subtitle: "新用户首次进入时的资料默认值。",
    rows: [
      { path: "profileDefaults.cefrLevel", label: "默认 CEFR 等级", value: "A2", valueText: "A2", defaultText: "A2", type: "string", customized: false, helpText: "新用户默认的 CEFR 等级。", options: ["A1","A2","B1","B2","C1","C2"].map((v)=>({label:v,value:v})) },
      { path: "profileDefaults.dailyGoalMinutes", label: "默认每日目标 (分钟)", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "新用户默认每日学习目标。" },
    ],
  },
  {
    key: "parentPreferences",
    title: "家长设置默认值",
    subtitle: "家长页里语速、提醒、音频、触感等默认开关。",
    rows: [
      { path: "parentPreferences.autoPlayWordAudio", label: "自动播放单词音频", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "控制单词音频是否默认自动播放。" },
      { path: "parentPreferences.speechRate", label: "语音语速", value: 0.8, valueText: "0.8", defaultText: "0.8", type: "number", customized: false, helpText: "控制语音播放速度。" },
      { path: "parentPreferences.hapticsEnabled", label: "触感反馈", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用触感反馈。" },
      { path: "parentPreferences.dailyReminder", label: "每日提醒", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "是否启用每日学习提醒。" },
    ],
  },
  {
    key: "shirinTalk",
    title: "ShirinTalk 对话参数",
    subtitle: "对话长度、随机性、模型温度。",
    rows: [
      { path: "shirinTalk.maxTurns", label: "最大轮次", value: 12, valueText: "12", defaultText: "12", type: "number", customized: false, helpText: "单次会话最大对话轮次。" },
      { path: "shirinTalk.temperature", label: "模型温度", value: 0.7, valueText: "0.7", defaultText: "0.7", type: "number", customized: true, helpText: "控制生成内容的随机性。" },
    ],
  },
  {
    key: "practiceGoals",
    title: "练习目标",
    subtitle: "每日 / 每周练习目标默认值。",
    rows: [
      { path: "practiceGoals.dailyTalk", label: "每日 ShirinTalk 目标", value: 1, valueText: "1", defaultText: "1", type: "number", customized: false, helpText: "每日 ShirinTalk 会话次数。" },
      { path: "practiceGoals.dailyWordie", label: "每日 myWordie 目标", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "每日单词练习数量。" },
    ],
  },
  {
    key: "wordieDaily",
    title: "myWordie 每日计划",
    subtitle: "新词、复习、上限。",
    rows: [
      { path: "wordieDaily.newWords", label: "每日新词数", value: 6, valueText: "6", defaultText: "6", type: "number", customized: false, helpText: "每日推送的新词数量。" },
      { path: "wordieDaily.reviewCap", label: "每日复习上限", value: 40, valueText: "40", defaultText: "40", type: "number", customized: false, helpText: "每日复习的最大数量。" },
    ],
  },
  {
    key: "bpCaps",
    title: "Bp 每日上限",
    subtitle: "各模块每日 Bp 上限。",
    rows: [
      { path: "bpCaps.shirinTalk", label: "ShirinTalk 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "ShirinTalk 每日 Bp 上限。" },
      { path: "bpCaps.myWordie", label: "myWordie 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "myWordie 每日 Bp 上限。" },
    ],
  },
  {
    key: "effort",
    title: "高努力触发线",
    subtitle: "判定高努力会话的阈值。",
    rows: [
      { path: "effort.minDurationSec", label: "最少时长 (秒)", value: 180, valueText: "180", defaultText: "180", type: "number", customized: false, helpText: "高努力会话的最少时长。" },
    ],
  },
  {
    key: "shirinTalkBp",
    title: "ShirinTalk Bp 规则",
    subtitle: "每轮、每分钟、奖励倍率。",
    rows: [
      { path: "shirinTalkBp.perTurn", label: "每轮 Bp", value: 4, valueText: "4", defaultText: "4", type: "number", customized: false, helpText: "ShirinTalk 每轮获得 Bp。" },
    ],
  },
  {
    key: "wordieBp",
    title: "myWordie Bp 规则",
    subtitle: "记忆、复习、连击奖励。",
    rows: [
      { path: "wordieBp.perWord", label: "每词 Bp", value: 2, valueText: "2", defaultText: "2", type: "number", customized: false, helpText: "每记一个新词得 Bp。" },
    ],
  },
  {
    key: "rewards",
    title: "奖励预设",
    subtitle: "奖励名称、价格。",
    rows: [
      { path: "rewards.enabled", label: "启用奖励", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用奖励系统。" },
    ],
  },
  {
    key: "wordieTest",
    title: "Wordie Test 规则",
    subtitle: "题量、通过分数。",
    rows: [
      { path: "wordieTest.questionCount", label: "题目数量", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "Wordie Test 的题目数量。" },
    ],
  },
  {
    key: "cefrTest",
    title: "CEFR Test 规则",
    subtitle: "题量、自适应步进。",
    rows: [
      { path: "cefrTest.questionCount", label: "题目数量", value: 30, valueText: "30", defaultText: "30", type: "number", customized: false, helpText: "CEFR Test 的题目数量。" },
    ],
  },
  {
    key: "bloxiaPrice",
    title: "Bloxia 消费价格",
    subtitle: "商店物品价格。",
    rows: [
      { path: "bloxiaPrice.seed", label: "种子价格", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "种子的 Bp 价格。" },
    ],
  },
  {
    key: "bloxiaStage",
    title: "Bloxia 植物阶段",
    subtitle: "成长所需 Bp。",
    rows: [
      { path: "bloxiaStage.sprout", label: "发芽阈值", value: 50, valueText: "50", defaultText: "50", type: "number", customized: false, helpText: "进入发芽阶段所需 Bp。" },
    ],
  },
  {
    key: "display",
    title: "显示与图表",
    subtitle: "图表颜色、动效、密度。",
    rows: [
      { path: "display.weekStartsOnMonday", label: "周一为一周开始", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "日历是否以周一为一周开始。" },
      { path: "display.compactMode", label: "紧凑模式", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "启用更紧凑的卡片间距。" },
    ],
  },
];

function customizedCount(group: AdminGroup) {
  return group.rows.filter((r) => r.customized).length;
}

function formatValueText(param: AdminParam, raw: string): string {
  if (param.options) {
    return param.options.find((o) => o.value === raw)?.label ?? raw;
  }
  if (param.type === "boolean") return raw === "true" ? "开启" : "关闭";
  return raw;
}

function AdminPage() {
  return <AdminPageInner />;
}

function SRView(props: {
  srBooks: SRBook[];
  srActiveBook: SRBook | null;
  srActiveUnit: SRUnit | null;
  srActiveBookCode: string;
  srActiveLessonId: string;
  srSource: "default" | "admin";
  srTotalUnits: number;
  setSrActiveBookCode: (v: string) => void;
  setSrActiveLessonId: (v: string) => void;
  onImport: () => void;
  onClear: () => void;
  onEditBook: () => void;
  onEditUnit: () => void;
}) {
  const NAVY_C = "#0B2545";
  const MUTED_C = "#8A97A6";
  const SUB_C = "#50627A";
  const YELLOW_C = "#cdae8d";
  const YELLOW_SOFT_C = "#f7f2ec";
  const YELLOW_BORDER_C = "#ebd9c2";
  const {
    srBooks, srActiveBook, srActiveUnit, srActiveBookCode, srActiveLessonId,
    srSource, srTotalUnits, setSrActiveBookCode, setSrActiveLessonId,
    onImport, onClear, onEditBook, onEditUnit,
  } = props;
  const isAdmin = srSource === "admin";

  const Section = ({ title, count, action }: { title: string; count?: string; action?: React.ReactNode }) => (
    <div className="flex items-baseline justify-between mt-6 mb-2.5">
      <div className="flex items-baseline gap-2 min-w-0">
        <h3 className="text-[15px] font-semibold leading-tight truncate" style={{ color: NAVY_C }}>{title}</h3>
        {count && <span className="text-[12px] shrink-0" style={{ color: MUTED_C }}>{count}</span>}
      </div>
      {action}
    </div>
  );

  const aiContext = srActiveBook && srActiveUnit ? {
    book: srActiveBook.book_title,
    book_code: srActiveBook.book_code,
    cefr: srActiveBook.cefr_range,
    lexile: srActiveBook.lexile_range,
    unit: srActiveUnit.unit_number,
    story_title: srActiveUnit.story_title,
    cover_question: srActiveUnit.cover_question,
    reading_focus: srActiveUnit.reading_focus,
    keywords: srActiveUnit.keywords,
    characters: srActiveUnit.characters,
    speaking_goals: srActiveUnit.speaking_goals,
    target_sentences: srActiveUnit.target_sentences,
    oral_questions: srActiveUnit.oral_questions,
    retelling_frame: srActiveUnit.retelling_frame,
    shirin_opening: srActiveUnit.shirin_opening,
  } : null;

  return (
    <div className="mt-4">
      {/* Status strip — quiet, no dots, no heavy fonts */}
      <div className="rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3" style={{ background: "#FAFBFD", border: "1px solid #EEF2F7" }}>
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-[11px]" style={{ color: MUTED_C }}>来源</span>
          <span className="text-[13px] font-medium" style={{ color: NAVY_C }}>{isAdmin ? "Admin 导入" : "默认代码"}</span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-[11px]" style={{ color: MUTED_C }}>规模</span>
          <span className="text-[13px] font-medium" style={{ color: NAVY_C }}>
            {srBooks.length} 本 · {srTotalUnits} 单元
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={onImport}
          className="h-10 rounded-xl text-[13px] font-semibold text-white"
          style={{ background: YELLOW_C }}
        >
          导入 JSON
        </button>
        <button
          onClick={onClear}
          className="h-10 rounded-xl text-[13px] font-semibold"
          style={{ background: "#fff", color: NAVY_C, border: `1px solid ${YELLOW_BORDER_C}` }}
        >
          清除导入
        </button>
      </div>

      {/* Books — full-width grid */}
      <Section title="书籍" count={`${srBooks.length} 本`} />
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(srBooks.length, 1)}, minmax(0, 1fr))` }}>
        {srBooks.map((b) => {
          const active = b.book_code === srActiveBookCode;
          return (
            <button
              key={b.book_code}
              onClick={() => {
                setSrActiveBookCode(b.book_code);
                setSrActiveLessonId(b.units[0]?.lesson_id ?? "");
              }}
              className="rounded-xl px-3 py-2.5 text-left transition-all"
              style={{
                background: active ? YELLOW_SOFT_C : "#fff",
                color: NAVY_C,
                border: `1px solid ${active ? YELLOW_BORDER_C : "#E6ECF5"}`,
                boxShadow: "none",
              }}
            >
              <div className="text-[14px] font-semibold leading-tight truncate">{b.book_title}</div>
              <div className="text-[12px] mt-1 truncate" style={{ color: MUTED_C }}>
                {b.cefr_range} · {b.lexile_range} · {b.word_count_range}w
              </div>
            </button>
          );
        })}
      </div>

      {/* Book info */}
      {srActiveBook && (
        <>
          <Section
            title="书籍信息"
            action={
              <button onClick={onEditBook} className="h-[26px] px-3 rounded-full text-[12px] font-medium text-white" style={{ background: YELLOW_C }}>编辑</button>
            }
          />
          <div className="rounded-2xl bg-white p-4" style={{ border: "1px solid #EEF2F7" }}>
            <div className="text-[17px] font-semibold leading-tight" style={{ color: NAVY_C }}>{srActiveBook.book_title}</div>
            <div className="text-[12px] mt-1" style={{ color: MUTED_C }}>{srActiveBook.series_name} · {srActiveBook.book_code}</div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                ["CEFR", srActiveBook.cefr_range],
                ["Lexile", srActiveBook.lexile_range],
                ["Words", srActiveBook.word_count_range],
                ["排序", String(srActiveBook.sort_order)],
                ["更新日期", toUsShortDate(srActiveBook.updated_at)],
                ["授权", srActiveBook.content_license],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px]" style={{ color: MUTED_C }}>{k}</div>
                  <div className="text-[13px] font-medium mt-0.5 break-all" style={{ color: NAVY_C }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Unit list */}
      {srActiveBook && (
        <>
          <Section title="单元" count={`${srActiveBook.units.length} 个`} />
          <div className="space-y-2.5">
            {srActiveBook.units.map((u) => {
              const active = u.lesson_id === srActiveLessonId;
              return (
                <button
                  key={u.lesson_id}
                  onClick={() => setSrActiveLessonId(u.lesson_id)}
                  className="w-full flex items-stretch text-left rounded-full overflow-hidden active:scale-[0.98] transition-transform"
                  style={{
                    background: active ? YELLOW_SOFT_C : "#fff",
                    border: `1px solid ${active ? YELLOW_BORDER_C : "#EEF2F7"}`,
                  }}
                >
                  <div
                    className="h-11 w-11 shrink-0 grid place-items-center my-2 ml-2 rounded-full text-[15px] font-semibold"
                    style={{ background: active ? YELLOW_C : YELLOW_SOFT_C, color: active ? "#fff" : NAVY_C }}
                  >
                    {u.unit_number}
                  </div>
                  <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                    <p className="text-[15px] font-semibold tracking-tight leading-tight truncate" style={{ color: NAVY_C, letterSpacing: "-0.01em" }}>
                      {u.story_title}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium truncate" style={{ color: MUTED_C }}>
                      {u.cover_question}
                    </p>
                  </div>
                  <div className="shrink-0 pr-4 pl-1 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? YELLOW_C : "#C8D2E0"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Unit preview */}
      {srActiveUnit && (
        <>
          <Section
            title="单元预览"
            action={
              <button onClick={onEditUnit} className="h-[26px] px-3 rounded-full text-[12px] font-medium text-white" style={{ background: YELLOW_C }}>编辑</button>
            }
          />
          <div className="rounded-2xl bg-white p-4" style={{ border: "1px solid #EEF2F7" }}>
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[15px] font-semibold" style={{ background: YELLOW_SOFT_C, color: NAVY_C }}>U{srActiveUnit.unit_number}</div>
              <div className="min-w-0">
                <div className="text-[11px]" style={{ color: MUTED_C }}>{srActiveBook?.book_code} · {srActiveUnit.lesson_id}</div>
                <div className="text-[16px] font-semibold leading-tight mt-0.5 truncate" style={{ color: NAVY_C }}>{srActiveUnit.story_title}</div>
              </div>
            </div>
            <div className="mt-4 space-y-3.5">
              {[
                ["Cover Question", srActiveUnit.cover_question],
                ["Reading Focus", srActiveUnit.reading_focus],
                ["Keywords", srActiveUnit.keywords.join(" · ")],
                ["Characters", srActiveUnit.characters.join(" · ")],
                ["Speaking Goals", srActiveUnit.speaking_goals.join(" · ")],
                ["Target Sentences", srActiveUnit.target_sentences.join(" · ")],
                ["Oral Questions", srActiveUnit.oral_questions.map((q) => q.question).join(" · ")],
                ["Retelling Frame", srActiveUnit.retelling_frame],
                ["Shirin Opening", srActiveUnit.shirin_opening],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px]" style={{ color: MUTED_C }}>{k}</div>
                  <div className="text-[14px] mt-1 leading-relaxed" style={{ color: NAVY_C }}>{v || "—"}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-baseline justify-between mt-6 mb-2.5">
            <h3 className="text-[13px] font-medium leading-tight" style={{ color: SUB_C }}>AI Context Preview</h3>
            <span className="text-[11px]" style={{ color: MUTED_C }}>context.json</span>
          </div>
          <pre className="rounded-2xl p-4 text-[11px] leading-relaxed overflow-x-auto" style={{ background: "#F5F7FB", color: NAVY_C, border: "1px solid #E6ECF5", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
{JSON.stringify(aiContext, null, 2)}
          </pre>
        </>
      )}

      <div className="mt-5 text-[12px] text-center" style={{ color: MUTED_C }}>
        内容由 Admin Console 统一管理。修改会标记为 Admin 导入。
      </div>
    </div>
  );
}

function AdminPageInner() {
  const [groups, setGroups] = useState<AdminGroup[]>(INITIAL_GROUPS);
  const [activeKey, setActiveKey] = useState<string>("system");
  const [editing, setEditing] = useState<AdminParam | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [helpFor, setHelpFor] = useState<AdminParam | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");

  // ===== Mode switch & Smart Reading state =====
  const [mode, setMode] = useState<"params" | "smartReading">("params");
  const [srBooks, setSrBooks] = useState<SRBook[]>(INITIAL_SR_BOOKS);
  const [srSource, setSrSource] = useState<"default" | "admin">("default");
  const [srActiveBookCode, setSrActiveBookCode] = useState<string>(INITIAL_SR_BOOKS[0]?.book_code ?? "");
  const [srActiveLessonId, setSrActiveLessonId] = useState<string>(INITIAL_SR_BOOKS[0]?.units[0]?.lesson_id ?? "");
  const [srImportOpen, setSrImportOpen] = useState(false);
  const [srImportText, setSrImportText] = useState("");
  const [srValidationText, setSrValidationText] = useState("");
  const [srValidationOk, setSrValidationOk] = useState<boolean | null>(null);
  const [srConfirmClear, setSrConfirmClear] = useState(false);
  const [srBookEditForm, setSrBookEditForm] = useState<SRBookForm | null>(null);
  const [srUnitEditForm, setSrUnitEditForm] = useState<SRUnitForm | null>(null);
  const [srCefrPickerOpen, setSrCefrPickerOpen] = useState(false);
  const [srLicensePickerOpen, setSrLicensePickerOpen] = useState(false);
  const [srBookLicensePickerOpen, setSrBookLicensePickerOpen] = useState(false);

  const srActiveBook = srBooks.find((b) => b.book_code === srActiveBookCode) ?? srBooks[0] ?? null;
  const srActiveUnit = srActiveBook
    ? srActiveBook.units.find((u) => u.lesson_id === srActiveLessonId) ?? srActiveBook.units[0] ?? null
    : null;
  const srTotalUnits = srBooks.reduce((n, b) => n + b.units.length, 0);

  const activeGroup = groups.find((g) => g.key === activeKey) ?? groups[0];

  const summary = useMemo(() => {
    const params = groups.reduce((n, g) => n + g.rows.length, 0);
    const cust = groups.reduce((n, g) => n + customizedCount(g), 0);
    return [
      { label: "分组", value: groups.length },
      { label: "参数", value: params },
      { label: "已自定义", value: cust },
    ];
  }, [groups]);

  const filteredRows = useMemo(() => {
    if (!activeGroup) return [];
    const q = query.trim().toLowerCase();
    if (!q) return activeGroup.rows;
    return activeGroup.rows.filter((r) =>
      r.label.toLowerCase().includes(q) ||
      r.path.toLowerCase().includes(q) ||
      r.valueText.toLowerCase().includes(q),
    );
  }, [activeGroup, query]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1400);
  }

  function openEditor(p: AdminParam) {
    setEditing(p);
    setEditValue(String(p.value));
  }

  function closeEditor() {
    setEditing(null);
    setEditValue("");
  }

  function saveEditor() {
    if (!editing) return;
    const path = editing.path;
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        rows: g.rows.map((r) => {
          if (r.path !== path) return r;
          let v: string | number | boolean = editValue;
          if (r.type === "number") v = Number(editValue);
          else if (r.type === "boolean") v = editValue === "true";
          const valueText = formatValueText(r, editValue);
          return { ...r, value: v, valueText, customized: valueText !== r.defaultText };
        }),
      })),
    );
    closeEditor();
    showToast("已保存");
  }

  function resetAll() {
    setGroups(INITIAL_GROUPS.map((g) => ({ ...g, rows: g.rows.map((r) => ({ ...r, customized: false, valueText: r.defaultText })) })));
    setConfirmReset(false);
    showToast("已重置");
  }

  // ===== Smart Reading actions =====
  function srValidate(): SRBook[] | null {
    const raw = srImportText.trim();
    if (!raw) {
      setSrValidationOk(false);
      setSrValidationText("请粘贴 JSON 内容。");
      return null;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      setSrValidationOk(false);
      setSrValidationText(`JSON 格式错误：${(err as Error).message}`);
      return null;
    }
    const list: unknown = Array.isArray(parsed)
      ? parsed
      : (parsed as { books?: unknown }).books ?? [parsed];
    if (!Array.isArray(list)) {
      setSrValidationOk(false);
      setSrValidationText("JSON 必须是 books 数组或包含 books 字段的对象。");
      return null;
    }
    const errors: string[] = [];
    const warnings: string[] = [];
    const books: SRBook[] = [];
    list.forEach((item, i) => {
      const b = item as Partial<SRBook>;
      if (!b.book_code) errors.push(`第 ${i + 1} 本书缺少 book_code`);
      if (!b.book_title) warnings.push(`第 ${i + 1} 本书缺少 book_title`);
      if (!Array.isArray(b.units)) errors.push(`第 ${i + 1} 本书 units 不是数组`);
      books.push({
        book_code: b.book_code || `BOOK-${i + 1}`,
        series_name: b.series_name || "Smart Reading",
        book_title: b.book_title || "未命名",
        cefr_range: b.cefr_range || "A1",
        lexile_range: b.lexile_range || "BR-100L",
        word_count_range: b.word_count_range || "100",
        sort_order: Number(b.sort_order || i + 1),
        updated_at: b.updated_at || new Date().toISOString().slice(0, 10),
        content_license: b.content_license || "authorized",
        unit_count: Array.isArray(b.units) ? b.units.length : 0,
        units: Array.isArray(b.units) ? (b.units as SRUnit[]) : [],
      });
    });
    const incomingCodes = books.map((b) => b.book_code);
    const currentCodes = srBooks.map((b) => b.book_code);
    const newBooks = incomingCodes.filter((c) => !currentCodes.includes(c));
    const removedBooks = currentCodes.filter((c) => !incomingCodes.includes(c));
    const incomingUnits = books.reduce((n, b) => n + b.units.length, 0);
    const ok = errors.length === 0;
    const report = [
      `校验状态：${ok ? "通过" : "失败"}`,
      `导入规模：${books.length} 本书，${incomingUnits} 个单元`,
      `当前规模：${srBooks.length} 本书，${srTotalUnits} 个单元`,
      `Book 对比：新增 ${newBooks.length}，移除 ${removedBooks.length}`,
      ...(newBooks.length ? ["新增书：" + newBooks.slice(0, 6).join(", ")] : []),
      ...(removedBooks.length ? ["将被移除书：" + removedBooks.slice(0, 6).join(", ")] : []),
      ...(errors.length ? ["错误：", ...errors.slice(0, 8)] : []),
      ...(warnings.length ? ["警告：", ...warnings.slice(0, 6)] : []),
    ].join("\n");
    setSrValidationOk(ok);
    setSrValidationText(report);
    return ok ? books : null;
  }

  function srImport(mode: "merge" | "replace" = "merge") {
    const books = srValidate();
    if (!books) return;
    let next = books;
    if (mode === "merge") {
      const map = new Map(srBooks.map((b) => [b.book_code, b]));
      books.forEach((b) => map.set(b.book_code, b));
      next = Array.from(map.values());
    }
    setSrBooks(next);
    setSrSource("admin");
    setSrActiveBookCode(next[0]?.book_code ?? "");
    setSrActiveLessonId(next[0]?.units[0]?.lesson_id ?? "");
    setSrImportOpen(false);
    setSrImportText("");
    setSrValidationText("");
    setSrValidationOk(null);
    showToast(mode === "merge" ? "已合并导入" : "已替换导入");
  }

  function srClear() {
    setSrBooks(INITIAL_SR_BOOKS);
    setSrSource("default");
    setSrActiveBookCode(INITIAL_SR_BOOKS[0]?.book_code ?? "");
    setSrActiveLessonId(INITIAL_SR_BOOKS[0]?.units[0]?.lesson_id ?? "");
    setSrConfirmClear(false);
    showToast("已清除");
  }

  function openSrBookEditor() {
    if (!srActiveBook) return;
    setSrBookEditForm(srBookToForm(srActiveBook));
  }

  function saveSrBookEditor() {
    const f = srBookEditForm;
    if (!f) return;
    setSrBooks((prev) =>
      prev.map((b) =>
        b.book_code === f.bookCode
          ? {
              ...b,
              book_title: f.bookTitle,
              cefr_range: f.cefrRange,
              lexile_range: buildLexileRange(f.lexileMin, f.lexileMax),
              word_count_range: f.wordCountRange,
              sort_order: Number(f.sortOrder) || b.sort_order,
              updated_at: f.updatedAt,
              content_license: f.contentLicense,
            }
          : b
      )
    );
    setSrSource("admin");
    setSrBookEditForm(null);
    showToast("已保存");
  }

  function openSrUnitEditor() {
    if (!srActiveUnit) return;
    setSrUnitEditForm(srUnitToForm(srActiveUnit));
  }

  function saveSrUnitEditor() {
    const f = srUnitEditForm;
    if (!f) return;
    setSrBooks((prev) =>
      prev.map((b) => ({
        ...b,
        units: b.units.map((u) =>
          u.lesson_id === f.lessonId
            ? {
                ...u,
                story_title: f.storyTitle,
                cover_question: f.coverQuestion,
                content_license: f.contentLicense,
                reading_focus: f.readingFocus,
                keywords: linesToArr(f.keywordsText),
                target_sentences: linesToArr(f.targetSentencesText),
                speaking_goals: linesToArr(f.speakingGoalsText),
                retelling_frame: f.retellingFrame,
                shirin_opening: f.shirinOpening,
              }
            : u
        ),
      }))
    );
    setSrSource("admin");
    setSrUnitEditForm(null);
    showToast("已保存");
  }

  const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
  const SOFT_BLUE = "#EEF2FA";

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-full pb-12" style={{ color: NAVY }}>
        <FloatingBack to="/profile" />

        <div className="px-5 pt-12">
          {/* Header: title + menu (open groups drawer) + reset */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[20px] font-semibold leading-tight truncate" style={{ color: NAVY }}>管理员后台</h1>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: MUTED }}>参数与 Smart Reading 内容管理</p>
            </div>
            <button
              onClick={() => setConfirmReset(true)}
              className="shrink-0 h-[30px] px-3 rounded-full text-[12px] font-semibold"
              style={{ background: SOFT_BG, color: SUB }}
            >
              重置
            </button>
          </div>

          {/* Mode tabs — hamburger + scrollable tabs in one pill */}
          <div className="mt-4 flex items-center gap-[6px] p-[4px] rounded-full overflow-x-auto no-scrollbar" style={{ background: SOFT_BLUE }}>
            <button
              onClick={() => setNavOpen(true)}
              aria-label="分组导航"
              className="shrink-0 inline-flex items-center justify-center h-[34px] w-[34px] rounded-full transition-all"
              style={{ background: "#fff", color: PAISLEY, boxShadow: "0 2px 8px rgba(1,70,185,0.10)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            {[
              { k: "params", label: "参数管理" },
              { k: "smartReading", label: "Smart Reading" },
            ].map((t) => {
              const active = mode === t.k;
              const accent = t.k === "smartReading" ? YELLOW : PAISLEY;
              return (
                <button
                  key={t.k}
                  onClick={() => setMode(t.k as "params" | "smartReading")}
                  className="shrink-0 flex-1 h-[34px] px-4 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap"
                  style={{
                    background: active ? "#fff" : "transparent",
                    color: active ? accent : SUB,
                    boxShadow: active
                      ? t.k === "smartReading"
                        ? "0 2px 8px rgba(205,174,141,0.30)"
                        : "0 2px 8px rgba(1,70,185,0.10)"
                      : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

        {mode === "params" && (
          <>
          {/* Summary stats — height matches the SR status strip */}
          <div className="grid grid-cols-3 gap-[7px] mt-4">
            {summary.map((s) => {
              return (
                <div
                  key={s.label}
                  className="rounded-full px-3.5 py-2.5 flex items-baseline justify-between gap-2"
                  style={{ background: SOFT_BLUE, border: "1px solid #E2EAF6" }}
                >
                  <span className="text-[11px] truncate" style={{ color: SUB }}>{s.label}</span>
                  <span className="text-[13px] font-semibold leading-none shrink-0" style={{ color: NAVY }}>{s.value}</span>
                </div>
              );
            })}
          </div>

          {/* Current group header */}
          {activeGroup && (
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <h2 className="text-[16px] font-semibold leading-tight truncate" style={{ color: NAVY }}>{activeGroup.title}</h2>
              <span className="text-[12px] shrink-0" style={{ color: MUTED }}>{activeGroup.rows.length}</span>
            </div>
          )}
          {activeGroup && (
            <p className="text-[11px] mt-1 leading-relaxed" style={{ color: MUTED }}>{activeGroup.subtitle}</p>
          )}

          {/* Param cards */}
          <div className="mt-4 space-y-2.5">
            {filteredRows.length === 0 && (
              <div className="text-center text-[12px] py-8" style={{ color: MUTED }}>无匹配参数</div>
            )}
            {filteredRows.map((row) => (
              <button
                key={row.path}
                onClick={() => openEditor(row)}
                className="w-full text-left relative rounded-2xl p-3.5 transition-all"
                style={{
                  background: "#fff",
                  border: `1px solid ${row.customized ? "rgba(1,70,185,0.22)" : "#EEF2F7"}`,
                  overflow: "hidden",
                }}
              >
                {row.customized && (
                  <span className="absolute top-0 left-0 h-full w-[3px]" style={{ background: PAISLEY }} />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-medium leading-tight" style={{ color: NAVY }}>{row.label}</span>
                      {row.customized && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium leading-none"
                          style={{ background: SOFT_BLUE, color: PAISLEY }}
                        >
                          已改
                        </span>
                      )}
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); setHelpFor(row); }}
                        className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full text-[10px] font-medium leading-none"
                        style={{ background: SOFT_BG, color: SUB }}
                      >
                        ?
                      </span>
                    </div>
                    <code
                      className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[10.5px] break-all"
                      style={{ background: SOFT_BLUE, color: PAISLEY, fontFamily: MONO }}
                    >
                      {row.path}
                    </code>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0 max-w-[42%]">
                    <div className="text-[13.5px] font-semibold text-right break-all leading-tight" style={{ color: row.customized ? PAISLEY : NAVY }}>{row.valueText}</div>
                    <div className="text-[9.5px]" style={{ color: "#A0AEC0" }}>默认: {row.defaultText}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          </>
        )}

        {mode === "smartReading" && (
          <SRView
            srBooks={srBooks}
            srActiveBook={srActiveBook}
            srActiveUnit={srActiveUnit}
            srActiveBookCode={srActiveBookCode}
            srActiveLessonId={srActiveLessonId}
            srSource={srSource}
            srTotalUnits={srTotalUnits}
            setSrActiveBookCode={setSrActiveBookCode}
            setSrActiveLessonId={setSrActiveLessonId}
            onImport={() => setSrImportOpen(true)}
            onClear={() => setSrConfirmClear(true)}
            onEditBook={openSrBookEditor}
            onEditUnit={openSrUnitEditor}
          />
        )}
        </div>

        {/* Group navigation drawer */}
        {navOpen && (
          <>
            <div
              className="fixed inset-0 z-40 transition-opacity"
              style={{ background: "rgba(11,37,69,0.36)" }}
              onClick={() => setNavOpen(false)}
            />
            <aside
              className="fixed top-0 left-0 bottom-0 z-50 w-[78%] max-w-[300px] flex flex-col"
              style={{ background: SOFT_BLUE, boxShadow: "4px 0 24px rgba(11,37,69,0.18)" }}
            >
              <div className="px-5 pt-12 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PAISLEY }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold leading-tight" style={{ color: NAVY }}>管理员后台</div>
                    <div className="text-[10px]" style={{ color: SUB }}>选择参数分组</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-3">
                <div className="px-2 text-[9px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: "rgba(11,37,69,0.45)" }}>参数分组</div>
                <nav className="space-y-1">
                  {groups.map((g) => {
                    const active = g.key === activeKey;
                    const cc = customizedCount(g);
                    return (
                      <button
                        key={g.key}
                        onClick={() => { setActiveKey(g.key); setQuery(""); setNavOpen(false); }}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{
                          background: active ? PAISLEY : "transparent",
                          color: active ? "#fff" : NAVY,
                          boxShadow: active ? "0 4px 12px rgba(1,70,185,0.22)" : "none",
                        }}
                      >
                        <span className="text-[13px] font-semibold truncate">{g.title}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          {cc > 0 && (
                            <span
                              className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full text-[9.5px] font-bold leading-none"
                              style={{ background: active ? "rgba(255,255,255,0.22)" : PAISLEY, color: "#fff" }}
                            >
                              {cc}
                            </span>
                          )}
                          <span className="text-[10px]" style={{ color: active ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>{g.rows.length}</span>
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="p-4 border-t" style={{ borderColor: "#DDE6F2" }}>
                <button
                  onClick={() => { setNavOpen(false); setConfirmReset(true); }}
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold"
                  style={{ background: "#fff", color: NAVY, border: "1px solid #D5DEEC" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                  全局重置
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="px-5 py-3 rounded-xl text-white text-[14px] font-medium" style={{ background: "rgba(11,37,69,0.85)" }}>{toast}</div>
          </div>
        )}

        {/* Help modal */}
        {helpFor && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setHelpFor(null)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>{helpFor.label}</div>
              <div className="text-[13px] mt-2 leading-relaxed" style={{ color: SUB }}>{helpFor.helpText || "暂无说明。"}</div>
              <button
                onClick={() => setHelpFor(null)}
                className="mt-4 w-full h-10 rounded-full text-[14px] font-semibold text-white"
                style={{ background: PAISLEY }}
              >
                知道了
              </button>
            </div>
          </div>
        )}

        {/* Reset confirm */}
        {confirmReset && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setConfirmReset(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>重置后台参数？</div>
              <div className="text-[13px] mt-2" style={{ color: SUB }}>这会把所有前端参数恢复为默认值。</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setConfirmReset(false)} className="flex-1 h-10 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                <button onClick={resetAll} className="flex-1 h-10 rounded-full text-[14px] font-semibold text-white" style={{ background: "#D9534F" }}>重置</button>
              </div>
            </div>
          </div>
        )}

        {/* Editor bottom sheet */}
        {editing && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={closeEditor} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>{editing.label}</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED }}>{editing.path}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>默认：{editing.defaultText}</div>
                </div>

                <div className="mt-4 flex-1 min-h-0 overflow-y-auto">
                  {editing.options && editing.options.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {editing.options.map((opt) => {
                        const active = editValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setEditValue(opt.value)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px]"
                            style={{
                              background: active ? ACTIVE_BG : SOFT_BG,
                              color: active ? PAISLEY : NAVY,
                              fontWeight: active ? 700 : 500,
                            }}
                          >
                            <span>{opt.label}</span>
                            <span className="text-[12px]" style={{ color: active ? PAISLEY : MUTED }}>{opt.value}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : editing.type === "boolean" ? (
                    <button
                      onClick={() => setEditValue(editValue === "true" ? "false" : "true")}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: SOFT_BG }}
                    >
                      <span className="text-[14px] font-semibold" style={{ color: NAVY }}>{editValue === "true" ? "开启" : "关闭"}</span>
                      <span
                        className="relative inline-block w-[44px] h-[24px] rounded-full transition-colors"
                        style={{ background: editValue === "true" ? PAISLEY : "#CBD5E1" }}
                      >
                        <span
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                          style={{ left: editValue === "true" ? 22 : 2 }}
                        />
                      </span>
                    </button>
                  ) : (
                    <input
                      autoFocus
                      inputMode={editing.type === "number" ? "decimal" : "text"}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-[15px] outline-none"
                      style={{ background: SOFT_BG, color: NAVY }}
                    />
                  )}
                </div>

                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={closeEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold text-white" style={{ background: `linear-gradient(180deg, #0877FF 0%, ${PAISLEY} 100%)` }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR clear confirm */}
        {srConfirmClear && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setSrConfirmClear(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>清除导入内容？</div>
              <div className="text-[13px] mt-2" style={{ color: SUB }}>清除后 Smart Reading 将回到默认代码内容。</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setSrConfirmClear(false)} className="flex-1 h-10 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                <button onClick={srClear} className="flex-1 h-10 rounded-full text-[14px] font-semibold text-white" style={{ background: "#D9534F" }}>清除</button>
              </div>
            </div>
          </div>
        )}

        {/* SR Import sheet */}
        {srImportOpen && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => { setSrImportOpen(false); setSrValidationText(""); setSrValidationOk(null); }} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>导入 Smart Reading JSON</div>
                  <div className="text-[11px] mt-1" style={{ color: MUTED }}>粘贴标准 books 数组或 {`{ books: [...] }`} 对象。</div>
                </div>
                <div className="mt-3 flex-1 min-h-0 overflow-y-auto">
                  <textarea
                    value={srImportText}
                    onChange={(e) => setSrImportText(e.target.value)}
                    placeholder='[{"book_code":"...","book_title":"...","units":[...]}]'
                    className="w-full h-[160px] px-3 py-2 rounded-xl text-[12px] outline-none resize-none"
                    style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO, border: "1px solid #E6ECF5" }}
                  />
                  {srValidationText && (
                    <pre
                      className="mt-2 w-full px-3 py-2 rounded-xl text-[11px] whitespace-pre-wrap"
                      style={{
                        background: srValidationOk === false ? "#FEF2F2" : srValidationOk === true ? "#ECFDF5" : SOFT_BG,
                        color: srValidationOk === false ? "#9F1239" : srValidationOk === true ? "#065F46" : SUB,
                        fontFamily: MONO,
                        border: `1px solid ${srValidationOk === false ? "#FECACA" : srValidationOk === true ? "#A7F3D0" : "#E6ECF5"}`,
                      }}
                    >
                      {srValidationText}
                    </pre>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 shrink-0">
                  <button onClick={() => { setSrImportOpen(false); setSrValidationText(""); setSrValidationOk(null); }} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={srValidate} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: "#fff", color: NAVY, border: `1px solid ${YELLOW_BORDER}` }}>校验</button>
                  <button onClick={() => srImport("replace")} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: "#fff", color: NAVY, border: `1px solid ${YELLOW_BORDER}` }}>替换</button>
                  <button onClick={() => srImport("merge")} className="h-11 rounded-full text-[13px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>合并</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR Book editor sheet */}
        {srBookEditForm && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={() => setSrBookEditForm(null)} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>编辑书籍基础信息</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED, fontFamily: MONO }}>{srBookEditForm.bookCode}</div>
                </div>
                <div className="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto">
                  <SRField label="书名">
                    <input value={srBookEditForm.bookTitle} onChange={(e) => setSrBookEditForm({ ...srBookEditForm, bookTitle: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="CEFR">
                    <SRSelect value={srBookEditForm.cefrRange} options={SR_CEFR_OPTIONS} open={srCefrPickerOpen} setOpen={setSrCefrPickerOpen} onChange={(v) => setSrBookEditForm({ ...srBookEditForm, cefrRange: v })} placeholder="请选择 CEFR" />
                  </SRField>
                  <SRField label="Lexile">
                    <div className="flex items-center gap-2">
                      <input
                        inputMode="numeric"
                        placeholder="起始"
                        value={srBookEditForm.lexileMin}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, lexileMin: e.target.value.replace(/[^\d]/g, "") })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px]" style={{ color: MUTED }}>L  —  </span>
                      <input
                        inputMode="numeric"
                        placeholder="结束"
                        value={srBookEditForm.lexileMax}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, lexileMax: e.target.value.replace(/[^\d]/g, "") })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px]" style={{ color: MUTED }}>L</span>
                    </div>
                  </SRField>
                  <SRField label="Words">
                    <input
                      inputMode="numeric"
                      placeholder="例如 100"
                      value={srBookEditForm.wordCountRange}
                      onChange={(e) => setSrBookEditForm({ ...srBookEditForm, wordCountRange: e.target.value.replace(/[^\d]/g, "") })}
                      className="w-full px-3 py-2 rounded-xl text-[14px] outline-none"
                      style={{ background: SOFT_BG, color: NAVY }}
                    />
                  </SRField>
                  <SRField label="排序">
                    <input value={srBookEditForm.sortOrder} onChange={(e) => setSrBookEditForm({ ...srBookEditForm, sortOrder: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="更新日期">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={srBookEditForm.updatedAt}
                        onChange={(e) => setSrBookEditForm({ ...srBookEditForm, updatedAt: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl text-[14px] outline-none"
                        style={{ background: SOFT_BG, color: NAVY }}
                      />
                      <span className="text-[12px] tabular-nums" style={{ color: MUTED }}>{toUsShortDate(srBookEditForm.updatedAt) || "mm-dd-yy"}</span>
                    </div>
                  </SRField>
                  <SRField label="授权">
                    <SRSelect value={srBookEditForm.contentLicense} options={SR_LICENSE_OPTIONS} open={srBookLicensePickerOpen} setOpen={setSrBookLicensePickerOpen} onChange={(v) => setSrBookEditForm({ ...srBookEditForm, contentLicense: v })} placeholder="请选择授权" />
                  </SRField>
                </div>
                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={() => setSrBookEditForm(null)} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveSrBookEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SR Unit editor sheet */}
        {srUnitEditForm && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={() => setSrUnitEditForm(null)} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)", height: "62vh" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))] flex flex-col h-full min-h-0">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3] shrink-0" />
                <div className="shrink-0">
                  <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>编辑单元</div>
                  <div className="text-[11px] mt-1 break-all" style={{ color: MUTED, fontFamily: MONO }}>{srUnitEditForm.lessonId}</div>
                </div>
                <div className="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto">
                  <SRField label="标题">
                    <input value={srUnitEditForm.storyTitle} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, storyTitle: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="封面问题 Cover Question">
                    <input value={srUnitEditForm.coverQuestion} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, coverQuestion: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="授权">
                    <SRSelect value={srUnitEditForm.contentLicense} options={SR_LICENSE_OPTIONS} open={srLicensePickerOpen} setOpen={setSrLicensePickerOpen} onChange={(v) => setSrUnitEditForm({ ...srUnitEditForm, contentLicense: v as SRUnit["content_license"] })} placeholder="请选择授权" />
                  </SRField>
                  <SRField label="Reading Focus">
                    <input value={srUnitEditForm.readingFocus} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, readingFocus: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="Keywords（每行一个）">
                    <textarea value={srUnitEditForm.keywordsText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, keywordsText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Target Sentences（每行一个）">
                    <textarea value={srUnitEditForm.targetSentencesText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, targetSentencesText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Speaking Goals（每行一个）">
                    <textarea value={srUnitEditForm.speakingGoalsText} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, speakingGoalsText: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-xl text-[13px] outline-none resize-none" style={{ background: SOFT_BG, color: NAVY, fontFamily: MONO }} />
                  </SRField>
                  <SRField label="Retelling Frame">
                    <input value={srUnitEditForm.retellingFrame} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, retellingFrame: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                  <SRField label="Shirin Opening">
                    <input value={srUnitEditForm.shirinOpening} onChange={(e) => setSrUnitEditForm({ ...srUnitEditForm, shirinOpening: e.target.value })} className="w-full px-3 py-2 rounded-xl text-[14px] outline-none" style={{ background: SOFT_BG, color: NAVY }} />
                  </SRField>
                </div>
                <div className="mt-5 flex gap-3 shrink-0">
                  <button onClick={() => setSrUnitEditForm(null)} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveSrUnitEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: YELLOW, color: "#fff" }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

function SRField(props: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] font-medium mb-1" style={{ color: "#50627A" }}>{props.label}</div>
      {props.children}
    </div>
  );
}

function SRSelect(props: {
  value: string;
  options: string[];
  open: boolean;
  setOpen: (v: boolean) => void;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  const NAVY_C = "#0B2545";
  const MUTED_C = "#8A97A6";
  const PAISLEY_C = "#0146B9";
  const SOFT_BG_C = "#F6F8FC";
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => props.setOpen(!props.open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[14px]"
        style={{ background: SOFT_BG_C, color: props.value ? NAVY_C : MUTED_C }}
      >
        <span>{props.value ? `${props.value}${props.suffix ? " " + props.suffix : ""}` : props.placeholder || "请选择"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: MUTED_C, transform: props.open ? "rotate(180deg)" : undefined, transition: "transform 0.15s" }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {props.open && (
        <div className="absolute z-10 left-0 right-0 mt-1 max-h-[200px] overflow-y-auto rounded-xl bg-white" style={{ border: "1px solid #E6ECF5", boxShadow: "0 8px 24px rgba(11,37,69,0.10)" }}>
          {props.options.map((o) => {
            const active = o === props.value;
            return (
              <button
                key={o}
                type="button"
                onClick={() => { props.onChange(o); props.setOpen(false); }}
                className="w-full text-left px-3 py-2 text-[13px]"
                style={{ background: active ? "#EAF3FF" : "transparent", color: active ? PAISLEY_C : NAVY_C, fontWeight: active ? 700 : 500 }}
              >
                {o}{props.suffix ? " " + props.suffix : ""}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

### src/routes/bloxia.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Heart, X, ChevronRight, ChevronLeft, ChevronDown, Pencil, Camera, Compass, Award, Gem } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bloxiaLogoText from "@/assets/brand/bloxia-logo-text.png";
import {
  BLOXIAN_AVATARS,
  CHARACTER_ASSETS,
  COLLECTION_ITEMS,
  DEFAULT_BLOXIAN_NAME,
  GROWTH_BADGES,
  MAP_ASSETS,
  PLACES,
  PLACE_BADGES,
  avatarById,
  collectionItemById,
  growthBadgeById,
  placeBadgeById,
  placeById,
  type BloxianAvatar,
  type CollectionItem,
  type GrowthBadge,
  type Place,
  type PlaceBadge,
  type PlaceId,
} from "@/lib/bloxia/config";
import {
  calculateStreakDays,
  nextPlace,
  useBloxia,
  type Progress,
  type SpendingLog,
} from "@/lib/bloxia/progress";

export const Route = createFileRoute("/bloxia")({
  head: () => ({
    meta: [
      { title: "Bloxia — Paisley EC" },
      { name: "description", content: "Bloxia — a pixel growth world where kids spend Bp to unlock places, badges, and collection items." },
      { property: "og:title", content: "Bloxia — Paisley EC" },
      { property: "og:description", content: "A pixel growth world of eight places, honoring adventures earned through learning." },
    ],
  }),
  component: BloxiaPage,
});

type PageKey = "map" | "badges" | "collection" | "profile";
type BadgeTab = "place" | "growth" | "favorite";
type CollectionTab = "items" | "favorite";

// ---------- Theme constants (dark green + gold) ----------
const T = {
  bg: "linear-gradient(180deg, #1C5732 0%, #102C1D 42%, #07150E 100%)",
  panel: "rgba(8, 36, 22, 0.94)",
  panelSoft: "rgba(14, 52, 32, 0.88)",
  border: "rgba(216, 175, 87, 0.62)",
  borderSoft: "rgba(216, 175, 87, 0.34)",
  gold: "#D8AF57",
  goldLight: "#F8E6A4",
  ivory: "#FFF4BF",
  sage: "#B7D9B7",
  goldGradient: "linear-gradient(180deg, #F4D27A, #B9822F)",
  goldOnDark: "#1C2A12",
};

function formatBp(n: number) {
  return `${Math.max(0, Math.floor(n)).toLocaleString()} Bp`;
}

function BloxiaPage() {
  const b = useBloxia();
  const avatar = b.selectedAvatar;
  const avatarUrl = avatar?.portrait ?? CHARACTER_ASSETS.shirinPortrait;
  const avatarMap = avatar?.map ?? CHARACTER_ASSETS.shirinMap;
  const [page, setPage] = useState<PageKey>("map");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<
    (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" } | null
  >(null);
  const [nameEditor, setNameEditor] = useState(false);
  const [avatarPicker, setAvatarPicker] = useState(false);
  const [badgeTab, setBadgeTab] = useState<BadgeTab>("place");
  const [collectionTab, setCollectionTab] = useState<CollectionTab>("items");

  // First-time avatar selection: prompt once when the user has never chosen.
  const showFirstTime = b.ready && !b.progress.avatarSelectionCompleted;

  const next = nextPlace(b.progress);
  const progressPct = next
    ? Math.min(100, Math.max(0, Math.round((b.bp / next.unlockBp) * 100)))
    : 100;

  return (
    <PhoneFrame bg="">
      <div className="relative min-h-[100dvh] font-['Nunito',sans-serif] text-[color:#F8F1D2]" style={{ background: T.bg }}>
        {/* Map lives underneath every page; on non-map pages it's veiled with the
            same translucent green used by the home sheet backdrop. */}
        {page === "map" ? (
          <MapView
            progress={b.progress}
            bp={b.bp}
            onSelectPlace={setSelectedPlace}
            avatarUrl={avatarMap}
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={MAP_ASSETS.world}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(8, 36, 22, 0.52)", backdropFilter: "blur(6px)" }}
            />
          </div>
        )}

        {/* TopBar */}
        <TopBar
          progress={b.progress}
          bp={b.bp}
          progressPct={progressPct}
          next={next}
          page={page}
          avatarUrl={avatarUrl}
          onNavigate={(p) => {
            setPage(p);
            setSelectedPlace(null);
            setSelectedItem(null);
          }}
        />

        {/* Top mask: hides scrolling content once it reaches the TopBar / progress bar area */}
        {page !== "map" && (
          <div
            aria-hidden
            className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-30 pointer-events-none"
            style={{
              height: "calc(env(safe-area-inset-top) + 108px)",
              background:
                "linear-gradient(to bottom, rgba(8,36,22,0.96) 0%, rgba(8,36,22,0.92) 70%, rgba(8,36,22,0.6) 90%, rgba(8,36,22,0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.5) 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.5) 94%, transparent 100%)",
            }}
          />
        )}

        {/* Content — Badges page sits a bit higher for a tighter title gap */}
        <div className={`relative pb-6 px-4 ${page === "badges" || page === "collection" || page === "profile" ? "pt-[120px]" : "pt-[140px]"}`}>
          {page === "badges" && (
            <BadgesView
              progress={b.progress}
              tab={badgeTab}
              setTab={setBadgeTab}
              selected={selectedBadge}
              onSelect={setSelectedBadge}
              onToggleFavorite={(id) => b.toggleFavorite(id)}
              onUnlockGrowth={(id) => b.unlockGrowthBadge(id)}
              bp={b.bp}
            />
          )}
          {page === "collection" && (
            <CollectionView
              progress={b.progress}
              onSelectItem={setSelectedItem}
              tab={collectionTab}
              setTab={setCollectionTab}
            />
          )}
          {page === "profile" && (
            <ProfileView
              progress={b.progress}
              logs={b.logs}
              totals={b.totals}
              bp={b.bp}
              avatarUrl={avatarUrl}
              onEditName={() => setNameEditor(true)}
              onGoBadgesFavorite={() => {
                setBadgeTab("favorite");
                setPage("badges");
              }}
              onGoCollectionFavorite={() => {
                setCollectionTab("favorite");
                setPage("collection");
              }}
              onSelectBadge={(bd) => setSelectedBadge(bd)}
              onSelectItem={(it) => setSelectedItem(it)}
            />
          )}
        </div>

        <BottomTabBar />

        {/* Sheets */}
        {selectedPlace && (
          <PlaceSheet
            place={selectedPlace}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedPlace(null)}
            onUnlock={() => {
              const r = b.unlockPlace(selectedPlace.id);
              if (r.ok) setSelectedPlace(null);
            }}
            onExplore={() => {
              b.setCurrentPlace(selectedPlace.id);
              setSelectedPlace(null);
            }}
          />
        )}
        {selectedItem && (
          <ItemSheet
            item={selectedItem}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedItem(null)}
            onCollect={() => {
              const r = b.unlockCollectionItem(selectedItem.id);
              if (r.ok) setSelectedItem(null);
            }}
            onToggleFavorite={() => b.toggleFavoriteItem(selectedItem.id)}
          />
        )}
        {page !== "badges" && selectedBadge && (
          <BadgeSheet
            badge={selectedBadge}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedBadge(null)}
            onToggleFavorite={() => b.toggleFavorite(selectedBadge.id)}
            onUnlockGrowth={() => b.unlockGrowthBadge(selectedBadge.id)}
          />
        )}
        {nameEditor && (
          <NameEditor
            initial={b.progress.bloxianName}
            initialAvatarId={b.progress.selectedAvatarId}
            onClose={() => setNameEditor(false)}
            onSave={(id, name) => {
              b.completeWelcome(id, name);
              setNameEditor(false);
            }}
          />
        )}
        {avatarPicker && (
          <AvatarPickerSheet
            title="Change Avatar"
            selectedAvatarId={b.progress.selectedAvatarId}
            onClose={() => setAvatarPicker(false)}
            onConfirm={(id) => {
              b.selectAvatar(id);
              setAvatarPicker(false);
            }}
          />
        )}
        {showFirstTime && !avatarPicker && (
          <WelcomeSheet
            initialAvatarId={b.progress.selectedAvatarId}
            initialName={b.progress.bloxianName}
            onStart={(id, name) => {
              b.completeWelcome(id, name);
            }}
            onClose={() => {
              b.completeWelcome(b.progress.selectedAvatarId, b.progress.bloxianName);
            }}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

// ============ TopBar ============

function TopBar({
  progress,
  bp,
  progressPct,
  next,
  page,
  avatarUrl,
  onNavigate,
}: {
  progress: Progress;
  bp: number;
  progressPct: number;
  next: Place | undefined;
  page: PageKey;
  avatarUrl: string;
  onNavigate: (p: PageKey) => void;
}) {
  const allTabs: { key: PageKey; label: string; Icon: typeof Compass }[] = [
    { key: "map", label: "Map", Icon: Compass },
    { key: "badges", label: "Badges", Icon: Award },
    { key: "collection", label: "Items", Icon: Gem },
  ];
  // Hide the icon of the current page; profile is entered via the avatar.
  const tabs = allTabs.filter((t) => t.key !== page);
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="relative">
        {/* Top row: nav cluster on the left, name + avatar on the right */}
        <div className="flex items-start justify-between gap-2">
          {/* Left cluster: back + nav icons + Bp pill */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              to="/"
              aria-label="Back"
              className="h-9 w-9 rounded-full grid place-items-center shrink-0 bg-white border border-border shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" style={{ color: "#0F172A" }} />
            </Link>
            {tabs.map((t) => {
              const active = t.key === page;
              const Icon = t.Icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => onNavigate(t.key)}
                  aria-label={t.label}
                  className="h-9 w-9 rounded-full grid place-items-center transition-colors shrink-0"
                  style={
                    active
                      ? { background: T.goldGradient, color: T.goldOnDark, border: `1px solid ${T.goldLight}` }
                      : { background: "rgba(23,63,41,0.9)", color: T.goldLight, border: `1.5px solid rgba(216,175,87,0.55)` }
                  }
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </button>
              );
            })}
            {/* Bp pill: hidden on profile (Bp is shown in the stat pills below) */}
            {page !== "profile" && (
            <div
              className="h-9 px-2.5 rounded-full grid place-items-center shrink-0 text-[11px] font-extrabold"
              style={{
                background: "rgba(23,63,41,0.9)",
                color: T.goldLight,
                border: `1.5px solid rgba(216,175,87,0.55)`,
              }}
            >
              {formatBp(bp)}
            </div>
            )}
          </div>

          {/* Right cluster: name + milestone; milestone bottom-aligned with avatar */}
          <div className="flex items-end gap-2 min-w-0">
            <div className="min-w-0 text-right flex flex-col items-end justify-end leading-none shrink-0">
              <div
                className="text-[14px] font-extrabold leading-tight truncate"
                style={{ color: T.ivory, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
              >
                {progress.bloxianName}
              </div>
              <div
                className="text-[10px] font-bold leading-snug mt-[6px] whitespace-nowrap"
                style={{
                  color: T.goldLight,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {next
                  ? `${formatBp(next.unlockBp - bp)} to ${next.shortName}`
                  : "All places unlocked"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("profile")}
              aria-label="Profile"
              className="h-[48px] w-[48px] rounded-full shrink-0 grid place-items-center overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 1.5px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={avatarUrl}
                alt=""
                className="h-full w-full rounded-full object-cover"
                draggable={false}
                style={{ transform: "scale(2)", transformOrigin: "50% 10%" }}
              />
            </button>
          </div>
        </div>

        {/* Progress bar: completed = gold, unfinished = dark green */}
        <div
          className="mt-1.5 h-[6px] rounded-full overflow-hidden"
          style={{ background: "rgba(23,63,41,0.95)", border: "1px solid rgba(216,175,87,0.45)" }}
        >
          <div className="h-full rounded-full" style={{ width: `${progressPct}%`, background: T.goldGradient }} />
        </div>
      </div>
    </div>
  );
}

// ============ Map View ============

function MapView({
  progress,
  bp,
  onSelectPlace,
  avatarUrl,
}: {
  progress: Progress;
  bp: number;
  onSelectPlace: (p: Place) => void;
  avatarUrl: string;
}) {
  const places = useMemo(
    () =>
      PLACES.map((p) => {
        const unlocked = progress.unlockedPlaceIds.includes(p.id);
        const current = progress.currentPlaceId === p.id;
        const status: "current" | "unlocked" | "available" | "locked" = current
          ? "current"
          : unlocked
          ? "unlocked"
          : bp >= p.unlockBp
          ? "available"
          : "locked";
        const marker =
          status === "current"
            ? MAP_ASSETS.markers.current
            : status === "unlocked"
            ? MAP_ASSETS.markers.visited
            : status === "available"
            ? MAP_ASSETS.markers.available
            : MAP_ASSETS.markers.locked;
        return { ...p, status, current, marker };
      }),
    [progress, bp],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={MAP_ASSETS.world}
        alt="Bloxia world map"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        className="absolute z-10 pointer-events-none flex items-center justify-center"
        style={{ top: "calc(env(safe-area-inset-top) + 6.125rem - 6px)", left: "29px" }}
      >
        {/* Smaller blue-cyan halo behind the white text logo */}
        <div
          aria-hidden
          className="absolute"
          style={{
            width: "200px",
            height: "90px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(100,220,255,0.50) 0%, rgba(50,170,255,0.28) 40%, rgba(30,140,255,0.10) 60%, transparent 72%)",
            filter: "blur(14px)",
          }}
        />
        <div
          aria-hidden
          className="absolute"
          style={{
            width: "130px",
            height: "58px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(170,245,255,0.58) 0%, rgba(110,220,255,0.22) 50%, transparent 68%)",
            filter: "blur(8px)",
          }}
        />
        {/* Text-only logo in white with a cool cyan/blue halo */}
        <img
          src={bloxiaLogoText}
          alt="Bloxia — Growth World"
          className="relative w-[90px] object-contain opacity-95"
          style={{
            filter:
              "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(0,0,0,0.25))",
          }}
        />
      </div>
      {places.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelectPlace(p)}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: `${p.mapPosition.x}%`, top: `${p.mapPosition.y}%` }}
          aria-label={p.name}
        >
          {p.current && (
            <img
              src={avatarUrl}
              alt=""
              className="h-11 w-11 -mb-1"
              style={{ imageRendering: "pixelated", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.42))" }}
            />
          )}
          <img
            src={p.marker}
            alt=""
            className={p.status === "current" ? "h-9 w-9" : "h-7 w-7"}
            style={{ imageRendering: "pixelated", filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.4))" }}
          />
          <div
            className="px-2 py-[3px] rounded-full text-[10px] font-extrabold leading-none whitespace-nowrap"
            style={{
              background: "rgba(8,36,22,0.86)",
              border: "1px solid rgba(248,230,164,0.7)",
              color: T.ivory,
            }}
          >
            {p.shortName}
          </div>
        </button>
      ))}
    </div>
  );
}

// ============ Badges View ============

function BadgesView({
  progress,
  tab,
  setTab,
  selected,
  onSelect,
  onToggleFavorite,
  onUnlockGrowth,
  bp,
}: {
  progress: Progress;
  tab: BadgeTab;
  setTab: (t: BadgeTab) => void;
  selected: ((PlaceBadge | GrowthBadge) & { kind: "place" | "growth" }) | null;
  onSelect: (b: ((PlaceBadge | GrowthBadge) & { kind: "place" | "growth" }) | null) => void;
  onToggleFavorite: (id: string) => void;
  onUnlockGrowth: (id: string) => { ok: boolean; error?: string };
  bp: number;
}) {
  const placeItems = PLACE_BADGES.map((b) => ({
    ...b,
    kind: "place" as const,
    unlocked: progress.earnedPlaceBadgeIds.includes(b.id),
    favorite: progress.favoriteBadgeIds.includes(b.id),
  }));
  const growthItems = GROWTH_BADGES.map((b) => ({
    ...b,
    kind: "growth" as const,
    unlocked: progress.unlockedGrowthBadgeIds.includes(b.id),
    favorite: progress.favoriteBadgeIds.includes(b.id),
  }));
  const favoriteItems = [...placeItems, ...growthItems].filter((b) => b.favorite);

  const visible = tab === "place" ? placeItems : tab === "growth" ? growthItems : favoriteItems;
  const tabs: { key: BadgeTab; text: string; count: string }[] = [
    { key: "place", text: "Places", count: `${progress.earnedPlaceBadgeIds.length}/${PLACE_BADGES.length}` },
    { key: "growth", text: "Growth", count: `${progress.unlockedGrowthBadgeIds.length}/${GROWTH_BADGES.length}` },
    { key: "favorite", text: "Favorite", count: `${favoriteItems.length}` },
  ];

  const totalEarned = progress.earnedPlaceBadgeIds.length + progress.unlockedGrowthBadgeIds.length;

  return (
    <div className="space-y-4">
      {/* Page title — mirrors app typography (no heavy panel) */}
      <div className="px-1">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          My Badges
        </div>
        <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
          {totalEarned} of {PLACE_BADGES.length + GROWTH_BADGES.length} earned
        </div>
      </div>

      {/* Tab strip — single rounded-full pill w/ gold active segment */}
      <div
        className="grid grid-cols-3 p-1 rounded-full"
        style={{ background: "rgba(8,36,22,0.72)", border: `1.5px solid ${T.borderSoft}` }}
      >
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                onSelect(null);
              }}
              className="h-9 rounded-full text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
              style={{
                background: active ? "rgba(28,87,50,0.92)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span className="text-[15px] font-bold" style={{ color: T.ivory }}>{t.text} </span>
              <span style={{ color: T.sage }}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-3 gap-3">
        {visible.map((item) => (
          <BadgeTile
            key={item.id}
            asset={item.asset}
            name={item.name}
            unlocked={item.unlocked}
            selected={selected?.id === item.id}
            onClick={() => onSelect(item)}
          />
        ))}
        {!visible.length && (
          <div
            className="col-span-3 rounded-[18px] text-center py-8 text-[13px] font-semibold"
            style={{ border: `1.5px dashed ${T.borderSoft}`, color: T.sage, background: "rgba(8,36,22,0.4)" }}
          >
            Tap on any earned badge to Add to Favorite
          </div>
        )}
      </div>

      {selected && (
        <BadgeSheet
          badge={selected}
          progress={progress}
          bp={bp}
          onClose={() => onSelect(null)}
          onToggleFavorite={() => onToggleFavorite(selected.id)}
          onUnlockGrowth={() => onUnlockGrowth(selected.id)}
        />
      )}
    </div>
  );
}

function BadgeTile({
  asset,
  name,
  unlocked,
  selected,
  onClick,
  size = "default",
  hideName = false,
}: {
  asset: string;
  name: string;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
  size?: "default" | "large";
  hideName?: boolean;
}) {
  const imgSize = size === "large" ? "h-full w-full" : "h-[90%] w-[90%]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[14px] text-center transition-transform active:scale-95 flex flex-col ${hideName ? "p-1.5" : "p-2.5"}`}
      style={{
        background: "rgba(8,36,22,0.72)",
        border: selected ? `1.5px solid ${T.goldLight}` : `1.5px solid ${T.borderSoft}`,
        boxShadow: selected ? `0 0 0 3px rgba(255,240,167,0.22)` : "none",
      }}
    >
      <div className="mx-auto aspect-square w-full grid place-items-center overflow-hidden">
        <img
          src={asset}
          alt=""
          className={`${imgSize} object-contain`}
          style={{
            imageRendering: "pixelated",
            opacity: unlocked ? 1 : 0.34,
            filter: unlocked ? undefined : "grayscale(100%)",
          }}
        />
      </div>
      {!hideName && (
      <div
        className="mt-2 text-[12px] font-semibold text-center px-0.5"
        style={{
          color: T.ivory,
          height: 30,
          lineHeight: "15px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
        }}
      >
        {name}
      </div>
      )}
    </button>
  );
}

// ============ Collection View ============

function CollectionView({
  progress,
  onSelectItem,
  tab,
  setTab,
}: {
  progress: Progress;
  onSelectItem: (i: CollectionItem) => void;
  tab: CollectionTab;
  setTab: (t: CollectionTab) => void;
}) {
  const groups = PLACES.map((place) => {
    const items = COLLECTION_ITEMS.filter((i) => i.placeId === place.id);
    const collected = items.filter((i) => progress.collectedItemIds.includes(i.id)).length;
    return { place, items, collected, placeUnlocked: progress.unlockedPlaceIds.includes(place.id) };
  });
  const favoriteIds = progress.favoriteItemIds ?? [];
  const favoriteItems = COLLECTION_ITEMS.filter((i) => favoriteIds.includes(i.id));
  const tabs: { key: CollectionTab; text: string; count: string }[] = [
    { key: "items", text: "Items", count: `${progress.collectedItemIds.length}/${COLLECTION_ITEMS.length}` },
    { key: "favorite", text: "Favorite", count: `${favoriteItems.length}` },
  ];

  return (
    <div className="space-y-4">
      {/* Page title — mirrors My Badges typography */}
      <div className="px-1">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          My Collection
        </div>
        <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
          {progress.collectedItemIds.length} of {COLLECTION_ITEMS.length} collected
        </div>
      </div>

      {/* Tab strip — mirrors Badges tab pill (Items / Favorite) */}
      <div
        className="grid grid-cols-2 p-1 rounded-full"
        style={{ background: "rgba(8,36,22,0.72)", border: `1.5px solid ${T.borderSoft}` }}
      >
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="h-9 rounded-full text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
              style={{
                background: active ? "rgba(28,87,50,0.92)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span className="text-[15px] font-bold" style={{ color: T.ivory }}>{t.text} </span>
              <span style={{ color: T.sage }}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {tab === "favorite" ? (
        favoriteItems.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favoriteItems.map((item) => (
              <BadgeTile
                key={item.id}
                asset={item.asset}
                name={item.name}
                unlocked
                selected={false}
                onClick={() => onSelectItem(item)}
                size="large"
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-[18px] text-center py-8 text-[13px] font-semibold"
            style={{ border: `1.5px dashed ${T.borderSoft}`, color: T.sage, background: "rgba(8,36,22,0.4)" }}
          >
            Tap on any collected item to Add to Favorite
          </div>
        )
      ) : (
        groups.map((g) => (
        <div key={g.place.id} className="space-y-3">
          {/* Place header — mirrors Badge tab label typography */}
          <div className="px-1 inline-flex items-center gap-1">
            <span className="text-[15px] font-bold" style={{ color: T.ivory }}>
              {g.place.name} 
            </span>
            <span className="text-[13px] font-semibold" style={{ color: T.sage }}>
              {g.collected}/{g.items.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {g.items.map((item) => {
              const unlocked = progress.collectedItemIds.includes(item.id);
              return (
                <BadgeTile
                  key={item.id}
                  asset={item.asset}
                  name={item.name}
                  unlocked={unlocked}
                  selected={false}
                  onClick={() => onSelectItem(item)}
                  size="large"
                />
              );
            })}
          </div>
        </div>
        ))
      )}
    </div>
  );
}

// ============ Profile View ============

type SelectedBadge = (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" };

function ProfileView({
  progress,
  logs,
  totals,
  bp,
  avatarUrl,
  onEditName,
  onGoBadgesFavorite,
  onGoCollectionFavorite,
  onSelectBadge,
  onSelectItem,
}: {
  progress: Progress;
  logs: SpendingLog[];
  totals: { places: number; placeBadges: number; growthBadges: number; collectionItems: number };
  bp: number;
  avatarUrl: string;
  onEditName: () => void;
  onGoBadgesFavorite: () => void;
  onGoCollectionFavorite: () => void;
  onSelectBadge: (b: SelectedBadge) => void;
  onSelectItem: (i: CollectionItem) => void;
}) {
  const [activityCount, setActivityCount] = useState(1);

  const totalBadges = progress.earnedPlaceBadgeIds.length + progress.unlockedGrowthBadgeIds.length;
  const totalBadgesAll = totals.placeBadges + totals.growthBadges;

  const pills = [
    { label: "Badges", value: `${totalBadges}/${totalBadgesAll}` },
    { label: "Items", value: `${progress.collectedItemIds.length}/${totals.collectionItems}` },
  ];

  // ---- Latest Earned: mix of newest earned badges and collected items ----
  type EarnedEntry =
    | { kind: "badge"; ts: number; badge: SelectedBadge }
    | { kind: "item"; ts: number; item: CollectionItem };
  const earnedEntries: EarnedEntry[] = [];
  for (const l of logs) {
    if (l.type === "unlock_growth_badge") {
      const b = growthBadgeById[l.targetId];
      if (b) earnedEntries.push({ kind: "badge", ts: l.createdAt, badge: { ...b, kind: "growth" } });
    } else if (l.type === "unlock_place") {
      const place = placeById[l.targetId as PlaceId];
      const pb = place ? placeBadgeById[place.placeBadgeId] : undefined;
      if (pb) earnedEntries.push({ kind: "badge", ts: l.createdAt, badge: { ...pb, kind: "place" } });
    } else if (l.type === "unlock_collection_item") {
      const it = collectionItemById[l.targetId];
      if (it) earnedEntries.push({ kind: "item", ts: l.createdAt, item: it });
    }
  }
  // Also seed the two default place badges (from initial progress) if not present in logs
  for (const pbId of progress.earnedPlaceBadgeIds) {
    if (!earnedEntries.some((e) => e.kind === "badge" && e.badge.id === pbId)) {
      const pb = placeBadgeById[pbId];
      if (pb) earnedEntries.push({ kind: "badge", ts: progress.createdAt, badge: { ...pb, kind: "place" } });
    }
  }
  const latestEarned = earnedEntries.sort((a, b) => b.ts - a.ts).slice(0, 4);

  // ---- Favorite badges / items (newest first by their favorite-order in state) ----
  const favBadgeIds = [...progress.favoriteBadgeIds].reverse();
  const favBadges: SelectedBadge[] = favBadgeIds
    .map<SelectedBadge | null>((id) => {
      const pb = placeBadgeById[id];
      if (pb) return { ...pb, kind: "place" };
      const gb = growthBadgeById[id];
      if (gb) return { ...gb, kind: "growth" };
      return null;
    })
    .filter((x): x is SelectedBadge => !!x)
    .slice(0, 5);
  const favItemIds = [...(progress.favoriteItemIds ?? [])].reverse();
  const favItems: CollectionItem[] = favItemIds
    .map((id) => collectionItemById[id])
    .filter((x): x is CollectionItem => !!x)
    .slice(0, 5);

  const activities = logs.map(logToActivity);
  const visibleActivities = activities.slice(0, activityCount);

  return (
    <div className="space-y-6">
      {/* --- Header: avatar + name + stat pills (no frame) --- */}
      <div className="flex flex-col items-center">
        <div className="relative h-[134px] w-[134px]">
          <div
            className="h-full w-full rounded-full grid place-items-center overflow-hidden"
            style={{
              background: "white",
              boxShadow: `0 0 0 2px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)`,
            }}
          >
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
              style={{ transform: "scale(2)", transformOrigin: "50% 10%" }}
            />
          </div>
          <button
            type="button"
            onClick={onEditName}
            aria-label="Edit profile"
            className="absolute top-[20px] left-[20px] -translate-x-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full z-10 active:scale-95 transition-transform"
            style={{
              background: "#1C5732",
              border: `1.5px solid rgba(216,175,87,0.55)`,
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
          >
            <Pencil className="h-[14px] w-[14px]" strokeWidth={2} style={{ color: T.ivory }} />
          </button>
        </div>
        <div
          className="mt-3 text-[22px] font-semibold leading-none"
          style={{ color: T.ivory, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {progress.bloxianName}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 h-8 text-[13px] font-semibold"
            style={{
              background: "rgba(8,36,22,0.72)",
              border: `1.5px solid ${T.borderSoft}`,
              color: T.sage,
            }}
          >
            <span style={{ color: T.ivory }}>{bp.toLocaleString()}</span>
            <span className="text-[13px] font-bold" style={{ color: T.ivory }}>
              Bp
            </span>
          </span>
          {pills.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-1 rounded-full px-3 h-8 text-[13px] font-semibold"
              style={{
                background: "rgba(8,36,22,0.72)",
                border: `1.5px solid ${T.borderSoft}`,
                color: T.sage,
              }}
            >
              <span className="text-[13px] font-bold" style={{ color: T.ivory }}>
                {p.label}
              </span>
              <span>{p.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* --- Latest Earned --- */}
      <ProfileGroup title="Latest Earned">
        {latestEarned.length ? (
          <div className="grid grid-cols-4 gap-3">
            {latestEarned.map((e) =>
              e.kind === "badge" ? (
                <BadgeTile
                  key={`b_${e.badge.id}_${e.ts}`}
                  asset={e.badge.asset}
                  name={e.badge.name}
                  unlocked
                  selected={false}
                  onClick={() => onSelectBadge(e.badge)}
                  size="large"
                  hideName
                />
              ) : (
                <BadgeTile
                  key={`i_${e.item.id}_${e.ts}`}
                  asset={e.item.asset}
                  name={e.item.name}
                  unlocked
                  selected={false}
                  onClick={() => onSelectItem(e.item)}
                  size="large"
                  hideName
                />
              ),
            )}
          </div>
        ) : (
          <EmptyLine>Nothing earned yet — go explore Bloxia.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Badges --- */}
      <ProfileGroup title="Favorite Badges" onAction={onGoBadgesFavorite} actionKind="right">
        {favBadges.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favBadges.map((b) => (
              <BadgeTile
                key={b.id}
                asset={b.asset}
                name={b.name}
                unlocked
                selected={false}
                onClick={() => onSelectBadge(b)}
                size="large"
                hideName
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Tap the heart on any earned badge.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Items --- */}
      <ProfileGroup title="Favorite Items" onAction={onGoCollectionFavorite} actionKind="right">
        {favItems.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favItems.map((it) => (
              <BadgeTile
                key={it.id}
                asset={it.asset}
                name={it.name}
                unlocked
                selected={false}
                onClick={() => onSelectItem(it)}
                size="large"
                hideName
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Tap the heart on any collected item.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Recent Activity --- */}
      <ProfileGroup
        title="Recent Activity"
        onAction={
          activities.length > 1
            ? () =>
                setActivityCount((c) =>
                  c <= 1 ? Math.min(activities.length, 10) : 1,
                )
            : undefined
        }
        actionKind="down"
        actionRotated={activityCount > 1}
      >
        {visibleActivities.length ? (
          <div className="space-y-1.5">
            {visibleActivities.map((a) => (
              <ActivityRow key={a.id} activity={a} />
            ))}
            {activityCount > 1 &&
              activityCount < activities.length &&
              activityCount % 10 === 0 && (
                <div className="flex justify-end pt-1 pr-1">
                  <button
                    type="button"
                    onClick={() =>
                      setActivityCount((c) =>
                        Math.min(activities.length, c + 10),
                      )
                    }
                    aria-label="Show 10 more"
                    className="h-7 w-7 grid place-items-center active:scale-95 transition-transform"
                    style={{ color: T.ivory }}
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}
          </div>
        ) : (
          <EmptyLine>No Bloxia activity yet.</EmptyLine>
        )}
      </ProfileGroup>
    </div>
  );
}

function ProfileGroup({
  title,
  onAction,
  actionKind,
  framed,
  actionRotated,
  children,
}: {
  title: string;
  onAction?: () => void;
  actionKind?: "right" | "down";
  framed?: boolean;
  actionRotated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="text-[15px] font-bold" style={{ color: T.ivory }}>
          {title}
        </div>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            aria-label={actionKind === "down" ? "Show more" : "View all"}
            className="h-7 w-7 grid place-items-center active:scale-95 transition-transform"
            style={{ color: T.ivory }}
          >
            {actionKind === "down" ? (
              <ChevronDown
                className="w-4 h-4 transition-transform"
                strokeWidth={2.5}
                style={{ transform: actionRotated ? "rotate(180deg)" : "none" }}
              />
            ) : (
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>
      {framed ? (
        <div
          className="rounded-[18px] p-3"
          style={{
            background: "rgba(8,36,22,0.55)",
            border: `1.5px solid ${T.borderSoft}`,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// ============ Shared primitives ============

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="rounded-[18px] p-3"
      style={{ background: T.panel, border: `2px solid ${T.border}` }}
    >
      <div className="text-[20px] font-extrabold leading-tight" style={{ color: T.ivory }}>
        {title}
      </div>
      <div className="text-[12px] mt-0.5" style={{ color: T.sage }}>
        {subtitle}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-[14px] px-3 py-2.5"
      style={{ background: T.panelSoft, border: `1.5px solid rgba(216,175,87,0.56)` }}
    >
      <div className="text-[18px] font-extrabold leading-tight" style={{ color: T.goldLight }}>
        {value}
      </div>
      <div className="text-[11px] mt-0.5" style={{ color: T.sage }}>
        {label}
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[18px] p-3"
      style={{ background: T.panel, border: `2px solid ${T.border}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[14px] font-extrabold" style={{ color: T.ivory }}>
          {title}
        </div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center gap-0.5 text-[11px] font-extrabold"
            style={{ color: T.goldLight }}
          >
            {action.label} <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyLine({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[12px] text-center py-3 text-[12px]"
      style={{ border: `2px dashed ${T.borderSoft}`, color: T.sage }}
    >
      {children}
    </div>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div
      className="rounded-[12px] px-3 py-2 flex items-center justify-between"
      style={{ background: "rgba(255,244,191,0.06)" }}
    >
      <div className="min-w-0">
        <div className="text-[12px] font-extrabold truncate" style={{ color: T.ivory }}>
          {activity.title}
        </div>
        <div className="text-[10px]" style={{ color: T.sage }}>
          {activity.date}
        </div>
      </div>
      <div
        className="text-[11px] font-extrabold shrink-0"
        style={{ color: activity.positive ? "#8AE68A" : T.goldLight }}
      >
        {activity.bpText}
      </div>
    </div>
  );
}

interface Activity {
  id: string;
  title: string;
  date: string;
  bpText: string;
  positive?: boolean;
}
function logToActivity(log: SpendingLog): Activity {
  const date = formatActivityDate(log.createdAt);
  let title = "Bloxia activity";
  let sign: "+" | "-" = "-";
  if (log.type === "unlock_place") title = `Unlocked ${placeById[log.targetId as PlaceId]?.name ?? "place"}`;
  else if (log.type === "unlock_growth_badge")
    title = `Earned ${growthBadgeById[log.targetId]?.name ?? "growth badge"}`;
  else if (log.type === "unlock_collection_item")
    title = `Collected ${collectionItemById[log.targetId]?.name ?? "item"}`;
  else if (log.type === "earn_wordie") {
    title = log.label ? `myWordie · ${log.label}` : "myWordie practice";
    sign = "+";
  } else if (log.type === "earn_talk") {
    title = log.label ? `ShirinTalk · ${log.label}` : "ShirinTalk practice";
    sign = "+";
  }
  return {
    id: log.id,
    title,
    date,
    bpText: log.bpAmount ? `${sign}${formatBp(log.bpAmount)}` : "",
    positive: sign === "+",
  };
}

function formatActivityDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOfToday - startOfDate) / 86400000);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (diffDays === 0) return `Today ${hh}:${mm}`;
  if (diffDays === 1) return `Yesterday ${hh}:${mm}`;
  if (diffDays > 1 && diffDays < 7) {
    const wk = d.toLocaleDateString("en-US", { weekday: "short" });
    return `${wk} ${hh}:${mm}`;
  }
  const month = d.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${d.getDate()} ${d.getFullYear()}`;
}

// ============ Sheets ============

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-transparent pointer-events-auto"
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-[24px] pointer-events-auto flex flex-col"
        style={{
          background: "transparent",
          borderTop: `2px solid ${T.border}`,
          boxShadow: "0 -12px 30px rgba(0,0,0,0.45)",
        }}
      >
        {/* Background layer extends to the bottom of the screen, giving the nav bar the same base color */}
        <div
          className="absolute inset-0 rounded-t-[24px]"
          style={{ background: "rgba(8, 36, 22, 0.52)", backdropFilter: "blur(6px)" }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full grid place-items-center"
          style={{ background: "rgba(255,244,191,0.1)", color: T.goldLight }}
        >
          <X className="w-4 h-4" />
        </button>
        <div
          className="relative p-5 overflow-y-auto flex flex-col"
          style={{
            height: "calc(100dvh - 19.5rem - 2 * env(safe-area-inset-bottom))",
            paddingTop: "calc(0.75rem + 24px)",
            paddingBottom: "calc(5rem + 3.5rem + max(1rem, env(safe-area-inset-bottom)))",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function PlaceSheet({
  place,
  progress,
  bp,
  onClose,
  onUnlock,
  onExplore,
}: {
  place: Place;
  progress: Progress;
  bp: number;
  onClose: () => void;
  onUnlock: () => void;
  onExplore: () => void;
}) {
  const unlocked = progress.unlockedPlaceIds.includes(place.id);
  const canUnlock = !unlocked && bp >= place.unlockBp;
  const statusText = progress.currentPlaceId === place.id
    ? "Current"
    : unlocked
    ? "Visited"
    : canUnlock
    ? "Available"
    : "Locked";
  const badge = placeBadgeById[place.placeBadgeId];

  return (
    <Sheet onClose={onClose}>
      <img
        src={badge.asset}
        alt=""
        className="h-28 w-28 mx-auto"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {place.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {place.description}
      </div>

      <div className="mt-3 space-y-2">
        <SheetRow label="Required Bp" value={formatBp(place.unlockBp)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {!unlocked && !canUnlock && (
        <div
          className="mt-auto w-full h-14 rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          {formatBp(place.unlockBp - bp)} still needed to unlock
        </div>
      )}

      {unlocked && (
        <div
          className="mt-auto w-full h-14 rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          You are here
        </div>
      )}
      {!unlocked && canUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center"
          style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
        >
          Unlock Place
        </button>
      )}
    </Sheet>
  );
}

function ItemSheet({
  item,
  progress,
  bp,
  onClose,
  onCollect,
  onToggleFavorite,
}: {
  item: CollectionItem;
  progress: Progress;
  bp: number;
  onClose: () => void;
  onCollect: () => void;
  onToggleFavorite: () => void;
}) {
  const collected = progress.collectedItemIds.includes(item.id);
  const placeUnlocked = progress.unlockedPlaceIds.includes(item.placeId);
  const canCollect = !collected && placeUnlocked && bp >= item.bpCost;
  const isFavorite = (progress.favoriteItemIds ?? []).includes(item.id);
  const statusText = collected
    ? isFavorite ? "Favorite" : "Collected"
    : !placeUnlocked ? "Place Locked" : canCollect ? "Available" : "Locked";
  return (
    <Sheet onClose={onClose}>
      <img
        src={item.asset}
        alt=""
        className="h-28 w-28 mx-auto"
        style={{
          imageRendering: "pixelated",
          opacity: collected ? 1 : 0.4,
          filter: collected ? undefined : "grayscale(60%)",
        }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {item.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {item.description}
      </div>
      <div className="mt-3 space-y-2">
        <SheetRow label={collected ? "Used Bp" : "Required Bp"} value={formatBp(item.bpCost)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {collected ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          {isFavorite ? "Favorite" : "Add to Favorite"}
        </button>
      ) : canCollect ? (
        <button
          type="button"
          onClick={onCollect}
          className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          Collect
        </button>
      ) : (
        <div
          className="mt-auto w-full h-14 rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          {!placeUnlocked
            ? "Unlock this place first"
            : `${(item.bpCost - bp).toLocaleString()} Bp still needed to collect`}
        </div>
      )}
    </Sheet>
  );
}

function NameEditor({
  initial,
  initialAvatarId,
  onClose,
  onSave,
}: {
  initial: string;
  initialAvatarId: string;
  onClose: () => void;
  onSave: (avatarId: string, name: string) => void;
}) {
  const [name, setName] = useState(
    initial && initial.trim() !== DEFAULT_BLOXIAN_NAME ? initial.trim() : "",
  );
  const startIndex = Math.max(
    0,
    BLOXIAN_AVATARS.findIndex((a) => a.id === initialAvatarId),
  );
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useState<{ x: number | null }>({ x: null })[0];
  const total = BLOXIAN_AVATARS.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const current = BLOXIAN_AVATARS[index];
  const prev = BLOXIAN_AVATARS[mod(index - 1)];
  const next = BLOXIAN_AVATARS[mod(index + 1)];
  const go = (delta: number) => setIndex((i) => mod(i + delta));
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.x = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.x == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.x;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
    touchStartX.x = null;
  };
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col min-h-full">
        <div className="text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
          Edit Profile
        </div>
        <div
          className="mt-10 flex items-center justify-center gap-4 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={prev.portrait}
              alt=""
              className="h-full w-full object-cover"
              style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
              draggable={false}
            />
          </button>
          <div className="relative h-[134px] w-[134px] shrink-0">
            <div
              className="h-full w-full rounded-full overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 2px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={current.portrait}
                alt=""
                className="h-full w-full object-cover"
                style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
                draggable={false}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={next.portrait}
              alt=""
              className="h-full w-full object-cover"
              style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
              draggable={false}
            />
          </button>
        </div>
        <div className="mt-auto flex items-stretch gap-3">
          <div
            className="flex-1 flex items-center justify-center gap-1 rounded-full px-5 h-14 relative"
            style={{
              background: "rgba(8,36,22,0.55)",
              border: `1.5px solid ${T.borderSoft}`,
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              placeholder="Enter your name"
              className="min-w-0 bg-transparent outline-none text-center text-[15px] font-semibold placeholder:font-normal placeholder:text-[rgba(183,217,183,0.55)]"
              style={{
                color: T.ivory,
                letterSpacing: "-0.01em",
              } as React.CSSProperties}
            />
          </div>
          <button
            type="button"
            onClick={() => onSave(current.id, name.trim() || DEFAULT_BLOXIAN_NAME)}
            className="h-14 px-7 rounded-full text-[15px] font-semibold shrink-0"
            style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
          >
            Save
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function AvatarPickerSheet({
  title,
  subtitle,
  selectedAvatarId,
  confirmLabel = "Save",
  onClose,
  onConfirm,
}: {
  title: string;
  subtitle?: string;
  selectedAvatarId: string;
  confirmLabel?: string;
  onClose?: () => void;
  onConfirm: (id: string) => void;
}) {
  const [pending, setPending] = useState(selectedAvatarId);
  return (
    <Sheet onClose={onClose ?? (() => {})}>
      <div className="flex flex-col h-full">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
            {subtitle}
          </div>
        )}
        <div className="grid grid-cols-4 gap-x-3 gap-y-6 mt-5">
          {BLOXIAN_AVATARS.map((a) => {
            const active = a.id === pending;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setPending(a.id)}
                className="flex items-center justify-center active:scale-95 transition-transform"
              >
                <div
                  className="h-16 w-16 rounded-full overflow-hidden"
                  style={{
                    background: "white",
                    boxShadow: active
                      ? `0 0 0 2.5px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.45)`
                      : `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
                  }}
                >
                  <img
                    src={a.portrait}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ transform: "scale(2)", transformOrigin: "50% 10%" }}
                    draggable={false}
                  />
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onConfirm(pending)}
            className="w-full h-12 rounded-full text-[15px] font-semibold"
            style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="relative isolate flex items-center gap-3 rounded-full py-3 px-5 min-h-[60px]"
      style={{
        background: "rgba(8,36,22,0.55)",
        border: `1.5px solid ${T.borderSoft}`,
      }}
    >
      <span
        className="shrink-0 text-[15px] font-semibold leading-none"
        style={{ color: T.goldLight, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function WelcomeSheet({
  initialAvatarId,
  initialName,
  onStart,
  onClose,
}: {
  initialAvatarId: string;
  initialName: string;
  onStart: (avatarId: string, name: string) => void;
  onClose: () => void;
}) {
  const startIndex = Math.max(
    0,
    BLOXIAN_AVATARS.findIndex((a) => a.id === initialAvatarId),
  );
  const [index, setIndex] = useState(startIndex);
  const [name, setName] = useState("");
  const touchStartX = useState<{ x: number | null }>({ x: null })[0];
  const total = BLOXIAN_AVATARS.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const current = BLOXIAN_AVATARS[index];
  const prev = BLOXIAN_AVATARS[mod(index - 1)];
  const next = BLOXIAN_AVATARS[mod(index + 1)];

  const go = (delta: number) => setIndex((i) => mod(i + delta));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.x = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.x == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.x;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
    touchStartX.x = null;
  };

  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col min-h-full">
        <div className="text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
          Welcome to Bloxia
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-4 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={prev.portrait}
              alt=""
              className="h-full w-full object-cover"
              style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
              draggable={false}
            />
          </button>

          <div className="relative h-[134px] w-[134px] shrink-0">
            <div
              className="h-full w-full rounded-full overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 2px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={current.portrait}
                alt=""
                className="h-full w-full object-cover"
                style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
                draggable={false}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={next.portrait}
              alt=""
              className="h-full w-full object-cover"
              style={{ transform: "scale(1.7)", transformOrigin: "50% 10%" }}
              draggable={false}
            />
          </button>
        </div>

        <div className="mt-auto flex items-stretch gap-3">
          <div
            className="flex-1 flex items-center justify-center gap-1 rounded-full px-5 h-14"
            style={{
              background: "rgba(8,36,22,0.55)",
              border: `1.5px solid ${T.borderSoft}`,
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              placeholder="Enter your name"
              className="min-w-0 bg-transparent outline-none text-center text-[15px] font-semibold placeholder:font-normal placeholder:text-[rgba(183,217,183,0.55)]"
              style={{
                color: T.ivory,
                letterSpacing: "-0.01em",
                fieldSizing: "content",
                width: "auto",
              } as React.CSSProperties}
            />
          </div>
          <button
            type="button"
            onClick={() => onStart(current.id, name.trim() || DEFAULT_BLOXIAN_NAME)}
            className="h-14 px-7 rounded-full text-[15px] font-semibold shrink-0"
            style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
          >
            Start
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function ActivitySheet({ logs, onClose }: { logs: SpendingLog[]; onClose: () => void }) {
  const activities = logs.map(logToActivity);
  return (
    <Sheet onClose={onClose}>
      <div className="text-center text-[18px] font-extrabold" style={{ color: T.ivory }}>
        Activity Log
      </div>
      <div className="mt-4 max-h-[55vh] overflow-y-auto space-y-1.5 pr-1">
        {activities.length ? (
          activities.map((a) => <ActivityRow key={a.id} activity={a} />)
        ) : (
          <EmptyLine>No Bloxia activity yet.</EmptyLine>
        )}
      </div>
    </Sheet>
  );
}

function SheetRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 text-[13px]"
      style={{ borderTop: `1px solid rgba(216,175,87,0.22)`, color: T.goldLight }}
    >
      <span style={{ color: T.sage }}>{label}</span>
      <span className="font-extrabold">{value}</span>
    </div>
  );
}

function BadgeSheet({
  badge,
  progress,
  bp,
  onClose,
  onToggleFavorite,
  onUnlockGrowth,
}: {
  badge: (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" };
  progress: Progress;
  bp: number;
  onClose: () => void;
  onToggleFavorite: () => void;
  onUnlockGrowth: () => void;
}) {
  const unlocked =
    badge.kind === "place"
      ? progress.earnedPlaceBadgeIds.includes(badge.id)
      : progress.unlockedGrowthBadgeIds.includes(badge.id);
  const isFavorite = progress.favoriteBadgeIds.includes(badge.id);
  const isGrowthLocked = badge.kind === "growth" && !unlocked;
  const growthCost = badge.kind === "growth" ? (badge as GrowthBadge).bpCost : 0;
  const canAfford = bp >= growthCost;
  const cost =
    badge.kind === "place"
      ? PLACES.find((p) => p.placeBadgeId === badge.id)?.unlockBp ?? 0
      : growthCost;
  const statusText = unlocked
    ? isFavorite
      ? "Favorite"
      : "Earned"
    : isGrowthLocked
    ? canAfford
      ? "Available"
      : "Locked"
    : "Locked";

  return (
    <Sheet onClose={onClose}>
      <img
        src={badge.asset}
        alt=""
        className="h-28 w-28 mx-auto"
        style={{
          imageRendering: "pixelated",
          opacity: unlocked ? 1 : 0.4,
          filter: unlocked ? undefined : "grayscale(60%)",
        }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {badge.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {badge.description}
      </div>

      <div className="mt-3 space-y-2">
        <SheetRow label={unlocked ? "Used Bp" : "Required Bp"} value={formatBp(cost)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {isGrowthLocked ? (
        canAfford ? (
          <button
            type="button"
            onClick={onUnlockGrowth}
            className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center"
            style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
          >
            Unlock · {growthCost.toLocaleString()} Bp
          </button>
        ) : (
          <div
            className="mt-auto w-full h-14 rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
            style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
          >
            {(growthCost - bp).toLocaleString()} Bp still needed to unlock
          </div>
        )
      ) : isFavorite ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          Favorite
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!unlocked}
          className="mt-auto w-full h-14 rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{
            background: "rgba(216,175,87,0.12)",
            color: unlocked ? T.goldLight : T.sage,
            opacity: unlocked ? 1 : 0.75,
          }}
        >
          <Heart className="w-4 h-4" fill="none" />
          {unlocked ? "Add to Favorite" : "Locked"}
        </button>
      )}
    </Sheet>
  );
}
```

### src/routes/calendar.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
import { CalendarDays } from "lucide-react";
export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [
      { title: "Calendar — Paisley EC" },
      { name: "description", content: "Your learning calendar and upcoming sessions." },
      { property: "og:title", content: "Calendar — Paisley EC" },
      { property: "og:description", content: "Your learning calendar and upcoming sessions." },
    ] }),
  component: () => (
    <ComingSoon
      title="Calendar"
      back="/profile"
      accent="var(--bloxia)"
      icon={CalendarDays}
      note="Soon you'll see every lesson, test and adventure in one place."
    />
  ),
});

```

### src/routes/cefr-test.tsx

```tsx
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ProgressBar } from "@/components/app/WordieKit";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Check,
  X,
  Clock,
  Lock,
  Play,
  Headphones,
  BookOpen,
  FileText,
  Sparkles,
  PenLine,
} from "lucide-react";

export const Route = createFileRoute("/cefr-test")({
  head: () => ({
    meta: [
      { title: "CEFR Test — Paisley EC" },
      { name: "description", content: "Find your CEFR level with a short, kid-friendly assessment." },
      { property: "og:title", content: "CEFR Test — Paisley EC" },
      { property: "og:description", content: "Find your CEFR level with a short, kid-friendly assessment." },
    ],
  }),
  component: CefrTestPage,
});

// ───────── Stage meta ─────────
type Stage = "listening" | "reading" | "grammar" | "vocabulary" | "writing";

const STAGE_ORDER: Stage[] = ["listening", "reading", "grammar", "vocabulary", "writing"];

const STAGE_META: Record<
  Stage,
  {
    label: string;
    title: string;
    note: string;
    points: number;
    icon: typeof Headphones;
  }
> = {
  listening: {
    label: "Listening",
    title: "Part A: Listening",
    note: "Listen carefully and choose the best answer.",
    points: 20,
    icon: Headphones,
  },
  reading: {
    label: "Reading",
    title: "Part B: Reading",
    note: "Read the short passage, then answer the questions.",
    points: 20,
    icon: BookOpen,
  },
  grammar: {
    label: "Grammar",
    title: "Part C: Grammar",
    note: "Choose the correct word to complete each sentence.",
    points: 20,
    icon: FileText,
  },
  vocabulary: {
    label: "Vocabulary",
    title: "Part D: Vocabulary",
    note: "Match words to meaning or the opposite idea.",
    points: 20,
    icon: Sparkles,
  },
  writing: {
    label: "Writing",
    title: "Part E: Writing",
    note: "Write a short answer in clear full sentences.",
    points: 20,
    icon: PenLine,
  },
};

// ───────── Mock questions ─────────
type Choice = { id: string; label: string; isCorrect: boolean };
type Question = {
  id: string;
  stage: Stage;
  number: number;
  prompt: string;
  helper?: string;
  transcript?: string;
  choices?: Choice[];
};

const mk = (
  id: string,
  stage: Stage,
  number: number,
  prompt: string,
  choices: [string, boolean][],
  extra: Partial<Question> = {},
): Question => ({
  id,
  stage,
  number,
  prompt,
  choices: choices.map(([label, isCorrect], i) => ({
    id: `${id}-${i}`,
    label,
    isCorrect,
  })),
  ...extra,
});

const READING_PASSAGE = {
  title: "Lena and the School Garden",
  lines: [
    "Every Tuesday afternoon, Lena goes to the school garden with her class. The children water the tomato plants and check the flowers near the gate.",
    "Last week, Lena found a small green caterpillar on a leaf. Her teacher said it would become a butterfly later. Lena drew the caterpillar in her notebook and wrote three sentences about it.",
    "Next month, the class will invite parents to visit the garden and see what the children have grown.",
  ],
};

const QUESTIONS: Question[] = [
  // Listening (2)
  mk("L1", "listening", 1, "What is Tom doing?", [
    ["Playing football", true],
    ["Reading a book", false],
    ["Eating breakfast", false],
    ["Swimming", false],
  ], { transcript: "Tom is at the park. He is kicking a football with his brother." }),
  mk("L2", "listening", 2, "What should children bring on the class trip?", [
    ["A laptop", false],
    ["A water bottle", true],
    ["A toy car", false],
    ["A blanket", false],
  ], { transcript: "Our class trip is on Friday. Bring a water bottle, a hat, and your lunch box." }),
  // Reading (2)
  mk("R1", "reading", 3, "When does Lena go to the school garden?", [
    ["Every Monday morning", false],
    ["Every Tuesday afternoon", true],
    ["Every Friday evening", false],
    ["Every Sunday afternoon", false],
  ]),
  mk("R2", "reading", 4, "What did Lena find on a leaf?", [
    ["A butterfly", false],
    ["A flower", false],
    ["A caterpillar", true],
    ["A tomato", false],
  ]),
  // Grammar (2)
  mk("G1", "grammar", 5, "My sister usually ___ breakfast at seven o'clock.", [
    ["have", false],
    ["has", true],
    ["having", false],
    ["had", false],
  ]),
  mk("G2", "grammar", 6, "We went to the library ___ we needed new books.", [
    ["because", true],
    ["but", false],
    ["or", false],
    ["than", false],
  ]),
  // Vocabulary (2)
  mk("V1", "vocabulary", 7, "Choose the word for what you use in the rain.", [
    ["Ball", false],
    ["Umbrella", true],
    ["Chair", false],
    ["Apple", false],
  ]),
  mk("V2", "vocabulary", 8, "Choose the opposite of: noisy", [
    ["quiet", true],
    ["bright", false],
    ["quick", false],
    ["heavy", false],
  ]),
];

const WRITING_BULLETS = [
  "What time your school day starts",
  "Two lessons or activities you do",
  "One thing you enjoy and why",
  "Use at least 35 words if you can",
];

const LEVEL_LEGEND = [
  { level: "Pre A1", label: "Starter words and short routines" },
  { level: "A1", label: "Simple everyday English" },
  { level: "A2", label: "Confident familiar topics" },
  { level: "B1", label: "Independent connected English" },
  { level: "B2+", label: "Detailed and structured expression" },
];

// ───────── Helpers ─────────
function shouldSingleColumn(choices?: Choice[]) {
  if (!choices) return false;
  return choices.some((c) => c.label.length > 16 || c.label.split(/\s+/).length > 2);
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

// ───────── Page ─────────
type Mode = "locked" | "info" | "quiz" | "result";

const START_LOCKED = false;

function CefrTestPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(START_LOCKED ? "locked" : "info");
  const [testNumber, setTestNumber] = useState<number>(1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("locked") === "1") {
      setMode("locked");
    }
    try {
      const raw = window.localStorage.getItem("cefrTestCount");
      const n = raw ? parseInt(raw, 10) : 0;
      setTestNumber((Number.isFinite(n) ? n : 0) + 1);
    } catch {
      setTestNumber(1);
    }
  }, []);

  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writingAnswer, setWritingAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [audioPlays, setAudioPlays] = useState<Record<string, number>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (mode === "quiz") {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mode !== "result") setSeconds(0);
    }
  }, [mode]);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1600);
  };

  const startTest = () => {
    setAnswers({});
    setWritingAnswer("");
    setSeconds(0);
    setStageIdx(0);
    setMode("quiz");
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("cefrTestCount", String(testNumber));
      } catch {}
    }
  };

  const stageKey = STAGE_ORDER[stageIdx];
  const stageQs = useMemo(
    () => QUESTIONS.filter((q) => q.stage === stageKey),
    [stageKey],
  );

  const stageDone =
    stageKey === "writing"
      ? wordCount(writingAnswer) > 0
      : stageQs.every((q) => answers[q.id] !== undefined);

  const goNext = () => {
    if (!stageDone) {
      showToast(`Finish ${STAGE_META[stageKey].label} first`);
      return;
    }
    if (stageIdx < STAGE_ORDER.length - 1) {
      setStageIdx(stageIdx + 1);
    } else {
      setMode("result");
    }
  };

  const goPrev = () => {
    if (stageIdx > 0) setStageIdx(stageIdx - 1);
  };

  const pickChoice = (q: Question, choiceId: string) =>
    setAnswers((a) => ({ ...a, [q.id]: choiceId }));

  const playAudio = (q: Question) => {
    const used = audioPlays[q.id] || 0;
    if (used >= 2) {
      showToast("Audio limit reached");
      return;
    }
    setAudioPlays((p) => ({ ...p, [q.id]: used + 1 }));
    setAudioPlaying(q.id);
    setTimeout(() => setAudioPlaying(null), 1100);
  };

  // Grading
  const writingWords = wordCount(writingAnswer);
  const grading = useMemo(() => {
    const results = QUESTIONS.map((q) => {
      const choiceId = answers[q.id];
      const c = q.choices?.find((c) => c.id === choiceId);
      return { q, correct: !!c?.isCorrect, choiceId };
    });
    const correctCount = results.filter((r) => r.correct).length;
    const objectiveScore = correctCount * 10; // 8 q × 10 = 80
    const writingScore =
      writingWords >= 50 ? 20 : writingWords >= 35 ? 16 : writingWords >= 20 ? 10 : writingWords > 0 ? 5 : 0;
    const total = objectiveScore + writingScore;
    const dims: Record<Stage, { score: number; max: number }> = {
      listening: { score: 0, max: 20 },
      reading: { score: 0, max: 20 },
      grammar: { score: 0, max: 20 },
      vocabulary: { score: 0, max: 20 },
      writing: { score: writingScore, max: 20 },
    };
    results.forEach((r) => {
      if (r.correct) dims[r.q.stage].score += 10;
    });
    const level = total >= 85 ? "B1" : total >= 70 ? "A2" : total >= 45 ? "A1" : "Pre A1";
    const cambridge =
      total >= 85
        ? "Cambridge B1 Preliminary for Schools"
        : total >= 70
        ? "A2 Flyers"
        : total >= 45
        ? "A1 Movers"
        : "Pre A1 Starters";
    return { results, correctCount, total, dims, level, cambridge };
  }, [answers, writingWords]);

  // 7 segments: info + 5 stages + result
  const totalSteps = STAGE_ORDER.length + 2;
  const currentStep = mode === "info" ? 1 : mode === "result" ? totalSteps : stageIdx + 2;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] bg-white">
        {/* Top bar */}
        <div className="px-4 pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {(mode === "quiz" || mode === "info") && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-muted-foreground">
                {currentStep} / {totalSteps}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background: "color-mix(in oklab, var(--paisley) 12%, white)",
                  color: "var(--paisley)",
                }}
              >
                {mode === "info" ? "Info" : STAGE_META[stageKey].label}
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {fmtTime(mode === "info" ? 0 : seconds)}
              </span>
            </div>
          )}
          {mode === "result" && <span />}
          {mode === "locked" && <span />}
          <span className="h-9 w-9" aria-hidden />
        </div>

        {/* Title — info/locked */}
        {(mode === "info" || mode === "locked") && (
          <div className="px-5 pt-3 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: "var(--paisley)", letterSpacing: "-0.01em" }}
            >
              CEFR Test
            </h1>
          </div>
        )}

        {/* Body */}
        <div className="px-5 pt-4 pb-10">
          {mode === "locked" && <LockedView testNumber={testNumber} />}
          {mode === "info" && <InfoView onStart={startTest} testNumber={testNumber} />}
          {mode === "quiz" && (
            <QuizView
              stageKey={stageKey}
              stageIdx={stageIdx}
              questions={stageQs}
              answers={answers}
              writingAnswer={writingAnswer}
              setWritingAnswer={setWritingAnswer}
              audioPlaying={audioPlaying}
              audioPlays={audioPlays}
              onPlay={playAudio}
              onPick={pickChoice}
              onPrev={goPrev}
              onNext={goNext}
              isLast={stageIdx === STAGE_ORDER.length - 1}
              stageDone={stageDone}
            />
          )}
          {mode === "result" && (
            <ResultView
              total={grading.total}
              level={grading.level}
              cambridge={grading.cambridge}
              timeText={fmtTime(seconds || 222)}
              dims={grading.dims}
              results={grading.results}
              writingAnswer={writingAnswer}
              writingWords={writingWords}
              onReview={(id) => setReviewId(id)}
            />
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold">
            {toast}
          </div>
        )}

        {reviewId && (
          <ReviewOverlay
            question={QUESTIONS.find((q) => q.id === reviewId)!}
            selected={answers[reviewId]}
            onClose={() => setReviewId(null)}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

// ───────── Locked ─────────
function LockedView({ testNumber }: { testNumber: number }) {
  const lastNum = Math.max(0, testNumber - 1);
  return (
    <div className="mt-4 rounded-3xl bg-white border border-border p-5 text-center">
      <div
        className="mx-auto h-14 w-14 rounded-2xl grid place-items-center mb-3"
        style={{
          background: "color-mix(in oklab, var(--paisley) 14%, white)",
          color: "var(--paisley)",
        }}
      >
        <Lock className="h-6 w-6" />
      </div>
      <p className="font-semibold text-[16px]">CEFR Test is locked for now</p>
      <p className="text-[13px] text-muted-foreground mt-1">Available in 60 days</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Last CEFR Test</p>
          <p className="text-[13px] font-semibold mt-1">Jun 11 · #{String(lastNum).padStart(2, "0")}</p>
        </div>
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Next CEFR Test</p>
          <p className="text-[13px] font-semibold mt-1">Aug 10 · #{String(testNumber).padStart(2, "0")}</p>
        </div>
      </div>
    </div>
  );
}

// ───────── Info ─────────
function InfoView({ onStart, testNumber }: { onStart: () => void; testNumber: number }) {
  const numLabel = `#${String(testNumber).padStart(2, "0")}`;
  return (
    <div>
      <section className="rounded-3xl bg-white border border-border p-5">
        <p
          className="text-[20px] font-semibold leading-none"
          style={{ color: "var(--paisley)", letterSpacing: "-0.01em" }}
        >
          {numLabel}
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-semibold">
          {[
            "5 short parts: listening, reading, grammar, vocabulary, writing.",
            "Each audio can be played 2 times.",
            "Most children finish in 15-25 minutes.",
            "You'll see your CEFR level and Cambridge match.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--paisley) 14%, white)" }}
              >
                <Check className="h-3 w-3" style={{ color: "var(--paisley)" }} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--paisley)", fontSize: "17.25px" }}
      >
        <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
        <span>Start Test</span>
      </button>
    </div>
  );
}

// ───────── Quiz ─────────
function QuizView({
  stageKey,
  stageIdx,
  questions,
  answers,
  writingAnswer,
  setWritingAnswer,
  audioPlaying,
  audioPlays,
  onPlay,
  onPick,
  onPrev,
  onNext,
  isLast,
  stageDone,
}: {
  stageKey: Stage;
  stageIdx: number;
  questions: Question[];
  answers: Record<string, string>;
  writingAnswer: string;
  setWritingAnswer: (v: string) => void;
  audioPlaying: string | null;
  audioPlays: Record<string, number>;
  onPlay: (q: Question) => void;
  onPick: (q: Question, choiceId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  stageDone: boolean;
}) {
  const meta = STAGE_META[stageKey];
  const totalSegments = STAGE_ORDER.length;
  const words = wordCount(writingAnswer);

  return (
    <div>
      {/* Progress segments */}
      <div className="flex gap-1 mb-4">
        {STAGE_ORDER.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i < stageIdx
                  ? "var(--paisley)"
                  : i === stageIdx
                  ? "var(--paisley)"
                  : "color-mix(in oklab, var(--paisley) 10%, white)",
              opacity: i <= stageIdx ? 1 : 1,
            }}
          />
        ))}
      </div>

      {/* Stage banner */}
      <section
        className="rounded-3xl p-5 text-white"
        style={{ background: "var(--paisley)" }}
      >
        <div className="flex items-center justify-between">
          <h2
            className="text-[24px] font-medium leading-none"
            style={{ letterSpacing: "-0.01em" }}
          >
            {meta.label}
          </h2>
          <span className="text-[11px] font-semibold rounded-full bg-white/22 px-2 py-0.5">
            {meta.points} Pt
          </span>
        </div>
        <p className="mt-2 text-[13px] font-semibold opacity-95">{meta.note}</p>
      </section>

      {/* Reading passage */}
      {stageKey === "reading" && (
        <article
          className="mt-4 rounded-3xl p-4"
          style={{
            background: "color-mix(in oklab, var(--paisley-yellow) 18%, white)",
            border: "1px solid color-mix(in oklab, var(--paisley-yellow) 45%, white)",
          }}
        >
          <h3 className="text-[14px] font-semibold">{READING_PASSAGE.title}</h3>
          <div className="mt-2 space-y-2 text-[14px] font-semibold leading-6 text-foreground/85">
            {READING_PASSAGE.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>
      )}

      {/* Questions */}
      {stageKey === "writing" ? (
        <section className="mt-4 rounded-3xl bg-white border border-border p-4">
          <h3 className="text-[14px] font-semibold">Write about your school day. Please include:</h3>
          <ul className="mt-3 space-y-1.5 text-[13px] font-semibold">
            {WRITING_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full grid place-items-center"
                  style={{ background: "color-mix(in oklab, var(--paisley) 14%, white)" }}
                >
                  <Check className="h-2.5 w-2.5" style={{ color: "var(--paisley)" }} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-end">
            <span
              className="text-[11px] font-semibold"
              style={{
                color: words >= 35 ? "var(--paisley)" : "var(--paisley-yellow)",
              }}
            >
              {words} words
            </span>
          </div>
          <textarea
            id="writing-answer"
            value={writingAnswer}
            onChange={(e) => setWritingAnswer(e.target.value)}
            placeholder="Write here..."
            className="mt-2 min-h-[180px] w-full resize-none rounded-2xl border bg-white p-3 text-[14px] leading-6 outline-none transition placeholder:text-muted-foreground"
            style={{ borderColor: "var(--paisley-yellow)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--paisley)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--paisley-yellow)")}
          />
        </section>
      ) : (
        <div className="mt-4 space-y-3">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              qNum={i + 1}
              selected={answers[q.id]}
              audioPlaying={audioPlaying === q.id}
              plays={audioPlays[q.id] || 0}
              onPlay={() => onPlay(q)}
              onPick={(cid) => onPick(q, cid)}
            />
          ))}
        </div>
      )}

      {/* Nav */}
      <div className="mt-5 flex gap-2.5">
        {stageIdx > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 rounded-full py-3.5 font-semibold border border-border bg-white text-[14px]"
            style={{ color: "var(--paisley)" }}
          >
            Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-[2] rounded-full py-3.5 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5 text-[14px]"
          style={{
            background: stageDone
              ? "var(--paisley)"
              : "color-mix(in oklab, var(--paisley) 35%, white)",
          }}
        >
          {isLast ? "Submit" : "Next"}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
  qNum,
  selected,
  audioPlaying,
  plays,
  onPlay,
  onPick,
}: {
  q: Question;
  qNum: number;
  selected?: string;
  audioPlaying: boolean;
  plays: number;
  onPlay: () => void;
  onPick: (choiceId: string) => void;
}) {
  const singleCol = shouldSingleColumn(q.choices);

  return (
    <section className="rounded-3xl bg-white border border-border p-4">
      <div className="flex items-center gap-3">
        <span
          className="h-7 w-7 grid place-items-center rounded-full text-[12px] font-semibold shrink-0"
          style={{
            background: "color-mix(in oklab, var(--paisley) 12%, white)",
            color: "var(--paisley)",
          }}
        >
          {qNum}
        </span>

        {q.stage === "listening" ? (
          <button
            type="button"
            onClick={onPlay}
            aria-label={audioPlaying ? "Playing" : "Play audio"}
            disabled={plays >= 2}
            className="h-8 w-8 grid place-items-center rounded-full text-white active:scale-95 shadow disabled:opacity-50"
            style={{ background: "var(--paisley)" }}
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <p
            className="text-[20px] font-semibold"
            style={{ letterSpacing: "-0.01em" }}
          >
            {q.prompt}
          </p>
        )}
      </div>

      {q.stage === "listening" && (
        <p
          className="mt-3 text-[20px] font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          {q.prompt}
        </p>
      )}

      <div className={`mt-3 ${singleCol ? "space-y-2" : "grid grid-cols-2 gap-2"}`}>
        {q.choices?.map((c) => {
          const sel = selected === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onPick(c.id)}
              className="rounded-2xl border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors"
              style={{
                background: sel
                  ? "color-mix(in oklab, var(--paisley) 10%, white)"
                  : "white",
                borderColor: sel ? "var(--paisley)" : "var(--border)",
                color: sel ? "var(--paisley)" : "var(--foreground)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ───────── Result ─────────
function ResultView({
  total,
  level,
  cambridge,
  timeText,
  dims,
  results,
  writingAnswer,
  writingWords,
  onReview,
}: {
  total: number;
  level: string;
  cambridge: string;
  timeText: string;
  dims: Record<Stage, { score: number; max: number }>;
  results: { q: Question; correct: boolean }[];
  writingAnswer: string;
  writingWords: number;
  onReview: (id: string) => void;
}) {
  const bp = total >= 85 ? 20 : total >= 70 ? 15 : total >= 45 ? 10 : 5;
  return (
    <div>
      {/* Hero */}
      <section
        className="relative rounded-[28px] px-5 pt-6 pb-7 text-white text-center overflow-hidden"
        style={{ background: "var(--paisley)" }}
      >
        <h2
          className="text-center text-[22px] font-medium leading-none"
          style={{ letterSpacing: "-0.01em", color: "white" }}
        >
          Test Completed!
        </h2>
        <div className="mt-3">
          <ProgressBar value={100} color="#ffffff" track="rgba(255,255,255,0.22)" height={1.6} />
        </div>
        <p className="mt-7 text-[13px] font-semibold opacity-90">Your CEFR Level</p>
        <p
          className="mt-2 text-[46px] font-medium leading-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          {level}
        </p>
        <p className="mt-5 text-[13px] font-semibold opacity-90">Cambridge English Level</p>
        <p className="mt-1 text-[18px] font-bold" style={{ letterSpacing: "-0.01em" }}>
          {cambridge}
        </p>
        <p className="mt-2 text-[13px] font-semibold opacity-90">
          {total} / 100 correct
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--paisley) 14%, white)",
              color: "var(--paisley)",
            }}
          >
            Test Time {timeText}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--bloxia) 14%, white)",
              color: "var(--bloxia)",
            }}
          >
            +{bp} Bp
          </span>
        </div>
      </section>

      {/* Section scores */}
      <section className="mt-5">
        <p className="text-[14px] font-semibold mb-2 px-1">Section Scores</p>
        <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
          {STAGE_ORDER.map((s) => {
            const d = dims[s];
            const pct = d.max ? Math.round((d.score / d.max) * 100) : 0;
            return (
              <div key={s} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold">{STAGE_META[s].label}</p>
                  <p className="text-[12px] font-semibold text-muted-foreground">
                    {d.score} / {d.max}
                  </p>
                </div>
                <div
                  className="mt-1.5 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "color-mix(in oklab, var(--paisley) 10%, white)" }}
                >
                  <div className="h-full" style={{ width: `${pct}%`, background: "var(--paisley)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Answer review */}
      <section className="mt-5">
        <p className="text-[14px] font-semibold mb-2 px-1">Answer Review</p>
        <div className="space-y-4">
          {STAGE_ORDER.filter((s) => s !== "writing").map((s) => {
            const items = results.filter((r) => r.q.stage === s);
            return (
              <div key={s}>
                <p className="text-[11px] font-semibold text-muted-foreground px-1 mb-1.5">
                  {STAGE_META[s].label}
                </p>
                <div className="rounded-2xl bg-white border border-border divide-y divide-border overflow-hidden">
                  {items.map((r, idx) => (
                    <button
                      key={r.q.id}
                      onClick={() => onReview(r.q.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left active:bg-muted/40"
                    >
                      <span className="text-[11px] font-semibold text-muted-foreground w-5">
                        Q{idx + 1}
                      </span>
                      <span className="flex-1 text-[13px] font-semibold truncate">{r.q.prompt}</span>
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white shrink-0"
                        style={{
                          background: r.correct ? "var(--paisley)" : "var(--paisley-yellow)",
                        }}
                      >
                        {r.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {/* Writing */}
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground px-1 mb-1.5">Writing</p>
            <div className="rounded-2xl bg-white border border-border p-4">
              <p className="text-[13px] leading-6 text-foreground/85">
                {writingAnswer || "No writing answer saved."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{
                    background: "color-mix(in oklab, var(--paisley) 12%, white)",
                    color: "var(--paisley)",
                  }}
                >
                  Score: {dims.writing.score} / 20
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5"
                  style={{
                    background: "var(--paisley-yellow-soft)",
                    color: "color-mix(in oklab, var(--paisley-yellow) 55%, black)",
                  }}
                >
                  Words: {writingWords}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link
        to="/"
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--paisley)", fontSize: "17.25px" }}
      >
        <span>Back to Home</span>
      </Link>
    </div>
  );
}

// ───────── Review Overlay ─────────
function ReviewOverlay({
  question,
  selected,
  onClose,
}: {
  question: Question;
  selected?: string;
  onClose: () => void;
}) {
  const correctChoice = question.choices?.find((c) => c.isCorrect);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {STAGE_META[question.stage].label} · Q{question.number}
          </p>
          <button onClick={onClose} className="h-7 w-7 grid place-items-center rounded-full bg-muted/40">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-6">{question.prompt}</p>

        <div className="mt-3 space-y-2">
          {question.choices?.map((c) => {
            const isMine = selected === c.id;
            const isRight = c.isCorrect;
            return (
              <div
                key={c.id}
                className="rounded-2xl border px-3 py-2.5 text-[13px] font-semibold flex items-center justify-between"
                style={{
                  background: isRight
                    ? "color-mix(in oklab, var(--paisley) 10%, white)"
                    : isMine
                    ? "color-mix(in oklab, var(--paisley-yellow) 28%, white)"
                    : "white",
                  borderColor: isRight
                    ? "var(--paisley)"
                    : isMine
                    ? "var(--paisley-yellow)"
                    : "var(--border)",
                }}
              >
                <span>{c.label}</span>
                <span className="flex gap-1">
                  {isRight && (
                    <span
                      className="h-6 w-6 rounded-full grid place-items-center text-white"
                      style={{ background: "var(--paisley)" }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {isMine && !isRight && (
                    <span
                      className="h-6 w-6 rounded-full grid place-items-center text-white"
                      style={{ background: "var(--paisley-yellow)" }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        {correctChoice && (
          <p className="text-[12px] text-muted-foreground mt-3">
            Correct: {correctChoice.label}
          </p>
        )}
      </div>
    </div>
  );
}
```

### src/routes/chat.tsx

```tsx
import { useState, useRef, useEffect, useMemo } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import shirinGirl from "@/assets/brand/shirin-girl.png";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import { useBloxia } from "@/lib/bloxia/progress";
import {
  ChevronLeft,
  Camera,
  Mic,
  Keyboard,
  Plus,
  X,
  Send,
  Heart,
  MessageCircle,
  Copy,
  Volume2,
  Share2,
  RotateCw,
  ChevronLeft as ChevLeft,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";

type Role = "shirin" | "user";
interface Message {
  id: string;
  role: Role;
  text: string;
  image?: string;
  time: string;
  variants?: string[];
  variantIndex?: number;
  shareable?: boolean;
}

const MODE_TITLES: Record<string, string> = {
  topic: "ShirinTalk",
  mywordie: "myWordie Talk",
  smart_reading: "Smart Reading Talk",
};

const MODE_OPENING: Record<string, string> = {
  topic: "Hi! I'm Shirin. What do you want to talk about today?",
  mywordie:
    "Hi! Let's use your myWordie words in real talking. Today we can try: brave, curious, gentle. Ready?",
  smart_reading:
    "Great reading today! Let's chat about the story. What was your favourite part?",
};

// Per-spec: when mode=topic, opening comes from this map keyed by topic_id.
// Keep IDs in sync with src/routes/topics.tsx TOPICS.
const TOPIC_OPENING: Record<string, string> = {
  free_talk: "Hi! I'm Shirin. What do you want to talk about today?",
  pet_talk:
    "Hi! I'm Shirin. I have a pet cat. His name is Scratch. Scratch is funny and a little naughty! Do you have a pet?",
  minecraft_adventure:
    "Welcome to Minecraft Adventure! What do you want to build today — a house, a farm, or something else?",
  food_talk: "Yum! Let's talk about food. What food do you like?",
  football_talk:
    "Let's talk about football! Do you play football? Which team do you like?",
  magic_adventure:
    "You find a magic door. It opens slowly… What do you see on the other side?",
  nature_explorer:
    "Let's be nature explorers! What animal or plant did you see today?",
};

const ALBUM_COLORS = [
  "#FBCFE8", "#FDE68A", "#A7F3D0", "#BFDBFE",
  "#DDD6FE", "#FBCFE8", "#FECACA", "#C7D2FE",
];

const MOCK_COMMENTS = [
  { name: "Alice", text: "Shirin helped my child speak more English after class.", date: "2d", likes: 12, liked: false, replies: [] as Reply[] },
  { name: "Ben", text: "The questions are simple and useful for practice.", date: "1d", likes: 5, liked: false, replies: [] as Reply[] },
  { name: "Cindy", text: "I like the Smart Reading chat.", date: "5h", likes: 8, liked: true, replies: [] as Reply[] },
];

type Reply = { name: string; text: string; date: string; likes: number; liked: boolean };

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [
      { title: "Chat — Paisley EC" },
      { name: "description", content: "Open-ended English conversation with Shirin and myWordie." },
      { property: "og:title", content: "Chat — Paisley EC" },
      { property: "og:description", content: "Open-ended English conversation with Shirin and myWordie." },
    ] }),
  validateSearch: z.object({
    mode: z.string().optional(),
    topic_id: z.string().optional(),
    lesson_id: z.string().optional(),
    from: z.string().optional(),
  }),
  component: ChatPage,
});

function ChatPage() {
  const search = useSearch({ from: "/chat" });
  const mode = (search.mode as string) || "topic";
  const topicId = (search.topic_id as string) || "free_talk";
  const title = MODE_TITLES[mode] ?? "ShirinTalk";
  const opening =
    mode === "topic"
      ? TOPIC_OPENING[topicId] ?? TOPIC_OPENING.free_talk
      : MODE_OPENING[mode] ?? MODE_OPENING.topic;

  const initialMessages: Message[] = useMemo(
    () => [
      { id: "m1", role: "shirin", text: opening, time: "10:02", shareable: true },
      { id: "m2", role: "user", text: "Yes! I want to talk about animals.", time: "10:03", shareable: true },
      {
        id: "m3",
        role: "shirin",
        text: "Great choice! 🐼 What's your favourite animal and why?",
        time: "10:03",
        shareable: true,
        variants: [
          "Great choice! 🐼 What's your favourite animal and why?",
          "Lovely! 🦁 Which animal do you like best? Tell me about it.",
        ],
        variantIndex: 0,
      },
    ],
    [opening],
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const { earnBp } = useBloxia();
  const earnedRef = useRef(0);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [sending, setSending] = useState(false);
  const [shareMode, setShareMode] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [comments, setComments] = useState<typeof MOCK_COMMENTS>(MOCK_COMMENTS);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState<{ index: number; name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [holding, setHolding] = useState(false);
  const [longPressId, setLongPressId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commentCount = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }

  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "shirin") return i;
    return -1;
  })();

  function handleSend() {
    if (sending) return;
    const text = input.trim();
    if (!text && !pendingImage) return;
    const newUser: Message = {
      id: `u${Date.now()}`,
      role: "user",
      text: text || "",
      image: pendingImage || undefined,
      time: nowTime(),
      shareable: true,
    };
    setMessages((m) => [...m, newUser]);
    setInput("");
    setPendingImage(null);
    setAttachmentOpen(false);
    setSending(true);
    if (earnedRef.current < 20) {
      earnBp(2, "talk", "ShirinTalk chat");
      earnedRef.current += 2;
    }
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `s${Date.now()}`,
          role: "shirin",
          text: "Nice! Tell me more — what makes it special to you?",
          time: nowTime(),
          shareable: true,
        },
      ]);
      setSending(false);
    }, 1200);
  }

  function regenerate() {
    if (lastAssistantIdx < 0) return;
    setSending(true);
    window.setTimeout(() => {
      setMessages((prev) => {
        const copy = [...prev];
        const m = copy[lastAssistantIdx];
        const newText = randomReply();
        const variants = m.variants ? [...m.variants, newText] : [m.text, newText];
        copy[lastAssistantIdx] = {
          ...m,
          variants,
          variantIndex: variants.length - 1,
          text: newText,
        };
        return copy;
      });
      setSending(false);
    }, 900);
  }

  function switchVariant(dir: -1 | 1) {
    setMessages((prev) => {
      const copy = [...prev];
      const m = copy[lastAssistantIdx];
      if (!m?.variants) return prev;
      const idx = Math.min(
        Math.max((m.variantIndex ?? 0) + dir, 0),
        m.variants.length - 1,
      );
      copy[lastAssistantIdx] = { ...m, variantIndex: idx, text: m.variants[idx] };
      return copy;
    });
  }

  function copyLast() {
    const t = messages[lastAssistantIdx]?.text || "";
    navigator.clipboard?.writeText(t).catch(() => {});
    showToast("Copied");
  }

  function startShare() {
    setShareMode(true);
    setSelected({});
  }

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function confirmShare() {
    const n = Object.values(selected).filter(Boolean).length;
    if (n === 0) {
      showToast("Select at least one message");
      return;
    }
    showToast(`Shared ${n} message${n > 1 ? "s" : ""} to WeChat`);
    setShareMode(false);
  }

  function onMessagePressStart(id: string, text: string) {
    longPressTimer.current = setTimeout(() => {
      const word = text.match(/[A-Za-z]{3,}/)?.[0];
      if (!word) {
        showToast("No English word found");
      } else {
        showToast(`Added "${word}" to Wordie-X`);
      }
      setLongPressId(id);
      window.setTimeout(() => setLongPressId(null), 400);
    }, 550);
  }
  function onMessagePressEnd() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function sendComment() {
    const t = commentInput.trim();
    if (!t) return;
    if (replyTo) {
      const idx = replyTo.index;
      const target = replyTo.name;
      setComments((c) =>
        c.map((cc, k) =>
          k === idx
            ? { ...cc, replies: [...cc.replies, { name: "You", text: `@${target} ${t}`, date: "now", likes: 0, liked: false }] }
            : cc,
        ),
      );
    } else {
      setComments((c) => [
        ...c,
        { name: "You", text: t, date: "now", likes: 0, liked: false, replies: [] },
      ]);
    }
    setCommentInput("");
    setReplyTo(null);
  }

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        {/* Floating back — matches topics / smart-reading style */}
        <div className="absolute top-4 left-4 z-30">
          <Link
            to={
              (search.from as string) === "shirin-talk"
                ? "/shirin-talk"
                : (search.from as string) === "topics"
                  ? "/topics"
                  : mode === "topic"
                    ? "/topics"
                    : mode === "smart_reading"
                      ? "/smart-reading"
                      : "/shirin-talk"
            }
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto scroll-hide px-4 pt-16 pb-40">
          {/* Hero opening — shown once at top */}
          <div className="flex flex-col items-center text-center pb-4">
            <img src={shirinHero.url} alt="Shirin" className="h-40 w-40 object-contain" />
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant = i === lastAssistantIdx;
              const canShare = m.shareable !== false;
              return (
                <div key={m.id} className="flex items-start gap-2">
                  {shareMode && (
                    <SelectDot
                      enabled={canShare}
                      selected={!!selected[m.id]}
                      onClick={() => canShare && toggleSelect(m.id)}
                    />
                  )}
                  {!isUser && (
                    <img src={shirinGirl} alt="Shirin" className="h-8 w-8 mt-0.5 object-contain shrink-0" />
                  )}
                  <div className={`max-w-[76%] flex flex-col ${isUser ? "items-end ml-auto" : "items-start"}`}>
                    <div
                      onPointerDown={() => onMessagePressStart(m.id, m.text)}
                      onPointerUp={onMessagePressEnd}
                      onPointerLeave={onMessagePressEnd}
                      className={`relative rounded-2xl text-[14px] leading-relaxed shadow-sm transition-transform ${
                        isUser ? "rounded-tr-sm text-white" : "rounded-tl-sm bg-white border border-border text-foreground"
                      } ${longPressId === m.id ? "scale-[0.98]" : ""}`}
                      style={isUser ? { background: PINK } : undefined}
                    >
                      {m.image && (
                        <img
                          src={m.image}
                          alt="attachment"
                          className="block w-44 h-32 object-cover rounded-2xl"
                          style={{ borderTopRightRadius: isUser ? 4 : undefined }}
                        />
                      )}
                      {m.text && (
                        <div className="px-3.5 py-2">
                          {m.text.split("\n").map((line, k) => (
                            <p key={k} className={k > 0 ? "mt-1" : ""}>{line}</p>
                          ))}
                        </div>
                      )}
                      {!isUser && isLastAssistant && !shareMode && !sending && m.text && (
                        <div className="px-3.5 pb-2">
                          <div className="h-px bg-[oklch(0.94_0.02_10)] mb-1.5" />
                          <AssistantActions
                            hasVariants={!!m.variants}
                            canPrev={(m.variantIndex ?? 0) > 0}
                            canNext={
                              !!m.variants &&
                              (m.variantIndex ?? 0) < (m.variants!.length - 1)
                            }
                            onCopy={copyLast}
                            onSpeaker={() => showToast("Voice playback soon")}
                            onShare={startShare}
                            onRegenerate={regenerate}
                            onPrev={() => switchVariant(-1)}
                            onNext={() => switchVariant(1)}
                          />
                        </div>
                      )}
                    </div>
                    <p className={`text-[10px] text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}

            {sending && (
              <div className="flex items-start gap-2">
                <img src={shirinGirl} alt="Shirin" className="h-8 w-8 object-contain" />
                <div className="rounded-2xl rounded-tl-sm px-3.5 py-2 border border-border bg-white shadow-sm inline-flex items-center gap-1.5">
                  <span className="text-[12px] text-muted-foreground italic mr-1">Shirin is thinking</span>
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* Bottom composer area */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="w-full max-w-[420px] pointer-events-auto">
            {/* Pending image preview */}
            {pendingImage && !shareMode && (
              <div className="mx-4 mb-2 rounded-2xl bg-white border border-border shadow-sm p-2 flex items-center gap-2">
                <div
                  className="h-12 w-12 rounded-lg shrink-0"
                  style={{ background: pendingImage }}
                />
                <div className="flex-1">
                  <p className="text-[12px] font-semibold">Photo ready to send</p>
                  <p className="text-[10px] text-muted-foreground">Shirin will see a [Photo] placeholder</p>
                </div>
                <button
                  onClick={() => setPendingImage(null)}
                  className="h-7 w-7 rounded-full grid place-items-center bg-muted"
                  aria-label="Remove photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Attachment panel */}
            {attachmentOpen && !shareMode && (
              <div className="mx-4 mb-2 rounded-2xl bg-white border border-border shadow-sm p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-semibold inline-flex items-center gap-1">
                    <ImageIcon className="h-3.5 w-3.5" style={{ color: PINK }} />
                    Photo album
                  </p>
                  <span className="text-[10px] text-muted-foreground">Tap a photo to attach</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {ALBUM_COLORS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPendingImage(c);
                        setAttachmentOpen(false);
                      }}
                      className="aspect-square rounded-lg"
                      style={{ background: c }}
                      aria-label={`Album photo ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Share sheet bottom panel */}
            {shareMode ? (
              <div className="px-4 pb-5 pt-2 bg-white/95 backdrop-blur border-t border-border">
                <div className="flex items-center gap-2">
                  <button
                    onClick={confirmShare}
                    className="flex-1 h-11 rounded-full font-semibold text-white text-[14px]"
                    style={{ background: PINK }}
                  >
                    Share to WeChat
                  </button>
                  <button
                    onClick={() => setShareMode(false)}
                    className="h-11 px-5 rounded-full font-semibold border border-border bg-white text-[14px]"
                  >
                    Cancel
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-center text-muted-foreground">
                  {Object.values(selected).filter(Boolean).length} selected
                </p>
              </div>
            ) : (
              <>
                {/* Social row (like / comment) */}
                <div className="px-4 pb-1 flex items-center justify-start gap-2">
                  <button
                    onClick={() => {
                      setLiked((v) => !v);
                      setLikeCount((n) => n + (liked ? -1 : 1));
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white border border-border text-[12px] font-semibold"
                    style={{ color: liked ? PINK : "var(--foreground)" }}
                  >
                    <Heart
                      className="h-3.5 w-3.5"
                      fill={liked ? "currentColor" : "none"}
                    />
                    {likeCount}
                  </button>
                  <button
                    onClick={() => setCommentsOpen(true)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white border border-border text-[12px] font-semibold"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {commentCount}
                  </button>
                </div>

                {/* Input bar */}
                <div className="px-3 pb-5 pt-2 bg-white/95 backdrop-blur border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => showToast("Camera ready soon")}
                      className="h-10 w-10 rounded-full grid place-items-center shrink-0"
                      style={{ color: PINK, background: PINK_SOFT }}
                      aria-label="Camera"
                    >
                      <Camera className="h-4 w-4" />
                    </button>

                    {voiceMode ? (
                      <button
                        onPointerDown={() => {
                          setHolding(true);
                        }}
                        onPointerUp={() => setHolding(false)}
                        onPointerLeave={() => setHolding(false)}
                        className={`flex-1 h-10 rounded-full text-[13px] font-semibold border ${holding ? "text-white" : ""}`}
                        style={{
                          background: holding ? PINK : PINK_SOFT,
                          borderColor: PINK,
                          color: holding ? "white" : "var(--shirin)"
                        }}
                      >
                        {holding ? "Release to send · slide up to cancel" : "Hold to talk"}
                      </button>
                    ) : (
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                          disabled={sending}
                          placeholder="Type or hold to talk"
                          className="w-full rounded-full border border-border bg-muted/40 px-4 py-2.5 pr-10 text-[13px] outline-none focus:ring-2 focus:ring-[color:var(--shirin)] disabled:opacity-60"
                        />
                        {(input.trim() || pendingImage) && (
                          <button
                            onClick={handleSend}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full grid place-items-center text-white"
                            style={{ background: PINK }}
                            aria-label="Send"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setVoiceMode((v) => !v);
                        if (!voiceMode) showToast("Voice input ready soon");
                      }}
                      className="h-10 w-10 rounded-full grid place-items-center shrink-0"
                      style={{ color: PINK, background: PINK_SOFT }}
                      aria-label={voiceMode ? "Keyboard" : "Voice"}
                    >
                      {voiceMode ? <Keyboard className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setAttachmentOpen((v) => !v)}
                      className="h-10 w-10 rounded-full grid place-items-center shrink-0"
                      style={{ background: attachmentOpen ? PINK : PINK_SOFT, color: attachmentOpen ? "white" : PINK }}
                      aria-label={attachmentOpen ? "Close attachments" : "Open attachments"}
                    >
                      {attachmentOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Comments bottom sheet */}
        {commentsOpen && (
          <CommentsSheet
            count={commentCount}
            comments={comments}
            replyTo={replyTo}
            commentInput={commentInput}
            onCommentInput={setCommentInput}
            onReply={(index, name) => setReplyTo({ index, name })}
            onCancelReply={() => setReplyTo(null)}
            onSend={sendComment}
            onClose={() => { setCommentsOpen(false); setReplyTo(null); }}
            onToggleLike={(i) => {
              setComments((c) => c.map((cc, k) => k === i ? { ...cc, liked: !cc.liked, likes: cc.likes + (cc.liked ? -1 : 1) } : cc));
            }}
          />
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-[140px] left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold shadow-lg">
            {toast}
          </div>
        )}

        {/* Voice hold overlay */}
        {holding && <VoiceHoldOverlay />}
      </div>
    </PhoneFrame>
  );
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function randomReply() {
  const opts = [
    "Cool! Can you say one more sentence about it?",
    "Nice try! What else do you want to share?",
    "That's interesting — why do you think so?",
    "Great! Let's add one more detail.",
  ];
  return opts[Math.floor(Math.random() * opts.length)];
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full animate-bounce"
      style={{ background: PINK, animationDelay: `${delay}ms` }}
    />
  );
}

function VoiceHoldOverlay() {
  const bars = Array.from({ length: 56 });
  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-6"
      style={{
        height: "260px",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--shirin) 0%, transparent) 0%, color-mix(in oklab, var(--shirin) 6%, transparent) 25%, color-mix(in oklab, var(--shirin) 18%, transparent) 45%, color-mix(in oklab, var(--shirin) 38%, transparent) 65%, color-mix(in oklab, var(--shirin) 65%, transparent) 85%, color-mix(in oklab, var(--shirin) 85%, transparent) 100%)",
        borderTopLeftRadius: "50% 36px",
        borderTopRightRadius: "50% 36px"
      }}
    >
      <p className="text-white text-[12px] font-semibold mb-3 tracking-wide">
        Release to send · slide up to cancel
      </p>
      <div className="flex items-end gap-[3px] h-9 px-6">
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-white/85"
            style={{
              height: `${20 + Math.abs(Math.sin((i + 1) * 0.6)) * 70}%`,
              animation: `voiceWave 900ms ease-in-out ${i * 28}ms infinite alternate`
            }}
          />
        ))}
      </div>
      <style>{`@keyframes voiceWave { from { transform: scaleY(0.4); } to { transform: scaleY(1.1); } }`}</style>
    </div>
  );
}

function SelectDot({
  enabled,
  selected,
  onClick,
}: {
  enabled: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className="h-5 w-5 mt-3 rounded-full grid place-items-center shrink-0"
      style={{
        border: `1.5px solid ${enabled ? "var(--shirin)" : "oklch(0.9 0.01 10)"}`,
        background: selected ? PINK : "white",
        opacity: enabled ? 1 : 0.4
      }}
      aria-label="Select message"
    >
      {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
    </button>
  );
}

function AssistantActions({
  hasVariants,
  canPrev,
  canNext,
  onCopy,
  onSpeaker,
  onShare,
  onRegenerate,
  onPrev,
  onNext,
}: {
  hasVariants: boolean;
  canPrev: boolean;
  canNext: boolean;
  onCopy: () => void;
  onSpeaker: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ActionBtn onClick={onCopy} label="Copy"><Copy className="h-3.5 w-3.5" /></ActionBtn>
        <ActionBtn onClick={onSpeaker} label="Play"><Volume2 className="h-3.5 w-3.5" /></ActionBtn>
        <ActionBtn onClick={onShare} label="Share"><Share2 className="h-3.5 w-3.5" /></ActionBtn>
      </div>
      <div className="flex items-center gap-1.5">
        {canPrev && (
          <ActionBtn onClick={onPrev} label="Previous variant">
            <ChevLeft className="h-3.5 w-3.5" />
          </ActionBtn>
        )}
        {hasVariants && canNext ? (
          <ActionBtn onClick={onNext} label="Next variant">
            <ChevronRight className="h-3.5 w-3.5" />
          </ActionBtn>
        ) : (
          <ActionBtn onClick={onRegenerate} label="Regenerate">
            <RotateCw className="h-3.5 w-3.5" />
          </ActionBtn>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="h-7 w-7 rounded-full grid place-items-center disabled:opacity-30 transition-transform active:scale-95"
      style={{ color: "var(--shirin)" }}
    >
      {children}
    </button>
  );
}

function CommentsSheet({
  count,
  comments,
  replyTo,
  commentInput,
  onCommentInput,
  onReply,
  onCancelReply,
  onSend,
  onClose,
  onToggleLike,
}: {
  count: number;
  comments: typeof MOCK_COMMENTS;
  replyTo: { index: number; name: string } | null;
  commentInput: string;
  onCommentInput: (v: string) => void;
  onReply: (index: number, name: string) => void;
  onCancelReply: () => void;
  onSend: () => void;
  onClose: () => void;
  onToggleLike: (i: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-white rounded-t-3xl shadow-2xl flex flex-col" style={{ maxHeight: "80dvh" }}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border">
          <h3 className="text-[15px] font-semibold">Comments {count}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full grid place-items-center" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center text-[13px] text-muted-foreground py-10">
              <Sparkles className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
              Be the first to leave a kind comment.
            </div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex gap-2.5">
                <div
                  className="h-8 w-8 rounded-full grid place-items-center text-[12px] font-semibold text-white shrink-0"
                  style={{ background: PINK }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold">{c.name}</p>
                    <button
                      onClick={() => onToggleLike(i)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold"
                      style={{ color: c.liked ? PINK : "color-mix(in oklab, var(--foreground) 60%, white)" }}
                    >
                      <Heart className="h-3 w-3" fill={c.liked ? "currentColor" : "none"} />
                      {c.likes}
                    </button>
                  </div>
                  <p className="text-[13px] mt-0.5">{c.text}</p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{c.date}</span>
                    <button onClick={() => onReply(i, c.name)} className="font-semibold">Reply</button>
                  </div>
                  {c.replies.length > 0 && (
                    <div className="mt-2 space-y-2 border-l-2 pl-3" style={{ borderColor: PINK_SOFT }}>
                      {c.replies.map((r, j) => (
                        <div key={j} className="flex gap-2">
                          <div
                            className="h-6 w-6 rounded-full grid place-items-center text-[10px] font-semibold text-white shrink-0"
                            style={{ background: PINK }}
                          >
                            {r.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold">{r.name}</p>
                            <p className="text-[12px] mt-0.5">{r.text}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{r.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-border px-3 pt-2 pb-4">
          {replyTo && (
            <div className="mb-1.5 flex items-center justify-between px-2 py-1 rounded-md" style={{ background: PINK_SOFT }}>
              <span className="text-[11px] font-semibold" style={{ color: PINK }}>
                Replying to {replyTo.name}
              </span>
              <button onClick={onCancelReply} aria-label="Cancel reply">
                <X className="h-3 w-3" style={{ color: PINK }} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => onCommentInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
              placeholder="Add a kind comment"
              className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[color:var(--shirin)]"
            />
            <button
              onClick={onSend}
              className="h-9 px-4 rounded-full text-white font-semibold text-[13px]"
              style={{ background: PINK }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


```

### src/routes/edit-profile.tsx

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Check, ChevronRight, Camera } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/edit-profile")({
  head: () => ({ meta: [
      { title: "Edit Profile — Paisley EC" },
      { name: "description", content: "Update your name, age and avatar." },
      { property: "og:title", content: "Edit Profile — Paisley EC" },
      { property: "og:description", content: "Update your name, age and avatar." },
    ] }),
  component: EditProfilePage,
});

// ---- Profile storage (mirrors utils/profile.js) ----
const PROFILE_STORAGE_KEY = "my_profile_v1";
const DEFAULT_BIRTHDAY = "2017-01-01";
const SHIRIN = "var(--shirin)";
const WORDIE = "var(--wordie)";
const PAISLEY = "var(--paisley)";
// Form accent — Paisley brand blue for borders, CTA, sheet headers, etc.
// Aliased under the previous YELLOW/YELLOW_SOFT names so downstream sheets
// stay in sync without a wide rename.
const ACCENT = PAISLEY;
const YELLOW = PAISLEY;
const YELLOW_SOFT = `color-mix(in oklab, var(--paisley) 14%, white)`;

type Gender = "" | "male" | "female";
type ProfileForm = {
  avatarPath: string;
  avatarPosX: number; // 0-100 (object-position %)
  avatarPosY: number; // 0-100
  avatarScale: number; // 1-3
  givenName: string;
  familyName: string;
  birthday: string; // YYYY-MM-DD
  gender: Gender;
};

const DEFAULT_FORM: ProfileForm = {
  avatarPath: "",
  avatarPosX: 50,
  avatarPosY: 50,
  avatarScale: 1,
  givenName: "",
  familyName: "",
  birthday: "",
  gender: "",
};

const GENDER_OPTIONS: { key: Exclude<Gender, "">; label: string; color: string }[] = [
  { key: "female", label: "Girl", color: SHIRIN },
  { key: "male", label: "Boy", color: WORDIE },
];

const MONTH_NAMES_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate();
}

function loadProfile(): ProfileForm {
  if (typeof window === "undefined") return DEFAULT_FORM;
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_FORM;
    const obj = JSON.parse(raw) as Partial<ProfileForm>;
    const gender = obj.gender === "male" || obj.gender === "female" ? obj.gender : "";
    const birthday = typeof obj.birthday === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.birthday) ? obj.birthday : "";
    const clamp = (n: unknown) => {
      const v = typeof n === "number" ? n : 50;
      return Math.max(0, Math.min(100, v));
    };
    return {
      avatarPath: typeof obj.avatarPath === "string" ? obj.avatarPath : "",
      avatarPosX: clamp(obj.avatarPosX),
      avatarPosY: clamp(obj.avatarPosY),
      avatarScale: typeof obj.avatarScale === "number" ? Math.max(1, Math.min(3, obj.avatarScale)) : 1,
      givenName: typeof obj.givenName === "string" ? obj.givenName.trim() : "",
      familyName: typeof obj.familyName === "string" ? obj.familyName.trim() : "",
      birthday,
      gender,
    };
  } catch {
    return DEFAULT_FORM;
  }
}

function saveProfile(form: ProfileForm): ProfileForm {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const normalized: ProfileForm = {
    avatarPath: typeof form.avatarPath === "string" ? form.avatarPath : "",
    avatarPosX: clamp(form.avatarPosX),
    avatarPosY: clamp(form.avatarPosY),
    avatarScale: Math.max(1, Math.min(3, form.avatarScale ?? 1)),
    givenName: form.givenName.trim(),
    familyName: form.familyName.trim(),
    birthday: /^\d{4}-\d{2}-\d{2}$/.test(form.birthday) ? form.birthday : "",
    gender: form.gender === "male" || form.gender === "female" ? form.gender : "",
  };
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    /* ignore */
  }
  return normalized;
}

function computeInitials(given: string, family: string) {
  const g = given.trim()[0] ?? "";
  const f = family.trim()[0] ?? "";
  const initials = (g + f).toUpperCase();
  return initials || "me";
}

function formatBirthday(birthday: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return "Select birthday";
  const [y, m, d] = birthday.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[m - 1]} ${d} ${y}`;
}

function EditProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    setForm(loadProfile());
  }, []);

  const initials = useMemo(() => computeInitials(form.givenName, form.familyName), [form.givenName, form.familyName]);

  function update<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onChooseAvatar() {
    fileRef.current?.click();
  }

  function onAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (dataUrl) {
        setForm((f) => ({ ...f, avatarPath: dataUrl, avatarPosX: 50, avatarPosY: 50, avatarScale: 1 }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function onClearAvatar() {
    setForm((f) => ({ ...f, avatarPath: "", avatarPosX: 50, avatarPosY: 50, avatarScale: 1 }));
  }

  function onGenderChange(key: Gender) {
    if (form.gender === key) return;
    update("gender", key);
  }

  function onSave() {
    const normalized = saveProfile(form);
    setForm(normalized);
    setToast("Profile Saved");
    setTimeout(() => {
      setToast("");
      navigate({ to: "/profile" });
    }, 600);
  }

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh)] flex flex-col bg-white">
        <FloatingBack to="/profile" />

        {/* Scroll body */}
        <div className="flex-1 px-6 pt-4 pb-[195px] overflow-y-auto flex flex-col">
          {/* Avatar — mirrors Me page hero (h-40 w-40) with edit badge */}
          <div className="flex flex-col items-center pt-2 pb-5">
            <div className="relative h-40 w-40">
              <AvatarDraggable
                src={form.avatarPath}
                initials={initials}
                posX={form.avatarPosX}
                posY={form.avatarPosY}
                scale={form.avatarScale}
                onChangePos={(x, y) => setForm((f) => ({ ...f, avatarPosX: x, avatarPosY: y }))}
                onChangeScale={(s) => setForm((f) => ({ ...f, avatarScale: s }))}
              />
              <button
                type="button"
                onClick={onChooseAvatar}
                aria-label="Choose photo"
                className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
              >
                <Camera className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: "var(--muted-foreground)" }} />
              </button>
              {form.avatarPath ? (
                <button
                  type="button"
                  onClick={onClearAvatar}
                  aria-label="Remove photo"
                  className="absolute top-6 right-6 translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: "var(--muted-foreground)" }} />
                </button>
              ) : null}
            </div>
            {form.avatarPath ? (
              <>
                <p className="mt-2 text-[11px] font-semibold text-muted-foreground">
                  Drag and scroll to adjust
                </p>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={form.avatarScale}
                  onChange={(e) => update("avatarScale", Number(e.target.value))}
                  className="mt-2 w-20 h-1 accent-current opacity-60"
                  style={{ color: "var(--muted-foreground)" }}
                  aria-label="Zoom"
                />
              </>
            ) : null}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarFile}
            />
          </div>

          <div className="space-y-3 mt-auto">

          {/* Name */}
          <NamePill
            givenName={form.givenName}
            familyName={form.familyName}
            onGivenNameChange={(value) => update("givenName", value)}
            onFamilyNameChange={(value) => update("familyName", value)}
          />

          {/* Gender */}
          <RowPill label="Gender">
            <div className="flex gap-1.5 justify-end">
              {GENDER_OPTIONS.map((opt) => {
                const active = form.gender === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => onGenderChange(opt.key)}
                    className="h-8 px-4 rounded-full text-[14px] font-semibold transition-colors"
                    style={
                      active
                        ? { background: opt.color, color: "white" }
                        : { background: "white", color: opt.color, border: `1px solid color-mix(in oklab, ${opt.color} 35%, white)` }
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </RowPill>

          {/* Birthday */}
          <RowPill label="Birthday">
            <button
              type="button"
              onClick={() => setShowBirthdayPicker(true)}
              className="w-full inline-flex items-center justify-end gap-1 text-[15px] font-semibold"
              style={{
                letterSpacing: "-0.01em",
                color: form.birthday ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 45%, white)"
              }}
            >
              {formatBirthday(form.birthday)}
              <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2.25} />
            </button>
          </RowPill>
          </div>
        </div>

        {/* Sticky save bar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pt-3 pb-5 bg-white">
          <button
            type="button"
            onClick={onSave}
            className="w-full h-12 rounded-full text-[15px] font-semibold active:scale-[0.99] transition-transform"
            style={{ background: ACCENT, color: "white", letterSpacing: "-0.01em" }}
          >
            Save
          </button>
        </div>

        {/* Toast — above the Save pill */}
        {toast && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 z-40 flex justify-center">
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold shadow-lg"
              style={{ background: ACCENT, color: "white" }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              {toast}
            </div>
          </div>
        )}

        {/* Birthday picker sheet */}
        {showBirthdayPicker && (
          <BirthdaySheet
            value={form.birthday || DEFAULT_BIRTHDAY}
            onCancel={() => setShowBirthdayPicker(false)}
            onConfirm={(v) => {
              update("birthday", v);
              setShowBirthdayPicker(false);
            }}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

function RowPill({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="relative isolate flex items-center gap-3 rounded-full py-3 px-5 min-h-[64px] bg-white border"
      style={{
        borderColor: `color-mix(in oklab, ${YELLOW} 55%, white)`
        }}
    >
      <span
        className="shrink-0 text-[15px] font-semibold leading-none"
        style={{ color: YELLOW, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function NamePill({
  givenName,
  familyName,
  onGivenNameChange,
  onFamilyNameChange,
}: {
  givenName: string;
  familyName: string;
  onGivenNameChange: (value: string) => void;
  onFamilyNameChange: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFullName = givenName.trim().length > 0 && familyName.trim().length > 0;

  useEffect(() => {
    if (!editing) return;
    const onDocDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        if (givenName.trim() && familyName.trim()) setEditing(false);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
    };
  }, [editing, givenName, familyName]);

  return (
    <RowPill label="Name">
      <div ref={containerRef}>
      {hasFullName && !editing ? (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="w-full truncate text-right text-[15px] font-semibold text-foreground"
          style={{ letterSpacing: "-0.01em" }}
        >
          {givenName.trim()} {familyName.trim()}
        </button>
      ) : (
        <div
          className="grid grid-cols-2 gap-2"
          onFocus={() => setEditing(true)}
        >
          <input
            type="text"
            value={givenName}
            onChange={(e) => onGivenNameChange(e.target.value)}
            placeholder="Given Name"
            className="min-w-0 bg-transparent outline-none text-right text-[15px] font-semibold text-foreground placeholder:text-muted-foreground"
            style={{ letterSpacing: "-0.01em" }}
          />
          <input
            type="text"
            value={familyName}
            onChange={(e) => onFamilyNameChange(e.target.value)}
            placeholder="Family Name"
            className="min-w-0 bg-transparent outline-none text-right text-[15px] font-semibold text-foreground placeholder:text-muted-foreground"
            style={{ letterSpacing: "-0.01em" }}
          />
        </div>
      )}
      </div>
    </RowPill>
  );
}

function AvatarDraggable({
  src,
  initials,
  posX,
  posY,
  scale,
  onChangePos,
  onChangeScale,
}: {
  src: string;
  initials: string;
  posX: number;
  posY: number;
  scale: number;
  onChangePos: (x: number, y: number) => void;
  onChangeScale: (s: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Use refs + global window listeners — survives re-renders and dpr quirks.
  const stateRef = useRef({ posX, posY, scale });
  stateRef.current = { posX, posY, scale };
  const callbacksRef = useRef({ onChangePos, onChangeScale });
  callbacksRef.current = { onChangePos, onChangeScale };

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;

    let dragging: { sx: number; sy: number; px: number; py: number } | null = null;

    const onDown = (e: PointerEvent) => {
      // ignore clicks that hit overlay buttons
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragging = { sx: e.clientX, sy: e.clientY, px: stateRef.current.posX, py: stateRef.current.posY };
      el.style.cursor = "grabbing";
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const s = Math.max(stateRef.current.scale, 1);
      // Drag feel: 1 frame-width sweep ≈ full range. Divide by scale so zoomed-in drags feel proportional.
      const dx = ((e.clientX - dragging.sx) / rect.width) * (100 / s);
      const dy = ((e.clientY - dragging.sy) / rect.height) * (100 / s);
      const nx = Math.max(0, Math.min(100, dragging.px - dx));
      const ny = Math.max(0, Math.min(100, dragging.py - dy));
      callbacksRef.current.onChangePos(nx, ny);
    };
    const onUp = () => {
      dragging = null;
      el.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.max(1, Math.min(3, stateRef.current.scale - e.deltaY * 0.003));
      callbacksRef.current.onChangeScale(next);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [src]);

  return (
    <div
      ref={ref}
      className="relative h-full w-full rounded-full overflow-hidden grid place-items-center select-none"
      style={{
        background: src ? "transparent" : `color-mix(in oklab, ${YELLOW} 22%, white)`,
        touchAction: src ? "none" : "auto",
        cursor: src ? "grab" : "default"
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover pointer-events-none"
          style={{
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${scale})`,
            transformOrigin: `${posX}% ${posY}%`
          }}
        />
      ) : (
        <span
          className="text-[56px] font-medium leading-none"
          style={{ color: YELLOW, letterSpacing: "-0.02em" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function BirthdaySheet({
  value,
  onCancel,
  onConfirm,
}: {
  value: string;
  onCancel: () => void;
  onConfirm: (v: string) => void;
}) {
  const init = useMemo(() => {
    const [y, m, d] = value.split("-").map(Number);
    return { y, m, d };
  }, [value]);
  const [year, setYear] = useState(init.y);
  const [month, setMonth] = useState(init.m);
  const [day, setDay] = useState(init.d);
  const [tab, setTab] = useState<"month" | "day" | "year">("month");

  const thisYear = new Date().getFullYear();
  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = thisYear; y >= 2000; y--) arr.push(y);
    return arr;
  }, [thisYear]);
  const maxDay = daysInMonth(year, month);
  useEffect(() => {
    if (day > maxDay) setDay(maxDay);
  }, [maxDay, day]);

  function confirm() {
    const mm = String(month).padStart(2, "0");
    const dd = String(Math.min(day, maxDay)).padStart(2, "0");
    onConfirm(`${year}-${mm}-${dd}`);
  }

  const tabs: { key: "month" | "day" | "year"; label: string; value: string }[] = [
    { key: "month", label: "Month", value: MONTH_NAMES_SHORT[month - 1] },
    { key: "day", label: "Day", value: String(day) },
    { key: "year", label: "Year", value: String(year) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
        style={{ height: "62vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grabber */}
        <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-semibold text-muted-foreground w-12 text-left"
          >
            Cancel
          </button>
          <p
            className="text-[17px] font-semibold tracking-tight leading-none"
            style={{ letterSpacing: "-0.01em", color: YELLOW }}
          >
            Birthday
          </p>
          <button
            type="button"
            onClick={confirm}
            className="text-[13px] font-semibold w-12 text-right"
            style={{ color: YELLOW }}
          >
            Done
          </button>
        </div>

        {/* M / D / Y tabs — each chip shows current value */}
        <div className="px-5 pb-3 grid grid-cols-3 gap-2 shrink-0">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="rounded-2xl py-2 px-3 text-center transition-colors"
                style={
                  active
                    ? {
                        background: YELLOW_SOFT,
                        color: YELLOW,
                        border: `1px solid ${YELLOW_SOFT}`,
                        }
                    : {
                        background: "white",
                        color: YELLOW,
                        border: `1px solid color-mix(in oklab, ${YELLOW} 45%, white)`,
                        }
                }
              >
                <span
                  className="block text-[11px] font-semibold leading-none opacity-80"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {t.label}
                </span>
                <span
                  className="block text-[17px] font-semibold leading-tight mt-0.5"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {t.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* Options grid for the active tab */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {tab === "month" && (
            <ChipGrid
              cols={3}
              items={MONTH_NAMES_LONG.map((name, i) => ({ key: i + 1, label: name }))}
              value={month}
              onPick={(v) => {
                setMonth(v);
                setTab("day");
              }}
            />
          )}
          {tab === "day" && (
            <ChipGrid
              cols={7}
              items={Array.from({ length: maxDay }, (_, i) => ({ key: i + 1, label: String(i + 1) }))}
              value={day}
              onPick={(v) => {
                setDay(v);
                setTab("year");
              }}
            />
          )}
          {tab === "year" && (
            <ChipGrid
              cols={4}
              items={years.map((y) => ({ key: y, label: String(y) }))}
              value={year}
              onPick={(v) => setYear(v)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ChipGrid({
  cols,
  items,
  value,
  onPick,
}: {
  cols: number;
  items: { key: number; label: string }[];
  value: number;
  onPick: (v: number) => void;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onPick(it.key)}
            className="h-11 rounded-xl text-[13px] font-semibold transition-colors"
            style={
              active
                ? {
                    background: YELLOW_SOFT,
                    color: YELLOW,
                    border: `1px solid ${YELLOW_SOFT}`,
                    }
                : {
                    background: "white",
                    color: "var(--foreground)",
                    border: `1px solid color-mix(in oklab, ${YELLOW} 45%, white)`,
                    }
            }
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

```

### src/routes/index.tsx

```tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import myWordieText from "@/assets/brand/mywordie-text.png.asset.json";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";
import shirinTalkText from "@/assets/brand/shirintalk-text.png.asset.json";
import { Mic } from "lucide-react";

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
  const name = "Daniella Wang";
  const navigate = useNavigate();
  return (
    <PhoneFrame bg="bg-card">
      <div className="relative h-[calc(100dvh-6rem)] overflow-hidden flex flex-col bg-[color:var(--paisley-soft)]">
        {/* App logo top-left */}
        <button
          type="button"
          onClick={() => navigate({ to: "/about" })}
          className="absolute top-7 left-7 z-20 cursor-pointer active:scale-[0.98] transition-transform"
          aria-label="About PEC"
        >
          <img src={paisleyLogo.url} alt="Paisley EC" className="h-8 w-auto object-contain" />
        </button>
        {/* PRIMARY: Shirin hero */}
        <section className="relative px-6 pt-[6.5rem] pb-0">
          <Cloud className="absolute top-10 right-6 w-24 opacity-80" />
          <Cloud className="absolute top-28 left-4 w-16 opacity-70" />
          <Cloud className="absolute top-44 right-16 w-20 opacity-60" />

          <div className="relative flex justify-center">
            <img
              src={shirinHero.url}
              alt="Shirin"
              className="relative z-10 w-[58%] max-w-[220px] object-contain"
            />
          </div>
        </section>

        {/* Bottom white panel with curved top */}
        <section
          className="relative -mt-5 flex-1 bg-card px-7 pt-[60px] pb-6"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          {/* SECONDARY: greeting + question, one refined block */}
          <h1
            className="text-[26px] leading-[1.4] font-medium tracking-tight text-foreground text-center"
            style={{ letterSpacing: "-0.01em" }}
          >
            Hi, {name}.
            <span className="block mt-7 text-[26px] text-foreground/80 font-normal leading-[1.7]">
              Are you ready for today's English adventure?
            </span>
          </h1>

          {/* TERTIARY: primary action */}
          <Link
            to="/shirin-talk"
            className="relative isolate mt-12 flex items-center justify-center gap-[8px] rounded-full py-4 font-semibold text-white active:scale-[0.98] transition-transform"
            style={{
              background: "var(--shirin)",
              fontSize: "17.25px"
            }}
          >
            <Mic className="shrink-0" style={{ width: "1.15em", height: "1.15em" }} />
            <span className="flex items-baseline gap-[5.12px] leading-none">
              <span>Start with</span>
              <img
                src={shirinTalkText.url}
                alt="ShirinTalk"
                className="w-auto shrink-0 object-contain"
                style={{ height: "0.75em" }}
              />
            </span>
          </Link>

          {/* Quaternary: subtle skip link */}
          <div className="mt-3 text-center">
            <Link
              to="/mywordie"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground font-semibold underline-offset-4 hover:underline"
            >
              or practice with
              <img src={myWordieText.url} alt="myWordie" className="h-4 object-contain" />
              →
            </Link>
          </div>
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="white" aria-hidden>
      <ellipse cx="30" cy="40" rx="25" ry="18" />
      <ellipse cx="55" cy="32" rx="22" ry="20" />
      <ellipse cx="75" cy="42" rx="20" ry="15" />
    </svg>
  );
}

```

### src/routes/my-tests.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Check, RotateCcw } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/my-tests")({
  head: () => ({ meta: [
      { title: "My Tests — Paisley EC" },
      { name: "description", content: "Your CEFR tests, Wordie tests and results history." },
      { property: "og:title", content: "My Tests — Paisley EC" },
      { property: "og:description", content: "Your CEFR tests, Wordie tests and results history." },
    ] }),
  component: MyTestsPage,
});

// ---- Demo data ----
const CEFR_HISTORY = [
  { id: "c20", code: "#20", level: "A2", date: "Jun 2 2026", summary: "L 8/10 · R 12/15 · G 11/15 · V 9/10 · W 8/10", reviewCount: 2 },
  { id: "c19", code: "#19", level: "A2", date: "May 18 2026", summary: "L 7/10 · R 11/15 · G 10/15 · V 8/10 · W 7/10", reviewCount: 3 },
  { id: "c18", code: "#18", level: "A1", date: "Apr 28 2026", summary: "L 6/10 · R 10/15 · G 9/15 · V 7/10 · W 6/10", reviewCount: 4 },
  { id: "c17", code: "#17", level: "A1", date: "Apr 6 2026", summary: "L 5/10 · R 9/15 · G 8/15 · V 7/10 · W 5/10", reviewCount: 5 },
];

type WordieDim = { key: string; label: string; correct: number; total: number };
type WordieReview = { idx: number; dim: string; correct: boolean; your: string; right: string };
type WordieTest = {
  id: string;
  code: string;
  date: string;
  correct: number;
  total: number;
  score: number;
  summary: string;
  dimensions: WordieDim[];
  reviews: WordieReview[];
};

const WORDIE_TESTS: WordieTest[] = [
  {
    id: "w18", code: "#18", date: "Jun 2 2026", correct: 18, total: 20, score: 90,
    summary: "L 4/4 · P 4/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 4, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [
      { idx: 5, dim: "Spelling", correct: false, your: "recieve", right: "receive" },
      { idx: 12, dim: "Example", correct: false, your: "—", right: "She insists on paying." },
    ],
  },
  {
    id: "w17", code: "#17", date: "May 22 2026", correct: 17, total: 20, score: 85,
    summary: "L 4/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [
      { idx: 3, dim: "Pronunciation", correct: false, your: "/ˈθɪŋk/", right: "/θɪŋk/" },
    ],
  },
  {
    id: "w16", code: "#16", date: "May 10 2026", correct: 16, total: 20, score: 80,
    summary: "L 3/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w15", code: "#15", date: "Apr 24 2026", correct: 15, total: 20, score: 75,
    summary: "L 3/4 · P 3/4 · S 2/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 2, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w14", code: "#14", date: "Apr 8 2026", correct: 17, total: 20, score: 85,
    summary: "L 4/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
  {
    id: "w13", code: "#13", date: "Mar 26 2026", correct: 14, total: 20, score: 70,
    summary: "L 3/4 · P 2/4 · S 2/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 2, total: 4 },
      { key: "spelling", label: "Spelling", correct: 2, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  },
];

const EXTRA_SEEDS: { n: number; date: string; score: number }[] = [
  { n: 12, date: "Mar 12 2026", score: 80 },
  { n: 11, date: "Feb 26 2026", score: 75 },
  { n: 10, date: "Feb 12 2026", score: 85 },
  { n: 9, date: "Jan 29 2026", score: 70 },
  { n: 8, date: "Jan 15 2026", score: 80 },
  { n: 7, date: "Jan 2 2026", score: 78 },
  { n: 6, date: "Dec 18 2025", score: 72 },
  { n: 5, date: "Dec 4 2025", score: 82 },
  { n: 4, date: "Nov 20 2025", score: 76 },
  { n: 3, date: "Nov 6 2025", score: 74 },
  { n: 2, date: "Oct 23 2025", score: 80 },
  { n: 1, date: "Oct 9 2025", score: 70 },
];
const ALL_WORDIE_TESTS: WordieTest[] = [
  ...WORDIE_TESTS,
  ...EXTRA_SEEDS.map(({ n, date, score }) => ({
    id: `w${n}`,
    code: `#${n}`,
    date,
    correct: Math.round((score / 100) * 20),
    total: 20,
    score,
    summary: "L 3/4 · P 3/4 · S 3/4 · D 3/4 · U 2/2 · POS 2/2",
    dimensions: [
      { key: "pronunciation", label: "Pronunciation", correct: 3, total: 4 },
      { key: "spelling", label: "Spelling", correct: 3, total: 4 },
      { key: "pos", label: "Part of Speech", correct: 2, total: 2 },
      { key: "meaning", label: "Example", correct: 3, total: 4 },
      { key: "usage", label: "Usage", correct: 2, total: 2 },
    ],
    reviews: [],
  })),
];

const CEFR_ACCENT = "var(--paisley)";
const WORDIE_ACCENT = "var(--wordie)";

function MyTestsPage() {
  const [openCefr, setOpenCefr] = useState(false);
  const [openWordie, setOpenWordie] = useState(false);
  const [expandedWordie, setExpandedWordie] = useState<string>("");

  const latestCefr = CEFR_HISTORY[0];
  const wordieAvg = useMemo(
    () => Math.round(ALL_WORDIE_TESTS.reduce((a, b) => a + b.score, 0) / ALL_WORDIE_TESTS.length),
    [],
  );

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
        <FloatingBack to="/profile" />

        {/* Header */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: "var(--paisley)", letterSpacing: "-0.01em" }}
          >
            My Tests
          </h1>
        </section>

        {/* CEFR Test section */}
        <section className="px-6 pt-4">
          <SectionHeader title="CEFR Test" actionLabel="Take CEFR Test" accent={CEFR_ACCENT} to="/cefr-test" />

          {/* Hero card */}
          <div
            className="mt-3 rounded-2xl p-4 flex items-center justify-between"
            style={{ background: `color-mix(in oklab, ${CEFR_ACCENT} 10%, white)` }}
          >
            <div>
              <p className="text-[11px] font-semibold leading-none" style={{ color: CEFR_ACCENT }}>
                Current CEFR Level
              </p>
              <p
                className="mt-2 text-[32px] leading-none font-medium tracking-tight"
                style={{ color: CEFR_ACCENT, letterSpacing: "-0.02em" }}
              >
                {latestCefr.level}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                Last test
              </p>
              <p className="text-[12px] font-semibold" style={{ color: "var(--foreground)" }}>
                {latestCefr.date}
              </p>
            </div>
          </div>

          {/* History toggle */}
          <button
            type="button"
            onClick={() => setOpenCefr((v) => !v)}
            className="mt-3 w-full flex items-center justify-between py-1.5"
          >
            <span className="text-[12px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
              History · {CEFR_HISTORY.length}
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{
                color: "color-mix(in oklab, var(--foreground) 55%, white)",
                transform: openCefr ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </button>

          {openCefr && (
            <div className="mt-2 rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {CEFR_HISTORY.map((h) => (
                <div key={h.id} className="w-full flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-[15px] truncate leading-tight text-foreground"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {h.level}
                    </p>
                    <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                      {h.summary}
                    </p>
                    <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                      <span
                        className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{ background: `color-mix(in oklab, ${CEFR_ACCENT} 12%, white)`, color: CEFR_ACCENT }}
                      >
                        {h.code}
                      </span>
                      <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                        {h.date}
                      </span>
                      {h.reviewCount > 0 && (
                        <span
                          className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{ background: "var(--paisley-yellow-soft)", color: "color-mix(in oklab, var(--paisley-yellow) 65%, black)" }}
                        >
                          {h.reviewCount} to review
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 self-center" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Wordie Test section */}
        <section className="px-6 pt-6 pb-8">
          <SectionHeader title="Wordie Test" actionLabel="Take Wordie Test" accent={WORDIE_ACCENT} to="/wordie-test" />

          {/* Avg + trend card */}
          <div className="mt-3 rounded-2xl p-4 border border-[var(--input)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold leading-none" style={{ color: WORDIE_ACCENT }}>
                  Average Score
                </p>
                <p
                  className="mt-2 text-[32px] leading-none font-medium tracking-tight"
                  style={{ color: WORDIE_ACCENT, letterSpacing: "-0.02em" }}
                >
                  {wordieAvg}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                  Last test
                </p>
                <p className="text-[12px] font-semibold" style={{ color: "var(--foreground)" }}>
                  {ALL_WORDIE_TESTS[0].date}
                </p>
              </div>
            </div>
            <TrendChart values={ALL_WORDIE_TESTS.slice().reverse().map((t) => t.score)} labels={ALL_WORDIE_TESTS.slice().reverse().map((t) => t.code)} accent={WORDIE_ACCENT} />
          </div>

          {/* History toggle */}
          <button
            type="button"
            onClick={() => setOpenWordie((v) => !v)}
            className="mt-3 w-full flex items-center justify-between py-1.5"
          >
            <span className="text-[12px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
              History · {ALL_WORDIE_TESTS.length}
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{
                color: "color-mix(in oklab, var(--foreground) 55%, white)",
                transform: openWordie ? "rotate(180deg)" : "rotate(0deg)"
              }}
            />
          </button>

          {openWordie && (
            <div className="mt-2 rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {ALL_WORDIE_TESTS.map((t) => {
                const expanded = expandedWordie === t.id;
                return (
                  <div key={t.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedWordie(expanded ? "" : t.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-[15px] truncate leading-tight text-foreground"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {t.score}%
                          <span
                            className="ml-2 text-[13px] font-semibold align-baseline"
                            style={{ color: "color-mix(in oklab, var(--foreground) 45%, white)" }}
                          >
                            {t.correct}/{t.total}
                          </span>
                        </p>
                        <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                          {t.summary}
                        </p>
                        <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                          <span
                            className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{ background: `color-mix(in oklab, ${WORDIE_ACCENT} 12%, white)`, color: WORDIE_ACCENT }}
                          >
                            {t.code}
                          </span>
                          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                            {t.date}
                          </span>
                          {t.reviews.length > 0 && (
                            <span
                              className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{ background: "color-mix(in oklab, var(--wordie-accent) 16%, white)", color: "color-mix(in oklab, var(--wordie-accent) 55%, black)" }}
                            >
                              {t.reviews.length} to review
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 text-muted-foreground transition-transform shrink-0 self-center"
                        style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {expanded && (
                      <div className="px-4 pb-4 pt-1 bg-muted/30">
                        <p className="mt-2 text-[11px] font-semibold" style={{ color: WORDIE_ACCENT }}>
                          Result
                        </p>
                        <div className="mt-2 space-y-2">
                          {t.dimensions.map((d) => {
                            const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
                            return (
                              <div key={d.key}>
                                <div className="flex items-center justify-between text-[11px] font-semibold">
                                  <span style={{ color: "var(--foreground)" }}>{d.label}</span>
                                  <span style={{ color: "color-mix(in oklab, var(--foreground) 60%, white)" }}>
                                    {d.correct}/{d.total}
                                  </span>
                                </div>
                                <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--input)" }}>
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${pct}%`, background: WORDIE_ACCENT }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {t.reviews.length > 0 && (
                          <>
                            <p className="mt-4 text-[11px] font-semibold" style={{ color: WORDIE_ACCENT }}>
                              Questions · {t.reviews.length} to review
                            </p>
                            <ul className="mt-2 space-y-2">
                              {t.reviews.map((r) => (
                                <li
                                  key={r.idx}
                                  className="rounded-xl p-2.5"
                                  style={{ background: "white" }}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-semibold" style={{ color: "var(--foreground)" }}>
                                      Q{r.idx} · {r.dim}
                                    </span>
                                    <span
                                      className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                      style={
                                        r.correct
                                          ? { background: "color-mix(in oklab, var(--bloxia) 14%, white)", color: "var(--bloxia)" }
                                          : { background: "color-mix(in oklab, var(--shirin) 14%, white)", color: "var(--shirin)" }
                                      }
                                    >
                                      {r.correct ? <Check className="h-3 w-3" /> : <RotateCcw className="h-3 w-3" />}
                                      {r.correct ? "Correct" : "To Review"}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-[11px]" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                                    Your answer: <span style={{ color: "var(--foreground)" }}>{r.your}</span>
                                  </p>
                                  <p className="text-[11px]" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                                    Right answer: <span style={{ color: "var(--foreground)" }}>{r.right}</span>
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </PhoneFrame>
  );
}

function SectionHeader({ title, actionLabel, accent, to }: { title: string; actionLabel: string; accent: string; to?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2
        className="text-[16px] font-semibold"
        style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {to ? (
        <Link
          to={to}
          className="inline-flex items-center text-[12px] font-semibold px-3 h-7 rounded-full"
          style={{ background: `color-mix(in oklab, ${accent} 12%, white)`, color: accent }}
        >
          {actionLabel}
        </Link>
      ) : (
        <button
          type="button"
          className="text-[12px] font-semibold px-3 h-7 rounded-full"
          style={{ background: `color-mix(in oklab, ${accent} 12%, white)`, color: accent }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function TrendChart({ values, labels, accent }: { values: number[]; labels: string[]; accent: string }) {
  const W = 300;
  const H = 120;
  const PAD_X = 8;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 22;
  const max = 100;
  const stepX = values.length > 1 ? (W - PAD_X * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => {
    const x = PAD_X + i * stepX;
    const y = PAD_TOP + (1 - v / max) * (H - PAD_TOP - PAD_BOTTOM);
    return { x, y, v };
  });
  const path = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
  }, "");
  const areaPath =
    points.length > 0
      ? `${path} L ${points[points.length - 1].x} ${H - PAD_BOTTOM} L ${points[0].x} ${H - PAD_BOTTOM} Z`
      : "";
  const guideYs = [0.25, 0.5, 0.75].map((p) => PAD_TOP + p * (H - PAD_TOP - PAD_BOTTOM));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[120px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="myTestsTrendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {guideYs.map((y, i) => (
        <line key={i} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="var(--input)" strokeWidth={1} />
      ))}
      <path d={areaPath} fill="url(#myTestsTrendFill)" />
      <path d={path} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={accent} />
      ))}
      {labels.map((lab, i) => {
        const stride = Math.max(1, Math.ceil(labels.length / 6));
        if (i % stride !== 0 && i !== labels.length - 1) return null;
        return (
        <text
          key={i}
          x={PAD_X + i * stepX}
          y={H - 6}
          textAnchor="middle"
          fontSize={9}
          fontWeight={600}
          fill="color-mix(in oklab, currentColor 55%, white)"
          style={{ color: "var(--foreground)" }}
        >
          {lab}
        </text>
        );
      })}
    </svg>
  );
}

```

### src/routes/mywordie.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Layers, Zap, ClipboardCheck, Flame, Play, ChevronRight } from "lucide-react";
import { ProgressBar } from "@/components/app/WordieKit";
import { FloatingBack } from "@/components/app/FloatingBack";
import {
  MonthCalendarDialog,
  mockActivity,
} from "@/components/app/MonthCalendarDialog";
import { useBloxia } from "@/lib/bloxia/progress";

export const Route = createFileRoute("/mywordie")({
  head: () => ({ meta: [
      { title: "myWordie — Paisley EC" },
      { name: "description", content: "Daily word cards, quick reviews and a personal word bank for young learners." },
      { property: "og:title", content: "myWordie — Paisley EC" },
      { property: "og:description", content: "Daily word cards, quick reviews and a personal word bank for young learners." },
    ] }),
  component: MyWordiePage,
});

function MyWordiePage() {
  const WORDIE = "var(--wordie)";
  const [calOpen, setCalOpen] = useState(false);
  const { bp } = useBloxia();
  // Today's card pack
  const cardsTotal = 5;
  const reviewCount = 1;
  const newCount = 4;
  const doneToday = 2; // cards completed today (mock for visual progress)
  const pct = Math.round((doneToday / cardsTotal) * 100);

  // Week calendar
  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  // Mock study days within the week (relative day-of-week indices)
  const studiedDows = new Set([1, 2, 3, today.getDay()]);

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white">
        <FloatingBack to="/" />
        {/* Hero: today's card + small pills (mirrors ShirinTalk hero) */}
        <section className="px-5 pt-[53px] pb-1">
          <div
            className="relative h-[228px] rounded-[28px] p-4 text-white overflow-hidden flex flex-col justify-between"
            style={{ background: "var(--wordie)" }}
          >
          <div>
            <h2
              className="text-center text-[22px] font-medium leading-none"
              style={{ letterSpacing: "-0.01em" }}
            >
              Today's Practice
            </h2>
            <div className="mt-2">
              <ProgressBar
                value={pct}
                color="var(--wordie-accent)"
                track="rgba(255,255,255,0.22)"
                height={4}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-center gap-2">
              <span
                className="text-[46px] font-medium leading-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                {cardsTotal}
              </span>
              <span
                className="text-[24px] opacity-90 font-medium leading-none"
                style={{ letterSpacing: "-0.01em" }}
              >
                cards
              </span>
            </div>
            <p className="mt-1 text-center text-[13px] font-semibold opacity-90">
              {reviewCount} review · {newCount} new
            </p>
          </div>

          {/* Start word card — white pill */}
          <Link
            to="/word-card"
            className="flex items-center justify-center gap-2 rounded-full py-3 font-semibold active:scale-[0.98] transition-transform"
            style={{
              color: "var(--wordie)",
              background: "white",
              fontSize: "17.25px"
            }}
          >
            <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
            <span>Start Word Card</span>
          </Link>
          </div>

          {/* Streak + Bp pills — match ShirinTalk position (mt-3 inside hero) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            7 days
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            230 cards
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            318 min
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
            style={{ color: WORDIE, border: `1px solid ${WORDIE}` }}
          >
            {bp.toLocaleString()} Bp
          </span>
          </div>
        </section>

        {/* Week calendar — locked to ShirinTalk's same hero stack: pt-12 + 220px card + mt-3 stats + pb-1 + pt-3 */}
        <section className="px-6 pt-3">
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="w-full flex items-center justify-between active:scale-[0.99] transition-transform"
            aria-label="Open monthly myWordie calendar"
          >
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
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
                        ? { color: WORDIE, border: `1.5px solid ${WORDIE}` }
                        : { color: "var(--foreground)" }
                    }
                  >
                    {d.getDate()}
                  </span>
                </div>
              );
            })}
          </button>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          <PillLink to="/wordie-bank" title="Wordie Bank" Icon={Layers} />
          <PillLink to="/wordie-x" title="Wordie-X" Icon={Zap} />
          <PillLink to="/wordie-test" title="Wordie Test" Icon={ClipboardCheck} />
        </section>
      </div>

      <BottomTabBar />
      <MonthCalendarDialog
        open={calOpen}
        onOpenChange={setCalOpen}
        title="myWordie · Monthly"
        color={WORDIE}
        getActivity={(d) => ({ wordie: mockActivity(d, 2) })}
      />
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
  const WORDIE = "var(--wordie)";
  return (
    <Link
      to={to}
      className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
      style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
    >
      <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white">
        <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: WORDIE }} />
      </span>
      <span
        className="text-[17px] font-semibold tracking-tight leading-none"
        style={{ letterSpacing: "-0.01em", color: WORDIE }}
      >
        {title}
      </span>
      <ChevronRight className="ml-auto h-5 w-5 shrink-0" strokeWidth={2.25} style={{ color: "white" }} />
    </Link>
  );
}
```

### src/routes/parent.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [
      { title: "Parent Page — Paisley EC" },
      { name: "description", content: "A weekly snapshot for parents: time, words and tests at a glance." },
      { property: "og:title", content: "Parent Page — Paisley EC" },
      { property: "og:description", content: "A weekly snapshot for parents: time, words and tests at a glance." },
    ] }),
  component: ParentPage,
});

// ---- Mock data (parent-specific mini cards, per spec §7/§8) ----
type Cell = { label: string; value: string; unit: string };
type BentoLayout = {
  hero: Cell;
  smallA: Cell;
  smallB: Cell;
  trend: Cell & { bars: number[] };
  squareA: Cell;
  squareB: Cell;
  tall: Cell & { badge: string };
  ring: Cell & { pct: number };
  extra?: Cell[];
};

const TALK_BENTO: BentoLayout = {
  hero: { label: "连续练习", value: "12", unit: "天" },
  smallA: { label: "本周对话时长", value: "37", unit: "min" },
  smallB: { label: "本周对话轮次", value: "5", unit: "次" },
  trend: { label: "本周发言轮次", value: "84", unit: "次", bars: [30, 50, 80, 40, 60] },
  squareA: { label: "本周完整表达", value: "9", unit: "次" },
  squareB: { label: "本周对话用词", value: "186", unit: "词" },
  tall: { label: "本周目标词使用", value: "14", unit: "次", badge: "Vocab Growth" },
  ring: { label: "本周主动提问", value: "11", unit: "次", pct: 55 },
};

const WORDIE_BENTO: BentoLayout = {
  hero: { label: "连续练习", value: "8", unit: "天" },
  smallA: { label: "本周练习时长", value: "18", unit: "min" },
  smallB: { label: "本周练习卡片", value: "42", unit: "张" },
  trend: { label: "本周 myWordie Talk 用词", value: "23", unit: "次", bars: [20, 45, 70, 35, 55] },
  squareA: { label: "已掌握", value: "166", unit: "词" },
  squareB: { label: "复习", value: "38", unit: "词" },
  tall: { label: "Wordie-X 收录", value: "26", unit: "词", badge: "Wordie-X" },
  ring: { label: "Wordie Test 平均分", value: "86", unit: "%", pct: 86 },
  extra: [
    { label: "学习中", value: "42", unit: "词" },
    { label: "新词", value: "14", unit: "词" },
  ],
};

const VOICE_OPTIONS = [
  { id: "monica-standard", name: "Mónica Standard", group: "current" },
  { id: "jorge-enhanced", name: "Jorge Enhanced", group: "recommended" },
  { id: "marisol-premium", name: "Marisol Premium", group: "recommended" },
  { id: "monica-enhanced", name: "Mónica Enhanced", group: "recommended" },
  { id: "eddy-standard", name: "Eddy Standard", group: "installed" },
  { id: "flo-standard", name: "Flo Standard", group: "installed" },
];

const THEME_OPTIONS = [
  { id: "system", label: "跟随系统" },
  { id: "light", label: "浅色" },
  { id: "dark", label: "深色" },
];

const PAISLEY = "var(--paisley)";
const SHIRIN = "var(--shirin)";
const WORDIE = "var(--wordie)";

type ProgressTab = "talk" | "wordie";
type SheetType = "" | "voice" | "theme" | "speechRate";

function ParentPage() {
  const [tab, setTab] = useState<ProgressTab>("talk");
  const [open, setOpen] = useState({
    settingTalk: true,
    settingWordie: true,
    wordieX: true,
    wordieXList: false,
    general: true,
  });
  const toggle = (k: keyof typeof open) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  // Mock editable values
  const [talkGoals, setTalkGoals] = useState({ week: 100, month: 400, year: 1000 });
  const [talkStreakGoal, setTalkStreakGoal] = useState(14);
  const [talkAskGoal, setTalkAskGoal] = useState(18);
  const [dailyPlan, setDailyPlan] = useState({ dailyCards: 5, dailyMinutes: 10 });
  const [wordieGoals, setWordieGoals] = useState({ week: 20, month: 200, year: 1000 });
  const [wordieStreakGoal, setWordieStreakGoal] = useState(14);

  const [prefs, setPrefs] = useState({
    voiceName: "Mónica Standard",
    voiceId: "monica-standard",
    speechRate: 0.8,
    theme: "light",
    autoPlayWordAudio: true,
    autoPlayExampleAudio: true,
    hapticFeedback: true,
    dailyStudyReminder: false,
    reminderTime: "20:00",
    streakReminder: false,
  });

  const [sheet, setSheet] = useState<{ type: SheetType; title: string }>({ type: "", title: "" });

  const bento = tab === "talk" ? TALK_BENTO : WORDIE_BENTO;
  const accent = tab === "talk" ? SHIRIN : WORDIE;
  const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, white)`;

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white pb-24">
        <FloatingBack to="/profile" />

        {/* Header */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PAISLEY }}
          >
            Parent Page
          </h1>
          <p
            className="mt-1 text-[13px] leading-none font-semibold"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
          >
            {new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </section>

        {/* Source tabs (segmented pill, same as /progress) */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[var(--input)]">
            {(["talk", "wordie"] as const).map((k) => {
              const active = tab === k;
              const c = k === "talk" ? SHIRIN : WORDIE;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className="h-9 rounded-full text-[13px] font-semibold transition-colors"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? c : "color-mix(in oklab, var(--foreground) 55%, white)",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined
                  }}
                >
                  {k === "talk" ? "ShirinTalk" : "myWordie"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Mini cards — Bento layout: hero / trend / ring / tall */}
        <section className="px-6 pt-4">
          {tab === "wordie" ? (
            <WordieBento accent={accent} tint={tint} bento={bento} />
          ) : (
            <TalkBento accent={accent} tint={tint} bento={bento} />
          )}
        </section>

        {/* 计划 */}
        <SectionTitle>计划</SectionTitle>

        {/* 跟随顶部 ShirinTalk / myWordie 切换 */}
        {tab === "talk" ? (
        <GoalCard
          open={open.settingTalk}
          onToggle={() => toggle("settingTalk")}
          title="ShirinTalk"
          accent="oklch(0.55 0 0)"
          rows={[
            { label: "连续练习", value: talkStreakGoal, unit: "天", step: 1, onChange: setTalkStreakGoal },
            { label: "主动提问", value: talkAskGoal, unit: "次", step: 1, onChange: setTalkAskGoal },
            { label: "本周", value: talkGoals.week, unit: "分钟", step: 5, onChange: (v) => setTalkGoals((g) => ({ ...g, week: v })) },
            { label: "本月", value: talkGoals.month, unit: "分钟", step: 10, onChange: (v) => setTalkGoals((g) => ({ ...g, month: v })) },
            { label: "本年", value: talkGoals.year, unit: "分钟", step: 50, onChange: (v) => setTalkGoals((g) => ({ ...g, year: v })) },
          ]}
        />
        ) : (
        <GoalCard
          open={open.settingWordie}
          onToggle={() => toggle("settingWordie")}
          title="myWordie"
          accent="oklch(0.55 0 0)"
          rows={[
            { label: "连续练习", value: wordieStreakGoal, unit: "天", step: 1, onChange: setWordieStreakGoal },
            { label: "每天卡片", value: dailyPlan.dailyCards, unit: "卡片", step: 1, onChange: (v) => setDailyPlan((p) => ({ ...p, dailyCards: v })) },
            { label: "每天时长", value: dailyPlan.dailyMinutes, unit: "分钟", step: 5, onChange: (v) => setDailyPlan((p) => ({ ...p, dailyMinutes: v })) },
            { label: "本周", value: wordieGoals.week, unit: "卡片", step: 5, onChange: (v) => setWordieGoals((g) => ({ ...g, week: v })) },
            { label: "本月", value: wordieGoals.month, unit: "卡片", step: 10, onChange: (v) => setWordieGoals((g) => ({ ...g, month: v })) },
            { label: "本年", value: wordieGoals.year, unit: "卡片", step: 50, onChange: (v) => setWordieGoals((g) => ({ ...g, year: v })) },
          ]}
        />
        )}

        {/* 设置 */}
        <SectionTitle>设置</SectionTitle>

        <section className="px-5 pt-3">
          <div
            className="rounded-2xl bg-white px-4 py-2 space-y-1"
            style={{ border: "1px solid color-mix(in oklab, oklch(0.55 0 0) 14%, white)" }}
          >
            <PrefRow
              label="语速"
              value={prefs.speechRate.toFixed(1) + "×"}
              onClick={() => setSheet({ type: "speechRate", title: "语速" })}
            />
            <PrefRow
              label="主题"
              value={THEME_OPTIONS.find((t) => t.id === prefs.theme)?.label ?? "浅色"}
              onClick={() => setSheet({ type: "theme", title: "主题" })}
            />
            <SwitchRow
              label="自动播放音频"
              checked={prefs.autoPlayWordAudio}
              onChange={(v) => setPrefs((p) => ({ ...p, autoPlayWordAudio: v }))}
            />
            <SwitchRow
              label="自动播放例句"
              checked={prefs.autoPlayExampleAudio}
              onChange={(v) => setPrefs((p) => ({ ...p, autoPlayExampleAudio: v }))}
            />
            <SwitchRow
              label="触感反馈"
              info
              checked={prefs.hapticFeedback}
              onChange={(v) => setPrefs((p) => ({ ...p, hapticFeedback: v }))}
            />
            <SwitchRow
              label="每日学习提醒"
              checked={prefs.dailyStudyReminder}
              onChange={(v) => setPrefs((p) => ({ ...p, dailyStudyReminder: v }))}
            />
            {prefs.dailyStudyReminder && (
              <div className="flex items-center justify-between py-2.5 px-1">
                <span className="text-[13px] font-semibold">提醒时间</span>
                <input
                  type="time"
                  value={prefs.reminderTime}
                  onChange={(e) => setPrefs((p) => ({ ...p, reminderTime: e.target.value }))}
                  className="bg-transparent text-[13px] font-semibold outline-none"
                  style={{ color: PAISLEY }}
                />
              </div>
            )}
            <SwitchRow
              label="连续天数提醒"
              checked={prefs.streakReminder}
              onChange={(v) => setPrefs((p) => ({ ...p, streakReminder: v }))}
            />
            <PrefRow label="评价应用" value="" onClick={() => {}} />
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] font-semibold">版本</span>
              <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                1.0.0
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] font-semibold">Admin Rules</span>
              <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
                —
              </span>
            </div>
          </div>
        </section>

        {/* Bottom sheet */}
        {sheet.type && (
          <BottomSheet title={sheet.title} onClose={() => setSheet({ type: "", title: "" })}>
            {sheet.type === "voice" && (
              <VoiceSheet
                currentId={prefs.voiceId}
                onPick={(v) => {
                  setPrefs((p) => ({ ...p, voiceId: v.id, voiceName: v.name }));
                  setSheet({ type: "", title: "" });
                }}
              />
            )}
            {sheet.type === "theme" && (
              <ThemeSheet
                value={prefs.theme}
                onPick={(id) => {
                  setPrefs((p) => ({ ...p, theme: id }));
                  setSheet({ type: "", title: "" });
                }}
              />
            )}
            {sheet.type === "speechRate" && (
              <SpeechRateSheet
                value={prefs.speechRate}
                onChange={(v) => setPrefs((p) => ({ ...p, speechRate: v }))}
              />
            )}
          </BottomSheet>
        )}

      </div>
    </PhoneFrame>
  );
}

// ============ small components ============

function WordieBento({
  accent,
  tint,
  bento,
}: {
  accent: string;
  tint: (pct: number) => string;
  bento: BentoLayout;
}) {
  const ringPct = Math.min(100, Math.round((Number(bento.hero.value) / 14) * 100));
  // Streak ring — stroke matches 已掌握 progress bar (6px)
  const STREAK_SIZE = 84;
  const STREAK_STROKE = 6;
  const R = (STREAK_SIZE - STREAK_STROKE) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="space-y-3">
      {/* Row 1: Streak hero (3 col x 2 row) + 本周卡片 stacked + 本周时长 stacked */}
      <div className="grid grid-cols-6 grid-rows-2 gap-3">
        {/* 连续练习 — tall hero with centered ring */}
        <div
          className="col-span-3 row-span-2 rounded-3xl px-4 py-4 grid place-items-center text-white relative overflow-hidden"
          style={{ background: accent }}
        >
          <span className="absolute top-3 left-4 text-[11px] font-semibold opacity-90">
            连续练习
          </span>
          <div
            className="relative grid place-items-center"
            style={{ width: STREAK_SIZE, height: STREAK_SIZE }}
          >
            <svg
              width={STREAK_SIZE}
              height={STREAK_SIZE}
              viewBox={`0 0 ${STREAK_SIZE} ${STREAK_SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle cx={STREAK_SIZE / 2} cy={STREAK_SIZE / 2} r={R} stroke="rgba(255,255,255,0.18)" strokeWidth={STREAK_STROKE} fill="none" />
              <circle
                cx={STREAK_SIZE / 2}
                cy={STREAK_SIZE / 2}
                r={R}
                stroke="white"
                strokeWidth={STREAK_STROKE}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(ringPct / 100) * C} ${C}`}
              />
            </svg>
            <div className="relative text-center leading-none">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[28px] font-medium tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                  {bento.hero.value}
                </span>
                <span className="text-[11px] font-semibold opacity-85">{bento.hero.unit}</span>
              </div>
            </div>
          </div>
          <span className="absolute right-4 bottom-3 text-[10px] font-medium leading-none flex items-baseline gap-1">
            目标
            <span className="font-semibold tabular-nums">14</span>
            {bento.hero.unit}
          </span>
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
        {/* 本周卡片 — unified tinted style */}
        <StatCard accent={accent} tint={tint} label={bento.smallA.label} value={bento.smallA.value} unit={bento.smallA.unit} />
        {/* 本周时长 — unified tinted style */}
        <StatCard accent={accent} tint={tint} label={bento.smallB.label} value={bento.smallB.value} unit={bento.smallB.unit} />
      </div>

      {/* Row 2: Wordie Test (left, white) + 本周用词 (right, tinted) */}
      <div className="grid grid-cols-6 gap-3">
        <div
          className="col-span-3 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 h-16"
          style={{ background: "var(--card)", border: `1px solid ${tint(14)}` }}
        >
          <div className="min-w-0 flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold leading-tight" style={{ color: tint(95) }}>
              Wordie Test
            </p>
            <p className="text-[11px] font-semibold leading-tight" style={{ color: tint(95) }}>
              平均分
            </p>
          </div>
          <div className="relative grid place-items-center shrink-0" style={{ width: 50, height: 50 }}>
            <svg width={50} height={50} viewBox="0 0 50 50" className="absolute inset-0 -rotate-90">
              <circle cx="25" cy="25" r="22" stroke="var(--input)" strokeWidth="4.8" fill="none" />
              <circle
                cx="25"
                cy="25"
                r="22"
                stroke={tint(95)}
                strokeWidth="4.8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(bento.ring.pct / 100) * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
              />
            </svg>
            <span
              className="text-[12px] font-semibold relative tabular-nums leading-none"
              style={{ letterSpacing: "-0.02em", color: tint(95) }}
            >
              {bento.ring.pct}%
            </span>
          </div>
        </div>
        <StatCard
          accent={accent}
          tint={tint}
          label={bento.trend.label}
          value={bento.trend.value}
          unit={bento.trend.unit}
        />
      </div>

      {/* Row 3: Vocab funnel (full) */}
      <div className="grid grid-cols-6 gap-3">
        {bento.extra && (
          <VocabFunnel
            accent={accent}
            tint={tint}
            stages={[
              { label: "新词", value: Number(bento.extra[1].value), weight: 18 },
              { label: "学习中", value: Number(bento.extra[0].value), weight: 38 },
              { label: "复习", value: Number(bento.squareB.value), weight: 60 },
              { label: "已掌握", value: Number(bento.squareA.value), weight: 100 },
            ]}
          />
        )}
      </div>
    </div>
  );
}

function TalkBento({
  accent,
  tint,
  bento,
}: {
  accent: string;
  tint: (pct: number) => string;
  bento: BentoLayout;
}) {
  const STREAK_GOAL = 14;
  const ringPct = Math.min(100, Math.round((Number(bento.hero.value) / STREAK_GOAL) * 100));
  const STREAK_SIZE = 84;
  const STREAK_STROKE = 6;
  const R = (STREAK_SIZE - STREAK_STROKE) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="space-y-3">
      {/* Row 1: 连续练习 hero (3x2) + 本周对话轮次 + 本周对话时长 */}
      <div className="grid grid-cols-6 grid-rows-2 gap-3">
        <div
          className="col-span-3 row-span-2 rounded-3xl px-4 py-4 grid place-items-center text-white relative overflow-hidden"
          style={{ background: accent }}
        >
          <span className="absolute top-3 left-4 text-[11px] font-semibold opacity-90">
            {bento.hero.label}
          </span>
          <div
            className="relative grid place-items-center"
            style={{ width: STREAK_SIZE, height: STREAK_SIZE }}
          >
            <svg
              width={STREAK_SIZE}
              height={STREAK_SIZE}
              viewBox={`0 0 ${STREAK_SIZE} ${STREAK_SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle cx={STREAK_SIZE / 2} cy={STREAK_SIZE / 2} r={R} stroke="rgba(255,255,255,0.18)" strokeWidth={STREAK_STROKE} fill="none" />
              <circle
                cx={STREAK_SIZE / 2}
                cy={STREAK_SIZE / 2}
                r={R}
                stroke="white"
                strokeWidth={STREAK_STROKE}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(ringPct / 100) * C} ${C}`}
              />
            </svg>
            <div className="relative text-center leading-none">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[28px] font-medium tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                  {bento.hero.value}
                </span>
                <span className="text-[11px] font-semibold opacity-85">{bento.hero.unit}</span>
              </div>
            </div>
          </div>
          <span className="absolute right-4 bottom-3 text-[10px] font-medium leading-none flex items-baseline gap-1">
            目标
            <span className="font-semibold tabular-nums">{STREAK_GOAL}</span>
            {bento.hero.unit}
          </span>
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>
        <StatCard accent={accent} tint={tint} label={bento.smallA.label} value={bento.smallA.value} unit={bento.smallA.unit} />
        <StatCard accent={accent} tint={tint} label={bento.smallB.label} value={bento.smallB.value} unit={bento.smallB.unit} />
      </div>

      {/* Row 2: 本周发言轮次 + 本周完整表达 */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard accent={accent} tint={tint} label={bento.trend.label} value={bento.trend.value} unit={bento.trend.unit} />
        <StatCard accent={accent} tint={tint} label={bento.squareA.label} value={bento.squareA.value} unit={bento.squareA.unit} />
      </div>

      {/* Row 3: 本周主动提问 (full row, white) */}
      <div className="grid grid-cols-6 gap-3">
        <div
          className="col-span-6 rounded-2xl px-4 py-2.5 flex flex-col gap-1.5 h-16 justify-center"
          style={{ background: "var(--card)", border: `1px solid ${tint(14)}` }}
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold leading-none" style={{ color: tint(95) }}>
              {bento.ring.label}
            </span>
            <span className="flex items-baseline gap-1 tabular-nums">
              <span
                className="text-[22px] font-medium leading-none"
                style={{ color: "var(--shirin)", letterSpacing: "-0.02em" }}
              >
                {bento.ring.value}
              </span>
              <span
                className="text-[11px] font-semibold leading-none"
                style={{ color: "var(--shirin)" }}
              >
                次
              </span>
              <span
                className="text-[10px] font-medium leading-none flex items-baseline gap-1"
                style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
              >
                目标
                <span className="font-semibold tabular-nums">18</span>
                次
              </span>
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--input)" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round((Number(bento.ring.value) / 18) * 100))}%`, background: tint(95) }}
            />
          </div>
        </div>
      </div>

      {/* Row 4: 本周对话用词 + 本周目标词使用 */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard label={bento.squareB.label} value={bento.squareB.value} unit={bento.squareB.unit} accent={accent} tint={tint} />
        <StatCard label={bento.tall.label} value={bento.tall.value} unit={bento.tall.unit} accent={accent} tint={tint} />
      </div>
    </div>
  );
}

function StatCard({
  accent,
  tint,
  label,
  value,
  unit,
  accentOverride,
}: {
  accent: string;
  tint: (pct: number) => string;
  label: string;
  value: string;
  unit: string;
  accentOverride?: string;
}) {
  const color = accentOverride ?? accent;
  const bg = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 10%, white)`
    : tint(10);
  const border = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 22%, white)`
    : tint(18);
  const labelColor = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 75%, black)`
    : tint(82);
  const unitColor = accentOverride
    ? `color-mix(in oklab, ${accentOverride} 60%, black)`
    : tint(70);
  return (
    <div
      className="col-span-3 rounded-2xl px-4 py-2.5 flex flex-col gap-1 h-16"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <span className="text-[11px] font-semibold leading-none" style={{ color: labelColor }}>
        {label}
      </span>
      <div className="flex items-baseline gap-1 mt-auto">
        <span
          className="text-[22px] font-medium leading-none tabular-nums"
          style={{ color: color, letterSpacing: "-0.02em" }}
        >
          {value}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: unitColor }}>{unit}</span>
      </div>
    </div>
  );
}

function StreakRingCard({
  accent,
  value,
  unit,
  label,
  goal,
}: {
  accent: string;
  value: number;
  unit: string;
  label: string;
  goal: number;
}) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div
      className="col-span-2 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-2 min-h-[60px] text-white relative overflow-hidden"
      style={{ background: accent, boxShadow: `0 8px 20px -14px ${accent}` }}
    >
      <div className="relative w-12 h-12 grid place-items-center shrink-0">
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
          />
        </svg>
        <span className="text-[11px] font-semibold relative tabular-nums leading-none text-white">
          {value}
          {unit}
        </span>
      </div>
      <p className="text-[11px] font-semibold leading-tight text-right min-w-0 flex-1 text-white">
        {label}
      </p>
    </div>
  );
}

function RingCard({
  accent,
  ring,
}: {
  accent: string;
  ring: { label: string; value: string; unit: string; pct: number };
}) {
  return (
    <div
      className="col-span-3 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-3 min-h-[60px] text-white relative overflow-hidden"
      style={{ background: accent, boxShadow: `0 8px 20px -14px ${accent}` }}
    >
      <p className="text-[11px] font-semibold leading-tight min-w-0 text-white">
        Wordie Test
        <br />
        平均分
      </p>
      <div className="relative w-12 h-12 grid place-items-center shrink-0">
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(ring.pct / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
          />
        </svg>
        <span className="text-[11px] font-semibold relative tabular-nums" style={{ color: accent }}>
          {ring.pct}%
        </span>
      </div>
    </div>
  );
}

type VocabStage = { label: string; value: number; weight: number };

function VocabFunnel({
  accent,
  tint,
  stages,
}: {
  accent: string;
  tint: (pct: number) => string;
  stages: VocabStage[];
}) {
  const total = stages.reduce((s, x) => s + x.value, 0);
  // Donut geometry — single ring split into 4 proportional arcs
  const SIZE = 116;
  const STROKE = 8;
  const R = (SIZE - STROKE) / 2;
  const C = 2 * Math.PI * R;
  const GAP = 0;
  const shades = [22, 42, 65, 95];
  let acc = 0;
  const arcs = stages.map((s, i) => {
    const segLen = total > 0 ? (s.value / total) * C : 0;
    const drawLen = Math.max(0, segLen - GAP);
    const offset = -acc;
    acc += segLen;
    // End angle (clockwise from 12 o'clock)
    const endTheta = (acc / C) * 2 * Math.PI;
    const endX = SIZE / 2 + R * Math.sin(endTheta);
    const endY = SIZE / 2 - R * Math.cos(endTheta);
    return { drawLen, offset, color: tint(shades[i]), endX, endY };
  });
  return (
    <div
      className="col-span-6 rounded-3xl px-5 py-4 bg-white"
      style={{ border: `1px solid ${tint(14)}` }}
    >
      <div className="flex items-center gap-5">
        {/* Left: refined 4-segment donut */}
        <div
          className="relative shrink-0 grid place-items-center"
          style={{
            width: SIZE,
            height: SIZE,
            background: `radial-gradient(closest-side, ${tint(6)} 0%, transparent 70%)`,
            borderRadius: "9999px"
          }}
        >
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={tint(10)}
              strokeWidth={STROKE}
            />
            <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
              {arcs.map((a, i) => (
                <circle
                  key={i}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={R}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                  strokeDasharray={`${a.drawLen} ${C}`}
                  strokeDashoffset={a.offset}
                />
              ))}
            </g>
            {arcs.map((a, i) => (
              <circle key={`cap-${i}`} cx={a.endX} cy={a.endY} r={STROKE / 2} fill={a.color} />
            ))}
          </svg>
          <span
            className="relative text-[22px] font-medium tabular-nums leading-none -translate-y-2"
            style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
          >
            {total}
          </span>
          <span
            className="absolute left-1/2 -translate-x-1/2 text-[11px] font-semibold leading-none whitespace-nowrap"
            style={{ top: `calc(50% + 12px)`, color: tint(shades[3]) }}
          >
            学习词库
          </span>
        </div>

        {/* Right: 4 progress rows */}
        <div className="flex-1 min-w-0 space-y-2">
          {stages.map((s, i) => {
            const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
            return (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: tint(shades[i] < 50 ? 78 : shades[i]) }}
                  >
                    {s.label}
                  </span>
                  <span className="flex items-baseline gap-1 tabular-nums">
                    <span
                      className="text-[11px] font-semibold leading-none"
                      style={{ color: "var(--foreground)" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-[11px] font-semibold leading-none"
                      style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
                    >
                      / {pct}%
                    </span>
                  </span>
                </div>
                <div
                  className="mt-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--input)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: tint(shades[i]) }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="px-6 pt-6 pb-2 text-[13px] font-semibold uppercase tracking-wide text-black"
    >
      {children}
    </h2>
  );
}

function Collapsible({
  open,
  onToggle,
  title,
  accent,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 pt-3">
      <div
        className="rounded-2xl"
        style={{ background: "white", border: `1px solid color-mix(in oklab, ${accent} 18%, white)` }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <span className="text-[14px] font-semibold" style={{ color: accent }}>
            {title}
          </span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none", color: accent }}
          />
        </button>
        {open && <div className="px-4 pb-4 pt-1">{children}</div>}
      </div>
    </section>
  );
}

function NumberRow({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-[13px] font-semibold">{label}</span>
      <div className="flex items-baseline gap-1">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => {
            const n = Math.max(0, Math.round(Number(e.target.value) || 0));
            onChange(n);
          }}
          className="w-20 bg-transparent text-right text-[15px] font-semibold outline-none border-b border-border focus:border-[color:var(--paisley)] py-0.5"
        />
        <span className="text-[12px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {unit}
        </span>
      </div>
    </div>
  );
}

type GoalRowSpec = {
  label: string;
  value: number;
  unit: string;
  step?: number;
  onChange: (v: number) => void;
};

function GoalCard({
  accent,
  rows,
}: {
  open?: boolean;
  onToggle?: () => void;
  title?: string;
  accent: string;
  rows: GoalRowSpec[];
}) {
  return (
    <section className="px-5 pt-3">
      <div className="grid grid-cols-2 gap-2.5">
        {rows.map((r) => (
          <GoalRow key={r.label} accent={accent} {...r} />
        ))}
      </div>
    </section>
  );
}

function GoalRow({
  label,
  value,
  unit,
  accent,
  onChange,
}: GoalRowSpec & { accent: string }) {
  const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, white)`;
  return (
    <div
      className="relative flex items-center justify-between px-3 rounded-2xl bg-white h-16"
      style={{ border: `1px solid ${tint(14)}` }}
    >
      <span
        className="text-[11px] font-semibold leading-none"
        style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
      >
        {label}
      </span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => {
          const n = Math.max(0, Math.round(Number(e.target.value) || 0));
          onChange(n);
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 bg-transparent text-center text-[18px] font-semibold leading-none tabular-nums outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ color: accent, letterSpacing: "-0.02em" }}
      />
      <span
        className="text-[11px] font-semibold leading-none"
        style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}
      >
        {unit}
      </span>
    </div>
  );
}

function PrefRow({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-2.5 px-1 text-left"
    >
      <span className="text-[13px] font-semibold">{label}</span>
      <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
        {value}
        <ChevronDown className="inline h-4 w-4 -rotate-90 ml-1 align-[-2px]" />
      </span>
    </button>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
  info,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  info?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 px-1">
      <span className="text-[13px] font-semibold flex items-center gap-1">
        {label}
        {info && <HelpCircle className="h-3.5 w-3.5 opacity-50" />}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: checked ? PAISLEY : "var(--input)" }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? 22 : 2 }}
        />
      </button>
    </div>
  );
}

function WordieXCard({
  word,
  status,
  focus,
  partOfSpeech,
  cefrLevel,
  source,
  mastery,
  nextReview,
}: {
  word: string;
  status: "New" | "Learning" | "Review" | "Focus" | "Mastered" | "Relearning";
  focus?: boolean;
  partOfSpeech: string;
  cefrLevel: string;
  source: "iAdded" | "Example" | "ShirinTalk";
  mastery: number;
  nextReview: string;
}) {
  const [isFocus, setIsFocus] = useState(!!focus);
  const [isReview, setIsReview] = useState(status === "Review");
  const statusLabel: Record<string, string> = {
    New: "新词",
    Learning: "学习中",
    Review: "复习",
    Focus: "重点",
    Mastered: "已掌握",
    Relearning: "重新学",
  };
  return (
    <div
      className="rounded-2xl p-3"
      style={{ background: "color-mix(in oklab, var(--wordie) 6%, white)", border: "1px solid color-mix(in oklab, var(--wordie) 18%, white)" }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[18px] font-semibold" style={{ color: WORDIE }}>
          {word}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          {partOfSpeech} · {cefrLevel} · {source}
        </span>
      </div>
      <div className="flex gap-1.5 mt-1.5">
        <Pill color="var(--wordie)">{statusLabel[status]}</Pill>
        {isFocus && <Pill color="var(--paisley)">重点</Pill>}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
        <span>掌握度 {mastery}%</span>
        <span>下次复习 · {nextReview}</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <ActionPill onClick={() => setIsFocus((v) => !v)} active={isFocus} color="var(--paisley)">
          {isFocus ? "移除重点" : "加入重点"}
        </ActionPill>
        <ActionPill onClick={() => setIsReview((v) => !v)} active={isReview} color="var(--wordie)">
          {isReview ? "移除复习" : "移入复习"}
        </ActionPill>
        <ActionPill onClick={() => {}} color="var(--shirin)">
          重置
        </ActionPill>
      </div>
    </div>
  );
}

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="px-2 h-5 rounded-full text-[10px] font-semibold inline-flex items-center"
      style={{ background: `color-mix(in oklab, ${color} 14%, white)`, color }}
    >
      {children}
    </span>
  );
}

function ActionPill({
  active,
  color,
  children,
  onClick,
}: {
  active?: boolean;
  color: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-7 rounded-full text-[11px] font-semibold"
      style={{
        background: active ? color : `color-mix(in oklab, ${color} 10%, white)`,
        color: active ? "white" : color
      }}
    >
      {children}
    </button>
  );
}

function BottomSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl p-5 pb-8 shadow-2xl">
        <div className="mx-auto w-10 h-1.5 rounded-full bg-[oklch(0.9_0.01_240)] mb-3" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="text-[13px] font-semibold" style={{ color: PAISLEY }}>
            完成
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function VoiceSheet({ currentId, onPick }: { currentId: string; onPick: (v: { id: string; name: string }) => void }) {
  const groups: { key: string; label: string }[] = [
    { key: "current", label: "当前音色" },
    { key: "recommended", label: "推荐音色" },
    { key: "installed", label: "已安装音色" },
  ];
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-[11px] font-semibold uppercase mb-1.5" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
            {g.label}
          </p>
          <div className="space-y-1">
            {VOICE_OPTIONS.filter((v) => v.group === g.key).map((v) => {
              const active = v.id === currentId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onPick({ id: v.id, name: v.name })}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left"
                  style={{
                    background: active ? "color-mix(in oklab, var(--paisley) 10%, white)" : "transparent",
                    color: active ? PAISLEY : "var(--foreground)"
                  }}
                >
                  <span className="text-[14px] font-semibold">{v.name}</span>
                  {active && <span className="text-[12px] font-semibold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ThemeSheet({ value, onPick }: { value: string; onPick: (id: string) => void }) {
  return (
    <div className="space-y-1">
      {THEME_OPTIONS.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.id)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left"
            style={{
              background: active ? "color-mix(in oklab, var(--paisley) 10%, white)" : "transparent",
              color: active ? PAISLEY : "var(--foreground)"
            }}
          >
            <span className="text-[14px] font-semibold">{t.label}</span>
            {active && <span className="text-[12px] font-semibold">✓</span>}
          </button>
        );
      })}
    </div>
  );
}

function SpeechRateSheet({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[13px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
          当前
        </span>
        <span className="text-[20px] font-semibold" style={{ color: PAISLEY }}>
          {value.toFixed(1)}×
        </span>
      </div>
      <input
        type="range"
        min={0.6}
        max={1.4}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--paisley)]"
      />
      <div className="flex justify-between text-[11px] font-semibold mt-1" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
        <span>0.6×</span>
        <span>1.0×</span>
        <span>1.4×</span>
      </div>
    </div>
  );
}

```

### src/routes/profile.tsx

```tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import pecFromLogo from "@/assets/brand/pec-from-logo.png.asset.json";
import { useRef, useCallback, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { FloatingBack } from "@/components/app/FloatingBack";
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
const PROFILE = {
  avatarPath:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniella&backgroundColor=ffd5dc,c0aede,b6e3f4&radius=50",
  givenName: "Daniella",
  familyName: "Wang",
  age: 9,
  cefr: "A2",
  registeredAt: new Date("2025-03-14"),
};
const DISPLAY_NAME = `${PROFILE.givenName} ${PROFILE.familyName}`.trim();
const INITIALS = ((PROFILE.givenName[0] ?? "") + (PROFILE.familyName[0] ?? "")).toUpperCase();

const PAISLEY = "var(--paisley)";
const PAISLEY_YELLOW = "var(--paisley-yellow)";
const PAISLEY_YELLOW_SOFT = "var(--paisley-yellow-soft)";

function ProfilePage() {
  const [calOpen, setCalOpen] = useState(false);
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
        <section className="px-6 pt-[55px] pb-1 text-center">
          <div className="relative mx-auto h-40 w-40">
            <div
              className="h-40 w-40 rounded-full grid place-items-center overflow-hidden"
              style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)" }}
            >
              {PROFILE.avatarPath ? (
                <img src={PROFILE.avatarPath} alt={DISPLAY_NAME} className="h-full w-full object-cover" />
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
            Reg. {PROFILE.registeredAt.toLocaleString("en-US", { month: "short" })} {PROFILE.registeredAt.getDate()} {PROFILE.registeredAt.getFullYear()}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY_YELLOW, border: `1px solid ${PAISLEY_YELLOW}` }}
            >
              Age {PROFILE.age}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PAISLEY_YELLOW, border: `1px solid ${PAISLEY_YELLOW}` }}
            >
              CEFR {PROFILE.cefr}
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
                        : (hasTalk || hasWordie)
                        ? { color: PAISLEY, background: "color-mix(in oklab, var(--paisley) 12%, white)" }
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
          <PillLink to="/parent" title="Parent Page" Icon={Users} />
        </section>

      </div>

      {/* About PEC link — fixed just above the bottom tab bar */}
      <div
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 pointer-events-none"
        style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 5.5rem)" }}
      >
        <div className="pointer-events-auto">
          <AboutPecLink />
        </div>
      </div>
      <BottomTabBar />
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
      />
    </PhoneFrame>
  );
}

function PillLink({
  to,
  title,
  Icon,
  outlined,
}: {
  to: string;
  title: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  outlined?: boolean;
}) {
  const bg = "color-mix(in oklab, var(--paisley) 12%, white)";
  return (
    <Link
      to={to}
      className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
      style={
        outlined
          ? { background: "white", border: `1.5px solid ${bg}` }
          : { background: bg }
      }
    >
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
    </Link>
  );
}

function AboutPecLink() {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const firstClickTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    clickCountRef.current = 0;
    firstClickTimeRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (firstClickTimeRef.current === null || now - firstClickTimeRef.current > 5000) {
      firstClickTimeRef.current = now;
      clickCountRef.current = 0;
    }
    clickCountRef.current += 1;

    if (clickCountRef.current === 5) {
      reset();
      navigate({ to: "/admin" });
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const count = clickCountRef.current;
      reset();
      if (count >= 1 && count < 5) {
        navigate({ to: "/about" });
      }
    }, 500);
  }, [navigate, reset]);

  const gray = "oklch(0.65 0.02 260)";
  return (
    <div className="pb-4 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="text-[13px] font-bold tracking-wide select-none inline-flex items-baseline leading-none"
        style={{ color: gray, gap: "5px" }}
        aria-label="About PEC"
      >
        <span className="leading-none">About</span>
        <img
          src="/assets/pec-matched.png"
          alt="PEC"
          className="object-contain block"
          style={{ height: "0.75em", width: "auto" }}
        />
      </button>
    </div>
  );
}
```

### src/routes/progress.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [
      { title: "My Progress — Paisley EC" },
      { name: "description", content: "Weekly, monthly and yearly stats for talk minutes and word cards." },
      { property: "og:title", content: "My Progress — Paisley EC" },
      { property: "og:description", content: "Weekly, monthly and yearly stats for talk minutes and word cards." },
    ] }),
  component: ProgressPage,
});

type SourceKey = "talk" | "wordie";
type TrendMode = "week" | "month" | "year";

// ---- Demo data (USE_PROGRESS_DEMO_VALUES = true) ----
const TALK_STATS = {
  cards: [
    { key: "time_spent", title: "Time Spent", value: "908", unit: "min", meta: "37 this week" },
    { key: "sessions", title: "Sessions", value: "62", unit: "", meta: "5 this week" },
    { key: "talk_words", title: "Talk Words", value: "4,210", unit: "", meta: "186 this week" },
  ],
  goals: { week: { done: 37, total: 100, unit: "min" }, month: { done: 168, total: 400, unit: "min" }, year: { done: 640, total: 1000, unit: "min" }, total: "908 min" },
  trend: {
    week: [12, 0, 18, 9, 22, 0, 37],
    month: Array.from({ length: 30 }, (_, i) => Math.round(8 + 12 * Math.sin(i / 2.3) + (i % 4 === 0 ? 6 : 0))),
    year: [40, 55, 72, 60, 80, 95, 70, 88, 110, 130, 120, 168],
  },
};

const WORDIE_STATS = {
  cards: [
    { key: "time_spent", title: "Time Spent", value: "320", unit: "min", meta: "18 this week" },
    { key: "words", title: "Word Cards", value: "260", unit: "", meta: "64% mastered" },
    { key: "tests", title: "Wordie Tests", value: "18", unit: "", meta: "Avg 86%" },
  ],
  goals: { week: { done: 12, total: 20, unit: "cards" }, month: { done: 86, total: 200, unit: "cards" }, year: { done: 340, total: 1000, unit: "cards" }, total: "438 cards" },
  trend: {
    week: [3, 0, 2, 4, 0, 1, 2],
    month: Array.from({ length: 30 }, (_, i) => Math.max(0, Math.round(4 + 3 * Math.cos(i / 1.8)))),
    year: [18, 22, 30, 28, 36, 40, 32, 38, 45, 52, 48, 86],
  },
};

const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ProgressPage() {
  const [source, setSource] = useState<SourceKey>("talk");
  const [mode, setMode] = useState<TrendMode>("week");

  const accent = source === "talk" ? "var(--shirin)" : "var(--wordie)";
  const accentSoft = source === "talk" ? "color-mix(in oklab, var(--shirin) 12%, white)" : "color-mix(in oklab, var(--wordie) 12%, white)";
  const data = source === "talk" ? TALK_STATS : WORDIE_STATS;

  // Goal ring tones: base brand color + two lighter tints of the same hue
  const goalTones = {
    week: accent,
    month: `color-mix(in oklab, ${accent} 70%, white)`,
    year: `color-mix(in oklab, ${accent} 45%, white)`,
  };

  const trendSeries = data.trend[mode];
  const axisLabels = useMemo(() => {
    if (mode === "week") return WEEK_LABELS.map((d) => d[0]);
    if (mode === "year") return MONTH_LABELS.map((m) => m[0]);
    // month — show 1, 8, 15, 22, 29
    return Array.from({ length: trendSeries.length }, (_, i) => ([0, 7, 14, 21, 28].includes(i) ? String(i + 1) : ""));
  }, [mode, trendSeries.length]);

  const today = new Date();
  const dateLabel = today.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] flex flex-col bg-white">
        <FloatingBack to="/profile" />

        {/* Header */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: accent, letterSpacing: "-0.01em" }}
          >
            My Progress
          </h1>
          <p
            className="mt-1 text-[13px] leading-none font-semibold"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
          >
            {dateLabel}
          </p>
        </section>

        {/* Source tabs */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[var(--input)]">
            {(["talk", "wordie"] as const).map((key) => {
              const active = source === key;
              const c = key === "talk" ? "var(--shirin)" : "var(--wordie)";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSource(key)}
                  className="h-9 rounded-full text-[13px] font-semibold transition-colors"
                  style={{
                    background: active ? "white" : "transparent",
                    color: active ? c : "color-mix(in oklab, var(--foreground) 55%, white)",
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined
                  }}
                >
                  {key === "talk" ? "ShirinTalk" : "myWordie"}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stat cards */}
        <section className="px-6 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {data.cards.map((c) => (
              <div
                key={c.key}
                className="rounded-2xl p-3 flex flex-col justify-between min-h-[88px]"
                style={{ background: accentSoft }}
              >
                <p
                  className="text-[11px] font-semibold leading-none"
                  style={{ color: accent, letterSpacing: "-0.01em" }}
                >
                  {c.title}
                </p>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[22px] font-medium leading-none"
                      style={{ color: accent, letterSpacing: "-0.02em" }}
                    >
                      {c.value}
                    </span>
                    {c.unit && (
                      <span className="text-[11px] font-semibold leading-none" style={{ color: accent }}>
                        {c.unit}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-1 text-[10px] font-medium leading-none"
                    style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
                  >
                    {c.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trend panel */}
        <section className="px-6 pt-4">
          <div className="rounded-2xl p-4 border border-[var(--input)]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>
                Trend
              </p>
              <div className="flex gap-1 p-0.5 rounded-full bg-[var(--input)]">
                {(["week", "month", "year"] as const).map((m) => {
                  const active = mode === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className="px-2.5 h-6 rounded-full text-[11px] font-semibold transition-colors"
                      style={{
                        background: active ? "white" : "transparent",
                        color: active ? accent : "color-mix(in oklab, var(--foreground) 55%, white)"
                      }}
                    >
                      {m === "week" ? "Week" : m === "month" ? "Month" : "Year"}
                    </button>
                  );
                })}
              </div>
            </div>
            <TrendChart values={trendSeries} labels={axisLabels} accent={accent} />
          </div>
        </section>

        {/* Goal rings */}
        <section className="px-6 pt-4 pb-8">
          <div className="rounded-2xl p-4 border border-[var(--input)]">
            <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>
              Goals
            </p>
            <div className="mt-3 flex items-center gap-4">
              <GoalRing
                year={data.goals.year}
                month={data.goals.month}
                week={data.goals.week}
                tones={goalTones}
              />
              <div className="flex-1 space-y-2">
                <GoalRow tone={goalTones.week} label="Week" done={data.goals.week.done} total={data.goals.week.total} unit={data.goals.week.unit} />
                <GoalRow tone={goalTones.month} label="Month" done={data.goals.month.done} total={data.goals.month.total} unit={data.goals.month.unit} />
                <GoalRow tone={goalTones.year} label="Year" done={data.goals.year.done} total={data.goals.year.total} unit={data.goals.year.unit} />
                <div className="pt-1 text-[11px] font-semibold" style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}>
                  Up to Now · {data.goals.total}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PhoneFrame>
  );
}

// ---- Trend chart ----
function TrendChart({ values, labels, accent }: { values: number[]; labels: string[]; accent: string }) {
  const W = 300;
  const H = 120;
  const PAD_X = 8;
  const PAD_TOP = 10;
  const PAD_BOTTOM = 22;
  const max = Math.max(1, ...values);
  const stepX = values.length > 1 ? (W - PAD_X * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => {
    const x = PAD_X + i * stepX;
    const y = PAD_TOP + (1 - v / max) * (H - PAD_TOP - PAD_BOTTOM);
    return { x, y, v };
  });
  // smooth path
  const path = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q ${cx} ${prev.y} ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`;
  }, "");
  const areaPath = `${path} L ${points[points.length - 1].x} ${H - PAD_BOTTOM} L ${points[0].x} ${H - PAD_BOTTOM} Z`;

  const guideYs = [0.25, 0.5, 0.75].map((p) => PAD_TOP + p * (H - PAD_TOP - PAD_BOTTOM));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-[120px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {guideYs.map((y, i) => (
        <line key={i} x1={PAD_X} x2={W - PAD_X} y1={y} y2={y} stroke="var(--input)" strokeWidth={1} />
      ))}
      <path d={areaPath} fill="url(#trendFill)" />
      <path d={path} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={accent} />
      ))}
      {labels.map((lab, i) => (
        lab ? (
          <text
            key={i}
            x={PAD_X + i * stepX}
            y={H - 6}
            textAnchor="middle"
            fontSize={9}
            fontWeight={600}
            fill="color-mix(in oklab, currentColor 55%, white)"
            style={{ color: "var(--foreground)" }}
          >
            {lab}
          </text>
        ) : null
      ))}
    </svg>
  );
}

// ---- Goal ring (3 concentric arcs) ----
function GoalRing({
  year,
  month,
  week,
  tones,
}: {
  year: { done: number; total: number };
  month: { done: number; total: number };
  week: { done: number; total: number };
  tones: { week: string; month: string; year: string };
}) {
  const SIZE = 112;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const rings = [
    { r: 48, tone: tones.year, pct: clampPct(year.done / year.total) },   // outer = year (lightest)
    { r: 36, tone: tones.month, pct: clampPct(month.done / month.total) }, // middle = month
    { r: 24, tone: tones.week, pct: clampPct(week.done / week.total) },    // inner = week (base)
  ];
  const STROKE = 8;
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0">
      {rings.map((r, i) => {
        const C = 2 * Math.PI * r.r;
        return (
          <g key={i} transform={`rotate(-90 ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={r.r} fill="none" stroke="var(--input)" strokeWidth={STROKE} />
            <circle
              cx={cx}
              cy={cy}
              r={r.r}
              fill="none"
              stroke={r.tone}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${C * r.pct} ${C}`}
            />
          </g>
        );
      })}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={14}
        fontWeight={800}
        fill="var(--foreground)"
      >
        {Math.round(clampPct(week.done / week.total) * 100)}%
      </text>
    </svg>
  );
}

function GoalRow({ tone, label, done, total, unit }: { tone: string; label: string; done: number; total: number; unit: string }) {
  const pct = Math.round(clampPct(done / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span style={{ color: tone }}>{label}</span>
        <span style={{ color: "color-mix(in oklab, var(--foreground) 65%, white)" }}>
          {done} / {total} {unit}
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--input)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} />
      </div>
    </div>
  );
}

function clampPct(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

```

### src/routes/shirin-talk.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import mywordieIcon from "@/assets/brand/mywordie-icon.png.asset.json";
import { Flame, MessageCircle, BookOpen, Lightbulb, ChevronRight } from "lucide-react";
import { FloatingBack } from "@/components/app/FloatingBack";
import {
  MonthCalendarDialog,
  mockActivity,
} from "@/components/app/MonthCalendarDialog";
import { useBloxia } from "@/lib/bloxia/progress";

export const Route = createFileRoute("/shirin-talk")({
  head: () => ({ meta: [
      { title: "ShirinTalk — Paisley EC" },
      { name: "description", content: "Practise spoken English with Shirin: topic talks, smart reading and free chat." },
      { property: "og:title", content: "ShirinTalk — Paisley EC" },
      { property: "og:description", content: "Practise spoken English with Shirin: topic talks, smart reading and free chat." },
    ] }),
  component: ShirinTalkPage,
});

const PINK = "var(--shirin)";

function ShirinTalkPage() {
  const [calOpen, setCalOpen] = useState(false);
  const { bp } = useBloxia();
  const cards = [
    { to: "/topics", title: "Topic Talk", icon: Lightbulb },
    { to: "/smart-reading", title: "Smart Reading Talk", icon: BookOpen, search: { from: "shirin-talk" } as const },
    { to: "/chat", title: "myWordie Talk", icon: null, search: { mode: "mywordie", from: "shirin-talk" } as const },
  ];

  const today = new Date();
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white">
        <FloatingBack to="/" />

        {/* Hero */}
        <section className="px-6 pt-[55px] pb-1 text-center">
          <img
            src={shirinHero.url}
            alt="Shirin"
            className="mx-auto h-40 w-40 object-contain"
          />
          <h2
            className="mt-2 text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PINK, letterSpacing: "-0.01em" }}
          >
            Hi, I'm Shirin!
          </h2>
          <p
            className="mt-1 text-[15px] text-foreground/70 font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            Let's practise English together.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              7 days
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              116 words
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              318 min
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-semibold bg-white h-7"
              style={{ color: PINK, border: `1px solid ${PINK}` }}
            >
              {bp.toLocaleString()} Bp
            </span>
          </div>
        </section>

        {/* Week calendar */}
        <section className="px-6 pt-3">
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className="w-full flex items-center justify-between active:scale-[0.99] transition-transform"
            aria-label="Open monthly ShirinTalk calendar"
          >
            {week.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-medium" style={{ color: "color-mix(in oklab, var(--foreground) 50%, white)" }}>
                    {dayLabels[i]}
                  </span>
                  <span
                    className="h-8 w-8 grid place-items-center rounded-full text-[13px] font-semibold"
                    style={
                      isToday
                        ? { color: PINK, border: `1.5px solid ${PINK}` }
                        : { color: "var(--foreground)" }
                    }
                  >
                    {d.getDate()}
                  </span>
                </div>
              );
            })}
          </button>
        </section>

        {/* Pill actions */}
        <section className="px-6 pt-6 pb-6 flex flex-col gap-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                search={"search" in c ? c.search : undefined}
                className="relative isolate flex items-center gap-3 rounded-full py-4 px-4 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--shirin) 14%, white)" }}
              >
                <span className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white">
                  {Icon ? (
                    <Icon className="h-4 w-4" strokeWidth={2.25} style={{ color: PINK }} />
                  ) : (
                    <span
                      aria-hidden
                      className="block h-[18px] w-[18px]"
                      style={{
                        background: PINK,
                        WebkitMaskImage: `url(${mywordieIcon.url})`,
                        maskImage: `url(${mywordieIcon.url})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain"
                      }}
                    />
                  )}
                </span>
                <span className="text-[17px] font-semibold tracking-tight leading-none" style={{ letterSpacing: "-0.01em", color: PINK }}>
                  {c.title}
                </span>
                <ChevronRight className="ml-auto h-5 w-5 shrink-0" strokeWidth={2.25} style={{ color: "white" }} />
              </Link>
            );
          })}
        </section>
      </div>

      <BottomTabBar />
      <MonthCalendarDialog
        open={calOpen}
        onOpenChange={setCalOpen}
        title="ShirinTalk · Monthly"
        color={PINK}
        getActivity={(d) => ({ talk: mockActivity(d, 1) })}
      />
    </PhoneFrame>
  );
}
```

### src/routes/smart-reading.tsx

```tsx
import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Search, BookOpen, Check, ChevronDown, ChevronRight } from "lucide-react";
import { FloatingBack } from "@/components/app/FloatingBack";
import { z } from "zod";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";
const LAST_BOOK_KEY = "smart_reading_last_selected_book_code_v1";

// Emoji cover circle — pastel gradients deterministically picked by lesson_id.
// To change the palette: edit COVER_PALETTE. To change selection rule: edit coverFor().
const COVER_PALETTE: string[] = [
  "linear-gradient(135deg,#FFD1DC,#FFA8C5)", // pink
  "linear-gradient(135deg,#FDE68A,#FCA5A5)", // peach
  "linear-gradient(135deg,#BFDBFE,#C4B5FD)", // periwinkle
  "linear-gradient(135deg,#FBCFE8,#FCD34D)", // pink-gold
  "linear-gradient(135deg,#A7F3D0,#67E8F9)", // mint
  "linear-gradient(135deg,#FEF3C7,#FBBF24)", // sunshine
  "linear-gradient(135deg,#C7D2FE,#A78BFA)", // lavender
  "linear-gradient(135deg,#FECACA,#FB7185)", // coral
  "linear-gradient(135deg,#E0E7FF,#BFDBFE)", // sky
];
function coverFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return COVER_PALETTE[h % COVER_PALETTE.length];
}

type Unit = {
  lesson_id: string;
  unit_number: number;
  story_title: string;
  cover_question: string;
  emoji: string;
  done?: boolean;
};

type Pack = {
  pack_id: string;
  series_name: string;
  book_code: string;
  title: string;
  CEFR: string;
  Lexile: string;
  wordCount: string;
  units: Unit[];
};

const UNITS_2_1: Unit[] = [
  { lesson_id: "smart_reading_2_1_unit_1", unit_number: 1, story_title: "My Cat Bob", cover_question: "Bob has many feelings. How does Bob feel?", emoji: "🐱", done: true },
  { lesson_id: "smart_reading_2_1_unit_2", unit_number: 2, story_title: "I Can Run", cover_question: "What can you do at the park?", emoji: "🏃", done: true },
  { lesson_id: "smart_reading_2_1_unit_3", unit_number: 3, story_title: "A Big Red Bus", cover_question: "Where does the red bus go?", emoji: "🚌" },
  { lesson_id: "smart_reading_2_1_unit_4", unit_number: 4, story_title: "My Mom and Me", cover_question: "What do you and your mom do together?", emoji: "👩‍👧" },
  { lesson_id: "smart_reading_2_1_unit_5", unit_number: 5, story_title: "The Little Duck", cover_question: "Why is the little duck happy?", emoji: "🦆" },
  { lesson_id: "smart_reading_2_1_unit_6", unit_number: 6, story_title: "At the Farm", cover_question: "Which animal do you like at the farm?", emoji: "🐮" },
  { lesson_id: "smart_reading_2_1_unit_7", unit_number: 7, story_title: "Rainy Day Fun", cover_question: "What do you do on a rainy day?", emoji: "🌧️" },
  { lesson_id: "smart_reading_2_1_unit_8", unit_number: 8, story_title: "My New Shoes", cover_question: "What color are your favorite shoes?", emoji: "👟" },
];

const UNITS_2_2: Unit[] = [
  { lesson_id: "smart_reading_2_2_unit_1", unit_number: 1, story_title: "A Day at the Zoo", cover_question: "Which animal do you want to see first?", emoji: "🦁" },
  { lesson_id: "smart_reading_2_2_unit_2", unit_number: 2, story_title: "My Best Friend", cover_question: "Who is your best friend? Why?", emoji: "🤝" },
  { lesson_id: "smart_reading_2_2_unit_3", unit_number: 3, story_title: "The Lost Kite", cover_question: "Where did the kite go?", emoji: "🪁" },
  { lesson_id: "smart_reading_2_2_unit_4", unit_number: 4, story_title: "Bedtime Story", cover_question: "What story do you like before bed?", emoji: "🌙" },
  { lesson_id: "smart_reading_2_2_unit_5", unit_number: 5, story_title: "Lunch with Grandma", cover_question: "What is your favorite lunch?", emoji: "🥪" },
  { lesson_id: "smart_reading_2_2_unit_6", unit_number: 6, story_title: "The Brave Little Boat", cover_question: "How does the boat feel in the storm?", emoji: "⛵" },
  { lesson_id: "smart_reading_2_2_unit_7", unit_number: 7, story_title: "My Birthday Party", cover_question: "Who do you want at your party?", emoji: "🎂" },
  { lesson_id: "smart_reading_2_2_unit_8", unit_number: 8, story_title: "Snowy Morning", cover_question: "What do you do when it snows?", emoji: "⛄" },
];

const PACKS: Pack[] = [
  {
    pack_id: "smart_reading_2_1_units_1_16",
    series_name: "Smart Reading",
    book_code: "2.1",
    title: "Smart Reading 2.1",
    CEFR: "PreA1-A1",
    Lexile: "150L-350L",
    wordCount: "50",
    units: UNITS_2_1,
  },
  {
    pack_id: "smart_reading_2_2_units_1_16",
    series_name: "Smart Reading",
    book_code: "2.2",
    title: "Smart Reading 2.2",
    CEFR: "PreA1-A1",
    Lexile: "150L-350L",
    wordCount: "60",
    units: UNITS_2_2,
  },
];

export const Route = createFileRoute("/smart-reading")({
  head: () => ({ meta: [
      { title: "Smart Reading — Paisley EC" },
      { name: "description", content: "Read along with picture books and discuss them with Shirin." },
      { property: "og:title", content: "Smart Reading — Paisley EC" },
      { property: "og:description", content: "Read along with picture books and discuss them with Shirin." },
    ] }),
  validateSearch: z.object({ from: z.string().optional() }),
  component: SmartReadingPage,
});

function SmartReadingPage() {
  const search = useSearch({ from: "/smart-reading" });
  const backTo = search.from === "topics" ? "/topics" : "/shirin-talk";
  const [query, setQuery] = useState("");
  const [bookCode, setBookCode] = useState<string>(PACKS[0].book_code);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // restore last selected book
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_BOOK_KEY);
      if (saved && PACKS.some((p) => p.book_code === saved)) setBookCode(saved);
    } catch {}
  }, []);

  // close picker on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [pickerOpen]);

  const currentPack = useMemo(
    () => PACKS.find((p) => p.book_code === bookCode) ?? PACKS[0],
    [bookCode],
  );

  const selectBook = (code: string) => {
    setBookCode(code);
    setPickerOpen(false);
    try {
      localStorage.setItem(LAST_BOOK_KEY, code);
    } catch {}
  };

  const units = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currentPack.units;
    return currentPack.units.filter(
      (u) =>
        u.story_title.toLowerCase().includes(q) ||
        u.cover_question.toLowerCase().includes(q),
    );
  }, [query, currentPack]);

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        <FloatingBack to={backTo} />

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-14">
          {/* Book picker */}
          <div className="relative mb-3" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 rounded-full px-4 py-4 text-left active:scale-[0.98] transition-transform"
              style={{ background: PINK_SOFT }}
            >
              <div className="min-w-0 flex flex-col gap-1.5">
                <p
                  className="text-[17px] font-semibold tracking-tight leading-none"
                  style={{ color: PINK, letterSpacing: "-0.01em" }}
                >
                  {currentPack.title}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <MiniPill>{currentPack.CEFR}</MiniPill>
                  <MiniPill>{currentPack.Lexile}</MiniPill>
                  <MiniPill>{currentPack.wordCount} Words</MiniPill>
                </div>
              </div>
              <ChevronDown
                className="h-5 w-5 shrink-0 transition-transform"
                style={{ color: PINK, transform: pickerOpen ? "rotate(180deg)" : "none" }}
              />
            </button>
            {pickerOpen && (
              <div
                className="absolute z-40 left-0 right-0 mt-1.5 rounded-3xl bg-white border overflow-hidden"
                style={{ borderColor: "oklch(0.94 0.02 10)", boxShadow: "0 12px 32px -8px rgba(0,0,0,0.12)" }}
              >
                {PACKS.map((p) => {
                  const active = p.book_code === bookCode;
                  return (
                    <button
                      key={p.pack_id}
                      type="button"
                      onClick={() => selectBook(p.book_code)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-[color:var(--muted)]"
                      style={active ? { background: PINK_SOFT } : undefined}
                    >
                      <div className="min-w-0 flex flex-col gap-1.5">
                        <p className="text-[15px] font-semibold tracking-tight leading-none" style={{ color: active ? PINK : "var(--foreground)" }}>
                          {p.title}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <MiniPill>{p.CEFR}</MiniPill>
                          <MiniPill>{p.Lexile}</MiniPill>
                          <MiniPill>{p.wordCount} Words</MiniPill>
                        </div>
                      </div>
                      {active && <Check className="h-4 w-4 shrink-0" strokeWidth={3} style={{ color: PINK }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: PINK }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories"
              className="w-full rounded-full pl-11 pr-4 py-3.5 text-[15px] font-semibold outline-none focus:ring-2 focus:ring-[color:var(--shirin)] placeholder:font-semibold"
              style={{ background: PINK_SOFT, color: "var(--foreground)" }}
            />
          </div>

          {/* Unit list */}
          <section className="mt-4">
            {units.length === 0 ? (
              <div className="text-center py-12 text-[13px] text-muted-foreground">
                <BookOpen className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
                No stories match.
              </div>
            ) : (
              <div className="space-y-3">
                {units.map((u) => (
                  <Link
                    key={u.lesson_id}
                    to="/chat"
                    search={{ mode: "smart_reading", lesson_id: u.lesson_id, from: search.from }}
                    className="flex items-stretch rounded-full overflow-hidden active:scale-[0.98] transition-transform"
                    style={{ background: "white", border: "1px solid oklch(0.94 0.02 10)" }}
                  >
                    <div
                      className="h-11 w-11 shrink-0 grid place-items-center text-xl my-2 ml-2 rounded-full"
                      style={{ background: coverFor(u.lesson_id) }}
                      aria-hidden
                    >
                      {u.emoji}
                    </div>
                    <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-center min-w-0">
                      <p className="text-[17px] font-semibold tracking-tight leading-tight" style={{ letterSpacing: "-0.01em" }}>
                        {u.story_title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold line-clamp-1 text-foreground/60">
                        {u.cover_question}
                      </p>
                    </div>
                    <div className="shrink-0 pr-4 pl-1 flex items-center">
                      {u.done ? (
                        <span
                          className="h-6 w-6 grid place-items-center rounded-full"
                          style={{ background: PINK_SOFT }}
                          aria-label="Read"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: PINK }} />
                        </span>
                      ) : (
                        <ChevronRight className="h-5 w-5" style={{ color: PINK }} />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none bg-white"
      style={{ color: PINK }}
    >
      {children}
    </span>
  );
}

```

### src/routes/topics.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import freeTalkArt from "@/assets/topics/free_talk.png";
import smartReadingArt from "@/assets/topics/smart_reading.png";
import petTalkArt from "@/assets/topics/pet_talk.png";
import minecraftArt from "@/assets/topics/minecraft_adventure.png";
import foodTalkArt from "@/assets/topics/food_talk.png";
import footballArt from "@/assets/topics/football_talk.png";
import magicArt from "@/assets/topics/magic_adventure.png";
import natureArt from "@/assets/topics/nature_explorer.png";
import mywordieArt from "@/assets/topics/mywordie.png";

const PINK = "var(--shirin)";

// Canonical topics rendered as a 3x3 brand gallery of pink line-art paintings.
// `smart_reading` routes to its own flow; `mywordie` opens the myWordie chat.
type Topic = {
  topic_id: string;
  title: string;
  art: string;
};
const TOPICS: Topic[] = [
  { topic_id: "free_talk", title: "Free Talk", art: freeTalkArt },
  { topic_id: "smart_reading", title: "Smart Reading", art: smartReadingArt },
  { topic_id: "pet_talk", title: "Pet Talk", art: petTalkArt },
  { topic_id: "minecraft_adventure", title: "Minecraft Adventure Talk", art: minecraftArt },
  { topic_id: "food_talk", title: "Food Talk", art: foodTalkArt },
  { topic_id: "football_talk", title: "Football Talk", art: footballArt },
  { topic_id: "magic_adventure", title: "Magic Adventure", art: magicArt },
  { topic_id: "nature_explorer", title: "Nature Explore", art: natureArt },
  { topic_id: "mywordie", title: "myWordie Talk", art: mywordieArt },
];

export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [
      { title: "Topic Talk — Paisley EC" },
      { name: "description", content: "Pick a topic and start an English conversation with Shirin." },
      { property: "og:title", content: "Topic Talk — Paisley EC" },
      { property: "og:description", content: "Pick a topic and start an English conversation with Shirin." },
    ] }),
  component: TopicsPage,
});

function TopicsPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        <FloatingBack to="/shirin-talk" />

        <div className="flex-1 overflow-y-auto scroll-hide px-5 pb-16 pt-14">
          <div className="mb-4 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: PINK, letterSpacing: "-0.01em" }}
            >
              Pick A Topic
            </h1>
            <p className="mt-1 text-[14px] font-semibold tracking-tight text-muted-foreground">
              Let's talk about it.
            </p>
          </div>

          {(() => {
            const getLinkProps = (t: Topic) =>
              t.topic_id === "smart_reading"
                ? ({ to: "/smart-reading", search: { from: "topics" } } as const)
                : t.topic_id === "mywordie"
                  ? ({ to: "/chat", search: { mode: "mywordie", from: "topics" } } as const)
                  : ({ to: "/chat", search: { mode: "topic", topic_id: t.topic_id } } as const);

            const cardStyle = {
              background: "color-mix(in oklab, var(--shirin) 8%, white)",
              border: "1px solid color-mix(in oklab, var(--shirin) 18%, white)",
            } as const;

            // Hero card: aspect drives height, or an explicit style override.
            const HeroCard = ({ t, ratio, imgStyle, fit = "cover", imgScale }: { t: Topic; ratio?: string; imgStyle?: React.CSSProperties; fit?: "cover" | "contain"; imgScale?: number }) => (
              <Link
                {...getLinkProps(t)}
                className="group flex flex-col rounded-3xl overflow-hidden active:scale-[0.98] transition-transform h-full"
                style={cardStyle}
              >
                <div className={`relative overflow-hidden bg-white ${ratio ?? ""}`} style={imgStyle}>
                  <img
                    src={t.art}
                    alt={t.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`block h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                    style={imgScale ? { transform: `scale(${imgScale})`, transformOrigin: "center" } : undefined}
                    draggable={false}
                  />
                </div>
                <div className="px-3 py-3">
                  <p
                    className="text-[17px] font-semibold tracking-tight leading-none whitespace-nowrap text-center"
                    style={{ color: PINK, letterSpacing: "-0.015em" }}
                  >
                    {t.title}
                  </p>
                </div>
              </Link>
            );

            const byId = Object.fromEntries(TOPICS.map((t) => [t.topic_id, t])) as Record<string, Topic>;

            return (
              <div className="grid grid-cols-2 gap-2.5">
                <HeroCard t={byId.free_talk} ratio="aspect-square" />
                <HeroCard t={byId.football_talk} ratio="aspect-square" />
                {/* Minecraft Adventure spans both columns right under Pet Talk & Football Talk */}
                <div className="col-span-2" style={{ containerType: "inline-size" }}>
                  {/* Image height = (grid width - gap) / 2 = single-column width, so the minecraft card matches a square card's total height exactly. */}
                  <HeroCard
                    t={byId.minecraft_adventure}
                    imgStyle={{ height: "calc((100cqw - 10px) / 2)" }}
                    fit="contain"
                    imgScale={1.2}
                  />
                </div>
                <HeroCard t={byId.pet_talk} ratio="aspect-square" />
                <HeroCard t={byId.magic_adventure} ratio="aspect-square" />
                <HeroCard t={byId.nature_explorer} ratio="aspect-square" />
                <HeroCard t={byId.smart_reading} ratio="aspect-square" />
                <HeroCard t={byId.food_talk} ratio="aspect-square" />
                <HeroCard t={byId.mywordie} ratio="aspect-square" />
              </div>
            );
          })()}
        </div>
      </div>
    </PhoneFrame>
  );
}
```

### src/routes/word-card.tsx

```tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Volume2, RotateCw, ChevronLeft, Clock } from "lucide-react";
import { useBloxia } from "@/lib/bloxia/progress";

export const Route = createFileRoute("/word-card")({
  head: () => ({ meta: [
      { title: "Word Card — Paisley EC" },
      { name: "description", content: "Flip, hear and review a single word card." },
      { property: "og:title", content: "Word Card — Paisley EC" },
      { property: "og:description", content: "Flip, hear and review a single word card." },
    ] }),
  component: WordCardPage,
});

type Card = {
  word: string;
  ipa: string;
  pos: string;
  level: string;
  emoji: string;
  meaning: string;
  translation: string;
  example: string;
  status: "new" | "learning" | "review" | "focus" | "relearning";
};

const STATUS_META: Record<Card["status"], { label: string; color: string }> = {
  new: { label: "New", color: "oklch(0.66 0.24 280)" },
  learning: { label: "Learning", color: "oklch(0.7 0.18 195)" },
  review: { label: "Review", color: "oklch(0.68 0.2 145)" },
  focus: { label: "Focus", color: "oklch(0.68 0.26 35)" },
  relearning: { label: "Relearning", color: "var(--shirin)" },
};

const DECK: Card[] = [
  {
    word: "whisper",
    ipa: "/ˈwɪs.pər/",
    pos: "Verb",
    level: "B1",
    emoji: "🤫",
    meaning: "to speak very softly using your breath rather than your full voice, so others nearby can barely hear you",
    translation: "悄悄说 / 低语",
    example: "She leaned in close and whispered a long, surprising secret into my ear during the quiet movie scene.",
    status: "learning",
  },
  {
    word: "garden",
    ipa: "/ˈɡɑːr.dən/",
    pos: "Noun",
    level: "A2",
    emoji: "🌱",
    meaning: "a piece of land where flowers and plants grow",
    translation: "花园",
    example: "We planted tomatoes in the garden.",
    status: "review",
  },
  {
    word: "curious",
    ipa: "/ˈkjʊər.i.əs/",
    pos: "Adjective",
    level: "B1",
    emoji: "🔍",
    meaning: "wanting to know about something",
    translation: "好奇的",
    example: "The curious cat looked inside the box.",
    status: "new",
  },
];

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WordCardPage() {
  const navigate = useNavigate();
  const { earnBp } = useBloxia();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef<number>(Date.now());
  const card = DECK[idx];
  const total = DECK.length;
  const status = STATUS_META[card.status];

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const next = (rating: "forgot" | "hard" | "easy") => {
    void rating;
    if (idx + 1 >= total) {
      earnBp(15, "wordie", "Word Card");
      navigate({ to: "/mywordie" });
      return;
    }
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <PhoneFrame bg="bg-[color:var(--wordie-soft)]">
      {/* Top bar — mirrors wordie-test */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <Link
          to="/mywordie"
          aria-label="Back"
          className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-muted-foreground">
            {idx + 1} / {total}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: `color-mix(in oklab, ${status.color} 22%, white)`,
              color: `color-mix(in oklab, ${status.color} 70%, black)`,
            }}
          >
            {status.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {fmtTime(seconds)}
          </span>
        </div>
        {/* Right spacer keeps the center cluster visually balanced with the back button */}
        <div className="h-9 w-9" aria-hidden />
      </div>

      {/* Progress segments */}
      <div className="px-5 mt-3 flex gap-1">
        {DECK.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i <= idx
                  ? "var(--wordie)"
                  : "color-mix(in oklab, var(--wordie) 10%, white)",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <section className="px-5 mt-4">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="block w-full text-left rounded-[2rem] overflow-hidden shadow-xl active:scale-[0.99] transition-transform"
          style={{ perspective: "1200px" }}
          aria-label="Flip card"
        >
          <div
            className="relative w-full"
            style={{
              height: "28rem",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 rounded-[2rem] p-6 flex flex-col"
              style={{
                background: "linear-gradient(160deg, white 0%, color-mix(in oklab, var(--wordie) 8%, white) 100%)",
                backfaceVisibility: "hidden",
                border: "1px solid color-mix(in oklab, var(--wordie) 20%, transparent)",
              }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                  style={{
                    background: "var(--wordie)",
                    color: "white",
                  }}
                >
                  {card.pos}
                </span>
                <span
                  className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground"
                >
                  {card.level}
                </span>
              </div>

              <div className="flex-1 grid place-items-center text-center">
                <div>
                  <h2 className="text-5xl font-medium text-[color:var(--wordie)]">{card.word}</h2>
                  <p className="text-sm text-muted-foreground mt-1.5 font-mono">{card.ipa}</p>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap card to flip
              </p>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rounded-[2rem] p-6 flex flex-col text-white overflow-hidden"
              style={{
                background: "linear-gradient(160deg, var(--wordie) 0%, color-mix(in oklab, var(--wordie) 78%, black) 100%)",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                  style={{ background: "white", color: "var(--wordie)" }}
                >
                  {card.pos}
                </span>
              </div>
              <div className="text-center mt-2">
                <h3
                  className="font-medium text-[40px] leading-none text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {card.word}
                </h3>
                <p className="text-[13px] mt-3 font-mono opacity-80">{card.ipa}</p>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-8 mt-6 mb-3">
                <div>
                  <p className="text-[14px] font-semibold tracking-[0.08em] opacity-80">Meaning</p>
                  <div className="mt-2 flex items-start gap-3">
                    <p
                      className="flex-1 text-[18px] font-semibold leading-relaxed"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {card.meaning}
                    </p>
                    <span
                      className="shrink-0 grid place-items-center opacity-80"
                      style={{ height: "29px" }}
                      aria-label="Listen to meaning"
                    >
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] font-semibold tracking-[0.08em] opacity-80">Example</p>
                  <div className="mt-2 flex items-start gap-3">
                    <p
                      className="flex-1 text-[18px] font-semibold leading-relaxed"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {card.example}
                    </p>
                    <span
                      className="shrink-0 grid place-items-center opacity-80"
                      style={{ height: "29px" }}
                      aria-label="Listen to example"
                    >
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs opacity-80 inline-flex items-center justify-center gap-1">
                <RotateCw className="h-3 w-3" /> Tap to flip back
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Three-emoji rating */}
      <section
        className="px-5 mt-6 grid grid-cols-3 gap-3 transition-opacity"
        style={{ opacity: flipped ? 1 : 0, pointerEvents: flipped ? "auto" : "none" }}
        aria-hidden={!flipped}
      >
        {([
          { key: "forgot", emoji: "😟", label: "Forgot" },
          { key: "hard", emoji: "🙂", label: "Hard" },
          { key: "easy", emoji: "😄", label: "Easy" },
        ] as const).map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => next(r.key)}
            className="py-3 flex flex-col items-center gap-2 active:scale-[0.95] transition-transform font-sans"
          >
            <span className="text-[52px] leading-none">{r.emoji}</span>
            <span className="text-[17px] font-medium text-foreground font-sans">{r.label}</span>
          </button>
        ))}
      </section>

      {/* Speaker — same shape as wordie-test stage 2 record button */}
      <section className="mt-8 flex flex-col items-center">
        <button
          type="button"
          className="h-[72px] w-[72px] rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform"
          style={{ background: "var(--wordie)" }}
          aria-label="Listen"
        >
          <Volume2 className="h-8 w-8" />
        </button>
      </section>

    </PhoneFrame>
  );
}

```

### src/routes/wordie-bank.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import { useMemo, useState } from "react";
import { Search, X, ChevronRight, ChevronDown, Check, Circle } from "lucide-react";
import {
  FilterChip,
  EmptyState,
  StatusBadge,
  type WordStatus,
} from "@/components/app/WordieKit";
import { WordPreview } from "@/components/app/WordPreview";

export const Route = createFileRoute("/wordie-bank")({
  head: () => ({ meta: [
      { title: "Wordie Bank — Paisley EC" },
      { name: "description", content: "Browse and manage every word card you've collected." },
      { property: "og:title", content: "Wordie Bank — Paisley EC" },
      { property: "og:description", content: "Browse and manage every word card you've collected." },
    ] }),
  component: WordieBankPage,
});

type FilterKey = "all" | WordStatus | "focus" | "relearning";

type BankWord = {
  wordId: string;
  word: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  pronunciation: string;
  cefrLevel: string;
  theme: string;
  packTitle: string;
  status: WordStatus;
  focus: boolean;
  nextReviewLabel: string;
};

const BANK: BankWord[] = [
  { wordId: "w1", word: "dog", definitionEn: "a friendly four-legged animal that people keep as a pet and as a loyal companion at home", exampleSentence: "The neighbour's playful brown dog runs around the garden every morning chasing colourful butterflies near the fence.", partOfSpeech: "noun", pronunciation: "/dɒɡ/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "mastered", focus: false, nextReviewLabel: "In 7 days" },
  { wordId: "w2", word: "cat", definitionEn: "a small furry pet", exampleSentence: "The cat sleeps on the chair.", partOfSpeech: "noun", pronunciation: "/kæt/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "learning", focus: true, nextReviewLabel: "Today" },
  { wordId: "w3", word: "bird", definitionEn: "an animal that can fly", exampleSentence: "A bird sings in the tree.", partOfSpeech: "noun", pronunciation: "/bɜːd/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w4", word: "fish", definitionEn: "an animal that lives in water", exampleSentence: "The fish swims fast.", partOfSpeech: "noun", pronunciation: "/fɪʃ/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "review", focus: false, nextReviewLabel: "Tomorrow" },
  { wordId: "w5", word: "rabbit", definitionEn: "a small animal with long ears", exampleSentence: "The rabbit eats a carrot.", partOfSpeech: "noun", pronunciation: "/ˈræbɪt/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w6", word: "book", definitionEn: "pages you can read", exampleSentence: "I read a book at night.", partOfSpeech: "noun", pronunciation: "/bʊk/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "learning", focus: false, nextReviewLabel: "Today" },
  { wordId: "w7", word: "chair", definitionEn: "a seat for one person", exampleSentence: "She sits on the chair.", partOfSpeech: "noun", pronunciation: "/tʃeə/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w8", word: "pencil", definitionEn: "a tool you write with", exampleSentence: "I draw with a pencil.", partOfSpeech: "noun", pronunciation: "/ˈpensl/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "mastered", focus: false, nextReviewLabel: "In 14 days" },
  { wordId: "w9", word: "window", definitionEn: "an opening in a wall with glass", exampleSentence: "Open the window please.", partOfSpeech: "noun", pronunciation: "/ˈwɪndəʊ/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "review", focus: true, nextReviewLabel: "Today" },
  { wordId: "w10", word: "teacher", definitionEn: "a person who teaches", exampleSentence: "Our teacher is kind.", partOfSpeech: "noun", pronunciation: "/ˈtiːtʃə/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "learning", focus: false, nextReviewLabel: "Tomorrow" },
];

const STATUS_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "review", label: "Review" },
  { key: "focus", label: "Focus" },
  { key: "mastered", label: "Mastered" },
  { key: "relearning", label: "Relearning" },
];

const FILTER_COLOR: Partial<Record<FilterKey, string>> = {
  all: "var(--wordie)",
  new: "oklch(0.66 0.24 280)",
  learning: "oklch(0.7 0.18 195)",
  review: "oklch(0.68 0.2 145)",
  focus: "oklch(0.75 0.12 305)",
  mastered: "var(--wordie-accent)",
  relearning: "oklch(0.8 0.1 350)",
};

function WordieBankPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [levelSel, setLevelSel] = useState<string[]>([]);
  const [categorySel, setCategorySel] = useState<string[]>([]);
  const [statusSel, setStatusSel] = useState<string[]>([]);
  const [openSheet, setOpenSheet] = useState<null | "level" | "category" | "status">(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchOpen, setBatchOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [words, setWords] = useState<BankWord[]>(BANK);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: words.length, focus: 0 };
    for (const w of words) {
      c[w.status] = (c[w.status] ?? 0) + 1;
      if (w.focus) c.focus += 1;
    }
    return c;
  }, [words]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "focus" ? w.focus : w.status === filter);
      if (!matchesFilter) return false;
      if (levelSel.length > 0 && !levelSel.includes(w.cefrLevel)) return false;
      if (categorySel.length > 0 && !categorySel.includes(w.theme)) return false;
      if (statusSel.length > 0) {
        const hit =
          statusSel.includes(w.status) ||
          (w.focus && statusSel.includes("focus"));
        if (!hit) return false;
      }
      if (!q) return true;
      return [
        w.word, w.definitionEn, w.exampleSentence, w.partOfSpeech,
        w.theme, w.cefrLevel, w.status, w.focus ? "focus" : "", w.packTitle,
      ].some((s) => s.toLowerCase().includes(q));
    });
  }, [words, query, filter, levelSel, categorySel, statusSel]);

  const levelOptions = useMemo(() => {
    const map = new Map<string, number>();
    words.forEach((w) => map.set(w.cefrLevel, (map.get(w.cefrLevel) ?? 0) + 1));
    return Array.from(map.entries()).sort();
  }, [words]);
  const categoryOptions = useMemo(() => {
    const map = new Map<string, number>();
    words.forEach((w) => map.set(w.theme, (map.get(w.theme) ?? 0) + 1));
    return Array.from(map.entries()).sort();
  }, [words]);
  const statusOptions: { key: string; label: string }[] = [
    { key: "new", label: "New" },
    { key: "learning", label: "Learning" },
    { key: "review", label: "Review" },
    { key: "focus", label: "Focus" },
    { key: "mastered", label: "Mastered" },
    { key: "relearning", label: "Relearning" },
  ];

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectAll = () => {
    const next = new Set(selected);
    for (const w of filtered) next.add(w.wordId);
    setSelected(next);
  };

  const clearFilters = () => {
    setQuery("");
    setFilter("all");
    setLevelSel([]);
    setCategorySel([]);
    setStatusSel([]);
  };

  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
    setBatchOpen(false);
  };

  const applyUpdate = (updater: (w: BankWord) => BankWord, msg: string) => {
    setWords((prev) => prev.map((w) => (selected.has(w.wordId) ? updater(w) : w)));
    showToast(msg);
    exitSelect();
  };

  const addToFocus = () => applyUpdate((w) => ({ ...w, focus: true }), "Added to Focus");
  const removeFromFocus = () =>
    applyUpdate((w) => ({ ...w, focus: false }), "Removed from Focus");
  const moveToReview = () =>
    applyUpdate((w) => ({ ...w, status: "review", nextReviewLabel: "Today" }), "Moved to Review");
  const removeFromReview = () =>
    applyUpdate(
      (w) => ({ ...w, status: "new", nextReviewLabel: "Not started" }),
      "Removed from Review",
    );
  const resetProgress = () => {
    applyUpdate(
      (w) => ({ ...w, status: "new", focus: false, nextReviewLabel: "Not started" }),
      "Progress Reset",
    );
    setResetConfirm(false);
  };

  const openBatch = () => {
    if (selected.size === 0) {
      showToast("Select cards first");
      return;
    }
    setBatchOpen(true);
  };

  const selectedWords = useMemo(
    () => words.filter((w) => selected.has(w.wordId)),
    [words, selected],
  );
  const allSelectedFocus =
    selectedWords.length > 0 && selectedWords.every((w) => w.focus);
  const allSelectedReview =
    selectedWords.length > 0 && selectedWords.every((w) => w.status === "review");

  const selectedSummary = `${selected.size} selected`;
  const hasFilters =
    query.trim() !== "" ||
    filter !== "all" ||
    levelSel.length > 0 ||
    categorySel.length > 0 ||
    statusSel.length > 0;

  const labelFor = (sel: string[], lookup?: (k: string) => string) => {
    if (sel.length === 0) return "All";
    if (sel.length === 1) return lookup ? lookup(sel[0]) : sel[0];
    return `${sel.length} sel.`;
  };
  const statusLabelLookup = (k: string) =>
    statusOptions.find((o) => o.key === k)?.label ?? k;

  const toggleIn = (
    sel: string[],
    setter: (v: string[]) => void,
    value: string,
  ) => {
    if (sel.includes(value)) setter(sel.filter((v) => v !== value));
    else setter([...sel, value]);
  };

  return (
    <PhoneFrame bg="bg-white">
      <FloatingBack to="/mywordie" />

      <div className="px-5 pb-10">
        {/* Title */}
        <div className="mb-4 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: "var(--wordie)", letterSpacing: "-0.01em" }}
          >
            Wordie Bank
          </h1>
        </div>

        {/* Toolbar: Select / Done · Preview */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: selectMode ? "var(--wordie)" : "var(--foreground)" }}
          >
            {selectMode ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            {selectMode ? "Done" : "Select"}
          </button>
          {selectMode ? (
            <button
              type="button"
              onClick={openBatch}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              {selectedSummary} •••
            </button>
          ) : (
            <button
              type="button"
              onClick={() => filtered.length > 0 && setPreviewIdx(0)}
              className="text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              Preview
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mt-3">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--paisley)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search word, example, level, category, status"
              className="w-full rounded-full pl-10 pr-4 py-2.5 text-sm font-medium outline-none transition-colors"
              style={{
                background: "color-mix(in oklab, var(--paisley) 10%, white)",
                border: "1px solid color-mix(in oklab, var(--paisley) 25%, white)",
                color: "var(--foreground)"
              }}
            />
          </div>
        </div>

        {/* Level / Category / Status — paisley filter pills (multi-select) */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <FilterDropdown
            label="Level"
            value={labelFor(levelSel)}
            active={levelSel.length > 0}
            onClick={() => setOpenSheet("level")}
          />
          <FilterDropdown
            label="Category"
            value={labelFor(categorySel)}
            active={categorySel.length > 0}
            onClick={() => setOpenSheet("category")}
          />
          <FilterDropdown
            label="Status"
            value={labelFor(statusSel, statusLabelLookup)}
            active={statusSel.length > 0}
            onClick={() => setOpenSheet("status")}
          />
        </div>

        {/* Filter chips (Status incl. Focus) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
              color={FILTER_COLOR[f.key] ?? "var(--wordie)"}
              tone="tint"
            >
              {f.label}
              <span className="ml-1.5 opacity-70">{counts[f.key] ?? 0}</span>
            </FilterChip>
          ))}
        </div>

        {/* Count row */}
        <div className="mt-3 flex items-center justify-between text-[12px] font-semibold">
          <span className="text-muted-foreground">{filtered.length} cards</span>
          <div className="flex items-center gap-3">
            {selectMode && (
              <button
                type="button"
                onClick={selectAll}
                style={{ color: "var(--wordie)" }}
              >
                Select All
              </button>
            )}
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="text-muted-foreground">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="mt-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search className="h-7 w-7" />}
              title={query ? "No matches" : "Nothing here"}
              description={
                query
                  ? `We couldn't find "${query}". Try a different word.`
                  : "Try clearing your filters."
              }
            />
          ) : (
            <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {filtered.map((w) => {
                const isSel = selected.has(w.wordId);
                return (
                  <button
                    key={w.wordId}
                    type="button"
                    onClick={() => {
                      if (selectMode) toggleSelect(w.wordId);
                      else setPreviewIdx(filtered.findIndex((x) => x.wordId === w.wordId));
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
                  >
                    {selectMode && (
                      <div
                        className="h-5 w-5 rounded-full border-2 grid place-items-center shrink-0"
                        style={{
                          borderColor: isSel ? "var(--wordie)" : "var(--border)",
                          background: isSel ? "var(--wordie)" : "transparent",
                          color: "white"
                        }}
                      >
                        {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold text-[20px] truncate leading-tight text-foreground"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {w.word}
                      </p>
                      <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                        {w.definitionEn}
                      </p>
                      <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                        <span
                          className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: "color-mix(in oklab, var(--wordie) 12%, white)",
                            color: "var(--wordie)"
                          }}
                        >
                          {capitalize(w.partOfSpeech)}
                        </span>
                        <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                          {w.cefrLevel}
                        </span>
                        <StatusBadge status={w.status} />
                        {w.focus && <FocusPill />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-center">
                      {!selectMode && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Batch sheet */}
      {batchOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setBatchOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: "var(--wordie)" }}
              >
                Batch Actions
              </p>
              <button
                type="button"
                onClick={() => setBatchOpen(false)}
                className="text-[13px] font-semibold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground text-center mb-4 shrink-0">
              {selectedSummary}
            </p>
            <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-2">
              <SheetBtn label="Preview" onClick={() => { setBatchOpen(false); setPreviewIdx(0); }} />
              <SheetBtn
                label={allSelectedFocus ? "Remove from Focus" : "Add to Focus"}
                onClick={allSelectedFocus ? removeFromFocus : addToFocus}
              />
              <SheetBtn
                label={allSelectedReview ? "Remove from Review" : "Move to Review"}
                onClick={allSelectedReview ? removeFromReview : moveToReview}
              />
              <SheetBtn label="Reset Progress" danger onClick={() => { setBatchOpen(false); setResetConfirm(true); }} />
              <SheetBtn label="Cancel" muted onClick={() => setBatchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Filter sheets */}
      {openSheet && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setOpenSheet(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: "var(--wordie)" }}
              >
                {openSheet === "level"
                  ? "Choose Level"
                  : openSheet === "category"
                    ? "Choose Category"
                    : "Choose Status"}
              </p>
              <button
                type="button"
                onClick={() => setOpenSheet(null)}
                className="text-[13px] font-semibold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-8 divide-y divide-border">
              {openSheet === "level" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={levelSel.length === 0}
                    onClick={() => setLevelSel([])}
                  />
                  {levelOptions.map(([k, n]) => (
                    <SheetRow
                      key={k}
                      label={`${k} (${n})`}
                      active={levelSel.includes(k)}
                      onClick={() => toggleIn(levelSel, setLevelSel, k)}
                    />
                  ))}
                </>
              )}
              {openSheet === "category" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={categorySel.length === 0}
                    onClick={() => setCategorySel([])}
                  />
                  {categoryOptions.map(([k, n]) => (
                    <SheetRow
                      key={k}
                      label={`${k} (${n})`}
                      active={categorySel.includes(k)}
                      onClick={() => toggleIn(categorySel, setCategorySel, k)}
                    />
                  ))}
                </>
              )}
              {openSheet === "status" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={statusSel.length === 0}
                    onClick={() => setStatusSel([])}
                  />
                  {statusOptions.map((s) => (
                    <SheetRow
                      key={s.key}
                      label={`${s.label} (${counts[s.key] ?? 0})`}
                      active={statusSel.includes(s.key)}
                      onClick={() => toggleIn(statusSel, setStatusSel, s.key)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset confirm */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center px-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setResetConfirm(false)} />
          <div className="relative w-full max-w-[360px] bg-white rounded-2xl p-5 text-center">
            <p className="font-semibold text-[15px]">Reset Progress?</p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Selected cards will become New again.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="rounded-full py-2.5 text-[13px] font-semibold bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-full py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "var(--destructive)" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen preview */}
      {previewIdx !== null && filtered[previewIdx] && (
        <WordPreview
          item={{
            word: filtered[previewIdx].word,
            pronunciation: filtered[previewIdx].pronunciation,
            definitionEn: filtered[previewIdx].definitionEn,
            exampleSentence: filtered[previewIdx].exampleSentence,
            partOfSpeech: filtered[previewIdx].partOfSpeech,
            cefrLevel: filtered[previewIdx].cefrLevel,
            statusValue: capitalize(filtered[previewIdx].status),
            nextReviewLabel: filtered[previewIdx].nextReviewLabel,
          }}
          index={previewIdx}
          total={filtered.length}
          onClose={() => setPreviewIdx(null)}
          onPrev={() => setPreviewIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setPreviewIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i))
          }
          topBadges={
            <>
              <StatusBadge status={filtered[previewIdx].status} />
              {filtered[previewIdx].focus && <FocusPill />}
            </>
          }
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 bottom-10 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}

function FilterDropdown({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-between gap-1 rounded-full pl-3.5 pr-2.5 py-2 active:scale-[0.97] transition-transform"
      style={
        active
          ? {
              background: "var(--wordie)",
              color: "white",
              border: "1px solid var(--wordie)",
            }
          : {
              background: "color-mix(in oklab, var(--wordie) 10%, white)",
              color: "var(--foreground)",
              border: "1px solid color-mix(in oklab, var(--wordie) 25%, white)",
            }
      }
    >
      <span className="flex items-baseline gap-1 min-w-0">
        <span
          className="text-xs font-semibold opacity-70"
        >
          {label}
        </span>
        <span
          className="text-[12px] font-semibold truncate"
          style={!active ? { color: "var(--wordie)" } : undefined}
        >
          {value}
        </span>
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80" />
    </button>
  );
}

function SheetRow({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 text-left text-[14px] font-semibold"
      style={{ color: active ? "var(--wordie)" : "var(--foreground)" }}
    >
      <span>{label}</span>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const FOCUS_PILL_COLOR = "oklch(0.7 0.24 340)";
function FocusPill() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 22%, white)`,
        color: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 70%, black)`
      }}
      aria-label="Focus"
      title="Focus"
    >
      Focus
    </span>
  );
}

function SheetBtn({
  label,
  onClick,
  danger,
  muted,
}: {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl py-3 text-[14px] font-semibold text-center"
      style={{
        background: muted ? "var(--muted)" : "white",
        color: danger ? "var(--destructive)" : muted ? "var(--foreground)" : "var(--wordie)",
        border: muted ? "none" : "1px solid var(--border)"
      }}
    >
      {label}
    </button>
  );
}


```

### src/routes/wordie-test.tsx

```tsx
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { ProgressBar } from "@/components/app/WordieKit";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBloxia } from "@/lib/bloxia/progress";
import {
  ChevronLeft,
  Volume2,
  Mic,
  Check,
  X,
  Clock,
  Lock,
  ChevronRight,
  Play,
} from "lucide-react";

export const Route = createFileRoute("/wordie-test")({
  head: () => ({ meta: [
      { title: "Wordie Test — Paisley EC" },
      { name: "description", content: "Quick quizzes that adapt to the words you're learning." },
      { property: "og:title", content: "Wordie Test — Paisley EC" },
      { property: "og:description", content: "Quick quizzes that adapt to the words you're learning." },
    ] }),
  component: WordieTestPage,
});

// ───────── Stage meta (Listening / Pronunciation / Spelling / Definition / Usage / POS) ─────────
type Stage =
  | "pronunciationListen"
  | "pronunciationSpeak"
  | "spelling"
  | "meaning"
  | "usage"
  | "partOfSpeech";

const STAGE_ORDER: Stage[] = [
  "pronunciationListen",
  "pronunciationSpeak",
  "spelling",
  "meaning",
  "usage",
  "partOfSpeech",
];

const STAGE_META: Record<
  Stage,
  { label: string; subtitle: string; note: string; points: number; color: string }
> = {
  pronunciationListen: {
    label: "Listening",
    subtitle: "Click play to listen.",
    note: "Each question will be read 2 times.",
    points: 3,
    color: "var(--wordie)",
  },
  pronunciationSpeak: {
    label: "Pronunciation",
    subtitle: "Read the word, then say it clearly.",
    note: "Hold Record and release when finished.",
    points: 3,
    color: "var(--wordie)",
  },
  spelling: {
    label: "Spelling",
    subtitle: "Choose the correct spelling.",
    note: "Look at every word carefully",
    points: 4,
    color: "var(--wordie)",
  },
  meaning: {
    label: "Definition",
    subtitle: "Choose the matching definition.",
    note: "Read every choice carefully.",
    points: 4,
    color: "var(--wordie)",
  },
  usage: {
    label: "Usage",
    subtitle: "Choose the sentence that uses the word correctly.",
    note: "Which sentence uses the word correctly?",
    points: 4,
    color: "var(--wordie)",
  },
  partOfSpeech: {
    label: "Part of Speech",
    subtitle: "Choose what kind of word it is.",
    note: "Choose the correct part of speech for the word",
    points: 2,
    color: "var(--wordie)",
  },
};

// ───────── Mock 20 questions ─────────
type Choice = { id: string; label: string; isCorrect: boolean };
type Question = {
  id: string;
  stage: Stage;
  word: string;
  ipa?: string;
  pos?: string;
  choices?: Choice[]; // none for pronunciationSpeak
};

const mk = (id: string, stage: Stage, word: string, choices: [string, boolean][], extra: Partial<Question> = {}): Question => ({
  id,
  stage,
  word,
  choices: choices.map(([label, isCorrect], i) => ({ id: `${id}-${i}`, label, isCorrect })),
  ...extra,
});

const QUESTIONS: Question[] = [
  // Listening (3)
  mk("L1", "pronunciationListen", "garden", [["garden", true], ["harden", false], ["gather", false], ["golden", false]]),
  mk("L2", "pronunciationListen", "whisper", [["whisper", true], ["wisdom", false], ["whistle", false], ["winter", false]]),
  mk("L3", "pronunciationListen", "brave", [["brave", true], ["break", false], ["brain", false], ["bread", false]]),
  // Pronunciation (3) — record, no choices
  { id: "P1", stage: "pronunciationSpeak", word: "curious", ipa: "ˈkjʊəriəs" },
  { id: "P2", stage: "pronunciationSpeak", word: "gentle", ipa: "ˈdʒentl" },
  { id: "P3", stage: "pronunciationSpeak", word: "kite", ipa: "kaɪt" },
  // Spelling (4)
  mk("S1", "spelling", "rescue", [["rescue", true], ["rescew", false], ["reskue", false], ["resque", false]]),
  mk("S2", "spelling", "harvest", [["harvest", true], ["harvist", false], ["harvast", false], ["harvert", false]]),
  mk("S3", "spelling", "thunder", [["thunder", true], ["thunser", false], ["thander", false], ["thuner", false]]),
  mk("S4", "spelling", "vacation", [["vacation", true], ["vakation", false], ["vacasion", false], ["vacatoin", false]]),
  // Definition (4)
  mk("M1", "meaning", "marvelous", [
    ["wonderful and impressive", true],
    ["sad and tired", false],
    ["small and quiet", false],
    ["loud and angry", false],
  ]),
  mk("M2", "meaning", "puzzle", [
    ["a game to solve", true],
    ["a kind of soup", false],
    ["a small bird", false],
    ["a heavy box", false],
  ]),
  mk("M3", "meaning", "brave", [
    ["showing courage", true],
    ["feeling afraid", false],
    ["being lazy", false],
    ["talking loudly", false],
  ]),
  mk("M4", "meaning", "gentle", [
    ["kind and soft", true],
    ["sharp and hard", false],
    ["dark and cold", false],
    ["fast and loud", false],
  ]),
  // Usage (4)
  mk("U1", "usage", "whisper", [
    ["She likes to whisper secrets to her friend.", true],
    ["He whisper the heavy box up the stairs.", false],
    ["The cat whisper across the kitchen floor.", false],
    ["They whisper a pizza for dinner.", false],
  ]),
  mk("U2", "usage", "curious", [
    ["The curious kitten peeked into the box.", true],
    ["She curious the milk into the cup.", false],
    ["He runs very curious every morning.", false],
    ["They built a curious out of bricks.", false],
  ]),
  mk("U3", "usage", "rescue", [
    ["Firefighters rescue the cat from the tree.", true],
    ["I rescue my lunch in the microwave.", false],
    ["She rescue a song on the piano.", false],
    ["The clouds rescue across the sky.", false],
  ]),
  mk("U4", "usage", "harvest", [
    ["Farmers harvest apples in the autumn.", true],
    ["He harvest the door before leaving.", false],
    ["She harvest happy when she sings.", false],
    ["The dog harvest under the table.", false],
  ]),
  // POS (2)
  mk("Q1", "partOfSpeech", "garden", [["Noun", true], ["Verb", false], ["Adjective", false], ["Adverb", false]], { pos: "noun" }),
  mk("Q2", "partOfSpeech", "brave", [["Adjective", true], ["Noun", false], ["Verb", false], ["Adverb", false]], { pos: "adjective" }),
];

// ───────── Helpers ─────────
function shouldSingleColumn(stage: Stage, choices: Choice[] | undefined) {
  if (stage === "spelling") return true;
  if (!choices) return false;
  return choices.some((c) => c.label.length > 16 || c.label.split(/\s+/).length > 2);
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ───────── Page ─────────
type Mode = "locked" | "info" | "quiz" | "result";
type Answer = { choiceId?: string; record?: { scorable: boolean; score: number; band: "great" | "good" | "retry" } };

// Toggle to preview the locked state in the prototype.
const START_LOCKED = false;

function WordieTestPage() {
  const router = useRouter();
  const { earnBp } = useBloxia();
  const awardedRef = useRef(false);
  const [mode, setMode] = useState<Mode>(START_LOCKED ? "locked" : "info");
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("locked") === "1") {
      setMode("locked");
    }
  }, []);
  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [seconds, setSeconds] = useState(0);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRecordingRef = useRef<string | null>(null);

  // Timer: runs only in quiz mode
  useEffect(() => {
    if (mode === "quiz") {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (mode !== "result") setSeconds(0);
    }
  }, [mode]);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1600);
  };

  const startTest = () => {
    setAnswers({});
    setSeconds(0);
    setStageIdx(0);
    setMode("quiz");
  };

  const stageKey = STAGE_ORDER[stageIdx];
  const stageQs = useMemo(
    () => QUESTIONS.filter((q) => q.stage === stageKey),
    [stageKey],
  );

  const stageDone = stageQs.every((q) =>
    q.stage === "pronunciationSpeak"
      ? answers[q.id]?.record !== undefined
      : answers[q.id]?.choiceId !== undefined,
  );

  const goNext = () => {
    if (!stageDone) {
      showToast(`Finish ${STAGE_META[stageKey].label} first`);
      return;
    }
    if (stageIdx < STAGE_ORDER.length - 1) {
      setStageIdx(stageIdx + 1);
    } else {
      setMode("result");
    }
  };

  const goPrev = () => {
    if (stageIdx > 0) setStageIdx(stageIdx - 1);
  };

  const pickChoice = (q: Question, choiceId: string) => {
    setAnswers((a) => ({ ...a, [q.id]: { choiceId } }));
  };

  const startRecording = (q: Question) => {
    activeRecordingRef.current = q.id;
    setRecordingId(q.id);
  };

  const stopRecording = (q: Question) => {
    if (activeRecordingRef.current !== q.id) return;
    activeRecordingRef.current = null;
    setRecordingId(null);
    // mock: 70% great, 20% good, 10% retry
    const r = Math.random();
    const band: "great" | "good" | "retry" = r < 0.7 ? "great" : r < 0.9 ? "good" : "retry";
    const score = band === "great" ? 92 : band === "good" ? 78 : 55;
    setAnswers((a) => ({
      ...a,
      [q.id]: { record: { scorable: true, score, band } },
    }));
  };

  const playAudio = (q: Question) => {
    setAudioPlaying(q.id);
    setTimeout(() => setAudioPlaying(null), 1100);
  };

  // ───── Grading ─────
  const grading = useMemo(() => {
    const results = QUESTIONS.map((q) => {
      const a = answers[q.id];
      let correct = false;
      if (q.stage === "pronunciationSpeak") {
        correct = !!(a?.record?.scorable && a.record.score >= 70);
      } else {
        const c = q.choices?.find((c) => c.id === a?.choiceId);
        correct = !!c?.isCorrect;
      }
      return { q, a, correct };
    });
    const correctCount = results.filter((r) => r.correct).length;
    const score = Math.round((correctCount / QUESTIONS.length) * 100);
    const dims: Record<Stage, { correct: number; total: number }> = {
      pronunciationListen: { correct: 0, total: 0 },
      pronunciationSpeak: { correct: 0, total: 0 },
      spelling: { correct: 0, total: 0 },
      meaning: { correct: 0, total: 0 },
      usage: { correct: 0, total: 0 },
      partOfSpeech: { correct: 0, total: 0 },
    };
    results.forEach((r) => {
      dims[r.q.stage].total += 1;
      if (r.correct) dims[r.q.stage].correct += 1;
    });
    return { results, correctCount, score, dims };
  }, [answers]);

  const bp = useMemo(() => {
    const s = grading.score;
    let b = 5;
    if (s >= 90) b += 15;
    else if (s >= 80) b += 10;
    else if (s >= 70) b += 6;
    else if (s >= 60) b += 3;
    return Math.min(20, b);
  }, [grading.score]);

  useEffect(() => {
    if (mode === "result" && !awardedRef.current) {
      awardedRef.current = true;
      earnBp(bp, "wordie", "Wordie Test");
    }
  }, [mode, bp, earnBp]);

  // ───── Render ─────
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh-6rem)] bg-white">
        {/* Top bar */}
        <div className="px-4 pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {mode === "quiz" || mode === "info" ? (
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-muted-foreground">
                {mode === "info" ? 1 : stageIdx + 2} / 7
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background:
                    mode === "info"
                      ? "color-mix(in oklab, var(--wordie) 12%, white)"
                      : `color-mix(in oklab, ${STAGE_META[stageKey].color} 14%, white)`,
                  color: mode === "info" ? "var(--wordie)" : STAGE_META[stageKey].color
                }}
              >
                {mode === "info" ? "Info" : STAGE_META[stageKey].label}
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {fmtTime(mode === "info" ? 0 : seconds)}
              </span>
            </div>
          ) : (
            <span />
          )}
          <span className="h-9 w-9" aria-hidden />
        </div>

        {/* Title — only show in info/locked */}
        {(mode === "info" || mode === "locked") && (
          <div className="px-5 pt-3 text-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight"
              style={{ color: "var(--wordie)", letterSpacing: "-0.01em" }}
            >
              Wordie Test
            </h1>
          </div>
        )}

        {/* Body */}
        <div className="px-5 pt-4 pb-10">
          {mode === "locked" && <LockedView />}
          {mode === "info" && <InfoView onStart={startTest} />}
          {mode === "quiz" && (
            <QuizView
              stageKey={stageKey}
              stageIdx={stageIdx}
              questions={stageQs}
              answers={answers}
              audioPlaying={audioPlaying}
              recordingId={recordingId}
              onPlay={playAudio}
              onRecordStart={startRecording}
              onRecordStop={stopRecording}
              onPick={pickChoice}
              onPrev={goPrev}
              onNext={goNext}
              isLast={stageIdx === STAGE_ORDER.length - 1}
              stageDone={stageDone}
            />
          )}
          {mode === "result" && (
            <ResultView
              score={grading.score}
              correct={grading.correctCount}
              total={QUESTIONS.length}
              timeText={fmtTime(seconds || 222)}
              dims={grading.dims}
              results={grading.results}
              bp={bp}
              onReview={(id) => setReviewId(id)}
            />
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold">
            {toast}
          </div>
        )}

        {/* Review overlay */}
        {reviewId && (
          <ReviewOverlay
            question={QUESTIONS.find((q) => q.id === reviewId)!}
            answer={answers[reviewId]}
            onClose={() => setReviewId(null)}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

// ───────── Locked ─────────
function LockedView() {
  return (
    <div className="mt-4 rounded-3xl bg-white border border-border p-5 text-center">
      <div
        className="mx-auto h-14 w-14 rounded-2xl grid place-items-center mb-3"
        style={{
          background: "color-mix(in oklab, var(--wordie) 14%, white)",
          color: "var(--wordie)"
        }}
      >
        <Lock className="h-6 w-6" />
      </div>
      <p className="font-semibold text-[16px]">Wordie Test is locked for now</p>
      <p className="text-[13px] text-muted-foreground mt-1">Available in 4 days</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Last Wordie Test</p>
          <p className="text-[13px] font-semibold mt-1">Jun 5 · #02</p>
        </div>
        <div className="rounded-2xl bg-muted/30 px-3 py-3">
          <p className="text-[12px] font-semibold text-muted-foreground">Next Wordie Test</p>
          <p className="text-[13px] font-semibold mt-1">Jun 12 · #03</p>
        </div>
      </div>
    </div>
  );
}

// ───────── Info ─────────
function InfoView({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <section className="rounded-3xl bg-white border border-border p-5">
        <p
          className="text-[20px] font-semibold leading-none"
          style={{ color: "var(--wordie)", letterSpacing: "-0.01em" }}
        >
          #03
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-semibold">
          {[
            "Finish the test to see your result.",
            "Each audio can be played 2 times.",
            "Read all choices carefully.",
            "Try to repeat the words clearly.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
              >
                <Check className="h-3 w-3" style={{ color: "var(--wordie)" }} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={onStart}
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--wordie)", fontSize: "17.25px" }}
      >
        <Play className="shrink-0 fill-current" style={{ width: "1.05em", height: "1.05em" }} />
        <span>Start Test</span>
      </button>
    </div>
  );
}

// ───────── Quiz ─────────
function QuizView({
  stageKey,
  stageIdx,
  questions,
  answers,
  audioPlaying,
  recordingId,
  onPlay,
  onRecordStart,
  onRecordStop,
  onPick,
  onPrev,
  onNext,
  isLast,
  stageDone,
}: {
  stageKey: Stage;
  stageIdx: number;
  questions: Question[];
  answers: Record<string, Answer>;
  audioPlaying: string | null;
  recordingId: string | null;
  onPlay: (q: Question) => void;
  onRecordStart: (q: Question) => void;
  onRecordStop: (q: Question) => void;
  onPick: (q: Question, choiceId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isLast: boolean;
  stageDone: boolean;
}) {
  const meta = STAGE_META[stageKey];

  return (
    <div>
      {/* Progress segments */}
      <div className="flex gap-1 mb-4">
        {STAGE_ORDER.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i < stageIdx
                  ? "var(--wordie)"
                  : i === stageIdx
                  ? meta.color
                  : "color-mix(in oklab, var(--wordie) 10%, white)"
            }}
          />
        ))}
      </div>

      {/* Stage banner */}
      <section
        className="rounded-3xl p-5 text-white"
        style={{ background: meta.color }}
      >
        <div className="flex items-center justify-between">
          <h2
            className="text-[24px] font-medium leading-none"
            style={{ letterSpacing: "-0.01em" }}
          >
            {meta.label}
          </h2>
          <span className="text-[11px] font-semibold rounded-full bg-white/22 px-2 py-0.5">
            {meta.points} Pt
          </span>
        </div>
        <p className="mt-2 text-[13px] font-semibold opacity-95">{meta.note}</p>
      </section>

      {/* Questions */}
      <div className="mt-4 space-y-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            q={q}
            qNum={i + 1}
            answer={answers[q.id]}
            audioPlaying={audioPlaying === q.id}
            recording={recordingId === q.id}
            onPlay={() => onPlay(q)}
              onRecordStart={() => onRecordStart(q)}
              onRecordStop={() => onRecordStop(q)}
            onPick={(cid) => onPick(q, cid)}
          />
        ))}
      </div>

      {/* Nav */}
      <div className="mt-5 flex gap-2.5">
        {stageIdx > 0 && (
          <button
            onClick={onPrev}
            className="flex-1 rounded-full py-3.5 font-semibold border border-border bg-white text-[14px]"
            style={{ color: "var(--wordie)" }}
          >
            Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-[2] rounded-full py-3.5 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5 text-[14px]"
          style={{
            background: stageDone ? "var(--wordie)" : "color-mix(in oklab, var(--wordie) 35%, white)"
          }}
        >
          {isLast ? "Submit" : "Next"}
          {!isLast && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
  qNum,
  answer,
  audioPlaying,
  recording,
  onPlay,
  onRecordStart,
  onRecordStop,
  onPick,
}: {
  q: Question;
  qNum: number;
  answer?: Answer;
  audioPlaying: boolean;
  recording: boolean;
  onPlay: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
  onPick: (choiceId: string) => void;
}) {
  const singleCol = shouldSingleColumn(q.stage, q.choices);

  return (
    <section className="rounded-3xl bg-white border border-border p-4">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <span
          className="h-7 w-7 grid place-items-center rounded-full text-[12px] font-semibold shrink-0"
          style={{
            background: "color-mix(in oklab, var(--wordie) 12%, white)",
            color: "var(--wordie)"
          }}
        >
          {qNum}
        </span>

        {q.stage === "pronunciationListen" && (
          <button
            type="button"
            onClick={onPlay}
            aria-label={audioPlaying ? "Playing" : "Play audio"}
            className="h-8 w-8 grid place-items-center rounded-full text-white active:scale-95 shadow"
            style={{ background: "var(--wordie)" }}
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        )}

        {q.stage === "pronunciationSpeak" && (
          <div className="flex items-baseline gap-2">
            <span
              className="text-[20px] font-semibold"
              style={{ letterSpacing: "-0.01em" }}
            >
              {q.word}
            </span>
            {q.ipa && (
              <span className="text-[11px] text-muted-foreground font-medium">/{q.ipa}/</span>
            )}
          </div>
        )}

        {q.stage !== "pronunciationListen" &&
          q.stage !== "pronunciationSpeak" &&
          q.stage !== "spelling" && (
            <span
              className="text-[20px] font-semibold"
              style={{ letterSpacing: "-0.01em" }}
            >
              {q.word}
            </span>
          )}
      </div>

      {/* Body */}
      {q.stage === "pronunciationSpeak" ? (
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="button"
            onPointerDown={onRecordStart}
            onPointerUp={onRecordStop}
            onPointerLeave={onRecordStop}
            onPointerCancel={onRecordStop}
            onContextMenu={(event) => event.preventDefault()}
            className="h-14 w-14 rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform touch-none"
            style={{
              background: recording
                ? "#ef4444"
                : answer?.record
                ? "var(--wordie-accent)"
                : "var(--wordie)",
            }}
          >
            <Mic className="h-6 w-6" />
          </button>
          <p className="text-[12px] font-semibold text-muted-foreground">
            {recording
              ? "Recording…"
              : answer?.record
              ? answer.record.band === "great"
                ? "Clear voice"
                : answer.record.band === "good"
                ? "Checked"
                : "Needs review"
              : "Hold to record"}
          </p>
        </div>
      ) : (
        <div
          className={`mt-3 ${singleCol ? "space-y-2" : "grid grid-cols-2 gap-2"}`}
        >
          {q.choices?.map((c) => {
            const selected = answer?.choiceId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onPick(c.id)}
                className="rounded-2xl border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors"
                style={{
                  background: selected
                    ? "color-mix(in oklab, var(--wordie) 10%, white)"
                    : "white",
                  borderColor: selected ? "var(--wordie)" : "var(--border)",
                  color: selected ? "var(--wordie)" : "var(--foreground)"
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ───────── Result ─────────
function ResultView({
  score,
  correct,
  total,
  timeText,
  dims,
  results,
  bp,
  onReview,
}: {
  score: number;
  correct: number;
  total: number;
  timeText: string;
  dims: Record<Stage, { correct: number; total: number }>;
  results: { q: Question; correct: boolean }[];
  bp: number;
  onReview: (id: string) => void;
}) {
  return (
    <div>
      <section
        className="relative rounded-[28px] px-5 pt-6 pb-7 text-white text-center overflow-hidden"
        style={{ background: "var(--wordie)" }}
      >
        <div>
          <h2
            className="text-center text-[22px] font-medium leading-none"
            style={{
              letterSpacing: "-0.01em",
              color: "white"
            }}
          >
            Test Completed!
          </h2>
          <div className="mt-3">
            <ProgressBar
              value={100}
              color="#ffffff"
              track="rgba(255,255,255,0.22)"
              height={1.6}
            />
          </div>
        </div>
        <p className="mt-7 text-[13px] font-semibold opacity-90">
          Your Wordie Test score
        </p>
        <p
          className="mt-2 text-[46px] font-medium leading-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          {score}
          <span className="text-[24px] opacity-90 font-medium ml-1" style={{ letterSpacing: "-0.01em" }}>%</span>
        </p>
        <p className="mt-2 text-[13px] font-semibold opacity-90">
          {correct} / {total} correct
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--wordie) 14%, white)",
              color: "var(--wordie)"
            }}
          >
            Test Time {timeText}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--bloxia) 14%, white)",
              color: "var(--bloxia)"
            }}
          >
            +{bp} Bp
          </span>
        </div>
      </section>

      {/* Dimension rows */}
      <section className="mt-5">
        <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
          {STAGE_ORDER.map((s) => {
            const d = dims[s];
            const pct = d.total ? Math.round((d.correct / d.total) * 100) : 0;
            return (
              <div key={s} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold">{STAGE_META[s].label}</p>
                  <p className="text-[12px] font-semibold text-muted-foreground">
                    {d.correct} / {d.total}
                  </p>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: "color-mix(in oklab, var(--wordie) 10%, white)" }}>
                  <div className="h-full" style={{ width: `${pct}%`, background: "var(--wordie)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Answer review */}
      <section className="mt-5">
        <p className="text-[14px] font-semibold text-foreground mb-2 px-1">
          Answer Review
        </p>
        <div className="space-y-4">
          {STAGE_ORDER.map((s) => {
            const items = results.filter((r) => r.q.stage === s);
            return (
              <div key={s}>
                <p className="text-[11px] font-semibold text-muted-foreground px-1 mb-1.5">
                  {STAGE_META[s].label}
                </p>
                <div className="rounded-2xl bg-white border border-border divide-y divide-border overflow-hidden">
                  {items.map((r, idx) => (
                    <button
                      key={r.q.id}
                      onClick={() => onReview(r.q.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left active:bg-muted/40"
                    >
                      <span className="text-[11px] font-semibold text-muted-foreground w-5">
                        Q{idx + 1}
                      </span>
                      <span className="flex-1 text-[13px] font-semibold">{r.q.word}</span>
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: r.correct ? "var(--wordie)" : "var(--wordie-accent)" }}
                      >
                        {r.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Link
        to="/mywordie"
        className="mt-5 w-full rounded-full py-3 font-semibold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
        style={{ background: "var(--wordie)", fontSize: "17.25px" }}
      >
        <span>Back to myWordie</span>
      </Link>
    </div>
  );
}

// ───────── Review Overlay ─────────
function ReviewOverlay({
  question,
  answer,
  onClose,
}: {
  question: Question;
  answer?: Answer;
  onClose: () => void;
}) {
  const correctChoice = question.choices?.find((c) => c.isCorrect);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-5">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {STAGE_META[question.stage].label}
          </p>
          <button onClick={onClose} className="h-7 w-7 grid place-items-center rounded-full bg-muted/40">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p
          className="mt-2 text-[22px] font-medium"
          style={{ letterSpacing: "-0.01em" }}
        >
          {question.word}
        </p>

        {question.stage === "pronunciationSpeak" ? (
          <div className="mt-4 rounded-2xl bg-muted/30 p-3 text-[13px]">
            <p className="font-semibold">Pronunciation score</p>
            <p className="text-muted-foreground mt-0.5">
              {answer?.record
                ? `${answer.record.score} · ${
                    answer.record.band === "great"
                      ? "Clear voice"
                      : answer.record.band === "good"
                      ? "Checked"
                      : "Needs review"
                  }`
                : "Not recorded"}
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {question.choices?.map((c) => {
              const isMine = answer?.choiceId === c.id;
              const isRight = c.isCorrect;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border px-3 py-2.5 text-[13px] font-semibold flex items-center justify-between"
                  style={{
                    background: isRight
                      ? "color-mix(in oklab, var(--wordie) 10%, white)"
                      : isMine
                      ? "color-mix(in oklab, var(--wordie-accent) 12%, white)"
                      : "white",
                    borderColor: isRight
                      ? "var(--wordie)"
                      : isMine
                      ? "var(--wordie-accent)"
                      : "var(--border)"
                  }}
                >
                  <span>{c.label}</span>
                  <span className="flex gap-1">
                    {isRight && (
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: "var(--wordie)" }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {isMine && !isRight && (
                      <span
                        className="h-6 w-6 rounded-full grid place-items-center text-white"
                        style={{ background: "var(--wordie-accent)" }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
            {correctChoice && (
              <p className="text-[12px] text-muted-foreground mt-1">
                Correct: {correctChoice.label}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

```

### src/routes/wordie-x.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  X,
} from "lucide-react";
import { StatusBadge, type WordStatus } from "@/components/app/WordieKit";
import { WordPreview } from "@/components/app/WordPreview";

export const Route = createFileRoute("/wordie-x")({
  head: () => ({ meta: [
      { title: "WordieX — Paisley EC" },
      { name: "description", content: "Extended word practice with deeper context and examples." },
      { property: "og:title", content: "WordieX — Paisley EC" },
      { property: "og:description", content: "Extended word practice with deeper context and examples." },
    ] }),
  component: WordieXPage,
});

// ---------- Constants ----------
const PART_OF_SPEECH_OPTIONS = [
  "noun", "verb", "adjective", "adverb", "pronoun",
  "preposition", "conjunction", "interjection", "determiner", "numeral",
] as const;

const PROPER_NOUNS = new Set(["China", "English", "Shirin", "Paisley", "Wordie", "Bloxia"]);

const COMMON_POS_MAP: Record<string, string> = {
  hello: "interjection", hi: "interjection", the: "determiner", a: "determiner",
  an: "determiner", i: "pronoun", you: "pronoun", he: "pronoun", she: "pronoun",
  one: "numeral", two: "numeral", three: "numeral",
};

const KNOWN_WORDS: Array<{
  word: string; partOfSpeech: string; cefrLevel: string;
  definitionEn: string; exampleSentence: string; pronunciation: string;
}> = [
  { word: "cat", partOfSpeech: "noun", cefrLevel: "A1",
    definitionEn: "a small furry pet animal that says meow",
    exampleSentence: "My cat likes to sleep on the sofa.", pronunciation: "/kæt/" },
  { word: "run", partOfSpeech: "verb", cefrLevel: "A1",
    definitionEn: "to move very fast on your feet",
    exampleSentence: "I run to school every day.", pronunciation: "/rʌn/" },
  { word: "happy", partOfSpeech: "adjective", cefrLevel: "A1",
    definitionEn: "feeling good and pleased",
    exampleSentence: "She is happy with her gift.", pronunciation: "/ˈhæp.i/" },
];

// ---------- Filters ----------
type LearnStatus = "new" | "learning" | "review" | "mastered" | "relearning";

const SOURCE_OPTIONS: { key: string; label: string }[] = [
  { key: "iAdded", label: "iAdded" },
  { key: "definition", label: "Definition" },
  { key: "example", label: "Example" },
  { key: "shirintalk", label: "ShirinTalk" },
];
const SOURCE_LABEL: Record<string, string> = Object.fromEntries(
  SOURCE_OPTIONS.map((o) => [o.key, o.label]),
);
const getSourceLabel = (s?: string) => (s && SOURCE_LABEL[s]) || "iAdded";

const STATUS_OPTIONS: { key: LearnStatus | "focus"; label: string }[] = [
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "review", label: "Review" },
  { key: "focus", label: "Focus" },
  { key: "mastered", label: "Mastered" },
  { key: "relearning", label: "Relearning" },
];

const STATUS_COLOR: Record<string, string> = {
  new: "oklch(0.66 0.24 280)",
  learning: "oklch(0.7 0.18 195)",
  review: "oklch(0.68 0.2 145)",
  focus: "oklch(0.75 0.12 305)",
  mastered: "var(--wordie-accent)",
  relearning: "oklch(0.8 0.1 350)",
};

// Words already in Wordie Bank — block duplicates
const BANK_WORDS: Set<string> = new Set([
  "dog", "cat", "bird", "fish", "rabbit",
  "book", "chair", "pencil", "window", "teacher",
]);

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// ---------- Types & storage ----------
type Note = {
  _id: string;
  word: string;
  content: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  cefrLevel: string;
  pronunciation: string;
  source: string;
  targetWordId: string;
  learnStatus: LearnStatus;
  nextReviewLabel: string;
  createdAt: number;
  updatedAt: number;
  isFocus?: boolean;
};

const NOTES_KEY = "pec_my_notes_v4";
const FOCUS_KEY = "pec_user_words_focus_v1";

const SEED_NOTES: Array<Omit<Note, "_id" | "createdAt" | "updatedAt">> = [
  { word: "sunshine", content: "the light and warmth from the sun",
    definitionEn: "the light and warmth from the sun",
    exampleSentence: "We played in the sunshine all afternoon.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈsʌnʃaɪn/",
    source: "definition", targetWordId: "wordie_x_sunshine",
    learnStatus: "new", nextReviewLabel: "Not started", isFocus: false },
  { word: "giggle", content: "to laugh in a soft, silly way",
    definitionEn: "to laugh in a soft, silly way",
    exampleSentence: "The kids giggle when they hear the joke.",
    partOfSpeech: "verb", cefrLevel: "A2", pronunciation: "/ˈɡɪɡ.əl/",
    source: "shirintalk", targetWordId: "wordie_x_giggle",
    learnStatus: "learning", nextReviewLabel: "Today", isFocus: false },
  { word: "puppy", content: "a baby dog",
    definitionEn: "a baby dog",
    exampleSentence: "My puppy loves to chase the ball.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈpʌp.i/",
    source: "example", targetWordId: "wordie_x_puppy",
    learnStatus: "review", nextReviewLabel: "Tomorrow", isFocus: false },
  { word: "rainbow", content: "colorful arc in the sky after rain",
    definitionEn: "colorful arc in the sky after rain",
    exampleSentence: "Look at the rainbow over the hill!",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈreɪn.boʊ/",
    source: "iAdded", targetWordId: "wordie_x_rainbow",
    learnStatus: "mastered", nextReviewLabel: "In 7 days", isFocus: false },
  { word: "butterfly", content: "an insect with big colorful wings",
    definitionEn: "an insect with big colorful wings",
    exampleSentence: "A butterfly landed on the flower.",
    partOfSpeech: "noun", cefrLevel: "A2", pronunciation: "/ˈbʌt.ə.flaɪ/",
    source: "definition", targetWordId: "wordie_x_butterfly",
    learnStatus: "learning", nextReviewLabel: "Today", isFocus: true },
  { word: "adventure", content: "an exciting or unusual experience",
    definitionEn: "an exciting or unusual experience",
    exampleSentence: "Our trip to the forest was a big adventure.",
    partOfSpeech: "noun", cefrLevel: "B1", pronunciation: "/ədˈven.tʃər/",
    source: "shirintalk", targetWordId: "wordie_x_adventure",
    learnStatus: "relearning", nextReviewLabel: "Today", isFocus: false },
];

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Note[];
    const focus = JSON.parse(localStorage.getItem(FOCUS_KEY) || "{}") as Record<string, boolean>;
    return arr.map((n) => ({ ...n, isFocus: !!focus[n.targetWordId || n.word] || !!n.isFocus }));
  } catch { return []; }
}
function saveNotes(arr: Note[]) {
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(arr)); } catch { /* noop */ }
}
function toggleFocusStore(key: string, next: boolean) {
  try {
    const focus = JSON.parse(localStorage.getItem(FOCUS_KEY) || "{}") as Record<string, boolean>;
    if (next) focus[key] = true; else delete focus[key];
    localStorage.setItem(FOCUS_KEY, JSON.stringify(focus));
  } catch { /* noop */ }
}

// ---------- Helpers ----------
function normalizeDraftWord(value: string): string {
  const trimmed = (value || "").trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  if (trimmed === "i") return "I";
  for (const p of PROPER_NOUNS) if (p.toLowerCase() === trimmed.toLowerCase()) return p;
  if (/^[A-Z]{2,}$/.test(trimmed)) return trimmed;
  return trimmed.toLowerCase();
}

function buildFallbackMeta(word: string, partOfSpeech?: string) {
  const key = word.toLowerCase();
  return {
    partOfSpeech: COMMON_POS_MAP[key] || partOfSpeech || "noun",
    cefrLevel: "A1",
    definitionEn: "a word children can learn and use in English",
    exampleSentence: `I can use ${word} in a sentence.`,
    pronunciation: `/${word}/`,
  };
}

function buildSuggestion(word: string): string {
  const n = word.toLowerCase();
  if (!n) return "";
  for (const k of KNOWN_WORDS) {
    const kw = k.word.toLowerCase();
    if (kw === n) return "";
    if (kw[0] === n[0] && Math.abs(kw.length - n.length) <= 2 && kw !== n) return k.word;
  }
  return "";
}

// Map our LearnStatus → WordieKit StatusBadge status
function toBadgeStatus(s: LearnStatus): WordStatus {
  if (s === "relearning") return "learning";
  return s;
}

// ---------- Page ----------
function WordieXPage() {
  const WORDIE = "var(--wordie)";
  const [notes, setNotes] = useState<Note[]>([]);

  // Editor
  const [showEditor, setShowEditor] = useState(false);
  const [draftWord, setDraftWord] = useState("");
  const [normalizedWord, setNormalizedWord] = useState("");
  const [wordSuggestion, setWordSuggestion] = useState("");
  const [posIndex, setPosIndex] = useState(0);
  const [showPos, setShowPos] = useState(false);
  const [cefr, setCefr] = useState("A1");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Filters
  const [sourceSel, setSourceSel] = useState<string[]>([]);
  const [statusSel, setStatusSel] = useState<string[]>([]);
  const [openSheet, setOpenSheet] = useState<null | "source" | "status">(null);

  // Select / preview / batch
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchOpen, setBatchOpen] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Note | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load seed/notes
  useEffect(() => {
    const existing = loadNotes();
    if (existing.length === 0 && typeof window !== "undefined" && !localStorage.getItem(NOTES_KEY)) {
      const now = Date.now();
      const seeded: Note[] = SEED_NOTES.map((n, i) => ({
        ...n,
        _id: n.targetWordId,
        createdAt: now - i * 1000,
        updatedAt: now - i * 1000,
      }));
      // mirror focus seeds into focus store
      seeded.forEach((n) => { if (n.isFocus) toggleFocusStore(n.targetWordId, true); });
      saveNotes(seeded);
      setNotes(seeded);
    } else {
      setNotes(existing);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  // Autofill on word change
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (!normalizedWord) return;
    autoTimer.current = setTimeout(() => {
      const known = KNOWN_WORDS.find((k) => k.word.toLowerCase() === normalizedWord.toLowerCase());
      const meta = known || buildFallbackMeta(normalizedWord);
      setIsAutoFilling(true);
      setPosIndex((idx) => {
        const i = PART_OF_SPEECH_OPTIONS.indexOf(meta.partOfSpeech as typeof PART_OF_SPEECH_OPTIONS[number]);
        return i >= 0 ? i : idx;
      });
      setCefr(meta.cefrLevel);
      setDefinition((d) => d || meta.definitionEn);
      setExample((e) => e || meta.exampleSentence);
      setPronunciation(meta.pronunciation);
      setTimeout(() => setIsAutoFilling(false), 400);
    }, 450);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [normalizedWord]);

  function openNewWord() {
    setShowEditor(true);
    setDraftWord(""); setNormalizedWord(""); setWordSuggestion("");
    setPosIndex(0); setCefr("A1"); setDefinition(""); setExample(""); setPronunciation("");
  }
  function cancelEditor() { setShowEditor(false); }

  function onWordInput(v: string) {
    setDraftWord(v);
    const n = normalizeDraftWord(v);
    setNormalizedWord(n);
    setWordSuggestion(buildSuggestion(n));
  }
  function applyWordSuggestion() {
    if (!wordSuggestion) return;
    setDraftWord(wordSuggestion);
    setNormalizedWord(normalizeDraftWord(wordSuggestion));
    setWordSuggestion("");
  }

  function addWordToWordieX() {
    const word = normalizedWord;
    const def = definition.trim();
    if (!word || !def) { setToast("Add word and example"); return; }
    if (BANK_WORDS.has(word.toLowerCase())) {
      setToast("Already in Wordie Bank");
      return;
    }
    const targetWordId = `wordie_x_${word.toLowerCase()}`;
    const existing = notes.find((n) => n.targetWordId === targetWordId);
    const now = Date.now();
    const note: Note = {
      _id: existing?._id || targetWordId,
      word,
      content: def,
      definitionEn: def,
      exampleSentence: example.trim(),
      partOfSpeech: PART_OF_SPEECH_OPTIONS[posIndex],
      cefrLevel: cefr,
      pronunciation: pronunciation || `/${word}/`,
      source: "iAdded",
      targetWordId,
      learnStatus: existing?.learnStatus || "new",
      nextReviewLabel: existing?.nextReviewLabel || "Not started",
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      isFocus: existing?.isFocus,
    };
    const next = existing
      ? notes.map((n) => (n._id === existing._id ? note : n))
      : [note, ...notes];
    setNotes(next); saveNotes(next);
    setShowEditor(false);
    setToast(existing ? "Updated" : "Added to Wordie-X");
  }

  function performDelete(note: Note) {
    toggleFocusStore(note.targetWordId || note.word, false);
    const next = notes.filter((n) => n._id !== note._id);
    setNotes(next); saveNotes(next);
    setConfirmDelete(null);
    setToast("Deleted");
  }

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (sourceSel.length > 0 && !sourceSel.includes(n.source)) return false;
      if (statusSel.length > 0) {
        const hit = statusSel.includes(n.learnStatus) || (n.isFocus && statusSel.includes("focus"));
        if (!hit) return false;
      }
      return true;
    });
  }, [notes, sourceSel, statusSel]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { focus: 0 };
    for (const n of notes) {
      c[n.learnStatus] = (c[n.learnStatus] ?? 0) + 1;
      if (n.isFocus) c.focus += 1;
    }
    return c;
  }, [notes]);

  // Select helpers
  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };
  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
    setBatchOpen(false);
  };
  const applyUpdate = (updater: (n: Note) => Note, msg: string) => {
    const next = notes.map((n) => (selected.has(n._id) ? updater(n) : n));
    setNotes(next); saveNotes(next);
    setToast(msg); exitSelect();
  };
  const batchAddFocus = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, true);
    });
    applyUpdate((n) => ({ ...n, isFocus: true }), "Added to Focus");
  };
  const batchRemoveFocus = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, false);
    });
    applyUpdate((n) => ({ ...n, isFocus: false }), "Removed from Focus");
  };
  const batchMoveReview = () =>
    applyUpdate((n) => ({ ...n, learnStatus: "review", nextReviewLabel: "Today" }), "Moved to Review");
  const batchRemoveReview = () =>
    applyUpdate(
      (n) => ({ ...n, learnStatus: "new", nextReviewLabel: "Not started" }),
      "Removed from Review",
    );
  const batchDelete = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, false);
    });
    const next = notes.filter((n) => !selected.has(n._id));
    setNotes(next); saveNotes(next);
    setToast("Deleted"); exitSelect();
  };
  const openBatch = () => {
    if (selected.size === 0) { setToast("Select cards first"); return; }
    setBatchOpen(true);
  };

  const selectedNotes = useMemo(
    () => notes.filter((n) => selected.has(n._id)),
    [notes, selected],
  );
  const allSelectedFocus =
    selectedNotes.length > 0 && selectedNotes.every((n) => n.isFocus);
  const allSelectedReview =
    selectedNotes.length > 0 && selectedNotes.every((n) => n.learnStatus === "review");

  const labelFor = (sel: string[], lookup: (k: string) => string) => {
    if (sel.length === 0) return "All";
    if (sel.length === 1) return lookup(sel[0]);
    return `${sel.length} sel.`;
  };

  const toggleIn = (sel: string[], setter: (v: string[]) => void, value: string) => {
    if (sel.includes(value)) setter(sel.filter((v) => v !== value));
    else setter([...sel, value]);
  };

  return (
    <PhoneFrame bg="bg-white">
      <FloatingBack to="/mywordie" />

      <div className="px-5 pb-12">
        {/* Title */}
        <div className="mb-4 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: WORDIE, letterSpacing: "-0.01em" }}
          >
            Wordie-X
          </h1>
        </div>

        {/* Toolbar: Select / Done · Preview (top, like Wordie Bank) */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: selectMode ? "var(--wordie)" : "var(--foreground)" }}
          >
            {selectMode ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            {selectMode ? "Done" : "Select"}
          </button>
          {selectMode ? (
            <button
              type="button"
              onClick={openBatch}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              {selected.size} selected •••
            </button>
          ) : (
            <button
              type="button"
              onClick={() => filtered.length > 0 && setPreviewIdx(0)}
              className="text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              Preview
            </button>
          )}
        </div>

        {/* Add a new word */}
        <section>
          {!showEditor ? (
            <button
              type="button"
              onClick={openNewWord}
              className="w-full rounded-full py-3 px-4 flex items-center justify-center gap-3 active:scale-[0.99] transition-transform"
              style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
            >
              <span
                className="h-7 w-7 rounded-full grid place-items-center bg-white shrink-0"
                style={{ color: WORDIE, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.75} />
              </span>
              <span
                className="text-[17px] font-semibold tracking-tight"
                style={{ color: WORDIE, letterSpacing: "-0.01em" }}
              >
                Add A New Word
              </span>
            </button>
          ) : (
            <div
              className="rounded-3xl bg-white border p-4"
              style={{ borderColor: "color-mix(in oklab, var(--wordie) 25%, white)" }}
            >
              <label className="block">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Word</span>
                <input
                  type="text"
                  value={draftWord}
                  onChange={(e) => onWordInput(e.target.value)}
                  placeholder="Type a word"
                  className="mt-1 w-full bg-transparent border-0 border-b border-border focus:outline-none focus:border-[color:var(--wordie)] py-2 text-[18px] font-semibold"
                  style={{ color: WORDIE }}
                  autoFocus
                />
              </label>
              {wordSuggestion && (
                <button
                  type="button"
                  onClick={applyWordSuggestion}
                  className="mt-2 text-[12px] font-semibold"
                  style={{ color: "var(--wordie-accent)" }}
                >
                  Did you mean <u>{wordSuggestion}</u>?
                </button>
              )}

              <div className="mt-4 flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPos((s) => !s)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                    style={{
                      background: "color-mix(in oklab, var(--wordie) 12%, white)",
                      color: WORDIE
                    }}
                  >
                    {PART_OF_SPEECH_OPTIONS[posIndex]}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {showPos && (
                    <div className="absolute z-20 mt-1 max-h-56 overflow-auto rounded-2xl bg-white border border-border shadow-lg p-1 min-w-[140px]">
                      {PART_OF_SPEECH_OPTIONS.map((p, i) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => { setPosIndex(i); setShowPos(false); }}
                          className="w-full text-left px-3 py-1.5 text-[12px] font-semibold rounded-xl hover:bg-muted"
                          style={{ color: i === posIndex ? WORDIE : "var(--foreground)" }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                  style={{
                    background: "color-mix(in oklab, var(--wordie-accent) 14%, white)",
                    color: "var(--wordie-accent)"
                  }}
                  title="CEFR auto-detected"
                >
                  {cefr}
                </span>
                {isAutoFilling && (
                  <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
                    Auto-filling…
                  </span>
                )}
              </div>

              <label className="block mt-4">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Definition</span>
                <textarea
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder="What does this word mean?"
                  className="mt-1 w-full bg-muted/50 rounded-2xl p-3 text-[13px] focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as never]: "color-mix(in oklab, var(--wordie) 30%, white)" }}
                />
              </label>

              <label className="block mt-3">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Example</span>
                <textarea
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder="Use it in a sentence (optional)"
                  className="mt-1 w-full bg-muted/50 rounded-2xl p-3 text-[13px] focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as never]: "color-mix(in oklab, var(--wordie) 30%, white)" }}
                />
              </label>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelEditor}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-semibold bg-muted text-foreground active:scale-[0.98] transition-transform"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addWordToWordieX}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] transition-transform"
                  style={{ background: WORDIE }}
                >
                  Add to Wordie-X
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Filters: Resource + Status (bank-style) */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <FilterDropdown
            label="Resource"
            value={labelFor(sourceSel, (k) => SOURCE_LABEL[k] || k)}
            active={sourceSel.length > 0}
            onClick={() => setOpenSheet("source")}
          />
          <FilterDropdown
            label="Status"
            value={labelFor(statusSel, (k) => STATUS_OPTIONS.find((o) => o.key === k)?.label || k)}
            active={statusSel.length > 0}
            onClick={() => setOpenSheet("status")}
          />
        </div>

        {/* List */}
        <section className="mt-3">
          <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{filtered.length} cards</p>

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-muted/40 border border-dashed border-border p-8 text-center">
              <p className="text-[13px] text-muted-foreground">
                {notes.length === 0
                  ? "No saved words yet. Add words you want to remember later."
                  : "No words match this filter."}
              </p>
            </div>
          ) : (
            <ul className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {filtered.map((n, idx) => {
                const isSel = selected.has(n._id);
                return (
                  <li key={n._id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectMode) toggleSelect(n._id);
                        else setPreviewIdx(idx);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
                    >
                      {selectMode && (
                        <div
                          className="h-5 w-5 rounded-full border-2 grid place-items-center shrink-0"
                          style={{
                            borderColor: isSel ? "var(--wordie)" : "var(--border)",
                            background: isSel ? "var(--wordie)" : "transparent",
                            color: "white"
                          }}
                        >
                          {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-[20px] truncate leading-tight text-foreground"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {n.word}
                        </p>
                        {n.content && (
                          <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                            {n.content}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                          <span
                            className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{
                              background: "color-mix(in oklab, var(--wordie) 12%, white)",
                              color: WORDIE
                            }}
                          >
                            {capitalize(n.partOfSpeech || "noun")}
                          </span>
                          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                            {n.cefrLevel}
                          </span>
                          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                            {getSourceLabel(n.source)}
                          </span>
                          <LearnBadge status={n.learnStatus} />
                          {n.isFocus && <FocusPill />}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-center">
                        {!selectMode && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Resource / Status sheet */}
      {openSheet && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setOpenSheet(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: "var(--wordie)" }}
              >
                {openSheet === "source" ? "Choose Resource" : "Choose Status"}
              </p>
              <button
                type="button"
                onClick={() => setOpenSheet(null)}
                className="text-[13px] font-semibold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-8 divide-y divide-border">
              {openSheet === "source" && (
                <>
                  <SheetRow label="Clear all" active={sourceSel.length === 0} onClick={() => setSourceSel([])} />
                  {SOURCE_OPTIONS.map((o) => (
                    <SheetRow
                      key={o.key}
                      label={o.label}
                      active={sourceSel.includes(o.key)}
                      onClick={() => toggleIn(sourceSel, setSourceSel, o.key)}
                    />
                  ))}
                </>
              )}
              {openSheet === "status" && (
                <>
                  <SheetRow label="Clear all" active={statusSel.length === 0} onClick={() => setStatusSel([])} />
                  {STATUS_OPTIONS.map((o) => (
                    <SheetRow
                      key={o.key}
                      label={`${o.label} (${counts[o.key] ?? 0})`}
                      active={statusSel.includes(o.key)}
                      onClick={() => toggleIn(statusSel, setStatusSel, o.key)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Batch sheet */}
      {batchOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setBatchOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "58vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: "var(--wordie)" }}
              >
                Batch Actions
              </p>
              <button
                type="button"
                onClick={() => setBatchOpen(false)}
                className="text-[13px] font-semibold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground text-center mb-4 shrink-0">
              {selected.size} selected
            </p>
            <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-2">
              <SheetBtn label="Preview" onClick={() => { setBatchOpen(false); setPreviewIdx(0); }} />
              <SheetBtn
                label={allSelectedFocus ? "Remove from Focus" : "Add to Focus"}
                onClick={allSelectedFocus ? batchRemoveFocus : batchAddFocus}
              />
              <SheetBtn
                label={allSelectedReview ? "Remove from Review" : "Move to Review"}
                onClick={allSelectedReview ? batchRemoveReview : batchMoveReview}
              />
              <SheetBtn label="Delete" danger onClick={batchDelete} />
              <SheetBtn label="Cancel" muted onClick={() => setBatchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-6"
          onClick={() => setConfirmDelete(null)}
        >
          <div className="w-full max-w-[320px] rounded-3xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <p className="text-[16px] font-semibold">Delete word?</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              This word will be removed from Wordie-X.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-semibold bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => performDelete(confirmDelete)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "var(--destructive)" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen preview */}
      {previewIdx !== null && filtered[previewIdx] && (
        <WordPreview
          item={{
            word: filtered[previewIdx].word,
            pronunciation: filtered[previewIdx].pronunciation,
            definitionEn: filtered[previewIdx].definitionEn || filtered[previewIdx].content,
            exampleSentence: filtered[previewIdx].exampleSentence,
            partOfSpeech: filtered[previewIdx].partOfSpeech || "noun",
            cefrLevel: filtered[previewIdx].cefrLevel,
            statusValue: capitalize(filtered[previewIdx].learnStatus),
            nextReviewLabel: filtered[previewIdx].nextReviewLabel,
          }}
          index={previewIdx}
          total={filtered.length}
          onClose={() => setPreviewIdx(null)}
          onPrev={() => setPreviewIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setPreviewIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i))}
          topBadges={
            <>
              <LearnBadge status={filtered[previewIdx].learnStatus} />
              {filtered[previewIdx].isFocus && <FocusPill />}
            </>
          }
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/85 text-white px-4 py-2 text-[12px] font-semibold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}

// ---------- Reusable bits ----------
function FilterDropdown({
  label, value, active, onClick,
}: { label: string; value: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-between gap-1 rounded-full pl-3.5 pr-2.5 py-2 active:scale-[0.97] transition-transform"
      style={
        active
          ? { background: "var(--wordie)", color: "white", border: "1px solid var(--wordie)" }
          : {
              background: "color-mix(in oklab, var(--wordie) 10%, white)",
              color: "var(--foreground)",
              border: "1px solid color-mix(in oklab, var(--wordie) 25%, white)",
            }
      }
    >
      <span className="flex items-baseline gap-1 min-w-0">
        <span className="text-xs font-semibold opacity-70">{label}</span>
        <span
          className="text-[12px] font-semibold truncate"
          style={!active ? { color: "var(--wordie)" } : undefined}
        >
          {value}
        </span>
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80" />
    </button>
  );
}

// Vibrant "F" pill for cards/preview marked as Focus.
// Same depth as other card pills (22% bg / 70% text mix).
export const FOCUS_PILL_COLOR = "oklch(0.7 0.24 340)";
function FocusPill() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 22%, white)`,
        color: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 70%, black)`
      }}
      aria-label="Focus"
      title="Focus"
    >
      Focus
    </span>
  );
}

function SheetRow({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 text-left text-[14px] font-semibold"
      style={{ color: active ? "var(--wordie)" : "var(--foreground)" }}
    >
      <span>{label}</span>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function SheetBtn({
  label, onClick, danger, muted,
}: { label: string; onClick?: () => void; danger?: boolean; muted?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl py-3 text-[14px] font-semibold text-center"
      style={{
        background: muted ? "var(--muted)" : "white",
        color: danger ? "var(--destructive)" : muted ? "var(--foreground)" : "var(--wordie)",
        border: muted ? "none" : "1px solid var(--border)"
      }}
    >
      {label}
    </button>
  );
}

function LearnBadge({ status }: { status: LearnStatus }) {
  if (status === "relearning") {
    const color = STATUS_COLOR.relearning;
    return (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{
          background: `color-mix(in oklab, ${color} 22%, white)`,
          color: `color-mix(in oklab, ${color} 70%, black)`
        }}
      >
        Relearning
      </span>
    );
  }
  return <StatusBadge status={toBadgeStatus(status)} />;
}


```

### src/server.ts

```ts
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

```

### src/start.ts

```ts
import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));

```

### src/styles.css

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  /* Paisley EC brand */
  --color-paisley: var(--paisley);
  --color-paisley-soft: var(--paisley-soft);
  --color-paisley-yellow: var(--paisley-yellow);
  --color-paisley-yellow-soft: var(--paisley-yellow-soft);
  --color-sand: var(--sand);
  --color-sand-soft: var(--sand-soft);
  /* ShirinTalk */
  --color-shirin: var(--shirin);
  --color-shirin-soft: var(--shirin-soft);
  /* myWordie */
  --color-wordie: var(--wordie);
  --color-wordie-soft: var(--wordie-soft);
  --color-wordie-accent: var(--wordie-accent);
  /* Bloxia */
  --color-bloxia: var(--bloxia);
  --color-bloxia-deep: var(--bloxia-deep);
  --color-bloxia-soft: var(--bloxia-soft);
  --color-bloxia-sky: var(--bloxia-sky);
  /* Fonts */
  --font-display: "Fredoka", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", ui-rounded, system-ui, sans-serif;
  --font-sans: "Nunito", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif;
  --font-pixel: "Press Start 2P", ui-monospace, monospace;
}

:root {
  --radius: 1.1rem;
  --background: oklch(0.985 0.005 95);
  --foreground: oklch(0.22 0.05 260);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.22 0.05 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.05 260);
  /* Paisley blue #0146b9 as primary */
  --primary: oklch(0.46 0.21 261);
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.96 0.02 80);
  --secondary-foreground: oklch(0.22 0.05 260);
  --muted: oklch(0.96 0.012 90);
  --muted-foreground: oklch(0.5 0.03 260);
  --accent: oklch(0.92 0.06 75); /* sand */
  --accent-foreground: oklch(0.22 0.05 260);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(0.91 0.015 80);
  --input: oklch(0.95 0.01 240); /* unified light gray — matches progress-bar track */
  --ring: oklch(0.46 0.21 261);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
  /* Brand exacts (mapped from hex) */
  --paisley: oklch(0.46 0.21 261);        /* #0146b9 */
  --paisley-soft: oklch(0.93 0.05 250);
  --paisley-yellow: #cdae8d;   /* Paisley EC accent yellow */
  --paisley-yellow-soft: #ebd9c2;
  --sand: oklch(0.78 0.06 75);             /* #cdae8d */
  --sand-soft: oklch(0.95 0.03 80);
  --shirin: oklch(0.66 0.24 9);            /* #f93e6b */
  --shirin-soft: oklch(0.95 0.05 10);
  --wordie: oklch(0.58 0.22 273);          /* #5064f5 */
  --wordie-soft: oklch(0.95 0.04 270);
  --wordie-accent: oklch(0.78 0.17 65);    /* #fda220 */
  --bloxia: oklch(0.68 0.21 138);          /* #52b22c */
  --bloxia-deep: oklch(0.32 0.12 152);     /* #024527 */
  --bloxia-soft: oklch(0.94 0.06 140);
  --bloxia-sky: oklch(0.92 0.05 220);
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 500;
    letter-spacing: 0;
  }
  /* English-only tighter tracking; opt-in via .en class so mixed CN/EN text
     (which is common in this bilingual app) doesn't get its CJK glyphs
     visually squeezed. */
  .en, h1.en, h2.en, h3.en, h4.en { letter-spacing: -0.01em; }
  /* Chinese-aware typography: turn off the English -0.01em tracking and
     use a slightly taller line-height on runs marked as zh so PingFang /
     Noto Sans SC don't inherit English metrics. */
  h1:lang(zh), h2:lang(zh), h3:lang(zh), h4:lang(zh),
  h1 [lang="zh"], h2 [lang="zh"], h3 [lang="zh"], h4 [lang="zh"],
  [lang="zh"] {
    letter-spacing: 0;
    line-height: 1.35;
  }
}

/* Pixel surface for Bloxia */
@utility pixel-edges {
  image-rendering: pixelated;
}
@utility scroll-hide {
  scrollbar-width: none;
}
.scroll-hide::-webkit-scrollbar { display: none; }

@keyframes bloxia-caret-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.bloxia-caret-blink {
  animation: bloxia-caret-blink 1s step-end infinite;
}

```

---

## Asset Manifest

Lovable stores binary assets on the Lovable CDN via `.asset.json` pointers. Raw `.png/.jpg` under `src/assets/` are direct imports; every `.asset.json` file resolves to `/__l5e/assets-v1/{uuid}/{filename}` on the CDN.

| Asset path | Type | Source | Notes for Codex |
|---|---|---|---|
| `src/assets/brand/Bloxia.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/Logo-A-.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/Paisley_EC.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/Shirin.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/ShirinTalk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/bloxia-logo-text.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/bloxia-logo.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/icon-Bloxia.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/icon-Profile.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/icon-ShirinTalk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/icon-myWordie.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/myWordie.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/mywordie-icon.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/mywordie-text.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/paisley-ec-logo.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/pec-from-logo.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/pec-gray-cropped.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/brand/shirin-girl.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/brand/shirintalk-text.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-filled-v2.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-filled-v3.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-filled.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-outline-bold.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-outline-medium.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/bloxia-outline.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/profile-filled.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/profile-outline.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/shirin-filled.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/tabs/shirin-filled.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/shirin-outline-bold.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/shirin-outline-medium.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/shirin-outline.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/wordie-filled.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/tabs/wordie-outline.png.asset.json` | CDN pointer | Lovable CDN | Replace with local `assets/...` path in WeChat |
| `src/assets/topics/food_talk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/football_talk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/free_talk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/magic_adventure.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/minecraft_adventure.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/mywordie.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/nature_explorer.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/pet_talk.png` | Local binary | Repo | Copy into WeChat `assets/` tree |
| `src/assets/topics/smart_reading.png` | Local binary | Repo | Copy into WeChat `assets/` tree |

### Bloxia CDN URL registry

`src/lib/bloxia/assets.ts` centralizes every Bloxia CDN URL (map, markers, badges, collections, Shirin). Codex should map each `BLOXIA_URLS[key]` back to the matching `assets/bloxia/...` local path in the Mini Program tree.
