import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, ChevronDown, Star, Trash2, X, ChevronRight } from "lucide-react";
import { StatusBadge, type WordStatus } from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-x")({
  head: () => ({ meta: [{ title: "Wordie-X — Paisley EC" }] }),
  component: WordieXPage,
});

// ---------- Constants ----------
const PART_OF_SPEECH_OPTIONS = [
  "noun", "verb", "adjective", "adverb", "pronoun",
  "preposition", "conjunction", "interjection", "determiner", "numeral",
] as const;

const CEFR_OPTIONS = ["Pre A1", "A1", "A2", "B1", "B2", "C1", "C2"] as const;

const PROPER_NOUNS = new Set(["China", "English", "Shirin", "Paisley", "Wordie", "Bloxia"]);

const COMMON_POS_MAP: Record<string, string> = {
  hello: "interjection", hi: "interjection", the: "determiner", a: "determiner",
  an: "determiner", i: "pronoun", you: "pronoun", he: "pronoun", she: "pronoun",
  one: "numeral", two: "numeral", three: "numeral",
};

// Mock "known words" — stands in for getUserWords()
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

const SOURCE_LABEL: Record<string, string> = {
  "wordie-x": "Wordie-X", wordie_x: "Wordie-X",
  definition: "Definition", meaning: "Definition",
  example: "Example", shirintalk: "ShirinTalk", ShirinTalk: "ShirinTalk",
  iMade: "iMade",
};
const getSourceLabel = (s?: string) => (s && SOURCE_LABEL[s]) || "Wordie-X";

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// Seed notes — shown on first visit for testing
const SEED_NOTES: Array<Omit<Note, "_id" | "createdAt" | "updatedAt">> = [
  { word: "sunshine", content: "the light and warmth from the sun",
    definitionEn: "the light and warmth from the sun",
    exampleSentence: "We played in the sunshine all afternoon.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈsʌnʃaɪn/",
    source: "iMade", targetWordId: "wordie_x_sunshine", status: "saved" },
  { word: "giggle", content: "to laugh in a soft, silly way",
    definitionEn: "to laugh in a soft, silly way",
    exampleSentence: "The kids giggle when they hear the joke.",
    partOfSpeech: "verb", cefrLevel: "A2", pronunciation: "/ˈɡɪɡ.əl/",
    source: "iMade", targetWordId: "wordie_x_giggle", status: "saved" },
  { word: "puppy", content: "a baby dog",
    definitionEn: "a baby dog",
    exampleSentence: "My puppy loves to chase the ball.",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈpʌp.i/",
    source: "iMade", targetWordId: "wordie_x_puppy", status: "saved" },
  { word: "rainbow", content: "colorful arc in the sky after rain",
    definitionEn: "colorful arc in the sky after rain",
    exampleSentence: "Look at the rainbow over the hill!",
    partOfSpeech: "noun", cefrLevel: "A1", pronunciation: "/ˈreɪn.boʊ/",
    source: "iMade", targetWordId: "wordie_x_rainbow", status: "saved" },
];

// ---------- Normalize ----------
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
  status: "saved";
  createdAt: number;
  updatedAt: number;
  isFocus?: boolean;
};

const NOTES_KEY = "pec_my_notes_v1";
const FOCUS_KEY = "pec_user_words_focus_v1";

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as Note[];
    const focus = JSON.parse(localStorage.getItem(FOCUS_KEY) || "{}") as Record<string, boolean>;
    return arr.map((n) => ({ ...n, isFocus: !!focus[n.targetWordId || n.word] }));
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

