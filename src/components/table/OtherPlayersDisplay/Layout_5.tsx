import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { PlayersPublicData } from "../../../types";
import OtherPlayerPanel from "./OtherPlayerPanel";

export default function Layout_5({
  playersData,
}: {
  playersData: PlayersPublicData;
}) {
  return (
    <div
      className="flex flex-col w-full h-full border border-white justify-start"
      style={{ paddingLeft: sizeAdaptive(80), paddingRight: sizeAdaptive(80) }}
    >
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerData={playersData[2]} />
        <OtherPlayerPanel playerData={playersData[3]} />
      </div>
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerData={playersData[1]} />
        <OtherPlayerPanel playerData={playersData[4]} />
      </div>
    </div>
  );
}
