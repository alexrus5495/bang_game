import React, { useMemo } from "react";
import { useCardsMetaDataState } from "../../../stores/hooks/useCardsMetaDataState";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import type { CardsMetaData, TooltipMessage } from "../../../types";
import Tooltip from "../Tooltip/Tooltip";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import { useIsDragging } from "../../../stores/hooks/localStateStore.hooks";

const CharPortrait = React.memo(({ playerId }: { playerId: string }) => {
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
    if (!playerData?.char) return null;
    return getImageComponent(playerData.char, {
      className: "h-full w-full",
      draggable: false,
    });
  }, [playerData?.char]);

  const cardsMeta = (useCardsMetaDataState()[0] as CardsMetaData) ?? {};
  const { position, isVisible, handlersPinable, isPinned } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;

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

  if (!playerData) return null;

  return (
    <>
      <div
        className="h-full aspect-square rounded-[35%] bg-[var(--WHITE)] relative overflow-hidden outline"
        style={{
          cursor: isDragging ? "default" : "pointer",
          borderColor: color,
          borderWidth: sizeAdaptive(180),
          outlineColor: "var(--BLACK)",
          outlineWidth: sizeAdaptive(400),
        }}
        {...handlersPinable}
      >
        {imageElement}

        {isEliminated && (
          <div className="absolute inset-0 bg-[var(--RED)]/60" />
        )}
      </div>

      {isVisible && (
        <Tooltip
          title={locale.character}
          content={tooltipContent}
          position={position}
          hasCardRef={true}
          isPinned={isPinned}
        />
      )}
    </>
  );
});

export default CharPortrait;
