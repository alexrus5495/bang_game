import { useEffect, useRef } from "react";
import { useCardCoordsState } from "../../../hooks/useCardCoordsState";
import type { PublicData } from "../../../types";
import PlayingCard from "../../cards/PlayingCard";
import SkeletonCard from "../../cards/SkeletonCard";

export default function Deck({
  publicData,
}: {
  publicData: PublicData | null;
}) {
  const [cardCoords, setCardCoords] = useCardCoordsState();
  const topCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCoords = () => {
      if (topCardRef.current && publicData && publicData.deckLength > 0) {
        const rect = topCardRef.current.getBoundingClientRect();

        const topCardCoords = {
          x: rect.left,
          y: rect.top,
          height: cardCoords.topCard.height,
        };

        setCardCoords((prev) => ({
          ...prev,
          topCard: topCardCoords,
        }));
      } else {
        setCardCoords((prev) => ({
          ...prev,
          topCard: { x: null, y: null, height: null },
        }));
      }
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);

    return () => {
      window.removeEventListener("resize", updateCoords);
    };
  }, [publicData, setCardCoords, cardCoords.topCard.height]);

  return (
    <>
      {publicData &&
        publicData.deckLength > 0 &&
        Array.from({ length: publicData.deckLength }, (_, index) => {
          if (index % 2 === 0 && index !== publicData.deckLength - 1)
            return (
              <div
                key={index}
                className="h-full w-full absolute flex justify-center"
                style={{ top: `-${index / 2.5}%` }}
              >
                <SkeletonCard />
              </div>
            );
          else if (index === publicData.deckLength - 1)
            return (
              <div
                key={index}
                ref={topCardRef}
                className="h-full w-auto absolute flex justify-center"
                style={{ top: `-${(publicData.deckLength - 1) / 2.5}%` }}
              >
                <PlayingCard
                  cardId={null}
                  initialIsFaceDown={true}
                  initialIsInteractable={false}
                />
              </div>
            );
        })}
    </>
  );
}
