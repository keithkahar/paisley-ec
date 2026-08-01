import { ReactNode } from "react";

/**
 * Global bottom action bar.
 * Every page/sheet primary CTA that lives at the bottom of the screen
 * (roughly at the tab-bar line) renders through this wrapper.
 *
 * Standard: button height 49px, button top = 696px on a 393x838 screen,
 * implemented as a fixed 93px clearance from the bottom edge.
 * Extras (error text, secondary link) can be placed inside with
 * `absolute bottom-full` / `absolute top-full`.
 */
export const BOTTOM_ACTION_HEIGHT = 49;
export const BOTTOM_ACTION_CLEARANCE = 93;

export function BottomAction({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-[93px] z-[45] w-full max-w-[420px] px-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** Spacer to keep scrollable content clear of the fixed bottom action. */
export function BottomActionSpacer() {
  return <div className="shrink-0 h-[132px]" aria-hidden />;
}
