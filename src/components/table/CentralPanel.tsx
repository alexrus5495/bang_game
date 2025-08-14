import { usePublicDataState } from "../../hooks/usePublicDataState";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import PlayingCard from "../cards/PlayingCard";
import CardScaler from "../cards/shared/CardScaler";
import {
  CARD_CONTAINER_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_CONTAINER_WIDTH,
} from "../cards/shared/constants";
import SkeletonCard from "../cards/SkeletonCard";

export default function CentralPanel() {
  const publicData = usePublicDataState()[0];

  return (
    <div
      className="h-[35%] w-[40%] bg-white absolute top-[22%] bg-fabricTexture border flex"
      style={{
        borderWidth: sizeAdaptive(200),
        borderColor: "var(--WHITE)",
      }}
    >
      <div
        className="h-[70%] w-[30%] flex justify-center relative"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <CardScaler>
          <div
            style={{
              height: `${CARD_CONTAINER_HEIGHT}px`,
              width: `${CARD_CONTAINER_WIDTH}px`,
              borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
              borderWidth: sizeAdaptive(70),
              borderColor: "var(--WHITE)",
            }}
          ></div>
        </CardScaler>
      </div>

      <div className="h-full w-[40%] border border-white"></div>

      <div
        className="h-[70%] w-[30%] flex justify-center relative"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <CardScaler>
          <div
            style={{
              height: `${CARD_CONTAINER_HEIGHT}px`,
              width: `${CARD_CONTAINER_WIDTH}px`,
              borderRadius: `${CARD_CONTAINER_BORDER_RADIUS}px`,
              borderWidth: sizeAdaptive(70),
              borderColor: "var(--WHITE)",
            }}
          ></div>
        </CardScaler>

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
      </div>
    </div>
  );
}
