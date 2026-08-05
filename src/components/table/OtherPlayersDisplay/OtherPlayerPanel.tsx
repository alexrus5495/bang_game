import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import CharPortrait from "../shared/CharPortrait";
import EquipmentCardsPanel from "../shared/EquipmentCardsPanel";
import InfoIcons from "./OtherPlayerPanel/InfoIcons";
import RoleIcon from "./OtherPlayerPanel/RoleIcon";
import React from "react";
import { useLocalStateStore } from "../../../stores/localStateStore";
import { useShallow } from "zustand/shallow";
import { useStore } from "zustand";
import { useHighlightedOpponent } from "../../../stores/hooks/localStateStore.hooks";

const OtherPlayerPanel = React.memo(({ playerId }: { playerId: string }) => {
  const locale = useSystemLocalization() as Record<string, string>;
  const highlightedOpponent = useHighlightedOpponent();
  const isCurrent = highlightedOpponent === playerId;

  const player = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.playersController.getPlayerById(playerId);
      if (!p) return null;
      return {
        nickname: p.nickname,
        isAI: p.isAI,
        role: p.role,
      };
    }),
  );

  if (!player) return null;

  return (
    <div
      className="h-full w-[23%] flex flex-col relative z-0"
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
          <InfoIcons playerId={playerId} />
          <div
            className="h-full w-full"
            style={{
              paddingLeft: sizeAdaptive(10),
              fontSize: sizeAdaptive(25),
              lineHeight: sizeAdaptive(24),
            }}
          >
            {player.isAI ? locale[player.nickname] : player.nickname}
          </div>
        </div>
        <CharPortrait playerId={playerId} />

        {player.role && (
          <div
            className="h-[50%] aspect-square absolute"
            style={{ bottom: "-15%", left: "13%" }}
          >
            <RoleIcon role={player.role} />
          </div>
        )}
      </div>

      <div className="w-full h-[50%] flex justify-center items-center">
        <EquipmentCardsPanel playerId={playerId} />
      </div>
    </div>
  );
});

export default OtherPlayerPanel;
