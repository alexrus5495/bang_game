import React from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useTooltip } from "../../../hooks/useTooltip";
import Tooltip from "../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { useRangeInfo } from "./RangeIcon.hooks";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { useIsDragging } from "../../../stores/hooks/localStateStore.hooks";
import { getImageComponent } from "../../../lib/images";

export type PlayerSlice = {
  char: string;
  weaponCard: string;
  weaponRange: number;
  equipment: string[];
};

const RangeIcon = React.memo(({ playerId }: { playerId: string }) => {
  const player = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.playersController.getPlayerById(playerId);
      if (!p) return null;
      return {
        char: p.char,
        weaponCard: p.weapon.card,
        weaponRange: p.weapon.range,
        equipment: p.equipment,
      };
    }),
  );
  if (!player) return null;

  return <RangeIconInner player={player} />;
});

const RangeIconInner = React.memo(({ player }: { player: PlayerSlice }) => {
  const {
    position,
    isVisible,
    isPinned,
    handlersNonPinable,
    handlersPinable,
    hasCardRef,
  } = useTooltip();

  const locale = useSystemLocalization() as Record<string, string>;
  const isDragging = useIsDragging();
  const { range, tooltipContent } = useRangeInfo(player);

  return (
    <div className="z-0">
      <div
        className="h-full aspect-square relative"
        style={{ cursor: isDragging ? "default" : "pointer" }}
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {range !== undefined && (
            <div className="h-full w-full text-center">{range}</div>
          )}
        </div>
        {getImageComponent("icon-crosshair", {
          className: "absolute z-0 top-[-65%] h-[100%]",
          draggable: false,
        })}
      </div>

      {isVisible && tooltipContent.length > 0 && (
        <Tooltip
          title={`${locale.range} = ${range}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </div>
  );
});

export default RangeIcon;
