import type { StateCreator } from "zustand";
import type { LocalState } from "../localStateStore";
import checkIfNeedsTargetPrompt from "../../lib/utils/checkIfNeedsTargetPrompt";
import { SocketEvents } from "../../lib/socketEvents";
import { emitWithTimeout } from "../../lib/utils/emitWithTimeout";

export type CardActionsController = {
  playCard: (index: number, targetId?: string | null) => void;
  initiateCardPlayAttempt: () => void;
};

export const createCardActionsController: StateCreator<
  LocalState,
  [],
  [],
  CardActionsController
> = (set, get) => ({
  initiateCardPlayAttempt: () => {
    const { pendingCardIndex, uiController, cardActionsController } = get();

    if (pendingCardIndex === null)
      throw new Error(
        `Tried calling initiateCardPlayAttempt while pendingCardIndex is null`,
      );

    const needsTargetPrompt = checkIfNeedsTargetPrompt(pendingCardIndex);

    if (!needsTargetPrompt) {
      cardActionsController.playCard(pendingCardIndex);
    } else {
      uiController.setInteractionPhase("AWAITING_TARGET", pendingCardIndex);
    }
  },

  playCard: async (index, targetId = null) => {
    const gameId = get().gameId;
    const uiController = get().uiController;

    // 1. Switch UI into waiting
    uiController.setInteractionPhase("WAITING_FOR_SERVER", index);

    // 2. Emit play request
    try {
      await emitWithTimeout(
        SocketEvents.PLAY_CARD,
        {
          gameId: gameId,
          cardIndex: index,
          targetId: targetId,
        },
        5000,
      );

      uiController.setInteractionPhase("RESOLVING_EFFECTS");
    } catch (error) {
      console.warn(`Card play error: ${error}`);
      uiController.resetInteractionPhase();
    }
  },
});
