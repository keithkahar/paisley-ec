import { useEffect, useState } from "react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { SheetActionBody, SheetBenefitList, SheetCardSubtitle } from "@/components/app/SheetActions";
import { MembershipCards } from "@/routes/parent";
import { useSheetDebug } from "@/lib/sheetDebug";

/**
 * "继续探索更多学习内容" upsell sheet (blue theme).
 *  myWordie  -> Wordie-X / Word Cards / CEFR 高级 / Learning Trends 限制  (wordie blue)
 *  My Profile -> 学习趋势 / 学习目标                                      (PEC paisley blue)
 * Primary button opens the Membership bottom sheet.
 * Opens only from the debug preview list (?sheet=content-more).
 */
export function ContentUpsellFlow({ variant = "wordie" }: { variant?: "wordie" | "profile" }) {
  const [step, setStep] = useState<"none" | "content" | "membership">("none");
  const debug = useSheetDebug();
  const brand = variant === "profile" ? SHEET_BRAND.paisley : SHEET_BRAND.wordie;

  useEffect(() => {
    setStep(debug === "content-more" ? "content" : "none");
  }, [debug]);

  return (
    <>
      <StandardSheet
        open={step === "content"}
        title="继续探索更多学习内容"
        brandColor={brand}
        zClass="z-[70]"
        contentPaddingTop={undefined}
        onClose={() => setStep("none")}
      >
        <SheetActionBody
          primary={{ label: "查看会员方案", background: brand, onClick: () => setStep("membership") }}
          secondary={{ label: "以后再说", onClick: () => setStep("none") }}
        >
          <SheetCardSubtitle color={brand}>升级会员｜开启完整学习体验</SheetCardSubtitle>
          <SheetBenefitList items={["更多学习内容", "个性化学习记录", "成长趋势分析"]} />
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
