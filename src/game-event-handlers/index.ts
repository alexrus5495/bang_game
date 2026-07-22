import { useMemo } from "react";
import type { StateUpdaterStage } from "../hooks/useLocalStateUpdater";

type EventHandler<T = unknown> = (data: T, stage: StateUpdaterStage) => void;

const handlerCreators = import.meta.glob("./**/*.ts", {
  eager: true,
}) as Record<string, { default: () => EventHandler }>;

export function useHandlers() {
  return useMemo(() => {
    const result: Record<
      string,
      (data: unknown, stage: StateUpdaterStage, eventId?: number) => void
    > = {};

    for (const [path, module] of Object.entries(handlerCreators)) {
      // ./Card/CARD_DRAWN.ts → CARD_DRAWN
      const fileName = path.split("/").pop()!;
      const eventType = fileName.replace(".ts", "");

      result[eventType] = module.default();
    }

    return result;
  }, []);
}
