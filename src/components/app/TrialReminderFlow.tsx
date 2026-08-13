import { useEffect, useState } from "react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { SheetActionBody, SheetBenefitList, SheetCardSubtitle } from "@/components/app/SheetActions";
import { MembershipCards } from "@/routes/parent";
import { useSheetDebug } from "@/lib/sheetDebug";

/**
 * Free-trial nudges shown on the home page.
 *  day 5 -> 孩子的学习旅程正在成长
 *  day 7 -> 7天免费旅程即将结束
 * Primary button on both opens the Membership bottom sheet.
 *
 * These sheets only open from the debug preview list (/sheets), i.e. when the
 * home page is opened with ?sheet=trial-day5 / trial-day7 / membership /
 * purchase-phone. Normal home visits never auto-open them.
 */
type Step = "none" | "day5" | "day7" | "membership";

export function TrialReminderFlow() {
  const [step, setStep] = useState<Step>("none");
  const debug = useSheetDebug();

  useEffect(() => {
    setStep(
      debug === "trial-day5"
        ? "day5"
        : debug === "trial-day7"
          ? "day7"
          : debug === "membership" ||
              debug === "purchase-phone" ||
              debug === "confirm-subscribe" ||
              debug === "confirm-subscribe-plus" ||
              debug === "membership-activated"
            || debug === "payment-failed"
            ? "membership"
            : "none",
    );
  }, [debug]);

  const isDay5 = step === "day5";

  return (
    <>
      <StandardSheet
        open={step === "day5" || step === "day7"}
        title={isDay5 ? "孩子的学习旅程正在成长" : "7天免费旅程即将结束"}
        brandColor={SHEET_BRAND.paisley}
        zClass="z-[70]"
        contentPaddingTop={undefined}
        onClose={() => setStep(isDay5 ? "day7" : "none")}
      >
        {isDay5 ? (
          <SheetActionBody
            primary={{ label: "查看会员方案", onClick: () => setStep("membership") }}
            secondary={{ label: "继续体验", onClick: () => setStep("day7") }}
          >
            <SheetCardSubtitle>继续陪伴孩子学习｜让成长持续发生</SheetCardSubtitle>
            <SheetBenefitList
              items={["延续孩子的学习记录", "获得更多AI英语陪伴", "解锁更多成长体验"]}
            />
          </SheetActionBody>
        ) : (
          <SheetActionBody
            primary={{ label: "升级会员", onClick: () => setStep("membership") }}
            secondary={{ label: "以后考虑", onClick: () => setStep("none") }}
          >
            <SheetCardSubtitle>继续陪伴孩子成长｜开启更完整的学习体验</SheetCardSubtitle>
            <SheetBenefitList
              items={[
                "更多AI英语陪伴时间",
                "AI反馈与学习记忆",
                "完整查看孩子成长数据",
                "解锁更多Bloxia成长内容",
              ]}
            />
          </SheetActionBody>
        )}
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
