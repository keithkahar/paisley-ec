import { createFileRoute } from "@tanstack/react-router";
import { capitalizeName } from "@/components/app/EditProfileSheet";
import { useEffect, useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { LearningJourneyFlow } from "@/components/app/LearningJourneyFlow";
import { shouldShowBloxiaLimitPrompt } from "@/lib/learningJourney";
import { Heart, X, ChevronRight, ChevronDown, Pencil, Camera, Compass, Award, Gem } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bloxiaLogoText from "@/assets/brand/bloxia-logo-text.png";
import {
  BLOXIAN_AVATARS,
  CHARACTER_ASSETS,
  COLLECTION_ITEMS,
  DEFAULT_BLOXIAN_NAME,
  GROWTH_BADGES,
  MAP_ASSETS,
  PLACES,
  PLACE_BADGES,
  avatarById,
  collectionItemById,
  growthBadgeById,
  placeBadgeById,
  placeById,
  type BloxianAvatar,
  type CollectionItem,
  type GrowthBadge,
  type Place,
  type PlaceBadge,
  type PlaceId,
} from "@/lib/bloxia/config";
import { bxImg } from "@/lib/bloxia/assets";
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

// Avatar icons are already square head crops, so show them 1:1 with no zoom.
const AVATAR_HEAD_STYLE = {
  transform: "none",
  transformOrigin: "50% 50%",
};

function formatBp(n: number) {
  return `${Math.max(0, Math.floor(n)).toLocaleString()} Bp`;
}

function BloxiaPage() {
  const b = useBloxia();
  const avatar = b.selectedAvatar;
  const avatarUrl = avatar?.portrait ?? CHARACTER_ASSETS.shirinPortrait;
  const avatarFullUrl = avatar?.full ?? CHARACTER_ASSETS.shirinFull;
  const avatarMap = avatar?.map ?? CHARACTER_ASSETS.shirinMap;
  const [page, setPage] = useState<PageKey>("map");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<
    (PlaceBadge | GrowthBadge) & { kind: "place" | "growth" } | null
  >(null);
  const [nameEditor, setNameEditor] = useState(false);
  const [avatarPicker, setAvatarPicker] = useState(false);
  const [badgeTab, setBadgeTab] = useState<BadgeTab>("place");
  const [collectionTab, setCollectionTab] = useState<CollectionTab>("items");
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  // The trial-limit sheet (LearningJourneyFlow) takes priority over the welcome
  // sheet. We resolve its state first so the two never mount in the same frame,
  // which used to cause a brief flash of overlapping sheets.
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [journeyChecked, setJourneyChecked] = useState(false);
  useEffect(() => {
    setJourneyOpen(shouldShowBloxiaLimitPrompt());
    setJourneyChecked(true);
  }, []);

  // First-time avatar selection: prompt once when the user has never chosen.
  // DEBUG: always show welcome sheet on entry for debugging.
  useEffect(() => {
    if (b.ready && journeyChecked && !journeyOpen) setWelcomeOpen(true);
  }, [b.ready, journeyChecked, journeyOpen]);
  const showFirstTime = welcomeOpen && !journeyOpen;

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
            avatarUrl={avatarMap}
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
          avatarUrl={avatarUrl}
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
              height: "calc(env(safe-area-inset-top) + 108px)",
              background:
                "linear-gradient(to bottom, rgba(8,36,22,0.96) 0%, rgba(8,36,22,0.92) 70%, rgba(8,36,22,0.6) 90%, rgba(8,36,22,0) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.5) 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.5) 94%, transparent 100%)",
            }}
          />
        )}

        {/* Content — Badges page sits a bit higher for a tighter title gap */}
        <div className={`relative pb-6 px-4 ${page === "badges" || page === "collection" || page === "profile" ? "pt-[120px]" : "pt-[140px]"}`}>
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
              selectedItemId={selectedItem?.id ?? null}
            />
          )}
          {page === "profile" && (
            <ProfileView
              progress={b.progress}
              logs={b.logs}
              totals={b.totals}
              bp={b.bp}
              avatarUrl={avatarUrl}
              avatarFullUrl={avatarFullUrl}
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

        <LearningJourneyFlow onOpenChange={setJourneyOpen} />
      {page === "map" && <BottomTabBar />}
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
        {page !== "badges" && selectedBadge && (
          <BadgeSheet
            badge={selectedBadge}
            progress={b.progress}
            bp={b.bp}
            onClose={() => setSelectedBadge(null)}
            onToggleFavorite={() => b.toggleFavorite(selectedBadge.id)}
            onUnlockGrowth={() => b.unlockGrowthBadge(selectedBadge.id)}
          />
        )}
        {nameEditor && (
          <NameEditor
            initial={b.progress.bloxianName}
            initialAvatarId={b.progress.selectedAvatarId}
            onClose={() => setNameEditor(false)}
            onSave={(id, name) => {
              b.completeWelcome(id, name);
              setNameEditor(false);
            }}
          />
        )}
        {avatarPicker && (
          <AvatarPickerSheet
            title="Change Avatar"
            selectedAvatarId={b.progress.selectedAvatarId}
            onClose={() => setAvatarPicker(false)}
            onConfirm={(id) => {
              b.selectAvatar(id);
              setAvatarPicker(false);
            }}
          />
        )}
        {showFirstTime && !avatarPicker && (
          <WelcomeSheet
            initialAvatarId={b.progress.selectedAvatarId}
            initialName={b.progress.bloxianName}
            onStart={(id, name) => {
              b.completeWelcome(id, name);
              setWelcomeOpen(false);
            }}
            onClose={() => {
              b.completeWelcome(b.progress.selectedAvatarId, b.progress.bloxianName);
              setWelcomeOpen(false);
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
  avatarUrl,
  onNavigate,
}: {
  progress: Progress;
  bp: number;
  progressPct: number;
  next: Place | undefined;
  page: PageKey;
  avatarUrl: string;
  onNavigate: (p: PageKey) => void;
}) {
  const allTabs: { key: PageKey; label: string; Icon: typeof Compass }[] = [
    { key: "map", label: "Map", Icon: Compass },
    { key: "badges", label: "Badges", Icon: Award },
    { key: "collection", label: "Items", Icon: Gem },
  ];
  // Hide the icon of the current page; profile is entered via the avatar.
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
            <div className="flex items-start gap-1.5 min-w-0">
            <Link
              to="/"
              aria-label="Close"
              className="h-8 w-8 rounded-full grid place-items-center shrink-0 bg-white border border-border active:scale-95 transition-transform"
            >
              <X className="h-4 w-4" strokeWidth={2.5} style={{ color: "#0F172A" }} />
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
                  className="h-8 w-8 rounded-full grid place-items-center transition-colors shrink-0"
                  style={
                    active
                      ? { background: T.goldGradient, color: T.goldOnDark, border: `1px solid ${T.goldLight}` }
                      : { background: "rgba(23,63,41,0.9)", color: T.goldLight, border: `1px solid rgba(216,175,87,0.55)` }
                  }
                >
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </button>
              );
            })}
            {/* Bp pill: same height as the close button */}
            {page !== "profile" && (
            <div
              className="h-8 px-2.5 rounded-full grid place-items-center shrink-0 text-[11px] font-extrabold"
              style={{
                background: "rgba(23,63,41,0.9)",
                color: T.goldLight,
                border: `1px solid rgba(216,175,87,0.55)`,
              }}
            >
              {formatBp(bp)}
            </div>
            )}
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
                className="text-[10px] font-bold leading-snug mt-[6px] whitespace-nowrap"
                style={{
                  color: T.goldLight,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {next
                  ? `${formatBp(next.unlockBp - bp)} to ${next.shortName}`
                  : "All places unlocked"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("profile")}
              aria-label="Profile"
              className="h-[48px] w-[48px] rounded-full shrink-0 grid place-items-center overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 1.5px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={bxImg(avatarUrl, 256)}
                alt=""
                className="h-full w-full rounded-full object-cover"
                draggable={false}
                style={AVATAR_HEAD_STYLE}
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
  avatarUrl,
}: {
  progress: Progress;
  bp: number;
  onSelectPlace: (p: Place) => void;
  avatarUrl: string;
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
      <div
        className="absolute z-10 pointer-events-none flex flex-col items-center justify-center gap-1"
        style={{ top: "calc(env(safe-area-inset-top) + 6.125rem - 6px)", left: "16px" }}
      >
        {/* Smaller blue-cyan halo behind the white text logo */}
        <div
          aria-hidden
          className="absolute"
          style={{
            width: "200px",
            height: "90px",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(100,220,255,0.50) 0%, rgba(50,170,255,0.28) 40%, rgba(30,140,255,0.10) 60%, transparent 72%)",
            filter: "blur(14px)",
          }}
        />
        <div
          aria-hidden
          className="absolute"
          style={{
            width: "130px",
            height: "58px",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(170,245,255,0.58) 0%, rgba(110,220,255,0.22) 50%, transparent 68%)",
            filter: "blur(8px)",
          }}
        />
        {/* Text-only logo in white with a cool cyan/blue halo */}
        <img
          src={bloxiaLogoText}
          alt="Bloxia — Growth World"
          className="relative w-[90px] object-contain opacity-95"
          style={{
            filter:
              "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(0,0,0,0.25))",
          }}
        />
        <div
          className="relative px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide"
          style={{
            color: T.goldLight,
            background: "rgba(8,36,22,0.62)",
            border: `1px solid ${T.borderSoft}`,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          1,000 Bp to review
        </div>
      </div>
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
              src={bxImg(avatarUrl, 256)}
              alt=""
              className="h-11 w-11 -mb-1"
              style={{ imageRendering: "pixelated", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.42))" }}
            />
          )}
          <img
            src={bxImg(p.marker, 192)}
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

const BADGE_TILE_SCALE: Record<string, number> = {
  "Hill Adventurer": 0.9,
};

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
              style={{
                background: active ? "rgba(28,87,50,0.92)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span className="text-[15px] font-bold" style={{ color: T.ivory }}>{t.text} </span>
              <span style={{ color: T.sage }}>{t.count}</span>
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
            scale={BADGE_TILE_SCALE[item.name] ?? 1}
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

function GlowImage({
  src,
  alt,
  className,
  dimmed = false,
  scale = 1.05,
  blur = 10,
  glowOpacity = 0.4,
}: {
  src: string;
  alt: string;
  className?: string;
  dimmed?: boolean;
  scale?: number;
  blur?: number;
  glowOpacity?: number;
}) {
  return (
    <div className={`relative ${className || ""}`}>
      {!dimmed && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full bloxia-glow-pulse"
          style={{
            imageRendering: "pixelated",
            filter: `blur(${blur}px)`,
            opacity: glowOpacity,
            transform: `scale(${scale})`,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full"
        style={{
          imageRendering: "pixelated",
          opacity: dimmed ? 0.4 : 1,
          filter: dimmed ? "grayscale(100%)" : undefined,
        }}
      />
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
  hideName = false,
  scale = 1,
}: {
  asset: string;
  name: string;
  unlocked: boolean;
  selected: boolean;
  onClick: () => void;
  size?: "default" | "large";
  hideName?: boolean;
  scale?: number;
}) {
  const baseSize = size === "large" ? 100 : 85;
  const s = Math.round(baseSize * scale);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[14px] text-center transition-transform active:scale-95 flex flex-col ${hideName ? "p-1" : "p-1.5"}`}
      style={{
        background: "rgba(8,36,22,0.72)",
        border: selected ? `1.5px solid ${T.goldLight}` : `1.5px solid ${T.borderSoft}`,
        boxShadow: selected ? `0 0 0 3px rgba(255,240,167,0.22)` : "none",
      }}
    >
      <div className="mx-auto aspect-square w-full grid place-items-center overflow-hidden">
        <img
          src={bxImg(asset, 256)}
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover"
          style={{
            imageRendering: "pixelated",
            opacity: unlocked ? 1 : 0.34,
            filter: unlocked ? undefined : "grayscale(100%)",
            width: `${s}%`,
            height: `${s}%`,
          }}
        />
      </div>
      {!hideName && (
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
      )}
    </button>
  );
}

// ============ Collection View ============

function CollectionView({
  progress,
  onSelectItem,
  tab,
  setTab,
  selectedItemId,
}: {
  progress: Progress;
  onSelectItem: (i: CollectionItem) => void;
  tab: CollectionTab;
  setTab: (t: CollectionTab) => void;
  selectedItemId?: string | null;
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
              style={{
                background: active ? "rgba(28,87,50,0.92)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span className="text-[15px] font-bold" style={{ color: T.ivory }}>{t.text} </span>
              <span style={{ color: T.sage }}>{t.count}</span>
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
                selected={selectedItemId === item.id}
                onClick={() => onSelectItem(item)}
                size="large"
                scale={BADGE_TILE_SCALE[item.name] ?? 1}
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
                  selected={selectedItemId === item.id}
                  onClick={() => onSelectItem(item)}
                  size="large"
                  scale={BADGE_TILE_SCALE[item.name] ?? 1}
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
  bp,
  avatarUrl,
  avatarFullUrl,
  onEditName,
  onGoBadgesFavorite,
  onGoCollectionFavorite,
  onSelectBadge,
  onSelectItem,
}: {
  progress: Progress;
  logs: SpendingLog[];
  totals: { places: number; placeBadges: number; growthBadges: number; collectionItems: number };
  bp: number;
  avatarUrl: string;
  avatarFullUrl: string;
  onEditName: () => void;
  onGoBadgesFavorite: () => void;
  onGoCollectionFavorite: () => void;
  onSelectBadge: (b: SelectedBadge) => void;
  onSelectItem: (i: CollectionItem) => void;
}) {
  const [activityCount, setActivityCount] = useState(1);
  const selectedAvatar = avatarById[progress.selectedAvatarId];

  const totalBadges = progress.earnedPlaceBadgeIds.length + progress.unlockedGrowthBadgeIds.length;
  const totalBadgesAll = totals.placeBadges + totals.growthBadges;

  const pills = [
    { label: "Badges", value: `${totalBadges}/${totalBadgesAll}` },
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
    .slice(0, 5);
  const favItemIds = [...(progress.favoriteItemIds ?? [])].reverse();
  const favItems: CollectionItem[] = favItemIds
    .map((id) => collectionItemById[id])
    .filter((x): x is CollectionItem => !!x)
    .slice(0, 5);

  const activities = logs.map(logToActivity);
  const visibleActivities = activities.slice(0, activityCount);

  return (
    <div className="space-y-6">
      {/* --- Header card: avatar (left) | divider | name + pills (right) ---
          Values below mirror the miniprogram profile-hero spec (rpx / 2 = px). */}
      <div
        className="relative flex flex-row items-center overflow-hidden"
        style={{
          minHeight: 216,
          padding: "18px 22px 18px 17px",
          borderRadius: 18,
          border: "2px solid rgba(216,175,87,0.42)",
          background: "rgba(8,36,22,0.58)",
          boxSizing: "border-box",
        }}
      >
        {/* Edit button */}
        <button
          type="button"
          onClick={onEditName}
          aria-label="Edit profile"
          className="absolute grid place-items-center rounded-full active:scale-95 transition-transform"
          style={{
            top: 12,
            right: 16,
            width: 30,
            height: 30,
            background: "rgba(8,36,22,0.72)",
            border: "1.5px solid rgba(216,175,87,0.18)",
            boxShadow: "0 1.5px 4px rgba(0,0,0,0.18)",
            zIndex: 2,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#FFF4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Avatar area */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 187,
            height: 180,
            flex: "0 0 187px",
            overflow: "visible",
          }}
        >
          <img
            src={bxImg(avatarFullUrl, 512)}
            alt=""
            draggable={false}
            style={{
              width: "242%",
              height: "242%",
              objectFit: "contain",
              imageRendering: "auto",
              transform: `translateX(-22px) scale(${selectedAvatar?.profileScale ?? 1})`,
              transformOrigin: "center center",
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.45))",
            }}
          />
        </div>

        {/* Divider */}
        <div
          aria-hidden
          style={{
            width: 1.5,
            height: 166.5,
            margin: "0 21px 0 -28px",
            flex: "0 0 1.5px",
            background: "rgba(216,175,87,0.22)",
          }}
        />

        {/* Right info group: name + pills, bottom-aligned */}
        <div
          className="flex flex-col"
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 166.5,
            justifyContent: "flex-end",
            transform: "translateX(3px)",
          }}
        >
          <div
            style={{
              margin: "-5px 0 22px",
              color: "#FFF4BF",
              fontSize: 21,
              fontWeight: 600,
              lineHeight: 1,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {progress.bloxianName}
          </div>
          <div className="flex flex-col items-start" style={{ gap: 7 }}>
            <span
              className="inline-flex items-center"
              style={{
                height: 29,
                minWidth: 77,
                padding: "0 12px",
                borderRadius: 999,
                background: "rgba(8,36,22,0.72)",
                border: "1.5px solid rgba(216,175,87,0.42)",
                color: "#B7D9B7",
                fontSize: 13,
                fontWeight: 600,
                gap: 4,
                boxSizing: "border-box",
              }}
            >
              <span style={{ color: "#FFF4BF", fontWeight: 700 }}>{bp.toLocaleString()}</span>
              <span style={{ color: "#FFF4BF", fontWeight: 700 }}>Bp</span>
            </span>
            {pills.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center"
                style={{
                  height: 29,
                  minWidth: 80,
                  padding: "0 12px",
                  borderRadius: 999,
                  background: "rgba(8,36,22,0.72)",
                  border: "1.5px solid rgba(216,175,87,0.42)",
                  color: "#B7D9B7",
                  fontSize: 13,
                  fontWeight: 600,
                  gap: 4,
                  boxSizing: "border-box",
                }}
              >
                <span style={{ color: "#FFF4BF", fontWeight: 700 }}>{p.label}</span>
                <span style={{ color: "#B7D9B7" }}>{p.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Latest Earned --- */}
      <ProfileGroup title="Latest Earned">
        {latestEarned.length ? (
          <div className="grid grid-cols-3 gap-3">
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
                  hideName
                  scale={BADGE_TILE_SCALE[e.badge.name] ?? 1}
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
                  hideName
                  scale={BADGE_TILE_SCALE[e.item.name] ?? 1}
                />
              ),
            )}
          </div>
        ) : (
          <EmptyLine>Nothing earned yet — go explore Bloxia.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Badges --- */}
      <ProfileGroup title="Favorite Badges" onAction={onGoBadgesFavorite} actionKind="right">
        {favBadges.length ? (
          <div className="grid grid-cols-3 gap-3">
            {favBadges.map((b) => (
              <BadgeTile
                key={b.id}
                asset={b.asset}
                name={b.name}
                unlocked
                selected={false}
                onClick={() => onSelectBadge(b)}
                size="large"
                hideName
                scale={BADGE_TILE_SCALE[b.name] ?? 1}
              />
            ))}
          </div>
        ) : (
          <EmptyLine>Tap the heart on any earned badge.</EmptyLine>
        )}
      </ProfileGroup>

      {/* --- Favorite Items --- */}
      <ProfileGroup title="Favorite Items" onAction={onGoCollectionFavorite} actionKind="right">
        {favItems.length ? (
          <div className="grid grid-cols-3 gap-3">
            {favItems.map((it) => (
              <BadgeTile
                key={it.id}
                asset={it.asset}
                name={it.name}
                unlocked
                selected={false}
                onClick={() => onSelectItem(it)}
                size="large"
                hideName
                scale={BADGE_TILE_SCALE[it.name] ?? 1}
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
        onAction={
          activities.length > 1
            ? () =>
                setActivityCount((c) =>
                  c <= 1 ? Math.min(activities.length, 10) : 1,
                )
            : undefined
        }
        actionKind="down"
        actionRotated={activityCount > 1}
      >
        {visibleActivities.length ? (
          <div className="space-y-1.5">
            {visibleActivities.map((a) => (
              <ActivityRow key={a.id} activity={a} />
            ))}
            {activityCount > 1 &&
              activityCount < activities.length &&
              activityCount % 10 === 0 && (
                <div className="flex justify-end pt-1 pr-1">
                  <button
                    type="button"
                    onClick={() =>
                      setActivityCount((c) =>
                        Math.min(activities.length, c + 10),
                      )
                    }
                    aria-label="Show 10 more"
                    className="h-7 w-7 grid place-items-center active:scale-95 transition-transform"
                    style={{ color: T.ivory }}
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}
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
  actionRotated,
  children,
}: {
  title: string;
  onAction?: () => void;
  actionKind?: "right" | "down";
  framed?: boolean;
  actionRotated?: boolean;
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
            className="h-7 w-7 grid place-items-center active:scale-95 transition-transform"
            style={{ color: T.ivory }}
          >
            {actionKind === "down" ? (
              <ChevronDown
                className="w-4 h-4 transition-transform"
                strokeWidth={2.5}
                style={{ transform: actionRotated ? "rotate(180deg)" : "none" }}
              />
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

function Sheet({
  children,
  onClose,
  pills,
}: {
  children: React.ReactNode;
  onClose: () => void;
  pills?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-sheet-backdrop pointer-events-auto"
      />
      <div
        className="relative w-full max-w-[420px] rounded-t-[24px] pointer-events-auto flex flex-col"
        style={{
          background: "transparent",
          boxShadow: "0 -12px 30px rgba(0,0,0,0.45)",
        }}
      >
        {/* Background layer extends to the bottom of the screen, giving the nav bar the same base color */}
        <div
          className="absolute inset-0 rounded-t-[24px]"
          style={{ background: "rgba(8, 36, 22, 0.52)", backdropFilter: "blur(6px)" }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute left-[14px] top-[14px] z-10 h-8 w-8 rounded-full grid place-items-center"
          style={{ background: "rgba(255,244,191,0.1)", color: T.goldLight }}
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
        {pills && (
          <div className="absolute right-[14px] top-[14px] z-10 flex items-center gap-2">
            {pills}
          </div>
        )}
        <div
          className="relative p-5 overflow-y-auto flex flex-col"
          style={{
            height: "min(62vh, calc(100dvh - 6rem - env(safe-area-inset-bottom)))",
            paddingTop: "58px",
            paddingBottom: "2rem",
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
  const badge = placeBadgeById[place.placeBadgeId];

  return (
    <Sheet
      onClose={onClose}
      pills={<SheetPills items={[{ value: formatBp(place.unlockBp) }]} />}
    >
      <GlowImage
        src={bxImg(badge.asset, 448)}
        alt={badge.name}
        className="h-72 w-72 mx-auto"
        dimmed={!unlocked}
      />
      <div className="mt-[22px] text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {place.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {place.description}
      </div>

      {!unlocked && !canUnlock && (
        <div
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          {formatBp(place.unlockBp - bp)} still needed to unlock
        </div>
      )}

      {unlocked && (
        <div
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          You are here
        </div>
      )}
      {!unlocked && canUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
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
  return (
    <Sheet
      onClose={onClose}
      pills={<SheetPills items={[{ value: formatBp(item.bpCost) }]} />}
    >
      <GlowImage
        src={bxImg(item.asset, 448)}
        alt={item.name}
        className="h-72 w-72 mx-auto"
        dimmed={!collected}
      />
      <div className="mt-[22px] text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {item.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {item.description}
      </div>

      {collected ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          {isFavorite ? "Favorite" : "Add to Favorite"}
        </button>
      ) : canCollect ? (
        <button
          type="button"
          onClick={onCollect}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          Collect
        </button>
      ) : (
        <div
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
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
  initialAvatarId,
  onClose,
  onSave,
}: {
  initial: string;
  initialAvatarId: string;
  onClose: () => void;
  onSave: (avatarId: string, name: string) => void;
}) {
  const [name, setName] = useState(
    initial && initial.trim() !== DEFAULT_BLOXIAN_NAME ? initial.trim() : "",
  );
  const startIndex = Math.max(
    0,
    BLOXIAN_AVATARS.findIndex((a) => a.id === initialAvatarId),
  );
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useState<{ x: number | null }>({ x: null })[0];
  const total = BLOXIAN_AVATARS.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const current = BLOXIAN_AVATARS[index];
  const prev = BLOXIAN_AVATARS[mod(index - 1)];
  const next = BLOXIAN_AVATARS[mod(index + 1)];
  const go = (delta: number) => setIndex((i) => mod(i + delta));
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.x = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.x == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.x;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
    touchStartX.x = null;
  };
  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col min-h-full">
        <div className="text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
          Edit Profile
        </div>
        <div
          className="mt-10 flex items-center justify-center gap-4 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={bxImg(prev.portrait, 224)}
              alt=""
              className="h-full w-full object-cover"
              style={AVATAR_HEAD_STYLE}
              draggable={false}
            />
          </button>
          <div className="relative h-[134px] w-[134px] shrink-0">
            <div
              className="h-full w-full rounded-full overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 2px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={bxImg(current.portrait, 320)}
                alt=""
                className="h-full w-full object-cover"
                style={AVATAR_HEAD_STYLE}
                draggable={false}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={bxImg(next.portrait, 224)}
              alt=""
              className="h-full w-full object-cover"
              style={AVATAR_HEAD_STYLE}
              draggable={false}
            />
          </button>
        </div>
        <div className="mt-10 flex items-stretch gap-3">
          <div
            className="flex-1 flex items-center justify-center gap-1 rounded-full px-5 h-[60px] relative"
            style={{
              background: "rgba(8,36,22,0.55)",
              border: `1.5px solid ${T.borderSoft}`,
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(capitalizeName(e.target.value))}
              maxLength={24}
              placeholder="Enter your name"
              className="min-w-0 bg-transparent outline-none text-center text-[15px] font-semibold placeholder:font-normal placeholder:text-[rgba(183,217,183,0.55)]"
              style={{
                color: T.ivory,
                letterSpacing: "-0.01em",
              } as React.CSSProperties}
            />
          </div>
          <button
            type="button"
            onClick={() => onSave(current.id, name.trim() || DEFAULT_BLOXIAN_NAME)}
            className="h-[60px] px-7 rounded-full text-[15px] font-semibold shrink-0"
            style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
          >
            Save
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function AvatarPickerSheet({
  title,
  subtitle,
  selectedAvatarId,
  confirmLabel = "Save",
  onClose,
  onConfirm,
}: {
  title: string;
  subtitle?: string;
  selectedAvatarId: string;
  confirmLabel?: string;
  onClose?: () => void;
  onConfirm: (id: string) => void;
}) {
  const [pending, setPending] = useState(selectedAvatarId);
  return (
    <Sheet onClose={onClose ?? (() => {})}>
      <div className="flex flex-col h-full">
        <div className="text-[22px] font-semibold leading-tight" style={{ color: T.ivory }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-[13px] font-semibold mt-1" style={{ color: T.sage }}>
            {subtitle}
          </div>
        )}
        <div className="grid grid-cols-4 gap-x-3 gap-y-6 mt-5">
          {BLOXIAN_AVATARS.map((a) => {
            const active = a.id === pending;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setPending(a.id)}
                className="flex items-center justify-center active:scale-95 transition-transform"
              >
                <div
                  className="h-16 w-16 rounded-full overflow-hidden"
                  style={{
                    background: "white",
                    boxShadow: active
                      ? `0 0 0 2.5px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.45)`
                      : `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
                  }}
                >
                  <img
                    src={bxImg(a.portrait, 224)}
                    alt=""
                    className="h-full w-full object-cover"
                    style={AVATAR_HEAD_STYLE}
                    draggable={false}
                  />
                </div>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => onConfirm(pending)}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full text-[15px] font-semibold"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          {confirmLabel}
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

function WelcomeSheet({
  initialAvatarId,
  initialName,
  onStart,
  onClose,
}: {
  initialAvatarId: string;
  initialName: string;
  onStart: (avatarId: string, name: string) => void;
  onClose: () => void;
}) {
  const startIndex = Math.max(
    0,
    BLOXIAN_AVATARS.findIndex((a) => a.id === initialAvatarId),
  );
  const [index, setIndex] = useState(startIndex);
  const [name, setName] = useState("");
  const touchStartX = useState<{ x: number | null }>({ x: null })[0];
  const total = BLOXIAN_AVATARS.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const current = BLOXIAN_AVATARS[index];
  const prev = BLOXIAN_AVATARS[mod(index - 1)];
  const next = BLOXIAN_AVATARS[mod(index + 1)];

  const go = (delta: number) => setIndex((i) => mod(i + delta));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.x = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.x == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.x;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
    touchStartX.x = null;
  };

  return (
    <Sheet onClose={onClose}>
      <div className="flex flex-col min-h-full">
        <div className="text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
          Welcome to Bloxia
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-4 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={bxImg(prev.portrait, 224)}
              alt=""
              className="h-full w-full object-cover"
              style={AVATAR_HEAD_STYLE}
              draggable={false}
            />
          </button>

          <div className="relative h-[134px] w-[134px] shrink-0">
            <div
              className="h-full w-full rounded-full overflow-hidden"
              style={{
                background: "white",
                boxShadow: `0 0 0 2px ${T.goldLight}, inset 0 0 0 1px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)`,
              }}
            >
              <img
                src={bxImg(current.portrait, 320)}
                alt=""
                className="h-full w-full object-cover"
              style={AVATAR_HEAD_STYLE}
                draggable={false}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="h-[70px] w-[70px] rounded-full overflow-hidden active:scale-95 transition-transform shrink-0"
            style={{
              background: "white",
              opacity: 0.55,
              boxShadow: `0 0 0 1.5px ${T.borderSoft}, inset 0 0 0 1px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={bxImg(next.portrait, 224)}
              alt=""
              className="h-full w-full object-cover"
                style={AVATAR_HEAD_STYLE}
              draggable={false}
            />
          </button>
        </div>

        <div className="mt-10 flex items-stretch gap-3">
          <div
            className="flex-1 flex items-center justify-center gap-1 rounded-full px-5 h-[60px]"
            style={{
              background: "rgba(8,36,22,0.55)",
              border: `1.5px solid ${T.borderSoft}`,
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(capitalizeName(e.target.value))}
              maxLength={24}
              placeholder="Enter your name"
              className="min-w-0 bg-transparent outline-none text-center text-[15px] font-semibold placeholder:font-normal placeholder:text-[rgba(183,217,183,0.55)]"
              style={{
                color: T.ivory,
                letterSpacing: "-0.01em",
                fieldSizing: "content",
                width: "auto",
              } as React.CSSProperties}
            />
          </div>
          <button
            type="button"
            onClick={() => onStart(current.id, name.trim() || DEFAULT_BLOXIAN_NAME)}
            className="h-[60px] px-7 rounded-full text-[15px] font-semibold shrink-0"
            style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
          >
            Start
          </button>
        </div>
      </div>
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

function SheetPills({ items }: { items: { value: string }[] }) {
  return (
    <div className="flex items-center gap-2">
      {items.map((it) => (
        <div
          key={it.value}
          className="h-8 px-3 rounded-full inline-flex items-center justify-center text-[13px] leading-none font-semibold whitespace-nowrap"
          style={{ border: `1px solid rgba(216,175,87,0.55)`, color: T.goldLight }}
        >
          {it.value}
        </div>
      ))}
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
  return (

    <Sheet onClose={onClose}>
      <GlowImage
        src={bxImg(badge.asset, 448)}
        alt={badge.name}
        className="h-72 w-72 mx-auto"
        dimmed={!unlocked}
      />

      <div className="mt-[22px] text-center text-[22px] font-semibold leading-none" style={{ color: T.ivory }}>
        {badge.name}
      </div>
      <div className="mt-1 text-center text-[13px] leading-snug" style={{ color: T.sage }}>
        {badge.description}
      </div>

      {isGrowthLocked ? (
        canAfford ? (
          <button
            type="button"
            onClick={onUnlockGrowth}
            className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center"
            style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
          >
            Unlock · {growthCost.toLocaleString()} Bp
          </button>
        ) : (
          <div
            className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full flex items-center justify-center text-center px-4 text-[17px] font-semibold"
            style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
          >
            {(growthCost - bp).toLocaleString()} Bp still needed to unlock
          </div>
        )
      ) : isFavorite ? (
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{ background: "rgba(216,175,87,0.32)", color: T.goldLight }}
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          Favorite
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!unlocked}
          className="absolute left-5 right-5 bottom-8 h-[50px] rounded-full px-4 font-semibold text-[17px] text-center inline-flex items-center justify-center gap-2"
          style={{
            background: "rgba(216,175,87,0.32)",
            color: T.goldLight,
          }}
        >
          <Heart className="w-4 h-4" fill="none" />
          {unlocked ? "Add to Favorite" : "Locked"}
        </button>
      )}
    </Sheet>
  );
}