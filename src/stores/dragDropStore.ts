import { create } from "zustand";
import type { Coordinates } from "../types";

interface DragDropState {
  draggedCardIndex: null | number;
  pointerEvent: React.PointerEvent | null;
  draggedCardOffset: Coordinates;
  isOverCentralPanel: boolean;
  isDragging: boolean;

  startDragging: (
    event: React.PointerEvent,
    index: number,
    offset: Coordinates,
  ) => void;
  stopDragging: () => void;
  setIsOverCentralPanel: (isOver: boolean) => void;
  setDraggedCardOffset: (offset: Coordinates) => void;
}

export const useDragDropStore = create<DragDropState>((set) => ({
  draggedCardIndex: null,
  pointerEvent: null,
  draggedCardOffset: { x: 0, y: 0 },
  isOverCentralPanel: false,
  isDragging: false,

  startDragging: (event, index, offset) =>
    set({
      pointerEvent: event,
      draggedCardIndex: index,
      draggedCardOffset: offset,
      isDragging: true,
    }),

  stopDragging: () =>
    set({
      draggedCardIndex: null,
      pointerEvent: null,
      isOverCentralPanel: false,
      isDragging: false,
    }),

  setIsOverCentralPanel: (isOver) => set({ isOverCentralPanel: isOver }),

  setDraggedCardOffset: (offset) => set({ draggedCardOffset: offset }),
}));
