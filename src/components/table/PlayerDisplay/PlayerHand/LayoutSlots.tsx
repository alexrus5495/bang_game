import { useMemo } from "react";
import SkeletonCard from "../../../cards/SkeletonCard";
import AnimationAnchor from "../../shared/AnimationAnchor";
import { useCardScale } from "../../../../hooks/useCardScale";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import { useDinamicHandSpacing } from "../../../../hooks/useDinamicHandSpacing";

export default function LayoutSlots({
  quantity,
  containerWidth,
}: {
  quantity: number;
  containerWidth: number;
}) {
  const slotIds = useMemo(
    () => Array.from({ length: quantity }, (_, i) => i.toString()),
    [quantity],
  );

  const { ref: scaleRef, scale } = useCardScale();

  const spacing = useDinamicHandSpacing(slotIds, containerWidth, scale);

  return (
    <div className="w-full h-full absolute z-0" ref={scaleRef}>
      {Array.from({ length: quantity }, (_, index) => (
        <Slot
          // react-doctor-disable-next-line no-array-index-as-key
          key={index}
          index={index}
          spacing={spacing}
        />
      ))}
    </div>
  );
}

type SlotType = {
  index: number;
  spacing: number;
};

function Slot({ index, spacing }: SlotType) {
  const anchorId: AnchorId = useMemo(
    () => ({
      type: "player-hand-slot",
      index,
    }),
    [index],
  );

  return (
    <div
      className="w-auto h-full absolute"
      // react-doctor-disable-next-line no-array-index-as-key
      key={index}
      style={{ left: `${spacing * index}px`, opacity: 0 }}
    >
      <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
      <SkeletonCard />;
    </div>
  );
}
