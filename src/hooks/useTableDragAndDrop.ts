import { useCallback, useState } from "react";
import type { Coordinates } from "../types";

export function useTableDragAndDrop() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDraggedCardReady, setIsDraggedCardReady] = useState<boolean>(false);
  const [draggedCardIndex, setDraggedCardIndex] = useState<null | number>(null);
  const [draggedCardOffset, setDraggedCardOffset] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const [isOverCentralPanel, setIsOverCentralPanel] = useState(false);

  const isDragging = draggedCardIndex !== null;

  const stopDragging = useCallback(() => {
    setDraggedCardIndex(null);
    setIsDraggedCardReady(false);
  }, []);

  return {
    mousePosition,
    setMousePosition,
    isDraggedCardReady,
    setIsDraggedCardReady,
    draggedCardIndex,
    setDraggedCardIndex,
    draggedCardOffset,
    setDraggedCardOffset,
    isOverCentralPanel,
    setIsOverCentralPanel,
    isDragging,
    stopDragging,
  };
}
