import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { ProcessedPlayerData } from "../../../types";
import OtherPlayerPanel from "./OtherPlayerPanel";

export default function Layout_4({
  playersData,
  currentPlayerIndex,
}: {
  playersData: ProcessedPlayerData[];
  currentPlayerIndex: number;
}) {
  return (
    <div
      className="flex flex-col w-full h-full justify-start"
      style={{ paddingLeft: sizeAdaptive(80), paddingRight: sizeAdaptive(80) }}
    >
      <div className="w-full h-[33%] flex justify-center">
        <OtherPlayerPanel
          playerData={playersData[2].playerData}
          isCurrent={currentPlayerIndex === playersData[2].absoluteIndex}
        />
      </div>
      <div className="w-full h-[33%]  flex justify-between">
        <OtherPlayerPanel
          playerData={playersData[1].playerData}
          isCurrent={currentPlayerIndex === playersData[1].absoluteIndex}
        />
        <OtherPlayerPanel
          playerData={playersData[3].playerData}
          isCurrent={currentPlayerIndex === playersData[3].absoluteIndex}
        />
      </div>
    </div>
  );
}
