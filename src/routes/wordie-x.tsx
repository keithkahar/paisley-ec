import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { useState } from "react";
import { Zap, Flame, Trophy, CheckCircle2 } from "lucide-react";
import {
  MOCK_WORDS,
  ProgressBar,
  SectionTitle,
  WordRow,
  LockedCard,
  EmptyState,
} from "@/components/app/WordieKit";

export const Route = createFileRoute("/wordie-x")({
  head: () => ({ meta: [{ title: "Wordie-X — Paisley EC" }] }),
  component: WordieXPage,
});

type XState = "ready" | "all-clear" | "completed";

function WordieXPage() {
  const [state, setState] = useState<XState>("ready");

  const tricky = MOCK_WORDS.filter((w) => w.status === "difficult" || w.status === "review");

  return (
    <PhoneFrame bg="bg-white">
      <AppHeader
        title=""
        back="/mywordie"
        bg="white"
      />

      <div className="px-5 pb-10">
        {/* State switcher (prototype helper) */}
        <div className="mb-3 flex gap-1 rounded-full bg-white border border-border p-1 text-[11px] font-bold">
          {(["ready", "all-clear", "completed"] as XState[]).map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className="flex-1 rounded-full py-1.5 transition-colors"
              style={
                state === s
                  ? { background: "var(--wordie)", color: "white" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {s === "ready" ? "Ready" : s === "all-clear" ? "All clear" : "Done"}
            </button>
          ))}
        </div>

        {/* Hero challenge card */}
        <section
          className="relative rounded-[28px] p-5 text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, var(--wordie-accent) 0%, oklch(0.70 0.20 50) 65%, oklch(0.62 0.22 35) 100%)",
          }}
        >
          <div
            className="absolute -top-10 -right-8 h-32 w-32 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/22 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
              <Zap className="h-3.5 w-3.5" /> Challenge
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/22 px-2.5 py-1 text-[11px] font-bold">
              <Flame className="h-3.5 w-3.5" /> 3-day streak
            </span>
          </div>
          <h2
            className="mt-3 text-[24px] leading-[1.15] font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            {state === "all-clear"
              ? "All clear today 🎉"
              : state === "completed"
                ? "Challenge complete!"
                : "Power up tricky words"}
          </h2>
          <p className="mt-1 text-[13px] opacity-90 font-medium">
            {state === "all-clear"
              ? "No tricky words right now. Come back tomorrow."
              : state === "completed"
                ? "Nice work — 8 of 8 words boosted."
                : `${tricky.length} words need extra practice · about 4 min`}
          </p>

          {state === "ready" && (
            <button
              type="button"
              onClick={() => setState("completed")}
              className="mt-5 w-full rounded-full bg-white py-3.5 font-bold active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-2"
              style={{ color: "var(--wordie-accent)", fontFamily: "var(--font-sans)", fontSize: "16px" }}
            >
              <Zap className="h-4 w-4 fill-current" />
              Start challenge
            </button>
          )}

          {state === "completed" && (
            <div className="mt-4 rounded-2xl bg-white/18 backdrop-blur p-3 flex items-center gap-2 text-[13px] font-bold">
              <Trophy className="h-4 w-4" />
              +120 Bp earned
            </div>
          )}
        </section>

        {/* In-progress strip */}
        {state === "ready" && (
          <section className="mt-4 rounded-3xl bg-white border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Today's set
                </p>
                <p className="font-bold text-[15px] mt-0.5">3 of 12 boosted</p>
              </div>
              <span
                className="text-[12px] font-bold rounded-full px-2.5 py-1"
                style={{
                  background: "color-mix(in oklab, var(--wordie-accent) 18%, white)",
                  color: "var(--wordie-accent)",
                }}
              >
                25%
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={25}
                color="var(--wordie-accent)"
                track="color-mix(in oklab, var(--wordie-accent) 14%, white)"
              />
            </div>
          </section>
        )}


        {/* Tricky words list */}
        <section className="mt-5">
          <SectionTitle action={<Link to="/wordie-bank" className="text-[11px] font-bold text-[color:var(--wordie)]">See all</Link>}>
            Words that need power-up
          </SectionTitle>

          {state === "all-clear" ? (
            <EmptyState
              icon={<CheckCircle2 className="h-7 w-7" />}
              title="All clear today"
              description="No tricky words right now. Great job — come back tomorrow."
            />
          ) : (
            <div className="rounded-3xl bg-white border border-border divide-y divide-border overflow-hidden">
              {tricky.map((w) => (
                <WordRow key={w.word} item={w} />
              ))}
            </div>
          )}
        </section>

        {/* Member-only future challenge */}
        <section className="mt-5">
          <SectionTitle>More challenges</SectionTitle>
          <LockedCard
            title="Marathon Mode · Member"
            description="50 mixed words in one go, with a bonus Bloxia reward."
          />
        </section>
      </div>
    </PhoneFrame>
  );
}
