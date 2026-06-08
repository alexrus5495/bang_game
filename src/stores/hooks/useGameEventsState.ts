import { useGameEventsStore } from "../gameEventsStore";
import type { GameEvent } from "../../types";

export const useGameEventsState = (): [
  GameEvent[] | null,
  (events: GameEvent[]) => void,
] => {
  const events = useGameEventsStore((s) => s.events);
  const setEvents = useGameEventsStore((s) => s.setEvents);

  return [events, setEvents];
};
