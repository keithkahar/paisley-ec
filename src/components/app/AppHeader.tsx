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
      className="sticky top-0 z-30 px-4 pt-3 pb-3 flex items-center gap-2"
      style={{ background: bg, color: tone }}
    >
      {back !== false ? (
        <Link
          to={back}
          className="h-9 w-9 grid place-items-center rounded-full bg-white/80 backdrop-blur border border-border"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <span className="h-9 w-9" />
      )}
      <h1 className="flex-1 text-center text-base font-medium truncate">{title}</h1>
      <div className="min-w-9 h-9 flex items-center justify-end">{right}</div>
    </header>
  );
}