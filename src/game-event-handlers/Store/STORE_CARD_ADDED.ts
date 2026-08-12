import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function STORE_CARD_ADDED() {
  return (data: EventType["STORE_CARD_ADDED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const deckController = useLocalStateStore.getState().deckController;
      deckController.decrementDeck();
      return true;
    }

    if (stage === "afterAnimation") {
      const uiController = useLocalStateStore.getState().uiController;
      const pendingInteraction =
        useLocalStateStore.getState().pendingInteraction;

      if (pendingInteraction?.type !== "GENERAL_STORE")
        throw new Error(`Pending interaction isn't GENERAL_STORE`);

      const updatedInteraction = {
        ...pendingInteraction,
        cards: [...pendingInteraction.cards, data.cardId],
      };

      uiController.setPendingInteraction(updatedInteraction);
      return false;
    }
  };
}
