import { m, useDragControls, type PanInfo } from "framer-motion";
import PlayingCard from "../cards/PlayingCard";
import { useCardsMetaDataState } from "../../stores/hooks/useCardsMetaDataState";
import RootPortal from "../shared/RootPortal";
import { useLocalStateStore } from "../../stores/localStateStore";
import type { CardInitialData } from "../../stores/localStateStore/types";
import { calculateCardHeight } from "../../lib/utils/calculateCardHeight";
import { useDragDropStore } from "../../stores/dragDropStore";
import { useShallow } from "zustand/shallow";
import { useDrag3DTilt } from "../../hooks/useDrag3DTilt";
import { useDragOrchestration } from "../../hooks/useDragOrchestration";
import { type AnchorId } from "../../contexts/AnchorsContext";
import { useAnimationLayer } from "../../hooks/useAnimationLayer";
import AnimationAnchor from "./shared/AnimationAnchor";
import { useMemo } from "react";
import type { GameEvent, Optional } from "../../types";
import { socket } from "../../lib/socket";

export default function DragContainer({
  tableHeight,
  centralPanelRef,
}: {
  tableHeight: number | null;
  centralPanelRef: React.RefObject<HTMLDivElement>;
}) {
  // Zustand States
  const players = useLocalStateStore((state) => state.players);
  const pendingController = useLocalStateStore(
    (state) => state.pendingController,
  );
  const tableController = useLocalStateStore((state) => state.tableController);
  const cardsMeta = useCardsMetaDataState()[0];
  const clientId = socket.id;
  const { playAnimation } = useAnimationLayer();

  const {
    isDragging,
    stopDragging,
    draggedCardIndex,
    pointerEvent,
    draggedCardOffset,
    isOverCentralPanel,
    setIsOverCentralPanel,
    lastDraggedIndex,
  } = useDragDropStore(
    useShallow((state) => ({
      isDragging: state.isDragging,
      stopDragging: state.stopDragging,
      draggedCardIndex: state.draggedCardIndex,
      pointerEvent: state.pointerEvent,
      draggedCardOffset: state.draggedCardOffset,
      isOverCentralPanel: state.isOverCentralPanel,
      setIsOverCentralPanel: state.setIsOverCentralPanel,
      lastDraggedIndex: state.lastDraggedIndex,
    })),
  );

  // Framer Motion Core Initialization
  const dragControls = useDragControls();

  // Custom Split Hooks logic
  const { rotateX, rotateY, updateTilt, resetTilt } = useDrag3DTilt();
  const { motionDivRef, handleMotionDivRef, hasDragStarted } =
    useDragOrchestration({
      isDragging,
      pointerEvent,
      dragControls,
      stopDragging,
    });

  // Derived Game States
  const player = players.find((p) => p.id === clientId);
  const cards = player?.hand;
  const draggedCardId =
    draggedCardIndex !== null && cards ? cards[draggedCardIndex] : "";
  const draggedCardMeta = cardsMeta?.deckMeta[draggedCardId as string];

  // Boundaries & Panel Intersections
  const checkIfOverCentralPanel = (mouseX: number, mouseY: number) => {
    if (!centralPanelRef.current) return false;
    const rect = centralPanelRef.current.getBoundingClientRect();
    return !(
      rect.right < mouseX ||
      rect.left > mouseX ||
      rect.top > mouseY ||
      rect.bottom < mouseY
    );
  };

  const getCardInitialData = (): CardInitialData | null => {
    const cardRect = motionDivRef.current?.getBoundingClientRect();

    if (!cardRect) return null;

    const cardInitialData: CardInitialData = {
      cardId: draggedCardId,
      initialHeight: cardRect.height,
      initialX: cardRect.x,
      initialY: cardRect.y,
    };

    return cardInitialData;
  };

  const handleDragEndedOverCentralPanel = () => {
    pendingController.set(draggedCardId);

    const data = getCardInitialData();

    if (!data) return;

    tableController.addCard(data);

    // Contextual handling for cards target effects
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
  };

  const handleOnDragStart = () => {
    hasDragStarted.current = true;
  };

  const handleOnDrag = (info: PanInfo) => {
    const isOver = checkIfOverCentralPanel(info.point.x, info.point.y);
    setIsOverCentralPanel(isOver);
    updateTilt(info);
  };

  const handleOnDragEnd = () => {
    hasDragStarted.current = false;
    resetTilt();

    if (isOverCentralPanel) {
      handleDragEndedOverCentralPanel();
      stopDragging();
    } else {
      console.log("Player cancelled drag. Snapping back...");

      // 1. SYNCHRONOUSLY reset the highlighted card index in the store.
      // This ensures that all layout/rect calculations evaluate `isHighlighted` as false BEFORE the animation begins.
      useDragDropStore.setState({ highlightedCardIndex: null });

      const snapbackEvent: Optional<GameEvent, "id" | "timestamp"> = {
        type: "CARD_SNAPBACK",
        data: {
          cardId: cards?.[lastDraggedIndex ?? 0] ?? "",
          lastIndex: lastDraggedIndex ?? 0,
        },
      };

      // 2. Trigger the animation. CardSnapback will now read the clean, un-highlighted bounding rect.
      playAnimation(snapbackEvent);

      // 3. Defer unmounting the proxy container to the end of the frame.
      requestAnimationFrame(() => {
        stopDragging();
      });
    }
  };

  const anchorId: AnchorId = useMemo(() => ({ type: "drag-proxy" }), []);

  // Early Guard Clauses
  if (!isDragging || !tableHeight) return null;

  const initialLeft = pointerEvent
    ? pointerEvent.clientX - draggedCardOffset.x
    : 0;
  const initialTop = pointerEvent
    ? pointerEvent.clientY - draggedCardOffset.y
    : 0;

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
          dragListener={false}
          onDragStart={() => handleOnDragStart()}
          onDrag={(_, info) => handleOnDrag(info)}
          onDragEnd={() => handleOnDragEnd()}
          className="fixed pointer-events-none w-auto"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            height: calculateCardHeight(tableHeight),
          }}
        >
          <AnimationAnchor id={anchorId} className="w-full h-full absolute" />

          <PlayingCard
            cardId={cards?.[lastDraggedIndex ?? 0] ?? ""}
            initialIsFaceDown={false}
          />
        </m.div>
      </div>
    </RootPortal>
  );
}