// ---------- Page ----------
function WordieXPage() {
  const WORDIE = "var(--wordie)";
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [draftWord, setDraftWord] = useState("");
  const [normalizedWord, setNormalizedWord] = useState("");
  const [wordSuggestion, setWordSuggestion] = useState("");
  const [posIndex, setPosIndex] = useState(0);
  const [showPos, setShowPos] = useState(false);
  const [cefr, setCefr] = useState("A1");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Note | null>(null);

  // Load notes on mount
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
      saveNotes(seeded);
      setNotes(seeded);
    } else {
      setNotes(existing);
    }
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  // Autofill on word change (debounced 450ms)
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (!normalizedWord) return;
    autoTimer.current = setTimeout(() => {
      const known = KNOWN_WORDS.find((k) => k.word.toLowerCase() === normalizedWord.toLowerCase());
      const meta = known || buildFallbackMeta(normalizedWord);
      setIsAutoFilling(true);
      // Only fill empty fields (don't overwrite user edits)
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
    if (!word || !def) { setToast("Add word and definition"); return; }
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
      source: "iMade",
      targetWordId,
      status: "saved",
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

  function toggleFocus(note: Note) {
    const key = note.targetWordId || note.word;
    const next = !note.isFocus;
    toggleFocusStore(key, next);
    const updated = notes.map((n) => (n._id === note._id ? { ...n, isFocus: next } : n));
    setNotes(updated); saveNotes(updated);
    setToast(next ? "Added to Focus" : "Removed from Focus");
  }

  function performDelete(note: Note) {
    toggleFocusStore(note.targetWordId || note.word, false);
    const next = notes.filter((n) => n._id !== note._id);
    setNotes(next); saveNotes(next);
    setConfirmDelete(null);
    setToast("Deleted");
  }

  const count = notes.length;

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader title="" back="/mywordie" bg="white" />

      <div className="px-5 pb-12">
        {/* Title + subtitle — match topics/Choose A Topic style */}
        <div className="mb-5">
          <h1
            className="text-[26px] leading-[1.2] font-semibold tracking-tight"
            style={{ color: WORDIE, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Wordie-X
          </h1>
          <p className="mt-1 text-[14px] font-bold tracking-tight text-foreground/65">
            Words you added or can add.
          </p>
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
                className="h-9 w-9 rounded-full grid place-items-center bg-white shrink-0"
                style={{ color: WORDIE, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
              >
                <Plus className="h-5 w-5" strokeWidth={2.75} />
              </span>
              <span
                className="text-[17px] font-bold tracking-tight"
                style={{ color: WORDIE, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
              >
                Add A New Word
              </span>
            </button>
          ) : (
            <div
              className="rounded-3xl bg-white border p-4"
              style={{ borderColor: "color-mix(in oklab, var(--wordie) 25%, white)" }}
            >
              {/* Word input */}
              <label className="block">
                <span className="text-[11px] font-bold tracking-wide text-muted-foreground">Word</span>
                <input
                  type="text"
                  value={draftWord}
                  onChange={(e) => onWordInput(e.target.value)}
                  placeholder="Type a word"
                  className="mt-1 w-full bg-transparent border-0 border-b border-border focus:outline-none focus:border-[color:var(--wordie)] py-2 text-[18px] font-bold"
                  style={{ color: WORDIE }}
                  autoFocus
                />
              </label>
              {wordSuggestion && (
                <button
                  type="button"
                  onClick={applyWordSuggestion}
                  className="mt-2 text-[12px] font-bold"
                  style={{ color: "var(--wordie-accent)" }}
                >
                  Did you mean <u>{wordSuggestion}</u>?
                </button>
              )}

              {/* POS + CEFR row */}
              <div className="mt-4 flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPos((s) => !s)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-bold"
                    style={{
                      background: "color-mix(in oklab, var(--wordie) 12%, white)",
                      color: WORDIE,
                    }}
                  >
                    {PART_OF_SPEECH_OPTIONS[posIndex]}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {showPos && (
                    <div className="absolute z-20 mt-1 max-h-56 overflow-auto rounded-2xl bg-white border border-border shadow-lg p-1 min-w-[140px]">
                      {PART_OF_SPEECH_OPTIONS.map((p, i) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => { setPosIndex(i); setShowPos(false); }}
                          className="w-full text-left px-3 py-1.5 text-[12px] font-bold rounded-xl hover:bg-muted"
                          style={{ color: i === posIndex ? WORDIE : "var(--foreground)" }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-bold"
                  style={{
                    background: "color-mix(in oklab, var(--wordie-accent) 14%, white)",
                    color: "var(--wordie-accent)",
                  }}
                  title="CEFR auto-detected"
                >
                  {cefr}
                </span>
                {isAutoFilling && (
                  <span className="ml-auto text-[11px] font-bold text-muted-foreground">
                    Auto-filling…
                  </span>
                )}
              </div>

              {/* Definition */}
              <label className="block mt-4">
                <span className="text-[11px] font-bold tracking-wide text-muted-foreground">Definition</span>
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

              {/* Example */}
              <label className="block mt-3">
                <span className="text-[11px] font-bold tracking-wide text-muted-foreground">Word In Use</span>
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

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelEditor}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-bold bg-muted text-foreground active:scale-[0.98] transition-transform"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addWordToWordieX}
                  className="flex-1 rounded-full py-2.5 text-[13px] font-bold text-white active:scale-[0.98] transition-transform"
                  style={{ background: WORDIE }}
                >
                  Add to Wordie-X
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Added Words */}
        <section className="mt-7">
          <p className="mb-2 text-[12px] font-bold text-muted-foreground">{count} cards</p>

          {count === 0 ? (
            <div className="rounded-3xl bg-muted/40 border border-dashed border-border p-8 text-center">
              <p className="text-[13px] text-muted-foreground">
                No saved words yet. Add words you want to remember later.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {notes.map((n) => (
                <SavedCard
                  key={n._id}
                  note={n}
                  onToggleFocus={() => toggleFocus(n)}
                  onAskDelete={() => setConfirmDelete(n)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Delete confirm */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-6"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="w-full max-w-[320px] rounded-3xl bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[16px] font-bold">Delete word?</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              This word will be removed from Wordie-X.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-bold bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => performDelete(confirmDelete)}
                className="flex-1 rounded-full py-2.5 text-[13px] font-bold text-white"
                style={{ background: "#D85A45" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/85 text-white px-4 py-2 text-[12px] font-bold">
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}

// ---------- Saved card with swipe ----------
function SavedCard({
  note,
  onToggleFocus,
  onAskDelete,
}: {
  note: Note;
  onToggleFocus: () => void;
  onAskDelete: () => void;
}) {
  const WORDIE = "var(--wordie)";
  const ACTION_W = 96; // px revealed per side
  const [offset, setOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const startOffset = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startOffset.current = offset;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    let next = startOffset.current + dx;
    next = Math.max(-ACTION_W, Math.min(ACTION_W, next));
    setOffset(next);
  };
  const onPointerUp = () => {
    startX.current = null;
    if (offset > ACTION_W / 2) setOffset(ACTION_W);
    else if (offset < -ACTION_W / 2) setOffset(-ACTION_W);
    else setOffset(0);
  };

  const meta = useMemo(() => ({
    pos: note.partOfSpeech || "noun",
    cefr: note.cefrLevel || "New",
    source: getSourceLabel(note.source),
  }), [note]);

  return (
    <li className="relative rounded-2xl overflow-hidden bg-white border border-border">
      {/* Left action (revealed on swipe right) */}
      <button
        type="button"
        onClick={() => { onToggleFocus(); setOffset(0); }}
        className="absolute inset-y-0 left-0 grid place-items-center text-white text-[12px] font-bold"
        style={{ width: ACTION_W, background: WORDIE }}
      >
        <Star className={`h-5 w-5 ${note.isFocus ? "fill-current" : ""}`} />
        <span className="mt-1">{note.isFocus ? "Remove" : "Add Focus"}</span>
      </button>
      {/* Right action (revealed on swipe left) */}
      <button
        type="button"
        onClick={() => { onAskDelete(); setOffset(0); }}
        className="absolute inset-y-0 right-0 grid place-items-center text-white text-[12px] font-bold"
        style={{ width: ACTION_W, background: "#D85A45" }}
      >
        <Trash2 className="h-5 w-5" />
        <span className="mt-1">Delete</span>
      </button>

      {/* Foreground draggable card */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative bg-white p-3 touch-pan-y select-none"
        style={{
          transform: `translateX(${offset}px)`,
          transition: startX.current == null ? "transform 200ms ease" : "none",
        }}
      >
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="text-[18px] font-bold tracking-tight leading-none"
            style={{ color: WORDIE, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            {note.word}
          </span>
          {note.isFocus && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: WORDIE }}>
              <Star className="h-3 w-3 fill-current" /> Focus
            </span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <Pill bg="color-mix(in oklab, var(--wordie) 12%, white)" color={WORDIE}>{meta.pos}</Pill>
          <Pill bg="color-mix(in oklab, var(--wordie-accent) 14%, white)" color="var(--wordie-accent)">{meta.cefr}</Pill>
          <Pill bg="oklch(0.96 0.01 240)" color="var(--muted-foreground)">{meta.source}</Pill>
        </div>
        {note.content && (
          <p className="mt-2 text-[13px] text-foreground/80 leading-snug">{note.content}</p>
        )}
        {offset !== 0 && (
          <button
            type="button"
            onClick={() => setOffset(0)}
            className="absolute top-2 right-2 h-6 w-6 grid place-items-center rounded-full bg-muted"
            aria-label="Close actions"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </li>
  );
}

function Pill({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}
