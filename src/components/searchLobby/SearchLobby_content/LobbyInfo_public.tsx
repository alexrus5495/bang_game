import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../stores/hooks/useSystemLocalization";
import type { LobbyPublicData, LobbySeat } from "../../../types";
import Button from "../../shared/Button";
import { useSocket } from "../../../hooks/useSocket";
import { SocketEvents } from "../../../lib/socketEvents";
import { useCurrentPageState } from "../../../stores/hooks/useCurrentPageState";
import { useCurrentLobbyState } from "../../../stores/hooks/useCurrentLobbyState";

export default function LobbyInfo_public({
  selectedLobbyData,
  playerName,
  setPlayerName,
}: {
  selectedLobbyData: LobbyPublicData;
  playerName: string;
  setPlayerName: (newName: string) => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const { socket } = useSocket();
  const setCurrentPage = useCurrentPageState()[1];
  const setCurrentLobby = useCurrentLobbyState()[1];

  const handleJoin = () => {
    setCurrentLobby(selectedLobbyData.id);

    socket.emit(SocketEvents.JOIN_LOBBY, selectedLobbyData.id, {
      playerName: playerName,
      playerId: socket.id,
    });

    setCurrentPage("lobby");
  };

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-[80%] flex-col justify-center items-center"
        style={{ paddingTop: sizeAdaptive(50) }}
      >
        {selectedLobbyData.seats.map((seat: LobbySeat, index) => (
          <div
            className="w-full h-[14%] flex items-center"
            style={{
              paddingLeft: sizeAdaptive(80),
              gap: sizeAdaptive(80),
              fontSize: sizeAdaptive(25),
            }}
            key={index}
          >
            <div>{index + 1}.</div>
            <div
              className="h-[70%] aspect-square border"
              style={{
                backgroundColor: `${seat.color}`,
                borderWidth: sizeAdaptive(250),
              }}
            ></div>
            <div>
              {seat.status !== "open"
                ? seat.type === "human"
                  ? `${seat.playerName}`
                  : `${locale["ai"]}`
                : `-${locale["empty"]}-`}
            </div>
          </div>
        ))}
      </div>
      <div
        className="h-[20%] w-full flex flex-col justify-center items-center"
        style={{ gap: sizeAdaptive(150) }}
      >
        <input
          type="text"
          aria-label={locale["enter_as"]}
          placeholder={`${locale["enter_as"]}...`}
          className="border w-[90%]"
          style={{
            fontSize: sizeAdaptive(30),
            borderWidth: sizeAdaptive(250),
            paddingLeft: sizeAdaptive(100),
          }}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Button
          text={locale.join}
          style={{
            fontSize: sizeAdaptive(20),
            color: playerName !== "" ? "var(--BLACK)" : "var(--BEIGE)",
          }}
          disabled={playerName !== "" ? false : true}
          handler={handleJoin}
        />
      </div>
    </div>
  );
}
