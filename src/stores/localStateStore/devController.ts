import type { StateCreator } from "zustand";
import type {
  GameFlowPhase,
  InteractionPhase,
  LocalState,
} from "../localStateStore";
import { socket } from "../../lib/socket";

export type DevController = {
  setTurn: (playerId: string | null) => void;
  setPhase: (phase: LocalState["turnPhase"]) => void;
  toggleAlive: (playerId: string) => void;
};

export const createDevController: StateCreator<
  LocalState,
  [],
  [],
  DevController
> = (set) => ({
  setTurn: (playerId) =>
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
        previousPlayerId: state.currentPlayerId,
        currentPlayerId: playerId,
        gameFlowPhase,
        interactionPhase,
      };
    }),

  setPhase: (phase) =>
    set(() => ({
      turnPhase: phase,
    })),

  toggleAlive: (playerId) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              flags: {
                ...player.flags,
                isEliminated: !player.flags.isEliminated,
              },
            }
          : player,
      ),
    })),
});
