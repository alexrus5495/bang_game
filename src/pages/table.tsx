import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useCurrentLobbyState } from "../stores/hooks/useCurrentLobbyState";
import OtherPlayersDisplay from "../components/table/OtherPlayersDisplay";
import { usePublicDataState } from "../stores/hooks/usePublicDataState";
import CharSelectPrompt from "../components/table/prompts/CharSelectPrompt";
import CentralPanel from "../components/table/CentralPanel";
import { useCardsMetaDataState } from "../stores/hooks/useCardsMetaDataState";
import PlayerArea from "../components/table/PlayerArea";
import { sizeAdaptive } from "../lib/css/cssFunctions";
import DragContainer from "../components/table/DragContainer";
import { DragDropProvider } from "../contexts/DragDropContext";
import CurrentTurnDisplay from "../components/table/CurrentTurnDisplay";
import { AnchorsProvider } from "../contexts/AnchorsContext";
import { LocalStateProvider } from "../contexts/LocalStateContext";
import { useTableSocketHandlers } from "../hooks/useTableSocketHandlers";
import { useInitializeDeckSizes } from "../contexts/LocalStateContext/useInitializeDeckSizes";
import { EventProcessor } from "../components/table/EventProcessor";
import { useGameEventsState } from "../stores/hooks/useGameEventsState";

function TableContent() {
  const { socket } = useSocket();
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const [publicData, setPublicData] = usePublicDataState();
  const setGameEvents = useGameEventsState()[1];

  //Refs for key elements
  const tableRef = useRef<HTMLDivElement>(null);
  const centralPanelRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number | null>(null);

  //BUG: Probable cause of the incorrect sizes after changing the viewport size
  // Update table height
  useEffect(() => {
    if (!tableRef.current) return;
    setTableHeight(tableRef.current.getBoundingClientRect().height);
  }, [tableRef]);

  //Setup Socket Events
  useTableSocketHandlers({
    socket,
    lobbyId,
    setCardsMeta,
    setPublicData,
    setGameEvents,
  });

  useInitializeDeckSizes();

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
    <LocalStateProvider>
      <DragDropProvider>
        <AnchorsProvider>
          <EventProcessor>
            <TableContent />
          </EventProcessor>
        </AnchorsProvider>
      </DragDropProvider>
    </LocalStateProvider>
  );
}
