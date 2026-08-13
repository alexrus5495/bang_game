import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { socket } from "../../lib/socket";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_ASSIGNED_CHAR() {
  return (
    data: EventType["PLAYER_ASSIGNED_CHAR"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { playersController } = useLocalStateStore.getState();
      playersController.assignChar(data.playerId, data.char, data.health);

      if (data.playerId === socket.id) {
        const uiController = useLocalStateStore.getState().uiController;
        uiController.resetPendingInteraction();
      }
    }
  };
}
