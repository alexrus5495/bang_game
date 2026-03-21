import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import type { Player_PublicData } from "../../../types";
import CharPortrait from "../shared/CharPortrait";
import EquipmentCardsPanel from "../shared/EquipmentCardsPanel";
import InfoIcons from "./OtherPlayerPanel/InfoIcons";
import RoleIcon from "./OtherPlayerPanel/RoleIcon";

export default function OtherPlayerPanel({
  playerData,
  isCurrent,
}: {
  playerData: Player_PublicData;
  isCurrent: boolean;
}) {
  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <div
      className="h-full w-[23%] flex flex-col relative z-[2]"
      style={{
        paddingTop: sizeAdaptive(100),
        paddingBottom: sizeAdaptive(160),
        paddingLeft: sizeAdaptive(100),
        paddingRight: sizeAdaptive(100),
        outlineWidth: sizeAdaptive(250),
        borderRadius: sizeAdaptive(55),
        backgroundColor: isCurrent
          ? "color-mix(in srgb, var(--GOLD) 30%, transparent"
          : "",
        outlineColor: "var(--GOLD)",
        outlineStyle: isCurrent ? "double" : "none",
        boxShadow: isCurrent ? `0 0 ${sizeAdaptive(30)} gold` : "none",
      }}
    >
      <div className="w-full h-[50%] relative">
        <div
          className="h-[50%] w-full bg-[var(--WHITE)] absolute flex items-center"
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
              paddingLeft: sizeAdaptive(10),
              fontSize: sizeAdaptive(25),
              lineHeight: sizeAdaptive(24),
            }}
          >
            {playerData.isAI
              ? locale[playerData.nickname]
              : playerData.nickname}
          </div>
        </div>
        <CharPortrait playerData={playerData} />

        {playerData.role && (
          <div
            className="h-[50%] aspect-square absolute"
            style={{ bottom: "-15%", left: "13%" }}
          >
            <RoleIcon role={playerData.role} />
          </div>
        )}
      </div>

      <div className="w-full h-[50%] flex justify-center items-center">
        <EquipmentCardsPanel playerData={playerData} />
      </div>
    </div>
  );
}
