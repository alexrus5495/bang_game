import { m } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { EventType, PlayingCardMeta } from "../../../../types";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useMemo, useRef } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import { useDragDropStore } from "../../../../stores/dragDropStore";
import { useShallow } from "zustand/shallow";
import { useAnimationLayer } from "../../../../hooks/useAnimationLayer";

type CardInHandProps = {
  cardId: string;
  spacing: number;
  index: number;
};

export default function CardInHand({
  cardId,
  spacing,
  index,
}: CardInHandProps) {
  const {
    startDragging,
    isDragging,
    lastDraggedIndex,
    clearLastDraggedIndex,
    highlightedCardIndex,
    setHighlightedCardIndex,
  } = useDragDropStore(
    useShallow((state) => ({
      startDragging: state.startDragging,
      isDragging: state.isDragging,
      lastDraggedIndex: state.lastDraggedIndex,
      clearLastDraggedIndex: state.clearLastDraggedIndex,
      highlightedCardIndex: state.highlightedCardIndex,
      setHighlightedCardIndex: state.setHighlightedCardIndex,
    })),
  );

  const { currentAnimation } = useAnimationLayer();
  const cardsMeta = useCardsMetaDataState()[0];
  const cardRef = useRef<HTMLDivElement>(null);

  // Evaluate the highlight state based on the global store
  const isHighlighted = highlightedCardIndex === index;

  // Clear the active drag index once all deferred procedures conclude
  if (
    !isDragging &&
    lastDraggedIndex === index &&
    currentAnimation?.Component?.name !== "CARD_SNAPBACK"
  ) {
    clearLastDraggedIndex();
  }

  const isThisCardAnimatingBack =
    currentAnimation?.Component?.name === "CARD_SNAPBACK" &&
    (currentAnimation.props.data as EventType["CARD_SNAPBACK"])?.lastIndex ===
      index;

  const isThisCardActiveInProxy = isDragging
    ? lastDraggedIndex === index
    : isThisCardAnimatingBack;

  const handleStartDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    cardIndex: number,
  ) => {
    const cardElement = event.currentTarget;
    const cardRect = cardElement.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    startDragging(event, cardIndex, { x: offsetX, y: offsetY });
  };

  // Hover handlers interact directly with the centralized store
  const handleMouseEnter = () => {
    if (isDragging) return;
    setHighlightedCardIndex(index);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setHighlightedCardIndex(null);
  };

  const anchorId = useMemo<AnchorId>(
    () => ({ type: "player-hand", index }),
    [index],
  );

  return (
    <m.div
      key={cardId}
      ref={cardRef}
      className="isCard absolute h-full"
      style={{
        zIndex: isHighlighted ? 100 : 20 + index,
        visibility: isThisCardActiveInProxy ? "hidden" : "visible",
      }}
      initial={false}
      animate={{
        left: `${spacing * index}px`,
        // If the card is currently animating back via snapback, reset its state to 0.
        // This ensures the structural anchor immediately assumes its default, un-highlighted position.
        bottom: isHighlighted && !isThisCardAnimatingBack ? "15%" : 0,
        scale: isHighlighted && !isThisCardAnimatingBack ? 1.2 : 1,
      }}
      transition={{
        scale: { duration: 0.1, ease: "easeInOut" },
        bottom: { duration: 0.15, ease: "easeInOut" },
      }}
      onPointerDown={(e) => handleStartDrag(e, index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      <PlayingCard cardId={cardId} initialIsFaceDown={false} />

      {isHighlighted && (
        <InspectIcon
          cardMeta={cardsMeta?.deckMeta[cardId] as PlayingCardMeta}
        />
      )}
      {isHighlighted && (
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
    </m.div>
  );
}
