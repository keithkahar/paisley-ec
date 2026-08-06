import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ProfilePage } from "@/routes/profile";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { useLearners } from "@/lib/learners";

export const Route = createFileRoute("/learning-journey-success")({
  head: () => ({
    meta: [
      { title: "Learner Added — Paizley EC" },
      { name: "description", content: "The learner's first English learning journey is ready to begin." },
      { property: "og:title", content: "Learner Added — Paisley EC" },
      { property: "og:description", content: "The learner's first English learning journey is ready to begin." },
    ],
  }),
  component: JourneySuccessPage,
});

const PAISLEY = "var(--paisley)";

function JourneySuccessPage() {
  const navigate = useNavigate();
  const { current, hasLearner, displayName } = useLearners();

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

  const goHome = () => navigate({ to: "/" });

  return (
    <>
      <ProfilePage tabBarHidden />
      <StandardSheet
        open
        title="Learner Added"
        brandColor={SHEET_BRAND.paisley}
        onClose={goHome}
      >
          <div className="flex flex-col min-h-0" style={{ height: 429 }}>
            <div style={{ marginTop: -10 }}>
              <div className="mt-[10px] flex flex-col items-center">
                <div
                  className="h-40 w-40 rounded-full overflow-hidden grid place-items-center"
                  style={{ background: "color-mix(in oklab, var(--paisley) 22%, white)" }}
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
                  className="mt-5 text-[26px] leading-[1.2] font-medium tracking-tight text-foreground text-center"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Hi, {displayName}.
                  <span className="block mt-[41.63px] text-[26px] text-foreground/80 font-normal leading-[1.7] text-center">
                    Welcome to Paizley EC.
                  </span>
                </h1>
              </div>
            </div>

            <div className="mt-auto shrink-0" style={{ height: 48 }}>
              <button
                type="button"
                onClick={goHome}
                className="w-full h-full rounded-full text-[17px] font-medium text-white transition-transform active:scale-[0.98]"
                style={{ background: PAISLEY }}
              >
                Now Get Started
              </button>
            </div>
          </div>
      </StandardSheet>
    </>
  );
}
