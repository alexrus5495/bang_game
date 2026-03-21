import React, { createContext, useContext } from "react";
import { useTableDragAndDrop } from "../hooks/useTableDragAndDrop";
import type { Coordinates } from "../types";

interface DragDropContextType {
  draggedCardIndex: number | null;
  setDraggedCardIndex: (index: number | null) => void;
  setDraggedCardOffset: (coordinates: Coordinates) => void;
  isDraggedCardReady: boolean;
  setIsDraggedCardReady: (ready: boolean) => void;
  isDragging: boolean;
  mousePosition: Coordinates;
  setMousePosition: (newCoords: Coordinates) => void;
  draggedCardOffset: Coordinates;
  stopDragging: () => void;
  setIsOverCentralPanel: (isOver: boolean) => void;
  isOverCentralPanel: boolean;
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
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}
