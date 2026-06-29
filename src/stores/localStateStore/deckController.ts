import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";

export type DeckController = {
  initializeDeck: (size: number) => void;
  setDeckCurrentSize: (size: number) => void;
  incrementDeck: () => void;
  decrementDeck: () => void;
  setDiscardCurrentSize: (size: number) => void;
  incrementDiscard: () => void;
  decrementDiscard: () => void;
};

export const createDeckController: StateCreator<
  LocalState,
  [],
  [],
  DeckController
> = (set) => ({
  initializeDeck: (size) =>
    set({ deckCurrentSize: size, totalDeckLength: size }),

  setDeckCurrentSize: (size) => set({ deckCurrentSize: size }),

  decrementDeck: () =>
    set((state) => ({
      deckCurrentSize: Math.max(0, state.deckCurrentSize - 1),
    })),

  incrementDeck: () =>
    set((state) => ({
      deckCurrentSize: state.deckCurrentSize + 1,
    })),

  setDiscardCurrentSize: (size) => set({ discardCurrentSize: size }),

  incrementDiscard: () =>
    set((state) => ({
      discardCurrentSize: state.discardCurrentSize + 1,
    })),

  decrementDiscard: () =>
    set((state) => ({
      discardCurrentSize: Math.max(0, state.deckCurrentSize - 1),
    })),
});
