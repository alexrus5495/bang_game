// REFACTORING ON v1
import { m } from "motion/react";
import PlayingCard from "../../../cards/PlayingCard";
import InspectIcon from "../InspectIcon";
import AnimationAnchor from "../../shared/AnimationAnchor";
import React, { useMemo, useState, type ReactNode } from "react";
import { type AnchorId } from "../../../../contexts/AnchorsContext";
import CardAuraEffect from "../../../../shaders/cardAuraEffect";
import {
  use3dTilt,
  useCardHighlight,
  useCardPosition,
  useIsCardPlayable,
} from "./CardInHand.hooks";
import useIsCurrentPlayer from "../../../../hooks/useIsCurrentPlayer";

type CardInHandProps = {
  cardId: string;
  spacing: number;
  index: number;
};

const CardInHand = React.memo(({ cardId, spacing, index }: CardInHandProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <CardInHandOuter isDragging={isDragging} spacing={spacing} index={index}>
      <CardInHandInner
        isDragging={isDragging}
        index={index}
        cardId={cardId}
        setIsDragging={setIsDragging}
      />
    </CardInHandOuter>
  );
});

export default CardInHand;

function CardInHandOuter({
  isDragging,
  spacing,
  index,
  children,
}: {
  isDragging: boolean;
  spacing: number;
  index: number;
  children: ReactNode;
}) {
  const { highlightedCardIndex, onMouseLeave, onMouseEnter } =
    useCardHighlight(index);
  const isCardPlayable = useIsCardPlayable(index);

  const position = useCardPosition({
    spacing,
    index,
    highlightedCardIndex,
    isCardPlayable,
  });

  if (!position) return null;

  return (
    <m.div
      className="absolute will-change-transform pointer-events-auto"
      style={{
        zIndex: isDragging ? 999 : position.currentZIndex,
        transformOrigin: "top right",
        perspective: 600,
      }}
      initial={false}
      animate={{
        left: position.currentLeft,
        height: position.currentHeight,
        top: position.currentTop,
        translateX: position.currentTranslateX,
        scale: isDragging ? 1 : position.currentScale,
      }}
      transition={{
        scale: { duration: 0.1, ease: "easeInOut" },
        top: { duration: 0.15, ease: "easeInOut" },
      }}
      // Block hover triggers on the neighbor cards during drag
      onMouseEnter={isDragging ? undefined : onMouseEnter}
      onMouseLeave={isDragging ? undefined : onMouseLeave}
    >
      {children}
    </m.div>
  );
}

function CardInHandInner({
  index,
  cardId,
  isDragging,
  setIsDragging,
}: {
  index: number;
  cardId: string;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}) {
  const { isHighlighted, onMouseLeave } = useCardHighlight(index);
  const isCurrent = useIsCurrentPlayer();
  const isCardPlayable = useIsCardPlayable(index);

  const anchorId = useMemo<AnchorId>(
    () => ({ type: "player-hand-card", index }),
    [index],
  );

  const { dragX, dragY, rotateX, rotateY } = use3dTilt(isDragging);

  const handleDragStart = () => {
    setIsDragging(true);
    onMouseLeave();
  };

  return (
    <m.div
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      drag={isCurrent}
      dragConstraints={false}
      dragElastic={1}
      dragSnapToOrigin={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      style={{
        x: dragX,
        y: dragY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      onDragStart={handleDragStart}
      onDragEnd={() => {
        setIsDragging(false);
        onMouseLeave();
      }}
      whileDrag={{
        scale: 1.2,
      }}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />

      <div
        style={{ transform: "translateZ(0px)", backfaceVisibility: "hidden" }}
        className="w-full h-full"
      >
        <PlayingCard cardId={cardId} initialIsFaceDown={false} />
      </div>

      {isCardPlayable && (
        <CardAuraEffect color={isDragging ? "#a9b0fc " : "#09e510"} />
      )}

      {isHighlighted && !isDragging && <InspectIcon cardId={cardId} />}
    </m.div>
  );
}
