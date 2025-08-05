import { useEffect, useState } from "react";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { useSocket } from "../../hooks/useSocket";
import { useSystemLocalization } from "../../hooks/useSystemLocalization";
import Button from "../shared/Button";
import SearchLobby_lobbyTable from "./SearchLobby_content/SearchLobby_lobbyTable";
import type { LobbyPublicData } from "../../types";
import SearchLobby_lobbyDetails from "./SearchLobby_content/SearchLobby_lobbyDetails";
import { setCurrentPage } from "../../store/slices/currentPageSlice";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { SocketEvents } from "../../lib/socketEvents";

export default function SearchLobby_content() {
  const locale = useSystemLocalization() as Record<string, string>;
  const [lobbies, setLobbies] = useState<LobbyPublicData[]>([]);
  const [selectedLobby, setSelectedLobby] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit(SocketEvents.SUBSCRIBE_LOBBIES);

    const handler = (data: LobbyPublicData[]) => setLobbies(data);
    socket.on(SocketEvents.LOBBY_UPDATE, handler);

    return () => {
      socket.emit(SocketEvents.UNSUBSCRIBE_LOBBIES);
      socket.off(SocketEvents.LOBBY_UPDATE, handler);
    };
  }, [socket]);

  return (
    <>
      <div className="w-[60%] h-[80%] relative flex flex-col justify-between ">
        <div className="flex justify-center items-center">
          <Button
            text={locale.back}
            className={"absolute"}
            handler={() => dispatch(setCurrentPage("mainMenu"))}
            style={{ fontSize: sizeAdaptive(16), left: sizeAdaptive(18) }}
          />

          <h2
            className="custom-text-highlighted"
            style={{ fontSize: sizeAdaptive(13) }}
          >
            {locale["search_lobby"]}
          </h2>
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
          <div className="w-[70%] h-full">
            <SearchLobby_lobbyTable
              lobbies={lobbies}
              selectedLobby={selectedLobby}
              setSelectedLobby={setSelectedLobby}
            />
          </div>
          <div className="w-[30%] h-full ">
            <SearchLobby_lobbyDetails
              selectedLobby={selectedLobby}
              playerName={playerName}
              setPlayerName={setPlayerName}
              lobbies={lobbies}
            />
          </div>
        </div>
      </div>
    </>
  );
}
