import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Heart, X, ChevronRight, Pencil } from "lucide-react";
import {
  CHARACTER_ASSETS,
  COLLECTION_ITEMS,
  GROWTH_BADGES,
  MAP_ASSETS,
  PLACES,
  PLACE_BADGES,
  collectionItemById,
  growthBadgeById,
  placeBadgeById,
  placeById,
  type CollectionItem,
  type GrowthBadge,
  type Place,
  type PlaceBadge,
  type PlaceId,
} from "@/lib/bloxia/config";
import {
  calculateStreakDays,
  nextPlace,
  useBloxia,
  type Progress,
  type SpendingLog,
} from "@/lib/bloxia/progress";

export const Route = createFileRoute("/bloxia")({
  head: () => ({
    meta: [
      { title: "Bloxia — Paisley EC" },
      { name: "description", content: "Bloxia — a pixel growth world where kids spend BP to unlock places, badges, and collection items." },
      { property: "og:title", content: "Bloxia — Paisley EC" },
      { property: "og:description", content: "A pixel growth world of eight places, honoring adventures earned through learning." },
    ],
  }),
  component: BloxiaPage,
});

type PageKey = "map" | "badges" | "collection" | "profile";
type BadgeTab = "place" | "growth" | "favorite";

// ---------- Theme constants (dark green + gold) ----------
const T = {
  bg: "linear-gradient(180deg, #1C5732 0%, #102C1D 42%, #07150E 100%)",
  panel: "rgba(8, 36, 22, 0.94)",
  panelSoft: "rgba(14, 52, 32, 0.88)",
  border: "rgba(216, 175, 87, 0.62)",
  borderSoft: "rgba(216, 175, 87, 0.34)",
  gold: "#D8AF57",
  goldLight: "#F8E6A4",
  ivory: "#FFF4BF",
  sage: "#B7D9B7",
  goldGradient: "linear-gradient(180deg, #F4D27A, #B9822F)",
  goldOnDark: "#1C2A12",
};

function formatBp(n: number) {
  return `${Math.max(0, Math.floor(n)).toLocaleString()} BP`;
}

function BloxiaPage() {
  const b = useBloxia();
  const [page, setPage] = useState<PageKey>("map");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<
    (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" } | null
  >(null);
  const [nameEditor, setNameEditor] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [badgeTab, setBadgeTab] = useState<BadgeTab>("place");

  const next = nextPlace(b.progress);
  const progressPct = next
    ? Math.min(100, Math.max(0, Math.round((b.bp / next.unlockBp) * 100)))
    : 100;
  const progressLabel = next ? `${formatBp(Math.max(0, next.unlockBp - b.bp))} to ${next.name}` : "All places unlocked";
  const currentPlace = placeById[b.progress.currentPlaceId];

  return (
    <PhoneFrame bg="">
      <div className="min-h-[100dvh] font-['Nunito',sans-serif] text-[color:#F8F1D2]" style={{ background: T.bg }}>
        {/* TopBar */}
        <TopBar
          progress={b.progress}
          bp={b.bp}
          currentPlaceName={currentPlace?.name ?? ""}
          progressPct={progressPct}
          progressLabel={progressLabel}
          page={page}
          onNavigate={(p) => {
            setPage(p);
            setSelectedPlace(null);
            setSelectedItem(null);
          }}
        />

        {/* Content */}
        {page === "map" && (
          <MapView
            progress={b.progress}
            bp={b.bp}
            onSelectPlace={setSelectedPlace}
          />
        )}
        <div className="pt-[168px] pb-32 px-4">
          {page === "badges" && (
            <BadgesView
              progress={b.progress}
              tab={badgeTab}
              setTab={setBadgeTab}
              selected={selectedBadge}
              onSelect={setSelectedBadge}
              onToggleFavorite={(id) => b.toggleFavorite(id)}
              onUnlockGrowth={(id) => b.unlockGrowthBadge(id)}
              bp={b.bp}
            />
          )}
          {page === "collection" && (
            <CollectionView
              progress={b.progress}
              onSelectItem={setSelectedItem}
            />
          )}
          {page === "profile" && (
            <ProfileView
              progress={b.progress}
              logs={b.logs}
              totals={b.totals}
              onEditName={() => setNameEditor(true)}
              onGoBadges={() => setPage("badges")}
              onGoCollection={() => setPage("collection")}
              onOpenActivity={() => setActivityOpen(true)}
            />
          )}
        </div>

        <BottomTabBar />

        {/* Sheets */}
        {selectedPlace && (
          <PlaceSheet
            place={selectedPlace}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedPlace(null)}
            onUnlock={() => {
              const r = b.unlockPlace(selectedPlace.id);
              if (r.ok) setSelectedPlace(null);
            }}
            onExplore={() => {
              b.setCurrentPlace(selectedPlace.id);
              setSelectedPlace(null);
            }}
          />
        )}
        {selectedItem && (
          <ItemSheet
            item={selectedItem}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedItem(null)}
            onCollect={() => {
              const r = b.unlockCollectionItem(selectedItem.id);
              if (r.ok) setSelectedItem(null);
            }}
          />
        )}
        {nameEditor && (
          <NameEditor
            initial={b.progress.bloxianName}
            onClose={() => setNameEditor(false)}
            onSave={(name) => {
              b.updateName(name);
              setNameEditor(false);
            }}
          />
        )}
        {activityOpen && (
          <ActivitySheet logs={b.logs} onClose={() => setActivityOpen(false)} />
        )}
      </div>
    </PhoneFrame>
  );
}

