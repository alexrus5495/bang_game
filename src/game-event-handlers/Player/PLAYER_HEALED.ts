import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYER_HEALED() {
  return (data: EventType["PLAYER_HEALED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const playerController = useLocalStateStore.getState().playersController;
      playerController.updateHealth(data.playerId, { current: data.newHealth });
      return;
    }
  };
}
