import { BORDER_COLORS } from "./config/borders.config";
import type { CARDPACKS } from "./config/cardpacks";

type Suit = "clubs" | "diamonds" | "hearts" | "spades";

export interface RankAndSuit {
  rank: string;
  suit: Suit;
}

export type BorderStyle = keyof typeof BORDER_COLORS;

export type DescriptionContentBlock =
  | { type: "text"; key: string }
  | { type: "divider"; key: string }
  | { type: "symbol"; key: string };

type DescriptionLine = DescriptionContentBlock[];
export type CardDescription = DescriptionLine[];

export interface PlayingCardMeta {
  cardTypeId: string;
  cardInstanceId: string;
  rankAndSuit: RankAndSuit | null;
  image: string;
  border: BorderStyle;
  description: CardDescription;
  tooltipIcon: boolean;
  pack: (typeof CARDPACKS)[number];
}

export interface CharacterCardMeta {
  cardTypeId: string;
  bullets: number;
  image: string;
  border: BorderStyle;
  description: CardDescription;
  pack: (typeof CARDPACKS)[number];
}
