import type { ReactNode } from "react";

/**
 * Mobile-first canvas. We don't fake a phone bezel — instead we constrain the
 * width and keep everything centered so the prototype matches a 375px mini-program.
 */
export function PhoneFrame({
  children,
  bg = "bg-background",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-muted/40 flex justify-center">
      <div
        className={`relative w-full max-w-[420px] min-h-screen ${bg} shadow-[0_0_60px_-30px_rgba(1,70,185,0.25)] overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}