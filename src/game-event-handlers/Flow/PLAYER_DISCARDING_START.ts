import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_DISCARDING_START() {
  return (
    _data: EventType["PLAYER_DISCARDING_START"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { flowController } = useLocalStateStore.getState();
      flowController.discardingStart();
    }
  };
}
