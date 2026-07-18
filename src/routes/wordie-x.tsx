import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  X,
} from "lucide-react";
import { StatusBadge, type WordStatus } from "@/components/app/WordieKit";
import { WordPreview } from "@/components/app/WordPreview";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";

export const Route = createFileRoute("/wordie-x")({
  head: () => ({ meta: [
      { title: "WordieX — Paisley EC" },
      { name: "description", content: "Extended word practice with deeper context and examples." },
      { property: "og:title", content: "WordieX — Paisley EC" },
      { property: "og:description", content: "Extended word practice with deeper context and examples." },
    ] }),
  component: WordieXPage,
});

// ---------- Constants ----------
const PART_OF_SPEECH_OPTIONS = [
  "noun", "verb", "adjective", "adverb", "pronoun",
  "preposition", "conjunction", "interjection", "determiner", "numeral",
] as const;

const PROPER_NOUNS = new Set(["China", "English", "Shirin", "Paisley", "Wordie", "Bloxia"]);

const COMMON_POS_MAP: Record<string, string> = {
  hello: "interjection", hi: "interjection", the: "determiner", a: "determiner",
  an: "determiner", i: "pronoun", you: "pronoun", he: "pronoun", she: "pronoun",
  one: "numeral", two: "numeral", three: "numeral",
};

const KNOWN_WORDS: Array<{
  word: string; partOfSpeech: string; cefrLevel: string;
  definitionEn: string; exampleSentence: string; pronunciation: string;
}> = [
  { word: "cat", partOfSpeech: "noun", cefrLevel: "A1",
    definitionEn: "a small furry pet animal that says meow",
    exampleSentence: "My cat likes to sleep on the sofa.", pronunciation: "/kæt/" },
  { word: "run", partOfSpeech: "verb", cefrLevel: "A1",
    definitionEn: "to move very fast on your feet",
    exampleSentence: "I run to school every day.", pronunciation: "/rʌn/" },
  { word: "happy", partOfSpeech: "adjective", cefrLevel: "A1",
    definitionEn: "feeling good and pleased",
    exampleSentence: "She is happy with her gift.", pronunciation: "/ˈhæp.i/" },
];

// ---------- Filters ----------
type LearnStatus = "new" | "learning" | "review" | "mastered" | "relearning";

const SOURCE_OPTIONS: { key: string; label: string }[] = [
  { key: "iAdded", label: "iAdded" },
  { key: "definition", label: "Definition" },
  { key: "example", label: "Example" },
  { key: "shirintalk", label: "ShirinTalk" },
];
const SOURCE_LABEL: Record<string, string> = Object.fromEntries(
  SOURCE_OPTIONS.map((o) => [o.key, o.label]),
);
const getSourceLabel = (s?: string) => (s && SOURCE_LABEL[s]) || "iAdded";

const STATUS_OPTIONS: { key: LearnStatus | "focus"; label: string }[] = [
  { key: "new", label: "New" },
  { key: "learning", label: "Learning" },
  { key: "review", label: "Review" },
  { key: "focus", label: "Focus" },
  { key: "mastered", label: "Mastered" },
  { key: "relearning", label: "Relearning" },
];

const STATUS_COLOR: Record<string, string> = {
  new: "oklch(0.66 0.24 280)",
  learning: "oklch(0.7 0.18 195)",
  review: "oklch(0.68 0.2 145)",
  focus: "oklch(0.75 0.12 305)",
  mastered: "var(--wordie-accent)",
  relearning: "oklch(0.8 0.1 350)",
};

// Words already in Wordie Bank — block duplicates
const BANK_WORDS: Set<string> = new Set([
  "dog", "cat", "bird", "fish", "rabbit",
  "book", "chair", "pencil", "window", "teacher",
]);

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// ---------- Types & storage ----------
type Note = {
  _id: string;
  word: string;
  content: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  cefrLevel: string;
  pronunciation: string;
  source: string;
  targetWordId: string;
  learnStatus: LearnStatus;
  nextReviewLabel: string;
  createdAt: number;
  updatedAt: number;
  isFocus?: boolean;
};

const NOTES_KEY = "pec_my_notes_v4";
const FOCUS_KEY = "pec_user_words_focus_v1";

