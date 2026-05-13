import { useCallback, useEffect, useState } from "react";
import { useMessagesState } from "../../hooks/useMessagesState";
import ANIMATIONS, { type AnimationComponent } from "../../animations";
import type { SystemMessage } from "../../types";

export default function AnimationLayer({
  isAllReady,
}: {
  isAllReady: boolean;
}) {
  const { currentAnimation } = useAnimationLayer();

  if (!isAllReady) return null;

  return (
    <div className="w-full h-full">
      {currentAnimation && (
        <currentAnimation.Component {...currentAnimation.props} />
      )}
    </div>
  );
}

const useAnimationLayer = () => {
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
