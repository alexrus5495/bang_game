import { m } from "framer-motion";
import { useAnchors } from "../contexts/AnchorsContext";
import PlayingCard from "../components/cards/PlayingCard";
import type { EventType } from "../types";
import { useMemo } from "react";

export default function CARD_SNAPBACK({
  data,
  onComplete,
}: {
  data: EventType["CARD_SNAPBACK"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();

  const initialCoords = useMemo(() => {
    const fromRect = anchors.getRect({ type: "drag-proxy" });
    const toRect = anchors.getRect({
      type: "player-hand",
      index: data.lastIndex,
    });

    if (!fromRect || !toRect) return null;

    return { from: fromRect, to: toRect };
  }, [anchors, data.lastIndex]);

  if (!initialCoords) {
    // Safely defer onComplete to avoid triggering state updates during render
    setTimeout(onComplete, 0);
    return null;
  }

  const { from, to } = initialCoords;

  return (
    <div
      className="absolute"
      style={{ perspective: 800, zIndex: 20 + data.lastIndex }}
    >
      <m.div
        className="absolute"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: from.width,
          transformStyle: "preserve-3d",
        }}
        initial={{
          x: from.left,
          y: from.top,
          height: from.height,
          rotateZ: -5,
        }}
        animate={{
          x: to.left,
          y: to.top,
          height: to.height,
          rotateZ: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 22,
        }}
        onAnimationComplete={onComplete}
      >
        <PlayingCard cardId={data.cardId} initialIsFaceDown={false} />
      </m.div>
    </div>
  );
}
