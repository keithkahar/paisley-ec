import type { ReactNode } from "react";
import { Search, Lock, Sparkles, Inbox } from "lucide-react";

/** myWordie design-system kit — reusable bits shared across mywordie/* routes. */

export type WordStatus = "new" | "learning" | "review" | "mastered" | "difficult" | "favorite";

const STATUS_META: Record<WordStatus, { label: string; color: string }> = {
  new: { label: "New", color: "oklch(0.66 0.24 280)" },
  learning: { label: "Learning", color: "oklch(0.7 0.18 195)" },
  review: { label: "Review", color: "oklch(0.68 0.2 145)" },
  mastered: { label: "Mastered", color: "var(--wordie-accent)" },
  difficult: { label: "Tricky", color: "oklch(0.68 0.26 35)" },
  favorite: { label: "Favorite", color: "var(--shirin)" },
};

export function StatusBadge({ status }: { status: WordStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
      style={{
        background: `color-mix(in oklab, ${m.color} 22%, white)`,
        color: `color-mix(in oklab, ${m.color} 70%, black)`,
      }}
    >
      {m.label}
    </span>
  );
}

export function FilterChip({
  active = false,
  onClick,
  children,
  color = "var(--wordie)",
  tone = "solid",
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  color?: string;
  tone?: "solid" | "tint";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold border transition-colors active:scale-95"
      style={
        active
          ? tone === "tint"
            ? {
                background: "transparent",
                color: `color-mix(in oklab, ${color} 70%, black)`,
                borderColor: `color-mix(in oklab, ${color} 70%, black)`,
              }
            : { background: color, color: "white", borderColor: color }
          : { background: "white", color: "var(--foreground)", borderColor: "var(--border)" }
      }
    >
      {children}
    </button>
  );
}

export function ProgressBar({
  value,
  color = "var(--wordie)",
  track = "color-mix(in oklab, var(--wordie) 12%, white)",
  height = 8,
}: {
  value: number;
  color?: string;
  track?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="rounded-full overflow-hidden" style={{ background: track, height }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export type WordItem = {
  word: string;
  ipa?: string;
  meaning: string;
  status: WordStatus;
  progress?: number; // 0..100
};

export function WordRow({
  item,
  onClick,
  right,
}: {
  item: WordItem;
  onClick?: () => void;
  right?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-[15px] truncate" style={{ letterSpacing: "-0.01em" }}>
            {item.word}
          </p>
          {item.ipa && (
            <span className="text-[11px] text-muted-foreground font-medium truncate">/{item.ipa}/</span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground truncate mt-0.5">{item.meaning}</p>
        {typeof item.progress === "number" && (
          <div className="mt-2">
            <ProgressBar value={item.progress} height={4} />
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <StatusBadge status={item.status} />
        {right}
      </div>
    </button>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2 px-1">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
        {children}
      </p>
      {action}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search words",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-white border border-border pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:border-[color:var(--wordie)] transition-colors"
      />
    </div>
  );
}

export function EmptyState({
  icon = <Inbox className="h-7 w-7" />,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12 rounded-3xl bg-white border border-dashed border-border">
      <div
        className="h-14 w-14 rounded-2xl grid place-items-center mb-3"
        style={{
          background: "color-mix(in oklab, var(--wordie) 10%, white)",
          color: "var(--wordie)",
        }}
      >
        {icon}
      </div>
      <p className="font-bold text-[15px]">{title}</p>
      {description && <p className="text-[13px] text-muted-foreground mt-1 max-w-[240px]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LockedCard({
  title,
  description,
  cta = "Unlock with Member",
  onClick,
}: {
  title: string;
  description?: string;
  cta?: string;
  onClick?: () => void;
}) {
  return (
    <div className="rounded-3xl p-5 bg-white border border-border relative overflow-hidden">
      <div className="flex items-start gap-3">
        <div
          className="h-11 w-11 rounded-2xl grid place-items-center shrink-0"
          style={{
            background: "color-mix(in oklab, var(--wordie-accent) 18%, white)",
            color: "var(--wordie-accent)",
          }}
        >
          <Lock className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[14px]">{title}</p>
          {description && <p className="text-[12px] text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 w-full rounded-full py-2.5 text-[13px] font-bold text-white active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
        style={{ background: "var(--wordie-accent)" }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {cta}
      </button>
    </div>
  );
}

export function StatTile({
  label,
  value,
  color = "var(--wordie)",
}: {
  label: string;
  value: ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-border px-3 py-3 text-center">
      <p className="text-[20px] font-bold leading-none" style={{ color, fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}

/** Shared mock vocabulary used across prototype pages. */
export const MOCK_WORDS: WordItem[] = [
  { word: "garden", ipa: "ˈɡɑːdən", meaning: "an area for plants", status: "mastered", progress: 100 },
  { word: "whisper", ipa: "ˈwɪspər", meaning: "speak very softly", status: "learning", progress: 60 },
  { word: "curious", ipa: "ˈkjʊəriəs", meaning: "eager to know", status: "review", progress: 45 },
  { word: "brave", ipa: "breɪv", meaning: "showing courage", status: "mastered", progress: 100 },
  { word: "puzzle", ipa: "ˈpʌzəl", meaning: "a game to solve", status: "learning", progress: 30 },
  { word: "gentle", ipa: "ˈdʒentl", meaning: "kind and soft", status: "new", progress: 0 },
  { word: "rescue", ipa: "ˈreskjuː", meaning: "save from danger", status: "difficult", progress: 20 },
  { word: "harvest", ipa: "ˈhɑːvɪst", meaning: "gather crops", status: "review", progress: 55 },
  { word: "marvelous", ipa: "ˈmɑːvələs", meaning: "wonderful", status: "difficult", progress: 15 },
  { word: "kite", ipa: "kaɪt", meaning: "toy that flies", status: "mastered", progress: 100 },
  { word: "thunder", ipa: "ˈθʌndər", meaning: "loud storm sound", status: "learning", progress: 50 },
  { word: "vacation", ipa: "vəˈkeɪʃən", meaning: "a holiday trip", status: "favorite", progress: 80 },
];