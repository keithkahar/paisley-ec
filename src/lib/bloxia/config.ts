import { BLOXIA_URLS as U } from "./assets";

export type PlaceId =
  | "arrival_meadow"
  | "wonder_tree"
  | "river_of_echoes"
  | "whisper_woods"
  | "community_hollow"
  | "reflection_lake"
  | "myblox_belt"
  | "far_hills";

export interface Place {
  id: PlaceId;
  name: string;
  shortName: string;
  unlockBp: number;
  order: number;
  mapPosition: { x: number; y: number };
  placeBadgeId: string;
  description: string;
}

export interface PlaceBadge {
  id: string;
  name: string;
  placeId: PlaceId;
  asset: string;
  description: string;
}

export interface GrowthBadge {
  id: string;
  name: string;
  bpCost: number;
  series: string;
  asset: string;
  description: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  placeId: PlaceId;
  bpCost: number;
  rarity: "common" | "rare" | "epic";
  asset: string;
  description: string;
}

export const CHARACTER_ASSETS = {
  shirinFull: U.shirin_full,
  shirinMap: U.shirin_map,
  shirinPortrait: U.shirin_portrait,
  shirinSuccess: U.shirin_success,
  shirinAndBloxie: U.shirin_and_bloxie,
  bloxieIdle: U.bloxie_idle,
  bloxieGlow: U.bloxie_glow,
};

export const MAP_ASSETS = {
  world: U.map_bloxia_world,
  markers: {
    current: U.map_marker_current,
    visited: U.map_marker_visited,
    available: U.map_marker_available,
    locked: U.map_marker_locked,
  },
};

export const PLACES: Place[] = [
  { id: "arrival_meadow", name: "Arrival Meadow", shortName: "Meadow", unlockBp: 0, order: 1, mapPosition: { x: 75, y: 70 }, placeBadgeId: "meadow_visitor", description: "The first safe field where every Bloxian begins." },
  { id: "wonder_tree", name: "Wonder Tree", shortName: "Tree", unlockBp: 1000, order: 2, mapPosition: { x: 50, y: 61 }, placeBadgeId: "wonder_tree_explorer", description: "A bright tree for curious questions and new ideas." },
  { id: "river_of_echoes", name: "River of Echoes", shortName: "River", unlockBp: 2000, order: 3, mapPosition: { x: 86, y: 42 }, placeBadgeId: "river_traveler", description: "A calm river where learning memories flow forward." },
  { id: "whisper_woods", name: "Whisper Woods", shortName: "Woods", unlockBp: 3000, order: 4, mapPosition: { x: 14, y: 51 }, placeBadgeId: "forest_explorer", description: "A quiet forest for focus, listening, and careful growth." },
  { id: "community_hollow", name: "Community Hollow", shortName: "Hollow", unlockBp: 4000, order: 5, mapPosition: { x: 20, y: 66 }, placeBadgeId: "community_visitor", description: "A friendly place for kindness, teamwork, and sharing." },
  { id: "reflection_lake", name: "Reflection Lake", shortName: "Lake", unlockBp: 5000, order: 6, mapPosition: { x: 17, y: 29 }, placeBadgeId: "lake_observer", description: "A lake for looking back and seeing how far you have grown." },
  { id: "myblox_belt", name: "MyBlox Belt", shortName: "MyBlox", unlockBp: 6000, order: 7, mapPosition: { x: 78, y: 27 }, placeBadgeId: "creative_land_visitor", description: "A creative land for building identity, projects, and dreams." },
  { id: "far_hills", name: "Far Hills", shortName: "Hills", unlockBp: 8000, order: 8, mapPosition: { x: 44, y: 18 }, placeBadgeId: "hill_adventurer", description: "The far horizon for big goals and future courage." },
];

