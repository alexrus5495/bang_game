import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PlayingCard from "../../cards/PlayingCard";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import InspectIcon from "./InspectIcon";
import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";
import type { PlayingCardMeta } from "../../../types";
import { useCardCoordsState } from "../../../hooks/useCardCoordsState";
import { motion } from "motion/react";
import {
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "../../cards/shared/constants";

export default function PlayerHand({ clientHand }: { clientHand: string[] }) {
  const cardsMeta = useCardsMetaDataState()[0];

  // Parent container ref, used in dynamic margin calculation
  const { ref: containerRef, width: containerWidth } =
    useResizeObserver<HTMLDivElement>();

  // Calculated margin used to overlap cards so they fit the container
  const [cardMargin, setCardMargin] = useState<number>(0);
  const [marginCalculated, setMarginCalculated] = useState<boolean>(false);

  // Which card is user currenlty hovering over
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);

  // Remembered hand from the last server update, used to prevent draw animation
  // cards that are already in hand.
  const [previousHand, setPreviousHand] = useState<string[]>([]);

  // Which cards are currently shown, i.e. not hidden durent animations.
  const [visibleCards, setVisibleCards] = useState<string[]>([]);

  // Current position of the top card of the deck, used as initial position of
  // the currently animated card.
  const topCardCoords = useCardCoordsState()[0].topCard;

  // Storing rendered cards refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = (index: number, element: HTMLDivElement | null) => {
    cardRefs.current[index] = element;
  };

  // Storing calculated diffs between the top card of the deck and the card's final positions
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const [offsetsCalculated, setOffsetsCalculated] = useState<boolean>(false);

  const ANIMATION_LENGTH_MS = 1000;
  const ANIMATION_PAUSE_MS = 100;

  // Making a timed queue, so the cards won't render all at once.
  useEffect(() => {
    setMarginCalculated(false);
    setOffsetsCalculated(false);

    if (clientHand.length === 0) {
      setVisibleCards([]);
      return;
    }

    setTimeout(() => {
      clientHand.forEach((card, index) => {
        setTimeout(
          () => {
            setVisibleCards((prev) => {
              if (prev && prev.includes(card)) {
                return prev;
              } else {
                return [...prev, card];
              }
            });
          },
          index * (ANIMATION_LENGTH_MS + ANIMATION_PAUSE_MS),
        );
      });
    }, 1000);
  }, [clientHand]);

  // Dinamically ajdust cards margin so they overlap to fit the container
  useEffect(() => {
    const firstCard = cardRefs.current[0];
    setMarginCalculated(false);

    if (containerWidth > 0 && firstCard && visibleCards.length > 0) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardsInHand = visibleCards.length;
      const totalCardsWidth = cardWidth * cardsInHand;

      const extraWidth = totalCardsWidth - containerWidth;
      const isCardsOverflow = extraWidth > 0;

      const cardMargin = isCardsOverflow ? extraWidth / (cardsInHand - 1) : 0;
      setCardMargin(cardMargin);
      setMarginCalculated(true);
    }
  }, [visibleCards, containerWidth]);

  const calculateOffsets = useCallback(() => {
    const newOffets = visibleCards.map((_, index) => {
      const card = cardRefs.current[index]?.getBoundingClientRect();
      if (!card || !topCardCoords?.x || !topCardCoords?.y) {
        return { x: 0, y: 0 };
      }

      const absoluteCardX = card.left;
      const absoluteCardY = card.top;

      const offsetX = Math.round(topCardCoords.x - absoluteCardX);
      const offsetY = Math.round(topCardCoords.y - absoluteCardY);

      return {
        x: offsetX,
        y: offsetY,
      };
    });

    setOffsets(newOffets);
  }, [visibleCards, topCardCoords]);

  useLayoutEffect(() => {
    if (visibleCards.length > 0 && marginCalculated) {
      calculateOffsets();
    }
    setOffsetsCalculated(true);
  }, [calculateOffsets, visibleCards, marginCalculated]);

  return (
    <div ref={containerRef} className="h-full w-full flex justify-center">
      {visibleCards.map((card, index) => {
        if (topCardCoords.height) {
          if (!offsetsCalculated || !offsets[index]) {
            return (
              <div
                key={card}
                ref={(el) => setCardRef(index, el)}
                className="invisible h-full"
                style={{
                  height: topCardCoords.height,
                  aspectRatio: CARD_CONTAINER_WIDTH / CARD_CONTAINER_HEIGHT,
                }}
              />
            );
          }

          return (
            <motion.div
              key={card}
              ref={(el) => setCardRef(index, el)}
              className="relative"
              style={{
                marginLeft: index !== 0 ? `-${cardMargin}px` : "",
                zIndex: highlightedCard === index ? 100 : index,
                bottom: highlightedCard === index ? "15%" : 0,
                scale: highlightedCard === index ? 1.2 : 1,
                transition:
                  "margin 0.2s ease, bottom 0.2s ease, scale 0.2s ease",
              }}
              onMouseEnter={() => setHighlightedCard(index)}
              onMouseLeave={() => setHighlightedCard(null)}
              initial={{
                left: offsets[index].x,
                top: offsets[index].y,
                height: topCardCoords.height,
              }}
              animate={{ left: 0, top: 0, height: "100%" }}
              transition={{
                duration: ANIMATION_LENGTH_MS / 1000,
                ease: "easeOut",
              }}
            >
              <PlayingCard
                cardId={card}
                initialIsFaceDown={true}
                initialIsInteractable={false}
                flipDelay={100}
              />

              {highlightedCard === index && (
                <InspectIcon
                  cardMeta={cardsMeta?.deckMeta[card] as PlayingCardMeta}
                />
              )}
            </motion.div>
          );
        }
      })}
    </div>
  );
}
