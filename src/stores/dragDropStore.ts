import { create } from "zustand";
import type { Coordinates } from "../types";

interface DragDropState {
  draggedCardIndex: null | number;
  pointerEvent: React.PointerEvent | null;
  draggedCardOffset: Coordinates;
  isOverCentralPanel: boolean;
  isDragging: boolean;
  lastDraggedIndex: null | number;
  highlightedCardIndex: null | number;

  startDragging: (
    event: React.PointerEvent,
    index: number,
    offset: Coordinates,
  ) => void;
  stopDragging: () => void;
  setIsOverCentralPanel: (isOver: boolean) => void;
  setDraggedCardOffset: (offset: Coordinates) => void;
  clearLastDraggedIndex: () => void;
  setHighlightedCardIndex: (index: null | number) => void;
}

export const useDragDropStore = create<DragDropState>((set) => ({
  draggedCardIndex: null,
  pointerEvent: null,
  draggedCardOffset: { x: 0, y: 0 },
  isOverCentralPanel: false,
  isDragging: false,
  lastDraggedIndex: null,
  highlightedCardIndex: null,

  startDragging: (event, index, offset) =>
    set({
      pointerEvent: event,
      draggedCardIndex: index,
      draggedCardOffset: offset,
      isDragging: true,
      lastDraggedIndex: index,
      highlightedCardIndex: null,
    }),

  stopDragging: () =>
    set({
      draggedCardIndex: null,
      pointerEvent: null,
      isOverCentralPanel: false,
      isDragging: false,
      highlightedCardIndex: null,
    }),

  setIsOverCentralPanel: (isOver) => set({ isOverCentralPanel: isOver }),

  setDraggedCardOffset: (offset) => set({ draggedCardOffset: offset }),

  clearLastDraggedIndex: () => set({ lastDraggedIndex: null }),

  setHighlightedCardIndex: (index) => set({ highlightedCardIndex: index }),
}));
