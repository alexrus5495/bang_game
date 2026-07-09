import { m } from "motion/react";
import type { PlayingCardMeta } from "../../../types";
import RoleCard from "../../cards/RoleCard";
import { CARD_CONTAINER_BORDER_RADIUS } from "../../cards/shared/constants";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CharacterCard from "../../cards/CharacterCard";
import PlayingCard from "../../cards/PlayingCard";
import DefaultWeaponCard from "../../cards/DefaultWeaponCard";
import CardSymbolDescription from "./CardSymbolDescription";
import RootPortal from "../../shared/RootPortal";
import React from "react";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";

const InspectCardTooltip = React.memo(
  ({
    cardId,
    type,
    isVisible,
    delay = 0.2,
  }: {
    cardId: string;
    type: "playingCardRef" | "charCardRef" | "roleCardRef";
    isVisible: boolean;
    delay?: number;
  }) => {
    const cardsMeta = useCardsMetaDataState()[0];
    if (!cardsMeta) return null;

    const content = (() => {
      switch (type) {
        case "playingCardRef":
          return cardsMeta.deckMeta[cardId] ?? {};
        case "charCardRef":
          return cardsMeta.charDeckMeta[cardId];
        case "roleCardRef":
          return cardsMeta.roleDeckMeta[cardId];
        default:
          throw new Error("Unhandled type in InspectCardTooltip");
      }
    })();

    if (!content) return null;

    const cardSymbols = extractSymbols(content as PlayingCardMeta);

    return (
      <RootPortal portalId={`inspect_card_tooltip`}>
        <m.div
          className="pointer-events-none z-[999] absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: delay, duration: 0.2 }}
        >
          {/* Screen dimmmer */}
          <m.div className="h-[100vh] w-[100vw] bg-black fixed top-0 left-0 pointer-events-none opacity-90"></m.div>

          {/* Tooltip */}
          <m.div
            className="flex items-center fixed pointer-events-none"
            style={{
              gap: sizeAdaptive(20),
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/*Card image */}
            <div
              className="flex flex-col justify-center items-center pointer-events-none"
              style={{
                borderRadius: CARD_CONTAINER_BORDER_RADIUS,
                height: sizeAdaptive(1.6),
              }}
            >
              {type === "roleCardRef" && <RoleCard cardId={cardId} />}
              {type === "charCardRef" && <CharacterCard cardId={cardId} />}
              {type === "playingCardRef" &&
                (cardId !== "colt45" ? (
                  <PlayingCard cardId={cardId} initialIsFaceDown={false} />
                ) : (
                  <DefaultWeaponCard />
                ))}
            </div>

            {/* Legend */}
            {cardSymbols && Array.from(cardSymbols).length > 0 && (
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
          </m.div>
        </m.div>
      </RootPortal>
    );
  },
);

const extractSymbols = (meta: PlayingCardMeta) => {
  const symbols = new Set<string>();

  const cardDescription = meta.description;

  if (!cardDescription) return null;

  for (const line of cardDescription) {
    for (const block of line) {
      if (block.type === "symbol" && !symbols.has(block.key)) {
        symbols.add(block.key);
      }
    }
  }

  return symbols;
};

export default InspectCardTooltip;
