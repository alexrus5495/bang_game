import { useEffect, useMemo, useRef, useState } from "react";
import PlayingCard from "../../cards/PlayingCard";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import InspectIcon from "./InspectIcon";
import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";
import type { PlayingCardMeta } from "../../../types";
import { motion } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useDragDrop } from "../../../contexts/DragDropContext";
import { usePendingContext } from "../../../contexts/PendingContext";

export default function PlayerHand({ clientHand }: { clientHand: string[] }) {
  const {
    draggedCardIndex,
    setDraggedCardIndex,
    setDraggedCardOffset,
    isDraggedCardReady,
  } = useDragDrop();

  const cardsMeta = useCardsMetaDataState()[0];
  const pending = usePendingContext();

  const visibleCards = useMemo(
    () => clientHand.filter((card) => card !== pending.pendingCardId),
    [clientHand, pending.pendingCardId],
  );

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  // Calculated margin used to overlap cards so they fit the container
  const [cardOffset, setCardOffset] = useState<number>(0);

  // Which card is user currenlty hovering over
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);

  // Storing rendered cards refs
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setCardRef = (cardId: string, element: HTMLDivElement | null) => {
    cardRefs.current[cardId] = element;
  };

  // Calculate the offset to correctrly position the cards
  useEffect(() => {
    const firstCard = cardRefs.current[visibleCards[0]];

    const cardsTotal = visibleCards.length;

    if (containerWidth > 0 && firstCard && cardsTotal > 0) {
      const cardWidth = firstCard.getBoundingClientRect().width;

      const initialTotalCardsWidth = cardWidth * cardsTotal;
      const targetTotalCardsWidth = containerWidth;
      const deltaTotalCardsWidth =
        initialTotalCardsWidth - targetTotalCardsWidth;

      const offsetFactor = deltaTotalCardsWidth / (cardsTotal - 1);

      setCardOffset(cardWidth - offsetFactor);
    }
  }, [containerWidth, pending.pendingCardId, visibleCards]);

  const handleStartDrag = (event: React.MouseEvent, cardIndex: number) => {
    const cardElement = event.currentTarget;

    //Calculate new card offset
    const cardRect = cardElement.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    setDraggedCardIndex(cardIndex);
    setDraggedCardOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full border border-green-400 relative"
    >
      {visibleCards.map((card, index) => {
        return (
          <motion.div
            key={card}
            ref={(el) => setCardRef(card, el)}
            className="isCard absolute h-full border border-yellow-400"
            style={{
              left: `${cardOffset * index}px`,
              zIndex: highlightedCard === index ? 100 : 20 - index,
              visibility:
                isDraggedCardReady && draggedCardIndex === index
                  ? "hidden"
                  : "visible",
            }}
            // animate={{
            //   marginLeft: index !== 0 ? -cardMargin : 0,
            //   bottom: highlightedCard === index ? "15%" : 0,
            //   scale: highlightedCard === index ? 1.2 : 1,
            // }}
            // transition={{
            //   marginLeft: { duration: 0.2, ease: "easeInOut" },
            //   scale: {
            //     duration: 0.1,
            //     ease: "easeInOut",
            //   },
            //   bottom: {
            //     duration: 0.15,
            //     ease: "easeInOut",
            //   },
            // }}
            onMouseMove={() => setHighlightedCard(index)}
            onMouseDown={(e) => handleStartDrag(e, index)}
            onMouseLeave={() => setHighlightedCard(null)}
          >
            <PlayingCard
              cardId={card}
              initialIsFaceDown={false}
              initialIsInteractable={false}
            />

            {highlightedCard === index && (
              <InspectIcon
                cardMeta={cardsMeta?.deckMeta[card] as PlayingCardMeta}
              />
            )}
            {highlightedCard === index && (
              <div
                className="bg-black h-full w-full relative"
                style={{
                  zIndex: -1,
                  top: "-96%",
                  right: "-5%",
                  opacity: 0.6,
                  borderRadius: sizeAdaptive(55),
                }}
              ></div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
