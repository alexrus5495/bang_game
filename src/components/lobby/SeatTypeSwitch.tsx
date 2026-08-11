import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { SocketEvents } from "../../lib/socketEvents";
import type { LobbySeat } from "../../types";
import { socket } from "../../lib/socket";
import { useTranslation } from "../../hooks/useTranslation";

export default function SeatTypeSwitch({
  seat,
  lobbyId,
}: {
  seat: LobbySeat;
  lobbyId: string;
}) {
  const t = useTranslation();

  const toggleSeatType = () => {
    socket.emit(SocketEvents.TOGGLE_SEAT_TYPE, seat.id, lobbyId);
  };

  return (
    <button
      type="button"
      className="flex items-center w-full h-full cursor-pointer justify-center"
      style={{ gap: sizeAdaptive(100) }}
      onClick={toggleSeatType}
    >
      <div
        style={{
          color: seat.type === "human" ? "var(--BLACK)" : "var(--BEIGE)",
        }}
      >
        {t("human")}
      </div>
      <span className="w-[1.3%] h-[70%] bg-[var(--BLACK)]"></span>
      <div
        style={{
          color: seat.type !== "human" ? "var(--BLACK)" : "var(--BEIGE)",
        }}
      >
        {t("ai")}
      </div>
    </button>
  );
}
