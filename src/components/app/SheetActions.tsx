import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";

/**
 * Single source of truth for the global bottom-sheet action layout.
 * Every sheet with a primary (+ optional secondary) button must use these
 * values so button height and vertical position stay pixel-identical.
 */
export const SHEET_ACTION_METRICS = {
  /** Fixed height of the content card + actions column. */
  bodyHeight: 385,
  /** Top margin of the column (Tailwind mt-5). */
  bodyTopMargin: 20,
  cardRadius: 28,
  cardPadding: 20,
  /** Gap between the content card and the primary button. */
  primaryGap: 20,
  primaryHeight: 48,
  primaryFontSize: 14,
  /** Gap between the primary and the secondary (text-only) button. */
  secondaryGap: 12,
  secondaryFontSize: 14,
  /** Top margin of the subtitle line inside the card. */
  subtitleTopMargin: 10,
  /** Top margin of the benefit list inside the card. */
  listTopMargin: 70,
} as const;

const PAISLEY = "var(--paisley)";

/** Fixed-height column: white content card on top, action buttons below. */
export function SheetActionBody({
  children,
  cardStyle,
  cardClassName = "",
  primary,
  secondary,
}: {
  children?: ReactNode;
  cardStyle?: CSSProperties;
  cardClassName?: string;
  primary: SheetPrimaryProps;
  secondary?: SheetSecondaryProps;
}) {
  return (
    <div
      className="flex flex-col h-full min-h-0"
      style={{ height: SHEET_ACTION_METRICS.bodyHeight, marginTop: SHEET_ACTION_METRICS.bodyTopMargin }}
    >
      <div
        className={`flex-1 min-h-0 flex flex-col ${cardClassName}`}
        style={{
          background: "white",
          borderRadius: SHEET_ACTION_METRICS.cardRadius,
          padding: SHEET_ACTION_METRICS.cardPadding,
          ...cardStyle,
        }}
      >
        {children}
      </div>
      <SheetActions primary={primary} secondary={secondary} />
    </div>
  );
}

export type SheetPrimaryProps = {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  background?: string;
};

export type SheetSecondaryProps = {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

/** Primary pill + optional secondary text button, at the standard offsets. */
export function SheetActions({
  primary,
  secondary,
}: {
  primary: SheetPrimaryProps;
  secondary?: SheetSecondaryProps;
}) {
  return (
    <div
      className="shrink-0"
      style={{ height: SHEET_ACTION_METRICS.primaryHeight, marginTop: SHEET_ACTION_METRICS.primaryGap }}
    >
      <button
        type="button"
        disabled={primary.disabled}
        onClick={primary.onClick}
        className="w-full h-full rounded-full font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
        style={{
          background: primary.background ?? PAISLEY,
          fontSize: SHEET_ACTION_METRICS.primaryFontSize,
        }}
      >
        {primary.label}
      </button>
      {secondary && (
        <button
          type="button"
          disabled={secondary.disabled}
          onClick={secondary.onClick}
          className="w-full font-normal text-center bg-transparent border-0 p-0 disabled:opacity-60"
          style={{
            marginTop: SHEET_ACTION_METRICS.secondaryGap,
            fontSize: SHEET_ACTION_METRICS.secondaryFontSize,
            color: "var(--muted-foreground)",
          }}
        >
          {secondary.label}
        </button>
      )}
    </div>
  );
}

/** Brand-blue subtitle line inside the card (pass empty for a spacer). */
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