const SEED_NOTES: Array<Omit<Note, "_id" | "createdAt" | "updatedAt">> = [
  { word: "sunshine", content: "the light and warmth from the sun",
    definitionEn: "the light and warmth from the sun",
    exampleSentence: "We played in the sunshine all afternoon.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈsʌnʃaɪn/",
    source: "definition", targetWordId: "wordie_x_sunshine",
    learnStatus: "new", nextReviewLabel: "Not started", isFocus: false },
  { word: "giggle", content: "to laugh in a soft, silly way",
    definitionEn: "to laugh in a soft, silly way",
    exampleSentence: "The kids giggle when they hear the joke.",
    partOfSpeech: "verb", cefrLevel: "A2", pronunciation: "/ˈɡɪɡ.əl/",
    source: "shirintalk", targetWordId: "wordie_x_giggle",
    learnStatus: "learning", nextReviewLabel: "Today", isFocus: false },
  { word: "puppy", content: "a baby dog",
    definitionEn: "a baby dog",
    exampleSentence: "My puppy loves to chase the ball.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈpʌp.i/",
    source: "example", targetWordId: "wordie_x_puppy",
    learnStatus: "review", nextReviewLabel: "Tomorrow", isFocus: false },
  { word: "rainbow", content: "colorful arc in the sky after rain",
    definitionEn: "colorful arc in the sky after rain",
    exampleSentence: "Look at the rainbow over the hill!",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈreɪn.boʊ/",
    source: "iAdded", targetWordId: "wordie_x_rainbow",
    learnStatus: "mastered", nextReviewLabel: "In 7 days", isFocus: false },
  { word: "butterfly", content: "an insect with big colorful wings",
    definitionEn: "an insect with big colorful wings",
    exampleSentence: "A butterfly landed on the flower.",
    partOfSpeech: "noun", cefrLevel: "A2", pronunciation: "/ˈbʌt.ə.flaɪ/",
    source: "definition", targetWordId: "wordie_x_butterfly",
    learnStatus: "learning", nextReviewLabel: "Today", isFocus: true },
  { word: "adventure", content: "an exciting or unusual experience",
    definitionEn: "an exciting or unusual experience",
    exampleSentence: "Our trip to the forest was a big adventure.",
    partOfSpeech: "noun", cefrLevel: "B1", pronunciation: "/ədˈven.tʃər/",
    source: "shirintalk", targetWordId: "wordie_x_adventure",
    learnStatus: "relearning", nextReviewLabel: "Today", isFocus: false },
];

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Note[];
    const focus = JSON.parse(localStorage.getItem(FOCUS_KEY) || "{}") as Record<string, boolean>;
    return arr.map((n) => ({ ...n, isFocus: !!focus[n.targetWordId || n.word] || !!n.isFocus }));
  } catch { return []; }
}
function saveNotes(arr: Note[]) {
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(arr)); } catch { /* noop */ }
}
function toggleFocusStore(key: string, next: boolean) {
  try {
    const focus = JSON.parse(localStorage.getItem(FOCUS_KEY) || "{}") as Record<string, boolean>;
    if (next) focus[key] = true; else delete focus[key];
    localStorage.setItem(FOCUS_KEY, JSON.stringify(focus));
  } catch { /* noop */ }
}

// ---------- Helpers ----------
function normalizeDraftWord(value: string): string {
  const trimmed = (value || "").trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  if (trimmed === "i") return "I";
  for (const p of PROPER_NOUNS) if (p.toLowerCase() === trimmed.toLowerCase()) return p;
  if (/^[A-Z]{2,}$/.test(trimmed)) return trimmed;
  return trimmed.toLowerCase();
}

function buildFallbackMeta(word: string, partOfSpeech?: string) {
  const key = word.toLowerCase();
  return {
    partOfSpeech: COMMON_POS_MAP[key] || partOfSpeech || "noun",
    cefrLevel: "A1",
    definitionEn: "a word children can learn and use in English",
    exampleSentence: `I can use ${word} in a sentence.`,
    pronunciation: `/${word}/`,
  };
}

