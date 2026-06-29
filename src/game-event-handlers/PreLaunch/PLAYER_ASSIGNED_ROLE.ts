import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_ASSIGNED_ROLE() {
  return (
    data: EventType["PLAYER_ASSIGNED_ROLE"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { playersController } = useLocalStateStore.getState();
      playersController.assignRole(data.playerId, data.role);
    }
  };
}
