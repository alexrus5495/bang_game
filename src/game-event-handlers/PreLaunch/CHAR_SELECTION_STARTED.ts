import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CHAR_SELECTION_STARTED() {
  return (
    _data: EventType["CHAR_SELECTION_STARTED"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const uiController = useLocalStateStore.getState().uiController;

      uiController.setPendingInteraction({
        type: "CHAR_SELECTION",
        options: [],
      });

      const shouldWaitForStateUpdates = true;
      return shouldWaitForStateUpdates;
    }
  };
}
