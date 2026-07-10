import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { Heart, X, ChevronRight, ChevronLeft, ChevronDown, Pencil, Map as MapIcon, Award, Package, User as UserIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
      { name: "description", content: "Bloxia — a pixel growth world where kids spend Bp to unlock places, badges, and collection items." },
      { property: "og:title", content: "Bloxia — Paisley EC" },
      { property: "og:description", content: "A pixel growth world of eight places, honoring adventures earned through learning." },
    ],
  }),
  component: BloxiaPage,
});

type PageKey = "map" | "badges" | "collection" | "profile";
type BadgeTab = "place" | "growth" | "favorite";
type CollectionTab = "items" | "favorite";

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
  return `${Math.max(0, Math.floor(n)).toLocaleString()} Bp`;
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
  const [badgeTab, setBadgeTab] = useState<BadgeTab>("place");
  const [collectionTab, setCollectionTab] = useState<CollectionTab>("items");

  const next = nextPlace(b.progress);
  const progressPct = next
    ? Math.min(100, Math.max(0, Math.round((b.bp / next.unlockBp) * 100)))
    : 100;

  return (
    <PhoneFrame bg="">
      <div className="relative min-h-[100dvh] font-['Nunito',sans-serif] text-[color:#F8F1D2]" style={{ background: T.bg }}>
        {/* Map lives underneath every page; on non-map pages it's veiled with the
            same translucent green used by the home sheet backdrop. */}
        {page === "map" ? (
          <MapView
            progress={b.progress}
            bp={b.bp}
            onSelectPlace={setSelectedPlace}
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={MAP_ASSETS.world}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(8, 36, 22, 0.52)", backdropFilter: "blur(6px)" }}
            />
          </div>
        )}

        {/* TopBar */}
        <TopBar
          progress={b.progress}
          bp={b.bp}
          progressPct={progressPct}
          next={next}
          page={page}
          onNavigate={(p) => {
            setPage(p);
            setSelectedPlace(null);
            setSelectedItem(null);
          }}
        />

        {/* Top mask: hides scrolling content once it reaches the TopBar / progress bar area */}
        {page !== "map" && (
          <div
            aria-hidden
            className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-30 pointer-events-none"
            style={{
              height: "calc(env(safe-area-inset-top) + 104px)",
              background:
                "linear-gradient(to bottom, rgba(8,36,22,0.95) 0%, rgba(8,36,22,0.92) 70%, rgba(8,36,22,0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
        )}

        {/* Content — Badges page sits a bit higher for a tighter title gap */}
        <div className={`relative pb-6 px-4 ${page === "badges" || page === "collection" ? "pt-[120px]" : "pt-[140px]"}`}>
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
              tab={collectionTab}
              setTab={setCollectionTab}
            />
          )}
          {page === "profile" && (
            <ProfileView
              progress={b.progress}
              logs={b.logs}
              totals={b.totals}
              onEditName={() => setNameEditor(true)}
              onGoBadgesFavorite={() => {
                setBadgeTab("favorite");
                setPage("badges");
              }}
              onGoCollectionFavorite={() => {
                setCollectionTab("favorite");
                setPage("collection");
              }}
              onSelectBadge={(bd) => setSelectedBadge(bd)}
              onSelectItem={(it) => setSelectedItem(it)}
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
            onToggleFavorite={() => b.toggleFavoriteItem(selectedItem.id)}
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
      </div>
    </PhoneFrame>
  );
}

// ============ TopBar ============

function TopBar({
  progress,
  bp,
  progressPct,
  next,
  page,
  onNavigate,
}: {
  progress: Progress;
  bp: number;
  progressPct: number;
  next: Place | undefined;
  page: PageKey;
  onNavigate: (p: PageKey) => void;
}) {
  const allTabs: { key: PageKey; label: string; Icon: typeof MapIcon }[] = [
    { key: "map", label: "Map", Icon: MapIcon },
    { key: "badges", label: "Badges", Icon: Award },
    { key: "collection", label: "Items", Icon: Package },
  ];
  // Hide the icon of the current page; profile is entered via the avatar
  const tabs = allTabs.filter((t) => t.key !== page);
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="relative">
        {/* Top row: nav cluster on the left, name + avatar on the right */}
        <div className="flex items-start justify-between gap-2">
          {/* Left cluster: back + nav icons + Bp pill */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Link
              to="/"
              aria-label="Back"
              className="h-9 w-9 rounded-full grid place-items-center shrink-0 bg-white border border-border shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" style={{ color: "#0F172A" }} />
            </Link>
            {tabs.map((t) => {
              const active = t.key === page;
              const Icon = t.Icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => onNavigate(t.key)}
                  aria-label={t.label}
                  className="h-9 w-9 rounded-full grid place-items-center transition-colors shrink-0"
                  style={
                    active
                      ? { background: T.goldGradient, color: T.goldOnDark, border: `1px solid ${T.goldLight}` }
                      : { background: "rgba(23,63,41,0.9)", color: T.goldLight, border: `1.5px solid rgba(216,175,87,0.55)` }
                  }
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </button>
              );
            })}
            {/* Bp pill: same height as nav icons, same color scheme */}
            <div
              className="h-9 px-2.5 rounded-full grid place-items-center shrink-0 text-[11px] font-extrabold"
              style={{
                background: "rgba(23,63,41,0.9)",
                color: T.goldLight,
                border: `1.5px solid rgba(216,175,87,0.55)`,
              }}
            >
              {formatBp(bp)}
            </div>
          </div>

          {/* Right cluster: name + milestone; milestone bottom-aligned with avatar */}
          <div className="flex items-end gap-2 min-w-0">
            <div className="min-w-0 text-right flex flex-col items-end justify-end leading-none shrink-0">
              <div
                className="text-[14px] font-extrabold leading-tight truncate"
                style={{ color: T.ivory, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
              >
                {progress.bloxianName}
              </div>
              <div
                className="text-[10px] font-bold leading-snug mt-[7.5px] whitespace-nowrap"
                style={{ color: T.goldLight, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
              >
                {next ? `${formatBp(next.unlockBp - bp)} to ${next.name}` : "All places unlocked"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("profile")}
              aria-label="Profile"
              className="h-[48px] w-[48px] rounded-full shrink-0 grid place-items-center"
            >
              <img
                src={CHARACTER_ASSETS.shirinPortrait}
                alt=""
                className="h-[48px] w-[48px] rounded-full object-cover border"
                style={{
                  imageRendering: "pixelated",
                  background: "#173F29",
                  borderColor: T.goldLight,
                }}
              />
            </button>
          </div>
        </div>

        {/* Progress bar: completed = gold, unfinished = dark green */}
        <div
          className="mt-1.5 h-[6px] rounded-full overflow-hidden"
          style={{ background: "rgba(23,63,41,0.95)", border: "1px solid rgba(216,175,87,0.45)" }}
        >
          <div className="h-full rounded-full" style={{ width: `${progressPct}%`, background: T.goldGradient }} />
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
            className="px-2 py-[3px] rounded-full text-[10px] font-extrabold leading-none whitespace-nowrap"
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
  const tabs: { key: BadgeTab; text: string; count: string }[] = [
    { key: "place", text: "Places", count: `${progress.earnedPlaceBadgeIds.length}/${PLACE_BADGES.length}` },
    { key: "growth", text: "Growth", count: `${progress.unlockedGrowthBadgeIds.length}/${GROWTH_BADGES.length}` },
    { key: "favorite", text: "Favorite", count: `${favoriteItems.length}` },
  ];

  const totalEarned = progress.earnedPlaceBadgeIds.length + progress.unlockedGrowthBadgeIds.length;

  return (
    <div className="space-y-4">
      {/* Page title — mirrors app typography (no heavy panel) */}
      <div className="px-1">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          My Badges
        </div>
        <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
          {totalEarned} of {PLACE_BADGES.length + GROWTH_BADGES.length} earned
        </div>
      </div>

      {/* Tab strip — single rounded-full pill w/ gold active segment */}
      <div
        className="grid grid-cols-3 p-1 rounded-full"
        style={{ background: "rgba(8,36,22,0.72)", border: `1.5px solid ${T.borderSoft}` }}
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
              className="h-9 rounded-full text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
              style={
                active
                  ? { background: T.goldGradient, color: T.goldOnDark }
                  : { color: T.sage, background: "transparent" }
              }
            >
              <span className="text-[15px] font-bold">{t.text} </span>
              <span>{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-3 gap-3">
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
            className="col-span-3 rounded-[18px] text-center py-8 text-[13px] font-semibold"
            style={{ border: `1.5px dashed ${T.borderSoft}`, color: T.sage, background: "rgba(8,36,22,0.4)" }}
          >
            Tap on any earned badge to Add to Favorite
          </div>
        )}
      </div>

      {selected && (
        <BadgeSheet
          badge={selected}
          progress={progress}
          bp={bp}
          onClose={() => onSelect(null)}
          onToggleFavorite={() => onToggleFavorite(selected.id)}
          onUnlockGrowth={() => onUnlockGrowth(selected.id)}
        />
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
  size = "default",
}: {
  asset: string;
  name: string;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
  size?: "default" | "large";
}) {
  const imgSize = size === "large" ? "h-full w-full" : "h-[90%] w-[90%]";
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[18px] p-2.5 text-center transition-transform active:scale-95 flex flex-col"
      style={{
        background: "rgba(8,36,22,0.72)",
        border: selected ? `1.5px solid ${T.goldLight}` : `1.5px solid ${T.borderSoft}`,
        boxShadow: selected ? `0 0 0 3px rgba(255,240,167,0.22)` : "none",
      }}
    >
      <div className="mx-auto aspect-square w-full grid place-items-center overflow-hidden">
        <img
          src={asset}
          alt=""
          className={`${imgSize} object-contain`}
          style={{
            imageRendering: "pixelated",
            opacity: unlocked ? 1 : 0.34,
            filter: unlocked ? undefined : "grayscale(100%)",
          }}
        />
      </div>
      <div
        className="mt-2 text-[12px] font-semibold text-center px-0.5"
        style={{
          color: T.ivory,
          height: 30,
          lineHeight: "15px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
        }}
      >
        {name}
      </div>
    </button>
  );
}

// ============ Collection View ============

function CollectionView({
  progress,
  onSelectItem,
  tab,
  setTab,
}: {
  progress: Progress;
  onSelectItem: (i: CollectionItem) => void;
  tab: CollectionTab;
  setTab: (t: CollectionTab) => void;
}) {
  const groups = PLACES.map((place) => {
    const items = COLLECTION_ITEMS.filter((i) => i.placeId === place.id);
    const collected = items.filter((i) => progress.collectedItemIds.includes(i.id)).length;
    return { place, items, collected, placeUnlocked: progress.unlockedPlaceIds.includes(place.id) };
  });
  const favoriteIds = progress.favoriteItemIds ?? [];
  const favoriteItems = COLLECTION_ITEMS.filter((i) => favoriteIds.includes(i.id));
  const tabs: { key: CollectionTab; text: string; count: string }[] = [
    { key: "items", text: "Items", count: `${progress.collectedItemIds.length}/${COLLECTION_ITEMS.length}` },
    { key: "favorite", text: "Favorite", count: `${favoriteItems.length}` },
  ];

  return (
    <div className="space-y-4">
      {/* Page title — mirrors My Badges typography */}
      <div className="px-1">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          My Collection
        </div>
        <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
          {progress.collectedItemIds.length} of {COLLECTION_ITEMS.length} collected
        </div>
      </div>

      {/* Tab strip — mirrors Badges tab pill (Items / Favorite) */}
      <div
        className="grid grid-cols-2 p-1 rounded-full"
        style={{ background: "rgba(8,36,22,0.72)", border: `1.5px solid ${T.borderSoft}` }}
      >
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="h-9 rounded-full text-[13px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
              style={
                active
                  ? { background: T.goldGradient, color: T.goldOnDark }
                  : { color: T.sage, background: "transparent" }
              }
            >
              <span className="text-[15px] font-bold">{t.text} </span>
              <span>{t.count}</span>
            </button>
          );
        })}
      </div>

      {tab === "favorite" ? (
        favoriteItems.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favoriteItems.map((item) => (
              <BadgeTile
                key={item.id}
                asset={item.asset}
                name={item.name}
                unlocked
                selected={false}
                onClick={() => onSelectItem(item)}
                size="large"
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-[18px] text-center py-8 text-[13px] font-semibold"
            style={{ border: `1.5px dashed ${T.borderSoft}`, color: T.sage, background: "rgba(8,36,22,0.4)" }}
          >
            Tap on any collected item to Add to Favorite
          </div>
        )
      ) : (
        groups.map((g) => (
        <div key={g.place.id} className="space-y-3">
          {/* Place header — mirrors Badge tab label typography */}
          <div className="px-1 inline-flex items-center gap-1">
            <span className="text-[15px] font-bold" style={{ color: T.ivory }}>
              {g.place.name} 
            </span>
            <span className="text-[13px] font-semibold" style={{ color: T.sage }}>
              {g.collected}/{g.items.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {g.items.map((item) => {
              const unlocked = progress.collectedItemIds.includes(item.id);
              return (
                <BadgeTile
                  key={item.id}
                  asset={item.asset}
                  name={item.name}
                  unlocked={unlocked}
                  selected={false}
                  onClick={() => onSelectItem(item)}
                  size="large"
                />
              );
            })}
          </div>
        </div>
        ))
      )}
    </div>
  );
}

// ============ Profile View ============

type SelectedBadge = (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" };

function ProfileView({
  progress,
  logs,
  totals,
  onEditName,
  onGoBadgesFavorite,
  onGoCollectionFavorite,
  onSelectBadge,
  onSelectItem,
}: {
  progress: Progress;
  logs: SpendingLog[];
  totals: { places: number; placeBadges: number; growthBadges: number; collectionItems: number };
  onEditName: () => void;
  onGoBadgesFavorite: () => void;
  onGoCollectionFavorite: () => void;
  onSelectBadge: (b: SelectedBadge) => void;
  onSelectItem: (i: CollectionItem) => void;
}) {
  const [activityCount, setActivityCount] = useState(5);

  const pills = [
    { label: "Places", value: `${progress.earnedPlaceBadgeIds.length}/${totals.placeBadges}` },
    { label: "Growth", value: `${progress.unlockedGrowthBadgeIds.length}/${totals.growthBadges}` },
    { label: "Items", value: `${progress.collectedItemIds.length}/${totals.collectionItems}` },
  ];

  // ---- Latest Earned: mix of newest earned badges and collected items ----
  type EarnedEntry =
    | { kind: "badge"; ts: number; badge: SelectedBadge }
    | { kind: "item"; ts: number; item: CollectionItem };
  const earnedEntries: EarnedEntry[] = [];
  for (const l of logs) {
    if (l.type === "unlock_growth_badge") {
      const b = growthBadgeById[l.targetId];
      if (b) earnedEntries.push({ kind: "badge", ts: l.createdAt, badge: { ...b, kind: "growth" } });
    } else if (l.type === "unlock_place") {
      const place = placeById[l.targetId as PlaceId];
      const pb = place ? placeBadgeById[place.placeBadgeId] : undefined;
      if (pb) earnedEntries.push({ kind: "badge", ts: l.createdAt, badge: { ...pb, kind: "place" } });
    } else if (l.type === "unlock_collection_item") {
      const it = collectionItemById[l.targetId];
      if (it) earnedEntries.push({ kind: "item", ts: l.createdAt, item: it });
    }
  }
  // Also seed the two default place badges (from initial progress) if not present in logs
  for (const pbId of progress.earnedPlaceBadgeIds) {
    if (!earnedEntries.some((e) => e.kind === "badge" && e.badge.id === pbId)) {
      const pb = placeBadgeById[pbId];
      if (pb) earnedEntries.push({ kind: "badge", ts: progress.createdAt, badge: { ...pb, kind: "place" } });
    }
  }
  const latestEarned = earnedEntries.sort((a, b) => b.ts - a.ts).slice(0, 4);

  // ---- Favorite badges / items (newest first by their favorite-order in state) ----
  const favBadgeIds = [...progress.favoriteBadgeIds].reverse();
  const favBadges: SelectedBadge[] = favBadgeIds
    .map<SelectedBadge | null>((id) => {
      const pb = placeBadgeById[id];
      if (pb) return { ...pb, kind: "place" };
      const gb = growthBadgeById[id];
      if (gb) return { ...gb, kind: "growth" };
      return null;
    })
    .filter((x): x is SelectedBadge => !!x)
    .slice(0, 4);
  const favItemIds = [...(progress.favoriteItemIds ?? [])].reverse();
  const favItems: CollectionItem[] = favItemIds
    .map((id) => collectionItemById[id])
    .filter((x): x is CollectionItem => !!x)
    .slice(0, 4);

  const activities = logs.map(logToActivity);
  const visibleActivities = activities.slice(0, activityCount);
  const canExpand = activityCount < activities.length;

  return (
    <div className="space-y-6">
      {/* --- Header: avatar + name + stat pills (no frame) --- */}
      <div className="flex flex-col items-center pt-1">
        <div className="relative h-[134px] w-[134px]">
          <div
            className="h-full w-full rounded-full grid place-items-center overflow-hidden"
            style={{
              background: "#173F29",
              border: `2px solid ${T.goldLight}`,
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            }}
          >
            <img
              src={CHARACTER_ASSETS.shirinPortrait}
              alt=""
              className="h-full w-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <button
            type="button"
            onClick={onEditName}
            aria-label="Edit profile"
            className="absolute top-5 left-5 -translate-x-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full z-10 active:scale-95 transition-transform"
            style={{
              background: T.ivory,
              border: `1.5px solid ${T.goldLight}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            <Pencil className="h-4 w-4" strokeWidth={2.25} style={{ color: T.goldOnDark }} />
          </button>
        </div>
        <div
          className="mt-3 text-[22px] font-semibold leading-none"
          style={{ color: T.ivory, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {progress.bloxianName}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          {pills.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-1 rounded-full px-3 h-8 text-[13px] font-semibold"
              style={{
                background: "rgba(8,36,22,0.72)",
                border: `1.5px solid ${T.borderSoft}`,
                color: T.sage,
              }}
            >
              <span className="text-[13px] font-bold" style={{ color: T.ivory }}>
                {p.label}
              </span>
              <span>{p.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* --- Latest Earned --- */}
      <ProfileGroup title="Latest Earned">
        {latestEarned.length ? (
          <div className="grid grid-cols-4 gap-3">
            {latestEarned.map((e) =>
              e.kind === "badge" ? (
                <BadgeTile
                  key={`b_${e.badge.id}_${e.ts}`}
                  asset={e.badge.asset}
                  name={e.badge.name}
                  unlocked
                  selected={false}
                  onClick={() => onSelectBadge(e.badge)}
                  size="large"
                />
              ) : (
                <BadgeTile
                  key={`i_${e.item.id}_${e.ts}`}
                  asset={e.item.asset}
                  name={e.item.name}
                  unlocked
                  selected={false}
                  onClick={() => onSelectItem(e.item)}
                  size="large"
                />
              ),
            )}
          </div>
        ) : (
          <EmptyLine>Nothing earned yet — go explore Bloxia.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Badges --- */}
      <ProfileGroup title="Favorite Badges" onAction={onGoBadgesFavorite} actionKind="right" framed>
        {favBadges.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favBadges.map((b) => (
              <BadgeTile
                key={b.id}
                asset={b.asset}
                name={b.name}
                unlocked
                selected={false}
                onClick={() => onSelectBadge(b)}
                size="large"
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Tap the heart on any earned badge.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Items --- */}
      <ProfileGroup title="Favorite Items" onAction={onGoCollectionFavorite} actionKind="right" framed>
        {favItems.length ? (
          <div className="grid grid-cols-4 gap-3">
            {favItems.map((it) => (
              <BadgeTile
                key={it.id}
                asset={it.asset}
                name={it.name}
                unlocked
                selected={false}
                onClick={() => onSelectItem(it)}
                size="large"
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Tap the heart on any collected item.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Recent Activity --- */}
      <ProfileGroup
        title="Recent Activity"
        onAction={canExpand ? () => setActivityCount((c) => c + 10) : undefined}
        actionKind="down"
      >
        {visibleActivities.length ? (
          <div className="space-y-1.5">
            {visibleActivities.map((a) => (
              <ActivityRow key={a.id} activity={a} />
            ))}
          </div>
        ) : (
          <EmptyLine>No Bloxia activity yet.</EmptyLine>
        )}
      </ProfileGroup>
    </div>
  );
}

function ProfileGroup({
  title,
  onAction,
  actionKind,
  framed,
  children,
}: {
  title: string;
  onAction?: () => void;
  actionKind?: "right" | "down";
  framed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="text-[15px] font-bold" style={{ color: T.ivory }}>
          {title}
        </div>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            aria-label={actionKind === "down" ? "Show more" : "View all"}
            className="h-7 w-7 rounded-full grid place-items-center active:scale-95 transition-transform"
            style={{
              background: "rgba(8,36,22,0.72)",
              border: `1.5px solid ${T.borderSoft}`,
              color: T.goldLight,
            }}
          >
            {actionKind === "down" ? (
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            ) : (
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>
      {framed ? (
        <div
          className="rounded-[18px] p-3"
          style={{
            background: "rgba(8,36,22,0.55)",
            border: `1.5px solid ${T.borderSoft}`,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
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
  const date = formatActivityDate(log.createdAt);
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

function formatActivityDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round((startOfToday - startOfDate) / 86400000);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  if (diffDays === 0) return `Today ${hh}:${mm}`;
  if (diffDays === 1) return `Yesterday ${hh}:${mm}`;
  if (diffDays > 1 && diffDays < 7) {
    const wk = d.toLocaleDateString("en-US", { weekday: "short" });
    return `${wk} ${hh}:${mm}`;
  }
  const month = d.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${d.getDate()} ${d.getFullYear()}`;
}

// ============ Sheets ============

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-transparent pointer-events-auto"
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-[24px] pointer-events-auto flex flex-col"
        style={{
          background: "transparent",
          border: `2px solid ${T.border}`,
          borderBottom: "none",
          boxShadow: "0 -12px 30px rgba(0,0,0,0.45)",
          marginBottom: "calc(6rem + env(safe-area-inset-bottom))",
        }}
      >
        {/* Background layer extends to the bottom of the screen, giving the nav bar the same base color */}
        <div
          className="absolute inset-0 -bottom-[100vh] rounded-t-[24px]"
          style={{ background: "rgba(8, 36, 22, 0.52)", backdropFilter: "blur(6px)" }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full grid place-items-center"
          style={{ background: "rgba(255,244,191,0.1)", color: T.goldLight }}
        >
          <X className="w-4 h-4" />
        </button>
        <div
          className="relative p-5 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 12rem - 2 * env(safe-area-inset-bottom))",
            paddingTop: "calc(0.75rem + 24px)",
            paddingBottom: "calc(1.25rem + 48px + env(safe-area-inset-bottom))",
          }}
        >
          {children}
        </div>
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
        className="h-28 w-28 mx-auto"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {place.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {place.description}
      </div>

      <div className="mt-3 space-y-2">
        <SheetRow label="Required Bp" value={formatBp(place.unlockBp)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {!unlocked && !canUnlock && (
        <div
          className="mt-4 w-full rounded-full text-center py-4 px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          {formatBp(place.unlockBp - bp)} still needed to unlock
        </div>
      )}

      {unlocked && (
        <div
          className="mt-4 w-full rounded-full text-center py-4 px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          You are here
        </div>
      )}
      {!unlocked && canUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center"
          style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
        >
          Unlock Place
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
  onToggleFavorite,
}: {
  item: CollectionItem;
  progress: Progress;
  bp: number;
  onClose: () => void;
  onCollect: () => void;
  onToggleFavorite: () => void;
}) {
  const collected = progress.collectedItemIds.includes(item.id);
  const placeUnlocked = progress.unlockedPlaceIds.includes(item.placeId);
  const canCollect = !collected && placeUnlocked && bp >= item.bpCost;
  const isFavorite = (progress.favoriteItemIds ?? []).includes(item.id);
  const statusText = collected
    ? isFavorite ? "Favorite" : "Collected"
    : !placeUnlocked ? "Place Locked" : canCollect ? "Available" : "Locked";
  return (
    <Sheet onClose={onClose}>
      <img
        src={item.asset}
        alt=""
        className="h-28 w-28 mx-auto"
        style={{
          imageRendering: "pixelated",
          opacity: collected ? 1 : 0.4,
          filter: collected ? undefined : "grayscale(60%)",
        }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {item.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {item.description}
      </div>
      <div className="mt-3 space-y-2">
        <SheetRow label={collected ? "Used Bp" : "Required Bp"} value={formatBp(item.bpCost)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {collected ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          {isFavorite ? "Favorite" : "Add to Favorite"}
        </button>
      ) : canCollect ? (
        <button
          type="button"
          onClick={onCollect}
          className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          Collect
        </button>
      ) : (
        <div
          className="mt-4 w-full rounded-full text-center py-4 px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          {!placeUnlocked
            ? "Unlock this place first"
            : `${(item.bpCost - bp).toLocaleString()} Bp still needed to collect`}
        </div>
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
      <div className="text-center text-[22px] font-extrabold" style={{ color: T.goldLight }}>
        Edit Profile
      </div>
      <div className="mt-5 flex flex-col items-center">
        <div
          className="h-24 w-24 rounded-full grid place-items-center overflow-hidden"
          style={{
            background: "#173F29",
            border: `2px solid ${T.goldLight}`,
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={CHARACTER_ASSETS.shirinPortrait}
            alt=""
            className="h-full w-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <SettingsRow label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder="Enter name"
            className="w-full bg-transparent outline-none text-right text-[15px] font-semibold"
            style={{ color: T.ivory, letterSpacing: "-0.01em" }}
          />
        </SettingsRow>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-12 rounded-full text-[15px] font-semibold"
          style={{
            background: "rgba(8,36,22,0.72)",
            border: `1.5px solid ${T.borderSoft}`,
            color: T.ivory,
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(name)}
          className="h-12 rounded-full text-[15px] font-semibold"
          style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
        >
          Save
        </button>
      </div>
    </Sheet>
  );
}

function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="relative isolate flex items-center gap-3 rounded-full py-3 px-5 min-h-[60px]"
      style={{
        background: "rgba(8,36,22,0.55)",
        border: `1.5px solid ${T.borderSoft}`,
      }}
    >
      <span
        className="shrink-0 text-[15px] font-semibold leading-none"
        style={{ color: T.goldLight, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
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

function BadgeSheet({
  badge,
  progress,
  bp,
  onClose,
  onToggleFavorite,
  onUnlockGrowth,
}: {
  badge: (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" };
  progress: Progress;
  bp: number;
  onClose: () => void;
  onToggleFavorite: () => void;
  onUnlockGrowth: () => void;
}) {
  const unlocked =
    badge.kind === "place"
      ? progress.earnedPlaceBadgeIds.includes(badge.id)
      : progress.unlockedGrowthBadgeIds.includes(badge.id);
  const isFavorite = progress.favoriteBadgeIds.includes(badge.id);
  const isGrowthLocked = badge.kind === "growth" && !unlocked;
  const growthCost = badge.kind === "growth" ? (badge as GrowthBadge).bpCost : 0;
  const canAfford = bp >= growthCost;
  const cost =
    badge.kind === "place"
      ? PLACES.find((p) => p.placeBadgeId === badge.id)?.unlockBp ?? 0
      : growthCost;
  const statusText = unlocked
    ? isFavorite
      ? "Favorite"
      : "Earned"
    : isGrowthLocked
    ? canAfford
      ? "Available"
      : "Locked"
    : "Locked";

  return (
    <Sheet onClose={onClose}>
      <img
        src={badge.asset}
        alt=""
        className="h-28 w-28 mx-auto"
        style={{
          imageRendering: "pixelated",
          opacity: unlocked ? 1 : 0.4,
          filter: unlocked ? undefined : "grayscale(60%)",
        }}
      />
      <div className="mt-3 text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {badge.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {badge.description}
      </div>

      <div className="mt-3 space-y-2">
        <SheetRow label={unlocked ? "Used Bp" : "Required Bp"} value={formatBp(cost)} />
        <SheetRow label="Status" value={statusText} />
      </div>

      {isGrowthLocked ? (
        canAfford ? (
          <button
            type="button"
            onClick={onUnlockGrowth}
            className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center"
            style={{ background: T.goldGradient, color: T.goldOnDark, border: `2px solid ${T.goldLight}` }}
          >
            Unlock · {growthCost.toLocaleString()} Bp
          </button>
        ) : (
          <div
            className="mt-4 w-full rounded-full text-center py-4 px-4 text-[17px] font-semibold"
            style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
          >
            {(growthCost - bp).toLocaleString()} Bp still needed to unlock
          </div>
        )
      ) : isFavorite ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.12)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          Favorite
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!unlocked}
          className="mt-4 w-full rounded-full py-4 px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{
            background: "rgba(216,175,87,0.12)",
            color: unlocked ? T.goldLight : T.sage,
            opacity: unlocked ? 1 : 0.75,
          }}
        >
          <Heart className="w-4 h-4" fill="none" />
          {unlocked ? "Add to Favorite" : "Locked"}
        </button>
      )}
    </Sheet>
  );
}