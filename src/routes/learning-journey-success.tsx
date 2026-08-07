import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ProfilePage } from "@/routes/profile";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";

export const Route = createFileRoute("/learning-journey-success")({
  head: () => ({
    meta: [
      { title: "7天免费旅程已开启 — Paizley EC" },
      { name: "description", content: "The learner's first English learning journey is ready to begin." },
      { property: "og:title", content: "7天免费旅程已开启 — Paizley EC" },
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
        title="7天免费旅程已开启"
        brandColor={SHEET_BRAND.paisley}
        onClose={goHome}
      >
        <div className="flex flex-col min-h-0" style={{ height: 429 }}>
          {/* Membership-style benefit card */}
          <div
            className="rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{ background: "white" }}
          >
            <div className="flex items-baseline justify-center gap-2 mt-[10px]">
              <p
                className="text-[26px] leading-[1.4] font-medium tracking-tight text-center"
                style={{ letterSpacing: "-0.01em", color: PAISLEY }}
              >
                Welcome, Keith!
              </p>
            </div>

            <div
              className="mt-[60px] flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide text-center"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <ul className="space-y-2 pb-2 mx-auto inline-block text-left w-fit">
                {[
                  "获得个性化学习体验",
                  "保存孩子的学习记录",
                  "Bloxia 成长地图/徽章",
                  "管理孩子的学习目标",
                  "查看孩子的学习数据",
                  "获得CEFR和Wordie测试",
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

          <div className="mt-auto shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              onClick={goHome}
              className="w-full h-full rounded-full text-[17px] font-medium text-white active:scale-[0.99] transition-transform"
              style={{ background: PAISLEY, letterSpacing: "-0.01em" }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </StandardSheet>
    </>
  );
}
