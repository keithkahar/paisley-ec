import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import wechatWhite from "@/assets/brand/wechat-white.png.asset.json";

const PIN_STORAGE_KEY = "paisley.parent.pin";
const PAISLEY = "var(--paisley)";

export const PARENT_UNLOCK_FLAG = "paisley.parent.unlocked";

export function ParentPinSheet({ open, onClose, onUnlock }: { open: boolean; onClose: () => void; onUnlock: () => void }) {
  const [mode, setMode] = useState<"set" | "enter" | "recover" | "loading">("loading");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const saved = typeof window !== "undefined" ? localStorage.getItem(PIN_STORAGE_KEY) : null;
    setMode(saved ? "enter" : "set");
    setPin("");
    setConfirmPin("");
    setError("");
  }, [open]);

  if (!open) return null;
  if (mode === "loading") return null;

  const isSet = mode === "set";
  const isRecover = mode === "recover";
  const sanitize = (s: string) => s.replace(/[^A-Za-z0-9]/g, "").slice(0, 6);

  const handleSubmit = () => {
    setError("");
    if (isSet) {
      if (pin.length !== 6 || !/[A-Za-z]/.test(pin) || !/\d/.test(pin))
        return setError("密码需为 6 位，且由字母与数字组合");
      if (pin !== confirmPin) return setError("两次输入的密码不一致");
      localStorage.setItem(PIN_STORAGE_KEY, pin);
      setMode("enter");
      setPin("");
      setConfirmPin("");
    } else {
      const saved = localStorage.getItem(PIN_STORAGE_KEY);
      if (pin === saved) onUnlock();
      else setError("密码不正确");
    }
  };

  const handleForgot = () => {
    setPin("");
    setConfirmPin("");
    setError("");
    setMode("recover");
  };

  const handleRecover = () => {
    // Debug flow: simulate verified WeChat identity, then allow resetting PIN.
    setMode("set");
  };

  const sheetTitle = isSet ? "设置家长密码" : isRecover ? "找回家长PIN码" : "请输入家长PIN码";

  return (
    <StandardSheet
      open={open}
      title={sheetTitle}
      brandColor={SHEET_BRAND.paisley}
      subtitle={isRecover ? "请验证家长身份，以保护孩子的学习数据" : undefined}
      showBack={isRecover}
      onClose={isRecover ? () => setMode("enter") : onClose}
    >
      {isRecover ? (
        <div className="flex flex-col h-full min-h-0">
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center -mx-1 px-1">
            <div
              className="grid place-items-center rounded-full overflow-hidden"
              style={{
                width: 88,
                height: 88,
                background: "color-mix(in oklab, var(--paisley) 8%, white)",
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

          <div className="mt-5 shrink-0" style={{ height: 48 }}>
            <button
              type="button"
              onClick={handleRecover}
              className="w-full h-full rounded-full text-[16px] font-medium text-white transition-transform active:scale-[0.98] inline-flex items-center justify-center gap-2"
              style={{ background: PAISLEY }}
            >
              <img
                src={wechatWhite.url}
                alt=""
                aria-hidden="true"
                className="shrink-0"
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
              微信验证
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p
            className="text-[12px] leading-[1.55] text-center"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
          >
            {isSet ? (
              <>
                请设置 6 位由字母和数字组合的密码
                <br />
                此密码用于避免儿童误入家长中心
              </>
            ) : (
              "此密码用于避免儿童误入家长中心"
            )}
          </p>

          <div className="mt-5 space-y-3">
            <PinInput label="密码" value={pin} onChange={(v) => setPin(sanitize(v))} autoFocus />
            {isSet && (
              <PinInput label="确认" value={confirmPin} onChange={(v) => setConfirmPin(sanitize(v))} />
            )}
          </div>

          {error && (
            <p className="mt-3 text-[12px] font-semibold text-center" style={{ color: "var(--destructive)" }}>
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-full py-4 px-4 text-[17px] font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ background: PAISLEY }}
          >
            {isSet ? "设置密码" : "解锁"}
          </button>

          {!isSet && (
            <button
              type="button"
              onClick={handleForgot}
              className="mt-3 w-full text-[12px] font-semibold"
              style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
            >
              忘记密码？重新设置
            </button>
          )}
        </div>
      )}
    </StandardSheet>
  );
}

function PinInput({ label, value, onChange, autoFocus }: { label: string; value: string; onChange: (v: string) => void; autoFocus?: boolean }) {
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
          inputMode="text"
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[17px] font-semibold tabular-nums tracking-[0.35em]"
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