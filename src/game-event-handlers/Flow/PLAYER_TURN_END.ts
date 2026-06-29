import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_TURN_END() {
  return (_data: EventType["PLAYER_TURN_END"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const { flowController } = useLocalStateStore.getState();
      flowController.turnEnd();
    }
  };
}
