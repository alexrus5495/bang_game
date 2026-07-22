import { sizeAdaptive } from "../../lib/css/cssFunctions";
import CardPlayArea from "./CentralPanel/CardPlayArea";
import Deck from "./CentralPanel/Deck";
import DeckPlacingMarker from "./CentralPanel/DeckPlacingMarker";
import DiscardPile from "./CentralPanel/DiscardPile";
import React from "react";
import { twMerge } from "tailwind-merge";

const CentralPanel = React.memo(({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge("bg-fabricTexture border flex", className)}
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
        <CardPlayArea />
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
