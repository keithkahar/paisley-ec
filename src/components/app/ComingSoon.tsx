import { PhoneFrame } from "./PhoneFrame";
import { AppHeader } from "./AppHeader";
import { Hammer } from "lucide-react";

export function ComingSoon({
  title,
  note,
  back = "/",
  bg = "bg-background",
  accent = "var(--paisley)",
}: {
  title: string;
  note?: string;
  back?: string;
  bg?: string;
  accent?: string;
}) {
  return (
    <PhoneFrame bg={bg}>
      <AppHeader title={title} back={back} />
      <div className="px-6 py-16 text-center">
        <div
          className="mx-auto h-20 w-20 rounded-3xl grid place-items-center text-white shadow-lg"
          style={{ background: accent }}
        >
          <Hammer className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-[18rem] mx-auto">
          {note ?? "This screen is part of the next design wave. The structure is in place — visuals coming next."}
        </p>
      </div>
    </PhoneFrame>
  );
}