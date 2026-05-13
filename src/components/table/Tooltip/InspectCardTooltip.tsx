import { motion } from "motion/react";
import type {
  CharacterCardMeta,
  PlayingCardMeta,
  RoleCardMeta,
} from "../../../types";
import RoleCard from "../../cards/RoleCard";
import { CARD_CONTAINER_BORDER_RADIUS } from "../../cards/shared/constants";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CharacterCard from "../../cards/CharacterCard";
import PlayingCard from "../../cards/PlayingCard";
import DefaultWeaponCard from "../../cards/DefaultWeaponCard";
import CardSymbolDescription from "./CardSymbolDescription";
import RootPortal from "../../shared/RootPortal";

export default function InspectCardTooltip({
  content,
  type,
  delay = 0.2,
}: {
  content: PlayingCardMeta | CharacterCardMeta | RoleCardMeta;
  type: "playingCardRef" | "charCardRef" | "roleCardRef";
  delay?: number;
}) {
  const cardSymbols = extractSymbols(content as PlayingCardMeta);

  return (
    <RootPortal portalId={"inspect_card_tooltip"}>
      {/* Screen dimmmer */}
      <motion.div
        className="h-[100vh] w-[100vw] z-999 bg-black fixed top-0 left-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: delay, duration: 0.2 }}
      ></motion.div>

      {/* Tooltip */}
      <motion.div
        className="z-[999] flex items-center fixed pointer-events-none"
        style={{
          gap: sizeAdaptive(20),
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay, duration: 0.2 }}
      >
        {/*Card image */}
        <div
          className="flex flex-col justify-center items-center pointer-events-none"
          style={{
            borderRadius: CARD_CONTAINER_BORDER_RADIUS,
            height: sizeAdaptive(1.6),
          }}
        >
          {type === "roleCardRef" && <RoleCard cardId={content.cardTypeId} />}

          {type === "charCardRef" && (
            <CharacterCard cardId={content.cardTypeId} />
          )}
          {type === "playingCardRef" &&
            (content.cardTypeId !== "colt45" ? (
              "cardInstanceId" in content && (
                <PlayingCard
                  cardId={content.cardInstanceId}
                  initialIsFaceDown={false}
                />
              )
            ) : (
              <DefaultWeaponCard />
            ))}
        </div>

        {/* Legend */}
        {Array.from(cardSymbols).length > 0 && (
          <div
            className="flex flex-col h-fit pointer-events-none"
            style={{ gap: sizeAdaptive(30), width: sizeAdaptive(1.7) }}
          >
            {Array.from(cardSymbols).map(
              (symbol: string) =>
                symbol !== "equals" && (
                  <div key={symbol}>
                    <CardSymbolDescription
                      symbol={symbol}
                      cardIsWeapon={content.decorations.length === 0}
                    />
                  </div>
                ),
            )}
          </div>
        )}
      </motion.div>
    </RootPortal>
  );
}

const extractSymbols = (meta: PlayingCardMeta) => {
  const symbols = new Set<string>();

  const cardDescription = meta.description;

  for (const line of cardDescription) {
    for (const block of line) {
      if (block.type === "symbol" && !symbols.has(block.key)) {
        symbols.add(block.key);
      }
    }
  }

  return symbols;
};
