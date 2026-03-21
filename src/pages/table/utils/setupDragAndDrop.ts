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
  const reactivateHighlight = (e: MouseEvent) => {
    setTimeout(() => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      // Ищем среди них карту
      let cardElement = null;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        let current = el;

        // Проверяем сам элемент и его родителей
        while (current && current !== document.body) {
          if (current.classList?.contains("isCard")) {
            cardElement = current;
            break;
          }
          current = current.parentElement as HTMLDivElement;
        }

        if (cardElement) break;
      }

      if (cardElement) {
        //Dispatch mousemove event on the original card to retrigger the highlight effect
        const mouseMoveEvent = new MouseEvent("mousemove", {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
        });

        cardElement.dispatchEvent(mouseMoveEvent);
      }
    }, 1);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    setIsOverCentralPanel(checkIfOverCentralPanel());
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;

    stopDragging();
    if (isOverCentralPanel) {
      handleDragEndedOverCentralPanel();
    } else console.log("Player cancelled drag");

    reactivateHighlight(e);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
}
