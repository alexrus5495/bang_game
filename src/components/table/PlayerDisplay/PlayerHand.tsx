import { useEffect, useRef, useState } from "react";
import PlayingCard from "../../cards/PlayingCard";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import InspectIcon from "./InspectIcon";
import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";
import type { Coordinates, PlayingCardMeta } from "../../../types";
import { motion } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";

export default function PlayerHand({
  clientHand,
  draggedCardIndex,
  setDraggedCardIndex,
  setDraggedCardOffset,
  isDraggedCardReady,
}: {
  clientHand: string[];
  draggedCardIndex: null | number;
  setDraggedCardIndex: (newIndex: null | number) => void;
  setDraggedCardOffset: (offset: Coordinates) => void;
  isDraggedCardReady: boolean;
}) {
  const cardsMeta = useCardsMetaDataState()[0];

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  // Calculated margin used to overlap cards so they fit the container
  const [cardMargin, setCardMargin] = useState<number>(0);

  // Which card is user currenlty hovering over
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);

  // Storing rendered cards refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = (index: number, element: HTMLDivElement | null) => {
    cardRefs.current[index] = element;
  };

  // Dinamically ajdust cards margin so they overlap to fit the container
  useEffect(() => {
    const firstCard = cardRefs.current[0];

    if (containerWidth > 0 && firstCard && clientHand.length > 0) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardsInHand = clientHand.length;

      const totalCardsWidth = cardWidth * cardsInHand;

      const extraWidth = totalCardsWidth - containerWidth;

      const isCardsOverflow = extraWidth > 0;

      const cardMargin = isCardsOverflow ? extraWidth / (cardsInHand - 1) : 0;
      setCardMargin(cardMargin);
    }
  }, [clientHand, containerWidth]);

  const handleStartDrag = (event: React.MouseEvent, cardIndex: number) => {
    const cardElement = event.currentTarget;

    const cardRect = cardElement.getBoundingClientRect();

    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    setDraggedCardIndex(cardIndex);
    setDraggedCardOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div ref={containerRef} className="h-full w-full flex justify-center">
      {clientHand.map((card, index) => {
        return (
          <motion.div
            key={card}
            ref={(el) => setCardRef(index, el)}
            className="relative h-full"
            style={{
              marginLeft: index !== 0 ? `-${cardMargin}px` : "",
              zIndex: highlightedCard === index ? 100 : 20 - index,
              visibility:
                isDraggedCardReady && draggedCardIndex === index
                  ? "hidden"
                  : "visible",
              // display: draggedCardIndex === index ? "none" : "block",
            }}
            animate={{
              bottom: highlightedCard === index ? "15%" : 0,
              scale: highlightedCard === index ? 1.2 : 1,
            }}
            transition={{
              scale: {
                duration: 0.1,
                ease: "easeInOut",
              },
              bottom: {
                duration: 0.15,
                ease: "easeInOut",
              },
            }}
            onMouseEnter={() => setHighlightedCard(index)}
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
