import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ProfilePage } from "@/routes/profile";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";

export const Route = createFileRoute("/learning-journey-success")({
  head: () => ({
    meta: [
      { title: "7-Day Free Trial — Paizley EC" },
      { name: "description", content: "The learner's first English learning journey is ready to begin." },
      { property: "og:title", content: "7-Day Free Trial — Paizley EC" },
      { property: "og:description", content: "The learner's first English learning journey is ready to begin." },
    ],
  }),
  component: JourneySuccessPage,
});

const PAISLEY = "var(--paisley)";

function JourneySuccessPage() {
  const navigate = useNavigate();
  const goHome = () => navigate({ to: "/" });

  return (
    <>
      <ProfilePage tabBarHidden />
      <StandardSheet
        open
        title="7-Day Free Trial"
        brandColor={SHEET_BRAND.paisley}
        onClose={goHome}
      >
        <div className="flex flex-col h-full min-h-0 mt-5">
          {/* Membership-style benefit card */}
          <div
            className="rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{ background: "white" }}
          >
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-[13px] leading-none" style={{ color: PAISLEY, fontWeight: 400 }}>
                7-Day Free Trial Started
              </p>
            </div>

            <div
              className="mt-[60px] flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide text-center"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <ul className="space-y-2 pb-2 mx-auto inline-block text-left w-fit">
                {[
                  "AI English Coach",
                  "Learning Progress",
                  "Bloxia Journey",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <Check
                      className="shrink-0 mt-[2px] h-3.5 w-3.5"
                      strokeWidth={1.5}
                      style={{ color: "var(--foreground)" }}
                    />
                    <span className="text-[11px] leading-[1.55]" style={{ color: "var(--foreground)", fontWeight: 400 }}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <h1
              className="text-[26px] leading-[1.2] font-medium tracking-tight text-foreground text-center"
              style={{ letterSpacing: "-0.01em" }}
            >
              Welcome, Keith!
            </h1>
            <span
              className="block mt-[10px] text-[15px] text-foreground/80 font-normal leading-[1.7] text-center"
            >
              Your English journey begins today.
            </span>
          </div>

          <div className="mt-5 shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              onClick={goHome}
              className="w-full h-full rounded-full text-[16px] font-medium text-white transition-transform active:scale-[0.98]"
              style={{ background: PAISLEY }}
            >
              开始学习
            </button>
          </div>
        </div>
      </StandardSheet>
    </>
  );
}
