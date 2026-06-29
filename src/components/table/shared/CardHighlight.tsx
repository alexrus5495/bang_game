import { m } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { CARD_CONTAINER_BORDER_RADIUS } from "../../cards/shared/constants";

export default function CardHighlight({
  condition,
  scaleFactor,
  color,
}: {
  condition: () => boolean;
  scaleFactor: number;
  color: string;
}) {
  return (
    <m.div
      className="h-full w-full absolute"
      initial={{ opacity: 0 }}
      animate={{
        opacity: condition() ? 0.7 : 0,
        boxShadow: condition()
          ? `0 0 ${sizeAdaptive(scaleFactor)} ${color}`
          : "none",
      }}
      transition={{ duration: 0.3 }}
      style={{ borderRadius: CARD_CONTAINER_BORDER_RADIUS }}
    ></m.div>
  );
}
