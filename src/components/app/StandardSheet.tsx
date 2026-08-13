import { ReactNode, useEffect, useId, useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";

/**
 * Global backdrop registry: when several sheets are open at once (e.g. a nested
 * flow, or the debug preview opening a child sheet on top of its parent), only
 * the top-most sheet paints the dark backdrop. Stacking two translucent
 * backdrops used to darken the strip visible outside the rounded corners.
 */
const openSheets: string[] = [];
const backdropListeners = new Set<() => void>();
function notifyBackdrop() {
  backdropListeners.forEach((fn) => fn());
}
function useIsTopSheet(open: boolean) {
  const id = useId();
  const [, force] = useState(0);
  useEffect(() => {
    const listener = () => force((n) => n + 1);
    backdropListeners.add(listener);
    return () => {
      backdropListeners.delete(listener);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    openSheets.push(id);
    notifyBackdrop();
    return () => {
      const i = openSheets.indexOf(id);
      if (i >= 0) openSheets.splice(i, 1);
      notifyBackdrop();
    };
  }, [open, id]);
  return openSheets.length === 0 || openSheets[openSheets.length - 1] === id;
}

/**
 * Global bottom-sheet standard.
 * - Height: 62vh, white, top rounded 3xl, max-w-[420px]
 * - No grabber (title sits at the top of the sheet).
 * - Title: 17px / font-normal / tracking-tight / leading-none, centered,
 *   colored by `brandColor` (section brand color)
 * - Close button: 32px white circle with 1px border, no shadow, fixed to the
 *   top-left corner of the sheet. Icon 16px / #0F172A / strokeWidth 2.5.
 * - Done button (when `onDone` provided): matching 32px circle on the top-right.
 * - Content: paddingTop 10 by default.
 * All 11 project sheets should render through this component.
 */

type Props = {
  open: boolean;
  title: string;
  /** Section brand color (CSS color). Applied to title text. */
  brandColor: string;
  /** Called by backdrop tap and by the visible close icon. */
  onClose: () => void;
  /**
   * If provided, a Check ✓ button renders in the top-right and calls this.
   * The close icon always remains in the top-left.
   */
  onDone?: () => void;
  /** @deprecated Close icon is now always shown in the top-left. */
  showCancel?: boolean;
  /** Optional centered subtitle rendered below the title. */
  subtitle?: ReactNode;
  /** Color for the subtitle text (default: muted navy). */
  subtitleColor?: string;
  /** Body padding-top offset, defaults to 10px per spec. */
  contentPaddingTop?: number;
  /** Subtitle margin-top in px (default 6). */
  subtitleSpacing?: number;
  /** Optional override height (default: 62vh capped by safe bottom clearance). */
  height?: string;
  /** Optional segmented step progress bar rendered 7px below the close button. */
  progress?: { total: number; current: number };
  /** When true, render a back chevron instead of the close X in the top-left. */
  showBack?: boolean;
  /** Optional step indicator (e.g. "1 /3") shown top-right in gray. */
  stepLabel?: string;
  /** Optional overlay z-index class, e.g. "z-[70]" to stack above other sheets. */
  zClass?: string;
  children: ReactNode;
};

export function StandardSheet({
  open,
  title,
  brandColor,
  onClose,
  onDone,
  subtitle,
  subtitleColor = "rgba(15, 23, 42, 0.55)",
  contentPaddingTop = 10,
  subtitleSpacing = 6,
  height = "min(62vh, calc(100dvh - 6rem - env(safe-area-inset-bottom)))",
  progress,
  showBack,
  stepLabel,
  zClass = "z-[60]",
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hasDone = typeof onDone === "function";
  const isTop = useIsTopSheet(open);

  return (
    <div
      className={`fixed inset-0 ${zClass} flex items-end justify-center transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 ${isTop ? "bg-sheet-backdrop" : "bg-transparent"} ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-3xl flex flex-col bg-white pointer-events-auto"
        style={{
          height,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Header: title centered, close icon top-left, optional done icon top-right */}
        <div className="relative flex flex-col items-center px-5 pt-[18px] pb-3 shrink-0">
          <h2
            className="tracking-tight leading-none"
            style={{
              fontSize: /[\u3400-\u4DBF\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/.test(title) ? 16 : 17,
              letterSpacing: "-0.01em",
              color: brandColor,
              fontWeight: 400,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <div
              className="text-[12px] font-normal leading-[1.55] text-center break-all"
              style={{ color: subtitleColor, marginTop: subtitleSpacing, fontWeight: 400 }}
            >
              {subtitle}
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={showBack ? "Back" : "Close"}
            className="absolute left-[14px] top-[14px] h-8 w-8 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform"
          >
            {showBack ? (
              <ChevronLeft className="h-4 w-4" style={{ color: "#0F172A" }} strokeWidth={2.5} />
            ) : (
              <X className="h-4 w-4" style={{ color: "#0F172A" }} strokeWidth={2.5} />
            )}
          </button>
          {hasDone && (
            <button
              type="button"
              onClick={onDone}
              aria-label="Done"
              className="absolute right-[14px] top-[14px] h-8 w-8 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform"
            >
              <Check className="h-4 w-4" style={{ color: "#0F172A" }} strokeWidth={2.5} />
            </button>
          )}
          {!hasDone && stepLabel && (
            <StepLabel title={title} stepLabel={stepLabel} />
          )}
        </div>
        {progress && (
          <div
            className="absolute left-0 right-0 px-5 flex items-center gap-2 pointer-events-none"
            style={{ top: 14 + 32 + 7 }}
          >
            {Array.from({ length: progress.total }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: 6,
                  background:
                    i < progress.current
                      ? brandColor
                      : "color-mix(in oklab, var(--foreground) 8%, white)",
                }}
              />
            ))}
          </div>
        )}
        <div
          className="flex-1 overflow-y-auto px-5 pb-8"
          style={{ paddingTop: contentPaddingTop }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export const SHEET_BRAND = {
  shirin: "var(--shirin)",
  wordie: "var(--wordie)",
  paisley: "var(--paisley)",
  bloxia: "#689c40",
} as const;

function StepLabel({ title, stepLabel }: { title: string; stepLabel: string }) {
  const normalized = stepLabel.trim().replace(/\s*\/\s*/g, "/");
  const [current, total] = normalized.split("/");
  const titleSize = /[\u3400-\u4DBF\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/.test(title) ? 16 : 17;
  return (
    <span
      className="absolute right-[14px] top-[18px] inline-flex items-baseline leading-none select-none"
      style={{
        letterSpacing: "-0.01em",
        fontWeight: 400,
        color: "color-mix(in oklab, var(--foreground) 45%, white)",
      }}
    >
      <span style={{ fontSize: titleSize }}>{current}</span>
      {total && (
        <span style={{ fontSize: 13, whiteSpace: "pre" }}>{` /${total}`}</span>
      )}
    </span>
  );
}
