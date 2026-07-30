import type { StateUpdaterStage } from "../../hooks/useLocalStateUpdater";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { EventType } from "../../types";

export default function TABLE_CLEARED() {
  return (data: EventType["TABLE_CLEARED"], stage: StateUpdaterStage) => {
    if (stage === "beforeAnimation") {
      const cardsOnTheTable = useLocalStateStore.getState().cardsOnTheTable;
      const tableController = useLocalStateStore.getState().tableController;

      // 1. Snapshot the cleared cards
      const clearedCards = cardsOnTheTable.map((c) => ({
        cardId: c.id,
        eventId: c.eventId,
      }));

      // 2. Clear the store
      for (const card of cardsOnTheTable) {
        tableController.removeCard(card.id);
      }

      // 3. Enrich the event payload to use the data during animation
      return { enrichedPayload: { clearedCards } };
    }

    if (stage === "afterAnimation") {
      const deckController = useLocalStateStore.getState().deckController;
      const uiController = useLocalStateStore.getState().uiController;
      const count = data?.clearedCards?.length ?? 0;

      for (let i = 0; i <= count - 1; i++) {
        deckController.incrementDiscard();
      }

      uiController.resetInteractionPhase();
    }
  };
}
