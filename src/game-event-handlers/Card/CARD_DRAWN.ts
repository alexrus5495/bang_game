import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CARD_DRAWN() {
  return (data: EventType["CARD_DRAWN"], stage: StateUpdaterStage) => {
    const { deckController, playersController } = useLocalStateStore.getState();

    if (stage === "beforeAnimation") {
      deckController.decrementDeck();
    }

    if (stage === "afterAnimation") {
      playersController.addToHand(data.playerId, data.card.id);
      const shouldWaitForStateUpdates = true;
      return shouldWaitForStateUpdates;
    }
  };
}
