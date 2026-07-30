import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CARD_UNEQUIPEED() {
  return (data: EventType["CARD_UNEQUIPPED"], stage: StateUpdaterStage) => {
    const playersController = useLocalStateStore.getState().playersController;
    const deckController = useLocalStateStore.getState().deckController;
    const uiController = useLocalStateStore.getState().uiController;

    if (stage === "beforeAnimation") {
      playersController.removeFromEquipment(data.playerId, data.card.id);
    }

    if (stage === "afterAnimation") {
      deckController.incrementDiscard();

      // If unequipped card is a weapon - update player state.
      if (data.card.isWeapon) {
        playersController.setPlayerWeapon(data.playerId, {
          id: "colt45",
          range: 1,
        });
      }
      uiController.resetInteractionPhase();
    }
  };
}
