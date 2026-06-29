import { m } from "motion/react";
import { useAnchors } from "../../contexts/AnchorsContext";
import type { EventType } from "../../types";
import PlayingCard from "../../components/cards/PlayingCard";

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

  return (
    <m.div
      className=""
      initial={{ x: from.x, y: from.y, height: from.height }}
      animate={{ x: to.x, y: to.y, height: to.height }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={onComplete}
    >
      <PlayingCard cardId={null} initialIsFaceDown={true} />
    </m.div>
  );
}
