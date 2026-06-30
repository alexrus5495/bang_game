import { useEffect, useState } from "react";
import { useSystemLocalization } from "../../stores/hooks/useSystemLocalization";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import Button from "../shared/Button";
import type { LobbyPublicData } from "../../types";
import { useCurrentLobbyState } from "../../stores/hooks/useCurrentLobbyState";
import SeatLine from "./SeatLine";
import LobbyTitle from "./LobbyTitle";
import { SocketEvents } from "../../lib/socketEvents";
import { useCurrentPageState } from "../../stores/hooks/useCurrentPageState";
import { socket } from "../../lib/socket";

export default function Lobby_content({
  setExitAnimationType,
}: {
  setExitAnimationType: (type: "left" | "up") => void;
}) {
  const locale = useSystemLocalization() as Record<string, string>;
  const [lobbyData, setLobbyData] = useState<LobbyPublicData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const setCurrentPage = useCurrentPageState()[1];
  const currentLobbyId = useCurrentLobbyState()[0];

  useEffect(() => {
    if (!socket) return;

    const handleLobbyData = (data: LobbyPublicData) => {
      setLobbyData(data);
    };

    const handleGameCreated = () => {
      setCurrentPage("table");
    };

    socket.emit(SocketEvents.REQUEST_LOBBY_DATA, currentLobbyId);

    socket.on(SocketEvents.SEND_LOBBY_DATA, handleLobbyData);
    socket.on(SocketEvents.LOBBY_UPDATE, handleLobbyData);
    socket.on(SocketEvents.GAME_CREATED, handleGameCreated);

    return () => {
      socket.emit(SocketEvents.EXIT_LOBBY, currentLobbyId);
      socket.off(SocketEvents.SEND_LOBBY_DATA, handleLobbyData);
      socket.off(SocketEvents.LOBBY_UPDATE, handleLobbyData);
      socket.off(SocketEvents.GAME_CREATED, handleGameCreated);
    };
  }, [socket, currentLobbyId, setCurrentPage]);

  const handleExit = () => {
    socket.emit(SocketEvents.EXIT_LOBBY, lobbyData?.id);
    socket.off(SocketEvents.LOBBY_UPDATE);
    setCurrentPage("mainMenu");
  };

  const arePlayersReady = () => {
    if (!lobbyData) return false;
    for (const seat of lobbyData.seats) {
      if (seat.type === "human" && seat.status === "open") return false;
      if (seat.type === "human" && seat.isReady === false) return false;
    }
    return true;
  };

  const isLobbyOwner = () => {
    if (lobbyData?.ownerId === socket.id) return true;
    else return false;
  };

  const getReadyCounter = () => {
    if (!lobbyData) return;
    let total = 0;
    let ready = 0;

    for (const seat of lobbyData.seats) {
      if (seat.type === "human") {
        total++;
        if (seat.isReady) ready++;
      }
    }

    return { total, ready };
  };

  const startGame = () => {
    socket.emit(SocketEvents.CREATE_GAME, currentLobbyId);
    console.log("SENT CREATE_GAME");
    setExitAnimationType("up");
  };

  return (
    <>
      <div className="w-[60%] h-[80%] relative flex flex-col justify-between">
        <div className="flex justify-center items-center">
          <Button
            text={locale.exit}
            className={"absolute"}
            handler={handleExit}
            style={{ fontSize: sizeAdaptive(16), left: sizeAdaptive(18) }}
          />
          <LobbyTitle lobbyData={lobbyData} />
        </div>
        <div
          className="w-[95%] m-auto h-[80%] flex items-center"
          style={{
            border: "solid var(--BLACK)",
            borderWidth: sizeAdaptive(250),
            borderRadius: sizeAdaptive(20),
            marginBottom: sizeAdaptive(35),
          }}
        >
          <div
            className="w-[63%] h-full border overflow-hidden"
            style={{
              border: "solid var(--BLACK)",
              borderWidth: 0,
              borderTopLeftRadius: sizeAdaptive(20),
            }}
          >
            <div
              className="h-[80%] w-full border-r"
              style={{ borderRightWidth: sizeAdaptive(250) }}
            >
              {lobbyData?.seats.map((seat, index) => (
                <div
                  key={seat.id}
                  className={`w-full h-[14%] border-b flex items-center ${seat.playerId === socket.id ? "bg-blue-100" : ""}`}
                  style={{
                    paddingLeft: sizeAdaptive(30),
                    gap: sizeAdaptive(80),
                    fontSize: sizeAdaptive(25),
                  }}
                >
                  <SeatLine
                    index={index}
                    seat={seat}
                    lobbyData={lobbyData}
                    editMode={editMode}
                  />
                </div>
              ))}
            </div>

            <div
              className="h-[20%] w-full flex justify-center items-center border-r"
              style={{ borderRightWidth: sizeAdaptive(250) }}
            >
              {isLobbyOwner() && (
                <Button
                  text={editMode ? locale.done : locale.edit}
                  style={{
                    fontSize: sizeAdaptive(16),
                    left: sizeAdaptive(18),
                  }}
                  handler={() => setEditMode(!editMode)}
                />
              )}
            </div>
          </div>
          <div className="w-[37%] h-full">
            <div className="h-[80%] w-full flex justify-center items-center">
              <img
                src="/pistols.png"
                alt=""
                className="w-[70%] m-auto select-none"
                draggable={false}
              />
            </div>
            <div className="h-[20%] flex justify-center items-center">
              {isLobbyOwner() &&
                (arePlayersReady() ? (
                  <Button //NOTE: Add start function
                    text={locale.start}
                    style={{
                      fontSize: sizeAdaptive(16),
                      left: sizeAdaptive(18),
                    }}
                    handler={startGame}
                  />
                ) : (
                  <div style={{ fontSize: sizeAdaptive(16) }}>
                    {`${locale.ready}: ${getReadyCounter()?.ready}/${getReadyCounter()?.total}`}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
