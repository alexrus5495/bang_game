import { motion } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { useDragDrop } from "../../../../contexts/DragDropContext";
import type { PlayingCardMeta } from "../../../../types";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import { AnimationAnchor } from "../../shared/AnimationAnchor";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";

type CardInHandProps = {
  cardId: string;
  spacing: number;
  index: number;
  isHighlighted: boolean;
  onMouseMove: () => void;
  onMouseLeave: () => void;
};

export default function CardInHand({
  cardId,
  spacing,
  index,
  isHighlighted,
  onMouseMove,
  onMouseLeave,
}: CardInHandProps) {
  const {
    draggedCardIndex,
    isDraggedCardReady,
    setDraggedCardIndex,
    setDraggedCardOffset,
  } = useDragDrop();

  const cardsMeta = useCardsMetaDataState()[0];

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
    <motion.div
      key={cardId}
      className="isCard absolute h-full"
      style={{
        zIndex: isHighlighted ? 100 : 20 + index,
        opacity: 100,
        visibility:
          isDraggedCardReady && draggedCardIndex === index
            ? "hidden"
            : "visible",
      }}
      initial={false}
      animate={{
        left: `${spacing * index}px`,
        bottom: isHighlighted ? "15%" : 0,
        scale: isHighlighted ? 1.2 : 1,
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
      onMouseMove={onMouseMove}
      onMouseDown={(e) => handleStartDrag(e, index)}
      onMouseLeave={onMouseLeave}
    >
      <AnimationAnchor
        id={{ type: "player-hand", index: index }}
        className="w-full h-full absolute"
      />

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
    </motion.div>
  );
}
