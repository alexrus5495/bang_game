import type { StateCreator } from "zustand";
import type { InteractionPhase, LocalState } from "../localStateStore";
import { socket } from "../../lib/socket";

export type UIController = {
  setHighlightedCardIndex: (v: null | number) => void;
  setIsOverPlayArea: (v: boolean) => void;
  setInteractionPhase: (
    interaction: InteractionPhase,
    pendingCardIndex?: null | number,
  ) => void;
  setPendingCardIndex: (index: null | number) => void;
  resetInteractionPhase: () => void;
  startDrag: (index: number) => void;
  endDrag: () => void;
};

export const createUIController: StateCreator<
  LocalState,
  [],
  [],
  UIController
> = (set, get) => ({
  setHighlightedCardIndex: (v) =>
    set((state) => ({
      ...state,
      highlightedCardIndex: v,
    })),

  setIsOverPlayArea: (v) =>
    set((state) => ({
      ...state,
      isOverPlayArea: v,
    })),

  setInteractionPhase: (interactionPhase, pendingCardIndex = null) =>
    set((state) => ({
      ...state,
      interactionPhase,
      pendingCardIndex,
    })),

  resetInteractionPhase: () =>
    set((state) => {
      const isMyTurn = state.currentPlayerId === (socket.id ?? "");
      const defaultInteraction: InteractionPhase = isMyTurn
        ? "AWAITING_ACTION"
        : "IDLE";

      return {
        ...state,
        interactionPhase: defaultInteraction,
        pendingCardIndex: null,
      };
    }),

  setPendingCardIndex: (index) =>
    set((state) => ({
      ...state,
      pendingCardIndex: index,
    })),

  startDrag: (index) => {
    set({
      interactionPhase: "DRAGGING",
      pendingCardIndex: index,
    });
  },

  endDrag: () => {
    const { isOverPlayArea, pendingCardIndex } = get();

    set({ highlightedCardIndex: null });

    if (isOverPlayArea && pendingCardIndex !== null) {
      get().flowController.initiateCardPlayAttempt();
    } else {
      get().uiController.resetInteractionPhase();
    }
  },
});
