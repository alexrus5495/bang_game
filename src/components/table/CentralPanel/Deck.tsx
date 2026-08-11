import React, { useMemo } from "react";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useTooltip } from "../../../hooks/useTooltip";
import SkeletonCard from "../../cards/SkeletonCard";
import type { TooltipMessage } from "../../../types";
import AnimationAnchor from "../shared/AnimationAnchor";
import PlayingCard from "../../cards/PlayingCard";
import Tooltip from "../Tooltip/Tooltip";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import { useTranslation } from "../../../hooks/useTranslation";

const Deck = React.memo(() => {
  const t = useTranslation();
  const deckSize = useLocalStateStore((state) => state.deckCurrentSize);
  const { position, isVisible, handlersNonPinable } = useTooltip();

  const skeletonCards = useMemo(() => {
    if (deckSize <= 1) return null;

    return Array.from({ length: deckSize - 1 }, (_, index) => {
      if (index % 2 === 0) {
        return (
          <div
            // react-doctor-disable-next-line no-array-index-as-key
            key={`cardSkeleton-${index}`}
            className="h-full w-full absolute flex justify-center"
            style={{ top: `-${index / 2.5}%` }}
          >
            <SkeletonCard />
          </div>
        );
      }
      return null;
    });
  }, [deckSize]);

  const tooltipContent = useMemo<TooltipMessage[]>(
    () => [[{ type: "plainText", content: deckSize.toString() }]],
    [deckSize],
  );

  const anchorId: AnchorId = useMemo(() => ({ type: "deck" }), []);

  return (
    <>
      {skeletonCards}

      <div
        className="h-full w-auto absolute flex justify-center z-0"
        style={{ top: deckSize > 0 ? `-${deckSize / 2.5}%` : "0%" }}
        {...(deckSize > 0 ? handlersNonPinable : {})}
      >
        <AnimationAnchor id={anchorId} className="h-full w-full absolute" />
        <div
          className="h-full w-auto"
          style={{ opacity: deckSize > 0 ? "100" : "0" }}
        >
          <PlayingCard cardId={null} initialIsFaceDown={true} />
        </div>
      </div>

      {isVisible && (
        <Tooltip
          title={t("deck")}
          content={tooltipContent}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
});

export default Deck;
