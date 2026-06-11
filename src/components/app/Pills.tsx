import type { ReactNode } from "react";
import { Flame, Sparkles } from "lucide-react";

export function Pill({
  children,
  color = "var(--paisley)",
  icon,
}: {
  children: ReactNode;
  color?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: `color-mix(in oklab, ${color} 14%, white)`,
        color,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

export function BpPill({ value }: { value: number }) {
  return (
    <Pill color="var(--bloxia)" icon={<Sparkles className="h-3.5 w-3.5" />}>
      {value.toLocaleString()} Bp
    </Pill>
  );
}

export function StreakPill({ days }: { days: number }) {
  return (
    <Pill color="var(--wordie-accent)" icon={<Flame className="h-3.5 w-3.5" />}>
      {days}-day streak
    </Pill>
  );
}