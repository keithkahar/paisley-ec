import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import {
  SheetActionBody,
  SheetActions,
  SheetBenefitList,
  SheetCardSubtitle,
} from "@/components/app/SheetActions";
import { AddLearnerSheet } from "@/components/app/LearnerSelectFlow";
import { useLearners } from "@/lib/learners";
import { useSheetDebug } from "@/lib/sheetDebug";
import wechatWhite from "@/assets/brand/wechat-white.png.asset.json";
import {
  clearLearnerCreationPending,
  clearVisitorQuotaPrompt,
  clearDailyLimitPrompt,
  dismissDailyLimitPrompt,
  clearWordieLimitPrompt,
  dismissWordieLimitPrompt,
  clearBloxiaLimitPrompt,
  dismissBloxiaLimitPrompt,
  shouldShowBloxiaLimitPrompt,
  completeLearningJourney,
  dismissLearningJourneyPrompt,
  dismissVisitorQuotaPrompt,
  markLearnerCreationPending,
  setJourneyParentPin,
  shouldResumeLearnerCreation,
  shouldShowDailyLimitPrompt,
  shouldShowWordieLimitPrompt,
  shouldShowLearningJourneyPrompt,
  shouldShowVisitorQuotaPrompt,
  useLearningJourney,
} from "@/lib/learningJourney";

const PAISLEY = "var(--paisley)";

type Step =
  | "none"
  | "quota"
  | "daily"
  | "wordie"
  | "bloxia"
  | "intro"
  | "guardian"
  | "guardian-error"
  | "pin"
  | "learner";

/**
 * First Learning Journey creation flow.
 * Hosted by /profile (the mini-program's practice-summary page):
 * intro sheet -> parent password -> add learner -> success page.
 */
