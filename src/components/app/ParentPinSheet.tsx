import { useEffect, useState } from "react";

const PIN_STORAGE_KEY = "paisley.parent.pin";
const PAISLEY = "var(--paisley)";

export const PARENT_UNLOCK_FLAG = "paisley.parent.unlocked";

export function ParentPinSheet({ open, onClose, onUnlock }: { open: boolean; onClose: () => void; onUnlock: () => void }) {
  const [mode, setMode] = useState<"set" | "enter" | "loading">("loading");
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
  const isSet = mode === "set";
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

  if (mode === "loading") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
        style={{ height: "62vh" }}
      >
        <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="flex items-center justify-center px-5 pt-2 pb-3 shrink-0">
          <p
            className="text-[17px] font-semibold tracking-tight leading-none"
            style={{ letterSpacing: "-0.01em", color: PAISLEY }}
          >
            {isSet ? "设置家长密码" : "请输入家长密码"}
          </p>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="absolute right-4 top-3 h-8 w-8 grid place-items-center rounded-full transition-colors active:scale-95"
            style={{ background: "color-mix(in oklab, var(--foreground) 6%, white)", color: "color-mix(in oklab, var(--foreground) 60%, white)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
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
              onClick={() => {
                localStorage.removeItem(PIN_STORAGE_KEY);
                setPin("");
                setConfirmPin("");
                setError("");
                setMode("set");
              }}
              className="mt-3 w-full text-[12px] font-semibold"
              style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
            >
              忘记密码？重新设置
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PinInput({ label, value, onChange, autoFocus }: { label: string; value: string; onChange: (v: string) => void; autoFocus?: boolean }) {
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
          type="password"
          inputMode="text"
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[17px] font-semibold tabular-nums tracking-[0.35em]"
          style={{ color: PAISLEY }}
        />
      </div>
    </label>
  );
}