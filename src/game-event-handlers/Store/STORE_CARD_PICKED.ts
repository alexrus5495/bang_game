import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function STORE_CARD_PICKED() {
  return (data: EventType["STORE_CARD_PICKED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const uiController = useLocalStateStore.getState().uiController;
      const pendingInteraction =
        useLocalStateStore.getState().pendingInteraction;

      if (pendingInteraction?.type !== "GENERAL_STORE")
        throw new Error(`Pending interaction isn't GENERAL_STORE`);

      const updatedCards = [...pendingInteraction.cards];
      updatedCards[data.cardIndex] = null;

      const updatedInteraction = {
        ...pendingInteraction,
        cards: [...updatedCards],
      };

      uiController.setPendingInteraction(updatedInteraction);
    }

    if (stage === "afterAnimation") {
      const uiController = useLocalStateStore.getState().uiController;
      const playersController = useLocalStateStore.getState().playersController;
      const pendingInteraction =
        useLocalStateStore.getState().pendingInteraction;

      if (pendingInteraction?.type !== "GENERAL_STORE")
        throw new Error(`Pending interaction isn't GENERAL_STORE`);

      const updatedInteraction = {
        ...pendingInteraction,
        finishedPickers: [...pendingInteraction.finishedPickers, data.playerId],
      };

      playersController.addToHand(data.playerId, data.cardId);
      uiController.setPendingInteraction(updatedInteraction);
      uiController.resetInteractionPhase();
    }
  };
}
