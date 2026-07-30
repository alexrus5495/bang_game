import { create } from "zustand";
import type { AnimationComponent } from "../animations";
import ANIMATIONS from "../animations";
import type { EventType, GameEvent, Optional } from "../types";

const ANIMATED_EVENTS: Set<keyof EventType> = new Set([
  // "CARD_DISCARDED",
  "CARD_DRAWN",
  "CARD_PLAYED",
  "CARD_EQUIPPED",
  "CARD_UNEQUIPPED",
  "TABLE_CLEARED",
]);

interface AnimationState {
  currentAnimation: AnimationComponent | null;
  playAnimation: (
    event: Optional<GameEvent, "id" | "timestamp">,
  ) => Promise<void>;
}

export const useAnimationStore = create<AnimationState>((set) => {
  let currentResolve: (() => void) | null = null;

  return {
    currentAnimation: null,
    playAnimation: (event) => {
      return new Promise((resolve) => {
        if (!ANIMATED_EVENTS.has(event.type)) {
          resolve();
          return;
        }

        const Component = ANIMATIONS[event.type];
        if (!Component) {
          resolve();
          return;
        }

        if (currentResolve) currentResolve();
        currentResolve = resolve;

        set({
          currentAnimation: {
            Component,
            props: {
              id: event.id,
              data: event.data,
              onComplete: () => {
                set({ currentAnimation: null });
                if (currentResolve) {
                  currentResolve();
                  currentResolve = null;
                }
              },
            },
          },
        });
      });
    },
  };
});
