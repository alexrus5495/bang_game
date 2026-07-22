import type { StateCreator } from "zustand";
import type {
  GameFlowPhase,
  InteractionPhase,
  LocalState,
} from "../localStateStore";
import { socket } from "../../lib/socket";

export type FlowController = {
  turnStart: (playerId: string) => void;
  turnEnd: () => void;
  drawingStart: () => void;
  drawingEnd: () => void;
  playingStart: () => void;
  playingEnd: () => void;
  discardingStart: () => void;
  discardingEnd: () => void;
};

export const createFlowController: StateCreator<
  LocalState,
  [],
  [],
  FlowController
> = (set) => ({
  turnStart: (playerId) =>
    set((state) => {
      const clientId = socket.id ?? "";
      const isClientTurn = playerId === clientId;

      const gameFlowPhase: GameFlowPhase = isClientTurn
        ? "CLIENT_TURN"
        : "OPPONENT_TURN";
      const interactionPhase: InteractionPhase = isClientTurn
        ? "AWAITING_ACTION"
        : "IDLE";

      return {
        ...state,
        currentPlayerId: playerId,
        gameFlowPhase,
        interactionPhase,
      };
    }),

  turnEnd: () =>
    set((state) => ({
      ...state,
      previousPlayerId: state.currentPlayerId,
      currentPlayerId: null,
      turnPhase: "IDLE",
      gameFlowPhase: "TURN_TRANSITION",
    })),

  drawingStart: () =>
    set((state) => ({
      ...state,
      turnPhase: "DRAWING",
    })),

  drawingEnd: () =>
    set((state) => ({
      ...state,
      turnPhase: "IDLE",
    })),

  playingStart: () =>
    set((state) => ({
      ...state,
      turnPhase: "PLAYING",
    })),

  playingEnd: () =>
    set((state) => ({
      ...state,
      turnPhase: "IDLE",
    })),

  discardingStart: () =>
    set((state) => ({
      ...state,
      turnPhase: "DISCARDING",
    })),

  discardingEnd: () =>
    set((state) => ({
      ...state,
      turnPhase: "IDLE",
    })),
});
