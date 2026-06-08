// stores/gameEventsStore.ts
import { create } from "zustand";
import type { GameEvent } from "../types";

interface GameEventsState {
  events: GameEvent[] | null;
  setEvents: (events: GameEvent[]) => void;
}

export const useGameEventsStore = create<GameEventsState>()((set) => ({
  events: null,
  setEvents: (events) =>
    set((state) => {
      if (state.events && events) {
        const areEqual =
          state.events.length === events.length &&
          state.events.every((event, i) => events[i].id === event.id);
        if (areEqual) return {};
      }
      return { events };
    }),
}));
