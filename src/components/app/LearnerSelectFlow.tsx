import { useEffect, useRef, useState } from "react";
import { Check, Plus, Minus, Trash2, Eye, EyeOff, ChevronRight, Camera, X } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";
import type { Learner } from "@/lib/learners";
import { AvatarDraggable, capitalizeName } from "@/components/app/EditProfileSheet";
import { AvatarPicker } from "@/components/app/AvatarPicker";
import { SheetActions } from "@/components/app/SheetActions";
import { useSheetDebug } from "@/lib/sheetDebug";

const PAISLEY = "var(--paisley)";
const PAISLEY_SOFT = "color-mix(in oklab, var(--paisley) 14%, white)";
const DANGER = "var(--destructive)";
export const PARENT_PIN_STORAGE_KEY = "paisley.parent.pin";

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Shared "Select A Learner" flow: selection sheet with delete mode,
 * parent-password delete confirmation, and Add A Learner profile entry.
 * Used by both /parent (learner card) and /profile (my profile hero).
 */
export function LearnerSelectFlow({
  open,
  onClose,
  learners,
  learner,
  onSelect,
  onAdd,
  onDelete,
  manage = true,
}: {
  open: boolean;
  onClose: () => void;
  learners: string[];
  learner: string;
  onSelect: (name: string) => void;
  onAdd?: (learner: Partial<Learner> & { name: string }) => void;
  onDelete?: (name: string) => void;
  /** When false, the sheet is selection-only (no add/delete) — used on /profile. */
  manage?: boolean;
}) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [target, setTarget] = useState("");
  const [deletePwOpen, setDeletePwOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [pending, setPending] = useState(learner);
  const debug = useSheetDebug();

  // Debug: ?sheet=add-learner / ?sheet=birthday opens the Add Learner sheet.
  useEffect(() => {
    if (open && (debug === "add-learner" || debug === "birthday")) setAddOpen(true);
  }, [open, debug]);

  useEffect(() => {
    if (open) {
      setPending(learner);
      return;
    }
    setDeleteMode(false);
    setTarget("");
  }, [open, learner]);

  return (
    <>
      <StandardSheet
        open={open}
        title="Select Learner"
        brandColor={SHEET_BRAND.paisley}
        onClose={() => {
          onClose();
          setDeleteMode(false);
          setTarget("");
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 mt-5">
            {learners.map((n) => {
              const active = n === pending;
              const marked = n === target;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    if (deleteMode) {
                      setTarget((t) => (t === n ? "" : n));
                      return;
                    }
                    setPending(n);
                    onSelect(n);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 py-3.5 text-left"
                >
                  {deleteMode && (
                    <span
                      className="h-[22px] w-[22px] shrink-0 rounded-full grid place-items-center"
                      style={{
                        border: `1.5px solid color-mix(in oklab, var(--destructive) ${marked ? 100 : 40}%, white)`,
                      }}
                    >
                      {marked && (
                        <span
                          className="h-[11px] w-[11px] rounded-full"
                          style={{ background: DANGER }}
                        />
                      )}
                    </span>
                  )}
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: active ? PAISLEY : "var(--foreground)" }}
                  >
                    {n}
                  </span>
                  {!deleteMode && active && (
                    <Check className="ml-auto h-5 w-5" strokeWidth={2.5} style={{ color: PAISLEY }} />
                  )}
                </button>
              );
            })}
          </div>
          {manage && (
          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              aria-label={deleteMode ? "退出删除模式" : "进入删除模式"}
              onClick={() => {
                setDeleteMode((v) => !v);
                setTarget("");
              }}
              className="h-[50px] w-[50px] shrink-0 grid place-items-center rounded-full active:scale-95 transition-transform"
            >
              <span
                className="h-7 w-7 grid place-items-center rounded-full"
                style={{
                  border: "1px solid color-mix(in oklab, var(--destructive) 45%, white)",
                  background: deleteMode ? "color-mix(in oklab, var(--destructive) 10%, white)" : "white",
                }}
              >
                <Trash2 className="h-4 w-4" style={{ color: DANGER }} strokeWidth={2} />
              </span>
            </button>
            {deleteMode ? (
              <button
                type="button"
                disabled={!target}
                onClick={() => setDeletePwOpen(true)}
                className="flex-1 h-[50px] rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
                style={{
                  background: "color-mix(in oklab, var(--destructive) 10%, white)",
                  color: DANGER,
                }}
              >
                <span className="h-7 w-7 grid place-items-center rounded-full bg-white">
                  <Minus className="h-4 w-4" strokeWidth={2.5} style={{ color: DANGER }} />
                </span>
                <span className="text-[15px] font-semibold">Delete Learner</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                className="flex-1 h-[50px] rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)", color: PAISLEY }}
              >
                <span className="h-7 w-7 grid place-items-center rounded-full bg-white">
                  <Plus className="h-4 w-4" strokeWidth={2.5} style={{ color: PAISLEY }} />
                </span>
                <span className="text-[15px] font-semibold">Add Learner</span>
              </button>
            )}
          </div>
          )}
        </div>
      </StandardSheet>

      <DeleteLearnerPasswordSheet
        open={deletePwOpen}
        learner={target}
        onClose={() => setDeletePwOpen(false)}
        onConfirm={() => {
          onDelete?.(target);
          setDeletePwOpen(false);
          setDeleteMode(false);
          setTarget("");
        }}
      />

      <AddLearnerSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={(created) => {
          onAdd?.(created);
          setAddOpen(false);
          onClose();
        }}
      />
    </>
  );
}

