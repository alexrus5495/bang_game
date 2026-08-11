import { m } from "motion/react";
import type { EventType } from "../../../types";
import { useAnchors } from "../../../contexts/AnchorsContext";
import PlayingCard from "../../../components/cards/PlayingCard";
import { getCardTableTransform } from "../../../lib/utils/getCardTableTransform";
import { getAnimationScale } from "../../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../../lib/utils/getAnimationPosition";

export default function ClientCardPlayed({
  id,
  data,
  onComplete,
}: {
  id: number;
  data: EventType["CARD_PLAYED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({
    type: "player-hand-card",
    index: data.card.index,
  });
  const to = anchors.getRect({ type: "play-area" });

  if (!from || !to) {
    setTimeout(onComplete, 0);
    return null;
  }

  const { offsetXFactor, offsetYFactor, rotation } = getCardTableTransform(
    data.card.id,
    id,
  );

  // Adjust target Rect with random offset and rotation
  const playAreaTargetRect = {
    x: to.x + offsetXFactor * to.width,
    y: to.y + offsetYFactor * to.width,
    width: to.width,
    height: to.height,
  };

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: to,
    initialSize: from,
    targetSize: to,
  });

  const initialPosition = getAnimationPosition({
    containerSize: to,
    targetRect: from,
  });

  const targetPosition = getAnimationPosition({
    containerSize: to,
    targetRect: playAreaTargetRect,
  });

  return (
    <m.div
      className="z-50 pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: to.width,
        height: to.height,
        transformOrigin: "center center",
      }}
      initial={{
        x: initialPosition.x,
        y: initialPosition.y,
        scale: initialScale,
        rotate: 0,
      }}
      animate={{
        x: targetPosition.x,
        y: targetPosition.y,
        scale: targetScale,
        rotate: rotation,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={data.card.id} initialIsFaceDown={false} />
    </m.div>
  );
}
