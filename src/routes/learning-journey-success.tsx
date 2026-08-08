import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProfilePage } from "@/routes/profile";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { SheetActionBody, SheetBenefitList } from "@/components/app/SheetActions";

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
        <SheetActionBody primary={{ label: "开始学习", onClick: goHome }}>
          <div className="flex items-baseline justify-center gap-2 mt-[10px]">
            <p
              className="text-[26px] leading-[1.4] font-medium tracking-tight text-center"
              style={{ letterSpacing: "-0.01em", color: PAISLEY }}
            >
              Welcome, Keith!
            </p>
          </div>
          <SheetBenefitList
            items={[
              "获得个性化学习体验",
              "保存孩子的学习记录",
              "开启Bloxia成长地图与徽章",
              "设定孩子的学习目标",
              "查看孩子的成长数据",
              "完成CEFR和Wordie测试",
            ]}
          />
        </SheetActionBody>
      </StandardSheet>
    </>
  );
}
