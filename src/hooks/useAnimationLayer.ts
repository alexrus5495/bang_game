import { useRef, useState } from "react";
import type { AnimationComponent } from "../animations";
import ANIMATIONS from "../animations";
import type { EventType, GameEvent } from "../types";

const ANIMATED_EVENTS: Set<keyof EventType> = new Set([
  "CARD_DISCARDED",
  "CARD_DRAWN",
]);

export function useAnimationLayer() {
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationComponent | null>(null);
  const promiseRef = useRef<{ resolve: () => void } | null>(null);

  const playAnimation = (event: GameEvent): Promise<void> => {
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

      promiseRef.current = { resolve };

      setCurrentAnimation({
        Component,
        props: {
          data: event.data,
          onComplete: () => {
            setCurrentAnimation(null);
            promiseRef.current = null;
            resolve();
          },
        },
      });
    });
  };

  return { currentAnimation, playAnimation };
}
