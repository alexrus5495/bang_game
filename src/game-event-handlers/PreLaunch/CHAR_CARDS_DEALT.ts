import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { socket } from "../../lib/socket";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function CHAR_CARDS_DEALT() {
  return (data: EventType["CHAR_CARDS_DEALT"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      if (data.playerId !== socket.id) return;

      const uiController = useLocalStateStore.getState().uiController;
      const pendingInteraction =
        useLocalStateStore.getState().pendingInteraction;

      if (pendingInteraction?.type !== "CHAR_SELECTION")
        throw new Error(`Pending interaction isn't CHAR_SELECTIOn`);

      const updatedInteraction = {
        ...pendingInteraction,
        options: [...data.options],
      };

      uiController.setPendingInteraction(updatedInteraction);
      return false;
    }
  };
}
