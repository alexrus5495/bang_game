import { useMemo } from "react";
import type {
  EventHandler,
  HandlerResult,
  LooseHandlerResult,
  StateUpdaterStage,
} from "../hooks/useLocalStateUpdater";
import type { GameEvent } from "../types";

const handlerCreators = import.meta.glob("./**/*.ts", {
  eager: true,
}) as Record<string, { default: () => EventHandler }>;

function normalizeResult(raw: LooseHandlerResult): HandlerResult {
  if (typeof raw === "object" && raw !== null) {
    return {
      shouldWait: raw.shouldWait === true,
      enrichedPayload: raw.enrichedPayload,
    };
  }
  return {
    shouldWait: raw === true,
  };
}

export function useHandlers() {
  return useMemo(() => {
    const result: Record<
      string,
      (
        data: GameEvent["data"],
        stage: StateUpdaterStage,
        eventId?: number,
      ) => HandlerResult
    > = {};

    for (const [path, module] of Object.entries(handlerCreators)) {
      const fileName = path.split("/").pop()!;
      const eventType = fileName.replace(".ts", "");

      const rawHandler = module.default();

      result[eventType] = (data, stage, eventId) =>
        normalizeResult(rawHandler(data, stage, eventId));
    }

    return result;
  }, []);
}
