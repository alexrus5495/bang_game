import { useCallback, useEffect, useRef, useState } from "react";
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
import { useTableDragAndDrop } from "../../hooks/useTableDragAndDrop";
import { setupDragAndDrop } from "./utils/setupDragAndDrop";

export default function Table() {
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

  //Card drag and drop mechanic
  const drag = useTableDragAndDrop();

  // Check if over central panel
  const checkIfOverCentralPanel = useCallback(() => {
    if (!centralPanelRef.current) return false;
    const centralPanelRect = centralPanelRef.current.getBoundingClientRect();
    const mouseX = drag.mousePosition.x;
    const mouseY = drag.mousePosition.y;

    return !(
      centralPanelRect.right < mouseX ||
      centralPanelRect.left > mouseX ||
      centralPanelRect.top > mouseY ||
      centralPanelRect.bottom < mouseY
    );
  }, [drag.mousePosition]);

  const draggedCardId =
    drag.draggedCardIndex !== null
      ? publicData?.clientHand[drag.draggedCardIndex]
      : "";

  // Handle drag end over central panel
  const handleDragEndedOverCentralPanel = useCallback(() => {
    console.log(`Player played card ${draggedCardId}`);
  }, [draggedCardId]);

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

  //Setup Drag Handlers
  useEffect(() => {
    return setupDragAndDrop({
      isDragging: drag.isDragging,
      checkIfOverCentralPanel,
      isOverCentralPanel: drag.isOverCentralPanel,
      stopDragging: drag.stopDragging,
      handleDragEndedOverCentralPanel,
      setMousePosition: drag.setMousePosition,
      setIsOverCentralPanel: drag.setIsOverCentralPanel,
    });
  }, [
    drag.isDragging,
    drag.isOverCentralPanel,
    drag.stopDragging,
    drag.setMousePosition,
    drag.setIsOverCentralPanel,
    checkIfOverCentralPanel,
    handleDragEndedOverCentralPanel,
  ]);

  return (
    <>
      {!charSelected && <CharSelectPrompt />}

      {drag.isDragging && (
        <DragContainer
          draggedCardId={draggedCardId ? draggedCardId : ""}
          draggedCardOffset={drag.draggedCardOffset}
          setIsDraggedCardReady={drag.setIsDraggedCardReady}
          mousePosition={drag.mousePosition}
          tableHeight={tableHeight}
        />
      )}

      <div
        ref={tableRef}
        className="w-[100vw] absolute select-none flex flex-col justify-center items-center border border-white"
        style={{ height: "min(51vw, 100vh)", width: "min(100vw, 196vh)" }}
        onMouseUp={drag.stopDragging}
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
            draggedCardIndex={drag.draggedCardIndex}
            setDraggedCardIndex={drag.setDraggedCardIndex}
            setDraggedCardOffset={drag.setDraggedCardOffset}
            isDraggedCardReady={drag.isDraggedCardReady}
          />
        </div>
      </div>
    </>
  );
}
