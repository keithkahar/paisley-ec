import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, X, Check, ChevronRight, Move, Camera } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";

export const Route = createFileRoute("/edit-profile")({
  head: () => ({ meta: [{ title: "Edit Profile — Paisley EC" }] }),
  component: EditProfilePage,
});

// ---- Profile storage (mirrors utils/profile.js) ----
const PROFILE_STORAGE_KEY = "my_profile_v1";
const DEFAULT_BIRTHDAY = "2017-01-01";
const PAISLEY = "var(--paisley)";
const SHIRIN = "var(--shirin)";
const WORDIE = "var(--wordie)";

type Gender = "" | "male" | "female";
type ProfileForm = {
  avatarPath: string;
  avatarPosX: number; // 0-100 (object-position %)
  avatarPosY: number; // 0-100
  givenName: string;
  familyName: string;
  birthday: string; // YYYY-MM-DD
  gender: Gender;
};

const DEFAULT_FORM: ProfileForm = {
  avatarPath: "",
  avatarPosX: 50,
  avatarPosY: 50,
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
  return initials || "ME";
}

function formatBirthday(birthday: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return "Select birthday";
  const [y, m, d] = birthday.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[m - 1]} ${d} ${y}`;
}

function EditProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    setForm(loadProfile());
  }, []);

  const initials = useMemo(() => computeInitials(form.givenName, form.familyName), [form.givenName, form.familyName]);

  function update<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
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
        setForm((f) => ({ ...f, avatarPath: dataUrl, avatarPosX: 50, avatarPosY: 50 }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function onClearAvatar() {
    setForm((f) => ({ ...f, avatarPath: "", avatarPosX: 50, avatarPosY: 50 }));
  }

  function onGenderChange(key: Gender) {
    if (form.gender === key) return;
    update("gender", key);
  }

  function onSave() {
    const normalized = saveProfile(form);
    setForm(normalized);
    setToast("Profile saved");
    setTimeout(() => {
      setToast("");
      navigate({ to: "/profile" });
    }, 600);
  }

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[calc(100dvh)] flex flex-col bg-white">
        {/* Back */}
        <div className="absolute top-4 left-4 z-30">
          <Link
            to="/profile"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full bg-white border border-[oklch(0.95_0.02_10)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Title */}
        <section className="px-6 pt-12 pb-2 text-center">
          <h1
            className="text-[26px] leading-[1.2] font-semibold tracking-tight"
            style={{ color: PAISLEY, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Edit Profile
          </h1>
        </section>

        {/* Scroll body */}
        <div className="flex-1 px-6 pt-2 pb-28 overflow-y-auto">
          {/* Avatar — mirrors Me page hero (h-40 w-40) with edit badge */}
          <div className="flex flex-col items-center pt-2 pb-5">
            <div className="relative h-40 w-40">
              <AvatarDraggable
                src={form.avatarPath}
                initials={initials}
                posX={form.avatarPosX}
                posY={form.avatarPosY}
                onChangePos={(x, y) => setForm((f) => ({ ...f, avatarPosX: x, avatarPosY: y }))}
              />
              <button
                type="button"
                onClick={onChooseAvatar}
                aria-label="Choose photo"
                className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
              >
                <Camera className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: "#9CA3AF" }} />
              </button>
              {form.avatarPath ? (
                <button
                  type="button"
                  onClick={onClearAvatar}
                  aria-label="Remove photo"
                  className="absolute top-6 right-6 translate-x-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full z-10 active:scale-95 transition-transform bg-white border border-gray-200"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: "#9CA3AF" }} />
                </button>
              ) : null}
            </div>
            {form.avatarPath ? (
              <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                <Move className="h-3 w-3" strokeWidth={2.25} />
                Drag the photo to reposition.
              </p>
            ) : null}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarFile}
            />
          </div>

          <div className="space-y-3">

          {/* Given Name */}
          <RowPill label="Given Name">
            <input
              type="text"
              value={form.givenName}
              onChange={(e) => update("givenName", e.target.value)}
              placeholder="Daniella"
              className="w-full bg-transparent outline-none text-right text-[15px] font-bold text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            />
          </RowPill>

          {/* Family Name */}
          <RowPill label="Family Name">
            <input
              type="text"
              value={form.familyName}
              onChange={(e) => update("familyName", e.target.value)}
              placeholder="Wang"
              className="w-full bg-transparent outline-none text-right text-[15px] font-bold text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            />
          </RowPill>

          {/* Gender */}
          <RowPill label="Gender">
            <div className="flex gap-1.5 justify-end">
              {GENDER_OPTIONS.map((opt) => {
                const active = form.gender === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => onGenderChange(opt.key)}
                    className="h-8 px-4 rounded-full text-[12px] font-bold transition-colors"
                    style={
                      active
                        ? { background: opt.color, color: "white" }
                        : { background: "white", color: opt.color, border: `1px solid color-mix(in oklab, ${opt.color} 35%, white)` }
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </RowPill>

          {/* Birthday */}
          <RowPill label="Birthday">
            <button
              type="button"
              onClick={() => setShowBirthdayPicker(true)}
              className="w-full inline-flex items-center justify-end gap-1 text-[15px] font-bold"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                color: form.birthday ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 45%, white)",
              }}
            >
              {formatBirthday(form.birthday)}
              <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2.25} />
            </button>
          </RowPill>
          </div>
        </div>

        {/* Sticky save bar */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pt-3 pb-5 bg-white border-t border-border">
          <button
            type="button"
            onClick={onSave}
            className="w-full h-12 rounded-full text-[15px] font-bold active:scale-[0.99] transition-transform"
            style={{ background: PAISLEY, color: "white", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
          >
            Save
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className="pointer-events-none absolute inset-x-0 top-20 z-40 flex justify-center">
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold shadow-lg"
              style={{ background: PAISLEY, color: "white" }}
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
      </div>
    </PhoneFrame>
  );
}

function RowPill({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="relative isolate flex items-center gap-3 rounded-full py-4 px-5 min-h-[56px] bg-white border"
      style={{
        borderColor: `color-mix(in oklab, ${PAISLEY} 35%, white)`,
        fontFamily: "var(--font-sans)",
      }}
    >
      <span
        className="shrink-0 text-[13px] font-bold leading-none"
        style={{ color: PAISLEY, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function AvatarDraggable({
  src,
  initials,
  posX,
  posY,
  onChangePos,
}: {
  src: string;
  initials: string;
  posX: number;
  posY: number;
  onChangePos: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ startX: number; startY: number; startPx: number; startPy: number } | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (!src) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    draggingRef.current = { startX: e.clientX, startY: e.clientY, startPx: posX, startPy: posY };
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = draggingRef.current;
    if (!d || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // moving 1 frame-width should shift roughly 100% — feel
    const dx = ((e.clientX - d.startX) / rect.width) * 100;
    const dy = ((e.clientY - d.startY) / rect.height) * 100;
    const nx = Math.max(0, Math.min(100, d.startPx - dx));
    const ny = Math.max(0, Math.min(100, d.startPy - dy));
    onChangePos(nx, ny);
  }
  function onPointerUp() {
    draggingRef.current = null;
  }

  return (
    <div
      ref={ref}
      className="relative h-full w-full rounded-full overflow-hidden grid place-items-center select-none"
      style={{
        background: src ? "transparent" : "color-mix(in oklab, var(--paisley) 12%, white)",
        touchAction: src ? "none" : "auto",
        cursor: src ? "grab" : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover pointer-events-none"
          style={{ objectPosition: `${posX}% ${posY}%` }}
        />
      ) : (
        <span
          className="text-[56px] font-bold leading-none"
          style={{ color: PAISLEY, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[420px] bg-white rounded-t-3xl flex flex-col"
        style={{ height: "62vh", fontFamily: "var(--font-sans)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grabber */}
        <div className="pt-2.5 pb-1 grid place-items-center shrink-0">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-bold text-muted-foreground w-12 text-left"
          >
            Cancel
          </button>
          <p
            className="text-[17px] font-bold tracking-tight leading-none"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em", color: PAISLEY }}
          >
            Birthday
          </p>
          <button
            type="button"
            onClick={confirm}
            className="text-[13px] font-bold w-12 text-right"
            style={{ color: PAISLEY }}
          >
            Done
          </button>
        </div>

        {/* M / D / Y tabs — each chip shows current value */}
        <div className="px-5 pb-3 grid grid-cols-3 gap-2 shrink-0">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="rounded-2xl py-2 px-3 text-center transition-colors"
                style={
                  active
                    ? {
                        background: "var(--paisley-soft)",
                        color: PAISLEY,
                        border: `1px solid color-mix(in oklab, ${PAISLEY} 45%, white)`,
                        fontFamily: "var(--font-sans)",
                      }
                    : {
                        background: "white",
                        color: PAISLEY,
                        border: `1px solid color-mix(in oklab, ${PAISLEY} 22%, white)`,
                        fontFamily: "var(--font-sans)",
                      }
                }
              >
                <span
                  className="block text-[10px] font-bold leading-none opacity-80"
                  style={{ letterSpacing: "0.06em", fontFamily: "var(--font-sans)" }}
                >
                  {t.label.toUpperCase()}
                </span>
                <span
                  className="block text-[17px] font-bold leading-tight mt-0.5"
                  style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
                >
                  {t.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* Options grid for the active tab */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
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
      </div>
    </div>
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
            className="h-11 rounded-xl text-[13px] font-bold transition-colors"
            style={
              active
                ? {
                    background: "var(--paisley-soft)",
                    color: PAISLEY,
                    border: `1px solid color-mix(in oklab, ${PAISLEY} 45%, white)`,
                    fontFamily: "var(--font-sans)",
                  }
                : {
                    background: "white",
                    color: "var(--foreground)",
                    border: `1px solid color-mix(in oklab, ${PAISLEY} 22%, white)`,
                    fontFamily: "var(--font-sans)",
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
