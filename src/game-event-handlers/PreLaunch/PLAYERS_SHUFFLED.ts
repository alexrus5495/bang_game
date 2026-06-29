import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function PLAYERS_SHUFFLED() {
  return (data: EventType["PLAYERS_SHUFFLED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const { playersController } = useLocalStateStore.getState();
      playersController.reorderPlayers(data.newOrder);
    }
  };
}
