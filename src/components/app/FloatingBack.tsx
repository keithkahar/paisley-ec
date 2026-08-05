import { Link } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";

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
  icon = "back",
}: {
  to?: string;
  label?: string;
  icon?: "back" | "close";
}) {
  const Icon = icon === "close" ? X : ChevronLeft;
  return (
    <div className="sticky top-0 z-30 h-0 pb-[5px]">
      <Link
        to={to}
        aria-label={label}
        className="absolute left-4 h-8 w-8 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform"
        style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
      >
        <Icon className="h-4 w-4" strokeWidth={2.5} style={{ color: "#0F172A" }} />
      </Link>
    </div>
  );
}
