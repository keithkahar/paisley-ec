import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import { SHEET_PRIMARY } from "@/components/app/StandardSheet";

/**
 * Card metrics for sheets that show a white content card above the pinned
 * primary button. The button itself is owned by StandardSheet
 * (`primaryAction`) and always sits at SHEET_PRIMARY.top — never render a
 * bottom button inside a sheet body.
 */
export const SHEET_ACTION_METRICS = {
  /** Top margin of the white card inside the sheet body. */
  cardTopMargin: 20,
  /** Card height so that card bottom + 20 gap + 48 button = the locked coord. */
  cardHeight: 341,
  cardRadius: 28,
  cardPadding: 20,
  primaryTop: SHEET_PRIMARY.top,
  primaryHeight: SHEET_PRIMARY.height,
  subtitleTopMargin: 10,
  listTopMargin: 70,
} as const;

const PAISLEY = "var(--paisley)";

/** White content card sized to sit exactly above the pinned primary button. */
export function SheetCard({
  children,
  style,
  className = "",
}: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col min-h-0 ${className}`}
      style={{
        marginTop: SHEET_ACTION_METRICS.cardTopMargin,
        height: SHEET_ACTION_METRICS.cardHeight,
        background: "white",
        borderRadius: SHEET_ACTION_METRICS.cardRadius,
        padding: SHEET_ACTION_METRICS.cardPadding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Brand subtitle line inside the card (renders a spacer when empty). */
export function SheetCardSubtitle({ children }: { children?: ReactNode }) {
  return (
    <div
      className="flex items-baseline justify-center gap-2"
      style={{ marginTop: SHEET_ACTION_METRICS.subtitleTopMargin }}
    >
      <p
        className="text-[13px] leading-none"
        style={{ color: PAISLEY, fontWeight: 400 }}
        aria-hidden={children ? undefined : "true"}
      >
        {children ?? "\u00a0"}
      </p>
    </div>
  );
}

/** Checkmark benefit list, centered at the standard offset. */
export function SheetBenefitList({ items }: { items: string[] }) {
  return (
    <div
      className="flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide text-center"
      style={{ marginTop: SHEET_ACTION_METRICS.listTopMargin, WebkitOverflowScrolling: "touch" }}
    >
      <ul className="space-y-2 pb-2 mx-auto inline-block text-left w-fit">
        {items.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2">
            <Check
              className="shrink-0 mt-[2px] h-3.5 w-3.5"
              strokeWidth={1.5}
              style={{ color: "var(--foreground)" }}
            />
            <span
              className="text-[11px] leading-[1.55]"
              style={{ color: "var(--foreground)", fontWeight: 400 }}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
