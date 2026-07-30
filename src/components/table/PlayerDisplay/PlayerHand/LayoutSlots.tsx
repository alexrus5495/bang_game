import { useMemo } from "react";
import SkeletonCard from "../../../cards/SkeletonCard";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { useCardScale } from "../../../../hooks/useCardScale";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import { useDinamicHandSpacing } from "../../../../hooks/useDinamicHandSpacing";

type SlotData = {
  index: number;
  spacing: number;
  anchorType: "player-hand-slot" | "equipment-slot";
};

export default function LayoutSlots({
  quantity,
  containerWidth,
  anchorType,
  playerId,
}: {
  quantity: number;
  containerWidth: number;
  anchorType: "player-hand-slot" | "equipment-slot";
  playerId?: string;
}) {
  const slotIds = useMemo(
    () => Array.from({ length: quantity }, (_, i) => i.toString()),
    [quantity],
  );

  const { ref: scaleRef, scale } = useCardScale();

  const spacing = useDinamicHandSpacing(slotIds, containerWidth, scale);

  return (
    <div
      className="w-full h-full absolute z-0 pointer-events-none"
      ref={scaleRef}
    >
      {Array.from({ length: quantity }, (_, index) => (
        <Slot
          // react-doctor-disable-next-line no-array-index-as-key
          key={index}
          slotData={{ index, anchorType, spacing }}
          playerId={playerId}
        />
      ))}
    </div>
  );
}

function Slot({
  slotData,
  playerId,
}: {
  slotData: SlotData;
  playerId?: string | undefined;
}) {
  const anchorId: AnchorId = useMemo(() => {
    if (slotData.anchorType === "player-hand-slot") {
      const id: AnchorId = {
        type: "player-hand-slot",
        index: slotData.index,
      };
      return id;
    } else if (slotData.anchorType === "equipment-slot") {
      if (playerId === undefined)
        throw new Error(
          `Slot with type ${slotData.anchorType} requres playerID, but got undefined`,
        );
      const id: AnchorId = {
        type: "equipment-slot",
        playerId: playerId,
        index: slotData.index,
      };
      return id;
    } else {
      throw new Error(`Unsupported anchor type: ${slotData}`);
    }
  }, [slotData, playerId]);

  return (
    <div
      className="w-auto h-full absolute"
      // react-doctor-disable-next-line no-array-index-as-key
      key={slotData.index}
      style={{ left: `${slotData.spacing * slotData.index}px`, opacity: 0 }}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      <SkeletonCard />;
    </div>
  );
}
