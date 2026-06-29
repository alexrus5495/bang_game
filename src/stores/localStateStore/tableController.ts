import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";
import type { CardInitialData, PlayedCard } from "./types";

export type TableController = {
  addCard: (data: CardInitialData) => void;
  removeCard: (cardId: string) => void;
};

export const createTableController: StateCreator<
  LocalState,
  [],
  [],
  TableController
> = (set) => ({
  addCard: (data) =>
    set((state) => {
      const playedCard: PlayedCard = {
        ...data,
        offsetX: Math.floor(Math.random() * 17) - 8,
        offsetY: Math.floor(Math.random() * 17) - 8,
        rotation: Math.floor(Math.random() * 17) - 8,
      };
      return {
        cardsOnTheTable: [...state.cardsOnTheTable, playedCard],
      };
    }),

  removeCard: (cardId) =>
    set((state) => ({
      cardsOnTheTable: state.cardsOnTheTable.filter((c) => c.cardId !== cardId),
    })),
});
