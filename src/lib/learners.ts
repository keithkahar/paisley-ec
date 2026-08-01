/**
 * Shared learner roster — single source of truth for /profile and /parent.
 * Each learner carries its own profile (avatar + framing, gender, birthday),
 * persisted in localStorage and exposed through a subscribable store so any
 * mounted page updates instantly (same tab via listeners, other tabs via the
 * `storage` event).
 */
import { useCallback, useEffect, useSyncExternalStore } from "react";

const LEARNERS_KEY = "paisley.learners.v2";
const LEGACY_NAMES_KEY = "paisley.learners.v1";
const SELECTED_KEY = "paisley.learners.selected.v1";
const LEGACY_PROFILE_KEY = "my_profile_v1";

export type Learner = {
  name: string;
  avatarPath: string;
  avatarPosX: number;
  avatarPosY: number;
  avatarScale: number;
  gender: "" | "male" | "female";
  birthday: string;
};

export function makeLearner(partial: Partial<Learner> & { name: string }): Learner {
  const clampPct = (n: unknown) => (typeof n === "number" ? Math.max(0, Math.min(100, n)) : 50);
  return {
    name: partial.name.trim(),
    avatarPath: typeof partial.avatarPath === "string" ? partial.avatarPath : "",
    avatarPosX: clampPct(partial.avatarPosX),
    avatarPosY: clampPct(partial.avatarPosY),
    avatarScale: typeof partial.avatarScale === "number" ? Math.max(1, Math.min(3, partial.avatarScale)) : 1,
    gender: partial.gender === "male" || partial.gender === "female" ? partial.gender : "",
    birthday: typeof partial.birthday === "string" && /^\d{4}-\d{2}-\d{2}$/.test(partial.birthday) ? partial.birthday : "",
  };
}

const DEFAULT_LEARNERS: Learner[] = [
  makeLearner({ name: "Daniella Wang" }),
  makeLearner({ name: "Amy" }),
];

type State = { learners: Learner[]; learner: string };

const SERVER_STATE: State = { learners: DEFAULT_LEARNERS, learner: DEFAULT_LEARNERS[0].name };

let state: State = SERVER_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function readLegacyProfile(name: string): Learner | null {
  try {
    const raw = window.localStorage.getItem(LEGACY_PROFILE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    const merged = `${(o.givenName ?? "").trim()} ${(o.familyName ?? "").trim()}`.trim();
    return makeLearner({ ...o, name: merged || name });
  } catch {
    return null;
  }
}

function readState(): State {
  let learners: Learner[] = [];
  try {
    const raw = window.localStorage.getItem(LEARNERS_KEY);
    const arr = raw ? JSON.parse(raw) : null;
    if (Array.isArray(arr)) {
      learners = arr
        .filter((o) => o && typeof o.name === "string" && o.name.trim())
        .map((o) => makeLearner(o));
    }
  } catch {
    /* ignore */
  }

  if (!learners.length) {
    // Migrate from the old name-only roster + single-profile storage.
    let names: string[] = [];
    try {
      const raw = window.localStorage.getItem(LEGACY_NAMES_KEY);
      const arr = raw ? JSON.parse(raw) : null;
      if (Array.isArray(arr)) names = arr.filter((n): n is string => typeof n === "string" && n.trim().length > 0);
    } catch {
      /* ignore */
    }
    learners = names.length ? names.map((n) => makeLearner({ name: n })) : [...DEFAULT_LEARNERS];
    const legacy = readLegacyProfile(learners[0].name);
    if (legacy) {
      const idx = learners.findIndex((l) => l.name === legacy.name);
      if (idx >= 0) learners[idx] = legacy;
      else learners = [legacy, ...learners];
    }
  }

  let learner = "";
  try {
    learner = window.localStorage.getItem(SELECTED_KEY) ?? "";
  } catch {
    /* ignore */
  }
  if (!learner || !learners.some((l) => l.name === learner)) learner = learners[0].name;
  return { learners, learner };
}

function persist(next: State) {
  try {
    window.localStorage.setItem(LEARNERS_KEY, JSON.stringify(next.learners));
    window.localStorage.setItem(SELECTED_KEY, next.learner);
  } catch {
    /* ignore */
  }
}

function setState(next: State, write = true) {
  state = next;
  if (write) persist(next);
  emit();
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = readState();
  persist(state);
  window.addEventListener("storage", (e) => {
    if (e.key === LEARNERS_KEY || e.key === SELECTED_KEY) setState(readState(), false);
  });
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

export function useLearners() {
  useEffect(() => {
    if (!hydrated) hydrate();
  }, []);
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLearner = useCallback((name: string) => {
    if (!name) return;
    setState({ ...state, learner: name });
  }, []);

  const addLearner = useCallback((input: Partial<Learner> & { name: string }) => {
    const next = makeLearner(input);
    if (!next.name) return;
    const learners = state.learners.some((l) => l.name === next.name)
      ? state.learners.map((l) => (l.name === next.name ? next : l))
      : [...state.learners, next];
    setState({ learners, learner: next.name });
  }, []);

  const updateLearner = useCallback((prevName: string, input: Partial<Learner> & { name: string }) => {
    const next = makeLearner(input);
    if (!next.name) return;
    const learners = state.learners.map((l) => (l.name === prevName ? next : l));
    const learner = state.learner === prevName ? next.name : state.learner;
    setState({ learners, learner });
  }, []);

  const deleteLearner = useCallback((name: string) => {
    if (state.learners.length <= 1) return;
    const learners = state.learners.filter((l) => l.name !== name);
    const learner = state.learner === name ? learners[0].name : state.learner;
    setState({ learners, learner });
  }, []);

  const current = snap.learners.find((l) => l.name === snap.learner) ?? snap.learners[0];

  return {
    learners: snap.learners,
    learnerNames: snap.learners.map((l) => l.name),
    learner: snap.learner,
    current,
    setLearner,
    addLearner,
    updateLearner,
    deleteLearner,
  };
}
