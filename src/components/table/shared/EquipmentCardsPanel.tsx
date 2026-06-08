import { motion } from "motion/react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { Player_PublicData, PlayingCardMeta } from "../../../types";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import PlayingCardItem from "./PlayingCardItem";

export default function EquipmentCardsPanel({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const equippedCards = playerData.equipment;
  const cardsMeta = useCardsMetaDataState()[0];

  return (
    <>
      <motion.div
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
      </motion.div>
    </>
  );
}
