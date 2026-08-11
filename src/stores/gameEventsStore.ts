// stores/gameEventsStore.ts
import { create } from "zustand";
import type { GameEvent } from "../types";

interface GameEventsState {
  events: GameEvent[] | null; // Append-only journal of game events
  setEvents: (events: GameEvent[]) => void;
  isProcessing: boolean;
  processedIndex: number;
  processNextEvents: (
    handler: (event: GameEvent) => Promise<void>,
  ) => Promise<void>;
}

export const useGameEventsStore = create<GameEventsState>()((set, get) => ({
  events: null,
  isProcessing: false,
  processedIndex: -1,

  setEvents: (events) =>
    set((state) => {
      if (state.events && events) {
        const areEqual =
          state.events.length === events.length &&
          state.events.every((event, i) => events[i].id === event.id);
        if (areEqual) return {};
      }
      console.table(events);
      return { events };
    }),

  processNextEvents: async (handler) => {
    if (get().isProcessing) return;

    const currentEvents = get().events;
    if (currentEvents === null) {
      console.warn(`tried calling processNextEvents while events is null`);
      return;
    }

    set({ isProcessing: true });

    try {
      // 2. Читаем свежие events и processedIndex на КАЖДОЙ итерации
      while (get().processedIndex + 1 < (get().events?.length ?? 0)) {
        const nextIndex = get().processedIndex + 1;
        const latestEvents = get().events;

        if (!latestEvents || !latestEvents[nextIndex]) break;

        const nextEvent = latestEvents[nextIndex];

        await handler(nextEvent);

        set({ processedIndex: nextIndex });
      }
    } finally {
      set({ isProcessing: false });
    }
  },
}));
