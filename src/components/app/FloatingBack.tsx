import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * Reusable circular back button that floats over the top-left of a hero
 * area. Use for screens where a full AppHeader bar would visually compete
 * with the hero content (avatar, big illustration, branded card, etc.).
 */
export function FloatingBack({
  to = "/",
  label = "Back",
}: {
  to?: string;
  label?: string;
}) {
  return (
    <div className="absolute top-4 left-4 z-30">
      <Link
        to={to}
        aria-label={label}
        className="h-9 w-9 grid place-items-center rounded-full bg-white border border-border shadow-sm active:scale-95 transition-transform"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>
    </div>
  );
}