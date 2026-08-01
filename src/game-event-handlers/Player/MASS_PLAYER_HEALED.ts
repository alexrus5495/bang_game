import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function MASS_PLAYER_HEALED() {
  return (data: EventType["MASS_PLAYER_HEALED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const playerController = useLocalStateStore.getState().playersController;

      for (const player of data.targets) {
        playerController.updateHealth(player.playerId, {
          current: player.newHealth,
        });
      }

      return;
    }
  };
}
