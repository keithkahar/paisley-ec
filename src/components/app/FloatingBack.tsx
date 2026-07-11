import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * Global back button. Sits sticky at the top of the page so it stays
 * clickable while the user scrolls, and shifts down by the iOS safe-area
 * inset so the notch/Dynamic Island never covers it. Zero layout height —
 * the button floats over page content without pushing anything down.
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
    <div className="sticky top-0 z-30 h-0">
      <Link
        to={to}
        aria-label={label}
        className="absolute left-4 h-9 w-9 grid place-items-center rounded-full bg-white border border-border shadow-sm active:scale-95 transition-transform"
        style={{ top: "calc(0.75rem + env(safe-area-inset-top))" }}
      >
        <ChevronLeft className="h-5 w-5" style={{ color: "#0F172A" }} />
      </Link>
    </div>
  );
}
