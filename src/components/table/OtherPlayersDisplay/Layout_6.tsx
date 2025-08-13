import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { PlayersPublicData } from "../../../types";
import OtherPlayerPanel from "./OtherPlayerPanel";

export default function Layout_6({
  playersData,
  clientId,
}: {
  playersData: PlayersPublicData;
  clientId: string | undefined;
}) {
  return (
    <div
      className="flex flex-col w-full h-full border border-white justify-start"
      style={{ paddingLeft: sizeAdaptive(80), paddingRight: sizeAdaptive(80) }}
    >
      <div className="w-full h-[33%] flex justify-center">
        <OtherPlayerPanel playerData={playersData[3]} clientId={clientId} />
      </div>
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerData={playersData[2]} clientId={clientId} />
        <OtherPlayerPanel playerData={playersData[4]} clientId={clientId} />
      </div>
      <div className="w-full h-[33%] flex justify-between">
        <OtherPlayerPanel playerData={playersData[1]} clientId={clientId} />
        <OtherPlayerPanel playerData={playersData[5]} clientId={clientId} />
      </div>
    </div>
  );
}
