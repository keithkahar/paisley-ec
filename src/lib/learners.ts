/**
 * Shared learner roster — single source of truth for /profile and /parent.
 * Persisted in localStorage and exposed through a subscribable store so any
 * mounted page updates instantly (same tab via listeners, other tabs via the
 * `storage` event).
 */
import { useCallback, useEffect, useSyncExternalStore } from "react";

const LEARNERS_KEY = "paisley.learners.v1";
const SELECTED_KEY = "paisley.learners.selected.v1";
const DEFAULT_LEARNERS = ["Amy", "Jack"];

type State = { learners: string[]; learner: string };

const SERVER_STATE: State = { learners: DEFAULT_LEARNERS, learner: DEFAULT_LEARNERS[0] };

let state: State = SERVER_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function readState(): State {
  let learners = DEFAULT_LEARNERS;
  try {
    const raw = window.localStorage.getItem(LEARNERS_KEY);
    const arr = raw ? JSON.parse(raw) : null;
    if (Array.isArray(arr)) {
      const names = arr.filter((n): n is string => typeof n === "string" && n.trim().length > 0);
      if (names.length) learners = names;
    }
  } catch {
    /* ignore */
  }
  let learner = "";
  try {
    learner = window.localStorage.getItem(SELECTED_KEY) ?? "";
  } catch {
    /* ignore */
  }
  if (!learner || !learners.includes(learner)) learner = learners[0];
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
  window.addEventListener("storage", (e) => {
    if (e.key === LEARNERS_KEY || e.key === SELECTED_KEY) setState(readState(), false);
  });
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

export function useLearners() {
  useEffect(() => {
    if (!hydrated) hydrate();
  }, []);
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLearner = useCallback((name: string) => {
    if (!name) return;
    setState({ learners: state.learners, learner: name });
  }, []);

  const addLearner = useCallback((name: string) => {
    const clean = name.trim();
    if (!clean) return;
    const learners = state.learners.includes(clean) ? state.learners : [...state.learners, clean];
    setState({ learners, learner: clean });
  }, []);

  const deleteLearner = useCallback((name: string) => {
    if (state.learners.length <= 1) return;
    const learners = state.learners.filter((n) => n !== name);
    const learner = state.learner === name ? learners[0] : state.learner;
    setState({ learners, learner });
  }, []);

  return { learners: snap.learners, learner: snap.learner, setLearner, addLearner, deleteLearner };
}
