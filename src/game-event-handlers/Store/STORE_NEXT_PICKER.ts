import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { socket } from "../../lib/socket";
import { resolveAck } from "../../lib/utils/ackUtils";
import {
  useLocalStateStore,
  type GeneralStoreInteraction,
} from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function STORE_NEXT_PICKER() {
  return (data: EventType["STORE_NEXT_PICKER"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const uiController = useLocalStateStore.getState().uiController;
      const currentPending = useLocalStateStore.getState().pendingInteraction;

      if (!currentPending || currentPending.type !== "GENERAL_STORE") {
        console.warn(
          `STORE_NEXT_PICKER: Expected GENERAL_STORE interaction, but got: ${currentPending?.type}`,
        );
        return;
      }

      const updated: GeneralStoreInteraction = {
        ...currentPending,
        currentPickerId: data.playerId,
      };

      uiController.setPendingInteraction(updated);
    }

    if (stage === "afterAnimation") {
      if (data.playerId === socket.id) {
        resolveAck("STORE_NEXT_PICKER", data.playerId);
      }
    }
  };
}
