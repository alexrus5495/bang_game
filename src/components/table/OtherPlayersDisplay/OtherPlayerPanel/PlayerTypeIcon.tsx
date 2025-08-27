import { useSystemLocalization } from "../../../../hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData, TooltipMessage } from "../../../../types";
import Tooltip from "../../Tooltip/Tooltip";

export default function PlayerTypeIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const { position, isVisible, handlersNonPinable } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;

  const tooltipContant: TooltipMessage[] = [
    [
      {
        type: "plainText",
        content: `${playerData.isAI ? locale["tooltip_bot"] : locale["tooltip_human"]}`,
      },
    ],
  ];

  return (
    <>
      <div
        className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] overflow-hidden cursor-pointer"
        style={{
          borderWidth: sizeAdaptive(300),
        }}
        {...handlersNonPinable}
      >
        {playerData.isAI ? (
          <img src="./icon-bot.png" draggable={false} />
        ) : (
          <img src="./icon-person.png" draggable={false} />
        )}
      </div>

      {isVisible && (
        <Tooltip
          title={locale.playerType}
          content={tooltipContant}
          position={position}
          hasCardRef={false}
        />
      )}
    </>
  );
}
