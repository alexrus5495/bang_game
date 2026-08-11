import { useState } from "react";
import Button from "../shared/Button";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import type { LobbyPublicData, LobbySeat } from "../../types";
import { SocketEvents } from "../../lib/socketEvents";
import { socket } from "../../lib/socket";
import { useTranslation } from "../../hooks/useTranslation";

export default function KickOutButton({
  lobbyData,
  seatId,
  isLobbyOwner,
}: {
  lobbyData: LobbyPublicData;
  seatId: number;
  isLobbyOwner: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const t = useTranslation();

  const handleKickOutPlayer = (seatId: number) => {
    socket.emit(SocketEvents.KICK_OUT_PLAYER, lobbyData.id, seatId);
  };

  const isEmpty = () => {
    const seat = lobbyData.seats[seatId] as LobbySeat;
    return seat.status === "open";
  };

  return (
    <div className="h-full w-full flex justify-center">
      {!isLobbyOwner &&
        !isEmpty() &&
        (!showConfirm ? (
          <Button
            text={t("lobby_kick")}
            style={{ fontSize: sizeAdaptive(20) }}
            handler={() => setShowConfirm(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center "
            style={{ gap: sizeAdaptive(60) }}
          >
            <Button
              text={t("confirm")}
              style={{ fontSize: sizeAdaptive(20) }}
              handler={() => handleKickOutPlayer(seatId)}
            />
            <span className="h-[80%] w-[1%] bg-[var(--BLACK)]"></span>
            <Button
              text={t("back")}
              style={{ fontSize: sizeAdaptive(20) }}
              handler={() => setShowConfirm(false)}
            />
          </div>
        ))}
    </div>
  );
}
