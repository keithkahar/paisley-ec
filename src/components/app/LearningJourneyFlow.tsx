import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { AddLearnerSheet } from "@/components/app/LearnerSelectFlow";
import { useLearners } from "@/lib/learners";
import wechatWhite from "@/assets/brand/wechat-white.png.asset.json";
import {
  clearLearnerCreationPending,
  completeLearningJourney,
  dismissLearningJourneyPrompt,
  markLearnerCreationPending,
  setJourneyParentPin,
  shouldResumeLearnerCreation,
  shouldShowLearningJourneyPrompt,
  useLearningJourney,
} from "@/lib/learningJourney";

const PAISLEY = "var(--paisley)";

type Step = "none" | "intro" | "guardian" | "guardian-error" | "pin" | "learner";

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

  // Open or resume the flow, mirroring maybeOpenLearningJourneyFlow().
  useEffect(() => {
    if (step !== "none") return;
    if (shouldResumeLearnerCreation()) {
      markLearnerCreationPending();
      setStep("learner");
      return;
    }
    if (shouldShowLearningJourneyPrompt(hasLearner)) setStep("intro");
  }, [step, hasLearner, journey]);

  useEffect(() => {
    onOpenChange?.(step !== "none");
  }, [step, onOpenChange]);

  const createGuardian = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await ensureGuardianAccount();
      setStep("pin");
    } catch {
      setError("创建失败，请稍后再试");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StandardSheet
        open={step === "intro"}
        title="创建孩子的学习旅程"
        brandColor={SHEET_BRAND.paisley}
        onClose={() => {
          dismissLearningJourneyPrompt();
          setStep("none");
        }}
      >
        <div className="flex flex-col h-full min-h-0 mt-5" style={{ height: 385 }}>
          {/* Membership-style benefit card */}
          <div
            className="rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{ background: "white" }}
          >
            <div className="flex items-baseline justify-center gap-2" style={{ marginTop: 10 }}>
              <p className="text-[13px] leading-none" style={{ color: PAISLEY, fontWeight: 400 }}>
                保存学习记录 | 让 PEC 更好地陪伴孩子成长
              </p>
            </div>

            <div
              className="mt-[70px] flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide text-center"
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
                    <span
                      className="text-[11px] leading-[1.55]"
                      style={{ color: "var(--foreground)", fontWeight: 400 }}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <p
                className="mt-2 text-[11px] font-semibold text-center"
                style={{ color: "var(--destructive)" }}
              >
                {error}
              </p>
            )}
          </div>

          <div className="mt-5 shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              disabled={busy}
              onClick={() => setStep("guardian")}
              className="w-full h-full rounded-full text-[16px] font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-60"
              style={{ background: PAISLEY }}
            >
              马上创建
            </button>
            <button
              type="button"
              onClick={() => {
                dismissLearningJourneyPrompt();
                setStep("none");
              }}
              className="mt-3 w-full text-[13px] font-medium text-center bg-transparent border-0 p-0"
              style={{ color: "var(--muted-foreground)" }}
            >
              稍后再说
            </button>
          </div>
        </div>
      </StandardSheet>

      <StandardSheet
        open={step === "guardian"}
        title="创建家长账户"
        brandColor={SHEET_BRAND.paisley}
        showBack
        onClose={() => setStep("intro")}
      >
        <div className="flex flex-col min-h-0" style={{ height: 429 }}>
          <div
            className="mt-5 rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{ background: "white" }}
          >
            <div className="flex items-baseline justify-center gap-2" style={{ marginTop: 10 }}>
              <p className="text-[13px] leading-none" style={{ color: PAISLEY, fontWeight: 400 }}>
                用于管理孩子的学习旅程
              </p>
            </div>

            <div
              className="mt-[70px] flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide text-center"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <ul className="space-y-2 pb-2 mx-auto inline-block text-left w-fit">
                {["保存孩子的学习记录", "管理孩子的学习档案", "查看孩子的成长数据"].map(
                  (benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check
                        className="shrink-0 mt-[2px] h-3.5 w-3.5"
                        strokeWidth={1.5}
                        style={{ color: "var(--foreground)" }}
                      />
                      <span
                        className="text-[11px] leading-[1.55]"
                        style={{ color: "var(--foreground)", fontWeight: 400 }}
                      >
                        {benefit}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {error && (
              <p
                className="mt-2 text-[11px] font-semibold text-center"
                style={{ color: "var(--destructive)" }}
              >
                {error}
              </p>
            )}
          </div>

          <div className="mt-auto shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              disabled={busy}
              onClick={() => setStep("guardian-error")}
              className="w-full h-full rounded-full text-[16px] font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-60 inline-flex items-center justify-center gap-2"
              style={{ background: PAISLEY }}
            >
              <img
                src={wechatWhite.url}
                alt=""
                aria-hidden="true"
                className="shrink-0"
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
              微信授权并继续
            </button>
          </div>
        </div>
      </StandardSheet>

      <StandardSheet
        open={step === "guardian-error"}
        title="无法创建家长账户"
        brandColor={SHEET_BRAND.paisley}
        onClose={() => {
          dismissLearningJourneyPrompt();
          setStep("none");
        }}
      >
        <div className="flex flex-col min-h-0" style={{ height: 385 }}>
          <div
            className="mt-5 rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{ background: "white" }}
          >
            <div className="flex items-baseline justify-center gap-2" style={{ marginTop: 10 }}>
              <p className="text-[13px] leading-none" style={{ color: PAISLEY, fontWeight: 400 }}>
                需要微信授权来创建家长账户，并保护学习记录
              </p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col items-center justify-center -mx-1 px-1">
              <div
                className="grid place-items-center rounded-full"
                style={{
                  width: 88,
                  height: 88,
                  background: "color-mix(in oklab, var(--paisley) 8%, white)",
                  border: "1px solid color-mix(in oklab, var(--paisley) 14%, white)",
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
          </div>

          <div className="mt-5 shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              disabled={busy}
              onClick={() => setStep("guardian")}
              className="w-full h-full rounded-full text-[16px] font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-60 inline-flex items-center justify-center gap-2"
              style={{ background: PAISLEY }}
            >
              <img
                src={wechatWhite.url}
                alt=""
                aria-hidden="true"
                className="shrink-0"
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
              重新授权
            </button>
            <button
              type="button"
              onClick={() => setStep("pin")}
              className="mt-3 w-full text-[13px] font-medium text-center bg-transparent border-0 p-0"
              style={{ color: "var(--muted-foreground)" }}
            >
              稍后再说
            </button>
          </div>
        </div>
      </StandardSheet>

      <JourneyPinSheet
        open={step === "pin"}
        showBack
        onClose={() => setStep("guardian")}
        onDone={() => {
          markLearnerCreationPending();
          setStep("learner");
        }}
      />

      <AddLearnerSheet
        title="创建孩子档案"
        open={step === "learner"}
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

function JourneyPinSheet({
  open,
  showBack,
  onClose,
  onDone,
}: {
  open: boolean;
  showBack?: boolean;
  onClose: () => void;
  onDone: () => void;
}) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setPin("");
    setConfirmPin("");
    setError("");
  }, [open]);

  const submit = () => {
    const result = setJourneyParentPin(pin, confirmPin);
    if (!result.ok) return setError(result.message);
    setError("");
    onDone();
  };

  return (
    <StandardSheet
      open={open}
      title="设置家长PIN码"
      brandColor={SHEET_BRAND.paisley}
      showBack={showBack}
      onClose={onClose}
    >
      <div className="flex flex-col min-h-0" style={{ height: 429 }}>
        <div className="flex-1 min-h-0">
          <p
            className="text-[12px] leading-[1.55] text-center"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
          >
            用于保护孩子的学习数据，并进入家长中心
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

        <div className="mt-auto shrink-0" style={{ height: 48 }}>
          <button
            type="button"
            onClick={submit}
            className="w-full h-full rounded-full text-[17px] font-medium text-white transition-transform active:scale-[0.98]"
            style={{ background: PAISLEY }}
          >
            保存
          </button>
        </div>
      </div>
    </StandardSheet>
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
