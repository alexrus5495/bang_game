import React, { useEffect, useState } from "react";
import CardBack from "./shared/CardBack";
import CardFace from "./shared/CardFace";
import CardScaler from "./shared/CardScaler";
import { m } from "motion/react";

const PlayingCard = React.memo(
  ({
    cardId,
    initialIsFaceDown,
    flipDelay,
  }: {
    cardId: string | null;
    initialIsFaceDown: boolean;
    flipDelay?: number;
  }) => {
    const [isFaceDown, setIsFaceDown] = useState(initialIsFaceDown);

    useEffect(() => {
      if (flipDelay) {
        const timer = setTimeout(() => {
          setIsFaceDown(false);
        }, flipDelay);

        return () => clearTimeout(timer);
      }
    }, [flipDelay]);

    return (
      <div className="h-full flex" style={{ perspective: "1000px" }}>
        <m.div
          className="h-full relative"
          initial={{ rotateY: initialIsFaceDown ? 180 : 0 }}
          animate={{
            rotateY: isFaceDown ? 180 : 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <m.div
            key="front"
            className="h-full absolute"
            style={{ backfaceVisibility: "hidden" }}
          >
            {cardId && (
              <CardScaler>
                <CardFace cardId={cardId} cardType={"playing"} />
              </CardScaler>
            )}
          </m.div>
          <m.div
            key="back"
            className="h-full"
            initial={{ rotateY: 180 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <CardScaler>
              <CardBack />
            </CardScaler>
          </m.div>
        </m.div>
      </div>
    );
  },
);

export default PlayingCard;
