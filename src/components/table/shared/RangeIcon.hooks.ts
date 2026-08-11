import { useMemo } from "react";
import type { PlayerSlice } from "./RangeIcon";
import type {
  CardsMetaData,
  PlayingCardMeta,
  TooltipMessage,
} from "../../../types";
import { defaultWeaponMeta } from "../../../config/defaultWeaponMeta";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import {
  useTranslation,
  type TranslateFn,
} from "../../../hooks/useTranslation";

export function useRangeInfo(player: PlayerSlice) {
  const t = useTranslation();
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  return useMemo(() => {
    const baseInfo = addBaseWeaponInfo(player, t, cardsMeta);

    const currentRange = baseInfo.currentRange;
    const tooltipContent = baseInfo.tooltipContent;

    return {
      range: currentRange,
      tooltipContent: tooltipContent,
    };
  }, [player, t, cardsMeta]);
}

function addBaseWeaponInfo(
  player: PlayerSlice,
  t: TranslateFn,
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
      content: `+${currentRange} ${t("tooltip_from")} `,
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
