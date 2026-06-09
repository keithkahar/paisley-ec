import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useMemo, useState } from "react";
import { Search, X, ChevronRight, Volume2, Copy, Check, Circle } from "lucide-react";
import {
  FilterChip,
  SearchBar,
  EmptyState,
  StatusBadge,
  type WordStatus,
} from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-bank")({
  head: () => ({ meta: [{ title: "Wordie Bank — Paisley EC" }] }),
  component: WordieBankPage,
});

type FilterKey = "all" | WordStatus | "focus";

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
];

function WordieBankPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
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
      if (!q) return true;
      return [
        w.word, w.definitionEn, w.exampleSentence, w.partOfSpeech,
        w.theme, w.cefrLevel, w.status, w.focus ? "focus" : "", w.packTitle,
      ].some((s) => s.toLowerCase().includes(q));
    });
  }, [words, query, filter]);

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
  const hasFilters = query.trim() !== "" || filter !== "all";

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader title="" back="/mywordie" bg="white" />

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
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search word, definition, topic, level, status"
          />
        </div>

        {/* Filter chips (Status incl. Focus) */}
        <div className="mt-3 -mx-5 px-5 overflow-x-auto scroll-hide">
          <div className="flex gap-2 w-max">
            {STATUS_FILTERS.map((f) => (
              <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
                <span className="ml-1.5 opacity-70">{counts[f.key] ?? 0}</span>
              </FilterChip>
            ))}
          </div>
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
            <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
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
                      <p className="font-bold text-[15px] truncate" style={{ letterSpacing: "-0.01em" }}>
                        {w.word}
                      </p>
                      <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                        {w.definitionEn}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-muted text-muted-foreground">
                          {w.partOfSpeech}
                        </span>
                        <span
                          className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                          style={{
                            background: "color-mix(in oklab, var(--wordie) 12%, white)",
                            color: "var(--wordie)",
                          }}
                        >
                          {w.cefrLevel}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StatusBadge status={w.status} />
                      {!selectMode && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
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
        <div className="absolute inset-0 z-40 flex items-end" onClick={() => setBatchOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full bg-white rounded-t-3xl p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[13px] font-bold text-muted-foreground text-center mb-3">
              {selectedSummary}
            </p>
            <div className="space-y-2">
              <SheetBtn label="Preview" onClick={() => { setBatchOpen(false); setPreviewIdx(0); }} />
              <SheetBtn label="Add to Focus" onClick={addToFocus} />
              <SheetBtn label="Move to Review" onClick={moveToReview} />
              <SheetBtn label="Reset Progress" danger onClick={() => { setBatchOpen(false); setResetConfirm(true); }} />
              <SheetBtn label="Cancel" muted onClick={() => setBatchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Reset confirm */}
      {resetConfirm && (
        <div className="absolute inset-0 z-50 grid place-items-center px-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setResetConfirm(false)} />
          <div className="relative w-full bg-white rounded-2xl p-5 text-center">
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
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-bold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
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
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button type="button" onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <p className="text-[12px] font-bold text-muted-foreground">
          {index + 1}/{total} cards
        </p>
        <div className="w-5" />
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-muted text-muted-foreground">
            {word.partOfSpeech}
          </span>
          <button type="button" className="text-muted-foreground" aria-label="Copy">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        <h2 className="mt-2 font-bold text-[36px] leading-tight" style={{ letterSpacing: "-0.02em" }}>
          {word.word}
        </h2>
        <p className="text-[13px] text-muted-foreground mt-1">{word.pronunciation}</p>

        <Section title="Definition">{word.definitionEn}</Section>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <MiniStat label="Status" value={word.status} />
          <MiniStat label="Level" value={word.cefrLevel} />
          <MiniStat label="Next" value={word.nextReviewLabel} />
        </div>
        <Section title="Example">{word.exampleSentence}</Section>
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
        <button
          type="button"
          className="h-10 w-10 rounded-full grid place-items-center"
          style={{ background: "color-mix(in oklab, var(--wordie) 12%, white)", color: "var(--wordie)" }}
          aria-label="Play"
        >
          <Volume2 className="h-4 w-4" />
        </button>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="text-[14px] mt-1 leading-relaxed">{children}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/50 px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-[12px] font-bold mt-0.5 capitalize truncate">{value}</p>
    </div>
  );
}
