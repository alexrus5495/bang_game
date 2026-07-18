import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import React from "react";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import Tooltip from "../../Tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import { useDistanceInfo } from "./DistanceIcon.hooks";
import { useIsDragging } from "../../../../stores/hooks/localStateStore.hooks";

const DistanceIcon = React.memo(({ playerId }: { playerId: string }) => {
  const isDragging = useIsDragging();

  const {
    position,
    isVisible,
    isPinned,
    handlersNonPinable,
    handlersPinable,
    hasCardRef,
  } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const { distance, tooltipContent } = useDistanceInfo(playerId);

  return (
    <>
      <div
        className="h-full aspect-square relative"
        style={{ cursor: isDragging ? "default" : "pointer" }}
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-2"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {distance !== undefined && (
            <div className="h-full w-full text-center">{distance}</div>
          )}
        </div>
        <img
          src="./icon-distance.png"
          alt=""
          className="absolute top-[-60%] h-[70%] z-0"
          draggable={false}
        />
      </div>

      {isVisible && tooltipContent.length > 0 && (
        <Tooltip
          title={`${locale.distance} = ${distance}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </>
  );
});

export default DistanceIcon;
