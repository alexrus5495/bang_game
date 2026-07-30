import { useMemo } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import AnimationAnchor from "../../shared/AnimationAnchor";
import SkeletonCard from "../../../cards/SkeletonCard";

export default function HandZeroAnchor() {
  const anchorId: AnchorId = useMemo(
    () => ({
      type: "player-hand-zero",
    }),
    [],
  );

  return (
    <div className="w-auto h-full absolute z-0">
      <div
        className="w-auto h-full absolute"
        // react-doctor-disable-next-line no-array-index-as-key
        style={{ opacity: 0 }}
      >
        <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
        <SkeletonCard />;
      </div>
    </div>
  );
}
