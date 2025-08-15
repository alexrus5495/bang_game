import type { PublicData } from "../../../types";
import PlayingCard from "../../cards/PlayingCard";
import SkeletonCard from "../../cards/SkeletonCard";

export default function Deck({
  publicData,
}: {
  publicData: PublicData | null;
}) {
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
        })}

      {publicData && publicData.deckLength > 0 && (
        <div
          className="h-full w-full absolute flex justify-center"
          style={{ top: `-${(publicData.deckLength - 1) / 2.5}%` }}
        >
          <PlayingCard
            cardId={null}
            initialIsFaceDown={true}
            initialIsInteractable={false}
          />
        </div>
      )}
    </>
  );
}
