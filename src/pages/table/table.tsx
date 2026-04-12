import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useCurrentLobbyState } from "../../hooks/useCurrentLobbyState";
import OtherPlayersDisplay from "../../components/table/OtherPlayersDisplay";
import { usePublicDataState } from "../../hooks/usePublicDataState";
import CharSelectPrompt from "../../components/table/prompts/CharSelectPrompt";
import CentralPanel from "../../components/table/CentralPanel";
import { useCardsMetaDataState } from "../../hooks/useCardsMetaDataState";
import PlayerArea from "../../components/table/PlayerArea";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { useMessagesState } from "../../hooks/useMessagesState";
import DragContainer from "../../components/table/DragContainer";
import { setupTableSocketHandlers } from "./utils/setupTableSocketHandlers";
import { DragDropProvider } from "../../contexts/DragDropContext";
import CurrentTurnDisplay from "../../components/table/CurrentTurnDisplay";
import { CardsOnTheTableProvider } from "../../contexts/CardsOnTheTableContext";
import { PendingProvider } from "../../contexts/PendingContext";

function TableContent() {
  const { socket } = useSocket();
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const [publicData, setPublicData] = usePublicDataState();
  const setMessages = useMessagesState()[1];

  //Refs for key elements
  const tableRef = useRef<HTMLDivElement>(null);
  const centralPanelRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number | null>(null);

  // Update table height
  useEffect(() => {
    if (!tableRef.current) return;
    setTableHeight(tableRef.current.getBoundingClientRect().height);
  }, [tableRef]);

  //Setup Socket Events
  useEffect(() => {
    return setupTableSocketHandlers({
      socket,
      lobbyId,
      setCardsMeta,
      setPublicData,
      setMessages,
    });
  }, [socket, lobbyId, setCardsMeta, setPublicData, setMessages]);

  const player = publicData?.playersPublicData.find(
    (player) => player.id === socket.id,
  );
  const charSelected = player ? player.char !== "" : undefined;

  return (
    <>
      {!charSelected && <CharSelectPrompt />}

      <DragContainer
        tableHeight={tableHeight}
        centralPanelRef={centralPanelRef as React.RefObject<HTMLDivElement>}
      />

      <div
        ref={tableRef}
        className="w-[100vw] absolute select-none flex flex-col justify-center items-center border border-white"
        style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
      >
        <div className="w-[18%] h-auto absolute top-0 flex justify-center">
          <CurrentTurnDisplay />
        </div>

        <div className="w-full h-[60%]" style={{ marginTop: sizeAdaptive(50) }}>
          <OtherPlayersDisplay />
        </div>

        <div
          ref={centralPanelRef}
          className="h-[35%] w-[40%] absolute top-[22%]"
        >
          <CentralPanel />
        </div>

        <div className="w-full h-[40%]">
          <PlayerArea />
        </div>
      </div>
    </>
  );
}

export default function Table() {
  return (
    <CardsOnTheTableProvider>
      <DragDropProvider>
        <PendingProvider>
          <TableContent />
        </PendingProvider>
      </DragDropProvider>
    </CardsOnTheTableProvider>
  );
}
