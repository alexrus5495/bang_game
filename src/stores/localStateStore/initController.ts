import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

export type InitController = {
  setGameId: (gameId: string) => void;
  setNumberOfSeats: (numberOfSeats: number) => void;
};

export const createInitController: StateCreator<
  LocalState,
  [],
  [],
  InitController
> = (set) => ({
  setGameId: (gameId) => set({ gameId }),
  setNumberOfSeats: (numberOfSeats) => set({ numberOfSeats }),
});
