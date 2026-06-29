import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_TURN_START() {
  return (data: EventType["PLAYER_TURN_START"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const { flowController } = useLocalStateStore.getState();
      flowController.turnStart(data.playerId);
    }
  };
}
