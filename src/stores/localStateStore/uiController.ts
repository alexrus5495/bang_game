import type { StateCreator } from "zustand";
import type {
  InteractionPhase,
  LocalState,
  PendingInteraction,
} from "../localStateStore";
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
  setIsUiBlocked: (v: boolean) => void;
  setHighlightedOpponent: (v: null | string) => void;
  setPendingInteraction: (v: Exclude<PendingInteraction, null>) => void;
  resetPendingInteraction: () => void;
};

export const createUIController: StateCreator<
  LocalState,
  [],
  [],
  UIController
> = (set, get) => ({
  setHighlightedCardIndex: (v) =>
    set(() => ({
      highlightedCardIndex: v,
    })),

  setIsOverPlayArea: (v) =>
    set(() => ({
      isOverPlayArea: v,
    })),

  setInteractionPhase: (interactionPhase, pendingCardIndex = null) =>
    set(() => ({
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
        interactionPhase: defaultInteraction,
        pendingCardIndex: null,
      };
    }),

  setPendingCardIndex: (index) =>
    set(() => ({
      pendingCardIndex: index,
    })),

  setPendingInteraction: (v) => set(() => ({ pendingInteraction: v })),

  resetPendingInteraction: () => set(() => ({ pendingInteraction: null })),

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
      get().cardActionsController.initiateCardPlayAttempt();
    } else {
      get().uiController.resetInteractionPhase();
    }
  },

  setIsUiBlocked: (v) => {
    set(() => ({ isUIblocked: v }));
  },

  setHighlightedOpponent: (v) => {
    set(() => ({ highlightedOpponent: v }));
  },
});
