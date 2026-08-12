import { m } from "motion/react";
import type { EventType } from "../../types";
import { useAnchors } from "../../contexts/AnchorsContext";
import { getAnimationScale } from "../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../lib/utils/getAnimationPosition";
import PlayingCard from "../../components/cards/PlayingCard";

export default function STORE_CARD_ADDED({
  data,
  onComplete,
}: {
  data: EventType["STORE_CARD_PICKED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({
    type: "interaction-slot",
    index: data.cardIndex,
  });

  const to = anchors.getRect({
    type: "interaction-char",
    playerId: data.playerId,
  });

  if (!from || !to) return null;

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: to,
    initialSize: from,
    targetSize: { height: to.height / 2 },
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
      className="absolute"
      style={{
        zIndex: 50,
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
        cardId={data.cardId}
        initialIsFaceDown={false}
        flipDelay={80}
      />
    </m.div>
  );
}