// ============ TopBar ============

function TopBar({
  progress,
  bp,
  currentPlaceName,
  progressPct,
  progressLabel,
  page,
  onNavigate,
}: {
  progress: Progress;
  bp: number;
  currentPlaceName: string;
  progressPct: number;
  progressLabel: string;
  page: PageKey;
  onNavigate: (p: PageKey) => void;
}) {
  const tabs: { key: PageKey; label: string }[] = [
    { key: "map", label: "Map" },
    { key: "badges", label: "Badges" },
    { key: "collection", label: "Items" },
    { key: "profile", label: "Profile" },
  ];
  return (
    <div
      className="fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-[404px] z-40 px-3"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className="rounded-[18px] p-3"
        style={{
          background: T.panel,
          border: `2px solid ${T.gold}`,
          boxShadow: "0 12px 34px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,232,164,0.14)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src={CHARACTER_ASSETS.shirinPortrait}
            alt=""
            className="h-[52px] w-[52px] rounded-[14px] object-cover border border-[color:#E8C46B]"
            style={{ imageRendering: "pixelated", background: "#173F29" }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold leading-tight truncate" style={{ color: T.ivory }}>
              {progress.bloxianName}
            </div>
            <div className="text-[11px] truncate" style={{ color: T.sage }}>
              at {currentPlaceName}
            </div>
          </div>
          <div
            className="rounded-full px-3 py-1 text-[12px] font-extrabold shrink-0"
            style={{ background: T.goldGradient, color: T.goldOnDark, border: `1px solid ${T.goldLight}` }}
          >
            {formatBp(bp)}
          </div>
        </div>

        {/* progress */}
        <div className="mt-2">
          <div className="text-[10.5px] truncate" style={{ color: T.goldLight }}>{progressLabel}</div>
          <div className="mt-1 h-[7px] rounded-full overflow-hidden" style={{ background: "#244833", border: "1px solid rgba(216,175,87,0.4)" }}>
            <div className="h-full rounded-full" style={{ width: `${progressPct}%`, background: T.goldGradient }} />
          </div>
        </div>

        {/* nav tabs */}
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {tabs.map((t) => {
            const active = t.key === page;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onNavigate(t.key)}
                className="h-8 rounded-[11px] text-[12px] font-extrabold transition-colors"
                style={
                  active
                    ? { background: T.goldGradient, color: T.goldOnDark, border: `1px solid ${T.goldLight}` }
                    : { background: "#173F29", color: T.goldLight, border: `1.5px solid rgba(216,175,87,0.5)` }
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Map View ============

function MapView({
  progress,
  bp,
  onSelectPlace,
}: {
  progress: Progress;
  bp: number;
  onSelectPlace: (p: Place) => void;
}) {
  const places = useMemo(
    () =>
      PLACES.map((p) => {
        const unlocked = progress.unlockedPlaceIds.includes(p.id);
        const current = progress.currentPlaceId === p.id;
        const status: "current" | "unlocked" | "available" | "locked" = current
          ? "current"
          : unlocked
          ? "unlocked"
          : bp >= p.unlockBp
          ? "available"
          : "locked";
        const marker =
          status === "current"
            ? MAP_ASSETS.markers.current
            : status === "unlocked"
            ? MAP_ASSETS.markers.visited
            : status === "available"
            ? MAP_ASSETS.markers.available
            : MAP_ASSETS.markers.locked;
        return { ...p, status, current, marker };
      }),
    [progress, bp],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={MAP_ASSETS.world}
        alt="Bloxia world map"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      {places.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelectPlace(p)}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: `${p.mapPosition.x}%`, top: `${p.mapPosition.y}%` }}
          aria-label={p.name}
        >
          {p.current && (
            <img
              src={CHARACTER_ASSETS.shirinMap}
              alt=""
              className="h-11 w-11 -mb-1"
              style={{ imageRendering: "pixelated", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.42))" }}
            />
          )}
          <img
            src={p.marker}
            alt=""
            className={p.status === "current" ? "h-9 w-9" : "h-7 w-7"}
            style={{ imageRendering: "pixelated", filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.4))" }}
          />
          <div
            className="px-2 py-[3px] rounded-full text-[10px] font-extrabold leading-none"
            style={{
              background: "rgba(8,36,22,0.86)",
              border: "1px solid rgba(248,230,164,0.7)",
              color: T.ivory,
            }}
          >
            {p.shortName}
          </div>
        </button>
      ))}
    </div>
  );
}

// ============ Badges View ============

function BadgesView({
  progress,
  tab,
  setTab,
  selected,
  onSelect,
  onToggleFavorite,
  onUnlockGrowth,
  bp,
}: {
  progress: Progress;
  tab: BadgeTab;
  setTab: (t: BadgeTab) => void;
  selected: ((PlaceBadge | GrowthBadge) & { kind: "place" | "growth" }) | null;
  onSelect: (b: ((PlaceBadge | GrowthBadge) & { kind: "place" | "growth" }) | null) => void;
  onToggleFavorite: (id: string) => void;
  onUnlockGrowth: (id: string) => { ok: boolean; error?: string };
  bp: number;
}) {
  const placeItems = PLACE_BADGES.map((b) => ({
    ...b,
    kind: "place" as const,
    unlocked: progress.earnedPlaceBadgeIds.includes(b.id),
    favorite: progress.favoriteBadgeIds.includes(b.id),
  }));
  const growthItems = GROWTH_BADGES.map((b) => ({
    ...b,
    kind: "growth" as const,
    unlocked: progress.unlockedGrowthBadgeIds.includes(b.id),
    favorite: progress.favoriteBadgeIds.includes(b.id),
  }));
  const favoriteItems = [...placeItems, ...growthItems].filter((b) => b.favorite);

  const visible = tab === "place" ? placeItems : tab === "growth" ? growthItems : favoriteItems;
  const tabs: { key: BadgeTab; label: string }[] = [
    { key: "place", label: "Places" },
    { key: "growth", label: "Growth" },
    { key: "favorite", label: "Favorite" },
  ];

  return (
    <div className="space-y-3">
      <PageHeading
        title="My Badges"
        subtitle="Honors earned, adventures remembered."
      />
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Places" value={`${progress.earnedPlaceBadgeIds.length} / 8`} />
        <StatCard label="Growth" value={`${progress.unlockedGrowthBadgeIds.length} / 16`} />
      </div>

      <div
        className="grid grid-cols-3 gap-1 p-1 rounded-[14px]"
        style={{ background: "rgba(0,0,0,0.22)", border: `1.5px solid ${T.borderSoft}` }}
      >
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                onSelect(null);
              }}
              className="h-9 rounded-[10px] text-[12px] font-extrabold"
              style={
                active
                  ? { background: T.goldGradient, color: T.goldOnDark }
                  : { color: T.sage, background: "transparent" }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {visible.map((item) => (
          <BadgeTile
            key={item.id}
            asset={item.asset}
            name={item.name}
            unlocked={item.unlocked}
            selected={selected?.id === item.id}
            onClick={() => onSelect(item)}
          />
        ))}
        {!visible.length && (
          <div
            className="col-span-3 rounded-[14px] text-center py-6 text-[13px]"
            style={{ border: `2px dashed ${T.borderSoft}`, color: T.sage }}
          >
            No favorite badges yet — tap ♥ on any earned badge.
          </div>
        )}
      </div>

      {selected && (
        <div
          className="rounded-[18px] p-4"
          style={{
            background: T.panel,
            border: `2px solid ${T.border}`,
            boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={selected.asset}
              alt=""
              className="h-16 w-16 shrink-0"
              style={{
                imageRendering: "pixelated",
                opacity:
                  (selected.kind === "place" &&
                    !progress.earnedPlaceBadgeIds.includes(selected.id)) ||
                  (selected.kind === "growth" &&
                    !progress.unlockedGrowthBadgeIds.includes(selected.id))
                    ? 0.35
                    : 1,
              }}
            />
            <div className="min-w-0">
              <div className="text-[15px] font-extrabold leading-tight" style={{ color: T.ivory }}>
                {selected.name}
              </div>
              <div className="text-[12px] leading-snug mt-0.5" style={{ color: T.sage }}>
                {selected.description}
              </div>
            </div>
          </div>
          {selected.kind === "growth" &&
          !progress.unlockedGrowthBadgeIds.includes(selected.id) ? (
            (() => {
              const cost = (selected as GrowthBadge).bpCost;
              const canAfford = bp >= cost;
              return (
                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => {
                    const r = onUnlockGrowth(selected.id);
                    if (!r.ok && r.error === "INSUFFICIENT_BP") {
                      // silent — button is already disabled when unaffordable
                    }
                  }}
                  className="mt-3 w-full h-10 rounded-[12px] text-[13px] font-extrabold flex items-center justify-center gap-1.5"
                  style={{
                    background: canAfford ? T.goldGradient : "rgba(255,244,191,0.08)",
                    color: canAfford ? T.goldOnDark : T.sage,
                    border: `1.5px solid ${canAfford ? T.goldLight : T.borderSoft}`,
                    opacity: canAfford ? 1 : 0.75,
                  }}
                >
                  {canAfford
                    ? `Unlock · ${cost.toLocaleString()} BP`
                    : `Need ${cost.toLocaleString()} BP`}
                </button>
              );
            })()
          ) : (
            <button
              type="button"
              onClick={() => onToggleFavorite(selected.id)}
              className="mt-3 w-full h-10 rounded-[12px] text-[13px] font-extrabold flex items-center justify-center gap-1.5"
              style={{
                background: progress.favoriteBadgeIds.includes(selected.id)
                  ? "linear-gradient(180deg, #FFDF87, #C05252)"
                  : T.goldGradient,
                color: T.goldOnDark,
                border: `1.5px solid ${T.goldLight}`,
              }}
            >
              <Heart className="w-4 h-4" fill={progress.favoriteBadgeIds.includes(selected.id) ? "currentColor" : "none"} />
              {progress.favoriteBadgeIds.includes(selected.id) ? "Favorite" : "Add to Favorites"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function BadgeTile({
  asset,
  name,
  unlocked,
  selected,
  onClick,
}: {
  asset: string;
  name: string;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[14px] p-2 text-center transition-transform active:scale-95"
      style={{
        background: T.panelSoft,
        border: selected ? `2px solid ${T.goldLight}` : `1.5px solid rgba(216,175,87,0.42)`,
        boxShadow: selected ? `0 0 0 2px rgba(255,240,167,0.18)` : "none",
      }}
    >
      <div
        className="mx-auto h-[68px] w-[68px] rounded-[12px] grid place-items-center relative"
        style={{ background: "rgba(255,244,191,0.08)" }}
      >
        <img
          src={asset}
          alt=""
          className="h-[60px] w-[60px]"
          style={{
            imageRendering: "pixelated",
            opacity: unlocked ? 1 : 0.34,
            filter: unlocked ? undefined : "grayscale(100%)",
          }}
        />
      </div>
      <div className="mt-1.5 text-[10.5px] font-extrabold leading-tight" style={{ color: T.ivory, wordBreak: "break-word" }}>
        {name}
      </div>
    </button>
  );
}

// ============ Collection View ============

function CollectionView({
  progress,
  onSelectItem,
}: {
  progress: Progress;
  onSelectItem: (i: CollectionItem) => void;
}) {
  const groups = PLACES.map((place) => {
    const items = COLLECTION_ITEMS.filter((i) => i.placeId === place.id);
    const collected = items.filter((i) => progress.collectedItemIds.includes(i.id)).length;
    return { place, items, collected, placeUnlocked: progress.unlockedPlaceIds.includes(place.id) };
  });

  return (
    <div className="space-y-3">
      <PageHeading
        title="My Collection"
        subtitle={`${progress.collectedItemIds.length} / 32 collected`}
      />
      {groups.map((g) => (
        <div
          key={g.place.id}
          className="rounded-[18px] p-3"
          style={{ background: T.panel, border: `2px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-[14px] font-extrabold" style={{ color: T.ivory }}>
              {g.place.name}
            </div>
            <div className="text-[11px] font-bold" style={{ color: T.goldLight }}>
              {g.collected} / {g.items.length}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {g.items.map((item) => {
              const unlocked = progress.collectedItemIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="rounded-[12px] p-1.5 aspect-square grid place-items-center"
                  style={{
                    background: "rgba(255,244,191,0.06)",
                    border: `1.5px solid ${unlocked ? T.gold : "rgba(216,175,87,0.28)"}`,
                  }}
                >
                  <img
                    src={item.asset}
                    alt={item.name}
                    className="h-full w-full object-contain"
                    style={{
                      imageRendering: "pixelated",
                      opacity: unlocked ? 1 : 0.32,
                      filter: unlocked ? undefined : "grayscale(100%)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Profile View ============

function ProfileView({
  progress,
  logs,
  totals,
  onEditName,
  onGoBadges,
  onGoCollection,
  onOpenActivity,
}: {
  progress: Progress;
  logs: SpendingLog[];
  totals: { places: number; placeBadges: number; growthBadges: number; collectionItems: number };
  onEditName: () => void;
  onGoBadges: () => void;
  onGoCollection: () => void;
  onOpenActivity: () => void;
}) {
  const streak = calculateStreakDays(logs);
  const stats = [
    { label: "Streak Days", value: streak },
    { label: "Places", value: `${progress.unlockedPlaceIds.length}/${totals.places}` },
    {
      label: "Badges",
      value: `${progress.earnedPlaceBadgeIds.length + progress.unlockedGrowthBadgeIds.length}/${totals.placeBadges + totals.growthBadges}`,
    },
    { label: "Items", value: `${progress.collectedItemIds.length}/${totals.collectionItems}` },
  ];
  const favBadges = [
    ...PLACE_BADGES.filter((b) => progress.favoriteBadgeIds.includes(b.id)),
    ...GROWTH_BADGES.filter((b) => progress.favoriteBadgeIds.includes(b.id)),
  ].slice(0, 4);
  const recent = logs.slice(0, 5).map(logToActivity);

  return (
    <div className="space-y-3">
      <div
        className="rounded-[18px] p-4 flex items-center gap-3"
        style={{ background: T.panel, border: `2px solid ${T.border}` }}
      >
        <img
          src={CHARACTER_ASSETS.shirinPortrait}
          alt=""
          className="h-16 w-16 rounded-[16px] border border-[color:#E8C46B] shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-[20px] font-extrabold leading-tight truncate" style={{ color: T.ivory }}>
            {progress.bloxianName}
          </div>
          <div className="text-[12px]" style={{ color: T.sage }}>
            Shirin Growth World
          </div>
          <button
            type="button"
            onClick={onEditName}
            className="mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold"
            style={{ background: T.goldGradient, color: T.goldOnDark }}
          >
            <Pencil className="w-3 h-3" /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={String(s.value)} />
        ))}
      </div>

      <ProfileSection
        title="Favorite Badges"
        action={{ label: "View All", onClick: onGoBadges }}
      >
        {favBadges.length ? (
          <div className="flex gap-2 flex-wrap">
            {favBadges.map((b) => (
              <img
                key={b.id}
                src={b.asset}
                alt={b.name}
                className="h-12 w-12 rounded-[10px]"
                style={{ imageRendering: "pixelated", background: "rgba(255,244,191,0.08)" }}
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Favorite badges will appear here after you tap the heart.</EmptyLine>
        )}
      </ProfileSection>

      <ProfileSection
        title="Collection"
        action={{ label: "View All", onClick: onGoCollection }}
      >
        <div className="text-[12px]" style={{ color: T.sage }}>
          {progress.collectedItemIds.length} of {totals.collectionItems} items collected across Bloxia.
        </div>
      </ProfileSection>

      <ProfileSection
        title="Recent Activity"
        action={{ label: "Full Log", onClick: onOpenActivity }}
      >
        {recent.length ? (
          <div className="space-y-1.5">
            {recent.map((a) => (
              <ActivityRow key={a.id} activity={a} />
            ))}
          </div>
        ) : (
          <EmptyLine>No Bloxia activity yet.</EmptyLine>
        )}
      </ProfileSection>
    </div>
  );
}

// ============ Shared primitives ============

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="rounded-[18px] p-3"
      style={{ background: T.panel, border: `2px solid ${T.border}` }}
    >
      <div className="text-[20px] font-extrabold leading-tight" style={{ color: T.ivory }}>
        {title}
      </div>
      <div className="text-[12px] mt-0.5" style={{ color: T.sage }}>
        {subtitle}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-[14px] px-3 py-2.5"
      style={{ background: T.panelSoft, border: `1.5px solid rgba(216,175,87,0.56)` }}
    >
      <div className="text-[18px] font-extrabold leading-tight" style={{ color: T.goldLight }}>
        {value}
      </div>
      <div className="text-[11px] mt-0.5" style={{ color: T.sage }}>
        {label}
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[18px] p-3"
      style={{ background: T.panel, border: `2px solid ${T.border}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[14px] font-extrabold" style={{ color: T.ivory }}>
          {title}
        </div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center gap-0.5 text-[11px] font-extrabold"
            style={{ color: T.goldLight }}
          >
            {action.label} <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyLine({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[12px] text-center py-3 text-[12px]"
      style={{ border: `2px dashed ${T.borderSoft}`, color: T.sage }}
    >
      {children}
    </div>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div
      className="rounded-[12px] px-3 py-2 flex items-center justify-between"
      style={{ background: "rgba(255,244,191,0.06)" }}
    >
      <div className="min-w-0">
        <div className="text-[12px] font-extrabold truncate" style={{ color: T.ivory }}>
          {activity.title}
        </div>
        <div className="text-[10px]" style={{ color: T.sage }}>
          {activity.date}
        </div>
      </div>
      <div
        className="text-[11px] font-extrabold shrink-0"
        style={{ color: activity.positive ? "#8AE68A" : T.goldLight }}
      >
        {activity.bpText}
      </div>
    </div>
  );
}

interface Activity {
  id: string;
  title: string;
  date: string;
  bpText: string;
  positive?: boolean;
}
function logToActivity(log: SpendingLog): Activity {
  const date = new Date(log.createdAt).toISOString().slice(0, 10);
  let title = "Bloxia activity";
  let sign: "+" | "-" = "-";
  if (log.type === "unlock_place") title = `Unlocked ${placeById[log.targetId as PlaceId]?.name ?? "place"}`;
  else if (log.type === "unlock_growth_badge")
    title = `Earned ${growthBadgeById[log.targetId]?.name ?? "growth badge"}`;
  else if (log.type === "unlock_collection_item")
    title = `Collected ${collectionItemById[log.targetId]?.name ?? "item"}`;
  else if (log.type === "earn_wordie") {
    title = log.label ? `myWordie · ${log.label}` : "myWordie practice";
    sign = "+";
  } else if (log.type === "earn_talk") {
    title = log.label ? `ShirinTalk · ${log.label}` : "ShirinTalk practice";
    sign = "+";
  }
  return {
    id: log.id,
    title,
    date,
    bpText: log.bpAmount ? `${sign}${formatBp(log.bpAmount)}` : "",
    positive: sign === "+",
  };
}

// ============ Sheets ============

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-[24px] p-5"
        style={{
          background: T.panel,
          border: `2px solid ${T.border}`,
          borderBottom: "none",
          boxShadow: "0 -12px 30px rgba(0,0,0,0.45)",
          paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 rounded-full grid place-items-center"
          style={{ background: "rgba(255,244,191,0.1)", color: T.goldLight }}
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function PlaceSheet({
  place,
  progress,
  bp,
  onClose,
  onUnlock,
  onExplore,
}: {
  place: Place;
  progress: Progress;
  bp: number;
  onClose: () => void;
  onUnlock: () => void;
  onExplore: () => void;
}) {
  const unlocked = progress.unlockedPlaceIds.includes(place.id);
  const canUnlock = !unlocked && bp >= place.unlockBp;
  const statusText = progress.currentPlaceId === place.id
    ? "Current"
    : unlocked
    ? "Visited"
    : canUnlock
    ? "Available"
    : "Locked";
  const badge = placeBadgeById[place.placeBadgeId];

  return (
    <Sheet onClose={onClose}>
      <img
        src={badge.asset}
        alt=""
        className="h-24 w-24 mx-auto"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-3 text-center text-[18px] font-extrabold" style={{ color: T.ivory }}>
        {place.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {place.description}
      </div>

      <div className="mt-3 space-y-2">
        <SheetRow label="Required BP" value={formatBp(place.unlockBp)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {!unlocked && !canUnlock && (
        <div
          className="mt-3 rounded-[12px] text-center py-2.5 px-3 text-[13px] font-extrabold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          {formatBp(place.unlockBp - bp)} still needed to unlock
        </div>
      )}

      {(canUnlock || unlocked) && (
        <button
          type="button"
          onClick={unlocked ? onExplore : onUnlock}
          className="mt-4 w-full h-12 rounded-[14px] font-extrabold text-[14px]"
          style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
        >
          {unlocked ? "Explore Place" : "Unlock Place"}
        </button>
      )}
    </Sheet>
  );
}

function ItemSheet({
  item,
  progress,
  bp,
  onClose,
  onCollect,
}: {
  item: CollectionItem;
  progress: Progress;
  bp: number;
  onClose: () => void;
  onCollect: () => void;
}) {
  const collected = progress.collectedItemIds.includes(item.id);
  const placeUnlocked = progress.unlockedPlaceIds.includes(item.placeId);
  const canCollect = !collected && placeUnlocked && bp >= item.bpCost;
  return (
    <Sheet onClose={onClose}>
      <img
        src={item.asset}
        alt=""
        className="h-24 w-24 mx-auto"
        style={{
          imageRendering: "pixelated",
          opacity: collected ? 1 : 0.7,
          filter: collected ? undefined : "grayscale(50%)",
        }}
      />
      <div className="mt-3 text-center text-[18px] font-extrabold" style={{ color: T.ivory }}>
        {item.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {item.description}
      </div>
      <div className="mt-3 space-y-2">
        <SheetRow label="Found in" value={placeById[item.placeId].name} />
        <SheetRow label="Rarity" value={item.rarity} />
        <SheetRow label="Cost" value={formatBp(item.bpCost)} />
      </div>
      {!collected && (
        <button
          type="button"
          onClick={onCollect}
          disabled={!canCollect}
          className="mt-4 w-full h-12 rounded-[14px] font-extrabold text-[14px] disabled:opacity-55"
          style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
        >
          {!placeUnlocked ? "Unlock this place first" : canCollect ? "Collect Item" : "Not enough BP"}
        </button>
      )}
    </Sheet>
  );
}

function NameEditor({
  initial,
  onClose,
  onSave,
}: {
  initial: string;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState(initial);
  return (
    <Sheet onClose={onClose}>
      <img
        src={CHARACTER_ASSETS.shirinFull}
        alt=""
        className="h-28 mx-auto"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-3 text-center text-[18px] font-extrabold" style={{ color: T.ivory }}>
        Edit Profile
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={24}
        className="mt-4 w-full h-12 px-4 rounded-[14px] text-[15px] font-bold outline-none"
        style={{
          background: "rgba(255,244,191,0.1)",
          border: `2px solid rgba(216,175,87,0.5)`,
          color: T.ivory,
        }}
      />
      <button
        type="button"
        onClick={() => onSave(name)}
        className="mt-4 w-full h-12 rounded-[14px] font-extrabold text-[14px]"
        style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
      >
        Save Profile
      </button>
    </Sheet>
  );
}

function ActivitySheet({ logs, onClose }: { logs: SpendingLog[]; onClose: () => void }) {
  const activities = logs.map(logToActivity);
  return (
    <Sheet onClose={onClose}>
      <div className="text-center text-[18px] font-extrabold" style={{ color: T.ivory }}>
        Activity Log
      </div>
      <div className="mt-4 max-h-[55vh] overflow-y-auto space-y-1.5 pr-1">
        {activities.length ? (
          activities.map((a) => <ActivityRow key={a.id} activity={a} />)
        ) : (
          <EmptyLine>No Bloxia activity yet.</EmptyLine>
        )}
      </div>
    </Sheet>
  );
}

function SheetRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 text-[13px]"
      style={{ borderTop: `1px solid rgba(216,175,87,0.22)`, color: T.goldLight }}
    >
      <span style={{ color: T.sage }}>{label}</span>
      <span className="font-extrabold">{value}</span>
    </div>
  );
}