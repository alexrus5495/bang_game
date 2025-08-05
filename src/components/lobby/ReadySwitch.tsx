import { useSocket } from "../../hooks/useSocket";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { SocketEvents } from "../../lib/socketEvents";
import type { LobbyPublicData, LobbySeat } from "../../types";

export default function ReadySwitch({
  lobbyData,
  seat,
}: {
  lobbyData: LobbyPublicData;
  seat: LobbySeat;
}) {
  const { socket } = useSocket();

  const handleToggleReady = (seatId: number) => {
    if (lobbyData) socket.emit(SocketEvents.TOGGLE_READY, lobbyData.id, seatId);
  };

  return (
    <div
      className="h-full w-[35%] flex justify-center items-center cursor-pointer"
      style={{ gap: sizeAdaptive(90) }}
      onClick={() => handleToggleReady(seat.id)}
    >
      <div
        className={`${seat.isReady ? "" : "text-stroke-black"}`}
        style={{
          color: seat.isReady ? "var(--BEIGE)" : "var(--RED)",
        }}
      >
        NOT READY
      </div>
      <span className="bg-[var(--BLACK)] w-[1.3%] h-[80%]"></span>
      <div
        className={`${!seat.isReady ? "" : "text-stroke-black"}`}
        style={{
          color: seat.isReady ? "var(--GREEN)" : "var(--BEIGE)",
        }}
      >
        READY
      </div>
    </div>
  );
}
