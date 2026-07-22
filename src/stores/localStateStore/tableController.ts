import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

export type TableController = {
  addCard: (cardId: string, eventId: number) => void;
  removeCard: (cardId: string) => void;
};

export const createTableController: StateCreator<
  LocalState,
  [],
  [],
  TableController
> = (set) => ({
  addCard: (id, eventId) =>
    set((state) => {
      return {
        cardsOnTheTable: [...state.cardsOnTheTable, { id, eventId }],
      };
    }),

  removeCard: (cardId) =>
    set((state) => ({
      cardsOnTheTable: state.cardsOnTheTable.filter((c) => c.id !== cardId),
    })),
});
