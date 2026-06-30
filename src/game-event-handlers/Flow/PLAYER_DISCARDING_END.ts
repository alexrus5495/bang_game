import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_DISCARDING_END() {
  return (
    _data: EventType["PLAYER_DISCARDING_END"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { flowController } = useLocalStateStore.getState();
      flowController.discardingEnd();
    }
  };
}
