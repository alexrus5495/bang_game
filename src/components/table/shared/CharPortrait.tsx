import React, { useMemo } from "react";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import type { CardsMetaData, TooltipMessage } from "../../../types";
import Tooltip from "../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import { useIsDragging } from "../../../stores/hooks/localStateStore.hooks";
import AnimationAnchor from "./AnimationAnchor";
import type { AnchorId } from "../../../contexts/AnchorsContext";
import { useTranslation } from "../../../hooks/useTranslation";

const CharPortrait = React.memo(
  ({
    playerId,
    tooltipDisabled = false,
  }: {
    playerId: string;
    tooltipDisabled?: boolean;
  }) => {
    const t = useTranslation();
    const playerData = useLocalStateStore(
      useShallow((state) => {
        const p = state.players.find((player) => player.id === playerId);
        if (!p) return null;
        return {
          char: p.char,
          isEliminated: p.flags.isEliminated,
          color: p.color,
        };
      }),
    );

    const isDragging = useIsDragging();

    const imageElement = useMemo(() => {
      if (!playerData?.char)
        return getImageComponent("icon-hourglass", {
          className: "h-[55%]",
          draggable: false,
        });
      return getImageComponent(playerData.char, {
        className: "h-full w-full",
        draggable: false,
      });
    }, [playerData?.char]);

    const cardsMeta = (useCardsMetaDataState()[0] as CardsMetaData) ?? {};
    const { position, isVisible, handlersPinable, isPinned } = useTooltip();

    const { char, isEliminated, color } = playerData ?? {
      char: "",
      isEliminated: false,
      color: "",
    };

    const tooltipContent: TooltipMessage[] = useMemo(
      () =>
        cardsMeta.charDeckMeta
          ? [[{ type: "charCardRef", content: cardsMeta.charDeckMeta[char] }]]
          : [],
      [cardsMeta.charDeckMeta, char],
    );

    const anchorId: AnchorId = { type: "player-portrait", playerId };

    if (!playerData) return null;

    return (
      <>
        <div
          className="h-full aspect-square rounded-[35%] bg-paperTexture-stockalike relative outline overflow-hidden flex justify-center items-center"
          style={{
            cursor: isDragging || tooltipDisabled ? "default" : "pointer",
            borderColor: color,
            borderWidth: sizeAdaptive(180),
            outlineColor: "var(--BLACK)",
            outlineWidth: sizeAdaptive(400),
          }}
          {...handlersPinable}
        >
          <AnimationAnchor id={anchorId} className="h-full w-full absolute" />

          {imageElement}

          {isEliminated && (
            <div className="absolute inset-0 bg-[var(--RED)]/60" />
          )}
        </div>

        {isVisible && !tooltipDisabled && (
          <Tooltip
            title={t("character")}
            content={tooltipContent}
            position={position}
            hasCardRef={true}
            isPinned={isPinned}
          />
        )}
      </>
    );
  },
);

export default CharPortrait;
