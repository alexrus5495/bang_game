import { create } from "zustand";
import type { ClientPlayer, PlayedCard } from "./localStateStore/types";
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
  createPendingController,
  type PendingController,
} from "./localStateStore/pendingController";
import {
  createFlowController,
  type FlowController,
} from "./localStateStore/flowController";
import {
  createDevController,
  type DevController,
} from "./localStateStore/devController";

export type LocalState = {
  //Data
  gameId: string;
  numberOfSeats: number;
  players: ClientPlayer[];
  turn: {
    playerId: string | null;
    previousPlayerId: string | null;
    phase: "drawing" | "playing" | "discarding" | "idle";
  };
  totalDeckLength: number;
  deckCurrentSize: number;
  discardCurrentSize: number;
  cardsOnTheTable: PlayedCard[];
  pendingCardId: string | null;

  //Controllers
  playersController: PlayersController;
  flowController: FlowController;
  deckController: DeckController;
  tableController: TableController;
  pendingController: PendingController;
  initController: InitController;
  devController: DevController;
};

export const useLocalStateStore = create<LocalState>()((...args) => ({
  gameId: "",
  numberOfSeats: 0,
  players: [],
  turn: {
    playerId: null,
    previousPlayerId: null,
    phase: "idle",
  },
  totalDeckLength: 0,
  deckCurrentSize: 0,
  discardCurrentSize: 0,
  cardsOnTheTable: [],
  pendingCardId: null,

  playersController: createPlayersController(...args),
  flowController: createFlowController(...args),
  deckController: createDeckController(...args),
  tableController: createTableController(...args),
  pendingController: createPendingController(...args),
  initController: createInitController(...args),
  devController: createDevController(...args),
}));
