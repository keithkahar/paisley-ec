import { useEffect, useState } from "react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { SheetActionBody, SheetBenefitList, SheetCardSubtitle } from "@/components/app/SheetActions";
import { MembershipCards } from "@/routes/parent";
import { useSheetDebug } from "@/lib/sheetDebug";

/**
 * "解锁更多成长世界" upsell sheet (Bloxia green theme).
 * Triggers: 新地图区域 / 新地点 / 新Badge / 新Collection.
 * Primary button opens the Membership bottom sheet.
 * Opens only from the debug preview list (?sheet=world-more).
 */
export function WorldUpsellFlow() {
  const [step, setStep] = useState<"none" | "world" | "membership">("none");
  const debug = useSheetDebug();
  const brand = SHEET_BRAND.bloxia;

  useEffect(() => {
    setStep(debug === "world-more" ? "world" : "none");
  }, [debug]);

  return (
    <>
      <StandardSheet
        open={step === "world"}
        title="解锁更多成长世界"
        brandColor={brand}
        zClass="z-[70]"
        onClose={() => setStep("none")}
      >
        <SheetActionBody
          primary={{ label: "查看会员方案", background: brand, onClick: () => setStep("membership") }}
          secondary={{ label: "以后再说", onClick: () => setStep("none") }}
        >
          <SheetCardSubtitle color={brand}>升级会员｜探索更多Bloxia成长内容</SheetCardSubtitle>
          <SheetBenefitList items={["更多地图探索", "更多徽章收集", "更多成长内容"]} />
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
