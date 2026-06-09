import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  FilterChip,
  MOCK_WORDS,
  ProgressBar,
  SearchBar,
  WordRow,
  EmptyState,
  type WordStatus,
} from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-bank")({
  head: () => ({ meta: [{ title: "Wordie Bank — Paisley EC" }] }),
  component: WordieBankPage,
});

type FilterKey = "all" | WordStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "review", label: "Review" },
  { key: "mastered", label: "Mastered" },
  { key: "difficult", label: "Tricky" },
  { key: "favorite", label: "Favorite" },
];

function WordieBankPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: MOCK_WORDS.length };
    for (const w of MOCK_WORDS) c[w.status] = (c[w.status] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    return MOCK_WORDS.filter((w) => {
      const matchesFilter = filter === "all" || w.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const mastered = counts.mastered ?? 0;
  const total = MOCK_WORDS.length;
  const pct = Math.round((mastered / total) * 100);

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader title="" back="/mywordie" bg="white" />

      <div className="px-5 pb-10">
        {/* Summary strip */}
        <section className="rounded-3xl bg-white border border-border p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                My collection
              </p>
              <p className="font-bold text-[16px] mt-0.5">
                <span style={{ color: "var(--wordie)" }}>{total}</span> words saved
              </p>
            </div>
            <p className="text-[12px] font-bold text-muted-foreground">{pct}% mastered</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={pct} />
          </div>
        </section>

        {/* Search */}
        <div className="mt-4">
          <SearchBar value={query} onChange={setQuery} placeholder="Search words or meaning" />
        </div>

        {/* Filter chips */}
        <div className="mt-3 -mx-5 px-5 overflow-x-auto scroll-hide">
          <div className="flex gap-2 w-max">
            {FILTERS.map((f) => (
              <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
                <span className="ml-1.5 opacity-70">{counts[f.key] ?? 0}</span>
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Word list */}
        <div className="mt-4">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search className="h-7 w-7" />}
              title={query ? "No matches" : "Nothing here yet"}
              description={
                query
                  ? `We couldn't find "${query}". Try a different word.`
                  : "Words you collect will appear in this filter."
              }
            />
          ) : (
            <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
              {filtered.map((w) => (
                <WordRow key={w.word} item={w} />
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Tap a word for details · pull to refresh
        </p>
      </div>
    </PhoneFrame>
  );
}
