import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function GAME_CREATED() {
  return (data: EventType["GAME_CREATED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const { deckController, initController } = useLocalStateStore.getState();
      deckController.initializeDeck(data.deckSize);
      initController.setGameId(data.gameId);
      initController.setNumberOfSeats(data.numberOfSeats);
    }
  };
}
