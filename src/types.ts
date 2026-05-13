import { BORDER_COLORS, BORDER_TYPES } from "./config/borders.config";
import type { CARDPACKS } from "./config/cardpacks";
import type { CARD_DECORATIONS } from "./config/decorations.config";

type Suit = "clubs" | "diamonds" | "hearts" | "spades";
export type Role = "sheriff" | "deputy" | "outlaw" | "renegade";

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

type CardEffectType = {
  target: "self" | "many" | "one" | "all";
  range: "none" | "inherit" | number;
  isEquipment: boolean;
};

export type CardsMetaData = {
  deckMeta: Record<string, PlayingCardMeta>;
  charDeckMeta: Record<string, CharacterCardMeta>;
  roleDeckMeta: Record<string, RoleCardMeta>;
};

export interface PlayingCardMeta {
  cardTypeId: string;
  cardInstanceId: string;
  rankAndSuit: RankAndSuit;
  image: string;
  borderColor: BorderColor;
  borderType: BorderType;
  decorations: DecorationsList;
  description: CardDescription;
  tooltipIcon: boolean;
  pack: (typeof CARDPACKS)[number];
  effect: CardEffectType;
  _range?: number;
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

export type CurrentPage =
  | "mainMenu"
  | "createLobby"
  | "searchLobby"
  | "lobby"
  | "table";

export type LobbyPublicData = {
  id: string;
  name: string;
  ownerName: string;
  ownerId: string;
  availableHumanSlots: string;
  numberOfSeats: number;
  seats: LobbySeat[];
  isPrivate: boolean;
};

export type LobbyConfig = {
  lobbyName: string;
  playerName: string;
  isPrivate: boolean;
  password: string;
  numberOfSeats: number;
  seats: LobbySeat[];
};

export type LobbySeat = {
  id: number;
  type: "human" | "ai";
  color: string;
  status: "open" | "reserver" | "occupied";
  playerId?: string;
  playerName?: string;
  isReady?: boolean;
};

export type Player_WeaponData = {
  card: string;
  range: number;
};

export type ProcessedPlayerData = {
  absoluteIndex: number;
  playerData: Player_PublicData;
};

export type Player_PublicData = {
  id: string | undefined;
  isAI: boolean;
  nickname: string;
  color: string;
  char: string;
  weapon: Player_WeaponData;
  role: string | undefined;
  handLength: number;
  equipment: string[];
  isEliminated: boolean;
  stats: {
    health: { current: number; max: number };
    bangCardsPlayed: number;
    bangCardsPlayedLimit: number;
  };
};

export type PlayersPublicData = Player_PublicData[];

export type PublicData = {
  id: string;
  deckLength: number;
  discardPileLength: number;
  currentPlayer: number;
  playersPublicData: PlayersPublicData;
  clientHand: string[];
};

export type TooltipMessagePart = {
  type: "plainText" | "playingCardRef" | "charCardRef" | "roleCardRef";
  content: string | PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
};

export type TooltipMessage = TooltipMessagePart[];

export type CardCoords = {
  topCard: {
    x: number | null;
    y: number | null;
    height: number | null;
  };
};

export type Messages = Message[];

export type Message = SystemMessage | PlayerMessage;

export interface PlayerMessage {
  id: number;
  type: "player";
  author: string;
  content: string;
  timestamp: Date;
}

export interface SystemMessage {
  id: number;
  type: "system";
  template: keyof MessageTemplate;
  data: MessageTemplate[keyof MessageTemplate];
  timestamp: Date;
}

// WARNING: probably will need to sync the type with the server side one.
export interface MessageTemplate {
  game_started: null;
  player_turn_end: { player: MessageData_Player };
  player_turn_start: { player: MessageData_Player };
  player_card_drawn: {
    player: MessageData_Player;
    card: {
      id: string | null;
      index: number;
    };
    visibleTo: string[];
  };
  player_played_card: { player: MessageData_Player; card: MessageData_Card };
  player_player_card_against: {
    player1: MessageData_Player;
    player2: MessageData_Player;
    card: string;
  };
}

export type AnimationData = MessageTemplate[keyof MessageTemplate];

export type MessageData_Card = {
  tag: "card";
  cardId: string;
};

export type MessageData_Player = {
  tag: "player";
  isAI: boolean;
  nickname: string;
  id: string;
};

export type Coordinates = {
  x: number;
  y: number;
};
