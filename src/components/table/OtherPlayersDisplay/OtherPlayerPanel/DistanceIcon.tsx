import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { CardsMetaData, TooltipMessage } from "../../../../types";
import React, { useMemo } from "react";
import { useSystemLocalization } from "../../../../stores/hooks/useSystemLocalization";
import Tooltip from "../../Tooltip/Tooltip";
import { useTooltip } from "../../../../hooks/useTooltip";
import { useCardsMetaDataState } from "../../../../stores/hooks/useCardsMetaDataState";
import { useSocket } from "../../../../hooks/useSocket";
import { useLocalStateStore } from "../../../../stores/localStateStore";
import { useRotatedPlayerIds } from "../../../../hooks/useRotatedPlayerIds";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

const DistanceIcon = React.memo(({ playerId }: { playerId: string }) => {
  const { socket } = useSocket();
  const clientId = socket.id!;

  const {
    position,
    isVisible,
    isPinned,
    handlersNonPinable,
    handlersPinable,
    hasCardRef,
  } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

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

  // 3. Get clinet data for bonuses
  const clientData = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.players.find((p) => p.id === clientId);
      if (!p) return null;
      return { char: p.char, equipment: p.equipment };
    }),
  );

  // 4. Calculate distance and fill the tooltip
  const { distance, tooltipContent } = useMemo(() => {
    if (!ids || !eliminatedMap) {
      return { distance: undefined, tooltipContent: [] as TooltipMessage[] };
    }

    const targetIndex = ids.indexOf(playerId);
    if (targetIndex === -1 || targetIndex === 0) {
      return { distance: 0, tooltipContent: [] as TooltipMessage[] };
    }

    // 1. Count alive players clockwise
    let clockwise = 0;
    for (let i = 1; i <= targetIndex; i++) {
      // Если это не целевой игрок и он мертв — не считаем его
      if (i !== targetIndex && eliminatedMap[ids[i]]) continue;
      clockwise++;
    }

    // 2. Count alive players counterClockwise
    let counterClockwise = 0;
    for (let i = ids.length - 1; i >= targetIndex; i--) {
      // Если это не целевой игрок и он мертв — не считаем его
      if (i !== targetIndex && eliminatedMap[ids[i]]) continue;
      counterClockwise++;
    }

    // 3. Pick the shortest distance
    let result = Math.min(clockwise, counterClockwise);

    const newTooltipContent: TooltipMessage[] = [
      [
        {
          type: "plainText",
          content: `${locale["tooltip_baseDistance"]}: ${result}`,
        },
      ],
    ];

    // Check for bonuses
    if (clientData) {
      const mustangCard = clientData.equipment.find((item) =>
        item.startsWith("mustang_"),
      );

      if (mustangCard) {
        result++;
        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "playingCardRef",
            content: cardsMeta.deckMeta[mustangCard],
          },
        ]);
      }

      if (clientData.char === "paul_regret") {
        result++;
        newTooltipContent.push([
          { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
          {
            type: "charCardRef",
            content: cardsMeta.charDeckMeta["paul_regret"],
          },
        ]);
      }
    }

    return {
      distance: result,
      tooltipContent: newTooltipContent,
    };
  }, [ids, eliminatedMap, playerId, clientData, locale, cardsMeta]);

  return (
    <>
      <div
        className="h-full aspect-square cursor-pointer relative"
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-2"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {distance !== undefined && (
            <div className="h-full w-full text-center">{distance}</div>
          )}
        </div>
        <img
          src="./icon-distance.png"
          alt=""
          className="absolute top-[-60%] right-[12.5%] h-[70%] z-0"
          draggable={false}
        />
      </div>

      {isVisible && tooltipContent.length > 0 && (
        <Tooltip
          title={`${locale.distance} = ${distance}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </>
  );
});

export default DistanceIcon;
