import { useCallback } from "react";
import { useHandlers } from "../game-event-handlers";
import type { EventType, GameEvent } from "../types";

export type StateUpdaterStage = "beforeAnimation" | "afterAnimation";

export type AnyEventPayload = NonNullable<EventType[keyof EventType]>;

export interface HandlerResult<TPayload = AnyEventPayload> {
  shouldWait: boolean;
  enrichedPayload?: TPayload;
}

export type LooseHandlerResult<TPayload = AnyEventPayload> =
  | HandlerResult<TPayload>
  | boolean
  | void;

export type EventHandler<TPayload = AnyEventPayload> = (
  data: GameEvent["data"],
  stage: StateUpdaterStage,
  eventId?: number,
) => LooseHandlerResult<TPayload>;

const IGNORED_EVENTS: Set<keyof EventType> = new Set([
  "INITIALIZATION_STARTED",
  "DEALING_CARDS",
  "CARDS_DEALT",
  "INITIALIZATION_COMPLETED",
  "GAME_STARTED",
]);

export function useLocalStateUpdater() {
  const handlers = useHandlers();

  const updateLocalState = useCallback(
    (event: GameEvent, stage: StateUpdaterStage): HandlerResult => {
      if (IGNORED_EVENTS.has(event.type)) return { shouldWait: false };

      const handler = handlers[event.type];

      if (!handler) {
        console.warn(`Failed to find handler for ${event.type}`);
        return { shouldWait: false };
      }

      return handler(event.data, stage, event.id);
    },
    [handlers],
  );

  return { updateLocalState };
}
