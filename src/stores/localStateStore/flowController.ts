import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

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
    set((state) => ({
      turn: {
        ...state.turn,
        playerId,
      },
    })),

  turnEnd: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        previousPlayerId: state.turn.playerId,
        playerId: null,
      },
    })),

  drawingStart: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "drawing",
      },
    })),

  drawingEnd: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "idle",
      },
    })),

  playingStart: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "playing",
      },
    })),

  playingEnd: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "idle",
      },
    })),

  discardingStart: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "discarding",
      },
    })),

  discardingEnd: () =>
    set((state) => ({
      turn: {
        ...state.turn,
        phase: "idle",
      },
    })),
});
