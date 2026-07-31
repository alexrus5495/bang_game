import { m } from "motion/react";
import PlayingCard from "../components/cards/PlayingCard";
import { getAnimationPosition } from "../lib/utils/getAnimationPosition";
import { getCardTableTransform } from "../lib/utils/getCardTableTransform";
import { getAnimationScale } from "../lib/utils/getAnimationScale";
import { useEffect } from "react";
import { useAnchors } from "../contexts/AnchorsContext";
import type { EventType } from "../types";

export default function TABLE_CLEARED({
  data,
  onComplete,
}: {
  data: EventType["TABLE_CLEARED"];
  onComplete: () => void;
}) {
  const anchors = useAnchors();
  const cards = data?.clearedCards ?? [];

  const playArea = anchors.getRect({ type: "play-area" });
  const discardArea = anchors.getRect({ type: "discard" });

  useEffect(() => {
    if (cards.length === 0 || !playArea || !discardArea) {
      const timer = setTimeout(onComplete, 0);
      return () => clearTimeout(timer);
    }
  }, [cards.length, playArea, discardArea, onComplete]);

  if (cards.length === 0 || !playArea || !discardArea) {
    return null;
  }

  const { initialScale, targetScale } = getAnimationScale({
    baseSize: playArea,
    initialSize: playArea,
    targetSize: discardArea,
  });

  const targetPosition = getAnimationPosition({
    containerSize: playArea,
    targetRect: discardArea,
  });

  return (
    <>
      {cards.map((card, index) => {
        const { offsetXFactor, offsetYFactor, rotation } =
          getCardTableTransform(card.cardId, card.eventId);

        const cardSourceRect = {
          x: playArea.x + offsetXFactor * playArea.width,
          y: playArea.y + offsetYFactor * playArea.width,
          width: playArea.width,
          height: playArea.height,
        };

        const initialPosition = getAnimationPosition({
          containerSize: playArea,
          targetRect: cardSourceRect,
        });

        const isLastCard = index === cards.length - 1;

        return (
          <m.div
            key={`${card.cardId}-${index}`}
            className="z-50 pointer-events-none"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: playArea.width,
              height: playArea.height,
              transformOrigin: "center center",
            }}
            initial={{
              x: initialPosition.x,
              y: initialPosition.y,
              scale: initialScale,
              rotate: rotation,
            }}
            animate={{
              x: targetPosition.x,
              y: targetPosition.y,
              scale: targetScale,
              rotate: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeIn",
            }}
            onAnimationComplete={isLastCard ? onComplete : undefined}
          >
            <PlayingCard
              cardId={card.cardId}
              initialIsFaceDown={false}
              flipDelay={100}
            />
          </m.div>
        );
      })}
    </>
  );
}
