import { useCallback, useEffect, useState } from "react";
import type { SystemMessage } from "../types";
import { useMessagesState } from "./useMessagesState";
import type { AnimationComponent } from "../animations";
import ANIMATIONS from "../animations";

export const useGameEventProcessor = () => {
  //WARNING: DEV ONLY, REMOVE AFTER TESTING
  const messages = useMessagesState()[0];
  const animationQueue = messages as SystemMessage[];

  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationComponent | null>(null);
  const [lastFinishedAnimationId, setLastFinishedAnimationId] = useState<
    number | null
  >(null);
  const onAnimationComplete = useCallback((animationId: number) => {
    setCurrentAnimation(null);
    setLastFinishedAnimationId(animationId);
  }, []);

  useEffect(() => {
    if (!animationQueue) return;

    const animationToHandle =
      lastFinishedAnimationId === null
        ? animationQueue[0]
        : animationQueue.find(
            (animation) => animation.id > lastFinishedAnimationId,
          );

    if (!animationToHandle) return;

    const Component = ANIMATIONS[animationToHandle.template];

    if (!Component) {
      console.error(
        `Couldn't find the animation component for ${animationToHandle.template}`,
      );
      return;
    }

    setCurrentAnimation({
      Component,
      props: {
        onComplete: () => onAnimationComplete(animationToHandle.id),
        data: animationToHandle.data,
        animationId: animationToHandle.id,
      },
    });
  }, [lastFinishedAnimationId, animationQueue, onAnimationComplete]);

  return {
    animationQueue,
    currentAnimation,
    lastFinishedAnimationId,
  };
};
