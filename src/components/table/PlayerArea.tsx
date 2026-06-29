import { useSocket } from "../../hooks/useSocket";
import PlayerDisplay from "./PlayerDisplay";
import PlayerHand from "./PlayerDisplay/PlayerHand";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import EquipmentCardsPanel from "./shared/EquipmentCardsPanel";
import React from "react";

const PlayerArea = React.memo(() => {
  const { socket } = useSocket();
  if (!socket.id) return null;

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
          <PlayerDisplay playerId={socket.id} />
        </div>
        <div className="h-[30%] w-full flex justify-center">
          <EquipmentCardsPanel playerId={socket.id} />
        </div>
      </div>
      <div
        className="w-[45%] h-[80%] flex justify-center relative"
        style={{ bottom: sizeAdaptive(50) }}
      >
        <div className="w-[85%] h-full">
          <PlayerHand clientId={socket.id} />
        </div>
      </div>
    </div>
  );
});

export default PlayerArea;
