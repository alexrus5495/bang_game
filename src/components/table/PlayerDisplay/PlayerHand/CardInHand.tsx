import { m } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import { useDragDrop } from "../../../../contexts/DragDropContext";
import type { PlayingCardMeta } from "../../../../types";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useMemo, useState } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";

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
  const { draggedCardIndex, startDragging } = useDragDrop();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const cardsMeta = useCardsMetaDataState()[0];

  const handleStartDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    cardIndex: number,
  ) => {
    const cardElement = event.currentTarget;

    //Calculate the offset for the proxy card so it renders in the exact same spot as the original
    const cardRect = cardElement.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    startDragging(event, cardIndex, { x: offsetX, y: offsetY });
  };

  const isThisCardDragged = draggedCardIndex === index;
  const anchorId = useMemo<AnchorId>(
    () => ({ type: "player-hand", index }),
    [index],
  );

  return (
    <m.div
      key={cardId}
      className="isCard absolute h-full"
      style={{
        zIndex: isHighlighted ? 100 : 20 + index,
        visibility: isThisCardDragged ? "hidden" : "visible",
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
      onPointerDown={(e) => handleStartDrag(e, index)}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
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
