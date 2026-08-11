import React, { useMemo } from "react";
import { useTooltip } from "../../../hooks/useTooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import type { TooltipMessage } from "../../../types";
import PlayingCard from "../../cards/PlayingCard";
import SkeletonCard from "../../cards/SkeletonCard";
import AnimationAnchor from "../shared/AnimationAnchor";
import Tooltip from "../Tooltip/Tooltip";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import { useTranslation } from "../../../hooks/useTranslation";

const DiscardPile = React.memo(() => {
  const size = useLocalStateStore().discardCurrentSize;
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const t = useTranslation();

  const skeletonCards = useMemo(() => {
    if (size <= 1) return null;

    return Array.from({ length: size - 1 }, (_, index) => {
      if (index % 2 === 0) {
        return (
          <div
            // react-doctor-disable-next-line no-array-index-as-key
            key={index}
            className="h-full w-full absolute flex justify-center"
            style={{ top: `-${index / 2.5}%` }}
          >
            <SkeletonCard />
          </div>
        );
      }
      return null;
    });
  }, [size]);

  const tooltipContent: TooltipMessage[] = [
    [{ type: "plainText", content: size.toString() }],
  ];

  const anchorId: AnchorId = useMemo(() => ({ type: "discard" }), []);

  return (
    <>
      {skeletonCards}

      <div
        className="h-full w-auto absolute flex justify-center"
        style={{ top: size > 0 ? `-${size / 2.5}%` : "0%" }}
        {...(size > 0 ? handlersNonPinable : {})}
      >
        <AnimationAnchor id={anchorId} className="h-full w-full absolute" />

        <div
          className="h-full w-auto"
          style={{ opacity: size > 0 ? "100" : "0" }}
        >
          <PlayingCard cardId={null} initialIsFaceDown={true} />
        </div>
      </div>

      {isVisible && (
        <Tooltip
          title={t("discard_pile")}
          content={tooltipContent}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
});

export default DiscardPile;
