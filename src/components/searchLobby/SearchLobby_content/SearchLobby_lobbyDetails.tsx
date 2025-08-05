import { sizeAdaptive } from "../../../lib/css/cssFunctions";
import { useSystemLocalization } from "../../../hooks/useSystemLocalization";
import type { LobbyPublicData } from "../../../types";
import LobbyInfo_none from "./LobbyInfo_none";
import LobbyInfo_private from "./LobbyInfo_private";
import LobbyInfo_public from "./LobbyInfo_public";

export default function SearchLobby_lobbyDetails({
  selectedLobby,
  lobbies,
  playerName,
  setPlayerName,
}: {
  selectedLobby: string | null;
  lobbies: LobbyPublicData[];
  playerName: string;
  setPlayerName: (newName: string) => void;
}) {
  const selectedLobbyData = lobbies.find((lobby) => lobby.id === selectedLobby);

  const locale = useSystemLocalization() as Record<string, string>;

  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%] flex justify-center items-center">
        <h2
          className="w-full h-full text-center"
          style={{
            fontSize: sizeAdaptive(20),
            borderBottomWidth: sizeAdaptive(150),
          }}
        >
          {locale["lobbyInfo_title"]}
        </h2>
      </div>
      <div className="w-full h-[90%]">
        {!selectedLobby && <LobbyInfo_none />}

        {selectedLobby && selectedLobbyData && !selectedLobbyData.isPrivate && (
          <LobbyInfo_public
            selectedLobbyData={selectedLobbyData}
            playerName={playerName}
            setPlayerName={setPlayerName}
          />
        )}

        {selectedLobby && selectedLobbyData && selectedLobbyData.isPrivate && (
          <LobbyInfo_private selectedLobbyData={selectedLobbyData} />
        )}
      </div>
    </div>
  );
}
