import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AppHeader({
  title,
  back = "/",
  right,
  tone = "var(--foreground)",
  bg = "transparent",
}: {
  title: ReactNode;
  back?: string | false;
  right?: ReactNode;
  tone?: string;
  bg?: string;
}) {
  return (
    <header
      className="sticky top-0 z-30 grid h-14 grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3 px-4 pt-[env(safe-area-inset-top)]"
      style={{ background: bg, color: tone }}
    >
      {/* Left: back button or fixed-width spacer to keep title centered */}
      <div className="flex w-full items-center justify-start">
        {back !== false ? (
          <Link
            to={back}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/85 backdrop-blur border border-border shadow-sm active:scale-95 transition-transform"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : null}
      </div>

      {/* Center title */}
      <h1 className="min-w-0 truncate text-center text-lg font-semibold">
        {title}
      </h1>

      {/* Right slot */}
      <div className="flex w-full items-center justify-end">
        {right}
      </div>
    </header>
  );
}
