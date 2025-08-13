import { sizeAdaptive } from "../../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../../types";
import Bullets from "./Bullets";
import DistanceIcon from "./DistanceIcon";
import HandIcon from "./HandIcon";
import PlayerTypeIcon from "./PlayerTypeIcon";

export default function InfoIcons({
  playerData,
  clientId,
}: {
  playerData: Player_PublicData;
  clientId: string | undefined;
}) {
  return (
    <div
      className="absolute h-full w-[81%] flex"
      style={{
        top: "-50%",
        right: "-5%",
      }}
    >
      <div className="w-[60%]">
        <Bullets playerData={playerData} />
      </div>
      <div
        className="w-[70%] h-full flex justify-end"
        style={{ gap: sizeAdaptive(250) }}
      >
        <PlayerTypeIcon playerData={playerData} />
        <DistanceIcon playerData={playerData} clientId={clientId} />
        <HandIcon playerData={playerData} />
      </div>
    </div>
  );
}
