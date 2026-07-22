import React, { useEffect, useRef } from "react";
import { useGameEventsState } from "../../stores/hooks/useGameEventsState";
import { useAnimationLayer } from "../../hooks/useAnimationLayer";
import { useLocalStateUpdater } from "../../hooks/useLocalStateUpdater";
import AnimationLayer from "./AnimationLayer";

export function EventProcessor({ children }: { children: React.ReactNode }) {
  const events = useGameEventsState()[0];

  const lastProcessedIndexRef = useRef(-1);
  const isProcessingRef = useRef(false);

  const { currentAnimation, playAnimation } = useAnimationLayer();
  const { updateLocalState } = useLocalStateUpdater();

  useEffect(() => {
    // Prevent race conditions
    let isEffectActive = true;

    const processQueue = async () => {
      // react-doctor-disable-next-line async-await-in-loop
      if (isProcessingRef.current || !events?.length) return;
      isProcessingRef.current = true;

      try {
        while (isEffectActive) {
          const nextIndex = lastProcessedIndexRef.current + 1;

          if (nextIndex >= events.length) break;

          const nextEvent = events[nextIndex];

          if (!nextEvent) break;

          updateLocalState(nextEvent, "beforeAnimation");

          // react-doctor-disable-next-line async-await-in-loop
          await playAnimation(nextEvent);

          updateLocalState(nextEvent, "afterAnimation");

          lastProcessedIndexRef.current = nextIndex;
        }
      } finally {
        isProcessingRef.current = false;
      }
    };

    processQueue();

    return () => {
      isEffectActive = false;
    };
  }, [events, playAnimation, updateLocalState]);

  return (
    <>
      <AnimationLayer currentAnimation={currentAnimation} />
      {children}
    </>
  );
}
