import { useEffect, useRef } from "react";
import { useCardCoordsState } from "../../hooks/useCardCoordsState";
import { usePublicDataState } from "../../hooks/usePublicDataState";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Deck from "./CentralPanel/Deck";
import DeckPlacingMarker from "./CentralPanel/DeckPlacingMarker";

export default function CentralPanel() {
  const publicData = usePublicDataState()[0];
  const [cardCoords, setCardCoords] = useCardCoordsState();

  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (deckRef.current) {
      const deckElement = deckRef.current.getBoundingClientRect();

      const topCardCoords = {
        x: cardCoords.topCard.x,
        y: cardCoords.topCard.y,
        height: deckElement.height,
      };

      setCardCoords((prev) => ({
        ...prev,
        topCard: topCardCoords,
      }));
    }
  }, [cardCoords.topCard.x, cardCoords.topCard.y, setCardCoords]);

  return (
    <div
      className="h-[35%] w-[40%] bg-white absolute top-[22%] bg-fabricTexture border flex"
      style={{
        borderWidth: sizeAdaptive(200),
        borderColor: "var(--WHITE)",
      }}
    >
      <div
        ref={deckRef}
        className="h-[70%] w-[30%] flex justify-center relative"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <DeckPlacingMarker variation="a" />
        <Deck publicData={publicData} />
      </div>

      <div className="h-full w-[40%] "></div>

      <div
        className="h-[70%] w-[30%] flex justify-center relative"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <DeckPlacingMarker variation="b" />
      </div>
    </div>
  );
}
