import React from "react";
import { useCardScale } from "../../../hooks/useCardScale";
import { CARD_CONTAINER_WIDTH } from "./constants";

type CardScalerProps = {
  children: React.ReactNode;
};

const CardScaler = React.memo(({ children }: CardScalerProps) => {
  const { ref: scaleRef, scale } = useCardScale();

  const cardWidth = CARD_CONTAINER_WIDTH * scale;

  return (
    <div
      className="h-full flex items-center justify-center"
      ref={scaleRef}
      style={{
        width: `${cardWidth}px`,
        transition: "opacity 0.1s",
      }}
    >
      <div className="origin-center" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
});

export default CardScaler;
