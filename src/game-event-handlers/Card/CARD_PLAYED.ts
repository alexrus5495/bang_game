import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CARD_PLAYED() {
  return (
    data: EventType["CARD_PLAYED"],
    stage: StateUpdaterStage,
    eventId: number,
  ) => {
    const playersController = useLocalStateStore.getState().playersController;
    const tableController = useLocalStateStore.getState().tableController;

    if (stage === "beforeAnimation") {
      playersController.removeFromHand(data.playerId, data.card.index);
    }

    if (stage === "afterAnimation") {
      tableController.addCard(data.card.id, eventId);
      return;
    }
  };
}
