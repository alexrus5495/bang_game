import { create } from "zustand";
interface DragDropState {
  isOverCardPlayingArea: boolean;
  highlightedCardIndex: null | number;
  setIsOverCardPlayingArea: (isOver: boolean) => void;
  setHighlightedCardIndex: (index: null | number) => void;
}

export const useDragDropStore = create<DragDropState>((set) => ({
  isOverCardPlayingArea: false,
  highlightedCardIndex: null,
  setIsOverCardPlayingArea: (isOver) => set({ isOverCardPlayingArea: isOver }),
  setHighlightedCardIndex: (index) => set({ highlightedCardIndex: index }),
}));
