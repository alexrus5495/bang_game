import { m } from "motion/react";
import { useAnchors } from "../../contexts/AnchorsContext";
import type { EventType } from "../../types";
import PlayingCard from "../../components/cards/PlayingCard";

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

  if (!from || !to) return null;

  return (
    <m.div
      initial={{ x: from.x, y: from.y, height: from.height }}
      animate={{ x: to.x, y: to.y, height: to.height }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={null} initialIsFaceDown={true} />
    </m.div>
  );
}
