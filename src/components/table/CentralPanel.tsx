import { useRef } from "react";
import { usePublicDataState } from "../../hooks/usePublicDataState";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Deck from "./CentralPanel/Deck";
import DeckPlacingMarker from "./CentralPanel/DeckPlacingMarker";
import CardPlayingArea from "./CentralPanel/CardPlayingArea";

export default function CentralPanel() {
  const publicData = usePublicDataState()[0];

  const deckRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="h-full w-full bg-fabricTexture border flex"
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

      <div className="h-[70%] w-[40%]" style={{ marginTop: sizeAdaptive(30) }}>
        <CardPlayingArea />
      </div>

      <div
        className="h-[70%] w-[30%] flex justify-center relative"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <DeckPlacingMarker variation="b" />
      </div>
    </div>
  );
}
