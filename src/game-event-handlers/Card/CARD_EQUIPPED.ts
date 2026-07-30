import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CARD_EQUIPPED() {
  return (data: EventType["CARD_EQUIPPED"], stage: StateUpdaterStage) => {
    const playersController = useLocalStateStore.getState().playersController;
    const uiController = useLocalStateStore.getState().uiController;
    const tableController = useLocalStateStore.getState().tableController;

    if (stage === "beforeAnimation") {
      tableController.removeCard(data.card.id);
    }

    if (stage === "afterAnimation") {
      playersController.addToEquipment(data.playerId, data.card.id);

      // If equipped card is a weapon - update player state.
      if (data.card.isWeapon) {
        if (data.card.range === undefined)
          throw new Error(
            "Got weapon equipped event, but no range data has been provided",
          );
        playersController.setPlayerWeapon(data.playerId, {
          id: data.card.id,
          range: data.card.range,
        });
      }
      uiController.resetInteractionPhase();
    }
  };
}
