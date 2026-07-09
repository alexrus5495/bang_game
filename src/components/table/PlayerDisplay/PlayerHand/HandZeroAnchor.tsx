import { useMemo } from "react";
import type { AnchorId } from "../../../../contexts/AnchorsContext";
import AnimationAnchor from "../../shared/AnimationAnchor";
import SkeletonCard from "../../../cards/SkeletonCard";
import { m } from "motion/react";

export default function HandZeroAnchor() {
  const anchorId: AnchorId = useMemo(
    () => ({
      type: "player-hand-zero",
    }),
    [],
  );

  return (
    <div className="w-auto h-full absolute z-0">
      <m.div
        className="w-auto h-full absolute"
        // react-doctor-disable-next-line no-array-index-as-key
        style={{ opacity: 0 }}
        initial={false}
      >
        <AnimationAnchor id={anchorId} className="w-full h-full absolute" />
        <SkeletonCard />;
      </m.div>
    </div>
  );
}
