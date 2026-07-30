import { m } from "motion/react";
import { useAnchors } from "../../contexts/AnchorsContext";
import type { EventType } from "../../types";
import PlayingCard from "../../components/cards/PlayingCard";
import { getAnimationScale } from "../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../lib/utils/getAnimationPosition";

export default function OpponentCardDrawn({
  data,
  onComplete,
}: {
  data: EventType["CARD_DRAWN"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({ type: "deck" });
  const to = anchors.getRect({
    type: "opponent-hand",
    playerId: data.playerId,
  });

  if (!from || !to) {
    setTimeout(onComplete, 0);
    return null;
  }

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: to,
    initialSize: from,
    targetSize: to,
  });

  const initialPos = getAnimationPosition({
    containerSize: to,
    targetRect: from,
  });

  const targetPos = getAnimationPosition({
    containerSize: to,
    targetRect: to,
  });

  return (
    <m.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: to.width,
        height: to.height,
        transformOrigin: "center center",
      }}
      initial={{
        x: initialPos.x,
        y: initialPos.y,
        scale: initialScale,
      }}
      animate={{
        x: targetPos.x,
        y: targetPos.y,
        scale: targetScale,
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.18,
      }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={null} initialIsFaceDown={true} />
    </m.div>
  );
}
