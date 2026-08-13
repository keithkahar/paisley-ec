import { useEffect, useState } from "react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { SheetActionBody, SheetBenefitList, SheetCardSubtitle } from "@/components/app/SheetActions";
import { MembershipCards } from "@/routes/parent";
import { useSheetDebug } from "@/lib/sheetDebug";

/**
 * ShirinTalk AI upsell sheets (pink theme).
 *  ai-companion -> 解锁 AI 智能陪伴 (AI Feedback / AI Memory / Voice 被 Free/Basic 限制)
 * Primary button opens the Membership bottom sheet.
 * Not used on myWordie / Bloxia.
 * Opens only from the debug preview list (/shirin-talk?sheet=ai-companion).
 */
type Step = "none" | "ai" | "quota" | "membership";

export function AiUpsellFlow() {
  const [step, setStep] = useState<Step>("none");
  const debug = useSheetDebug();

  useEffect(() => {
    setStep(debug === "ai-companion" ? "ai" : debug === "ai-quota" ? "quota" : "none");
  }, [debug]);

  return (
    <>
      <StandardSheet
        open={step === "ai"}
        title="解锁 AI 智能陪伴"
        brandColor={SHEET_BRAND.shirin}
        zClass="z-[70]"
        contentPaddingTop={undefined}
        onClose={() => setStep("none")}
      >
        <SheetActionBody
          primary={{
            label: "查看会员方案",
            background: SHEET_BRAND.shirin,
            onClick: () => setStep("membership"),
          }}
          secondary={{ label: "以后再说", onClick: () => setStep("none") }}
        >
          <SheetCardSubtitle color={SHEET_BRAND.shirin}>
            升级会员，让孩子获得更完整的AI英语学习支持
          </SheetCardSubtitle>
          <SheetBenefitList items={["AI反馈纠错", "AI学习记忆", "更多AI陪伴时间"]} />
        </SheetActionBody>
      </StandardSheet>

      <StandardSheet
        open={step === "quota"}
        title="今天的AI学习时间已用完"
        brandColor={SHEET_BRAND.shirin}
        zClass="z-[70]"
        contentPaddingTop={undefined}
        onClose={() => setStep("none")}
      >
        <SheetActionBody
          primary={{
            label: "升级会员",
            background: SHEET_BRAND.shirin,
            onClick: () => setStep("membership"),
          }}
          secondary={{ label: "明天继续", onClick: () => setStep("none") }}
        >
          <SheetCardSubtitle color={SHEET_BRAND.shirin}>
            升级会员，获得更多每日AI陪伴时间
          </SheetCardSubtitle>
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-5">
            <div className="text-center">
              <p className="text-[12px] leading-none" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                今日AI使用
              </p>
              <p
                className="mt-2 text-[24px] leading-none font-semibold"
                style={{ color: SHEET_BRAND.shirin }}
              >
                20 / 20<span className="ml-1 text-[13px] font-normal">分钟</span>
              </p>
            </div>
            <div
              className="w-full max-w-[240px] rounded-2xl px-4 py-3 text-center"
              style={{ background: "color-mix(in oklab, var(--shirin) 10%, white)" }}
            >
              <p className="text-[12px] leading-none" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                升级后 · Premium Plus
              </p>
              <p className="mt-2 text-[16px] leading-none font-semibold" style={{ color: "var(--foreground)" }}>
                30分钟 / 天
              </p>
            </div>
          </div>
        </SheetActionBody>
      </StandardSheet>

      <StandardSheet
        open={step === "membership"}
        title="会员方案"
        brandColor={SHEET_BRAND.paisley}
        zClass="z-[80]"
        onClose={() => setStep("none")}
      >
        <MembershipCards open={step === "membership"} />
      </StandardSheet>
    </>
  );
}
