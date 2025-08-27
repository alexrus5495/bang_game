import { useCardsMetaDataState } from "../../../hooks/useCardsMetaDataState";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { useTooltip } from "../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { getImageComponent } from "../../../lib/images";
import type {
  CardsMetaData,
  Player_PublicData,
  TooltipMessage,
} from "../../../types";
import Tooltip from "../Tooltip/Tooltip";

export default function CharPortrait({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const isEliminated = playerData.isEliminated;
  const { position, isVisible, handlersPinable, isPinned } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;
  const cardsMeta = useCardsMetaDataState()[0] as CardsMetaData;

  const tooltipContent: TooltipMessage[] = [
    [{ type: "charCardRef", content: cardsMeta.charDeckMeta[playerData.char] }],
  ];

  return (
    <>
      <div
        className="h-full aspect-square rounded-[35%] bg-[var(--WHITE)] relative overflow-hidden outline cursor-pointer"
        style={{
          borderColor: playerData.color,
          borderWidth: sizeAdaptive(180),
          outlineColor: "var(--BLACK)",
          outlineWidth: sizeAdaptive(400),
        }}
        {...handlersPinable}
      >
        {playerData.char &&
          getImageComponent(playerData.char, {
            className: "h-full w-full",
            draggable: false,
          })}

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
}
