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
    set(() => {
      const clientId = socket.id ?? "";
      const isClientTurn = playerId === clientId;

      const gameFlowPhase: GameFlowPhase = isClientTurn
        ? "CLIENT_TURN"
        : "OPPONENT_TURN";
      const interactionPhase: InteractionPhase = isClientTurn
        ? "AWAITING_ACTION"
        : "IDLE";

      return {
        currentPlayerId: playerId,
        highlightedOpponent: playerId,
        gameFlowPhase,
        interactionPhase,
      };
    }),

  turnEnd: () =>
    set((state) => ({
      previousPlayerId: state.currentPlayerId,
      currentPlayerId: null,
      highlightedOpponent: null,
      turnPhase: "IDLE",
      gameFlowPhase: "TURN_TRANSITION",
    })),

  drawingStart: () =>
    set(() => ({
      turnPhase: "DRAWING",
    })),

  drawingEnd: () =>
    set(() => ({
      turnPhase: "IDLE",
    })),

  playingStart: () =>
    set(() => ({
      turnPhase: "PLAYING",
    })),

  playingEnd: () =>
    set(() => ({
      turnPhase: "IDLE",
    })),

  discardingStart: () =>
    set(() => ({
      turnPhase: "DISCARDING",
    })),

  discardingEnd: () =>
    set(() => ({
      turnPhase: "IDLE",
    })),
});
