import { useEffect, useMemo, useRef, useState } from "react";
import { X, Check, ChevronRight, Camera } from "lucide-react";
import { StandardSheet, SHEET_BRAND } from "@/components/app/StandardSheet";

// ---- Profile storage (mirrors utils/profile.js) ----
const PROFILE_STORAGE_KEY = "my_profile_v1";
const DEFAULT_BIRTHDAY = "2017-01-01";
const SHIRIN = "var(--shirin)";
const WORDIE = "var(--wordie)";
const PAISLEY = "var(--paisley)";
// Form accent — Paisley brand blue for borders, CTA, sheet headers, etc.
// Aliased under the previous YELLOW/YELLOW_SOFT names so downstream sheets
// stay in sync without a wide rename.
const ACCENT = PAISLEY;
const YELLOW = PAISLEY;
const YELLOW_SOFT = `color-mix(in oklab, var(--paisley) 14%, white)`;

type Gender = "" | "male" | "female";
type ProfileForm = {
  avatarPath: string;
  avatarPosX: number; // 0-100 (object-position %)
  avatarPosY: number; // 0-100
  avatarScale: number; // 1-3
  givenName: string;
  familyName: string;
  birthday: string; // YYYY-MM-DD
  gender: Gender;
};

const DEFAULT_FORM: ProfileForm = {
  avatarPath: "",
  avatarPosX: 50,
  avatarPosY: 50,
  avatarScale: 1,
  givenName: "",
  familyName: "",
  birthday: "",
  gender: "",
};

const GENDER_OPTIONS: { key: Exclude<Gender, "">; label: string; color: string }[] = [
  { key: "female", label: "Girl", color: SHIRIN },
  { key: "male", label: "Boy", color: WORDIE },
];

const MONTH_NAMES_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate();
}

function loadProfile(): ProfileForm {
  if (typeof window === "undefined") return DEFAULT_FORM;
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_FORM;
    const obj = JSON.parse(raw) as Partial<ProfileForm>;
    const gender = obj.gender === "male" || obj.gender === "female" ? obj.gender : "";
    const birthday = typeof obj.birthday === "string" && /^\d{4}-\d{2}-\d{2}$/.test(obj.birthday) ? obj.birthday : "";
    const clamp = (n: unknown) => {
      const v = typeof n === "number" ? n : 50;
      return Math.max(0, Math.min(100, v));
    };
    return {
      avatarPath: typeof obj.avatarPath === "string" ? obj.avatarPath : "",
      avatarPosX: clamp(obj.avatarPosX),
      avatarPosY: clamp(obj.avatarPosY),
      avatarScale: typeof obj.avatarScale === "number" ? Math.max(1, Math.min(3, obj.avatarScale)) : 1,
      givenName: typeof obj.givenName === "string" ? obj.givenName.trim() : "",
      familyName: typeof obj.familyName === "string" ? obj.familyName.trim() : "",
      birthday,
      gender,
    };
  } catch {
    return DEFAULT_FORM;
  }
}

function saveProfile(form: ProfileForm): ProfileForm {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const normalized: ProfileForm = {
    avatarPath: typeof form.avatarPath === "string" ? form.avatarPath : "",
    avatarPosX: clamp(form.avatarPosX),
    avatarPosY: clamp(form.avatarPosY),
    avatarScale: Math.max(1, Math.min(3, form.avatarScale ?? 1)),
    givenName: form.givenName.trim(),
    familyName: form.familyName.trim(),
    birthday: /^\d{4}-\d{2}-\d{2}$/.test(form.birthday) ? form.birthday : "",
    gender: form.gender === "male" || form.gender === "female" ? form.gender : "",
  };
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    /* ignore */
  }
  return normalized;
}

function computeInitials(given: string, family: string) {
  const g = given.trim()[0] ?? "";
  const f = family.trim()[0] ?? "";
  const initials = (g + f).toUpperCase();
  return initials || "me";
}

