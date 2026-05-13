import { useLayoutEffect, useRef, useState } from "react";
import { useCardsOnTheTableContext } from "../../../contexts/CardsOnTheTableContext";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import PlayingCard from "../../cards/PlayingCard";
import { motion } from "motion/react";
import CardScaler from "../../cards/shared/CardScaler";
import {
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "../../cards/shared/constants";
import RootPortal from "../../shared/RootPortal";

type FinalPosition = {
  x: number;
  y: number;
  height: number;
};

export default function CardPlayingArea() {
  const table = useCardsOnTheTableContext().cardsOnTheTable;
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [final, setFinal] = useState<FinalPosition | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const setCardRefs = (cardId: string, element: HTMLDivElement | null) => {
    cardRefs.current[cardId] = element;
  };

  useLayoutEffect(() => {
    if (!anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();

    const finalX = anchorRect.x + anchorRect.width / 2;
    const finalY = anchorRect.y + anchorRect.height / 4;

    setFinal({ x: finalX, y: finalY, height: anchorRect.height });
  }, []);

  return (
    <div className="w-full h-full relative">
      <div
        className="w-full h-full border border-[var(--WHITE)] mask-weathered_2 flex justify-center items-center"
        style={{
          borderWidth: sizeAdaptive(200),
          borderRadius: sizeAdaptive(70),
        }}
      >
        <div
          className="w-full h-auto text-[var(--WHITE)] text-center rotate-340 mask-weathered_3"
          style={{ fontSize: sizeAdaptive(10) }}
        >
          BANG!
        </div>
      </div>

      <div className="absolute h-full w-full top-0">
        <CardAnchor elRef={anchorRef} />

        {final &&
          table.map((card, index) => {
            return (
              <motion.div
                key={index}
                ref={(el) => setCardRefs(card.cardId, el)}
                className="absolute top-1/2 left-1/2"
                style={{
                  height: sizeAdaptive(4.2),
                  zIndex: `${index + 1}`,
                }}
                initial={{
                  x: card.initialX - final.x,
                  y: card.initialY - final.y,
                  scale: card.initialHeight / final.height,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  transform: `translate(-${50 + card.offsetX}%, -${50 + card.offsetY}%) rotate(${card.rotation}deg)`,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <PlayingCard cardId={card.cardId} initialIsFaceDown={false} />
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}

function CardAnchor({
  elRef,
}: {
  elRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <RootPortal portalId={"cardPlayingArea_anchor"}>
      <div
        className="absolute bottom-1/2 left-1/2 opacity-100 pointer-events-none"
        ref={elRef}
        style={{
          height: sizeAdaptive(4.15),
          transform: "translate(-50%)",
        }}
      >
        <div className="h-full">
          <CardScaler>
            <div
              className=""
              style={{
                height: `${CARD_CONTAINER_HEIGHT}px`,
                width: `${CARD_CONTAINER_WIDTH}px`,
              }}
            ></div>
          </CardScaler>
        </div>
      </div>
    </RootPortal>
  );
}
