import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";

export default function PlayerTypeIcon({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  return (
    <div
      className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] overflow-hidden"
      style={{
        borderWidth: sizeAdaptive(300),
      }}
    >
      {playerData.isAI ? (
        <img src="./icon-bot.png" draggable={false} />
      ) : (
        <img src="./icon-person.png" draggable={false} />
      )}
    </div>
  );
}
