import { useCallback } from "react";
import { useHandlers } from "../game-event-handlers";
import type { GameEvent } from "../types";

export type StateUpdaterStage = "beforeAnimation" | "afterAnimation";

export function useLocalStateUpdater() {
  const handlers = useHandlers();

  const updateLocalState = useCallback(
    (event: GameEvent, stage: StateUpdaterStage): void => {
      handlers[event.type]?.(event.data, stage);
    },
    [handlers],
  );

  return { updateLocalState };
}
