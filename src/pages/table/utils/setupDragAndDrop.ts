interface DragAndDropDependencies {
  isDragging: boolean;
  checkIfOverCentralPanel: () => boolean;
  isOverCentralPanel: boolean;
  stopDragging: () => void;
  handleDragEndedOverCentralPanel: () => void;
  setMousePosition: (position: { x: number; y: number }) => void;
  setIsOverCentralPanel: (over: boolean) => void;
}

export function setupDragAndDrop({
  isDragging,
  checkIfOverCentralPanel,
  isOverCentralPanel,
  stopDragging,
  handleDragEndedOverCentralPanel,
  setMousePosition,
  setIsOverCentralPanel,
}: DragAndDropDependencies) {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    setIsOverCentralPanel(checkIfOverCentralPanel());
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    stopDragging();
    if (isOverCentralPanel) {
      handleDragEndedOverCentralPanel();
    } else console.log("Player cancelled drag");
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
}