function DeleteLearnerPasswordSheet({
  open,
  learner,
  onClose,
  onConfirm,
}: {
  open: boolean;
  learner: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setPw("");
    setConfirmPw("");
    setError("");
  }, [open]);

  if (!open) return null;

  const submit = () => {
    setError("");
    const saved = typeof window !== "undefined" ? localStorage.getItem(PARENT_PIN_STORAGE_KEY) : null;
    if (!pw || !confirmPw) return setError("请输入并确认家长密码");
    if (pw !== confirmPw) return setError("两次输入的密码不一致");
    if (saved && pw !== saved) return setError("密码不正确");
    onConfirm();
  };

  return (
    <StandardSheet open={open} title="Enter Parent Password" brandColor={DANGER} onClose={onClose}>
      <div>
        <p
          className="text-[12px] leading-[1.55] text-center"
          style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
        >
          This password confirms the learner deletion
          {learner ? ` · ${learner}` : ""}
        </p>

        <div className="mt-5 space-y-3">
          <DangerPasswordInput label="Password" value={pw} onChange={setPw} />
          <DangerPasswordInput label="Confirm" value={confirmPw} onChange={setConfirmPw} />
        </div>

        {error && (
          <p className="mt-3 text-[12px] font-semibold text-center" style={{ color: DANGER }}>
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          className="mt-6 w-full h-[50px] rounded-full px-4 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
          style={{ background: DANGER }}
        >
          Delete
        </button>
      </div>
    </StandardSheet>
  );
}

function DangerPasswordInput({
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
          background: "color-mix(in oklab, var(--destructive) 6%, white)",
          border: "1px solid color-mix(in oklab, var(--destructive) 14%, white)",
        }}
      >
        <input
          type={visible ? "text" : "password"}
          inputMode="text"
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={6}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 6))}
          className="flex-1 min-w-0 bg-transparent outline-none text-[16px] font-medium placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground"
          style={{ color: DANGER, letterSpacing: value ? "0.28em" : "normal" }}
        />
        <button
          type="button"
          aria-label={visible ? "隐藏密码" : "显示密码"}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 grid place-items-center h-7 w-7 rounded-full transition-opacity active:opacity-60"
          style={{ color: "color-mix(in oklab, var(--destructive) 55%, white)" }}
        >
          {visible ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
        </button>
      </div>
    </label>
  );
}

