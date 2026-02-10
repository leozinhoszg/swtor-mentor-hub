export type Faction = "empire" | "republic";

export interface ClassMeta {
  slug: string;
  faction: Faction;
  index: number;
  storyKey: string;
}

export interface ClassStoryData {
  story: {
    prologue: string;
    act1: string;
    act2: string;
    act3: string;
  };
  companions: Array<{ name: string; role: string }>;
  planets: string[];
  advancedClasses: Array<{
    name: string;
    role: string;
    combatStyle: string;
  }>;
  keyChoices: string[];
}

export const CLASS_SLUGS = [
  "sith-warrior",
  "sith-inquisitor",
  "bounty-hunter",
  "imperial-agent",
  "jedi-knight",
  "jedi-consular",
  "trooper",
  "smuggler",
] as const;

export type ClassSlug = (typeof CLASS_SLUGS)[number];

export const CLASS_META: Record<ClassSlug, ClassMeta> = {
  "sith-warrior":    { slug: "sith-warrior",    faction: "empire",   index: 0, storyKey: "sithWarrior" },
  "sith-inquisitor": { slug: "sith-inquisitor", faction: "empire",   index: 1, storyKey: "sithInquisitor" },
  "bounty-hunter":   { slug: "bounty-hunter",   faction: "empire",   index: 2, storyKey: "bountyHunter" },
  "imperial-agent":  { slug: "imperial-agent",  faction: "empire",   index: 3, storyKey: "imperialAgent" },
  "jedi-knight":     { slug: "jedi-knight",     faction: "republic", index: 0, storyKey: "jediKnight" },
  "jedi-consular":   { slug: "jedi-consular",   faction: "republic", index: 1, storyKey: "jediConsular" },
  "trooper":         { slug: "trooper",          faction: "republic", index: 2, storyKey: "trooper" },
  "smuggler":        { slug: "smuggler",         faction: "republic", index: 3, storyKey: "smuggler" },
};

export const IMPERIAL_SLUGS: ClassSlug[] = ["sith-warrior", "sith-inquisitor", "bounty-hunter", "imperial-agent"];
export const REPUBLIC_SLUGS: ClassSlug[] = ["jedi-knight", "jedi-consular", "trooper", "smuggler"];

export function getClassArrayKey(faction: Faction): "imperialClasses" | "republicClasses" {
  return faction === "empire" ? "imperialClasses" : "republicClasses";
}
