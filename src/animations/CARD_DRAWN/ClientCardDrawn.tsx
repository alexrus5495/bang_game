import { m } from "motion/react";
import type { EventType } from "../../types";
import { useAnchors } from "../../contexts/AnchorsContext";
import PlayingCard from "../../components/cards/PlayingCard";

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

  return (
    <m.div
      className="z-0"
      initial={{ x: from.x, y: from.y, height: from.height }}
      animate={{ x: to.x, y: to.y, height: to.height }}
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
