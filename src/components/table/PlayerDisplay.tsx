import { sizeAdaptive } from "../../lib/css/cssFunctions";
import RoleIcon from "./OtherPlayersDisplay/OtherPlayerPanel/RoleIcon";
import CharPortrait from "./shared/CharPortrait";
import Bullets from "./shared/Bullets";
import RangeIcon from "./shared/RangeIcon";
import HandIcon from "./shared/HandIcon";
import { useLocalStateStore } from "../../stores/localStateStore";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export default function PlayerDisplay({ playerId }: { playerId: string }) {
  const { nickname, role } = useStore(
    useLocalStateStore,
    useShallow((state) => {
      const p = state.playersController.getPlayerById(playerId);
      if (!p) return { nickname: "", role: "" };
      return {
        nickname: p.nickname,
        role: p.role,
      };
    }),
  );

  return (
    <div className="flex h-full w-full items-center z-0">
      <div
        className="w-full h-[70%] relative"
        style={{ transform: "translateY(-15%)" }}
      >
        <div
          className="h-[50%] w-full bg-[var(--WHITE)] absolute flex items-center"
          style={{
            bottom: 0,
            borderBottomRightRadius: sizeAdaptive(35),
            borderBottomLeftRadius: sizeAdaptive(25),
            borderWidth: sizeAdaptive(300),
          }}
        >
          <div
            className="h-full w-full"
            style={{
              paddingLeft: sizeAdaptive(6.4),
              fontSize: sizeAdaptive(20),
              lineHeight: sizeAdaptive(15),
            }}
          >
            {nickname}
          </div>
        </div>

        <CharPortrait playerId={playerId} />

        {role && (
          <div
            className="h-[50%] aspect-square absolute z-0"
            style={{ bottom: "-15%", left: "18%" }}
          >
            <RoleIcon role={role} />
          </div>
        )}

        <div
          className="w-[72%] absolute flex"
          style={{
            top: "10%",
            right: "-4%",
            height: sizeAdaptive(20),
          }}
        >
          <Bullets playerId={playerId} />
        </div>

        <div
          className="h-[40%] w-[60%] absolute flex justify-end"
          style={{
            top: "30%",
            right: "-4%",
            marginLeft: sizeAdaptive(45),
            fontSize: sizeAdaptive(21),
            lineHeight: sizeAdaptive(18),
            gap: sizeAdaptive(100),
          }}
        >
          <RangeIcon playerId={playerId} />
          <HandIcon playerId={playerId} />
        </div>
      </div>
    </div>
  );
}
