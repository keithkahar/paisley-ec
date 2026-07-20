import { ReactNode, useEffect } from "react";
import { Check, X } from "lucide-react";

/**
 * Global bottom-sheet standard.
 * - Height: 62vh, white, top rounded 3xl, max-w-[420px]
 * - Grabber: 1px x 40px
 * - Title: 17px / font-normal / tracking-tight / leading-none, centered,
 *   colored by `brandColor` (section brand color)
 * - Corner buttons: 32px white round with 1px border, no shadow.
 *   Icon 16px / #0F172A / strokeWidth 2.5.
 *   Single button -> right (top-1/2 -translate-y-1/2 relative to title).
 *   If both onCancel + onDone provided -> X left, Check right.
 * - Content: paddingTop 10 by default.
 * All 11 project sheets should render through this component.
 */

type Props = {
  open: boolean;
  title: string;
  /** Section brand color (CSS color). Applied to title text. */
  brandColor: string;
  /** Called by backdrop tap and by the visible corner icon. */
  onClose: () => void;
  /**
   * If provided, a Check ✓ button renders in the top-right and calls this.
   * If not provided, the top-right shows an X ✕ button wired to onClose.
   * Provide together with `showCancel` to render both (X left, ✓ right).
   */
  onDone?: () => void;
  /** Show the X button on the left corner (only when onDone is set). */
  showCancel?: boolean;
  /** Optional centered subtitle rendered below the title. */
  subtitle?: ReactNode;
  /** Color for the subtitle text (default: muted navy). */
  subtitleColor?: string;
  /** Body padding-top offset, defaults to 10px per spec. */
  contentPaddingTop?: number;
  /** Optional override height (default: 62vh capped by safe bottom clearance). */
  height?: string;
  children: ReactNode;
};

export function StandardSheet({
  open,
  title,
  brandColor,
  onClose,
  onDone,
  showCancel,
  subtitle,
  subtitleColor = "rgba(15, 23, 42, 0.55)",
  contentPaddingTop = 10,
  height = "min(62vh, calc(100dvh - 6rem - env(safe-area-inset-bottom)))",
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
  const showX = !hasDone || showCancel;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end justify-center transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-sheet-backdrop ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-3xl flex flex-col bg-white pointer-events-auto"
        style={{
          height,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Grabber */}
        <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        {/* Header: centered title, optional subtitle, corner buttons vertically aligned with title */}
        <div className={`relative flex ${subtitle ? "flex-col items-center" : "items-center"} justify-center px-5 pt-2 pb-3 shrink-0`}>
          <h2
            className="text-[17px] font-normal tracking-tight leading-none"
            style={{ letterSpacing: "-0.01em", color: brandColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <div className="mt-1 text-[11px] text-center break-all" style={{ color: subtitleColor }}>
              {subtitle}
            </div>
          )}
          {showX && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cancel"
              className={`absolute ${hasDone ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform`}
            >
              <X className="h-4 w-4" style={{ color: "#0F172A" }} strokeWidth={2.5} />
            </button>
          )}
          {hasDone && (
            <button
              type="button"
              onClick={onDone}
              aria-label="Done"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform"
            >
              <Check className="h-4 w-4" style={{ color: "#0F172A" }} strokeWidth={2.5} />
            </button>
          )}
        </div>
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
  bloxia: "var(--bloxia-deep)",
} as const;