import React, { useEffect, useRef } from "react";
import { useGameEventsState } from "../../stores/hooks/useGameEventsState";
import { useAnimationLayer } from "../../hooks/useAnimationLayer";
import { useLocalStateUpdater } from "../../hooks/useLocalStateUpdater";
import AnimationLayer from "./AnimationLayer";
import { waitForFrames } from "../../lib/utils/waitForFrames";

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

          // Depending on the event's nature, sometimes you need to wait until
          // react updates the DOM and useEffect/useResizeObserver complete it's
          // job.
          //
          // Example: when the animation requires the anchor point, that was
          // created only during previous state update ("beforeAnimation"),
          // the anchor wouldn't be available if we try to run animation right
          // away, without waiting a couple of animationFrames for the anchor
          // to be rendered.
          //
          // On the other hand, for example, during CARD_PLAYED event, if we
          // try to wait after "before" state update, the anchor wouldn't be
          // available anymore.
          //
          // To specify if the event requires waiting, the event handlers
          // should return TRUE. Returning FALSE in order to skip the wait is unnecessary.
          const { shouldWait: shouldWaitBefore, enrichedPayload } =
            updateLocalState(nextEvent, "beforeAnimation");

          // Let React to finish updating DOM after the first stage of state update
          if (shouldWaitBefore) await waitForFrames(1);

          // If the state updater returns enriched payload, add it to the event
          const enrichedEvent = enrichedPayload
            ? { ...nextEvent, data: { ...nextEvent.data, ...enrichedPayload } }
            : nextEvent;

          // react-doctor-disable-next-line async-await-in-loop
          await playAnimation(enrichedEvent);

          const { shouldWait: shouldWaitAfter } = updateLocalState(
            enrichedEvent,
            "afterAnimation",
          );

          if (shouldWaitAfter) await waitForFrames(1);

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

  useEffect(() => {
    console.table(events);
  }, [events]);

  return (
    <>
      <AnimationLayer currentAnimation={currentAnimation} />
      {children}
    </>
  );
}
