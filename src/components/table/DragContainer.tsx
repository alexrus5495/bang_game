import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PlayingCard from "../cards/PlayingCard";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { useDragDrop } from "../../contexts/DragDropContext";
import { useCardsMetaDataState } from "../../stores/hooks/useCardsMetaDataState";
import { setupDragAndDrop } from "../../pages/table/utils/setupDragAndDrop";
import { useSocketId } from "../../hooks/useSocketId";
import RootPortal from "../shared/RootPortal";
import { useLocalState } from "../../contexts/LocalStateContext";
import type { CardInitialData } from "../../contexts/LocalStateContext/useCardsOnTheTableState";

export default function DragContainer({
  tableHeight,
  centralPanelRef,
}: {
  tableHeight: number | null;
  centralPanelRef: React.RefObject<HTMLDivElement>;
}) {
  const localState = useLocalState();
  const cardsMeta = useCardsMetaDataState()[0];
  const clientId = useSocketId();
  const visibleCards = localState.visibleCards;

  // Accessing contexts
  const drag = useDragDrop();
  const pending = useLocalState().pendingCard;
  const addCardToTheTable = localState.cardsOnTheTable.addCard;

  const playerVisibleCards =
    clientId !== null ? (visibleCards.cards[clientId]?.hand ?? []) : [];

  // Check if the mouse is over central panel
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
  }, [drag.mousePosition, centralPanelRef]);

  const draggedCardId =
    drag.draggedCardIndex !== null
      ? (playerVisibleCards[drag.draggedCardIndex] as string)
      : "";

  const draggedCardMeta = cardsMeta?.deckMeta[draggedCardId as string];

  // Handle drag end over central panel
  const handleDragEndedOverCentralPanel = useCallback(() => {
    pending.set(draggedCardId);

    const cardRect = drag.draggedCardRef?.getBoundingClientRect();
    if (!cardRect) return;

    const cardInitialData: CardInitialData = {
      cardId: draggedCardId,
      initialHeight: cardRect?.height,
      initialX: cardRect?.x,
      initialY: cardRect?.y,
    };
    addCardToTheTable(cardInitialData);

    switch (draggedCardMeta?.effect.target) {
      case "self":
      case "many":
      case "all":
        console.log("No selector");
        break;
      case "one":
        console.log("Show selector");
        break;
      default:
        break;
    }

    console.log(`Player played card ${draggedCardId}`);
  }, [
    draggedCardId,
    drag.draggedCardRef,
    draggedCardMeta,
    addCardToTheTable,
    pending,
  ]);

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<
    Record<string, number | undefined>
  >({
    left: drag.mousePosition.x - drag.draggedCardOffset.x,
    top: drag.mousePosition.y - drag.draggedCardOffset.y,
  });

  const [cardHeight, setCardHeight] = useState<number>(0);

  //Update card position
  useEffect(() => {
    if (containerRef.current) {
      setCoordinates({
        left: drag.mousePosition.x - drag.draggedCardOffset.x,
        top: drag.mousePosition.y - drag.draggedCardOffset.y,
      });

      drag.setDraggedCardRef(containerRef.current);
    }
  }, [drag]);

  //Update card size
  useEffect(() => {
    const calculateCardHeight = () => {
      if (!tableHeight) return 0;
      // height get calculated by trailing changes in height of parent elements.
      // Probably better switching to ref, but will do for now
      else return tableHeight * 0.4 * 0.8 * 1.2;
    };

    setCardHeight(calculateCardHeight());
  }, [tableHeight]);

  // Triggers when the card is fully loaded and sends the signal to the original card
  // to disappear
  useLayoutEffect(() => {
    drag.setIsDraggedCardReady(true);
  }, [drag]);

  return (
    <RootPortal portalId={"dragContainer"}>
      <div
        className="pointer-none w-auto fixed"
        ref={containerRef}
        style={{
          height: cardHeight,
          zIndex: 999,
          left: coordinates.left,
          top: coordinates.top,
        }}
      >
        {drag.isDragging && (
          <PlayingCard cardId={draggedCardId} initialIsFaceDown={false} />
        )}

        {drag.isDragging && (
          <div
            className="bg-black relative h-full w-full"
            style={{
              zIndex: -1,
              top: "-96%",
              right: "-5%",
              opacity: 0.6,

              borderRadius: sizeAdaptive(55),
            }}
          ></div>
        )}
      </div>
      ,
    </RootPortal>
  );
}
