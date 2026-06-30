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

  if (!from || !to) {
    // Safely defer onComplete to avoid triggering state updates during render
    setTimeout(onComplete, 0);
    return null;
  }

  return (
    <m.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: from.width,
      }}
      initial={{
        x: from.left,
        y: from.top,
        height: from.height,
      }}
      animate={{
        x: to.left,
        y: to.top,
        height: to.height,
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
