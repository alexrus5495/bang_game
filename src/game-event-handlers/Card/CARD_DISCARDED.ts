import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CARD_DISCARDED() {
  return (data: EventType["CARD_DISCARDED"], stage: StateUpdaterStage) => {
    const { deckController, playersController } = useLocalStateStore.getState();

    if (stage === "beforeAnimation") {
      playersController.removeFromHand(data.playerId, data.card.index);
    }
    if (stage === "afterAnimation") {
      deckController.incrementDiscard();
    }
  };
}
