import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useCurrentLobbyState } from "../../hooks/useCurrentLobbyState";
import type { Coordinates } from "../../types";
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

export default function Table() {
  const { socket } = useSocket();
  const lobbyId = useCurrentLobbyState()[0];
  const setCardsMeta = useCardsMetaDataState()[1];
  const [publicData, setPublicData] = usePublicDataState();

  //Refs for key elements
  const tableRef = useRef<HTMLDivElement>(null);
  const centralPanelRef = useRef<HTMLDivElement>(null);

  const [tableHeight, setTableHeight] = useState<number | null>(null);

  //Update table height value. used to calculate drag container height.
  useEffect(() => {
    if (!tableRef.current) return;

    setTableHeight(tableRef.current.getBoundingClientRect().height);
  }, [tableRef]);

  //Card drag and drop mechanic
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDraggedCardReady, setIsDraggedCardReady] = useState<boolean>(false);
  const [draggedCardIndex, setDraggedCardIndex] = useState<null | number>(null);
  const [draggedCardOffset, setDraggedCardOffset] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const isDragging = draggedCardIndex !== null;
  const [isOverCentralPanel, setIsOverCentralPanel] = useState(false);
  const checkIfOverCentralPanel = useCallback(() => {
    if (!centralPanelRef.current) return false;

    const centralPanelRect = centralPanelRef.current.getBoundingClientRect();
    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    return !(
      centralPanelRect.right < mouseX ||
      centralPanelRect.left > mouseX ||
      centralPanelRect.top > mouseY ||
      centralPanelRect.bottom < mouseY
    );
  }, [mousePosition]);

  const draggedCardId =
    draggedCardIndex !== null ? publicData?.clientHand[draggedCardIndex] : "";

  const setMessages = useMessagesState()[1];

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

  const stopDragging = () => {
    setDraggedCardIndex(null);
    setIsDraggedCardReady(false);
  };

  const handleDragEndedOverCentralPanel = useCallback(() => {
    console.log(`Player player card ${draggedCardId}`);
  }, [draggedCardId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      setIsOverCentralPanel(checkIfOverCentralPanel());
    };

    const handleMouseUp = () => {
      if (!isDragging) return;

      stopDragging();
      if (isOverCentralPanel) {
        handleDragEndedOverCentralPanel();
      } else console.log("Player cancelled drag");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    checkIfOverCentralPanel,
    isOverCentralPanel,
    handleDragEndedOverCentralPanel,
  ]);

  return (
    <>
      {!charSelected && <CharSelectPrompt />}

      {isDragging && (
        <DragContainer
          draggedCardId={draggedCardId ? draggedCardId : ""}
          draggedCardOffset={draggedCardOffset}
          setIsDraggedCardReady={setIsDraggedCardReady}
          mousePosition={mousePosition}
          tableHeight={tableHeight}
        />
      )}

      <div
        ref={tableRef}
        className="w-[100vw] absolute select-none flex flex-col justify-center items-center border border-white"
        style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
        onMouseUp={stopDragging}
      >
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
          <PlayerArea
            draggedCardIndex={draggedCardIndex}
            setDraggedCardIndex={setDraggedCardIndex}
            setDraggedCardOffset={setDraggedCardOffset}
            isDraggedCardReady={isDraggedCardReady}
          />
        </div>
      </div>
    </>
  );
}
