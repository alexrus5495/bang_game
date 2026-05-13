import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useCurrentLobbyState } from "../hooks/useCurrentLobbyState";
import OtherPlayersDisplay from "../components/table/OtherPlayersDisplay";
import { usePublicDataState } from "../hooks/usePublicDataState";
import CharSelectPrompt from "../components/table/prompts/CharSelectPrompt";
import CentralPanel from "../components/table/CentralPanel";
import { useCardsMetaDataState } from "../hooks/useCardsMetaDataState";
import PlayerArea from "../components/table/PlayerArea";
import { sizeAdaptive } from "../lib/css/cssFunctions";
import { useMessagesState } from "../hooks/useMessagesState";
import DragContainer from "../components/table/DragContainer";
import { setupTableSocketHandlers } from "./table/utils/setupTableSocketHandlers";
import { DragDropProvider } from "../contexts/DragDropContext";
import CurrentTurnDisplay from "../components/table/CurrentTurnDisplay";
import { CardsOnTheTableProvider } from "../contexts/CardsOnTheTableContext";
import { PendingProvider } from "../contexts/PendingContext";
import AnimationLayer from "../components/table/AnimationLayer";
import { AnchorsProvider } from "../contexts/AnchorsContext";
import { VisibleCardsProvider } from "../contexts/VisibleCardsContext";

type UiIsReadyFlagType = {
  dragContainer: boolean;
  currentTurnDisplay: boolean;
  otherPlayersDisplay: boolean;
  centralPanel: boolean;
  playersArea: boolean;
};

function TableContent({
  checkAsReady,
}: {
  checkAsReady: (flag: keyof UiIsReadyFlagType) => void;
}) {
  const { socket } = useSocket();
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const [publicData, setPublicData] = usePublicDataState();
  const setMessages = useMessagesState()[1];

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
        atReady={() => checkAsReady("dragContainer")}
        tableHeight={tableHeight}
        centralPanelRef={centralPanelRef as React.RefObject<HTMLDivElement>}
      />

      <div
        ref={tableRef}
        className="w-[100vw] absolute select-none flex flex-col justify-center items-center border border-white"
        style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
      >
        <div className="w-[18%] h-auto absolute top-0 flex justify-center">
          <CurrentTurnDisplay
            atReady={() => checkAsReady("currentTurnDisplay")}
          />
        </div>

        <div className="w-full h-[60%]" style={{ marginTop: sizeAdaptive(50) }}>
          <OtherPlayersDisplay
            atReady={() => checkAsReady("otherPlayersDisplay")}
          />
        </div>

        <div
          ref={centralPanelRef}
          className="h-[35%] w-[40%] absolute top-[22%]"
        >
          <CentralPanel atReady={() => checkAsReady("centralPanel")} />
        </div>

        <div className="w-full h-[40%]">
          <PlayerArea atReady={() => checkAsReady("playersArea")} />
        </div>
      </div>
    </>
  );
}

export default function Table() {
  const { checkAsReady, isAllReady } = useGlobalReadyFlag();

  return (
    <CardsOnTheTableProvider>
      <DragDropProvider>
        <PendingProvider>
          <AnchorsProvider>
            <VisibleCardsProvider>
              <AnimationLayer isAllReady={isAllReady} />
              <TableContent checkAsReady={checkAsReady} />
            </VisibleCardsProvider>
          </AnchorsProvider>
        </PendingProvider>
      </DragDropProvider>
    </CardsOnTheTableProvider>
  );
}

const useGlobalReadyFlag = () => {
  const [uiIsReady, setUiIsReady] = useState<UiIsReadyFlagType>({
    dragContainer: false,
    currentTurnDisplay: false,
    otherPlayersDisplay: false,
    centralPanel: false,
    playersArea: false,
  });

  const checkAsReady = (flag: keyof UiIsReadyFlagType) => {
    setUiIsReady((prev) => ({
      ...prev,
      [flag]: true,
    }));
  };

  const isAllReady = Object.values(uiIsReady).every(Boolean);

  return {
    checkAsReady,
    isAllReady,
  };
};
