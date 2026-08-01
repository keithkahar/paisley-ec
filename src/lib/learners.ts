/**
 * Shared learner roster — persisted in localStorage so additions/deletions
 * survive reloads and stay in sync between /parent and /profile.
 */
import { useCallback, useEffect, useState } from "react";

const LEARNERS_KEY = "paisley.learners.v1";
const SELECTED_KEY = "paisley.learners.selected.v1";
const DEFAULT_LEARNERS = ["Amy", "Jack"];

function readList(): string[] {
  if (typeof window === "undefined") return DEFAULT_LEARNERS;
  try {
    const raw = window.localStorage.getItem(LEARNERS_KEY);
    if (!raw) return DEFAULT_LEARNERS;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return DEFAULT_LEARNERS;
    const names = arr.filter((n): n is string => typeof n === "string" && n.trim().length > 0);
    return names.length ? names : DEFAULT_LEARNERS;
  } catch {
    return DEFAULT_LEARNERS;
  }
}

function readSelected(list: string[]): string {
  if (typeof window === "undefined") return "";
  try {
    const s = window.localStorage.getItem(SELECTED_KEY) ?? "";
    return s && list.includes(s) ? s : "";
  } catch {
    return "";
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function useLearners(fallbackSelected = "") {
  const [learners, setLearners] = useState<string[]>(DEFAULT_LEARNERS);
  const [learner, setLearnerState] = useState<string>(fallbackSelected);

  // Hydrate after mount (localStorage is browser-only).
  useEffect(() => {
    const list = readList();
    setLearners(list);
    const sel = readSelected(list);
    if (sel) setLearnerState(sel);
  }, []);

  const setLearner = useCallback((name: string) => {
    setLearnerState(name);
    write(SELECTED_KEY, name);
  }, []);

  const addLearner = useCallback((name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setLearners((ls) => {
      const next = ls.includes(clean) ? ls : [...ls, clean];
      write(LEARNERS_KEY, next);
      return next;
    });
    setLearnerState(clean);
    write(SELECTED_KEY, clean);
  }, []);

  const deleteLearner = useCallback((name: string) => {
    setLearners((ls) => {
      if (ls.length <= 1) return ls;
      const next = ls.filter((n) => n !== name);
      write(LEARNERS_KEY, next);
      setLearnerState((cur) => {
        if (cur !== name) return cur;
        write(SELECTED_KEY, next[0]);
        return next[0];
      });
      return next;
    });
  }, []);

  return { learners, learner, setLearner, addLearner, deleteLearner };
}
