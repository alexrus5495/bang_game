import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PlayingCard from "../cards/PlayingCard";
import type { Coordinates } from "../../types";
import { sizeAdaptive } from "../../lib/css/cssFunctions";

export default function DragContainer({
  draggedCardId,
  draggedCardOffset,
  mousePosition,
  setIsDraggedCardReady,
  tableHeight,
}: {
  draggedCardId: string;
  draggedCardOffset: Coordinates;
  setIsDraggedCardReady: (isReady: boolean) => void;
  mousePosition: Record<string, number>;
  tableHeight: number | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<
    Record<string, number | undefined>
  >({
    left: mousePosition.x - draggedCardOffset.x,
    top: mousePosition.y - draggedCardOffset.y,
  });

  const [cardHeight, setCardHeight] = useState<number>(0);

  //Update card position
  useEffect(() => {
    if (containerRef.current) {
      setCoordinates({
        left: mousePosition.x - draggedCardOffset.x,
        top: mousePosition.y - draggedCardOffset.y,
      });
    }
  }, [mousePosition, draggedCardOffset]);

  //Update card size
  useEffect(() => {
    const calculateCardHeight = () => {
      if (!tableHeight) return 0;
      // height get calculated by trailing changes in height of parent elements.
      // Probably better switching to ref, but will do for now
      else return tableHeight * 0.4 * 0.8 * 1.2;
    };

    setCardHeight(calculateCardHeight());
  }, [tableHeight]);

  //Use a portal to move the component to the top of the DOM tree
  const portalRootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "dragContainer";
    document.body.appendChild(portalRoot);
    portalRootRef.current = portalRoot;

    return () => {
      if (portalRootRef.current) {
        document.body.removeChild(portalRootRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    setIsDraggedCardReady(true);
  }, [setIsDraggedCardReady]);

  if (!portalRootRef.current) return null;

  return createPortal(
    <div
      className="pointer-none w-auto fixed"
      ref={containerRef}
      style={{
        height: cardHeight,
        zIndex: 999,
        left: coordinates.left,
        top: coordinates.top,
      }}
    >
      <PlayingCard
        cardId={draggedCardId}
        initialIsFaceDown={false}
        initialIsInteractable={false}
      />

      <div
        className="bg-black relative h-full w-full"
        style={{
          zIndex: -1,
          top: "-96%",
          right: "-5%",
          opacity: 0.6,

          borderRadius: sizeAdaptive(55),
        }}
      ></div>
    </div>,
    portalRootRef.current,
  );
}