export function LearningJourneyFlow({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const navigate = useNavigate();
  const { journey } = useLearningJourney();
  const { hasLearner, addLearner } = useLearners();
  const [step, setStep] = useState<Step>("none");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const debug = useSheetDebug();

  // Open or resume the flow, mirroring maybeOpenLearningJourneyFlow().
  useEffect(() => {
    if (step !== "none") return;
    // Debug: /profile?sheet=<slug> force-opens one step (see /sheets).
    const forced: Record<string, Step> = {
      "journey-quota": "quota",
      "limit-used": "daily",
      "limit-used-wordie": "wordie",
      "limit-used-bloxia": "bloxia",
      "create-journey": "intro",
      "guardian-account": "guardian",
      "guardian-error": "guardian-error",
      "setup-parent-pin": "pin",
      "create-learner": "learner",
    };
    if (forced[debug]) {
      setStep(forced[debug]);
      return;
    }
    if (shouldShowDailyLimitPrompt()) {
      setStep("daily");
      return;
    }
    if (shouldShowWordieLimitPrompt()) {
      setStep("wordie");
      return;
    }
    if (shouldShowBloxiaLimitPrompt()) {
      setStep("bloxia");
      return;
    }
    if (shouldShowVisitorQuotaPrompt(hasLearner)) {
      setStep("quota");
      return;
    }
    if (shouldResumeLearnerCreation()) {
      markLearnerCreationPending();
      setStep("learner");
      return;
    }
    if (shouldShowLearningJourneyPrompt(hasLearner)) setStep("intro");
  }, [step, hasLearner, journey, debug]);

  useEffect(() => {
    onOpenChange?.(step !== "none");
  }, [step, onOpenChange]);

  // Reset the PIN fields whenever the PIN step is entered.
  useEffect(() => {
    if (step !== "pin") return;
    setPin("");
    setConfirmPin("");
    setError("");
  }, [step]);

  const submitPin = () => {
    const result = setJourneyParentPin(pin, confirmPin);
    if (!result.ok) return setError(result.message);
    setError("");
    markLearnerCreationPending();
    setStep("learner");
  };

  const dismiss = () => {
    dismissLearningJourneyPrompt();
    setStep("none");
  };

  // A single sheet instance hosts every step so transitions (especially back
  // navigation) morph in place instead of closing/reopening the sheet.
  const stepBrand =
    step === "daily"
      ? SHEET_BRAND.shirin
      : step === "wordie"
        ? SHEET_BRAND.wordie
        : step === "bloxia"
          ? SHEET_BRAND.bloxia
          : SHEET_BRAND.paisley;

  const sheetTitle =
    step === "guardian"
      ? "创建家长账户"
      : step === "guardian-error"
        ? "无法创建家长账户"
        : step === "pin"
          ? "请设置家长PIN"
          : step === "quota"
            ? "孩子的学习旅程还未开启"
            : step === "daily"
              ? "体验次数已用完"
              : step === "wordie" || step === "bloxia"
                ? "体验次数已用完"
                : "创建孩子的学习旅程";

  return (
    <>
      <StandardSheet
        open={step !== "none" && step !== "learner"}
        title={sheetTitle}
        brandColor={stepBrand}
        zClass="z-[70]"
        contentPaddingTop={undefined}
        stepLabel={step === "guardian" ? "1/3" : step === "pin" ? "2/3" : undefined}
        showBack={step === "guardian" || step === "pin"}
        onClose={
          step === "guardian"
            ? () => setStep("intro")
            : step === "pin"
              ? () => setStep("guardian")
              : step === "quota"
                ? () => {
                    dismissVisitorQuotaPrompt();
                    setStep("none");
                  }
                : step === "daily"
                  ? () => {
                      dismissDailyLimitPrompt();
                      setStep("none");
                    }
                  : step === "wordie"
                    ? () => {
                        dismissWordieLimitPrompt();
                        setStep("none");
                      }
                    : step === "bloxia"
                      ? () => {
                          dismissBloxiaLimitPrompt();
                          setStep("none");
                        }
                      : dismiss
        }
      >
        {step === "bloxia" ? (
        <SheetActionBody
          primary={{
            label: "开始创建",
            background: SHEET_BRAND.bloxia,
            disabled: busy,
            onClick: () => {
              clearBloxiaLimitPrompt();
              setStep("guardian");
            },
          }}
          secondary={{
            label: "以后再说",
            onClick: () => {
              dismissBloxiaLimitPrompt();
              setStep("none");
            },
          }}
        >
          <SheetCardSubtitle color={SHEET_BRAND.bloxia}>创建孩子学习档案｜开始探索Bloxia成长世界｜收集成长徽章</SheetCardSubtitle>
          <SheetBenefitList items={["创建Bloxian身份", "保存成长记录", "开启7天免费探索"]} />
        </SheetActionBody>
        ) : step === "wordie" ? (
        <SheetActionBody
          primary={{
            label: "开始创建",
            background: SHEET_BRAND.wordie,
            disabled: busy,
            onClick: () => {
              clearWordieLimitPrompt();
              setStep("guardian");
            },
          }}
          secondary={{
            label: "以后再说",
            onClick: () => {
              dismissWordieLimitPrompt();
              setStep("none");
            },
          }}
        >
          <SheetCardSubtitle color={SHEET_BRAND.wordie}>创建孩子学习档案｜继续使用myWordie学习</SheetCardSubtitle>
          <SheetBenefitList
            items={["创建专属词汇记录", "保存AI学习记录", "开启7天免费体验"]}
          />
        </SheetActionBody>
        ) : step === "daily" ? (
        <SheetActionBody
          primary={{
            label: "开始创建",
            background: SHEET_BRAND.shirin,
            disabled: busy,
            onClick: () => {
              clearDailyLimitPrompt();
              setStep("guardian");
            },
          }}
          secondary={{
            label: "以后再说",
            onClick: () => {
              dismissDailyLimitPrompt();
              setStep("none");
            },
          }}
        >
          <SheetCardSubtitle color={SHEET_BRAND.shirin}>创建孩子学习档案｜继续与ShirinTalk一起练习</SheetCardSubtitle>
          <SheetBenefitList
            items={["继续个性化学习", "保存AI学习记录", "开启7天免费体验"]}
          />
        </SheetActionBody>
        ) : step === "quota" ? (
        <SheetActionBody
          primary={{
            label: "开始创建",
            disabled: busy,
            onClick: () => {
              clearVisitorQuotaPrompt();
              setStep("intro");
            },
          }}
          secondary={{
            label: "以后再说",
            onClick: () => {
              dismissVisitorQuotaPrompt();
              setStep("none");
            },
          }}
        >
          <SheetCardSubtitle>创建孩子档案｜保存学习记录｜开启7天免费体验</SheetCardSubtitle>
          <SheetBenefitList
            items={["获得完整学习体验", "保存孩子的学习进度", "开启Bloxia成长地图"]}
          />
        </SheetActionBody>
        ) : step === "intro" ? (
        <SheetActionBody
          primary={{ label: "开始创建", disabled: busy, onClick: () => setStep("guardian") }}
          secondary={{
            label: "以后再说",
            onClick: () => {
              dismissLearningJourneyPrompt();
              setStep("none");
            },
          }}
        >
          <SheetCardSubtitle>保存孩子的学习记录 | 开启 PEC 陪伴成长之旅</SheetCardSubtitle>
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
            {error && (
              <p
                className="mt-2 text-[11px] font-semibold text-center"
                style={{ color: "var(--destructive)" }}
              >
                {error}
              </p>
            )}
        </SheetActionBody>
        ) : step === "guardian" ? (
        <SheetActionBody
          primary={{
              label: (
                <span className="inline-flex items-center justify-center gap-2">
                  <img
                    src={wechatWhite.url}
                    alt=""
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ width: 22, height: 22, objectFit: "contain" }}
                  />
                  微信授权并继续
                </span>
              ),
            disabled: busy,
            onClick: () => setStep("guardian-error"),
          }}
        >
          <SheetCardSubtitle>用于陪伴和管理孩子的学习旅程</SheetCardSubtitle>
          <SheetBenefitList
            items={["保存孩子的学习记录", "管理孩子的学习档案", "查看孩子的成长数据"]}
          />
          {error && (
            <p
              className="mt-2 text-[11px] font-semibold text-center"
              style={{ color: "var(--destructive)" }}
            >
              {error}
            </p>
          )}
        </SheetActionBody>
        ) : step === "guardian-error" ? (
        <SheetActionBody
          primary={{
            label: (
              <span className="inline-flex items-center justify-center gap-2">
                <img
                  src={wechatWhite.url}
                  alt=""
                  aria-hidden="true"
                  className="shrink-0"
                  style={{ width: 22, height: 22, objectFit: "contain" }}
                />
                重新授权
              </span>
            ),
            disabled: busy,
            onClick: () => setStep("guardian"),
          }}
          secondary={{ label: "以后再说", onClick: () => setStep("pin") }}
        >
          <SheetCardSubtitle>需要微信授权创建家长账户，并保护孩子的学习记录</SheetCardSubtitle>
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center -mx-1 px-1">
              <div
                className="grid place-items-center rounded-full overflow-hidden"
                style={{
                  width: 88,
                  height: 88,
                  background: "color-mix(in oklab, var(--paisley) 8%, white)",
                  boxShadow: "none",
                }}
              >
                <img
                  src={wechatWhite.url}
                  alt=""
                  aria-hidden="true"
                  className="shrink-0"
                  style={{ width: 46, height: 46, objectFit: "contain" }}
                />
              </div>
            </div>
            {error && (
              <p
                className="mt-2 text-[11px] font-semibold text-center"
                style={{ color: "var(--destructive)" }}
              >
                {error}
              </p>
            )}
        </SheetActionBody>
        ) : (
        <div className="flex flex-col h-full min-h-0">
          <div className="flex-1 min-h-0">
            <p
              className="text-[12px] leading-[1.55] text-center"
              style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
            >
              6位数字｜用于进入家长中心，保护孩子的学习数据
            </p>

            <div className="mt-5 space-y-3">
              <JourneyPinInput label="PIN" value={pin} onChange={setPin} autoFocus />
              <JourneyPinInput label="确认" value={confirmPin} onChange={setConfirmPin} />
            </div>

            {error && (
              <p
                className="mt-3 text-[12px] font-semibold text-center"
                style={{ color: "var(--destructive)" }}
              >
                {error}
              </p>
            )}
          </div>

          <SheetActions primary={{ label: "保存", onClick: submitPin }} />
        </div>
        )}
      </StandardSheet>

      <AddLearnerSheet
        title="创建孩子档案"
        open={step === "learner"}
        stepLabel="3/3"
        onClose={() => {
          clearLearnerCreationPending();
          setStep("none");
        }}
        onCreate={(created) => {
          addLearner(created);
          completeLearningJourney(created.name);
          navigate({ to: "/learning-journey-success" });
        }}
      />
    </>
  );
}

function JourneyPinInput({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <div
        className="rounded-full py-4 px-4 flex items-center gap-3 transition-colors focus-within:bg-white"
        style={{
          background: "color-mix(in oklab, var(--paisley) 6%, white)",
          border: "1px solid color-mix(in oklab, var(--paisley) 14%, white)",
        }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.1em] shrink-0"
          style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
        >
          {label}
        </span>
        <input
          type={visible ? "text" : "password"}
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="flex-1 min-w-0 bg-transparent outline-none text-[17px] font-semibold tabular-nums tracking-[0.35em]"
          style={{ color: PAISLEY }}
        />
        {value.length > 0 && (
          <button
            type="button"
            aria-label={visible ? "隐藏密码" : "显示密码"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 grid place-items-center h-7 w-7 rounded-full transition-opacity active:opacity-60"
            style={{ color: "color-mix(in oklab, var(--foreground) 45%, white)" }}
          >
            {visible ? <EyeOff size={17} strokeWidth={2} /> : <Eye size={17} strokeWidth={2} />}
          </button>
        )}
      </div>
    </label>
  );
}
