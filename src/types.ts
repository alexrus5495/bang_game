import { BORDER_COLORS, BORDER_TYPES } from "./config/borders.config";
import type { CARDPACKS } from "./config/cardpacks";
import type { CARD_DECORATIONS } from "./config/decorations.config";
import type { ClientPlayer } from "./stores/localStateStore/types";

/** Utility abstraction that combines Omit & Partial on the same properties.
/Makes it possible to use at the same time both complete and uncomplete types 
*/
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

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

export interface GameEvent {
  id: number;
  type: keyof EventType;
  data: EventType[keyof EventType];
  timestamp: Date;
}

export interface EventType {
  // Pre-launch events
  GAME_CREATED: { gameId: string; deckSize: number; numberOfSeats: number };
  INITIALIZATION_STARTED: null;
  PLAYER_ASSIGNED_SLOT: {
    index: number;
    playerData: Pick<ClientPlayer, "id" | "nickname" | "color" | "isAI">;
  };
  PLAYERS_SHUFFLED: { newOrder: string[] };
  PLAYER_ASSIGNED_ROLE: { playerId: string; role: string; visibleTo: string[] };

  CHAR_SELECTION_STARTED: null;
  CHAR_CARDS_DEALT: {
    playerId: string;
    options: { id: string; bullets: number }[];
  };
  PLAYER_ASSIGNED_CHAR: {
    playerId: string;
    char: string;
    health: {
      current: number;
      max: number;
    };
  };
  CHAR_SELECTION_COMPLETED: null;

  DEALING_CARDS: null;
  CARDS_DEALT: null;

  INITIALIZATION_COMPLETED: null;
  GAME_STARTED: null;

  // Game flow events
  PLAYER_TURN_START: { playerId: string };
  PLAYER_DRAWING_START: { playerId: string };
  PLAYER_DRAWING_END: { playerId: string };
  PLAYER_PLAYING_START: { playerId: string };
  PLAYER_PLAYING_END: { playerId: string };
  PLAYER_DISCARDING_START: { playerId: string };
  PLAYER_DISCARDING_END: { playerId: string };
  PLAYER_TURN_END: { playerId: string };

  // Player utility events
  PLAYER_HEALED: { playerId: string; amount: number; newHealth: number };
  MASS_PLAYER_HEALED: {
    targets: Array<{ playerId: string; amount: number; newHealth: number }>;
  };
  PLAYER_DAMAGED: { playerId: string; amount: number; newHealth: number };
  MASS_PLAYER_DAMAGED: {
    targets: Array<{ playerId: string; amount: number; newHealth: number }>;
  };
  PLAYER_ELIMINATED: { playerId: string };

  // General Store game events
  STORE_INITIATED: { playersOrder: string[] };
  STORE_CARD_ADDED: { cardId: string; index: number };
  STORE_READY: null;
  STORE_CARD_PICKED: { cardId: string; playerId: string; cardIndex: number };
  STORE_NEXT_PICKER: { playerId: string };
  STORE_CLOSED: null;

  // Card events
  CARD_DRAWN: {
    playerId: string;
    card: {
      id: string;
      index: number;
    };
    visibleTo: string[];
  };
  CARD_DISCARDED: {
    playerId: string;
    card: {
      id: string;
      index: number;
    };
    visibleTo: string[];
  };
  CARD_PLAYED: {
    playerId: string;
    card: {
      id: string;
      index: number;
    };
  };
  CARD_EQUIPPED: {
    playerId: string;
    card: {
      id: string;
      index: number;
      isWeapon?: boolean;
      range?: number;
    };
  };
  CARD_UNEQUIPPED: {
    playerId: string;
    card: {
      id: string;
      index: number;
      isWeapon?: boolean;
    };
  };
  TABLE_CLEARED: null | {
    clearedCards?: { cardId: string; eventId: number }[];
  };
}

export type AnimationData = EventType[keyof EventType];

export type Coordinates = {
  x: number;
  y: number;
};

export type BroadcastedTimerData = {
  timerId: string;
  maxValue: number;
  currentValue: number;
};
