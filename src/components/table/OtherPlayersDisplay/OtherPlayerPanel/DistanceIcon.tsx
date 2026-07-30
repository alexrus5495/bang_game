import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import React from "react";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import Tooltip from "../../Tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import { useDistanceInfo } from "./DistanceIcon.hooks";
import { useIsDragging } from "../../../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../../../lib/images";
import { m } from "motion/react";

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
        <m.div
          key={distance}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{
            duration: 0.35,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
          className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-2"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {distance !== undefined && (
            <div className="h-full w-full text-center">{distance}</div>
          )}
        </m.div>

        {getImageComponent("icon-distance", {
          className: "absolute top-[-60%] h-[70%] z-0",
          draggable: false,
        })}
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
