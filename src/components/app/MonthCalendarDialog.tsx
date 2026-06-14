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
    const total = Math.ceil((startDow + daysInMonth) / 7) * 7;
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