import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import Bullets from "../../shared/Bullets";
import DistanceIcon from "./DistanceIcon";
import HandIcon from "../../shared/HandIcon";
import PlayerTypeIcon from "./PlayerTypeIcon";
import RangeIcon from "../../shared/RangeIcon";
import { AnimationAnchor } from "../../shared/AnimationAnchor";

export default function InfoIcons({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  if (!playerData.id) return null;
  return (
    <div
      className="absolute h-full w-[81%] flex"
      style={{
        top: "-50%",
        right: "-5%",
      }}
    >
      <div
        className="h-[80%] w-[60%] flex items-center relative"
        style={{
          bottom: "10%",
          gap: sizeAdaptive(300),
        }}
      >
        <Bullets playerData={playerData} />
      </div>
      <div
        className="w-[70%] h-full flex justify-end"
        style={{
          gap: sizeAdaptive(250),
          fontSize: sizeAdaptive(26),
          lineHeight: sizeAdaptive(26),
        }}
      >
        <AnimationAnchor
          id={{ type: "opponent-hand", playerId: playerData.id }}
          className="h-full aspect-square absolute"
        />

        <PlayerTypeIcon playerData={playerData} />
        <RangeIcon playerData={playerData} />
        <DistanceIcon playerData={playerData} />
        <HandIcon playerData={playerData} />
      </div>
    </div>
  );
}