export function AddLearnerSheet({
  open,
  onClose,
  onCreate,
  title = "Add Learner",
  progress,
  stepLabel,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (learner: Partial<Learner> & { name: string }) => void;
  title?: string;
  progress?: { total: number; current: number };
  stepLabel?: string;
}) {
  const [given, setGiven] = useState("");
  const [family, setFamily] = useState("");
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [birthday, setBirthday] = useState("");
  const [bdayOpen, setBdayOpen] = useState(false);
  const [error, setError] = useState("");
  const debugSheet = useSheetDebug();
  const [avatarScale, setAvatarScale] = useState(1);
  const [nameFocused, setNameFocused] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [avatarPosX, setAvatarPosX] = useState(50);
  const [avatarPosY, setAvatarPosY] = useState(50);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setGiven("");
    setFamily("");
    setGender("");
    setBirthday("");
    setError("");
    setAvatarScale(1);
    setNameFocused(false);
    setAvatarSrc("");
    setAvatarPosX(50);
    setAvatarPosY(50);
    setBdayOpen(debugSheet === "birthday");
  }, [open]);

  if (!open) return null;

  const initials = ((given.trim()[0] ?? "") + (family.trim()[0] ?? "")).toUpperCase() || "PEC";
  const bdayLabel = /^\d{4}-\d{2}-\d{2}$/.test(birthday)
    ? (() => {
        const [y, m, d] = birthday.split("-").map(Number);
        return `${MONTHS_SHORT[m - 1]} ${d} ${y}`;
      })()
    : "Birthday";

  const submit = () => {
    if (!avatarSrc) return setError("Add avatar");
    if (!given.trim()) return setError("Add given name");
    if (!family.trim()) return setError("Add family name");
    if (!gender) return setError("Select girl or boy");
    if (!birthday) return setError("Birthday");
    setError("");
    onCreate({
      name: `${given.trim()} ${family.trim()}`,
      avatarPath: avatarSrc,
      avatarPosX,
      avatarPosY,
      avatarScale,
      gender,
      birthday,
    });
  };

  return (
    <>
      <StandardSheet open={open} title={title} brandColor={SHEET_BRAND.paisley} onClose={onClose} progress={progress} stepLabel={stepLabel}>
        <div className="flex flex-col h-full min-h-0">
          <div style={{ marginTop: -10 }}>
          <div className="mt-[22px] flex flex-col items-center">
            <AvatarPicker
              currentSrc={avatarSrc}
              onSelect={(src) => {
                setAvatarSrc(src);
                setAvatarPosX(50);
                setAvatarPosY(50);
                setAvatarScale(1);
              }}
            >
            <div className="relative h-40 w-40 shrink-0">
              <AvatarDraggable
                src={avatarSrc}
                initials={initials}
                posX={avatarPosX}
                posY={avatarPosY}
                scale={avatarScale}
                onChangePos={(x, y) => {
                  setAvatarPosX(x);
                  setAvatarPosY(y);
                }}
                onChangeScale={setAvatarScale}
              />
              <button
                type="button"
                aria-label="Choose photo"
                onClick={() => fileRef.current?.click()}
                className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full bg-white border border-border z-10 active:scale-95 transition-transform"
              >
                <Camera className="h-3.5 w-3.5" strokeWidth={2} style={{ color: "var(--muted-foreground)" }} />
              </button>
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => {
                  setAvatarSrc("");
                  setAvatarScale(1);
                }}
                className="absolute top-6 right-6 translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full bg-white border border-border z-10 active:scale-95 transition-transform"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>
            </AvatarPicker>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === "string") {
                    setAvatarSrc(reader.result);
                    setAvatarScale(1);
                    setAvatarPosX(50);
                    setAvatarPosY(50);
                  }
                };
                reader.readAsDataURL(file);
                e.target.value = "";
              }}
            />
          </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-end">
            {error && (
              <p
                className="mb-3 text-center text-[14px] font-medium"
                style={{ color: DANGER, letterSpacing: "-0.01em" }}
              >
                {error}
              </p>
            )}
            <div className="space-y-3">
              <div
                className="flex items-center gap-2 rounded-full h-[60px] px-6 bg-white border"
                style={{ borderColor: "color-mix(in oklab, var(--paisley) 55%, white)" }}
              >
                <span className="shrink-0 text-[16px] font-semibold leading-none" style={{ color: PAISLEY, letterSpacing: "-0.01em" }}>
                  Name
                </span>
                {!nameFocused && given.trim() && family.trim() ? (
                  <button
                    type="button"
                    onClick={() => setNameFocused(true)}
                    className="flex-1 min-w-0 text-right text-[16px] font-semibold text-foreground truncate"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {`${given.trim()} ${family.trim()}`}
                  </button>
                ) : (
                  <>
                    <input
                      value={given}
                      onChange={(e) => { setGiven(capitalizeName(e.target.value)); setError(""); }}
                      onFocus={() => setNameFocused(true)}
                      onBlur={() => setNameFocused(false)}
                      placeholder="Given Name"
                      className="flex-1 min-w-0 bg-transparent outline-none text-right text-[16px] font-semibold placeholder:text-muted-foreground placeholder:font-normal"
                    />
                    <input
                      value={family}
                      onChange={(e) => { setFamily(capitalizeName(e.target.value)); setError(""); }}
                      onFocus={() => setNameFocused(true)}
                      onBlur={() => setNameFocused(false)}
                      placeholder="Family Name"
                      className="flex-1 min-w-0 bg-transparent outline-none text-right text-[16px] font-semibold placeholder:text-muted-foreground placeholder:font-normal"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {([
                  { key: "female" as const, label: "Girl", color: "var(--shirin)" },
                  { key: "male" as const, label: "Boy", color: "var(--wordie)" },
                ]).map((opt) => {
                  const active = gender === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => { setGender(opt.key); setError(""); }}
                      className="h-[60px] w-[60px] shrink-0 grid place-items-center rounded-full text-[16px] font-medium transition-colors"
                      style={
                        active
                          ? { background: opt.color, color: "white", border: `1px solid ${opt.color}` }
                          : {
                              background: "white",
                              color: opt.color,
                              border: `1px solid color-mix(in oklab, ${opt.color} 45%, white)`,
                            }
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setBdayOpen(true)}
                  className={`flex-1 min-w-0 h-[60px] rounded-full bg-white border inline-flex items-center justify-center gap-1 text-[16px] ${birthday ? "font-semibold" : "font-normal"}`}
                  style={{
                    borderColor: "color-mix(in oklab, var(--paisley) 55%, white)",
                    color: birthday ? "var(--foreground)" : "var(--muted-foreground)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {bdayLabel}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </button>
              </div>
            </div>
            <div style={{ marginTop: -8 }}>
              <SheetActions primary={{ label: "Save", onClick: submit }} />
            </div>
          </div>
        </div>
      </StandardSheet>

      {bdayOpen && (
        <LearnerBirthdaySheet
          value={birthday || "2017-01-01"}
          onClose={() => setBdayOpen(false)}
          onConfirm={(v) => {
            setBirthday(v);
            setBdayOpen(false);
          }}
        />
      )}
    </>
  );
}

function LearnerBirthdaySheet({
  value,
  onClose,
  onConfirm,
}: {
  value: string;
  onClose: () => void;
  onConfirm: (v: string) => void;
}) {
  const [y0, m0, d0] = value.split("-").map(Number);
  const [year, setYear] = useState(y0);
  const [month, setMonth] = useState(m0);
  const [day, setDay] = useState(d0);
  const [tab, setTab] = useState<"month" | "day" | "year">("month");

  const maxDay = new Date(year, month, 0).getDate();
  const years: number[] = [];
  for (let y = new Date().getFullYear(); y >= 2000; y--) years.push(y);

  const tabs = [
    { key: "month" as const, label: "Month", value: MONTHS_SHORT[month - 1] },
    { key: "day" as const, label: "Day", value: String(Math.min(day, maxDay)) },
    { key: "year" as const, label: "Year", value: String(year) },
  ];

  return (
    <StandardSheet open title="Birthday" brandColor={SHEET_BRAND.paisley} onClose={onClose}>
      <div className="flex flex-col h-full">
        <div className="mt-5 pb-3 grid grid-cols-3 gap-2 shrink-0">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="rounded-full py-2.5 px-3 text-center transition-colors"
                style={
                  active
                    ? { background: PAISLEY_SOFT, color: PAISLEY, border: `1px solid ${PAISLEY_SOFT}` }
                    : {
                        background: "white",
                        color: PAISLEY,
                        border: "1px solid color-mix(in oklab, var(--paisley) 45%, white)",
                      }
                }
              >
                <span className="block text-[11px] font-semibold leading-none opacity-80">{t.label}</span>
                <span className="block text-[17px] font-medium leading-tight mt-0.5">{t.value}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pb-4">
          {tab === "month" && (
            <LearnerChipGrid
              cols={3}
              items={MONTHS_LONG.map((name, i) => ({ key: i + 1, label: name }))}
              value={month}
              onPick={(v) => {
                setMonth(v);
                setTab("day");
              }}
            />
          )}
          {tab === "day" && (
            <LearnerChipGrid
              cols={7}
              items={Array.from({ length: maxDay }, (_, i) => ({ key: i + 1, label: String(i + 1) }))}
              value={Math.min(day, maxDay)}
              onPick={(v) => {
                setDay(v);
                setTab("year");
              }}
            />
          )}
          {tab === "year" && (
            <LearnerChipGrid
              cols={4}
              items={years.map((y) => ({ key: y, label: String(y) }))}
              value={year}
              onPick={setYear}
            />
          )}
        </div>

        <SheetActions
          primary={{
            label: "Save",
            onClick: () =>
              onConfirm(
                `${year}-${String(month).padStart(2, "0")}-${String(Math.min(day, maxDay)).padStart(2, "0")}`,
              ),
          }}
        />
      </div>
    </StandardSheet>
  );
}

function LearnerChipGrid({
  cols,
  items,
  value,
  onPick,
}: {
  cols: number;
  items: { key: number; label: string }[];
  value: number;
  onPick: (v: number) => void;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onPick(it.key)}
            className="h-11 rounded-full text-[13px] font-semibold transition-colors"
            style={
              active
                ? { background: PAISLEY_SOFT, color: PAISLEY, border: `1px solid ${PAISLEY_SOFT}` }
                : {
                    background: "white",
                    color: "var(--foreground)",
                    border: "1px solid color-mix(in oklab, var(--paisley) 45%, white)",
                  }
            }
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
