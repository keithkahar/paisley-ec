/**
 * First Learning Journey onboarding state.
 * Mirrors the mini-program `learningJourneyService`:
 * prompt gating -> guardian -> parent PIN -> add learner -> free membership.
 * Persisted in localStorage, subscribable so any mounted page reacts.
 */
import { useCallback, useEffect, useSyncExternalStore } from "react";

const STATE_KEY = "pec_learning_journey_onboarding_v1";
const ENTITLEMENTS_KEY = "pec_child_entitlements_v1";

export const JOURNEY_STATUS = {
  idle: "idle",
  promptReady: "prompt_ready",
  postponed: "postponed",
  guardianReady: "guardian_ready",
  parentPinReady: "parent_pin_ready",
  learnerPending: "learner_pending",
  complete: "complete",
} as const;

export type JourneyStatus = (typeof JOURNEY_STATUS)[keyof typeof JOURNEY_STATUS];

export type JourneyState = {
  status: JourneyStatus;
  firstLearningCompleted: boolean;
  firstLearningSource: string;
  promptDismissed: boolean;
  forcePrompt: boolean;
  guardianReady: boolean;
  parentPinReady: boolean;
  learnerName: string;
  completedAt: number | null;
};

const EMPTY: JourneyState = {
  status: JOURNEY_STATUS.idle,
  firstLearningCompleted: false,
  firstLearningSource: "",
  promptDismissed: false,
  forcePrompt: false,
  guardianReady: false,
  parentPinReady: false,
  learnerName: "",
  completedAt: null,
};

let state: JourneyState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function read(): JourneyState {
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<JourneyState>) };
  } catch {
    return EMPTY;
  }
}

function write(next: JourneyState) {
  state = next;
  try {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = read();
  window.addEventListener("storage", (e) => {
    if (e.key === STATE_KEY) {
      state = read();
      emit();
    }
  });
  emit();
}

export function saveJourneyState(patch: Partial<JourneyState>) {
  write({ ...state, ...patch });
}

/** A learning activity finished (ShirinTalk / myWordie / Smart Reading). */
export function markFirstLearningComplete(source = "") {
  saveJourneyState({
    firstLearningCompleted: true,
    firstLearningSource: source || state.firstLearningSource,
    status: state.status === JOURNEY_STATUS.idle ? JOURNEY_STATUS.promptReady : state.status,
  });
}

/** Debug / entry path: force the prompt open on the host page. */
export function requestLearningJourneyPrompt(source = "") {
  markFirstLearningComplete(source);
  saveJourneyState({
    forcePrompt: true,
    promptDismissed: false,
    status: state.status === JOURNEY_STATUS.complete ? JOURNEY_STATUS.promptReady : state.status,
  });
}

export function shouldShowLearningJourneyPrompt(hasLearner: boolean, force = false) {
  if (force || state.forcePrompt) return true;
  if (state.status === JOURNEY_STATUS.complete || hasLearner) return false;
  if (state.status === JOURNEY_STATUS.parentPinReady || state.status === JOURNEY_STATUS.learnerPending)
    return false;
  return state.firstLearningCompleted && !state.promptDismissed;
}

export function shouldResumeLearnerCreation() {
  return (
    state.status === JOURNEY_STATUS.parentPinReady || state.status === JOURNEY_STATUS.learnerPending
  );
}

export function dismissLearningJourneyPrompt() {
  saveJourneyState({
    promptDismissed: true,
    forcePrompt: false,
    status: JOURNEY_STATUS.postponed,
  });
}

/** Guardian account (local stand-in for identityService.refreshIdentity). */
export async function ensureGuardianAccount() {
  saveJourneyState({
    status: JOURNEY_STATUS.guardianReady,
    forcePrompt: false,
    guardianReady: true,
  });
  return { ok: true as const, accountId: `guardian_local_${Date.now()}` };
}

export const PARENT_PIN_KEY = "paisley.parent.pin";

export function setJourneyParentPin(pin: string, confirmPin: string) {
  if (!/^\d{6}$/.test(pin)) return { ok: false as const, message: "PIN码需为 6 位数字" };
  if (pin !== confirmPin) return { ok: false as const, message: "两次输入的PIN码不一致" };
  try {
    window.localStorage.setItem(PARENT_PIN_KEY, pin);
  } catch {
    /* ignore */
  }
  saveJourneyState({
    status: JOURNEY_STATUS.parentPinReady,
    forcePrompt: false,
    parentPinReady: true,
  });
  return { ok: true as const };
}

export function markLearnerCreationPending() {
  saveJourneyState({ status: JOURNEY_STATUS.learnerPending, forcePrompt: false });
}

type Entitlement = {
  entitlement_id: string;
  learner_name: string;
  plan_id: string;
  status: string;
  source_type: string;
  source_id: string;
  start_at: number;
  expire_at: number | null;
  created_at: number;
};

export function createFreeMembershipForLearner(learnerName: string) {
  const name = (learnerName || "").trim();
  if (!name) return { ok: false as const, reason: "missing_learner" };
  let list: Entitlement[] = [];
  try {
    const raw = window.localStorage.getItem(ENTITLEMENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) list = parsed;
  } catch {
    /* ignore */
  }
  const existing = list.find((e) => e.learner_name === name && e.status === "active");
  if (existing) return { ok: true as const, entitlement: existing, created: false };
  const ts = Date.now();
  const entitlement: Entitlement = {
    entitlement_id: `free_${ts}`,
    learner_name: name,
    plan_id: "free",
    status: "active",
    source_type: "learning_journey",
    source_id: "first_learning_journey",
    start_at: ts,
    expire_at: null,
    created_at: ts,
  };
  try {
    window.localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify([...list, entitlement]));
  } catch {
    /* ignore */
  }
  return { ok: true as const, entitlement, created: true };
}

export function completeLearningJourney(learnerName: string) {
  const membership = createFreeMembershipForLearner(learnerName);
  if (!membership.ok) return membership;
  saveJourneyState({
    status: JOURNEY_STATUS.complete,
    learnerName,
    completedAt: Date.now(),
    forcePrompt: false,
    promptDismissed: true,
  });
  return membership;
}

/** Debug helper — lets the flow be replayed from Free Talk. */
export function resetLearningJourney() {
  write(EMPTY);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

export function useLearningJourney() {
  useEffect(() => {
    if (!hydrated) hydrate();
  }, []);
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dismiss = useCallback(() => dismissLearningJourneyPrompt(), []);
  return { journey: snap, dismiss };
}