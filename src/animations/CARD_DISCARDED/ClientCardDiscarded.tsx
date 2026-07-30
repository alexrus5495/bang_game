import { m } from "motion/react";
import { useAnchors } from "../../contexts/AnchorsContext";
import type { EventType } from "../../types";
import PlayingCard from "../../components/cards/PlayingCard";
import { getAnimationScale } from "../../lib/utils/getAnimationScale";
import { getAnimationPosition } from "../../lib/utils/getAnimationPosition";

export default function ClientCardDiscarded({
  data,
  onComplete,
}: {
  data: EventType["CARD_DISCARDED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const from = anchors.getRect({
    type: "opponent-hand",
    playerId: data.playerId,
  });
  const to = anchors.getRect({ type: "discard" });

  if (!from || !to) return null;

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: to,
    initialSize: from,
    targetSize: to,
  });

  const target = getAnimationPosition({ containerSize: to, targetRect: to });

  return (
    <m.div
      style={{
        height: to.height,
        transformOrigin: "center center",
      }}
      initial={{ x: from.x, y: from.y, scale: initialScale }}
      animate={{ x: target.x, y: target.y, scale: targetScale }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={null} initialIsFaceDown={true} />
    </m.div>
  );
}
