import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../types";
import CharPortrait from "../shared/CharPortrait";
import EquipmentCardsPanel from "./OtherPlayerPanel/EquipmentCardsPanel";
import InfoIcons from "./OtherPlayerPanel/InfoIcons";
import RoleIcon from "./OtherPlayerPanel/RoleIcon";

export default function OtherPlayerPanel({
  playerData,
}: {
  playerData: Player_PublicData;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <div className="h-full w-[25%] flex flex-col relative">
      <div className="w-full h-[50%] relative">
        <div
          className="h-[50%] w-[95.6%] bg-[var(--WHITE)] absolute flex items-center"
          style={{
            bottom: 0,
            borderBottomRightRadius: sizeAdaptive(35),
            borderBottomLeftRadius: sizeAdaptive(30),
            borderWidth: sizeAdaptive(300),
          }}
        >
          <InfoIcons playerData={playerData} />
          <div
            className="h-full w-full"
            style={{
              paddingLeft: sizeAdaptive(9),
              fontSize: sizeAdaptive(25),
              lineHeight: sizeAdaptive(25),
            }}
          >
            {playerData.isAI
              ? locale[playerData.nickname]
              : playerData.nickname}
          </div>
        </div>
        <CharPortrait playerData={playerData} />
        {playerData.role && <RoleIcon role={playerData.role} />}
      </div>

      <div className="w-full h-[50%]">
        <EquipmentCardsPanel playerData={playerData} />
      </div>
    </div>
  );
}
