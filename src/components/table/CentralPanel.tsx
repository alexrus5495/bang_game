import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Deck from "./CentralPanel/Deck";
import DeckPlacingMarker from "./CentralPanel/DeckPlacingMarker";
import CardPlayingArea from "./CentralPanel/CardPlayingArea";
import DiscardPile from "./CentralPanel/DiscardPile";
import React from "react";

const CentralPanel = React.memo(() => {
  return (
    <div
      className="h-full w-full bg-fabricTexture border flex"
      style={{
        borderWidth: sizeAdaptive(200),
        borderColor: "var(--WHITE)",
      }}
    >
      <div
        className="h-[70%] w-[30%] flex justify-center relative z-[3]"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <DeckPlacingMarker variation="a" />
        <Deck />
      </div>

      <div className="h-[70%] w-[40%]" style={{ marginTop: sizeAdaptive(30) }}>
        <CardPlayingArea />
      </div>

      <div
        className="h-[70%] w-[30%] flex justify-center relative z-[3]"
        style={{ marginTop: sizeAdaptive(30) }}
      >
        <DeckPlacingMarker variation="b" />
        <DiscardPile />
      </div>
    </div>
  );
});

export default CentralPanel;