export const PLACE_BADGES: PlaceBadge[] = [
  { id: "meadow_visitor", name: "Meadow Visitor", placeId: "arrival_meadow", asset: U.place_badge_meadow_visitor, description: "Arrived safely in Arrival Meadow." },
  { id: "wonder_tree_explorer", name: "Wonder Tree Explorer", placeId: "wonder_tree", asset: U.place_badge_wonder_tree_explorer, description: "Reached the Wonder Tree." },
  { id: "river_traveler", name: "River Traveler", placeId: "river_of_echoes", asset: U.place_badge_river_traveler, description: "Crossed the River of Echoes." },
  { id: "forest_explorer", name: "Forest Explorer", placeId: "whisper_woods", asset: U.place_badge_forest_explorer, description: "Explored Whisper Woods." },
  { id: "community_visitor", name: "Community Visitor", placeId: "community_hollow", asset: U.place_badge_community_visitor, description: "Visited Community Hollow." },
  { id: "lake_observer", name: "Lake Observer", placeId: "reflection_lake", asset: U.place_badge_lake_observer, description: "Reached Reflection Lake." },
  { id: "creative_land_visitor", name: "Creative Land Visitor", placeId: "myblox_belt", asset: U.place_badge_creative_land_visitor, description: "Entered MyBlox Belt." },
  { id: "hill_adventurer", name: "Hill Adventurer", placeId: "far_hills", asset: U.place_badge_hill_adventurer, description: "Reached the Far Hills." },
];

export const GROWTH_BADGES: GrowthBadge[] = [
  { id: "curious_explorer", name: "Curious Explorer", bpCost: 300, series: "exploration", asset: U.growth_badge_curious_explorer, description: "For asking questions and trying new paths." },
  { id: "brave_learner", name: "Brave Learner", bpCost: 300, series: "learning", asset: U.growth_badge_brave_learner, description: "For trying even when English feels hard." },
  { id: "knowledge_builder", name: "Knowledge Builder", bpCost: 700, series: "learning", asset: U.growth_badge_knowledge_builder, description: "For building skills step by step." },
  { id: "bright_voice", name: "Bright Voice", bpCost: 300, series: "speaking", asset: U.growth_badge_bright_voice, description: "For using your English voice." },
  { id: "creative_maker", name: "Creative Maker", bpCost: 500, series: "creativity", asset: U.growth_badge_creative_maker, description: "For making new ideas real." },
  { id: "heart_helper", name: "Heart Helper", bpCost: 500, series: "community", asset: U.growth_badge_heart_helper, description: "For helping with kindness." },
  { id: "team_player", name: "Team Player", bpCost: 700, series: "community", asset: U.growth_badge_team_player, description: "For growing with others." },
  { id: "focus_finder", name: "Focus Finder", bpCost: 700, series: "focus", asset: U.growth_badge_focus_finder, description: "For staying with a task." },
  { id: "time_keeper", name: "Time Keeper", bpCost: 800, series: "habits", asset: U.growth_badge_time_keeper, description: "For respecting practice time." },
  { id: "trust_builder", name: "Trust Builder", bpCost: 800, series: "habits", asset: U.growth_badge_trust_builder, description: "For keeping promises to yourself." },
  { id: "daily_grower", name: "Daily Grower", bpCost: 1000, series: "habits", asset: U.growth_badge_daily_grower, description: "For steady daily progress." },
  { id: "future_dreamer", name: "Future Dreamer", bpCost: 1000, series: "dreams", asset: U.growth_badge_future_dreamer, description: "For imagining what comes next." },
  { id: "growth_guardian", name: "Growth Guardian", bpCost: 1500, series: "identity", asset: U.growth_badge_growth_guardian, description: "For protecting your learning path." },
  { id: "problem_solver", name: "Problem Solver", bpCost: 1500, series: "thinking", asset: U.growth_badge_problem_solver, description: "For solving tricky things." },
  { id: "nature_nurturer", name: "Nature Nurturer", bpCost: 1500, series: "care", asset: U.growth_badge_nature_nurturer, description: "For caring about the world around you." },
  { id: "dream_chaser", name: "Dream Chaser", bpCost: 2000, series: "dreams", asset: U.growth_badge_dream_chaser, description: "For chasing a big dream with courage." },
];

