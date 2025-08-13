import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import { usePublicDataState } from "../../../../hooks/usePublicDataState";
import { processPlayersArray } from "../../../../lib/gameData/processPlayersArray";

export default function DistanceIcon({
  playerData,
  clientId,
}: {
  playerData: Player_PublicData;
  clientId: string | undefined;
}) {
  const publicData = usePublicDataState();

  const calculateDistance = () => {
    if (!publicData?.playersPublicData || !clientId) return;
    const playersArray = processPlayersArray(
      publicData.playersPublicData,
      clientId,
    );
    if (!playersArray) return;

    let distance = 0;

    for (const player of playersArray) {
      if (player.id !== playerData.id) {
        if (!player.isEliminated) distance++;
      } else break;
    }

    const mustangCardRegex = new RegExp(`^mustang_\\d+$`);
    if (playerData.equipment.some((item) => mustangCardRegex.test(item)))
      distance++;

    return distance;
  };

  const distance = calculateDistance();

  return (
    <div className="h-full aspect-sqare">
      <div
        className="h-[100%] aspect-square border rounded-[50%] bg-[var(--BEIGE)] relative z-2"
        style={{
          borderWidth: sizeAdaptive(300),
        }}
      >
        {distance && (
          <div
            className="h-full w-full text-center"
            style={{
              fontSize: sizeAdaptive(25),
              lineHeight: sizeAdaptive(25),
            }}
          >
            {distance}
          </div>
        )}
      </div>
      <img
        src="./icon-distance.png"
        alt=""
        className="absolute top-[-60%] right-[12.5%] h-[70%] z-0"
        draggable={false}
      />
    </div>
  );
}
