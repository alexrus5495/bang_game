import React, { createContext, use } from "react";
import { useTableDragAndDrop } from "../hooks/useTableDragAndDrop";
import type { Coordinates } from "../types";

interface DragDropContextType {
  draggedCardIndex: number | null;
  pointerEvent: React.PointerEvent | null;
  draggedCardOffset: Coordinates;
  isDragging: boolean;
  isOverCentralPanel: boolean;
  setIsOverCentralPanel: (isOver: boolean) => void;
  startDragging: (
    event: React.PointerEvent,
    index: number,
    offset: Coordinates,
  ) => void;
  stopDragging: () => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(
  undefined,
);

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  const dragDrop = useTableDragAndDrop();

  return (
    <DragDropContext.Provider value={dragDrop}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = use(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}
