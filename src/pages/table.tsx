import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { SocketEvents } from "../lib/socketEvents";
import { useCurrentLobbyState } from "../hooks/useCurrentLobbyState";
import type { CardsMetaData, PublicData } from "../types";
import OtherPlayersDisplay from "../components/table/OtherPlayersDisplay";
import { usePublicDataState } from "../hooks/usePublicDataState";
import CharSelectPrompt from "../components/table/prompts/CharSelectPrompt";
import CentralPanel from "../components/table/CentralPanel";
import { useCardsMetaDataState } from "../hooks/useCardsMetaDataState";
import PlayerArea from "../components/table/PlayerArea";
import { sizeAdaptive } from "../lib/css/cssFunctions";

export default function Table() {
  const { socket } = useSocket();
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const [publicData, setPublicData] = usePublicDataState();

  useEffect(() => {
    const onSendCardsMeta = (data: CardsMetaData) => {
      setCardsMeta(data);
    };

    const onSendPublicData = (data: PublicData) => {
      setPublicData(data);
    };

    socket.emit(SocketEvents.JOIN_GAME, lobbyId);
    socket.on(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
    socket.on(SocketEvents.SEND_PUBLIC_DATA, onSendPublicData);

    return () => {
      socket.off(SocketEvents.SEND_CARDS_META, onSendCardsMeta);
      socket.off(SocketEvents.SEND_PUBLIC_DATA, onSendPublicData);
    };
  }, [socket, lobbyId, setCardsMeta, setPublicData]);

  const player = publicData?.playersPublicData.find(
    (player) => player.id === socket.id,
  );
  const charSelected = player ? player.char !== "" : undefined;

  return (
    <>
      {!charSelected && <CharSelectPrompt />}

      <div
        className="w-[100vw] absolute select-none flex flex-col justify-center items-center border border-white"
        style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
      >
        <div className="w-full h-[60%]" style={{ marginTop: sizeAdaptive(50) }}>
          <OtherPlayersDisplay />
        </div>

        <CentralPanel />

        <div className="w-full h-[40%]">
          <PlayerArea />
        </div>
      </div>
    </>
  );
}