export const COLLECTION_ITEMS: CollectionItem[] = [
  { id: "collection_morning_dew_crystal", name: "Morning Dew Crystal", placeId: "arrival_meadow", bpCost: 50, rarity: "common", asset: U.collection_morning_dew_crystal, description: "A small crystal from the first morning." },
  { id: "collection_welcome_flower", name: "Welcome Flower", placeId: "arrival_meadow", bpCost: 80, rarity: "common", asset: U.collection_welcome_flower, description: "A flower that says you belong here." },
  { id: "collection_first_light_seed", name: "First Light Seed", placeId: "arrival_meadow", bpCost: 200, rarity: "rare", asset: U.collection_first_light_seed, description: "A seed holding the first light of Bloxia." },
  { id: "collection_friendship_ribbon", name: "Friendship Ribbon", placeId: "arrival_meadow", bpCost: 300, rarity: "rare", asset: U.collection_friendship_ribbon, description: "A ribbon for friendly effort." },
  { id: "collection_wonder_leaf", name: "Wonder Leaf", placeId: "wonder_tree", bpCost: 50, rarity: "common", asset: U.collection_wonder_leaf, description: "A leaf from the Wonder Tree." },
  { id: "collection_glow_seed", name: "Glow Seed", placeId: "wonder_tree", bpCost: 100, rarity: "common", asset: U.collection_glow_seed, description: "A seed that glows when ideas arrive." },
  { id: "collection_tree_heart_crystal", name: "Tree Heart Crystal", placeId: "wonder_tree", bpCost: 250, rarity: "rare", asset: U.collection_tree_heart_crystal, description: "A crystal from the heart of the tree." },
  { id: "collection_dream_lantern", name: "Dream Lantern", placeId: "wonder_tree", bpCost: 600, rarity: "epic", asset: U.collection_dream_lantern, description: "A lantern for the longest journey." },
  { id: "collection_echo_pearl", name: "Echo Pearl", placeId: "river_of_echoes", bpCost: 100, rarity: "common", asset: U.collection_echo_pearl, description: "A pearl that remembers kind words." },
  { id: "collection_memory_crystal", name: "Memory Crystal", placeId: "river_of_echoes", bpCost: 200, rarity: "rare", asset: U.collection_memory_crystal, description: "A crystal for learning memories." },
  { id: "collection_ripple_stone", name: "Ripple Stone", placeId: "river_of_echoes", bpCost: 300, rarity: "rare", asset: U.collection_ripple_stone, description: "A river stone shaped by echoes." },
  { id: "collection_song_shell", name: "Song Shell", placeId: "river_of_echoes", bpCost: 700, rarity: "epic", asset: U.collection_song_shell, description: "A shell that carries a soft song." },
  { id: "collection_whisper_feather", name: "Whisper Feather", placeId: "whisper_woods", bpCost: 80, rarity: "common", asset: U.collection_whisper_feather, description: "A feather from the quiet woods." },
  { id: "collection_glow_mushroom", name: "Glow Mushroom", placeId: "whisper_woods", bpCost: 150, rarity: "common", asset: U.collection_glow_mushroom, description: "A small light for focused paths." },
  { id: "collection_forest_shard", name: "Forest Shard", placeId: "whisper_woods", bpCost: 250, rarity: "rare", asset: U.collection_forest_shard, description: "A calm shard from Whisper Woods." },
  { id: "collection_nightlight_acorn", name: "Nightlight Acorn", placeId: "whisper_woods", bpCost: 600, rarity: "epic", asset: U.collection_nightlight_acorn, description: "An acorn holding forest nightlight." },
  { id: "collection_builder_block", name: "Builder Block", placeId: "community_hollow", bpCost: 80, rarity: "common", asset: U.collection_builder_block, description: "A first block for building ideas." },
  { id: "collection_helping_hand", name: "Helping Hand", placeId: "community_hollow", bpCost: 150, rarity: "common", asset: U.collection_helping_hand, description: "A symbol of helpful kindness." },
  { id: "collection_community_star", name: "Community Star", placeId: "community_hollow", bpCost: 250, rarity: "rare", asset: U.collection_community_star, description: "A bright star from Community Hollow." },
  { id: "collection_unity_badge", name: "Unity Badge", placeId: "community_hollow", bpCost: 700, rarity: "epic", asset: U.collection_unity_badge, description: "A badge for growing together." },
  { id: "collection_reflection_crystal", name: "Reflection Crystal", placeId: "reflection_lake", bpCost: 100, rarity: "common", asset: U.collection_reflection_crystal, description: "A crystal for seeing progress clearly." },
  { id: "collection_calm_stone", name: "Calm Stone", placeId: "reflection_lake", bpCost: 200, rarity: "rare", asset: U.collection_calm_stone, description: "A stone for calm thinking." },
  { id: "collection_mirror_lily", name: "Mirror Lily", placeId: "reflection_lake", bpCost: 450, rarity: "rare", asset: U.collection_mirror_lily, description: "A lily reflected on still water." },
  { id: "collection_starlight_drop", name: "Starlight Drop", placeId: "reflection_lake", bpCost: 800, rarity: "epic", asset: U.collection_starlight_drop, description: "A quiet drop of lake starlight." },
  { id: "collection_dream_compass", name: "Dream Compass", placeId: "myblox_belt", bpCost: 80, rarity: "common", asset: U.collection_dream_compass, description: "A compass pointing toward dreams." },
  { id: "collection_energy_cube", name: "Energy Cube", placeId: "myblox_belt", bpCost: 150, rarity: "common", asset: U.collection_energy_cube, description: "A cube charged with creative energy." },
  { id: "collection_map_fragment", name: "Map Fragment", placeId: "myblox_belt", bpCost: 500, rarity: "rare", asset: U.collection_map_fragment, description: "A fragment of a wider Bloxia map." },
  { id: "collection_adventure_token", name: "Adventure Token", placeId: "myblox_belt", bpCost: 800, rarity: "epic", asset: U.collection_adventure_token, description: "A token for creative adventures." },
  { id: "collection_star_fragment", name: "Star Fragment", placeId: "far_hills", bpCost: 150, rarity: "common", asset: U.collection_star_fragment, description: "A small piece of a far star." },
  { id: "collection_cloud_gem", name: "Cloud Gem", placeId: "far_hills", bpCost: 300, rarity: "rare", asset: U.collection_cloud_gem, description: "A gem found above the hills." },
  { id: "collection_summit_stone", name: "Summit Stone", placeId: "far_hills", bpCost: 500, rarity: "rare", asset: U.collection_summit_stone, description: "A stone from the high summit." },
  { id: "collection_horizon_compass", name: "Horizon Compass", placeId: "far_hills", bpCost: 1000, rarity: "epic", asset: U.collection_horizon_compass, description: "A compass that points beyond the horizon." },
];

export const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p])) as Record<PlaceId, Place>;
export const placeBadgeById = Object.fromEntries(PLACE_BADGES.map((b) => [b.id, b])) as Record<string, PlaceBadge>;
export const growthBadgeById = Object.fromEntries(GROWTH_BADGES.map((b) => [b.id, b])) as Record<string, GrowthBadge>;
export const collectionItemById = Object.fromEntries(COLLECTION_ITEMS.map((i) => [i.id, i])) as Record<string, CollectionItem>;

export const DEFAULT_BLOXIAN_NAME = "Shirin";
export const DEFAULT_PLACE_ID: PlaceId = "arrival_meadow";