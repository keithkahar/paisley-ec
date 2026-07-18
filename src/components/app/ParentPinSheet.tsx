import { useEffect, useState } from "react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";

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
    <StandardSheet
      open={open}
      title={isSet ? "设置家长密码" : "请输入家长密码"}
      brandColor={SHEET_BRAND.paisley}
      onClose={onClose}
    >
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
    </StandardSheet>
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