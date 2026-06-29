import { useCallback, useState } from "react";
import type { Coordinates } from "../types";

export function useTableDragAndDrop() {
  const [draggedCardIndex, setDraggedCardIndex] = useState<null | number>(null);
  const [pointerEvent, setPointerEvent] = useState<React.PointerEvent | null>(
    null,
  );
  const [draggedCardOffset, setDraggedCardOffset] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [isOverCentralPanel, setIsOverCentralPanel] = useState(false);

  const isDragging = draggedCardIndex !== null;

  const startDragging = useCallback(
    (event: React.PointerEvent, index: number, offset: Coordinates) => {
      setPointerEvent(event);
      setDraggedCardIndex(index);
      setDraggedCardOffset(offset);
    },
    [],
  );

  const stopDragging = useCallback(() => {
    setDraggedCardIndex(null);
    setPointerEvent(null);
    setIsOverCentralPanel(false);
  }, []);

  return {
    draggedCardIndex,
    pointerEvent,
    draggedCardOffset,
    isOverCentralPanel,
    setIsOverCentralPanel,
    isDragging,
    startDragging,
    stopDragging,
  };
}
