import { create } from "zustand";
import type { ClientPlayer } from "./localStateStore/types";
import {
  createPlayersController,
  type PlayersController,
} from "./localStateStore/playersController";
import {
  createDeckController,
  type DeckController,
} from "./localStateStore/deckController";
import {
  createTableController,
  type TableController,
} from "./localStateStore/tableController";
import {
  createInitController,
  type InitController,
} from "./localStateStore/initController";
import {
  createFlowController,
  type FlowController,
} from "./localStateStore/flowController";
import {
  createDevController,
  type DevController,
} from "./localStateStore/devController";
import {
  createUIController,
  type UIController,
} from "./localStateStore/uiController";
import {
  createCardActionsController,
  type CardActionsController,
} from "./localStateStore/cardActionsController";

export type TurnPhase = "IDLE" | "DRAWING" | "PLAYING" | "DISCARDING";
export type GameFlowPhase =
  | "PREPARATION"
  | "CLIENT_TURN"
  | "CLIENT_REACTION"
  | "TURN_TRANSITION"
  | "OPPONENT_TURN"
  | "OPPONENT_REACTION"
  | "GAME_OVER";

export type InteractionPhase =
  | "IDLE"
  | "AWAITING_ACTION"
  | "DRAGGING"
  | "WAITING_FOR_SERVER"
  | "AWAITING_TARGET"
  | "RESOLVING_EFFECTS";

export type LocalState = {
  // Game data
  gameId: string;
  numberOfSeats: number;
  players: ClientPlayer[];
  totalDeckLength: number;
  deckCurrentSize: number;
  discardCurrentSize: number;
  cardsOnTheTable: { id: string; eventId: number }[];

  // Domain turn status (game rules)
  currentPlayerId: string | null;
  previousPlayerId: string | null;
  turnPhase: TurnPhase;

  // UI data
  highlightedOpponent: string | null;
  isUIblocked: boolean;
  gameFlowPhase: GameFlowPhase;
  interactionPhase: InteractionPhase;
  pendingCardIndex: number | null;
  highlightedCardIndex: number | null;
  isOverPlayArea: boolean;

  //Controllers
  playersController: PlayersController;
  cardActionsController: CardActionsController;
  flowController: FlowController;
  deckController: DeckController;
  tableController: TableController;
  initController: InitController;
  uiController: UIController;
  devController: DevController;
};

export const useLocalStateStore = create<LocalState>()((...args) => ({
  gameId: "",
  numberOfSeats: 0,
  players: [],
  totalDeckLength: 0,
  deckCurrentSize: 0,
  discardCurrentSize: 0,
  cardsOnTheTable: [],

  currentPlayerId: null,
  previousPlayerId: null,
  turnPhase: "IDLE",

  highlightedOpponent: null,
  isUIblocked: false,
  gameFlowPhase: "PREPARATION",
  interactionPhase: "IDLE",
  pendingCardIndex: null,
  highlightedCardIndex: null,
  isOverPlayArea: false,

  playersController: createPlayersController(...args),
  cardActionsController: createCardActionsController(...args),
  flowController: createFlowController(...args),
  deckController: createDeckController(...args),
  tableController: createTableController(...args),
  uiController: createUIController(...args),
  initController: createInitController(...args),
  devController: createDevController(...args),
}));
