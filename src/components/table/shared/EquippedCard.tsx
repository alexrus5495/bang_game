import React, { useMemo } from "react";
import { useTooltip } from "../../../hooks/useTooltip";
import InspectCardTooltip from "../Tooltip/InspectCardTooltip";
import PlayingCard from "../../cards/PlayingCard";
import { useAnchors, type AnchorId } from "../../../contexts/AnchorsContext";
import { m } from "motion/react";
import AnimationAnchor from "./AnimationAnchor";

type EquippedCardProps = {
  cardId: string;
  playerId: string;
  spacing: number;
  index: number;
};

const EquippedCard = React.memo(
  ({ cardId, playerId, spacing, index }: EquippedCardProps) => {
    const { isVisible, handlersNonPinable } = useTooltip();
    const position = useEquippedCardPosition({
      spacing,
      index,
      playerId,
    });

    const anchorId: AnchorId = useMemo(
      () => ({ type: "equipment-card", index, playerId }),
      [index, playerId],
    );

    if (!position) return null;

    return (
      <m.div
        className="absolute h-full w-auto cursor-pointer pointer-events-auto"
        style={{
          zIndex: position.zIndex,
          transformOrigin: "top left",
        }}
        animate={{
          left: `${position.left}px`,
          height: `${position.height}px`,
          top: `${position.top}px`,
        }}
        initial={false}
        {...handlersNonPinable}
      >
        <AnimationAnchor id={anchorId} className="w-full h-full absolute" />

        <PlayingCard cardId={cardId} initialIsFaceDown={false} />

        <InspectCardTooltip
          cardId={cardId}
          type="playingCardRef"
          isVisible={isVisible}
        />
      </m.div>
    );
  },
);

export default EquippedCard;

function useEquippedCardPosition(data: {
  spacing: number;
  index: number;
  playerId: string;
}) {
  const anchor = useAnchors();
  const zeroAnchor = anchor.getRect({
    type: "equipment-zero",
    playerId: data.playerId,
  });

  const position = useMemo(() => {
    if (!zeroAnchor) return null;
    const currentZIndex = 20 + data.index;
    const currentLeft = zeroAnchor.left + data.spacing * data.index;
    const currentHeight = zeroAnchor.height;
    return {
      zIndex: currentZIndex,
      left: currentLeft,
      height: currentHeight,
      top: zeroAnchor.top,
    };
  }, [data.index, data.spacing, zeroAnchor]);

  return position;
}
