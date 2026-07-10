import { useEffect, useState, useCallback } from "react";
import {
  COLLECTION_ITEMS,
  DEFAULT_BLOXIAN_NAME,
  DEFAULT_PLACE_ID,
  GROWTH_BADGES,
  PLACES,
  PLACE_BADGES,
  placeById,
  type PlaceId,
} from "./config";

const PROGRESS_KEY = "pec_bloxia_progress_v1";
const LOGS_KEY = "pec_bloxia_spending_logs_v1";
const BP_KEY = "pec_bloxia_bp_v1";

export interface Progress {
  bloxianName: string;
  currentPlaceId: PlaceId;
  unlockedPlaceIds: PlaceId[];
  earnedPlaceBadgeIds: string[];
  unlockedGrowthBadgeIds: string[];
  favoriteBadgeIds: string[];
  collectedItemIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface SpendingLog {
  id: string;
  type:
    | "unlock_place"
    | "unlock_growth_badge"
    | "unlock_collection_item"
    | "earn_wordie"
    | "earn_talk";
  targetId: string;
  bpAmount: number;
  createdAt: number;
  label?: string;
}

const defaultProgress = (): Progress => ({
  bloxianName: DEFAULT_BLOXIAN_NAME,
  currentPlaceId: DEFAULT_PLACE_ID,
  unlockedPlaceIds: [DEFAULT_PLACE_ID, "wonder_tree"],
  earnedPlaceBadgeIds: ["meadow_visitor", "wonder_tree_explorer"],
  unlockedGrowthBadgeIds: [],
  favoriteBadgeIds: [],
  collectedItemIds: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function useBloxia() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => defaultProgress());
  const [bp, setBp] = useState<number>(240);
  const [logs, setLogs] = useState<SpendingLog[]>([]);

  useEffect(() => {
    setProgress(safeRead(PROGRESS_KEY, defaultProgress()));
    setBp(safeRead(BP_KEY, 240));
    setLogs(safeRead(LOGS_KEY, []));
    setReady(true);
  }, []);

  const persist = useCallback((next: Progress) => {
    const withStamp = { ...next, updatedAt: Date.now() };
    safeWrite(PROGRESS_KEY, withStamp);
    setProgress(withStamp);
  }, []);

  const setBpAndSave = useCallback((next: number) => {
    safeWrite(BP_KEY, next);
    setBp(next);
  }, []);

  const appendLog = useCallback((log: SpendingLog) => {
    setLogs((prev) => {
      const next = [log, ...prev].slice(0, 200);
      safeWrite(LOGS_KEY, next);
      return next;
    });
  }, []);

  const earnBp = useCallback(
    (
      amount: number,
      source: "wordie" | "talk",
      label?: string,
    ): { ok: boolean } => {
      if (amount <= 0) return { ok: true };
      setBpAndSave(bp + amount);
      appendLog({
        id: `bloxia_earn_${Date.now()}_${source}`,
        type: source === "wordie" ? "earn_wordie" : "earn_talk",
        targetId: source,
        bpAmount: amount,
        createdAt: Date.now(),
        label,
      });
      return { ok: true };
    },
    [bp, setBpAndSave, appendLog],
  );

  const spend = useCallback(
    (
      amount: number,
      type: SpendingLog["type"],
      targetId: string,
    ): { ok: boolean; error?: "INSUFFICIENT_BP" } => {
      if (amount <= 0) return { ok: true };
      if (bp < amount) return { ok: false, error: "INSUFFICIENT_BP" };
      setBpAndSave(bp - amount);
      appendLog({
        id: `bloxia_${Date.now()}_${targetId}`,
        type,
        targetId,
        bpAmount: amount,
        createdAt: Date.now(),
      });
      return { ok: true };
    },
    [bp, setBpAndSave, appendLog],
  );

  const unlockPlace = useCallback(
    (placeId: PlaceId) => {
      const place = placeById[placeId];
      if (!place) return { ok: false, error: "NOT_FOUND" as const };
      if (progress.unlockedPlaceIds.includes(placeId)) return { ok: true };
      const r = spend(place.unlockBp, "unlock_place", placeId);
      if (!r.ok) return r;
      persist({
        ...progress,
        currentPlaceId: placeId,
        unlockedPlaceIds: uniq([...progress.unlockedPlaceIds, placeId]),
        earnedPlaceBadgeIds: uniq([...progress.earnedPlaceBadgeIds, place.placeBadgeId]),
      });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const setCurrentPlace = useCallback(
    (placeId: PlaceId) => {
      if (!progress.unlockedPlaceIds.includes(placeId)) return { ok: false, error: "LOCKED" as const };
      persist({ ...progress, currentPlaceId: placeId });
      return { ok: true };
    },
    [progress, persist],
  );

  const toggleFavorite = useCallback(
    (badgeId: string) => {
      const earned =
        progress.earnedPlaceBadgeIds.includes(badgeId) ||
        progress.unlockedGrowthBadgeIds.includes(badgeId);
      if (!earned) return { ok: false, error: "LOCKED" as const };
      const cur = progress.favoriteBadgeIds;
      const has = cur.includes(badgeId);
      persist({
        ...progress,
        favoriteBadgeIds: has ? cur.filter((id) => id !== badgeId) : uniq([...cur, badgeId]),
      });
      return { ok: true };
    },
    [progress, persist],
  );

  const unlockCollectionItem = useCallback(
    (itemId: string) => {
      const item = COLLECTION_ITEMS.find((i) => i.id === itemId);
      if (!item) return { ok: false, error: "NOT_FOUND" as const };
      if (!progress.unlockedPlaceIds.includes(item.placeId)) return { ok: false, error: "PLACE_LOCKED" as const };
      if (progress.collectedItemIds.includes(itemId)) return { ok: true };
      const r = spend(item.bpCost, "unlock_collection_item", itemId);
      if (!r.ok) return r;
      persist({ ...progress, collectedItemIds: uniq([...progress.collectedItemIds, itemId]) });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const unlockGrowthBadge = useCallback(
    (badgeId: string) => {
      const badge = GROWTH_BADGES.find((b) => b.id === badgeId);
      if (!badge) return { ok: false, error: "NOT_FOUND" as const };
      if (progress.unlockedGrowthBadgeIds.includes(badgeId)) return { ok: true };
      const r = spend(badge.bpCost, "unlock_growth_badge", badgeId);
      if (!r.ok) return r;
      persist({
        ...progress,
        unlockedGrowthBadgeIds: uniq([...progress.unlockedGrowthBadgeIds, badgeId]),
      });
      return { ok: true };
    },
    [progress, persist, spend],
  );

  const updateName = useCallback(
    (name: string) => {
      persist({ ...progress, bloxianName: name.trim() || DEFAULT_BLOXIAN_NAME });
    },
    [progress, persist],
  );

  return {
    ready,
    progress,
    bp,
    logs,
    unlockPlace,
    setCurrentPlace,
    toggleFavorite,
    unlockCollectionItem,
    unlockGrowthBadge,
    updateName,
    earnBp,
    totals: {
      places: PLACES.length,
      placeBadges: PLACE_BADGES.length,
      growthBadges: GROWTH_BADGES.length,
      collectionItems: COLLECTION_ITEMS.length,
    },
  };
}

export function nextPlace(progress: Progress) {
  return PLACES.filter((p) => !progress.unlockedPlaceIds.includes(p.id))
    .sort((a, b) => a.unlockBp - b.unlockBp)[0];
}

export function calculateStreakDays(logs: SpendingLog[]): number {
  const days = Array.from(
    new Set(logs.map((l) => new Date(l.createdAt).toISOString().slice(0, 10))),
  ).sort().reverse();
  if (!days.length) return 0;
  let streak = 0;
  const cursor = new Date(days[0] + "T00:00:00");
  for (const day of days) {
    const expected = cursor.toISOString().slice(0, 10);
    if (day !== expected) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}