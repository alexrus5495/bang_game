import { m } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { PlayingCardMeta } from "../../../types";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import PlayingCardItem from "./PlayingCardItem";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import React from "react";

const EquipmentCardsPanel = React.memo(({ playerId }: { playerId: string }) => {
  const cardsMeta = useCardsMetaDataState()[0];
  const equippedCards = useStore(
    useLocalStateStore,
    useShallow(
      (state) =>
        state.playersController.getPlayerById(playerId)?.equipment ?? [],
    ),
  );

  if (!equippedCards) return null;

  return (
    <>
      <m.div
        className="w-[90%] h-[90%] flex justify-center relative z-[1]"
        style={{
          gap: sizeAdaptive(200),
          paddingTop: sizeAdaptive(250),
        }}
      >
        {equippedCards &&
          equippedCards.map((card) => (
            <div key={card}>
              <PlayingCardItem
                cardId={card}
                cardMeta={cardsMeta?.deckMeta[card] as PlayingCardMeta}
                tooltipDelay={0.4}
              />
            </div>
          ))}
      </m.div>
    </>
  );
});

export default EquipmentCardsPanel;
