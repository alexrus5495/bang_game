import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function STORE_INITIATED() {
  return (data: EventType["STORE_INITIATED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const uiController = useLocalStateStore.getState().uiController;

      uiController.setPendingInteraction({
        type: "GENERAL_STORE",
        cards: [],
        pickersOrder: data.playersOrder,
        currentPickerId: "",
        finishedPickers: [],
      });

      const shouldWaitForStateUpdates = true;
      return shouldWaitForStateUpdates;
    }
  };
}
