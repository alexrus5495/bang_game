import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

export type DevController = {
  setTurn: (playerId: string | null) => void;
  setPhase: (phase: LocalState["turn"]["phase"]) => void;
  toggleAlive: (playerId: string) => void;
};

export const createDevController: StateCreator<
  LocalState,
  [],
  [],
  DevController
> = (set) => ({
  setTurn: (playerId) =>
    set((state) => ({
      turn: {
        ...state.turn,
        previousPlayerId: playerId,
        playerId,
      },
    })),

  setPhase: (phase) =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase,
      },
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
