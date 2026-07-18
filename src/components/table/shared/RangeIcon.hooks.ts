import { useMemo } from "react";
import type { PlayerSlice } from "./RangeIcon";
import type {
  CardsMetaData,
  PlayingCardMeta,
  TooltipMessage,
} from "../../../types";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { defaultWeaponMeta } from "../../../config/defaultWeaponMeta";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";

export function useRangeInfo(player: PlayerSlice) {
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  return useMemo(() => {
    const baseInfo = addBaseWeaponInfo(player, locale, cardsMeta);

    let currentRange = baseInfo.currentRange;
    const tooltipContent = baseInfo.tooltipContent;

    currentRange = checkForBonuses(
      player,
      currentRange,
      tooltipContent,
      locale,
      cardsMeta,
    );

    return {
      range: currentRange,
      tooltipContent: tooltipContent,
    };
  }, [player, locale, cardsMeta]);
}

function addBaseWeaponInfo(
  player: PlayerSlice,
  locale: Record<string, string>,
  cardsMeta: CardsMetaData,
) {
  const weapon = {
    card: player.weaponCard,
    range: player.weaponRange,
  };

  const currentRange = weapon.range;

  const tooltipContent: TooltipMessage[] = [];

  // 1. Add base weapon range details
  tooltipContent.push([
    {
      type: "plainText",
      content: `+${currentRange} ${locale["tooltip_from"]} `,
    },
    {
      type: "playingCardRef",
      content:
        weapon.card === "colt45"
          ? (defaultWeaponMeta as Omit<
              PlayingCardMeta,
              "rankAndSuit" | "cardInstanceId" | "effect" | "_range"
            >)
          : cardsMeta.deckMeta[weapon.card],
    },
  ]);

  return { currentRange, tooltipContent };
}

function checkForBonuses(
  player: PlayerSlice,
  currentRange: number,
  tooltipContent: TooltipMessage[],
  locale: Record<string, string>,
  cardsMeta: CardsMetaData,
) {
  let updatedRange = currentRange;

  // Check for scope card
  updatedRange = checkForScope(
    player,
    updatedRange,
    tooltipContent,
    locale,
    cardsMeta,
  );

  // Check for Rose Doolan char
  updatedRange = checkForDoolanChar(
    player,
    currentRange,
    tooltipContent,
    locale,
    cardsMeta,
  );

  return updatedRange;
}

function checkForScope(
  player: PlayerSlice,
  currentRange: number,
  tooltipContent: TooltipMessage[],
  locale: Record<string, string>,
  cardsMeta: CardsMetaData,
) {
  let updatedRange = currentRange;
  const scopeCard = player.equipment.find((item) => item.startsWith("scope_"));

  if (scopeCard) {
    updatedRange++;
    tooltipContent.push([
      { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
      { type: "playingCardRef", content: cardsMeta.deckMeta[scopeCard] },
    ]);
  }
  return updatedRange;
}

function checkForDoolanChar(
  player: PlayerSlice,
  currentRange: number,
  tooltipContent: TooltipMessage[],
  locale: Record<string, string>,
  cardsMeta: CardsMetaData,
) {
  let updatedRange = currentRange;

  if (player!.char === "rose_doolan") {
    updatedRange++;
    tooltipContent.push([
      { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
      {
        type: "charCardRef",
        content: cardsMeta.charDeckMeta["rose_doolan"],
      },
    ]);
  }

  return updatedRange;
}
