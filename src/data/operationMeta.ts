export const OPERATION_SLUGS = [
  "eternity-vault",
  "karaggas-palace",
  "explosive-conflict",
  "terror-from-beyond",
  "scum-and-villainy",
  "dread-fortress",
  "dread-palace",
  "the-ravagers",
  "temple-of-sacrifice",
  "gods-of-the-machine",
  "nature-of-progress",
  "r4-anomaly",
  "hive-of-the-mountain-queen",
] as const;

export type OperationSlug = (typeof OPERATION_SLUGS)[number];

export interface OperationMeta {
  slug: OperationSlug;
  index: number;
  dataKey: string;
  tier: string;
}

export const OPERATION_META: Record<OperationSlug, OperationMeta> = {
  "eternity-vault":             { slug: "eternity-vault",             index: 0,  dataKey: "eternityVault",            tier: "classic" },
  "karaggas-palace":            { slug: "karaggas-palace",            index: 1,  dataKey: "karaggasPalace",           tier: "classic" },
  "explosive-conflict":         { slug: "explosive-conflict",         index: 2,  dataKey: "explosiveConflict",        tier: "classic" },
  "terror-from-beyond":         { slug: "terror-from-beyond",         index: 3,  dataKey: "terrorFromBeyond",         tier: "classic" },
  "scum-and-villainy":          { slug: "scum-and-villainy",          index: 4,  dataKey: "scumAndVillainy",          tier: "hutt" },
  "dread-fortress":             { slug: "dread-fortress",             index: 5,  dataKey: "dreadFortress",            tier: "dread" },
  "dread-palace":               { slug: "dread-palace",               index: 6,  dataKey: "dreadPalace",              tier: "dread" },
  "the-ravagers":               { slug: "the-ravagers",               index: 7,  dataKey: "theRavagers",              tier: "revan" },
  "temple-of-sacrifice":        { slug: "temple-of-sacrifice",        index: 8,  dataKey: "templeOfSacrifice",        tier: "revan" },
  "gods-of-the-machine":        { slug: "gods-of-the-machine",        index: 9,  dataKey: "godsOfTheMachine",         tier: "eternal" },
  "nature-of-progress":         { slug: "nature-of-progress",         index: 10, dataKey: "natureOfProgress",         tier: "onslaught" },
  "r4-anomaly":                 { slug: "r4-anomaly",                 index: 11, dataKey: "r4Anomaly",                tier: "legacy" },
  "hive-of-the-mountain-queen": { slug: "hive-of-the-mountain-queen", index: 12, dataKey: "hiveOfTheMountainQueen",   tier: "legacy" },
};

export interface OperationBossData {
  name: string;
  desc: string;
  storyMode: string;
  veteran: string;
  master: string;
}

export interface OperationDetailData {
  name: string;
  shortName: string;
  difficulty: string;
  players: string;
  planet: string;
  expansion: string;
  desc: string;
  bosses: OperationBossData[];
}

export const TIER_ORDER = ["classic", "hutt", "dread", "revan", "eternal", "onslaught", "legacy"] as const;

export function getOperationsByTier(): Record<string, OperationSlug[]> {
  const grouped: Record<string, OperationSlug[]> = {};
  for (const slug of OPERATION_SLUGS) {
    const { tier } = OPERATION_META[slug];
    if (!grouped[tier]) grouped[tier] = [];
    grouped[tier].push(slug);
  }
  return grouped;
}
