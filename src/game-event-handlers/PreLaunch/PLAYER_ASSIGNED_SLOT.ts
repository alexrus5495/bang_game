import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_ASSIGNED_SLOT() {
  return (
    data: EventType["PLAYER_ASSIGNED_SLOT"],
    stage: StateUpdaterStage,
  ) => {
    if (stage === "beforeAnimation") {
      const { playersController } = useLocalStateStore.getState();
      playersController.addPlayer(data.playerData);
    }
  };
}
