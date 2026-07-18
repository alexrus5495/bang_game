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
  initiateCardPlayAttempt: () => void;
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
      phase: "IDLE",
      gameFlowPhase: "TURN_TRANSITION",
    })),

  drawingStart: () =>
    set((state) => ({
      ...state,
      phase: "DRAWING",
    })),

  drawingEnd: () =>
    set((state) => ({
      ...state,
      phase: "IDLE",
    })),

  playingStart: () =>
    set((state) => ({
      ...state,
      phase: "PLAYING",
    })),

  playingEnd: () =>
    set((state) => ({
      ...state,
      phase: "IDLE",
    })),

  discardingStart: () =>
    set((state) => ({
      ...state,
      phase: "DISCARDING",
    })),

  discardingEnd: () =>
    set((state) => ({
      ...state,
      phase: "IDLE",
    })),

  initiateCardPlayAttempt: () => {
    return;
  },
});
