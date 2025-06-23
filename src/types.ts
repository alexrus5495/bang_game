import { BORDER_STYLES } from "./config/borders.config";
import type { CARDPACKS } from "./config/cardpacks";
import { IMAGES } from "./config/images.manifest";

type Suit = "clubs" | "diamonds" | "hearts" | "spades";

export interface CardValue {
  value: string;
  suit: Suit;
}

//NOTE: BorderStyles are read as keys inside ./config/borders.config.ts
// BORDER_STYLES object to allow easier expantion in the future.
export type BorderStyle = keyof typeof BORDER_STYLES;

type AllImageKeys<T> = {
  [Category in keyof T]: keyof T[Category];
}[keyof T] &
  string;

type ImageName = AllImageKeys<typeof IMAGES>;

type DescriptionContentBlock =
  | { type: "text" }
  | { type: "symbol"; key: string };

type DescriptionLine = DescriptionContentBlock[];
type CardDescription = DescriptionLine[];

export interface Card {
  id: string;
  value: CardValue | null;
  image: ImageName;
  border: BorderStyle;
  description: CardDescription;
  tooltipIcon: boolean;
  pack: (typeof CARDPACKS)[number];
}

export interface CharacterCard {
  id: string;
  bullets: number;
  image: ImageName;
  border: BorderStyle;
  description: CardDescription;
  pack: (typeof CARDPACKS)[number];
}
