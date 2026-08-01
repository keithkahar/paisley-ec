import { ReactNode, createContext, useContext, useEffect } from "react";

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

/**
 * Total vertical space a bottom action occupies measured from the bottom edge,
 * plus breathing room. Any scroll container that sits behind a BottomAction
 * must reserve this much padding-bottom so content is never covered.
 */
export const BOTTOM_ACTION_RESERVE =
  BOTTOM_ACTION_HEIGHT + BOTTOM_ACTION_CLEARANCE + 16;

/**
 * Containers (e.g. StandardSheet) provide this so any BottomAction rendered
 * inside them auto-reserves the space it covers — no per-call-site padding.
 */
export const BottomActionReserveContext = createContext<
  ((present: boolean) => void) | null
>(null);

export function BottomAction({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reserve = useContext(BottomActionReserveContext);
  useEffect(() => {
    if (!reserve) return;
    reserve(true);
    return () => reserve(false);
  }, [reserve]);

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
