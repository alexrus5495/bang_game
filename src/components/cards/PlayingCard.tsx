import { useEffect, useState } from "react";
import CardBack from "./shared/CardBack";
import CardFace from "./shared/CardFace";
import CardScaler from "./shared/CardScaler";
import { motion } from "motion/react";

export default function PlayingCard({
  cardId,
  initialIsFaceDown,
  initialIsInteractable,
  flipDelay,
}: {
  cardId: string | null;
  initialIsFaceDown: boolean;
  initialIsInteractable: boolean;
  flipDelay?: number;
}) {
  const [isFaceDown, setIsFaceDown] = useState(initialIsFaceDown);
  const [isInteractable, setIsInteractable] = useState(initialIsInteractable);

  useEffect(() => {
    if (flipDelay) {
      const timer = setTimeout(() => {
        setIsFaceDown(false);
      }, flipDelay);

      return () => clearTimeout(timer);
    }
  }, [flipDelay]);

  return (
    <div
      className="h-full flex"
      onClick={() => (isInteractable ? setIsFaceDown(!isFaceDown) : null)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="h-full relative"
        initial={{ rotateY: initialIsFaceDown ? 180 : 0 }}
        animate={{
          rotateY: isFaceDown ? 180 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          key="front"
          className="h-full absolute"
          style={{ backfaceVisibility: "hidden" }}
        >
          {cardId && (
            <CardScaler>
              <CardFace cardId={cardId} cardType={"playing"} />
            </CardScaler>
          )}
        </motion.div>
        <motion.div
          key="back"
          className="h-full"
          initial={{ rotateY: 180 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardScaler>
            <CardBack />
          </CardScaler>
        </motion.div>
      </motion.div>
    </div>
  );
}
