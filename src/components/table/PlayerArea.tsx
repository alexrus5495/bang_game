import { useEffect, useState } from "react";
import { usePublicDataState } from "../../stores/hooks/usePublicDataState";
import { useSocket } from "../../hooks/useSocket";
import PlayerDisplay from "./PlayerDisplay";
import { SocketEvents } from "../../lib/socketEvents";
import { processPlayersArray } from "../../lib/gameData/processPlayersArray";
import PlayerHand from "./PlayerDisplay/PlayerHand";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import EquipmentCardsPanel from "./shared/EquipmentCardsPanel";

export default function PlayerArea() {
  const { socket } = useSocket();
  const publicData = usePublicDataState()[0];
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const onSendRole = (role: string) => setRole(role);

    socket.emit(SocketEvents.REQUEST_ROLE);
    socket.on(SocketEvents.SEND_ROLE, onSendRole);

    return () => {
      socket.off(SocketEvents.SEND_ROLE, onSendRole);
    };
  }, [socket]);

  if (!publicData) return null;

  // Ready the array of players
  const playersArray = processPlayersArray(
    publicData.playersPublicData,
    socket.id as string,
  );
  if (!playersArray) return;
  const playerData = playersArray[0];

  return (
    <div className="h-full w-full flex items-end relative">
      <div className="flex w-[30%] h-full items-center">
        <div
          className="w-[95%] h-[90%] mt-[4%]"
          style={{
            padding: sizeAdaptive(100),
          }}
        >
          {/* <MessagesPanel /> */}
        </div>
      </div>
      <div
        className="h-full w-[25%] flex flex-col justify-end"
        style={{ paddingBottom: sizeAdaptive(50) }}
      >
        <div className="h-[50%] w-full">
          <PlayerDisplay playerData={playerData.playerData} role={role} />
        </div>
        <div className="h-[30%] w-full flex justify-center">
          <EquipmentCardsPanel playerData={playerData.playerData} />
        </div>
      </div>
      <div
        className="w-[45%] h-[80%] flex justify-center relative"
        style={{ bottom: sizeAdaptive(50) }}
      >
        <div className="w-[85%] h-full">
          <PlayerHand clientId={socket.id as string} />
        </div>
      </div>
    </div>
  );
}
