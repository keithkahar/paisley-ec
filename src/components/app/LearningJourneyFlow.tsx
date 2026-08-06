import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import { AddLearnerSheet } from "@/components/app/LearnerSelectFlow";
import { useLearners } from "@/lib/learners";
import {
  completeLearningJourney,
  dismissLearningJourneyPrompt,
  ensureGuardianAccount,
  markLearnerCreationPending,
  setJourneyParentPin,
  shouldResumeLearnerCreation,
  shouldShowLearningJourneyPrompt,
  useLearningJourney,
} from "@/lib/learningJourney";

const PAISLEY = "var(--paisley)";

type Step = "none" | "intro" | "pin" | "learner";

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

  const continueJourney = async () => {
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
        subtitle="保存孩子的学习进度，让 Paizley 更好地陪伴孩子成长。"
        onClose={() => {
          dismissLearningJourneyPrompt();
          setStep("none");
        }}
      >
        <div className="flex flex-col h-full min-h-0 mt-5">
          {/* Membership-style benefit card */}
          <div
            className="rounded-[28px] p-5 flex-1 min-h-0 flex flex-col"
            style={{
              background: "white",
              border: "1.5px solid color-mix(in oklab, var(--paisley) 10%, white)",
              boxShadow: "0 2px 12px rgba(1, 70, 185, 0.06)",
            }}
          >
            <h3
              className="text-[24px] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: PAISLEY,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Free
            </h3>

            <div className="mt-2 flex items-baseline justify-between gap-2">
              <p className="text-[13px] leading-none" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                开启学习旅程
              </p>
              <span
                className="shrink-0 text-[11px] font-normal leading-none"
                style={{ color: "var(--muted-foreground)" }}
              >
                多设备·云储存
              </span>
            </div>

            <div
              className="mt-3 w-full"
              style={{ height: 1, background: "color-mix(in oklab, var(--foreground) 10%, transparent)" }}
            />

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-[18px] leading-none self-start mt-1"
                  style={{ color: "var(--foreground)", fontWeight: 300 }}
                >
                  ¥
                </span>
                <span
                  className="text-[28px] leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--foreground)", fontWeight: 300 }}
                >
                  0
                </span>
                <span className="text-[13px] leading-none ml-1" style={{ color: "var(--muted-foreground)" }}>
                  /月
                </span>
              </div>
              <p className="text-[11px] leading-none" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                注册即赠
              </p>
            </div>

            <div
              className="mt-[25px] flex-1 min-h-0 -mx-1 px-1 overflow-y-auto scroll-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <ul className="space-y-2 pb-2">
                {[
                  "保存孩子的学习记录",
                  "记录孩子的成长变化",
                  "获得个性化学习体验",
                  "Bloxia 成长地图与徽章",
                  "家长中心查看学习进度",
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

            {error && (
              <p className="mt-2 text-[11px] font-semibold text-center" style={{ color: "var(--destructive)" }}>
                {error}
              </p>
            )}

            <div className="mt-[24px] shrink-0">
              <button
                type="button"
                disabled={busy}
                onClick={continueJourney}
                className="w-full h-11 rounded-full text-[13px] font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60 flex items-center justify-center"
                style={{ background: PAISLEY }}
              >
                继续创建
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              dismissLearningJourneyPrompt();
              setStep("none");
            }}
            className="mt-3 shrink-0 w-full text-[13px] font-semibold text-muted-foreground"
          >
            稍后再说
          </button>
        </div>
      </StandardSheet>

      <JourneyPinSheet
        open={step === "pin"}
        onClose={() => {
          dismissLearningJourneyPrompt();
          setStep("none");
        }}
        onDone={() => {
          markLearnerCreationPending();
          setStep("learner");
        }}
      />

      <AddLearnerSheet
        open={step === "learner"}
        onClose={() => setStep("none")}
        onCreate={(created) => {
          addLearner(created);
          completeLearningJourney(created.name);
          setStep("none");
          navigate({ to: "/learning-journey-success" });
        }}
      />
    </>
  );
}

function JourneyPinSheet({
  open,
  onClose,
  onDone,
}: {
  open: boolean;
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
      title="设置家长密码"
      brandColor={SHEET_BRAND.paisley}
      onClose={onClose}
    >
      <div className="flex flex-col h-full">
        <p
          className="text-[12px] leading-[1.55] text-center"
          style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
        >
          此密码用于保护孩子的学习数据，并进入家长中心
          <br />
          请设置 6 位由字母和数字组合的密码
        </p>

        <div className="mt-5 space-y-3">
          <JourneyPinInput label="Password" value={pin} onChange={setPin} autoFocus />
          <JourneyPinInput label="Confirm" value={confirmPin} onChange={setConfirmPin} />
        </div>

        {error && (
          <p className="mt-3 text-[12px] font-semibold text-center" style={{ color: "var(--destructive)" }}>
            {error}
          </p>
        )}

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={submit}
            className="w-full rounded-full py-4 px-4 text-[17px] font-medium text-white transition-transform active:scale-[0.98]"
            style={{ background: PAISLEY }}
          >
            完成
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
        className="rounded-full h-[60px] px-6 flex items-center gap-3 transition-colors focus-within:bg-white"
        style={{
          background: "color-mix(in oklab, var(--paisley) 6%, white)",
          border: "1px solid color-mix(in oklab, var(--paisley) 14%, white)",
        }}
      >
        <input
          type={visible ? "text" : "password"}
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 6))}
          className="flex-1 min-w-0 bg-transparent outline-none text-[16px] font-medium placeholder:font-normal placeholder:text-muted-foreground"
          style={{ color: PAISLEY, letterSpacing: value ? "0.28em" : "normal" }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "隐藏密码" : "显示密码"}
          className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white border border-border active:scale-95 transition-transform"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" strokeWidth={2} style={{ color: PAISLEY }} />
          ) : (
            <Eye className="h-4 w-4" strokeWidth={2} style={{ color: PAISLEY }} />
          )}
        </button>
      </div>
    </label>
  );
}