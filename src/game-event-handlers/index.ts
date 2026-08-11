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

const HANDLERS_REGISTRY: Record<
  string,
  (
    data: GameEvent["data"],
    stage: StateUpdaterStage,
    eventId?: number,
  ) => HandlerResult
> = {};

for (const [path, module] of Object.entries(handlerCreators)) {
  if (typeof module.default !== "function") {
    console.warn(
      `[Handlers] Handler at ${path} is missing a default export function.`,
    );
    continue;
  }

  const fileName = path.split("/").pop()!;
  const eventType = fileName.replace(/\.[^/.]+$/, "");

  const rawHandler = module.default();

  HANDLERS_REGISTRY[eventType] = (data, stage, eventId) =>
    normalizeResult(rawHandler(data, stage, eventId));
}

export function useHandlers() {
  return HANDLERS_REGISTRY;
}