function buildSuggestion(word: string): string {
  const n = word.toLowerCase();
  if (!n) return "";
  for (const k of KNOWN_WORDS) {
    const kw = k.word.toLowerCase();
    if (kw === n) return "";
    if (kw[0] === n[0] && Math.abs(kw.length - n.length) <= 2 && kw !== n) return k.word;
  }
  return "";
}

// Map our LearnStatus → WordieKit StatusBadge status
function toBadgeStatus(s: LearnStatus): WordStatus {
  if (s === "relearning") return "learning";
  return s;
}

// ---------- Page ----------
function WordieXPage() {
  const WORDIE = "var(--wordie)";
  const [notes, setNotes] = useState<Note[]>([]);

  // Editor
  const [showEditor, setShowEditor] = useState(false);
  const [draftWord, setDraftWord] = useState("");
  const [normalizedWord, setNormalizedWord] = useState("");
  const [wordSuggestion, setWordSuggestion] = useState("");
  const [posIndex, setPosIndex] = useState(0);
  const [cefr, setCefr] = useState("A1");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Filters
  const [sourceSel, setSourceSel] = useState<string[]>([]);
  const [statusSel, setStatusSel] = useState<string[]>([]);
  const [openSheet, setOpenSheet] = useState<null | "source" | "status" | "pos">(null);

  // Select / preview / batch
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchOpen, setBatchOpen] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Note | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load seed/notes
  useEffect(() => {
    const existing = loadNotes();
    if (existing.length === 0 && typeof window !== "undefined" && !localStorage.getItem(NOTES_KEY)) {
      const now = Date.now();
      const seeded: Note[] = SEED_NOTES.map((n, i) => ({
        ...n,
        _id: n.targetWordId,
        createdAt: now - i * 1000,
        updatedAt: now - i * 1000,
      }));
      // mirror focus seeds into focus store
      seeded.forEach((n) => { if (n.isFocus) toggleFocusStore(n.targetWordId, true); });
      saveNotes(seeded);
      setNotes(seeded);
    } else {
      setNotes(existing);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  // Autofill on word change
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (!normalizedWord) return;
    autoTimer.current = setTimeout(() => {
      const known = KNOWN_WORDS.find((k) => k.word.toLowerCase() === normalizedWord.toLowerCase());
      const meta = known || buildFallbackMeta(normalizedWord);
      setIsAutoFilling(true);
      setPosIndex((idx) => {
        const i = PART_OF_SPEECH_OPTIONS.indexOf(meta.partOfSpeech as typeof PART_OF_SPEECH_OPTIONS[number]);
        return i >= 0 ? i : idx;
      });
      setCefr(meta.cefrLevel);
      setDefinition((d) => d || meta.definitionEn);
      setExample((e) => e || meta.exampleSentence);
      setPronunciation(meta.pronunciation);
      setTimeout(() => setIsAutoFilling(false), 400);
    }, 450);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [normalizedWord]);

  function openNewWord() {
    setShowEditor(true);
    setDraftWord(""); setNormalizedWord(""); setWordSuggestion("");
    setPosIndex(0); setCefr("A1"); setDefinition(""); setExample(""); setPronunciation("");
  }
  function cancelEditor() { setShowEditor(false); }

  function onWordInput(v: string) {
    setDraftWord(v);
    const n = normalizeDraftWord(v);
    setNormalizedWord(n);
    setWordSuggestion(buildSuggestion(n));
  }
  function applyWordSuggestion() {
    if (!wordSuggestion) return;
    setDraftWord(wordSuggestion);
    setNormalizedWord(normalizeDraftWord(wordSuggestion));
    setWordSuggestion("");
  }

  function addWordToWordieX() {
    const word = normalizedWord;
    const def = definition.trim();
    if (!word || !def) { setToast("Add word and example"); return; }
    if (BANK_WORDS.has(word.toLowerCase())) {
      setToast("Already in Wordie Bank");
      return;
    }
    const targetWordId = `wordie_x_${word.toLowerCase()}`;
    const existing = notes.find((n) => n.targetWordId === targetWordId);
    const now = Date.now();
    const note: Note = {
      _id: existing?._id || targetWordId,
      word,
      content: def,
      definitionEn: def,
      exampleSentence: example.trim(),
      partOfSpeech: PART_OF_SPEECH_OPTIONS[posIndex],
      cefrLevel: cefr,
      pronunciation: pronunciation || `/${word}/`,
      source: "iAdded",
      targetWordId,
      learnStatus: existing?.learnStatus || "new",
      nextReviewLabel: existing?.nextReviewLabel || "Not started",
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      isFocus: existing?.isFocus,
    };
    const next = existing
      ? notes.map((n) => (n._id === existing._id ? note : n))
      : [note, ...notes];
    setNotes(next); saveNotes(next);
    setShowEditor(false);
    setToast(existing ? "Updated" : "Added to Wordie-X");
  }

  function performDelete(note: Note) {
    toggleFocusStore(note.targetWordId || note.word, false);
    const next = notes.filter((n) => n._id !== note._id);
    setNotes(next); saveNotes(next);
    setConfirmDelete(null);
    setToast("Deleted");
  }

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      if (sourceSel.length > 0 && !sourceSel.includes(n.source)) return false;
      if (statusSel.length > 0) {
        const hit = statusSel.includes(n.learnStatus) || (n.isFocus && statusSel.includes("focus"));
        if (!hit) return false;
      }
      return true;
    });
  }, [notes, sourceSel, statusSel]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { focus: 0 };
    for (const n of notes) {
      c[n.learnStatus] = (c[n.learnStatus] ?? 0) + 1;
      if (n.isFocus) c.focus += 1;
    }
    return c;
  }, [notes]);

  // Select helpers
  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };
  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
    setBatchOpen(false);
  };
  const applyUpdate = (updater: (n: Note) => Note, msg: string) => {
    const next = notes.map((n) => (selected.has(n._id) ? updater(n) : n));
    setNotes(next); saveNotes(next);
    setToast(msg); exitSelect();
  };
  const batchAddFocus = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, true);
    });
    applyUpdate((n) => ({ ...n, isFocus: true }), "Added to Focus");
  };
  const batchRemoveFocus = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, false);
    });
    applyUpdate((n) => ({ ...n, isFocus: false }), "Removed from Focus");
  };
  const batchMoveReview = () =>
    applyUpdate((n) => ({ ...n, learnStatus: "review", nextReviewLabel: "Today" }), "Moved to Review");
  const batchRemoveReview = () =>
    applyUpdate(
      (n) => ({ ...n, learnStatus: "new", nextReviewLabel: "Not started" }),
      "Removed from Review",
    );
  const batchDelete = () => {
    selected.forEach((id) => {
      const n = notes.find((x) => x._id === id);
      if (n) toggleFocusStore(n.targetWordId || n.word, false);
    });
    const next = notes.filter((n) => !selected.has(n._id));
    setNotes(next); saveNotes(next);
    setToast("Deleted"); exitSelect();
  };
  const openBatch = () => {
    if (selected.size === 0) { setToast("Select cards first"); return; }
    setBatchOpen(true);
  };

  const selectedNotes = useMemo(
    () => notes.filter((n) => selected.has(n._id)),
    [notes, selected],
  );
  const allSelectedFocus =
    selectedNotes.length > 0 && selectedNotes.every((n) => n.isFocus);
  const allSelectedReview =
    selectedNotes.length > 0 && selectedNotes.every((n) => n.learnStatus === "review");

  const labelFor = (sel: string[], lookup: (k: string) => string) => {
    if (sel.length === 0) return "All";
    if (sel.length === 1) return lookup(sel[0]);
    return `${sel.length} sel.`;
  };

  const toggleIn = (sel: string[], setter: (v: string[]) => void, value: string) => {
    if (sel.includes(value)) setter(sel.filter((v) => v !== value));
    else setter([...sel, value]);
  };

  return (
    <PhoneFrame bg="bg-white">
      <FloatingBack to="/mywordie" />

      <div className="px-5 pb-12 pt-14">
        {/* Title */}
        <div className="mb-4 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: WORDIE, letterSpacing: "-0.01em" }}
          >
            Wordie-X
          </h1>
        </div>

        {/* Toolbar: Select / Done · Preview (top, like Wordie Bank) */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
            style={{ color: selectMode ? "var(--wordie)" : "var(--foreground)" }}
          >
            {selectMode ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            {selectMode ? "Done" : "Select"}
          </button>
          {selectMode ? (
            <button
              type="button"
              onClick={openBatch}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              {selected.size} selected •••
            </button>
          ) : (
            <button
              type="button"
              onClick={() => filtered.length > 0 && setPreviewIdx(0)}
              className="text-[13px] font-semibold"
              style={{ color: "var(--wordie)" }}
            >
              Preview
            </button>
          )}
        </div>

        {/* Add a new word */}
        <section>
          {!showEditor ? (
            <button
              type="button"
              onClick={openNewWord}
              className="w-full rounded-full py-3 px-4 flex items-center justify-center gap-3 active:scale-[0.99] transition-transform"
              style={{ background: "color-mix(in oklab, var(--wordie) 14%, white)" }}
            >
              <span
                className="h-7 w-7 rounded-full grid place-items-center bg-white shrink-0"
                style={{ color: WORDIE, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.75} />
              </span>
              <span
                className="text-[17px] font-semibold tracking-tight"
                style={{ color: WORDIE, letterSpacing: "-0.01em" }}
              >
                Add A New Word
              </span>
            </button>
          ) : (
            <div
              className="rounded-3xl bg-white border p-4"
              style={{ borderColor: "color-mix(in oklab, var(--wordie) 25%, white)" }}
            >
              <label className="block">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Word</span>
                <input
                  type="text"
                  value={draftWord}
                  onChange={(e) => onWordInput(e.target.value)}
                  placeholder="Type a word"
                  className="mt-1 w-full bg-transparent border-0 border-b border-border focus:outline-none focus:border-[color:var(--wordie)] py-2 text-[18px] font-semibold"
                  style={{ color: WORDIE }}
                  autoFocus
                />
              </label>
              {wordSuggestion && (
                <button
                  type="button"
                  onClick={applyWordSuggestion}
                  className="mt-2 text-[12px] font-semibold"
                  style={{ color: "var(--wordie-accent)" }}
                >
                  Did you mean <u>{wordSuggestion}</u>?
                </button>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenSheet("pos")}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                  style={{
                    background: "color-mix(in oklab, var(--wordie) 12%, white)",
                    color: WORDIE
                  }}
                >
                  {PART_OF_SPEECH_OPTIONS[posIndex]}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                  style={{
                    background: "color-mix(in oklab, var(--wordie-accent) 14%, white)",
                    color: "var(--wordie-accent)"
                  }}
                  title="CEFR auto-detected"
                >
                  {cefr}
                </span>
                {isAutoFilling && (
                  <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
                    Auto-filling…
                  </span>
                )}
              </div>

              <label className="block mt-4">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Definition</span>
                <textarea
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder="What does this word mean?"
                  className="mt-1 w-full bg-muted/50 rounded-2xl p-3 text-[13px] focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as never]: "color-mix(in oklab, var(--wordie) 30%, white)" }}
                />
              </label>

              <label className="block mt-3">
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Example</span>
                <textarea
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder="Use it in a sentence (optional)"
                  className="mt-1 w-full bg-muted/50 rounded-2xl p-3 text-[13px] focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as never]: "color-mix(in oklab, var(--wordie) 30%, white)" }}
                />
              </label>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelEditor}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-semibold bg-muted text-foreground active:scale-[0.98] transition-transform"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addWordToWordieX}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] transition-transform"
                  style={{ background: WORDIE }}
                >
                  Add to Wordie-X
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Filters: Resource + Status (bank-style) */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <FilterDropdown
            label="Resource"
            value={labelFor(sourceSel, (k) => SOURCE_LABEL[k] || k)}
            active={sourceSel.length > 0}
            onClick={() => setOpenSheet("source")}
          />
          <FilterDropdown
            label="Status"
            value={labelFor(statusSel, (k) => STATUS_OPTIONS.find((o) => o.key === k)?.label || k)}
            active={statusSel.length > 0}
            onClick={() => setOpenSheet("status")}
          />
        </div>

        {/* List */}
        <section className="mt-3">
          <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{filtered.length} cards</p>

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-muted/40 border border-dashed border-border p-8 text-center">
              <p className="text-[13px] text-muted-foreground">
                {notes.length === 0
                  ? "No saved words yet. Add words you want to remember later."
                  : "No words match this filter."}
              </p>
            </div>
          ) : (
            <ul className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden shadow-[0_8px_24px_-18px_rgba(80,100,245,0.35)]">
              {filtered.map((n, idx) => {
                const isSel = selected.has(n._id);
                return (
                  <li key={n._id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectMode) toggleSelect(n._id);
                        else setPreviewIdx(idx);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/40 transition-colors"
                    >
                      {selectMode && (
                        <div
                          className="h-5 w-5 rounded-full border-2 grid place-items-center shrink-0"
                          style={{
                            borderColor: isSel ? "var(--wordie)" : "var(--border)",
                            background: isSel ? "var(--wordie)" : "transparent",
                            color: "white"
                          }}
                        >
                          {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-semibold text-[20px] truncate leading-tight text-foreground"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {n.word}
                        </p>
                        {n.content && (
                          <p className="text-[12px] text-muted-foreground truncate mt-0.5 leading-snug">
                            {n.content}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 min-w-0 mt-1.5">
                          <span
                            className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{
                              background: "color-mix(in oklab, var(--wordie) 12%, white)",
                              color: WORDIE
                            }}
                          >
                            {capitalize(n.partOfSpeech || "noun")}
                          </span>
                          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                            {n.cefrLevel}
                          </span>
                          <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                            {getSourceLabel(n.source)}
                          </span>
                          <LearnBadge status={n.learnStatus} />
                          {n.isFocus && <FocusPill />}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-center">
                        {!selectMode && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Resource / Status sheet */}
      <StandardSheet
        open={!!openSheet}
        title={
          openSheet === "source"
            ? "Choose Resource"
            : openSheet === "status"
              ? "Choose Status"
              : "Choose Part of Speech"
        }
        brandColor={SHEET_BRAND.wordie}
        onDone={() => setOpenSheet(null)}
        onClose={() => setOpenSheet(null)}
      >
        <>
              {openSheet === "source" && (
                <>
                  <SheetRow label="Clear all" active={sourceSel.length === 0} onClick={() => setSourceSel([])} />
                  {SOURCE_OPTIONS.map((o) => (
                    <SheetRow
                      key={o.key}
                      label={o.label}
                      active={sourceSel.includes(o.key)}
                      onClick={() => toggleIn(sourceSel, setSourceSel, o.key)}
                    />
                  ))}
                </>
              )}
              {openSheet === "status" && (
                <>
                  <SheetRow label="Clear all" active={statusSel.length === 0} onClick={() => setStatusSel([])} />
                  {STATUS_OPTIONS.map((o) => (
                    <SheetRow
                      key={o.key}
                      label={`${o.label} (${counts[o.key] ?? 0})`}
                      active={statusSel.includes(o.key)}
                      onClick={() => toggleIn(statusSel, setStatusSel, o.key)}
                    />
                  ))}
                </>
              )}
              {openSheet === "pos" && (
                <>
                  {PART_OF_SPEECH_OPTIONS.map((p, i) => (
                    <SheetRow
                      key={p}
                      label={capitalize(p)}
                      active={i === posIndex}
                      onClick={() => { setPosIndex(i); setOpenSheet(null); }}
                    />
                  ))}
                </>
              )}
        </>
      </StandardSheet>

      {/* Batch sheet */}
      {batchOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={() => setBatchOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
            style={{ height: "58vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="w-12" />
              <p
                className="text-[17px] font-semibold tracking-tight leading-none"
                style={{ letterSpacing: "-0.01em", color: "var(--wordie)" }}
              >
                Batch Actions
              </p>
              <button
                type="button"
                onClick={() => setBatchOpen(false)}
                className="text-[13px] font-semibold w-12 text-right"
                style={{ color: "var(--wordie)" }}
              >
                Done
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground text-center mb-4 shrink-0">
              {selected.size} selected
            </p>
            <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-2">
              <SheetBtn label="Preview" onClick={() => { setBatchOpen(false); setPreviewIdx(0); }} />
              <SheetBtn
                label={allSelectedFocus ? "Remove from Focus" : "Add to Focus"}
                onClick={allSelectedFocus ? batchRemoveFocus : batchAddFocus}
              />
              <SheetBtn
                label={allSelectedReview ? "Remove from Review" : "Move to Review"}
                onClick={allSelectedReview ? batchRemoveReview : batchMoveReview}
              />
              <SheetBtn label="Delete" danger onClick={batchDelete} />
              <SheetBtn label="Cancel" muted onClick={() => setBatchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-6"
          onClick={() => setConfirmDelete(null)}
        >
          <div className="w-full max-w-[320px] rounded-3xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <p className="text-[16px] font-semibold">Delete word?</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              This word will be removed from Wordie-X.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-semibold bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => performDelete(confirmDelete)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-semibold text-white"
                style={{ background: "var(--destructive)" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen preview */}
      {previewIdx !== null && filtered[previewIdx] && (
        <WordPreview
          item={{
            word: filtered[previewIdx].word,
            pronunciation: filtered[previewIdx].pronunciation,
            definitionEn: filtered[previewIdx].definitionEn || filtered[previewIdx].content,
            exampleSentence: filtered[previewIdx].exampleSentence,
            partOfSpeech: filtered[previewIdx].partOfSpeech || "noun",
            cefrLevel: filtered[previewIdx].cefrLevel,
            statusValue: capitalize(filtered[previewIdx].learnStatus),
            nextReviewLabel: filtered[previewIdx].nextReviewLabel,
          }}
          index={previewIdx}
          total={filtered.length}
          onClose={() => setPreviewIdx(null)}
          onPrev={() => setPreviewIdx((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setPreviewIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i))}
          topBadges={
            <>
              <LearnBadge status={filtered[previewIdx].learnStatus} />
              {filtered[previewIdx].isFocus && <FocusPill />}
            </>
          }
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/85 text-white px-4 py-2 text-[12px] font-semibold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}

// ---------- Reusable bits ----------
function FilterDropdown({
  label, value, active, onClick,
}: { label: string; value: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-between gap-1 rounded-full pl-3.5 pr-2.5 py-2 active:scale-[0.97] transition-transform"
      style={
        active
          ? { background: "var(--wordie)", color: "white", border: "1px solid var(--wordie)" }
          : {
              background: "color-mix(in oklab, var(--wordie) 10%, white)",
              color: "var(--foreground)",
              border: "1px solid color-mix(in oklab, var(--wordie) 25%, white)",
            }
      }
    >
      <span className="flex items-baseline gap-1 min-w-0">
        <span className="text-xs font-semibold opacity-70">{label}</span>
        <span
          className="text-[12px] font-semibold truncate"
          style={!active ? { color: "var(--wordie)" } : undefined}
        >
          {value}
        </span>
      </span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80" />
    </button>
  );
}

// Vibrant "F" pill for cards/preview marked as Focus.
// Same depth as other card pills (22% bg / 70% text mix).
export const FOCUS_PILL_COLOR = "oklch(0.7 0.24 340)";
function FocusPill() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 22%, white)`,
        color: `color-mix(in oklab, ${FOCUS_PILL_COLOR} 70%, black)`
      }}
      aria-label="Focus"
      title="Focus"
    >
      Focus
    </span>
  );
}

function SheetRow({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 text-left text-[14px] font-semibold"
      style={{ color: active ? "var(--wordie)" : "var(--foreground)" }}
    >
      <span>{label}</span>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function SheetBtn({
  label, onClick, danger, muted,
}: { label: string; onClick?: () => void; danger?: boolean; muted?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl py-3 text-[14px] font-semibold text-center"
      style={{
        background: muted ? "var(--muted)" : "white",
        color: danger ? "var(--destructive)" : muted ? "var(--foreground)" : "var(--wordie)",
        border: muted ? "none" : "1px solid var(--border)"
      }}
    >
      {label}
    </button>
  );
}

function LearnBadge({ status }: { status: LearnStatus }) {
  if (status === "relearning") {
    const color = STATUS_COLOR.relearning;
    return (
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{
          background: `color-mix(in oklab, ${color} 22%, white)`,
          color: `color-mix(in oklab, ${color} 70%, black)`
        }}
      >
        Relearning
      </span>
    );
  }
  return <StatusBadge status={toBadgeStatus(status)} />;
}

