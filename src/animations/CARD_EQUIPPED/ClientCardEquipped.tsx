import { m } from "motion/react";
import { useAnchors } from "../../contexts/AnchorsContext";
import type { EventType } from "../../types";
import PlayingCard from "../../components/cards/PlayingCard";
import { getCardTableTransform } from "../../lib/utils/getCardTableTransform";
import { getAnimationScale } from "../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../lib/utils/getAnimationPosition";

export default function ClientCardEquipped({
  id,
  data,
  onComplete,
}: {
  id: number;
  data: EventType["CARD_EQUIPPED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();

  const from = anchors.getRect({ type: "play-area" });
  const to = anchors.getRect({
    type: "equipment-slot",
    index: data.card.index,
    playerId: data.playerId,
  });

  if (!from || !to) {
    setTimeout(onComplete, 0);
    return null;
  }

  const { offsetXFactor, offsetYFactor, rotation } = getCardTableTransform(
    data.card.id,
    id,
  );

  const playAreaTargetRect = {
    x: from.x + offsetXFactor * from.width,
    y: from.y + offsetYFactor * from.width,
    width: from.width,
    height: from.height,
  };

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: from,
    initialSize: from,
    targetSize: to,
  });

  const initialPosition = getAnimationPosition({
    containerSize: from,
    targetRect: playAreaTargetRect,
  });

  const targetPosition = getAnimationPosition({
    containerSize: from,
    targetRect: to,
  });

  return (
    <m.div
      className="z-50 pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: from.width,
        height: from.height,
        transformOrigin: "center center",
      }}
      initial={{
        x: initialPosition.x,
        y: initialPosition.y,
        scale: initialScale,
        rotate: rotation,
      }}
      animate={{
        scale: [initialScale, initialScale * 1.1, initialScale, targetScale],
        x: [
          initialPosition.x,
          initialPosition.x,
          initialPosition.x,
          targetPosition.x,
        ],
        y: [
          initialPosition.y,
          initialPosition.y,
          initialPosition.y,
          targetPosition.y,
        ],
        rotate: [rotation, 0, 0, 0],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 1],
      }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={data.card.id} initialIsFaceDown={false} />
    </m.div>
  );
}
