import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { TooltipMessage } from "../../../../types";
import Tooltip from "../../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../../stores/localStateStore";
import React from "react";
import { useIsDragging } from "../../../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../../../lib/images";

const PlayerTypeIcon = React.memo(({ playerId }: { playerId: string }) => {
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const isDragging = useIsDragging();

  const isAI = useLocalStateStore(
    (state) => state.playersController.getPlayerById(playerId)?.isAI,
  );

  if (!isAI) return null;

  const tooltipContant: TooltipMessage[] = [
    [
      {
        type: "plainText",
        content: `${isAI ? locale["tooltip_bot"] : locale["tooltip_human"]}`,
      },
    ],
  ];

  return (
    <>
      <div
        className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow overflow-hidden"
        style={{
          cursor: isDragging ? "default" : "pointer",
          borderWidth: sizeAdaptive(300),
        }}
        {...handlersNonPinable}
      >
        {isAI
          ? getImageComponent("icon-bot", {
              draggable: false,
              alt: "robot icon",
            })
          : getImageComponent("icon-person", {
              draggable: false,
              alt: "person icon",
            })}
      </div>

      {isVisible && (
        <Tooltip
          title={locale.playerType}
          content={tooltipContant}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
});

export default PlayerTypeIcon;