function formatBirthday(birthday: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return "Select birthday";
  const [y, m, d] = birthday.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[m - 1]} ${d} ${y}`;
}

export function EditProfileSheet({ open, onClose, onSaved }: { open: boolean; onClose: () => void; onSaved?: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [toast, setToast] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [nameFocused, setNameFocused] = useState(false);

  function validate(): string {
    if (!form.avatarPath) return "Add avatar";
    if (!form.givenName.trim()) return "Add given name";
    if (!form.familyName.trim()) return "Add family name";
    if (!form.gender) return "Select girl or boy";
    if (!form.birthday) return "Select birthday";
    return "";
  }

  useEffect(() => {
    if (open) setForm(loadProfile());
  }, [open]);

  const initials = useMemo(() => computeInitials(form.givenName, form.familyName), [form.givenName, form.familyName]);

  function update<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  function onChooseAvatar() {
    fileRef.current?.click();
  }

  function onAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (dataUrl) {
        setForm((f) => ({ ...f, avatarPath: dataUrl, avatarPosX: 50, avatarPosY: 50, avatarScale: 1 }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function onClearAvatar() {
    setForm((f) => ({ ...f, avatarPath: "", avatarPosX: 50, avatarPosY: 50, avatarScale: 1 }));
  }

  function onGenderChange(key: Gender) {
    if (form.gender === key) return;
    update("gender", key);
  }

  function onSave() {
    const missing = validate();
    if (missing) {
      setError(missing);
      return;
    }
    setError("");
    const normalized = saveProfile(form);
    setForm(normalized);
    setToast("Profile Saved");
    setTimeout(() => {
      setToast("");
      onSaved?.();
      onClose();
    }, 600);
  }

  return (
    <>
        <StandardSheet
          open={open}
          title="Edit Profile"
          brandColor={SHEET_BRAND.paisley}
          onClose={onClose}
        >
        <div className="flex flex-col h-full">
          {/* Avatar — mirrors Me page hero (h-40 w-40) with edit badge */}
          <div className="mt-5 flex flex-col items-center">
            <div className="relative h-40 w-40">
              <AvatarDraggable
                src={form.avatarPath}
                initials={initials}
                posX={form.avatarPosX}
                posY={form.avatarPosY}
                scale={form.avatarScale}
                onChangePos={(x, y) => setForm((f) => ({ ...f, avatarPosX: x, avatarPosY: y }))}
                onChangeScale={(s) => setForm((f) => ({ ...f, avatarScale: s }))}
              />
              <button
                type="button"
                onClick={onChooseAvatar}
                aria-label="Choose photo"
                className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
              >
                <Camera className="h-3.5 w-3.5" strokeWidth={2} style={{ color: "var(--muted-foreground)" }} />
              </button>
              <button
                type="button"
                onClick={onClearAvatar}
                aria-label="Remove photo"
                className="absolute top-6 right-6 translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={form.avatarScale}
              onChange={(e) => update("avatarScale", Number(e.target.value))}
              className="mt-4 w-[38%] h-1 accent-current opacity-70"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Zoom"
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarFile}
            />
          </div>

          <div className="mt-6 space-y-3">
            {/* Name — single pill: label + given/family, merged into a full name once both are filled */}
            <div
              className="flex items-center gap-2 rounded-full h-[64px] px-6 bg-white border"
              style={{ borderColor: `color-mix(in oklab, ${ACCENT} 55%, white)` }}
            >
              <span
                className="shrink-0 text-[16px] font-semibold leading-none"
                style={{ color: ACCENT, letterSpacing: "-0.01em" }}
              >
                Name
              </span>
              {!nameFocused && form.givenName.trim() && form.familyName.trim() ? (
                <button
                  type="button"
                  onClick={() => setNameFocused(true)}
                  className="flex-1 min-w-0 text-right text-[16px] font-semibold text-foreground truncate"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {`${form.givenName.trim()} ${form.familyName.trim()}`}
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    value={form.givenName}
                    onChange={(e) => update("givenName", e.target.value)}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder="Given Name"
                    className="flex-1 min-w-0 bg-transparent outline-none text-right text-[16px] font-semibold text-foreground placeholder:text-muted-foreground placeholder:font-normal"
                    style={{ letterSpacing: "-0.01em" }}
                  />
                  <input
                    type="text"
                    value={form.familyName}
                    onChange={(e) => update("familyName", e.target.value)}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    placeholder="Family Name"
                    className="flex-1 min-w-0 bg-transparent outline-none text-right text-[16px] font-semibold text-foreground placeholder:text-muted-foreground placeholder:font-normal"
                    style={{ letterSpacing: "-0.01em" }}
                  />
                </>
              )}
            </div>

            {/* Gender + Birthday on one row */}
            <div className="flex items-center gap-2">
              {GENDER_OPTIONS.map((opt) => {
                const active = form.gender === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => onGenderChange(opt.key)}
                    className="h-[64px] px-5 shrink-0 rounded-full text-[16px] font-medium transition-colors"
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
                onClick={() => setShowBirthdayPicker(true)}
                className={`flex-1 min-w-0 h-[64px] rounded-full bg-white border inline-flex items-center justify-center gap-1 text-[16px] ${form.birthday ? "font-semibold" : "font-normal"}`}
                style={{
                  borderColor: `color-mix(in oklab, ${ACCENT} 55%, white)`,
                  letterSpacing: "-0.01em",
                  color: form.birthday ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {formatBirthday(form.birthday)}
                <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-auto shrink-0">
            {error && (
              <p
                className="mb-2 text-center text-[14px] font-medium"
                style={{ color: "#e5484d", letterSpacing: "-0.01em" }}
              >
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={onSave}
              className="w-full h-12 rounded-full text-[16px] font-medium active:scale-[0.99] transition-transform"
              style={{ background: ACCENT, color: "white", letterSpacing: "-0.01em" }}
            >
              Save
            </button>
          </div>
        </div>
        </StandardSheet>

        {/* Toast — above the Save pill */}
        {toast && (
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center">
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold shadow-lg"
              style={{ background: ACCENT, color: "white" }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              {toast}
            </div>
          </div>
        )}

        {/* Birthday picker sheet */}
        {showBirthdayPicker && (
          <BirthdaySheet
            value={form.birthday || DEFAULT_BIRTHDAY}
            onCancel={() => setShowBirthdayPicker(false)}
            onConfirm={(v) => {
              update("birthday", v);
              setShowBirthdayPicker(false);
            }}
          />
        )}
    </>
  );
}

function AvatarDraggable({
  src,
  initials,
  posX,
  posY,
  scale,
  onChangePos,
  onChangeScale,
}: {
  src: string;
  initials: string;
  posX: number;
  posY: number;
  scale: number;
  onChangePos: (x: number, y: number) => void;
  onChangeScale: (s: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Use refs + global window listeners — survives re-renders and dpr quirks.
  const stateRef = useRef({ posX, posY, scale });
  stateRef.current = { posX, posY, scale };
  const callbacksRef = useRef({ onChangePos, onChangeScale });
  callbacksRef.current = { onChangePos, onChangeScale };

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;

    let dragging: { sx: number; sy: number; px: number; py: number } | null = null;

    const onDown = (e: PointerEvent) => {
      // ignore clicks that hit overlay buttons
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragging = { sx: e.clientX, sy: e.clientY, px: stateRef.current.posX, py: stateRef.current.posY };
      el.style.cursor = "grabbing";
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const s = Math.max(stateRef.current.scale, 1);
      // Drag feel: 1 frame-width sweep ≈ full range. Divide by scale so zoomed-in drags feel proportional.
      const dx = ((e.clientX - dragging.sx) / rect.width) * (100 / s);
      const dy = ((e.clientY - dragging.sy) / rect.height) * (100 / s);
      const nx = Math.max(0, Math.min(100, dragging.px - dx));
      const ny = Math.max(0, Math.min(100, dragging.py - dy));
      callbacksRef.current.onChangePos(nx, ny);
    };
    const onUp = () => {
      dragging = null;
      el.style.cursor = "grab";
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.max(1, Math.min(3, stateRef.current.scale - e.deltaY * 0.003));
      callbacksRef.current.onChangeScale(next);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [src]);

  return (
    <div
      ref={ref}
      className="relative h-full w-full rounded-full overflow-hidden grid place-items-center select-none"
      style={{
        background: src ? "transparent" : `color-mix(in oklab, ${YELLOW} 22%, white)`,
        touchAction: src ? "none" : "auto",
        cursor: src ? "grab" : "default"
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover pointer-events-none"
          style={{
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${scale})`,
            transformOrigin: `${posX}% ${posY}%`
          }}
        />
      ) : (
        <span
          className="text-[56px] font-medium leading-none"
          style={{ color: YELLOW, letterSpacing: "-0.02em" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function BirthdaySheet({
  value,
  onCancel,
  onConfirm,
}: {
  value: string;
  onCancel: () => void;
  onConfirm: (v: string) => void;
}) {
  const init = useMemo(() => {
    const [y, m, d] = value.split("-").map(Number);
    return { y, m, d };
  }, [value]);
  const [year, setYear] = useState(init.y);
  const [month, setMonth] = useState(init.m);
  const [day, setDay] = useState(init.d);
  const [tab, setTab] = useState<"month" | "day" | "year">("month");

  const thisYear = new Date().getFullYear();
  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = thisYear; y >= 2000; y--) arr.push(y);
    return arr;
  }, [thisYear]);
  const maxDay = daysInMonth(year, month);
  useEffect(() => {
    if (day > maxDay) setDay(maxDay);
  }, [maxDay, day]);

  function confirm() {
    const mm = String(month).padStart(2, "0");
    const dd = String(Math.min(day, maxDay)).padStart(2, "0");
    onConfirm(`${year}-${mm}-${dd}`);
  }

  const tabs: { key: "month" | "day" | "year"; label: string; value: string }[] = [
    { key: "month", label: "Month", value: MONTH_NAMES_SHORT[month - 1] },
    { key: "day", label: "Day", value: String(day) },
    { key: "year", label: "Year", value: String(year) },
  ];

  return (
    <StandardSheet
      open
      title="Birthday"
      brandColor={SHEET_BRAND.paisley}
      onClose={onCancel}
    >
      <div className="flex flex-col h-full">
        {/* M / D / Y tabs — each chip shows current value */}
        <div className="pb-3 grid grid-cols-3 gap-2 shrink-0">
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
                    ? {
                        background: YELLOW_SOFT,
                        color: YELLOW,
                        border: `1px solid ${YELLOW_SOFT}`,
                        }
                    : {
                        background: "white",
                        color: YELLOW,
                        border: `1px solid color-mix(in oklab, ${YELLOW} 45%, white)`,
                        }
                }
              >
                <span
                  className="block text-[11px] font-semibold leading-none opacity-80"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {t.label}
                </span>
                <span
                  className="block text-[17px] font-medium leading-tight mt-0.5"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {t.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* Options grid for the active tab */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-4">
          {tab === "month" && (
            <ChipGrid
              cols={3}
              items={MONTH_NAMES_LONG.map((name, i) => ({ key: i + 1, label: name }))}
              value={month}
              onPick={(v) => {
                setMonth(v);
                setTab("day");
              }}
            />
          )}
          {tab === "day" && (
            <ChipGrid
              cols={7}
              items={Array.from({ length: maxDay }, (_, i) => ({ key: i + 1, label: String(i + 1) }))}
              value={day}
              onPick={(v) => {
                setDay(v);
                setTab("year");
              }}
            />
          )}
          {tab === "year" && (
            <ChipGrid
              cols={4}
              items={years.map((y) => ({ key: y, label: String(y) }))}
              value={year}
              onPick={(v) => setYear(v)}
            />
          )}
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={confirm}
          className="shrink-0 w-full h-12 rounded-full text-[16px] font-medium active:scale-[0.99] transition-transform"
          style={{ background: YELLOW, color: "white", letterSpacing: "-0.01em" }}
        >
          Save
        </button>
      </div>
    </StandardSheet>
  );
}

function ChipGrid({
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
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onPick(it.key)}
            className="h-11 rounded-full text-[13px] font-medium transition-colors"
            style={
              active
                ? {
                    background: YELLOW_SOFT,
                    color: YELLOW,
                    border: `1px solid ${YELLOW_SOFT}`,
                    }
                : {
                    background: "white",
                    color: "var(--foreground)",
                    border: `1px solid color-mix(in oklab, ${YELLOW} 45%, white)`,
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
