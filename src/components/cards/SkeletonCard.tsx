import React from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import CardScaler from "./shared/CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "./shared/constants";

const SkeletonCard = React.memo(() => {
  return (
    <CardScaler>
      <div
        className="shadow bg-[var(--WHITE)] relative"
        style={{
          height: `${CARD_CONTAINER_HEIGHT}px`,
          width: `${CARD_CONTAINER_WIDTH}px`,
          borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
          borderWidth: sizeAdaptive(350),
          borderColor: "var(--BLACK)",
        }}
      ></div>
    </CardScaler>
  );
});

export default SkeletonCard;
