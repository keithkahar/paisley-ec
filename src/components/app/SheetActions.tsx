import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";

/**
 * 全局上拉菜单按钮执行标准 (GLOBAL SHEET BUTTON EXECUTION STANDARD v1)
 *
 * Single source of truth. All vertical positioning is anchored to the BOTTOM
 * edge of the white sheet panel, never to a fixed column height, so buttons are
 * pixel-identical on every device and in every sheet.
 *
 *  primary height ................ 48px, full-round, 14px semibold white
 *  primary side inset ............ 20px
 *  primary-only:  primary bottom -> panel bottom ....... 32px
 *  with secondary: secondary bottom -> panel bottom .... 32px
 *                  secondary height ................... 22px (14px regular)
 *                  gap primary <-> secondary .......... 12px
 *                  => primary bottom -> panel bottom .. 66px
 *  minimum gap between content and the button area ..... 20px
 *
 * Do NOT override these four numbers (48 / 12 / 22 / 32) anywhere else, and do
 * NOT add per-sheet pb-* or fixed column heights for button positioning.
 */
export const SHEET_ACTION_METRICS = {
  /** Top margin of the column (Tailwind mt-5). */
  bodyTopMargin: 20,
  cardRadius: 28,
  cardPadding: 20,
  /** Minimum whitespace between content and the button area. */
  minContentGap: 20,
  primaryHeight: 50,
  primaryFontSize: 14,
  /** Gap between the primary and the secondary (text-only) button. */
  secondaryGap: 12,
  secondaryHeight: 22,
  secondaryFontSize: 14,
  /** Button area bottom edge -> panel bottom edge. */
  bottomInset: 32,
  sideInset: 20,
  /** Top margin of the subtitle line inside the card. */
  subtitleTopMargin: 10,
  /** Top margin of the benefit list inside the card. */
  listTopMargin: 70,
} as const;

/** Height of the button block itself (excluding the bottom inset). */
export function sheetActionAreaHeight(hasSecondary: boolean) {
  const m = SHEET_ACTION_METRICS;
  return hasSecondary
    ? m.primaryHeight + m.secondaryGap + m.secondaryHeight
    : m.primaryHeight;
}

/**
 * In-flow space the content must give up. StandardSheet already pads the
 * content box by 32px (= bottomInset), so the reserve is the button block plus
 * the minimum content gap.
 */
export function sheetContentReserve(hasSecondary: boolean) {
  return sheetActionAreaHeight(hasSecondary) + SHEET_ACTION_METRICS.minContentGap;
}

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
      style={{ marginTop: SHEET_ACTION_METRICS.bodyTopMargin }}
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
  const hasSecondary = Boolean(secondary);
  return (
    <>
      {/* In-flow reserve so content never sits under the pinned buttons. */}
      <div className="shrink-0" aria-hidden="true" style={{ height: sheetContentReserve(hasSecondary) }} />
      {/* Pinned to the sheet panel bottom — the locked standard. */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: SHEET_ACTION_METRICS.bottomInset,
          paddingLeft: SHEET_ACTION_METRICS.sideInset,
          paddingRight: SHEET_ACTION_METRICS.sideInset,
        }}
      >
        <button
          type="button"
          disabled={primary.disabled}
          onClick={primary.onClick}
          className="w-full rounded-full font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
          style={{
            height: SHEET_ACTION_METRICS.primaryHeight,
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
              height: SHEET_ACTION_METRICS.secondaryHeight,
              lineHeight: `${SHEET_ACTION_METRICS.secondaryHeight}px`,
              fontSize: SHEET_ACTION_METRICS.secondaryFontSize,
              color: "var(--muted-foreground)",
            }}
          >
            {secondary.label}
          </button>
        )}
      </div>
    </>
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
