import { useStore } from "zustand";
import { useRotatedPlayerIds } from "../../../../hooks/useRotatedPlayerIds";
import { useLocalStateStore } from "../../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import { socket } from "../../../../lib/socket";
import type { CardsMetaData, TooltipMessage } from "../../../../types";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useMemo } from "react";
import {
  useTranslation,
  type TranslateFn,
} from "../../../../hooks/useTranslation";

export function useDistanceInfo(playerId: string) {
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;
  const t = useTranslation();

  const { ids, eliminatedMap, clientData, playerData } =
    usePreparePlayersData(playerId);

  return useMemo(() => {
    if (!ids || !eliminatedMap) {
      return { distance: undefined, tooltipContent: [] as TooltipMessage[] };
    }

    const targetIndex = ids.indexOf(playerId);
    if (targetIndex === -1 || targetIndex === 0) {
      return { distance: 0, tooltipContent: [] as TooltipMessage[] };
    }

    const baseDistance = calculateBaseDistance(targetIndex, eliminatedMap, ids);

    return applyDistanceBonuses({
      baseDistance,
      t,
      clientData,
      cardsMeta,
      playerData,
    });
  }, [cardsMeta, ids, t, clientData, eliminatedMap, playerId, playerData]);
}

function usePreparePlayersData(playerId: string) {
  // 1. Get ordered list of players
  const ids = useRotatedPlayerIds();

  // 2. Map isEliminated for players
  const eliminatedMap = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const map: Record<string, boolean> = {};
      for (const p of state.players) {
        map[p.id] = p.flags.isEliminated;
      }
      return map;
    }),
  );

  const clientId = socket.id ?? "";
  const clientData = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.players.find((p) => p.id === clientId);
      if (!p) return null;
      return { char: p.char, equipment: p.equipment };
    }),
  );

  const playerData = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.players.find((p) => p.id === playerId);
      if (!p) return null;
      return { char: p.char, equipment: p.equipment };
    }),
  );

  return { ids, eliminatedMap, clientData, playerData };
}

function calculateBaseDistance(
  targetIndex: number,
  eliminatedMap: Record<string, boolean>,
  ids: string[],
) {
  // 1. Count alive players clockwise
  let clockwise = 0;
  for (let i = 1; i <= targetIndex; i++) {
    // If the player is not the target and they are dead, skip counting them
    if (i !== targetIndex && eliminatedMap[ids[i]]) continue;
    clockwise++;
  }

  // 2. Count alive players counter-clockwise
  let counterClockwise = 0;
  for (let i = ids.length - 1; i >= targetIndex; i--) {
    // If the player is not the target and they are dead, skip counting them
    if (i !== targetIndex && eliminatedMap[ids[i]]) continue;
    counterClockwise++;
  }

  // 3. Pick the shortest distance
  return Math.min(clockwise, counterClockwise);
}

function applyDistanceBonuses({
  baseDistance,
  t,
  clientData,
  cardsMeta,
  playerData,
}: {
  baseDistance: number;
  t: TranslateFn;
  clientData: { char: string; equipment: string[] } | null;
  cardsMeta: CardsMetaData;
  playerData: { char: string; equipment: string[] } | null;
}) {
  let distance = baseDistance;
  const tooltipContent: TooltipMessage[] = [
    [
      {
        type: "plainText",
        content: `${t("tooltip_baseDistance")}: ${distance}`,
      },
    ],
  ];

  // 1. Apply opponent-side bonuses
  if (playerData) {
    // Mustang card
    const mustangCard = playerData.equipment.find((item) =>
      item.startsWith("mustang_"),
    );

    if (mustangCard) {
      distance++;
      tooltipContent.push([
        { type: "plainText", content: `+1 ${t("tooltip_from")} ` },
        {
          type: "playingCardRef",
          content: cardsMeta.deckMeta[mustangCard],
        },
      ]);
    }

    // Paul Regret char
    if (playerData.char === "paul_regret") {
      distance++;
      tooltipContent.push([
        { type: "plainText", content: `+1 ${t("tooltip_from")} ` },
        {
          type: "charCardRef",
          content: cardsMeta.charDeckMeta["paul_regret"],
        },
      ]);
    }
  }

  //2. Apply client-side bonuses
  if (clientData) {
    // Scope card
    const scopeCard = clientData.equipment.find((item) =>
      item.startsWith("scope_"),
    );

    if (scopeCard) {
      distance--;
      tooltipContent.push([
        { type: "plainText", content: `-1 ${t("tooltip_from")} ` },
        { type: "playingCardRef", content: cardsMeta.deckMeta[scopeCard] },
      ]);
    }

    // Rose Doolan char
    if (clientData.char === "rose_doolan") {
      distance--;
      tooltipContent.push([
        { type: "plainText", content: `-1 ${t("tooltip_from")} ` },
        {
          type: "charCardRef",
          content: cardsMeta.charDeckMeta["rose_doolan"],
        },
      ]);
    }
  }

  return {
    distance: distance >= 0 ? distance : 0,
    tooltipContent,
  };
}
