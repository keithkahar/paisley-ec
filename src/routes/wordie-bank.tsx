import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useMemo, useState } from "react";
import { Search, X, ChevronRight, ChevronDown, Volume2, Check, Circle } from "lucide-react";
import {
  FilterChip,
  EmptyState,
  StatusBadge,
  type WordStatus,
} from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-bank")({
  head: () => ({ meta: [{ title: "Wordie Bank — Paisley EC" }] }),
  component: WordieBankPage,
});

type FilterKey = "all" | WordStatus | "focus" | "relearning";

type BankWord = {
  wordId: string;
  word: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  pronunciation: string;
  cefrLevel: string;
  theme: string;
  packTitle: string;
  status: WordStatus;
  focus: boolean;
  nextReviewLabel: string;
};

const BANK: BankWord[] = [
  { wordId: "w1", word: "dog", definitionEn: "a friendly pet animal", exampleSentence: "The dog runs in the garden.", partOfSpeech: "noun", pronunciation: "/dɒɡ/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "mastered", focus: false, nextReviewLabel: "In 7 days" },
  { wordId: "w2", word: "cat", definitionEn: "a small furry pet", exampleSentence: "The cat sleeps on the chair.", partOfSpeech: "noun", pronunciation: "/kæt/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "learning", focus: true, nextReviewLabel: "Today" },
  { wordId: "w3", word: "bird", definitionEn: "an animal that can fly", exampleSentence: "A bird sings in the tree.", partOfSpeech: "noun", pronunciation: "/bɜːd/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w4", word: "fish", definitionEn: "an animal that lives in water", exampleSentence: "The fish swims fast.", partOfSpeech: "noun", pronunciation: "/fɪʃ/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "review", focus: false, nextReviewLabel: "Tomorrow" },
  { wordId: "w5", word: "rabbit", definitionEn: "a small animal with long ears", exampleSentence: "The rabbit eats a carrot.", partOfSpeech: "noun", pronunciation: "/ˈræbɪt/", cefrLevel: "A1", theme: "Animals", packTitle: "Animal Friends", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w6", word: "book", definitionEn: "pages you can read", exampleSentence: "I read a book at night.", partOfSpeech: "noun", pronunciation: "/bʊk/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "learning", focus: false, nextReviewLabel: "Today" },
  { wordId: "w7", word: "chair", definitionEn: "a seat for one person", exampleSentence: "She sits on the chair.", partOfSpeech: "noun", pronunciation: "/tʃeə/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "new", focus: false, nextReviewLabel: "Not started" },
  { wordId: "w8", word: "pencil", definitionEn: "a tool you write with", exampleSentence: "I draw with a pencil.", partOfSpeech: "noun", pronunciation: "/ˈpensl/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "mastered", focus: false, nextReviewLabel: "In 14 days" },
  { wordId: "w9", word: "window", definitionEn: "an opening in a wall with glass", exampleSentence: "Open the window please.", partOfSpeech: "noun", pronunciation: "/ˈwɪndəʊ/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "review", focus: true, nextReviewLabel: "Today" },
  { wordId: "w10", word: "teacher", definitionEn: "a person who teaches", exampleSentence: "Our teacher is kind.", partOfSpeech: "noun", pronunciation: "/ˈtiːtʃə/", cefrLevel: "A1", theme: "Daily Life", packTitle: "Home and School", status: "learning", focus: false, nextReviewLabel: "Tomorrow" },
];

const STATUS_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "review", label: "Review" },
  { key: "focus", label: "Focus" },
  { key: "mastered", label: "Mastered" },
  { key: "relearning", label: "Relearning" },
];

const FILTER_COLOR: Partial<Record<FilterKey, string>> = {
  all: "var(--wordie)",
  new: "oklch(0.66 0.24 280)",
  learning: "oklch(0.7 0.18 195)",
  review: "oklch(0.68 0.2 145)",
  focus: "oklch(0.75 0.12 305)",
  mastered: "var(--wordie-accent)",
  relearning: "oklch(0.8 0.1 350)",
};

function WordieBankPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [levelSel, setLevelSel] = useState<string[]>([]);
  const [categorySel, setCategorySel] = useState<string[]>([]);
  const [statusSel, setStatusSel] = useState<string[]>([]);
  const [openSheet, setOpenSheet] = useState<null | "level" | "category" | "status">(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchOpen, setBatchOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [words, setWords] = useState<BankWord[]>(BANK);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: words.length, focus: 0 };
    for (const w of words) {
      c[w.status] = (c[w.status] ?? 0) + 1;
      if (w.focus) c.focus += 1;
    }
    return c;
  }, [words]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "focus" ? w.focus : w.status === filter);
      if (!matchesFilter) return false;
      if (levelSel.length > 0 && !levelSel.includes(w.cefrLevel)) return false;
      if (categorySel.length > 0 && !categorySel.includes(w.theme)) return false;
      if (statusSel.length > 0) {
        const hit =
          statusSel.includes(w.status) ||
          (w.focus && statusSel.includes("focus"));
        if (!hit) return false;
      }
      if (!q) return true;
      return [
        w.word, w.definitionEn, w.exampleSentence, w.partOfSpeech,
        w.theme, w.cefrLevel, w.status, w.focus ? "focus" : "", w.packTitle,
      ].some((s) => s.toLowerCase().includes(q));
    });
  }, [words, query, filter, levelSel, categorySel, statusSel]);

  const levelOptions = useMemo(() => {
    const map = new Map<string, number>();
    words.forEach((w) => map.set(w.cefrLevel, (map.get(w.cefrLevel) ?? 0) + 1));
    return Array.from(map.entries()).sort();
  }, [words]);
  const categoryOptions = useMemo(() => {
    const map = new Map<string, number>();
    words.forEach((w) => map.set(w.theme, (map.get(w.theme) ?? 0) + 1));
    return Array.from(map.entries()).sort();
  }, [words]);
  const statusOptions: { key: string; label: string }[] = [
    { key: "new", label: "New" },
    { key: "learning", label: "Learning" },
    { key: "review", label: "Review" },
    { key: "focus", label: "Focus" },
    { key: "mastered", label: "Mastered" },
    { key: "relearning", label: "Relearning" },
  ];

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectAll = () => {
    const next = new Set(selected);
    for (const w of filtered) next.add(w.wordId);
    setSelected(next);
  };

  const clearFilters = () => {
    setQuery("");
    setFilter("all");
    setLevelSel([]);
    setCategorySel([]);
    setStatusSel([]);
  };

  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
    setBatchOpen(false);
  };

  const applyUpdate = (updater: (w: BankWord) => BankWord, msg: string) => {
    setWords((prev) => prev.map((w) => (selected.has(w.wordId) ? updater(w) : w)));
    showToast(msg);
    exitSelect();
  };

  const addToFocus = () => applyUpdate((w) => ({ ...w, focus: true }), "Added to Focus");
  const moveToReview = () =>
    applyUpdate((w) => ({ ...w, status: "review", nextReviewLabel: "Today" }), "Moved to Review");
  const resetProgress = () => {
    applyUpdate(
      (w) => ({ ...w, status: "new", focus: false, nextReviewLabel: "Not started" }),
      "Progress Reset",
    );
    setResetConfirm(false);
  };

  const openBatch = () => {
    if (selected.size === 0) {
      showToast("Select cards first");
      return;
    }
    setBatchOpen(true);
  };

  const selectedSummary = `${selected.size} selected`;
  const hasFilters =
    query.trim() !== "" ||
    filter !== "all" ||
    levelSel.length > 0 ||
    categorySel.length > 0 ||
    statusSel.length > 0;

  const labelFor = (sel: string[], lookup?: (k: string) => string) => {
    if (sel.length === 0) return "All";
    if (sel.length === 1) return lookup ? lookup(sel[0]) : sel[0];
    return `${sel.length} sel.`;
  };
  const statusLabelLookup = (k: string) =>
    statusOptions.find((o) => o.key === k)?.label ?? k;

  const toggleIn = (
    sel: string[],
    setter: (v: string[]) => void,
    value: string,
  ) => {
    if (sel.includes(value)) setter(sel.filter((v) => v !== value));
    else setter([...sel, value]);
  };

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader title="" back="/mywordie" bg="transparent" />

      <div className="px-5 pb-10">
        {/* Toolbar: Select / Done · Preview */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold"
            style={{ color: selectMode ? "var(--wordie)" : "var(--foreground)" }}
          >
            {selectMode ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            {selectMode ? "Done" : "Select"}
          </button>
          {selectMode ? (
            <button
              type="button"
              onClick={openBatch}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold"
              style={{ color: "var(--wordie)" }}
            >
              {selectedSummary} •••
            </button>
          ) : (
            <button
              type="button"
              onClick={() => filtered.length > 0 && setPreviewIdx(0)}
              className="text-[13px] font-bold"
              style={{ color: "var(--wordie)" }}
            >
              Preview
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mt-3">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--paisley)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search word, definition, level, category, status"
              className="w-full rounded-full pl-10 pr-4 py-2.5 text-sm font-medium outline-none transition-colors"
              style={{
                background: "color-mix(in oklab, var(--paisley) 10%, white)",
                border: "1px solid color-mix(in oklab, var(--paisley) 25%, white)",
                color: "var(--foreground)",
              }}
            />
          </div>
        </div>

        {/* Level / Category / Status — paisley filter pills (multi-select) */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <FilterDropdown
            label="Level"
            value={labelFor(levelSel)}
            active={levelSel.length > 0}
            onClick={() => setOpenSheet("level")}
          />
          <FilterDropdown
            label="Category"
            value={labelFor(categorySel)}
            active={categorySel.length > 0}
            onClick={() => setOpenSheet("category")}
          />
          <FilterDropdown
            label="Status"
            value={labelFor(statusSel, statusLabelLookup)}
            active={statusSel.length > 0}
            onClick={() => setOpenSheet("status")}
          />
        </div>

        {/* Filter chips (Status incl. Focus) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              active={filter === f.key}
              onClick={() => setFilter(f.key)}
              color={FILTER_COLOR[f.key] ?? "var(--wordie)"}
              tone="tint"
            >
              {f.label}
              <span className="ml-1.5 opacity-70">{counts[f.key] ?? 0}</span>
            </FilterChip>
          ))}
        </div>

        {/* Count row */}
        <div className="mt-3 flex items-center justify-between text-[12px] font-bold">
          <span className="text-muted-foreground">{filtered.length} cards</span>
          <div className="flex items-center gap-3">
            {selectMode && (
              <button
                type="button"
                onClick={selectAll}
                style={{ color: "var(--wordie)" }}
              >
                Select All
              </button>
            )}
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="text-muted-foreground">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="mt-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Search className="h-7 w-7" />}
              title={query ? "No matches" : "Nothing here"}
              description={
                query
                  ? `We couldn't find "${query}". Try a different word.`
                  : "Try clearing your filters."
              }
            />
          ) : (
            <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {filtered.map((w) => {
                const isSel = selected.has(w.wordId);
                return (
                  <button
                    key={w.wordId}
                    type="button"
                    onClick={() => {
                      if (selectMode) toggleSelect(w.wordId);
                      else setPreviewIdx(filtered.findIndex((x) => x.wordId === w.wordId));
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
                  >
                    {selectMode && (
                      <div
                        className="h-5 w-5 rounded-full border-2 grid place-items-center shrink-0"
                        style={{
                          borderColor: isSel ? "var(--wordie)" : "var(--border)",
                          background: isSel ? "var(--wordie)" : "transparent",
                          color: "white",
                        }}
                      >
                        {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-semibold text-[16px] truncate leading-tight"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                      >
                        {capitalize(w.word)}
                      </p>
                      <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                        {w.definitionEn}
                      </p>
                      <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                        <span
                          className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                          style={{
                            background: "color-mix(in oklab, var(--wordie) 12%, white)",
                            color: "var(--wordie)",
                          }}
                        >
                          {capitalize(w.partOfSpeech)}
                        </span>
                        <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-muted text-muted-foreground">
                          {w.cefrLevel}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-center">
                      <StatusBadge status={w.status} />
                      {!selectMode && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Batch sheet */}
      {batchOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setBatchOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--wordie)" }}
              >
                Batch Actions
              </p>
              <button
                type="button"
                onClick={() => setBatchOpen(false)}
                className="text-[13px] font-bold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground text-center mb-4 shrink-0">
              {selectedSummary}
            </p>
            <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-2">
              <SheetBtn label="Preview" onClick={() => { setBatchOpen(false); setPreviewIdx(0); }} />
              <SheetBtn label="Add to Focus" onClick={addToFocus} />
              <SheetBtn label="Move to Review" onClick={moveToReview} />
              <SheetBtn label="Reset Progress" danger onClick={() => { setBatchOpen(false); setResetConfirm(true); }} />
              <SheetBtn label="Cancel" muted onClick={() => setBatchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Filter sheets */}
      {openSheet && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setOpenSheet(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "62vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber */}
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--wordie)" }}
              >
                {openSheet === "level"
                  ? "Choose Level"
                  : openSheet === "category"
                    ? "Choose Category"
                    : "Choose Status"}
              </p>
              <button
                type="button"
                onClick={() => setOpenSheet(null)}
                className="text-[13px] font-bold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-8 divide-y divide-border">
              {openSheet === "level" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={levelSel.length === 0}
                    onClick={() => setLevelSel([])}
                  />
                  {levelOptions.map(([k, n]) => (
                    <SheetRow
                      key={k}
                      label={`${k} (${n})`}
                      active={levelSel.includes(k)}
                      onClick={() => toggleIn(levelSel, setLevelSel, k)}
                    />
                  ))}
                </>
              )}
              {openSheet === "category" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={categorySel.length === 0}
                    onClick={() => setCategorySel([])}
                  />
                  {categoryOptions.map(([k, n]) => (
                    <SheetRow
                      key={k}
                      label={`${k} (${n})`}
                      active={categorySel.includes(k)}
                      onClick={() => toggleIn(categorySel, setCategorySel, k)}
                    />
                  ))}
                </>
              )}
              {openSheet === "status" && (
                <>
                  <SheetRow
                    label="Clear all"
                    active={statusSel.length === 0}
                    onClick={() => setStatusSel([])}
                  />
                  {statusOptions.map((s) => (
                    <SheetRow
                      key={s.key}
                      label={s.label}
                      active={statusSel.includes(s.key)}
                      onClick={() => toggleIn(statusSel, setStatusSel, s.key)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset confirm */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center px-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setResetConfirm(false)} />
          <div className="relative w-full max-w-[360px] bg-white rounded-2xl p-5 text-center">
            <p className="font-bold text-[15px]">Reset Progress?</p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Selected cards will become New again.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="rounded-full py-2.5 text-[13px] font-bold bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-full py-2.5 text-[13px] font-bold text-white"
                style={{ background: "#E64A4A" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen preview */}
      {previewIdx !== null && filtered[previewIdx] && (
        <PreviewFull
          word={filtered[previewIdx]}
          index={previewIdx}
          total={filtered.length}
          onClose={() => setPreviewIdx(null)}
          onPrev={() => setPreviewIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setPreviewIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i))
          }
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 bottom-10 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-bold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}

function FilterDropdown({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-between gap-1 rounded-full pl-3.5 pr-2.5 py-2 active:scale-[0.97] transition-transform"
      style={
        active
          ? {
              background: "var(--paisley)",
              color: "white",
              border: "1px solid var(--paisley)",
            }
          : {
              background: "color-mix(in oklab, var(--paisley) 10%, white)",
              color: "var(--foreground)",
              border: "1px solid color-mix(in oklab, var(--paisley) 25%, white)",
            }
      }
    >
      <span className="flex items-baseline gap-1 min-w-0">
        <span
          className="text-xs font-bold opacity-70"
        >
          {label}
        </span>
        <span
          className="text-[12px] font-bold truncate"
          style={!active ? { color: "var(--paisley)" } : undefined}
        >
          {value}
        </span>
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80" />
    </button>
  );
}

function SheetRow({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 text-left text-[14px] font-bold"
      style={{ color: active ? "var(--wordie)" : "var(--foreground)" }}
    >
      <span>{label}</span>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SheetBtn({
  label,
  onClick,
  danger,
  muted,
}: {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl py-3 text-[14px] font-bold text-center"
      style={{
        background: muted ? "var(--muted)" : "white",
        color: danger ? "#E64A4A" : muted ? "var(--foreground)" : "var(--wordie)",
        border: muted ? "none" : "1px solid var(--border)",
      }}
    >
      {label}
    </button>
  );
}

function PreviewFull({
  word,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  word: BankWord;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const prevDisabled = index === 0;
  const nextDisabled = index >= total - 1;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[420px] mx-auto">
      <div className="flex items-center justify-between px-5 py-4">
        <button type="button" onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <p className="text-[12px] font-bold text-muted-foreground">
          {index + 1}/{total} cards
        </p>
        <div className="w-5" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Word card — white surface with soft wordie border */}
        <div
          className="rounded-[2rem] p-6 bg-white"
          style={{
            border: "1px solid color-mix(in oklab, var(--wordie) 30%, white)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                style={{
                  background: "color-mix(in oklab, var(--wordie) 12%, white)",
                  color: "var(--wordie)",
                }}
              >
                {capitalize(word.partOfSpeech)}
              </span>
              <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold bg-muted text-muted-foreground">
                {word.cefrLevel}
              </span>
              <StatusBadge status={word.status} />
            </div>
            <button
              type="button"
              className="h-9 w-9 rounded-full grid place-items-center"
              style={{ background: "var(--wordie)", color: "white" }}
              aria-label="Listen"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 text-center">
            <h2
              className="font-semibold text-[40px] leading-none"
              style={{
                color: "var(--wordie)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {capitalize(word.word)}
            </h2>
            <p className="text-[13px] text-muted-foreground mt-2 font-mono">
              {word.pronunciation}
            </p>
          </div>

          {/* Definition + Word in use — both left-aligned */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Definition
              </p>
              <p
                className="mt-1.5 text-[17px] font-bold leading-snug text-foreground"
                style={{ letterSpacing: "-0.01em" }}
              >
                {word.definitionEn}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Word in use
              </p>
              <p
                className="mt-1.5 text-[17px] font-bold leading-snug text-foreground"
                style={{ letterSpacing: "-0.01em" }}
              >
                "{renderExample(word.exampleSentence, word.word)}"
              </p>
            </div>
          </div>

          {/* Three pills below example */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <MiniStat label="Status" value={capitalize(word.status)} />
            <MiniStat label="Level" value={word.cefrLevel} />
            <MiniStat label="Next" value={word.nextReviewLabel} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-4 border-t border-border">
        <button
          type="button"
          onClick={onPrev}
          disabled={prevDisabled}
          className="text-[13px] font-bold disabled:opacity-30"
          style={{ color: "var(--wordie)" }}
        >
          Previous
        </button>
        <span className="text-[12px] font-bold text-muted-foreground">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="text-[13px] font-bold disabled:opacity-30"
          style={{ color: "var(--wordie)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl px-3 py-2 text-center"
      style={{ background: "color-mix(in oklab, var(--wordie) 10%, white)" }}
    >
      <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p
        className="text-[12px] font-bold mt-0.5 truncate"
        style={{ color: "var(--wordie)" }}
      >
        {value}
      </p>
    </div>
  );
}
