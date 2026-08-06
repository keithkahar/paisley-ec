import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import { useLearners } from "@/lib/learners";
import { useLearningJourney } from "@/lib/learningJourney";

export const Route = createFileRoute("/learning-journey-success")({
  head: () => ({
    meta: [
      { title: "Journey Created — Paisley EC" },
      { name: "description", content: "The learner's first English learning journey is ready to begin." },
      { property: "og:title", content: "Journey Created — Paisley EC" },
      { property: "og:description", content: "The learner's first English learning journey is ready to begin." },
    ],
  }),
  component: JourneySuccessPage,
});

const PAISLEY = "var(--paisley)";

function JourneySuccessPage() {
  const navigate = useNavigate();
  const { current, hasLearner, displayName } = useLearners();
  const { journey } = useLearningJourney();
  const avatarPath = hasLearner ? current?.avatarPath ?? "" : "";
  const initials =
    (hasLearner
      ? displayName
          .split(/\s+/)
          .slice(0, 2)
          .map((p) => p[0] ?? "")
          .join("")
          .toUpperCase()
      : "") || "PEC";

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-[100dvh]">
        <FloatingBack to="/" icon="close" />

        <section className="px-6 pt-[55px] pb-10 text-center flex flex-col items-center">
          <div
            className="h-[160px] w-[160px] rounded-full overflow-hidden grid place-items-center"
            style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)" }}
          >
            {avatarPath ? (
              <img
                src={avatarPath}
                alt={displayName}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: `${current?.avatarPosX ?? 50}% ${current?.avatarPosY ?? 50}%`,
                  transform: `scale(${current?.avatarScale ?? 1})`,
                  transformOrigin: `${current?.avatarPosX ?? 50}% ${current?.avatarPosY ?? 50}%`,
                }}
              />
            ) : (
              <span
                className="text-[56px] font-medium leading-none"
                style={{ color: PAISLEY, letterSpacing: "-0.02em" }}
              >
                {initials}
              </span>
            )}
          </div>

          <h1
            className="mt-4 text-[26px] leading-[1.2] font-medium tracking-tight"
            style={{ color: PAISLEY, letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}
          >
            欢迎来到 Paizley
          </h1>
          <p
            className="mt-1 text-[15px] text-foreground/70 font-semibold tracking-tight"
            style={{ letterSpacing: "-0.01em" }}
          >
            孩子的英语成长旅程现在开始。
          </p>

          <div
            className="mt-6 w-full rounded-3xl px-6 py-5 flex flex-col gap-4"
            style={{ background: "color-mix(in oklab, var(--paisley) 8%, white)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-muted-foreground">Learner</span>
              <span className="text-[15px] font-semibold" style={{ color: PAISLEY }}>
                {displayName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-muted-foreground">Plan</span>
              <span
                className="inline-flex items-center rounded-full px-3 h-7 text-[13px] leading-none font-semibold bg-white"
                style={{ color: PAISLEY, border: `1px solid ${PAISLEY}` }}
              >
                Free
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-muted-foreground">Status</span>
              <span className="text-[15px] font-semibold" style={{ color: PAISLEY }}>
                {journey.status === "complete" ? "Journey created" : "In progress"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="mt-8 w-full rounded-full py-4 px-4 text-[17px] font-medium text-white transition-transform active:scale-[0.98]"
            style={{ background: PAISLEY }}
          >
            开始学习
          </button>
        </section>
      </div>
    </PhoneFrame>
  );
}