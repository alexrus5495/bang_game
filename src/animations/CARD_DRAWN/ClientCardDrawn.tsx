import { m } from "motion/react";
import type { EventType } from "../../types";
import { useAnchors } from "../../contexts/AnchorsContext";
import PlayingCard from "../../components/cards/PlayingCard";
import { getAnimationScale } from "../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../lib/utils/getAnimationPosition";

export default function ClientCardDrawn({
  data,
  onComplete,
}: {
  data: EventType["CARD_DRAWN"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({ type: "deck" });
  const to = anchors.getRect({
    type: "player-hand-slot",
    index: data.card.index,
  });

  if (!from || !to) return null;

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: to,
    initialSize: from,
    targetSize: to,
  });

  const initialTarget = getAnimationPosition({
    containerSize: to,
    targetRect: from,
  });

  const animateTarget = getAnimationPosition({
    containerSize: to,
    targetRect: to,
  });

  return (
    <m.div
      className="z-0"
      style={{
        width: to.width,
        height: to.height,
        transformOrigin: "center center",
      }}
      initial={{ x: initialTarget.x, y: initialTarget.y, scale: initialScale }}
      animate={{ x: animateTarget.x, y: animateTarget.y, scale: targetScale }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard
        cardId={data.card.id}
        initialIsFaceDown={true}
        flipDelay={100}
      />
    </m.div>
  );
}
