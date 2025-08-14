import { useSystemLocalization } from "../../../../hooks/useSystemLocalization";
import { useTooltip } from "../../../../hooks/useTooltip";
import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import Tooltip from "../../Tooltip";

export default function PlayerTypeIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const { position, isVisible, handlers } = useTooltip();
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <>
      <div
        className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] overflow-hidden cursor-pointer"
        style={{
          borderWidth: sizeAdaptive(300),
        }}
        {...handlers}
      >
        {playerData.isAI ? (
          <img src="./icon-bot.png" draggable={false} />
        ) : (
          <img src="./icon-person.png" draggable={false} />
        )}
      </div>

      {isVisible && (
        <Tooltip
          title={
            playerData.isAI ? locale["tooltip_bot"] : locale["tooltip_human"]
          }
          content={undefined}
          position={position}
        />
      )}
    </>
  );
}
