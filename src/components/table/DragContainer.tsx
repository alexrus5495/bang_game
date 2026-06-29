import { useCallback, useEffect, useRef } from "react";
import { m, useDragControls, useMotionValue } from "framer-motion";
import PlayingCard from "../cards/PlayingCard";
import { sizeAdaptive } from "../../lib/css/cssFunctions";
import { useCardsMetaDataState } from "../../stores/hooks/useCardsMetaDataState";
import { useSocketId } from "../../hooks/useSocketId";
import RootPortal from "../shared/RootPortal";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { CardInitialData } from "../../stores/localStateStore/types";
import { calculateCardHeight } from "../../lib/utils/calculateCardHeight";
import { useDragDropStore } from "../../stores/dragDropStore";
import { useShallow } from "zustand/shallow";

export default function DragContainer({
  tableHeight,
  centralPanelRef,
}: {
  tableHeight: number | null;
  centralPanelRef: React.RefObject<HTMLDivElement>;
}) {
  const players = useLocalStateStore((state) => state.players);
  const pendingController = useLocalStateStore(
    (state) => state.pendingController,
  );
  const tableController = useLocalStateStore((state) => state.tableController);

  const cardsMeta = useCardsMetaDataState()[0];
  const clientId = useSocketId();

  const player = players.find((player) => player.id === clientId);
  const cards = player?.hand;

  const {
    isDragging,
    stopDragging,
    draggedCardIndex,
    pointerEvent,
    draggedCardOffset,
    isOverCentralPanel,
    setIsOverCentralPanel,
  } = useDragDropStore(
    useShallow((state) => ({
      isDragging: state.isDragging,
      stopDragging: state.stopDragging,
      draggedCardIndex: state.draggedCardIndex,
      pointerEvent: state.pointerEvent,
      draggedCardOffset: state.draggedCardOffset,
      isOverCentralPanel: state.isOverCentralPanel,
      setIsOverCentralPanel: state.setIsOverCentralPanel,
    })),
  );

  const dragControls = useDragControls();
  const motionDivRef = useRef<HTMLDivElement>(null);

  //--------------------------
  // This is a fail safe for the drag system used in Motion.
  // stopDragging is tied to the onDragStart function, which is only called if
  // the pointer has been moved on whatever distance (even 1px). If the mouse
  // hasn't been moved - the drag can't be stopped because it has never started.
  //
  // If we initialte drag and then try to end it without moving the pointer,
  // stopDragging will never be called.
  // So we have to manually call stopDragging in this scenario.
  //
  // 1. This flag is true when the mouse has been moved while dragging
  const hasDragStarted = useRef(false);

  // 2. Reset the flag on drag end
  // Removed: this is now handled in onDragEnd

  // 3. Manually call stopDragging in the scenario described above.
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalPointerUp = () => {
      if (!hasDragStarted.current) {
        stopDragging();
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [isDragging, stopDragging]);
  //
  //--------------------------
  //

  const draggedCardId =
    draggedCardIndex !== null && cards ? cards[draggedCardIndex] : "";

  const draggedCardMeta = cardsMeta?.deckMeta[draggedCardId as string];

  // Храним событие для запуска драга после появления элемента в DOM
  const pendingDragEvent = useRef<React.PointerEvent | null>(null);

  // Сохраняем событие при старте драга
  useEffect(() => {
    if (isDragging && pointerEvent) {
      pendingDragEvent.current = pointerEvent;
    }
  }, [isDragging, pointerEvent]);

  // Сбрасываем при завершении драга
  useEffect(() => {
    if (!isDragging) {
      pendingDragEvent.current = null;
    }
  }, [isDragging]);

  // Колбэк для ref — вызывается, когда m.div появляется в DOM
  const handleMotionDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      motionDivRef.current = node;

      if (node && pendingDragEvent.current) {
        const event = pendingDragEvent.current;
        pendingDragEvent.current = null;

        // Небольшая задержка, чтобы framer-motion полностью инициализировал контроллы
        setTimeout(() => {
          dragControls.start(event);
        }, 0);
      }
    },
    [dragControls],
  );

  const checkIfOverCentralPanel = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!centralPanelRef.current) return false;
      const centralPanelRect = centralPanelRef.current.getBoundingClientRect();

      return !(
        centralPanelRect.right < mouseX ||
        centralPanelRect.left > mouseX ||
        centralPanelRect.top > mouseY ||
        centralPanelRect.bottom < mouseY
      );
    },
    [centralPanelRef],
  );

  // Is called when the card dropped in the playing zone.
  const handleDragEndedOverCentralPanel = useCallback(() => {
    pendingController.set(draggedCardId);

    const cardRect = motionDivRef.current?.getBoundingClientRect();
    if (!cardRect) return;

    const cardInitialData: CardInitialData = {
      cardId: draggedCardId,
      initialHeight: cardRect.height,
      initialX: cardRect.x,
      initialY: cardRect.y,
    };

    tableController.addCard(cardInitialData);

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
  }, [draggedCardId, draggedCardMeta, pendingController, tableController]);

  // ------------------
  //
  //
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  //
  //
  // ------------------

  // Adjust the card position
  if (!isDragging) return null;

  const initialLeft = pointerEvent
    ? pointerEvent.clientX - draggedCardOffset.x
    : 0;
  const initialTop = pointerEvent
    ? pointerEvent.clientY - draggedCardOffset.y
    : 0;

  if (!tableHeight) return;

  return (
    <RootPortal portalId={"dragContainer"}>
      <div
        style={{
          perspective: 800,
          position: "fixed",
          left: initialLeft,
          top: initialTop,
          zIndex: 999,
        }}
      >
        <m.div
          ref={handleMotionDivRef}
          drag
          dragControls={dragControls}
          dragListener={false} // The drag initiated by ref callback above
          onDragStart={() => {
            hasDragStarted.current = true;
          }}
          onDrag={(_, info) => {
            const isOver = checkIfOverCentralPanel(info.point.x, info.point.y);
            setIsOverCentralPanel(isOver);

            rotateY.set(Math.max(-15, Math.min(15, info.velocity.x / 200)));
            rotateX.set(Math.max(-15, Math.min(15, -info.velocity.y / 200)));
          }}
          onDragEnd={() => {
            // Reset the flag directly in the event handler
            hasDragStarted.current = false;

            if (isOverCentralPanel) {
              handleDragEndedOverCentralPanel();
            } else {
              console.log("Player cancelled drag");
            }
            stopDragging();
          }}
          className="fixed pointer-events-none w-auto"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,

            height: calculateCardHeight(tableHeight),
          }}
        >
          <PlayingCard cardId={draggedCardId} initialIsFaceDown={false} />

          <div
            className="bg-black h-full w-full relative"
            style={{
              zIndex: -1,
              top: "-96%",
              right: "-5%",
              opacity: 0.6,
              borderRadius: sizeAdaptive(55),
            }}
          ></div>
        </m.div>
      </div>
    </RootPortal>
  );
}
