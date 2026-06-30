import { useEffect, useRef, useState } from "react";
import { useCurrentLobbyState } from "../stores/hooks/useCurrentLobbyState";
import OtherPlayersDisplay from "../components/table/OtherPlayersDisplay";
import CharSelectPrompt from "../components/table/prompts/CharSelectPrompt";
import CentralPanel from "../components/table/CentralPanel";
import { useCardsMetaDataState } from "../stores/hooks/useCardsMetaDataState";
import PlayerArea from "../components/table/PlayerArea";
import { sizeAdaptive } from "../lib/css/cssFunctions";
import DragContainer from "../components/table/DragContainer";
import { AnchorsProvider } from "../contexts/AnchorsContext";
import { useTableSocketHandlers } from "../hooks/useTableSocketHandlers";
import { EventProcessor } from "../components/table/EventProcessor";
import { useGameEventsState } from "../stores/hooks/useGameEventsState";
import DEV_CONTROLLER from "../DEV_CONTROLLER/DEV_CONTROLLER";
import MainDisplay from "../components/table/MainDisplay";
import { useLocalStateStore } from "../stores/localStateStore";
import { socket } from "../lib/socket";

function TableContent() {
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const setGameEvents = useGameEventsState()[1];

  //Refs for key elements
  const tableRef = useRef<HTMLDivElement>(null);
  const centralPanelRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    const updateHeight = () => {
      if (tableRef.current) {
        setTableHeight(tableRef.current.getBoundingClientRect().height);
      }
    };

    updateHeight(); // Initial calculations

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  //Setup Socket Events
  useTableSocketHandlers({
    socket,
    lobbyId,
    setCardsMeta,
    setGameEvents,
  });

  const charSelected = useLocalStateStore((state) => {
    const player = state.players.find((p) => p.id === socket.id);
    return player ? player.char !== "" : undefined;
  });

  if (!socket.id) return null;

  return (
    <>
      {!charSelected && <CharSelectPrompt />}

      <DEV_CONTROLLER />

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
          <MainDisplay />
        </div>

        <div className="w-full h-[60%]" style={{ marginTop: sizeAdaptive(50) }}>
          <OtherPlayersDisplay />
        </div>

        <div
          ref={centralPanelRef}
          className="h-[35%] w-[43%] absolute top-[26%]"
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
    <AnchorsProvider>
      <EventProcessor>
        <TableContent />
      </EventProcessor>
    </AnchorsProvider>
  );
}
