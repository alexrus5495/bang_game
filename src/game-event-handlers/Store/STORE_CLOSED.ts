import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function STORE_CLOSED() {
  return (_data: EventType["STORE_CLOSED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const uiController = useLocalStateStore.getState().uiController;

      uiController.resetPendingInteraction();
    }
  };
}
