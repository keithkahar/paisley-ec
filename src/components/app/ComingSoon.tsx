import { PhoneFrame } from "./PhoneFrame";
import { AppHeader } from "./AppHeader";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

export function ComingSoon({
  title,
  note,
  back = "/",
  bg = "bg-background",
  accent = "var(--paisley)",
  icon: Icon = Sparkles,
  cta,
}: {
  title: string;
  note?: string;
  back?: string;
  bg?: string;
  accent?: string;
  icon?: ComponentType<{ className?: string }>;
  cta?: ReactNode;
}) {
  return (
    <PhoneFrame bg={bg}>
      <AppHeader title={title} back={back} />
      <div className="px-6 pt-16 pb-12 text-center flex flex-col items-center">
        <div
          className="relative h-24 w-24 rounded-[28px] grid place-items-center text-white shadow-lg"
          style={{ background: accent }}
        >
          <Icon className="h-10 w-10" />
          <span
            className="absolute -top-2 -right-2 rounded-full bg-white border border-border px-2 py-0.5 text-[11px] font-semibold"
            style={{ color: accent }}
          >
            Soon
          </span>
        </div>
        <h2 className="mt-6 text-2xl font-medium" style={{ color: accent }}>
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-[18rem]">
          {note ?? "We're putting the finishing touches here. Check back soon!"}
        </p>
        <div className="mt-8">
          {cta ?? (
            <Link
              to={back}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: accent }}
            >
              Got it
            </Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}