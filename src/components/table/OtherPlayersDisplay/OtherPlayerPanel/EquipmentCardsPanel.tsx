import { motion } from "motion/react";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import PlayingCard from "../../../cards/PlayingCard";

export default function EquipmentCardsPanel({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const equippedCards = playerData.equipment;

  return (
    <div
      className="w-full h-full flex justify-center"
      style={{
        paddingTop: sizeAdaptive(200),
        paddingBottom: sizeAdaptive(200),
        gap: sizeAdaptive(200),
      }}
    >
      {equippedCards &&
        equippedCards.map((card) => (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PlayingCard
              key={card}
              cardId={card}
              initialIsFaceDown={false}
              initialIsInteractable={false}
            />
          </motion.div>
        ))}
    </div>
  );
}
