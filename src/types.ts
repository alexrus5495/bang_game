import { BORDER_COLORS, BORDER_TYPES } from "./config/borders.config";
import type { CARDPACKS } from "./config/cardpacks";
import type { CARD_DECORATIONS } from "./config/decorations.config";

type Suit = "clubs" | "diamonds" | "hearts" | "spades";

export interface RankAndSuit {
  rank: string;
  suit: Suit;
}

export type BorderColor = keyof typeof BORDER_COLORS;
export type BorderType = (typeof BORDER_TYPES)[number];
type Decoration = (typeof CARD_DECORATIONS)[number];
type DecorationsList = Decoration[];

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
  borderColor: BorderColor;
  borderType: BorderType;
  decorations: DecorationsList;
  description: CardDescription;
  tooltipIcon: boolean;
  pack: (typeof CARDPACKS)[number];
}

export interface CharacterCardMeta {
  cardTypeId: string;
  bullets: number;
  image: string;
  borderColor: BorderColor;
  borderType: BorderType;
  decorations: DecorationsList;
  description: CardDescription;
  pack: (typeof CARDPACKS)[number];
}

export interface RoleCardMeta {
  cardTypeId: string;
  image: string;
  description: CardDescription;
  decorations: DecorationsList;
  borderColor: BorderColor;
  borderType: BorderType;
  pack: (typeof CARDPACKS)[number];
}

export type DeckType = "main" | "char" | "role";
