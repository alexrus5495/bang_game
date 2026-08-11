import React, { useEffect, useRef } from "react";
import { useAnimationLayer } from "../../hooks/useAnimationLayer";
import { useLocalStateUpdater } from "../../hooks/useLocalStateUpdater";
import AnimationLayer from "./AnimationLayer";
import { waitForFrames } from "../../lib/utils/waitForFrames";
import { useGameEventsStore } from "../../stores/gameEventsStore";
import type { GameEvent } from "../../types";

export function EventProcessor({ children }: { children: React.ReactNode }) {
  const events = useGameEventsStore((s) => s.events);
  const processNextEvents = useGameEventsStore((s) => s.processNextEvents);

  const { currentAnimation, playAnimation } = useAnimationLayer();
  const { updateLocalState } = useLocalStateUpdater();

  const playAnimationRef = useRef(playAnimation);
  playAnimationRef.current = playAnimation;

  const updateLocalStateRef = useRef(updateLocalState);
  updateLocalStateRef.current = updateLocalState;

  const handleEvent = async (event: GameEvent) => {
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
      updateLocalStateRef.current(event, "beforeAnimation");

    // Let React to finish updating DOM after the first stage of state update
    if (shouldWaitBefore) await waitForFrames(1);

    // If the state updater returns enriched payload, add it to the event
    const enrichedEvent = enrichedPayload
      ? { ...event, data: { ...event.data, ...enrichedPayload } }
      : event;

    // react-doctor-disable-next-line async-await-in-loop
    await playAnimationRef.current(enrichedEvent);

    const { shouldWait: shouldWaitAfter } = updateLocalStateRef.current(
      enrichedEvent,
      "afterAnimation",
    );

    if (shouldWaitAfter) await waitForFrames(1);
  };

  useEffect(() => {
    if (events?.length) {
      processNextEvents(handleEvent);
    }
  }, [events, processNextEvents]);

  return (
    <>
      <AnimationLayer currentAnimation={currentAnimation} />
      {children}
    </>
  );
}
