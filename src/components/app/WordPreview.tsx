import type { ReactNode } from "react";
import { X, Volume2 } from "lucide-react";

export type PreviewItem = {
  word: string;
  pronunciation: string;
  definitionEn: string;
  exampleSentence: string;
  partOfSpeech: string;
  cefrLevel: string;
  statusValue: string;
  nextReviewLabel: string;
};

/**
 * Shared full-screen word preview used by both Wordie Bank and Wordie-X.
 * Both entrances must render the exact same UI — all sizes, spacing,
 * pill styles, speaker placement and Previous/Next styling live here.
 */
export function WordPreview({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  topBadges,
}: {
  item: PreviewItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  topBadges?: ReactNode;
}) {
  const prevDisabled = index === 0;
  const nextDisabled = index >= total - 1;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-[420px] mx-auto">
      <div className="flex items-center justify-between px-5 py-4">
        <button type="button" onClick={onClose} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-muted-foreground">
            {index + 1} / {total}
          </p>
          {topBadges}
        </div>
        <div className="w-5" />
      </div>
      {/* Progress segments */}
      <div className="px-5 flex gap-1 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{
              background:
                i <= index
                  ? "var(--wordie)"
                  : "color-mix(in oklab, var(--wordie) 10%, white)",
            }}
          />
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col">
        {/* Word card */}
        <div
          className="rounded-[2rem] p-6 bg-white flex flex-col overflow-hidden"
          style={{
            border: "1px solid color-mix(in oklab, var(--wordie) 30%, white)",
            height: "28rem",
          }}
        >
          <div className="flex items-center">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="inline-flex rounded-lg px-[7px] py-[2px] text-[12px] font-semibold"
                style={{ background: "var(--wordie)", color: "white" }}
              >
                {capitalize(item.partOfSpeech)}
              </span>
              <span className="inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                {item.cefrLevel}
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <h2
              className="font-medium text-[40px] leading-none"
              style={{
                color: "var(--wordie)",
                letterSpacing: "-0.02em",
              }}
            >
              {item.word}
            </h2>
            <p className="text-[13px] text-muted-foreground mt-3 font-mono">
              {item.pronunciation}
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 mt-6 mb-3">
            <div>
              <p className="text-[14px] font-semibold tracking-[0.08em] text-muted-foreground">
                Definition
              </p>
              <div className="mt-2 flex items-start gap-3">
                <p
                  className="flex-1 text-[18px] font-semibold leading-relaxed text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.definitionEn}
                </p>
                <button
                  type="button"
                  className="shrink-0 grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ height: "29px" }}
                  aria-label="Listen to definition"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[14px] font-semibold tracking-[0.08em] text-muted-foreground">
                Example
              </p>
              <div className="mt-2 flex items-start gap-3">
                <p
                  className="flex-1 text-[18px] font-semibold leading-relaxed text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {renderExample(item.exampleSentence, item.word)}
                </p>
                <button
                  type="button"
                  className="shrink-0 grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ height: "29px" }}
                  aria-label="Listen to example"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Three mini pills */}
        <div className="px-0 mt-6 grid grid-cols-3 gap-3">
          <MiniStat label="Status" value={item.statusValue} />
          <MiniStat label="Level" value={item.cefrLevel} />
          <MiniStat label="Next" value={item.nextReviewLabel} />
        </div>

        {/* Speaker */}
        <div className="mt-[109px] flex flex-col items-center">
          <button
            type="button"
            className="h-[72px] w-[72px] rounded-full grid place-items-center text-white shadow-md active:scale-95 transition-transform"
            style={{ background: "var(--wordie)" }}
            aria-label="Listen"
          >
            <Volume2 className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Previous / Next — absolute overlay so it doesn't push speaker up */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-4 pointer-events-none">
        <button
          type="button"
          onClick={onPrev}
          disabled={prevDisabled}
          className="text-[15px] font-light disabled:opacity-30 pointer-events-auto"
          style={{ color: "var(--wordie)" }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="text-[15px] font-light disabled:opacity-30 pointer-events-auto"
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
      <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <p
        className="text-xs font-semibold mt-0.5 truncate"
        style={{ color: "var(--wordie)" }}
      >
        {value}
      </p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderExample(sentence: string, word: string) {
  if (!sentence) return null;
  const re = new RegExp(`(${word})`, "ig");
  const parts = sentence.split(re);
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === word.toLowerCase() ? (
          <span key={i} style={{ color: "var(--wordie)" }}>
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}