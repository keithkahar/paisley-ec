import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, Camera, X, Check, ChevronRight, Move } from "lucide-react";
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
        <div className="flex-1 px-6 pt-4 pb-28 overflow-y-auto space-y-4">
          {/* Avatar card */}
          <Card>
            <div className="flex items-center gap-4">
              <div
                className="h-20 w-20 rounded-full grid place-items-center overflow-hidden shrink-0"
                style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)" }}
              >
                {form.avatarPath ? (
                  <img src={form.avatarPath} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span
                    className="text-[28px] font-bold leading-none"
                    style={{ color: PAISLEY, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
                  >
                    {initials}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onChooseAvatar}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-bold"
                  style={{ background: "color-mix(in oklab, var(--paisley) 12%, white)", color: PAISLEY }}
                >
                  <Camera className="h-3.5 w-3.5" strokeWidth={2.25} />
                  Choose Photo
                </button>
                {form.avatarPath && (
                  <button
                    type="button"
                    onClick={onClearAvatar}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-bold bg-muted text-muted-foreground"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.25} />
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onAvatarFile}
              />
            </div>
          </Card>

          {/* Given Name */}
          <FieldCard label="Given Name">
            <input
              type="text"
              value={form.givenName}
              onChange={(e) => update("givenName", e.target.value)}
              placeholder="Daniella"
              className="w-full bg-transparent outline-none text-[15px] font-semibold text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            />
          </FieldCard>

          {/* Family Name */}
          <FieldCard label="Family Name">
            <input
              type="text"
              value={form.familyName}
              onChange={(e) => update("familyName", e.target.value)}
              placeholder="Wang"
              className="w-full bg-transparent outline-none text-[15px] font-semibold text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
            />
          </FieldCard>

          {/* Gender */}
          <FieldCard label="Gender">
            <div className="flex gap-2">
              {GENDER_OPTIONS.map((opt) => {
                const active = form.gender === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => onGenderChange(opt.key)}
                    className="flex-1 h-10 rounded-full text-[13px] font-bold transition-colors"
                    style={
                      active
                        ? { background: PAISLEY, color: "white" }
                        : { background: "color-mix(in oklab, var(--paisley) 8%, white)", color: PAISLEY }
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </FieldCard>

          {/* Birthday */}
          <FieldCard label="Birthday">
            <button
              type="button"
              onClick={() => setShowBirthdayPicker(true)}
              className="w-full text-left text-[15px] font-semibold"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                color: form.birthday ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 45%, white)",
              }}
            >
              {formatBirthday(form.birthday)}
            </button>
          </FieldCard>
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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-border p-4">
      {children}
    </div>
  );
}

function FieldCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-border p-4">
      <p
        className="text-[11px] font-bold leading-none mb-2"
        style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
      >
        {label}
      </p>
      {children}
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

  return (
    <div className="absolute inset-0 z-50 flex items-end" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close"
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full bg-white rounded-t-3xl pt-3 pb-5 px-5 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.2)]">
        <div className="mx-auto h-1 w-10 rounded-full bg-muted mb-3" />
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] font-bold text-muted-foreground"
          >
            Cancel
          </button>
          <p className="text-[13px] font-bold" style={{ color: PAISLEY }}>
            Birthday
          </p>
          <button
            type="button"
            onClick={confirm}
            className="text-[13px] font-bold"
            style={{ color: PAISLEY }}
          >
            Done
          </button>
        </div>

        {/* US order: Month / Day / Year */}
        <div className="grid grid-cols-3 gap-2">
          <PickerColumn
            label="Month"
            options={MONTH_NAMES_LONG.map((name, i) => ({ value: i + 1, label: name }))}
            value={month}
            onChange={setMonth}
          />
          <PickerColumn
            label="Day"
            options={Array.from({ length: maxDay }, (_, i) => ({ value: i + 1, label: String(i + 1) }))}
            value={day}
            onChange={setDay}
          />
          <PickerColumn
            label="Year"
            options={years.map((y) => ({ value: y, label: String(y) }))}
            value={year}
            onChange={setYear}
          />
        </div>
      </div>
    </div>
  );
}

function PickerColumn({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-muted-foreground px-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 rounded-2xl bg-muted/40 px-3 text-[14px] font-bold text-foreground outline-none appearance-none"
        style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
