import React, { useMemo } from "react";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type {
  CardsMetaData,
  PlayingCardMeta,
  TooltipMessage,
} from "../../../types";
import { useTooltip } from "../../../hooks/useTooltip";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import Tooltip from "../Tooltip/Tooltip";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import { defaultWeaponMeta } from "../../../config/defaultWeaponMeta";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { useDragDropStore } from "../../../stores/dragDropStore";

type PlayerSlice = {
  char: string;
  weaponCard: string;
  weaponRange: number;
  hasScope: boolean;
};

const RangeIcon = React.memo(({ playerId }: { playerId: string }) => {
  const player = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.playersController.getPlayerById(playerId);
      if (!p) return null;
      return {
        char: p.char,
        weaponCard: p.weapon.card,
        weaponRange: p.weapon.range,
        hasScope: p.equipment.some((item) => item.startsWith("scope_")),
      };
    }),
  );
  if (!player) return null;

  return <RangeIconInner player={player} />;
});

const RangeIconInner = React.memo(({ player }: { player: PlayerSlice }) => {
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
  const isDragging = useDragDropStore((state) => state.isDragging);

  const { range, tooltipContent } = useMemo(() => {
    const weapon = {
      card: player.weaponCard,
      range: player.weaponRange,
    };
    const equipment = player.hasScope
      ? ["scope_scope"] // Mock value for finder operations
      : [];

    let currentRange = weapon.range;

    const newTooltipContent: TooltipMessage[] = [];

    // 1. Add base weapon range details
    newTooltipContent.push([
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

    // 2. Check if the player has a Scope equipped
    const scopeCard = equipment.find((item) => item.startsWith("scope_"));

    if (scopeCard) {
      currentRange++;
      newTooltipContent.push([
        { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
        { type: "playingCardRef", content: cardsMeta.deckMeta[scopeCard] },
      ]);
    }

    // 3. Check for Rose Doolan character passive ability
    if (player!.char === "rose_doolan") {
      currentRange++;
      newTooltipContent.push([
        { type: "plainText", content: `+1 ${locale["tooltip_from"]} ` },
        {
          type: "charCardRef",
          content: cardsMeta.charDeckMeta["rose_doolan"],
        },
      ]);
    }

    return {
      range: currentRange,
      tooltipContent: newTooltipContent,
    };
  }, [player, locale, cardsMeta]);
  return (
    <>
      <div
        className="h-full aspect-square relative"
        style={{ cursor: isDragging ? "default" : "pointer" }}
        {...(hasCardRef(tooltipContent) ? handlersPinable : handlersNonPinable)}
      >
        <div
          className="h-[100%] aspect-square border rounded-[50%] bg-paperTexture-yellow relative z-1"
          style={{
            borderWidth: sizeAdaptive(300),
          }}
        >
          {range !== undefined && (
            <div className="h-full w-full text-center">{range}</div>
          )}
        </div>
        <img
          src="./icon-crosshair.png"
          alt=""
          className="absolute z-0 top-[-65%] h-[100%]"
          draggable={false}
        />
      </div>

      {isVisible && tooltipContent.length > 0 && (
        <Tooltip
          title={`${locale.range} = ${range}`}
          content={tooltipContent}
          position={position}
          hasCardRef={hasCardRef(tooltipContent)}
          isPinned={isPinned}
        />
      )}
    </>
  );
});

export default RangeIcon;
