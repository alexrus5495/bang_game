import { m } from "motion/react";
import { useAnchors } from "../../../contexts/AnchorsContext";
import { getAnimationPosition } from "../../../lib/utils/getAnimationPosition";
import { getAnimationScale } from "../../../lib/utils/getAnimationScale";
import type { EventType } from "../../../types";
import PlayingCard from "../../../components/cards/PlayingCard";

export default function ClientCardUnequipped({
  data,
  onComplete,
}: {
  data: EventType["CARD_UNEQUIPPED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();

  const from = anchors.getRect({
    type: "equipment-card",
    playerId: data.playerId,
    index: data.card.index,
  });

  const to = anchors.getRect({ type: "discard" });

  if (!from || !to) {
    setTimeout(onComplete, 0);
    return null;
  }

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
    targetRect: to,
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
      }}
      animate={{
        scale: [initialScale, targetScale],
        x: [initialPosition.x, targetPosition.x],
        y: [initialPosition.y, targetPosition.y],
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard
        cardId={data.card.id}
        initialIsFaceDown={false}
        flipDelay={100}
      />
    </m.div>
  );
}
